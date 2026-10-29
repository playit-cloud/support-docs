+++
title = "Setup Proxy Protocol in PaperMC"
tags = ["minecraft", "java", "papermc", "proxy-protocol"]
date = 2024-09-27T12:18:19-07:00
description_file = "descriptions/proxy-protocol-papermc.txt"
+++

> **{{< link "what-is-proxy-protocol" >}}**
> The Proxy Protocol provides a way for your server to receive your client's true IP.
{.green}

## Enable The Proxy Protocol on your PaperMC Server

<!--start-summary-->

After you PaperMC server has been started, a configuration file for paper should have been generated. This can be found at `./config/paper-global.yml`. Change the `proxies.proxy-protocol` variable from `false` to `true`.

{{< image src="post-img/change-papermc-proxy-protocol.png" alt="change-papermc-proxy-protocol" >}}

Details on PaperMC's configurations can be found [here](https://docs.papermc.io/paper/reference/global-configuration).

**Note:** Normal clients will not be able to connect if they do not send proxy protocol information. Connecting directly with your Minecraft client will no longer work.

**Important:** After making this change you will need to restart your minecraft server.

## Change your playit tunnel to use the Proxy Protocol

Navigate to your tunnel on [playit.gg](https://playit.gg/account/tunnels/). Down the page you should find the attribute "Proxy Protocol" with a button to change.

{{< image src="post-img/select-proxy-protocol-java.png" alt="select-proxy-protocol" >}}

Change the protocol to either `Proxy Protocol Version 1` or `Proxy Protocol Version 2`. We recommend `Proxy Protocol Version 2`.

## You should be all set

Now when you connect, the true client IP should be provided to your server. If it's not working, make sure you're using the latest version of the playit program. Support for the proxy protocol was added in version `0.15.26`.

## Next Steps

Do you have Geyser Setup? If so you may have broken it by requiring the proxy procol. This can be fixed, see our guide: **{{< link "proxy-protocol-geysermc" >}}**
