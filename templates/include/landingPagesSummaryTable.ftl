<table style="width: 100%; border: 0; padding: 0;" cellpadding="5" cellspacing="0">
    <tr>
        <th style="text-align: ${align};">${messages('Page', locale)}</th>
        <th style="text-align: ${align};">${messages('Title', locale)}</th>
        <th style="text-align: ${align};">${messages('WordsCount', locale)}</th>
        <th style="text-align: ${align};">${messages('LinksIn', locale)}</th>
    </tr>
<#list list as item>
<#assign trStyle = ((item_index - 1) % 2 == 0)?string("background-color: #e6e6e6;","")>
    <tr style="${trStyle}">
        <td>${item.pageUrl}</td>
        <td>${item.title}</td>
        <td><#if item.wordsCount??>${item.wordsCount}</#if></td>
        <td>${item.linksIn}</td>
    </tr>
</#list>
</table>