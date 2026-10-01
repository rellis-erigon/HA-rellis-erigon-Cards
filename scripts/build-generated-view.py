#!/usr/bin/env python3
"""Add a "Generated" view built entirely by the bridge integrations.

Nothing here is hand-written: every card comes back from a service, so
the view is proof that the whole chain works — add-on to integration to
faceplate — rather than a mock-up of it.

Deliberately *not* exported to the repository. Its titles and strip
labels are real device, switchboard and zone names.

    python3 scripts/build-generated-view.py [--device <niagara group>]
"""
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ha_ws import connect  # noqa: E402

URL_PATH = "card-samples"
VIEW = "Generated"


def note(text: str) -> dict:
    return {"type": "markdown", "content": text}


async def ask(ha, domain: str, service: str, **data):
    """Call a bridge service, tolerating a bridge that has nothing yet."""
    try:
        return await ha.service(domain, service, **data)
    except RuntimeError as err:
        print(f"  {domain}.{service}: {err}")
        return None


async def main() -> None:
    async with connect() as ha:
        cards: list[dict] = []

        bulk = await ask(ha, "niagara", "generate_cards")
        if bulk and bulk.get("cards"):
            # One of each template, so the view shows the range rather
            # than two hundred fan coils.
            seen: dict[str, dict] = {}
            for entry in bulk["cards"]:
                seen.setdefault(entry.get("template") or "?", entry)
            for template, entry in sorted(seen.items()):
                cards.append(note(
                    f"### Niagara — {template}\n`niagara.generate_cards`"))
                cards.append(entry["card"])
            if bulk.get("skipped"):
                cards.append(note(
                    f"{len(bulk['skipped'])} published device(s) have no card "
                    "yet — their points are bound but not enabled."))

        zones = await ask(ha, "qsys_bridge", "generate_zone_card")
        if zones and zones.get("card"):
            omitted = zones.get("omitted_zones") or []
            text = "### Q-SYS — zone rack\n`qsys_bridge.generate_zone_card`"
            if omitted:
                text += (f"\n\n{len(omitted)} zone(s) did not fit on one rack: "
                         + ", ".join(omitted))
            cards.append(note(text))
            cards.append(zones["card"])

        room = await ask(ha, "crestron_cip", "generate_room_card")
        if room and room.get("card"):
            cards.append(note("### Crestron — room\n`crestron_cip.generate_room_card`"))
            cards.append(room["card"])

        if not cards:
            cards.append(note(
                "### Nothing generated\nNo bridge returned a card. Type and "
                "publish a device in the Niagara add-on, or expose controls "
                "in the Q-SYS or Crestron add-ons."))

        config = await ha.cmd("lovelace/config", url_path=URL_PATH)
        config["views"] = [v for v in config["views"] if v.get("title") != VIEW]
        config["views"].append({
            "title": VIEW, "path": "generated", "icon": "mdi:auto-fix",
            "cards": [{"type": "grid", "columns": 1, "square": False,
                       "cards": cards}],
        })
        await ha.cmd("lovelace/config/save", url_path=URL_PATH, config=config)
        drawn = sum(1 for c in cards if str(c.get("type", "")) != "markdown")
        print(f"{VIEW} view: {drawn} generated cards")


asyncio.run(main())
