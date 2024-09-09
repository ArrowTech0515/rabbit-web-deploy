$(document).ready(function(){ 
    $( "body" ).delegate( ".login_icon", "click", function() { 
        $(".login_dropdown").toggleClass("activeDrop");
        $(".signup_dropdown").removeClass("activeDrop");
    });
    $( "body" ).delegate( ".signup_icon", "click", function() { 
        $(".signup_dropdown").toggleClass("activeDrop");
        $(".login_dropdown").removeClass("activeDrop");
    });
    $( "body" ).delegate( ".forgot_pass", "click", function() {  
        $(".logingDropdown").addClass("forgot_passCont");
    });
    $( "body" ).delegate( ".backLogin", "click", function() { 
        $(".logingDropdown").removeClass("forgot_passCont");
    });
    console.log('####applying correct a href');
    $('a').each(
        function() {
            // get the href attribute
            let href = $(this).attr('href');
            if (href) {
                console.log('curr href: ' + href);
                if (href.includes('.html')) {
                // if (href.match(/#/i)) {
                    // append window.location and write back to the href Attribute
                    // let newHref = href.replace('https://dlnil54eooeso.cloudfront.net/', window.location);
                    let newHref = getApiUrl() + href;
                    console.log('change href to ' + newHref);
                    $(this).attr('href', newHref);
                }
            }
        }
    );
});
function getApiUrl() {
    const url = isDevHost() ? "http://" + location.hostname + ":8080/" : "https://" + location.hostname + "/";
    console.log('getApiUrl is ' + url)
    return url;
}
function isDevHost() {
    console.log('isDev location is ' + location);
    return location.toString().toLowerCase().includes("localhost") || location.toString().toLowerCase().includes(":8080");
}

function applyBaseCDN() {
    if (isDevHost()) {
        $('base').attr('href', '');
        apiUrl = "http://localhost:8080/";
        $('base').attr('href', '');
    } else {
        apiUrl = "https://" + location.hostname + "/";
        $('base').attr('href', 'https://dlnil54eooeso.cloudfront.net/');
    }
}
function saveForm() {
    const formId = 'contactUsGuest';
    let responseDiv = '#' + formId + ' div.alert-success';
    $(responseDiv).hide();
    const result = ajaxSubmitForm(formId);
    $(responseDiv).show();
    $('.login_loader').hide();

}
function forgotPassword() {
    const formId = 'ajaxForgotPasswordGuest';
    let responseDiv = '#' + formId + ' div.alert-success';
    $(responseDiv).hide();
    const result = ajaxSubmitForm(formId);
    $('#forgotPasswordDiv').html(result);
    $(responseDiv).show();
    $('.login_loader').hide();
}

function signupForm(formId) {
    $('.spinner-border').show();
    let responseDiv = '#' + formId + ' div.alert-success';
    $(responseDiv).hide();
    const result = ajaxSubmitForm(formId);
    $('#signupResult').html(result);
    $('.spinner-border').hide();
    $(responseDiv).show();
    $('.login_loader').hide();
}

function signup() {
    const formId = 'createAccountGuest';
    signupForm(formId);
    gtag_report_conversion();
    historyPushState('signup-success','Sign Up Success');
}

function signupGeneric() {
    signupForm('createAccountNewGuest');
}

function signupLinks4u() {
    const formId = 'createLinks4uAccountGuest';
    signupForm(formId);
}

function signupSeoly() {
    const formId = 'createSeolyAccountGuest';
    signupForm(formId);
}

function signupEasySEO() {
    const formId = 'createEasySEOAccountGuest';
    signupForm(formId);
}

function signup123Content() {
    const formId = 'create123ContentAccountGuest';
    signupForm(formId);
}

function signupGetLeads() {
    const formId = 'createGetLeadsAccountGuest';
    signupForm(formId);
}

function signupEasyChat() {
    const formId = 'createEasyChatAccountGuest';
    signupForm(formId);
}

function signupEasyForms() {
    const formId = 'createEasyFormsAccountGuest';
    signupForm(formId);
}

function signupSignupLand() {
    const formId = 'createSignupLandAccountGuest';
    signupForm(formId);
}

function signupSeoRush() {
    const formId = 'createSeoRushAccountGuest';
    signupForm(formId);
}

function sendLoginForm() {
    console.log('start sendLoginForm');
    const formId = 'appLoginGuest';
    let responseDiv = '#' + formId + ' div.alert-success';
    $(responseDiv).hide();
    const result = ajaxSubmitForm(formId);
    console.log('sendLoginForm result is ' + result);
    let newLocation;
    if (result == 'true') {
        newLocation = isDevHost() ? 'homeDev.html' : 'home.html';
        console.log('newLocation ' + newLocation);
        window.location = getApiUrl() + newLocation;
    } else if (result == 'false') {
        const appVal = $('#appVal').val();
        if (appVal) {
        //     if (appVal === 'seoly') {
        //         newLocation = 'seoly.html';
        //     } else if (appVal === 'links4u') {
        //         newLocation = 'welcome.html';
        //     } else if (appVal === 'easySEO') {
        //         newLocation = 'easySeo.html';
        //     } else if (appVal === '123Content') {
        //         newLocation = 'content123.html';
        //     }
        // } else {
            newLocation = 'home.html';
        }
        window.location = getApiUrl() + newLocation
    } else {
        $(responseDiv).html(result);
        $(responseDiv).show();
        $('.login_loader').hide();
    }
}
function ajaxSubmitForm(formId) {
    var result;
    console.log("form id " + formId);
    let form = $('#' + formId);
    var data = form.serializeArray();
    // console.log('ajaxSubmitForm values ' + JSON.stringify(data));
    $('.login_loader').show();
    console.log('$(\'.login_loader\') ' + $('.login_loader'));
    $.ajax({
        type: 'POST',
        url: getApiUrl() + formId,
        data: data,
        success: function (json) {
            console.log('success ' + JSON.stringify(json));
            result = json.status;
            console.log('push state signup-success=true')
        },
        async: false
    });
    console.log('ajaxSubmitForm return result ' + result);
    return result;
}
function historyPushState(currTab, title) {
    try {
        console.log('historyPushState currTab ' + title);
        history.pushState("", "", "index" + (isTestingMode() ? "Dev" : "") + ".html?tab=" + currTab);
        $(document).prop('title', 'Rabbit SEO Traffic Booster - ' + title);
        gtag('event', 'page_view', {
            page_title: title,
            page_location: location.href
        }, { 'debug_mode': isTestingMode() });
    } catch (e) {
    }

}
function scrollTo(divSelector) {
    $('html, body').animate({
        scrollTop: $(divSelector).offset().top
    }, 200);
}
function loadabcHtml(mainHtml) {
    $.get(assetsUrl + mainHtml, function (data) {
        $('header').after(data);
    });
}
function loadTermsHtml(e) {
    window.location.href = "https://" + location.hostname + "/terms.html";
}
function gtag_report_conversion(url) {
    var callback = function () {
        if (typeof (url) != 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-11411875504/SOyZCMuV2fYYELDNzcEq',
        'transaction_id': '',
        'event_callback': callback
    });
    return false;
}
function gtag() {
    dataLayer.push(arguments);
}
function addGoogleTag() {
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', 'G-QYR00BL90B', { 'debug_mode': isTestingMode() });
    
    // console.log('gtag purchase event');
    // gtag("event", "purchase", {
    //     transaction_id: '12345',
    //     value: '50',
    //     currency: "USD",
    //     items: [
    //         {
    //             item_id: 'Wix-Premium',
    //             item_name: 'Wix-Premium'
    //         }]
    // }, { 'debug_mode': isTestingMode() });
}

function isTestingMode() {
    return location.toString().toLowerCase().indexOf("rabbitweb.test") !== -1 || location.toString().toLowerCase().indexOf(":8080") !== -1;
}