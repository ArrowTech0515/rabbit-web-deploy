<#if user.hasCover && allOptions.useMyWhiteLabelDesign>
<#--<div style="height: 130px; display: block; margin: 0; background-color: red;" />-->
<div style="height: 130px; display: block; margin: 0;" />
<#else>
<#--<table style="width: 100%; height: 130px; margin: 0; padding: 0; background-color: red;" cellpadding="0" cellspacing="0">-->
<table style="width: 100%; height: 130px; margin: 0; padding: 0 40px;" cellpadding="0" cellspacing="0">
    <tr>
        <td width="270px">
            ${reverse(allOptions.headerLeftText, locale)}

        <#--${currentDate?string("dd/MM/yyyy")} ${messages('Date', locale, "true")}-->
            <br/>
            <#if allOptions.addLogo>
                <img height="70px" style="margin-${align}: 40px;" src="${url}/UserLogo?id=${user.id?string("0")}"/>
            </#if>
        </td>
        <td width="270px" align="center" style="text-align: center;">
            <#if allOptions.headerCenterText??>
                ${reverse(allOptions.headerCenterText, locale)}
            </#if>
        </td>
        <td style="text-align: right" width="270px">
            ${reverse(allOptions.headerRightText, locale)}
        <#--<#if user.phone??>-->
            <#--<h4>${user.phone} ${messages('Phone', locale, "true")}</h4>-->
        <#--</#if>-->
        <#--<#if user.address??>-->
            <#--<h4>${user.address} ${messages('Address', locale, "true")}</h4>-->
        <#--</#if>-->
        </td>
    </tr>
</table>
</#if>
<#--<div style="width: 100%; height: 710px; margin: 0; background-color: orange;">-->
<div style="width: 100%; height: 796px; margin: 0; padding-top: 10px">
