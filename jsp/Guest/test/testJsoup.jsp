<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.util.LoggerUtil" %>
<%@ page import="org.jsoup.Jsoup" %>
<%@ page import="org.jsoup.nodes.Document" %>
<%@ page import="org.jsoup.nodes.Element" %>
<%@ page import="org.jsoup.select.Elements" %>
<%@ page import="com.util.HtmlUtil" %>

My Url:<%=request.getParameter("url")%><br/>
<%
    String parameter = request.getParameter("url");
//                parameter = "https://www.davar1.co.il/spotlight/%d7%9c%d7%9e%d7%94-%d7%90%d7%aa%d7%9d-%d7%97%d7%99%d7%99%d7%91%d7%99%d7%9d-%d7%9c%d7%a7%d7%a0%d7%95%d7%aa-%d7%a4%d7%95%d7%a4%d7%99%d7%9d-%d7%94%d7%91%d7%99%d7%aa%d7%94-%d7%90%d7%95-%d7%9c%d7%97%d7%a6/";
    if (parameter == null || parameter.equals("")) {
        parameter = "https://Kishies.com/";
//        parameter = "https://www.datili.co.il/%D7%92%D7%98-%D7%9E%D7%95%D7%91%D7%99%D7%A0%D7%92-%D7%9B%D7%9A-%D7%9E%D7%95%D7%A6%D7%90%D7%99%D7%9D-%D7%94%D7%99%D7%95%D7%9D-%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99-%D7%94%D7%95%D7%91%D7%9C%D7%95%D7%AA/";
//        parameter = "https://timeout.co.il/ppost/%D7%A1%D7%99%D7%9C%D7%99%D7%99%D7%94-%D7%93%D7%99-%D7%94%D7%9C%D7%91%D7%A9%D7%94-%D7%AA%D7%97%D7%AA%D7%95%D7%A0%D7%94-%D7%90%D7%99%D7%9B%D7%95%D7%AA%D7%99%D7%AA-%D7%90%D7%95%D7%A0%D7%9C%D7%99%D7%99/";
    }

    Document doc = null;
    if (parameter != null) {
        parameter = HtmlUtil.formatUrl(parameter);
        LoggerUtil.getTempLogger().info("url is " + parameter + " call jsoup now");
        doc = Jsoup.connect(parameter).header("Accept-Encoding", "gzip, deflate")
                .userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0")
                .ignoreHttpErrors(true)
                .maxBodySize(0)
                .timeout(600000)
                .get();
        LoggerUtil.getTempLogger().info("url is " + parameter + " got jsoup result " + doc.html());
        if (request.getParameter("hideLinks") == null) {
        Elements elementsByTag = doc.getElementsByTag("a");
%>
Elemetns size: <%=elementsByTag.size()%>
<%
            for (int i = 0; i < elementsByTag.size(); i++) {
                Element element = elementsByTag.get(i);
    %>
    <%=i + " href is . " + element.attr("href") + element.text()%><br/>
    <%
            }
        }
    }
%>
<%=request.getParameter("showPage") != null ? doc.html() : ""%>

