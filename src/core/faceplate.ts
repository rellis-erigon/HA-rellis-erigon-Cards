/**
 * The faceplate renderer.
 *
 * Draws a faceplate's regions over its artwork. Each region kind is
 * implemented once here and reused by every faceplate of every card, which
 * is the whole reason the engine exists: a new model should cost a data
 * file, not a rendering pass.
 *
 * Everything is drawn inside one SVG viewBox so the card scales to whatever
 * width the dashboard gives it, and so a faceplate can move between the
 * "svg" and "image" render modes without its regions being repositioned.
 */

import { svg, SVGTemplateResult, TemplateResult, html } from "lit";
import { format, readClimate, readRole } from "./bind";
import { Faceplate, HomeAssistant, Reading, Region } from "./types";

export interface RenderContext {
  hass: HomeAssistant;
  /** When set, roles are read from this climate entity's attributes. */
  climate?: string;
  faceplate: Faceplate;
  /** role → entity id */
  bindings: Record<string, string>;
  page: string;
  onAction: (region: Region, value?: number) => void;
}

/** Regions on the current page, plus those pinned to every page. */
function visibleRegions(ctx: RenderContext): Region[] {
  return ctx.faceplate.regions.filter((region) => {
    // A region whose visibility join is bound follows the panel: it is on
    // screen exactly when the processor says it is. This is what lets two
    // subpages sitting side by side both show, while two occupying the
    // same space take turns — a fact about the running program that no
    // amount of reading the project file would settle.
    if (region.visible_role && ctx.bindings[region.visible_role]) {
      return isOn(readRole(ctx.hass, ctx.bindings, region.visible_role));
    }
    if (!region.page) return true;
    if (region.page === ctx.page) return true;
    // Side by side on the panel, so side by side here.
    return Boolean(
      ctx.faceplate.page_companions?.[ctx.page]?.includes(region.page),
    );
  });
}

/** True once the panel itself is driving what is on screen. */
export function visibilityIsLive(
  faceplate: Faceplate, bindings: Record<string, string>,
): boolean {
  const gated = faceplate.regions.filter((r) => r.visible_role);
  return gated.length > 0 && gated.every((r) => bindings[r.visible_role!]);
}

export function renderFaceplate(ctx: RenderContext): TemplateResult {
  const [width, height] = ctx.faceplate.size;
  const regions = visibleRegions(ctx);

  return html`
    <svg
      class="faceplate display-${ctx.faceplate.display ?? "positive"}"
      viewBox="0 0 ${width} ${height}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label=${ctx.faceplate.name}
      style=${`--faceplate-width:${width}px`}
    >
      ${chassis(ctx.faceplate)}
      ${regions.map((region) => renderRegion(ctx, region))}
    </svg>
  `;
}

function chassis(faceplate: Faceplate): SVGTemplateResult {
  if (faceplate.render === "image" && faceplate.art) {
    const [w, h] = faceplate.size;
    return svg`<image href=${faceplate.art} x="0" y="0" width=${w} height=${h} />`;
  }
  // Inline SVG markup is trusted: it ships inside the bundle, it is never
  // user input, and unsafeSVG would be the alternative.
  return svg`${faceplate.artNode ?? ""}`;
}

function renderRegion(ctx: RenderContext, region: Region): SVGTemplateResult {
  const reading =
    ctx.climate && !ctx.bindings[region.role]
      ? readClimate(ctx.hass, ctx.climate, region.role)
      : readRole(ctx.hass, ctx.bindings, region.role);
  switch (region.kind) {
    case "text":
      return textRegion(region, reading);
    case "lamp":
      return lampRegion(region, reading);
    case "bar":
      return barRegion(ctx, region, reading);
    case "ring":
      return ringRegion(region, reading);
    case "odometer":
      return odometerRegion(region, reading);
    case "needle":
      return needleRegion(region, reading);
    case "fader":
      return faderRegion(ctx, region, reading);
    case "button":
      return buttonRegion(ctx, region, reading);
    case "plate":
      return plateRegion(region);
  }
}

function plateRegion(region: Region): SVGTemplateResult {
  // Flat chrome: the panel's borders, fills and the boxes where artwork
  // sat. It shows no reading and takes no action, so it is drawn and
  // forgotten — but without it a generated panel is text floating on
  // nothing, and the layout stops being recognisable.
  //
  // Plates must come first in the region list, since regions draw in
  // order and a plate emitted late paints over the values on top of it.
  return svg`
    ${region.fill || region.border || !region.src
      ? svg`<rect
          class="plate"
          x=${region.x}
          y=${region.y}
          width=${region.w ?? 0}
          height=${region.h ?? 0}
          rx=${region.radius ?? 0}
          fill=${region.fill ?? "none"}
          stroke=${region.border ?? "none"}
        />`
      : ""}
    ${region.src
      ? svg`<image
          href=${region.src}
          x=${region.x}
          y=${region.y}
          width=${region.w ?? 0}
          height=${region.h ?? 0}
          preserveAspectRatio="xMidYMid meet"
        />`
      : ""}
    ${region.text
      ? svg`<text
          class="plate-label"
          x=${region.x + (region.w ?? 0) / 2}
          y=${region.y + (region.size ?? 16)}
          font-size=${region.size ?? 16}
          text-anchor="middle"
          fill=${region.color ?? "currentColor"}
        >${region.text}</text>`
      : ""}
  `;
}


function textRegion(region: Region, reading: Reading): SVGTemplateResult {
  // A region with literal text and no role is chrome — a title band, a
  // soft-key legend — that still needs to change with the page.
  const value = !region.role
    ? region.text ?? ""
    : region.show === "unit"
      ? (reading.unit ?? region.text ?? "").toUpperCase()
      : reading.dark && region.placeholder !== undefined
        ? region.placeholder
        : format(reading, region.decimals ?? 1, region.unit);
  // Neither a role nor literal text means the region does nothing but emit
  // an empty element. Drawing nothing is the honest outcome.
  if (!region.role && !region.text) return svg``;
  const anchor = region.align ?? "start";
  const x = region.x + (anchor === "end" ? region.w ?? 0 : anchor === "middle" ? (region.w ?? 0) / 2 : 0);
  return svg`
    ${region.label
      ? svg`<text class="lcd-label" x=${region.x} y=${region.y - 10}>${region.label}</text>`
      : ""}
    <text
      class="lcd-value ${region.role ? "" : "chrome"} ${region.role && reading.dark ? "dark" : ""} ${reading.stale ? "stale" : ""}"
      x=${x}
      y=${region.y + (region.size ?? 22)}
      font-size=${region.size ?? 22}
      text-anchor=${anchor}
      style=${region.color ? `fill:${region.color}` : ""}
    >${value}</text>
  `;
}

/**
 * Whether a reading means "on".
 *
 * Numeric states are compared as numbers: Niagara exports a fault history
 * as "0.0", which a string comparison against "0" would read as a fault.
 * Unbound is never on — an unlit control is honest, where one asserting a
 * state it has not been told is not.
 *
 * `ringRegion` still carries its own, looser version of this, which does
 * not handle "0.0". Unifying them changes what existing plant cards draw,
 * so it has been left where it is rather than altered in passing.
 */
export function isOn(reading: Reading): boolean {
  const state = reading.state?.trim() ?? "";
  const number = state === "" ? NaN : Number(state);
  return (
    !reading.dark &&
    reading.state !== undefined &&
    (Number.isFinite(number)
      ? number !== 0
      : !["off", "false", "normal", "ok"].includes(state.toLowerCase()))
  );
}

function lampRegion(region: Region, reading: Reading): SVGTemplateResult {
  // A lamp is lit for a truthy state and dark otherwise. Unbound is dark
  // too — an unlit lamp is honest and looks like real hardware with
  // nothing to report, where a hidden one looks like a complete card.
  const lit = isOn(reading);
  const radius = (region.w ?? 12) / 2;
  return svg`
    <circle
      class="lamp ${lit ? "lit" : ""}"
      cx=${region.x + radius}
      cy=${region.y + radius}
      r=${radius}
      fill=${lit ? region.on ?? "#e34" : region.off ?? "#3a1418"}
    />
    ${region.label
      ? svg`<text class="lamp-label" x=${region.x + radius} y=${region.y + radius * 2 + 12}
              text-anchor="middle">${region.label}</text>`
      : ""}
  `;
}

function barRegion(
  ctx: RenderContext, region: Region, reading: Reading,
): SVGTemplateResult {
  const width = region.w ?? 100;
  const height = region.h ?? 10;
  const max = region.max ?? 100;
  const min = region.min ?? 0;
  const span = max - min || 1;
  const fraction =
    reading.dark || reading.value === undefined
      ? 0
      : Math.max(0, Math.min(1, (reading.value - min) / span));
  // Click-to-position. The fraction is taken from the element's own
  // bounding box rather than the SVG user space, because the card is
  // scaled to the dashboard column and offsetX would be in the wrong
  // units. A generous hit area sits over the track: a 10px bar is a hard
  // target, and overshooting a fader is worse than missing it.
  const settable = region.action === "set_level";
  const seek = (event: MouseEvent) => {
    const target = event.currentTarget as SVGGraphicsElement;
    const box = target.getBoundingClientRect();
    if (!box.width) return;
    const at = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
    ctx.onAction(region, min + at * span);
  };

  return svg`
    <rect class="bar-track" x=${region.x} y=${region.y} width=${width} height=${height} rx="2" />
    <rect
      class="bar-fill"
      x=${region.x}
      y=${region.y}
      width=${width * fraction}
      height=${height}
      rx="2"
    />
    ${settable
      ? svg`<rect
          class="bar-hit"
          x=${region.x}
          y=${region.y - 8}
          width=${width}
          height=${height + 16}
          fill="transparent"
          @click=${seek}
        />`
      : ""}
  `;
}

/**
 * A console fader: a slotted track with a cap that travels up it.
 *
 * Vertical by definition. A horizontal bar can show a level, but it does
 * not read as a fader, and a rack of them does not read as a mixer — the
 * thing an operator recognises is a column of caps at different heights.
 *
 * Click anywhere on the throw to send the cap there. Up is more.
 */
function faderRegion(
  ctx: RenderContext, region: Region, reading: Reading,
): SVGTemplateResult {
  const width = region.w ?? 44;
  const travel = region.h ?? 200;
  const max = region.max ?? 100;
  const min = region.min ?? 0;
  const span = max - min || 1;
  const centre = region.x + width / 2;

  const fraction =
    reading.dark || reading.value === undefined
      ? 0
      : Math.max(0, Math.min(1, (reading.value - min) / span));
  // Cap travel is inset by half a cap at each end so it never overhangs.
  const capH = 16;
  const usable = travel - capH;
  const capY = region.y + usable * (1 - fraction);

  const seek = (event: MouseEvent) => {
    const box = (event.currentTarget as SVGGraphicsElement).getBoundingClientRect();
    if (!box.height) return;
    const at = Math.min(1, Math.max(0, 1 - (event.clientY - box.top) / box.height));
    ctx.onAction(region, min + at * span);
  };

  const ticks = region.ticks ?? 5;
  return svg`
    <g class="fader ${reading.dark ? "dark" : ""}">
      ${[...Array(ticks).keys()].map((i) => {
        const y = region.y + capH / 2 + (usable * i) / (ticks - 1 || 1);
        return svg`<line class="fader-tick"
          x1=${region.x + 4} y1=${y} x2=${region.x + width - 4} y2=${y} />`;
      })}
      <rect class="fader-slot" x=${centre - 3} y=${region.y + capH / 2 - 2}
            width="6" height=${usable + 4} rx="3" />
      <rect class="fader-travelled" x=${centre - 3}
            y=${capY + capH / 2 - 2}
            width="6" height=${region.y + usable + capH / 2 + 2 - (capY + capH / 2)}
            rx="3" />
      <rect class="fader-cap" x=${centre - 15} y=${capY}
            width="30" height=${capH} rx="3" />
      <line class="fader-line" x1=${centre - 13} y1=${capY + capH / 2}
            x2=${centre + 13} y2=${capY + capH / 2} />
      ${region.action === "set_level"
        ? svg`<rect class="fader-hit" x=${region.x} y=${region.y}
            width=${width} height=${travel} fill="transparent" @click=${seek} />`
        : ""}
    </g>
  `;
}

function ringRegion(region: Region, reading: Reading): SVGTemplateResult {
  // A status ring: lit when the unit is doing something, dark when it is
  // not. Unbound counts as dark, like every other region.
  const state = (reading.state ?? "").toLowerCase();
  const lit = !reading.dark && state !== "off" && state !== "0" && state !== "false";
  return svg`
    <circle
      class="ring ${lit ? "lit" : ""}"
      cx=${region.x}
      cy=${region.y}
      r=${region.r ?? 100}
      fill="none"
      stroke=${lit ? region.on ?? "#3aa0ff" : region.off ?? "#1b2026"}
      stroke-width=${region.stroke ?? 6}
    />
  `;
}

function odometerRegion(region: Region, reading: Reading): SVGTemplateResult {
  const digits = region.digits ?? 5;
  const red = region.redDigits ?? 1;
  const scale = region.scale ?? 1;
  const cellW = (region.w ?? 140) / digits;
  const cellH = region.h ?? 34;

  const shown =
    reading.dark || reading.value === undefined
      ? "-".repeat(digits)
      : String(Math.floor(Math.abs(reading.value) / scale))
          .slice(-digits)
          .padStart(digits, "0");

  return svg`
    <g class="odometer ${reading.dark ? "dark" : ""}">
      ${[...shown].map((digit, index) => {
        const highlighted = index >= digits - red;
        return svg`
          <rect
            class="odo-cell ${highlighted ? "odo-red" : ""}"
            x=${region.x + index * cellW}
            y=${region.y}
            width=${cellW - 1.5}
            height=${cellH}
            rx="1.5"
          />
          <text
            class="odo-digit ${highlighted ? "odo-red-digit" : ""}"
            x=${region.x + index * cellW + (cellW - 1.5) / 2}
            y=${region.y + cellH - 8}
            text-anchor="middle"
            font-size=${cellH - 12}
          >${digit}</text>
        `;
      })}
    </g>
  `;
}

function needleRegion(region: Region, reading: Reading): SVGTemplateResult {
  const radius = region.r ?? 26;
  const scale = region.scale ?? 1;

  // One revolution is ten of this decade's units, as on a real register.
  const turns =
    reading.dark || reading.value === undefined
      ? 0
      : ((Math.abs(reading.value) / scale) % 10) / 10;
  const angle = turns * 2 * Math.PI - Math.PI / 2;
  const tipX = region.x + Math.cos(angle) * (radius - 5);
  const tipY = region.y + Math.sin(angle) * (radius - 5);

  return svg`
    <g class="dial ${reading.dark ? "dark" : ""}">
      <circle class="dial-face" cx=${region.x} cy=${region.y} r=${radius} />
      ${[...Array(10).keys()].map((tick) => {
        const a = (tick / 10) * 2 * Math.PI - Math.PI / 2;
        return svg`<line
          class="dial-tick"
          x1=${region.x + Math.cos(a) * (radius - 4)}
          y1=${region.y + Math.sin(a) * (radius - 4)}
          x2=${region.x + Math.cos(a) * radius}
          y2=${region.y + Math.sin(a) * radius}
        />`;
      })}
      <line class="dial-needle" x1=${region.x} y1=${region.y} x2=${tipX} y2=${tipY} />
      <circle class="dial-hub" cx=${region.x} cy=${region.y} r="2.4" />
      ${region.label
        ? svg`<text class="dial-label" x=${region.x} y=${region.y + radius + 13}
                text-anchor="middle">${region.label}</text>`
        : ""}
    </g>
  `;
}

function buttonRegion(
  ctx: RenderContext, region: Region, reading?: Reading,
): SVGTemplateResult {
  const width = region.w ?? 44;
  const height = region.h ?? 26;
  // The panel draws a different background when a button is lit. That is
  // the one change of appearance a card can reproduce honestly, and on a
  // source-select page it is the only thing that says which source is
  // playing. Unknown is not off, so a reading that has not arrived leaves
  // the button in its normal state rather than asserting either.
  const lit = reading !== undefined && !reading.dark && isOn(reading);
  const background = (lit && region.src_on) || region.src;
  // A button carrying any artwork is styled as a panel key rather than as
  // part of a dark chassis, whether or not it is lit right now.
  const arty = Boolean(region.src || region.src_on || region.icon);
  const plain = !background;
  // A generated faceplate carries the panel's own type size and colour.
  // These go in a style attribute rather than as SVG attributes because
  // the card's stylesheet sets a font-size for button text, and a
  // stylesheet rule beats a presentation attribute.
  const ink = [
    region.size ? `font-size:${region.size}px` : "",
    region.color ? `fill:${region.color}` : "",
  ]
    .filter(Boolean)
    .join(";");
  return svg`
    <g class="button ${lit ? "lit" : ""} ${arty ? "art" : ""}"
       @click=${() => ctx.onAction(region)} role="button" tabindex="0">
      ${plain
        ? svg`<rect
            x=${region.x}
            y=${region.y}
            width=${width}
            height=${height}
            rx=${region.radius ?? 4}
          />`
        : ""}
      ${background
        ? svg`<image
            href=${background}
            x=${region.x}
            y=${region.y}
            width=${width}
            height=${height}
            preserveAspectRatio="none"
          />`
        : ""}
      ${region.icon
        ? svg`<image
            href=${region.icon}
            x=${region.x + width * 0.2}
            y=${region.y + height * 0.15}
            width=${width * 0.6}
            height=${height * 0.6}
            preserveAspectRatio="xMidYMid meet"
          />`
        : ""}
      <text
        x=${region.x + width / 2}
        y=${region.icon
          ? region.y + height * 0.9
          : region.y + height / 2 + (region.size ?? 12) / 3}
        text-anchor="middle"
        style=${ink}
      >${region.text ?? ""}</text>
    </g>
  `;
}
