"""Which card roles a bridge cannot fill, across every device it has.

A generated card hides what it cannot bind and says so in small print at
the bottom. That is right on one card and useless across two hundred:
nobody reads "2 controls hidden" on the hundredth fridge and works out
that it is the same two controls every time.

This asks the bridge for every card it would generate, measures each
against the roles its faceplate declares, and groups what is missing by
template. The shape of the answer is what matters — one role missing on
one device is a point nobody wired; the same role missing on all of them
is a mapping that was never written.

    python3 scripts/report-unbound.py            # the Niagara bridge
    python3 scripts/report-unbound.py qsys_bridge generate_zone_card
"""
import asyncio, json, os, sys, collections
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import websockets
from ha_ws import HA, URL, TOKEN_VAR

CATALOGUE = HERE.parent / "faceplates" / "index.json"


async def main():
    roles_of = {}
    for face in json.load(open(CATALOGUE))["faceplates"]:
        roles_of[face["id"]] = set(face.get("roles") or [])

    async with websockets.connect(URL, max_size=None) as ws:
        await ws.recv()
        await ws.send(json.dumps({"type": "auth", "access_token": os.environ[TOKEN_VAR]}))
        await ws.recv()
        ha = HA(ws)
        domain = sys.argv[1] if len(sys.argv) > 1 else "niagara"
        service = sys.argv[2] if len(sys.argv) > 2 else "generate_cards"
        out = await ha.cmd("call_service", domain=domain, service=service,
                           service_data={}, return_response=True)
    cards = out["response"]["cards"]

    def entity_maps(card):
        # Some cards carry a list of entities rather than a role map, and
        # a grid card nests the real ones inside it.
        entities = card.get("entities")
        if isinstance(entities, dict):
            yield entities
        for inner in card.get("cards", []) or []:
            if isinstance(inner, dict):
                yield from entity_maps(inner)

    per_template = collections.defaultdict(lambda: collections.Counter())
    devices = collections.Counter()
    examples = collections.defaultdict(list)
    def faceplate_cards(card):
        """Every faceplate card inside this one.

        Most devices come back wrapped in a vertical-stack, so the
        faceplate is on the inner card and reading the wrapper's own
        field found nothing on 224 of 241.
        """
        if isinstance(card, dict):
            if card.get("faceplate"):
                yield card
            for inner in card.get("cards", []) or []:
                yield from faceplate_cards(inner)

    for entry in cards:
        inner = list(faceplate_cards(entry["card"]))
        if not inner:
            per_template[entry["template"]]["(no faceplate card)"] += 1
            devices[entry["template"]] += 1
            continue
        wanted, bound = set(), set()
        for card in inner:
            wanted |= roles_of.get(card["faceplate"], set())
            for m in entity_maps(card):
                bound |= {k for k, v in m.items() if v}
        missing = wanted - bound
        devices[entry["template"]] += 1
        for role in missing:
            per_template[entry["template"]][role] += 1
            if len(examples[(entry["template"], role)]) < 3:
                examples[(entry["template"], role)].append(entry["device"])

    print(f"{len(cards)} cards\n")
    for template, counter in sorted(per_template.items(),
                                    key=lambda kv: -sum(kv[1].values())):
        total = devices[template]
        print(f"=== {template}  ({total} device(s))")
        for role, n in counter.most_common():
            ex = ", ".join(examples[(template, role)][:2])
            print(f"     {role:22} unbound on {n:3}/{total:<3}  e.g. {ex[:50]}")
asyncio.run(main())
