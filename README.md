# HA Cards

Home Assistant Lovelace cards that look like the equipment they represent —
a power meter that reads like a power meter, a controller that reads like the
controller on the wall.

Built for the three building-systems bridges on this estate
([Niagara](https://github.com/rellis-erigon/Niagara--HA),
[Crestron](https://github.com/rellis-erigon/Crestron-CIP-HA),
[Q-SYS](https://github.com/rellis-erigon/QSYS-QRC-HA)), but the cards work
with any entities you point them at.

See [PLAN.md](PLAN.md) for the full design and roadmap.

## Cards

| Card | Status | Faceplates |
|------|--------|-----------|
| `bms-meter-card` | Available | PM2200-style, generic 3-phase |
| `hvac-controller-card` | Planned | Daikin BRC1E63 and others |
| `distribution-board-card` | Planned | — |
| `pump-system-card` | Planned | Triplex set |
| `fire-panel-card` | Planned | AMPAC FireFinder and others |
| `qsys-zone-card`, `crestron-room-card` | Planned | — |

## Installing

Add this repository to HACS as a **Dashboard** repository, install, then add
a resource for **only the cards you use**:

```
/hacsfiles/HA-Cards/bms-meter-card.js      (JavaScript Module)
```

or `all-cards.js` if you would rather add one resource and be done.

## Using the meter card

```yaml
type: custom:bms-meter-card
faceplate: schneider-pm2200
name: DB-L3-KE Power
entities:
  energy_total: sensor.db_l3_ke_power_metertotal
  power_total: sensor.db_l3_ke_power_3phase_active_power
  volts_l1: sensor.db_l3_ke_power_phase_1_v
  # ...
```

Roles left out are matched from the entity ids where the naming is
recognisable, so on a typed Niagara device the `entities:` block is usually
unnecessary. **A role with nothing bound renders as an unlit display rather
than disappearing** — an unlit segment is honest; a hidden one makes a
half-configured card look complete. An entity that is unavailable reads
differently again, because a confident number from a dead point is the one
outcome worth designing against.

## Adding a faceplate

A faceplate is data. See `src/faceplates/meter/generic3phase.ts` for the
smallest complete example: artwork, a size, and a list of regions that each
name a *role* rather than an entity.

Requests for new models are welcome — open an issue with the manufacturer and
model, a straight-on photograph, and the manual or datasheet if you have it.
Without a photograph taken square-on it cannot really be done.

## Trademarks

See [TRADEMARKS.md](TRADEMARKS.md). All product names and marks belong to
their respective owners; this project is independent and unaffiliated.

## Development

```bash
npm install
npm run build          # rollup + faceplate catalogue
npm run check          # typecheck only
```

If the native Rollup binary cannot load in your environment, build with the
WASM build instead:

```bash
node node_modules/@rollup/wasm-node/dist/bin/rollup -c
```
