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
  onAction: (region: Region) => void;
}

/** Regions on the current page, plus those pinned to every page. */
function visibleRegions(faceplate: Faceplate, page: string): Region[] {
  return faceplate.regions.filter((r) => !r.page || r.page === page);
}

export function renderFaceplate(ctx: RenderContext): TemplateResult {
  const [width, height] = ctx.faceplate.size;
  const regions = visibleRegions(ctx.faceplate, ctx.page);

  return html`
    <svg
      class="faceplate display-${ctx.faceplate.display ?? "positive"}"
      viewBox="0 0 ${width} ${height}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label=${ctx.faceplate.name}
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
      return barRegion(region, reading);
    case "ring":
      return ringRegion(region, reading);
    case "odometer":
      return odometerRegion(region, reading);
    case "needle":
      return needleRegion(region, reading);
    case "button":
      return buttonRegion(ctx, region);
  }
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
    >${value}</text>
  `;
}

function lampRegion(region: Region, reading: Reading): SVGTemplateResult {
  // A lamp is lit for a truthy state and dark otherwise. Unbound is dark
  // too — an unlit lamp is honest and looks like real hardware with
  // nothing to report, where a hidden one looks like a complete card.
  // Numeric states are compared as numbers: Niagara exports a fault history
  // as "0.0", which a string comparison against "0" would read as a fault.
  const state = reading.state?.trim() ?? "";
  const number = state === "" ? NaN : Number(state);
  const lit =
    !reading.dark &&
    reading.state !== undefined &&
    (Number.isFinite(number)
      ? number !== 0
      : !["off", "false", "normal", "ok"].includes(state.toLowerCase()));
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

function barRegion(region: Region, reading: Reading): SVGTemplateResult {
  const width = region.w ?? 100;
  const height = region.h ?? 10;
  const max = region.max ?? 100;
  const fraction =
    reading.dark || reading.value === undefined
      ? 0
      : Math.max(0, Math.min(1, reading.value / max));
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

function buttonRegion(ctx: RenderContext, region: Region): SVGTemplateResult {
  const width = region.w ?? 44;
  const height = region.h ?? 26;
  return svg`
    <g class="button" @click=${() => ctx.onAction(region)} role="button" tabindex="0">
      <rect x=${region.x} y=${region.y} width=${width} height=${height} rx="4" />
      <text
        x=${region.x + width / 2}
        y=${region.y + height / 2 + 4}
        text-anchor="middle"
      >${region.text ?? ""}</text>
    </g>
  `;
}
