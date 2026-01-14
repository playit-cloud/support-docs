+++
title = "What is CGNAT?"
tags = ["how it works", "cgnat"]
+++

CGNAT stands for **Carrier-Grade NAT**.

Simply put, CGNAT is NAT done by your Internet Service Provider (ISP) using a shared pool of IP addresses. Because there are only so many IPv4 addresses, not every home can get its own unique public IP. CGNAT lets multiple users share a single public IP, keeping everyone online even with limited addresses.  

For most day-to-day internet use, you probably won’t notice CGNAT. But it can make things like **port forwarding, online gaming, or hosting a server** more complicated. Since multiple users are sharing the same IP, opening ports to your device isn’t as straightforward as it would be on a standard home network. That’s why services that handle port forwarding or NAT traversal can be a very helpful when your ISP uses CGNAT.
