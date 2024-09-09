<#include "include/header.ftl"/>
<table>
    <tr>
        <td>
            User
        </td>
        <td>
            ${id}
        </td>
    </tr>
    <tr>
        <td>
            User Name
        </td>
        <td>
            ${name} - ${firstName} ${lastName}
        </td>
    </tr>
    <tr>
        <td>
            Email
        </td>
        <td>
            ${email}
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <a href="${appUrl}approveNewUserGuest?id=${id}">Approve</a>
        </td>
    </tr>
</table>
<#include "include/footer.ftl"/>