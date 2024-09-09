<#if compRankslist??>
<#list compRankslist as item>
    <#include "handleIndex.ftl" />

    <#if currIndex == 0>
        <#include "incBeginPage.ftl"/>
    <table style="width: 100%; padding: 0 40px; text-align: ${align};">
    <tr>
        <td><h2>${messages(compRanksTitle, locale, "true")}</h2></td>
    </tr>
    <tr style="text-align: ${align};">
    <td>
    <table class="gridTable" cellspacing="0" style="width: 100%;">
        <tr class="header">
        <#if dir="rtl">
            <th>${messages('Change', locale, "true")}</th>
            <#if allOptions.addPageNum><th>${messages('Page', locale, "true")}</th></#if>
            <#if addVisits><th>${messages('Visits', locale, "true")}</th></#if>
            <#if allOptions.addMonthlySearches><th>${messages('PDFMonthlySearches', locale, "true")}</th></#if>
            <#if allOptions.addSearchEngine><th>${messages('PDFSearchEngine', locale, "true")}</th></#if>
            <th>${messages('Keyword', locale, "true")}</th>
        <#else>
            <th>${messages('Keyword', locale, "true")}</th>
            <#if allOptions.addSearchEngine><th>${messages('PDFSearchEngine', locale, "true")}</th></#if>
            <#if allOptions.addMonthlySearches><th>${messages('PDFMonthlySearches', locale, "true")}</th></#if>
            <#if addVisits><th>${messages('Visits', locale, "true")}</th></#if>
            <#if allOptions.addPageNum><th>${messages('Page', locale, "true")}</th></#if>
            <th>${messages('Change', locale, "true")}</th>
        </#if>
        </tr>
    </#if>
    <tr class="${trCss}">
        <#if dir="rtl">
            <td class="centerText"><img height="10" width="10" src="${url}/images/icons/${compRanksImage}.png"/> ${item.monthAgoPos - item.currentPosition}</td>
            <#if allOptions.addPageNum><td>
                    <#if item.currentPosition == 100>-<#else>${((item.currentPosition - 1) / 10)?floor + 1}</#if>
            </td></#if>
            <#if addVisits><td class="centerText"><#if item.visits?? && item.visits &gt; 0>${item.visits}</#if></td></#if>
            <#if allOptions.addMonthlySearches><td class="centerText"><#if item.keyword.localSearch == 0>-<#else>${item.keyword.localSearch}</#if></td></#if>
            <#if allOptions.addSearchEngine><td><img src="${url}/images/SE/${item.searchEngine.name}.png"/></td></#if>
            <td>${reverse(item.keyword.name, locale)}</td>
        <#else>
            <td>${reverse(item.keyword.name, locale)}</td>
            <#if allOptions.addSearchEngine><td><img src="${url}/images/SE/${item.searchEngine.name}.png"/></td></#if>
            <#if allOptions.addMonthlySearches><td class="centerText"><#if item.keyword.localSearch == 0>-<#else>${item.keyword.localSearch}</#if></td></#if>
            <#if addVisits><td class="centerText"><#if item.visits?? && item.visits &gt; 0>${item.visits}</#if></td></#if>
            <#if allOptions.addPageNum><td>
                    <#if item.currentPosition == 100>-<#else>${((item.currentPosition - 1) / 10)?floor + 1}</#if>
            </td></#if>
            <td class="centerText"><img height="10" width="10" src="${url}/images/icons/${compRanksImage}.png"/>${item.monthAgoPos - item.currentPosition}</td>
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