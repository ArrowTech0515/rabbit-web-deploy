<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="Content-Style-Type" content="text/css"/>

    <#include "../ftlStyles.ftl-css"/>
</head>
<#--<body style="background-color: #eeeeee" dir="${dir}">-->
<body dir="${dir}" style="color: #333333;">
<#include "openMail.ftl"/>
<#if user.appDomain.name == 'Rabbit SEO'>
<#--    <ul style="background-color: #2D2D2D; padding: 0; max-height: 57px;">-->
<#--        <li style="margin-${align}: 20px; max-height: 57px;">-->
<#--            <img src="${appUrl}styles/themes/${user.appDomain.customTheme}/logo.png" width="188" style="max-height: 57px;" />-->
<#--        </li>-->
<#--    </ul>-->
<#else>
<table align="center" style="font-family: Arial; padding: 5px 0; width: 100%;" cellspacing="0" cellpadding="0">
    <tr>
        <td>
            <table style="background-color: #fff; width: 95%; padding: 5px 20px; height: 200px;">
                <tr>
                    <td>
                        <h2>${subject}</h2>
                    </td>
                </tr>
                <#if firstName??>
                <tr>
                    <td>
                        <h2>${firstName},</h2>
                    </td>
                </tr>
                </#if>
</#if>