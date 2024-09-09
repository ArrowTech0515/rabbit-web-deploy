<#if allOptions.divideToGroups && keywordGroups??>
    <#list keywordGroups?keys as key>
        <#assign list = keywordGroups[key]>
        <#assign keywordsTitle = key>
        <#include "rankTable.ftl">

        <#if keywordGroupsCompCharts[key]??>
            <#include "incBeginPage.ftl"/>
                <img width="100%" src="${keywordGroupsCompCharts[key]}" style="padding: 10px 0;" />
            <#include "incEndPageWithSignature.ftl"/>
        </#if>
    </#list>
<#else>
    <#assign list = keywords>
    <#include "rankTable.ftl">

    <#if compChartUrl??>
        <#include "incBeginPage.ftl"/>
            <img width="100%" src="${compChartUrl}" style="padding: 10px 0;" />
        <#include "incEndPageWithSignature.ftl"/>
    </#if>
</#if>