+++
title = 'Update your DNS server on Linux'
tags = ["linux", "dns", "ubuntu"]
description_file = "descriptions/linux-update-dns.txt"
+++

There's a lot of different Linux distributions so you're solution might vary.
 * [Updating DNS in Ubuntu](#updating-dns-in-ubuntu)
 * [Updating DNS by editing "/etc/resolv.conf"](#updating-dns-by-editing-etcresolvconf)
 * [Updating DNS by editing "/etc/systemd/resolved.conf"](#updating-dns-by-editing-etcsystemdresolvedconf)

## Updating DNS in Ubuntu

On the top right of your desktop, open the drop down and select either `Wired Settings` or `WiFi Settings`.

{{< image src="post-img/ubuntu-wired-settings.png" alt="ubuntu wired settings" >}}

Next press the gear icon next to the connection.

{{< image src="post-img/ubuntu-interface-settings.png" alt="ubuntu gear icon" >}}

A window should pop up, nagivate to the IPv4 tab, disable `Automatic` in the DNS row and put `8.8.8.8,8.8.4.4` in the text field.

{{< image src="post-img/ubuntu-set-dns.png" alt="ubuntu dns settings" >}}

## Updating DNS by editing "/etc/resolv.conf"

Linux uses the file `/etc/resolv.conf` to define the DNS servers it uses. However, this file is often managed by another program on the computer.

View the contents of `/etc/resolv.conf` by running `cat /etc/resolv.conf`. If you see a warning similar to

{{< image src="post-img/linux-etc-resolv-conf.png" alt="linux resolv conf warning" >}}

do not edit the file. Instead follow [Updating DNS by editing "/etc/systemd/resolved.conf"](#updating-dns-by-editing-etcsystemdresolvedconf)

If you do not see this warning, change the file contents to

```
nameserver 8.8.8.8
nameserver 8.8.4.4
```

## Updating DNS by editing "/etc/systemd/resolved.conf"

Systemd is a program on many linux distributions that help manage the operating system. To update the DNS we'll edit `/etc/systemd/resolved.conf`. Find A part in the file that looks like

```
[Resolve]
DNS=192.168.1.1
FallbackDNS=8.8.8.8
```

or 

```
[Resolve]
#DNS=
#FallbackDNS=
```

Change lines `DNS=...` and `FallbackDNS=...` to be

```
[Resolve]
DNS=8.8.8.8
FallbackDNS=8.8.4.4
```

Save the file and run `service systemd-resolved restart`.
