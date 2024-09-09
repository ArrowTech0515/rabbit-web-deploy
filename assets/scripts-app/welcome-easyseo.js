$(document.head).append('<link rel="icon" type="image/x-icon" href="/assets/home/easySeoFavicon.ico">');

$(".backtop").click(function () {
    $("html, body").animate({scrollTop: 0}, 1000);
});
$('body').click(function () {
    $('.signup_dropdown').removeClass('activeDrop');
    $('.login_dropdown').removeClass('activeDrop');
});

$( "body" ).delegate( ".signup_dropdown", "click", function(event) { 
    event.stopPropagation();
});
$( "body" ).delegate( ".login_dropdown", "click", function(event) {  
    event.stopPropagation();
});

var apiUrl = '/';
var packageName = "";
var pricePerMonth;

function isDev() {
    return location.toString().toLowerCase().includes("c:/") || location.toString().toLowerCase().includes("d:/") || location.toString().toLowerCase().includes("rabbitui.test/") || location.toString().toLowerCase().includes("aptest.therssoftware.com");
}

$(document).ready(function () {
    if (isDev()) {

        let json = '{"Starter":{"yearlyPrice":0,"planLinks":20,"planPriceCurrency":"$","planResearches":0,"planLinksBuilder":0,"guestBlogsMax":0,"packageId":48,"planName":"Starter","planWebsites":1,"planKeywords":0,"planPrice":0},"Business":{"yearlyPrice":720,"planLinks":1000,"planPriceCurrency":"$","planResearches":0,"planLinksBuilder":20,"guestBlogsMax":1,"packageId":50,"planName":"Business","planWebsites":1,"planKeywords":0,"planPrice":80},"Enterprise":{"yearlyPrice":1920,"planLinks":5000,"planPriceCurrency":"$","planResearches":0,"planLinksBuilder":30,"guestBlogsMax":5,"packageId":51,"planName":"Enterprise","planWebsites":1,"planKeywords":0,"planPrice":200},"Premium":{"yearlyPrice":300,"planLinks":200,"planPriceCurrency":"$","planResearches":0,"planLinksBuilder":10,"guestBlogsMax":0,"packageId":49,"planName":"Premium","planWebsites":1,"planKeywords":0,"planPrice":30}}';
        allPlans = JSON.parse(json);
        apiUrl = 'https://www.seoly.shop/';
        drawPlans();
    } else {
        initPlans();
    }

});
var yearly = false;
var allPlans;

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

        const blockedUntilPayment = false;
        html +=
            '<div class="col">' +
            '<div class="price_item ' + ('Business' === item['planName'] ? ' most_popular' : '') + '">' +
            '<div class="price_item_header ' + (packageName == item['planName'] ? ' ' : '') + '">' +
            '<h4 class="' + (packageName == item['planName'] ? '' : '') + '"><span class="sm2">' + item['planName'] + '</span></h4>' +
            '<h1>' + (!planPrice || planPrice === 0 ? "Free" : item['planPriceCurrency'] + (yearly ? discountedPlanPrice : planPrice) + '<div class="per_month"> Per Month </small>') +

            (yearly && planPrice > 0 ? ('<s>' + item['planPriceCurrency'] + planPrice + '</s>') : '') + ' </h1>' +
            '</div>' +
            '<div class="price_item_list">' +
            '<ul class="list-unstyled mt-3 mb-4" style="text-align: left;list-style: none;">' +
            (item['guestBlogsMax'] > 0 ? ('<li>' + item['guestBlogsMax'] + ' monthly Articles Publishment</li>') : '<li>One Article Publishment</li>') +
            (item['guestBlogsMax'] > 0 ? ('<li>' + (item['guestBlogsMax'] * 3) + ' High Quality Links every month</li>') : '') +
            (item['guestBlogsMax'] > 0 ? ('<li>Automatic Publishment</li>') : '') +
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

function getButton(item, price, yearly) {
    return '<button type="button" class="w-100 backtop opensignup btn btn-lg  ' + (packageName == item['planName'] ? 'btn-primary' : 'btn-outline-primary') + '" choosePlan="' + item['packageId'] + ',' + price + ',' + yearly + '" >Sign Up</button>';
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
    drawPlans();
    $('#planAnnually').addClass('active');
    $('#planMonth').removeClass('active');
}

function showMonthly() {
    yearly = false;
    drawPlans();
    $('#planMonth').addClass('active');
    $('#planAnnually').removeClass('active');
}

function initPlans() {
    $.getJSON(getApiUrl() + 'getMyJsonPricesGuest?mainSite=true', function (json) {
        console.log('getMyJsonPricesGuest ' + JSON.stringify(json));
        var array = [];
        for (key in json.map2) {
            array.push(json.map2[key]);
        }
        // array.sort(function (a, b) {
        //     return b.planPrice - a.planPrice;
        // });
        json = {
            "map2": {}
        };
        for (var i = 0; i < array.length; i++) {
            json.map2[array[i]['planName']] = array[i];
        }
        allPlans = json['map2'];
        drawPlans();
        // showYearly();
    })
}

$("body").on("click", ".opensignup", function (e) {
    e.stopPropagation();
    $(".signup_dropdown").toggleClass("activeDrop");
    $(".login_dropdown").removeClass("activeDrop");
    $("html, body").animate({scrollTop: 0}, 1000);


});

function choosePlan(packageId, price, yearly) {
    // x = $('body').find('.signup_icon');
    // console.log(x);
    // $(x).click();
    // $('.signup_icon').click();

    if (pricePerMonth > price) {
        showModal('Confirm', 'Are you sure you want to downgrade your package?', 'No', 'Yes');
        $('div#modalMessage button#modalSecondButton').click(function () {
            callChoosePlan(packageId, yearly);
        });
    } else {
        callChoosePlan(packageId, yearly);
    }
}

function callChoosePlan(packageId, yearly) {

}