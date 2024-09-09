<table style="width: 100%; border: 0; padding: 0;" cellpadding="5" cellspacing="0">
    <tr>
        <th style="text-align: ${align};" width="150">${messages('Keyword', locale)}</th>
        <th width="150">${messages('LocalSearch', locale)}</th>
        <th style="text-align: ${align};">${messages('Url', locale)}</th>
        <th width="120">${messages('PreviousPosition', locale)}</th>
        <th width="120">${messages('Yesterday', locale)}</th>
        <th width="120">${messages('CurrentPosition', locale)}</th>
        <th width="50">${messages('Result', locale)}</th>

    </tr>
<#list list as item>
<#assign trStyle = ((item_index - 1) % 2 == 0)?string("background-color: #e6e6e6;","")>
    <tr style="${trStyle}">
        <td>
<#--        <#if item.starred><span style="color: #0b77b7;">**</span></#if>-->
        ${item.keyword}
        </td>
        <td style="text-align: center">
        ${item.localSearches}
        </td>
        <td>
            <#if item.website?length < 100>
                ${item.website}
            <#else>
                ${item.website?substring(0, 100)}
            </#if>
        </td>
        <td style="text-align: center">
        <#if item.prevPos == 0>
                <#else>
            ${item.prevPos}
        </#if>
        </td>
        <td style="text-align: center">
        <#if item.daysAgo1 == 0>
        <#else>
            ${item.daysAgo1}
        </#if>
        </td>
        <td style="text-align: center">
        ${item.currPos}
        </td>
        <td style="text-align: center">
            <#if item.currPos < item.prevPos>
<#--                <i class="fa-solid fa-arrow-up"></i>(${item.daysAgo1 -item.currPos})-->
                <img src="${appUrl}images/icon/upload-up.png" alt="Up">(${item.daysAgo1 -item.currPos})
                <#else>
<#--                    <i class="fa-solid fa-arrow-down"></i>(${item.currPos - item.daysAgo1})-->
                <img src="${appUrl}images/icon/upload-down.png" alt="Down">(${item.currPos - item.daysAgo1})
            </#if>
        </td>
    </tr>
</#list>
</table>