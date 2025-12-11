+++
title = "What's allowed (and Not Allowed) on Playit's Network"
tags = []
date = 2025-12-10
+++

# Keeping Playit safe, fast, and fun for everyone

Over the past few years, Playit has grown into one of the easiest ways to host a game server from home. Tens of thousands of people use Playit every day to run Minecraft servers for their friends, share Valheim worlds, experiment with modpacks, or set up creative multiplayer events.

We love that. Our entire mission is to make it easier to host game servers at home.

But as Playit has grown, so has the amount of abusive and harmful traffic that some people try to run through our network, including malware, remote-access toolkits, and other services that hurt both Playit and our legitimate users. These systems often look like "command-and-control" (C2) servers, which are commonly used in cyberattacks. Even if someone says they're "just testing," these traffic patterns cause our IPs and domains to get blocked or flagged.

When Playit gets blocked, it's your Minecraft and game servers that stop working.

To protect the community, we're introducing a clearer explanation of what's allowed, and not allowed, on the Playit network.

Let’s break it down in simple terms.

# What is **allowed** on playit

Playit is designed for normal user-driven applications, especially:

### Hosting multiplayer game servers

Minecraft, Terraria, Valheim, Vintage Story, Project Zomboid, and hundreds more. If it's a game you're hosting for yourself and your friends, this is exactly what Playit is for.

### Hobby projects that behave like normal apps

If you're building something fun, learning to host a service, or experimenting with a web app and it works just like a standard server with normal user interactions, you're in the clear.

### Tools that allow you to manage your devices*

Examples: an SSH server, (S)FTP, modpack helpers, web dashboards, etc.

If you are connecting over a Playit tunnel to manage **a device you own**, it's almost always fine.

If devices are connecting over a Playit tunnel so that they can be controlled, automated, or instructed by you, that crosses into behavior that resembles command-and-control systems. Even if the devices are yours, traffic patterns where you are issuing commands outward to connected clients are not permitted.


# What is **not allowed** on playit

We have recently updated [Terms](https://playit.gg/terms) to make prohibited usage more explicit. In short, Playit cannot be used for anything that resembles malware, remote-control frameworks, or C2 systems. Even if the person using it claims it's for "education." These patterns result in Playit's IPs being blocklisted and cause real harm to the service.

### 1. Command-and-Control (C2)-like traffic

These are systems that try to control multiple computers from one or more central servers, which is a common malware pattern. This includes:

* many devices "checking in" or "beaconing" to one server
* automated command execution across multiple machines
* bots phoning home for instructions
* scheduled or scripted remote-task systems

If it looks like you're controlling a fleet of computers, it's not allowed.

### 2. Remote-access tools (RATs) or remote-administration systems

Any tool that gives you remote shell access, remote desktop, keystroke capability, or control over machines you do not physically own is strictly disallowed.

Even if it's "just for testing," the traffic looks identical to malware.

If you would like to manage devices you own, here are a few options to consider:
1. Install the playit agent on the device you own and use a tunnel to make an SSH server or similar service public.
2. Use a different service, I recommend [Tailscale](https://tailscale.com/).

### 3. Hidden, encrypted, or obfuscated tunnels that mask behavior

Encryption by itself is totally fine. Almost every modern game and application uses secure encrypted communication. Playit fully supports and expects encrypted traffic.

What’s not allowed is intentionally hiding or disguising traffic to conceal activities that violate our terms, such as:

* obfuscating traffic so it appears like a different protocol
* tunneling C2-like behavior inside another service to avoid detection
* shaping, fragmenting, or encoding traffic to mask automated remote-control patterns
* creating communication channels designed to mislead security systems or hide prohibited use

If encryption is simply being used for normal application security, that's perfectly acceptable.
It only becomes a problem when encryption or obfuscation is used with the purpose or effect of hiding harmful or disallowed behavior.

### 4. Malware distribution, loaders, droppers, or software that spreads itself

This includes:

* hosting malware payloads
* controlling compromised devices
* updating agents or bots on other computers
* coordinating toolkits used in cyberattacks

### 5. Security testing or scanning against devices you don’t own

You cannot use Playit to:

* scan the internet
* probe other people's devices
* run exploit frameworks
* test vulnerabilities on machines you don't own and control

These are not permitted under any circumstances. With the current features available on playit, this should already not be possible.

### 6. Activity that harms Playit’s network reputation

If traffic causes:

* IPs or domains to get blocklisted
* automated security warnings from providers
* suspicious traffic spikes
* abnormal connection-to-data ratios
* abuse reports from third parties

Playit may disable and/or delete the your tunnel to protect everyone else.
