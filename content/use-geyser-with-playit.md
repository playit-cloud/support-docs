+++
title = "Setting up Geyser with playit"
tags = ["Minecraft", "Guide", "Geyser"]
description_file = "descriptions/use-geyser-with-playit.txt"
+++

This guide will walk you through how to configure Geyser with playit.gg

## Requirements
* **Minecraft: Java Edition** - [[minecraft.net]](https://www.minecraft.net/en-us/store/minecraft-java-bedrock-edition-pc)

* **GeyserMC** - [[geysermc.org]](https://geysermc.org/download/?project=geyser)
* **Floodgate (Bedrock Authentication)** - [[geysermc.org]](https://geysermc.org/download/?project=floodgate)

### Server
> The server we used for this guide is **Fabric 26.1.2**, and you can download it [here.](https://fabricmc.net/use/server/) The setup process is the same across all server platforms. See {{< link "how-to-setup-a-mc-server.md" >}}

### Config
> `server.properties`
>
> By default, `enforce-secure-profile` is set to `true`. Set this to `false` to allow Bedrock clients to chat.

### Creating a tunnel
> This server uses game presets, which means that all users will be able to create this.

You will create two tunnels. Minecraft Java, and Minecraft Bedrock. Follow the instructions shown on screen and create the tunnels.
Your tunnel list should look something like this:

{{< image src="post-img/playit-geyser-tunnel_list.png" alt="Geyser Setup Tunnel List" >}}

### Modifying a tunnel
We'll need to change the origin configuration on the Minecraft Bedrock tunnel. Copy the port of your tunnel, and set the local port to this value.
For example, `1201`.

{{< image src="post-img/playit-geyser-bedrock-origin.png" alt="Geyser Setup Bedrock Origin Configuration" >}}

### Basic Geyser Config
Open and edit `./config/Geyser-Fabric/config.yml` (or similar file path). We need to change the port to the one provided by playit. Since our port is `1201`, we need to tell Geyser to listen on this port.

### Starting the server
Run your server's JAR file. We need to start the server in order for the server plugins to generate their config files for you. You can either open it using a batch file, or by running it inside of a command line.
```batch
java -Xmx4G -jar fabric-server-mc.26.1.2-loader.0.19.3-launcher.1.1.1.jar nogui
pause
```

* The `java` command will invoke the Java runtime. `-Xmx4G` defines how much RAM the server can consume in total. 4G is 4 Gigabytes. `nogui` means there will not be a UI to interact with. This option is not required.
* `pause` will stop the console from automatically closing if there are errors. This allows you to look and read the errors.

>```yml
># Network settings for the Bedrock listener
>bedrock:
>  # The IP address that Geyser will bind on to listen for incoming Bedrock connections.
>  # Generally, you should only change this if you want to limit what IPs can connect to your server.
>  address: 0.0.0.0
>
>  # The port that will Geyser will listen on for incoming Bedrock connections.
>  # Since Minecraft: Bedrock Edition uses UDP, this port must allow UDP traffic.
>  port: 1201
>
>  # Some hosting services change your Java port everytime you start the server and require the same port to be used for Bedrock.
>  # This option makes the Bedrock port the same as the Java port every time you start the server.
>  clone-remote-port: false
>```

On a successful install, your logs should look like this:
```bash
[00:00:00] [Server thread/INFO]: Took 15ms to boot Floodgate
[00:00:00] [Server thread/INFO]: ******************************************
[00:00:00] [Server thread/INFO]:
[00:00:00] [Server thread/INFO]: Loading Geyser version 2.10.1-b1165 (git-master-a09c335)
[00:00:00] [Server thread/INFO]:
[00:00:00] [Server thread/INFO]: ******************************************
[00:00:00] [GeyserServer-3-1/INFO]: Started Geyser on UDP port 1201
[00:00:00] [Server thread/INFO]: Done (1.250s)! Run /geyser help for help!
```

Connecting to the server is the same as usual. Share playit's IP address with people to connect!
