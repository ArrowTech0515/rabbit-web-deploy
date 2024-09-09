<#if allOptions.appendixTitle1?? || imageUrl1??>
    <#assign currAppendixTitle = allOptions.appendixTitle1>
    <#if imageUrl1??>
        <#assign currAppendixImg = imageUrl1>
    </#if>
    <#assign currAppendixComment = allOptions.appendixComment1>
    <#include "appendixPage.ftl"/>
</#if>
<#if allOptions.appendixTitle2?? || imageUrl2??>
    <#assign currAppendixTitle = allOptions.appendixTitle2>
    <#if imageUrl2??>
        <#assign currAppendixImg = imageUrl2>
    </#if>
    <#assign currAppendixComment = allOptions.appendixComment2>
    <#include "appendixPage.ftl"/>
</#if>