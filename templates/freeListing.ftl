Hello,
<br /><br />
How are you?
<br /><br />
My name is ${agentName} from ${user.appDomain.name}, I wanted to offer you free publish at the Directory Listing <a href="${publishingSite}">${publishingSiteName}</a>, completely FREE!
<br/><br />
Also, you can have many more backlinks from other sites pointing to your website, that can really boost your SEO ranks and traffic.
<br /><br />
<a href="${appUrl}emailClickGuest?userId=${user.id?c}&name=${template}&url=${appUrl}activationLoginGuest%3FactivationCode%3D${user.activationCode}%26source%3D${template}${appDomain}&userId=${user.id?c}" title="Login">Login</a> to your account and publish your website, and get more listings.
<br />
<br />
If you have any questions please let me know.
<br />
Thanks,
<br />
 ${agentName}.
<#include "include/openMail.ftl"/>
<#include "include/emailSignatureLogo.ftl"/>