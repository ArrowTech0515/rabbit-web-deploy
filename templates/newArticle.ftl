Hello ${user.firstName},
<br /><br />
Your new article is published & live, you can see it at <a href="${appUrl}emailClickGuest?userId=${user.id?c}&name=${template}&source%3D${template}${appDomain}&userId=${user.id?c}&url=${link.pageUrl}">${link.pageUrl}</a>
<br /><br />
<#if user.guestBlogsMax &gt; 0>
    Your current package is <strong>${user.userPackage.name}</strong> and you have <strong>${user.guestBlogsMax}</strong> articles per month.
    <#if user.guestBlogsUsed == 0>
        Although this was a free trial, to prevent spammers and individuals from creating multiple accounts, this article may be removed in a few hours, unless you are a premium user, of course. We apologize for any inconvenience and appreciate your understanding.
    <#else>
        This month we have published <strong>${user.guestBlogsUsed}</strong> articles so far.
    </#if>
<#elseif user.creditsMax &gt; 0>
    Your current package is <strong>${user.userPackage.name}</strong>, in which you have <strong>${user.creditsMax}</strong> credits per month.
    This month you have used <strong>${user.creditsUsed}</strong> credits so far.
<#elseif user.linksRequestMax &gt; 0>
    Your current package is <strong>${user.userPackage.name}</strong>, in which you have <strong>${user.linksRequestMax}</strong> links per month.
    This month you have used <strong>${user.linksRequestUsed}</strong> links so far (one article is equivalent to 4 links).
</#if>
<br /><br />
Article links can help improve your website's visibility, authority, backlink profile, and anchor text diversity, all of which can contribute to improved search engine rankings and SEO.
<br />
Share your Article - Social media platforms like Facebook have the potential for content to go viral!
<a href="https://www.facebook.com/sharer/sharer.php?u=${link.pageUrl}" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png"></a>
<br /><br />
<br /><br />
<#include "include/loginLink.ftl"/>
<#include "include/openMail.ftl"/>