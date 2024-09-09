$(document.head).append('<link rel="icon" type="image/x-icon" href="/assets/images/easySeoFavicon.ico">');

$(document).ready(function () {
    isEasySeoUI = true;
    $('[data-bs-toggle="tooltip"]').tooltip();
});
$(".navbar-nav .nav-link").click(function () {
    $(".navbar-collapse").removeClass("show");
});

let showTutorial = true;

$(document).ready(function () {
    console.log('location.toString() is ' + location.toString());
    $('.logoutLink').attr('href', getApiUrl('logoutGeneric'));
    initScreenView();
    setAjaxProgressBar();
});

function initScreenView() {
    let showSignup = mainUserDetails['keywordsUsed'] === 0 && mainUserDetails['linksUsed'] === 0;
    console.log('showSignup ' + showSignup);
    initPlans();
    if (showTutorial) {
        $('button#tutorial').show();
    } else {
        $('button#tutorial').hide();
    }
    $('.userId').val(mainUserDetails['id']);

    if (showSignup) {
        //$('#navbarSupportedContent').hide();
        $('#signupDiv').show();
        loadKeywordsSuggestions();
        ajaxSimpleLoadToDiv('/assets/htmls/ranksExplorer.html', 'keywordSuggestions');

        if (mainUserDetails['wixUrl'] && mainUserDetails['wixUrl'].length > 5) {
            $('#url').val(mainUserDetails['wixUrl']);
        }
    } else {
        $('.loadingBar').hide();
    }
    showHideTestingMode();
    loadLanguages();
    showApp();

    if (isShabbat) {
        payingUser = true;
        $('#upgrade-tab').hide();
        $('.pay-as-you-go-link').hide();
    }
}

function choosePlan(packageId, price, yearly) {
    if (pricePerMonth > price) {
        showModal('Confirm', 'Are you sure you want to downgrade your package?', 'No', 'Yes');
        $('div#modalMessage button#modalSecondButton').click(function () {
            callChoosePlan(packageId, yearly);
        });
    } else {
        callChoosePlan(packageId, yearly);
    }
}

function showApp() {
    console.log('start showApp')
    window.scrollTo(0, 0);
    activeTab = 'articles';
    handleUpgradeViews();
    initArticlesBuilding();
    showArticleStepper();
    console.log('mainUserDetails[\'hasCover\'] is ' + mainUserDetails['hasCover']);
    
    $( "body" ).delegate( "#next_select2", "click", function() {
        $('#ChooseLandingPage option:selected').next().attr('selected', 'selected').change();
        $('#ChooseLandingPage option:selected').siblings().removeAttr('selected', 'selected').change();
        $('#ChooseLandingPage option:selected').prev().removeAttr('selected', 'selected').change();
    });

    $( "body" ).delegate( "#prev_select2", "click", function() {
        $('#ChooseLandingPage option:selected').prev().attr('selected', 'selected').change();
        $('#ChooseLandingPage option:selected').siblings().removeAttr('selected', 'selected').change();
        $('#ChooseLandingPage option:selected').next().removeAttr('selected', 'selected').change();

    });

    $('#ChooseLandingPage').on('select2:select', function (e) {
        $('#ChooseLandingPage option').removeAttr('selected', 'selected').change();
        $('#ChooseLandingPage option:selected').attr('selected', 'selected').change();

    });
    // showAppOptimize() ;

    // if (isTestingMode()) {
        showHeaderCountdown("1 December 2023 12:00:00 GMT+02:00", "4F9EBlackFriday");
    // }
}

function setAjaxProgressBar() {
    $(document).ajaxStart(function () {
        // $('.spinner-border').show();
    });
    $(document).ajaxStop(function () {
        $('.progress_step:not(.article_progress_step)').hide();
    });
}

function setUserDetailsValues() {
}
function drawPlans() {
    var html = '';
    console.log('plans pricing ' + JSON.stringify(allPlans));
    for (const key in allPlans) {
        console.log('curr plan ' + key);
        var item = allPlans[key];
        const realPrice = yearly ? item['yearlyPrice'] : item['planPrice'];
        const planPrice = item['planPrice'];
        const discountedPlanPrice = item['yearlyPrice'] / 12;
        const yearlyPrice = item['yearlyPrice'] / 12;
        html +=
            '<div class="col">' +
            '<div class="price_item ' + ('Business' === item['planName'] ? ' most_popular' : '') + '">' +
            '<div class="price_item_header ' + (packageName == item['planName'] ? ' ' : '') + '">' +
            '<h4 class="' + (packageName == item['planName'] ? '' : '') + '"><span class="sm2">' + item['planName'] + '</span></h4>' +
            '<h1>'+ (yearly && planPrice > 0 ? ('<s>' + item['planPriceCurrency'] + planPrice * 12 + '</s>') : '')  + (!planPrice || planPrice === 0 ? "Free" : item['planPriceCurrency'] + (yearly ? (yearlyPrice * 12) : planPrice) +
            //'<div class="per_month"> Per ' + (yearly ? 'Year' : 'Month') + ' </small>') +
            '<div class=" ' + (yearly ? 'per_month yearly' : 'per_month') + ' ">  ' + (yearly ? '<span>/year</span>' : 'Per Month') + ' ') +
            
            (yearly && planPrice > 0 ? ' ' + item['planPriceCurrency'] + discountedPlanPrice + '/mo' : '')
            + ' </h1>' +
            // '<h1>' + (!planPrice || planPrice === 0 ? "Free" : item['planPriceCurrency'] + (yearly ? discountedPlanPrice : planPrice) + '<div class="per_month"> Per Month </small>') +
            // (yearly && planPrice > 0 ? ('<s>' + item['planPriceCurrency'] + planPrice + '</s>') : '') + ' </h1>' +

            '</div>' +
            '<div class="price_item_list">' +
            '<ul class="list-unstyled mt-3 mb-4" style="text-align: left;list-style: none;">' +
            (item['guestBlogsMax'] > 0 ? ('<li>' + item['guestBlogsMax'] + ' monthly Articles Posting</li>') : '<li>One Free Article</li>') +
            (item['guestBlogsMax'] > 0 ? ('<li>' + (item['guestBlogsMax'] * 3) + ' High Quality Links every month</li>') : '') +
            (item['guestBlogsMax'] > 0 ? ('<li>Automatic Posting</li>') : '') +
            (item['guestBlogsMax'] > 0 ? ('<li>Multiple Keywords & Images Selections</li>') : '') +
            // (item['planLinksBuilder'] > 0 ? ('<li> ' + item['planLinksBuilder'] + ' Listings / mo</li>') : '') +
            // (item['guestBlogsMax'] > 0 ? ('<li> ' + item['guestBlogsMax'] + ' Guest Blogs Link / mo</li>') : '') +
            // '<li>Limited Free Listings</li>' +
            // (realPrice > 0 ? '<li>2 Extra links</li>' : '') +
            '</ul>' +
            '<h2 class="annuallyPrice">' + (realPrice > 0 ? '$<b>' + realPrice + '</b>/' + (yearly ? 'yr' : 'mo') : 'Free') + '</h2>' +
            // getButton(item, realPrice, yearly) +
            (packageName === item['planName'] && !blockedUntilPayment ? '<div style="visibility:hidden">' : '') +
            getButton(item, realPrice, yearly) +
            (packageName === item['planName'] && !blockedUntilPayment ? '</div>' : '') +
            '</div>' +
            '</div>' +
            '</div>';
    }
    $('#plans main div').html(html);
}


$('#sitemap-tab').click(function () {
    // if (!loadedLandingPages) {
 
    loadCompsToSelect('#onPageCompOverviewUrl');
    // loadedLandingPages = true;
    // }
});