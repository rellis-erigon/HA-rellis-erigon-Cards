/**
 * Following a change on a climate entity until the unit confirms it.
 *
 * Pressing a key sends a request; it does not change the unit. So a card
 * says what it sent, then waits for the entity to show it, and only then
 * says it is done — or says plainly that it was refused or never took.
 *
 * An integration can say more than the state alone. The D-BACS one puts
 * `pending_changes` (written, not yet read back from the unit) and
 * `last_change` (how the newest one ended: confirmed, not_confirmed or
 * refused) on its climate entity; where those are present they decide.
 * That matters for the setpoint, which an integration may show the moment
 * it is written, before the unit has accepted anything. Any other climate
 * entity is judged on its state: the change is confirmed when the entity
 * reports what was asked for.
 */

export type Phase = "sending" | "held" | "waiting" | "confirmed" | "failed";

/** Settings by Home Assistant's own climate names. */
export type Setting = "temperature" | "hvac_mode" | "fan_mode" | "power" | "swing_mode";

export interface Change {
  /** What the change is to, for people: "Mode", "Cool". */
  label: string;
  target: string;
  /** Settings whose news counts for this change. A mode change on a unit
   * that is off also switches it on, so it waits for both. */
  settings: Setting[];
  /** Whether the entity now shows what was asked for. */
  want: (state: ClimateState) => boolean;
  /** When it was asked for, ms since the epoch. */
  at: number;
  /** Set once the service call has returned or failed. */
  sent?: boolean;
  refused?: string;
}

export interface ClimateState {
  state: string;
  attributes: Record<string, unknown>;
}

export interface Assessment {
  phase: Phase;
  /** One line saying where the change stands. */
  text: string;
}

interface Pending {
  setting?: string;
  value?: unknown;
  state?: string;
}

interface LastChange {
  setting?: string;
  value?: unknown;
  result?: string;
  reported?: unknown;
  reason?: string;
  at?: string;
}

/** How long to wait for a unit with no confirmation of its own. Two of the
 * integration's sweeps and a margin; it settles sooner when it can. */
export const GIVE_UP_MS = 5 * 60 * 1000;

const shown = (value: unknown): string =>
  value === null || value === undefined || value === ""
    ? "nothing"
    : String(value).replace(/_/g, " ");

export function assess(
  change: Change,
  entity: ClimateState | undefined,
  now: number
): Assessment {
  const asked = `${change.label} → ${change.target}`;
  if (change.refused !== undefined) {
    return { phase: "failed", text: `${asked} was not sent: ${change.refused}` };
  }
  if (!change.sent) {
    return { phase: "sending", text: `Sending ${asked}…` };
  }
  if (!entity) {
    return { phase: "failed", text: `${asked}: the unit is not reporting.` };
  }
  const attrs = entity.attributes ?? {};
  const mine = (setting?: string) =>
    !!setting && (change.settings as string[]).includes(setting);

  // How it ended, if the integration has said and it is about this change.
  const last = attrs.last_change as LastChange | undefined;
  const lastAt = last?.at ? Date.parse(last.at) : NaN;
  const lastIsOurs = !!last && mine(last.setting)
    && Number.isFinite(lastAt) && lastAt >= change.at - 2000;
  if (lastIsOurs && last!.result === "refused") {
    return { phase: "failed",
             text: `${asked} was refused${last!.reason ? `: ${last!.reason}` : "."}` };
  }
  if (lastIsOurs && last!.result === "not_confirmed") {
    return { phase: "failed",
             text: `${asked} was sent but not confirmed: the unit still reports `
               + `${shown(last!.reported)}.` };
  }

  const pending = ((attrs.pending_changes as Pending[] | undefined) ?? [])
    .filter((p) => mine(p.setting));
  if (pending.some((p) => p.state === "held")) {
    return { phase: "held",
             text: `${asked} queued: the unit takes one change a minute per `
               + "setting, so it goes in a moment." };
  }
  if (pending.length) {
    return { phase: "waiting", text: `${asked} sent; waiting for the unit to confirm…` };
  }

  if (change.want(entity)) {
    return { phase: "confirmed", text: `${asked} confirmed by the unit.` };
  }
  if (now - change.at > GIVE_UP_MS) {
    return { phase: "failed",
             text: `${asked} was sent but the unit has not confirmed it after `
               + `${Math.round(GIVE_UP_MS / 60000)} minutes.` };
  }
  return { phase: "waiting", text: `${asked} sent; waiting for the unit to confirm…` };
}
