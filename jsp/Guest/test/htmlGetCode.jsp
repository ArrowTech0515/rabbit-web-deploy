<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.InputStreamReader" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="com.html.HtmlPageWrapper" %>
<%@ page import="com.gargoylesoftware.htmlunit.WebClient" %>
<%@ page import="com.gargoylesoftware.htmlunit.html.HtmlPage" %>
<%@ page import="com.util.LoggerUtil" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
	<meta charset="utf-8">
    Start...
<%
//    String sURL = "https://savionit.co.il/";
//    String sURL = "https://krayot.com/archives/32644";
//    String sURL = "https://krayot.mynet.co.il/good_to_know/article/r1zowvcdk";
//    String sURL = "https://www.davar1.co.il/spotlight/%d7%9c%d7%9e%d7%94-%d7%90%d7%aa%d7%9d-%d7%97%d7%99%d7%99%d7%91%d7%99%d7%9d-%d7%9c%d7%a7%d7%a0%d7%95%d7%aa-%d7%a4%d7%95%d7%a4%d7%99%d7%9d-%d7%94%d7%91%d7%99%d7%aa%d7%94-%d7%90%d7%95-%d7%9c%d7%97%d7%a6/";
//    System.out.println(sURL);
    String sURL = request.getParameter("url");
//                parameter = "https://www.davar1.co.il/spotlight/%d7%9c%d7%9e%d7%94-%d7%90%d7%aa%d7%9d-%d7%97%d7%99%d7%99%d7%91%d7%99%d7%9d-%d7%9c%d7%a7%d7%a0%d7%95%d7%aa-%d7%a4%d7%95%d7%a4%d7%99%d7%9d-%d7%94%d7%91%d7%99%d7%aa%d7%94-%d7%90%d7%95-%d7%9c%d7%97%d7%a6/";
    if (sURL == null || sURL.equals("")) {
        sURL = "https://timeout.co.il/ppost/%D7%A1%D7%99%D7%9C%D7%99%D7%99%D7%94-%D7%93%D7%99-%D7%94%D7%9C%D7%91%D7%A9%D7%94-%D7%AA%D7%97%D7%AA%D7%95%D7%A0%D7%94-%D7%90%D7%99%D7%9B%D7%95%D7%AA%D7%99%D7%AA-%D7%90%D7%95%D7%A0%D7%9C%D7%99%D7%99/";
    }

    URL url = new URL(sURL);
    LoggerUtil.getTempLogger().info("url is " + sURL + " open connection now");
    HttpURLConnection httpCon = (HttpURLConnection) url.openConnection();
    //set http request headers
//            httpCon.addRequestProperty("Host", "www.cumhuriyet.com.tr");
            httpCon.addRequestProperty("Connection", "keep-alive");
            httpCon.addRequestProperty("Cache-Control", "max-age=0");
//            httpCon.addRequestProperty("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
//            httpCon.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36");
//            httpCon.addRequestProperty("Accept-Encoding", "gzip,deflate,sdch");
    httpCon.setRequestProperty("User-Agent", "Mozilla/5.0");
    httpCon.setRequestProperty("Header Content-Type", "application/json");

            httpCon.setRequestProperty("Accept-Charset", "UTF-8");
            httpCon.setRequestProperty("charset", "UTF-8");
            HttpURLConnection.setFollowRedirects(false);
            httpCon.setInstanceFollowRedirects(false);
            httpCon.setDoOutput(true);
            httpCon.setUseCaches(true);
            httpCon.setRequestMethod("GET");
    LoggerUtil.getTempLogger().info("url is " + sURL + "start reading now");
            BufferedReader in = new BufferedReader(new InputStreamReader(httpCon.getInputStream(), "UTF-8"));
            String inputLine;
            StringBuilder a = new StringBuilder();
            while ((inputLine = in.readLine()) != null)
                a.append(inputLine);
            in.close();
            httpCon.disconnect();
    out.write(a.toString());
    LoggerUtil.getTempLogger().info("url is " + sURL + "result is " + a.toString());
//    WebClient webClient = new WebClient();
//    HtmlPage htmlPage = HtmlPageWrapper.loadContentToPage(webClient, url, a.toString());
%>
</head>
<body>
<%--<%=a != null ? a.toString() : "no content"%>--%>
<%--Start:--%>
<%--<%=htmlPage != null ? htmlPage.getAnchors().size() : "no content"%>--%>
<%--<s:property value="<%=a.toString()%>" escapeHtml="true" />--%>
</body>

</html>