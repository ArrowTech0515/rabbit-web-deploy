<#if user?? && user.activationCode??>
You can <a href="${appUrl}emailClickGuest?userId=${user.id?c}&name=${template}&url=${appUrl}activationLoginGuest%3FactivationCode%3D${user.activationCode}%26source%3D${template}${appDomain}&userId=${user.id?c}" title="Login">login</a> to ${appName} here.
</#if>
