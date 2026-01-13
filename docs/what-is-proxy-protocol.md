---
title: What is the Proxy Protocol?
tags: ["proxy-protocol"]
date: 2024-09-27T12:18:19-07:00
---

The Proxy Protocol provides a way for your server to receive your client's true IP. The playit program will
proxy your connection on your local machine. Because of this, the connection will normally have a local
IP Address like `127.B.C.D`. The Proxy Protocol will send the true IP details to your server. Note your
server must support the Proxy Protocol.

If you like technical documents, [here are the details from HAProxy](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt).

## Using on playit.gg
Playit supports both version of the proxy protocol. Please note, proxy protocol v1 is ignored on UDP tunnels. If you want to use the proxy protocol with UDP please select version 2.

![select-proxy-protocol](/img/select-proxy-protocol.png)

### Guides
* **[Setup Proxy Protocol in PaperMC](/proxy-protocol-papermc)**
* **[Setup Proxy Protocol in GeyserMC](/proxy-protocol-geysermc)**

## Version 1

When a connection is made with `Version 1` the first line of the connection will be a plain text string detailing
where the connection is coming from.

> **Example**
> 
> ```
> PROXY TCP4 1.1.1.1 2.2.2.2 1010 20202\r\n
> ```
> Here 1.1.1.1 would be the true client IP connecting with port 1010 and 2.2.2.2 would be the true server IP listening on port 20202.


## Version 2

Version 2 uses a binary format. The connections starts by sending a magic 12 bytes

```
\x0D \x0A \x0D \x0A \x00 \x0D \x0A \x51 \x55 \x49 \x54 \x0A
```


You can read more [here](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt). See section `2.2. Binary header format (version 2)`.
