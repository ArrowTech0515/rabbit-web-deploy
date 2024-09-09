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
    String parameter = request.getParameter("url");
    if (parameter == null || parameter.equals("")) {
        parameter = "https://CurrentBuzzPost.com/wp-json/wp/v2/categories?per_page=50";
    }

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
%>
Html:<%=myPage.asXml()%>