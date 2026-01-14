+++
title = "Add an external domain with Spaceship"
tags = ["external-domain"]
description_file = "descriptions/external-domain-spaceship.txt"
+++

This guide assumes you have [playit premium](https://playit.gg/account/billing/shop/premium) and have purchased a domain name on [https://spaceship.com](spaceship.com). For other Domain Registars visit {{< link "add-external-domain" >}}.


* [Adding a second level domain (like example.com)](#adding-a-second-level-domain-to-playitgg-like-examplecom)
* [Adding a sub domain (like sub.example.com)](#adding-a-sub-domain-to-playitgg-like-subexamplecom)


# Adding a second level domain to playit.gg (like example.com)

In this guide I will be adding the domain `olumpu.com` to playit.gg, your domain will be different.

## 1. Visit your domain's management page

Visit Spaceship's [advanced dns page](https://www.spaceship.com/application/advanced-dns-application/) and select the domain you want to use.

{{< image src="post-img/spaceship-select-domain.png" alt="manage domain" >}}


## 2. Use Custom DNS under the Nameservers section

Find the section titled **NAMESERVERS** and press the **change** button.

{{< image src="post-img/spaceship-nameservers-change-button.png" alt="spaceship nameservers custom dns" >}}

## 3. Enter playit's DNS nameservers

On the provided lines, add the following name servers

```
ns1.playit-dns.com
ns2.playit-dns.com
```

and press the blue button to save your changes.

{{< image src="post-img/spaceship-edit-nameservers.png" alt="edit nameservers" >}}


## 4. Add your external domain to playit.gg

Visit [https://playit.gg/account/settings/domains/add-external](https://playit.gg/account/settings/domains/add-external) to add your external domain.

Make sure the domain name you enter matches the domain name that you updated on Spaceship. In this example it is `olumpu.com`. For you it will be different.

{{< image src="post-img/playit-add-external-domain.png" alt="playit add external domain" >}}

You're done! You can now assign your domain to your tunnel.

{{< image src="post-img/playit-domain-added.png" alt="playit domain added" >}}

---

# Adding a sub domain to playit.gg (like sub.example.com)

Instead of adding our entire `olumpu.com` domain to playit.gg, we will instead the sub domain `playit.olumpu.com`.

## 1. Visit your domain's management page

Visit Spaceship's [advanced dns page](https://www.spaceship.com/application/advanced-dns-application/) and select the domain you want to use.

{{< image src="post-img/spaceship-select-domain.png" alt="manage domain" >}}

## 2. Go to the DNS settings for the domain

{{< image src="post-img/spaceship-domain-settings.png" alt="domain settings" >}}

## 3. Add a new record

* For **Type**, select: `NS`.
* For **Host**, enter the sub domain you want. Here we'll add `"playit"` for `"playit.olumpu.com"`. This can be whatever you want.
* For **Value**, enter `ns1.playit-dns.com`.
* For **TTL**, leave it as the default (30 minutes)

Then press the Add button to save the record.

{{< image src="post-img/spaceship-add-ns-record.png" alt="spaceship add ns record" >}}


## 4. Add your external sub domain to playit.gg

Visit [https://playit.gg/account/settings/domains/add-external](https://playit.gg/account/settings/domains/add-external) to add your external domain.

Make sure you enter your sub domain. In our case this will be `playit.olumpu.com`.

{{< image src="post-img/playit-add-sub-domain.png" alt="playit add sub domain" >}}

After adding your domain, you should be all set.
