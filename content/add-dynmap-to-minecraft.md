+++
title = "Add Dynmap to Minecraft"
tags = ["minecraft", "java", "dynmap", "papermc"]
description_file = "descriptions/add-dynmap-to-minecraft.txt"
+++

Dynmap requires your Minecraft server to be running either Bukkit, Spigot, or PaperMC. **A server set up with the official Minecraft server will not work.**

This guide is for installing Dynmap on PaperMC but setting it up Bukkit and Spigot should be similar. If you don't have PaperMC server setup, check out this guide: {{< link "setup-papermc-minecraft-server" >}}.

# Step 1. Download Dynmap
[Click here](https://www.spigotmc.org/resources/dynmap.274/history) and download the latest version of Dynmap by clicking on the `download` button next to the version.

{{< image src="post-img/spigot-dynmap-download.png" alt="dynmap download" >}}

# Step 2. Installation 
Drag and drop the newly downloaded Dynmap file into the `plugins` folder located in your Minecraft Server folder (the folder where the `paper-server.jar` and `run.bat` if you were following {{< link "setup-papermc-minecraft-server" >}}).


{{< image src="post-img/windows-dynmap-copy.png" alt="dynmap download" >}}

# Step 3. Start your Minecraft server
If you're currently running you Minecraft server, you'll need to stop it. With the dynmap `.jar` file added to your `plugins` folder, you should be able to start your server back up by running `run.bat` (or whatever method you use).

# Step 4. Check if the Dynmap is working
Once your server is running, you should be able to visit [http://localhost:8123](http://localhost:8123) to view your world with dynmap. If that page doesn't load, give it a few minutes as it might take some time for your Minecraft server to start. If it's still not working, reach out for help on our [Discord](https://discord.gg/BUPkfPW).

{{< image src="post-img/dynmap-preview.png" alt="dynmap preview" >}}


# Step 5 (optional). Making your Dynmap webpage public
Visit [playit.gg/account/tunnels](https://playit.gg/account/tunnels) and press `Add Tunnel` on the `Custom TCP` banner.

{{< image src="post-img/playit-custom-tcp-tunnel.png" alt="playit custom tcp tunnel" >}}

Set the `Local server address` to `127.0.0.1:8123` and press `Add`.

{{< image src="post-img/playit-dynmap-local-address.png" alt="dynmap download" >}}

After pressing add and giving playit.gg a few moments to prepare your tunnel, you should be assigned an .auto.playit.gg address you can use and share for accessing your dynmap.

{{< image src="post-img/playit-custom-tcp-address.png" alt="dynmap download" >}}


### Credits

Initial draft was written by Carter Sullivan.
