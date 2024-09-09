<br /><br />
<#if user?? && user.activationCode??>
    <#include "loginLink.ftl"/>
<#else>
    Create your ${appName} account now, and I'd be happy to upgrade it for you with a free trial: <a href='${appUrl}emailClickGuest?name=${template}&url=${url}&subscriberId=${subscriberId?c}'>${url}</a>
</#if>

<br />
<br />
Thanks,
<br />
${agentName}.
<#include "openMail.ftl"/>
<#include "emailSignatureLogo.ftl"/>