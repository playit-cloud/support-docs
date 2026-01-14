+++
title = "Setup Proxy Protocol in GeyserMC"
tags = ["minecraft", "java", "bedrock", "geysermc", "proxy-protocol"]
date = 2024-09-27T12:18:19-07:00
description_file = "descriptions/proxy-protocol-geysermc.txt"
+++

> **{{< link "what-is-proxy-protocol" >}}**
> The Proxy Protocol provides a way for your server to receive your client's true IP.
{.green}


## Enable The Proxy Protocol on GeyserMC

<!--start-summary-->

The configuration file for GeyserMC can be difficult to find. If you have GeyserMC installed as a plugin, the configuration should be located at `./plugins/Geyser-Spigot/config.yml`. Change the value of `bedrock.enable-proxy-protocol` from `false` to `true`.

{{< image src="post-img/geysermc-change-bed-proxy.png" alt="geysermc-change-bed-proxy" >}}


## Enable The Proxy Protocol in your Java Server and update GeyserMC

It's not much use using the Proxy Protocol in GeyserMC if that data isn't forwarded to your Java Server. For an example on how to setup PaperMC see {{< link "proxy-protocol-papermc" >}}. We also need to tell GeyserMC to forward the client IP information to your Java Server. This can be done by editing the config file again and setting the value `remote.use-proxy-protocol` from `false` to `true`.

{{< image src="post-img/geysermc-change-remote-proxy.png" alt="geysermc-change-bed-proxy" >}}

## Change your playit tunnel to use the Proxy Protocol

Navigate to your tunnel on [playit.gg](https://playit.gg/account/tunnels/). Down the page you should find the attribute "Proxy Protocol" with a button to change.

{{< image src="post-img/select-proxy-protocol.png" alt="select-proxy-protocol" >}}

Change the protocol to `Proxy Protocol Version 2`.

## You should be all set

Now when you connect, the true client IP should be provided to your server. If it's not working, make sure you're using the latest version of the playit program. Support for the proxy protocol was added in version `0.15.26`.
