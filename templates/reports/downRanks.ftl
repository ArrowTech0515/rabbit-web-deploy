<#if downRanks??>
<#assign compRankslist = downRanks>
<#assign compRanksTitle = "KeywordsWithLowerRankingsThanLastMonth">
<#assign compRanksImage = "down">
<#include "compareRanksTable.ftl" />
</#if>