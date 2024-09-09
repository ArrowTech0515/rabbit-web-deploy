<#list list as item>
    <#include "handleIndex.ftl" />
    <#if currIndex == 0>
        <#include "incBeginPage.ftl"/>
    <#if linksTitle??>
        <div style="text-align: ${align}; font-size: 15px; font-weight: bold; padding: 0 40px;">
            ${reverse(linksTitle, locale)} - ${messages('Links', locale, "true")}
        </div>
    </#if>
    <table style="width: 100%; padding: 0 40px;">
    <tr>
        <td>
            <#if myListIndex == 0 && item_index == 0 && linkComments??>
                <div style="text-align: ${align}; font-size: 12px;">
                ${reverse(linkComments, locale)}
                </div>
            </#if>
        </td>
    </tr>
    <tr style="text-align: ${align};">
    <td>
    <table class="gridTable" cellspacing="0" style="width: 100%;">
        <tr class="header">
        <#if dir="rtl">
            <th width="30%">${messages('Link', locale, "true")}</th>
            <th>${messages('Page', locale, "true")}</th>
        <#else>
            <th>${messages('Page', locale, "true")}</th>
            <th width="30%">${messages('Link', locale, "true")}</th>
        </#if>
        </tr>
    </#if>
    <tr class="${trCss}">
        <#if dir="rtl">
            <td><a href="${item.href?replace("\"","")?replace("<","")}">${reverse(item.keywordName?replace("<",""), locale)?replace("<b>","")}</a></td>
            <#if item.pageUrl?length < 70>
            <#assign currUrl = item.pageUrl>
            <#else>
            <#assign currUrl = item.pageUrl?substring(0,70)>
            </#if>
            <td><a href="${item.pageUrl?replace("\"","")?replace("<","")}">${currUrl?replace("<","")}</a></td>
        <#else>
            <#if item.pageUrl?length < 70>
            <#assign currUrl = item.pageUrl>
            <#else>
            <#assign currUrl = item.pageUrl?substring(0,70)>
            </#if>
            <td><a href="${item.pageUrl?replace("\"","")?replace("<","")}">${currUrl?replace("<","")}</a></td>
            <td><a href="${item.href?replace("\"","")?replace("<","")}">${reverse(item.keywordName?replace("<",""), locale)?replace("<b>","")}</a></td>
        </#if>
    </tr>
    <#include "handleIndexEndPage.ftl" />
</#list>