+++
title = 'How playit.gg works'
tags = ["playit"]
draft = true
description_file = "descriptions/how-playit-works.txt"
+++

> **playit.gg** provides free newtorking tunneling so users can host game servers at home.

Before describing how playit.gg works, I think it's important to show how things work without playit. Because after all, for many it's still possible to host game servers at home without it. However, there are many reasons why you should still consider using playit.gg when hosting at home.

## Without playit.gg (port forwarding)

Normally if you were to host a game server at home, you would add a port forwarding rule to your home router. You would then share your home's public IP address with a friend and they would use that IP to connect to your server.

For port forwarding to work, there are a few requirements:
* ***A*** You have access to your router (or routers)
* ***B*** Your router supports port forwarding (most do)
* ***C*** Your ISP (Internet Service Provider) allows incoming connections (some do)

Let's say you are port forwarding a Minecraft Java server that's running on your home computer, what happens when your friend tries to connect?

1. Your friend's minecraft game sends a SYN packet (the "start a connection" message) to your home IP
1. Your ISP receives the SYN packet and sends it to your router ***(requires C)***
1. When the router receives the SYN packet, it follows the port forwarding rule you set which specifies that the SYN packet should be forwarded to your computer. ***(requires A & B)***
1. Your computer receives the packet and the connection process begins


## With playit.gg

playit does something similar to port forwarding but eliminates the requirements that can prevent port forwarding from working.

