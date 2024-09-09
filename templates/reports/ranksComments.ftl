<tr>
    <td>
        <#if myListIndex == 0 && keywordComments??>
            <div style="text-align: ${align}; font-size: 12px;">
            ${reverse(keywordComments, locale)}
            </div>
        </#if>
    </td>
</tr>
