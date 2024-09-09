<%@ page import="com.util.app.StaticMembersUtil" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.io.InputStream" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.util.Properties" %>
<%@ page import="java.io.File" %>
<%@ page import="org.springframework.core.io.ClassPathResource" %>
<%@ page import="com.helpers.ExecShell" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="net.sf.json.JSONObject" %>
<%@ page import="net.sf.json.JSONArray" %>
<%@ page import="com.util.*" %>
<%@ page import="redis.clients.jedis.Jedis" %>
<%@ page import="redis.clients.jedis.ConnectionPoolConfig" %>
<%@ page import="java.time.Duration" %>
<%@ page import="redis.clients.jedis.JedisPooled" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>

Now is: <%= DateUtil.getZTimezoneDate(new Date()) %>
<br />
10 Minutes ago: <%= DateUtil.getZTimezoneDate(DateUtil.getMinutesAgo(10)) %>
<br />
SSH Command: <%= "aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization  --period 60 --statistics Average --dimensions Name=InstanceId,Value=" + StaticMembersUtil.instanceId + " --start-time " + DateUtil.getZTimezoneDate(DateUtil.getMinutesAgo(10)) + " --end-time " + DateUtil.getZTimezoneDate(new Date()) + " --region eu-west-1" %>
<br />
Shabbat Start: <%= StaticMembersUtil.shabbatStart %>
<br />
Hours until shabbat: <%= DateUtil.countHoursUntilShabbat() %>
<br />
Now in 12 Hours before shabbat: <%= DateUtil.countHoursUntilShabbat() < 12 %>
<br />
Now in 5 Hours before shabbat: <%= DateUtil.countHoursUntilShabbat() < 5 %>
<br />
Path: <%= request.getContextPath() %>
<br />
URI: <%= request.getRequestURI() %>
<br />
URL: <%= request.getRequestURL() %>
<br />
Domain: <%= HtmlUtil.getMinTopDomain(request.getRequestURL().toString()) %>
<br />
<%=RequestSessionUtil.getParameters(request)%>
<br />
<%=RequestSessionUtil.requestParamsToJSON(request)%>
<br />
<%--<%=RequestSessionUtil.getHeaders(request)%>--%>
<br />
<%--<%=RequestSessionUtil.getSessionVals(session)%>--%>
<br />
<%--<%=request.getRequestURI()%>--%>

<%--<%--%>
<%--    String propFile = StaticMembersUtil.isDev() ? System.getProperty("user.dir") + "/../webapps/ROOT/WEB-INF/build_info.properties" :--%>
<%--            StaticMembersUtil.ROOT_PATH + "WEB-INF/build_info.properties";--%>
<%--    LoggerUtil.getNewLogger().info("################loading prop file " + propFile);--%>
<%--    InputStream input = new FileInputStream(propFile);--%>
<%--    LoggerUtil.getNewLogger().info("################loaded prop file");--%>
<%--    Properties prop = new Properties();--%>
<%--    prop.load(input);--%>
<%--    StaticMembersUtil.buildVersion = prop.getProperty("build.version");--%>

<%--//    ExecShell.execShellCmd("sudo rm -rf /opt/tomcat/webapps/*; cp /home/ubuntu/ROOT.war /opt/tomcat/webapps/ROOT.war; sudo service tomcat restart;");--%>
<%--    String str = ExecShell.execShellCmd("aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization  --period 60 --statistics Average --dimensions Name=InstanceId,Value=" + StaticMembersUtil.instanceId + " --start-time " + DateUtil.getZTimezoneDate(DateUtil.getMinutesAgo(10)) + " --end-time " + DateUtil.getZTimezoneDate(new Date()) + " --region eu-west-1");--%>
<%--    JSONObject json = JSONObject.fromObject(str);--%>
<%--    JSONArray datapoints = json.getJSONArray("Datapoints");--%>
<%--    double sum = 0;--%>
<%--    double avg = 0;--%>
<%--    for (int i = 0; i < datapoints.size(); i++) {--%>
<%--        sum += ((JSONObject) datapoints.get(i)).getDouble("Average");--%>
<%--    }--%>
<%--    avg = sum / datapoints.size();--%>
<%--%>--%>
<%--Average CPU : <%=avg%>--%>
<%--<br />--%>
<%--Datapoints: <%=str%>--%>
<br />
Let's try 3
<br />
StaticMembersUtil.buildVersion: <%=StaticMembersUtil.buildVersion%>
<%
//    Jedis client = new Jedis("http://rabbit-redis.f4qcoe.ng.0001.euw1.cache.amazonaws.com:6379");
    ConnectionPoolConfig poolConfig = new ConnectionPoolConfig();
    poolConfig.setMaxTotal(1);
    poolConfig.setMaxIdle(1);
    poolConfig.setMinIdle(0);
    poolConfig.setBlockWhenExhausted(true);
    poolConfig.setMaxWait(Duration.ofSeconds(1));
    poolConfig.setTestWhileIdle(true);
    poolConfig.setTimeBetweenEvictionRuns(Duration.ofSeconds(1));
    JedisPooled client = new JedisPooled(poolConfig, "http://rabbit-redis.f4qcoe.ng.0001.euw1.cache.amazonaws.com:6379");
    long inc = 0;
    for (int i = 0; i < 400; i++) {
        inc = client.incrBy("key", 1);
    }

    MyRedisCache.getInstance().putString("test", "testVal", 10);
%>
Val: <%=MyRedisCache.getInstance().get("test")%>
Inc: <%=inc%>
<%--<br /><strong>New WP1 Cats CurrentBuzzPost</strong>:<%=PostUtil.wordpressPostConnection("https://www.currentbuzzpost.com/wp-json/wp/v2/categories?per_page=50", null, null, null)%>--%>
<%--<br />WP2 Cats reportersinsight:<%=PostUtil.wordpressPostConnection("https://www.reportersinsight.com/wp-json/wp/v2/categories?per_page=50", null, null, null)%>--%>
<%--&lt;%&ndash;<br />https://Kishies.com:<%=HtmlUtil.getPageDocument("https://Kishies.com").html()%>&ndash;%&gt;--%>
<%--<br />WP3 Cats https://www.kishies.com:<%=PostUtil.wordpressPostConnection("https://www.kishies.com/wp-json/wp/v2/categories?per_page=50", null, null, null)%>--%>
Hello5:<br>
<%
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("grant_type", "refresh_token");
    jsonObject.put("client_id", "33fc466f-6978-4e1c-ada2-2a2c1a99d9ee");
    jsonObject.put("client_secret", "a9a9ec0f-f546-4d3f-8068-b44263bad4cb");
    jsonObject.put("refresh_token", "OAUTH2.eyJraWQiOiJkZ0x3cjNRMCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjliZGNmY2YyLTgzZmMtNGM4My04ZmI5LTViZTNhMmMyMDRhYVwifSIsImlhdCI6MTcyMjM3NDM4NCwiZXhwIjoxNzg1NDQ2Mzg0fQ.HENQJYm9iYEeGHAIzl0zfcgL5kn4XC3enBwazUbrZVM");
    String result = HtmlUtil.sendPostRequest2Tries("https://www.wixapis.com/oauth/access", jsonObject.toString());
    String result2 = null;
    String token = null;

    if (result != null && result.length() > 0 && result.contains("access_token")) {
        JSONObject json = JSONObject.fromObject(result);
        token = json.get("access_token").toString();
        jsonObject = new JSONObject();
        JSONObject json2 = new JSONObject();
        JSONObject json3 = new JSONObject();
//        String token = "OAUTH2.eyJraWQiOiJLaUp3NXZpeSIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiYXBwSWRcIjpcImJkZjY4NzI5LTljZmYtNGFjNy05OGM5LTg1MjUyYTEzNmE5YVwiLFwiaW5zdGFuY2VJZFwiOlwiYjFkZDNlNDEtZmY1MC00ZjNiLTk1MTYtMWQ1YjM1ZTIwMDdjXCIsXCJzY29wZVwiOltcIlNJVEVfU0VUVElOR1MuVklFV1wiLFwiQVVUSE9SSVpBVElPTi5JU19QRVJNSVRURURfQllfQVBQX0lOU1RBTkNFXCIsXCJXSVhfREVWRUxPUEVSUy5HRVRfU0lURV9PV05FUlwiLFwiV0lYX0RFVkVMT1BFUlMuTUVURVJFRF9CSUxMSU5HX0NIQVJHRVNfUkVBRFwiLFwiQVVUT01BVElPTlMuUkVQT1JUX0VWRU5UXCIsXCJXSVhfREVWRUxPUEVSUy5HRVRfRURJVE9SX0RFRVBfTElOS1wiLFwiQVBQUy5NQU5BR0VfRU1CRURERURfU0NSSVBUXCIsXCJXSVhfREVWRUxPUEVSUy5TRU5EX0JJX0VWRU5UU1wiLFwiYXBwLXNldHRpbmdzLm1hbmFnZVwiLFwiV0lYX0RFVkVMT1BFUlMuQVBQX1BVUkNIQVNFX0hJU1RPUllcIixcIlNDT1BFX1NIQVJFX1VSTC5NQU5BR0VcIixcIkFVVE9NQVRJT05TLkNBTkNFTF9FVkVOVFwiLFwiV0lYX0RFVkVMT1BFUlMuQ1JFQVRFX0NIRUNLT1VUXCIsXCJXSVhfREVWRUxPUEVSUy5NQU5BR0VfQVBQX0lOU1RBTkNFXCIsXCJERVZfQ0VOVEVSLlNJVEVfUEFZTUVOVF9NRVRIT0RcIixcIlRPS0VOX0NSRUFUT1IuVE9LRU5fQ1JFQVRFXCJdLFwiZXh0cmFBdHRyaWJ1dGVzXCI6e319IiwiaWF0IjoxNzIwNjM1OTQ5LCJleHAiOjE3MjA2MzYyNDl9.ROA4I7JVvAc69cpI-6XLbOLXhARzsuNzUYgFwp4GEKXoDzTbKUYewSdzpRGA6Y7gyJ2nWvj9a98i-RO_9R0RRk3o5KCs0x_eBmWDTr5UNW5xY_pnL1lkgTrSf83tc2-dtHDZslL1bJalAwy-z4ajl1egp9XdbQ1S9-VfMCvmoXTZDalkYwVSXsJjUoiBhFDLqlR-Us_S_cjKFuoarw4reQaP_Epyk_SD8WgPoh0EEdvKcvlUulT3fO_WH4RucRsGax3v8uNS57FutyGWiXgRk9PJ9esRV0FMhRcgtMkaGKoQ2DVcpUETK1D6p7lWSRCqeFfg6L__jtEbQFZAqO7Tfw";
        json3.put("UserId", "123455");
        json2.put("parameters", json3);
        jsonObject.put("properties", json2);

        result2 = HtmlUtil.sendPostRequestPayload("https://www.wixapis.com/apps/v1/scripts", jsonObject.toString(), token);

    }
%>
Result:<%=result%>
<br />
<br />
<br />
Token:<%=token%>
<br />
<br />
<br />
Result2:<%=result2%>
<br />
