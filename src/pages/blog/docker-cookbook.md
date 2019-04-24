---
templateKey: blog-post
title: 'Docker: Cookbook'
description: Some of the gotcha's related to Docker
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-10-28T18:35:00.000Z
image: /img/frank-mckenna-252014-unsplash.jpg
tags:
  - docker
---

### Overview

- [#1: docker: “build” requires 1 argument. See 'docker build --help'](#1)
- [#2: “read-only file system” error running Docker Toolbox in Windows 7](#2)
- [#3: Docker for windows - Mapping docker to localhost](#3)

#### <a name="1"></a> 1#:  docker: “build” requires 1 argument. See 'docker build --help'
Most probably you missed a dot,  need to add it, example 

```bash
docker build -t docusaurus-doc . 
```

It means you use the Dockerfile in the local directory

#### <a name="2"></a> #2: “read-only file system” error running Docker Toolbox in Windows 7

Try restarting the docker machine by following below steps:

 First, you need to find the name of your docker machine

```bash
 docker-machine ls
```

Then with your machine name, run the command

```bash
docker-machine restart <name>
```

#### <a name="3"></a> #3: Docker for windows - Mapping docker to localhost

You can do it by configuring your Virtualbox. Follow below steps,

- VirtualBox -> Your BOX -> Settings -> Network ->
- Choose NAT
- Open Advanced
- Click Port Forwarding
- Add a new rule to map the desired port you need from host to guest
- Ok/Save
- Stop Box
- Start the Box
