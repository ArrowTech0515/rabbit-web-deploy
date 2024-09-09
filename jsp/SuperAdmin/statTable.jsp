<%@ page import="com.util.app.StaticMembersUtil" %>
<%@ page import="com.util.DateUtil" %>
<%@ page import="com.util.MyRedisCache" %>
<%@ page import="java.util.Set" %>
<%@ page import="java.util.Iterator" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>
<%@ taglib prefix="sjg" uri="/struts-jquery-grid-tags" %>

<div class="bold">
<s:property value="#reportVal" />
</div>
<br />
<table>
    <s:iterator value="reportCounters">
    <s:if test="%{key.contains(#reportVal + ' - ')}">
        <tr><td><s:property value="%{key.replace(#reportVal + ' - ','').replace('Counters','').replace('Redis','')}" /> - <s:property value="value" /></td></tr>
    </s:if><s:elseif test="%{!key.contains(' - ') && #reportVal == 'Other'}">
        <tr><td><s:property value="%{key.replace(#reportVal + ' - ','').replace('Counters','').replace('Redis','')}" /> - <s:property value="value" /></td></tr>
    </s:elseif><s:else>
    </s:else>
    </s:iterator>
</table>
<br />
<br />
<s:iterator value="reportDetails">
    <s:if test="%{key.contains(#reportVal + ' - ')}">
        <div class="bold"><s:property value="key" /></div>
        <table>
        <s:iterator value="value">
        <tr>
            <td><s:property value="key" /> </td>
            <td><s:property value="value" /> </td>
        </tr>
        </s:iterator>
        </table>
    </s:if>
</s:iterator>