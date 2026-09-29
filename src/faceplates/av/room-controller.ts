/**
 * A generic AV room controller panel.
 *
 * Deliberately not a copy of any one Crestron faceplate. A CIP system has
 * no standard join map — a room's joins mean whatever the programmer
 * decided — so mirroring a specific touch panel would be mirroring one
 * site's program. What every AV room does have is the same handful of
 * things an operator wants: is the display on, what is it showing, how
 * loud is it, is it muted, and is anything wrong.
 *
 * The roles are named for those, and the bridge binds whichever joins
 * carry them.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const W = 420;
const H = 300;

const artNode = svg`
  <rect x="0" y="0" width=${W} height=${H} rx="10" fill="#101216" />
  <rect x="0" y="0" width=${W} height="34" rx="10" fill="#1a1e24" />
  <rect x="0" y="24" width=${W} height="10" fill="#1a1e24" />
  <text x="16" y="23" fill="#8b93a1" font-size="12" letter-spacing="1.5"
        font-family="inherit">ROOM CONTROL</text>

  <!-- Source display: the big pane, as on a panel's home page. -->
  <rect x="16" y="48" width=${W - 32} height="64" rx="6"
        fill="#0a0c0f" stroke="#252a31" />

  <!-- Level meter well -->
  <rect x="16" y="126" width=${W - 32} height="58" rx="6"
        fill="#14171c" stroke="#252a31" />
  <text x="28" y="146" fill="#8b93a1" font-size="11" letter-spacing="1.2"
        font-family="inherit">VOLUME</text>

  <!-- Status row -->
  <rect x="16" y="196" width=${W - 32} height="46" rx="6"
        fill="#14171c" stroke="#252a31" />
`;

const regions: Region[] = [
  // What is on screen. An empty placeholder, not dashes: a panel with no
  // source selected shows nothing rather than "--".
  { id: "source", role: "source", kind: "text",
    x: 32, y: 76, w: W - 64, align: "start", size: 20, placeholder: "" },
  { id: "source_label", role: "", kind: "text", text: "SOURCE",
    x: 32, y: 100, w: 120, align: "start", size: 11 },

  { id: "display_lamp", role: "display_power", kind: "lamp",
    x: W - 46, y: 58, w: 14, on: "#3ddc84", off: "#16281d" },
  { id: "power", role: "", kind: "button", text: "DISPLAY",
    action: "power_toggle", target: "display_power",
    x: W - 132, y: 86, w: 100, h: 22 },

  { id: "vol_bar", role: "volume", kind: "bar",
    x: 28, y: 154, w: 210, h: 12, min: 0, max: 100 },
  { id: "vol_text", role: "volume", kind: "text",
    x: 250, y: 165, w: 60, align: "start", decimals: 0, size: 18 },
  { id: "vol_down", role: "", kind: "button", text: "−",
    action: "level_down", target: "volume",
    x: 316, y: 148, w: 40, h: 24 },
  { id: "vol_up", role: "", kind: "button", text: "+",
    action: "level_up", target: "volume",
    x: 360, y: 148, w: 40, h: 24 },

  { id: "mute_lamp", role: "mute", kind: "lamp",
    x: 30, y: 210, w: 12, on: "#ef4444", off: "#2a1717" },
  { id: "mute", role: "", kind: "button", text: "MUTE",
    action: "mute_toggle", target: "mute",
    x: 52, y: 206, w: 64, h: 24 },

  { id: "mic_lamp", role: "mic_live", kind: "lamp", label: "MIC",
    x: 150, y: 210, w: 12, on: "#f59e0b", off: "#2a2317" },
  { id: "fault_lamp", role: "fault", kind: "lamp", label: "FAULT",
    x: 220, y: 210, w: 12, on: "#ef4444", off: "#2a1717" },

  // Whether the room's processor is talking to us at all. Everything above
  // is stale if this is dark, which is worth showing on its face.
  { id: "online_lamp", role: "online", kind: "lamp", label: "ONLINE",
    x: 300, y: 210, w: 12, on: "#3ddc84", off: "#16281d" },
];

export const ROOM_CONTROLLER: Faceplate = {
  id: "av-room-controller",
  name: "AV Room Controller",
  card: "room-controller-card",
  render: "svg",
  display: "negative",
  size: [W, H],
  artNode,
  regions,
  description:
    "A room at a glance: source, display power, volume and mute, with mic, "
    + "fault and online indicators. Bind whichever joins carry them.",
};
