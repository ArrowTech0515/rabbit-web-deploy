<#if (currAppendixTitle?? && currAppendixTitle != '') || (currAppendixImg?? && currAppendixImg != '')>
<#include "incBeginPage.ftl"/>
<table style="width: 100%; padding: 0 40px;">
    <#if currAppendixTitle?? && currAppendixTitle != ''>
    <tr>
        <td style="text-align: center"><h2>${reverse(currAppendixTitle, locale)}</h2></td>
    </tr>
    </#if>
    <#if currAppendixImg?? && currAppendixImg != ''>
    <tr>
        <td style="text-align: center">
            <#--${currAppendixImg}-->
            <img width="100%" src="${currAppendixImg}" />
        </td>
    </tr>
    </#if>
    <#if currAppendixComment?? && currAppendixComment != ''>
    <tr>
        <td style="text-align: ${align}">${reverse(currAppendixComment, locale)}</td>
    </tr>
    </#if>
</table>
<#include "incEndPageWithSignature.ftl"/>
</#if>