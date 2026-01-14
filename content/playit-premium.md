+++
title = "Playit Premium"
tags = ["playit"]
date = 2024-10-09T00:00:00Z
description_file = "descriptions/playit-premium.txt"
+++

Playit Premium comes with a handful of features:

1. [Regional Tunnels](#regional-tunnels)
1. [.playit.plus domains (3x)](#playitplus-domains)
1. [external domain support](#external-domains)
1. [more firewals, ports, and agents](#more)

## Regional Tunnels

Free tunnels on playit.gg are "Global Anycast". While they work quite well, routing is not always optimal. For instance, it's possible for a user in North America to get routed through Singapore when the connect using the free IP. Regional tunnels fix this by ensuring the client connects to a datacenter in the specific region.

**Important Note:** The datacenter where the playit program connects to is often different than the datacenter your players can connect to. **The only way to influence which datacenter your players route through is with regional tunnels.**

You can select your region when creating a new tunnel. You won't be able to change an existing tunnel, you will need to create a new tunnel. Do note, you can have two tunnels pointing to the same local address to give your users time to migrate to the new address.

{{< image src="post-img/new-tunnel-select-region.png" alt="select-region" >}}

## .playit.plus domains

Playit Premium comes with 3 custom domains! You can find these on the purchase page for custom domains, there's now a $0/month option available to you.

Get started at [playit.gg/account/billing/shop/custom-domain](https://playit.gg/account/billing/shop/custom-domain).

{{< image src="post-img/playit-plus-custom-domain.png" alt="select-region" >}}

## External Domains

Have an external domain like `example.com` that you would like to add to palyit? You can add a whole domain or a sub domain [here](https://playit.gg/account/settings/domains/add-external).

More details can be found at: {{< link "add-external-domain" >}}

{{< image src="post-img/external-domain.png" alt="external-domain" >}}

## More

That's not all. With playit premium the number of ports you can allocate jumps from 4 to 16. You also get more firewall rules and agents.

You can create firewalls [here](https://playit.gg/account/settings/firewalls/create).

For example, this firewall will allow `10.10.10.10` and `1.2.3.4` to connect and block all other traffic.
```
10.10.10.10 allow
1.2.3.4 allow

0.0.0.0/0 deny
::/0 deny
```
