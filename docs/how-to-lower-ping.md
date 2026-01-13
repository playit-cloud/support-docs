---
title: How to lower ping on playit
tags: ["playit", "networking"]
date: 2024-11-06T08:08:27-08:00
---

# TL;DR

1. Have your player(s) with high latency visit [http://ping.gl.ply.gg](http://ping.gl.ply.gg) and see which datacenter they are getting routed to (`tunnel_name` shows datacenter). If the datacenter is far from you and the player, consider getting using a regional tunnel with [Playit Premium](/playit-premium).
2. If you're hosting a server using WiFi, try moving to a wired connection.
3. Restart your router, sometimes the router gets into a funky state and [buffer bloat](https://www.waveform.com/tools/bufferbloat) becomes a big issue.
4. If your hosting Minecraft, try lowering `view-distance`. More details on [Fixing timeout errors with Minecraft](/minecraft-timeout).

# What is ping?

Simply said, ping is the amount of time it takes for you to receive a response from a target. If you want to measure your ping to one of playit's servers, you can open the command line / prompt
and run:

```
ping ping.ply.gg
```

The ping command will send an ICMP packet (a ping message) to one of playit's global servers and that server will respond with a pong message. The ping command will then tell you how long it took in milliseconds to receive the response.

![ping-response](/img/ping-command-response.png)
![ping](/img/ping.png)

# Your ping / latency in game is much more complicated

While knowing your ping to one of playit's servers is helpful, it doesn't give you a clear picture of what the in-game ping will be for your players. The truth is, the in-game ping is much more complicated. The ping will likely be different for every player, may change over time, and may get worse if someone is running a microwave in your house. The best way to determine what your in-game ping will be is to measure it. So set up a server, get some friends online, and start measuring.

So what if you've measured your in-game ping / latency, determined it's high, and now want to lower it? Well you're in luck, there might be some things you can do. However, I first think it's important to know how playit.gg works and which variables you have to manipulate to improve your ping.

## How traffic flows through playit

Playit has tunnel servers distributed across the world. When your game server is made public with playit.gg, traffic flows through our tunnel servers. For the point of illustration, let's imagine you are hosting a Minecraft server and one of your players is measuring ping to the game server. This is how the traffic (and the ping test) flows through our network:

![playit-hops](/img/playit-hops.png)

1. **Hop 1**: Data is sent to a playit tunnel server. The datacenter that your player gets routed to is dependent on many factors. Ultimately your player's ISP (and the ISPs your ISP use, turtles all the way down) decide which datacenter to send traffic to. We try to tune the network so your ISP sends you to the closest datacenter but that doesn't always happen. That's why we offer regional tunnels with [Playit Premium](/playit-premium).

2. **Hop 2**: The tunnel server that received the player's (client's) data then forwards that data to the playit agent running on the game server.

3. **Hop 3**: After your game server processes the data, it sends the response through the playit agent to the tunnel server it is connected to. This tunnel server is different than the one your player's data is sent to and is often routed much better than our free tunnel IPs (because it has free access to the same networks as our regional tunnels). 

4. **Hop 4**: The response is relayed to the player's (client's) computer.

The in-game ping of your server can be approximated by calcuating

```
Latency(Hop 1) + Latency(Hop 2) + Latency(Hop 3) + Latency(Hop 4)
```

Often the biggest thing you can do to adjust latency is to change where traffic gets routed through the playit network.

### Adjust traffic from the playit agent

On the playit webpage for your agent, you can see the ping from your playit agent to our tunnel servers. This value about `2 * Latency(Hop 3)`. So in my case `Latency(Hop 3) = 7ms`. If I were a connecting to my own game server on playit.gg, `Latency(Hop 3) + Latency(Hop 4) = 14ms`. As a I said, sorta complicated.

![agent-ping](/img/agent-latency.png)

You can change which datacenter you're being routed to. Do note, this does not currently work for our Minecraft Plugin and old versions of the playit program. Changing this value will directly influence `Latency(Hop 3) + Latency(Hop 4)` in your players' overall ping. In general, for the best performance you want the reported ping for your playit agent to be as low as possible.

You can also try disabling IPv6, which sadly on some networks improves latency and reliability.

![agent-ping](/img/agent-change-routing.png)

### Adjust where client traffic goes

This requires playit premium. With playit premium you can create regional tunnels. A regional tunnel will ensure the player connecting to your tunnel will get routed to a datacenter in the tunnel's region. Each player can approximate `Latency(Hop 1)` by finding their ping to the tunnel's region and dividing the value by 2, `Latency(Hop 1) = $(ping ping.<region>.ply.gg) * 0.5`. If you're hosing the server and also connecting, `Latency(Hop 1) + Latency(Hop 2) = $(ping ping.<region>.ply.gg)`.

**Ping commands to playit regions**

```
ping ping.gl.ply.gg # Free Tunnel
ping ping.na.ply.gg # North America Tunnel
ping ping.eu.ply.gg # Europe Tunnel
ping ping.sa.ply.gg # South America Tunnel
ping ping.in.ply.gg # India Tunnel
ping ping.as.ply.gg # Asia Tunnel
```

# Other reasons for High Ping

A lot of in-game ping / latency is simply due to sending data long distances and in that case we're limited by the speed of light through glass. However, there are other factors which can affect in-game ping quite a bit.

## Network Bandwidth

Every internet connection has an upload speed limit. Depending on your upload speed and game server (and game server settings) it's very possible you're hitting a limit which is causing delays and extra ping.

**Saturating your upload bandwidth (upload speed limit)**
When you're sending data to players you need to wait for that data to be sent before you can send more data. It's a queue, if you're trying to send too much data you'll need to wait, this waiting can cause massive in-game ping / latency spikes.

![agent-ping](/img/bandwidth.png)

Like everything, this is complicated. Some game servers are greedy and will use all available bandwidth to send data to a new player at the expense of other players.

**Some examples with Minecraft Java**
With a Vanilla Minecraft Java server here's how much data is sent to a connecting player based on view-distance:

 * view-distance: **4** => ~0.68MB
 * view-distance: **10** => ~2.34MB
 * view-distance: **32** => ~3.26MB

**Worst case scenario** with a 10Mbps upload speed (very common), a new player joining can temporarily spike the ping for all players on your server by the following milliseconds (ms). This can be even worse with multiple players joining at the same time.

 * view-distance: **4** => ~500ms
 * view-distance: **10** => ~1900ms
 * view-distance: **32** => ~2600ms

> Most home internet routers have some form of Quaility of Service (QoS) prioritization applied to the upload bandwidth to lower how much one greedy
> connection can block others. Your router being 'smart' does help lower the affect but not eliminate it. It's also possible your router is doing a bad
> job and might need a restart. See our section on [Buffer Bloat](#buffer-bloat) for more details.
>
> Through testing we've found the official Vanilla Minecraft Java server is greedy with bandwidth. PaperMC which we've also
> tested does a much better job smoothing out the traffic which can help lower this affect too.

### How to improve?

1. Where possible, update your server settings to lower how much data you're sending. In Minecraft this can be done with `view-distance` in `server.properties`.
2. Lower internet usage from other devices on your network.
3. Restart your router, it might be doing QoS poorly and need a reset.
4. Get a faster internet connection from your ISP, you need more upload bandwidth. Easier said than done for many.

## Buffer Bloat

Lifted from [https://www.waveform.com/tools/bufferbloat](https://www.waveform.com/tools/bufferbloat) (great resource)
> Bufferbloat is a software issue with networking equipment that causes spikes in your internet connection's latency when a device on the network uploads or downloads files.

Often the router or modem from your ISP is a low quality device that has lots of issues. Over time, the software can get into a funky state and the device can perform quite poorly. These performance issues often show up when the device is under load (lots of traffic moving through it).

Give your router a test: [buffer bloat test](https://www.waveform.com/tools/bufferbloat). Sometimes a simple restart of the router is enough to get it working better. Helping users on the Discord, I've been surpised by how much a simple restart of the router has improved their in-game ping.


## Use a wired connection

If you can, use a wired connection for the computer running playit and hosting your game server. WiFi sends data in the form of small messages called packets and constantly drops them. WiFi works by trying to send packets at random times on a shared frequency. If two devices happen to send a packet at the same time, both will wait a random amount of time and then retry. While they're waiting, no data is being sent from your game server. When running a game server you are constantly sending data, so anytime another device decides to use the internet (including devices from your neighbors or a random microwave turning on) the data will be dropped and your server's upload will pause. These conflicts can cascade causing more and more data to back up while waiting to be sent. It's possible for this alone **to add MULTIPLE SECONDS to your in-game ping!**

The story is different with WiFi 6 if both your router and device support it, but that sill has issues. If you can, using a wired Ethernet connection is your best option.
