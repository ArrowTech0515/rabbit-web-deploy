                <tr>
                    <td>
                        <br/>
                        <#if appName??>You can </#if><a href="${appUrl}emailClickGuest?userId=${user.id?c}&name=${template}&url=${appUrl}activationLoginGuest%3FactivationCode%3D${user.activationCode}%26source%3D${template}<#if appDomain??>${appDomain}</#if>&userId=${user.id?c}" title="Login">login</a><#if appName??> to ${appName} here.</#if>
                    </td>
                </tr>
                <#if user.activationCode??>

                </#if>
            </table>
        </td>
    </tr>
</table>
</body>
</html>