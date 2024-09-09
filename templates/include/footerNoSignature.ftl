<#if user.activationCode??>
<tr>
    <td style="font-size: 9px">
        <br/>
        If you wish to unsubscribe from this email, please click
        <a href="${appUrl}unsubscribeGuest?activationCode=${user.activationCode}" style="font-size: 11px;">here</a>
    </td>
</tr>
</#if>
            </table>
        </td>
    </tr>
</table>
</body>
</html>