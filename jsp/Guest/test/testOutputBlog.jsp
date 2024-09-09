<%@ page import="com.util.WordpressUtil" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
Result:
<%
    WordpressUtil.deleteAllCategories("https://www.DailyFloridaPost.com", "admin", "9TFt 3uxb GqRa scCH SEcV Y0zj");
%>

<%=WordpressUtil.listCategories("https://www.DailyFloridaPost.com", "admin", "9TFt 3uxb GqRa scCH SEcV Y0zj")%>
<br />
</body>
</html>
