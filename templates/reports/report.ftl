<#include "header.ftl"/>
<table style="width: 100%; margin-top: 20px; padding: 20px; height: 200px;">
    <tr>
        <td style="text-align: center;">
            <h2>${websiteName} ${messages(subject, locale, "true")}</h2>
        </td>
    </tr>
    <tr style="text-align: ${align};">
        <td>
            <h5>${currentDate?string("dd/MM/yyyy")} ${messages('SEOReportDesc1', locale, "true")}</h5>
        <#--<h5>${messages('SEOReportDesc2', locale, "true")}</h5>-->

            <table class="gridTable" cellspacing="0" style="width: 100%;">
                <tr class="header">
                    <th>${messages('CurrentPosition', locale, "true")}</th>
                    <th>${messages('Keyword', locale, "true")}</th>
                </tr>
            <#list keywords as keyword>
                <tr class="${trCss}">
                    <td>${keyword.currentPosition}</td>
                    <td>${reverse(keyword.keyword.name, locale)}</td>
                </tr>
            </#list>
            </table>
        </td>
    </tr>
</table>
<#include "footer.ftl"/>