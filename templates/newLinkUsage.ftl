<#if user.creditsMax == 0>
    Your current package is <strong>${user.userPackage.name}</strong> and you have <strong>${user.linksRequestMax}</strong> links per month.
    <#if user.linksRequestUsed <= 0>
        This one is a free link!
    <#else>
        This is link #<strong>${user.linksRequestUsed}</strong> for this month.
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
<#--<#include "include/openMail.ftl"/>-->