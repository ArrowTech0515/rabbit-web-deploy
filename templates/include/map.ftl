<h4>${mapTitle}</h4>
<br />
<table border="1" cellpadding="5">
<#list counters?keys as key>
    <#if key?contains(mapTitle + " - ")>
        <tr>
            <td>
            ${key}
            </td>
            <td>
            ${counters[key]}
            </td>
        </tr>
    </#if>
</#list>
<#list details?keys as key>
    <#if key?contains(mapTitle + " - ")>
    <#assign map=details[key]>
    <tr><td colspan="2"><strong>${key}<div></strong></td></tr>
    <#list map?keys as item>
        <tr>
            <td>
            ${item}
            </td>
            <td>
            ${map[item]}
            </td>
        </tr>
    </#list>
    </#if>
</#list>
</table>
<br />
<br />