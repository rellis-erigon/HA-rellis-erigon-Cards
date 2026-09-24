/**
 * Shared types for the faceplate engine.
 *
 * A faceplate is data, not code: artwork plus a list of regions, each of
 * which names a *role* rather than an entity. Adding a meter model should
 * be a new data file, never a new card.
 */

export type RenderMode = "svg" | "css" | "image";

/** What a region draws. Each kind is implemented once, in faceplate.ts. */
export type RegionKind =
  | "text"
  | "lamp"
  | "bar"
  | "button"
  | "ring"
  | "odometer"
  | "needle";

export interface Region {
  id: string;
  /** The role this region shows, e.g. "energy_total". Never an entity id. */
  role: string;
  kind: RegionKind;
  /** Position in the faceplate's own coordinate space, not pixels. */
  x: number;
  y: number;
  w?: number;
  h?: number;
  /** Which page of a multi-page display this belongs to. Omit for always-on. */
  page?: string;
  /** printf-ish hint: decimals and a unit suffix. */
  decimals?: number;
  unit?: string;
  /** text only */
  label?: string;
  /**
   * What a text region prints. "value" is the default; "unit" prints the
   * bound entity's unit of measurement.
   *
   * This exists so a faceplate does not have to paint a unit into its
   * artwork. The photographed register says U.S. GALLONS; a meter bound to
   * it here reads litres or cubic metres, and a card that insists on
   * gallons would be lying about the number beside it.
   */
  show?: "value" | "unit";
  /**
   * What a text region shows when nothing is bound. Defaults to "--", which
   * is right for a numeric readout — an unlit segment is honest. Set it to
   * an empty string for an annunciator, where real hardware shows nothing
   * at all rather than dashes.
   */
  placeholder?: string;
  align?: "start" | "middle" | "end";
  size?: number;
  /** lamp only */
  on?: string;
  off?: string;
  /** bar only */
  max?: number;
  /** ring only: stroke width, and the radius measured from x,y as centre. */
  r?: number;
  stroke?: number;
  /**
   * odometer and needle: the decade this region reads.
   *
   * A mechanical register shows one cumulative total across an odometer and
   * several sweep dials of decreasing significance. Every one of those
   * regions therefore takes the *same role* and differs only in scale — the
   * odometer at 100, then dials at 10, 1, 0.1 and so on.
   */
  scale?: number;
  /** odometer only: how many digit cells. */
  digits?: number;
  /** odometer only: how many trailing cells are the highlighted decade. */
  redDigits?: number;
  /** button only */
  action?:
    | "page"
    | "next_page"
    | "prev_page"
    | "temp_up"
    | "temp_down"
    | "power_toggle"
    | "mode_cycle"
    | "fan_cycle";
  /** For action "page": which page to show. */
  target?: string;
  text?: string;
}

/** A choice a faceplate exposes, shown in the card editor. */
export interface FaceplateOption {
  key: string;
  label: string;
  type: "number";
  min: number;
  max: number;
  default: number;
  help?: string;
}

export interface Faceplate {
  id: string;
  name: string;
  /** Which card this faceplate belongs to. */
  card: string;
  render: RenderMode;
  /**
   * Which way round the display reads. "positive" is dark text on a pale
   * backlight, as most LCD meters are; "negative" is light text on a dark
   * face, as VFD and OLED units are. Getting this wrong renders the values
   * dark-on-dark, which is exactly what happened to the first generic
   * faceplate.
   */
  display?: "positive" | "negative";
  /** Viewbox the regions are positioned within. */
  size: [number, number];
  /** Chassis artwork. A URL for "image" mode. */
  art?: string;
  /**
   * Pre-parsed chassis markup for "svg" mode. A lit SVGTemplateResult, so
   * the artwork is authored as code and never passed through unsafeSVG —
   * these bundles are shipped to browsers and should carry no HTML sink.
   */
  artNode?: unknown;
  regions: Region[];
  pages?: string[];
  /** Shown in the picker and the README. */
  description?: string;
  /**
   * Options this faceplate takes. A pump set is not one drawing — the
   * layout depends on how many pumps are in it — so a faceplate can declare
   * choices and build itself from them.
   */
  options?: FaceplateOption[];
  /**
   * Produce the artwork and regions for a set of option values. Faceplates
   * without options leave this out and carry fixed artwork instead.
   */
  build?: (values: Record<string, number>) => Pick<
    Faceplate,
    "size" | "artNode" | "regions"
  >;
  /** Manufacturer and model this emulates, for attribution. */
  emulates?: string;
}

/** Minimal shape of the bits of Home Assistant a card touches. */
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    device_class?: string;
    [key: string]: unknown;
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    data: Record<string, unknown>
  ): Promise<unknown>;
}

export interface FaceplateCardConfig {
  type: string;
  faceplate?: string;
  name?: string;
  /** Explicit role → entity mapping. Wins over everything else. */
  entities?: Record<string, string>;
  /** Resolve roles from one device's entities. */
  device?: string;
  /** Start on this page. */
  page?: string;
  /** A climate entity to read every role from, for HVAC faceplates. */
  climate?: string;
  /** Values for the faceplate's declared options. */
  options?: Record<string, number>;
}

/** A role resolved to something renderable, or explicitly to nothing. */
export interface Reading {
  entityId?: string;
  /** Numeric value where the state parses as a number. */
  value?: number;
  /** Raw state, always present when an entity was found. */
  state?: string;
  unit?: string;
  /** True when no entity is bound, or the entity is unavailable. */
  dark: boolean;
  /** True when the entity exists but is unavailable or unknown. */
  stale: boolean;
}
