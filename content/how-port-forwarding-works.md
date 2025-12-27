+++
title = "How port forwarding works"
tags = ["how it works", "port forwarding", "firewall"]
+++

Port forwarding is a way to let devices on the internet reach something on your private network. Playit can forward a port on your private IP, like `192.0.0.1`, to a `ply.gg` domain or a public IP, making it easy for others to connect without you having to edit  your router settings.

![img]({{< static "post-img/port-forwarding.png" >}})

### How It Works

Every device in your home network has a private IP, while your router has a public IP. When someone from the internet tries to connect, your router doesn’t automatically know which device to send the traffic to. Port forwarding tells it exactly where to go.

For example, if you run a Minecraft server:

- Your router’s public IP might be `203.0.113.5`.  
- Your computer hosting the server has a private IP like `192.168.1.100`.  
- Minecraft uses port `25565`.  

A port forwarding rule would send traffic from `203.0.113.5:25565` to `192.168.1.100:25565`, allowing players to join your server. With Playit, you can skip router configs entirely and use a `ply.gg` address instead.

### Why It’s Useful

- **Gaming**: Host servers and let friends join easily.  
- **Remote access**: Connect to your home computer from anywhere.  
- **Web services**: Run a personal website or other servers from home.

### Stay Safe

Opening ports exposes devices to the internet, so only forward what you need. Keep your software updated, use strong passwords, and avoid forwarding unnecessary services.

### Playit.gg Simplifies Things

Playit handles the tricky part by creating a secure tunnel to your device. This lets you get servers online quickly and safely without messing with complicated router settings or worrying about ISP restrictions.

It is important to note that Playit has restrictions on what can be port forwarded, please check out {{< link "prohibited-uses" >}} if unsure.