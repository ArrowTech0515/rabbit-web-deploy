<#if addArticles>
    <#assign maxRowsPerPage = 18>
    <#list articles as item>
        <#include "handleIndex.ftl" />
        <#if currIndex == 0>
            <#include "incBeginPage.ftl"/>
        <div style="text-align: ${align}; font-size: 15px; font-weight: bold; padding: 0 20px;">
            ${messages('Articles', locale, "true")}
        </div>
        <table style="width: 100%; padding: 0 40px;">
            <tr>
                <td>
                    <#if item_index == 0 && articleComments??>
                        <div style="text-align: ${align}; font-size: 12px;">
                        ${reverse(articleComments, locale)}
                        </div>
                    </#if>
                </td>
            </tr>
        <tr style="text-align: ${align};">
        <td>
        <table class="gridTable" cellspacing="0" style="table-layout:fixed; width:100%">
            <tr class="header">
                <#if dir="rtl">
                    <th style="word-wrap: break-word; width: 80px; overflow:hidden;">${messages('Date', locale, "true")}</th>
                    <th style="word-wrap: break-word; width: 200px; overflow:hidden;">${messages('WebsiteOrPage', locale, "true")}</th>
                    <th>${messages('Article', locale, "true")}</th>
                <#else>
                    <th>${messages('Article', locale, "true")}</th>
                    <th style="word-wrap: break-word; width: 200px; overflow:hidden;">${messages('WebsiteOrPage', locale, "true")}</th>
                    <th style="word-wrap: break-word; width: 80px; overflow:hidden;">${messages('Date', locale, "true")}</th>
                </#if>
            </tr>
        </#if>
        <tr class="${trCss}">
            <#if dir="rtl">
                <td style="word-wrap: break-word; width: 80px; overflow:hidden;">${item.datePublish?string("dd/MM/yyyy")}</td>
                <td style="word-wrap: break-word; width: 200px; overflow:hidden;">
                    <#if item.url?? && item.url != ''>
                    <a href="${item.url}">${item.url}</a>
                    <#else>
                    <a href="${item.website.url}">${item.website.url}</a>
                    </#if>
                </td>
                <td>${reverse(item.article.name, locale)}</td>
            <#else>
                <td>${reverse(item.article.name, locale)}</td>
                <td style="word-wrap: break-word; width: 200px; overflow:hidden;">
                    <#if item.url?? && item.url != ''>
                    <a href="${item.url}">${item.url}</a>
                    <#else>
                    <a href="${item.website.url}">${item.website.url}</a>
                    </#if>
                </td>
                <td style="word-wrap: break-word; width: 80px; overflow:hidden;">${item.datePublish?string("dd/MM/yyyy")}</td>
            </#if>
        </tr>
        <#include "handleIndexEndPage.ftl" />
    </#list>
</#if>