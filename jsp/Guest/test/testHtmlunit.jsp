<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.util.LoggerUtil" %>
<%@ page import="org.jsoup.Jsoup" %>
<%@ page import="org.jsoup.nodes.Document" %>
<%@ page import="org.jsoup.nodes.Element" %>
<%@ page import="org.jsoup.select.Elements" %>
<%@ page import="com.util.HtmlUtil" %>
<%@ page import="com.gargoylesoftware.htmlunit.WebClient" %>
<%@ page import="com.gargoylesoftware.htmlunit.NicelyResynchronizingAjaxController" %>
<%@ page import="com.gargoylesoftware.htmlunit.html.HtmlPage" %>
<%@ page import="com.gargoylesoftware.htmlunit.html.HtmlAnchor" %>
<%@ page import="java.util.List" %>
<%@ page import="com.gargoylesoftware.htmlunit.Page" %>
<%@ page import="com.gargoylesoftware.htmlunit.BrowserVersion" %>

Url:<%=request.getParameter("url")%><br/>
<%
    //                String parameter = "https://www.davar1.co.il/spotlight/%d7%9c%d7%9e%d7%94-%d7%90%d7%aa%d7%9d-%d7%97%d7%99%d7%99%d7%91%d7%99%d7%9d-%d7%9c%d7%a7%d7%a0%d7%95%d7%aa-%d7%a4%d7%95%d7%a4%d7%99%d7%9d-%d7%94%d7%91%d7%99%d7%aa%d7%94-%d7%90%d7%95-%d7%9c%d7%97%d7%a6/";
//                String parameter = "https://www.israelhayom.co.il/article/645553";
//                parameter = "https://krayot.com/archives/32644";
    String parameter = request.getParameter("url");
//    WebClient webClient = new WebClient();
//    webClient.getOptions().setJavaScriptEnabled(true);
//    webClient.getOptions().setCssEnabled(false);
//    webClient.getOptions().setUseInsecureSSL(true);
//    webClient.getOptions().setThrowExceptionOnFailingStatusCode(false);
//    webClient.getCookieManager().setCookiesEnabled(true);
//    webClient.setAjaxController(new NicelyResynchronizingAjaxController());
//// Wait time
//    webClient.waitForBackgroundJavaScript(15000);
//    webClient.setJavaScriptTimeout(10000);
//    webClient.getOptions().setThrowExceptionOnScriptError(false);
    WebClient webClient = null;
    try {
        webClient = new WebClient(BrowserVersion.FIREFOX_45);
        webClient.getOptions().setJavaScriptEnabled(true);
        webClient.getOptions().setUseInsecureSSL(true);
        webClient.getOptions().setThrowExceptionOnScriptError(false);
        webClient.getOptions().setThrowExceptionOnFailingStatusCode(false);

    } catch (Exception e) {
    }
    LoggerUtil.getTempLogger().info("url is " + parameter + "start reading now");
    HtmlPage myPage = webClient.getPage(parameter);
    LoggerUtil.getTempLogger().info("url is " + parameter + "page text is " + myPage.asText());
    LoggerUtil.getTempLogger().info("url is " + parameter + "page html is " + myPage.asXml());

    List<HtmlAnchor> anchors = myPage.getAnchors();
    Page newPage;
    for (int i = 0; i < anchors.size(); i++) {
        HtmlAnchor htmlAnchor = anchors.get(i);
        if (htmlAnchor.getHrefAttribute().startsWith("/op")) {
            newPage = htmlAnchor.click();
            %>
          New Page:  <%=newPage.getUrl()%> End
<%
        }
%>
<%=htmlAnchor.getHrefAttribute() + " - " + htmlAnchor.asText()%>
<br />
<%
    }
%>
<%=request.getParameter("showPage") != null ? myPage.asXml() : ""%>