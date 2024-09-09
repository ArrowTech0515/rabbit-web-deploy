
$(document.head).append('<link rel="icon" type="image/x-icon" href="/assets/images/rabbitFavicon.ico">');
 
$(document).ready(function () {
    var pathname = window.location.hash; 
    console.log(pathname);
     if (pathname == '#rabbitPlan') { 
        scrollTo('.pricing_tab_area') 
    }
     if (pathname == '#rabbitContactus') { 
        scrollTo('.contactUsFormContainer') 
    }
     if (pathname == '#rabbitSignup') { 
         scrollTo('.signUp_form_container') 
    }
    if (pathname == '#rabbitLoginBox') { 
        $("#rabbitLoginBox").trigger( "click" );
        $("#rabbitLoginBox").addClass("activeDrop");
    }
     
}); 
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
}

function showMonthly() {
    yearly = false;
    drawPlans();
}

var yearly = false;
$(document).ready(function () {
    if (isTestingMode()) {
        loadArticles();
    }
    loadPlans();
});

function loadPlans() {
    $.getJSON('https://www.rabbitseo.com/getMyJsonPricesGuest?mainSite=true', function (json) {
        //  $.getJSON('http://localhost:8080' + '/getMyJsonPricesGuest?mainSite=true', function (json) {
        console.log('getMyJsonPricesGuest hi test ami' + JSON.stringify(json));
        if (isTestingMode()) {
            // first json not working, second one working - packages are different
            // json = JSON.parse('{"data":null,"list":null,"list2":null,"map":null,"map2":{"Free":{"creditsMax":0,"yearlyPrice":0,"planPriceCurrency":"₪","planLinksBuilder":0,"packageId":44,"planName":"Free","planWebsites":1,"planKeywords":5,"fixedListings":0,"featuredListings":0,"planLinks":20,"planResearches":2,"guestBlogsMax":0,"planPrice":0},"Pro":{"creditsMax":0,"yearlyPrice":1080,"planPriceCurrency":"₪","planLinksBuilder":8,"packageId":45,"planName":"Pro","planWebsites":3,"planKeywords":100,"fixedListings":0,"featuredListings":0,"planLinks":200,"planResearches":10,"guestBlogsMax":0,"planPrice":100},"Best":{"creditsMax":0,"yearlyPrice":4320,"planPriceCurrency":"₪","planLinksBuilder":8,"packageId":46,"planName":"Best","planWebsites":40,"planKeywords":500,"fixedListings":0,"featuredListings":0,"planLinks":1000,"planResearches":20,"guestBlogsMax":0,"planPrice":400},"Agency":{"creditsMax":0,"yearlyPrice":10800,"planPriceCurrency":"₪","planLinksBuilder":8,"packageId":47,"planName":"Agency","planWebsites":100,"planKeywords":1500,"fixedListings":0,"featuredListings":0,"planLinks":5000,"planResearches":40,"guestBlogsMax":0,"planPrice":1000}},"obj":null,"obj2":null,"page":0,"records":0,"recordsFiltered":0,"recordsTotal":0,"rows":0,"sidx":null,"sord":null,"status":null,"total":0}');
            // json = JSON.parse('{"data":null,"list":null,"list2":null,"map":null,"map2":{"Starter":{"creditsMax":0,"yearlyPrice":0,"planPriceCurrency":"$","planLinksBuilder":0,"packageId":23,"planName":"Starter","planWebsites":1,"planKeywords":5,"fixedListings":0,"featuredListings":0,"planLinks":20,"planResearches":2,"guestBlogsMax":0,"planPrice":0},"Premium":{"creditsMax":0,"yearlyPrice":216,"planPriceCurrency":"$","planLinksBuilder":5,"packageId":17,"planName":"Premium","planWebsites":1,"planKeywords":50,"fixedListings":0,"featuredListings":0,"planLinks":200,"planResearches":50,"guestBlogsMax":0,"planPrice":25},"Business":{"creditsMax":0,"yearlyPrice":1032,"planPriceCurrency":"$","planLinksBuilder":40,"packageId":18,"planName":"Business","planWebsites":10,"planKeywords":500,"fixedListings":0,"featuredListings":0,"planLinks":1000,"planResearches":50,"guestBlogsMax":0,"planPrice":120},"Enterprise":{"creditsMax":0,"yearlyPrice":3024,"planPriceCurrency":"$","planLinksBuilder":120,"packageId":24,"planName":"Enterprise","planWebsites":100,"planKeywords":1200,"fixedListings":0,"featuredListings":0,"planLinks":5000,"planResearches":100,"guestBlogsMax":0,"planPrice":350}},"obj":null,"obj2":null,"page":0,"records":0,"recordsFiltered":0,"recordsTotal":0,"rows":0,"sidx":null,"sord":null,"status":null,"total":0}');
        }
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

function drawPlans() {
    var html = '';
    console.log('plans pricing ' + JSON.stringify(allPlans));
    for (let key in allPlans) {
        console.log('curr key ' + key)
        var item = allPlans[key];
        const realPrice = yearly ? item['yearlyPrice'] : item['planPrice'];
        const planPrice = yearly ? item['yearlyPrice'] / 12 : item['planPrice'];
        const monthlyPrice = item['planPrice'];
        const yearlyPrice = item['yearlyPrice'] / 12;
        const finalPrice = yearly ? '<h2 class="annuallyPrice">$<b>' + realPrice + '</b>/yr</h2>' : '';
        const priceText = (!planPrice || planPrice == 0 ? "Free" : item['planPriceCurrency'] + planPrice + '<small class="text-muted fw-light">/mo</small>') +
            (yearly && monthlyPrice > 0 ? ('<s>' + item['planPriceCurrency'] + monthlyPrice + '</s>') : '');
        console.log('yearly ' + yearly)
        console.log('monthlyPrice ' + monthlyPrice)
        console.log('finalPrice ' + finalPrice)
        console.log('priceText ' + priceText)
        html =
            '<div class="col">' +
            '<div class="card mb-4 rounded-3 shadow-sm border-primary">' +
            '<div class="card-header py-3 bg-primary border-primary">' +
            '<h4 class="my-0 fw-normal">' + item['planName'] + '</h4>' +
            '<h1 class="card-title pricing-card-title">' +
            (!planPrice || planPrice == 0 ? "Free" : item['planPriceCurrency'] + planPrice + '<small class="text-muted fw-light">/mo</small>') +
            (yearly && monthlyPrice > 0 ? ('<s>' + item['planPriceCurrency'] + monthlyPrice + '</s>') : '') + ' </h1>' +
            '</div>' +
            '<div class="pricing_package">1 Website <br>5 Keywords</div>' +
            '<div class="card-body">' +
            '<ul class="list-unstyled mt-3 mb-4" style="text-align: left;list-style: inside;">' +
            // (appDomainName === 'Shopify' ? '' : '<li> ' + item['planWebsites'] + ' Websites</li>') +
            '<li> ' + item['planKeywords'] + ' Keywords</li>' +
            '<li> ' + item['planResearches'] + ' Researches / mo</li>' +
            (item['planLinksBuilder'] > 0 ? '<li> ' + item['planLinksBuilder'] + ' Links Building / mo</li>' : '') +
            // (item['planLinksBuilder'] > 0 ? '<li> ' + item['planLinksBuilder'] + ' Links Building / mo</li>' : '<li> ' + item['planLinks'] + ' Links</li>') +
            '</ul>' +
            finalPrice +
            '</div>' +
            '<div class="pricing_button"><a href="signup-form.html" class="chesePlan">Choose Plan</a></div>' +
            '</div>' +
            '</div>' + html;

            let keyFinal = '';
            if(key=="Starter") keyFinal = "Free";
            else if(key=="Premium") keyFinal = "Pro";
            else if(key=="Business") keyFinal = "Best";
            else if(key=="Enterprise") keyFinal = "Agency";
            else keyFinal = key;

        $('#package' + keyFinal + ' h2.prici_title').html(key);
        $('#package' + keyFinal + ' div.pricing_inner h2').html(priceText);
        $('#package' + keyFinal + ' div.pricing_package').html(item['planWebsites'] + ' Websites <br/>' +
            item['planKeywords'] + ' Keywords<br/>' +
            item['planLinksBuilder'] + ' Monthly Backlinks<br/>' +
            item['planResearches'] + ' Researches');
    }
    // $('#plans main div').html(html);
}

function loadArticles() {
    $.getJSON('https://www.rabbitseo.com/getMyJsonListRabbitPostsGuest?mainSite=true', function (json) {
        console.log('latesrt is   and getMyJsonListRabbitPostsGuest ' + JSON.stringify(json));
        var array = [];
        for (postkey in json.obj) {
            array.push(json.obj[postkey]);
        }
        allPost = json['obj'];
        latestPost();
    })
    $.getJSON('https://www.rabbitseo.com/getMyJsonListRabbitPostsGuest?mainSite=true', function (json) {
        console.log('latesrt is   and getMyJsonListRabbitPostsGuest ' + JSON.stringify(json));
        var array = [];
        for (postkey in json.obj) {
            array.push(json.obj[postkey]);
        }
        allPost = json['obj'];
        latestPostTop();
    })
}
 
function latestPost() {
    console.log('start latestPost json'  , JSON.parse(allPost));
    let postlist =  JSON.parse(allPost);
    var html = '';
    for (let i = 0; i < postlist.length; i++) {
        // console.log(111111111) ;
        console.log(postlist[i].title.rendered) ;
        let postDate = new Date(postlist[i].date);
        let formattedDate = postDate.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        html += '<div class="sliderListItem"><div class="sliderListItemContent"><div class="homeLatestPostContent"> '+
        '<h3><a href="'+ postlist[i].link +'" target="_blank">' + postlist[i].title.rendered +'</a></h3>'+
        '<p>' + formattedDate + '</p>' +
        '</div> <a class="readMoreBtn" href="'+ postlist[i].link +'" target="_blank">Read More</a></div></div>';
    }
    $('#latestPost').html(html);
}
function latestPostTop() {
    console.log('allPost rs 12345678 '  , JSON.parse(allPost));
    let postlist =  JSON.parse(allPost);
    var html = '';
    for (let i = 0; i < postlist.length; i++) {
        console.log(postlist[i].title.rendered) ;
         let postDate = new Date(postlist[i].date);
        let formattedDate = postDate.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        html += '<div class="sliderListItem"><div class="sliderListItemContent"><div class="homeLatestPostContent"> '+
        '<h3><a href="'+ postlist[i].link +'" target="_blank">' + postlist[i].title.rendered +'</a></h3>'+
        '<p>' + formattedDate + '</p>' +
        '</div> <a class="readMoreBtn" href="'+ postlist[i].link +'" target="_blank">Read More</a></div></div>';
    }
    $('#latestPostTop').html(html);
}