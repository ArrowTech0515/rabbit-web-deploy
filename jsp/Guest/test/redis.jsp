<%@ page import="com.util.MyRedisCache" %>
<%@ page import="hbn.User" %>
<%@ page import="java.util.Set" %>
<%@ page import="com.util.app.Finals" %>
<%@ page import="com.util.LoggerUtil" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>
<%@ taglib prefix="sjg" uri="/struts-jquery-grid-tags" %>

<h2>Redis</h2>
<%
    User user = (User) request.getSession().getAttribute("User");
    if (user != null && user.getRole().getName().equals("SuperAdmin")) {
//    if (user != null && user.getRole().getName().equals("SuperAdmin") || true) {
        String myKey = request.getParameter("myKey");
        String myValue = request.getParameter("myValue");
        String myKeys = request.getParameter("myKeys");
        String delKey = request.getParameter("delKey");
        if (myKey != null && !myKey.equals("")) {
            if (myValue != null && !myValue.equals("")) {
                MyRedisCache.getInstance().putString(myKey, myValue, Finals.EXPIRY_ONE_MONTH);
            }
%>
<%=myKey%> - <%=MyRedisCache.getInstance().get(myKey)%> - <a href="<%=request.getServletPath()%>?delKey=<%=myKey%>">Delete</a>
<%
} else if (myKeys != null && !myKeys.equals("")) {
    Set<String> keys = MyRedisCache.getInstance().keys(myKeys);

    if (keys != null && keys.size() > 0) {
        for (String key : keys) {
            LoggerUtil.getBlogLogger().info("myKeys curr " + key);
%>
<%--<%=key%> - <%= MyRedisCache.getInstance().get(key)%> - <a href="<%=request.getServletPath()%>?delKey=<%=key%>">Delete</a>--%>
<%=key%> - <%= MyRedisCache.getInstance().getInt(key)%> - <a href="<%=request.getServletPath()%>?delKey=<%=key%>">Delete</a>
<br/>
<%
        }
    }
} else if (delKey != null) {
    Long del = MyRedisCache.getInstance().del(delKey);
%>
<%=del%> keys deleted.
<%
    }
%>
<form action="<%=request.getServletPath()%>">
    Key: <input name="myKey">
    <br/>
    Value: <input name="myValue">
    <br/>
    Key Pattern: <input name="myKeys">
    <br/>
    <input type="submit">
</form>
<%
    }
%>