# HA Cards — plan

Custom Lovelace cards for the three bridge integrations on this estate:
Niagara (BMS), Crestron (AV control) and Q-SYS (audio). The point of them is
that a card should look and behave like the thing it represents — a Daikin
wall controller, a Schneider PM2200, a Q-SYS zone strip — rather than like a
list of entities.

Status: planning. Nothing here is built yet.

---

## 1. What already exists

| Repo | State | Verdict |
|------|-------|---------|
| `HA-Dakin-Controller-Card-` | Lit + TypeScript + Rollup, one 663-line card, CSS-drawn. Four controller models declared, but they differ only in *capabilities* (modes, fan speeds, swing) — visually identical. | Good bones. Becomes the HVAC card and donates the build setup. |
| `HA-Powercard` | v2.1.1 distribution-board visualiser. **No source in the repo** — only a 53 KB minified `dist/ha-powercard.js`. | Useful behaviour, unmaintainable as-is. See §7. |

Neither yet does the thing being asked for: a *selectable faceplate* that
mirrors a specific physical unit.

## 2. Decisions taken

- **One repository, many cards**, grouped by category. One HACS entry, one
  release.
- **Selectable install**: one bundle per card, so a dashboard only loads what
  it uses, plus an optional `all-cards.js` for convenience. HACS copies the
  whole release into `www/community/<repo>/`; the selection happens when you
  add resources.
- **All three rendering modes supported** — SVG, CSS and photographic — as a
  per-faceplate choice rather than a project-wide one. See §4.
- **Full branding and logos**, with ownership acknowledged in the release
  notes and a `TRADEMARKS.md` stating that all product names, logos and
  marks are the property of their respective owners and that these cards are
  an independent, unaffiliated emulation. Logo assets live under
  `assets/brand/` so a mark-free build is one directory away. Noted once and
  accepted: attribution reduces exposure rather than removing it, and using a
  model name factually sits on far safer ground than reproducing a logo.
- **Requests for new cards and new models** go through GitHub issue
  templates. See §8.

## 3. Repository layout

```
ha-cards/
  package.json            one workspace, one lockfile
  rollup.config.mjs       one entry per card, plus all-cards
  TRADEMARKS.md
  src/
    core/                 shared, not shipped alone
      faceplate.ts        the rendering engine (§4)
      bind.ts             entity-role binding (§5)
      editor/             shared visual-editor widgets
      theme.ts            dark/light, HA theme variables
    cards/
      meter/              bms-meter-card
      hvac/               hvac-controller-card  (from the Daikin card)
      board/              distribution-board-card (from HA-Powercard)
      plant/              pump-system-card, tank-card
      fire/               fire-panel-card
      av/                 qsys-zone-card, crestron-room-card
  faceplates/
    meter/
      schneider-pm2200/
        faceplate.json    regions, roles, render mode
        face.svg
      circutor-cvm-e3-mini/
    hvac/
      daikin-brc1e63/
  assets/
    brand/                logos, kept separable on purpose
  dist/                   built bundles, one per card
```

Rationale for the split: `core/` is where the effort compounds. Every card
gets the same faceplate engine, the same editor widgets and the same theming,
so the second card costs a fraction of the first.

## 4. The faceplate engine

A faceplate is **data, not code**. Adding the Circutor CVM-E3-Mini should be
a new directory, not a new TypeScript file.

```jsonc
{
  "id": "schneider-pm2200",
  "name": "PM2200-style 3-phase meter",
  "render": "svg",            // svg | css | image
  "art": "face.svg",
  "aspect": [420, 260],
  "regions": [
    { "id": "lcd_line1", "role": "energy_total",  "kind": "text",
      "x": 40, "y": 60, "w": 200, "h": 28, "format": "0.0 kWh" },
    { "id": "led_alarm", "role": "fault",         "kind": "lamp",
      "x": 330, "y": 40, "r": 6, "on": "#e33", "off": "#411" },
    { "id": "btn_page",  "role": "page",          "kind": "button",
      "x": 300, "y": 200, "w": 40, "h": 24, "action": "cycle_page" }
  ],
  "pages": ["volts", "amps", "power", "energy"]
}
```

**Region kinds**: `text`, `lamp`, `bargraph`, `sevenseg`, `needle`, `button`,
`slider`. Each kind is implemented once in `core/faceplate.ts` and reused by
every faceplate of every card.

**Render modes**, chosen per faceplate:

- `svg` — the default. Scales, themes, diffs in git, no binary weight.
- `css` — for simple units where SVG is overkill; what the Daikin card does
  today.
- `image` — a photograph or render with regions positioned over it. Best
  likeness, at the cost of size and fixed resolution. Regions are expressed
  in the same coordinate space either way, so a faceplate can start as
  `image` and become `svg` later without touching the card.

That last point is the reason for supporting all three: it lets a model ship
quickly as a photo and be redrawn properly later, with no change to how it
is configured or bound.

## 5. Binding entities to regions

A region names a **role**, never an entity. The card resolves roles to
entities in three ways, in order:

1. **Explicit** — the user maps them in the card config or visual editor.
2. **By slot** — Niagara devices are typed against templates whose slots are
   already named `energy_total`, `pump1_speed`, `panel_fault`. Where a role
   matches a slot key, it binds itself. This is the payoff for the template
   work already done.
3. **By device** — given a device id, take entities whose `device_class` and
   `state_class` fit the role.

```yaml
type: custom:bms-meter-card
faceplate: schneider-pm2200
device: sensor.db_l3_ke_power_metertotal   # or entities: {energy_total: ...}
```

Unbound roles render dark rather than disappearing — an unlit segment is
honest and looks like real hardware with nothing to show.

## 6. Card catalogue

Ordered by what earns its keep first on this estate.

### Power and energy
| Card | Faceplates at launch | Notes |
|------|---------------------|-------|
| `bms-meter-card` | Schneider PM2200, Circutor CVM-E3-Mini, generic 3-phase | Pages for volts / amps / power / energy, as the real units do |
| `distribution-board-card` | — | Rebuild of HA-Powercard (§7) |
| `ups-card` | Generic 3-phase UPS | Maps to the existing `ups_3phase` template |

### HVAC
| Card | Faceplates at launch | Notes |
|------|---------------------|-------|
| `hvac-controller-card` | Daikin BRC1E63, then BRC1H63K, BRC2E61, BRC315D7 | Existing card, regionalised. Real button behaviour, not just a display |
| `ahu-card` | Generic AHU mimic | Fan, valves, dampers, temperatures in a plant diagram |
| `room-card` | Wall sensor / thermostat | For the `room_sensor` and `fcu` templates |

### Plant and hydraulics
| Card | Faceplates at launch | Notes |
|------|---------------------|-------|
| `pump-system-card` | Triplex set mimic | Three pumps, pressure, setpoint — maps to `pump_system_3` |
| `tank-card` | Level gauge | DCW tanks |
| `water-meter-card` | Mechanical multi-jet register | See below |

### Water metering — a family, not one face

Water registers vary more than electricity meters do, and a site has
several kinds side by side. All ride on `bms-meter-card`.

| Faceplate | Style | Roles |
|---|---|---|
| `multijet-water-register` | **Built.** Mechanical odometer plus sweep dials | `volume_total` |
| `woltmann-register` | Straight-reading bulk register, black m³ digits, red decimals | `volume_total` |
| `lcd-water-meter` | Digital LCD: total, instantaneous flow, battery | `volume_total`, `flow_rate`, `battery` |
| `dial-water-meter` | Circular dial face with a sweep pointer | `volume_total`, `flow_rate` |
| `compound-meter` | Two registers, main and bypass, on one body | `volume_total`, `bypass_total`, `flow_rate` |
| `smart-water-meter` | LCD with leak/burst/reverse-flow annunciators | `volume_total`, `flow_rate`, `battery`, `alarm`, `reverse_flow` |

Needs new role patterns for `flow_rate`, `battery` and the alarm flags —
`ROLE_PATTERNS` currently stops at `volume_total`.

### Plant mimics — `plant-equipment-card`

Ductwork and pipework have a direction, and a mimic that points the wrong
way is worse than no mimic: someone reads it as the airflow. So the fan
faceplates differ by where the duct enters, not by a mirrored icon.

| Faceplate | What it draws | Roles |
|---|---|---|
| `supply-fan-top` | Supply fan, duct entering from above | `run`, `fault`, `speed`, `flow`, `filter_dp` |
| `supply-fan-left` | Supply fan, duct entering from the left | same |
| `supply-fan-right` | Supply fan, duct entering from the right | same |
| `exhaust-fan` | Exhaust fan, discharge to atmosphere | `run`, `fault`, `speed`, `flow` |
| `hot-water-unit` | Calorifier with primary/secondary, **1–2 units** | `flow_temp`, `return_temp`, `setpoint`, `tank_temp`, `unitN_run`, `unitN_fault` |
| `circulation-pump-set` | Circulator set, **1–4 pumps**, hot or cold service | `pumpN_run`, `pumpN_fault`, `flow_temp`, `return_temp`, `service` |

`hot-water-unit` and `circulation-pump-set` are parametric, like the
booster set: a duty/standby pair and a single unit are the same drawing at
different widths. `service` on the circulator set switches the pipework
colour between hot and cold rather than needing two faceplates.

### Fire and safety
| Card | Faceplates at launch | Notes |
|------|---------------------|-------|
| `fire-panel-card` | AMPAC FireFinder, then Vigilant / Notifier / Simplex | **Monitoring only.** Must be visually unmistakable as a BMS mirror, not a fire panel — see §9 |

### AV
| Card | Faceplates at launch | Notes |
|------|---------------------|-------|
| `audio-zone-card` | Q-SYS zone rack | **Built.** Level, mute and trim, 1–16 strips in one rack |
| `room-controller-card` | AV room panel | **Built.** Source, display, volume, mute, mic/fault/online |
| `audio-mixer-card` | Channel strip, matrix, zone master | **To build.** The full mixer domain — see below |

#### `audio-mixer-card` — the abstract mixer domain

`audio-zone-card` covers the thin slice the Q-SYS bridge exposes today: a
gain and a mute per zone. A real DSP is much more than that, and the same
abstraction covers Q-SYS, Crestron and Biamp because they all model the
same objects. The card should be built against this domain rather than
against any one backend.

| Functional domain | Purpose | HA platform | Unique ID pattern | Value / type | Backend mapping |
|---|---|---|---|---|---|
| Channel Level | Primary fader | `number` (or `media_player`) | `number.mixer_{ch}_gain` | Float −100.0…+10.0 dB, step 0.5 | Q-SYS `input.{ch}.gain` · Crestron analog join / CIP gain offset · Biamp `set gain {ch}` |
| Channel Mute | Mute input/output/bus | `switch` | `switch.mixer_{ch}_mute` | Boolean | Q-SYS `input.{ch}.mute` · Crestron digital join · Biamp `set mute {ch}` |
| Polarity Invert | 180° phase | `switch` | `switch.mixer_{ch}_polarity` | Boolean | Q-SYS `invert` · Crestron phase-invert join |
| Pan / Balance | L/R placement | `number` | `number.mixer_{ch}_pan` | Float −100 (L)…+100 (R) | Q-SYS `pan` · Crestron pan analog join |
| Crosspoint Gain | Route level In X → Out Y | `number` | `number.mixer_matrix_in{x}_out{y}_gain` | Float −100.0…+10.0 dB | Q-SYS `crosspoint.{x}.{y}.gain` · Crestron matrix crosspoint gain |
| Crosspoint State | Route connect/disconnect | `switch` | `switch.mixer_matrix_in{x}_out{y}_enable` | Boolean | Q-SYS `crosspoint.{x}.{y}.mute` (inverted) · Crestron crosspoint connect join |
| Source Selector | Input feeding an output | `select` | `select.mixer_zone_{z}_source` | Options list | Q-SYS `selector.select` · Crestron analog join / router source select |
| High-Pass Filter | Rumble filter enable | `switch` | `switch.mixer_{ch}_hpf_enable` | Boolean | Q-SYS `hpf.enable` · Crestron HPF on/off join |
| HPF Frequency | Cutoff | `number` | `number.mixer_{ch}_hpf_freq` | Int 20…500 Hz | Q-SYS `hpf.frequency` · Crestron HPF freq join |
| Parametric EQ Band | Band gain | `number` | `number.mixer_{ch}_eq_b{b}_gain` | Float −18.0…+18.0 dB | Q-SYS `band.{b}.gain` · Crestron PEQ gain join |
| Compressor Threshold | Dynamics trigger | `number` | `number.mixer_{ch}_comp_threshold` | Float −60.0…0.0 dB | Q-SYS `comp.threshold` · Crestron comp threshold join |
| Peak Level Meter | Real-time amplitude | `sensor` | `sensor.mixer_{ch}_peak_meter` | Float −100.0…0.0 dBFS, `state_class: measurement` | Q-SYS `meter.peak` · Crestron peak level join |
| Clip Indicator | Overload / digital clip | `binary_sensor` | `binary_sensor.mixer_{ch}_clip` | Boolean, `device_class: problem` | Q-SYS `clip` · Crestron clip digital join |
| Automixer Status | Speech gate open | `binary_sensor` | `binary_sensor.mixer_{ch}_automix_active` | Boolean | Q-SYS `automixer.ch{x}.active` · Crestron gate-open join |
| Scene / Preset | Snapshot recall | `button` / `select` | `button.mixer_scene_{s}_recall` | Momentary / string | Q-SYS `snapshot.{s}.load` · Crestron preset recall join |
| Talkback Mic | Operator talkback | `switch` / `button` | `switch.mixer_talkback_enable` | Momentary / toggle | Q-SYS `talkback.enable` · Crestron talkback mute join |
| Master Zone Output | Room/zone master | `media_player` | `media_player.mixer_zone_{z}` | Volume 0.0…1.0 + mute | Aggregates level, mute and source into one HA entity |

**Notes for whoever builds it.**

- The unique-id column is the *target* shape, not what the bridges emit
  today. Q-SYS currently names entities after the component and control,
  so either the bridge grows a mixer-aware naming mode or the card binds
  by explicit role map. Do not rename existing entities to fit this: that
  breaks every dashboard and statistic already pointing at them.
- **Done since this was written:** the click-to-position fader and the
  source selector, both on `zone-mixer`. A bar with `action: "set_level"`
  takes the click's position from its own bounding box, converts it to the
  region's scale, then clamps to the *entity's* min/max and snaps to its
  step — the drawing's range must never drive a block past its staging.
- Still missing: a **meter** region
  that updates fast enough to be worth calling a meter, a **matrix** region
  for the crosspoint grid, and a fader the user can *drag* rather than
  click. Click-to-position covers most of what dragging would.
  that updates fast enough to be worth calling a meter, a **matrix** region
  for the crosspoint grid, and a **fader** the user can drag rather than
  step. The trim keys on `audio-zone-card` were a deliberate shortcut
  around the last of these.
- A peak meter at a useful refresh rate is a real load question. HA state
  updates are not a metering bus, and 32 channels of dBFS at 10 Hz is not
  something to put on the recorder — those entities want
  `state_class` left off and recorder exclusion, or the card should read
  them over a separate channel.
- `media_player` for the zone master is worth taking seriously: it gets
  volume, mute and source select in the standard HA UI for free, and the
  card becomes the pretty face rather than the only way to use it.


### Done: mechanical water meter register

Built as `multijet-water-register` on `bms-meter-card` rather than a card of
its own — the card only renders faceplates, so a water register needed no new
card, just the two region kinds below. The original note is kept for the
reasoning.

Verified against the arithmetic: a total of 9234.56 puts **00092** in the
odometer and 3 / 4.56 / 5.6 / 6 on the dials, which are exactly the digits
below the odometer's resolution.

The unit is **not** painted on. The photographed register says US GALLONS;
the meters here read litres and cubic metres, so the units line is a region
that prints whatever the bound entity reports.

### Original note: mechanical water meter register

A photograph is in hand of a multi-jet register — brass housing with a hinged
cover, a five-digit odometer with the last digit red and an `x100`
multiplier, "U.S. GALLONS", and four sweep dials beneath marked x0.1, x0.01,
x1 and x10 with red needles.

It needs two region kinds the engine does not yet have:

- **`odometer`** — a digit roll, with the trailing digit styled differently,
  and a multiplier applied to the bound value.
- **`needle`** — a pointer rotating about a centre, mapping a value onto a
  sweep. Already named in §4 as a planned kind; this is the first faceplate
  that would use it.

The interesting part is that a mechanical register displays *one* cumulative
total across an odometer and four dials of decreasing significance. That is a
single role rendered by five regions at different scales, which the region
model handles — each region takes the same role with its own multiplier —
but it is the first case where several regions share one role, so it is
worth building deliberately rather than as a special case.

Unit handling matters here too: the pictured register reads US gallons while
the estate meters read cubic metres and litres. The faceplate should not
silently convert.

## 6a. Choosing the card from the add-on GUI — **done**

Shipped in Niagara 3.12, Q-SYS 0.3 and Crestron 0.3. What actually landed
differs from the sketch below in three ways worth recording:

- The faceplate is stored **per device**, not per template, and the picker
  lives in the device dialog. A template matches equipment of every make,
  so the face cannot belong to the type.
- `faceplates/index.json` publishes each faceplate's **roles**, which the
  sketch did not anticipate. Without them a bridge cannot know what a
  faceplate expects to be handed. It is generated by *running* the
  registry, because a parametric faceplate's roles appear nowhere in its
  source.
- The AV cards are `audio-zone-card` and `room-controller-card`. Q-SYS
  generates one rack for many zones rather than a card per zone: a zone is
  two controls, and sixteen cards of two rows each is not a dashboard.
  Crestron has no group concept at all, so its card is matched from join
  names and hands back what it decided.

The original sketch follows.



The card is picked in the add-on's own Devices view, not only in Lovelace.
This is the part that makes the whole thing usable at estate scale.

**Behaviour.** When a device is typed against a template, the add-on already
knows what it is. It offers the matching card and a **faceplate picker**
defaulted to the most likely model:

| Template | Card offered | Faceplates listed |
|----------|-------------|-------------------|
| `electricity_meter` | `bms-meter-card` | PM2200-style, CVM-E3-Mini-style, generic 3-phase |
| `ups_3phase` | `ups-card` | Generic 3-phase UPS |
| `pump_system_3` | `pump-system-card` | Triplex set |
| `fip` | `fire-panel-card` | AMPAC FireFinder, Vigilant, Notifier, Simplex, generic |
| `ahu` / `fcu` / `room_sensor` | `ahu-card` / `room-card` | Plant mimic, wall sensor |
| anything else | `entities` | — |

So: type a device as an Electricity Meter and the card selector is already
showing the meter faceplates, with one of them selected. Nothing is
auto-applied — the user confirms — but the default is never "choose from 40
cards you have never heard of".

**Mechanism.** Templates already carry a `card:` block whose placeholders are
resolved by `niagara.generate_card`. Two additions:

1. A template gains an optional `card_type:` and `faceplates:` list. Where
   present, the Devices view shows the picker.
2. The chosen faceplate is stored per device alongside its bindings, so
   `generate_card` emits the finished YAML:

```yaml
type: custom:bms-meter-card
faceplate: schneider-pm2200
entities:
  energy_total: sensor.db_l3_ke_power_metertotal
  power_l1: sensor.db_l3_ke_power_active_power_p1
  # ...
```

**The same idea applies to the other two bridges.** The Q-SYS panel can offer
`qsys-zone-card` for a gain component; the Crestron panel can offer
`crestron-room-card` for a set of joins grouped into a room. Both already
have the device/group concept this hangs off.

**Consequence for the engine:** the faceplate list must be discoverable as
data, because the add-on needs to render the picker without importing any
card JavaScript. A small `faceplates/index.json` published with each release,
listing id, name, card and a thumbnail, is enough — the add-on fetches it,
or falls back to a bundled copy when offline.

## 7. What to do about HA-Powercard

The repo ships a minified bundle with no source. Options, in order of
preference:

1. **Rebuild from behaviour.** Treat the existing card as a specification —
   it works and you know what it does — and write it fresh inside the
   monorepo against the faceplate engine. Cleanest, and it gains the shared
   editor and theming.
2. **Recover the source** if it exists on a machine somewhere; import it.
3. **Vendor the bundle** unchanged as a stopgap so nothing breaks while the
   rebuild happens.

Recommend 1, with 3 running alongside until parity is reached. Either way the
old repo should be archived with a pointer, not deleted — the HACS entry is
already out there.

## 8. Requesting a new card or faceplate

Two GitHub issue templates:

- **New faceplate** — model name, manufacturer, a photograph straight on,
  the manual or datasheet if available, which readings appear on which page,
  and what the buttons do.
- **New card** — what the equipment is, which integration provides the
  entities, and a sketch or photo of how it should look.

A faceplate request that arrives with a straight-on photograph and a manual
can usually be turned round quickly; one without either cannot be done at
all, so the template should say so plainly.

## 9. Things to get right

- **The fire panel card is monitoring only.** It mirrors what the BMS sees.
  It must never offer an action, and should carry a standing caption saying
  so. This one deserves care precisely because the faceplates are accurate:
  an AMPAC FireFinder mimic that looks exactly like the real panel is a card
  someone will eventually trust in an emergency. Suggested treatment — the
  faceplate is accurate, but the card carries a permanent unmistakable band
  reading "BMS monitoring — not the fire panel", and no region is ever
  clickable.
- **Unbound roles stay dark.** Never hide a region because nothing is bound;
  hiding it makes a half-configured card look complete.
- **Stale data must be visible.** These integrations already track staleness.
  A faceplate showing a confident number from a dead point is exactly the
  failure the Niagara diagnostics work exists to prevent.
- **Dark mode is not optional.** Photographic faceplates need a treatment for
  it, which is one more reason to prefer SVG.
- **Performance.** Eighty meter cards on a wall display must not each hold a
  subscription they do not need. Cards render from `hass` state; no polling.

## 10. Phasing

**Phase 1 — foundation.** Monorepo, build, shared core, one card end to end:
`bms-meter-card` with the PM2200 faceplate, visual editor, HACS release.
Proves the engine against a real device.

**Phase 2 — breadth in one category.** Circutor CVM-E3-Mini and the generic
3-phase faceplate. Confirms that a new model really is just data.

**Phase 3 — fold in the Daikin card.** Move it into the monorepo, convert
BRC1E63 to a faceplate, then add the other three models properly so they
stop being identical.

**Phase 4 — distribution board.** Rebuild HA-Powercard against the engine.

**Phase 5 — plant, fire, AV.** Pump system, FIP mimic, Q-SYS zone strip,
Crestron room panel.

Each phase ends with a release that is useful on its own.

## 11. What the estate actually shows

Checked against the live Niagara point set before drawing anything.

**No model names appear anywhere in the point data.** Nothing matches
Circutor, CVM, Schneider, PM2200, Acuvim, Socomec or PowerLogic. The station
knows the readings, not the hardware, so a faceplate can never be
auto-detected — it has to be chosen by the user. That is what was wanted
anyway, and it simplifies the engine: no detection logic, just a picker.

**The boards are uniform.** Across 22–24 distribution boards the point names
are the same set every time:

| Point | Role |
|-------|------|
| `MeterTotal` | `energy_total` |
| `3Phase_Active_Power` | `power_total` |
| `Active_Power_P1` / `P2` / `P3` | `power_l1` / `l2` / `l3` |
| `Phase_1_V` / `2` / `3` | `volts_l1` / `l2` / `l3` |
| `3Phase A_power_Factor` | `power_factor` |

So **one role map serves every board**, whichever faceplate is drawn over it.
That is the meter card's canonical role set, and it should be the first thing
built.

**There are no `climate` entities on this system — none at all.** The HVAC
card therefore cannot bind to `climate.*` here; it must bind to template
slots or named entities like everything else. Worth confirming whether the
Daikin equipment is meant to arrive through Niagara or through a separate
Daikin integration that is not installed yet, because that decides whether
`hvac-controller-card` is useful on this estate or only elsewhere.

## 12. Still open

- Photographs: who takes them, and at what resolution? A straight-on shot
  with even lighting is the difference between a good faceplate and a bad
  one.
- Which meter models are physically installed? The BMS cannot say, so this
  needs someone who has seen the boards.
- Is the Daikin card for this estate or a different one? See above.
