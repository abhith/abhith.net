---
templateKey: blog-post
title: Microsoft Orleans - Run Multiple Silos from a .NET Core Console App
description: >-
  If you are new to Microsoft Orleans and you are in a stage where you want to
  run multiple Silo from a single .NET Core console app, here is a way to
  achieve that.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2019-04-24T12:11:27.975Z
image: /img/logo-microsoft-orleans.png
tags:
  - microsoft-orleans
  - dotnet-core
---

My Silo Host project `Program.cs` **Main** method looks like below,

```cs
private static async Task Main(string[] args)
{
    int siloPort, gatewayPort;
    try
    {
        siloPort = int.Parse(args[0]);
        gatewayPort = int.Parse(args[1]);
    }
    catch (Exception)
    {
        siloPort = 11111;
        gatewayPort = 30000;
    }

    var invariant = "System.Data.SqlClient"; // for Microsoft SQL Server
    var connectionString = "Data Source=.;Initial Catalog=OrleansCluster;Integrated Security=True;Pooling=False;Max Pool Size=200;MultipleActiveResultSets=True";

    var siloBuilder = new SiloHostBuilder()
                    // Clustering information
                    .Configure<ClusterOptions>(options =>
                    {
                        options.ClusterId = "dev";
                        options.ServiceId = "ServiceApp";
                    })
                    .UseAdoNetClustering(options =>
                    {
                        options.Invariant = invariant;
                        options.ConnectionString = connectionString;
                    })
                    .ConfigureEndpoints(siloPort: siloPort, gatewayPort: gatewayPort)
                    
                    .ConfigureLogging(logging => logging.AddConsole());

    using (var host = siloBuilder.Build())
    {
        await host.StartAsync();
        Console.ReadLine();
    }
}
```

To run multiple Silo, we need to specify different set of ports for each. Here we are achieving the same via parsing the args.

Now you can run a Silo by executing following command on the Silo project root directory

```bash
dotnet run <siloPort> <gatewayPort>
```

eg,

```bash
dotnet run 11111 30000
dotnet run 11112 30001
dotnet run 11113 30002
```
