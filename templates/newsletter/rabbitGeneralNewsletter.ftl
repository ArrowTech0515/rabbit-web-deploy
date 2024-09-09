<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
 
  <title>${appName} Website - Traffic Booster - Drive traffic to your site & get higher ranks</title>
 <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; color: #202939">
	<table style="max-width: 600px; width: 100%; margin: 0 auto; text-align: left; border: none;" border="0" cellspacing="0" cellpadding="0">
		<tbody>
			<tr>
				<td  style="background: #333333; padding:16px; text-align: center;"><img src="https://dlnil54eooeso.cloudfront.net/assets/newsletter/images/emailtemplate/rabbitseo/logo.png" alt="" title=""/></td> 
			</tr>
		 
			<tr style="background:#333333;  min-height: 148px">
				<td colspan="5">
					<p style="margin: 0; padding:20px 15px; text-align: center; font-size: 24px; color: #FFE299;font-weight: bold; ">
						${emailSubject}
					</p>
				</td>
			</tr>
			<tr>
				<td colspan="5"  style="background: #ffffff; padding:13px 15px 16px 13px;">
					<p style="margin: 0; font-size: 14px; color: #202939">
						<#if userName??>
							Dear <b>${userName}
						</b>
						</#if>
					</p>
				</td>
			</tr>
			<tr>
				<td colspan="5"  style="background: #fff; padding:0px 35px 0px 33px;">
					<#if user?? && user.activationCode??>
						<a href="${appUrl}emailClickGuest?subscriberId=<#if subscriberId??>${subscriberId?c}</#if>&name=${template}&url=${appUrl}activationLoginGuest%3FactivationCode%3D${user.activationCode}%26source%3D${template}${appDomain.name}&userId=${user.id?c}" title="Login"
						   style="background: #FBBC05; padding: 16px 40px;  border-radius: 8px; display:block; text-decoration: none; color: #202939; text-align: center; margin-bottom: 20px;"><b>Open ${appName}</b></a>
					<#else>
						<a href="${appUrl}emailClickGuest?name=${template}&url=${url}&subscriberId=${subscriberId?c}" title="Login"
						   style="background: #FBBC05; padding: 16px 40px;  border-radius: 8px; display:block; text-decoration: none; color: #202939; text-align: center; margin-bottom: 20px;"><b>Open ${appName}</b></a>
					</#if>
			</tr>
			<tr>
				<td colspan="5"  style="background: #ffffff; padding:13px 35px 20px 33px;">
					 <div style="background: #EEF2F6; padding:20px;border-radius: 8px;">
						 ${content}
					 </div>
				</td>
			</tr>
			<tr>
				<td colspan="5" style="background: #fff; padding:0px 35px 0px 33px;">
					<#if user?? && user.activationCode??>
						<a href="${appUrl}emailClickGuest?subscriberId=<#if subscriberId??>${subscriberId?c}</#if>&name=${template}&url=${appUrl}activationLoginGuest%3FactivationCode%3D${user.activationCode}%26source%3D${template}${appDomain.name}&userId=${user.id?c}"
						   title="Login"
						   style="background: #FBBC05; font-weight: bold; padding: 16px 40px;  border-radius: 8px; display:block; text-decoration: none; color: #202939; text-align: center; margin-bottom: 20px;"><b>
								                        Open ${appName}
								<#--                        Publish your FREE Blog Post with Rabbit SEO-->
<#--								Claim your FREE Blog Post Now-->
							</b>
						</a>
					<#else>
						<a href="${appUrl}emailClickGuest?name=${template}&url=${url}&subscriberId=${subscriberId?c}"
						   title="Login"
						   style="background: #FBBC05; font-weight: bold; font-size: 18px; padding: 16px 40px;  border-radius: 8px; display:block; text-decoration: none; color: #202939; text-align: center; margin-bottom: 20px;"><b>
								                        Open ${appName}
								<#--                        Publish your FREE Blog Post with Rabbit SEO-->
<#--								Claim your FREE Blog Post Now-->
							</b>
						</a>
					</#if>
					<p style="margin: 0; font-size: 14px; margin-bottom: 15px; color: #202939">
						Stay tuned for more insights into the ever-evolving landscape of digital marketing!
					</p>
					<p style="margin: 0; font-size: 14px; margin-bottom: 15px; color: #202939">
						Happy Optimizing & Link Building!
					</p>
					<p style="margin: 0; font-size: 14px;  color: #202939">
						Best regards, 
					</p>
					<p style="margin: 0; font-size: 14px;  color: #202939">
						${appName} Team
					</p>
					<p style="margin: 0; font-size: 14px;  color: #202939">
					</p>
				</td>
			</tr>
			<tr>
				<td colspan="5"  style="background: #ffffff; padding:13px 35px 20px 33px;">
				</td>
			</tr>
			<tr>
				<td colspan="5" style="background: #ffffff; padding:20px; text-align: center;">
					<p style="margin: 0; font-size: 14px; margin-bottom:5px; color: #202939">This email is being sent to you
						because you are a member of ${appName}</p>
					<p style="margin: 0; font-size: 14px; color: #202939">If you wish to unsubscribe click <a
								style="color: #202939; text-decoration: none;"
								href="${appUrl}unsubscribeRabbitGuest?name=${template}&email=${userEmail}"> here</a></p>
				</td>
			</tr>
		</tbody>
	</table>
	<#include "../include/openMail.ftl"/>
</body>
</html>