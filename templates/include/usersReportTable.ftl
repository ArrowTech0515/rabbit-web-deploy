<table width="100%" style="text-align: ${align}; border: 1px solid #7c8389; border-collapse: collapse;">
    <tr>
        <th style="border: 1px solid #7c8389;" width="80">${messages('User', locale)}</th>
        <th style="border: 1px solid #7c8389;" width="70">${messages('Email', locale)}</th>
        <th style="border: 1px solid #7c8389;" width="150">${messages('Package', locale)}</th>
        <th style="border: 1px solid #7c8389;" width="150">${messages('PricePerMonth', locale)}</th>
        <th style="border: 1px solid #7c8389;" width="150">${messages('Phone', locale)}</th>
        <th style="border: 1px solid #7c8389;" width="120">${messages('Websites', locale)}</th>
        <th style="border: 1px solid #7c8389;" width="120">${messages('Articles', locale)}</th>
        <th style="border: 1px solid #7c8389;" width="120">${messages('Keywords', locale)}</th>
        <th style="border: 1px solid #7c8389;" width="120">Login 7</th>
        <th style="border: 1px solid #7c8389;" width="120">Login 30</th>
        <th style="border: 1px solid #7c8389;" width="120">Login Per Day</th>
    </tr>
<#list list as item>
    <tr>
        <td style="border: 1px solid #7c8389;">
        ${item.name}
        </td>
        <td style="border: 1px solid #7c8389;">
         ${item.email}
        </td>
        <td style="border: 1px solid #7c8389;">
            <#if item.userPackage??>
                ${item.userPackage.name}
            </#if>
        </td>
        <td style="border: 1px solid #7c8389;">
        ${item.pricePerMonth}
        </td>
        <td style="border: 1px solid #7c8389;">
        <#if item.phone??>
            ${item.phone}
        </#if>
        </td>
        <td style="border: 1px solid #7c8389;">
        ${item.websitesUsed}
        </td>
        <td style="border: 1px solid #7c8389;">
        ${item.articlePostUsed}
        </td>
        <td style="border: 1px solid #7c8389;">
        ${item.keywordsUsed}
        </td>
        <td style="border: 1px solid #7c8389;">
        ${item.loginCount7}
        </td>
        <td style="border: 1px solid #7c8389;">
        ${item.loginCount30}
        </td>
        <td style="border: 1px solid #7c8389;">
        ${item.loginCountPerDay}%
        </td>
    </tr>
</#list>
</table>