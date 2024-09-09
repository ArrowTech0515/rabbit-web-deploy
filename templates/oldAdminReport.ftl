<#include "include/header.ftl"/>
<tr>
    <td>
        <h4>Basic Details</h4>
        <table>
        <#assign col="Login Count">
        <#assign val=loginCount>
        <#include "include/tableProp.ftl">

        <#assign col="Article Post count">
        <#assign val=articlePostCount>
        <#include "include/tableProp.ftl">

        <#assign col="Article Post failed count">
        <#assign val=articlePostFailed>
        <#include "include/tableProp.ftl">

        <#assign col="Scan Pages Count">
        <#assign val=pagesCount>
        <#include "include/tableProp.ftl">
        </table>

    <#assign col1="User">
    <#assign col2="Count">

    <#assign mapTitle="Login Details">
    <#assign map=usersLogin>
    <#include "include/map.ftl">

    <#assign mapTitle="Failed Login">
    <#assign map=failedLogin>
    <#include "include/map.ftl">

    <#assign mapTitle="Article Posts">
    <#assign map=usersArticlePost>
    <#include "include/map.ftl">

    <#assign mapTitle="Project Managers Login">
    <#assign map=projectManagersLogin>
    <#include "include/map.ftl">

    <#assign mapTitle="Customers Login">
    <#assign map=customersLogin>
    <#include "include/map.ftl">

        <h4>Scheduled Tasks</h4>
        <table>
        <#assign col="Monitor Links Counts">
        <#assign val=linksTaskCountSize>
        <#include "include/tableProp.ftl">

        <#assign col="Monitor Links Changed Count">
        <#assign val=linksTaskCountChanged>
        <#include "include/tableProp.ftl">

        <#assign col="Google Analytics Websites">
        <#assign val=googleAnalyticsWebsites>
        <#include "include/tableProp.ftl">

        <#assign col="Google Webmaster Tools Websites">
        <#assign val=googleWebmasterToolsWebsites>
        <#include "include/tableProp.ftl">

        <#assign col="User Task Count">
        <#assign val=userTaskCount>
        <#include "include/tableProp.ftl">
        </table>

    <#assign mapTitle="User scan messages">
    <#assign col2="Message">
    <#assign map=remoteUsersMsgs>
    <#include "include/map.ftl">

    </td>
</tr>
<#include "include/footer.ftl"/>