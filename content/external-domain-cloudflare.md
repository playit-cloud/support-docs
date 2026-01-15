+++
title = "Add an external domain with Cloudflare"
tags = ["external-domain"]
+++

This guide assumes you have [playit premium](https://playit.gg/account/billing/shop/premium) and have added your domain to **Cloudflare DNS**. For other Domain Registrars visit {{< link "add-external-domain" >}}.

# Adding a sub domain to playit.gg (like sub.example.com)

Instead of adding the entire `playit-example.com` domain to playit.gg, we will add the sub domain `minecraft.playit-example.com`.

In this guide, the domain `playit-example.com` is used as an example. Your domain will be different.

## 1. Add your domain to playit

Visit your [account settings](https://playit.gg/account/settings/domains) and add your domain.

Click on `Add External Domain`, and fill out your domain's information.
{{< image src="post-img/playit-addexternaldomain-cloudflare-addexternaldomain.png" alt="playit add external domain" >}}

Once you've done that, confirm your settings by clicking `Add External Domain`.


## 2. Visit your domain's management page

Log in to the **Cloudflare Dashboard**, select your domain, and open the **DNS → Records** page.

{{< image src="post-img/playit-addexternaldomain-cloudflare-managedns.png" alt="cloudflare manage dns" >}}

---

## 3. Add NS records for the sub domain

We will delegate the sub domain to playit.gg using **NS records**.

Create **two DNS records**:

### Record 1

* **Type:** `NS`
* **Name:** `minecraft`
* **Target:** `ns1.playit-dns.com`
* **TTL:** Auto

### Record 2

* **Type:** `NS`
* **Name:** `minecraft`
* **Target:** `ns2.playit-dns.com`
* **TTL:** Auto

{{< image src="post-img/playit-addexternaldomain-cloudflare-add_ns_record.png" alt="cloudflare manage ns" >}}

> ⚠️ Ensure the records are **DNS only** (orange cloud must be disabled).

---

## 4. Assign your domain to a tunnel

Edit or create a new tunnel, and scroll down until you see your tunnel attributes. You should see **Domain (Auto Assigned)**. Click on `change`, go to `Use Existing`, and choose your domain from the dropdown menu

{{< image src="post-img/playit-addexternaldomain-cloudflare-assign_to_tunnel-1.png" alt="playit assign domain" >}}
{{< image src="post-img/playit-addexternaldomain-cloudflare-assign_to_tunnel-2.png" alt="playit assign domain" >}}

Once you've selected your domain, click on `use yourdomain.tld`. Again, your domain will be different.

## 5. Check if the new domain is properly set up

To do this, we can use something like [nslookup.io](https://nslookup.io/)
Enter your domain, and then click **Find DNS records**

{{< image src="post-img/playit-addexternaldomain-cloudflare-check_ns-1.png" alt="check dns records" >}}
{{< image src="post-img/playit-addexternaldomain-cloudflare-check_ns-2.png" alt="check dns records" >}}

---

After adding your domain, it should verify automatically within a few minutes.
