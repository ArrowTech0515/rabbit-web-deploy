function initAllTitles() {
    titleFeaturedCustomer.push('Featured Customers');
    titleFeaturedCustomer.push('Hot Listings');
    titleFeaturedCustomer.push('Featured Listings');

    titleCategories.push('Categories');

    titleRecentlyAdded.push('Recently Added');
    titleRecentlyAdded.push('New Listings');
    titleRecentlyAdded.push('Hot Listings');
    titleRecentlyAdded.push('New Businesses');

    titleRecentPosts.push('Recent Posts');
    titleRecentPosts.push('Recent Blog Posts');
    titleRecentPosts.push('New Posts');
    titleRecentPosts.push('Recent Articles');

    siteAddYourBusinessHere.push('ADD YOUR BUSINESS HERE');
    siteAddYourBusinessHere.push('Add Your Listing Today - Free');
    siteAddYourBusinessHere.push('FREE - APPLY YOUR LISTING NOW');
    siteAddYourBusinessHere.push('CLAIM YOUR LISTING NOW');
    siteAddYourBusinessHere.push('Free - Claim Your Listing Now');

    siteAddYourBusinessHereUrl.push('https://www.rabbitseo.com/');
    siteAddYourBusinessHereUrl.push('https://www.links4u.net/');
}

function initListings() {
    console.log('location.search ' + location.search);
    var catVal = getUrlParameter("cat");
    var bizVal = getUrlParameter("biz");

    if (!bizVal) {
        bizVal = getUrlParameter("val");
    }
    if (!bizVal) {
        bizVal = getUrlParameter("domain");
    }
    if (!bizVal) {
        bizVal = getUrlParameter("site");
    }
    if (!bizVal) {
        bizVal = getUrlParameter("id");
    }
    if (!bizVal) {
        bizVal = getUrlParameter("website");
    }
    console.log('bizParameter ' + bizParameter)
    sourceSite = location.href;

    let themeCss;
    if (sourceSite.indexOf("?") !== -1) {
        sourceSite = location.href.slice(0, sourceSite.indexOf("?"));
    }
    console.log('sourceSite ' + sourceSite);
    if ((sourceSite.toLowerCase().includes('c:/') || sourceSite.includes('localhost') || sourceSite.includes('rabbitseo.com'))) {
        // sourceSite = 'newyorkmagazine.co.uk';
        // sourceSite = 'theamericanreporters.com';
        // sourceSite = 'newspronto.co.uk';
        sourceSite = generateUUID();

        sourceSite = getHostname(sourceSite.toString());
        let currTheme = getCurrThemeDir();
        sourceSiteDir = currTheme;
        if (sourceSiteImagesDir) {
            sourceSiteImagesDir = "assets/";
        } else {
            sourceSiteImagesDir = sourceSiteDir + 'assets/';
        }
    } else {
        sourceSite = getHostname(sourceSite.toString());
        console.log('hostname is ' + sourceSite)
        // sourceSite = sourceSite.toString().replaceAll("listings/", "");
        sourceSite = removeLastSlash(sourceSite.toString());
        let currTheme = getCurrThemeDir();
        sourceSiteDir = resourcesUrl + currTheme;
        if (sourceSiteImagesDir) {
            sourceSiteImagesDir = resourcesUrl + "assets/";
        } else {
            sourceSiteImagesDir = sourceSiteDir + "assets/";
        }
        console.log('final sourceSite ' + sourceSite);
    }

    $.ajax({
        url: resourcesUrl + 'baseStyle.css', dataType: 'html', success: function (data) {
            // console.log(resourcesUrl + 'baseStyle.css is ' + data)
            $("<style>" + data + " </style>").appendTo("head");
        }
    });

    let siteTitles = [];
    let titles = [];
    initSiteTitles(titles, siteTitles);
    initAllTitles();

    let currTitle = siteTitles[sourceSite];
    if (!currTitle) {
        currTitle = titles.at(Math.floor(Math.random() * titles.length))
    }
    let firstWord = currTitle.split(" ")[0]
    let restTitle = currTitle.replace(firstWord, '');
    $('p.brandTitle span.text1').html(firstWord + ' ');
    $('p.brandTitle span.text2').html(restTitle);

    console.log('final sourceSite ' + sourceSite);
    console.log('set homeLink to ' + location.href.split("?")[0])
    // $('.homeLink').attr('href', 'javascript: loadMain()');
    $('.homeLink').attr('href', location.href.split("?")[0]);

    const sumLetters = getSumLetters(sourceSite);
    const finalBanners = 58;
    const finalLoaders = 50;
    const finalAltImages = 58;
    $('.banner').css('background-image', 'url(\'' + sourceSiteImagesDir + 'banners/' + (sumLetters % finalBanners) + '.png\')');
    $('.loader-image').attr('src', sourceSiteImagesDir + 'loading/' + (sumLetters % finalLoaders) + '.gif');
    altImage = sourceSiteImagesDir + 'alt/' + (sumLetters % finalAltImages) + '.png';

    const finalHomeDesigns = 10;
    showHomeDesign = sumLetters % finalHomeDesigns;
    if (isTestingMode()) {
        // showHomeDesign = 2;
    }
    $("[id^=homeListingsDesign]").not("#homeListingsDesign" + showHomeDesign).html('');
    console.log('#####################showMainListings sumLetters ' + sumLetters +
        ' finalDesigns ' + finalHomeDesigns + ' showDesign ' + showDesign);

    const finalCatDesigns = 5;
    showCatDesign = sumLetters % finalCatDesigns;
    if (isTestingMode()) {
        // showCatDesign = 4;
    }
    $("[id^=catListingsDesign]").not("#catListingsDesign" + showCatDesign).html('');
    console.log('#####################showCat sumLetters ' + sumLetters +
        ' finalDesigns ' + finalCatDesigns + ' showDesign ' + showCatDesign);

    const finalDesigns = 20;
    showDesign = sumLetters % finalDesigns;
    if (isTestingMode()) {
        // showDesign = 3;
    }
    $("[id^=listingsDesign]").not("#listingsDesign" + showDesign).html('');
    console.log('#####################showSingleBusiness sumLetters ' + sumLetters +
        ' finalDesigns ' + finalDesigns + ' showDesign ' + showDesign);

    if (bizVal || catVal) {
        if (catVal) {
            showCat(catVal);
        } else if (bizVal) {
            showSingleBusiness(bizVal);
        } else {
            loadMain();
        }
    } else {
        loadMain();
    }

    handleSearch();
}

function initSiteTitles(titles, siteTitles) {
    titles.push('Maximizing your online Exposure');
    titles.push('Enhancing Your Digital Visibility');
    titles.push('Optimizing Your Online Exposure');
    titles.push('Boosting Your Web Presence');
    titles.push('Maximizing Your Online Reach');
    titles.push('Optimizing Your Web Exposure');
    titles.push('Increasing Your Digital Exposure');
    titles.push('Publish your Website');
    titles.push('Drive more Traffic');
    titles.push('YOUR BUSINESS DATABASE');
    titles.push('Modern listings for small businesses');
    titles.push('DISCOVER Your Business');
    titles.push('EXPLORE Your Venture');
    titles.push('UNCOVER Your Enterprise Potenial');
    titles.push('REVEAL Your Business');
    titles.push('FIND Your Company');
    titles.push('EXPAND Your Small Business');
    titles.push('EXPLOIT Your Entrepreneurship');
    titles.push('REVEAL Your Local Business');
    titles.push('UNLEASH Your Business Potential');
    titles.push('Cutting-Edge Directories for Small Enterprises');
    titles.push('Innovative Listings to Boost Your Small Business');
    titles.push('Contemporary Directories for Modern Small Businesses');
    titles.push('Up-to-Date Listings to Promote Your Small Enterprise');
    titles.push('Advanced Directories Tailored for Small Businesses');
    titles.push('Forward-Thinking Listings for Today\'s Small Enterprises');
    titles.push('Progressive Directories to Showcase Your Small Business');
    titles.push('Futuristic Listings for Forward-Looking Small Businesses');
    titles.push('Contemporary Directories to Propel Your Small Enterprise');
    titles.push('High-Tech Listings for Modern Small Business Owners');
    titles.push('Listings for Small Medium Businesses');

    siteTitles['theamericanreporters.com'] = 'Maximizing your online Exposure';
    siteTitles['the-index.biz'] = 'YOUR BUSINESS DATABASE';
    siteTitles['premium-biz.com'] = 'Modern listings for small businesses';
    siteTitles['smb-listing.com'] = 'DISCOVER Your Business';
    siteTitles['onlinebusinesses.site'] = 'Online Businesses';
    siteTitles['bizweb.info'] = 'Listings for Small Medium Businesses';
}

function getSumLetters(str) {
    str = str.toLowerCase();
    let sum = [...str].map(c => numbers[c] || 0).reduce((a, b) => a + b, 0);
    // console.log('getSumLetters for str ' + str + ' is ' + sum)
    return sum;
}

function removeHttp(url) {
    return url.replace(/^https?:\/\//, '');
}

function minifyDomainUrl(url) {
    // console.log('minifyDomainUrl ' + url);
    if (url) {
        url = removeHttp(url.toString());
        url = removeLastSlash(url.toString());
        url = url.replace("www.", "");
    }
    // url = encodeURIComponent(url);
    // console.log('minifyDomainUrl return ' + url);
    return url;
}

function doSearch(val) {
    if (val.length > 2) {
        console.log('searchVal ' + val);

        $.getJSON(apiUrl + 'getMyJsonSearchPublishLinksGuest?source=' + sourceSite + '&limit=10&search=' + val, function (json) {
            console.log('getMyJsonSearchPublishLinks' + JSON.stringify(json));
            json = JSON.parse(json.data);
            showBizListingsNew(json);
            scrollTo('#homeListingsDesign' + showHomeDesign + ' .titleRecentlyAdded');
        });
    } else {
        loadMain();
    }
}

function ajaxSearch(obj) {
    clearTimeout(inputTimer);
    let searchVal = $(obj).val();
    inputTimer = setTimeout(function () {
        doSearch(searchVal);
    }, 500);
}

function socialshareList() {
    var domainnewurl = window.location.href;

    var socialList = "<a  target='_blank' href='https://www.facebook.com/sharer/sharer.php?u=" + domainnewurl + "'><img src='/assets/images/newicon/facebook.png' /></a> <a target='_blank' href='https://www.twitter.com/share?url=" + domainnewurl + "'><img src='/assets/images/newicon/x.png' /></a> <a target='_blank' href='https://www.youtube.com/share?url=YourVideoUR'><img src='/assets/images/newicon/youtube.png' /></a> <a target='_blank' href='https://www.instagram.com/YourUsername'><img src='/assets/images/newicon/instagram.png' /></a> <a target='_blank' href='https://www.linkedin.com/shareArticle?mini=true&url=" + domainnewurl + "'><img src='/assets/images/newicon/linkedin.png' /></a> <a target='_blank' href='https://search.google.com/local/writereview?placeid=YourPlaceID'><img src='/assets/images/newicon/googleBusiness.png' /></a> <a target='_blank' href='https://www.reddit.com/submit?url=" + domainnewurl + "'><img src='/assets/images/newicon/reddit.png' /></a> <a target='_blank' href='https://www.tumblr.com/widgets/share/tool?canonicalUrl=" + domainnewurl + "'><img src='/assets/images/newicon/tumblr.png' /></a> <a target='_blank' href='https://pinterest.com/pin/create/button?url=" + domainnewurl + "'><img src='/assets/images/newicon/pinterest.png' /></a>"
    $('.shareButtonList').html(socialList);
}

function unslickAll() {
    try {
        const sliders = document.querySelectorAll('.slick-initialized');
        sliders.forEach(item => {
            $(item).slick('unslick');
        })
    } catch (e) {
        console.log(e)
    }
}

function showSliderFeature(showHomeDesign){
     if(showHomeDesign === 0 || showHomeDesign === 1 || showHomeDesign === 3 || showHomeDesign === 4 || showHomeDesign === 5 || showHomeDesign === 6 || showHomeDesign === 8 || showHomeDesign === 9){
        if($('.featuredCustomerListNew').length){
            try{
             // $('.featuredCustomerListNew').slick('unslick');
                unslickAll();
            } catch(e) {
                console.log(e)
            }
            $('.featuredCustomerListNew').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }

                ]
            });
        }
    }
    else if(showHomeDesign === 2 ||  showHomeDesign === 7){
         if($('.featuredCustomerListNew').length){
             unslickAll();
             $('.featuredCustomerListNew').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }

                ]
            });
        }
    }
}

function showBizFeatureNew(featuredCustomerListNew) {
    var html = '';
    if(showHomeDesign === 2 || showHomeDesign === 7){
        for (let i = 0; i < featuredCustomerListNew.length; i+=2) {
            // const item = featuredCustomerListNew[i];
            // const item1 = featuredCustomerListNew[i+1];

            // console.log(item);

            html += '<div><div class="featureItems">\n' +
                ' <div class="b_logo" onclick="showSingleBusiness(\'' + minifyDomainUrl(featuredCustomerListNew[i]['domain']) + '\')">\n'
                + getImageLink(featuredCustomerListNew[i]) +
                '  <div><h3 class="title_2">' + getDomainText(featuredCustomerListNew[i]) + '</h3>\n' +

                // '  <div><h3 class="title_2">' + item['name'] + '</h3>\n' +
                ' <p class="big_pra">' + featuredCustomerListNew[i]['category'] + '</p>\n' +
                ' </div></div>\n' +
                ' </div>';
            try{
                html += '<div class="featureItems">\n' +
                ' <div class="b_logo" onclick="showSingleBusiness(\'' + minifyDomainUrl(featuredCustomerListNew[i+1]['domain']) + '\')">\n'
                + getImageLink(featuredCustomerListNew[i+1]) +
                '  <div><h3 class="title_2">' + getDomainText(featuredCustomerListNew[i+1]) + '</h3>\n' +

                // '  <div><h3 class="title_2">' + item['name'] + '</h3>\n' +
                ' <p class="big_pra">' + featuredCustomerListNew[i+1]['category'] + '</p>\n' +
                ' </div></div>\n' +
                ' </div></div>';
            } catch(err){}
        }
    }else{
        for (let i = 0; i < featuredCustomerListNew.length; i++) {
        const item = featuredCustomerListNew[i];

        // console.log(item);

        html += '<div class="featureItems">\n' +
            ' <div class="b_logo" onclick="showSingleBusiness(\'' + minifyDomainUrl(item['domain']) + '\')">\n'
            + getImageLink(item) +
            '  <div><h3 class="title_2">' + getDomainText(item) + '</h3>\n' +

            // '  <div><h3 class="title_2">' + item['name'] + '</h3>\n' +
            ' <p class="big_pra">' + item['category'] + '</p>\n' +
            ' </div></div>\n' +
            ' </div>';

        }
    }

    $('.featuredCustomerListNew').html(html);
     // console.log('calling createCarousel wait')
        setTimeout(function () {
            // console.log('calling createCarousel start now')
            showSliderFeature(showHomeDesign);
        }, 200);

}

function showBizListingsNew(json) {
    var html = '';
    for (let i = 0; i < json.length; i++) {
        const item = json[i];

        // console.log(item);
        addSocialIcon(item, 'facebook');
        addSocialIcon(item, 'twitter');
        addSocialIcon(item, 'pinterest');
        addSocialIcon(item, 'linkedin');
        addSocialIcon(item, 'youtube');
        addSocialIcon(item, 'instagram');
        addSocialIcon(item, 'reddit');
        addSocialIcon(item, 'x');
        addSocialIcon(item, 'tumblr');
        addSocialIcon(item, 'snapchat');
        addSocialIcon(item, 'googleBusiness');


        let hidemyAddress = (item['address'] == undefined ? "d-none" : (item['address'][0].trim() == '' ? "d-none" : item['address'][0]));

        html += '<div style="cursor:pointer">\n' +
            ' <div class="b_logo" onclick="showSingleBusiness(\'' + minifyDomainUrl(item['domain']) + '\')">\n'
            + getImageLink(item) +
            '  <div><h3 class="title_2">' + getDomainText(item) + '</h3>\n' +
            '<div class="addressHome"><div class="' + hidemyAddress + '">' + item['address'] + '</div></div>' +
            // '  <div><h3 class="title_2">' + item['name'] + '</h3>\n' +
            ' <p class="big_pra">' + item['category'] + '</p>\n' +
            ' </div></div>\n' +
            '<div class="socialSection">' +
            '<div>' +
            '<a style="display: none" target="_blank" class="facebookPage"><img src="/assets/images/home_icon/facebook.png" alt="facebook"/></a>' +
            '<a style="display: none" target="_blank" class="twitterPage"><img src="/assets/images/home_icon/twitter.png"/></a>' +
            '<a style="display: none" target="_blank" class="linkedinPage"><img src="/assets/images/home_icon/linkedin.png" /></a>' +
            '<a style="display: none" target="_blank" class="pinterestPage"><img src="/assets/images/home_icon/pinterest.png" /></a>' +
            '<a style="display: none" target="_blank" class="youtubePage"><img src="/assets/images/home_icon/youtube.png" /></a>' +
            '<a style="display: none" target="_blank" class="instagramPage"><img src="/assets/images/home_icon/instagram.png"/></a>' +
            '<a style="display: none" target="_blank" class="redditPage"><img src="/assets/images/home_icon/reddit.png" /></a>' +
            '<a style="display: none" target="_blank" class="tumblrPage"><img src="/assets/images/newicon/tumblr.png" /></a>' +
            '<a style="display: none" target="_blank" class="snapchatPage"><img src="/assets/images/newicon/snapchat.png" /></a>' +
            '<a style="display: none" target="_blank" class="googlePage"><img src="/assets/images/newicon/googleBusiness.png" /></a>' +

            '</div>' +
            '</div>' +
            '<button class="btn btn-primary seeDetails" onclick="showSingleBusiness(\'' + minifyDomainUrl(item['domain']) + '\')">See Details</button>' +
            ' </div>';

    }
    // console.log('loadPublishLinks html ' + html);
    $('.listingsMainDomains').html(html);
}

function showBizPostNew(json) {
    if (json) {
        var html = '';

        for (let i = 0; i < json.length; i++) {
            const item = json[i];
            // console.log(item, 'qwed');

            html += '<div>\n' +
                ' <span>' + (i + 1) + '</span>\n' +
                '<div> <a href="' + item.pageUrl + '" target="_blank">' + item.pageTitle + '\n' +
                '<p>' + item.pageUrl + '</p></a></div>\n' +
                ' </div>';
        }
        $('.listingsRecentPosts').html(html);
    } else {
        $('.listingsRecentPosts').hide();
        $('.recentPostsSection').hide();
    }
}

function loadPublishLinks() {
    
    const url = apiUrl + 'getMyJsonAllPublishLinksGuest?source=' + sourceSite + '&limit=24';
    // console.log('loadPublishLinks url is ' + url);

    $.getJSON(url, function (json) {

        // console.log('loadPublishLinks json ' + JSON.stringify(json.obj));
        let featuredCustomerListNew = json.obj;
        let jsonRecent = json['obj2'];
        json = JSON.parse(json.data);

        showBizListingsNew(json);
        if (jsonRecent && jsonRecent['blogPosts']) {
            showBizPostNew(jsonRecent['blogPosts']);
        }

        // console.log('calling createCarousel wait')
        setTimeout(function () {
            // console.log('calling createCarousel start now')
            showBizFeatureNew(featuredCustomerListNew);
        }, 200);
    });
}

function getImageLink(item) {
    if (item['imgId']) {
        return '<div class="brandLogoItem" style=" display: flex; align-items: center; justify-content: center;"><img alt="No Logo" style="max-height: 85px; max-width: 100%;" onerror="this.onerror=null; this.src=altImage" ' +
            'src="https://dlnil54eooeso.cloudfront.net/logos/' + item['imgId'] + '.png"/></div>\n';
    } else {
        return '<div class="brandLogoItem" style=" display: flex; align-items: center; justify-content: center;"><img alt="No Logo" style="max-height: 85px; max-width: 100%;" onerror="this.onerror=null; this.src=altImage" ' +
            'src="https://www.rabbitseo.com/UserLogo?pdfImage=true&userId=' + item['userId'] + '"/></div>\n';
    }
}

function getImageSrc(item) {
    if (item['imgId']) {
        return 'https://dlnil54eooeso.cloudfront.net/logos/' + item['imgId'] + '.png';
    } else {
        return 'https://www.rabbitseo.com/UserLogo?pdfImage=true&userId=' + item['userId'];
    }
}

function loadCategoriesNew() {
    // $.getJSON(apiUrl + 'getMyJsonAllPublishCatsGuest', function (json) {
    //     // console.log('getMyJsonAllPublishCatsGuest ' + JSON.stringify(json));
    //     json = JSON.parse(json.data);
    //     var html = '<ul>';
    //     for (let i = 0; i < json.length; i++) {
    //         const item = json[i];
    $.get('https://dlnil54eooeso.cloudfront.net/assets/data/categories.txt', function (data) {
        let arr = data.split('\n');
        let html = '<ul>';
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            html += '<span style="cursor:pointer" onclick="showCat(\'' + encodeURIComponent(item) + '\')" class="c_text"><a class="">' + item + '</a></span>';
            // html += '<span class="c_text"><a class="" href="javascript:showCat(\'' + encodeURIComponent(item) + '\')">' + item + '</a></span>';
            // html += '<span class="c_text"><a class="" href="javascript:showCat(\'' + encodeURIComponent(item) + '\')"><span class="c_img"><img src="/assets/images/c_icon.png" alt=""></span>' + item + '</a></span>';
        }
        html += '</ul>';


        $('.listingsMainCategories').show();
        $('.listingsMainCategories').html(html);

        //  new select custom
        $('#homeListingsDesign1 .listingsMainCategories ul').before('<span class="init">Select Catagory</span>')
        $('#homeListingsDesign1 .listingsMainCategories ul').hide();

        $("body").delegate("#homeListingsDesign1 .listingsMainCategories .init", "click", function () {
            $("#homeListingsDesign1 .listingsMainCategories ul").toggle();
        });
        //  new select custom 3
        $('#homeListingsDesign3 .listingsMainCategories ul').before('<span class="init">Select Catagory</span>')
        $('#homeListingsDesign3 .listingsMainCategories ul').hide();

        $("body").delegate("#homeListingsDesign3 .listingsMainCategories .init", "click", function () {
            $("#homeListingsDesign3 .listingsMainCategories ul").toggle();
        });
         //  new select custom 6
        $('#homeListingsDesign6 .listingsMainCategories ul').before('<span class="init">Select Catagory</span>')
        $('#homeListingsDesign6 .listingsMainCategories ul').hide();

        $("body").delegate("#homeListingsDesign6 .listingsMainCategories .init", "click", function () {
            $("#homeListingsDesign6 .listingsMainCategories ul").toggle();
        });
          //  new select custom 8
        $('#homeListingsDesign8 .listingsMainCategories ul').before('<span class="init">Select Catagory</span>')
        $('#homeListingsDesign8 .listingsMainCategories ul').hide();

        $("body").delegate("#homeListingsDesign8 .listingsMainCategories .init", "click", function () {
            $("#homeListingsDesign8 .listingsMainCategories ul").toggle();
        });
    });
}

function getCatUrl(category) {
    // let url = '/' + 'getMyJsonAllPublishLinksGuest?source=' + sourceSite + '&limit=100';
    let url = apiUrl + 'getMyJsonAllPublishLinksGuest?source=' + sourceSite + '&limit=200';
    if (category) {
        url += '&category=' + encodeURIComponent(category);
    }
    return url;
}

function getUrlParameter(sParam) {
    let retVal = false;
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            bizParameter = sParam;
            // console.log('sParameterName[0] ' + sParameterName[0])
            // console.log('sParameterName[1] ' + sParameterName[1])
            retVal = sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    // console.log('getUrlParameter ' + sParam + ': ' + retVal);
    return retVal;
}

function getDomainText(item) {
    return getHostname(item['domain']);
}

function getListByCatNew(category) {
    // console.log('start getListByCat');
    // var category = location.search.slice(1, location.search.length);
    let url = getCatUrl(category);
    category = decodeURIComponent(category);
    $('#categoryName').html(category);
    console.log('getListByCat url ' + url);
    $('#catCustomerList').html('<span class="spinner-border text-primary"></span>&nbsp;&nbsp;&nbsp;Loading, Please wait...');
    scrollTo("#catListingsDesign" + showCatDesign);
    $.getJSON(url, function (json) {
        let posts = json.obj2;
        // console.log('cat posts ' + JSON.stringify(posts));
        // console.log('cat getMyJsonAllPublishLinksGuest ' + JSON.stringify(json));
        json = JSON.parse(json.data);

        var html = '';
        for (let i = 0; i < json.length; i++) {
            const item = json[i];

            let hidemyAddress = (!item['address'] || item['address'] === undefined ? "d-none" : (item['address'][0].trim() == '' ? "d-none" : item['address'][0]));

            html += '<div style="cursor:pointer">\n' +
                ' <div class="b_logo" onclick="showSingleBusiness(\'' + minifyDomainUrl(item['domain']) + '\')">\n'
                + getImageLink(item) +
                '  <div><h3 class="title_2">' + getDomainText(item) + '</h3>\n' +
                '<div class="addressHome"><div class="' + hidemyAddress + '">' + item['address'] + '</div></div>' +
                // '  <div><h3 class="title_2">' + item['name'] + '</h3>\n' +
                ' <p class="big_pra">' + (item['category'] ? item['category'] : 'General')  + '</p>\n' +
                ' </div></div>\n' +
                '<div class="socialSection">' +
                '<div>' +
                '<a style="display: none" target="_blank" class="facebookPage"><img src="/assets/images/home_icon/facebook.png" alt="facebook"/></a>' +
                '<a style="display: none" target="_blank" class="twitterPage"><img src="/assets/images/home_icon/twitter.png"/></a>' +
                '<a style="display: none" target="_blank" class="linkedinPage"><img src="/assets/images/home_icon/linkedin.png" /></a>' +
                '<a style="display: none" target="_blank" class="pinterestPage"><img src="/assets/images/home_icon/pinterest.png" /></a>' +
                '<a style="display: none" target="_blank" class="youtubePage"><img src="/assets/images/home_icon/youtube.png" /></a>' +
                '<a style="display: none" target="_blank" class="instagramPage"><img src="/assets/images/home_icon/instagram.png"/></a>' +
                '<a style="display: none" target="_blank" class="redditPage"><img src="/assets/images/home_icon/reddit.png" /></a>' +
                '<a style="display: none" target="_blank" class="tumblrPage"><img src="/assets/images/newicon/tumblr.png" /></a>' +
                '<a style="display: none" target="_blank" class="snapchatPage"><img src="/assets/images/newicon/snapchat.png" /></a>' +
                '<a style="display: none" target="_blank" class="googlePage"><img src="/assets/images/newicon/googleBusiness.png" /></a>' +

                '</div>' +
                '</div>' +
                '<button class="btn btn-primary seeDetails" onclick="showSingleBusiness(\'' + minifyDomainUrl(item['domain']) + '\')">See Details</button>' +
                ' </div>';
        }
        $('.listingsCatList').html(html);
        showBizPostNew(posts['blogPosts']);
    });
}

function addSocialIcon(item, social) {
    // console.log('social ' + social + ': ' + item[social].toString().length)
    if (item[social] && item[social].toString() &&
        item[social].toString().length > 0 &&
        item[social].toString().toLowerCase().indexOf(social + '.com') !== -1) {
        findUsOnExist = true;
        $('.' + social + 'Page').show();
        $('.' + social + 'Page').attr('href', addHttpsIfNeeded(item[social]));
    } else {
        $('.' + social + 'Page').hide();
    }
}

function initBusinessPage() {
    let catTitles = [];
    catTitles.push('Business Category');
    catTitles.push('Category');
    catTitles.push('Business Section');
    catTitles.push('Section');
    // catTitles.push('Business Type');
    catTitles.push('Industry');

    let websiteTitles = [];
    websiteTitles.push('Business Website');
    websiteTitles.push('Website');
    websiteTitles.push('Business Domain');
    websiteTitles.push('Domain');

    let nameTitles = [];
    nameTitles.push('Business Name');
    nameTitles.push('Company Name');
    nameTitles.push('Brand Name');
    nameTitles.push('Name');

    let descTitles = [];
    descTitles.push('Business Description');
    descTitles.push('Company Profile');
    descTitles.push('Business Profile');
    descTitles.push('Company Description');

    let hoursTitles = [];
    hoursTitles.push('Business Hours');
    hoursTitles.push('Operating Hours');
    hoursTitles.push('Working Hours');
    hoursTitles.push('Open Hours');

    let keywordTitles = [];
    keywordTitles.push('Top Keywords');
    keywordTitles.push('Keywords');
    keywordTitles.push('Main Keywords');
    keywordTitles.push('Key phrases');
    keywordTitles.push('Primary Terms');

    let addressTitles = [];
    addressTitles.push('Address');
    addressTitles.push('Business Address');
    addressTitles.push('Location');
    addressTitles.push('Business Location');
    addressTitles.push('Company Location');

    let tagsTitle = [];
    tagsTitle.push('Tags');

    let phoneTitles = [];
    phoneTitles.push('Phone');
    phoneTitles.push('Telephone');
    phoneTitles.push('Phone Number');
    phoneTitles.push('Business Phone');
    phoneTitles.push('Business Contact Number');

    let findusTitles = [];
    findusTitles.push('Follow Us');
    findusTitles.push('Find Us');
    findusTitles.push('Our Channels');
    findusTitles.push('Interesting Stuff On');
    findusTitles.push('Subscribe');
    findusTitles.push('Social Media Links');

    let usefulTitles = [];
    usefulTitles.push('Useful Links');
    usefulTitles.push('Website Useful Links');
    usefulTitles.push('Page Link');
    usefulTitles.push('Web Page Navigation');
    usefulTitles.push('Site Links');
    usefulTitles.push('Site Navigation');
    usefulTitles.push('Site Navigation Link');

    let contactInformationTitles = [];
    contactInformationTitles.push('Contact Information');
    contactInformationTitles.push('Contact Business');
    contactInformationTitles.push('Contact and Site information');
    contactInformationTitles.push('Contact Detail');
    contactInformationTitles.push('Site Links');
    contactInformationTitles.push('Site Navigation');

    let galleryTitles = [];
    galleryTitles.push('Gallery');
    galleryTitles.push('Profile Gallery');
    galleryTitles.push('Photos & Video');
    galleryTitles.push('Business Media');
    galleryTitles.push('Company Portofolio');
    galleryTitles.push('Business Showcase');
    galleryTitles.push('Business Gallery');

    let businessInformationTitles = [];
    businessInformationTitles.push('Business Information');
    businessInformationTitles.push('Company Profile');

    let recentArticlesTitles = [];
    recentArticlesTitles.push('Recent Articles');
    recentArticlesTitles.push('New Article');
    recentArticlesTitles.push('Recent Posts');
    recentArticlesTitles.push('New Post');

    let youtubeVideoTitle = [];
    youtubeVideoTitle.push('Video');
    youtubeVideoTitle.push('Youtube Marketing Video');

    let homeBreadcumbTitle = [];
    homeBreadcumbTitle.push('Home');
    homeBreadcumbTitle.push('All Listings');
    homeBreadcumbTitle.push('Index');
    homeBreadcumbTitle.push('Directory');


    let loadingIcons = [];
    loadingIcons.push('spinner-border text-primary');
    loadingIcons.push('spinner-border text-secondary');
    loadingIcons.push('spinner-border text-success');
    loadingIcons.push('spinner-border text-info');
    loadingIcons.push('spinner-border text-light');
    // loadingIcons.push('spinner-grow text-primary');
    // loadingIcons.push('spinner-grow text-secondary');
    // loadingIcons.push('spinner-grow text-success');
    // loadingIcons.push('spinner-grow text-info');
    // loadingIcons.push('spinner-grow text-light');

    console.log('settings labels with showDesign ' + showDesign)
    $('.bizDescTitle').html(descTitles[getSumLetters(sourceSite) % descTitles.length]);
    $('.bizHoursTitle').html(hoursTitles[getSumLetters(sourceSite) % hoursTitles.length]);
    $('.bizKeywordsTitle').html(keywordTitles[getSumLetters(sourceSite) % keywordTitles.length]);
    $('.bizAddressTitle').html(addressTitles[getSumLetters(sourceSite) % addressTitles.length]);
    $('.bizPhoneTitle').html(phoneTitles[getSumLetters(sourceSite) % phoneTitles.length]);
    $('.bizCatTitle').html(catTitles[getSumLetters(sourceSite) % catTitles.length]);
    $('.bizWebsiteTitle').html(websiteTitles[getSumLetters(sourceSite) % websiteTitles.length]);
    $('.bizNameTitle').html(nameTitles[getSumLetters(sourceSite) % nameTitles.length]);
    $('.findUsOnText').html(findusTitles[getSumLetters(sourceSite) % findusTitles.length]);
    $('.usefulLinks').html(usefulTitles[getSumLetters(sourceSite) % usefulTitles.length]);
    $('.contactInformationText').html(contactInformationTitles[getSumLetters(sourceSite) % contactInformationTitles.length]);
    $('.galleryTitleText').html(galleryTitles[getSumLetters(sourceSite) % galleryTitles.length]);
    $('.businessInformationText').html(businessInformationTitles[getSumLetters(sourceSite) % businessInformationTitles.length]);
    $('.recentArticlesText').html(recentArticlesTitles[getSumLetters(sourceSite) % recentArticlesTitles.length]);
    $('.tagsTitle').html(tagsTitle[getSumLetters(sourceSite) % tagsTitle.length]);
    $('.youtubeVideoTitle').html(youtubeVideoTitle[getSumLetters(sourceSite) % youtubeVideoTitle.length]);
    $('.homeBreadcumbTitle').html(homeBreadcumbTitle[getSumLetters(sourceSite) % homeBreadcumbTitle.length]);

    const loadingIcon = loadingIcons[getSumLetters(sourceSite) % loadingIcons.length];
    $('.loadingIcon').html("<div class=\"" + loadingIcon + "\" role=\"status\"></div>");
}

function showjquery() {
    console.log('calling lightbox in delay')
    if ('undefined' == typeof window.jQuery) {
        console.log('jquery not found');
    } else {
    }
}

function getSingleBusiness(customer) {
    // const customer = location.search.slice(1, location.search.length);
    initBusinessPage();
    keywords = '';
    const url = apiUrl + 'getMyJsonSinglePublishLinksGuest?source=' + sourceSite + '&name=' + customer;
    console.log('getSingleBusiness url ' + url)

    $.getJSON(url, function (json) {
        console.log('getMyJsonAllPublishLinksGuest ' + JSON.stringify(json));
        $('.loadingIcon').html('');
        var item = JSON.parse(json["data"]);
        var html = '';

        if (item) {
            $('.catName').html(item['category']);
            $('.bizDomain').html(minifyDomainUrl(item['domain']));
            // $('.bizDomain').html(getDomainText(item));
            $('.bizName').html(item['name']);
            $(document).prop('title', item['name'] + ' - ' + $(document).find("title").text());
            $('.categoryLink').attr('onclick', "showCat(\'' + encodeURIComponent('" + item['category'] + "') + '\')");
            $('.bizUrl').attr('href', addHttpsIfNeeded(item['domain']));
            $('.bizUrl').html(addHttpsIfNeeded(item['domain']));

            try {
                if (item['blogPosts']) {
                    console.log('business blog posts ' + JSON.stringify(item['blogPosts']));
                    var jsonStr = JSON.stringify(item['blogPosts']);
                    var myObj = JSON.parse(jsonStr);
                    var mypost = '';
                    if (myObj.length > 0) {
                        for (const postitem of myObj) {
                            // console.log(postitem.pageUrl);
                            mypost = mypost + '<div><a style="text-decoration: underline;" target="_blank" href="' + postitem.pageUrl + '">' + postitem.pageTitle + '</a> <span class="recentPostDate">' + postitem.dateCreated + '</span></div>';
                        }
                    }
                    $('.recentPostsList').html(mypost);
                } else {
                    $('.recentPostsSection').hide();
                }
                if (item['gallery']) {
                    const myArray = String(item['gallery']).split(",");

                    var mygallery = '';
                    if (myArray.length > 0) {
                        for (const image of myArray) {
                            if (image && image.length > 1) {
                                if (image.indexOf('https://') === -1 && image.indexOf('http://') === -1) {
                                    mygallery = mygallery + '<a href="https://dlnil54eooeso.cloudfront.net/gallery/' + image + '.png">' + '<img src=" https://dlnil54eooeso.cloudfront.net/gallery/' + image + '.png"/></a>';
                                } else {
                                    mygallery = mygallery + '<a href="' + image + '">' + '<img src="' + image + '"/></a>';
                                }
                            }
                        }
                    }

                    $('div#listingsDesign14' + ' .galleryBusinessnew').html(mygallery);
                    $('div#listingsDesign17' + ' .galleryBusinessnew').html(mygallery);
                    $('.galleryBusiness').html(mygallery);
                    $('.galleryBusiness a img').attr('onerror', 'handleImageError(this)');
                    initSimpleLightBox();
                } else {
                    $('.galleryContentBox').hide();
                    $('.galleryBusiness').hide();
                    $('div#listingsDesign' + showDesign).addClass('topMargin0');
                }

                if (item['address'] && item['address'].toString().length > 0) {
                    console.log('item[\'address\'] ' + item['address'])
                    $('.addressSection').show();
                    $('.bizAddress').html(item['address']);
                    $('.googleMapFrame').attr('src', "https://maps.google.com/maps?q=" + encodeURIComponent(item['address']) + "&output=embed");
                } else {
                    $('.addressSection').hide();
                }
                if (item['bizCountry'] && item['bizCountry'].toString().length > 0) {
                    $('.bizCountrySection').show();
                    $('.bizCountry').html(item['bizCountry']);
                } else {
                    $('.bizCountrySection').hide();
                }
                if (item['youtubeMarketingVideo'] && item['youtubeMarketingVideo'].toString().length > 0 && item['youtubeMarketingVideo'].toString().indexOf('https://www.youtube.com/') !== null) {
                    const youtubeLink = item["youtubeMarketingVideo"].toString();
                    try {
                        if (youtubeLink && youtubeLink.indexOf('?') !== -1 && youtubeLink.indexOf('you') !== -1) {
                            const youtubeVideoId = getYoutubeVideoId(youtubeLink);
                            console.log('youtube link ' + youtubeLink + ' youtubeVideoId ' + youtubeVideoId)
                            if (youtubeVideoId && youtubeVideoId.length > 2) {
                                $('.youtubeFrame').attr('src', 'https://www.youtube.com/embed/' + youtubeVideoId);
                            }
                        }
                    } catch (e) {
                        console.log(e + ' youtube ' + item['youtubeMarketingVideo'])
                    }
                    // $('.youtubeVideoLink').html( item["youtubeMarketingVideo"].toString().replace('https://www.youtube.com/', 'https://www.youtube.com/embed/'));
                } else {
                    $('.youtubeVideo').hide();
                    $('.youtubeBox').hide();
                    $('.youtubeVideoTitle').hide();
                }

                $('.homePage').attr('href', addHttpsIfNeeded(item['domain']));
                $('.homePage').html(item['domain']);
                addBizLink(item, 'contactUsPage');
                addBizLink(item, 'aboutUsPage');
                addBizLink(item, 'pricingPage');
                addBizLink(item, 'blogPage');
                addBizLink(item, 'faqPage');

                if (item['phone'] && item['phone'].toString().length > 0) {
                    $('.bizPhoneSection').show();
                    $('.bizPhone').html(item['phone']);
                } else {
                    $('.bizPhoneSection').hide();
                }
                if (item['tags'] && item['tags'].toString().length > 0) {
                    $('.tagsSection').show();
                    var myArray = [];
                    for (tagcount = 0; tagcount < item['tags'].length; tagcount++) {
                        myArray.push('<span>' + item['tags'][tagcount] + '</span>');
                    }
                    $('.bizTags').html(myArray);
                } else {
                    $('.tagsSection').hide();
                }
                if (item['businessHours'] && item['businessHours'].toString().length > 0) {
                    $('.hoursSection').show();
                    $('.bizHours').html(item['businessHours'].toString().replaceAll('\n', '<br />'));
                } else {
                    $('.hoursSection').hide();
                }
                findUsOnExist = false;
                addSocialIcon(item, 'facebook');
                addSocialIcon(item, 'twitter');
                addSocialIcon(item, 'pinterest');
                addSocialIcon(item, 'linkedin');
                addSocialIcon(item, 'youtube');
                addSocialIcon(item, 'instagram');
                addSocialIcon(item, 'reddit');
                addSocialIcon(item, 'x');
                addSocialIcon(item, 'tumblr');
                addSocialIcon(item, 'snapchat');
                addSocialIcon(item, 'googleBusiness');
                if (findUsOnExist) {
                    $('.findUsOnText').show();
                } else {
                    $('.findUsOnText').hide();
                }
            } catch (e) {
                console.log(e)
            }
            if (item['description']) {
                $('.bizDesc').html(item['description'].toString().replaceAll('\n', '<br />'));
                $("meta[property='og\\title']").attr("content", item['description'].toString());
                $('meta[property="og:description"]').attr("content", item['description'].toString());
            }
            addKeywords(item);

            if (item['hasLogo']) {
                getImageLink(item) +
                $('.bizLogo').attr('src', getImageSrc(item));
                $('.bizLogo').attr('onerror', 'this.onerror=null; this.src="' + altImage + '"');
            } else {
                $('.bizLogo').hide();
            }
        } else {
            html += 'No business found'
        }
        scrollTo("#listingsDesign" + showDesign);
    });
}

function handleImageError(img) {
    img.onerror = null;
    $('.galleryContentBox').hide();
}

function getYoutubeVideoId(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function addBizLink(item, name) {
    if (item[name] && item[name].toString().length > 0) {
        $('.' + name + 'Section').show();
        $('.' + name).attr('href', addHttpsIfNeeded(item[name]));
        $('.' + name).html(item[name]);
    } else {
        $('.' + name + 'Section').hide();
    }

}

function addKeywords(item) {
    if (String(item['keyword']).length > 1 && String(item['keyword']) !== 'undefined') {
        const myArray = String(item['keyword']).split(",");
        if (myArray.length > 0) {
            keywords = '';
            for (let i = 0; i < myArray.length; i++) {
                let href = item['href'] ? item['href'] : item['domain'];
                href = addHttpsIfNeeded(href);
                // $('.keywords').html("<a href='" + href + "' target='_blank'>" + myArray[0] + "</a>");
                keywords += "<a href='" + href + "' target='_blank'>" + myArray[i] + "</a>";
            }
            $('.keywords').html(keywords);
        }
    }
}

function handleSearch() {
    if (location.href.indexOf("doSearch") !== -1) {
        const searchString = location.href.substr(location.href.indexOf("doSearch") + 9);
        console.log('searchString ' + searchString);
        $('#search').val(searchString);
        ajaxSearch();
    }
}

function pushState(val) {
    try {
        const url = location.href.split("?")[0] + val;
        console.log('try pushState ' + url)
        window.history.pushState("", "", url);
    } catch (e) {
        console.log('push state failed ' + e)
    }
}

function initSimpleLightBox() {
    try {

        try {
            $('.galleryBusiness a').simpleLightbox({
                history: false,
            });
        } catch (e) {
            $('.galleryBusiness').hide();
            console.log('initLightbox ' + e)
        }
        // $('#listingsDesign1 .galleryBusiness a').simpleLightbox();
        // $('#listingsDesign2 .galleryBusiness a').simpleLightbox();
        if (showDesign === 2) {
            $('#listingsDesign2 .galleryBusiness').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 6,
                slidesToScroll: 6,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
        if (showDesign === 3) {
            $('#listingsDesign3 .galleryBusiness').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
        if (showDesign === 5) {
            $('#listingsDesign5 .galleryBusiness').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
        if (showDesign === 6) {
            $('#listingsDesign6 .galleryBusiness').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 5,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
        if (showDesign === 7) {
            $('#listingsDesign7 .galleryBusiness').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
        if (showDesign === 8) {
            $('#listingsDesign8 .galleryBusiness').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
        if (showDesign === 13) {
            $('#listingsDesign13 .galleryBusiness').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
        if (showDesign === 14) {
            $('#listingsDesign14 .galleryBox .galleryBusinessnew a').attr('href', 'javascript:;');
            $('#listingsDesign14 .galleryBusinessItem .galleryBusiness').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '#listingsDesign14 .galleryBox .galleryBusinessnew'
            });
            $('#listingsDesign14 .galleryBox .galleryBusinessnew').slick({
                asNavFor: '#listingsDesign14 .galleryBusinessItem .galleryBusiness',
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 1,
                focusOnSelect: true

            });
        }
        if (showDesign === 16) {
            $('#listingsDesign16 .galleryBusiness').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
        if (showDesign === 17) {
            $('#listingsDesign17 .galleryBox .galleryBusinessnew a').attr('href', 'javascript:;');
            $('#listingsDesign17 .galleryBusinessItem .galleryBusiness').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '#listingsDesign17 .galleryBox .galleryBusinessnew'
            });
            $('#listingsDesign17 .galleryBox .galleryBusinessnew').slick({
                asNavFor: '#listingsDesign17 .galleryBusinessItem .galleryBusiness',
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 1,
                focusOnSelect: true

            });
        }
        if (showDesign === 18) {
            $('#listingsDesign18 .galleryBusiness').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
    } catch (e) {
        $('.galleryBusiness').hide();
        console.log('initLightbox ' + e)
        console.log('slick ' + e)
    }
}

function showSingleBusiness(bizVal) {
    console.log('in showSingleBusiness ' + bizVal)
    pushState("?biz=" + encodeURIComponent(bizVal));

    getSingleBusiness(bizVal);

    $('#listingsCategory').hide();
    $(".a-first-section").hide();
    $('#listingsHome').hide();
    $('[id^=homeListingsDesign]').hide();
    $('[id^=catListingsDesign]').hide();
    socialshareList();
    $('#listingsDesign' + showDesign).show();
}

function addHttpsIfNeeded(href) {
    // console.log('addHttpsIfNeeded href ' + href)
    if (href && !href.toString().startsWith("http")) {
        href = "https://" + href;
    }
    // console.log('addHttpsIfNeeded return href ' + href);
    return href;
}

function showCat(catVal) {
    pushState("?cat=" + catVal);
    getListByCatNew(catVal);
    $("[id^=listingsDesign]").hide();
    $("[id^=homeListingsDesign]").hide();
    $('#listingsBusiness').hide();
    $('#listingsHome').hide();
    $(".a-first-section").hide();

    $('#catListingsDesign' + showCatDesign).show();
    console.log('catVal values ' + catVal + ', ' + decodeURIComponent(catVal) + ', ' + encodeURIComponent(catVal));
    $('#catListingsDesign' + showCatDesign + ' .catName').html(decodeURIComponent(catVal));
    $('#catListingsDesign' + showCatDesign + ' .siteAddYourBusinessHere').html(siteAddYourBusinessHere[getSumLetters(sourceSite) % siteAddYourBusinessHere.length]);
    $('#catListingsDesign' + showCatDesign + ' .siteAddYourBusinessHere').attr('href',siteAddYourBusinessHereUrl[getSumLetters(sourceSite) % siteAddYourBusinessHereUrl.length]);
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

function getCurrThemeDir() {
    console.log('find theme for sourceSite ' + sourceSite)
    let currTheme = siteThemes[sourceSite];
    if (!currTheme) {
        console.log('siteThemes.length ' + themesCssCount)
        currTheme = getSumLetters(sourceSite) % themesCssCount;
        console.log('currTheme is ' + currTheme);
        sourceSiteImagesDir = getSumLetters(sourceSite) % themesImagesCount;
        // currTheme = Math.floor(Math.random() * themesCssCount) + 1;
        console.log('theme not found, random theme ' + currTheme);
        console.log('theme not found, random sourceSiteImagesDir ' + sourceSiteImagesDir);
    }
    // currTheme = 2;
    console.log('getCurrThemeDir ' + currTheme)
    // return currTheme;
    return currTheme;
}

function getHostname(url) {
    // console.log('getHostname is ' + url);
    if (url) {
        try {
            url = new URL(url).hostname;
        } catch (e) {
            url = minifyDomainUrl(url);
        }
        url = url.replace("www.", "");
        // console.log('getHostname final is ' + url);
    }
    return url;
}

function loadMain() {
    pushState('');
    $("[id^=listingsDesign]").hide();
    $("[id^=catListingsDesign]").hide();
    $('#listingsHome').hide();
    $('#listingsCategory').hide();
    $(".a-first-section").hide();

    $('.homeFeatureList').show();
    $('.listingsMainCategoriesBox').show();
    $('.recentPostsSection').show();

    loadPublishLinks();

    loadCategoriesNew();
    let siteTitles = [];
    let titles = [];
    initSiteTitles(titles, siteTitles);
    let currTitle = titles.at(Math.floor(getSumLetters(sourceSite) % titles.length))

    $('#homeListingsDesign' + showHomeDesign + ' .bannerTitle').html(currTitle);
    $('#homeListingsDesign' + showHomeDesign + ' .titleFeaturedCustomer').html(titleFeaturedCustomer[getSumLetters(sourceSite) % titleFeaturedCustomer.length]);
    $('#homeListingsDesign' + showHomeDesign + ' .titleCategories').html(titleCategories[getSumLetters(sourceSite) % titleCategories.length]);
    $('#homeListingsDesign' + showHomeDesign + ' .titleRecentlyAdded').html(titleRecentlyAdded[getSumLetters(sourceSite) % titleRecentlyAdded.length]);
    $('#homeListingsDesign' + showHomeDesign + ' .titleRecentPosts').html(titleRecentPosts[getSumLetters(sourceSite) % titleRecentPosts.length]);

    $('#homeListingsDesign' + showHomeDesign + ' .siteAddYourBusinessHere').html(siteAddYourBusinessHere[getSumLetters(sourceSite) % siteAddYourBusinessHere.length]);
    $('#homeListingsDesign' + showHomeDesign + ' .siteAddYourBusinessHere').attr('href',siteAddYourBusinessHereUrl[getSumLetters(sourceSite) % siteAddYourBusinessHereUrl.length]);

    $('#homeListingsDesign' + showHomeDesign).show();
}

function removeLastSlash(site) {
    return site.replace(/\/$/, "");
}

function scrollTo(divSelector) {
    $('html, body').animate({
        scrollTop: $(divSelector).offset().top
    }, 200);
}
function testDesigns() {
    let blogs = {};
    let bizDesigns = {};
    $.get('http://localhost:8080/assets/data/blogs.txt', function (data) {
        let arr = data.split('\n');
        for (let i = 0; i < arr.length; i++) {
            const curr = arr[i];
            const hostname = getHostname(curr);
            const sumLetters = getSumLetters(hostname);
            const bizDesign = sumLetters % 19;
            blogs[curr] = {};
            blogs[curr]['sumLetters'] = sumLetters;
            blogs[curr]['bizDesign'] = bizDesign;
            const currCount = bizDesigns['listingsDesign' + bizDesign];
            if (!currCount) {
                bizDesigns['listingsDesign' + bizDesign] = 1;
            } else {
                bizDesigns['listingsDesign' + bizDesign] = currCount + 1;
            }
        }
        console.log(JSON.stringify(bizDesigns));
        // console.log(JSON.stringify(blogs));
    });

}