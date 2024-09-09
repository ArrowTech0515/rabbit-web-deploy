<table style="width: 100%; border: 0; padding: 0;" cellpadding="5" cellspacing="0">
    <tr>
        <th style="text-align: ${align};" width="150">${messages('Keyword', locale)}</th>
        <th style="text-align: ${align};" width="150">${messages('LocalSearch', locale)}</th>
        <th style="text-align: ${align};">${messages('Url', locale)}</th>
        <th width="120">${messages('CurrentPosition', locale)}</th>
        <th width="120">${messages('Page', locale)}</th>

    </tr>
<#list list as item>
<#assign trStyle = ((item_index - 1) % 2 == 0)?string("background-color: #e6e6e6;","")>
    <tr style="${trStyle}">
        <td>${item.keyword.name}</td>
        <td><#if item.keyword.localSearch == 0>-<#else>${item.keyword.localSearch}</#if></td>
        <td>${item.pageUrl}</td>
        <td style="text-align: center">${item.currentPosition}</td>
        <td style="text-align: center"><#if item.currentPosition == 100>-<#else>${((item.currentPosition - 1) / 10)?floor + 1}</#if></td>
    </tr>
</#list>
</table>