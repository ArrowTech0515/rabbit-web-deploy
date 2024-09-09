<#include "include/header.ftl"/>
<tr>
    <td>
        <h3>PayingUsers</h3>
        <#assign list=paying>
        <#include "include/usersReportTable.ftl">
        <br/><br/>

        <h3>FreeUsers</h3>
        <#assign list=free>
        <#include "include/usersReportTable.ftl">
        <br/><br/>

        <h3>BlockedUsers</h3>
        <#assign list=blocked>
        <#include "include/usersReportTable.ftl">
        <br/><br/>

        <h3>PaySoonUsers</h3>
        <#assign list=paySoon>
        <#include "include/usersReportTable.ftl">
        <br/><br/>

        <h3>TrialUsers</h3>
        <#assign list=trial>
        <#include "include/usersReportTable.ftl">
        <br/><br/>

        <h3>GuestUsers</h3>
        <#assign list=articles>
        <#include "include/usersReportTable.ftl">
        <br/><br/>

        <h3>Copywriters</h3>
        <#assign list=copywriters>
        <#include "include/usersReportTable.ftl">
        <br/><br/>

        <h3>ToDelete</h3>
        <#assign list=toDelete>
        <#include "include/usersReportTable.ftl">
        <br/><br/>

        <h3>Others</h3>
        <#assign list=others>
        <#include "include/usersReportTable.ftl">
        <br/><br/>
    </td>
</tr>
<#include "include/footer.ftl"/>