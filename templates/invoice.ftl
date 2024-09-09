<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="Content-Style-Type" content="text/css"/>
</head>
<body style="font-family: Arial;">
    <div style="border: 1px solid #000000">
    <br />
    <table style="width: 100%; height: 130px; margin: 0; padding: 0 40px;" cellpadding="0" cellspacing="0">
        <tr valign="top">
            <td align="left">
                <#if locale == 'iw'>
                    <#if payment.invoiceDate??>
                        ${payment.invoiceDate?string("dd/MM/yyyy")} ${messages('Date', locale, "true")}
                    <#else>
                        ${payment.dateCreated?string("dd/MM/yyyy")} ${messages('Date', locale, "true")}
                    </#if>
                <#else>
                    Rabbit SEO Tools
                    <br />
                    021765466
                    <br />
                    info@rabbitseo.com
                    <br />
                    10 Kehilat Kovna St.
                    <br />
                    Tel Aviv, Israel
                </#if>
            </td>
            <td align="center">
                <img height="70px" style="" src="https://www.rabbitseo.com/styles/themes/rabbitseo/logo.png"/>
            </td>
            <td align="${align}">
                    <#if locale == 'iw'>
                    SEO Tools
                    <br />
                    021765466 ${messages('BusinessId', locale, "true")}
                    <br />
                    info@rabbitseo.com
                    <br />
                    www.rabbitseo.com
                    <br />
                    ${messages('InvoiceAddress', locale, "true")}
                    <#if invoiceTaxId??>
                        <br />
                        VAT ID: ${invoiceTaxId}
                    </#if>
                <#else>
                    <#if payment.invoiceDate??>
                        ${payment.invoiceDate?string("dd/MM/yyyy")}
                    <#else>
                        ${payment.dateCreated?string("dd/MM/yyyy")}
                    </#if>
                </#if>
            </td>
        </tr>
    </table>
    <hr />
    <table style="width: 100%; height: 130px; margin: 0; padding: 0 40px;" cellpadding="0" cellspacing="0">
        <tr>
            <td align="${align}">
                ${messages('InvoiceTo', locale, "true")}
                <br />
                <#if paymentUser.billingName??>${reverse(paymentUser.billingName, locale)}<#else>${reverse(paymentUser.name, locale)}</#if>
                <#if paymentUser.cardHolderId?? && paymentUser.cardHolderId != ''>
                    <br />
                    <#if paymentUser.name == 'Wix'>
                        ${reverse(paymentUser.cardHolderId, locale)}
                    <#else>
                        ${paymentUser.cardHolderId}
                    </#if>
                </#if>
                <#if paymentUser.billingEmail??>${paymentUser.billingEmail}<#else>${paymentUser.email}</#if>
                <#if paymentUser.billingAddress??>
                    <br />
                    ${reverse(paymentUser.billingAddress, locale)}
                    <br />
                    <#if paymentUser.billingCity??>${reverse(paymentUser.billingCity, locale)}</#if>
                </#if>
            </td>
        </tr>
    </table>

    <table style="width: 100%; margin: 0; padding: 0 40px;" cellpadding="5" cellspacing="0">
        <tr>
            <td align="center" style="font-weight: bold;">
                <#if locale == 'iw'>
                ${payment.invoiceId?string("0")}
                <#if payment.amount < 0>${messages('RefundInvoiceNumber', locale, "true")}<#else>${messages('InvoiceNumber', locale, "true")}</#if>
                <#else>
                <#if payment.amount < 0>${messages('RefundInvoiceNumber', locale, "true")}<#else>${messages('InvoiceNumber', locale, "true")}</#if>
                ${payment.invoiceId?string("0")}
                </#if>
                <#if locale == 'iw'>
                    <br />
                    ${messages(invoiceType, locale, "true")}
                </#if>
                <br />
                <br />
            </td>
        </tr>
        <tr>
            <td align="center">
                <table border="1" style="width: 100%; text-align: ${align}">
                    <tr>
                    <#if locale == 'iw'>
                        <td>${messages('TotalPrice', locale, "true")}</td>
                        <td>${messages('Price', locale, "true")}</td>
                        <td>${messages('Description', locale, "true")}</td>
                    <#else>
                        <td>${messages('Description', locale, "true")}</td>
                        <td>${messages('Price', locale, "true")}</td>
                        <td>${messages('TotalPrice', locale, "true")}</td>
                    </#if>
                    </tr>
                    <tr>
                    <#if locale == 'iw'>
                        <td>${messages(payment.currency, locale, "true")} ${payment.amountBeforeVat}</td>
                        <td>${messages(payment.currency, locale, "true")} ${payment.amountBeforeVat}</td>
                        <td>
                        <#if paymentUser.name == 'Wix'>
                            ${payment.comment}
                        <#else>
                            ${messages('InvoiceSEOTools', locale, "true")}
                            <#if payment.comment??>
                            <br />
                            ${payment.comment}
                            </#if>
                        </#if>
                        </td>
                    <#else>
                        <td>
                            ${messages('InvoiceSEOTools', locale, "true")}
                            <#if payment.comment??>
                            <br />
                            ${payment.comment}
                            </#if>
                        </td>
                        <td>${messages(payment.currency, locale, "true")}${payment.amountBeforeVat}</td>
                        <td>${messages(payment.currency, locale, "true")}${payment.amountBeforeVat}</td>
                    </#if>
                    </tr>
                </table>
                <br />
            </td>
        </tr>
        <tr>
            <td align="${align}">
                <#if locale == 'iw'>
                ${messages(payment.currency, locale, "true")} ${payment.amountBeforeVat} : ${messages('TotalPrice', locale, "true")}
                <#else>
                ${messages('TotalPrice', locale, "true")} : ${messages(payment.currency, locale, "true")}${payment.amountBeforeVat}
                </#if>
                <br />
                <#if locale == 'iw'>
                <#if payment.vat == 0><#else>${messages(payment.currency, locale, "true")} ${payment.vat} : 17% ${messages('VAT', locale, "true")}</#if>
                <#else>
                <#if payment.vat == 0><#else>${messages('VAT', locale, "true")} 17% : ${messages(payment.currency, locale, "true")}${payment.vat}</#if>
                </#if>
                <br />
                <#if locale == 'iw'>
                <#if payment.vat == 0><#else>${messages(payment.currency, locale, "true")} ${payment.amount} : ${messages('TotalWithVAT', locale, "true")}</#if>
                <#else>
                <#if payment.vat == 0><#else>${messages('TotalWithVAT', locale, "true")} : ${messages(payment.currency, locale, "true")}${payment.amount}</#if>
                </#if>
            </td>
        </tr>
        <tr>
            <td align="${align}">
                <#if locale == 'iw'>${messages(payment.currency, locale, "true")} ${payment.amount} :</#if>
                <#if payment.paymentType == 'BankTransfer'>
                ${messages('TotalWithBankTransfer', locale, "true")}
                    <br />
                    Bank Hapoalim 12
                    <br />
                    Branch 773
                    <br />
                    Account number 278781
                <#elseif payment.paymentType == 'Paypal'>
                ${messages('TotalWithPaypal', locale, "true")}
                <#else>
                ${messages('TotalWithCreditCard', locale, "true")}
                </#if>
                <#if locale != 'iw'> : ${messages(payment.currency, locale, "true")}${payment.amount}</#if>
            </td>
        </tr>
    </table>
    </div>
</body>
</html>
<#include "include/openMail.ftl"/>