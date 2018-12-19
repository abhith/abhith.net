
## Overview

- [#1: docker: “build” requires 1 argument. See 'docker build --help'](#1)
- [#2: “read-only file system” error running Docker Toolbox in Windows 7](#2)
- [#3: Docker for windows - Mapping docker to localhost](#3)

#### <a name="1"></a> 1#:  docker: “build” requires 1 argument. See 'docker build --help'
Most probably you missed a dot,  need to add it, example 

```bash
docker build -t docusaurus-doc . 
```
It means you use the Dockerfile in the local directory

#### <a name="2"></a> “read-only file system” error running Docker Toolbox in Windows 7

Try restarting the docker machine by following below steps:

- First you need to find the name of your docker machine

```bash
 docker-machine ls
```
- Then with your machine name, run the command

```bash
docker-machine restart <name>
```

#### <a name="3"></a> Docker for windows - Mapping docker to localhost

You can do it by configuring your Virtualbox. Follow below steps,

1. VirtualBox -> Your BOX -> Settings -> Network ->
2. Choose NAT
3. Open Advanced
4. Click Port Forwarding
5. Add new rule to map desired port you need from host to guest
6. Ok/Save
7. Stop Box
8. Start Box

