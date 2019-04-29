---
templateKey: blog-post
title: 'Vue.js List Rendering : Limit items in v-for'
description: One way to limit the iteration of items in Vue v-for directive.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-02-27T18:25:00.000Z
image: /img/vuejs.png
tags:
  - vue
  - javascript
commentId: '9aec474d-215a-44a1-8d06-9ec21bebd5fe'
---
Today I had to render 200+ items in a bootstrap table which didn't appear to be user-friendly. So I planned to show first 20 of them on load, and if the user wanted, show full items.

To do that, my Vue app code looks like this,
<pre style="font-family:Fantasque Sans Mono;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:#569cd6;">var</span>&nbsp;<span style="color:violet;">app</span>&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;<span style="color:#569cd6;">new</span>&nbsp;<span style="color:lightgray;">Vue</span>({
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:violet;">el</span>:&nbsp;<span style="color:#d69d85;">&#39;#app&#39;</span>,
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:cyan;">data</span>:&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:violet;">countries</span>:&nbsp;[],
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:violet;">isLoadingCountries</span>:&nbsp;<span style="color:#569cd6;">false</span>,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:violet;">showLessCountries</span>:&nbsp;<span style="color:#569cd6;">true</span>
&nbsp;&nbsp;&nbsp;&nbsp;},
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:violet;">methods</span>:&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:cyan;">getCountries</span>:&nbsp;<span style="color:#569cd6;">function</span>&nbsp;()&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:violet;">app</span>.<span style="color:lightgray;">isLoadingCountries</span>&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;<span style="color:#569cd6;">true</span>;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:violet;">app</span>.<span style="color:lightgray;">$http</span>.<span style="color:cyan;">get</span>(<span style="color:#d69d85;">&#39;some-url&#39;</span>).<span style="color:cyan;">then</span>(<span style="color:#569cd6;">function</span>&nbsp;(response)&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">if</span>&nbsp;(response.<span style="color:cyan;">data</span>)&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">if</span>&nbsp;(response.<span style="color:cyan;">data</span>.<span style="color:violet;">isSuccess</span>)&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:violet;">app</span>.<span style="color:violet;">countries</span>&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;response.<span style="color:cyan;">data</span>.<span style="color:violet;">countries</span>;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}).<span style="color:cyan;">then</span>(<span style="color:#569cd6;">function</span>&nbsp;()&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:violet;">app</span>.<span style="color:lightgray;">isLoadingCountries</span>&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;<span style="color:#569cd6;">false</span>;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;},
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:cyan;">created</span>:&nbsp;<span style="color:#569cd6;">function</span>&nbsp;()&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">this</span>.<span style="color:cyan;">getCountries</span>();
&nbsp;&nbsp;&nbsp;&nbsp;}
})</pre>

Basically, it contains an array, one flag to indicate the data fetch operation is ongoing or not, one flag to indicate whether the full list is showing or fewer items, and a function to fill the data in the array. I hope the naming convention in the code is pretty self-explanatory.

And my markup,
<pre style="font-family:Fantasque Sans Mono;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:gray;">&lt;</span><span style="color:#569cd6;">table</span>&nbsp;<span style="color:#9cdcfe;">class</span><span style="color:#b4b4b4;">=</span><span style="color:#c8c8c8;">&quot;table&quot;</span>&nbsp;<span style="color:#9cdcfe;">v-if</span><span style="color:#b4b4b4;">=</span><span style="color:#c8c8c8;">&quot;!isLoadingCountries&quot;</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">thead</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">tr</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">th</span>&nbsp;<span style="color:#9cdcfe;">scope</span><span style="color:#b4b4b4;">=</span><span style="color:#c8c8c8;">&quot;col&quot;</span><span style="color:gray;">&gt;</span>Country<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">th</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">tr</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">thead</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">tbody</span>&nbsp;<span style="color:#9cdcfe;">v-if</span><span style="color:#b4b4b4;">=</span><span style="color:#c8c8c8;">&quot;showLessCountries&quot;</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">tr</span>&nbsp;<span style="color:#9cdcfe;">v-for</span><span style="color:#b4b4b4;">=</span><span style="color:#c8c8c8;">&quot;country&nbsp;in&nbsp;countries.slice(0,&nbsp;20)&quot;</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">td</span><span style="color:gray;">&gt;&lt;</span><span style="color:#569cd6;">h5</span><span style="color:gray;">&gt;</span><span style="font-weight:bold;">{{</span><span style="color:magenta;">country.name</span><span style="font-weight:bold;">}}</span><span style="color:gray;">&lt;/</span><span style="color:#569cd6;">h5</span><span style="color:gray;">&gt;&lt;/</span><span style="color:#569cd6;">td</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">tr</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">tbody</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">tbody</span>&nbsp;<span style="color:#9cdcfe;">v-else</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">tr</span>&nbsp;<span style="color:#9cdcfe;">v-for</span><span style="color:#b4b4b4;">=</span><span style="color:#c8c8c8;">&quot;country&nbsp;in&nbsp;countries&quot;</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">td</span><span style="color:gray;">&gt;&lt;</span><span style="color:#569cd6;">h5</span><span style="color:gray;">&gt;</span><span style="font-weight:bold;">{{</span><span style="color:magenta;">country.name</span><span style="font-weight:bold;">}}</span><span style="color:gray;">&lt;/</span><span style="color:#569cd6;">h5</span><span style="color:gray;">&gt;&lt;/</span><span style="color:#569cd6;">td</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">tr</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">tbody</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">table</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&lt;</span><span style="color:#569cd6;">button</span>&nbsp;<span style="color:#9cdcfe;">v-if</span><span style="color:#b4b4b4;">=</span><span style="color:#c8c8c8;">&quot;!isLoadingCountries&quot;</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#9cdcfe;">@@click</span><span style="color:#b4b4b4;">=</span><span style="color:#c8c8c8;">&quot;showLessCountries&nbsp;=&nbsp;!showLessCountries&quot;</span><span style="color:gray;">&gt;</span>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight:bold;">{{</span><span style="color:magenta;">showLessCountries===true?</span>&nbsp;<span style="color:magenta;">&quot;Show</span>&nbsp;<span style="color:magenta;">All</span>&nbsp;<span style="color:magenta;">Countries&quot;</span>&nbsp;<span style="color:magenta;">:</span>&nbsp;<span style="color:magenta;">&quot;Show</span>&nbsp;<span style="color:magenta;">Less&quot;</span><span style="font-weight:bold;">}}</span>
<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">button</span><span style="color:gray;">&gt;</span></pre>
Here, Using **Array.slice()**, we get a new array with the limited number of items from the original array. And we show the new sliced array items or the original array full items based on the flag. And a button to toggle the flag. If you wonder why I used **@@**click in Vue, is because my markup is written in **Razor** (.cshtml).

### Update 1

As Andrew Butler pointed out in the comments, we can avoid the markup duplication by using a computed property. And the code becomes,

    var app = new Vue({
      el: "#app",
      data: {
        countries: [],
        isLoadingCountries: false,
        showLessCountries: true
      },
      computed: {
        countriesToDisplay: function() {
          if (this.showLessCountries) {
            return this.countries.slice(0, 10);
          } else {
            return this.countries;
          }
        }
      },
      methods: {
        getCountries: function() {
          app.isLoadingCountries = true;
          app.$http
            .get("some-url")
            .then(function(response) {
              if (response.data) {
                if (response.data.isSuccess) {
                  app.countries = response.data.countries;
                }
              }
            })
            .then(function() {
              app.isLoadingCountries = false;
            });
        }
      },
      created: function() {
        this.getCountries();
      }
    });

And the markup,

    <table class="table" v-if="!isLoadingCountries">
        <thead>
            <tr>
                <th scope="col">Country</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="country in countriesToDisplay">
                <td>
                    <h5>{{country.name}}</h5>
                </td>
            </tr>
        </tbody>
    </table>
    <button v-if="!isLoadingCountries" @@click="showLessCountries = !showLessCountries">
        {{showLessCountries===true? "Show All Countries" : "Show Less"}}
    </button>

If you know a better way to do the same, let me know.

### Additional Resources

- [Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [Computed Properties and Watchers — Vue.js](https://vuejs.org/v2/guide/computed.html)
