---
templateKey: blog-post
title: Flutter Cookbook
description: This cookbook will help you solve common problems while writing Flutter apps.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-04-30T19:22:00.000Z
lastModificationTime: 2019-08-16T21:22:00.000Z
image: /img/flutter-logo-s.png
tags:
  - flutter
  - cookbook
  - dart
---

Most of the solution implementations mentioned below can be found in my repo [https://github.com/Abhith/piggy-flutter](https://github.com/Abhith/piggy-flutter).

#### Table of Contents <!-- omit in toc -->

- [Navigation](#navigation)
  - [Move to a new screen without back](#move-to-a-new-screen-without-back)
- [Tutorials](#tutorials)
  - [BLoC pattern](#bloc-pattern)
    - [Additional Resources](#additional-resources)
- [Build](#build)
  - [Build failed - null value in entry: outputFile=null](#build-failed---null-value-in-entry-outputfilenull)
  - [Error importing package:http/http.dart](#error-importing-packagehttphttpdart)

### Navigation

#### Move to a new screen without back

An example of this use case is the login page. When a user successfully logged in, we redirect the user to another page, and in most case, we don't want a back button to go back to the login page. This can be easily done using **Navigator.pushReplacement**

```js
    Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => HomePage()),
    );
```

### Tutorials

#### BLoC pattern

As a rookie in the flutter, one of the biggest challenges I faced was state management. Started with StatefulWidget's setState, but sooner understood that it is not enough (state persistence was the tough part). After a long search, found that there are many ways to do it in flutter including Redux, Scoped Model, BLoC etc. I don't like Redux too much, I tried it for React Native app earlier and moved to mobx-state-tree instead.

One I got excited about was Streams and BLoC (business logic components). But first found tutorials was not enough and heavily confusing (for a rookie). But tried them one by one and my solutions get better after each commit. The tutorial which really helped me was,

One thing not mentioned in the video is accessing the bloc instance via InheritedWidget, which you can understand by referring the code

##### Additional Resources

- [Reactive Programming - Streams - BLoC](https://www.didierboelens.com/2018/08/reactive-programming---streams---bloc/)
- [Youtube Video](https://www.youtube.com/embed/fahC3ky_zW0?rel=0&amp;start=1125)
- [state_experiments - GitHub](https://github.com/filiph/state_experiments/tree/master/shared/lib/src/bloc_complex)

### Build

#### Build failed - null value in entry: outputFile=null

Recently my machine shutdown unexpectedly during a build in progress. After that, all the build is failing with this error.
> Removing the .gradle directory in the root project directory will fix the problem.

#### Error importing package:http/http.dart

After long time, when I tried to build, I got this error. To resolve,

Go to your **pubspec.yaml** file , and add the `http` dependency:

```yml
dependencies:
  flutter:
    sdk: flutter

  cupertino_icons: ^0.1.2
  http: any
```

Then run the following,

```bash
flutter packages get
```

If you are using **VS Code** as the IDE, the above will be automatically executed once you save the **pubspec.yaml** file. (If you installed the [Flutter](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) extension for VS Code).
