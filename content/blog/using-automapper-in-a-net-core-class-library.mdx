---
templateKey: blog-post
title: Using AutoMapper in a .NET Core Class Library
description: >-
  Configuring and using AutoMapper in a .NET CORE class library is briefed in this article.
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2019-09-11T12:59:27.975Z
image: /img/blog/using-automapper-in-a-net-core-class-library.png
tags:
  - c-sharp
  - dotnet-core
---

AutoMapper is a handy helper library to do mapping between objects. In most scenarios, you might have an Entity Class and you want to map it to some DTO class or vice versa. With minimal configuration, **AutoMapper** can do this mapping without you creating a method where you map each field one by one.

Suppose I have to map _Entity_ class to _EntityDto_ and they look like,

```cs
public class Entity
{
  public string Name {get;set;}
  public Guid Id {get;set;}
  public string CurrencyCode {get;set;}
  public decimal CurrencyValue {get;set;}
}

public class EntityDto
{
  public string Name {get;set;}
  public Guid Id {get;set;}
  public Currency Currency {get;set;}
}

public class Currency
{
  public string Code {get;set;}
  public string Value {get;set;}
}
```

```cs
using AutoMapper;
...

public class SomeService : ISomeService
{
  private IMapper _iMapper;

  public SomeService()
  {
    // One time configuration
      var config = new MapperConfiguration(cfg =>
      {
          cfg.CreateMap<Entity, EntityDto>().ForMember(dto => dto.Currency, map => map.MapFrom(source => new Currency
          {
              Code = source.CurrencyCode,
              Value = source.CurrencyValue.ToString("0.00")
          }));
      });

      _iMapper = config.CreateMapper();
  }
...
}


public async Task<DtoClass> GetAsync(Guid id)
{
    Entity entity = await GetEntityByIdAsync(id);

    // using auto mapper to do the mapping
    var dto = _iMapper.Map<DtoClass>(entity);

    return dto;
}
```

In the mapping configuration, we didn't specify anything related _Id, Name_ properties. **AutoMapper** will map them automatically since the source and destination property name matches for those.

Read more about the configuration and all on the official website of [AutoMapper](https://automapper.org/).
