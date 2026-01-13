---
title: Add an external domain with Spaceship
tags: ["external-domain"]
---

This guide assumes you have [playit premium](https://playit.gg/account/billing/shop/premium) and have purchased a domain name on [https://spaceship.com](spaceship.com). For other Domain Registars visit [Add an external domain to playit.gg](/add-external-domain).


* [Adding a second level domain (like example.com)](#adding-a-second-level-domain-to-playitgg-like-examplecom)
* [Adding a sub domain (like sub.example.com)](#adding-a-sub-domain-to-playitgg-like-subexamplecom)


# Adding a second level domain to playit.gg (like example.com)

In this guide I will be adding the domain `olumpu.com` to playit.gg, your domain will be different.

## 1. Visit your domain's management page

Visit Spaceship's [advanced dns page](https://www.spaceship.com/application/advanced-dns-application/) and select the domain you want to use.

![manage domain](/img/spaceship-select-domain.png)


## 2. Use Custom DNS under the Nameservers section

Find the section titled **NAMESERVERS** and press the **change** button.

![spaceship nameservers custom dns](/img/spaceship-nameservers-change-button.png)

## 3. Enter playit's DNS nameservers

On the provided lines, add the following name servers

```
ns1.playit-dns.com
ns2.playit-dns.com
```

and press the blue button to save your changes.

![edit nameservers](/img/spaceship-edit-nameservers.png)


## 4. Add your external domain to playit.gg

Visit [https://playit.gg/account/settings/domains/add-external](https://playit.gg/account/settings/domains/add-external) to add your external domain.

Make sure the domain name you enter matches the domain name that you updated on Spaceship. In this example it is `olumpu.com`. For you it will be different.

![playit add external domain](/img/playit-add-external-domain.png)

You're done! You can now assign your domain to your tunnel.

![playit domain added](/img/playit-domain-added.png)

---

# Adding a sub domain to playit.gg (like sub.example.com)

Instead of adding our entire `olumpu.com` domain to playit.gg, we will instead the sub domain `playit.olumpu.com`.

## 1. Visit your domain's management page

Visit Spaceship's [advanced dns page](https://www.spaceship.com/application/advanced-dns-application/) and select the domain you want to use.

![manage domain](/img/spaceship-select-domain.png)

## 2. Go to the DNS settings for the domain

![domain settings](/img/spaceship-domain-settings.png)

## 3. Add a new record

* For **Type**, select: `NS`.
* For **Host**, enter the sub domain you want. Here we'll add `"playit"` for `"playit.olumpu.com"`. This can be whatever you want.
* For **Value**, enter `ns1.playit-dns.com`.
* For **TTL**, leave it as the default (30 minutes)

Then press the Add button to save the record.

![spaceship add ns record](/img/spaceship-add-ns-record.png)


## 4. Add your external sub domain to playit.gg

Visit [https://playit.gg/account/settings/domains/add-external](https://playit.gg/account/settings/domains/add-external) to add your external domain.

Make sure you enter your sub domain. In our case this will be `playit.olumpu.com`.

![playit add sub domain](/img/playit-add-sub-domain.png)

After adding your domain, you should be all set.