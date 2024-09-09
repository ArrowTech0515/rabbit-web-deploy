<%@ page import="com.util.MyRedisCache" %>
<%@ page import="hbn.User" %>
<%@ page import="java.util.Set" %>
<%@ page import="com.util.app.Finals" %>
<%@ page import="com.util.LoggerUtil" %>
<%@ page import="redis.clients.jedis.*" %>
<%@ page import="java.time.Duration" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>
<%@ taglib prefix="sjg" uri="/struts-jquery-grid-tags" %>

<h2>Test Redis</h2>
<%
//    final JedisPoolConfig poolConfig = new JedisPoolConfig();
//    poolConfig.setMaxTotal(128);
//    poolConfig.setMaxIdle(10);
//    poolConfig.setMinIdle(1);
//    poolConfig.setTestOnBorrow(true);
//    poolConfig.setTestOnReturn(true);
//    poolConfig.setTestWhileIdle(true);
//    poolConfig.setNumTestsPerEvictionRun(3);
//    poolConfig.setBlockWhenExhausted(true);
//    JedisPool pool = new JedisPool(poolConfig, "http://localhost:6379");
//    String url = "http://new-redis-vpc.f4qcoe.ng.0001.euw1.cache.amazonaws.com:6379";
    String url = "http://localhost:6379";
//    JedisPool pool = new JedisPool(poolConfig, url);
//    Jedis client = pool.getResource();
    ConnectionPoolConfig poolConfig = new ConnectionPoolConfig();
    poolConfig.setMaxTotal(128);
    poolConfig.setMaxIdle(24);
    poolConfig.setMinIdle(0);
    poolConfig.setBlockWhenExhausted(true);
    poolConfig.setMaxWait(Duration.ofSeconds(1));
    poolConfig.setTestWhileIdle(true);
    poolConfig.setTimeBetweenEvictionRuns(Duration.ofSeconds(1));

// JedisPooled does all hard work on fetching and releasing connection to the pool
// to prevent connection starvation
    JedisPooled client = new JedisPooled(poolConfig, url);
    String key = "my-counter";
//    client.incr(key);
//    String val = client.get(key);
%>
Value is: <%=client.incr(key)%>