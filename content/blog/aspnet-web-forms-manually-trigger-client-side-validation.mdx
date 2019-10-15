---
templateKey: blog-post
title: ASP.NET Web Forms - Manually Trigger Client Side Validation
description: >-
  You can manually trigger client-side validation for ASP.NET Web Forms Server
  side controls. One way of doing it explained here.
author: Abhith Rajan
authorURL: 'http://twitter.com/abhithrajan'
date: '2018-01-15T23:32:28.000Z'
image: /img/glenn-carstens-peters-190592.jpg
tags:
  - aspnet-web-forms
  - sharepoint
---

Lets say you have a web form with one more serverside controls like one below,

```html
<asp:TextBox ID="txtEmail" runat="server" class="txtBoxLarge textSmall" placeholder="Enter Email Address"></asp:TextBox>

<asp:RequiredFieldValidator ID="rfvEmail" runat="server" ErrorMessage="Enter Email" Display="None" ControlToValidate="txtEmail" ValidationGroup="groupName"></asp:RequiredFieldValidator>
```
And you need to do some client side operations along with client side validation, the button triggering the whole operation will be like,

```html
<asp:Button ID="btnSubmit" CssClass="blueBtnLarge" runat="server" Text="Continue" ValidationGroup="groupName" OnClick="btnSubmit_Click" OnClientClick="ClientSideClick(this)" UseSubmitBehavior="False" />
```

Here **OnClick** will send request to server side and **OnClientClick** will execute on client side before control passed to server.  **OnClick** only will be triggered if **OnClientClick** returned **true**.

And the client side JavaScript function we call on **OnClientClick** will be like below,

```html
<script type="text/javascript">
    function ClientSideClick(myButton) {
        // Any operation before validation goes here

        // Client side validation
        if (typeof (window.Page_ClientValidate) == 'function') {
            if (window.Page_ClientValidate('groupName') === false) {
                document.getElementById('someDivElementWithErrorExplanation').style.display = 'block'; // Showing error on validation, modify to your needs
                return false;
            }
        }
        document.getElementById('someDivElementWithErrorExplanation').style.display = 'none';

        // Any operation after client side validation passess goes here.

        return true;
    }
</script>
```
That's it. Also, don't forget to notice the usage of the **ValidationGroup** all over the code above.
