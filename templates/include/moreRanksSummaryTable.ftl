<table style="width: 100%; border: 0; padding: 0;" cellpadding="5" cellspacing="0">
    <tr>
        <th style="text-align: ${align};" width="150">${messages('Keyword', locale)}</th>
        <th style="text-align: ${align};" width="150">${messages('LocalSearch', locale)}</th>
        <th style="text-align: ${align};" width="150">${messages('Date', locale)}</th>
        <th width="120">${messages('CurrentPosition', locale)}</th>
        <th width="120">${messages('Page', locale)}</th>

    </tr>
<#list list as item>
<#assign trStyle = ((item_index - 1) % 2 == 0)?string("background-color: #e6e6e6;","")>
    <tr style="${trStyle}">
        <td>${item.keyword.name}</td>
        <td>${item.keyword.localSearch}</td>
        <td>${item.dateCreated?string("dd/MM/yyyy")}</td>
        <td style="text-align: center">${item.rank}</td>
        <td style="text-align: center">${((item.rank - 1) / 10)?floor + 1}</td>
    </tr>
</#list>
</table>