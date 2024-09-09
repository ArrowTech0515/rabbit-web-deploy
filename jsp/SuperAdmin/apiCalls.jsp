<%@ page import="com.util.MyRedisCache" %>
<%@ page import="hbn.User" %>
<%@ page import="java.util.Set" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>
<%@ taglib prefix="sjg" uri="/struts-jquery-grid-tags" %>

<h2>API Calls</h2>
<%
    User user = (User) request.getSession().getAttribute("User");
    if (user != null && user.getRole().getName().equals("SuperAdmin")) {
        String myKeys = request.getParameter("userResearch*");

        if (myKeys != null && !myKeys.equals("")) {
            Set<String> keys = MyRedisCache.getInstance().keys(myKeys);

            if (keys != null && keys.size() > 0) {
                for (String key : keys) {
%>
<%=key.replace("userResearch", "")%> - <%= MyRedisCache.getInstance().get(key)%>
<br/>
<%
                }
            }
        }
    }
%>