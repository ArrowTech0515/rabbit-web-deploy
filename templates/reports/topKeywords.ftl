<#if topKeywords??>
<#assign topKeywordsList = topKeywords>
<#assign topKeywordsTitle = 'TopAnalyticsKeywords'>

<#if topKeywordsUrl??>
    <#assign topKeywordsImage = topKeywordsUrl>
</#if>
<#include "topKeywordsTable.ftl" />
</#if>