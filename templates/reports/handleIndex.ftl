<#assign myListIndex = item_index>
<#if myListIndex <= maxRowsPerPage>
    <#assign currIndex = myListIndex>
    <#assign trCss = (item_index % 2 == 0)?string("","odd")>
<#else>
    <#if myListIndex % maxRowsPerPage == 1>
        <#assign currIndex = 0>
    <#elseif myListIndex % maxRowsPerPage == 0>
        <#assign currIndex = maxRowsPerPage>
    <#else>
        <#assign currIndex = myListIndex % maxRowsPerPage>
    </#if>
    <#assign trCss = ((item_index - 1) % 2 == 0)?string("","odd")>
</#if>
<#--${myListIndex} - ${currIndex}-->