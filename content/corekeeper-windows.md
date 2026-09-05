+++
title = "Setting up a Core Keeper server on Windows"
tags = ["Core Keeper", "guide"]
description_file = "descriptions/corekeeper-windows.txt"
+++

## Setting Everything Up

Assuming you already own Core Keeper on Steam, you already have access to the dedicated server software.

1. Open your **Steam Library**
2. Search for **Core Keeper** (the server is usually hidden until searched)
3. Install **Core Keeper Dedicated Server**

After installing the game server, you can immediately open the server within Steam, however we need to set some things up.

## Create the tunnel

* **Type:** UDP
* **Local IP:** 127.0.0.1
* **Port:** NULL

After the tunnel is created, set the local port to the tunnel's public facing port (`41272`)

{{< image src="post-img/corekeeper-tunnelconfig.png" alt="Tunnel Configuration on playit" >}}

{{< image src="post-img/corekeeper-originconfig.png" alt="Origin Configuration on playit" >}}

Right click **Core Keeper Dedicated Server**, and then go to **Properties**.

{{< image src="post-img/corekeeper-properties-steam.png" alt="Core Keeper on Steam" >}}

Here's our launch arguments, please modify these values to match your port. Again, ours is `41272`.

{{< image src="post-img/corekeeper-launchoptions-steam.png" alt="Core Keeper Launch Options" >}}

```text
-password playit -port 41272 -worldname "playit.gg server"
```

You can now launch the server through Steam.

{{< image src="post-img/corekeeper-launch-steam.png" alt="Steam Launch Dedicated Server" >}}

## Joining the game

You'll have to join with IP. Do this by entering the dropdown menu.

{{< image src="post-img/corekeeper-joinwithip-menu.png" alt="Join With IP" >}}

Paste the tunnel's IP address and port. Enter the server's password.

{{< image src="post-img/corekeeper-joinwithip.png" alt="Join With IP" >}}

After waiting a few moments, you should be loaded into the server.

{{< image src="post-img/corekeeper-gameplay.png" alt="Core Keeper on playit.gg" >}}
