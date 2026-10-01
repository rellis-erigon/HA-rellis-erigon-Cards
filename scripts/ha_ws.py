"""Minimal Home Assistant WebSocket client for the build scripts.

Lives in the repository rather than in a scratch directory, because the
scripts beside it are the only way to rebuild the sample dashboard and
losing them costs an afternoon.

Authenticates as a Supervisor add-on. The REST API cannot reach Lovelace
dashboards or resources; the WebSocket API can, and Supervisor proxies
it. Built on `websockets` rather than aiohttp: that is what these
containers have.
"""
import json
import os

import websockets

URL = os.environ.get("HA_WS_URL", "ws://supervisor/core/websocket")
TOKEN_VAR = "SUPERVISOR_TOKEN"


class HA:
    def __init__(self, ws):
        self.ws = ws
        self._id = 0

    async def cmd(self, type_, **fields):
        self._id += 1
        await self.ws.send(json.dumps({"id": self._id, "type": type_, **fields}))
        while True:
            message = json.loads(await self.ws.recv())
            if message.get("id") == self._id and message.get("type") == "result":
                if not message.get("success"):
                    raise RuntimeError(f"{type_}: {message.get('error')}")
                return message.get("result")

    async def service(self, domain, service, **data):
        """Call a service that returns a response."""
        result = await self.cmd(
            "call_service", domain=domain, service=service,
            service_data=data, return_response=True,
        )
        return result.get("response")


class connect:
    """`async with connect() as ha:`"""

    async def __aenter__(self):
        token = os.environ.get(TOKEN_VAR)
        if not token:
            raise SystemExit(
                f"{TOKEN_VAR} is not set — run this inside the add-on container."
            )
        self._ws = await websockets.connect(URL, max_size=64 * 1024 * 1024)
        hello = json.loads(await self._ws.recv())
        assert hello["type"] == "auth_required", hello
        await self._ws.send(json.dumps({"type": "auth", "access_token": token}))
        result = json.loads(await self._ws.recv())
        if result.get("type") != "auth_ok":
            await self._ws.close()
            raise SystemExit(f"authentication failed: {result}")
        return HA(self._ws)

    async def __aexit__(self, *exc):
        await self._ws.close()
