+++
title = "Using Simple Voice Chat with playit"
tags = ["minecraft", "simple voice chat", "guide"]
description_file = "descriptions/svc-minecraft.txt"
+++


## Requirements

### Server

* **Dedicated Minecraft Server Software** (e.g. Fabric Server)
* **[Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat/versions)**

### Client

* **Minecraft client**
* **Client-side modloader** (e.g. Fabric)
* **Simple Voice Chat** installed on the client

> ⚠️ Simple Voice Chat **must be installed on both the server and the client** for voice to work.

## Setting Everything Up (Server)

### Install Simple Voice Chat

Place the Simple Voice Chat `.jar` file into the appropriate folder inside your Minecraft server directory:

* `mods/` (Fabric / Forge)
* `plugins/` (Paper / Spigot)

{{< image src="post-img/playit-svc-serverplugins.png" alt="SVC Server Setup" >}}

### Generate Configuration Files

1. Start the Minecraft server
2. Wait until it fully loads
3. Stop the server

This will generate the required configuration files for Simple Voice Chat.

### Create a Tunnel

1. Choose an agent for the tunnel
2. Create a new **UDP tunnel**
3. Configure it as follows:

```text
Protocol: UDP
Port Count: 1
Local Port: 24454
```

{{< image src="post-img/playit-svc-tunnelconfig.png" alt="SVC Tunnel Setup" >}}


After creating the tunnel, go back to the tunnel overview, and note the **IP address and port** shown alongside the tunnel

{{< image src="post-img/playit-svc-tunnel_info.png" alt="SVC Tunnel Info" >}}

### Configure Simple Voice Chat

Navigate to the Simple Voice Chat server configuration file:

```text
./config/voicechat/voicechat-server.properties
```

Modify the following values:

```properties
bind_address=*
voice_host=IP_ADDRESS:PORT
```

Replace `IP_ADDRESS:PORT` with the IP address and port provided by playit.
> Dedicated IP users may choose to use the default port `24454`


**Example:**

```properties
bind_address=*
voice_host=147.185.221.181:25732
```

{{< image src="post-img/playit-svc-serverconfig.png" alt="SVC Server Setup" >}}

Save the file.

### Start the Server

Start the Minecraft server again to apply the changes.

If configured correctly, Simple Voice Chat will now bind to the tunnel.

## Setting Everything Up (Player)

### Install a Modloader

Install a client-side modloader such as **Fabric**.

### Install Simple Voice Chat (Client)

1. Navigate to your Minecraft mods folder:

```text
%AppData%/.minecraft/mods
```

2. Ensure the **Simple Voice Chat `.jar` file** is present

> If the mod is not installed on the client, you **will not be able to hear or talk** to other players.

{{< image src="post-img/playit-svc-clientmods.png" alt="SVC Server Setup" >}}

## Done

Simple Voice Chat should now work over playit, allowing players to communicate using proximity voice chat.
