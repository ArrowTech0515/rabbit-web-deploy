</div>
<#--<#if user.hideCreditReport?? && user.hideCreditReport>-->
<#if true>
    <#--<div style="height: 144px; display: block; margin: 0; background-color: green;" />-->
    <div style="height: 144px; display: block; margin: 0;" />
<#else>
<#--<div style="text-align: center; color: #494949; vertical-align: bottom; margin: 0; height: 104px; background-color: green;">-->
<div style="text-align: center; color: #494949; vertical-align: bottom; margin: 0; height: 104px;">
    <h5>
        <#if dir="rtl">
            <a style="color: #494949;" href="${appUrl}">${appUrl}</a>
            ${messages('ReportFooter', locale, "true")}
        <#else>
            ${messages('ReportFooter', locale, "true")}
            <a style="color: #494949;" href="${appUrl}">${appUrl}</a>
        </#if>
    </h5>
</div>
</#if>
