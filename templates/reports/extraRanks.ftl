<#if extraRanks??>
<#list extraRanks as item>
    <#include "handleIndex.ftl" />

    <#if currIndex == 0>
        <#include "incBeginPage.ftl"/>
    <table style="width: 100%; padding: 0 40px; text-align: ${align};">
    <tr>
        <td><h2>${messages('MoreKeywordsWithHighRankings', locale, "true")}</h2></td>
    </tr>
    <tr style="text-align: ${align};">
    <td>
    <table class="gridTable" cellspacing="0" style="width: 100%;">
        <tr class="header">
        <#if dir="rtl">
            <th>${messages('Date', locale, "true")}</th>
            <th>${messages('Rank', locale, "true")}</th>
            <th>${messages('Page', locale, "true")}</th>
            <#if allOptions.addMonthlySearches><th>${messages('MonthlySearches', locale, "true")}</th></#if>
            <th>${messages('Keyword', locale, "true")}</th>
        <#else>
            <th>${messages('Keyword', locale, "true")}</th>
            <#if allOptions.addMonthlySearches><th>${messages('MonthlySearches', locale, "true")}</th></#if>
            <th>${messages('Page', locale, "true")}</th>
            <th>${messages('Rank', locale, "true")}</th>
            <th>${messages('Date', locale, "true")}</th>
        </#if>
        </tr>
    </#if>
    <tr class="${trCss}">
        <#if dir="rtl">
            <td class="centerText">${item.dateCreated?string("dd/MM/yyyy")}</td>
            <td class="centerText">${item.rank}</td>
            <td class="centerText">${((item.rank - 1) / 10)?floor + 1}</td>
            <#if allOptions.addMonthlySearches><td class="centerText"><#if item.keyword.localSearch == 0>-<#else>${item.keyword.localSearch}</#if></td></#if>
            <td>${reverse(item.keyword.name, locale)}</td>
        <#else>
            <td>${reverse(item.keyword.name, locale)}</td>
            <#if allOptions.addMonthlySearches><td class="centerText"><#if item.keyword.localSearch == 0>-<#else>${item.keyword.localSearch}</#if></td></#if>
            <td class="centerText">${((item.rank - 1) / 10)?floor + 1}</td>
            <td class="centerText">${item.rank}</td>
            <td class="centerText">${item.dateCreated?string("dd/MM/yyyy")}</td>
        </#if>
    </tr>
    <#if item_has_next>
    <#else>
        <#assign currIndex = maxRowsPerPage>
    </#if>
    <#if currIndex == maxRowsPerPage>
    </table>
    </td>
    </tr>
    </table>
    <#include "incEndPageWithSignature.ftl"/>
    </#if>
</#list>
</#if>