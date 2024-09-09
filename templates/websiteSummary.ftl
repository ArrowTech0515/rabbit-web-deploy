<#include "include/header.ftl"/>
<tr>
    <td>
        <#if user.websitesUsed == 1>
            <br />

            <a href="${appUrl}activationLoginGuest?source=WebsiteSummary&activationCode=${user.activationCode}">
                <span style="color: blue">${messages('ClickHereToActivateYourAccount', locale)}</span>
            </a>
            <br /><br />
        </#if>
        ${messages('HereYouCanFindAShortSummaryForTheWebsite.ThereIsAlsoAPDFReportAttachedToThisEmail', locale)}
        <br />
        ${messages('TheReportCanBeAlsoCustomizedAndGeneratedInTheApp', locale)}
        <br />
        <hr class="strong">
        <br />
        <#if website.countKfw == 0>
            ${messages('CurrentlyYouDontHaveAnyKeywordsAssignedToThisWebsite', locale)}
            <a href="${appUrl}activationLoginGuest?source=WebsiteSummary&activationCode=${user.activationCode}">${messages('AddNewKeyword', locale)}</a>
            <#--<a href="http://${user.appDomain.domain}/websiteDashboard?id=${website.id}?string">${messages('AddNewKeyword', locale)}</a>-->
        <#else>
            <h3>${messages('ThereAre', locale)} ${website.countKfw} ${messages('KeywordsAssignedToThisWebsite', locale)}:</h3>
            <br />
        <table>
            <tr>
                <td>
                    <div class="percentageBox">${top10}%</div>
                </td>
                <td>
                    ${messages('OfKeywordsAreInTheTop10Results', locale)}
                </td>
            </tr>
            <tr>
                <td>
                    <div class="percentageBox">${top20}%</div>
                </td>
                <td>
                    ${messages('OfKeywordsAreInTheTop20Results', locale)}
                </td>
            </tr>
        </table>
        </#if>

        <hr class="strong">
        <br />

        <#if keywords??>
        <h3>${messages('Ranks', locale)}</h3>
        <#assign list=keywords>
        <#include "include/ranksSummaryTable.ftl">
        <br />
        <a href="${appUrl}activationLoginGuest?source=WebsiteSummary&activationCode=${user.activationCode}">${messages('SeeMore', locale)}</a>
        <br />
        <hr class="strong">
        <br /><br />
        </#if>

        <#if topComps??>
        <h3>${messages('Competitors', locale)}</h3>
        <#assign list=topComps>
        <#include "include/compsSummaryTable.ftl">
        <br />
        <a href="${appUrl}activationLoginGuest?source=WebsiteSummary&activationCode=${user.activationCode}">${messages('SeeMore', locale)}</a>
        <#--<a href="http://${user.appDomain.domain}/websiteDashboard?id=${website.id}?string">${messages('SeeMore', locale)}</a>-->
        <br />
        <hr class="strong">
        <br /><br />
        </#if>

        <#if moreRanks??>
        <h3>${messages('KeywordResearch', locale)}</h3>
        <#assign list=moreRanks>
        <#include "include/moreRanksSummaryTable.ftl">
        <br />
        <a href="${appUrl}activationLoginGuest?source=WebsiteSummary&activationCode=${user.activationCode}">${messages('SeeMore', locale)}</a>
        <br />
        <hr class="strong">
        <br /><br />
        </#if>

        <#if links??>
        <h3>${messages('Links', locale)}</h3>
        <#assign list=links>
        <#include "include/linksSummaryTable.ftl">
        <br />
        <a href="${appUrl}activationLoginGuest?source=WebsiteSummary&activationCode=${user.activationCode}">${messages('SeeMore', locale)}</a>
        <br />
        <hr class="strong">
        <br /><br />
        </#if>

        <#if landingPages??>
        <h3>${messages('LandingPages', locale)}</h3>
        <#assign list=landingPages>
        <#include "include/landingPagesSummaryTable.ftl">
        <br />
        <a href="${appUrl}activationLoginGuest?source=WebsiteSummary&activationCode=${user.activationCode}">${messages('SeeMore', locale)}</a>
        <br />
        <hr class="strong">
        <br /><br />
        </#if>

        <#if user.googleToken??>
            <#if website.analyticsTableId??><#else>
                <h3>${messages('WeDidntFindThisWebsiteInYourAnalyticsAccount', locale)}</h3>
                <br />
                <hr class="strong">
                <br /><br />
            </#if>
        <#else>
            <h3>${messages('GoogleAnalytics', locale)}</h3>
            <br />
            ${messages('ThereIsNoAnalyticsSupportInYourAccount.ByIntegratingAnalyticsYouCanSeeMoreDetailsInTheAppAndHaveMoreComprehensiveReports', locale)}
            <a href="${appUrl}activationLoginGuest?source=WebsiteSummary&activationCode=${user.activationCode}">${messages('AddAnalyticsSupport', locale)}</a>
            <#--<a href="http://${user.appDomain.domain}">${messages('AddAnalyticsSupport', locale)}</a>-->
            <br />
            <hr class="strong">
            <br />
        </#if>


        <#--<h3>${messages('DidYouKnow', locale)}</h3>-->
        <#--<br />-->
        <#--${messages('IfYouHaveWordpressOrJoomlaBlogsYouCanManageThemInTheApp.YouCanUploadMultipleArticlesAndScheduleThemForAutomaticPublishInYourWebsite.ThenYouCanAlsoExportThemInYourReports', locale)}-->
        <#--<a href="http://${user.appDomain.domain}">${messages('AddBlogNow', locale)}</a>-->
    </td>
</tr>
<#include "include/footerNoSignature.ftl"/>