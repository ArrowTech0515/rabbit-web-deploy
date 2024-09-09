Hello ${user.firstName},
<br /><br />
We are pleased to let you know that your new backlink is live, you can see it at <a href="${appUrl}emailClickGuest?userId=${user.id?c}<#if user.subscriberId??>&subscriberId=${user.subscriberId?c}</#if>&name=${template}&source%3D${template}${appDomain}&url=${link.pageUrl}">${link.pageUrl}</a>
<br /><br />
<#include "newLinkUsage.ftl" />
(Note: You can <a href="${appUrl}changeLinksEmailSettingsGuest?settings=everyWeek&source=NewLink&activationCode=${user.activationCode}" title="Login">change</a> your settings to get one email per week with all links together)
<br /><br />
Link building is the process of acquiring backlinks from other websites to your own. A backlink (usually just
called a link) is a way for users to navigate between pages on the Internet. Search engines use links to crawl
the web. They will crawl the links between the individual pages on your website, and they will crawl the links
between entire websites.
<br /><br />
<b>Enhance Your Listings - Add Business Description, Images, Social Pages, Contact Information etc! </b>
<#include "include/loginLink.ftl"/>
<#include "include/openMail.ftl"/>