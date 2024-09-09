<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.util.LoggerUtil" %>
<%@ page import="org.jsoup.Jsoup" %>
<%@ page import="org.jsoup.nodes.Document" %>
<%@ page import="org.jsoup.nodes.Element" %>
<%@ page import="org.jsoup.select.Elements" %>
<%@ page import="com.util.HtmlUtil" %>
<%@ page import="net.sf.json.JSONObject" %>
<%@ page import="com.util.PostUtil" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.InputStreamReader" %>

<%
    JSONObject json = new JSONObject();
    json.put("TerminalNumber", "0963222014");

    json.put("Password", "0963222014");
//    json.put("TerminalNumber", "0882016016");
//    json.put("Password", "Z0882016016");
    json.put("CardNumber", "4557430400066161");
    json.put("CVV", "124");
    json.put("ExpDate_MMYY", "0421");
    json.put("TransactionSum", "10.25");
    json.put("NumberOfPayments", "1");
    json.put("TransactionType", "01"); // 53 for refund
    json.put("CurrencyType", "NIS"); // or USD or EUR
    json.put("CreditType", "1"); // or 3
    
//    json.put("FirstPaymentSum", 1);
//    String result = PostUtil.postGenericConnection("https://private-anon-ba9e884c0c-zcreditws.apiary-mock.com/ZCreditWS/api/Transaction/CommitFullTransaction", json.toString());
//    String result = PostUtil.postGenericConnection("https://private-anon-ba9e884c0c-zcreditws.apiary-proxy.com/ZCreditWS/api/Transaction/CommitFullTransaction", json.toString());
    String urlRequest = "https://pci.zcredit.co.il/ZCreditWS/api/Transaction/CommitFullTransaction";
    String urlParams = json.toString();
//    String result = PostUtil.postGenericConnection(urlRequest, urlParams);
    URL url = new URL(urlRequest);
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    if (urlParams != null) {
        conn.setRequestMethod("POST");
    }
    conn.setRequestProperty("Content-Type", "application/json; utf-8");
    conn.setRequestProperty("Accept", "application/json");
    conn.setRequestProperty("Accept-Charset", "UTF-8");
    conn.setRequestProperty("charset", "UTF-8");
    conn.setDoOutput(true);

    if (urlParams != null) {
        conn.getOutputStream().write(urlParams.getBytes("UTF-8"));
    }
    int responseCode = conn.getResponseCode();
    BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    String inputLine;
    StringBuffer result = new StringBuffer();

    while ((inputLine = in.readLine()) != null) {
        result.append(inputLine);
    }
    in.close();
//    JSONObject jsonObject = JSONObject.fromObject(result);
%>
<%=result.toString()%>
