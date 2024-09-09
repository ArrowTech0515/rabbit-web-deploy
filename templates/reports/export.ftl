<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="Content-Style-Type" content="text/css"/>
    <link rel="stylesheet" type="text/css" href="${url}/templates/reports/style.ftl-css" media="print"/>
<#include "../ftlStyles.ftl-css"/>
<style>
    @page {
        size: 1200px 600px;
        margin: 0;
        padding: 30px;
        background: #e6e6e6; /* Old browsers */
        background: -moz-linear-gradient(top,  #e6e6e6 0%, #ffffff 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#e6e6e6), color-stop(100%,#ffffff)); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top,  #e6e6e6 0%,#ffffff 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top,  #e6e6e6 0%,#ffffff 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top,  #e6e6e6 0%,#ffffff 100%); /* IE10+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e6e6e6', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
    }
    .pageDiv {
        width: 100%;
        height: 540px;
        margin: 0;
        padding: 0;
    }
</style>
</head>
<body style="font-family: Arial; margin: 0; padding: 0;" dir="${dir}">

<#assign maxRowsPerPage = 15>

<#if titles?? && list??>
<#list list as item>
    <#include "handleIndex.ftl" />

    <#if currIndex == 0>
    <div class="pageDiv">
    <table style="width: 100%; padding: 0 40px; text-align: ${align};">
    <tr style="text-align: ${align};">
    <td>
    <table class="gridTable" cellspacing="0" style="width: 100%;">
        <tr class="header">
        <#list titles?keys as key>
            <th style="white-space:nowrap; font-size: 11px">${messages(titles[key], locale, "true")}</th>
        </#list>
        </tr>
    </#if>
    <tr class="${trCss}">
        <#list titles?keys as key>
            <#if key?? && numericCols[key]??>
                <#if numericCols[key]>
                <td style="font-size: 11px; text-align: center;">
                    <#if item[key]??>${reverse(item[key]?string, locale)}</#if>
                </td>
                <#elseif key == 'url'>
                <td style="font-size: 11px; text-align: left;">
                    <#if item[key]??>${item[key]}</#if>
                </td>
                <#else>
                <td style="font-size: 11px">
                    <#if item[key]??>${reverse(item[key]?string, locale)}</#if>
                </td>
                </#if>
            <#else>
            <td></td>
            </#if>
        </#list>
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
    </div>
    </#if>
</#list>
</#if>

<#include "footer.ftl"/>