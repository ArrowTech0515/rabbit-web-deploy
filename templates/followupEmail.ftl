${messages('Hey', locale)} ${user.firstName},
<br /><br />
${messages('HowAreYou?', locale)}

<br /><br />

<br />
<table>
<tr>
    <td>
        ${messages('Username', locale)}
    </td>
    <td>
        ${user.email}
    </td>
</tr>
<#--<tr>-->
    <#--<td>-->
        <#--${messages('Password', locale)}-->
    <#--</td>-->
    <#--<td>-->
        <#--${password}-->
    <#--</td>-->
<#--</tr>-->
<tr>
    <td>
        <br/>
        <a href="${appUrl}">
            <#include "include/loginLink.ftl"/>
        </a>
    </td>
</tr>
</table>
<br />
${messages('Enjoy', locale)}
<#include "include/openMail.ftl"/>