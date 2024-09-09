<#if topKeywordsList??>
<#list topKeywordsList as item>
    <#include "handleIndex.ftl" />

    <#if currIndex == 0>
        <#include "incBeginPage.ftl"/>
    <table style="width: 100%; padding: 0 40px; text-align: ${align};">
    <tr>
        <td><h2>${messages(topKeywordsTitle, locale, "true")}</h2></td>
    </tr>
    <tr style="text-align: ${align};">
    <td>
    <table class="gridTable" cellspacing="0" style="width: 100%;">
        <tr class="header">
        <#if dir="rtl">
            <th>${messages('BounceRate', locale, "true")}</th>
            <th>${messages('AvgTime', locale, "true")}</th>
            <th>${messages('PageViews', locale, "true")}</th>
            <th>${messages('Visits', locale, "true")}</th>
            <th>${messages('Keyword', locale, "true")}</th>
        <#else>
            <th>${messages('Keyword', locale, "true")}</th>
            <th>${messages('Visits', locale, "true")}</th>
            <th>${messages('PageViews', locale, "true")}</th>
            <th>${messages('AvgTime', locale, "true")}</th>
            <th>${messages('BounceRate', locale, "true")}</th>
        </#if>
        </tr>
    </#if>
    <tr class="${trCss}">
        <#if dir="rtl">
            <td>${item.visitBounceRate}</td>
            <td>${item.avgTimeOnSite}</td>
            <td>${item.pageViewsPerVisit}</td>
            <td>${item.visits}</td>
            <td>${reverse(item.name, locale)}</td>
        <#else>
            <td>${reverse(item.name, locale)}</td>
            <td>${item.visits}</td>
            <td>${item.pageViewsPerVisit}</td>
            <td>${item.avgTimeOnSite}</td>
            <td>${item.visitBounceRate}</td>
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
<#if topKeywordsImage?? && topKeywordsImage != ''>
<#include "incBeginPage.ftl"/>
    <img width="100%" src="${topKeywordsImage}" style="padding: 10px 0;" />
<#include "incEndPageWithSignature.ftl"/>
</#if>
