<#if (allOptions.addGlanceNow || allOptions.addGlanceInit) && website.countKfw &gt; 0>
<#include "incBeginPage.ftl"/>
<table style="width: 100%; padding: 0 40px; text-align: ${align};">
    <tr>
        <td colspan="2" style="text-align: center"><h2>${messages('ExecutiveSummary', locale, "true")}</h2></td>
    </tr>
    <tr style="text-align: ${align};">
        <td>
            <#if allOptions.addGlanceNow>
                <#if statusNowChartUrl??>
                    <#assign statusChartUrl = statusNowChartUrl>
                </#if>
                <#assign statusMap = statusNow>
                <#include "atAGlanceBox.ftl">
            </#if>
            <#if allOptions.addGlanceWeek>
                <#if statusWeekChartUrl??>
                    <#assign statusChartUrl = statusWeekChartUrl>
                </#if>
                <#assign statusMap = statusWeek>
                <#include "atAGlanceBox.ftl">
            </#if>
            <#if allOptions.addGlanceMonth>
                <#if statusMonthChartUrl??>
                    <#assign statusChartUrl = statusMonthChartUrl>
                </#if>
                <#assign statusMap = statusMonth>
                <#include "atAGlanceBox.ftl">
            </#if>
            <#if allOptions.addGlanceInit>
                <#if statusInitChartUrl??>
                    <#assign statusChartUrl = statusInitChartUrl>
                </#if>
                <#assign statusMap = statusInit>
                <#include "atAGlanceBox.ftl">
            </#if>
        </td>
    </tr>
    <#if glanceChartTimelineUrl?? && glanceChartTimelineCount ==2>
    <tr style="height: 20px" />
    <tr>
        <td>
            <img src="${glanceChartTimelineUrl}" width="80%" height="80%" />
        </td>
    </tr>
</#if>
</table>
<#include "incEndPageWithSignature.ftl"/>
</#if>
<#if glanceChartTimelineUrl?? && glanceChartTimelineCount &gt; 2 && website.countKfw &gt; 0>
    <#include "incBeginPage.ftl"/>
        <img src="${glanceChartTimelineUrl}" />
    <#include "incEndPageWithSignature.ftl"/>
</#if>