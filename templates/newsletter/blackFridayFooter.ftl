<br /><br />
<#if user?? && user.activationCode??>
    You can <a href="${appUrl}emailClickGuest?subscriberId=<#if subscriberId??>${subscriberId?c}</#if>&name=${template}&url=${appUrl}activationLoginGuest%3FactivationCode%3D${user.activationCode}%26source%3D${template}${appDomain.name}&userId=${user.id?c}" title="Login">login</a> to ${appName} here.
<#else>
    You can start ${appName} here: <a href='${appUrl}emailClickGuest?name=${template}&url=${url}&subscriberId=${subscriberId?c}'>${url}</a>
</#if>
<br />
<br />
Thanks,
<br />
${agentName}.
<#include "../include/openMail.ftl"/>
<#include "../include/emailSignatureLogo.ftl"/>