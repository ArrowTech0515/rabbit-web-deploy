<#include "include/header.ftl"/>
<tr>
    <td>
<#--        <h3>${messages('Projects', locale)}</h3>-->

<#--        <div style="width: 90%">-->
<#--        <#list items?keys as key>-->
<#--            <span style="width: 100px; margin-top: 10px;">-->
<#--                    <a href="#${key}">${key}</a>&nbsp;&nbsp;|&nbsp;&nbsp;-->
<#--                </span>-->
<#--        </#list>-->
<#--        </div>-->
    <#if hasFirstPageChanges>
        <h3>${messages('FirstPageChanges', locale)}</h3>

        <#assign list=firstPageChanges>
        <#include "include/rankingNotificationTable.ftl">
        <br/><br/>
    </#if>

    <#if hasBigChanges>
        <h3>${messages('BigChanges', locale)}</h3>

        <#assign list=bigChanges>
        <#include "include/rankingNotificationTable.ftl">
        <br/><br/>
    </#if>

        <br />
        <h3>${messages('AllPositions', locale)}</h3>
    <#list items?keys as key>
        <table style="width: 100%; border: 0; padding: 0;" cellpadding="5" cellspacing="0">
            <tr>
                <td colspan="5">
                    <h3 style="margin: 0; padding:0;"><a name="${key}">${key}</a></h3>
                </td>
            </tr>
            <#list items[key]?keys as websiteKey>
                <tr>
                    <td colspan="5">
                        &nbsp;&nbsp;&nbsp;<h4 style="margin: 0; padding:0;"><a style="color: #333;" name="${websiteKey}">${websiteKey}</a></h4>
                    </td>
                </tr>
                <tr>
                    <th style="text-align: ${align};" width="150">${messages('Keyword', locale)}</th>
                    <th width="150">${messages('LocalSearch', locale)}</th>
                    <th style="text-align: ${align};">${messages('Url', locale)}</th>
                    <th width="120">${messages('PreviousPosition', locale)}</th>
                    <th width="120">${messages('Yesterday', locale)}</th>
                    <th width="120">${messages('CurrentPosition', locale)}</th>
                    <th width="50">${messages('Result', locale)}</th>
                </tr>
                <#list items[key][websiteKey] as item>
                    <#assign trStyle = ((item_index - 1) % 2 == 0)?string("background-color: #e6e6e6;","")>
                    <#if item.changed>
                    <tr style="font-weight: bold; ${trStyle}">
                    <#else>
                    <tr style="${trStyle}">
                    </#if>
                    <td>
<#--                    <#if item.starred><span style="color: #0b77b7;">**</span></#if>-->
                    ${item.keyword}
                    </td>
                    <td style="text-align: center">
                    ${item.localSearches}
                    </td>
                    <td>
                        <#if item.website?length < 100>
                            ${item.website}
                        <#else>
                            ${item.website?substring(0, 100)}
                        </#if>
                    </td>
                    <td style="text-align: center">
                        <#if item.prevPos == 0>
                            <#else>
                        <#--${item.prevPos}   (${item.prevDate?string("dd/MM/yyyy")})-->
                        ${item.prevPos}
                        </#if>
                    </td>
                    <td style="text-align: center">
                        <#if item.daysAgo1 == 0>
                        <#else>
                        <#--${item.prevPos}   (${item.prevDate?string("dd/MM/yyyy")})-->
                            ${item.daysAgo1}
                        </#if>
                    </td>
                    <td style="text-align: center">
                    ${item.currPos} &nbsp;&nbsp;&nbsp; (${item.currDate?string("dd/MM/yyyy")})
                    </td>
                    <td style="text-align: center">
                        <#if item.prevPos &gt; 0>
                            <#if item.currPos < item.prevPos>
                                <img src="https://dlnil54eooeso.cloudfront.net/assets/images/icon/upload-up.png" alt="Up">(${item.prevPos -item.currPos})
                                <#else>
                                    <img src="https://dlnil54eooeso.cloudfront.net/assets/images/icon/upload-down.png" alt="Down">(${item.currPos - item.prevPos})
                            </#if>
                        </#if>
                    </td>
                </tr>
                </#list>
                <tr>
                    <td colspan="5">&nbsp;</td>
                </tr>
            </#list>
        </table>
        <#if user.lastPaymentDate??>
<#--            Paying-->
        <#else>
            <a href="${appUrl}emailClickGuest?userId=${user.id?c}&name=${template}&url=${appUrl}activationLoginGuest%3FactivationCode%3D${user.activationCode}%26source%3D${template}<#if appDomain??>${appDomain}</#if>&userId=${user.id?c}" title="Login">Add More Keywords</a>
            <br />
            <br />
        </#if>
        <br/>
    </#list>
    </td>
</tr>
<tr>
    <td>
        * ${messages('NotificationReportComment', locale)}
        <br/>
        * ${messages('NotificationReportComment2', locale)}
    </td>
</tr>
<tr>
    <td>
        <a href="${appUrl}changeEmailSettingsGuest?count=0&token=${user.activationCode}">${messages('IDoNotWantDailyEmailsAtAll', locale)}</a>
        <br />
        <a href="${appUrl}changeEmailSettingsGuest?count=1&token=${user.activationCode}">${messages('IWantThisEmailOnceAWeek', locale)}</a>
        <br />
        <a href="${appUrl}changeEmailSettingsGuest?count=2&token=${user.activationCode}">${messages('IWantThisEmailTwiceAWeek', locale)}</a>
        <br />
    </td>
</tr>
<#include "include/footer.ftl"/>