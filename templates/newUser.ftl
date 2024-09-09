<#include "include/header.ftl"/>
<tr>
    <td>
        <table>
<#if lastLogin?? && lastLogin != ''>
<tr>
    <td>
        ${messages('Username', locale)}
    </td>
    <td>
        ${email}
    </td>
</tr>
<#elseif activationCode??>
<tr>
    <td colspan="2">
        ${messages('ConfirmRegistrationMessage', locale)}
        <br />
        <a href="${appUrl}confirmNewUserGuest?activationCode=${activationCode}">
            ${appUrl}confirmNewUserGuest?activationCode=${activationCode}
        </a>
    </td>
</tr>
</#if>
        </table>
    </td>
</tr>
</table>
</td>
</tr>
</table>
<#include "include/openMail.ftl"/>
</body>
</html>
