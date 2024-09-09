Hello ${user.firstName},
<br /><br />
Your new blog post is now live on <a href="${appUrl}emailClickGuest?userId=${user.id?c}&name=${template}&source%3D${template}${appDomain}&userId=${user.id?c}&url=${link.pageUrl}">${link.pageUrl}</a>
<br /><br />
<#if user.guestBlogsMax &gt; 0>
    You have the <strong>${user.userPackage.name}</strong> package, with <strong>${user.guestBlogsMax}</strong> blog posts per month.
    <#if user.guestBlogsUsed == 0>
        This blog post was offered as a complimentary trial.
    <#else>
        This month we have published <strong>${user.guestBlogsUsed}</strong> blog posts so far.
    </#if>
<#elseif user.creditsMax &gt; 0>
    You have the <strong>${user.userPackage.name}</strong> package, in which you have <strong>${user.creditsMax}</strong> credits per month.
    This month you have used <strong>${user.creditsUsed}</strong> credits so far.
<#elseif user.linksRequestMax &gt; 0>
    You have the <strong>${user.userPackage.name}</strong> package, in which you have <strong>${user.linksRequestMax}</strong> links points per month.
    This month you have used <strong>${user.linksRequestUsed}</strong> links points so far (one article is equivalent to 4 links points).
<#else>
    This blog post was offered as a complimentary trial.
</#if>
<br /><br />
Blog Posts links can help improve your website's visibility, authority, backlink profile, and anchor text diversity, all of which can contribute to improved search engine rankings and SEO.
<br />
Share your Blog Post - Engage with your audience & Establish social proof and enhance credibility <br />
<a href="https://www.facebook.com/sharer/sharer.php?u=${link.pageUrl}" target="_blank"><img alt="Facebook Icon" src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png"></a>
&nbsp;&nbsp;
<a href="https://twitter.com/intent/tweet?text=${link.pageUrl} - ${link.pageTitle}" target="_blank"><img alt="Twitter Icon" src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png"></a>
&nbsp;&nbsp;
<a href="https://pinterest.com/pin/create/button?url=${link.pageUrl}&media=${link.pageUrl}&description=${link.pageTitle}" target="_blank"><img alt="Pinterest Icon" src="https://cdn.exclaimer.com/Handbook%20Images/pinterest-icon_32x32.png"></a>
&nbsp;&nbsp;
<a href="https://www.linkedin.com/shareArticle?mini=true&url=${link.pageUrl}&title=${link.pageTitle}" target="_blank"><img alt="LinkedIn Icon" src="https://cdn.exclaimer.com/Handbook%20Images/linkedin-icon_32x32.png"></a>
<br /><br />
<#include "include/loginLink.ftl"/>

<#if user.lastPaymentDate??>
<#else>
    <#if user.appDomain.deleteArticleFreeUsers?? && user.appDomain.deleteArticleFreeUsers>
        <br /><br />
        <b>Please Note</b>: In order to
        avoid spammers who create multiple
        accounts, this blog post will be live for <b>just a while</b> - then will be deleted
        (unless you are a premium user).
        Sorry and thanks for understanding.
    </#if>
</#if>
<#include "include/openMail.ftl"/>