---
templateKey: blog-post
title: 'Docker: Cookbook'
description: Some of the gotcha's related to Docker
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-10-28T18:35:00.000Z
lastModificationTime: 2019-05-02T13:32:00.000Z
image: /img/frank-mckenna-252014-unsplash.jpg
tags:
  - docker
  - cookbook
---

This article is dedicated for gotcha's I experienced during Docker development, plus some routine stuffs related to **Docker** development and some helpful external resources.

#### Table of Contents <!-- omit in toc -->

- [Problems](#problems)
  - [1. docker: “build” requires 1 argument. See 'docker build --help'](#1-docker-build-requires-1-argument-see-docker-build---help)
  - [2. “read-only file system” error running Docker Toolbox in Windows 7](#2-read-only-file-system-error-running-docker-toolbox-in-windows-7)
  - [3. Docker for windows - Mapping docker to localhost](#3-docker-for-windows---mapping-docker-to-localhost)
  - [4. COPY failed: CreateFile](#4-copy-failed-createfile)
  - [5. Force Docker for a clean build (not using cache)](#5-force-docker-for-a-clean-build-not-using-cache)
  - [6. Rename a Container](#6-rename-a-container)
- [Questions](#questions)
  - [1. Difference between docker `run` and `start`](#1-difference-between-docker-run-and-start)
- [CLI](#cli)
  - [docker-compose](#docker-compose)
    - [Build the images, do not start the containers](#build-the-images-do-not-start-the-containers)
    - [Build the images if the images do not exist and start the containers](#build-the-images-if-the-images-do-not-exist-and-start-the-containers)
    - [Force to build the images even when not needed](#force-to-build-the-images-even-when-not-needed)
    - [Skip the image build process](#skip-the-image-build-process)
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

##### Force to build the images even when not needed

```bash
docker-compose up --build
```

##### Skip the image build process

```bash
docker-compose up --build
```

If the images aren't built beforehand, this fails.

### External Resources

- [How to Connect to Your Local SQL Server From Inside Docker &mdash; Jack Vanlightly](https://jack-vanlightly.com/blog/2017/9/24/how-to-connect-to-your-local-sql-server-from-inside-docker)