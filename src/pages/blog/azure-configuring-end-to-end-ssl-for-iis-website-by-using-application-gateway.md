---
templateKey: blog-post
title: Azure - Configuring End-to-End SSL for IIS Website by using Application Gateway
description: >-
  This article brief about the steps involved in making an end to end HTTPS website which hosted in a VM IIS, in Azure and the traffic need to be routed via Application Gateway.
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2019-09-24T09:26:00.000Z
image: /img/blog/azure-configuring-end-to-end-ssl-for-iis-website-by-using-application-gateway/cover.png
tags:
  - aspnet-core
---

Lets start from the user, we pointed the domain to the Application Gateway Public IP, now we need to do the following in the Azure Application Gateway.

1. Add an HTTPS listener for that domain with the Certificate.
2. Create a backend pool with the VM where we will publish the website in the IIS.
3. Add an HTTP Settings with the Certificate as shown in the picture.
4. Create a rule which connects the listener (1) and backend pool(2) via the newly created HTTP settings (3).

Once all this done, user will be able to hit Application Gateway with HTTPS and probably will see 404 since the VM not accepting the requests. So lets configure the VM to accept the traffic through 443 port. In the VM,

- Install the SSL certificate.
- Configure the HTTPS website in the IIS with that certificate and the domain.

Since we specified the host name in the bindings for the new site. One more thing we have to do is, since we are using 443 port by default to connect to the VM from Application Gateway with that newly created HTTP Settings, the backend health check probe for the same will also check the health of the machines in the backend pool via 443 port. Unless we specified a custom probe, the `default website`\* should be listening on the 443 port too otherwise you may experience some 503 from the application gateway, and you can check that whether the newly added backend pool will be showing in the unhealthy backend pools of Application Gateway.

In the default website, add a binding for 443 port as shown in the below picture.

[PICTURE IS ABOUT TO UPDATE]

Once this done, VM will accept the HTTPS traffic through the Application Gateway and we are done.

### Additional Resources

- [Quickstart - Configure end-to-end SSL encryption with Azure Application Gateway - Azure portal | Microsoft Docs](https://docs.microsoft.com/en-us/azure/application-gateway/end-to-end-ssl-portal)
