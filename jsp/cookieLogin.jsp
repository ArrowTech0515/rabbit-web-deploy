<%@ page import="com.util.*" %>
<%@ page import="com.util.app.Finals" %>
<%@ page import="hbn.User" %>
<%@ page import="org.apache.log4j.Logger" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
    boolean tryLogin = false;
    Logger logger = Logger.getLogger("index");
    User user = (User) session.getAttribute(Finals.USER_HANDLE);
    logger.info("user: " + user);
    String ip = InetAddressUtil.getAddressFromRequest(request);

    Long inc = MyRedisCache.getInstance().inc("B-IP" + ip);

    if (inc != null && inc >= 1000) {
        // serve nothing
//    } else {
    } else if (false) {
        //    String ipProxy = request.getHeader("X-FORWARDED-FOR");
        logger.info("IP is " + ip + " and Server Name is " + InetAddressUtil.getServerName(request));

        if (user == null) {
            String cookieValue = CookieUtil.getCookieValue(request, Finals.LOGIN_COOKIE_NAME);

            logger.debug("cookieValue" + cookieValue);

            if (cookieValue != null) {
                tryLogin = true;
                //            response.sendRedirect("dashboardGeneric");
            }
        } else {
            //        response.sendRedirect("dashboardGeneric");
        }

        if (tryLogin) {
%>
<%
        }
    }
%>
