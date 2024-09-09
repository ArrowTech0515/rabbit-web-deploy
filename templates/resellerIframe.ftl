<html>
<head>
<style type="text/css"> 
html {overflow: auto;} 
html, body, div, iframe {margin: 0px; padding: 0px; height: 100%; border: none;} 
iframe {display: block; width: 100%; border: none; overflow-y: auto; overflow-x: hidden;} 
</style> 
</head>
<body>
<#if domain??>
<iframe src="https://www.rabbitseo.com/privateLoginGuest?domain=${domain}&useHeader=${useHeader}&useLogo=${useLogo}" />
<#else>
<iframe src="https://www.rabbitseo.com/privateLoginGuest?activationCode=${activationCode}&useHeader=${useHeader}&useLogo=${useLogo}" />
</#if>

</body>
</html>