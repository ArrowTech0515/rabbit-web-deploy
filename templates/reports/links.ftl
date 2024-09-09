<#if addLinks>
    <#if true>
    <#--<#if allOptions.linkDivideToGroups>-->
        <#list links?keys as key>
            <#assign list = links[key]>
            <#assign linksTitle = key>
            <#include "linksTable.ftl">
        </#list>
    <#else>
        <#assign list = links>
        <#include "linksTable.ftl">
    </#if>
</#if>