+++
title = "Setting up a Terraria server on Linux"
tags = ["Terraria", "guide", "linux"]
description_file = "descriptions/terraria-dedicated-server-linux.txt"
+++

## Installing the server

### Server

We will use **Debian 13 on x86-64** for this guide. Run the server as a normal Linux user. You will also need a [playit account](https://playit.gg/) and a Terraria PC client to join.

Download the dedicated server from [Terraria's official website](https://terraria.org/). The **PC Dedicated Server** download contains the Linux server and doesn't require SteamCMD or a Steam login. This guide was tested with **1.4.5.8**; the client and server versions must match. tModLoader servers use a different setup.

Install the download, extraction, and console tools:

```bash
sudo apt update
sudo apt install curl unzip tmux
```

### Setup

Create a new folder for the server:

```bash
mkdir -p ~/terraria
cd ~/terraria
```

Download and extract the official server package:

```bash
curl -fL https://terraria.org/api/download/pc-dedicated-server/terraria-server-1458.zip -o terraria-server-1458.zip
unzip terraria-server-1458.zip
cd ~/terraria/1458/Linux
chmod +x TerrariaServer.bin.x86_64
```

The `1458` folder is for version 1.4.5.8. For a newer release, use the download linked from the official website and adjust the archive name and version folder in these commands.

## Test running the server

Run the server once:

```bash
./TerrariaServer.bin.x86_64
```

Wait for **Terraria Server v1.4.5.8** and **Choose World**. Press **Ctrl+C** at this initial world-selection prompt to stop before configuring it. Don't select or delete an existing world.

## Server configuration

Create a separate folder for your world, then open the configuration:

```bash
mkdir -p ~/terraria/worlds
nano ~/terraria/serverconfig.txt
```

Add these lines:

```text
world=/home/server/terraria/worlds/World.wld
autocreate=1
worldname=Terraria via playit.gg
difficulty=0
maxplayers=8
port=7777
upnp=0
motd=Welcome to Terraria via playit.gg
```

Replace `/home/server` with your user's home directory. Run `echo "$HOME"` if you aren't sure. Use the full path in the configuration; don't put `~` in the `world` line.

This creates a small Classic world named **Terraria via playit.gg**. `autocreate=1` only creates it if the specified file doesn't exist. Keep the same world path when restarting to continue your saved world.

For a private game, add a join password on its own line:

```text
password=YourUniqueServerPassword
```

Use a password you don't use for another account. No Steam Game Server Login Token is needed for this direct-IP setup.

Save in nano with **Ctrl+O**, press **Enter**, then exit with **Ctrl+X**.

## Keeping the server running

Use tmux so the server continues running when you disconnect from SSH:

```bash
tmux new -s terraria
cd ~/terraria/1458/Linux
./TerrariaServer.bin.x86_64 -config "$HOME/terraria/serverconfig.txt"
```

The first run generates the world and can take a few minutes. Continue when the console shows:

```text
Listening on port 7777
Type 'help' for a list of commands.
: Server started
```

Press **Ctrl+B**, release both keys, then press **D** to detach. Disconnect from SSH, reconnect, and attach to confirm that the console is still running:

```bash
tmux attach -t terraria
```

You can detach again with **Ctrl+B**, then **D**. Leave the server running while creating its tunnel.

## Create the playit tunnel

Install and claim a playit agent on the **same Linux computer** as the Terraria server. See {{< link "run-on-linux" >}} and {{< link "host-247-with-playit" >}} for agent setup and keeping it running.

Open [your tunnels](https://playit.gg/account/tunnels), choose **new tunnel**, and use:

1. **Name your tunnel:** Terraria Linux.
2. **Tunnel Type:** Terraria.
3. **Public Endpoint:** Playit Network → Global Anycast (Global · Free).
4. **Assign to Agent:** the agent on your Linux server.
5. **Origin Config:** Local IP `127.0.0.1`, Local Port `7777`, Proxy Protocol **None**.

Click **Next**, review the settings, then click **Create Tunnel**. The Terraria preset was tested on the **Free Network**. It forwards Terraria's TCP traffic to local port `7777`.

{{< image src="post-img/terraria-linux-tunnel.jpg" alt="Terraria Linux tunnel showing its public address and Debian agent origin at 127.0.0.1:7777" >}}

If the agent selector says the tunnel type isn't supported, click **Refresh agents** and check again. Keep the server and agent running.

## Joining the server

Open Terraria on your PC and choose **Multiplayer → Join via IP**. Select or create a **Classic** character for this Classic world.

{{< image src="post-img/terraria-join-menu.png" alt="Join via IP in Terraria's Multiplayer menu" >}}

Enter the tunnel's hostname without its port, then click **Accept**. Enter the assigned public port on the next screen. For the Linux example:

```text
Server IP Address: jensen-appetite.tun.ply.gg
Server Port: 50344
```

Substitute your own tunnel's hostname and public port. Keep `port=7777` in the server configuration and Local Port `7777` in playit; the assigned public port can be different.

Click **Accept**, enter the server password if prompted, and wait until your character appears in the world. **Found server** alone isn't a completed join.

{{< image src="post-img/terraria-linux-gameplay.png" alt="Terraria world loaded after joining the Debian dedicated server through its public playit hostname" >}}

Share the tunnel hostname, public port, and optional password with friends. Keep the dedicated server and playit agent running while anyone is playing.

## Save, stop, and update

Attach to the server console:

```bash
tmux attach -t terraria
```

Enter `save` to save without stopping, or `exit` to save and shut down. Wait for saving to finish and the shell prompt to return. Avoid `exit-nosave` when you want to keep changes.

Back up `~/terraria/serverconfig.txt` and the entire `~/terraria/worlds` folder while the server is stopped.

To update, stop the server first. Download and extract the new official server archive into `~/terraria`, as in the installation section. Change to its new `Linux` folder, repeat `chmod +x TerrariaServer.bin.x86_64`, and start it with the same configuration path. Keep the existing world path. Update clients to the same version.

For the version tested here, you can repeat the download and extract it with overwrite enabled:

```bash
cd ~/terraria
curl -fL https://terraria.org/api/download/pc-dedicated-server/terraria-server-1458.zip -o terraria-server-1458.zip
unzip -o terraria-server-1458.zip
```

Reattach to the existing tmux session if it is at a shell prompt, then run the startup commands again. If the session ended, create it with `tmux new -s terraria` first.

## Troubleshooting

### Permission denied or the server won't start

Run the binary from its `Linux` folder and repeat the `chmod +x` command. This package is for x86-64 Linux; check your architecture with `uname -m`. Keep the bundled libraries with the executable.

### The server asks you to choose a world

Check the `-config` path and the `world` line. Use your actual absolute home path in the configuration and create the parent folders before starting. Linux filenames are case sensitive.

### The tunnel doesn't connect

Wait for **Server started**. From another SSH connection, check the TCP listener:

```bash
ss -ltnp | grep ':7777'
```

Check that the Linux agent is online and selected on this tunnel, the tunnel is enabled, and the origin is `127.0.0.1:7777` with Proxy Protocol **None**. Check any local firewall restrictions between the agent and server. Router port forwarding isn't needed.

Enter the hostname and public port on their separate screens. `127.0.0.1` in a remote player's game refers to that player's computer, not your Linux server.

### The server is found but the world doesn't load

Match the client and server versions, check the password, and use a Classic character for this Classic world. A Journey character cannot join it. Wait for the complete world load before treating the connection as successful.

