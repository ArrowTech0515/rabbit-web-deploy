$(document.head).append('<link rel="icon" type="image/x-icon" href="/assets/images/links4u/favicon.ico">');
 
var apiUrl = '/';

function isDev() {
    return location.toString().toLowerCase().includes("c:");
}

$(document).ready(function () {
    if (isDev()) {
        let json = '{"Enterprise":{"yearlyPrice":1920,"planLinks":5000,"planPriceCurrency":"$","planResearches":0,"planLinksBuilder":30,"guestBlogsMax":5,"packageId":51,"planName":"Enterprise","planWebsites":1,"planKeywords":0,"planPrice":200},"Premium":{"yearlyPrice":300,"planLinks":200,"planPriceCurrency":"$","planResearches":0,"planLinksBuilder":10,"guestBlogsMax":0,"packageId":49,"planName":"Premium","planWebsites":1,"planKeywords":0,"planPrice":30},"Starter":{"yearlyPrice":0,"planLinks":20,"planPriceCurrency":"$","planResearches":0,"planLinksBuilder":0,"guestBlogsMax":0,"packageId":48,"planName":"Starter","planWebsites":1,"planKeywords":0,"planPrice":0},"Business":{"yearlyPrice":720,"planLinks":1000,"planPriceCurrency":"$","planResearches":0,"planLinksBuilder":20,"guestBlogsMax":1,"packageId":50,"planName":"Business","planWebsites":1,"planKeywords":0,"planPrice":80}}';
        allPlans = JSON.parse(json);
        apiUrl = 'https://www.links4u.net/';
        drawPlans();
    } else {
        initPlans();
    }

});
var yearly = false;
var allPlans;

function drawPlans() {
    var html = '';
    for (const key in allPlans) {
        var item = allPlans[key];
        const realPrice = yearly ? item['yearlyPrice'] : item['planPrice'];
        const planPrice = yearly ? item['yearlyPrice'] / 12 : item['planPrice'];
        const monthlyPrice = item['planPrice'];
        const yearlyPrice = item['yearlyPrice'] / 12;
        html =
            '<div class="col">' +
            '<div class="card mb-4 rounded-3 shadow-sm">' +
            '<div class="card-header py-3">' +

            '<h1 class="card-title pricing-card-title">' + (!planPrice || planPrice == 0 ? "Free" : item['planPriceCurrency'] + planPrice + '<small class="text-muted fw-light">/mo</small>') +
            '<h4 class="my-0 fw-normal"><span class="sm1">Per month</span><span class="sm2">' + item['planName'] + '</span></h4>' +
            (yearly && monthlyPrice > 0 ? ('<s>' + item['planPriceCurrency'] + monthlyPrice + '</s>') : '') + ' </h1>' +
            '</div>' +
            '<div class="card-body">' +
            '<ul class="list-unstyled mt-3 mb-4" style="text-align: left;list-style: inside;">' +
            (item['fixedListings'] === 1 ? ('<li> One Premium Listing</li>') : '') +
            (item['fixedListings'] > 1 ? ('<li> ' + item['fixedListings'] + ' Premium Listings</li>') : '') +
            (item['featuredListings'] > 0 ? ('<li> ' + item['featuredListings'] + ' Featured Listings</li>') : '') +
            (item['planLinksBuilder'] > 0 ? ('<li> ' + item['planLinksBuilder'] + ' New Listings / mo</li>') : '') +
            (item['guestBlogsMax'] > 0 ? ('<li> ' + item['guestBlogsMax'] + ' New Guest Blogs / mo</li>') : '') +
            // '<li>2 Free links</li>' +
            // (realPrice > 0 ? '<li>2 Extra links</li>' : '') +
            '</ul>' +
            '<h2 class="annuallyPrice">$<b>' + realPrice + '</b>/yr</h2>' +
            // getButton(item, realPrice, yearly) +
            '</div>' +
            '</div>' +
            '</div>' + html;
    }
    $('#plans main div').html(html);
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
    $.getJSON(getApiUrl() + '/getMyJsonPricesGuest?mainSite=true', function (json) {
        console.log('getMyJsonPricesGuest result ' + JSON.stringify(json));
        var array = [];
        for (key in json.map2) {
            array.push(json.map2[key]);
        }
        array.sort(function (a, b) {
            return b.planPrice - a.planPrice;
        });
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