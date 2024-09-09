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

<#if websitesMap?size < 1><#else>
<div style="width: 100%; height: 540px; margin: 0;">
</#if>
<div style="text-align: center; margin: 0; font-weight: bold; font-size: 20px;">
    ${messages("ProjectManagerReport", locale, "true")} - ${reverse(projectManagerName, locale)}
    <br />
    ${currentDate?string("dd/MM/yyyy")}
</div>
<#assign maxRowsPerPage = 20>

<#list websitesMap?keys as item>
    <#include "handleIndex.ftl" />

    <#if currIndex == 0>
    <#if item_index < maxRowsPerPage><#else>
        <div style="width: 100%; height: 540px; margin: 0;">
    </#if>
    <div class="pageDiv">
    <table style="width: 100%; padding: 0 40px; text-align: ${align};">
    <tr style="text-align: ${align};">
    <td>
    <table class="gridTable" cellspacing="0" style="width: 100%;">
        <tr class="header">
            <#if dir="rtl">
                <th style="white-space:nowrap; font-size: 11px">${messages("KeywordsTop10", locale, "true")}</th>
                <th style="white-space:nowrap; font-size: 11px">${messages("Points", locale, "true")}</th>
                <th style="white-space:nowrap; font-size: 11px">${messages("Website", locale, "true")}</th>
            <#else>
                <th style="white-space:nowrap; font-size: 11px">${messages("Website", locale, "true")}</th>
                <th style="white-space:nowrap; font-size: 11px">${messages("Points", locale, "true")}</th>
                <th style="white-space:nowrap; font-size: 11px">${messages("KeywordsTop10", locale, "true")}</th>
            </#if>
        </tr>
    </#if>
    <tr class="${trCss}">
        <#if dir="rtl">
            <td style="font-size: 11px; text-align: center;"><#if websitesMap[item]?? && websitesMap[item].name??>${websitesMap[item].name}%</#if></td>
            <td style="font-size: 11px; text-align: center;">${websitesMap[item].id}</td>
            <td style="font-size: 11px">${item}</td>
        <#else>
            <td style="font-size: 11px">${item}</td>
            <td style="font-size: 11px; text-align: center;">${websitesMap[item].id}</td>
            <td style="font-size: 11px; text-align: center;"><#if websitesMap[item]?? && websitesMap[item].name??>${websitesMap[item].name}%</#if></td>
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
    </div>
    </div>
    </#if>
</#list>

<#if weeklyList??>
<div style="width: 100%; height: 540px; margin: 0;">
<div style="text-align: center; margin: 0; font-weight: bold; font-size: 20px;">
    ${messages("WeeklyReport", locale, "true")}
</div>
<table width="100%">
    <tr>
        <td width="500px" valign="top" align="left">
            <#if weeklyChartUrl?? && weeklyChartUrl != ''>
                <img width="100%" src="${weeklyChartUrl}" />
            </#if>
            <br />
            <#if weeklyChartTop10Url?? && weeklyChartTop10Url != ''>
                <img width="100%" src="${weeklyChartTop10Url}" />
            </#if>
        </td>
        <td width="350px" valign="top" align="right">
            <br />
            <br />
            <#list weeklyList as item>
                <#include "handleIndex.ftl" />

                <#if currIndex == 0>
                <div class="pageDiv">
                <table style="width: 100%; padding: 0 40px; text-align: ${align};">
                <tr style="text-align: ${align};">
                <td>
                <table class="gridTable" cellspacing="0" style="width: 100%;">
                    <tr class="header">
                        <#if dir="rtl">
                            <th style="white-space:nowrap; font-size: 11px">${messages("KeywordsTop10", locale, "true")}</th>
                            <th style="white-space:nowrap; font-size: 11px">${messages("Points", locale, "true")}</th>
                            <th style="white-space:nowrap; font-size: 11px">${messages("Date", locale, "true")}</th>
                        <#else>
                            <th style="white-space:nowrap; font-size: 11px">${messages("Date", locale, "true")}</th>
                            <th style="white-space:nowrap; font-size: 11px">${messages("Points", locale, "true")}</th>
                            <th style="white-space:nowrap; font-size: 11px">${messages("KeywordsTop10", locale, "true")}</th>
                        </#if>
                    </tr>
                </#if>
                <tr class="${trCss}">
                    <#if dir="rtl">
                        <td style="font-size: 11px; text-align: center;">${item.name.name}</td>
                        <td style="font-size: 11px; text-align: center;">${item.name.id}</td>
                        <td style="font-size: 11px">${item.id}</td>
                    <#else>
                        <td style="font-size: 11px">${item.id}</td>
                        <td style="font-size: 11px; text-align: center;">${item.name.id}</td>
                        <td style="font-size: 11px; text-align: center;">${item.name.name}</td>
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
                </div>
                </#if>
            </#list>
        </td>
    </tr>
</table>
</div>
</#if>

<#if monthlyList??>
<div style="width: 100%; height: 540px; margin: 0;">
<div style="text-align: center; margin: 0; font-weight: bold; font-size: 20px;">
    ${messages("MonthlyReport", locale, "true")}
</div>
<table width="100%">
    <tr>
        <td width="500px" valign="top" align="left">
            <#if monthlyChartUrl?? && monthlyChartUrl != ''>
                <img width="100%" src="${monthlyChartUrl}" />
            </#if>
            <br />
            <#if monthlyChartTop10Url?? && monthlyChartTop10Url != ''>
                <img width="100%" src="${monthlyChartTop10Url}" />
            </#if>
        </td>
        <td width="350px" valign="top" align="right">
            <br />
            <br />
            <#list monthlyList as item>
                <#include "handleIndex.ftl" />

                <#if currIndex == 0>
                <div class="pageDiv">
                <table style="width: 100%; padding: 0 40px; text-align: ${align};">
                <tr style="text-align: ${align};">
                <td>
                <table class="gridTable" cellspacing="0" style="width: 100%;">
                    <tr class="header">
                        <#if dir="rtl">
                            <th style="white-space:nowrap; font-size: 11px">${messages("KeywordsTop10", locale, "true")}</th>
                            <th style="white-space:nowrap; font-size: 11px">${messages("Points", locale, "true")}</th>
                            <th style="white-space:nowrap; font-size: 11px">${messages("Month", locale, "true")}</th>
                        <#else>
                            <th style="white-space:nowrap; font-size: 11px">${messages("Month", locale, "true")}</th>
                            <th style="white-space:nowrap; font-size: 11px">${messages("Points", locale, "true")}</th>
                            <th style="white-space:nowrap; font-size: 11px">${messages("KeywordsTop10", locale, "true")}</th>
                        </#if>
                    </tr>
                </#if>
                <tr class="${trCss}">
                    <#if dir="rtl">
                        <td style="font-size: 11px; text-align: center;">${item.name.name}</td>
                        <td style="font-size: 11px; text-align: center;">${item.name.id}</td>
                        <td style="font-size: 11px">${item.id}</td>
                    <#else>
                        <td style="font-size: 11px">${item.id}</td>
                        <td style="font-size: 11px; text-align: center;">${item.name.id}</td>
                        <td style="font-size: 11px; text-align: center;">${item.name.name}</td>
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
                </div>
                </#if>
            </#list>
        </td>
    </tr>
</table>
</div>
</#if>
<#include "footer.ftl"/>