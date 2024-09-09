Hello,
<#--Hello ${user.firstName},-->
<br />
How are you?
<br /><br />
My name is ${agentName} from ${appName}, I wanted to make sure all is fine with your account, and to ask may I offer you extra free keywords?
<br /><br />
<#include "include/loginLink.ftl"/>

<br />
Thanks,
<br />
 ${agentName}.
<#include "include/openMail.ftl"/>
<#include "include/emailSignatureLogo.ftl"/>