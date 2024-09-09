let totalTests = 0;
let eachTest = 0;
let pagesData = {};
const warningScore = eachTest / 2;

let pagesCount, sumWarnings = 0, sumSevere = 0, sumSuccess = 0,
    sumScore = 0, sumTitleIssues = 0, titleIssuesSummary = '', sumMetaDescIssues = 0, sumOtherMetaIssues = 0,
    sumKeywordsIssues = 0, sumWords = 0, sumH1Issues = 0, sumKeywordDensity = 0,
    warningsArr = [], severeArr = [];
// const myWorker = new Worker("/assets/scripts-app/applyMsgWorker.js");

function calculateOverview(favIcon, i) {
    $(".keywordsForLandingPages").attr("list", 'ourKeywords');
    const siteScore = sumScore / pagesCount;
    $('#siteScore').html(Math.ceil(siteScore) + '%');
    $('#siteScore').addClass('badge rounded-pill small-inner-border bg-info');
    $('#siteScore').addClass(getScoreCls(siteScore));
    $('#overallScore').html(Math.ceil(siteScore) + '%');
    $('#siteUrl').html(favIcon + mainUserDetails['wixUrl']);
    $('#pagesCount').html(pagesCount);
    if (pagesCount < 5) {
        $('#pagesCountCont').attr("data-bs-content", "Your website has too few pages, create more pages with high quality content");
    } else if (pagesCount < 20) {
        $('#pagesCountCont').attr("data-bs-content", "That's a decent amount of pages, you can still create more pages with high quality content to improve rankings");
    } else if (pagesCount > 30) {
        $('#pagesCountCont').attr("data-bs-content", "Great amount of pages, make sure each page is optimized with the correct keyword and use our Off-Page SEO tools to improve rankings");
    }
    $('#sumSevere').html(sumSevere);
    if (sumSevere > 0) {
        $('#sumSevereCont').attr("data-bs-content", 'Fix your severe issues ASAP and boost traffic to your websites');
    } else {
        $('#sumSevereCont').attr("data-bs-content", 'Hooray! No Severe Issues were found');
    }
    $('#sumWarnings').html(sumWarnings);
    if (sumWarnings > 0) {
        $('#sumWarningsCont').attr("data-bs-content", 'You have some warnings you should address, it could help you with your rankings in Google');
    } else {
        $('#sumWarningsCont').attr("data-bs-content", 'Hooray! No warnings were found');
    }
    $('#sumSuccess').html(sumSuccess);
    $('#sumKeywordsIssues').html(sumKeywordsIssues);
    $('#sumTitleIssues').html(sumTitleIssues);

    // console.log('titleIssuesSummary ' + titleIssuesSummary);
    if (titleIssuesSummary.length > 0) {
        // if (isTestingMode() && titleIssuesSummary.length > 0) {
        addModalToSelectorClosestDiv('#sumTitleIssues', titleIssuesSummary);
    }
    $('#sumMetaDescIssues').html(sumMetaDescIssues);
    $('#sumOtherMetaIssues').html(sumOtherMetaIssues);
    $('#sumWords').html(formatNumber(sumWords));
    if (sumWords < 15000) {

    } else {

    }
    $('#sumH1Issues').html(sumH1Issues);
    $('#sumKeywordDensity').html(sumKeywordDensity);
    let severeHtml = '';
    for (i = 0; i < severeArr.length; i++) {
        severeHtml += '<div class="warn-cols">' + severeArr[i] + '</div>';
    }
    $('#fewSevere').html(severeHtml);
    let warningsHtml = '';
    for (i = 0; i < severeArr.length; i++) {
        warningsHtml += '<div class="warn-cols">' + warningsArr[i] + '</div>';
    }
    $('#fewWarnings').html(warningsHtml);

    // $('[href="#list-site-overview"]').tab('show');
    // $('a[href="#list-site-overview"]').trigger('click');
    enableTooltips();
    $(".keywordsSelectForLandingPages").select2({
        tokenSeparators: [',', ', ', '\n'], selectOnClose: true, data: suggestedKeywords, tags: true,
        placeholder: 'Enter a custom keyword or choose from the list',
        searchInputPlaceholder: 'Enter a custom keyword or choose from the list'
    });
}

function doDrawLandingPages(json, pageOverviewHtml, favIcon, from, to) {
    // for (let i = 0; i < json.length; i++) {
    for (let i = from; i < json.length && i < to; i++) {
        // $('#pagesUl').html('<img src="/assets/images/loader.gif" />');
        // console.log("curr page " + json[i]["pageUrl"]);
        const pageId = json[i]["id"];
        const pageUrl = json[i]["pageUrl"];
        let shortPageUrl = pageUrl.substring(pageUrl.indexOf('/'));
        if (shortPageUrl.length == 0) {
            shortPageUrl = 'Homepage';
        } else {
            shortPageUrl = shortPageUrl.replaceAll('//', '/');
        }
        let title = json[i]["title"];
        title = title && title !== 'null' && title.length > 0 ? title : "<span class='text-danger'>Title Not Found</span>";

        if (json[i]["testResult"]) {
            pagesCount++;
            let li = '<a class="list-group-item list-group-item-action d-flex justify-content-between align-items-start" onclick="setPageValues(' + pageId + ')"  id="list-pageId' + pageId + '"                            data-bs-toggle="list" href="#pageId' + pageId + '" role="tab" aria-controls="pageId' + pageId + '">\n' +
                '    <div class="ms-2 me-auto" title="' + title + ' - ' + shortPageUrl + '">\n' +
                '      <div class="fw-bold">' + shortPageUrl + '</div>' +
                title +
                '    </div>\n' +
                '    <span class="badge rounded-pill" id="pageScore' + pageId + '"></span>\n' +
                '  </a>';
            $('#pagesUl').append(li);
            let content = '<div class="tab-pane fade" id="pageId' + pageId + '" role="tabpanel" aria-labelledby="list-pageId' + pageId + '">' + pageOverviewHtml + '</div>';
            $('#nav-tabContent').append(content);
            // setTimeout(function () {
            drawSinglePage(JSON.parse(json[i]["testResult"]), pageUrl, pageId);
            // }, 1000);
        }
    }
    // $(".keywordsSelectForLandingPages").select2({tokenSeparators: [',', ', ', '\n'],data: keywordsSelectForLandingPages, tags: true, });
    // for (i = 0; i < keywordsSelectForLandingPages.length; i++) {
    //     $('#ourKeywords').append("<option value='" + keywordsSelectForLandingPages[i] + "'>");
    // }
    // setTimeout(function () {
    calculateOverview(favIcon, i);
    $('.loading').hide();
    // }, 2000);
}

function drawLandingPages(json) {
    pagesCount = 0, sumWarnings = 0, sumSevere = 0, sumSuccess = 0,
        sumScore = 0, sumTitleIssues = 0, sumMetaDescIssues = 0, sumOtherMetaIssues = 0,
        sumKeywordsIssues = 0, sumWords = 0, sumH1Issues = 0, sumKeywordDensity = 0,
        warningsArr = [], severeArr = [], titleIssuesSummary = '';

    // $('#pageUrl').attr('placeholder', mainUserDetails['wixUrl']);
    // console.log('start drawLandingPages ' + JSON.stringify(json));
    json = json["list"];
    let favIcon = '';
    // if (json.length > 0 && json[0]["testResult"]) {
    //     favIcon = JSON.parse(json[0]["testResult"])["favIconUrl"];
    //     console.log('first item ' + favIcon)
    //     favIcon = favIcon && favIcon.length > 2 ? ("<img src='" + favIcon + "'/> ") : '';
    // }

    $('#pagesUl').append('<a class="list-group-item list-group-item-action active d-flex justify-content-between align-items-start" id="list-site-overview"\n' +
        '                            data-bs-toggle="list" href="#site-overview" role="tab" aria-controls="site-overview">\n' +
        '                            <div class="ms-2 me-auto">\n' +
        '                                <div class="fw-bold">Site Overview</div>\n' +
        '                                <span id="siteUrl"/>\n' +
        '                            </div>\n' +
        '                            <span class="badge rounded-pill" id="siteScore"></span>\n' +
        '                        </a>');
    const pageOverviewHtml = $('#pageOverviewTemplate').html();
    // console.log('start drawPages json.length ' + json.length)
    doDrawLandingPages(json, pageOverviewHtml, favIcon, 0, 300);
}

function addWarningToArr(pageUrl, msg) {
    if (warningsArr.length < 5) {
        warningsArr.push('<h3>Warning in page ' + pageUrl + "</h3><p>" + msg + '</p>');
    }
}

function addSevereToArr(pageUrl, msg) {
    if (severeArr.length < 5) {
        severeArr.push('<h3>Severe issue in page ' + pageUrl + "</h3><p>" + msg + '</p>');
    }
}

function getScoreCls(score) {
    // let scoreCls = 'score-level' + Math.round(score / 10) + '0';
    let scoreCls = score > 80 ? 'score-high' : 'score-random' + getRndInteger(1, 4);
    return scoreCls;
}

function applyMsg(pageId, msgType, msg, parentId) {
    totalTests++;
    let msgIcon = 'msgIcon-success';
    let msgClass = 'alert-success';

    if (msgType === "Warning") {
        addWarningToArr(currPageUrl, msg);
        warnings++;
        msgClass = 'alert-warning';
        msgIcon = 'msgIcon-warning';
    } else if (msgType === "Severe") {
        addSevereToArr(currPageUrl, msg);
        severe++;
        msgClass = 'alert-danger';
        msgIcon = 'msgIcon-error';
    } else if (msgType === "Success") {
        success++;
    }

    const parentDiv = '#' + divId + ' div#' + parentId;
    let data = {}
    data['parentDiv'] = parentDiv;
    data['msgType'] = msgType;
    data['msg'] = msg;
    data['msgIcon'] = msgIcon;
    data['msgClass'] = msgClass;
    let pageDataArr = pagesData[pageId];
    if (!pageDataArr) {
        pageDataArr = [];
    }
    pageDataArr.push(data);
    pagesData[pageId] = pageDataArr;
    // myWorker.postMessage(data)
    // myWorker.postMessage(parentDiv, msgType, msg, msgIcon, msgClass)
    // $(parentDiv + ' .msgType').text(msgType);
    // $(parentDiv + ' .msgContent').text(msg);
    // // $(parentDiv + ' .msgIcon').text(msgIcon);
    // $(parentDiv + ' .msgIcon').removeClass('msgIcon-success');
    // $(parentDiv + ' .msgIcon').removeClass('msgIcon-warning');
    // $(parentDiv + ' .msgIcon').removeClass('msgIcon-error');
    // $(parentDiv + ' .msgIcon').addClass(msgIcon);
    // $(parentDiv).addClass(msgClass);

    // console.log('set in ' + parentDiv + ' .msgContent : ' + msg);
}

function setPageValues(pageId) {
    console.log('setPageValues pageId ' + pageId)
    let pageDataArr = pagesData[pageId];
    for (let i = 0; i < pageDataArr.length; i++) {
        let data = pageDataArr[i];
        console.log('setPageValues data ' + JSON.stringify(data));
        let parentDiv = data['parentDiv'];
        let msgType = data['msgType'];
        let msg = data['msg'];
        let msgIcon = data['msgIcon'];
        let msgClass = data['msgClass'];
        $(parentDiv + ' .msgType').text(msgType);
        $(parentDiv + ' .msgContent').text(msg);
        // $(parentDiv + ' .msgIcon').text(msgIcon);
        $(parentDiv + ' .msgIcon').removeClass('msgIcon-success');
        $(parentDiv + ' .msgIcon').removeClass('msgIcon-warning');
        $(parentDiv + ' .msgIcon').removeClass('msgIcon-error');
        $(parentDiv + ' .msgIcon').addClass(msgIcon);
        $(parentDiv).addClass(msgClass);
    }
}

function applyHowToChangeLink(ahref, wixUrl, shopifyUrl, weeblyUrl) {
    ahref = '#' + ahref + ' a.howToChangeLink';
    if (isWixUserOrWixLinksUser()) {
        $(ahref).attr("href", wixUrl);
    } else if (isShopifyUser()) {
        $(ahref).attr("href", shopifyUrl);
    } else if (appDomainName === 'Weebly') {
        $(ahref).attr("href", weeblyUrl);
    } else {
        $(ahref).hide();
    }
    $(ahref).html('Read more')
}

let currPageUrl, divId, warnings = 0, severe = 0, success = 0;

function drawSinglePage(json, pageUrl, pageId) {
    currPageUrl = pageUrl;
    warnings = 0, severe = 0, success = 0;
    totalTests = 0;
    divId = "pageId" + pageId;
    // console.log('json ' + JSON.stringify(json));
    // console.log('json.title ' + json.title);
    $('#' + divId + ' div#pageUrlLink').html('<h4 class="dash-title text-truncate">Optimization Results for <a href="http://' + pageUrl + '" target="_blank" >' + pageUrl + '</a></h4>');
    $('#' + divId + ' div.pageTitle').html(json.title);
    if (!json.keywordTerm) {
        json.keywordTerm = '';
    }
    if (!keywordsSelectForLandingPages.includes(json.keywordTerm)) {
        var o = new Option(json.keywordTerm, json.keywordTerm);
        $(o).html(json.keywordTerm);
        $('#' + divId + ' select.keywordsSelectForLandingPages').append(o);
    }

    $('#' + divId + ' a.testPageAgain').attr("href", "javascript: refreshPage(" + pageId + ")");
    $('#' + divId + ' select.keywordsSelectForLandingPages').attr("onchange", "javascript: refreshPage(" + pageId + ")");
    $('#' + divId + ' input.keywordsForLandingPages').attr("onchange", "javascript: refreshPage(" + pageId + ")");
    $('#' + divId + ' a#removePage').attr("href", "javascript: deletePage(" + pageId + ")");

    // start testing
    let currTestDiv;

    // title testing
    applyHowToChangeLink('pageTitleSection', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");

    // title length
    currTestDiv = "titleLength";
    if (json.pageTitleLength === 0) {
        sumTitleIssues++;
        const msg = "Page title is missing! Add a title ASAP, ideal length should be 55-70 chars";
        titleIssuesSummary = addDescToSummary(titleIssuesSummary, json.pageUrl, msg);
        applyMsg(pageId, "Severe", msg, currTestDiv);
    } else if (json.pageTitleLength > 70) {
        sumTitleIssues++;
        const msg = "Page title is too long (" + json.pageTitleLength + " characters), it should be 55-70 chars";
        titleIssuesSummary = addDescToSummary(titleIssuesSummary, json.pageUrl, msg);
        applyMsg(pageId, "Warning", msg, currTestDiv);
    } else if (json.pageTitleLength < 55) {
        sumTitleIssues++;
        const msg = "Page title is too short (" + json.pageTitleLength + " characters), it should be 55-70 chars";
        titleIssuesSummary = addDescToSummary(titleIssuesSummary, json.pageUrl, msg);
        applyMsg(pageId, "Warning", msg, currTestDiv);
    } else {
        const msg = "Page title is perfect (" + json.pageTitleLength + " characters), it should be 55-70 chars";
        applyMsg(pageId, "Success", msg, currTestDiv);
    }

    // title with keyword
    currTestDiv = "keywordInTitle";
    if (!json.pageTitleContainsKeyword) {
        sumTitleIssues++;
        sumKeywordsIssues++;
        const msg = "The keyword '" + json.keywordTerm + "' is missing in the page title";
        applyMsg(pageId, "Severe", msg, currTestDiv);
    } else {
        const msg = "The keyword '" + json.keywordTerm + "' exists in the page title";
        applyMsg(pageId, "Success", msg, currTestDiv);
    }

    // Meta testing
    applyHowToChangeLink('metaDescSection', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    currTestDiv = "metaDescLength";
    if (json.metaDesc && json.metaDesc !== '') {
        $('.metaDescContent').html(json.metaDesc);
        const metaDescLength = json.metaDesc.length;

        if (metaDescLength > 320) {
            sumMetaDescIssues++;
            const msg = "Meta Description Tag is too long (" + metaDescLength + " chars), try to make it between 50-320 chars";
            applyMsg(pageId, "Warning", msg, currTestDiv);
        } else if (metaDescLength < 50) {
            sumMetaDescIssues++;
            const msg = "Meta Description Tag is too short (" + metaDescLength + " chars), try to make it between 50-320 chars";
            applyMsg(pageId, "Warning", msg, currTestDiv);
        } else {
            const msg = "Meta Description Tag is great (" + metaDescLength + " chars), ideal length is between 50-320 chars";
            applyMsg(pageId, "Success", msg, currTestDiv);
        }
    } else {
        const msg = "We couldn't find any Meta Description Tag in your page, add it soon and make it between 50-320 chars";
        applyMsg(pageId, "Severe", msg, currTestDiv);
    }

    currTestDiv = "keywordInMetaDesc";
    if (!json.metaDescContainsKeyword) {
        sumMetaDescIssues++;
        sumKeywordsIssues++;
        const msg = "Meta Description Tag doesn't contain the keyword '" + json.keywordTerm + "'";
        applyMsg(pageId, "Severe", msg, currTestDiv);
    } else {
        const msg = "Meta Description Tag contains the keyword '" + json.keywordTerm + "'";
        applyMsg(pageId, "Success", msg, currTestDiv);
    }

    // additional meta tags
    applyHowToChangeLink('additionalMetaSection', "https://support.wix.com/en/article/adding-additional-meta-tags-to-your-sites-pages",
        "https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings#set-or-update-your-home-page-metadata",
        "https://hc.weebly.com/hc/en-us/articles/205678298-Descriptions-and-Keywords");

    // currTestDiv = "metaKeywords";
    // if (!json.metaKeywords) {
    //     sumOtherMetaIssues++;
    //     const msg = "Meta Keywords Tag is missing in the page";
    //     applyMsg(pageId, "Warning", msg, currTestDiv);
    // } else {
    //     if (!json.metaKeywordsContainsKeyword) {
    //         sumOtherMetaIssues++;
    //         sumKeywordsIssues++;
    //         const msg = "Meta Keywords Tag '" + json.metaKeywords + "' doesn't contain the keyword '" + json.keywordTerm + "'";
    //         applyMsg(pageId, "Warning", msg, currTestDiv);
    //     } else {
    //         const msg = "Meta Keywords Tag '" + json.metaKeywords + "' contains the keyword '" + json.keywordTerm + "'";
    //         applyMsg(pageId, "Success", msg, currTestDiv);
    //     }
    // }

    currTestDiv = "metaOgSiteName";
    if (!json.metaOgSiteName || json.metaOgSiteName === '') {
        sumOtherMetaIssues++;
        const msg = "Meta Site Name Tag is missing in the page";
        applyMsg(pageId, "Warning", msg, currTestDiv);
    } else {
        const msg = "Meta Site Name Tag '" + json.metaOgSiteName + "' was found in the page";
        applyMsg(pageId, "Success", msg, currTestDiv);
    }

    currTestDiv = "metaOgSiteUrl";
    if (!json.metaOgSiteUrl || json.metaOgSiteUrl === '') {
        sumOtherMetaIssues++;
        const msg = "Meta Site Url Tag is missing in the page";
        applyMsg(pageId, "Warning", msg, currTestDiv);
    } else {
        const msg = "Meta Site Url Tag '" + json.metaOgSiteUrl + "' was found in the page";
        applyMsg(pageId, "Success", msg, currTestDiv);
    }

    // Content section
    applyHowToChangeLink('contentSection', "https://support.wix.com/en/article/optimizing-your-sites-content-for-seo",
        "https://help.shopify.com/manual/promoting-marketing/seo/adding-keywords#using-keywords-in-page-content",
        "https://www.weebly.com/seo/content");

    // tooltip - Percentage of how many times the keyword appears in the page content (relative to the whole content), a good value would be between 5% - 20%
    // console.log('Page url is ' + json.pageUrl + ' json.keywordDensity is ' + json.keywordDensity)
    currTestDiv = "keywordDensity";
    if (json.keywordDensity < 3) {
        sumKeywordDensity++;
        sumKeywordsIssues++;
        var text = "Your keyword density is low, the keyword '" + json.keywordTerm + "'";
        if (json.countWordMatches == 0) {
            text += " doesn't appear at all";
        } else if (json.countWordMatches == 1) {
            text += " appears only one time";
        } else {
            text += " appears only " + json.countWordMatches + " times";
        }
        const msg = text + " in a page with " + json.wordsCount + " words! Add it more and improve your rankings";
        applyMsg(pageId, "Severe", msg, currTestDiv);
    } else {
        const msg = "Keyword density is great! The keyword '" + json.keywordTerm + "' was found " + json.countWordMatches + " times in a page with " + json.wordsCount + " words.";
        applyMsg(pageId, "Success", msg, currTestDiv);
    }

    sumWords += json.wordsCount;
    currTestDiv = "wordsCount";
    if (json.wordsCount < 100) {
        const msg = "Page has only " + json.wordsCount + " words, add more high quality content for better SEO, remember to write for humans, not for SEO engines.";
        applyMsg(pageId, "Severe", msg, currTestDiv);
    } else {
        const msg = "Page has " + json.wordsCount + " words! That's great for your SEO, make sure to add more pages with high quality content.";
        applyMsg(pageId, "Success", msg, currTestDiv);
    }

    // H1 section
    applyHowToChangeLink('h1Section', "https://support.wix.com/en/article/managing-your-pages-heading-tags#adding-an-h1-tag",
        "https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings#set-or-update-your-home-page-metadata",
        "https://www.weebly.com/seo/title-tag");

    if (json.H1 && json.H1 !== '') {
        $('.h1Content').html(json.H1);
        currTestDiv = "h1Length";
        if (json.H1Length && json.H1Length > 30 && json.H1Length < 150) {
            const msg = "H1 tag length is " + json.H1Length + " characters, that great! Should be between 30-150 characters.";
            applyMsg(pageId, "Success", msg, currTestDiv);
        } else {
            sumH1Issues++;
            const msg = "Your H1 tag length is " + json.H1Length + " characters! It should be between 30-150 characters.";
            applyMsg(pageId, "Warning", msg, currTestDiv);
        }

        // currTestDiv = "h1Count";
        // if (json.H1Count && json.H1Count > 1) {
        //     sumH1Issues++;
        //     const msg = "We found " + json.H1Count + " H1 tags in the page, best practice is to have one H1 in each page.";
        //     applyMsg(pageId, "Warning", msg, currTestDiv);
        // } else {
        //     const msg = "Great, a single H1 tag in the page, best practice is to have one H1 in each page.";
        //     applyMsg(pageId, "Success", msg, currTestDiv);
        // }
    } else {
        currTestDiv = "h1Length";
        sumH1Issues++;
        const msg = "Oops, We couldn't find any H1 tag in your page! Add H1 tag and have the keyword '" + json.keywordTerm + "' in there.";
        applyMsg(pageId, "Severe", msg, currTestDiv);
    }

    currTestDiv = "keywordInH1";
    if (!json.H1ContainsKeyword) {
        sumH1Issues++;
        sumKeywordsIssues++;
        const msg = "H1 tag doesn't contain the keyword '" + json.keywordTerm + "', add it to improve your rankings.";
        applyMsg(pageId, "Severe", msg, currTestDiv);
    } else {
        const msg = "H1 tag contains the keyword '" + json.keywordTerm + "', great job!";
        applyMsg(pageId, "Success", msg, currTestDiv);
    }

    currTestDiv = "h2Exists";
    if (json.H2Exists === 0) {
        const msg = "We couldn't find any H2 tags in the page, it's not a must but it can be very useful to have few H2 tags in your page with your keyword";
        applyMsg(pageId, "Warning", msg, currTestDiv);
    } else {
        const msg = "Your page contains " + json.H2Exists + " H2 Tags! That's great for your SEO, Make sure all pages have H2 tags.";
        applyMsg(pageId, "Success", msg, currTestDiv);
    }

    // $('#' + divId + ' div#pageContent').html(json.content);

    $('#' + divId + ' div#severeIssues').html(severe);
    $('#' + divId + ' div#severeIssues').attr("data-bs-content", severe > 0 ? "Fix your severe issues ASAP and boost traffic to your website" : "Hooray! you don't have any severe issues!");
    $('#' + divId + ' div#warnings').html(warnings);
    $('#' + divId + ' div#warnings').attr("data-bs-content", warnings > 0 ? "Get better results and higher rankings - fix your warnings" : "Hooray! you don't have any warnings!");
    $('#' + divId + ' div#successTest').html(success);
    // const score = 100 - ((severe * eachTest) + (warnings * warningScore));
    eachTest = 100 / totalTests;
    let score = 100 - ((severe * eachTest) + (warnings * eachTest));
    // if (pageUrl.indexOf('kopie-von-tomb-rider-1') !== -1) {
    // console.log('pageUrl ' + pageUrl);
    // console.log('totalTests ' + totalTests);
    // console.log('eachTest ' + eachTest);
    // console.log('severe ' + severe);
    // console.log('warnings ' + warnings);
    // console.log('success ' + success);
    // console.log('score ' + score);
    // }


    $('#' + divId + ' div#pageScore').html(Math.ceil(score) + "%");
    $('#pageScore' + pageId).html(Math.ceil(score) + "%");
    let scoreCls = getScoreCls(score);
    $('#pageScore' + pageId).addClass('badge rounded-pill small-inner-border bg-info');
    $('#pageScore' + pageId).addClass(scoreCls);
    sumWarnings += warnings;
    sumSevere += severe;
    sumSuccess += success;
    sumScore += score;
}

function rescanAllPages() {
    // alert(payingUserOrFreeTrial)
    if (payingUserOrFreeTrial || isTestingMode()) {
        $('#pagesUl').html('');
        $('.loading').show();
        showLongProgressBar = true;

        $.ajax({
            type: 'POST',
            url: getApiUrl('refreshAllPagesLandingPage'),
            success: function (result) {
                loadingTitle = null;
                loadingText = null;
                // console.log('success ' + JSON.stringify(result));
                // setTimeout(function() {
                loadAllLandingPages();
                // }, 3000);
            }
        });
    } else {
        callUpgradePage();
    }
}

function addNewLandingPage() {
    if (payingUserOrFreeTrial) {
        // animateProgressBar('Scanning your new page...', '', 50);
        $.ajax({
            type: 'POST',
            url: getApiUrl('addNewLandingPage'),
            // dataType: 'json',
            data: "pageUrl=" + $('#pageUrl').val(),
            success: function (result) {
                setTimeout(function () {
                    loadAllLandingPages();
                }, 2000);
            }
        });
    } else {
        callUpgradePage();
    }
}

function deletePage(id) {
    showModal('Confirm', 'Are you sure you want to delete this landing page?', 'No', 'Yes');
    $('div#modalMessage button#modalSecondButton').click(function () {
        $.ajax({
            type: 'POST',
            url: apiUrl + 'editLandingPage',
            data: getPostParams('oper=del&id=' + id),
            success: function (result) {
                // console.log('deletePage ' + JSON.stringify(result));
                if (result.status) {
                    showModal("Message", result.status, "Close", "");
                } else {
                    // animateProgressBar('Refreshing your pages...', '', 50);
                    let divId = "pageId" + id;
                    $('#' + divId).html('');
                    // $(divId).html('');
                    loadAllLandingPages();
                }
            }
        });
    });
}

function refreshPage(id) {
    // if (payingUser || true) {
    if (payingUserOrFreeTrial) {
        let divId = "pageId" + id;
        let keyword = $('#' + divId + ' select.keywordsSelectForLandingPages').val();
        if (!keyword) {
            keyword = $('#' + divId + ' input.keywordsForLandingPages').val();
        }
        const data = getPostParams('id=' + id + '&doRefresh=true&keywordTerm=' + keyword);
        // $('#' + divId).html('');
        // console.log('refreshPage data is ' + data);
        $.ajax({
            type: 'POST',
            url: getApiUrl('getMyJsonRefreshSingleLandingPage'),
            data: data,
            success: function (result) {
                // console.log('refreshPage ' + JSON.stringify(result));
                drawSinglePage(result["map"], result["map"]["pageUrl"], id);
            }
        });
    } else {
        callUpgradePage();
    }
}