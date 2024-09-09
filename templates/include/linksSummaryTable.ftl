<table style="width: 100%; border: 0; padding: 0;" cellpadding="5" cellspacing="0">
    <tr>
        <th style="text-align: ${align};" width="150">${messages('Keyword', locale)}</th>
        <th style="text-align: ${align};">${messages('Page', locale)}</th>
        <th style="text-align: ${align};" width="200">${messages('Href', locale)}</th>
    </tr>
<#list list as item>
<#assign trStyle = ((item_index - 1) % 2 == 0)?string("background-color: #e6e6e6;","")>
    <tr style="${trStyle}">
        <td>${item.keywordName}</td>
        <td>${item.pageUrl}</td>
        <td>${item.href}</td>
    </tr>
</#list>
</table>