+++
title = "Geyser, NetherNet, and Proxy Protocol"
tags = ["minecraft", "java", "bedrock", "geysermc", "proxy-protocol"]
date = 2024-09-27T12:18:19-07:00
description_file = "descriptions/proxy-protocol-geysermc.txt"
+++

The Proxy Protocol carries a player's address between applications that support it. See {{< link "what-is-proxy-protocol" >}} for the protocol details.

## Bedrock connections through NetherNet

Configure Geyser using {{< link "use-geyser-with-nethernet.md" >}}. Use a **Minecraft Bedrock (NetherNet)** tunnel with NXS signaling.

Leave **Proxy Protocol** set to **None** in the NetherNet tunnel's origin configuration:

{{< image src="post-img/minecraft-nethernet-origin.png" alt="NetherNet origin configuration with Proxy Protocol set to None" >}}

The tested NetherNet NXS setup uses ordinary UDP forwarding. Do not enable the tunnel's Proxy Protocol option just because the Java server requires it.

Keep this Geyser setting at its default for that setup:

```yaml
advanced:
  bedrock:
    use-haproxy-protocol: false
```

This page does not configure original-IP forwarding through NXS. The NetherNet connection setup and a Java server's Proxy Protocol listener are separate settings.

## Geyser connecting to a Java server that requires Proxy Protocol

Only configure this section if Geyser opens a TCP connection to a Java backend that requires Proxy Protocol headers.

For Paper, see {{< link "proxy-protocol-papermc" >}}. For Velocity, see {{< link "proxy-protocol-velocity" >}}.

Set the following in Geyser's configuration:

```yaml
advanced:
  java:
    use-haproxy-protocol: true
```

Current Geyser versions use `advanced.java.use-haproxy-protocol`. The older `remote.use-proxy-protocol` setting is no longer the configuration shown by current versions.

Geyser running directly inside Paper or Fabric normally uses its integrated connection. It does not need a TCP Proxy Protocol header for that connection.

Keep the working NetherNet `bedrock.signaling` settings unchanged. Restart Geyser after changing its Java connection settings.

A separate Minecraft Java tunnel must match the Java server's Proxy Protocol requirements. Changing that Java tunnel does not require enabling Proxy Protocol on the NetherNet tunnel.
