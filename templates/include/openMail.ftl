<#--<#if user?? && user.id?? && user.id &gt; 0 && subscriber?? && subscriber.id?? && subscriber.id &gt; 0 && template??>-->
<#--    <img src="${appUrl}emailOpenGuest?userId=${user.id?c}&subscriberId=${subscriber.id}&name=${template}" alt="" height="0" width="0" style="width: 0; height: 0; display: none">-->
<#--<#elseif user?? && user.id?? && user.id &gt; 0 && template??>-->
<#--    <img src="${appUrl}emailOpenGuest?userId=${user.id?c}&name=${template}" alt="" height="0" width="0" style="width: 0; height: 0; display: none">-->
<#--<#elseif subscriber?? && subscriber.id?? && subscriber.id &gt; 0 && template??>-->
<#--    <img src="${appUrl}emailOpenGuest?subscriberId=${subscriber.id}&name=${template}" alt="" height="0" width="0" style="width: 0; height: 0; display: none">-->
<#--<#elseif template??>-->
<#--    <img src="${appUrl}emailOpenGuest?email=name=${template}" alt="" height="0" width="0" style="width: 0; height: 0; display: none">-->
<#--</#if>-->

<#if user?? && user.id?? && user.id &gt; 0 && subscriber?? && subscriber.id?? && subscriber.id &gt; 0 && template??>
    <img src="${appUrl}EmailOpen?userId=${user.id?c}&subscriberId=${subscriber.id}&name=${template}" alt="" height="0" width="0" style="width: 0; height: 0; display: none">
<#elseif user?? && user.id?? && user.id &gt; 0 && template??>
    <img src="${appUrl}EmailOpen?userId=${user.id?c}&name=${template}" alt="" height="0" width="0" style="width: 0; height: 0; display: none">
<#elseif subscriber?? && subscriber.id?? && subscriber.id &gt; 0 && template??>
    <img src="${appUrl}EmailOpen?subscriberId=${subscriber.id}&name=${template}" alt="" height="0" width="0" style="width: 0; height: 0; display: none">
<#elseif template??>
    <img src="${appUrl}EmailOpen?email=name=${template}" alt="" height="0" width="0" style="width: 0; height: 0; display: none">
</#if>
