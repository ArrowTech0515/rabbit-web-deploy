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
 
  <title>Rabbit SEO Website - Traffic Booster - Drive traffic to your site & get higher ranks</title>
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
		<tbody style="background: #F8FAFC;">
			<tr>
				<td  style="background: #333333; padding:16px;  "><img src="https://dlnil54eooeso.cloudfront.net/assets/newsletter/images/emailtemplate/rabbitseo/logo.png" alt="" title=""/></td> 
			</tr>
		 
			<tr>
				<td colspan="5"> 
					
				</td>
			</tr>
	 
		 
			<tr>
				<td colspan="5"  style=" padding:30px 16px;">
					<div  style=" padding:16px; background: #ffffff; border-radius: 8px;">
						<p style="margin: 0; font-size: 14px; color: #202939">Hello ${user.firstName},</p>
						<h3 style="color: #202939; font-size: 24px; margin:8px 0px 16px 0px; ">Your Blog Post is Now Live!</h3>
						<div style="padding: 24px; background: #333333;border-radius: 8px;">
							<p style="margin: 0; font-size: 14px; color: #CDD5DF">Blog Post Link</p>
							<p style="margin: 0; margin-bottom: 15px; font-size: 14px; color: #FFFFFF !important;">
								<a href="${appUrl}emailClickGuest?subscriberId=<#if subscriberId??>${subscriberId?c}</#if>&name=${template}&${template}${user.appDomainName}&userId=${user.id?c}&url=${link.pageUrl}" target="_blank" style="color: #FFFFFF !important;">${link.pageUrl}</a>
							</p>
							<p style="margin: 0; font-size: 14px; color: #CDD5DF">Blog Post Title</p>
							<p style="margin: 0; margin-bottom: 15px; font-size: 14px; color: #FFFFFF">${link.pageTitle}</p>
							<p style="margin: 0; font-size: 14px; color: #CDD5DF">Link Type</p>
							<p style="margin: 0; margin-bottom: 15px; font-size: 14px; color: #FFFFFF">Exclusive Blog Post</p>
							<p style="margin: 0; font-size: 14px; color: #CDD5DF">Keyword</p>
							<p style="margin: 0; margin-bottom: 15px; font-size: 14px; color: #FFFFFF">${link.keywordName}</p>
							<p style="margin: 0; font-size: 14px; color: #CDD5DF">Landing Page</p>
							<p style="margin: 0; margin-bottom: 15px; font-size: 14px; color: #FFFFFF">
								<a href="${appUrl}emailClickGuest?subscriberId=<#if subscriberId??>${subscriberId?c}</#if>&name=${template}&${template}${user.appDomainName}&userId=${user.id?c}&url=${link.href}" target="_blank" style="color: #FFFFFF !important;">${link.href}</a>
							</p>
<#--							<p style="margin: 0; font-size: 14px; color: #CDD5DF">Language</p>-->
<#--							<p style="margin: 0; margin-bottom: 15px; font-size: 14px; color: #FFFFFF">${link.language}</p>-->
							<p style="margin: 0; font-size: 14px; color: #CDD5DF">Publish Date</p>
							<p style="margin: 0; margin-bottom: 15px; font-size: 14px; color: #FFFFFF">${link.dateCreated?date}</p>
							<p style="margin: 0; margin-bottom: 15px; font-size: 15px; color: #FFFFFF">You can change the content and image in Rabbit SEO using the Modify button</p>
<#--							<p style="margin: 0; font-size: 14px; color: #CDD5DF">Add Company Details</p>-->
<#--							<p style="margin: 0; margin-bottom: 15px; font-size: 14px; color: #FFFFFF">${link.addUserDetails}</p>-->
							 
							<a href="${appUrl}emailClickGuest?subscriberId=<#if subscriberId??>${subscriberId?c}</#if>&name=${template}&url=${appUrl}activationLoginGuest%3FactivationCode%3D${user.activationCode}%26source%3D${template}${user.appDomainName}&userId=${user.id?c}" target="_blank" style="background: #FBBC05; padding: 16px 40px;  border-radius: 8px; display:block; text-decoration: none; color: #0c0c0c; text-align: center; margin-top: 20px;">Open Rabbit SEO</a>
						</div> 
						<p style="margin: 0; margin-top: 16px; margin-bottom: 16px; font-size: 14px; color: #202939">You have the <b>${user.userPackage.name}</b>, in which you have <b>${user.linksRequestMax} links points per month</b>.
							<#if user.linksRequestMax &gt; 0>
							This month you have used ${user.linksRequestUsed} links points so far
							</#if>
							(<b>one article is equivalent to 4 links points</b>).
						</p>
						<p style="margin: 0;   font-size: 14px; color: #202939">Blog Posts links can help improve your website's visibility, authority, backlink profile, and anchor text diversity, all of which can contribute to improved search engine rankings and SEO.Share your Blog Post - Engage with your audience & Establish social proof and enhance credibility</p>

						<#if user.lastPaymentDate??>
						<#else>
							<#if user.appDomain.deleteArticleFreeUsers?? && user.appDomain.deleteArticleFreeUsers>
								<br /><br />
								<b>Please Note</b>: In order to
												  avoid spammers who create multiple
												  accounts, this blog post will be live for <b>just a while</b> - then will be deleted
								(unless you are a premium user).
								Sorry and thanks for understanding.
							</#if>
						</#if>

					</div>
					
				</td>
			</tr>
		 
<#--			<tr>-->
<#--				<td colspan="5"  style="background: #333333; padding:15px; text-align: center;">-->
<#--					<p style="margin: 0; font-size: 14px; margin-bottom:5px; color: #ffffff">This email is being sent to you because you are a member of RabbitSEO</p>-->
<#--					<p style="margin: 0; font-size: 14px; color: #ffffff">If you do not wish to receive messages like this in the future, please <a href="#" style="color: #ffffff; text-decoration: none;">click here</a></p>-->
<#--					 -->
<#--				</td>-->
<#--			</tr> -->
		</tbody>
	</table>
	<#include "include/openMail.ftl"/>
</body>
</html>