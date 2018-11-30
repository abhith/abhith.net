---
title: .NET Interview Questions and Answers
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
---

Here I am listing some of the interview questions I have faced when applied for .NET developer/Software engineer roles.

<!--truncate-->

Following are some of the questions which I faced during interviews (don't remember all of them).

### General

- [Self-introduction (*)](#self-introduction)

### Knowledge

- [Difference between WCF and Web API](#difference-between-wcf-and-web-api)
- [Delegates](#delegates )
- [ASP.NET Page Life Cycle (3)](#aspnet-page-life-cycle)
- [Session-State Modes](#session-state-modes)
- [How to find out whether it is a post back in the web form](#how-to-find-out-whether-it-is-a-post-back-in-the-web-form)

### Other

- IIS version you are using

### Practical Level

- [Query the second most salary from a table of salaries using SQL](#query-the-second-most-salary-from-a-table-of-salaries-using-sql)
- Write a simple Angular 5 app which list data from a REST API. Include some action on the list like delete row.

Noticed the count/* beside some questions?
It indicates that the question was asked on multiple occasions.

### <a name="self-introduction"></a> Self-introduction

No matter what kind of interview you are going to attend, prepare for this question. 

### <a name="difference-between-wcf-and-web-api"></a> Difference between WCF and Web API

- WCF enables building services that support multiple transport protocols (HTTP, TCP, UDP, and custom transports) and allows switching between them.
- Web API is HTTP only. The first-class programming model for HTTP. More suitable for access from various browsers, mobile devices etc enabling wide reach.
- WCF enables building services that support multiple encodings (Text, MTOM, and Binary) of the same message type and allows switching between them.
- Web API supports a wide variety of media types including XML, JSON etc.
- WCF supports building services with WS-* standards like Reliable Messaging, Transactions, Message Security.
- Web API uses basic protocol and formats such as HTTP, WebSockets, SSL, JSON, and XML. There is no support for higher level protocols such as Reliable Messaging or Transactions.
- WCF supports Request-Reply, One Way, and Duplex message exchange patterns.
- HTTP is request/response but additional patterns can be supported through SignalR and WebSockets integration with Web API.
- WCF SOAP services can be described in WSDL allowing automated tools to generate client proxies even for services with complex schemas.
- There is a variety of ways to describe a Web API ranging from auto-generated HTML help page (eg. Swagger) describing snippets to structured metadata for OData integrated APIs.
- WCF ships with the .NET framework.
- Web API ships with the .NET framework but is open-source and is also available out-of-band as an independent download.

#### Additional Resources

- [WCF and ASP.NET Web API | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/framework/wcf/wcf-and-aspnet-web-api)

### <a name="delegates"></a> Delegates

A delegate is a type that represents references to methods with a particular parameter list and return type.

- Delegates allow methods to be passed as parameters.
- Delegates can be used to define callback methods. 
- Delegates can be chained together.

#### Additional Resources

- [Delegates (C# Programming Guide) | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/)

### <a name="aspnet-page-life-cycle"></a> ASP.NET Page Life Cycle

When an ASP.NET page runs, the page goes through a life cycle in which it performs a series of processing steps. These include initialization, instantiating controls, restoring and maintaining state, running event handler code, and rendering. It is important for you to understand the page life cycle so that you can write code at the appropriate life-cycle stage for the effect you intend.

#### General Page Life-Cycle Stages

In general terms, the page goes through the stages outlined in the following table.

|Stage  |Description  |
|---------|---------|
|Page request     |The page request occurs before the page life cycle begins. When the page is requested by a user, ASP.NET determines whether the page needs to be parsed and compiled (therefore beginning the life of a page), or whether a cached version of the page can be sent in response without running the page.      |
|Start     |In the start stage, page properties such as Request and Response are set. At this stage, the page also determines whether the request is a postback or a new request and sets the IsPostBack property. The page also sets the UICulture property.|
|Initialization     |During page initialization, controls on the page are available and each control's UniqueID property is set. A master page and themes are also applied to the page if applicable. If the current request is a postback, the postback data has not yet been loaded and control property values have not been restored to the values from view state.     |
|Load     |     During load, if the current request is a postback, control properties are loaded with information recovered from view state and control state.    |
|Postback event handling     |    If the request is a postback, control event handlers are called. After that, the Validate method of all validator controls is called, which sets the IsValid property of individual validator controls and of the page. (There is an exception to this sequence: the handler for the event that caused validation is called after validation.)     |
|Rendering     |    Before rendering, view state is saved for the page and all controls. During the rendering stage, the page calls the Render method for each control, providing a text writer that writes its output to the OutputStream object of the page's Response property.     |
|Unload     |    The Unload event is raised after the page has been fully rendered, sent to the client, and is ready to be discarded. At this point, page properties such as Response and Request are unloaded and cleanup is performed.     |

#### Life-Cycle Events

Within each stage of the life cycle of a page, the page raises events that you can handle to run your own code.

|Page Event  |Typical Use  |
|---------|---------|
|PreInit     |  Raised after the start stage is complete and before the initialization stage begins. Use this event for Checking the IsPostBack property to determine whether this is the first time the page is being processed, The IsCallback and IsCrossPagePostBack properties have also been set at this time, Create or re-create dynamic controls, Set a master page dynamically, Set the Theme property dynamically and Read or set profile property values.       |
|Init     |   Raised after all controls have been initialized and any skin settings have been applied. The Init event of individual controls occurs before the Init event of the page. Use this event to read or initialize control properties.      |
|InitComplete     |Raised at the end of the page's initialization stage. Only one operation takes place between the Init and InitComplete events: tracking of view state changes is turned on. View state tracking enables controls to persist any values that are programmatically added to the ViewState collection. Until view state tracking is turned on, any values added to view state are lost across postbacks. Controls typically turn on view state tracking immediately after they raise their Init event. Use this event to make changes to view state that you want to make sure are persisted after the next postback.         |
|PreLoad     |   Raised after the page loads view state for itself and all controls, and after it processes postback data that is included with the Request instance.      |
|Load     |    The Page object calls the OnLoad method on the Page object, and then recursively does the same for each child control until the page and all controls are loaded. The Load event of individual controls occurs after the Load event of the page. Use the OnLoad event method to set properties in controls and to establish database connections.     |
|Control events     |   Use these events to handle specific control events, such as a Button control's Click event or a TextBox control's TextChanged event.      |
|LoadComplete     |    Raised at the end of the event-handling stage. Use this event for tasks that require that all other controls on the page be loaded.     |
|PreRender     | Raised after the Page object has created all controls that are required in order to render the page, including child controls of composite controls. (To do this, the Page object calls EnsureChildControls for each control and for the page.) The Page object raises the PreRender event on the Page object, and then recursively does the same for each child control. The PreRender event of individual controls occurs after the PreRender event of the page. Use the event to make final changes to the contents of the page or its controls before the rendering stage begins.        |
|PreRenderComplete     |      Raised after each data bound control whose DataSourceID property is set calls its DataBind method. For more information, see Data Binding Events for Data-Bound Controls later in this topic.   |
|SaveStateComplete     |    Raised after view state and control state have been saved for the page and for all controls. Any changes to the page or controls at this point affect rendering, but the changes will not be retrieved on the next postback.     |
|Render     | This is not an event; instead, at this stage of processing, the Page object calls this method on each control. All ASP.NET Web server controls have a Render method that writes out the control's markup to send to the browser. If you create a custom control, you typically override this method to output the control's markup. However, if your custom control incorporates only standard ASP.NET Web server controls and no custom markup, you do not need to override the Render method. For more information, see Developing Custom ASP.NET Server Controls. A user control (an .ascx file) automatically incorporates rendering, so you do not need to explicitly render the control in code.        |
|Unload     |   Raised for each control and then for the page. In controls, use this event to do final cleanup for specific controls, such as closing control-specific database connections. For the page itself, use this event to do final cleanup work, such as closing open files and database connections, or finishing up logging or other request-specific tasks.      |

#### Additional Resources

- [ASP.NET Page Life Cycle Overview | MSDN](https://msdn.microsoft.com/en-us/library/ms178472.aspx)

### <a name="session-state-modes"></a> Session-State Modes

ASP.NET session state supports several different storage options for session data.

|Mode  |Description  |
|---------|---------|
|InProc      |  which stores session state in memory on the Web server. This is the default.       |
|StateServer      |        which stores session state in a separate process called the ASP.NET state service. This ensures that session state is preserved if the Web application is restarted and also makes session state available to multiple Web servers in a Web farm.  |
|SQLServer      |     stores session state in a SQL Server database. This ensures that session state is preserved if the Web application is restarted and also makes session state available to multiple Web servers in a Web farm.    |
|Custom      |      which enables you to specify a custom storage provider.   |
|Off      |    which disables session state.     |

#### Additional Resources

- [Session-State Modes | MSDN](https://msdn.microsoft.com/en-us/library/ms178586.aspx)

### <a name="how-to-find-out-whether-it-is-a-post-back-in-the-web-form"></a> How to find out whether it is a post back in the web form

By checking **Page.IsPostBack** Property, Gets a value that indicates whether the page is being rendered for the first time or is being loaded in response to a postback.

#### Additional Resources

- [Page.IsPostBack Property | MSDN](https://msdn.microsoft.com/en-us/library/system.web.ui.page.ispostback(v=vs.110).aspx)

### <a name="query-the-second-most-salary-from-a-table-of-salaries-using-sql"></a> Query the second most salary from a table of salaries using SQL

> SELECT TOP 1 * FROM TABLENAME WHERE SALARY < (SELECT MAX(SALARY) FROM TABLENAME) ORDER BY SALARY DESC

Of course there is another better solution, which is using SQL OFFSET-FETCH clause, which is 
> SELECT * FROM TABLENAME ORDER BY SALARY DESC OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY

- [#2.1 CLR](#2.1)
- [#2.2 Rate your SQL skill out of 10]()
- [#2.3 Difference between procedure and function (SQL)]() 
- [#2.4 CTE]()
- [#2.5 Server side paging via sql]()
- [#2.6 Server side paging via entity framework]()
- [#2.7 Entity framework approaches]() 
- [#2.8 Entity framework Version you have experience in]()
- [#2.9 Architecture of xamarin forms project]()
- [#2.10 PCL]()
- [#2.11 How PCL compiled]()
- [#2.12 Difference between PCL and shared projects (Xamarin)]()
- [#2.13 Why using Xamarin forms over native application]()
- [#2.14 Angular modules]()
- [#2.15 Angular controllers]()
- [#2.16 SQL Constraints]()
- [#2.17 What is MVC]()
- [#2.18 Can we define multiple actions with same name in a MVC controller]()
- [#2.19 How model is validated MVC]()
- [#2.20 Some components annotations]() 
- [#2.21 How to differentiate Web API controllers from MVC controllers if they have same name]()
- [#2.23 What can be done in wcf which cannot done in Web API]()
- [#2.24 Oauth]()
- [#2.25 Oath flow]()
- [#2.26 Odata]()
- [#2.27 Can we return view from Web api?]()
- [#2.28 Session in MVC]()
- [#2.29 Difference between tempdata viewdata and viewbag]()
- [#2.30 Bundling]()
- [#2.31 What's inside app data folder]()
- [#2.32 Mvc request life cycle]()
- [#2.33 Cache advantages]()
- [#2.34 How can we define Cache expiry]()
- [#2.35 Self introduction]()
- [#2.36 Rate your skill in angularjs out of 5]()
- [#2.37 How an old SQL project can be moved to entity framework in less time]()
- [#2.38 Mvc project structure]()
- [#2.39 Areas in MVC]()
- [#2.40 What's inside MVC areas folder]()
- [#2.41 Type of results from mvc controller action]()
- [#2.42 Routing in MVC]()
- [#2.43 Attribute routing in MVC]()
- [#2.44 Routing priority]()
- [#2.45 Filters in mvc]()
- [#2.46 Razor]()
- [#2.47 Tag helpers in MVC]() 
- [#2.48 Tag helpers or html helpers you use and why]()
- [#2.49 Dependency injection]()
- [#2.50 Cors]()
- [#2.51 Advantages of Razor]()
- How to retrieve data posted in MVC controller
- [3.1 Stored procedures vs functions]() 
- [3.2 Dependency injection in angular]()
- [3.3 Controllers in angular]()
- [3.4 Azure]()
- [3.6 Generics]()
- [3.7 Override method in a class]()
- [3.8 Filters in mvc]()
- [3.9 Routing in mvc]()
- [3.10  Attribute routing]()
- [3.11  Worker types in azure]()
- [3.12  Iaas azure]()
- [3.13  Difference between mvc 5 and 6]()
- [3.14  Crud in entity framework]()
- Redis
- Lazy loading in EF
- IEnumerable vs List

### Umbraco

- Did your Umbraco sites backoffice is publically accessible?
- Archetype 
- What is the alternative for Archetype ?
- Packages you have worked with
- Custom Data Type
- How to show custom error for media upload if file size exceeds the limit ?
- Events 
- Experience with Umbraco Forms
- Difference between surface controller and a normal mvc controller?
- API Controller
- Built authorized pages?

As you can see, this a long list so will take time to format the questions as well as include answers. Consider this as a draft for now.