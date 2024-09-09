$(document.head).append('<link rel="icon" type="image/x-icon" href="/assets/images/seoly/fac-ico.jpeg">');
 var apiUrl = '/';
    function isDev() {
    return location.toString().toLowerCase().includes("c:");
}
    $(document).ready(function () {
        addSeolyHotjar();
        initPlans();
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
    (item['planKeywords'] > 0 ? ('<li> ' + item['planKeywords'] + ' Keywords</li>') : '') +
    (planPrice > 0 ? '<li>On Page Optimization</li>' : '<li>Limited On Page Optimizer</li>') +
    (item['creditsMax'] > 0 ? ('<li>' + item['creditsMax'] + ' Off Page SEO Credits</li>') : '<li>Off Page 2 Directory Listings</li>') +
    (planPrice > 0 ? '<li>Hot Keywords Research</li>' : '') +
    (planPrice > 0 ? '<li>Backlinks Explorer</li>' : '') +
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
    $.getJSON(getApiUrl() + 'getMyJsonPricesGuest?mainSite=true', function (json) {
        console.log('getMyJsonPricesGuest ' + JSON.stringify(json));
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
function addSeolyHotjar() {
    console.log('start addHotjar seoly');
    (function (h, o, t, j, a, r) {
        h.hj = h.hj || function () {
            (h.hj.q = h.hj.q || []).push(arguments)
        };
        h._hjSettings = {hjid: 3908794, hjsv: 6};
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
}
