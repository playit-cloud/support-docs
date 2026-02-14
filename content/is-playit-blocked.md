+++
title = "Is playit blocked on my network?"
tags = ["playit", "networking"]
description_file = "descriptions/is-playit-blocked.txt"
+++

Knowing whether or not playit is blocked on your network can be hard. Here are some things to help determine if playit is blocked.

## Ping your tunnel (DNS Check)

Doing this will test your network's ability to resolve playit's domains into IP addresses. You can do this on any operating system with access to a command line interface. If it looks like this, you're good.

### Windows
```ps
C:\Users\playit>ping lemon-airplanes.gl.joinmc.link

Pinging lemon-airplanes.gl.joinmc.link [147.185.221.20] with 32 bytes of data:
Reply from 147.185.221.20: bytes=32 time=30ms TTL=54
Reply from 147.185.22s1.20: bytes=32 time=30ms TTL=54
Reply from 147.185.221.20: bytes=32 time=30ms TTL=54
Reply from 147.185.221.20: bytes=32 time=30ms TTL=54
Reply from 147.185.221.20: bytes=32 time=30ms TTL=54

Ping statistics for 147.185.221.20:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 30ms, Maximum = 30ms, Average = 30ms
```

### Linux / Mac

```ps
playit@playit-gg:~$ ping lemon-airplanes.gl.joinmc.link
PING lemon-airplanes.gl.joinmc.link (147.185.221.20) 56(84) bytes of data.
64 bytes from 147.185.221.20: icmp_seq=1 ttl=54 time=30.1 ms
64 bytes from 147.185.221.20: icmp_seq=2 ttl=54 time=30.4 ms
64 bytes from 147.185.221.20: icmp_seq=3 ttl=54 time=31.1 ms
64 bytes from 147.185.221.20: icmp_seq=3 ttl=54 time=29.7 ms

--- lemon-airplanes.gl.joinmc.link ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 4123ms
rtt min/avg/max/mdev = 29.7/30.3/31.1/0.4 ms
```

### Another thing you may do is an `nslookup` or a nameserver lookup
This will look at your DNS servers, and try to find your tunnel address with IP addresses.

```ps
C:\Users\playit>nslookup lemon-airplanes.gl.joinmc.link
Server:  UnKnown
Address:  2002:4982:e276:0:82cc:9cff:fe32:e798

Non-authoritative answer:
Name:    lemon-airplanes.gl.joinmc.link
Addresses:  2602:fbaf:860:1::b5
          147.185.221.181
```

However, if you get `Request timed out.` or nothing at all if you're on linux, you may need to change your DNS. Please note that this may not work for everyone.

> You can visit this page for help
>
> [How to change your DNS server](https://playit.gg/support/update-your-dns/)
