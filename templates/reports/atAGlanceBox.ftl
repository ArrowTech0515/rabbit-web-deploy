<div style="font-size: 15px; margin: 0 5px;">${messages(statusMap.title locale, "true")}</div>
<#if dir="rtl">
    <table width="100%">
        <tr valign="top">
            <#if statusChartUrl??>
            <td width="50%">
                <img src="${statusChartUrl}" />
            </td>
            </#if>
            <td>
               <table width="100%" style="font-size: 12px;">
                    <tr valign="top">
                        <td>
                            ${messages('OfKeywordsAreInTheTop5Results', locale, "true")}
                        </td>
                        <td>
                            <div class="percentageBox"><#if statusMap.top5 == -1>-<#else>${statusMap.top5}%</#if></div>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td>
                            ${messages('OfKeywordsAreInTheTop10Results', locale, "true")}
                        </td>
                        <td>
                            <div class="percentageBox"><#if statusMap.top10 == -1>-<#else>${statusMap.top10}%</#if></div>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td>
                            ${messages('OfKeywordsAreInTheTop20Results', locale, "true")}
                        </td>
                        <td>
                            <div class="percentageBox"><#if statusMap.top20 == -1>-<#else>${statusMap.top20}%</#if></div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
<#else>
    <table>
        <tr>
            <td>
                <table>
        <tr>
            <td>
                <div class="percentageBox"><#if statusMap.top5 == -1>-<#else>${statusMap.top5}%</#if></div>
            </td>
            <td>
                ${messages('OfKeywordsAreInTheTop5Results', locale, "true")}
            </td>
        </tr>
        <tr>
            <td>
                <div class="percentageBox"><#if statusMap.top10 == -1>-<#else>${statusMap.top10}%</#if></div>
            </td>
            <td>
                ${messages('OfKeywordsAreInTheTop10Results', locale, "true")}
            </td>
        </tr>
        <tr>
            <td>
                <div class="percentageBox"><#if statusMap.top20 == -1>-<#else>${statusMap.top20}%</#if></div>
            </td>
            <td>
                ${messages('OfKeywordsAreInTheTop20Results', locale, "true")}
            </td>
        </tr>
    </table>
            </td>
            <td>
                <#if statusChartUrl??>
                    <img src="${statusChartUrl}" />
                </#if>
            </td>
        </tr>
    </table>
</#if>