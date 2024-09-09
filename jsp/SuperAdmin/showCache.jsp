<%@ page import="com.util.app.StaticMembersUtil" %>
<%@ page import="com.util.app.KeywordUtil" %>
<%@ page import="com.util.MyRedisCache" %>
<%@ page import="java.util.Set" %>
<%@ page import="java.util.Iterator" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>
<%@ taglib prefix="sjg" uri="/struts-jquery-grid-tags" %>
<%
    Set<String> keys = MyRedisCache.getInstance().keys("*");
    if (keys != null && keys.size() > 0) {
%>
    Total keys size: <%=keys.size()%>
    <br />
<%
    int countKeywords = 0;
    int countUsers = 0;
    int countWebsites = 0;
    int countUrls = 0;
    int countUrlDomains = 0;
    int countProjects = 0;
    int countOthers = 0;

    for (String key : keys) {
        if (key.startsWith("hbn.Keyword")) {
            countKeywords++;
        } else if (key.startsWith("hbn.User") || key.startsWith("ScanCounter")) {
            countUsers++;
        } else if (key.startsWith("hbn.Website")) {
            countWebsites++;
        } else if (key.startsWith("Url")) {
            countUrls++;
        } else if (key.startsWith("hbn.UrlDomain")) {
            countUrlDomains++;
        } else if (key.startsWith("hbn.Project")) {
            countProjects++;
        } else {
            countOthers++;
        }
            if (!key.startsWith("Url") && !key.startsWith("ScanCounter")) {
                %>
                    <%=key%>
                    <br />
                <%
            }
        }
%>
<br />
<br />
Categories:
<br />
Keywords: <%=countKeywords%> <br />
Users: <%=countUsers%> <br />
Websites: <%=countWebsites%> <br />
Urls: <%=countUrls%> <br />
UrlDomains: <%=countUrlDomains%> <br />
Projects: <%=countProjects%> <br />
Others: <%=countOthers%> <br />
<%
    }

%>

