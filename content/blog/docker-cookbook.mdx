---
templateKey: blog-post
title: 'Docker: Cookbook'
description: >- 
  If you are new to docker then this post might be useful. It contains solutions to common problems, regular use case commands and some additional resources. 
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-10-28T18:35:00.000Z
lastModificationTime: 2019-05-16T14:42:00.000Z
image: /img/frank-mckenna-252014-unsplash.jpg
tags:
  - docker
  - cookbook
---

This article is my own reference for Docker development, contains solutions for problems I have faced while working with **Docker** and some helpful external resources.

#### Table of Contents <!-- omit in toc -->

- [Problems](#problems)
  - [1. docker: “build” requires 1 argument. See 'docker build --help'](#1-docker-build-requires-1-argument-see-docker-build---help)
  - [2. “read-only file system” error running Docker Toolbox in Windows 7](#2-read-only-file-system-error-running-docker-toolbox-in-windows-7)
  - [3. Docker for windows - Mapping docker to localhost](#3-docker-for-windows---mapping-docker-to-localhost)
  - [4. COPY failed: CreateFile](#4-copy-failed-createfile)
  - [5. Force Docker for a clean build (not using cache)](#5-force-docker-for-a-clean-build-not-using-cache)
  - [6. Rename a Container](#6-rename-a-container)
  - [7. $'\r': command not found](#7-r-command-not-found)
  - [8. Copy docker image from one host another](#8-copy-docker-image-from-one-host-another)
  - [9. Dotnet core build error when building docker image - Missing Newtonsoft.Json](#9-dotnet-core-build-error-when-building-docker-image---missing-newtonsoftjson)
- [Questions](#questions)
  - [1. Difference between docker `run` and `start`](#1-difference-between-docker-run-and-start)
- [CLI](#cli)
  - [docker-compose](#docker-compose)
    - [Build the images, do not start the containers](#build-the-images-do-not-start-the-containers)
    - [Build the images if the images do not exist and start the containers](#build-the-images-if-the-images-do-not-exist-and-start-the-containers)
    - [Force `docker-compose` to build from scratch, no cache](#force-docker-compose-to-build-from-scratch-no-cache)
    - [Force to build the images even when not needed](#force-to-build-the-images-even-when-not-needed)
    - [Run multiple containers of the same image](#run-multiple-containers-of-the-same-image)
    - [Build single container using docker-compose](#build-single-container-using-docker-compose)
- [External Resources](#external-resources)

### Problems

#### 1. docker: “build” requires 1 argument. See 'docker build --help'

Most probably you missed a dot,  need to add it, example

```bash
docker build -t docusaurus-doc .
```

It means you use the Dockerfile in the local directory

#### 2. “read-only file system” error running Docker Toolbox in Windows 7

Try restarting the docker machine by following below steps:

 First, you need to find the name of your docker machine

```bash
 docker-machine ls
```

Then with your machine name, run the command

```bash
docker-machine restart <name>
```

#### 3. Docker for windows - Mapping docker to localhost

You can do it by configuring your Virtualbox. Follow below steps,

- VirtualBox -> Your BOX -> Settings -> Network ->
- Choose NAT
- Open Advanced
- Click Port Forwarding
- Add a new rule to map the desired port you need from host to guest
- Ok/Save
- Stop Box
- Start the Box

#### 4. COPY failed: CreateFile

In my visual studio solution, containing a .NET Core Console app, I enabled Docker support using [Visual studio container tools on Windows](https://docs.microsoft.com/en-us/visualstudio/containers/overview?view=vs-2019).

![ Visual studio container tools on Windows](/img/docker-cookbook-add-docker-support-menu.png)

And it generated a **Dockerfile** inside the selected project but when i tried to build an image from inside the project directory using the docker command

```bash
docker build -t myimagename .
```

It failed with following exception,

> COPY ["ProjectDirectory/ProjectName.csproj", "ProjectDirectory/"]
COPY failed: CreateFile \\?\C:\ProgramData\Docker\tmp\docker-builder366701720\ProjectDirectory\ProjectName.csproj: The system cannot find the path specified.

This was because I tried to run this from inside the `ProjectDirectory`. Why I tried to run from there was because the while enabling docker support via **Visual Studio 2019** context menu, the Dockerfile generated inside that project directory, not in the root directory of solution.

So inorder to fix this, I moved the same Dockerfile to the root directory of the solution. It can be done via Powershell command

```bash
mv Dockerfile ../Dockerfile
```

Then `cd` into the root directory of the solution where now the Dockerfile is, and run the build command, and it worked.

#### 5. Force Docker for a clean build (not using cache)

Using `--no-cache` in your build command.

eg

```bash
docker build --no-cache -t myimagename .
```

#### 6. Rename a Container

Using the docker `rename` command.

```bash
docker rename CONTAINER_ID my_new_container_name
```

#### 7. $'\r': command not found

This is occurred when I tried to run some `sh` file in my linux container. That `sh` file was saved in **CRLF** end of line sequence, changing it to **LF** solved the problem.

If you wonder what is **End of line sequence**,

> The End of Line (EOL) sequence ( 0x0D 0x0A , \r\n ) is actually two ASCII characters, a combination of the CR and LF characters. It moves the cursor both down to the next line and to the beginning of that line.

If you are using **Vscode**, switching **EOL** is easy, on the bottom right corner, you can find the current EOL sequence of the editing file, by clicking on it, Vscode will present you a dropdown to choose from. Select the **LF** in this case, and save file.

#### 8. Copy docker image from one host another

By using `docker save` command, we can export docker image as a `.tar` file.

```bash
docker save -o /path/image_name.tar image_name
```

The above will create an image_name.tar file in the path specified. Copy it to the new host, then you can import the image to the new host by using `docker load` like below,

```bash
docker load -i <path to image tar file>
```

#### 9. Dotnet core build error when building docker image - Missing Newtonsoft.Json

In my case, When used `JsonProperty` in a class,

Visual Studio intellicode auto-filled,

```cs
using Newtonsoft.Json;
```

Then during `docker build`,

> warning MSB3245: Could not resolve this reference. Could not locate the assembly "Newtonsoft.Json". Check to make sure the assembly exists on disk.

When I checked, found out that the Visual Studio added an **Assembly Reference** to `Newtonsoft.Json` (you can find this by expanding **Dependencies** node in the solution explorer in Visual Studio). And I was using Linux images.

So in order to solve this, I removed the **Assembly Reference**, and added nuget package `Newtonsoft.Json`, then the `docker build` was successful.

### Questions

#### 1. Difference between docker `run` and `start`

In short,

- run : runs an image. i.e it will create a container from that image first and then starts the container. All in one command.
- start : starts the specified container.

So if you created a container from an image using the `create` command, then you can use `start` command to start that container. Or you can start a container from the image by using the `run` command.

### CLI

#### docker-compose

##### Build the images, do not start the containers

```bash
docker-compose build
```

##### Build the images if the images do not exist and start the containers

```bash
docker-compose up
```

##### Force `docker-compose` to build from scratch, no cache

```bash
docker-compose build --no-cache
```

##### Force to build the images even when not needed

```bash
docker-compose up --build
```

##### Run multiple containers of the same image

```bash
docker-compose up --scale <SERVICE_NAME>=n
```

Replace the `<SERVICE_NAME>` with the appropriate service listed in the **docker-compose.yml** and `n` with the number of containers you want, in order to create that number of containers of that service.

##### Build single container using docker-compose

```bash
docker-compose build <SERVICE_NAME>
```

Replace the `<SERVICE_NAME>` with the appropriate service listed in the **docker-compose.yml**.

### External Resources

- [How to Connect to Your Local SQL Server From Inside Docker &mdash; Jack Vanlightly](https://jack-vanlightly.com/blog/2017/9/24/how-to-connect-to-your-local-sql-server-from-inside-docker)