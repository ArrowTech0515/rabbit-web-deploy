<#list list as item>
    <#include "handleIndex.ftl" />

    <#if currIndex == 0>
        <#include "incBeginPage.ftl"/>
    <table style="width: 100%; padding: 0 40px;">
    <tr style="text-align: ${align};">
        <td colspan="2">
            <h2>
                <#if keywordsTitle??>
                        <#if dir="ltr" && allOptions.divideToGroups && keywordGroups??>${messages('KeywordGroup', locale, "true")} - </#if>
                        ${reverse(keywordsTitle, locale)}
                        <#if dir="rtl" && allOptions.divideToGroups && keywordGroups??> - ${messages('KeywordGroup', locale, "true")} </#if>
                <#else>
                     ${messages('Ranks', locale, "true")}
                </#if>
            </h2>
        </td>
    </tr>
    <tr style="text-align: ${align};">
    <td>
    <table class="gridTable" cellspacing="0" style="width: 100%;">
        <tr class="header">
        <#if dir="rtl">
            <#if allOptions.addPageNum><th>${messages('Page', locale, "true")}</th></#if>
            <th>${messages('PDFCurrentPosition', locale, "true")}</th>
            <#if allOptions.addYesterday><th>${dateUtil('day', -1, locale)}</th></#if>
            <#if allOptions.add2DaysAgo><th>${dateUtil('day', -2, locale)}</th></#if>
            <#if allOptions.add3DaysAgo><th>${dateUtil('day', -3, locale)}</th></#if>
            <#if allOptions.add4DaysAgo><th>${dateUtil('day', -4, locale)}</th></#if>
            <#if allOptions.add5DaysAgo><th>${dateUtil('day', -5, locale)}</th></#if>
            <#if allOptions.add6DaysAgo><th>${dateUtil('day', -6, locale)}</th></#if>
            <#if allOptions.addWeekAgo><th>${dateUtil('day', -7, locale)}</th></#if>
            <#if allOptions.addMonthAgoPosition><th>${dateUtil('month', -1, locale)}</th></#if>
            <#if allOptions.add1MonthAgo><th>${dateUtil('monthName', 1, locale)}</th></#if>
            <#if allOptions.add2MonthsAgo><th>${dateUtil('monthName', 2, locale)}</th></#if>
            <#if allOptions.add3MonthsAgo><th>${dateUtil('monthName', 3, locale)}</th></#if>
            <#if allOptions.add4MonthsAgo><th>${dateUtil('monthName', 4, locale)}</th></#if>
            <#if allOptions.add5MonthsAgo><th>${dateUtil('monthName', 5, locale)}</th></#if>
            <#if allOptions.add6MonthsAgo><th>${dateUtil('monthName', 6, locale)}</th></#if>
            <#if allOptions.addStartPosition><th>${messages('PDFStartPosition', locale, "true")}</th></#if>
            <#--<#if allOptions.addPageUrl><th>${messages('Url', locale, "true")}</th></#if>-->
            <#if addVisits><th>${messages('Visits', locale, "true")}</th></#if>
            <#if allOptions.addMonthlySearches><th>${messages('PDFMonthlySearches', locale, "true")}</th></#if>
            <#if allOptions.addSearchEngine><th>${messages('PDFSearchEngine', locale, "true")}</th></#if>
            <th>${messages('Keyword', locale, "true")}</th>
        <#else>
            <th>${messages('Keyword', locale, "true")}</th>
            <#if allOptions.addSearchEngine><th>${messages('PDFSearchEngine', locale, "true")}</th></#if>
            <#if allOptions.addMonthlySearches><th>${messages('PDFMonthlySearches', locale, "true")}</th></#if>
            <#if addVisits><th>${messages('Visits', locale, "true")}</th></#if>
            <#--<#if allOptions.addPageUrl><th>${messages('Url', locale, "true")}</th></#if>-->
            <#if allOptions.addStartPosition><th>${messages('PDFStartPosition', locale, "true")}</th></#if>
            <#if allOptions.add6MonthsAgo><th>${dateUtil('monthName', 6, locale)}</th></#if>
            <#if allOptions.add5MonthsAgo><th>${dateUtil('monthName', 5, locale)}</th></#if>
            <#if allOptions.add4MonthsAgo><th>${dateUtil('monthName', 4, locale)}</th></#if>
            <#if allOptions.add3MonthsAgo><th>${dateUtil('monthName', 3, locale)}</th></#if>
            <#if allOptions.add2MonthsAgo><th>${dateUtil('monthName', 2, locale)}</th></#if>
            <#if allOptions.add1MonthAgo><th>${dateUtil('monthName', 1, locale)}</th></#if>
            <#if allOptions.addMonthAgoPosition><th>${dateUtil('month', -1, locale)}</th></#if>
            <#if allOptions.addWeekAgo><th>${dateUtil('day', -7, locale)}</th></#if>
            <#if allOptions.add6DaysAgo><th>${dateUtil('day', -6, locale)}</th></#if>
            <#if allOptions.add5DaysAgo><th>${dateUtil('day', -5, locale)}</th></#if>
            <#if allOptions.add4DaysAgo><th>${dateUtil('day', -4, locale)}</th></#if>
            <#if allOptions.add3DaysAgo><th>${dateUtil('day', -3, locale)}</th></#if>
            <#if allOptions.add2DaysAgo><th>${dateUtil('day', -2, locale)}</th></#if>
            <#if allOptions.addYesterday><th>${dateUtil('day', -1, locale)}</th></#if>
            <th>${messages('PDFCurrentPosition', locale, "true")}</th>
            <#if allOptions.addPageNum><th>${messages('Page', locale, "true")}</th></#if>
        </#if>
        </tr>
    </#if>
    <tr class="${trCss}">
        <#if dir="rtl">
            <#if allOptions.addPageNum><td class="highlightedCol8 centerText">
                    <#if item.currentPosition == 100>100+<#else>${((item.currentPosition - 1) / 10)?floor + 1}</#if>
            </td></#if>
            <td class="highlightedCol10 centerText">
            <#--<#if allOptions.compareMonthAgo && item.monthAgoPos != 0 && item.currentPosition < item.monthAgoPos>-->
                <#--(<img height="10" width="10" src="${url}/images/up.png"/> ${item.monthAgoPos - item.currentPosition})-->
            <#--</#if>-->
                <#if item.currentPosition == 100>100+<#else>${item.currentPosition}</#if>
            </td>
            <#if allOptions.addYesterday><td class="highlightedCol5 centerText"><#if item.daysAgo1 == 0>-<#else>${item.daysAgo1}</#if></td></#if>
            <#if allOptions.add2DaysAgo><td class="highlightedCol7 centerText"><#if item.daysAgo2 == 0>-<#else>${item.daysAgo2}</#if></td></#if>
            <#if allOptions.add3DaysAgo><td class="highlightedCol9 centerText"><#if item.daysAgo3 == 0>-<#else>${item.daysAgo3}</#if></td></#if>
            <#if allOptions.add4DaysAgo><td class="highlightedCol5 centerText"><#if item.daysAgo4 == 0>-<#else>${item.daysAgo4}</#if></td></#if>
            <#if allOptions.add5DaysAgo><td class="highlightedCol7 centerText"><#if item.daysAgo5 == 0>-<#else>${item.daysAgo5}</#if></td></#if>
            <#if allOptions.add6DaysAgo><td class="highlightedCol9 centerText"><#if item.daysAgo6 == 0>-<#else>${item.daysAgo6}</#if></td></#if>
            <#if allOptions.addWeekAgo><td class="highlightedCol5 centerText"><#if item.daysAgo7 == 0>-<#else>${item.daysAgo7}</#if></td></#if>
            <#if allOptions.addMonthAgoPosition><td class="highlightedCol4 centerText"><#if item.monthAgoPos == 0>-<#else>${item.monthAgoPos}</#if></td></#if>
            <#if allOptions.add1MonthAgo><td class="highlightedCol5 centerText"><#if item.monthAgo1 == 0>-<#else>${item.monthAgo1}</#if></td></#if>
            <#if allOptions.add2MonthsAgo><td class="highlightedCol4 centerText"><#if item.monthAgo2 == 0>-<#else>${item.monthAgo2}</#if></td></#if>
            <#if allOptions.add3MonthsAgo><td class="highlightedCol9 centerText"><#if item.monthAgo3 == 0>-<#else>${item.monthAgo3}</#if></td></#if>
            <#if allOptions.add4MonthsAgo><td class="highlightedCol7 centerText"><#if item.monthAgo4 == 0>-<#else>${item.monthAgo4}</#if></td></#if>
            <#if allOptions.add5MonthsAgo><td class="highlightedCol4 centerText"><#if item.monthAgo5 == 0>-<#else>${item.monthAgo5}</#if></td></#if>
            <#if allOptions.add6MonthsAgo><td class="highlightedCol5 centerText"><#if item.monthAgo6 == 0>-<#else>${item.monthAgo6}</#if></td></#if>
            <#if allOptions.addStartPosition><td class="highlightedCol4 centerText"><#if item.firstPos == 0>-<#else>${item.firstPos}</#if></td></#if>
            <#--<#if allOptions.addPageUrl><td><#if item.url?? && item.url != '' >http://${item.url}</#if></td></#if>-->
            <#if addVisits><td class="highlightedCol3 centerText"><#if item.visits?? && item.visits &gt; 0>${item.visits}</#if></td></#if>
            <#if allOptions.addMonthlySearches><td class="highlightedCol2 centerText"><#if item.keyword.localSearch == 0>-<#else>${item.keyword.localSearch}</#if></td></#if>
            <#if allOptions.addSearchEngine><td class="highlightedCol2 centerText"><img src="${url}/images/SE/${item.searchEngine.name}.png" width="20px" height="20px"/></td></#if>
            <td class="highlightedCol">${reverse(item.keyword.name, locale)}</td>
        <#else>
            <td class="highlightedCol">${reverse(item.keyword.name, locale)}</td>
            <#if allOptions.addSearchEngine><td class="highlightedCol2 centerText"><img src="${url}/images/SE/${item.searchEngine.name}.png" width="20px" height="20px"/></td></#if>
            <#if allOptions.addMonthlySearches><td class="highlightedCol2 centerText"><#if item.keyword.localSearch == 0>-<#else>${item.keyword.localSearch}</#if></td></#if>
            <#if addVisits><td class="highlightedCol3 centerText"><#if item.visits?? && item.visits &gt; 0>${item.visits}</#if></td></#if>
            <#--<#if allOptions.addPageUrl><td><#if item.url?? && item.url != '' >http://${item.url}</#if></td></#if>-->
            <#if allOptions.addStartPosition><td class="highlightedCol4 centerText"><#if item.firstPos == 0>-<#else>${item.firstPos}</#if></td></#if>
            <#if allOptions.add6MonthsAgo><td class="highlightedCol5 centerText"><#if item.monthAgo6 == 0>-<#else>${item.monthAgo6}</#if></td></#if>
            <#if allOptions.add5MonthsAgo><td class="highlightedCol4 centerText"><#if item.monthAgo5 == 0>-<#else>${item.monthAgo5}</#if></td></#if>
            <#if allOptions.add4MonthsAgo><td class="highlightedCol7 centerText"><#if item.monthAgo4 == 0>-<#else>${item.monthAgo4}</#if></td></#if>
            <#if allOptions.add3MonthsAgo><td class="highlightedCol9 centerText"><#if item.monthAgo3 == 0>-<#else>${item.monthAgo3}</#if></td></#if>
            <#if allOptions.add2MonthsAgo><td class="highlightedCol4 centerText"><#if item.monthAgo2 == 0>-<#else>${item.monthAgo2}</#if></td></#if>
            <#if allOptions.add1MonthAgo><td class="highlightedCol5 centerText"><#if item.monthAgo1 == 0>-<#else>${item.monthAgo1}</#if></td></#if>
            <#if allOptions.addMonthAgoPosition><td class="highlightedCol4 centerText"><#if item.monthAgoPos == 0>-<#else>${item.monthAgoPos}</#if></td></#if>
            <#if allOptions.addWeekAgo><td class="highlightedCol5 centerText"><#if item.daysAgo7 == 0>-<#else>${item.daysAgo7}</#if></td></#if>
            <#if allOptions.add6DaysAgo><td class="highlightedCol7 centerText"><#if item.daysAgo6 == 0>-<#else>${item.daysAgo6}</#if></td></#if>
            <#if allOptions.add5DaysAgo><td class="highlightedCol9 centerText"><#if item.daysAgo5 == 0>-<#else>${item.daysAgo5}</#if></td></#if>
            <#if allOptions.add4DaysAgo><td class="highlightedCol5 centerText"><#if item.daysAgo4 == 0>-<#else>${item.daysAgo4}</#if></td></#if>
            <#if allOptions.add3DaysAgo><td class="highlightedCol7 centerText"><#if item.daysAgo3 == 0>-<#else>${item.daysAgo3}</#if></td></#if>
            <#if allOptions.add2DaysAgo><td class="highlightedCol9 centerText"><#if item.daysAgo2 == 0>-<#else>${item.daysAgo2}</#if></td></#if>
            <#if allOptions.addYesterday><td class="highlightedCol5 centerText"><#if item.daysAgo1 == 0>-<#else>${item.daysAgo1}</#if></td></#if>
            <td class="highlightedCol10 centerText"><#if item.currentPosition == 100>100+<#else>${item.currentPosition}</#if></td>
            <#if allOptions.addPageNum><td class="highlightedCol8 centerText">
                    <#if item.currentPosition == 100>100+<#else>${((item.currentPosition - 1) / 10)?floor + 1}</#if>
            </td></#if>
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
        <#if item_has_next>
            <#--<#include "incEndPage.ftl"/>-->
            <#include "incEndPageWithSignature.ftl"/>
        <#else>
            <#if allOptions.divideToGroups && keywordGroups??><#else>
                <#if comments??>
                <br />
                <div style="text-align: ${align}; font-size: 12px; padding:0 40px;">
                ${reverse(comments, locale)}
                </div>
                </#if>
            </#if>
            <#include "incEndPageWithSignature.ftl"/>
        </#if>
    </#if>
</#list>