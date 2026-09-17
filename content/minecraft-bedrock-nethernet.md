+++
title = "Minecraft Bedrock: Switch from NetherNet to RakNet"
tags = ["Minecraft", "Networking"]
description_file = "descriptions/minecraft-bedrock-nethernet.txt"
+++

> September 16, 2026

Recently, the Minecraft Bedrock server sets the transport method to use `NetherNet` by default. As it stands now, you can still set it to use `RakNet`.


### `server.properties`
```yml
transport=raknet
# Which transport protocol the server should use.
# Allowed values: "raknet" or "nethernet"
```

We know this sucks, and it interrupts normal usage.

A TCP/UDP tunnel can be used, however this requires premium. We're actively working on fixing this, and making it available to free users once again.

### Other Notes
- Your existing tunnels will continue to work after this is fixed.
- The change back to RakNet should be temporary, as this is only a bandaid fix.

- Error code `Door` is related to this log in the playit CLI:
```text
[WARN] udp_receiver: failed to receive UDP packet, error=Os { code: 10054, kind: ConnectionReset, message:
"An existing connection was forcibly closed by the remote host." }, id=816043786242
```