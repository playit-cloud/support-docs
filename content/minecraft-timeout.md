+++
title = 'Fixing timeout errors with Minecraft'
tags = ["minecraft", "timeout"]
description_file = "descriptions/minecraft-timeout.txt"
+++

When hosting a server from home, you may notice that some players get kicked due to timeout.

{{< image src="post-img/minecraft-timeout.png" alt="minecraft timeout" >}}


This happens when the minecraft server is unable to provide data to the player fast enough. There are two ways to fix / improve this:

1. Increase your upload speed & reliability.

> Are you on WiFi? Use an Ethernet cable, most internet performance issue are due to bad WiFi. Unless you have the latest WiFi 6 router and are on 5Ghz with line of sight, Ethernet is the best way to go when hosting a server at home. If Ethernet is not an option, try getting closer to the your WiFi Router / Access Point. Also, if you have other WiFi enabled devices that you can turn off, give that a try it may also help.

> Turn off other programs that might be using your internet connection. Depending on the technology used by your ISP to bring you internet, other users download or uploading data could dramatically affect your upload speed. If you have a high capacity plan using fiber, this is probably not a concern (I'm jealous).

2. Lower the amount of data your server needs to send

> In `server.properties` there's a veriable named `view-distance`. By default `view-distance=10`, this tells your server to send world data that is within a 10 chunks radius of the player. If you're getting timeout issues, I suggest lowering this value so that `view-distance=3`. If you want the view distance to be larger, you can keep increasing the value until you get timeout issues again (then subtract 1).
> 
> **Note** after saving `server.properties`, you'll need to restart your minecraft server for the change to take affect.
