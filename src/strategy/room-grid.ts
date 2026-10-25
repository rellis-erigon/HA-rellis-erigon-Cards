/**
 * room-grid-card — a corridor of rooms that keeps its panels readable.
 *
 * The rooms of a wing in room-number order. Home Assistant's own grid card
 * holds a fixed number of columns, and a controller panel is a drawing
 * that scales with its card — two of them side by side in a narrow window
 * came out under 200px wide, with lettering a few pixels high.
 *
 * So the columns follow the space: as many as fit at `min_width` each, up
 * to `columns` — three on a desk screen, two on a tablet, one on a phone.
 * The cells keep their reading order whatever the count.
 *
 *   type: custom:room-grid-card
 *   columns: 3
 *   min_width: 340
 *   cells: [card, card, card, ...]   # null is a gap, dropped below `columns`
 *
 * Written for the site-floors strategy, which generates it, and shipped in
 * that bundle so a dashboard using the strategy needs no extra resource.
 */

interface RoomGridConfig {
  type: string;
  columns?: number;
  min_width?: number;
  cells?: (Record<string, unknown> | null)[];
}

interface CardElement extends HTMLElement {
  hass?: unknown;
}

interface CardHelpers {
  createCardElement(config: Record<string, unknown>): CardElement;
}

const GAP = 8;

/** How many columns fit at `minWidth` each, from one up to `columns`. */
export function columnsFor(width: number, columns: number, minWidth: number): number {
  let fit = 1;
  for (let n = 2; n <= columns; n++) {
    if (width >= n * minWidth + (n - 1) * GAP) fit = n;
  }
  return fit;
}

class RoomGridCard extends HTMLElement {
  private _config: RoomGridConfig = { type: "" };
  private _hass: unknown;
  private _cells: (CardElement | null)[] = [];
  private _grid?: HTMLDivElement;
  private _observer?: ResizeObserver;
  private _built = 0;

  setConfig(config: RoomGridConfig): void {
    if (!Array.isArray(config?.cells)) {
      throw new Error("room-grid-card needs `cells`");
    }
    this._config = config;
    void this._build();
  }

  set hass(hass: unknown) {
    this._hass = hass;
    for (const cell of this._cells) if (cell) cell.hass = hass;
  }

  connectedCallback(): void {
    if (!this._observer && typeof ResizeObserver !== "undefined") {
      this._observer = new ResizeObserver(() => this._fit());
      this._observer.observe(this);
    }
    this._fit();
  }

  disconnectedCallback(): void {
    this._observer?.disconnect();
    this._observer = undefined;
  }

  /** Rows of panels are tall; this keeps a masonry view from guessing low. */
  getCardSize(): number {
    const columns = Math.max(1, this._config.columns ?? 2);
    return Math.ceil((this._config.cells ?? []).length / columns) * 9;
  }

  /** In a sections view, take the full width of the section. */
  getGridOptions(): Record<string, unknown> {
    return { columns: "full" };
  }

  private async _build(): Promise<void> {
    const build = ++this._built;
    const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
    const helpers = await (window as unknown as {
      loadCardHelpers(): Promise<CardHelpers>;
    }).loadCardHelpers();
    if (build !== this._built) return;      // a newer config arrived

    root.innerHTML = `<style>
      :host { display: block; }
      .grid { display: grid; gap: ${GAP}px; }
      .grid > * { min-width: 0; }
      .grid.single > .gap { display: none; }
    </style><div class="grid"></div>`;
    this._grid = root.querySelector(".grid") as HTMLDivElement;

    this._cells = (this._config.cells ?? []).map((config) => {
      if (!config) {
        const gap = document.createElement("div");
        gap.className = "gap";
        this._grid!.appendChild(gap);
        return null;
      }
      let element = helpers.createCardElement(config);
      // A custom card not yet defined comes back as a placeholder that
      // asks to be rebuilt once it is; swap it for the real one.
      const rebuild = (event: Event) => {
        event.stopPropagation();
        const fresh = helpers.createCardElement(config);
        fresh.addEventListener("ll-rebuild", rebuild);
        if (this._hass) fresh.hass = this._hass;
        element.replaceWith(fresh);
        const index = this._cells.indexOf(element);
        if (index >= 0) this._cells[index] = fresh;
        element = fresh;
      };
      element.addEventListener("ll-rebuild", rebuild);
      if (this._hass) element.hass = this._hass;
      this._grid!.appendChild(element);
      return element;
    });
    this._fit();
  }

  private _fit(): void {
    if (!this._grid) return;
    const columns = Math.max(1, this._config.columns ?? 2);
    const shown = columnsFor(
      this.clientWidth || 0, columns, this._config.min_width ?? 340);
    this._grid.style.gridTemplateColumns = `repeat(${shown}, minmax(0, 1fr))`;
    this._grid.classList.toggle("single", shown < columns);
  }
}

if (!customElements.get("room-grid-card")) {
  customElements.define("room-grid-card", RoomGridCard);
}
