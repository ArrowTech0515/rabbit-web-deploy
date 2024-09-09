<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="Content-Style-Type" content="text/css"/>
    <link rel="stylesheet" type="text/css" href="${url}/templates/reports/style.ftl-css" media="print"/>
<#include "../ftlStyles.ftl-css"/>
<style>
<#--<#if ranksColsCounter < 4><#else>-->
    .centerText {
        text-align: center;
    }
    <#if allOptions.addColorToCols>
    .highlightedCol {
        background: #fff0c7;
        border-right: 0 !important;
    }
    .highlightedCol2 {
        background: #daefc5;
        border-right: 0 !important;
    }
    .highlightedCol3 {
        background: #d0e4ef;
        border-right: 0 !important;
    }
    .highlightedCol4 {
        background: #9999FF;
        border-right: 0 !important;
    }
    .highlightedCol5 {
        background: #99CCFF;
        border-right: 0 !important;
    }
    .highlightedCol7 {
        background: #FFCC99;
        border-right: 0 !important;
    }
    .highlightedCol8 {
        background: #CCFF99;
        border-right: 0 !important;
    }
    .highlightedCol9 {
        background: #FFFFCC;
        border-right: 0 !important;
    }
    .highlightedCol10 {
        background: #99FFFF;
        border-right: 0 !important;
    }
    </#if>
<#--</#if>-->
</style>
</head>
<#if coverUrl??>
<body style="background: url('${coverUrl}') repeat-y; background-color: #eeeeee; font-family: Arial; margin: 0; padding: 0;" dir="${dir}">
<#else>
<body style="background: url('${url}/images/reports/generic.jpg') repeat-y; background-color: #eeeeee; font-family: Arial; margin: 0; padding: 0;" dir="${dir}">
</#if>
<#include "incBeginPage.ftl"/>
    <div style="padding-top: 250px; text-align: center; margin: 0; height: 100%;">
<#if customerName??>
        <h1 style="font-weight: bold; font-size: 50px;">${reverse(subject, locale)}</h1>
        <h1 style="font-weight: bold; font-size: 50px;">${reverse(customerName, locale)}</h1>
<#else>
    <h1 style="font-weight: bold; font-size: 50px;">${reverse(allOptions.docTitle, locale)}</h1>
    <h1 style="font-weight: bold; font-size: 50px;">
        <#if allOptions.docTitle2?? && allOptions.docTitle2 != ''>
            ${reverse(allOptions.docTitle2, locale)}
        <#else>
            ${reverse(website.name, locale)}
        </#if>

    </h1>
</#if>
<#if allOptions.mainComments?? && allOptions.mainComments != ''>
    <div style="height: 300px; ">
        <h4>${reverse(allOptions.mainComments, locale)}</h4>
    </div>
<#else>
    <div style="height: 250px; " />
</#if>
<#if allOptions.addDateInFirstPage>
    <h2>${currentDate?string("dd/MM/yyyy")}</h2>
</#if>
    </div>
<#include "incEndPage.ftl"/>