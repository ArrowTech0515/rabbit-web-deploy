<%@ page import="com.helpers.ExecShell" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>

<%

    String list = ExecShell.execShellCmd("aws sesv2 list-suppressed-destinations --region eu-west-1");
%>
List: <%=list%>


