---
templateKey: blog-post
title: React Native - Build APK
description: >-
  You can build APK (debug) from your react native project by using three
  commands.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-04-24T19:34:00.000Z
image: /img/steve-johnson-540038-unsplash.jpg
tags:
  - react-native
---

#### First

> react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug

#### Second

> cd android

#### Final

> ./gradlew assembleDebug

Once all three commands executed successfully. You can find the generated APK on 
> Project root directory > android > app > build > outputs > apk > app-debug.apk

As the name suggests, this is not a release version. But still, you can share it with testers. I use [hockeyapp](http://hockeyapp.net) to do the distribution.
