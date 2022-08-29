+++
title = "Why your friend can't join your Minecraft Server"
tags = ["minecraft", "can't join", "port forwarding"]
+++


If you're hosting a Minecraft server at home you've probably seen an error like this.


```
Failed to connect to server
connection timed out
```

![minecraft connection timeout]({{< static "post-img/minecraft-connection-timeout.png" >}})

## Possible issues and how to fix

> If you can connect to your server using `127.0.0.1:25565` you should able to get it public in minutes by following [this guide](https://playit.gg/guides/minecraft-java#true%2Ctrue).

If you're not using [playit.gg](https://playit.gg), you're probably trying to port forward. Here are some potential issues you'll need to work through.

**1. Your ISP doesn't support port forwarding**

Many ISPs do something called Carrier Grade NAT (or CGNAT for short). If this is the case, or your ISP does not allow incoming connections, you may need to contact your ISP and ask for them to enable port forwarding. Often ISPs will charge you a fee to enable port forwarding if is not available by default. Without support from the ISP, port forwarding will never work. If you're interested in learning more about CGNAT, see {{< link "what-is-cgnat" >}}.

**2. Port forwarding is not setup or not done properly**

Port forwarding is something done on your router to instruct incoming connections to go to your server. More details can be found at {{< link "how-port-forwarding-works" >}}. In addition to adding a port forwarding rule on your router, you also need to ensure the following:

**Your server program is listening on a public interface.** Often this can be "0.0.0.0" (the [ANY IP](https://wikipedia.org/wiki/0.0.0.0)). Listening on 127.0.0.1 will only work if something is briding or tunneling the connection. Your computer's LAN IPv4 Address also works. If you're running a Minecraft Java server, having the `server-ip=` property blank should work. 

**Your router is forwarding to your server's address and port.** Each computer on your network is assigned a LAN Address (an IPv4. Your LAN Addresses will often starts with `192.168.` but there a [few other options it could start with](https://en.wikipedia.org/wiki/Private_network). LAN (Local Area Network) Addresses are use so computer and devices on your network can communicate with eachother. A device or computer outside of your network cannot communicate to your server using a LAN addres (noticed how if you share your LAN address to friends they cannot connect?)

The LAN Address is also how your router communicates with your computer / server. So for the port forwarding rule to work properly, the router needs to know the LAN Address it should forwarding incoming connections to. See {{< link "how-to-find-your-computers-lan-address" >}}. Other computers on your network should be able to connect to your server using your computer's / server's LAN Address.

**3. Allow inbound connections in your firewall and antivirus program**

Most users don't host servers on their computer, so many firewalls and antivirus programs will block incoming connections by default.

**4. You're not running a VPN client.**

If you are running A VPN client on your computer, your computer is not on your LAN, it's "teleported" to the VPN's network. You'll need to either figure things out with your VPN provider or turn off the VPN.

**5. You're on an IPv6 only network (not too common)**

In some cases you might not have an IPv4 address at all. This is rare but you could be on an IPv6 only network. If this is the case, only users on IPv6 compatible networks will be able to connect. The nice thing is, port forwarding isn't required at all. Often you only need to be listening on your IPv6 address for other computers to be able to connect. We don't currently have a guide for this but if you're on IPv6 and okay with only having IPv6 users [send us an email](mailto:support@playit.gg) and we'll start working on the guide.

## Consider using playit.gg

Since 2020 we've been working to provide a free and easy to use solution to this. We offer a static IP & port with a `.craft.playit.gg` domain. The program is [open source](https://github.com/playit-cloud/playit-agent) and supported by users purchasing custom `.playit.gg` domains. Join the 10,000 people who have other successfully setup their server for free with [playit.gg](https://playit.gg).

