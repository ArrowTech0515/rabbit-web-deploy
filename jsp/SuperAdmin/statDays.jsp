<%@ page import="com.util.MyRedisCache" %>
<%@ page import="java.util.Set" %>
<%@ page import="java.util.TreeSet" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>
<%@ taglib prefix="sjg" uri="/struts-jquery-grid-tags" %>
<%
    String pattern;
    Set<String> myKeys;
    TreeSet<String> myTreeSet;
%>

<table>
    <tr valign="top">
        <% for (int i = 1; i <= 8; i++) {
        %>
        <td>
            Day <%=i%>
            <table>
                <%
                    pattern = "stat-" + i + "-";
                    myKeys = MyRedisCache.getInstance().keys(pattern + "*");
                    myTreeSet = new TreeSet<String>();
                    if (myKeys != null && myKeys.size() > 0) {
                        myTreeSet.addAll(myKeys);
                    }
                    for (String curr : myTreeSet) {
//                        if (DateUtil.isTodayDay(Calendar.THURSDAY) || DateUtil.isTodayDay(Calendar.SATURDAY)) {
                %>
                <tr>
                    <td>
                        <% if (curr.contains("Charge") || curr.contains("Upgrade") || curr.contains("Income")) { %><b><%}%>
                            <%=curr.replaceAll(pattern, "")%>
                    </td>
                    <td>
                        <%=MyRedisCache.getInstance().get(curr)%>
                            <% if (curr.contains("Charge") || curr.contains("Upgrade") || curr.contains("Income")) { %></b><%}%>
                    </td>
                </tr>
                <%
                        //                        }
                    }
                %>
            </table>
        </td>
        <%
            }
        %>
    </tr>
</table>