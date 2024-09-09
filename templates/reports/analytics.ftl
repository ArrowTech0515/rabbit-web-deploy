<#if baseAnalytics??>
<#include "incBeginPage.ftl"/>
<table style="width: 100%; padding: 0 40px;">
    <#if baseAnalytics??>
        <#if dir="rtl">
        <tr style="text-align: ${align};">
            <td colspan="2">
                <h2>${allOptions.from?string("dd/MM/yyyy")} - ${allOptions.to?string("dd/MM/yyyy")} ${messages('AnalyticsDetails', locale, "true")}</h2>
            </td>
        </tr>
        <tr style="text-align: ${align};">
            <td></td>
            <td>
                <table style="width: 100%; padding: 0 40px;">
                    <tr>
                        <td>
                            ${messages('AllVisits', locale, "true")}
                        </td>
                        <td>
                            <div class="percentageBox">${baseAnalytics.visits}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${messages('OrganicSearchesVisits', locale, "true")}
                        </td>
                        <td>
                            <div class="percentageBox">${baseAnalytics.organicSearches}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${messages('OrganicSearchesVisitsPercent', locale, "true")}
                        </td>
                        <td>
                            <div class="percentageBox">${baseAnalytics.organicSearchesPercent}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${messages('AllPageViews', locale, "true")}
                        </td>
                        <td>
                            <div class="percentageBox">${baseAnalytics.pageViews}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${messages('PageViewsPerVisit', locale, "true")}
                        </td>
                        <td>
                            <div class="percentageBox">${baseAnalytics.pageViewsPerVisit}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${messages('AvgTimeInSite', locale, "true")}
                        </td>
                        <td>
                            <div class="percentageBox">${baseAnalytics.avgTimeOnSite}</div>
                        </td>
                    </tr>
                    <#--<tr>-->
                        <#--<td>-->
                            <#--${messages('NewVisitsPercent', locale, "true")}-->
                        <#--</td>-->
                        <#--<td>-->
                            <#--<div class="percentageBox">${baseAnalytics.newVisits}</div>-->
                        <#--</td>-->
                    <#--</tr>-->
                    <tr>
                        <td>
                            ${messages('AvgBounceRate', locale, "true")}
                        </td>
                        <td>
                            <div class="percentageBox">${baseAnalytics.visitBounceRate}</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <#else>
        <tr style="text-align: ${align};">
            <td colspan="2">
                <h2>${messages('AnalyticsDetails', locale, "true")} ${allOptions.from?string("dd/MM/yyyy")} - ${allOptions.to?string("dd/MM/yyyy")}</h2>
            </td>
        </tr>
        <tr style="text-align: ${align};">
            <#--<td></td>-->
            <td>
                <table>
                    <tr>
                        <td>
                            <div class="percentageBox">${baseAnalytics.visits}</div>
                        </td>
                        <td>
                            ${messages('AllVisits', locale, "true")}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="percentageBox">${baseAnalytics.organicSearches}</div>
                        </td>
                        <td>
                            ${messages('OrganicSearchesVisits', locale, "true")}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="percentageBox">${baseAnalytics.organicSearchesPercent}</div>
                        </td>
                        <td>
                            ${messages('OrganicSearchesVisitsPercent', locale, "true")}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="percentageBox">${baseAnalytics.pageViews}</div>
                        </td>
                        <td>
                            ${messages('AllPageViews', locale, "true")}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="percentageBox">${baseAnalytics.pageViewsPerVisit}</div>
                        </td>
                        <td>
                            ${messages('PageViewsPerVisit', locale, "true")}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="percentageBox">${baseAnalytics.avgTimeOnSite}</div>
                        </td>
                        <td>
                            ${messages('AvgTimeInSite', locale, "true")}
                        </td>
                    </tr>
                    <#--<tr>-->
                        <#--<td>-->
                            <#--<div class="percentageBox">${baseAnalytics.newVisits}</div>-->
                        <#--</td>-->
                        <#--<td>-->
                            <#--${messages('NewVisitsPercent', locale, "true")}-->
                        <#--</td>-->
                    <#--</tr>-->
                    <tr>
                        <td>
                            <div class="percentageBox">${baseAnalytics.visitBounceRate}</div>
                        </td>
                        <td>
                            ${messages('AvgBounceRate', locale, "true")}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        </#if>
    </#if>
</table>
<#include "incEndPageWithSignature.ftl" />
</#if>