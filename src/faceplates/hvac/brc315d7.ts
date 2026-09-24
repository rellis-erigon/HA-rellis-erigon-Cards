/**
 * Daikin BRC315D7 schedule controller faceplate.
 *
 * Drawn from photographs of the unit with its cover closed, which is how it
 * looks on a wall: a cream square body with ventilation slots at the top
 * left, the wordmark beside them, an ON/OFF key and indicator at the top
 * right, a wide segmented LCD across the upper third, and the blank hinged
 * cover filling the lower half.
 *
 * The keypad behind that cover is not drawn. It carries two dozen small
 * keys for commissioning and scheduling, none of which a dashboard should
 * be offering, and showing it open would misrepresent the unit's resting
 * appearance.
 */
import { svg } from "lit";
import { Faceplate } from "../../core/types";
const W = 400;
const H = 400;
const LX = 30;
const LY = 92;
const LW = 340;
const LH = 96;
const CHASSIS = svg`
  <defs>
    <linearGradient id="brc315-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f6f4ee" />
      <stop offset="100%" stop-color="#e6e2d8" />
    </linearGradient>
    <linearGradient id="brc315-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cfd8bf" />
      <stop offset="100%" stop-color="#bcc7aa" />
    </linearGradient>
    <linearGradient id="brc315-cover" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8f6f1" />
      <stop offset="100%" stop-color="#e9e5db" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="url(#brc315-body)" />
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="11"
        fill="none" stroke="#d6d1c5" stroke-width="1.5" />
  <!-- Ventilation slots -->
  <g fill="#cfcabd">
    ${[0, 1, 2, 3, 4, 5].map((i) => svg`<rect x="${34 + i * 9}" y="26" width="4" height="22" rx="2" />`)}
  </g>
  <!-- Wordmark -->
  <g transform="translate(34 62)">
    <path d="M0 0 L12 0 L6 10 Z" fill="#3a4046" />
    <text class="brc315-brand" x="17" y="9">DAIKIN</text>
  </g>
  <!-- ON/OFF cluster, top right -->
  <g transform="translate(300 34)" stroke="#3a4046" stroke-width="1.6" fill="none">
    <circle cx="6" cy="8" r="6" />
    <line x1="6" y1="0" x2="6" y2="7" />
  </g>
  <text class="brc315-onoff" x="318" y="44">ON/OFF</text>
  <circle cx="246" cy="66" r="5" fill="#6d7a63" />
  <rect x="290" y="58" width="72" height="16" rx="8" fill="#f2d98a" stroke="#d9bf6d" stroke-width="1" />
  <!-- Display -->
  <rect x="${LX - 3}" y="${LY - 3}" width="${LW + 6}" height="${LH + 6}" rx="3" fill="#9aa48d" />
  <rect x="${LX}" y="${LY}" width="${LW}" height="${LH}" fill="url(#brc315-lcd)" />
  <!-- Schedule ring, left of the display -->
  <g transform="translate(${LX + 44} ${LY + 52})">
    <circle cx="0" cy="0" r="30" fill="none" stroke="#7f8a74" stroke-width="1.4" />
    ${[0, 3, 6, 9, 12, 15, 18, 21].map((hour) => {
      const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * 37;
      const y = Math.sin(angle) * 37 + 3;
      return svg`<text class="brc315-ring" x="${x}" y="${y}" text-anchor="middle">${hour}</text>`;
    })}
    <path d="M-9 -4 a7 7 0 1 0 7 8 a9 9 0 0 1 -7 -8 z" fill="#3d4838" />
    <circle cx="8" cy="6" r="5" fill="none" stroke="#3d4838" stroke-width="1.4" />
  </g>
  <!-- Divider before the temperature block -->
  <line x1="${LX + 208}" y1="${LY + 6}" x2="${LX + 208}" y2="${LY + LH - 6}"
        stroke="#8d9782" stroke-width="1.2" />
  <!-- Mode icon strip, right edge -->
  <g class="brc315-icons">
    <rect x="${LX + 282}" y="${LY + 10}" width="18" height="14" rx="2" fill="none"
          stroke="#3d4838" stroke-width="1.2" />
    <text class="brc315-icon" x="${LX + 291}" y="${LY + 21}" text-anchor="middle">A</text>
    <text class="brc315-icon" x="${LX + 314}" y="${LY + 22}">&#10052;</text>
    <text class="brc315-icon" x="${LX + 314}" y="${LY + 48}">&#9788;</text>
    <text class="brc315-icon" x="${LX + 291}" y="${LY + 48}">&#9832;</text>
  </g>
`;
export const BRC315D7: Faceplate = {
  id: "daikin-brc315d7",
  name: "Daikin BRC315D7",
  description:
    "Schedule controller, cover closed: wide segmented display with timer rows, temperature and mode icons.",
  emulates: "Daikin BRC315D7 schedule remote controller",
  card: "hvac-controller-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode: CHASSIS,
  regions: [
    { id: "hdr", role: "", kind: "text", text: "ONETIME  DAILY  TIMER",
      x: LX + 84, y: LY + 2, w: 160, align: "start", size: 10 },
    // Timer rows, as the unit lays them out.
    { id: "t1", role: "", kind: "text", text: "--:--",
      x: LX + 92, y: LY + 22, w: 108, align: "middle", size: 22 },
    { id: "t2", role: "", kind: "text", text: "--:--",
      x: LX + 92, y: LY + 58, w: 108, align: "middle", size: 22 },
    // Temperature block.
    { id: "sp", role: "setpoint", kind: "text",
      x: LX + 214, y: LY + 14, w: 64, align: "middle", decimals: 0, size: 38 },
    { id: "spunit", role: "", kind: "text", text: "°C",
      x: LX + 276, y: LY + 38, w: 20, align: "start", size: 12 },
    { id: "room", role: "room_temp", kind: "text",
      x: LX + 214, y: LY + 62, w: 64, align: "middle", label: "",
      decimals: 0, size: 16 },
    { id: "mode", role: "hvac_mode", kind: "text",
      x: LX + 214, y: LY + 80, w: 120, align: "start", size: 11 },
    // The ON/OFF key is the only control on the closed face.
    { id: "k-power", role: "", kind: "button",
      x: 290, y: 56, w: 72, h: 20, text: "", action: "power_toggle" },
  ],
};
