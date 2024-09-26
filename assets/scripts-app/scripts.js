let devShowSignup = false, devPublisResult, trafficDataJson, compsDevJson, devUsageJsonData, publishJsonData,
    userJsonData, websiteJsonData, pricesJson, linksJsonData, lpJson, jsonKFWData, jsonRankedKeywordsData,
    jsonLinksSummary, jsonLinksListData, crawlerList, titleIdeasDevJson, imagesDevJson, blogDomainsDevJson,
    blogCatsDevJson, finalArticleResponseDevJson, rawArticleDevJson, modifyArticleJsonData, articleSubmittedDevJson;
let useNewHome = false;
// var apiUrl = "https://www.rabbitseo.com/";
var apiUrl = "/";
var assetsUrl = "";
let activeTab = 'dashboard';
var dashboard_url = 'getMyJsonDataWebsite';
var analyticsVisits_url = 'getMyJsonGoogleAnalyticsVisitsWebsite';
var analytics_url = 'getMyJsonGoogleAnalyticsWebsite';
var links_url = 'getMyJsonCompDataGeneric'
var availableWebsites = [];
var availableSearchEngines = [];
var availableCountries = [];
var existingKeywordsList = [];
var suggestedKeywords = [];
var websiteCategories = [];
var rankedKeywords;
var rankedKeywordsJson;
var landingPageTable;
var mainUserDetails;
var sessionIdItem;
var payingUser;
var payingUserOrFreeTrial;
var searchEngine;
var packageName;
var pricePerMonth;
var appDomainName;
var upgradeLink;
var websitesMax;
var websitesUsed;
var keywordsUsed;
var keywordsMax;
var researchUsed;
var researchMax;
var linksRequestUsed;
var linksRequestMax;
var isShabbat;
var trialUser;
var active;
var blockedUntilPayment;
var daysCount;
var shownBefore = false;
var shownBeforeKeywordAdded = false;
var demoAccount = false;
var language = 'en';
var rtl = false;
var isAddedToMyWebsites;
var keywordItems;
var websiteData;
var brokenLinks;
var keywordsSelectForLandingPages = [];
var pagesSelectForLinksBuilder = [];
var titleIdeas = [], blogDomains = [];
let websitesLimitUpgrade = 'You have reached the websites limit, would you like to upgrade to get more?';
let researchLimitUpgrade = 'You have reached the researches limit in your current plan, would you like to upgrade to get more?';
let keywordsLimitUpgrade = 'You have reached the keywords limit, would you like to upgrade to get more?';
let genericUpgradeShabbatMsg = 'You have reached the limit in your current plan.';
const genericUpgradeMsg = 'You have reached the limit in your current plan, would you like to upgrade?';
let organicChart, paidChart, competitorsChart, avgPositionWeek, avgPositionMonths, websiteVisits;
var websiteSelect2;
var activeUrl = 'dashboard';
var tabToShow;
var stepperForm;
var hideExistingKeywords = true;
var translationArray = [];
var firstWebsite;
const keywordsCountMap = new Map();
var finalStep = false;
var currWebsite = null;
var allWebsitesDaysChart;
var allWebsitesMonthsChart;
var currTranslationArr = [];
var availableTranslationArr = ['ar', 'de', 'el', 'es', 'fr', 'it', 'iw', 'pt', 'ru', 'zh'];
const rowsToHideForFree = 200;
var hideLinksFromFreeWix = true;
var hideLandingPagesFromFreeWix = false;
var today = moment();
var isWebsiteOwner = true;
var isRabbitUI = false;
var isLinksUI = false;
var isSeolyUI = false;
var isEasySeoUI = false;
var isContent123UI = false;
var inOnboardingNow = false;
var afterOnboarding = false;
let firstLogin = false;
var needToRefreshKeywords = false;
let compsJson;
let addNewWebsite = false;
let reverseMode = false;
let modifyMode = false;
let tipsArray, tagsArray, dailySEOTipsArray;
let continueNext = true;
let mainKeywordVal;
let articleResponse;
let theInterval, theIntervalCounter;
var compsList = [];
let userFeaturedLinks;
let enableServerSideTable = 200;
let loadedLandingPages = false;
let currTableUrl;
let thBreakLine;
let confirmDelete = true;
const loadingDivHtml = '<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>';
var frommodal = 1;
var showmodal = 1;
let keywordToPromote;
let openSelect;
let paymentsTable;
let currPageUrlLink;
let showListingsSuccess = false;
let inputTimer = null;
let currentAppTab = null;
let currentAppTitle = null;
let tempData = null;
let ajaxErrorCounter = 0;
const MAX_KEYWORD_LENGTH = 40;

function getMonthsAgoName(ago) {
    return moment().subtract(ago, 'months').format('YYYY') + ' - ' + getTranslationWord(moment().subtract(ago, 'months').format('MMMM'));
}

function getDaysAgoName(ago) {
    return getTranslationWord(moment().subtract(ago, 'days').format('dddd'));
}

function showOrHideDemoAccountButton() {
    $('#demoAccountButton').hide();
}

function initDefaultTabToShow() {
    if (!tabToShow) {
        tabToShow = 'dashboard';
    }
}

function showWebsiteChooser() {
    $('div.header_topContent div#searchbox').show();
    $('#chooseWebsite').show();
    if (websitesUsed > 1) {
        $('#multipleWebsites').show();
    }
}

function changeTab(newTab) {
    console.log('changeTab ' + newTab);
    // console.log('websiteSelect2 ' + websiteSelect2);
    tabToShow = newTab;

    if (websiteSelect2 && websitesUsed > 1) {
        // console.log('websiteSelect2.val() ' + websiteSelect2.val());
        // websiteSelect2.val(websiteSelect2.val()).change();
        showTab();
    } else {
        showTab();
    }
}

function checkIfBlocked() {
    try {
        console.log('call setUserDetailsFromJson');

        if (!isWixUserOrWixLinksUser() && !isShopifyUser() && isUserBlocked()) {
            callInternalPlansForm();
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log('loadAppHtml ' + e)
    }
}

function showTab() {
    console.log('showing tab ' + tabToShow);
    if (!tabToShow || tabToShow === 'dashboard') {
        tabToShow = "dashboard";
        showAppDivs();
        $('[data-bs-target="#dashboard"]').tab('show');
        initDashboard();
    } else {
        console.log('showing tab now ' + tabToShow);

        try {
            if (tabToShow.indexOf('links') === -1 || tabToShow === 'links') {
                $('#' + tabToShow + '-tab').click();
            }
            $('#' + tabToShow + '-tab').tab('show');
        } catch (e) {
            $('#dashboard-tab').tab('show');
        }
    }
}

function simpleShowTab(selector) {
    $(selector).click();
    $(selector).tab('show');
}

function showAllWebsites() {
    tabToShow = 'allWebsites';
    // websiteSelect2.val(availableWebsites[0]).change();
    websiteSelect2.val(getTranslationWord("All Websites")).change();
}

let websiteUrl;

function setApiAndWebsiteFromUrl() {
    // console.log('location.search ' + location.search);
    // const url = location.search.slice(1, location.search.indexOf("&"));
    let api;
    const allParams = location.search.slice(1, location.search.length);
    if (allParams && !allParams.includes("instance=")) { // verify it's not wix url
        // console.log('allParams ' + allParams);
        api = allParams.slice(0, allParams.indexOf("&"));
        // console.log('allParams api ' + api);
        websiteUrl = allParams.slice(allParams.indexOf("&url="), allParams.length);
        // console.log('websiteUrl before ' + websiteUrl);
        if (websiteUrl) {
            websiteUrl = websiteUrl.replace("&url=", "");
        }
    }
    console.log('api is ' + api);
    tabToShow = api;

    if (!tabToShow || tabToShow.includes("activationCode") || tabToShow.includes("state=") || tabToShow.includes("hmac=")) {
        tabToShow = null;
    }

    if ((!tabToShow || tabToShow === "") && websitesUsed > 1) {
        websiteUrl = "allWebsites";
    }

    if (!websiteUrl || websiteUrl === 'null') {
        // if (!websiteUrl || availableWebsites.includes(websiteUrl)) {
        websiteUrl = availableWebsites[0];
    }
    // console.log('websiteUrl ' + websiteUrl);
    if (availableWebsites && !availableWebsites.includes(websiteUrl)) {
        // var newOption = new Option(websiteUrl, websiteUrl, true, true);
        // websiteSelect2.append(newOption).trigger('change');
        websiteUrl = availableWebsites[0];
    }

    if (isWebsiteOnboarding()) { // login first time
        websiteUrl = firstWebsite;
    }
    websiteSelect2.val(websiteUrl).change();
}

function isWebsiteOnboarding() {
    // return true;
    return mainUserDetails["websiteOnboarding"] != null;
}

function loadSearchEngines() {
    console.log('start loadSearchEngines')
    if (availableSearchEngines.length == 0 && !isDev()) {
        // console.log('loading miniListJsonSearchEngine');
        $.getJSON(getApiUrl('miniListJsonSearchEngine'), function (data) {
            // console.log('miniListJsonSearchEngine ' + JSON.stringify(data));
            for (let i = 0; i < data['list'].length; i++) {
                availableSearchEngines.push(data['list'][i]['name']);
            }
            if (isSEOlyUser()) {
                loadSearchEngineSelect();
            }
        });
    }
}

function loadCountries() {
    // console.log('loadCountries');
    if (availableCountries.length == 0 && !isDev()) {
        $.getJSON(getApiUrl('miniListJsonCountry'), function (data) {
            // console.log('miniListJsonCountry ' + JSON.stringify(data));
            for (let i = 0; i < data['list'].length; i++) {
                availableCountries.push(data['list'][i]['name']);
            }
        });
    }
}

function showModalFadeOut(title, text, firstButton, secondButton, linkButton) {
    showModal(title, text, firstButton, secondButton, linkButton);
    // setTimeout(function () {
    //     $('#modalMessage').fadeOut();
    // }, 4000);

}

function fadeModal(title, text, showInFooter) {
    fadeModalWithTime(title, text, 4000, showInFooter);
}

function fadeModalWithTime(title, text, time, showInFooter) {
    if (showInFooter) {
        showModalFooter(title, text, time > 1000 ? 'OK' : '', '');
    } else {
        showModal(title, text, time > 1000 ? 'OK' : '', '');
    }
    setTimeout(function () {
        if (showInFooter) {
            $('#newFooterMessage').fadeOut();
            $('#newFooterMessage').modal('hide');
        } else {
            $('#modalMessage').fadeOut();
            $('#modalMessage').modal('hide');
        }
    }, time);

}

function verifyNotEmptyValBySelector(obj, text) {
    return verifyNotEmptyVal($(obj).val, text);
}

function verifyNotEmptyVal(val, text) {
    if (!val) {
        showModal('Oops', text, 'OK', '');
        return false;
    } else {
        return true;
    }
}

function showModal(title, text, firstButton, secondButton, linkButton) {
    $('#modalMessage #exampleModalLabel').html(title);
    $('#modalMessage h5.modal-title').html(title);
    $('#modalMessage div.modal-body').html(text);
    if (firstButton == '') {
        $('div#modalMessage button#modalFirstButton').hide();
    } else {
        $('div#modalMessage button#modalFirstButton').show();
        $('div#modalMessage button#modalFirstButton').html(firstButton);
    }
    if (secondButton == '') {
        $('div#modalMessage button#modalSecondButton').hide();
        if (!linkButton || linkButton == '') {
            $('div#modalMessage button#modalFirstButton').css('width', '100%');
        }
    } else {
        $('div#modalMessage button#modalSecondButton').show();
        $('div#modalMessage button#modalFirstButton').css('width', 'auto');
        $('div#modalMessage button#modalSecondButton').html(secondButton);
    }
    if (!linkButton || linkButton == '') {
        $('div#modalMessage a#modalConfirmBtn').hide();
    } else {
        $('div#modalMessage a#modalConfirmBtn').show();
        $('div#modalMessage a#modalConfirmBtn').html(linkButton);
        $('div#modalMessage button#modalFirstButton').css('width', 'auto');
    }
    $('#modalMessage').modal('show');
    $('div#modalMessage button#modalSecondButton').click(function () {
        $('#modalMessage').modal('hide');
    });
}

function showModalFooter(title, text, firstButton, secondButton, linkButton) {
    $("#newFooterMessage").modal({backdrop: false});
    $('#newFooterMessage #exampleModalLabel').html(title);
    $('#newFooterMessage h5.modal-title').html(title);
    $('#newFooterMessage div.modal-body').html(text);
    if (firstButton == '') {
        $('div#newFooterMessage button#modalFirstButton').hide();
    } else {
        $('div#newFooterMessage button#modalFirstButton').show();
        $('div#newFooterMessage button#modalFirstButton').html(firstButton);
    }
    if (secondButton == '') {
        $('div#newFooterMessage button#modalSecondButton').hide();
        if (!linkButton || linkButton == '') {
            $('div#newFooterMessage button#modalFirstButton').css('width', '100%');
        }
    } else {
        $('div#newFooterMessage button#modalSecondButton').show();
        $('div#newFooterMessage button#modalFirstButton').css('width', 'auto');
        $('div#newFooterMessage button#modalSecondButton').html(secondButton);
    }
    if (!linkButton || linkButton == '') {
        $('div#newFooterMessage a#modalConfirmBtn').hide();
    } else {
        $('div#newFooterMessage a#modalConfirmBtn').show();
        $('div#newFooterMessage a#modalConfirmBtn').html(linkButton);
        $('div#newFooterMessage button#modalFirstButton').css('width', 'auto');
    }
    $('#newFooterMessage').modal('show');
    $('div#newFooterMessage button#modalSecondButton').click(function () {
        $('#newFooterMessage').modal('hide');
    });
}

function isLinkTypeArticle(data) {
    return data && (data === 'Article' || data === 'Guest Blog' || data === 'Guest Post' || data === 'Exclusive Blog Post');
}

function setUserDetailsFromJson(json) {
    payingUser = json['payingUser'];
    payingUserOrFreeTrial = json['payingUserOrFreeTrial'];
    // payingUser = true;
    searchEngine = json['searchEngineName'];
    packageName = json['packageName'];
    pricePerMonth = json['pricePerMonth'];
    appDomainName = json['appDomainName'];
    upgradeLink = getUpgradeLink();
    websitesMax = json['websitesMax'];
    websitesUsed = json['websitesUsed'];
    isShabbat = json['isShabbat'];
    trialUser = json['isTrial'];
    active = json['active'];
    blockedUntilPayment = json['blockedUntilPayment'];
    daysCount = json['daysCount'];
    language = isRabbitUI ? json.lang : 'en';
    rtl = isRabbitUI && json.rtl;
}

function showHideTestingMode() {
    if (isTestingMode()) {
        $('.testing-mode').show();
        // $('.testing-mode').hide();
        $('.testing-mode').css('color', 'red');
    } else {
        $('.testing-mode').hide();
    }
    if (isStagingMode()) {
        $('.staging-mode').show();
    } else {
        $('.staging-mode').hide();
    }
}

function isAppName(appName) {
    return mainUserDetails['appDomainName'].indexOf(appName) !== -1;
}

function handleUserDetails(json) {
    console.log('start handleUserDetails')
    if (json.status) {
        showModal('Message', json.status, 'Close', '', '');
    }
    json = JSON.parse(json['data']);
    // if (getRndInteger(1,10) % 2 == 0) {
    if (json && json.name) {
        mainUserDetails = json;
        sessionIdItem = {};
        sessionIdItem['name'] = 'sessionId';
        sessionIdItem['value'] = mainUserDetails['sessionId'];

        $.ajaxSetup({
            data: {
                sessionId: json['sessionId']
            }
        });
        $.ajaxSetup({
            beforeSend: function (jqXHR, settings) {
                try {
                    jqXHR.url = settings.url;
                } catch (e) {
                }
            },
            "error": function (jqXHR, textStatus, errorThrown) {
                if (ajaxErrorCounter++ === 3) {
                    closeAppModal();
                    closeModalMessage();
                    closeOurModal();

                    if (ajaxErrorCounter > 20) {
                        location.reload();
                    } else {
                        // showModal('Oops... something went wrong', 'Please Reload the Page', 'Cancel', 'Reload');
                        // $('div#modalMessage button#modalFirstButton').click(function () {
                        //     // location.reload();
                        // });
                        // $('div#modalMessage button#modalSecondButton').click(function () {
                        //     location.reload();
                        // });
                    }
                }
                try {
                    if (jqXHR['url'].toString().indexOf("logClientError") !== -1) {
                        const url = getApiUrl('logClientErrorGuest?error=ajaxSetupError - ' + textStatus + ' counter is ' + ajaxErrorCounter + ' jqXHR - ' + encodeURIComponent(JSON.stringify(jqXHR)));
                        console.log('error url ' + url);
                        $.getJSON(url, function (json) {
                            console.log('addActionLogUser ' + JSON.stringify(json));
                        });
                    }
                } catch (e) {
                }
            }
        });

        loadAppHtml(json['mainHtml'], json['roleName']);
        // userEmail = json['email'];
        setUserDetailsFromJson(json);

        if (!isExternalUser() && mainUserDetails['countryName'] === 'Israel') {
            // isWebsiteOwner = false;
        }
        console.log('curr lang is ' + language + ' is rabbit ' + isRabbitUI)
        if (language === 'iw' && isRabbitUI) {
            localStorage.setItem("rtl", 1);
            // console.log('disable google fonts')
        } else {
            localStorage.setItem("rtl", 0);
            // $('head').append( $('<link rel="preconnect" type="text/css" />').attr('href', 'https://fonts.googleapis.com'));
            // $('head').append( $('<link rel="preconnect" type="text/css" />').attr('href', 'https://fonts.gstatic.com'));
            // $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'));
        }
        if (isRabbitUI) {
            $.getJSON(getApiUrl('getMyJsonReadColsSettingsGeneric'), function (json) {
                tableColsSettings = JSON.parse(json["data"]);
            });
        }

        $('#headerMenu').show();
        $('#upgradeLinkMenu').attr("href", getUpgradeLink());
        $('#upgradeLinkFooter').attr("href", getUpgradeLink());

        if (!isExternalUser() || (mainUserDetails['linksCount'] && !isNaN(mainUserDetails['linksCount']) && mainUserDetails['linksCount'] > 0)) {
            $('#dropdownNavLink').show();
        } else {
            $('#dropdownNavLink').hide();
        }

        // console.log('fill in usernameSpan ' + mainUserDetails["name"]);
        $('#usernameSpan').html((!isEasySeoUser() ? getTranslationWord('Hello') + ' ' : '') + mainUserDetails["firstName"]);
        $('#packageMember').html((packageName === 'Starter' ? 'Free' : packageName) + ' Member');
        // if (!isDev()) {
        //     $('#packageMember').hide();
        // }
        // $('#userFlag').attr('data-bs-content', getTranslationWord('Hello') + ' ' + mainUserDetails["firstName"]);
        $('#userFlag').attr('src', mainUserDetails["countryFlag"]);

        if (isAppName('SEOly')) {
            $.ajaxSetup({
                async: false
            });
        }
        if (isRabbitUI) {
            getLanguage();
        }

        if (isRabbitUI || isAppName('SEOly')) {
            loadSearchEngines();
            loadCountries();
        }

        if (isRabbitUI || isAppName('Links4u') || isAppName('SEOly')) {
            loadKeywordSelect();
        }

        loadCategorySelect();

        if (isAppName('SEOly')) {
            $.ajaxSetup({
                async: true
            });
        }
        showHideTestingMode();
        if (isShopifyUser()) {
            $('.pay-as-you-go-link').hide();
        }
        // if (!useNewHome) {
        //     bindWebsites();
        // }
        if (mainUserDetails['roleName'] === 'Admin') {
            if (isLinksUser()) {
                addHotjar(3908798);
            } else if (isSEOlyUser()) {
                addHotjar(3908794);
            } else if (isEasySeoUser()) {
                addHotjar(3426181);
            } else if (isGetLeadsUser()) {
                addHotjar(5117175);
            } else if (isEasyChatUser()) {
                addHotjar(5117269);
            } else if (isEasyFormsUser()) {
                addHotjar(5117272);
            } else if (isSeoRushUser()) {
                addHotjar(5117276);
            } else if (isSignupLandUser()) {
                addHotjar(5117273);
            } else if (isContent123UI) {
                addHotjar(3469888);
            // } else {
                // } else if (daysCount <= 1) {
            } else if (isRabbitUI && (mainUserDetails["packageName"] === 'Starter' || daysCount <= 2)) {
                addHotjar(1436102);
            }
            if (isRabbitUI) {
                // addMatomo();
            }
            if (mainUserDetails['showInviteDialog']) {
                $('span.newAppSpan').html(mainUserDetails['newAppName']);
                $('span.newAppSupportEmail').html(mainUserDetails['newAppSupportEmail']);
                addTooltipToSelector('span.newAppSpan', mainUserDetails['newAppDesc']);
                // $('span.newAppDescSpan').html(mainUserDetails['newAppDesc']);
                $('a.appInstallUrl').attr('href', mainUserDetails['newAppUrl']);
                $('a.appInstallUrl').html(mainUserDetails['newAppUrl']);
                $('button.installedAppBtn').html("I have installed " + mainUserDetails['newAppName'] + " App");
                $('#inviteToNewAppModal').modal('show');
            }
        } else {
            console.log('not tracking this user');
        }
    } else {
        console.log('curr location.href = ' + location.href);
        let newPage;
        if (location.href.indexOf("rand=") === -1) {
            const randParam = 'rand=' + generateUUID();
            newPage = location.href + (location.href.indexOf('?') === -1 ? '?' : '&') + randParam;
            console.log('in if new page is ' + newPage);
        } else {
            if (isLinksUI) {
                newPage = '/welcomeLinks4u.html';
            } else if (isSeolyUI) {
                newPage = '/welcomeSeoly.html';
            } else if (isEasySeoUI) {
                newPage = '/welcomeEasySEO.html';
            } else if (isContent123UI) {
                newPage = '/welcome123Content.html';
            } else {
                newPage = '/index.html';
            }
        }
        // alert(newPage)
        let host = window.location.protocol + '//' + window.location.hostname
        if (newPage.indexOf(window.location.hostname) === -1) {
            newPage = host + "/" + newPage;
        }
        console.log('new page is ' + newPage);
        location.href = newPage;
    }
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function loadUserMainDetails() {
    console.log('start loadUserMainDetails');
    $.ajaxSetup({async: false});
    doRealRefreshUsage();

    $.getJSON(getApiUrl('getMyJsonMainDetailsGeneric'), function (json) {
        console.log('getMyJsonMainDetailsGeneric ' + JSON.stringify(json));
        handleUserDetails(json);
        if (mainUserDetails['askForTokenUrl'] && !isTestingMode()) {
            console.log('open window ' + mainUserDetails['askForTokenUrl'] + ' inIframe() ' + inIframe());
            let win = inIframe() ? window.parent : window.self;
            // popupWindow(mainUserDetails['askForTokenUrl']);
            // win.open(mainUserDetails['askForTokenUrl'], '_blank');
            // window.location = checkTokenJson['askForTokenUrl'];
            // console.log('############open fade modal');
            // $('body').append('<h1>App Update Required</h1>')
            fadeModalWithTime('Application Update Required', 'You are being forwarded to Wix Dashboard...', 7000);
            win.location = mainUserDetails['askForTokenUrl'];
            // console.log('opened window ' + mainUserDetails['askForTokenUrl'])
        } else {
            // handleUserDetails(json);
        }
    });
    $.ajaxSetup({async: true});
}

function createLandingPagesSelect() {
    if (pagesSelectForLinksBuilder.length === 0) {
        pagesSelectForLinksBuilder.push('');
        pagesSelectForLinksBuilder.push(mainUserDetails['wixUrl']);
        $.getJSON(getApiUrl('getMyJsonPagesListLandingPage?url=' + $('#inputSearchWebsite').val()), function (data) {
            console.log('createLandingPagesSelect getMyJsonPagesList ' + JSON.stringify(data));
            var list = data['list'];
            if (list && list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    pagesSelectForLinksBuilder.push(list[i]);
                }
            }
            createPagesSelect();
        });
    } else {
        createPagesSelect();
    }
}

function createPagesSelect() {
    $("[id^=linkHref]").select2({
        tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: pagesSelectForLinksBuilder.sort(),
        tags: true,
        placeholder: 'Landing Page',
        searchInputPlaceholder: 'Choose a landing page for the link'
    });
    $("[id^=linkHref]").val(myLandingPageHref ? myLandingPageHref : mainUserDetails['wixUrl']).change();
}

let websiteCategorySelect;

function createCategorySelect() {
    const placeholderText = isRabbitUI ? 'Type Your SEO Category' : 'Enter Domain Classification';
    websiteCategorySelect = $('.categorySelect').select2({
        tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: websiteCategories.sort(),
        tags: true,
        placeholder: placeholderText,
        searchInputPlaceholder: placeholderText,
        // minimumInputLength: 3,
        // language: {
        //     inputTooShort: function() {
        //         return '';
        //     }
        // }
    });
    // $('.categorySelect').select2()
    //     .on("select2:open", function () {
    //         $('.select2-results__options').niceScroll();
    //     });
}

function loadCategorySelect() {
    if (websiteCategories.length === 0) {
        $.get(assetsUrl + 'assets/data/categories.txt', function (data) {
            let arr = data.split('\n');
            websiteCategories.push('');
            for (let i = 0; i < arr.length; i++) {
                const curr = arr[i];
                if (websiteCategories.indexOf(curr) === -1) {
                    websiteCategories.push(curr.replace("\n", ""));
                }
            }
            createCategorySelect();
        });
        // $.getJSON(apiUrl + 'getMyJsonAllCategoriesGeneric', function (json) {
        //     // console.log('getMyJsonAllCategoriesGeneric ' + JSON.stringify(json));
        //     json = JSON.parse(json["data"]);
        //     if (json) {
        //         websiteCategories.push('');
        //         for (var i = 0; i < json.length; i++) {
        //             const curr = json[i];
        //             if (websiteCategories.indexOf(curr) == -1) {
        //                 websiteCategories.push(curr);
        //             }
        //         }
        //     }
        //     createCategorySelect();
        // });
    } else {
        createCategorySelect();
    }
}

function loadKeywordsSuggestions() {
    console.log('start loadKeywordsSuggestions');
    $.getJSON(getApiUrl('getMyJsonKeywordsSuggestionsGeneric'), function (json) {
        // console.log('getMyJsonKeywordsSuggestions ' + JSON.stringify(json));
        json = JSON.parse(json["data"]);
        if (json) {
            for (var i = 0; i < json.length; i++) {
                const curr = json[i];
                if (curr && suggestedKeywords.indexOf(curr) == -1 && curr.length > 5 && curr.length < MAX_KEYWORD_LENGTH) {
                    suggestedKeywords.push(curr);
                    if (!keywordsSelectForLandingPages.includes(curr)) {
                        keywordsSelectForLandingPages.push(curr);
                    }
                }
            }
        }
        createKeywordSelect();
    });
}

function loadKeywordSelect() {
    console.log("start loadKeywordSelect suggestedKeywords.length " + suggestedKeywords.length + " keywordsSelectForLandingPages.length " + keywordsSelectForLandingPages.length);
    if (suggestedKeywords.length === 0 || keywordsSelectForLandingPages.length === 0) {
        // if (false) {
        if (isLinksUser() || isSEOlyUser()) {
            loadKeywordsSuggestions();
        } else {
            // suggestedKeywords.push('');
            $.getJSON(getApiUrl('getMyJsonKwrdsListLandingPage?url=' + $('#inputSearchWebsite').val()), function (data) {
                var list = data['list'];
                for (let i = 0; i < list.length; i++) {
                    let curr = list[i];
                    if (suggestedKeywords.indexOf(curr) == -1 && curr.length > 5 && curr.length < MAX_KEYWORD_LENGTH) {
                        suggestedKeywords.push(curr);
                        if (!keywordsSelectForLandingPages.includes(curr)) {
                            keywordsSelectForLandingPages.push(curr);
                        }
                    }
                }
                loadKeywordsSuggestions();
            });
        }
    } else {
        createKeywordSelect();
    }
}


function createKeywordSelect() {
    let list = shuffle(suggestedKeywords);
    list.unshift('');

    $(".myKeywordSelect").select2({
        tokenSeparators: [',', ', ', '\n'],
        // selectOnClose: true,
        data: list,
        tags: true,
        placeholder: 'Type a keyword or choose from the list',
        searchInputPlaceholder: 'Type a keyword or choose from the list',
        "language": {
            "noResults": () => 'Enter a keyword'
        },
    });
    $(".linkKeywordSelect").select2({
        tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: suggestedKeywords,
        tags: true,
        placeholder: 'Enter a keyword',
        searchInputPlaceholder: 'Enter the keywords you want to promote' + (suggestedKeywords.length > 1 ? ' or choose from the list' : ''),
        "language": {
            "noResults": () => 'Enter a keyword'
        },
    });
    $(".linkKeywordSelectMax3").select2({
        tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: suggestedKeywords,
        maximumSelectionLength: 3,
        tags: true,
        placeholder: 'Enter a keyword',
        searchInputPlaceholder: 'Enter the keywords you want to promote' + (suggestedKeywords.length > 1 ? ' or choose from the list' : ''),
        "language": {
            "noResults": () => 'Enter a keyword',
            maximumSelected: function (e) {
                var t = "Choose max " + e.maximum + " keywords";
                return t;
                // return t + ' - Upgrade Now and Select More';
            }
        },
    });
}

function isUserBlocked() {
    const blocked = !isExternalUser() && (!active || blockedUntilPayment) && packageName !== 'Starter';
    console.log('isUserBlocked ' + blocked);
    return blocked;
}

function translatePopovers(lang) {
    $.ajax({
        url: apiUrl + 'translation/iw.json',
        dataType: 'json', async: false,
        success: function (langArr) {
            if (lang == 'iw') {
                var elements = document.body.getElementsByTagName("*");
                for (var i = 0; i < elements.length; i++) {
                    var current = elements[i];
                    // console.log(current);
                    if (current.hasAttribute("data-bs-content")) {
                        var index = -1;
                        var filteredObj = langArr.find(function (item, i) {
                            if (item.o === current.getAttribute("data-bs-content")) {
                                index = i;
                                return i;
                            }
                        });
                        if (index != -1) {
                            current.setAttribute("data-bs-content", filteredObj.t);
                        }
                    }
                }
                // $('body').css('direction', 'rtl');
            } else if (lang == 'en') {
                var elements = document.body.getElementsByTagName("*");
                for (var i = 0; i < elements.length; i++) {
                    var current = elements[i];

                    if (current.hasAttribute("data-bs-content")) {
                        var index = -1;
                        var filteredObj = langArr.find(function (item, i) {
                            if (item.t === current.getAttribute("data-bs-content")) {
                                index = i;
                                return i;
                            }
                        });
                        if (index != -1) {
                            current.setAttribute("data-bs-content", filteredObj.o);
                        }
                    }
                }
                // $('body').css('direction', 'ltr');
            }
        }
    });
}

function getWordFromArray(langArr, originalWord) {
    var index = -1;
    if (langArr && langArr.length > 0) {
        var filteredObj = langArr.find(function (item, i) {
            if (item.o === originalWord) {
                index = i;
                return i;
            }
        });
    }
    if (index != -1 && filteredObj && filteredObj.t && filteredObj.t.length > 0) {
        return filteredObj.t;
    } else {
        return originalWord;
    }
}

function getTranslationWord(originalWord) {
    var translationWord = originalWord;
    // language = $('select.cloudlocalization-selection').val();
    // console.log('language ' + language);
    if (language != 'en') {
        const langIndex = availableTranslationArr.indexOf(language);
        // console.log('availableTranslationArr ' + availableTranslationArr + ' langIndex ' + langIndex + ' language ' + language);

        if (!currTranslationArr[language] && langIndex !== -1) {
            $.ajax({
                url: apiUrl + 'translation/' + language + '.json',
                dataType: 'json', async: false, dataType: 'json',
                success: function (langArr) {
                    // console.log('langArr ' + Object.values(langArr));
                    currTranslationArr[language] = langArr;
                    translationWord = getWordFromArray(langArr, originalWord);
                    // console.log('get word from arr ' + originalWord + ": " + translationWord);
                }
            });
        } else {
            translationWord = getWordFromArray(currTranslationArr[language], originalWord);
            // console.log('get word from arr ' + originalWord + ": " + translationWord);
        }
    } else {
        translationWord = originalWord;
    }
    return translationWord;
}

function scrollToDiv(divId) {
    console.log('scrollToDiv ' + divId);
    $('html, body').animate({
        scrollTop: $("#" + divId).offset().top
    }, 500);
}

function loadBacklinks(json) {
    if (json) {
        var html1 = '';
        var listedBacklinks = 0;
        var sumRefPageRank = 0;
        var sumRefDomainRank = 0;

        for (var i = 0; i < json.length; i++) {
            // console.log('listedBacklinks ' + listedBacklinks + ' curr domain rank ' + json[i]["domain_from_rank"])
            listedBacklinks++;
            let pageFromRank = json[i]["page_from_rank"];
            let domainRank = json[i]["domain_from_rank"];
            sumRefPageRank += pageFromRank;
            sumRefDomainRank += domainRank;
        }
        $('#linksList tbody').html(html1);
        $('#listedBacklinks').html(nFormatter(listedBacklinks, 2));
        $('#avgRefPageRank').html(nFormatter((sumRefPageRank / listedBacklinks), 2));
        $('#avgRefDomainRank').html(nFormatter((sumRefDomainRank / listedBacklinks), 2));
        var linksList = $('#linksList').DataTable({
            "datatype": "json",
            "data": json,
            rowId: 'id',
            "columns": [
                {
                    "data": "domain_from",
                    "name": "domain_from",
                    "title": "Domain From",
                    "sClass": "m-lines",
                    "defaultContent": "",
                    'visible': false,
                    render: function (data, type, row) {
                        return payingUser ? getFormattedUrl(data) : 'Upgrade to see';
                    }
                },
                {
                    "data": "url_from",
                    "name": "url_from",
                    "title": "Url From",
                    "sClass": "m-lines",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return payingUser ? getFormattedUrl(data) : 'Upgrade to see';
                    }
                },
                {
                    "data": "url_to",
                    "name": "url_to",
                    "title": "Url To",
                    "sClass": "m-lines",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return payingUser ? getFormattedUrl(data) : 'Upgrade to see';
                    }
                },
                {
                    "data": "anchor",
                    "name": "anchor",
                    "title": "Anchor",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return payingUser ? data : 'Upgrade to see';
                    }
                },
                {
                    "data": "tld_from",
                    "name": "tld_from",
                    "title": "TLD<br/>From",
                    "tooltip": "top-level domain of the referring URL",
                    "defaultContent": "",
                    'visible': true,
                },
                {
                    "data": "is_new",
                    "name": "is_new",
                    "title": "New",
                    "defaultContent": "",
                    'visible': false,
                },
                {
                    "data": "is_broken",
                    "name": "is_broken",
                    "title": "Broken",
                    "defaultContent": "",
                    'visible': false,
                },
                {
                    "data": "rank",
                    "name": "rank",
                    "title": "Url<br />To<br />Rank",
                    "defaultContent": "",
                    'visible': false,
                    "tooltip": "PageRank is Google’s algorithm designed to measure the importance of a webpage based on the quality and quantity of webpages that refer to it. Pages that have high PageRank (i.e., a large number of quality backlinks) are perceived as more authoritative by Google and rank better than those with lower PageRank."
                },
                {
                    "data": "domain_from_rank",
                    "name": "domain_from_rank",
                    "title": "Domain<br />Rank",
                    "defaultContent": "",
                    'visible': true,
                    "tooltip": "This value refers to the domain of the link, it shows the rank of the domain's homepage. PageRank is Google’s algorithm designed to measure the importance of a webpage based on the quality and quantity of webpages that refer to it. Pages that have high PageRank (i.e., a large number of quality backlinks) are perceived as more authoritative by Google and rank better than those with lower PageRank."
                },
                {
                    "data": "page_from_rank",
                    "name": "page_from_rank",
                    "title": "Page<br />Rank",
                    "defaultContent": "",
                    'visible': true,
                    "tooltip": "This value refers to the actual page hosting the link, usually this value will be have lower rank than the main domain of the link. PageRank is Google’s algorithm designed to measure the importance of a webpage based on the quality and quantity of webpages that refer to it. Pages that have high PageRank (i.e., a large number of quality backlinks) are perceived as more authoritative by Google and rank better than those with lower PageRank."
                },
                {
                    "data": "page_from_external_links",
                    "name": "page_from_external_links",
                    "title": "Source<br />External<br />Links",
                    "defaultContent": "",
                    'visible': false,
                },
                {
                    "data": "page_from_internal_links",
                    "name": "page_from_internal_links",
                    "title": "Source<br />Internal<br />Links",
                    "defaultContent": "",
                    'visible': false,
                },
                {
                    "data": "page_from_title",
                    "name": "page_from_title",
                    "title": "Page<br />From<br />Title",
                    "defaultContent": "",
                    'visible': false,
                },
                {
                    "data": "first_seen",
                    "name": "first_seen",
                    "title": "First<br />Seen",
                    "defaultContent": "",
                    'visible': false,
                    render: function (data, type, row) {
                        return getFormattedDate(data);
                    }
                },
                {
                    "data": "last_seen",
                    "name": "last_seen",
                    "title": "Last<br />Seen",
                    "defaultContent": "",
                    'visible': false,
                    render: function (data, type, row) {
                        return getFormattedDate(data);
                    }
                },
                {
                    "data": "dofollow",
                    "name": "dofollow",
                    "title": "Follow",
                    "defaultContent": "",
                    'visible': false,
                },
                {
                    "data": "text_pre",
                    "name": "text_pre",
                    "title": "Text<br />Before",
                    "defaultContent": "",
                    'visible': false,
                    "tooltip": "snippet before the anchor text"
                },
                {
                    "data": "text_post",
                    "name": "text_post",
                    "title": "Text<br />After",
                    "defaultContent": "",
                    'visible': false,
                    "tooltip": "snippet after the anchor text"
                },
                {
                    "data": "links_count",
                    "name": "links_count",
                    "title": "Links<br />Count",
                    "defaultContent": "",
                    'visible': false,
                },
                {
                    "data": "semantic_location",
                    "name": "semantic_location",
                    "title": "Semantic<br />Location",
                    "defaultContent": "",
                    'visible': false,
                },
            ],
            // "order": [[1, "asc"]],
            destroy: true,
            buttons: ['copy', 'excel', 'print', {
                extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
            }],
            "dom": '<"dt-buttons"Bf><"clear">firtlp',
            // info: false,
            // "bFilter": true,
            // fixedHeader: true,
            // deferRender: true,
            // // scrollY: 700,
            // // scrollCollapse: true,
            // // scroller: true,
            // paging: false,
            // "aoColumnDefs": [{
            //     "searchable": false,
            //     "targets": [0]
            // }],
            info: false,
            fixedHeader: true,
            deferRender: true,
            paging: false,
            "bFilter": true,
            // "columnDefs": [{
            //     // "targets": 'no-sort',
            //     "orderable": true,
            // }],
            "initComplete": function (settings, json) {

            }
        });
        initShowHideColumns('linksTable', linksList);

        // $('#linksList').on('order.dt', function () {
        //     var table = $('#linksList').DataTable(defaultTableSettings);
        //     // var order = table.order();
        //     // if (document.getElementById('sortFromAllResult').checked) {
        //     //     var dir = order[0][1];
        //     //     var title = table.column(order[0][0]).header();
        //     //     title = $(title).html();
        //     //     var column = title.replace(" ", "_").toLowerCase();
        //     //     sortFromAllResult(column, dir);
        //     // }
        // });

        adjustExportButtons(isSeolyUI ? 'crawlerLinksTableSearch' : 'tableSearch', linksList);
    }
}

function addHowToChangeLink(divId, wixUrl, shopifyUrl, weeblyUrl) {
    if (isWixUser()) {
        $(divId + ' a').attr("href", wixUrl);
    } else if (appDomainName === 'Shopify') {
        $(divId + ' a').attr("href", shopifyUrl);
    } else if (appDomainName === 'Weebly') {
        $(divId + ' a').attr("href", weeblyUrl);
    } else {
        $(divId + ' a').hide();
        $(divId + ' div.alertContent').css('width', 'auto')
    }
}

function isWixUser() {
    return appDomainName === 'Wix';
}

function isShopifyUser() {
    // console.log('isShopifyUser appDomainName ' + appDomainName + ' appDomainName.indexOf(\'Shopify\') !== -1' + appDomainName.indexOf('Shopify') !== -1);
    return appDomainName && appDomainName.indexOf('Shopify') !== -1;
}

function isWixUserOrWixLinksUser() {
    return appDomainName.indexOf('Wix') !== -1;
}

function isLinksUser() {
    return appDomainName.indexOf('Links4u') !== -1;
}

function isEasySeoUser() {
    return appDomainName.indexOf('Easy SEO') !== -1;
}

function isGetLeadsUser() {
    return appDomainName.indexOf('Get Leads') !== -1;
}

function isSignupLandUser() {
    return appDomainName.indexOf('Signup') !== -1;
}

function isEasyFormsUser() {
    return appDomainName.indexOf('Easy Froms') !== -1;
}

function isEasyChatUser() {
    return appDomainName.indexOf('Easy Chat') !== -1;
}

function isSeoRushUser() {
    return appDomainName.indexOf('SEO Rush') !== -1;
}

function isSEOlyUser() {
    return appDomainName.indexOf('SEOly') !== -1;
}

function callInternalPlansForm() {
    console.log('callInternalPlansForm isRabbitUI ' + isRabbitUI);
    return isRabbitUI ? ajaxLoadToDiv('/assets/htmls/plans.html', 'tabData') : $('#upgrade-tab').click();
}

function getUpgradeLink() {
    if (isWixUserOrWixLinksUser()) {
        return "javascript: callUpgradePage();";
    } else {
        return isRabbitUI ? "javascript: ajaxLoadToDiv('/assets/htmls/plans.html', 'tabData')" : "javascript: $('#upgrade-tab').click()";
    }
}

function isShowWixBillingPage() {
    // return isWixUserOrWixLinksUser() && !mainUserDetails['showInternalPayment'];
    // return isWixUserOrWixLinksUser() && !mainUserDetails['showInternalPayment'] && !isTestingMode();
    // return isWixUserOrWixLinksUser() && !mainUserDetails['showInternalPayment'] && isEasySeoUI;
    return isWixUserOrWixLinksUser() && !mainUserDetails['showInternalPayment'];
}

function callUpgradePage() {
    console.log('callUpgradePage isShowWixBillingPage() ' + isShowWixBillingPage());
    // if (isWixUserOrWixLinksUser() && !isTestingMode()) {
    if (!isShabbat) {
        if (isShowWixBillingPage()) {
            callWixUpgrade();
        } else {
            historyPushState('plans', 'Plans');
            ajaxLoadToDiv('/assets/htmls/plans.html', 'tabData');
        }
    }
}

function deleteAccount() {
    if (isWixUserOrWixLinksUser() && pricePerMonth === 0) {
        fadeModalWithTime('', 'Since you are a Wix user, you should delete the app via your Wix dashboard', 10000);
    } else {
        let logoutUrl = mainUserDetails['appUrl'];
        showModal('Confirm', 'Are you sure you want to delete your account?', 'No', 'Yes');
        $('div#modalMessage button#modalSecondButton').click(function () {
            console.log('call cancelAccountUser');
            $.getJSON(getApiUrl('cancelAccountUser'), function (data) {
                console.log('cancelAccountUser result ' + JSON.stringify(data))
                fadeModal('Account Deleted', 'Your account has been deleted');
                setTimeout(function () {
                    location.href = logoutUrl;
                }, 4000);
            });
        });
    }
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function callWixUpgrade() {
    console.log('callWixUpgrade start');
    if (!isShabbat) {
        if (false) {
            // if (inIframe()) {
            Wix.Dashboard.openBillingPage();
        } else {
            // const appId = isWixUser() ? '1308d225-ac16-0e63-a980-3528ad7a2e80' :
            //     (isLinksUser() ? '3b30fed1-9939-4864-93a3-57618a92313b' : '29d24148-9931-4da8-843f-4a8f31dc50c4');
            const appId = mainUserDetails['appId'];
            console.log('appId is ' + appId);
            // https://www.wix.com/apps/upgrade/3b30fed1-9939-4864-93a3-57618a92313b?appInstanceId=94668c01-354b-4d91-9ca9-8c95b512fede
            window.open('https://www.wix.com/apps/upgrade/' + appId + '?pp_origin=in_app_dashboard&appInstanceId=' + mainUserDetails['emailId'], '_blank');
            // window.open('https://manage.wix.com/apps/upgrade/' + appId + '?&pp_origin=in_app_dashboard', '_blank')
        }
    }
}

function callWixReview() {
    console.log('callWixReview');
    if (inIframe() && false) {
        Wix.Dashboard.openReviewInfo();
    } else {
        // const appUrl = isWixUser() ? 'https://www.wix.com/app-market/rabbit-seo' :
        //     (isLinksUser() ? 'https://www.wix.com/app-market/links4u' : 'https://www.wix.com/app-market/seoly-complete-seo-solution');
        const reviewLink = mainUserDetails['reviewLink'];
        if (reviewLink) {
            window.open(reviewLink, '_blank');
        }
    }
}

function copyToClipboardAndUpgrade() {
    navigator.clipboard.writeText(couponCodeText);
    try {
        $('#BlackFridayModal').modal('hide');
    } catch (e) {
    }
    if (isSeolyUI) {
        showModal('Forwarding to checkout...', 'Promo Discount Code in your Clipboard', '', '');
    } else if (isEasySeoUI) {
        showModal('Amazing', 'Just paste the Discount Code in the checkout form...', '', '');
    }

    // showModal(title, 'Forward to checkout, paste the promo code: ' + couponCodeText, '', '');

    setTimeout(function () {
        callUpgradePage();
        $('#modalMessage').modal('hide');
    }, 4000);
}

function copyToClipboard(copyText, title) {
    if (!title) {
        title = 'Copied to Clipboard';
    }
    /* Get the text field */
    navigator.clipboard.writeText(copyText);

    showModal(title, copyText, '', '');
    // showModal('Copy to Clipboard', copyText + ' was copied to your clipboard!', 'Close', '');
    setTimeout(function () {
        $('#modalMessage').modal('hide');
    }, 2000);
}

function validateKeywordsField() {
    var text = $("#keywordTerm").val();
    var lines = text.split(/\r|\r\n|\n/);
    var count = lines.length;
    var commas = text.split(',');
    var commasCount = commas.length;
    const limit = keywordsMax - keywordsUsed;
    if (count > limit || commasCount > limit) {
        $('#keywordsLimit').html(getTranslationWord('You can add up to ') + limit + ' ' + getTranslationWord('keywords') + '.');
        $('#keywordsLimit').fadeIn(800);

    } else {
        $('#keywordsLimit').fadeOut(400);
    }
}

function hasCredits() {
    // console.log('researchUsed ' + researchUsed);
    // console.log('researchMax ' + researchMax);
    if (researchUsed >= researchMax && !isShabbat) {
        if (isWixUser()) {
            callUpgradePage();
        } else {
            // showModal('Upgrade', researchLimitUpgrade, 'No', '', 'Yes');
            // let href = "javascript: $('#modalMessage').modal('hide');" + upgradeLink;
            // $('div#modalMessage a#modalConfirmBtn').attr("href", href);
            return false;
        }
    } else {
        return true;
    }
}

function showUpgradeModal(msgText) {
    $('.spinner-border').hide();
    historyPushState('upgrade-modal', 'Upgrade Modal');
    if (isShabbat && genericUpgradeShabbatMsg && !afterOnboarding && keywordsUsed > 0) {
        showModal('Sorry', genericUpgradeShabbatMsg, 'Close', '');
        genericUpgradeShabbatMsg = null;
    } else if (!afterOnboarding) {
        showModal('Sorry', msgText, 'No', '', 'Yes');
        $('div#modalMessage a#modalConfirmBtn').attr("href", "javascript: $('#modalMessage').modal('hide');" + getUpgradeLink());
    } else {
        afterOnboarding = true;
    }
    // $('div#modalMessage button#modalSecondButton').click(function () {
    //     getUpgradeLink();
    // });
}

function loadTopTrafficPages() {
    $.getJSON(getApiUrl('getMyJsonCompDataGeneric?api=RelevantPages&url=' + $('#inputSearchWebsite').val()), function (json) {
        var html = '';
        if (!hasAlertToShow(json)) {
            json = JSON.parse(json['data']);
            json = json['items']
            console.log(json);
            for (let i = 0; i < json.length; i++) {
                html +=
                    '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + json[i]['page_address'] + '</td>' +
                    '<td>' + nFormatter(json[i]['metrics']['organic']['count'], 2) + '</td>' +
                    '<td>' + formatNumber(json[i]['metrics']['organic']['estimated_paid_traffic_cost']) + '</td>' +
                    '<td>' + formatNumber(json[i]['metrics']['organic']['etv']) + '</td>' +
                    '<td>' + json[i]['metrics']['organic']['is_down'] + '</td>' +
                    '<td>' + json[i]['metrics']['organic']['is_lost'] + '</td>' +
                    '<td>' + json[i]['metrics']['organic']['is_new'] + '</td>' +
                    '<td>' + json[i]['metrics']['organic']['is_up'] + '</td>' +
                    '<td>' + nFormatter(json[i]['metrics']['paid']['count'], 2) + '</td>' +
                    '<td>' + formatNumber(json[i]['metrics']['paid']['estimated_paid_traffic_cost']) + '</td>' +
                    '<td>' + formatNumber(json[i]['metrics']['paid']['etv']) + '</td>' +
                    '<td>' + json[i]['metrics']['paid']['is_down'] + '</td>' +
                    '<td>' + json[i]['metrics']['paid']['is_lost'] + '</td>' +
                    '<td>' + json[i]['metrics']['paid']['is_new'] + '</td>' +
                    '<td>' + json[i]['metrics']['paid']['is_up'] + '</td>' +
                    '</tr>';
            }
        }
        $('#topTrafficPagesTable tbody').html(html);
        var topTrafficPagesTable = $('#topTrafficPagesTable').DataTable();

    })
}

function toggleStar(obj, id, isStar) {
    $.ajax({
        type: 'POST',
        url: getApiUrl("toggleStar" + obj),
        data: "id=" + id,
        success: function (result) {
            // console.log('toggleStar result ' + result.status);
            if (result.status != 'true') {
                $('#star' + id).html('<img src="/assets/images/icon/star.png">');
            } else {
                $('#star' + id).html('<img src="/assets/images/icon/starFill.png">');
            }

        }
    });
}

function isFreeUser() {
    return mainUserDetails && mainUserDetails['packageName'] && (mainUserDetails['packageName'] === 'Starter' || mainUserDetails['packageName'] === 'Free');
}

var websitesTable;

function enableIntroJs() {
    console.log('start enableIntroJs');
    // enable intro js
    var tooltipsToIntro = [].slice.call(document.querySelectorAll('#body-pd > div:not(.excludeIntroJs) [data-bs-toggle="popover"]'));
    console.log('enableIntroJs tooltipsToIntro ' + tooltipsToIntro.length);
    if (tooltipsToIntro.length > 0) {
        [].forEach.call(tooltipsToIntro, function (item) {
            // if (item.tagName && item.tagName == 'DIV') {
            let element = $(item);
            if (!element.hasClass('excludeIntroJs')) {
                // console.log('create intro for element ' + element.attr("data-bs-content"));
                element.attr("data-intro", element.attr("data-bs-content"));
                element.attr("data-position", "bottom");
            }
            // }
        });
    } else {
        var dataIntro = [].slice.call(document.querySelectorAll('#tabData > [data-intro]'));
        console.log('dataIntro count ' + dataIntro.length);
        if (!dataIntro || dataIntro.length === 0) {
            $('.userManual_btn').hide();
        }
    }
    console.log('finish enableIntroJs');
}

function addPopover(selector, text) {
    $(selector).attr('data-bs-container', 'body');
    $(selector).attr('data-bs-toggle', 'popover');
    $(selector).attr('data-bs-trigger', text);
    $(selector).attr('data-bs-content', text);
    $(selector).popover({
        html: true,
        trigger: 'hover',
        delay: {
            show: "300",
            hide: "100"
        },
    });
}

function enableTooltips() {
    if (!mainUserDetails || !mainUserDetails.extraData || !mainUserDetails.extraData.displaySettings || !mainUserDetails.extraData.displaySettings.tooltips || mainUserDetails.extraData.displaySettings.tooltips === 'show') {
        // var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        // var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        //     if (popoverTriggerEl && JSON.stringify(popoverTriggerEl) !== '{}') {
        //         return new bootstrap.Popover(popoverTriggerEl)
        //     } else {
        //         console.log('skip tooltip for ' + popoverTriggerEl.id + ' full: ' + popoverTriggerEl['data-bs-trigger']);
        //     }
        // })
        $('[data-bs-toggle="popover"]').popover({
            html: true,
            trigger: 'hover',
            delay: {
                show: "500",
                hide: "100"
            },
        });
        $('[data-bs-toggle="tooltip"]').tooltip({
            html: true,
            trigger: 'hover',
            delay: {
                show: "500",
                hide: "100"
            },
        });
    }
}

function ajaxLoadToDivIfEmpty(url, divId) {
    // const length = $('#' + divId).html().length;
    // console.log(' div id length ' + divId + ': ' + length)
    // if (length < 20 || websitesUsed > 1) {
    ajaxLoadToDiv(url, divId);
    // } else {
    // $('[href="#' + divId + '-tab"]').tab('show');
    // }
}

function composeUrl(url) {
    console.log('start composeUrl assetsUrl is ' + assetsUrl + ' url is ' + url);
    console.log('url.startsWith(\'/\')' + url.startsWith('/'))
    console.log('assetsUrl.indexOf(\'cloudfront.\') ' + assetsUrl.indexOf('cloudfront.com'))
    if (assetsUrl && assetsUrl.indexOf('cloudfront.') !== -1 && url.startsWith('/')) {
        url = url.substring(1);
    }
    if (url.indexOf('localhost:8080') === -1 && url.indexOf('https://') === -1 && url.indexOf('.jsp') === -1) {
        url = assetsUrl + url;
    }
    console.log('final url is ' + url);
    return url;
}

function ajaxLoadToDiv(url, divId) {
    console.log('ajaxLoadToDiv url is ' + url);
    console.log('isUserBlocked() ' + isUserBlocked());
    if (isUserBlocked()) {
        // if (isUserBlocked() && url && url.indexOf('onboardingFull.html') !== -1) {
        url = "/assets/htmls/plans.html";
    }
    if (divId === 'tabData' && isRabbitUI) {
        showTabData();
    }

    url = composeUrl(url);
    console.log('ajaxLoadToDiv final url ' + url);

    $.ajax({
        url: url,
        dataType: 'html',
        success: function (html) {
            if (divId) {
                console.log('ajaxLoadToDiv success url is ' + url + ' divId ' + divId)
                $('#' + divId).html(html);
                if (mainUserDetails && mainUserDetails.name) {
                    refreshUsage();
                    if (mainUserDetails && mainUserDetails.extraData && mainUserDetails.extraData.displaySettings && mainUserDetails.extraData.displaySettings.tableView && mainUserDetails.extraData.displaySettings.tableView === 'compact') {
                        console.log('apply compact class');
                        $(".rabbitTable").children(".hover").addClass("compact");
                    }
                }
                if (!url.includes('ranksExplorer') && !url.includes('ranksGap')) { // ignore sub urls
                    let currUrl = $('#inputSearchWebsite').val();
                    activeUrl = url.replace(".html", "");
                }
                initCloudLocalization();
                enableIntroJs();

                if (!url.includes('allWebsites') && !url.includes('keywords')) {
                    prepareTranslation(url);
                }
                console.log('ajaxLoadToDiv success finish')
            }
        }
    });
}

function ajaxSimpleLoadToDiv(url, divId) {
    console.log('ajaxSimpleLoadToDiv url is ' + url);

    $.ajax({
        url: composeUrl(url),
        dataType: 'html',
        success: function (html) {
            if (divId) {
                $('#' + divId).html(html);
                initCloudLocalization()
                showHideTestingMode();
                // enableTooltips()
            }
        },
        async: false
    });
}

function ajaxResultToModal(url) {
    console.log('ajaxResultToModal url is ' + url);

    $.ajax({
        url: composeUrl(url),
        dataType: 'html',
        success: function (json) {
            console.log('ajax result ' + JSON.stringify(json));
            showModal('Result', JSON.parse(json)['status']);
        },
        async: false
    });
}

$(document).on('focus', ':not(.popover)', function () {
    $('.popover').popover('hide');
});

function ajaxLoadToDivAsync(url, divId) {
    $.get(url, function (data) {
        $("#" + divId).html(data);
        // alert( "Load was performed." );
    });
}

function getFormattedDate(date) {
    // console.log('date is ' + date);
    try {
        return date && date.length > 10 ? moment(date.slice(0, 10)).format('YYYY-MM-DD') : '';
    } catch (e) {
        return date;
    }
    // return date ? new Date(date.slice(0, 10)): '';
    // return date && moment().isValid(date) ? moment(date).format('YYYY-MM-DD') : '';
}

function getFormattedUrl(url) {
    // console.log('getFormattedUrl url ' + url)
    if (url) {
        if (url !== 'Awaiting') {
            let formattedUrl = decodeURI(url).replace("http://", "").replace("https://", "").replace("www.", "");
            if (url === '/') {
                formattedUrl = "Homepage";
            }
            // console.log('formattedUrl ' + formattedUrl);
            formattedUrl = removeLastSlash(formattedUrl)
            return "<a href='" + url + "' target='_blank'>" + formattedUrl + "</a>";
        } else {
            return url;
        }
    } else {
        return "";
    }
}

function getFormattedExternalUrl(url) {
    if (url) {
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }
        return "<a href='" + url + "' target='_blank'>" + url + "</a>";
    } else {
        return "";
    }
}

function getFormattedExternalMinifiedUrl(url) {
    try {
        if (url) {
            if (!url.startsWith('http')) {
                url = 'http://' + url;
            }
            return "<a href='" + url + "' target='_blank'>" + minifyDomainUrl(url) + "</a>";
        } else {
            return "";
        }
    } catch (e) {
        return "";
    }
}

function minifyDomainUrl(url) {
    // console.log('minifyDomainUrl url is ' + url);
    if (url) {
        url = url.replace(/^https?:\/\//, '').replace(/^http?:\/\//, '');
        url = removeLastSlash(url.toString());
        url = url.replace("www.", "");
    }
    url = encodeURIComponent(url);
    // console.log('minifyDomainUrl return ' + url);
    return url;
}

function removeLastSlash(site) {
    return site.replace(/\/$/, "");
}

function showPrevNextWebsite(dir) {
    let val = $('#inputSearchWebsite').val();
    var newIndex = availableWebsites.indexOf(val) + dir;
    console.log('showPrevNextWebsite ' + tabToShow);
    tabToShow = activeUrl;
    if (tabToShow === 'allWebsites') {
        tabToShow = 'dashboard';
    }
    if (newIndex == 0) {
        websiteSelect2.val(availableWebsites[availableWebsites.length - 2]).change();
    } else if (newIndex == availableWebsites.length - 1) {
        websiteSelect2.val(availableWebsites[1]).change();
    } else {
        websiteSelect2.val(availableWebsites[newIndex]).change();
    }
}

function formatCheckedOrUnChecked(data) {
    return data && data == true ? "<i class=\"fa-solid fa-check\"></i>" : "<p class=\"off-btn\">OFF</p>";
}

function formatNumber(val) {
    if (val == null || typeof val == 'string' || JSON.stringify(val) == '{}') {
        val = '-';
    } else {
        if (val % 1 == 0) {
            val = nFormatter(val, 1);
        } else {
            val = val.toFixed(2);
        }
    }
    return val;
}

function formatNumberRemoveDec(val) {
    if (!val || val == null || typeof val === 'string' || JSON.stringify(val) == '{}') {
        val = '-';
    } else {
        if (val % 1 == 0) {
            val = nFormatter(val, 1);
        } else {
            val = val.toFixed(0);
        }
    }
    return val;
}

function getUrlPath(url) {
    var urlSplit = url.split('/');
    var host = urlSplit[0] + "//" + urlSplit[2] + "/";
    var newURL = url.replace(host, '');
    return newURL;
}

function getFormattedExternalUrlPath(url) {
    try {
        if (url) {
            if (!url.startsWith('http')) {
                url = 'http://' + url;
            }
            return "<a href='" + url + "' target='_blank'>/" + getUrlPath(url) + "</a>";
        } else {
            return "";
        }
    } catch (e) {
        return "";
    }
}

function formatNumberGreenHigh(val, lowerThan, higherThan) {
    let result;
    if (val && val > 0) {
        if (val > higherThan) {
            result = "<span class='text-success'>" + formatNumberRemoveDec(val) + "</span>";
        } else if (val < lowerThan) {
            result = "<span class='text-danger'>" + formatNumberRemoveDec(val) + "</span>";
        } else {
            result = "<span class='text-warning'>" + formatNumberRemoveDec(val) + "</span>";
        }
    } else {
        result = formatNumberRemoveDec(val);
    }
    return result;
}

function formatNumberGreenLowPercent(val, lowerThan, higherThan, addPercent) {
    let result;
    if (val && val > 0) {
        if (val < lowerThan) {
            result = "<span class='text-success'>" + formatNumberRemoveDec(val) + "%</span>";
        } else if (val > higherThan) {
            result = "<span class='text-danger'>" + formatNumberRemoveDec(val) + "%</span>";
        } else {
            result = "<span class='text-warning'>" + formatNumberRemoveDec(val) + "%</span>";
        }
    } else {
        result = formatNumberRemoveDec(val);
    }
    return result;
}

function formatNum(val) {
    if (val == null || typeof val == 'string' || JSON.stringify(val) == '{}') {
        val = '0';
    } else {
        if (val % 1 == 0) {
            val = nFormatter(val, 1);
        } else {
            val = val.toFixed(2);
        }
    }
    return val;
}

function nFormatter(num, digits) {
    if (typeof num == 'string') {
        num = num.replace(/,/g, "");
    }
    const lookup = [
        {value: 1, symbol: ""},
        {value: 1e3, symbol: "K"},
        {value: 1e6, symbol: "M"},
        {value: 1e9, symbol: "G"},
        {value: 1e12, symbol: "T"},
        {value: 1e15, symbol: "P"},
        {value: 1e18, symbol: "E"}
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

function getLanguage() {
    if (!isLinksUser() && !isSEOlyUser() && !isEasySeoUser()) {
        console.log('getLanguage lang is ' + language);
        initCloudLocalization();
        if (language !== 'en' && language !== 'iw' && language !== 'de' && language !== 'fr' &&
            language !== 'el' && language !== 'es' && language !== 'it' && language !== 'ru' &&
            language !== 'zh' && language !== 'pt'
        ) {
            language = 'en';
        }
        $('select.cloudlocalization-selection').val(language).change();
        // if (language !== 'en') {
        //     location.reload();
        // }
        $('.cloudlocalization-selection').on('change', function () {
            // translatePopovers($('.cloudlocalization-selection').val())
            language = $('select.cloudlocalization-selection').val();
            changeLang();
            location.reload();
        });
    }
}

function changeLang() {
    if (typeof language != undefined) {
        $.ajax({
            type: 'POST',
            url: getApiUrl('changeLocaleGeneric'),
            dataType: 'json',
            data: {request_locale: language},
        });
        currTranslationArr = null;
    }
}

let linksLeft;

function refreshKeywordsUsageInForm() {
    let keywordsLeft = keywordsMax - keywordsUsed;
    console.log('refreshKeywordsUsageInForm keywordsLeft ' + keywordsLeft);
    if (keywordsLeft === 2) {
        $('.keywordsCreditsInfo').html('You have 2 keyword credits left.');
    } else if (keywordsLeft === 1) {
        $('.keywordsCreditsInfo').html('You have 1 keyword credit left.');
    } else if (keywordsLeft <= 0) {
        $('.keywordsCreditsInfo').html('You have no keywords credits left.');
    } else {
        $('.keywordsCreditsInfo').hide();
    }
    if (keywordsLeft <= 2) {
        $('.keywordsCreditsInfo').show();

        if (!isShabbat) {
            $('.keywordsCreditsInfo').append(" You can <a class='' href='javascript:callUpgradePage()' style=''>Upgrade</a> your subscription.");
        }
    }
}

function refreshLinksUsageInForm() {
    // console.log('start refreshLinksUsageInForm linksLeft ' + linksRequestMax + ' - ' + linksRequestUsed);
    if (isRabbitUI) {
        linksLeft = linksRequestMax - (linksRequestUsed ? linksRequestUsed : 0);
        // console.log('in refresh mainUserDetails[\'guestBlogsMax\'] ' + mainUserDetails['guestBlogsMax'] +
        //     ' mainUserDetails[\'guestBlogsUsed\'] ' + mainUserDetails['guestBlogsUsed']);
        let blogsLeft = mainUserDetails['guestBlogsMax'] - (mainUserDetails['guestBlogsUsed'] ? mainUserDetails['guestBlogsUsed'] : 0);
        if (!linksLeft || linksLeft < 0) {
            linksLeft = 0;
        }
        $('.linksUsageInfo label').addClass('text-muted');
        $('.linksUsageInfo label').addClass('linksInfo');
        let msg = 'You have <span style="color:#FEC200; ">' + linksLeft + '</span> <span>links left this month</span> ';
        if (blogsLeft > 0) {
            if (linksLeft === 0) {
                if (blogsLeft > 5) {
                    msg = ' You have <span style="color:#FEC200; ">' + blogsLeft + '</span> <span>guest blogs</span> '
                } else {
                    msg = ' You have <span style="color:#FEC200; ">' + blogsLeft + '</span> <span>free guest blog as a gift from us</span> '
                }
            } else {
                msg += ' and <span style="color:#FEC200; ">' + blogsLeft + '</span> <span>free guest blog as a gift from us</span> '
            }
        } else {
            $('.newGiftHeader').hide();
        }
        try {
            console.log('mainUserDetails[\'payAsYoGoBlogs\'] ' + mainUserDetails['payAsYoGoBlogs'])
            if (mainUserDetails['payAsYoGoBlogs'] && mainUserDetails['payAsYoGoBlogs'] > 0) {
                if (msg.indexOf('You have') !== -1) {
                    msg += ', and <span style="color:#FEC200; ">' + mainUserDetails['payAsYoGoBlogs'] + '</span> <span>guest blogs in Pay As You Go credits</span> '
                } else {
                    msg += ' You have <span style="color:#FEC200; ">' + mainUserDetails['payAsYoGoBlogs'] + '</span> <span>guest blogs in Pay As You Go credits</span> '
                }
            }
        } catch (e) {
        }
        console.log('refreshLinksUsageInForm msg is ' + msg);

        if (mainUserDetails && mainUserDetails['resetCreditDay'] && payingUser) {
            const resetMsg = 'Your monthly credits reset on the ' + mainUserDetails['resetCreditDay'] + 'th of every month.';
            const resetMsgTooltip = '<img src="' + assetsUrl + 'assets/images/home_icon/material-symbols_help.png" ' +
                'data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content="' +
                resetMsg + '" style="margin-left:5px; height: 18px;" class="linksUsageInfoHelp" alt="help">';
            $('span.resetMsgTooltip').html(resetMsgTooltip);
            msg += resetMsgTooltip;
        }
        $('.linksUsageInfo label').html(msg);

        if (!isShabbat && linksLeft <= 1) {
            $('.linksUsageInfo label').append(" <a class='' href='javascript:callUpgradePage()' style='color: #FEC200; margin-left:5px;'>Upgrade</a>");
        }
        console.log('linksLeft ' + linksLeft + ' blogsLeft ' + blogsLeft + 'mainUserDetails[\'payAsYoGoBlogs\'] ' + mainUserDetails['payAsYoGoBlogs']);

        if (linksLeft <= 0 && blogsLeft <= 0 && (!mainUserDetails['payAsYoGoBlogs'] || mainUserDetails['payAsYoGoBlogs'] <= 0)) {
            $('.noLinksUsageInfo').html('You have no credits left.');
            if (!isShabbat && linksLeft <= 1) {
                $('.noLinksUsageInfo').append(" You can <a class='' href='javascript:callUpgradePage()' style=''>Upgrade</a> your subscription " +
                    (!isShopifyUser() ? " or <a class='' href='javascript: showPayAsYouGoModal();' style=''>Buy Guest Blogs Credits</a> " : ""));
            }

            $('.noLinksUsageInfo').show();
            $('.linksUsageInfo').hide();
        } else {
            $('.noLinksUsageInfo').hide();
        }

        if (linksLeft <= 0) {
            $('.noListingsUsageInfo').html('You have no credits left.');
            if (!isShabbat && linksLeft <= 1) {
                $('.noListingsUsageInfo').append(" Please <a class='' href='javascript:callUpgradePage()' style=''>Upgrade</a> your subscription.");
            }

            $('.noListingsUsageInfo').show();
            $('.linksBuilderButton').hide();
        } else {
            $('.noListingsUsageInfo').hide();
        }
    }
}

function isUserEmailExist() {
    return mainUserDetails && mainUserDetails['email'] && mainUserDetails['email'].indexOf('@') !== -1;
}

function showHideAskUserEmail() {
    if (isUserEmailExist()) {
        $('.askUserEmail').hide();
    } else {
        $('.askUserEmail').show();
        // $('.askUserEmail input').val('info@' + minifyDomainUrl(mainUserDetails['wixUrl']));
    }
}

function addTooltipToSelector(selector, text) {
    addTooltipWithSubjectToSelector(selector, '', text);
}

function addTooltipWithSubjectToSelector(selector, subject, text, forceTooltip) {
    // console.log('addTooltipWithSubjectToSelector ' + selector + ' ' + subject + ' ' + text);
    if (text && text.length > 0) {
        const finalText = (subject && subject.length > 0 ? '<strong>' + subject + '</strong><br/><br/>' : '') + text;
        if (finalText.length < 500 || forceTooltip) {
            // console.log('addTooltipWithSubjectToSelector show tooltip length is ' + finalText.length + ' text is ' + finalText);
            $(selector).css('cursor', 'pointer');
            $(selector).attr('data-bs-container', 'body');
            $(selector).attr('data-bs-toggle', 'popover');
            $(selector).attr('data-bs-trigger', 'hover');
            $(selector).attr('data-bs-html', 'true');
            $(selector).attr('data-bs-content', finalText);
            // $(selector).tooltip({
            //     html: true,
            //     trigger: 'hover',
            //     delay: {
            //         show: "500",
            //         hide: "100"
            //     },
            // });
            enableTooltips();
        } else {
            // console.log('addTooltipWithSubjectToSelector show popover instead length is ' + finalText.length + ' text is ' + finalText);
            addPopoverToSelector(selector, finalText);
        }
    } else {
        console.log('Oops tooltip null for selector ' + selector);
    }
}

function createAndShowPopover(selector, text) {
    addPopoverToSelector(selector, text);
    $(selector).popover('show');
}

function addPopoverToSelector(selector, text) {
    if (text && text.length > 0) {
        text = '<span class="btn btn-link float-right pop-close">x</span>' + text;
        $(selector).css('cursor', 'pointer');
        $(selector).attr('data-bs-container', 'body');
        $(selector).attr('data-bs-toggle', 'popover');
        // $(selector).attr('data-bs-trigger', 'hover');
        $(selector).attr('data-bs-html', 'true');
        $(selector).attr('data-bs-content', text);
        $(selector).css('cursor', 'pointer');
        $(selector).popover({
            html: true,
            // trigger: 'hover',
            delay: {
                show: "200",
                hide: "100"
            },
        });
        $("body").delegate(".pop-close", "click", function () {
            $(selector).popover('hide');
        });
    } else {
        console.log('Oops popover null for selector ' + selector);
    }
}

// function addTooltipToSelectorClosestDiv(selector, text) {
//     $(selector).closest('div').attr('data-bs-container', 'body');
//     $(selector).closest('div').attr('data-bs-toggle', 'popover');
//     $(selector).closest('div').attr('data-bs-trigger', 'hover');
//     $(selector).closest('div').attr('data-bs-html', 'true');
//     $(selector).closest('div').attr('data-bs-content', text);
//     enableTooltips();
// }
function addslashes(string) {
    return string.replace(/\\/g, '\\\\').replace(/\u0008/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/'/g, '\\\'').replace(/"/g, '\\"');
}

function addModalToSelectorClosestDiv(selector, text) {
    if (payingUser) {
        text = addslashes(text);
        $(selector).attr('onclick', "openModalHtml('appDataModal',  '" + text + "', 'Failed Tests Overview')");
    } else {
        $(selector).attr('onclick', "showUpgradeModal('Would you like to upgrade your subscription to get all on page failed test?')");
    }
}

function addModalToHrefSelectorClosestDiv(selector, text) {
    if (payingUser) {
        text = addslashes(text);
        $(selector).attr('href', "javascript: openModalHtml('appDataModal',  '" + text + "', 'Failed Tests Overview')");
    } else {
        $(selector).attr('href', "javascript: showUpgradeModal('Would you like to upgrade your subscription to get all on page failed test?')");
    }
}

function addDescToSummary(summary, pageUrl, msg) {
    try {
        if (summary.length < 3000) {
            summary += getFormattedExternalMinifiedUrl(pageUrl) + ' - ' + msg + '<br /><br />';
        } else {
            if (!summary.endsWith('...')) {
                summary += '...';
            }
        }
    } catch (e) {
    }
    return summary;
}

function setUsageValues(data) {
    if (!isUserEmailExist() && mainUserDetails) {
        mainUserDetails['email'] = data['email'];
        showHideAskUserEmail();
    }
    websitesUsed = data['websitesUsed'];
    websitesMax = data['websitesMax'];
    keywordsUsed = data['keywordsUsed'];
    keywordsMax = data['keywordsMax'];
    researchUsed = data['researchUsed'];
    researchMax = data['researchMax'];
    linksRequestUsed = data['linksRequestUsed'];
    linksRequestMax = data['linksRequestMax'];
    if (researchUsed > researchMax) {
        researchUsed = researchMax;
    }
    if (linksRequestUsed < 0) {
        linksRequestUsed = 0;
    }
    linksRequestMax = data['linksRequestMax'];
    console.log('in setUsageValues mainUserDetails ' + JSON.stringify(mainUserDetails));
    if (mainUserDetails) {
        if (data['guestBlogsUsed']) {
            mainUserDetails['guestBlogsUsed'] = data['guestBlogsUsed'];
        }
        if (data['linksRequestUsed']) {
            mainUserDetails['linksRequestUsed'] = data['linksRequestUsed'];
        }
        if (data['payAsYoGoBlogs']) {
            mainUserDetails['payAsYoGoBlogs'] = data['payAsYoGoBlogs'];
        }
    }

    let creditUsed = data['creditsUsed'];
    let creditMax = data['creditsMax'];
    if (!creditUsed) creditUsed = 0;
    if (!creditMax) creditMax = 0;

    if (!payingUser) {
        $('div.usageFooter').attr('style', 'cursor: pointer');
        $('div.usageFooter').attr('onclick', 'callUpgradePage()');
    }
    if (data['websitesUsed'] === 1) {
        $('.myKeywords').html(data['keywordsUsed']);
    }
    if (isExternalUser()) {
        $('div#websiteUsageDiv').hide();
    } else {
        $('div#website_usage').html('<label>Websites</label>' + '<p>' + websitesUsed + '/' + websitesMax + '</p>');
        $('div#website_usage').prev('div.progress').children('div.progress-bar').css('width', websitesUsed / websitesMax * 100 + '%')
    }
    let creditsLeft = data['creditsMax'] - data['creditsUsed'];
    let blogsLeft = data['guestBlogsMax'] - data['guestBlogsUsed'];
    if (creditsLeft > 0 || blogsLeft === 0) {
        $('#availableCredits').html((creditsLeft < 0 ? '0' : creditsLeft) + ' Units');
    } else {
        $('#availableCredits').html(blogsLeft + ' Free Guest Blog');
    }
    $('div#credit_usage').html('<label>Credits</label>' + '<p>' + creditUsed + '/' + creditMax + '</p>');
    $('div#credit_usage').prev('div.progress').children('div.progress-bar').css('width', (creditMax > 0 ? (creditUsed / creditMax) : 0) * 100 + '%')
    $('div#keyword_usage').html('<label>Keywords</label>' + '<p>' + keywordsUsed + '/' + keywordsMax + '</p>');
    $('div#keyword_usage').prev('div.progress').children('div.progress-bar').css('width', keywordsUsed / keywordsMax * 100 + '%')
    $('div#research_usage').html('<label>Researches</label>' + '<p>' + researchUsed + '/' + researchMax + '</p>');
    $('div#research_usage').prev('div.progress').children('div.progress-bar').css('width', researchUsed / researchMax * 100 + '%')
    if (isWebsiteOwner) {
        $('div#websiteUsageDiv').hide();
        $('#linksBuilderUsageDiv').show();
        $('div#linksBuilder_usage').html('<label><span>Links Created</span> &#8725; mo<span class="resetMsgTooltip"></span> </label>' + '<p>' + linksRequestUsed + '/' + linksRequestMax + '</p>');
        $('div#linksBuilder_usage').prev('div.progress').children('div.progress-bar').css('width', linksRequestUsed / linksRequestMax * 100 + '%');

        refreshLinksUsageInForm();
    }
    $('.guestBlogsUsed').html(data['guestBlogsUsed']);
    $('.guestBlogsMax').html(data['guestBlogsMax']);
}

function refreshUsage() {
    $.getJSON(getApiUrl('getMyJsonUsageGeneric'), function (data) {
        console.log('getMyJsonUsageGeneric ' + JSON.stringify(data));
        data = JSON.parse(data['data']);
        setUsageValues(data);
        refreshLinksUsageInForm();
        refreshKeywordsUsageInForm();
    });
    if (isExternalUser()) {
        $('p#website_usage').parent().children().hide();
    }
}

function doRealRefreshUsage() {
    $.getJSON(getApiUrl('refreshUsageGeneric'), function (data) {
        console.log('getMyJsonUsageGeneric ' + JSON.stringify(data));
        data = JSON.parse(data['data']);
        if (data) {
            setUsageValues(data);
        }
    });
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

function hasAlertToShow(json) {
    let result = false;
    // console.log('hasAlertToShow ' + JSON.stringify(json));
    console.log('hasAlertToShow json[\'status\']' + json['status']);

    if (json) {
        if (json['status'] !== null && json['status'] !== 'success') {
            if (json['status'] && json['status'].length > 0 && json['status'].indexOf('No data') === -1) {
                if (!isLinksUI) {
                    if (!isShabbat && json.status.includes('You have reached') && daysCount > 2 && !shownBefore && keywordsUsed > 0 && !afterOnboarding) {
                        showUpgradeModal(json.status + ', would you like to upgrade to get more?');
                        shownBefore = true;
                    } else if (genericUpgradeShabbatMsg && keywordsUsed > 0 && !afterOnboarding) {
                        showModal('Sorry', genericUpgradeShabbatMsg, 'Close', '');
                        genericUpgradeShabbatMsg = null;
                    } else {
                        afterOnboarding = true;
                    }
                }
            } else if (json['status'] && json['status'].length > 0) {
                showModal('Message', json.status, 'Close', '');
            }
            $('.spinner-border').hide();
            result = true;
        }
    } else {
        $('.spinner-border').hide();
        result = true;
    }
    // console.log('checkStatus result ' + result);
    return result;
}

function addCurrKeywordTrack(element, i) {
    console.log('tabToShow ' + tabToShow);
    var jsonPost = keywordItems[i];
    jsonPost['ranked_serp_element.check_url'] = '';
    jsonPost = JSON.stringify(jsonPost);
    jsonPost = encodeURIComponent(jsonPost);
    console.log('addCurrKeywordTrack jsonPost is ' + jsonPost);

    $.ajax({
        type: 'POST',
        url: getApiUrl('addToTrackWithValuesKeywordForWebsite'),
        // dataType: 'json',
        data: getPostParams('url=' + $('#inputSearchWebsite').val() + '&keywordData=' + jsonPost),
        // contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (result) {
            console.log('addCurrKeywordTrack result ' + JSON.stringify(result));
            if (result.status) {
                if (result.status === 'limit') {
                    callUpgradePage();
                } else {
                    showModal("Message", result.status, "Close", "");
                }
            } else {
                if (isSeolyUI) {
                    $(element).html('<i class="fas fa-check active class"></i>');
                    $(element).addClass("active");
                } else {
                    $(element).html('<img src="/assets/images/home_icon/check-white.svg" alt="check">');
                    $(element).addClass("checked");
                }
                refreshUsage();
                needToRefreshKeywords = true;
                // if (daysCount < 3) {
                if (!shownBeforeKeywordAdded) {
                    if (isRabbitUI) {
                        fadeModalWithTime('', 'Great, Keyword was added, you can see it in the Keywords tab', 3000, true);
                    } else {
                        showModal("Message", "Keyword was added, you can see it in My Keywords tab", "Close", "");
                    }
                    setTimeout(function () {
                        $('#modalMessage').modal('hide');
                    }, 5000);
                    shownBeforeKeywordAdded = true;
                }
            }
        },
        complete: function (result) {
            console.log(result);
        }
    });
    refreshUsage()
}

quickAddWebsite = async () => {
    if (payingUser && websitesUsed < websitesMax) {
        let val = $('#inputSearchWebsite').val();
        $.ajax({
            type: 'POST',
            url: getApiUrl('quickAddWebsite'),
            data: 'siteUrl=' + val,
            success: function (result) {
                if (result.status) {
                    showModal("Message", result.status, "Close", "");
                } else {
                    $('#overviewOf').html('Overview of ' + val);
                    $('#quickAdd').hide();
                    var newOption = new Option(val, val, true, true);
                    websiteSelect2.append(newOption).trigger('change');
                    ajaxLoadToDiv("/assets/htmls/onboardingWebsite.html", 'tabData');
                    console.log(result);
                }
            },
            complete: function (result) {
                console.log(result);
            }
        });
    } else {
        showUpgradeModal(websitesLimitUpgrade);
    }
}

///////////////////////////////////Keyword/////////////////////////////////
function formatRank(rank) {
    if (!rank || rank == 0) {
        return "";
    } else {
        return rank;
    }
}

function hideRestRows(tableId, rowsToShow) {
    if (payingUser == false && rowsToShow < 100) {
        $('.upgradeBlock').attr("onclick", upgradeLink);
        $('.upgradeBlock').show();
        if (rowsToShow == -1) {
            $('table#' + tableId + ' tbody tr').css('opacity', 0.8);
        } else {
            $('table#' + tableId + ' tbody tr:gt(' + rowsToShow + ')').css('opacity', 0.8);
        }
        $('table#' + tableId + ' tbody tr').addClass('ignoreme');
    }
}

function formatNotEmptyVal(val) {
    return val && val != 'undefined' ? val : '';
}

function formatBiggerThanZeroVal(val) {
    return val && val !== 'undefined' && val !== '0' && val > 0 ? val : '';
}

function loadAjaxTabs() {
    $('[data-bs-toggle="tab"]').click(function (e) {
        var $this = $(this),
            loadurl = $this.attr('href'),
            targ = $this.attr('data-bs-target');
        // console.log('loadurl ' + loadurl + ' and targ ' + targ);
        if (loadurl && loadurl.length > 1) {
            $.get(loadurl, function (data) {
                // console.log('data is ' + data);
                $(targ).html(data);
                initCloudLocalization();
            });
        }

        $this.tab('show');
        return false;
    });
}

function getUrlJson(json) {
    return Object.keys(json).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(json[k])
    }).join('&')
}

// function adjustExportButtons(searchField, ourTable) {
//     adjustExportButtons(searchField, ourTable);
// }

let pdfScriptsLoaded = false;

function doSearch(searcVal, wrapperId, ourTable) {
    console.log('search val ' + searcVal);
    if (searcVal) {
        try {
            if (wrapperId && wrapperId === 'pagesGrid_wrapper') {
                searcVal = searcVal.replaceAll(mainUserDetails['wixUrl'], "");
                searcVal = searcVal.replaceAll(websiteData['websiteName'], "");
            }
            searcVal = removeLastSlash(searcVal);
            searcVal = searcVal.replaceAll("https://", "");
            searcVal = searcVal.replaceAll("http://", "");
            searcVal = searcVal.replaceAll("www.", "");
            console.log('new search ' + searcVal);
        } catch (e) {
        }
    }
    ourTable.search(searcVal).draw();
}

function adjustExportButtons(searchField, ourTable, parentDiv) {
    const parentSearch = parentDiv ? ('#' + parentDiv + ' ') : '';
    if (ourTable) {
        const rowsCount = ourTable.rows().count();
        console.log('adjustExportButtons rowsCount ' + rowsCount);

        if (rowsCount > 4) {
            $('li.actionkey_li a.ks_buttn').show();
            $('li.actionkey_li div.keywordSearch').show();
            const wrapperId = ourTable.table().node().id + '_wrapper';
            // console.log('activeTab ' + activeTab);
            console.log('table.table().node().id ' + wrapperId);
            let contDiv = $('#appDataModal').is(':visible') ? '#appDataModal ' : '';
            const tableDiv = $(contDiv + "#" + wrapperId);
            console.log('tableDiv ' + tableDiv)
            const divWithElements = tableDiv.parent().parent().parent().parent();
            // console.log('divWithElements ' + divWithElements.html());
            divWithElements.find(" a.xlsButton").click(function () {
                console.log('export excel for ' + wrapperId);
                $(contDiv + 'div#' + wrapperId + ' button.buttons-excel').click();
            });
            divWithElements.find(" a.copyButton").click(function () {
                $(contDiv + 'div#' + wrapperId + ' button.buttons-copy').click();
            });
            divWithElements.find(" a.printButton").click(function () {
                $(contDiv + 'div#' + wrapperId + ' button.buttons-print').click();
            });
            divWithElements.find(" a.pdfButton").click(function () {
                if (!pdfScriptsLoaded) {
                    pdfScriptsLoaded = true;
                    console.log('adding pdf make')
                    // $.getScript(apiUrl + '/assets/scripts/pdfmake.min.js', function() {
                    console.log('loaded pdfmake')
                    $.getScript(assetsUrl + 'assets/scripts/vfs_fonts.js', function () {
                        console.log('loaded vfs fonts')
                        $(contDiv + 'div#' + wrapperId + ' button.buttons-pdf').click();
                    });
                    // });
                } else {
                    $(contDiv + 'div#' + wrapperId + ' button.buttons-pdf').click();
                }
            });

            divWithElements.find("input.tableSearch").keyup(function () {
                clearTimeout(inputTimer);
                let searchVal = $(this).val();
                inputTimer = setTimeout(function () {
                    doSearch(searchVal, wrapperId, ourTable);
                }, 500);
            });
        } else {
            $('.keywordSearch').hide();
            // $('li.actionkey_li a.ks_buttn').parent().hide();
            $('.createNewButtonDiv').show();
        }
    }
}

function logObject(object) {
    if (object) {
        var output = '';
        for (var property in object) {
            output += property + ': ' + object[property] + '; ';
        }
        console.log('output ' + output);
    }
}

function adjustExportButtonsByParent(searchField, ourTable, parent) {
    if (useNewHome) {
        $("#" + parent + " .copyButton").click(function () {
            $("#" + parent + ' .buttons-copy').click();
        });
        $("#" + parent + " .xlsButton").click(function () {
            $("#" + parent + ' .buttons-excel').click();
        });
        $("#" + parent + " .printButton").click(function () {
            $("#" + parent + ' .buttons-print').click();
        });
        $("#" + parent + " .pdfButton").click(function () {
            $("#" + parent + ' .buttons-pdf').click();
        });
    } else {
        $("#" + parent + " #copyButton").click(function () {
            $('.buttons-copy').click();
        });
        $("#" + parent + " #xlsButton").click(function () {
            $('.buttons-excel').click();
        });
        $("#" + parent + " #printButton").click(function () {
            $('.buttons-print').click();
        });
        $("#" + parent + " #pdfButton").click(function () {
            $('.buttons-pdf').click();
        });
    }
    if (searchField && ourTable) {
        $("#" + parent + (useNewHome ? ' .' : ' #') + searchField).keyup(function () {
            ourTable.search($(this).val()).draw();
        });
    }
}

function adjustExportButtonsInner(searchField, ourTable) {
    if (!useNewHome) {
        $("#copyButtonInner").click(function () {
            $('.buttons-copy').click();
        });
        $("#xlsButtonInner").click(function () {
            $('.buttons-excel').click();
        });
        $("#printButtonInner").click(function () {
            $('.buttons-print').click();
        });
        $("#pdfButtonInner").click(function () {
            $('.buttons-pdf').click();
        });
        if (searchField && ourTable) {
            $('#' + searchField).keyup(function () {
                ourTable.search($(this).val()).draw();
            });
        }
    }
}

var tableColsSettings;

function addTooltipToTableHeader(column, tooltip) {
    if (!mainUserDetails || !mainUserDetails.extraData || !mainUserDetails.extraData.displaySettings || !mainUserDetails.extraData.displaySettings.tooltips || mainUserDetails.extraData.displaySettings.tooltips === 'show') {
        let th = $(column.header());
        // console.log('addTooltipToTableHeader ' + th.html());
        th.attr('data-bs-toggle', 'popover');
        th.attr('data-bs-trigger', 'hover focus');
        th.attr('data-bs-placement', 'top');
        th.attr('data-bs-content', tooltip);
        // th.attr("data-intro", $(th).attr("data-bs-content"));
        // new bootstrap.Popover(th);
    }
}

function applyCols(json, ourTable, columns, tableName) {
    // console.log('applyCols ' + json);
    if (json) {
        json = JSON.parse(json);
        ourTable.columns().every(function (index) {
            let currCol = columns[index];
            let name = currCol.name;
            let checked = currCol.visible;
            if (json[name]) {
                checked = json[name] === 'on';
            }
            // if (!checked) checked = false;
            let column = ourTable.column(index);
            // console.log('curr col ' + name + '-' + json[name] + " and check visible " + column.visible() + ": " + checked);
            if (name && column.visible() !== checked) {
                // column.visible(checked && checked !== 'undefined');
                if (checked && checked !== 'undefined') {
                    // console.log('set ' + name + ' to true checked is ' + checked);
                    column.visible(true);
                } else {
                    // console.log('set ' + name + ' to false checked is ' + checked);
                    column.visible(false);
                }
            }
            if (checked) {
                // console.log('applyCols addTooltipToTableHeader ' + name);
                addTooltipToTableHeader(column, currCol.tooltip);
            }
            $('#check' + name).prop('checked', checked);
        });
        enableTooltips();
    }
}

function saveColHideShow(json, obj) {
    // var json = Object.fromEntries(formData);
    console.log('saveColHideShow ' + JSON.stringify(json));
    $.ajax({
        type: 'POST',
        url: getApiUrl('saveColSettingsGeneric'),
        data: getPostParams('tableName=' + obj + '&tableSettings=' + JSON.stringify(json)),
        success: function (result) {
            tableColsSettings = null;
        }
    });
}

function initShowHideColumns(obj, ourTable) {
    // console.log('initShowHideColumns for ' + obj + ' and table is ' + ourTable.table().node().id);
    if (!isDev()) {
        var showHideCols = "";

        if (ourTable && ourTable.settings() && ourTable.settings().init() && ourTable.settings().init().columns) {
            var columns = ourTable.settings().init().columns;
            const showHideColsId = '#showHideCols' + ourTable.table().node().id;
            ourTable.columns().every(function (index) {
                let title = columns[index].title;
                let name = columns[index].name;
                let tooltip = columns[index].tooltip;
                if (name) {
                    let colVisible = columns[index].visible;
                    let hideCol = columns[index].hideCol;
                    let showHideGroup = columns[index].showHideGroup;
                    // console.log(name + ': ' + colVisible);
                    let visible = colVisible ? 'checked' : '';
                    let tooltipHtml = '';
                    if (tooltip) {
                        tooltipHtml = 'data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="' + tooltip + '"';
                    }
                    if (showHideGroup && showHideGroup !== "General" && title.length > 0) {
                        let currLi = '<li><input type="checkbox" name="' + name + '" col-index="' + index + '" class="checkHideShow" id="check' + name + '"' + visible +
                            ' <label for="check' + name + '"><span ' + tooltipHtml + '>' + getTranslationWord(title.replaceAll('<br>', ' ').replaceAll('<br />', ' ')) + ' </span></label></li>';
                        if (!hideCol && $(showHideColsId + showHideGroup) && $(showHideColsId + showHideGroup).html() && $(showHideColsId + showHideGroup).html().indexOf(name) === -1) {
                            // console.log('add to ' + (showHideColsId + showHideGroup) + ' currLi ' + currLi);
                            $(showHideColsId + showHideGroup).append(currLi);
                        }
                    } else if (title.length > 0) {
                        if (!hideCol) {
                            if ($(showHideColsId) && $(showHideColsId).html() && $(showHideColsId).html().indexOf(name) === -1) {
                                showHideCols += '<li ' + tooltipHtml + '><input type="checkbox" name="' + name + '" col-index="' + index + '" class="checkHideShow" id="check' + name + '"' + visible +
                                    ' <label for="check' + name + '">' + getTranslationWord(title.replaceAll('<br>', ' ').replaceAll('<br />', ' ')) + '&nbsp;</label></li>';
                                // console.log('add to showHideCols' + showHideCols);
                            }
                        }
                    }

                    if (visible && thBreakLine) {
                        let th = $(ourTable.column(index).header());
                        th.html(th.html().replaceAll(' ', '<br>'))
                    }
                    if (visible && tooltip) {
                        // console.log('initShowHideColumns addTooltipToTableHeader ' + name);
                        addTooltipToTableHeader(ourTable.column(index), tooltip);
                    }
                }
            })
            $(showHideColsId).append(showHideCols);

            // prepareTranslation('allWebsites.html');
            $('input.checkHideShow').change(function (e) {
                e.preventDefault();
                var column = ourTable.column($(this).attr('col-index'));
                const colName = ourTable.settings().init().columns[$(this).attr('col-index')].name;
                const checkVal = $(this).prop("checked");
                console.log('clicked checkHideShow val is ' + checkVal);

                if (colName && (colName.includes('Chart') || colName.includes('Historical'))) {
                    saveColHideShow(getFormDValues(saveColHideShowFormKeyword), 'keywordsTable');
                    location.reload();
                } else {
                    console.log('click button ' + $('.btnkeywordsTable').html());
                    // $('.btnkeywordsTable').click();
                    column.visible(checkVal);
                }
            })
            // console.log('tableColsSettings: ' + JSON.stringify(tableColsSettings));
            if (!tableColsSettings) {
                $.getJSON(getApiUrl('getMyJsonReadColsSettingsGeneric'), function (json) {
                    tableColsSettings = JSON.parse(json["data"]);
                    console.log('getMyJsonReadColsSettingsGeneric ' + JSON.stringify(tableColsSettings));
                    if (tableColsSettings) {
                        applyCols(tableColsSettings[obj], ourTable, columns, obj);
                    }
                });
            } else {
                console.log('tableColsSettings[obj] obj is ' + obj + ': ' + tableColsSettings[obj]);
                if (tableColsSettings[obj]) {
                    applyCols(tableColsSettings[obj], ourTable, columns, obj);
                }
            }
        }

        initCloudLocalization();
        enableTooltips();
    }
}

function prepareTranslation(url) {

}

var smallChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        tooltip: {
            xAlign: "right",
            enabled: true,
        },
        legend: {
            display: false
        }
    },
    legend: {
        display: false
    },
    scales: {
        y: {
            display: false,
            grid: {
                display: false,
            }
        },
        x: {
            ticks: {
                display: false
            },
            grid: {
                display: false
            }
        }
    }
}
var chartoptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
        enabled: false
    },
    scales: {
        y: {
            display: false,
            grid: {
                display: false,
            }
        },
        x: {
            ticks: {
                display: false
            },
            grid: {
                display: false
            }
        }
    },
    legend: {
        display: false
    },
    scales: {
        xAxes: [{display: false}],
        yAxes: [{display: false}],
    }
};

$(document).on({
    ajaxStart: function () {
        // $("body").addClass("loading");
    },
    ajaxStop: function () {
        // $("body").removeClass("loading");
    }
});

function initCloudLocalization() {
    console.log('initCloudLocalization lang is ' + language);
    cloudLocalization({
        defaultLanguage: "en", // optional | The main language used.
        urlLanguageLocation: UrlLanguageLocation.none, // optional | To append language in the url (ex: www.website.com/en/).
        translatorProvider: TranslatorProvider.none, // optional | Translate text using a translator provider.
        translatorProviderKey: "", // optional | The translator provider key.
        logTranslationsFromProvider: false, // optional | Set to true to log the translation output in the console.
        languages: [
            {
                code: "en",
                displayName: "English"
            },
            {
                code: "es",
                displayName: "Spanish"
            },
            {
                code: "fr",
                displayName: "Français"
            },
            {
                code: "de",
                displayName: "German"
            },
            {
                code: "it",
                displayName: "Italian"
            },
            {
                code: "ru",
                displayName: "Russian"
            },
            {
                code: "zh",
                displayName: "Chinese"
            },
            {
                code: "pt",
                displayName: "Portuguese"
            },
            {
                code: "el",
                displayName: "Greek"
            },
            // {
            //   code: "ar",
            //   displayName: "العربية",
            //   direction: LanguageDirection.rtl
            // },
            {
                code: "iw",
                displayName: "עברית",
                direction: LanguageDirection.rtl
            },
        ]
    });
    if (!isDev()) {
        translatePopovers($('.cloudlocalization-selection').val());
    }
}

//Sidebar Header JS
$(document).ready(function () {
    // $('[data-bs-toggle="popover"]').popover();
    $('.toggle-button').click(function () {
        $('body').toggleClass("sidebar-toggle");
    });
    $("a[id^=show_]").click(function (event) {
        $("#extra_" + $(this).attr('id').substr(5)).slideToggle("slow");
        event.preventDefault();
    });
});
$(function () {
    $('.dropdown-menu a').click(function () {
        // console.log($(this).attr('data-value'));
        $(this).closest('.dropdown').find('input.searchLinks')
            .val($(this).attr('data-value'));
    });
    $('li[data-bs-toggle="popover"]').mouseover(function () {
        if (!$('body').hasClass('sidebar-toggle')) {
            $('.popover').css('opacity', 0)
        } else {
            $('.popover').css('opacity', 1)
        }
    });
});

$(document).ready(function () {
    $('.sidebar-navlist ul li a').click(function () {
        $('li a').removeClass("active");
        $(this).addClass("active");
    });
    $('.main-nav-link').click(function () {
        $('[data-bs-parent="#sidebar-ul]').removeClass('show');
        $('[data-bs-toggle="collapse"]').attr("aria-expanded", "false");
    });
});
//Link History page

// let defaultTableSettings = {
//     destroy: true,
//     buttons: ['copy', 'excel', 'print', {extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'}],
//     "dom": '<"dt-buttons"Bf><"clear">firtlp',
//     info: false,
//     // paging:   false,
//     // responsive: true,
//     fixedHeader: true,
//     deferRender: true,
//     scrollY: 700,
//     scrollCollapse: true,
//     scroller: true,
//     "bFilter": true
// };
let defaultTableSettings = {
    destroy: true,
    buttons: ['copy', 'excel', 'print', {extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'}],
    "dom": '<"dt-buttons"Bf><"clear">firtlp',
    info: false,
    // paging:   false,
    // responsive: true,
    fixedHeader: true,
    deferRender: true,
    scrollY: 1000,
    scrollCollapse: true,
    scroller: true,
    select: true,
    "bFilter": true,
    "columnDefs": [{
        "targets": 'no-sort',
        "orderable": false,
    }],
};
let defaultTableNoScrollSettings = {
    destroy: true,
    buttons: ['copy', 'excel', 'print', {extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'}],
    "dom": '<"dt-buttons"Bf><"clear">firtlp',
    info: false,
    paging: false,
    // responsive: true,
    fixedHeader: true,
    deferRender: true,
    select: true,
    "bFilter": true,
    "columnDefs": [{
        "targets": 'no-sort',
        "orderable": false,
    }],
};

function storeTranslationJson() {
    var ignoreTags = ['script', 'style'];
    var elements = document.body.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
        var current = elements[i];

        if (ignoreTags.indexOf(current.tagName.toLowerCase()) == -1 && current.hasAttribute("data-bs-content")) {
            if (translationArray.find(item => item.o == current.getAttribute("data-bs-content")) == undefined) {
                translationArray.push(
                    {
                        "o": current.getAttribute("data-bs-content"),
                        "t": ""
                    }
                );
            }
        }
        if (ignoreTags.indexOf(current.tagName.toLowerCase()) == -1 && current.children.length === 0 && current.textContent.replace(/ |\n/g, '') !== '') {
            if (!new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(current.textContent)) {
                if (translationArray.find(item => item.o == current.textContent) == undefined && /[a-zA-Z]/.test(current.textContent)) {
                    translationArray.push(
                        {
                            "o": current.textContent,
                            "t": ""
                        }
                    );
                }
            }
        }
    }
}

function createTranslationJsonFile() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(translationArray)));
    element.setAttribute('download', 'temp');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function isExternalUser() {
    return appDomainName !== 'Links4u' && appDomainName !== 'Rabbit SEO';
    // return isWixUser() && appDomainName.indexOf('Shopify') !== -1;
}

function isTestUser() {
    // return true;
    // console.log('userEmail ' + mainUserDetails["email"]);
    return (mainUserDetails["email"] === 'Ronchuke@gmail.com' || mainUserDetails["email"] === 'a0548596234@gmail.com' || mainUserDetails["email"] === 'smartseosales@gmail.com');
}

function refreshUserDetails() {
    $.getJSON(getApiUrl('getMyJsonMainDetailsGeneric'), function (json) {
        console.log('refreshUserDetails ' + JSON.stringify(json));
        json = JSON.parse(json['data']);
        mainUserDetails = json;
        $('#usernameSpan').html('Hello ' + mainUserDetails["firstName"]);
        setUserDetailsValues();
        setUserDetailsFromJson(json);
        refreshUsage();
    });
}

function refreshUserDetailsSync() {
    $.ajaxSetup({async: false});
    refreshUserDetails();
    $.ajaxSetup({async: true});
}

function saveFormAndRefreshDetails(btn, showModal, func) {
    saveForm(btn, func);
    $('#settingModalContent').remove();
    if (showModal==null || showModal===true)
        fadeModalWithTime("", "Details Successfully Updated", 2000, true);
    setTimeout(function () {
        refreshUserDetails();
    }, 1000);
}

function saveForm(btn, func) {
    var form = $(btn).closest('form');
    let formId = form.attr("id");
    console.log("form id " + formId);
    let data = getFormValues(form);

    console.log('saveForm2 ' + Object.keys(data));
    console.log('saveForm2 ' + Object.values(data));
    let responseDiv = '#' + formId + ' div.alert-success';
    $(responseDiv).hide();

    $.ajax({
        type: 'POST',
        url: apiUrl + formId,
        data: data,
        success: function (result) {
            console.log('success ' + JSON.stringify(result));
            if (result.status && result.status != 'true') {
                showModal("Message", result.status, "Close", "");

                if (func!=null)
                    func(result.status);
            } else {
                refreshUserDetails();
                $(responseDiv).show();
                if (func!=null)
                    func("");
            }
        },
        error: function() {
            if (func!=null)
                func(null);
        },
        complete: function (result) {
            // console.log('complete ' + JSON.stringify(result));
        }
    });
}

function saveOnBoardingForm(form, btn) {
    makeButtonLoading(btn);
    let result = true;
    let formId = form.attr("id");
    console.log("form id " + formId);
    let data = getFormValues(form);
    console.log('saveOnBoardingForm values ' + Object.values(data));

    $.ajax({
        type: 'POST',
        url: apiUrl + formId,
        data: data,
        success: function (json) {
            console.log('success ' + JSON.stringify(json));
            if (json.status && json.status !== 'true') {
                showModal("Message", json.status, "Close", "");
                result = false;
            }
        },
        async: false
    });
    releaseButtonLoading(btn);
    return result;
}

function ajaxSubmitForm(formId) {
    console.log("form id " + formId);
    // makeButtonLoading('#' + formId + ' button');
    let result = '';
    try {
        let form = $('#' + formId);
        let data = getFormValues(form);
        console.log('ajaxSubmitForm values ' + JSON.stringify(data));
        const url = getApiUrl(formId);
        console.log('url is ' + url);

        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            // dataType: 'json',
            // contentType: 'json',
            success: function (json) {
                console.log('success ' + JSON.stringify(json));
                result = json.status;
            },
            async: false
        });
        // releaseButtonLoading('#' + formId + ' button');
        console.log('ajaxSubmitForm return result ' + result);
    } catch (e) {
        logError(e + ' form ' + formId);
        result = 'error in fields';
    }
    return result;
}

function ajaxSubmitFormNoWait(formId) {
    console.log("form id " + formId);
    let form = $('#' + formId);
    let data = getFormValues(form);
    console.log('ajaxSubmitForm values ' + JSON.stringify(data));
    const url = apiUrl + formId;
    console.log('url is ' + url);

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        async: true
    });
}

function ajaxSubmitFormGetFullResult(formId) {
    console.log("form id " + formId);
    // makeButtonLoading('#' + formId + ' button');
    let result = '';
    let form = $('#' + formId);
    let data = getFormValues(form);
    console.log('ajaxSubmitForm values ' + JSON.stringify(data));

    $.ajax({
        type: 'POST',
        url: apiUrl + formId,
        data: data,
        success: function (json) {
            console.log('success ' + JSON.stringify(json));
            result = json;
        },
        async: false
    });
    // releaseButtonLoading('#' + formId + ' button');
    console.log('ajaxSubmitForm return result ' + result);
    return result;
}

function fillForm(frm, data) {
    console.log('form is ' + frm + ' data is ' + JSON.stringify(data));
    $.each(data, function (key, value) {
        if (value && value.length > 0) {
            // console.log(key);
            $('[name=' + key + ']', frm).val(value);
            $('[id=' + key + ']', frm).prop("checked", value);
        }
    });
}

let competitorDomain;
let myLandingPageHref;
let showingCompNow = false;

function showCompResearch(tab, domain, title) {
    if (true) {
        historyPushState('comp-research-' + tab, 'Domain Research ' + tab);
        // if (payingUser && hasCredits()) {
        competitorDomain = domain;
        $('#ranksExplorer').html('');
        if (!useNewHome) {
            $('#compResearch').show();
            ajaxLoadToDiv('/assets/htmls/' + tab + '.html', 'compResearch');
            if (title && title.length > 0) {
                $('#competitorsTitle').html("<div class=\"page-title d-flex align-items-center justify-content-between mb-20px\">" +
                    "        <div class=\"d-flex align-items-center align-items-center\"><h3 class=\"dash-title mb-0\"> " + competitorDomain + " <span>" + title + "</span></h3></div></div>")
            }
            $('#competitorsTitle').show();
            $('#backToCompetitorsLink').show();
        } else {
            if (title && title.length > 0) {
                title = "<div class=\"page-title d-flex align-items-center justify-content-between mb-20px\">" +
                    "        <div class=\"d-flex align-items-center align-items-center\"><h3 class=\"dash-title mb-0\"> " + competitorDomain + " <span>" + title + "</span></h3></div></div>";
                $('#competitorsTitle').html(title)
            }
            openModal('/assets/htmls/' + tab + '.html', title);
        }
    } else {
        showUpgradeModal('Upgrade your account to get more results, would you like to upgrade now?');
    }
}

function getMyUrlOrComp() {
    let url = $('#inputSearchWebsite').val();
    if (competitorDomain) {
        url = competitorDomain;
        if (!payingUser) {
            url = 'amazon.com';
        }
        console.log('getMyUrlOrComp reset competitorDomain ' + competitorDomain)
        competitorDomain = null;
        showingCompNow = true;
    } else {
        if (!url) {
            url = mainUserDetails['wixUrl'];
        }
    }
    return url;
}

function loadSearchEngineSelect() {
    // console.log('start loadSearchEngineSelect availableSearchEngines ' + availableSearchEngines.length);
    searchEngineSelect = $("#searchEngineSelect").select2({
        tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: availableSearchEngines,
        width: "100%",
    });
    searchEngineSelect.val(searchEngine).change();
    // console.log('apply search engines size ' + availableSearchEngines.length);
    $(".searchEngineSelect").select2({
        tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: availableSearchEngines,
        width: "100%",
    });
    $(".searchEngineSelect").val(searchEngine).change();
}

var i = 0;

function makeProgress() {
    if (i < 100) {
        i = i + 1;
        $(".loadingProgressBar .progress-bar").css("width", i + "%").text(i + "%");
    }

    // Wait for sometime before running this script again
    setTimeout("makeProgress()", 1000);
}

function makeModalFastProgress(interval) {
    if (i < 100) {
        i = i + 1;
        $("#modalLoadingProgressBar .progress-bar").css("width", i + "%").text(i + "%");

        if (!interval) {
            interval = 70;
        }
        // console.log('makeModalFastProgress interval ' + interval)
        setTimeout("makeModalFastProgress()", interval);
    }
}

// var ourProgressBar = $('.js-loading-bar');
function animateProgressBar(title, text, interval) {
    // ourProgressBar = $('.js-loading-bar');
    console.log('start animateProgressBar title is ' + title + ' text is ' + text);
    $('.js-loading-bar h5.modalLoadingTitle').html(title);
    $('.js-loading-bar h5.modalLoadingText').html(text);
    $('#modalLoadingProgressBar').show();
    $('#percentProgress').show();
    $('#nonPercentProgress').hide();
    i = 0;
    makeModalFastProgress(interval);
    $('.js-loading-bar').modal('show');
    // setTimeout("hideProgressBar()", 10000);
}

function animateLongProgressBar(title, text) {
    // ourProgressBar = $('.js-loading-bar');
    console.log('start animateLongProgressBar title is ' + title + ' text is ' + text);
    $('.js-loading-bar h5.modalLoadingTitle').html(title);
    $('.js-loading-bar h5.modalLoadingText').html(text);
    $('#modalLoadingProgressBar').show();
    $('#nonPercentProgress').show();
    $('#percentProgress').hide();
    $('.js-loading-bar').modal('show');
    // setTimeout("hideProgressBar()", 10000);
}

function hideProgressBar() {
    console.log('hideProgressBar ourProgressBar');
    // $('#modalLoadingProgressBar').hide();
    // $('.js-loading-bar').hide();
    $('.js-loading-bar').modal('hide');
}

function makeButtonLoading(btn) {
    console.log('makeButtonLoading');
    if (btn) {
        btn = $(btn);
        btn.prop("disabled", true);
        btn.prepend('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
        // btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' + btn.html());
    }
    // console.log('makeButtonLoading');

}

function releaseButtonLoading(btn) {
    console.log('releaseButtonLoading');
    if (btn) {
        btn = $(btn);
        btn.prop("disabled", false);
        const html = btn.html();
        if (html) {
            btn.html(html.replace('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>', ''));
        }
    }

}

function generateWebsiteReport(url) {

}

function animateToDiv(divTo) {
    $('html, body').animate({
        scrollTop: $("#" + divTo).offset().top
    }, 500);
}

function isOpenFirstRow() {
    return false;
    // return keywordsUsed < 10;
}

function isOpenBelowTable() {
    // console.log('mainUserDetails.extraData.displaySettings.showDetailsBelowTable ' + mainUserDetails.extraData.displaySettings.showDetailsBelowTable);
    return false;
    // return daysCount < 10 || mainUserDetails.extraData && mainUserDetails.extraData.displaySettings && mainUserDetails.extraData.displaySettings.showDetailsBelowTable && mainUserDetails.extraData.displaySettings.showDetailsBelowTable === 'true';
}

function loadUserLogo() {
    console.log('loadUserLogo start')
    console.log('mainUserDetails[\'hasCover\'] ' + mainUserDetails['hasCover']);
    console.log('mainUserDetails[\'guid\'] ' + mainUserDetails['guid']);
    if (mainUserDetails['hasCover'] && mainUserDetails['guid']) {
        $('img#logoImg').show()
        $('i#logoIcon').hide()
        $('p#logoP').hide()
        $('img#logoImg').attr('src', (isTestingMode() ? 'https://dlnil54eooeso.cloudfront.net/' : assetsUrl) + 'logos/' + mainUserDetails['guid'] + '.png');
    }
}

function changeImg() {
    console.log('start changeImg');
    const [file] = pdfImage.files
    console.log('changeImg file is ' + file);
    if (file) {
        var property = document.getElementById('pdfImage').files[0];
        var image_name = property.name;
        var image_extension = image_name.split('.').pop().toLowerCase();

        if (jQuery.inArray(image_extension, ['gif', 'jpg', 'jpeg', 'png']) == -1) {
            alert("Invalid image file");
        } else {
            $('img#logoImg').show()
            $('i#logoIcon').hide()
            $('p#logoP').hide()
            if (document.getElementById('logoImg') != null) {
                logoImg.src = URL.createObjectURL(file)
            }
        }

        var form_data = new FormData();
        form_data.append("userImage", property);

        $.ajax({
            url: getApiUrl('saveImgUser?pdfImage=true'),
            method: 'POST',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {
                $('#msg').html('Loading......');
            },
            success: function (data) {
                console.log('saveImgUser success data ' + JSON.stringify(data));
                $('#msg').html(data);
                refreshUserDetails();
            }
        });
    }
}

function deleteImage(fileName) {
    // if (isConfirmDelete()) {
    if (isRabbitUI) {
        showModal('Confirm', 'Are you sure you want to delete this image?', 'No', 'Yes');
        $('div#modalMessage button#modalSecondButton').click(function () {
            $.getJSON(getApiUrl('delGalleryImgUser?fileName=' + fileName), function (json) {
                showGalleryFromJson(json);
            });
        });
    } else {
        $.getJSON(getApiUrl('delGalleryImgUser?fileName=' + fileName), function (json) {
            showGalleryFromJson(json);
        });
    }
    // } else {
    //     $.getJSON(apiUrl + 'delGalleryImgUser?fileName=' + fileName, function (json) {
    //         showGalleryFromJson(json);
    //     });
    // }
}

function uploadImageUrlGallery(form, param) {
    console.log('start uploadImage');

    $.ajax({
        url: getApiUrl(form),
        method: 'POST',
        data: 'imageUrl=' + param,
        beforeSend: function () {
            $('.uploadBlogImgLinkResult').show();
            $('.uploadBlogImgLinkResult').html('Loading......');
        },
        success: function (data) {
            // if (isRabbitUI) {
            showGalleryFromJson(data);
            if (isRabbitUI) {
                fadeModalWithTime('', 'Your Image was successfully uploaded', 1000, true);
            }
            // }
        }
    });
}

function uploadImageGallery(form) {
    console.log('start uploadImage');

    var formData = new FormData();
    formData.append("userImage", userImage.files[0]);

    $.ajax({
        url: getApiUrl(form),
        method: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
            $('.uploadBlogImgLinkResult').show();
            $('.uploadBlogImgLinkResult').html('Loading......');
        },
        success: function (data) {
            showGalleryFromJson(data);
            if (isRabbitUI) {
                fadeModal('Success', 'Your Image was successfully uploaded', 4000, false);
            }
        }
    });
}

function changeLogo() {
    console.log('start changeLogo');
    pdfImage.click();
}

// Input in html: <input type='file' name="fileInput" id="fileInput">
function uploadAvatar(func) {
    console.log('start uploadAvatar fileInput is ' + fileInput.files[0])
    let retVal;
    let formData = new FormData();
    formData.append('userFile', fileInput.files[0]);

    $.ajax({
        url: getApiUrl('uploadUserAvatarGeneric'),
        method: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
            console.log('uploadFile data ' + JSON.stringify(data));
            if (data['obj']) {
                retVal = data['obj'];
                if (func)
                    func(retVal);
            } else {
                if (func)
                    func(null);
            }
        },
        error: function() {
            if (func)
                func(null);
        }
    });
    return retVal;
}

function uploadFile() {
    let retVal;
    // Input in html: <input type='file' name="fileInput" id="fileInput" onchange="uploadFile()">
    let formData = new FormData();
    formData.append('userFile', fileInput.files[0]);

    $.ajax({
        url: getApiUrl('uploadUserFileGeneric'),
        method: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
            console.log('uploadFile data ' + JSON.stringify(data));
            if (data['obj']) {
                retVal = data['obj'];
            }
        }
    });
    return retVal;
}

function uploadFile(file, func) {
    let formData = new FormData();
    formData.append('userFile', file);

    $.ajax({
        url: getApiUrl('uploadUserFileGeneric'),
        method: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            console.log('uploadFile data ' + JSON.stringify(data));
            let retVal = data?.obj || null;
            func(retVal);
        },
        error: function() {
            func(null);
        }
    });
}

function getWebsitesList() {
    let retVal;

    $.ajax({
        url: getApiUrl('miniListJsonWebsite'),
        method: 'POST',
        async: false,
        success: function (result) {
            console.log('getWebsitesList ' + JSON.stringify(result));
            if (result['list']) {
                retVal = result['list'];
            }
        }
    });
    return retVal;
}

function loadAddKeywordsSelect() {
    const keywordsToAdd = keywordsMax - keywordsUsed;
    console.log('loadAddKeywordsSelect keywordsToAdd ' + keywordsToAdd)
    if (suggestedKeywords.length > 0) {
        const searchInputPlaceholder = 'Enter the keywords you want to promote';
        // const searchInputPlaceholder = 'Enter the keywords you want to promote' + (suggestedKeywords.length > 1 ? ' or choose from the list' : '');
        $("#keywordTermSelect").select2({
            tokenSeparators: [',', ', ', '\n'],
            selectOnClose: true,
            data: suggestedKeywords, tags: true,
            maximumSelectionLength: keywordsToAdd === 0 ? 1 : keywordsToAdd,
            placeholder: searchInputPlaceholder,
            searchInputPlaceholder: searchInputPlaceholder
        });

        // $('#keywordsSelectContDiv').show();
        // $('#keywordsTextContDiv').hide();
    } else {
        const placeHolderText = 'Enter your desired keywords, one in each line.';
        // const placeHolderText = 'Enter your desired keywords, one in each line. You can add up to ' + keywordsToAdd + ' keywords.';
        $('#keywordTerm').attr('placeholder', placeHolderText)
        showKeywordsSelect = false;
        // $('#keywordsSelectContDiv').hide();
        // $('#keywordsTextContDiv').show();
    }
}

// function loadUserImage() {
//     const imageUrl = 'UserLogo?pdfImage=true&ignoreDefault=true';
//     $.ajax({
//         url: apiUrl + imageUrl,
//         success: function (data) {
//             console.log('UserLogo data ' + data.length);
//             // console.log('UserLogo data ' + data);
//             // console.log('UserLogo data ' + JSON.stringify(data));
//             if (data && data.length > 0) {
//                 $('img#logoImg').show()
//                 $('i#logoIcon').hide()
//                 $('p#logoP').hide()
//                 $('img#logoImg').attr('src', apiUrl + imageUrl);
//             }
//         },
//         async: false
//     });
// }

function getButton(item, price, yearly) {
    const shopifyUser = isShopifyUser();
    // console.log('mainUserDetails ' + JSON.stringify(mainUserDetails));
    // console.log('getButton shopifyUser ' + shopifyUser);
    if (shopifyUser) {
        return '<a class="w-100 btn btn-lg ' + (packageName == item['planName'] ? 'btn-primary' : 'btn-outline-primary') + '" href="' + getApiUrl('/shopifyPaymentUser?id=' + item['packageId'] + (yearly ? "&yearly=true" : "")) + '">Choose Plan</a>';
    } else {
        if (isSeolyUI) {
            return '<button type="button" class="w-100 btn btn-lg nice-button" data-toggle="modal" data-target="#payment" onclick="choosePlan(' + item['packageId'] + ',' + price + ',' + yearly + ')">Choose Plan</button>';
        } else {
            return '<button type="button" class="w-100 btn btn-lg  ' + (packageName == item['planName'] ? 'btn-primary' : 'btn-outline-primary') + '" data-toggle="modal" data-target="#payment" onclick="choosePlan(' + item['packageId'] + ',' + price + ',' + yearly + ')">Choose Plan</button>';
        }

    }
}

var yearly = true;
var allPlans;

function getPlansList() {
    let list;
    $.ajax({
        type: 'POST',
        url: getApiUrl('getMyJsonPricesGuest'),
        async: false,
        success: function (result) {
            if (result['map2']) {
                list = result['map2'];
            }
        }
    });
    return list;
}
function initPlans() {
    $.getJSON(getApiUrl('getMyJsonPricesGuest'), function (json) {
        console.log('packageName is ' + packageName + ' and getMyJsonPricesGuest ' + JSON.stringify(json));
        var array = [];
        for (key in json.map2) {
            array.push(json.map2[key]);
        }
        array.sort(function (a, b) {
            return !isRabbitUI ? (a.planPrice - b.planPrice) : (b.planPrice - a.planPrice);
        });
        json = {
            "map2": {}
        };
        for (var i = 0; i < array.length; i++) {
            json.map2[array[i]['planName']] = array[i];
        }
        allPlans = json['map2'];
        console.log('allPlans ' + JSON.stringify(allPlans));
        yearly = true;
        drawPlans();
        // showYearly();
    })
}

function toggleYearly() {
    if (yearly) {
        showMonthly();
    } else {
        showYearly();
    }
}

function showYearly() {
    yearly = true;
    $('.anualyCheckBox').addClass('active');

    drawPlans();

}

function showMonthly() {
    yearly = false;
    $('.anualyCheckBox').removeClass('active');
    drawPlans();

}

function choosePlan(packageId, price, yearly) {
    if (pricePerMonth > price) {
        showModal('Confirm', 'Are you sure you want to downgrade your package?', 'No', 'Yes');
        $('div#modalMessage button#modalSecondButton').click(function () {
            callChoosePlan(packageId, yearly);
        });
    } else {
        // if (isWixUserOrWixLinksUser() && !yearly) {
        //     callWixUpgrade();
        // } else {
        callChoosePlan(packageId, yearly);
        // }
    }
}

function showPaymentModal(json) {
    json = JSON.parse(json.data);
    console.log('payment desc ' + JSON.stringify(json))
    ajaxSimpleLoadToDiv('/assets/htmls/paymentForm.html', 'paymentModal');
    // console.log(json.paymentDesc + ': ' + JSON.stringify(json));
    let isPayAsYouGo = json['paymentDesc'].indexOf('Pay As You Go') !== -1;
    console.log('isPayAsYouGo ' + isPayAsYouGo);
    json['paymentDesc'] = json['paymentDesc'].replace('Pay As You Go - ', '');
    $("#paymentModal #exampleModalLabel").text(json['paymentDesc']);

    if (json.priceWithVat) {
        if (json.priceToDeduct && json.priceToDeduct > 0) {
            $("#paymentModal #priceDesc").text('(Refund for current month is ' + json.currency + json.priceToDeduct + ' and new package price is ' + json.currency + json.packagePrice + ')');
        }
        if (json['price'] !== json['priceWithVat']) {
            $("#paymentModal #priceBeforeVat").html('<span class="price_bat">Price before VAT</span> ' + json.currency + json['price']);
        }
        $("#paymentModal span.planPrice").text(json.currency + '' + json['priceWithVat']);
        $("#paymentModal button span.planPrice").text(json.currency + '' + json['priceWithVat'] + (yearly && !isPayAsYouGo ? ' Annually' : ''));
    } else {
        $("#paymentModal span.planPrice").text(json.currency + json.price);
        $("#paymentModal button span.planPrice").text(json.currency + json.price + (yearly ? ' annually' : ''));
    }
    console.log('before showing payment modal');
    $('#paymentModal').modal('show');
    // return json;
}

function callChoosePlan(packageId, yearly) {
    $.getJSON(getApiUrl('getMyJsonChoosePlanUser?id=' + packageId + (yearly ? "&yearly=true" : "")), function (json) {
        // json = JSON.parse(json);
        // console.log('getMyJsonChoosePlanUser ' + JSON.stringify(json));
        if (json.status != null) {
            // console.log('status is ' + json.status);
            showModal('Package Change', json.status, 'Close', '');
            setTimeout(function () {
                location.reload();
            }, 3000);
            refreshUsage();
        } else {
            if (isWixUserOrWixLinksUser()) {
                // let coupon = isEasySeoUI ? '4F9Eexsale' : '';
                // $.getJSON(apiUrl + 'getMyJsonWixCheckoutUser?coupon=' + coupon, function (checkoutJson) {
                $.getJSON(getApiUrl('getMyJsonWixCheckoutUser'), function (checkoutJson) {
                    console.log('getMyJsonWixCheckoutUser checkoutJson ' + JSON.stringify(checkoutJson));
                    if (checkoutJson['obj'] && checkoutJson['obj'].indexOf('https://') !== -1) {
                        historyPushState('payment-form', 'Wix Payment Form');
                        console.log('checkoutJson[\'obj\'] ' + checkoutJson['obj'])
                        window.open(checkoutJson['obj']);
                    } else {
                        try {
                            console.log('getMyJsonWixCheckoutUser mainUserDetails[\'showInternalPayment\'] ' + mainUserDetails['showInternalPayment']);
                            console.log('getMyJsonWixCheckoutUser mainUserDetails[\'pricePerMonth\'] ' + mainUserDetails['pricePerMonth']);

                            if (mainUserDetails['showInternalPayment'] && mainUserDetails['pricePerMonth'] > 0) {
                                // if (yearly) {
                                historyPushState('payment-form', 'Payment Form');
                                showPaymentModal(json);
                            } else {
                                callWixUpgrade();
                            }
                        } catch (e) {
                            console.log('getMyJsonWixCheckoutUser e ' + e);
                            callWixUpgrade();
                        }
                    }
                });
            } else {
                historyPushState('payment-form', 'Payment Form');
                showPaymentModal(json);
            }
        }
    })
}

function callWixCheckout() {
    let coupon = isEasySeoUI ? '4F9Eexsale' : '';
    $.getJSON(getApiUrl('getMyJsonWixCheckoutUser?forceWixCheckout=true&coupon=' + coupon), function (checkoutJson) {
        if (checkoutJson['obj'] && checkoutJson['obj'].indexOf('https://') !== -1) {
            historyPushState('payment-form', 'Wix Payment Form');
            console.log('checkoutJson[\'obj\'] ' + checkoutJson['obj'])
            window.open(checkoutJson['obj']);
        } else {
            callWixUpgrade();
        }
    });
}

function loadTermsHtml() {
    window.open("https://" + location.hostname + "/terms.html");
}

let paymentFailedCount = 0;

function submitPayment(btn) {
    // if ($('#trmasCheckBox').is(":checked")) {
    //     $('#trmasCheckBox').parent().parent().removeClass('linkRead');
    //
    // } else {
    //     $('#trmasCheckBox').parent().parent().addClass('linkRead');
    //     fadeModal('', 'Please read terms & conditions')
    //     return false;
    // }
    if (btn) {
        $(btn).hide();
        $('.paymentProcessSpinner').show();
    }
    const json = getFormDValues(submitPaymentForm);

    $.ajax({
        type: 'POST',
        url: apiUrl + 'getMyJsonSubmitPaymentUser',
        dataType: 'json',
        data: json,
        success: function (result) {
            // console.log('success ' + JSON.stringify(result));
            $('.paymentProcessSpinner').hide();
            $(btn).show();
            if (result.status != 'true') {
                paymentFailedCount++;
                console.log('paymentFailedCount is ' + paymentFailedCount);
                console.log('$("#paymentModal #exampleModalLabel").text()' + $("#paymentModal #exampleModalLabel").text());

                if (result.status === 'Credit Card Declined' && paymentFailedCount >= 0 && (isWixUserOrWixLinksUser() || isTestingMode())) {
                    showModal('Credit Card Declined', 'Sorry, we couldn\'t authorize your credit card, please proceed to Wix Checkout', '', '', 'OK');
                    // showModal('Credit Card Declined', 'Sorry, we couldn\'t process your credit card, you can try process your payment at Wix Checkout', 'Try Again', '', 'Go to Wix Checkout');
                    $('div#modalMessage a#modalConfirmBtn').attr("href", "javascript: callWixCheckout()");
                    $('#modalMessage').css("z-index", "1100");
                } else {
                    if (result.status === 'Credit Card Declined') {
                        fadeModal('Credit Card Declined', 'Please approve the payment with the bank (check your phone or email) and then submit again.');
                    } else {
                        fadeModal('Payment Failed', result.status);
                    }
                    $('#modalMessage').css("z-index", "1100");
                }

                historyPushState('payment-form-failed', 'Payment Form Failed');
                // location.href = (isTestingMode() ? 'http://localhost:8080/homeDev.html' : 'https://www.rabbitseo.com/home.html') + '?premium-user-success=true';
            } else {
                historyPushState('payment-form-success', 'Payment Form Success');

                if (isRabbitUI && !isTestingMode()) {
                    gtag_report_conversion();
                }

                if (isLinksUI) {
                    location.reload();
                } else {
                    $('#paymentModal').modal('hide');
                    fadeModal('Payment Success', 'Invoice should be sent to your email.');
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }
            }
        },
        complete: function (result) {
            // console.log('complete ' + JSON.stringify(result));
        }
    });
}

function openContactUsModal() {
    $.get(assetsUrl + 'assets/htmls/contactUs.html', function (data) {
        // console.log($(data));
        $('#ourModal').html(data);
        $('#ourModal').modal('show');
    });
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function reviewsModalSlide() {
    $.getJSON(assetsUrl + 'assets/data/reviews.json', function (response) {

        const json = shuffle(response['list']);
        var reviewHtml = '';
        for (let i = 0; i < json.length; i++) {

            reviewHtml += '<div><div class="row gap-0">' +
                '<div class="col-md-4 d-flex align-items-center position-relative">' +
                '<div class="reviewsContentsLeft">' +
                '<div class="reviewsImage">' +
                '<img src="' + json[i]['reviewsImage'] + '">' +
                '</div>' +
                '<h6>' + json[i]['reviewsCompanyName'] + '</h6>' +
                '</div>' +
                '<div class="counterReview"><span>' + (i + 1) + '</span>/<span class="counterReviewTotal">' + json.length + '</span></div>' +
                '</div>' +
                '<div class="col-md-8 reviewsContentsRight"><div>' +
                '<h6>' + json[i]['reviewsTitle'] + '</h6>' +
                '<div>' + json[i]['reviewsDescription'] +
                '</div></div></div>' +
                '</div></div>';
        }
        $('.myreviewsdivs').html(reviewHtml);
        var reviewsdivs = $('.myreviewsdivs>div');
        var reviewsnow = 0; // currently shown div

        reviewsdivs.hide().first().show(); // hide all divs except first
        $("button[name=next]").click(function () {
            reviewsdivs.eq(reviewsnow).hide();
            reviewsnow = (reviewsnow + 1 < reviewsdivs.length) ? reviewsnow + 1 : 0;
            reviewsdivs.eq(reviewsnow).show(); // show next
        });
        $("button[name=prev]").click(function () {
            reviewsdivs.eq(reviewsnow).hide();
            reviewsnow = (reviewsnow > 0) ? reviewsnow - 1 : reviewsdivs.length - 1;
            reviewsdivs.eq(reviewsnow).show(); // show previous
        });
        $(document).keydown(function (event) {
            if (event.which === 39) {
                // Right arrow key was pressed 
                $(".myreviewsdivs_btn button[name=next]").trigger('click');
                // Add your code to handle right arrow key press here
            } else if (event.which === 37) {
                // Left arrow key was pressed 
                $(".myreviewsdivs_btn button[name=prev]").trigger('click');
                // Add your code to handle left arrow key press here
            }
        });
    });

}

function openReviewsModal() {
    $.get(assetsUrl + 'assets/htmls/reviews.html', function (data) {
        // console.log($(data));
        $('#ourModal').html(data);
        $('#ourModal').modal('show');
        reviewsModalSlide();
    });
}

function openPaymentsModal() {
    ajaxLoadToDiv('/assets/htmls/adminPayments.html', 'tabData');
    // $.get(assetsUrl + 'assets/htmls/adminPayments.html', function (data) {
    //     $('#ourModal').html(data);
    //     $('#ourModal').modal('show');
    // });
}

var currentlyShowingBuilder = true;
var showLinkBuilderForm = false;

function openModalHtml(modalId, html, title) {
    if (!modalId || modalId === '') {

    }
    $('#' + modalId + ' div.modal-body').html(html);
    $('#' + modalId + ' h5.modal-title').html(title);
    $('#' + modalId).modal('show');
    $('#' + modalId + ' button#modalSecondButton').click(function () {
        $('#' + modalId).modal('hide');
    });
    if (isRabbitUI && modalId === 'appDataModal') {
        $('#appDataModal div.modal-dialog-centered').css("maxWidth", " !important");
    }
}

function openModalId(href, modalId, title) {
    $.get(composeUrl(href), function (data) {
        openModalHtml(modalId, data, title);
    });
}

function openModal(href, title) {
    openModalId(href, 'appDataModal', title);
}

function closeAppModal() {
    $('#appDataModal').modal('hide');
}

function closeModalMessage() {
    $('#modalMessage').modal('hide');
}

function closeOurModal() {
    $('#ourModal').modal('hide');
}

// function toggleLinksView() {
//     console.log('currentlyShowingBuilder ' + currentlyShowingBuilder);
//     console.log('showLinkBuilderForm ' + showLinkBuilderForm);
//     if (currentlyShowingBuilder) {
//         ajaxLoadToDiv("/assets/htmls/linksMonitoring.html", 'linksMonitoringView');
//         $('#linksMonitoringView').show();
//         $('#linksBuilderView').hide();
//     } else {
//         $('#linksMonitoringView').hide();
//         $('#linksBuilderView').show();
//         if (showLinkBuilderForm) {
//             $('#linksBuildingDiv').show();
//             $('#publishLinkDiv').hide();
//         } else {
//             $('#publishLinkDiv').show();
//             $('#linksBuildingDiv').hide();
//         }
//     }
//     currentlyShowingBuilder = !currentlyShowingBuilder;
// }

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function isRandDivideBy(val) {
    return getRndInteger(1, 10) % val === 0;
}

function selectAll(selectFinder, isSelected) {
    $(selectFinder + " > option").prop("selected", isSelected);
    $(selectFinder).trigger("change");
}

function setArrayValsSelected(array, selectId, count) {
    console.log('setArrayValsSelected array is ' + array)
    if (array) {
        if (!count || count >= array.length) {
            count = array.length;
        }
        for (let i = 0; i < count; i++) {
            let curr = array[i];
            console.log('setArrayValsSelected curr is ' + curr)
            setSelectedValue(document.getElementById(selectId), curr);
            $("#" + selectId).trigger("change");
        }
    }
}

function setStringValsSelected(val, selectId, count) {
    // console.log('setStringValsSelected ' + JSON.stringify(val));
    if (val) {
        const array = Array.isArray(val) ? val : val.split(',');
        setArrayValsSelected(array, selectId, count);
    }
}

function createKeywordsToPromoteSelect(json) {
    const placeholder = isRabbitUI ? "Enter Keywords to promote, for example 'Buy Flowers in New York'" : "Enter keywords to promote";
    const maximumSelectionLength = isRabbitUI && !inOnboardingNow ? 20 : 3;
    console.log('createKeywordsToPromoteSelect maximumSelectionLength ' + maximumSelectionLength)
    $("#keywordsToPromote").select2({
        tokenSeparators: [',', ', ', '\n'],
        // selectOnClose: true,
        tags: true,
        data: suggestedKeywords,
        placeholder: placeholder,
        searchInputPlaceholder: placeholder,
        width: "100%",
        "language": {
            "noResults": () => 'Enter a keyword',
            maximumSelected: function (e) {
                var t = inOnboardingNow ? 'Start with ' + e.maximum + ' keywords, expand later' : "You can only select " + e.maximum + " item";
                return t;
            }
        },
        maximumSelectionLength: maximumSelectionLength,
    });
    if (inOnboardingNow && suggestedKeywords) {
        setStringValsSelected(suggestedKeywords.toString(), "keywordsToPromote", 2);
        // selectAll('#keywordsToPromote', keywordsJson.length <= 3);
    } else if (json && json['keyword'] && json['keyword'].length > 0) {
        const val = json['keyword'].toString();
        setStringValsSelected(val, 'keywordsToPromote');
    }
}

function getCountriesArray() {
    let countries = availableCountries;
    const index = countries.indexOf('US');
    if (index > -1) { // only splice array when item is found
        countries.splice(index, 1); // 2nd parameter means remove one item only
    }
    const index2 = countries.indexOf('Anoynmous Proxy');
    if (index2 > -1) { // only splice array when item is found
        countries.splice(index2, 1); // 2nd parameter means remove one item only
    }
    countries.push('United States');
    return countries;
}

function fillPublishDetailsForm() {
    $('#userEmail').html(mainUserDetails["email"]);
    $('#domain').html(mainUserDetails["wixUrl"]);
    $.ajaxSetup({
        async: false
    });
    loadCategorySelect();
    let userPublishDetailsJson;
    $.getJSON(getApiUrl('getMyJsonPublishDetailsUser'), function (json) {
        console.log('getMyJsonPublishDetailsUser ' + JSON.stringify(json));
        if (json['obj']) {
            userFeaturedLinks = json['obj'];
        }
        json = JSON.parse(json['data']);
        if (json) {
            userPublishDetailsJson = json;
            fillForm('#savePublishDetailsUser', json);
            let catVal = json['category'];
            if (!catVal) {
                catVal = 'General';
            }
            // console.log('set catVal ' + catVal);
            // websiteCategorySelect.val(catVal).trigger('change.select2');
            // $('#categorySelect').select2().val(catVal).trigger('change');
            setSelectedValueById('categorySelect', catVal);

            try {
                if (json['tags']) {
                    setStringValsSelected(json['tags'], 'bizTags');
                }
                let bizCountry = json['bizCountry'];
                if (!bizCountry) {
                    bizCountry = mainUserDetails['countryName'];
                }
                if (bizCountry === 'US') {
                    bizCountry = 'United States';
                }
                console.log('set country to ' + bizCountry);
                $(".countrySelect").select2().val(bizCountry).change();
            } catch (e) {
                console.log('error set vals ' + e)
            }
        }
        $.getJSON(getApiUrl('getMyJsonKeywordsPairListKeywordForWebsite?justKeywordName=true'), function (keywordsJson) {
            if (keywordsJson && keywordsJson['list'] && keywordsJson['list'].length > 0) {
                keywordsJson = keywordsJson['list'];
                for (let j = 0; j < keywordsJson.length; j++) {
                    // console.log("suggestedKeywords pushing " + keywordsJson[j]['id']);
                    const curr = keywordsJson[j]['id'];
                    if (suggestedKeywords.indexOf(curr) == -1 && curr.length >= 7 && curr.length < MAX_KEYWORD_LENGTH) {
                        suggestedKeywords.push(curr);
                    }
                }
            }
        });
        ajaxSimpleLoadToDiv('/assets/htmls/ranksExplorer.html', 'ranksExplorerHidden');
        // console.log("suggestedKeywords " + JSON.stringify(suggestedKeywords));
        if (!suggestedKeywords || suggestedKeywords.length === 0) {
            loadKeywordSelect();
        }
    });
    $.ajaxSetup({
        async: true
    });
    createKeywordsToPromoteSelect(userPublishDetailsJson);
}

function setSelectedValueById(selectObj, valueToSet) {
    setSelectedValue(document.getElementById(selectObj), valueToSet);
}

function setSelectedValue(selectObj, valueToSet) {
    if (selectObj && valueToSet) {
        let found = false;
        if (selectObj.options) {
            for (var i = 0; i < selectObj.options.length && !found; i++) {
                if (selectObj.options[i].text === valueToSet) {
                    selectObj.options[i].selected = true;
                    found = true;
                    console.log('setSelectedValue Found val ' + valueToSet)
                }
            }
        }
        if (!found) {
            var option = document.createElement("option");
            option.text = valueToSet;
            option.value = valueToSet;
            option.selected = true;
            selectObj.appendChild(option);
        }
    }
}

function updateEmail() {
    const formId = 'updateEmailUser';
    var result = ajaxSubmitForm(formId);
    console.log(result && result.indexOf('http://') !== -1);

    if (result && result.indexOf('https://') !== -1) {
        refreshUserDetails();
    } else {
        showModal('Account Details', result, 'Close', '');
        // $('#publishFormResultMsg').html(result);
    }
    let responseDiv = '#' + formId + ' div.alert-success';
    $(responseDiv).show();
}

function updateDomain() {
    var result = ajaxSubmitForm('updateDomainUser');
    $('#domainChangeModal').modal('hide');
    console.log('updateDomain ' + JSON.stringify(result));

    fadeModal('Active Domain', 'Your active domain is ' + result, 'Close', '');
}

function submitUserAddedReview() {
    if (isWixUserOrWixLinksUser()) {
        callWixReview();
    } else {
        let reviewLink = mainUserDetails['reviewLink'];
        // if (isLinksUI) {
        //     // reviewLink = 'https://www.wix.com/app-market/links4u';
        // } else if (isSeolyUI) {
        //     reviewLink = 'https://apps.shopify.com/seoly-complete-seo-solution#modal-show=ReviewListingModal';
        // } else if (isRabbitUI) {
        //     reviewLink = 'https://apps.shopify.com/rabbitseo#modal-show=ReviewListingModal';
        // }

        if (reviewLink) {
            window.open(reviewLink, '_blank');
        }
    }
    $.ajax({
        type: 'POST',
        url: getApiUrl("reviewAddedUser"),
        success: function (result) {
            $('#askReviewModal').modal('hide');
            if (false) {
                showModal('Thank You', 'We will check the review and add the link to your account', '', '');
                setTimeout(function () {
                    modalFadeout();
                }, 4000);
            }
        }
    });
}

function submitInviteToAppInstall() {
    $.ajax({
        type: 'POST',
        url: getApiUrl("submitInviteToAppUser"),
        success: function (result) {
            $('#inviteToNewAppModal').modal('hide');
            if (false) {
                showModal('Great!', 'Soon you should receive the free upgrade coupon code to your email', '', '');
                setTimeout(function () {
                    modalFadeout();
                }, 4000);
            }
        }
    });
}

function modalFadeout() {
    $('#modalMessage').fadeOut();
    $('#modalMessage').modal('hide');
}

function submitAddLinks(val) {
    $.ajax({
        type: 'POST',
        url: getApiUrl("questionUser?name=askLinksExchange&val=" + val),
        success: function (result) {
            console.log('submitAddLinks ' + JSON.stringify(result));
            $('#askLinksModal').modal('hide');
            if (val) {
                showModal('Thank You', 'Once the backlinks market is ready we will let you know.', '', '');
                setTimeout(function () {
                    modalFadeout();
                }, 4000);
            }
        }
    });
}

function replaceAllToBold(text, searchMask) {
    return replaceAllInsensitive(text, searchMask, "<span class='fw-bold'>" + searchMask + "</span>");
}

function replaceAllInsensitive(text, searchMask, replaceMask) {
    if (text) {
        var regEx = new RegExp(searchMask, "ig");
        // console.log('text is ' + text + ' searchMask is ' + searchMask + ' replaceis ' + replaceMask)
        var result = text.replace(regEx, replaceMask);
        // console.log('result is ' + result);
        return result;
    } else {
        return '';
    }
}

function isLocalhost() {
    return false;
    // return location.toString().toLowerCase().includes(":8080");
}

function isDevOrLocalhost() {
    return isDev();
}

function isDev() {
    return false;
    // return location.toString().toLowerCase().indexOf("rabbitweb.test") != null;
    // location.toString().toLowerCase().includes("c:/") ||
    // location.toString().toLowerCase().includes("localhost")
    // location.toString().toLowerCase().includes("d:/") ||
    // location.toString().toLowerCase().includes("rabbitui.test/") ||
    // location.toString().toLowerCase().includes("aptest.therssoftware.com");
    // return location.toString().includes("localhost") || location.toString().includes("127.0.0.1") || location.toString().toLowerCase().includes("c:");
    // return false && location.toString().includes("localhost") || location.toString().includes("127.0.0.1") || location.toString().toLowerCase().includes("c:");
}

function runIntro() {
    $('[data-intro]:hidden').each(function (index, obj) {
        var $t = $(this);
        $t
            .attr({
                'data-intro-hidden': $t.attr('data-intro'),
            })
            .removeAttr('data-intro')
        ;
    });

    $('[data-intro-hidden]:visible').each(function (index, obj) {
        var $t = $(this);
        $t
            .attr({
                'data-intro': $t.attr('data-intro-hidden'),
            })
            .removeAttr('data-intro-hidden')
        ;
    });
    introJs().start();
}

jQuery.fn.dataTable.render.ellipsis = function (cutoff, wordbreak, escapeHtml) {
    var esc = function (t) {
        return ('' + t)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    return function (d, type, row) {
        // Order, search and type get the original data
        if (type !== 'display') {
            return d;
        }

        if (typeof d !== 'number' && typeof d !== 'string') {
            if (escapeHtml) {
                return esc(d);
            }
            return d;
        }

        d = d.toString(); // cast numbers

        if (d.length <= cutoff) {
            if (escapeHtml) {
                return esc(d);
            }
            return d;
        }

        var shortened = d.substr(0, cutoff - 1);

        // Find the last white space character in the string
        if (wordbreak) {
            shortened = shortened.replace(/\s([^\s]*)$/, '');
        }

        // Protect against uncontrolled HTML input
        if (escapeHtml) {
            shortened = esc(shortened);
        }

        return '<span class="ellipsis" data-bs-toggle="popover" data-bs-html="true" data-bs-trigger="hover" data-bs-placement="left" data-bs-content="' + esc(d) + '">' + shortened + '&#8230;</span>';
        // return '<span class="ellipsis" title="'+esc(d)+'">'+shortened+'&#8230;</span>';
    };
};

function getSelect2ValSeparated(id) {
    var data = $("#" + id + " option:selected").map((i, e) => $(e).text().trim()).toArray();
    return data.join(', ');
}

function handleUpgradeViews() {
    if (isShowWixBillingPage()) {
        $('.upgrade-button').attr("onclick", "callUpgradePage()");
        $('#upgrade-tab').attr("onclick", "callUpgradePage()");
        $('#upgrade-tab').attr("data-bs-target", "");
    } else {
        $('#upgrade-tab').click(function () {
            if (!allPlans) {
                initPlans();
            }
        });
    }
    if (isShabbat) {
        $('.upgrade-button').hide();
        $('#upgrade-tab').hide();
        $('.pay-as-you-go-link').hide();
        payingUser = true;
    } else {
        $('.upgrade-button').attr('onclick', 'javascript: $("#upgrade-tab").click()');
    }
    if (payingUser) {
        $('#launchOffer').hide();
        console.log('daysCount is ' + daysCount);
        if (!isShabbat && daysCount > 1 && mainUserDetails['pricePerMonth'] < 20) {
            $('#upgradeOffer').show();
        }
    } else {
        $('#launchOffer').show();
        $("#upgrade-tab").hide();
    }
    if (mainUserDetails['askReview']) {
        // if (mainUserDetails['askReview'] || isLocalhost()) {
        $('#askReviewModal').modal('show');
    }
}

function getHostname(url) {
    console.log('getHostname is ' + url);
    try {
        url = new URL(url).hostname;
    } catch (e) {
        // url = removeHttp(url.toString());
        // url = removeLastSlash(url.toString());
    }
    // url = url.replace("www.","");
    console.log('getHostname final is ' + url);
    return url;
}

function addHttpsIfNeeded(href) {
    // console.log('addHttpsIfNeeded href ' + href)
    if (href && !href.toString().startsWith("http")) {
        href = "https://" + href;
    }
    // console.log('addHttpsIfNeeded return href ' + href);
    return href;
}

function getHostnameWithHttps(url) {
    url = getHostname(url);
    if (!url.startsWith('https')) {
        url = 'https://' + url;
    }
    return url;
}


// custom jquery plugin loadText() - usage example: $('#text-box').randomText( textArray, 7000); // ( array, interval, ["reload text or html"] )
// $(document).ready( function() {
//     $.get('tips.txt', function(data){
//         tipsArray = data.split('\n');
//         // console.log('tipsArray ' + tipsArray);
//         $('#text-box').randomText( tipsArray, 7000); // ( array, interval, ["reload text or html"] )
//     });
// });
let sendText;
$.fn.randomText = function (textArray, interval, randomEle, prevText) {
    var obj = $(this);
    if (obj.find('.text-content').length == 0) {
        obj.append('<div class="text-content alert alert-primary">');
    }
    var textCont = obj.find('.text-content');

    textCont.fadeOut('slow', function () {
        var chosenText = random_array(textArray);
        while (chosenText == prevText) {
            chosenText = random_array(textArray);
        }
        textCont.empty().html(chosenText);
        textCont.fadeIn('slow');
        sendText = chosenText;
    });
    timeOut = setTimeout(function () {
        obj.randomText(textArray, interval, randomEle, sendText);
    }, interval);
}

//public function
function random_array(aArray) {
    var rand = Math.floor(Math.random() * aArray.length + aArray.length);
    var randArray = aArray[rand - aArray.length];
    return randArray;
}

function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp": " ",
        "amp": "&",
        "quot": "\"",
        "lt": "<",
        "gt": ">"
    };
    return encodedString.replace(translate_re, function (match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function (match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}

function fadeInAndOut(selector) {
    $(selector).fadeIn(1000, function () {
        $(selector).fadeOut(3000);
    });
}

function loadImagesByQuery(query) {
    console.log('loadImagesByQuery query is ' + query);
    $.getJSON(getApiUrl('getMyJsonImagesUrlsLink?query=' + query), function (data) {
        if (!isContent123UI) {
            loadImages(data);
        } else {
            loadImagesContent(data);
        }
    });
}

function getImagesListByQuery(query) {
    let list;
    console.log('getImagesListByQuery query is ' + query);
    $.ajax({
        type: 'POST',
        url: getApiUrl('getMyJsonImagesUrlsLink?query=' + query),
        async: false,
        success: function (result) {
            // console.log('getWidgetsList ' + JSON.stringify(result));
            if (result['list']) {
                list = result['list'];
            }
        }
    });
    return list;
}

function setLineBgColor(i) {
    $(".bs-stepper-line").css({"background": "rgba(0, 0, 0, 0.12)"});
    $(".bs-stepper-line").each(function (index, item) {
        iam = parseInt($(item).attr('data-iam'));
        if (i == iam || iam < i)
            $(item).css({"background": "#339798"});
        //if (i + 1 == iam)
        // $(item).css({"background": "linear-gradient(to right,#339798 0%,#339798 50%,#CDD5DF 50%,#CDD5DF 100%)"});

    });
}

function showUsedAndMax() {
    $('.guestBlogsUsed').html(mainUserDetails['guestBlogsUsed'] > 0 ? mainUserDetails['guestBlogsUsed'] : 0);
    $('.guestBlogsMax').html(mainUserDetails['guestBlogsMax']);

    if (mainUserDetails['linksUsed'] > 0) {
        $('#newUserDiv').hide();
        $('#existingUserDiv').show();
    } else {
        $('#newUserDiv').show();
        $('#existingUserDiv').hide();
    }
}

function isConfirmDelete() {
    console.log('confirmDelete ' + confirmDelete)
    if (confirmDelete) {
        return true;
    } else {
        return false;
    }
}

function applyBaseCDN() {
    console.log('start applyBaseCDN() and isDevOrLocalhost() ' + isDevOrLocalhost())
    if (location.toString().toLowerCase().includes("localhost")) {
        // if (location.toString().toLowerCase().includes(":8080")) {
        apiUrl = "http://localhost:8080/";
        const baseUrl = $('base').attr('href');
        if (baseUrl) {
            assetsUrl = baseUrl;
        }
        // assetsUrl = 'https://dlnil54eooeso.cloudfront.net/';
    } else if (location.toString().toLowerCase().includes("rabbitweb.test") || location.toString().toLowerCase().includes("rabbit-web-deploy.onrender.com") || location.toString().toLowerCase().includes("127.0.0.1")) {
        apiUrl = "https://www.rabbitseo.com/";
    } else {
        apiUrl = "https://" + location.hostname + "/";
        assetsUrl = $('base').attr('href') ? $('base').attr('href') : 'https://dlnil54eooeso.cloudfront.net/';
        // $('base').attr('href', 'https://dlnil54eooeso.cloudfront.net/');
    }
    console.log('apiUrl = ' + apiUrl);
    console.log('assetsUrl = ' + assetsUrl);
}

function isTestingMode() {
    return location.toString().toLowerCase().indexOf("rabbitweb.test") !== -1 || location.toString().toLowerCase().indexOf(":8080") !== -1;
}

function isStagingMode() {
    try {
        // return mainUserDetails['email'] === 'seo.kosha2023@gmail.com';
        return location.toString().toLowerCase().indexOf("rabbitweb.test") !== -1 || location.toString().toLowerCase().indexOf(":8080") !== -1 || mainUserDetails['email'] === 'seo.kosha2023@gmail.com';
    } catch (e) {
        console.log('isStagingMode ' + e);
        return true;
    }
}

function loadLanguages() {
    let languages = [{
        id: 'English',
        text: '<div class="d-flex align-items-center gap-2" title="English"><img src="/assets/images/content123/flag/english.png"/> English </div>'
    }, {
        id: 'Bulgarian',
        text: '<div class="d-flex align-items-center gap-2" title="Bulgarian"><img src="/assets/images/content123/flag/bulgarian.png"/> Bulgarian </div>'
    }, {
        id: 'Czech',
        text: '<div class="d-flex align-items-center gap-2" title="Czech"><img src="/assets/images/content123/flag/czech.png"/> Czech </div>'
    }, {
        id: 'Danish',
        text: '<div class="d-flex align-items-center gap-2" title="Danish"><img src="/assets/images/content123/flag/danish.png"/> Danish </div>'
    }, {
        id: 'Dutch',
        text: '<div class="d-flex align-items-center gap-2" title="Dutch"><img src="/assets/images/content123/flag/dutch.png"/> Dutch </div>'
    }, {
        id: 'Filipino',
        text: '<div class="d-flex align-items-center gap-2" title="Filipino"><img src="/assets/images/content123/flag/filipino.png"/> Filipino </div>'
    }, {
        id: 'Finnish',
        text: '<div class="d-flex align-items-center gap-2" title="Finnish"><img src="/assets/images/content123/flag/finnish.png"/> Finnish </div>'
    }, {
        id: 'French',
        text: '<div class="d-flex align-items-center gap-2" title="French"><img src="/assets/images/content123/flag/french.png"/> French </div>'
    }, {
        id: 'German',
        text: '<div class="d-flex align-items-center gap-2" title="German"><img src="/assets/images/content123/flag/german.png"/> German </div>'
    }, {
        id: 'Greek',
        text: '<div class="d-flex align-items-center gap-2" title="Greek"><img src="/assets/images/content123/flag/greek.png"/> Greek </div>'
    }, {
        id: 'Hindi',
        text: '<div class="d-flex align-items-center gap-2" title="Hindi"><img src="/assets/images/content123/flag/hindi.png"/> Hindi </div>'
    }, {
        id: 'Hungarian',
        text: '<div class="d-flex align-items-center gap-2" title="Hungarian"><img src="/assets/images/content123/flag/hungarian.png"/> Hungarian </div>'
    }, {
        id: 'Indonesian',
        text: '<div class="d-flex align-items-center gap-2" title="Indonesian"><img src="/assets/images/content123/flag/indonesian.png"/> Indonesian </div>'
    }, {
        id: 'Italian',
        text: '<div class="d-flex align-items-center gap-2" title="Italian"><img src="/assets/images/content123/flag/italian.png"/> Italian </div>'
    }, {
        id: 'Japanese',
        text: '<div class="d-flex align-items-center gap-2" title="Japanese"><img src="/assets/images/content123/flag/japanese.png"/> Japanese </div>'
    }, {
        id: 'Korean',
        text: '<div class="d-flex align-items-center gap-2" title="Korean"><img src="/assets/images/content123/flag/korean.png"/> Korean </div>'
    }, {
        id: 'Latvian',
        text: '<div class="d-flex align-items-center gap-2" title="Latvian"><img src="/assets/images/content123/flag/latvian.png"/> Latvian </div>'
    }, {
        id: 'Lithuanian',
        text: '<div class="d-flex align-items-center gap-2" title="Lithuanian"><img src="/assets/images/content123/flag/lithuanian.png"/> Lithuanian </div>'
    }, {
        id: 'Malay',
        text: '<div class="d-flex align-items-center gap-2" title="Malay"><img src="/assets/images/content123/flag/malay.png"/> Malay </div>'
    }, {
        id: 'Norwegian',
        text: '<div class="d-flex align-items-center gap-2" title="Norwegian"><img src="/assets/images/content123/flag/norwegian.png"/> Norwegian </div>'
    }, {
        id: 'Polish',
        text: '<div class="d-flex align-items-center gap-2" title="Polish"><img src="/assets/images/content123/flag/polish.png"/> Polish </div>'
    }, {
        id: 'Portuguese',
        text: '<div class="d-flex align-items-center gap-2" title="Portuguese"><img src="/assets/images/content123/flag/portuguese.png"/> Portuguese </div>'
    }, {
        id: 'Romanian',
        text: '<div class="d-flex align-items-center gap-2" title="Romanian"><img src="/assets/images/content123/flag/romanian.png"/> Romanian </div>'
    }, {
        id: 'Russian',
        text: '<div class="d-flex align-items-center gap-2" title="Russian"><img src="/assets/images/content123/flag/russian.png"/> Russian </div>'
    }, {
        id: 'Slovak',
        text: '<div class="d-flex align-items-center gap-2" title="Slovak"><img src="/assets/images/content123/flag/slovak.png"/> Slovak </div>'
    }, {
        id: 'Slovenian',
        text: '<div class="d-flex align-items-center gap-2" title="Slovenian"><img src="/assets/images/content123/flag/slovenian.png"/> Slovenian </div>'
    }, {
        id: 'Spanish',
        text: '<div class="d-flex align-items-center gap-2" title="Spanish"><img src="/assets/images/content123/flag/spanish.png"/> Spanish </div>'
    }, {
        id: 'Swedish',
        text: '<div class="d-flex align-items-center gap-2" title="Swedish"><img src="/assets/images/content123/flag/swedish.png"/> Swedish </div>'
    }, {
        id: 'Thai',
        text: '<div class="d-flex align-items-center gap-2" title="Thai"><img src="/assets/images/content123/flag/thai.png"/> Thai </div>'
    }, {
        id: 'Turkish',
        text: '<div class="d-flex align-items-center gap-2" title="Turkish"><img src="/assets/images/content123/flag/turkish.png"/> Turkish </div>'
    }, {
        id: 'Ukrainian',
        text: '<div class="d-flex align-items-center gap-2" title="Ukrainian"><img src="/assets/images/content123/flag/ukrainian.png"/> Ukrainian </div>'
    }, {
        id: 'Vietnamese',
        text: '<div class="d-flex align-items-center gap-2" title="Vietnamese"><img src="/assets/images/content123/flag/vietnamese.png"/> Vietnamese </div>'
    }]


    $('#language').select2({
        placeholder: "Please select a country",
        data: languages,
        templateResult: function (d) {
            return $(d.text);
        },
        templateSelection: function (d) {
            return $(d.text);
        },
    });
}

function loadJS(FILE_URL) {
    console.log('start load js file ' + FILE_URL)
    let scriptEle = document.createElement("script");

    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", false);

    document.body.appendChild(scriptEle);

    // success event
    scriptEle.addEventListener("load", () => {
        console.log("File loaded " + FILE_URL)
    });
    // error event
    scriptEle.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev);
    });
}

function popupWindow(url) {
    console.log('#####start popitup ' + url)
    var newWindow = window.open(url, 'name', 'height=500,width=350');

    if (newWindow) {
        newWindow.focus()
    } else {
        console.log('newWindow is null?')
    }
    return false;
}

function loadApp() {
    loadUserMainDetails();

    let counter = 0;
    // if (mainUserDetails && mainUserDetails['roleName'] && mainUserDetails['roleName'] === 'Admin') {
    if (mainUserDetails && mainUserDetails['roleName']) {
        let appInterval = setInterval(function () {
            if (appInterval && counter++ === 100) {
                clearInterval(appInterval);
            }
            console.log('appInterval doRealRefreshUsage ' + appInterval)
            doRealRefreshUsage();
        }, 60000 * 180);
    }
}

function setFirstColWithRowNum(tableSelector) {
    $(tableSelector + ' tbody tr').each(function (idx) {
        // console.log('adding idx ' + idx)
        $(this).children("td:eq(0)").html(idx + 1);
    });
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

function getCurrentHostname() {
    return location.protocol + '//' + location.host;
}

function historyPushState(currTab, title) {
    try {
        currentAppTab = currTab;
        currentAppTitle = title;

        if (title) {
            title = title.trim();
        }
        console.log('historyPushState getHostname ' + getCurrentHostname() + ' currTab is ' + currTab + ' title is ' + title);
        if (isTestingMode()) {
            history.pushState("", "", "homeDev.html?tab=" + currTab);
        } else {
            history.pushState("", "", getCurrentHostname() + "/home.html?tab=" + currTab);
        }

        // console.log('historyPushState after pushState currTab is ' + currTab + ' title is ' + title);

        // $.getJSON(getApiUrl('addActionLogUser?action=Screen - ' + title), function (json) {
        //     console.log('addActionLogUser ' + JSON.stringify(json));
        // });

        if (isRabbitUI) {
            // console.log('historyPushState set page title is ' + currTab + ' title is ' + title);
            $(document).prop('title', 'Rabbit SEO Traffic Booster - ' + title);

            if (!isTestingMode()) {
                console.log('historyPushState add GA event title is ' + title);
                gtag('event', 'page_view', {
                    page_title: title,
                    page_location: location.href
                });
            }
        }
    } catch (e) {
        console.error(e, e.stack);
    }
}

function logError(e) {
    try {
        $.getJSON(getApiUrl('logClientErrorGeneric?error=Screen - ' + currentAppTitle + ' - ' + currentAppTab + ', error: ' + e), function (json) {
            console.log('addActionLogUser ' + JSON.stringify(json));
        });
    } catch (e) {
        console.log('logError ' + e);
    }
}

function gtag() {
    if (!isTestingMode()) {
        dataLayer.push(arguments);
    }
}

function addGoogleTag() {
    if (!isTestingMode()) {
        try {
            window.dataLayer = window.dataLayer || [];
            gtag('js', new Date());
            gtag('config', 'G-QYR00BL90B', {'debug_mode': isTestingMode()});
        } catch (e) {
        }
    }
}

function generateUUID() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function generateDesc() {
    $('.spinner-grow').show();
    $('.generateLink').hide();
    $.getJSON(getApiUrl('getMyJsonTeaserWebsite?siteUrl=' + $('#domain').val()), function (json) {
        console.log('getMyJsonTeaserWebsite ' + JSON.stringify(json));
        $('.spinner-grow').hide();
        $('.generateLink').show();
        if (json['status'] && json['status'] !== 'Please enter domain first') {
            fadeModal('Oops', json['status']);
        } else if (json['obj']) {
            $('#description').val(json['obj']);
        }
    });
}

function submitPayAsYouGo(itemsCount, price) {
    console.log(itemsCount, price);
    if (itemsCount > 0 && price > 0) {
        $.getJSON(getApiUrl('getMyJsonPayAsYouGoUser?itemsType=Blog Posts&itemsCount=' + itemsCount + '&price=' + price), function (json) {
            console.log('getMyJsonPayAsYouGoUser ' + JSON.stringify(json));

            if (json.status != null) {
                showModal('Result', json.status, 'Close', '');
            } else {
                historyPushState('pay-as-you-go-form', 'Pay As You Go');
                // callUpgradePage();
                showPaymentModal(json);
            }
        });
    } else {
        fadeModal('Oops', 'Please select how many guest blogs you would like to purchase');
    }
}

function showPayAsYouGoModal() {
    $("body").delegate("#itemsCount", "keyup", function (e) {
        if ($(this).val() < 0) {
            $(this).val('1');
            fadeModal('Oops', 'Please type minimum value 1 ');

        }

    });
    if (isRabbitUI) {
        try {
            $(this).closest('.dropdown-menu').prev().dropdown('toggle');
        } catch (e) {
        }
        ajaxSimpleLoadToDiv('/assets/htmls/payFormRabbit.html', 'paymentModal');
    } else if (isEasySeoUI) {
        ajaxSimpleLoadToDiv('/assets/htmls/payFormEasyseo.html', 'paymentModal');
    } else if (isLinksUI) {
        ajaxSimpleLoadToDiv('/assets/htmls/payForm.html', 'paymentModal');
    } else if (isSeolyUI) {
        ajaxSimpleLoadToDiv('/assets/htmls/payFormSeoly.html', 'paymentModal');
    } else if (isContent123UI) {
        ajaxSimpleLoadToDiv('/assets/htmls/payFormContent123.html', 'paymentModal');
    }
    $('#paymentModal').modal('show');

    $(".postItemmList input").on('click', function () {
        $('.postItemmList div').removeClass("active");
        if ($(".postItemmList input").is(":checked")) {
            $(this).parent().addClass("active");
        }
        var postItemmListPrice = $(this).val();

        $('#itemsCount').val(postItemmListPrice);
        ;
        var countItems = $('#itemsCount').val(postItemmListPrice);

        if (postItemmListPrice == 10) {
            var priceNew = postItemmListPrice * 8;
            $('#payAsYouGoPrice').html(priceNew);
            $('.priceBoxBlanklist span').html(8);
        } else if (postItemmListPrice == 25) {
            var priceNew = postItemmListPrice * 7;
            $('#payAsYouGoPrice').html(priceNew);
            $('.priceBoxBlanklist span').html(7);
        } else if (postItemmListPrice == 50) {
            var priceNew = postItemmListPrice * 6;
            $('#payAsYouGoPrice').html(priceNew);
            $('.priceBoxBlanklist span').html(6);
        } else if (postItemmListPrice == 100) {
            var priceNew = postItemmListPrice * 5;
            $('#payAsYouGoPrice').html(priceNew);
            $('.priceBoxBlanklist span').html(5);
        }
    });
    $("#itemsCount").on('change', function () {
        var countItems = $(this).val();
        $('.postItemmList div').removeClass("active");
        if (countItems >= 1 && countItems < 25) {
            var priceNew = countItems * 8;
            $('#payAsYouGoPrice').html(priceNew);
        } else if (countItems >= 25 && countItems < 50) {
            var priceNew = countItems * 7;
            $('#payAsYouGoPrice').html(priceNew);
        } else if (countItems >= 50 && countItems < 100) {
            var priceNew = countItems * 6;
            $('#payAsYouGoPrice').html(priceNew);
        } else if (countItems >= 100) {
            var priceNew = countItems * 5;
            $('#payAsYouGoPrice').html(priceNew);
        }
    })
    $(".minusItemsCount").on('click', function () {
        var countItemsOld = $('#itemsCount').val();
        var countItemsPlus = $('#itemsCount').val(parseInt(countItemsOld) - 1);
        var countItems = $('#itemsCount').val();
        if (countItems == 1) {
            $(this).prop('disabled', true);
        }
        $('.postItemmList div').removeClass("active");
        if (countItems >= 1 && countItems < 25) {
            var priceNew = countItems * 8;
            $('#payAsYouGoPrice').html(priceNew);
        } else if (countItems >= 25 && countItems < 50) {
            var priceNew = countItems * 7;
            $('#payAsYouGoPrice').html(priceNew);
        } else if (countItems >= 50 && countItems < 100) {
            var priceNew = countItems * 6;
            $('#payAsYouGoPrice').html(priceNew);
        } else if (countItems >= 100) {
            var priceNew = countItems * 5;
            $('#payAsYouGoPrice').html(priceNew);
        }
    });
    $(".addItemsCount").on('click', function () {
        var countItemsOld = $('#itemsCount').val();
        var countItemsPlus = $('#itemsCount').val(parseInt(countItemsOld) + 1);
        var countItems = $('#itemsCount').val();

        $('.postItemmList div').removeClass("active");
        if (countItems >= 1 && countItems < 25) {
            var priceNew = countItems * 8;
            $('#payAsYouGoPrice').html(priceNew);
        } else if (countItems >= 25 && countItems < 50) {
            var priceNew = countItems * 7;
            $('#payAsYouGoPrice').html(priceNew);
        } else if (countItems >= 50 && countItems < 100) {
            var priceNew = countItems * 6;
            $('#payAsYouGoPrice').html(priceNew);
        } else if (countItems >= 100) {
            var priceNew = countItems * 5;
            $('#payAsYouGoPrice').html(priceNew);
        }
    });
}

function loadAppHtml(mainHtml, role) {
    console.log('start loadAppHtml loading ' + mainHtml + ' from ' + assetsUrl);
    if (role === 'Admin' && isTestingMode()) {
        devShowSignup = false;
        // mainHtml = 'rabbitHome';
        // mainHtml = 'links4uHome';
        // assetsUrl = 'http://localhost:8080/';
        // mainUserDetails['showDomainChange'] = 'https://www.rabbitseo.wixsite.com';
    }
    $(document).prop('title', mainUserDetails['pageTitle']);

    if (mainHtml === 'rabbit' || mainHtml === 'rabbitHome') {
        let appHtml = 'assets/htmls-main/rabbit.html';

        if (role && role !== 'Admin') {
            appHtml = "assets/htmls/admin.html";
        }

        $.get(assetsUrl + appHtml, function (data) {
            isRabbitUI = true;
            $('body').append(data);
            // $(document).prop('title', 'Rabbit SEO Website - Traffic Booster - Drive traffic to your site & get higher ranks');
        });
    } else if (mainHtml === 'links4uHome') { // todo remove all these
        $.get(assetsUrl + 'assets/htmls-main/links4u.html', function (data) {
            isLinksUI = true;
            $('body').append(data);
            $('body').addClass("links4u sm_responsive");
            $(document).prop('title', 'Links4u - Get your website listed all over');
        });
    } else if (mainHtml === 'seolyHome') {
        $.get(assetsUrl + 'assets/htmls-main/seoly.html', function (data) {
            isSeolyUI = true;
            $('body').append(data);
            $('body').addClass("links4u sm_responsive");
            $(document).prop('title', 'SEOly - Complete SEO Solution');
        });
    } else if (mainHtml === 'easySeoHome') {
        $.get(assetsUrl + 'assets/htmls-main/easySeo.html', function (data) {
            isEasySeoUI = true;
            console.log('loaded file ' + assetsUrl + 'assets/htmls-main/easySeo length is ' + data.length)
            $('body').append(data);
            $(document).prop('title', 'Easy SEO');
        });
    } else if (mainHtml === '123ContentHome') {
        $.get(assetsUrl + 'assets/htmls-main/content123.html', function (data) {
            isContent123UI = true;
            $('body').append(data);
            $(document).prop('title', '123 Content');
        });
    } else {
        $.get(assetsUrl + 'assets/htmls-main/' + mainHtml + '.html', function (data) {
            $('body').append(data);
        });
    }

    console.log('mainUserDetails[\'showDomainChange\'] ' + mainUserDetails['showDomainChange']);

    if (mainUserDetails['showDomainChange'] && mainUserDetails['showDomainChange'].length > 0) {
        $.get(composeUrl('/assets/htmls/domainChangeModal.html'), function (data) {
            $(document.body).append(data);
            $('#domainChangeModal').modal('show');
            $('#oldDomainLabel').html('<span> Current Domain: </span>' + mainUserDetails['wixUrl']);
            $('#newDomainLabel').html('<span>New Domain:</span>' + mainUserDetails['showDomainChange']);
            if (mainUserDetails['wixUrl'].indexOf('.wixsite') !== -1) {
                $('#oldDomain').prop('checked', false);
                $('#newDomain').prop('checked', true);
            } else if (mainUserDetails['showDomainChange'].indexOf('.wixsite') !== -1) {
                $('#oldDomain').prop('checked', true);
                $('#newDomain').prop('checked', false);
            }
            $('#updatedWixUrl').val(mainUserDetails['showDomainChange']);
        });
    }
    if ((isRabbitUI && !payingUser) || isTestingMode()) {
        // addLiveChat();
    }
}

let showCountdown;
let couponCodeText;

function showHeaderCountdown(date, couponCode) {
    if (isWixUserOrWixLinksUser() && couponCode) {
        makeTimer(date);
        if (showCountdown) {
            $('.header-countdown').show();
            $('.header-nonCountdown').hide();
            $('.couponCodeText').html(couponCode);
            couponCodeText = couponCode;
            $('.coupon-upgrade').attr('onclick', 'copyToClipboardAndUpgrade()');

            if (isSeolyUI || isEasySeoUI || isContent123UI) {
                if (isSeolyUI) {
                    ajaxSimpleLoadToDiv('/assets/htmls/countdownSeolyModal.html', 'BlackFridayModal');
                } else if (isContent123UI) {
                    ajaxSimpleLoadToDiv('/assets/htmls/countdown123contentModal.html', 'BlackFridayModal');
                } else if (isEasySeoUI) {
                    ajaxSimpleLoadToDiv('/assets/htmls/countdownEasyseoModal.html', 'BlackFridayModal');
                }
                setTimeout(function () {
                    $('#BlackFridayModal').modal('show');
                }, isEasySeoUI ? 10000 : 2000);
            }

            setInterval(function () {
                makeTimer(date);
            }, 1000);
        }
    }
}

function makeTimer(date) {
    let endTime = new Date(date);
    endTime = (Date.parse(endTime) / 1000);

    var now = new Date();
    now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;

    if (timeLeft > 0) {
        showCountdown = true;
        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }

        $(".countdownDays").html(days + "<span>  Day </span>");
        $(".countdownHours").html(hours + "<span>  Hours </span>");
        $(".countdownMinutes").html(minutes + "<span> Minutes </span>");
        $(".countdownSeconds").html(seconds + "<span>  Seconds </span>");
    } else {
        showCountdown = false;
    }
}

function getFormValues(form) {
    let data = form.serializeArray();
    if (sessionIdItem) {
        data.push(sessionIdItem);
    }
    return data;
}

function getFormDValues(form) {
    let json = Object.fromEntries(new FormData(form).entries());

    if (sessionIdItem) {
        json['sessionId'] = mainUserDetails['sessionId'];
    }
    return json;
}

function getPostParams(params) {
    const query = params + (mainUserDetails['sessionId'] ? ('&sessionId=' + mainUserDetails['sessionId']) : '');
    console.log('getPostParams ' + query);
    return query;
}

function getApiUrl(formId) {
    let url = apiUrl + formId;
    console.log('getApiUrl formId ' + formId);
    if (mainUserDetails && mainUserDetails['sessionId'] && url.indexOf('sessionId=') === -1) {
        url += (formId.indexOf('?') === -1 ? "?" : '&') + "sessionId=" + mainUserDetails['sessionId'];
    }
    console.log('getApiUrl url is ' + url);
    return url;
}

function renderOptScoreHtml(data) {
    let progressBarClass = "bg-success";
    if (data < 40) {
        progressBarClass = "bg-danger";
    } else if (data < 80) {
        progressBarClass = "bg-warning";
        // progressBarClass = "bg-secondary";
    }

    const width = data < 40 ? 40 : data;
    // let scoreHtml = '<div class="progress"><div class="progress-bar lp-progress ' + progressBarClass + '" role="progressbar" aria-valuenow="40"' +
    //     ' aria-valuemin="0" aria-valuemax="100"' +
    //     ' style="width:' + width + '%">' + formatBiggerThanZeroVal(data) + '%</div></div>';
    let scoreHtml = '                                            <div class="progress progressNew">\n' +
        '                                                <span class="progress_value">' + data + '%</span>\n' +
        // '                                                <span class="progress_value">' + formatBiggerThanZeroVal(data) + '%</span>\n' +
        // '                                                <div class="lp-progress  ' + progressBarClass + '" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + width + '%"></div>\n' +
        '                                                <div class="progress-bar lp-progress  ' + progressBarClass + '" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + width + '%"></div>\n' +
        '                                             </div>'
    return scoreHtml;
}
function getHoursDifference() {
    return (new Date().getTimezoneOffset()) / 60;
}

// query values - keywordResearch, title, metaDesc, landingPageText, titleAlternatives, metaDescAlternatives
// If query is titleAlternatives or metaDescAlternatives, val should be the page url and add keyword too
function getInsightsData(query, val, keyword, func) {
    let result;
    $.ajax({
        type: 'POST',
        url: getApiUrl('getInsightsDataWebsite?query=' + query + '&val=' + val + '&keyword=' + keyword),
        async: func!=null ? true : false,
        success: function (res) {
            if (res['data']) {
                result = res['data'];

                if (func)
                    func(result);
            } else {
                if (func)
                    func(result);
            }
        },
        error: function() {
            if (func)
                func(null);
        }
    });
    return result;
}

function updateExtraEmail(email) {
    let result;
    $.ajax({
        type: 'POST',
        url: getApiUrl('updateExtraEmailUser?email=' + email),
        async: false,
        success: function (result) {
            if (result['data']) {
                result = result['data'];
            }
        }
    });
    return result;
}
