Hello ${user.firstName},
<br /><br />
Following are the pages with links that we recently created for you (you can also get email on <a href="${appUrl}changeLinksEmailSettingsGuest?settings=everyLink&source=NewLink&activationCode=${user.activationCode}" title="Login">every link</a>):
<br />
<#list links as key>
 ${key_index + 1}. ${key}
<br/>
</#list>
<br /><br />
<#if user.creditsMax == 0>
 Your current package is <strong>${user.userPackage.name}</strong> and you have <strong>${user.linksRequestMax}</strong> links per month.
 <#if user.linksRequestUsed == 0>
  This one is a free link!
 <#else>
  Current month links up to now: <strong>${user.linksRequestUsed}</strong> links.
 </#if>
<#else>
 Your have <strong>${user.creditsMax}</strong> links per month in the <strong>${user.userPackage.name}</strong> package.
 <#if user.creditsUsed &gt; 0>
  This month we have created <strong>${user.creditsUsed}</strong> links so far.
 <#else>
  This one is a free link!
 </#if>
</#if>
<br /><br />

Link building is the process of acquiring backlinks from other websites to your own. A backlink (usually just
called a link) is a way for users to navigate between pages on the Internet. Search engines use links to crawl
the web. They will crawl the links between the individual pages on your website, and they will crawl the links
between entire websites.
<br /><br />
<a href="${appUrl}emailClickGuest?userId=${user.id?c}&name=${template}&url=${appUrl}activationLoginGuest%3FactivationCode%3D${user.activationCode}%26source%3D${template}${appDomain}&userId=${user.id?c}" title="Login">Publish More Links</a>
<#--<a href="${appUrl}activationLoginGuest?source=NewLink&activationCode=${user.activationCode}" title="Login">Create More Links</a>-->
<br />
<br />