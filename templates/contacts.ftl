<#include "include/header.ftl"/>
<table>
    <tr>
        <td>
            User
        </td>
        <td>
            <#if askingUser??>${askingUser}</#if>
        </td>
    </tr>
    <tr>
        <td>
            Contact Email
        </td>
        <td>
            <#if email??>${email}</#if>
        </td>
    </tr>
    <tr>
        <td>
            Contact Name
        </td>
        <td>
            <#if name??>${name}</#if>
        </td>
    </tr>
    <tr>
        <td>
            Contact Phone
        </td>
        <td>
            <#if phone??>${phone}</#if>
        </td>
    </tr>
    <tr>
        <td>
            Comment
        </td>
        <td>
            <#if comment??>${comment}</#if>
        </td>
    </tr>
</table>
<#include "include/footer.ftl"/>