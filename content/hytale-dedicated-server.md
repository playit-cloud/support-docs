+++
title = "Hytale Dedicated Server Guide"
tags = ["hytale"]
description_file = "descriptions/hytale-dedicated-server.txt"
+++

This guide walks you through setting up a Hytale server using the files bundled with the official Hytale launcher, and then sharing it to the internet using playit.

> Official server guide: [Hytale Server Manual](https://support.hytale.com/hc/en-us/articles/45326769420827-Hytale-Server-Manual)


### Requirements

* Hytale game launcher installed
* Java 25 (Adoptium recommended)
* A Hytale account

## Locate the Dedicated Server Files

The dedicated server is included with the Hytale launcher installation. Navigate to the following path for your operating system:

### Windows

```text
%appdata%\Hytale\install\release\package\game\latest
```

### Linux

```text
$XDG_DATA_HOME/Hytale/install/release/package/game/latest
```

### macOS

```text
~/Application Support/Hytale/install/release/package/game/latest
```

This directory should contain `HytaleServer.jar` and an `Assets.zip` file in the parent directory.

## Start the Hytale Dedicated Server

1. Open a terminal or command prompt **inside the server directory**.
2. Run the following command:

```bash
java -jar HytaleServer.jar --assets ../Assets.zip
```

The server will start and prompt you for authentication if this is your first run.

## Authorize the Server

To authorize the server with your Hytale account, enter the following command into the server console:

```text
/auth login device
```

Follow the on-screen instructions to complete device authorization using your Hytale account.

Once authorized, the server will be fully functional.

If you don't want to authorize your device every time you start the server (spoiler, most people don't) you can run this command:

```text
/auth persistence Encrypted
```
This makes it keep the authorization token in an encrypted file in the server.

## Share the Server Using playit
### Create a playit Agent

1. Create a new **agent**
2. Install and start the agent on the same machine as your Hytale server

### Create a Tunnel

1. Create a new tunnel
2. Select the tunnel type:

   * **Hytale (game)**
3. The default port is:

```text
5520/UDP
```

> playit provides a predefined tunnel type for Hytale — use this instead of manually configuring ports.

## Connecting to the Server

Players can connect to your server using either:

* You can find it in your tunnel information
{{< image src="post-img/playit-hytale-address.png" alt="Tunnel information" >}}

From the screenshot, your address is `half-throw.gl.at.ply.gg:19490`. For you, this address will be different.

## Done

You and your players can then enter this address in Hytale to connect

{{< image src="post-img/playit-hytale-joinwithdomain.png" alt="Join hytale with domain" >}}
