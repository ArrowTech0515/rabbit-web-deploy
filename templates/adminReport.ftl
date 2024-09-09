<#include "include/header.ftl"/>
<tr>
    <td>
        <#assign mapTitle='Login'>
        <#include "include/map.ftl">

        <#assign mapTitle='Websites'>
        <#include "include/map.ftl">

        <#assign mapTitle='Keywords'>
        <#include "include/map.ftl">

        <#--<h4>Comments</h4>-->
        <#--<#list comments as comment>-->
            <#--${comment}-->
            <#--<br />-->
        <#--</#list>-->
    </td>
</tr>
<#include "include/footer.ftl"/>