---
title: Inserting Rewrite rule in Release Config
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-08-12T10:48:30.000Z"
templateKey: blog-post
image: /img/web-config.png
description: >-
  Adding rewrite rule in release config is handy so that it will not affect during Debug mode.
tags:
  - debug
  - web-config
  - rewrite-rule
---

My Web.config's system.webServer section initially looked like this,

```xml
<system.webServer>
....
<!--If you wish to use IIS rewrite rules, 
see the documentation here:https://our.umbraco.org/documentation/Reference/Routing/IISRewriteRules-->
 <!--<rewrite>
	<rules></rules>
     </rewrite> -->
</system.webServer>
 ```

And my Web.Release.config looked like this,

```xml
<?xml version="1.0" encoding="utf-8"?>
 
<!-- For more information on using web.config transformation visit https://go.microsoft.com/fwlink/?LinkId=125889 -->
 
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <!--
    In the example below, the "SetAttributes" transform will change the value of 
    "connectionString" to use "ReleaseSQLServer" only when the "Match" locator 
    finds an attribute "name" that has a value of "MyDB".
    
    <connectionStrings>
      <add name="MyDB" 
        connectionString="Data Source=ReleaseSQLServer;Initial Catalog=MyReleaseDB;Integrated Security=True" 
        xdt:Transform="SetAttributes" xdt:Locator="Match(name)"/>
    </connectionStrings>
  -->
  <system.web>
    <compilation xdt:Transform="RemoveAttributes(debug)" />
    <!--
      In the example below, the "Replace" transform will replace the entire 
      <customErrors> section of your web.config file.
      Note that because there is only one customErrors section under the 
      <system.web> node, there is no need to use the "xdt:Locator" attribute.
      
      <customErrors defaultRedirect="GenericError.htm"
        mode="RemoteOnly" xdt:Transform="Replace">
        <error statusCode="500" redirect="InternalError.htm"/>
      </customErrors>
    -->
  </system.web>
</configuration>
```

Now I have to add a rule which redirects all non-www requests to www route. I accomplished the same by modifying the Web.config to,

```xml
<system.webServer>
....
<!--If you wish to use IIS rewrite rules, 
see the documentation here:https://our.umbraco.org/documentation/Reference/Routing/IISRewriteRules-->
   <rewrite>
      <rules></rules>
    </rewrite>
</system.webServer>
```

 And my Web.Release.Config to,

```xml
<?xml version="1.0" encoding="utf-8"?>
 
<!-- For more information on using web.config transformation visit https://go.microsoft.com/fwlink/?LinkId=125889 -->
 
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <!--
    In the example below, the "SetAttributes" transform will change the value of
    "connectionString" to use "ReleaseSQLServer" only when the "Match" locator
    finds an attribute "name" that has a value of "MyDB".
 
    <connectionStrings>
      <add name="MyDB"
        connectionString="Data Source=ReleaseSQLServer;Initial Catalog=MyReleaseDB;Integrated Security=True"
        xdt:Transform="SetAttributes" xdt:Locator="Match(name)" />
    </connectionStrings>
  -->
  <system.web>
    <compilation xdt:Transform="RemoveAttributes(debug)" />
    <!--
      In the example below, the "Replace" transform will replace the entire
      <customErrors> section of your web.config file.
      Note that because there is only one customErrors section under the
      <system.web> node, there is no need to use the "xdt:Locator" attribute.
 
      <customErrors defaultRedirect="GenericError.htm"
        mode="RemoteOnly" xdt:Transform="Replace">
        <error statusCode="500" redirect="InternalError.htm" />
      </customErrors>
    -->
  </system.web>
  <system.webServer>
    <rewrite>
      <rules>
        <clear />
        <rule name="Redirect Non WWW" stopProcessing="true" xdt:Transform="Insert">
          <match url=".*" />
          <conditions>
            <add input="{HTTP_HOST}" pattern="^(?!www)(.*)$" />
          </conditions>
          <action type="Redirect" redirectType="Permanent" url="https://www.{C:1}/{R:0}" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

Noticed the xdt:Transform="Insert" in the line,

```xml
<rule name="Redirect Non WWW" stopProcessing="true" xdt:Transform="Insert">
```

Which will add the rule to the Web.config automatically during publishing. 

This article is part of my daily google series. And this is the very first post in this category.

Cover photo by Caspar Rubin