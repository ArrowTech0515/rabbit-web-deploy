<table style="width: 100%; border: 0; padding: 0;" cellpadding="5" cellspacing="0">
    <tr>
        <th style="text-align: ${align};" width="150">${messages('Name', locale)}</th>
        <th width="120">${messages('KeywordsTop5', locale)}</th>
        <th width="120">${messages('KeywordsTop10', locale)}</th>
        <th width="120">${messages('KeywordsTop20', locale)}</th>

    </tr>
<#list list as item>
<#assign trStyle = ((item_index - 1) % 2 == 0)?string("background-color: #e6e6e6;","")>
    <tr style="${trStyle}">
        <td>${item.name}</td>
        <td style="text-align: center">${item.top5} %</td>
        <td style="text-align: center">${item.top10} %</td>
        <td style="text-align: center">${item.top20} %</td>
    </tr>
</#list>
</table>