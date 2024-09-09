<body style="margin: 0; padding: 0; color: #202939">
<table style="max-width: 600px; width: 100%; margin: 0 auto; text-align: left; border: none;" border="0" cellspacing="0" cellpadding="0">
 <tbody>
 <tr>
  <td  style="background: #333; padding: 16px;"><img src="https://dlnil54eooeso.cloudfront.net/assets/images/mail/${appName}.png" /></td>
 </tr>
 <tr>
  <td colspan="5"  style="background: #ffffff;">
   <div style="margin: 20px 0; background: #f8f8f8; border:1px solid #e5e5e5; padding: 20px;">
    <p><strong>Hello <#if user.billingName??> ${user.billingName}</#if>,</strong></p>
    <p>Your payment for subscription to ${appName} will be automatically processed soon ($${price}).</p>
    <p>Please verify your payment details to ensure successful transaction and uninterrupted delivery.</p>
    <a href="${appUrl}emailClickGuest?userId=${user.id?c}&name=${template}&url=${appUrl}activationLoginGuest%3FactivationCode%3D${user.activationCode}%26source%3D${template}${appDomain}&userId=${user.id?c}" title="Login">Manage Your Payment Details</a>
   </div>
  </td>
 </tr>
 </tbody>
</table>
</body>
<#include "include/openMail.ftl"/>