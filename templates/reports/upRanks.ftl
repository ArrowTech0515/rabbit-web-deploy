<#if upRanks??>
<#assign compRankslist = upRanks>
<#assign compRanksTitle = "KeywordsWithHigherRankingsThanLastMonth">
<#assign compRanksImage = "up">
<#include "compareRanksTable.ftl" />
</#if>