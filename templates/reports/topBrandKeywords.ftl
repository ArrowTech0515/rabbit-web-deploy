<#if topBrandKeywords??>
<#assign topKeywordsList = topBrandKeywords>
<#assign topKeywordsTitle = 'TopAnalyticsBrandKeywords'>

<#if topBrandKeywordsUrl??>
    <#assign topKeywordsImage = topBrandKeywordsUrl>
</#if>

<#include "topKeywordsTable.ftl" />
</#if>