let totalTests = 0;
let eachTest = 0;
let openOverview = true;
let showInModal = false;
let reScan = false;
let currKeywordTerm;
let issuesSummary = '';
// const eachTest = 100 / totalTests;
// const warningScore = eachTest;
// const warningScore = eachTest / 2;

function savePage() {
    $('#landingForm div.spinner-border').show();
    $.ajax({
        type: 'POST',
        url: getApiUrl('addNewLandingPage'),
        // dataType: 'json',
        data: getPostParams("pageUrl=" + $('#pageUrl').val() + '&keyword=' + $('#landingPageKeyword').val()),
        success: function (result) {
            $('#landingForm div.spinner-border').hide();
            showModal("Message", result.status, "Close", "");
            if (result.status != 'error') {
                setTimeout(function () {
                    $('#modalMessage').modal('hide');
                    // landingPageTable.destroy();
                    // loadLandingPagesList();
                    initLandingPages();
                    historyPushState('add-new-landing-page-success', 'Add New Landing Page Success');
                }, 3000);
            }
            // console.log('success ' + JSON.stringify(result));
        }
    });
}

function refreshAllPages(partialRescan) {
    $('.spinner-border').show();
    $.ajax({
        type: 'POST',
        url: apiUrl + 'refreshAllPagesLandingPage?partialRescan=' + partialRescan,
        success: function (result) {
            // console.log('success ' + JSON.stringify(result));
            showModal("Message", result.status, "Close", "");
            if (result.status != 'error') {
                setTimeout(function () {
                    $('#modalMessage').modal('hide');
                    initLandingPages();
                    // landingPageTable.destroy();
                    // loadLandingPagesList();
                }, 3000);
            }
            $('.spinner-border').hide();
        }
    });
}

function doDeletePage(tr, id) {
    console.log('start doDeletePage id ' + id)
    if (id) {
        console.log('delete page id ' + id);
        $.ajax({
            type: 'POST',
            url: apiUrl + 'editLandingPage',
            data: getPostParams('oper=del&id=' + id),
            success: function (result) {
                console.log('deletePage result ' + JSON.stringify(result));
                if (result.status) {
                    showModal("Message", result.status, "Close", "");
                } else {
                    currTr = -1;
                    var dataTable = $('#pagesGrid').DataTable();
                    dataTable.rows(tr).remove().draw();
                    fadeModalWithTime("", "Landing Page Removed", 1000, true);
                    // confirmDelete = true;
                    $("#landingPageOverviewPageId" + id).hide();
                    initLandingPagesComplete();
                }
            }
        });
    }
}

deletePage = async (tr) => {
    var $target = $(event.target);
    var tr = $target.closest('tr');
    var id = $(tr).attr('id');
    console.log('in deletePage confirmDelete ' + confirmDelete + ' id ' + id);
    if (isConfirmDelete()) {
        showModal('Confirm', 'Are you sure you want to delete this landing page from the app (the page will remain in your website)?', 'No', 'Yes');
        $('div#modalMessage button#modalSecondButton').click(function () {
            confirmDelete = false;
            doDeletePage(tr, id);
        });
    } else {
        doDeletePage(tr, id);
    }
}
var currTr = -1;

function refreshPageByKeyword(id, pageKeyword) {
    const data = getPostParams('id=' + id + '&doRefresh=' + reScan + '&keywordTerm=' + pageKeyword);
    console.log('refreshPageByKeyword data ' + data)
    reScan = false;
    // console.log('refreshPage data is ' + data);
    $('#landingPageOverviewPageId' + id + ' div#allTips').html('<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>');
    $.ajax({
        type: 'POST',
        // url: apiUrl + 'readUniqueLandingPage',
        url: getApiUrl('getMyJsonRefreshSingleLandingPage'),
        data: data,
        success: function (result) {
            if (!isAllowRow()) {
                showUpgradeModal('Would you like to upgrade your account to use Landing Pages Optimizer?');
                // callUpgradePage();
            }
            // else {
                // landingPageTable.destroy();
                // loadLandingPagesList();
                console.log('refreshPage result ' + JSON.stringify(result));
                // console.log('refreshPage before jsonLandingPages[currTr]["testResult"] ' + JSON.stringify(jsonLandingPages[currTr - 1]["testResult"]));
                const testResultJson = result["map"];
                // const testResultJson = JSON.parse(result["map"]);
                console.log('in refresh currTr is ' + currTr);
                if (jsonLandingPages[currTr - 1]) {
                    jsonLandingPages[currTr - 1]["testResult"] = testResultJson;
                }
                // console.log('refreshPage after jsonLandingPages[currTr]["testResult"] ' + JSON.stringify(jsonLandingPages[currTr - 1]["testResult"]));
                // calcAllPages(jsonLandingPages);
                calcPage(testResultJson, id, true);
                loadLandingPagesList();
            // }
        }
    });
}

refreshPage = async (id) => {
    // console.log('started refreshPage');
    var $target = $(this);
    if (event) {
        $target = $(event.target);
    }
    currTr = $target.closest('tr').index() + 1;

    let pageKeyword = $('#pageKeyword' + id).val();
    console.log('in refreshPage pageKeyword is ' + pageKeyword);
    console.log('in refreshPage currKeywordTerm is ' + currKeywordTerm);
    // if (!pageKeyword) {
    //     pageKeyword = currKeywordTerm;
    // }
    refreshPageByKeyword(id, currKeywordTerm);
}

function loadLandingPages() {
    $('#trafficWarningDiv').hide();
    $('#trafficSuccessDiv').hide();

    $('#overviewOf').html(' <span>' + getTranslationWord("Landing Pages") + '</span>');
    // $('#overviewOf').html($('#inputSearchWebsite').val() + ' <span>' + getTranslationWord("Landing Pages") + '</span>');
    if (!payingUser && mainUserDetails && mainUserDetails["defaultKeyword"] && mainUserDetails["defaultKeyword"].length > 0) {
        keywordsSelectForLandingPages.push(mainUserDetails["defaultKeyword"]);
        loadLandingPagesList();
    } else {
        if (isDev()) {
            loadLandingPagesList();
        } else {
            $.getJSON(getApiUrl('getMyJsonKwrdsListLandingPage?url=' + $('#inputSearchWebsite').val()), function (data) {
                hasAlertToShow(data);
                var list = data['list'];
                console.log('getMyJsonKwrdsListLandingPage ' + JSON.stringify(list));
                keywordsSelectForLandingPages = [];
                for (let i = 0; i < list.length; i++) {
                    keywordsSelectForLandingPages.push(list[i]);
                }
                // console.log('keywordItems ' + JSON.stringify(keywordItems));
                if (keywordItems && keywordItems.length > 0) {
                    for (let i = 0; i < keywordItems.length; i++) {
                        let currKeyword = keywordItems[i]["keyword_data.keyword"];
                        if (false) {
                            // if (payingUser == false && i > 3) {
                            currKeyword = "Upgrade for more...";
                        }
                        if (!keywordsSelectForLandingPages.includes(currKeyword)) {
                            // console.log('adding currKeyword ' + currKeyword);
                            keywordsSelectForLandingPages.push(currKeyword);
                        }
                    }
                }

                if (suggestedKeywords && suggestedKeywords.length > 0) {
                    for (let i = 0; i < suggestedKeywords.length; i++) {
                        let currKeyword = suggestedKeywords[i];
                        if (!keywordsSelectForLandingPages.includes(currKeyword)) {
                            keywordsSelectForLandingPages.push(currKeyword);
                        }
                    }
                }

                loadLandingPagesList();
            });
        }
    }
}

let failedTests = 0, avgScore = 0;
let currPageUrl, currPageTitle, divId, score = 0, warnings = 0, severe = 0, success = 0;
let pagesCount, sumWarnings = 0, sumSevere = 0, sumSuccess = 0,
    sumScore = 0, sumTitleIssues = 0, sumMetaDescIssues = 0, sumOtherMetaIssues = 0,
    sumKeywordsIssues = 0, sumWords = 0, sumH1Issues = 0, sumKeywordDensity = 0;

function resetCounters() {
    score = 0;
    warnings = 0;
    severe = 0;
    success = 0;
    sumWarnings = 0;
    sumSevere = 0;
    sumSuccess = 0;
    sumScore = 0;
    sumTitleIssues = 0;
    sumMetaDescIssues = 0;
    sumOtherMetaIssues = 0;
    sumKeywordsIssues = 0;
    sumWords = 0;
    sumH1Issues = 0;
    sumKeywordDensity = 0;
}

function getFormattedKeywordDensity(json) {
    try {
        return " (" + formatNumber(json.keywordDensity) + "%)";
    } catch (e) {
        return '';
    }
}

function calcPage(json, pageId, showContent) {
    // console.log('landingPageOverview json ' + JSON.stringify(json));
    // console.log('landingPageOverview json title ' + json["title"]);
    totalTests = 0;
    currPageUrl = json["pageUrl"];
    warnings = 0, severe = 0, success = 0;
    divId = "landingPageOverviewPageId" + pageId;
    currPageTitle = json.title;
    // console.log('calcPage json.title for page ' + json.pageUrl + 'is ' + currPageTitle);
    // console.log('json.keywordTerm ' + json.keywordTerm);
    // console.log('currKeywordTerm ' + currKeywordTerm);
    if (currKeywordTerm) {
        json.keywordTerm = currKeywordTerm;
    }
    // if (!json.title || json.title === 'undefined') {
    //     severe++;
    // }

    // if (!keywordsSelectForLandingPages.includes(json.keywordTerm)) {
    //     var o = new Option(json.keywordTerm, json.keywordTerm);
    //     $(o).html(json.keywordTerm);
    //     $('#' + divId + ' select.keywordsSelectForLandingPages').append(o);
    // }
    // $("#pageKeyword" + pageId).val(json.keywordTerm).trigger('change.select2');
    $('#' + divId + ' div.spinner-border').hide();
    // let prevButton = "<a class='nextPrevPageBtn' onclick=\"showPrevNextPage(-1)\"><img src=\"images/icon/previous.png\" style=\"width: 30px\" /></a>";
    // let nextButton = "<a class='nextPrevPageBtn' onclick=\"showPrevNextPage(1)\"><img src=\"images/icon/next.png\" style=\"width: 30px\" /></a>";
    // let refreshButton = "<button class=\"ignoreme btn btn-sm btn-light refresh\" type=\"button\" onclick=\"refreshPage(" + pageId + ")\"><img src=\"images/icon/update.png\" style=\"width: 40px\" /> </button>";
    // $('#' + divId + ' div#prevButton').html(prevButton);
    // $('#' + divId + ' div#nextButton').html(nextButton);
    if (currPageUrl) {
        currPageUrl = currPageUrl.replace('?_escaped_fragment_=', '');
        $('#' + divId + ' div#pageUrlLink h4').html('<span>Tips & Hints for</span>' + getFormattedExternalUrl(currPageUrl));
    }
    // $('#' + divId + ' div#pageUrlLink').append(refreshButton);
    // $(".pageKeyword" + pageId).val(json.keywordTerm);
    // $('#' + divId + ' a.testPageAgain').attr("href", "javascript: refreshPage(" + pageId + ")");
    // $('#' + divId + ' select.keywordsSelectForLandingPages').attr("onchange", "javascript: refreshPage(" + pageId + ")");
    // $('#' + divId + ' input.keywordsForLandingPages').attr("onchange", "javascript: refreshPage(" + pageId + ")");
    // $('#' + divId + ' a#removePage').attr("href", "javascript: deletePage(" + pageId + ")");
    // console.log('show page title ' + currPageTitle)
    $('#' + divId + ' div.pageTitleText').html(replaceAllToBold(currPageTitle, currKeywordTerm));
    const content = json["content"];
    if (!content && showContent) {
        $.ajax({
            type: 'POST',
            url: getApiUrl('getMyJsonRefreshSingleLandingPage'),
            data: getPostParams('id=' + pageId + '&doRefresh=true&keywordTerm=' + currKeywordTerm),
            success: function (result) {
                try {
                    const testResultJson = result["map"];
                    console.log('in reload content result is ' + JSON.stringify(testResultJson));
                    $('#' + divId + ' div.pageContentVal').html(replaceAllToBold(testResultJson['content'], currKeywordTerm));
                } catch (e) {
                }
            }
        });
        const linksApiUrl = getApiUrl('getMyJsonPageLinksLandingPage?url=' + json['minPageUrl']);
        $.getJSON(linksApiUrl, function (json) {
            // console.log('linksApiUrl ' + linksApiUrl + ' json ' + JSON.stringify(json));
            $('.linksInText').html(getLinksHtmlTable(json['map']['linksIn']));
            $('.linksOutText').html(getLinksHtmlTable(json['map']['linksOut']));
        });
    } else {
        $('#' + divId + ' div.pageContentVal').html(replaceAllToBold(content, currKeywordTerm));
    }

    $('#' + divId + ' div.metaDescText').html(replaceAllToBold(json["metaDesc"], currKeywordTerm));
    $('#' + divId + ' div.h1TagText').html(replaceAllToBold(json["H1"], currKeywordTerm));
    // $('#' + divId + ' div#first').html(json["content"]);
    // start testing
    let currTestDiv;

    // title length
    currTestDiv = "Page Title Length";
    if (json.pageTitleLength === 0) {
        sumTitleIssues++;
        const msg = "Page title is missing! Add a title ASAP, ideal length should be 55-70 chars";
        applyMsg("Severe", msg, currTestDiv);
    } else if (json.pageTitleLength > 70) {
        sumTitleIssues++;
        const msg = "Page title '" + json.title + "' is too long (" + json.pageTitleLength + " chars), try to make it between 55-70 chars";
        applyMsg("Warning", msg, currTestDiv);
    } else if (json.pageTitleLength < 55) {
        sumTitleIssues++;
        const msg = "Page title '" + json.title + "' is too short (" + json.pageTitleLength + " chars), try to make it between 55-70 chars";
        applyMsg("Warning", msg, currTestDiv);
    } else {
        const msg = "Page title '" + json.title + "' length is perfect (" + json.pageTitleLength + " chars), ideal length is between 55-70 chars";
        applyMsg("Success", msg, currTestDiv);
    }
    applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");


    // title with keyword
    currTestDiv = "Title with Keyword";
    if (!json.pageTitleContainsKeyword) {
        sumTitleIssues++;
        sumKeywordsIssues++;
        const msg = "Page title '" + json.title + "' doesn't contain the keyword '" + json.keywordTerm + "'. Fix it by adding the keyword in the page title.";
        applyMsg("Severe", msg, currTestDiv);
    } else {
        const msg = "Page title '" + json.title + "' contains the keyword '" + json.keywordTerm + "'";
        applyMsg("Success", msg, currTestDiv);
    }
    applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");

    // Meta testing
    currTestDiv = "Meta Description Tag";
    if (json.metaDesc && json.metaDesc !== '') {
        $('.metaDescContent').html(json.metaDesc);
        const metaDescLength = json.metaDesc.length;

        if (metaDescLength > 320) {
            sumMetaDescIssues++;
            const msg = "Meta Description Tag is too long (" + metaDescLength + " chars), try to make it between 50-320 chars.";
            applyMsg("Warning", msg, currTestDiv);
        } else if (metaDescLength < 50) {
            sumMetaDescIssues++;
            const msg = "Meta Description Tag is too short (" + metaDescLength + " chars), try to make it between 50-320 chars.";
            applyMsg("Warning", msg, currTestDiv);
        } else {
            const msg = "Meta Description Tag is great (" + metaDescLength + " chars), ideal length is between 50-320 chars.";
            applyMsg("Success", msg, currTestDiv);
        }
    } else {
        const msg = "We couldn't find any Meta Description Tag in your page, add it soon and make it between 50-320 chars.";
        applyMsg("Severe", msg, currTestDiv);
    }
    applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");

    currTestDiv = "Meta Description Tag with Keyword";
    if (!json.metaDescContainsKeyword) {
        sumMetaDescIssues++;
        sumKeywordsIssues++;
        const msg = "Meta Description Tag doesn't contain the keyword '" + json.keywordTerm + "'. Fix it by adding the keyword in the Meta Description Tag.";
        applyMsg("Severe", msg, currTestDiv);
    } else {
        const msg = "Meta Description Tag contains the keyword '" + json.keywordTerm + "'";
        applyMsg("Success", msg, currTestDiv);
    }
    applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");

    // additional meta tags
    // currTestDiv = "Meta Keywords Tag";
    // if (!json.metaKeywords) {
    //     sumOtherMetaIssues++;
    //     const msg = "Meta Keywords Tag is missing in the page";
    //     applyMsg("Warning", msg, currTestDiv);
    // } else {
    //     if (!json.metaKeywordsContainsKeyword) {
    //         sumOtherMetaIssues++;
    //         sumKeywordsIssues++;
    //         const msg = "Meta Keywords Tag '" + json.metaKeywords + "' doesn't contain the keyword '" + json.keywordTerm + "'";
    //         applyMsg("Warning", msg, currTestDiv);
    //     } else {
    //         const msg = "Meta Keywords Tag '" + json.metaKeywords + "' contains the keyword '" + json.keywordTerm + "'";
    //         applyMsg("Success", msg, currTestDiv);
    //     }
    // }
    // applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/adding-additional-meta-tags-to-your-sites-pages",
    //     "https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings#set-or-update-your-home-page-metadata",
    //     "https://hc.weebly.com/hc/en-us/articles/205678298-Descriptions-and-Keywords");

    // currTestDiv = "metaOgSiteName";
    // if (!json.metaOgSiteName || json.metaOgSiteName === '') {
    //     sumOtherMetaIssues++;
    //     const msg = "Meta Site Name Tag is missing in the page";
    //     applyMsg("Warning", msg, currTestDiv);
    // } else {
    //     const msg = "Meta Site Name Tag '" + json.metaOgSiteName + "' was found in the page";
    //     applyMsg("Success", msg, currTestDiv);
    // }
    //
    // currTestDiv = "metaOgSiteUrl";
    // if (!json.metaOgSiteUrl || json.metaOgSiteUrl === '') {
    //     sumOtherMetaIssues++;
    //     const msg = "Meta Site Url Tag is missing in the page";
    //     applyMsg("Warning", msg, currTestDiv);
    // } else {
    //     const msg = "Meta Site Url Tag '" + json.metaOgSiteUrl + "' was found in the page";
    //     applyMsg("Success", msg, currTestDiv);
    // }

    // Content section

    // tooltip - Percentage of how many times the keyword appears in the page content (relative to the whole content), a good value would be between 1% - 3%
    currTestDiv = "Keyword Density";
    let tooltipSubjectKD = 'What is Keyword Density?';
    let tooltipTextKD = 'Keyword density refers to how often a keyword appears on a given web page. The more frequently a keyword appears in a page or piece of content, the higher your keyword density is.<br /><br />' +
        'Keyword density will help determine how well people can find your website or content organically. There’s a balance between too little or too much. When keywords appear too infrequently, you’ll have trouble ranking against competition. However, if a keyword appears too frequently that could be seen as keyword stuffing, which can also negatively impact your ranking.<br /><br />' +
        'Search engines like Google may need to see “proof,” in the form of keywords, that your content is truly relevant to the query.<br /><br />' +
        'Most SEO professionals believe ideal keyword density to be between 1-2%. This means that for every 100 words in an article, or on a page, the keyword should be used 1-2 times. '
    // + 'You want to show the vistitor, and search engines, what the page is about without spamming a specific word on the page.'
    // console.log('### json.keywordDensity ' + json.keywordDensity)
    if (json.keywordDensity < 1 || json.keywordDensity > 2) {
        sumKeywordDensity++;
        sumKeywordsIssues++;
        var text = "Your keyword density is " + (json.keywordDensity < 1 ? 'too low' : 'too high') + getFormattedKeywordDensity(json) + ", the keyword '" + json.keywordTerm + "'";
        var text2;
        if (json.countWordMatches == 0) {
            text += " doesn't appear at all";
        } else if (json.countWordMatches == 1) {
            text += " appears only one time";
        } else {
            if (json.keywordDensity < 1) {
                text += " appears only " + json.countWordMatches + " times";
            } else {
                text += " appears " + json.countWordMatches + " times";
                text2 = " This is way too much, remember we should write for humans, not for search engines."
            }
        }
        const msg = text + " in a page with " + json.wordsCount + " words! " + (text2 ? text2 : "Add it more and improve your rankings");
        applyMsg("Severe", msg, currTestDiv, tooltipSubjectKD, tooltipTextKD);
    } else {
        const msg = "Your keyword density is great, the keyword '" + json.keywordTerm + "' appears " + json.countWordMatches + " times in a page with " + json.wordsCount + " words! All your pages should have such optimized keyword density for great SEO!";
        applyMsg("Success", msg, currTestDiv, tooltipSubjectKD, tooltipTextKD);
    }
    applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/optimizing-your-sites-content-for-seo",
        "https://help.shopify.com/manual/promoting-marketing/seo/adding-keywords#using-keywords-in-page-content",
        "https://www.weebly.com/seo/content");

    sumWords += json.wordsCount;
    currTestDiv = "Page Content";
    if (json.wordsCount < 100) {
        const msg = "Your page contains only " + json.wordsCount + " words, you should add more content for better SEO.";
        applyMsg("Severe", msg, currTestDiv);
    } else {
        const msg = "Your page contains " + json.wordsCount + " words! That's great for your SEO, search engines like content :)";
        applyMsg("Success", msg, currTestDiv);
    }
    applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/optimizing-your-sites-content-for-seo",
        "https://help.shopify.com/manual/promoting-marketing/seo/adding-keywords#using-keywords-in-page-content",
        "https://www.weebly.com/seo/content");

    // H1 section

    if (json.H1 && json.H1 !== '') {
        $('.h1Content').html(json.H1);
        currTestDiv = "H1 Tag Length";
        if (json.H1Length && json.H1Length >= 35 && json.H1Length <= 120) {
            const msg = "Your H1 tag length is " + json.H1Length + " characters which is great, usually it should be between 35-120 characters.";
            applyMsg("Success", msg, currTestDiv);
        } else {
            sumH1Issues++;
            const msg = "Your H1 tag length is " + json.H1Length + " characters! Usually it should be between 35-120 characters.";
            applyMsg("Warning", msg, currTestDiv);
        }
        applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/managing-your-pages-heading-tags#adding-an-h1-tag",
            "https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings#set-or-update-your-home-page-metadata",
            "https://www.weebly.com/seo/title-tag");

        // currTestDiv = "H1 Tag Count";
        // if (json.H1Count && json.H1Count > 1) {
        //     sumH1Issues++;
        //     const msg = "We found " + json.H1Count + " H1 tags in the page, best practice is to have one H1 in each page.";
        //     applyMsg("Warning", msg, currTestDiv);
        // } else {
        //     const msg = "Great, a single H1 tag in the page, best practice is to have one H1 in each page.";
        //     applyMsg("Success", msg, currTestDiv);
        // }
        // applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/optimizing-your-sites-content-for-seo",
        //     "https://help.shopify.com/manual/promoting-marketing/seo/adding-keywords#using-keywords-in-page-content",
        //     "https://www.weebly.com/seo/content");
    } else {
        currTestDiv = "H1 Tag Length";
        sumH1Issues++;
        const msg = "Your H1 tag '" + json.H1 + "' doesn't contain the keyword '" + json.keywordTerm + "', make sure you add it ASAP";
        applyMsg("Severe", msg, currTestDiv);
    }
    applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/managing-your-pages-heading-tags#adding-an-h1-tag",
        "https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings#set-or-update-your-home-page-metadata",
        "https://www.weebly.com/seo/title-tag");


    currTestDiv = "H1 Tag with Keyword";
    if (!json.H1ContainsKeyword) {
        sumH1Issues++;
        sumKeywordsIssues++;
        const msg = "H1 tag doesn't contain the keyword '" + json.keywordTerm + "', add it to improve your rankings.";
        applyMsg("Severe", msg, currTestDiv);
    } else {
        const msg = "H1 tag contains the keyword '" + json.keywordTerm + "', great job!";
        applyMsg("Success", msg, currTestDiv);
    }
    applyHowToChangeLink(currTestDiv, "https://support.wix.com/en/article/managing-your-pages-heading-tags#adding-an-h1-tag",
        "https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings#set-or-update-your-home-page-metadata",
        "https://www.weebly.com/seo/title-tag");

    // currTestDiv = "H2 Tag Exists";
    // if (json.H2Exists === 0) {
    //     warnings++;
    //     const msg = "We couldn't find any H2 tags in the page, it's not a must but it can be very useful to have few H2 tags in your page with your keyword";
    //     applyMsg("Warning", msg, currTestDiv);
    // } else {
    //     const msg = "Your page contains " + json.H2Exists + " H2 Tags! That's great for your SEO, Make sure all pages have H2 tags.";
    //     applyMsg("Success", msg, currTestDiv);
    // }

    $('#' + divId + ' div#pageContent').html(json.content);

    // $('#' + divId + ' div#severeIssues').html(severe);
    // $('#' + divId + ' div#severeIssues').attr("data-bs-content", severe > 0 ? "Fix your severe issues ASAP and boost traffic to your website" : "Hooray! you don't have any severe issues!");
    // $('#' + divId + ' div#warnings').html(warnings);
    // $('#' + divId + ' div#warnings').attr("data-bs-content", warnings > 0 ? "Get better results and higher rankings - fix your warnings" : "Hooray! you don't have any warnings!");
    // $('#' + divId + ' div#successTest').html(success);

    // console.log('page is ' + currPageUrl + ' totalTests is ' + totalTests);
    eachTest = 100 / totalTests;
    score = 100 - ((severe * eachTest) + (warnings * eachTest));
    // console.log('eachTest ' + eachTest);
    // console.log('severe ' + severe);
    // console.log('warnings ' + warnings);
    // console.log('(severe * eachTest) ' + (severe * eachTest));
    // console.log('(warnings * eachTest) ' + (warnings * eachTest));
    // console.log('score ' + score);
    // console.log('finishTest current warnings ' + warnings);
    // console.log('finishTest current severe ' + severe);
    // console.log('finishTest current success ' + success);

    // $('#' + divId + ' div#pageScore').html(Math.ceil(score) + "%");
    // $('#' + divId + ' div#pageScore').html(Math.ceil(score) + "%");
    const scoreUI = Math.ceil(score) + "%";
    $('#' + divId + ' h4.pageScore div').html(scoreUI);
    $('#' + divId + ' h4.pageSuccessfulTests div').html(success);
    $('#' + divId + ' h4.pageFailedTests div').html(severe + warnings);

    $('#pageScore' + pageId).html(scoreUI);
    $('#failedTestSpan' + pageId).html(severe + warnings);
    // $('#failedTestSpan' + pageId).html(formatBiggerThanZeroVal(warnings + severe));
    $('#optScoreDiv' + pageId).html(renderOptScoreHtml(Math.ceil(score)));

    // console.log('json pae' + JSON.stringify(json));
    // console.log('json[\'linksIn\'] ' + json['linksIn']);
    // if (!json['linksIn']) {
    //     json['linksIn'] = '0';
    // }
    // if (!json['linksOut']) {
    //     json['linksOut'] = '0';
    // }
    // $('#' + divId + ' h4.inLinks').parent().parent().show();
    // $('#' + divId + ' h4.inLinks div').html(json['linksIn']);
    // $('#' + divId + ' h4.extLinks').parent().parent().show();
    // $('#' + divId + ' h4.extLinks div').html(json['linksOut']);
    if (json['linksIn'] && json['linksIn'] >= 0) {
        $('#' + divId + ' h4.inLinks').parent().parent().show();
        $('#' + divId + ' h4.inLinks div').html(json['linksIn']);
    } else {
        $('#' + divId + ' h4.inLinks').parent().parent().hide();
    }
    if (json['linksOut'] && json['linksOut'] >= 0) {
        $('#' + divId + ' h4.extLinks').parent().parent().show();
        $('#' + divId + ' h4.extLinks div').html(json['linksOut']);
    } else {
        $('#' + divId + ' h4.extLinks').parent().parent().hide();
    }

    sumWarnings += warnings;
    sumSevere += severe;
    sumSuccess += success;
    sumScore += score;

    if (landingPageTable) {
        // initLandingPagesComplete();
    }
}

function applyMsg(msgType, msg, parent, tooltipSubject, tooltipText) {
    totalTests++;
    let msgIcon = 'msgIcon-success';
    let msgClass = 'alertSuccess';
    // console.log('applyMsg ' + msgType + ' msg is ' + msg + ' parent is ' + parent);
    if (msgType === "Warning") {
        warnings++;
        msgClass = 'alertDanger';
        // msgClass = 'alert-warning';
        msgIcon = 'msgIcon-warning';
        issuesSummary = addDescToSummary(issuesSummary, currPageUrl, msg);
    } else if (msgType === "Severe") {
        severe++;
        msgClass = 'alertDanger';
        msgIcon = 'msgIcon-error';
        issuesSummary = addDescToSummary(issuesSummary, currPageUrl, msg);
    } else if (msgType === "Success") {
        success++;
    }

    const parentId = parent.replaceAll(' ', '');
    let html = '<div class="alertMessage ' + msgClass + ' mb-4" id="' + parentId + '">' +
        '    <div class="d-flex">\n' +
        '        <div class="alertIcon">\n' +
        '            <div class="iconRound">\n' + (msgType === 'Success' ? '<img src="/assets/images/home_icon/check-green.svg" alt="">' : '<i class="fa-solid fa-circle-exclamation"></i>') +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="alertBody">\n' +
        '            <div class="d-flex justify-content-between align-items-center">\n' +
        '                <div class="alertContent">\n' +
        '                    <h5 class="' + (msgType === 'Success' ? 'color-success' : 'color-warning') + '">' + parent +
        (tooltipText ? '<img class="tooltip' + parentId + '" src="/assets/images/home_icon/material-symbols_help.png" />' : '') + '\n' +
        '<span class="msg-btn ' + (msgType === 'Success' ? 'msg-btn-success' : 'msg-btn-warning') + '">' + msgType + '</span></h5>\n' +
        '                    <p>' + msg + '</p>\n' +
        '                </div>\n' +
        '                <a style="cursor: pointer" target="_blank" class="howToChangeLink alertLink">How to Change</a>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n';
    $('#' + divId + ' div#allTips').append(html);
    if (tooltipText) {
        addTooltipWithSubjectToSelector('.tooltip' + parentId, tooltipSubject, tooltipText);
    }
}

let jsonLandingPages;

function initLandingPagesComplete() {
    console.log('initLandingPagesComplete start')
    landingPageTable = $('#pagesGrid').DataTable();
    let rowsCount = landingPageTable.rows().count();
    // console.log('rowsCount ' + rowsCount);
    // $('#listedPages').html(rowsCount);
    if (rowsCount > 0) {
        // avgScore = nFormatter(sumScore / rowsCount, 2);
        // $('#overallScore').html(avgScore + '%');
        // $('.overallScore').html(avgScore + '%');
        $('#emptyTableWarningDiv').hide();
        if (rowsCount < 5) {
            $('#fewRowsTableWarningDiv').show();
        } else {
            $('#fewRowsTableWarningDiv').hide();
        }
    } else {
        $('#emptyTableWarningDiv').show();
        $('.circle').hide();
        $('.overallScore').hide();
    }
    failedTests = sumWarnings + sumSevere;
    avgScore = Math.ceil(sumScore / pagesCount);
    $('.myLandingPages').html(rowsCount);
    $('.successfulTests').html(sumSuccess);
    $('.myFailedTests').html(failedTests);

    if (issuesSummary.length > 0) {
        console.log('enable failedTestsOverview with summary ' + issuesSummary);
        $('.failedTestsOverview').show();
        issuesSummary = '<div class="alert alert-primary" role="alert">\n' +
            'Some of the issues we found, click on each row in the table to get a deep overview.\n' +
            '</div>' + issuesSummary;
        addModalToHrefSelectorClosestDiv('.failedTestsOverview', issuesSummary);
    } else {
        $('.failedTestsOverview').hide();
    }

    if (Number.isNaN(avgScore)) {
        $('.myScore').html('-');
    } else {
        $('.myScore').html(avgScore + '%');

        $.ajax({
            url: getApiUrl("updateDetailsWebsite?optScore=" + avgScore + "&failedTest=" + failedTests),
            success: function (result) {
                console.log('updateDetailsWebsite ' + JSON.stringify(result))
            }
        });
    }

    // var time = failedTests * 2 + 3;
    // if (time > 55) {
    //     time = 55;
    // }
    // $('#fixTime').html(time);
    // if (false && brokenLinks && brokenLinks > 0) {
    //     $('#brokenLinksWarningDiv').show();
    //     $('#brokenLinksCount').html(nFormatter(brokenLinks, 2));
    //     $('#trafficWarningDiv').hide();
    //     $('#trafficSuccessDiv').hide();
    // } else {
    if (avgScore > 90) {
        // $('#brokenLinksWarningDiv').hide();
        $('#trafficWarningDiv').hide();
        $('#trafficSuccessDiv').show();
    } else if (avgScore > 0) {
        // $('#brokenLinksWarningDiv').hide();
        $('#trafficSuccessDiv').hide();
        $('#trafficWarningDiv').show();

        if (payingUser) {
            $('#trafficWarningDiv #paid').show();
        } else {
            $('#trafficWarningDiv #free').show();
        }
    }
    // return landingPageTable;
}

function calcAllPages(json) {
    console.log("start calcAllPages, warnings is " + warnings + " sumWarnings is " + sumWarnings + " severe is " + severe + " sumSevere is " + sumSevere);
    resetCounters();
    console.log("after reset, warnings is " + warnings + " sumWarnings is " + sumWarnings + " severe is " + severe + " sumSevere is " + sumSevere);
    console.log('calcAllPages json ' + JSON.stringify(json));

    for (let i = 0; i < json.length; i++) {
        const pageId = json[i]["id"];
        const pageUrl = json[i]["pageUrl"];
        if (pageUrl) {
            let shortPageUrl = pageUrl.substring(pageUrl.indexOf('/'));
            if (shortPageUrl.length == 0) {
                shortPageUrl = 'Homepage';
            } else {
                shortPageUrl = shortPageUrl.replaceAll('//', '/');
            }
            let title = json[i]["title"];
            // console.log('loadLandingPagesList json.title for page ' + pageUrl + 'is ' + currPageTitle);
            title = title && title !== 'null' && title.length > 0 ? title : "<span class='text-danger'>Title Not Found</span>";
            pagesCount++;

            if (json[i]["testResult"]) {
                try {
                    let parsedJson = JSON.parse(json[i]["testResult"]);
                    calcPage(parsedJson, pageId, false);
                    json[i]["failedTests"] = warnings + severe;
                    json[i]["optScore"] = Math.ceil(score);
                    json[i]["title"] = currPageTitle;
                } catch (err) {
                    // console.log('json[i]["testResult"] ' + json[i]["testResult"]);
                }
            }
        }
    }
}

function loadLandingPagesListFromJson(json) {
    console.log('loadLandingPagesListFromJson ' + JSON.stringify(json));
    if (json.list == null) {
        json = [];
    } else {
        json = json.list;
        jsonLandingPages = json;
    }

    // console.log('start iterate list length is ' + json.length);
    calcAllPages(json);
    // console.log('jsonLandingPage ' + JSON.stringify(json));
    var firstKeyword;
    let scrollY = pagesCount > 200 ? 1000 : "";
    if (isOpenBelowTable()) {
        scrollY = pagesCount > 3 ? 400 : 200;
    }

    if (!landingPageTable) {
        landingPageTable = $('#pagesGrid').DataTable({
            "datatype": "json",
            "data": json,
            rowId: 'id',
            "columns": [
                {
                    "data": "",
                    "name": "number",
                    "title": "",
                    "defaultContent": "",
                    'visible': true,
                },
                {
                    data: "id",
                    render: function (data, type, row, meta) {
                        return meta ? meta.row : '';
                    },
                    visible: false
                },
                {
                    "data": "pageUrl", "name": "pageUrl", "defaultContent": "", "title": "Page Url", 'visible': true,
                    render: function (data, type, row, meta) {
                        if (data) {
                            let startRelativeUrl = data.indexOf('/');
                            data = data.slice(startRelativeUrl, data.length);
                            data = data.length > 1 ? data.replace("?_escaped_fragment_=", "") : 'Homepage'
                        }
                        return data;
                    },
                    "sClass": "m-lines",
                    "tooltip": getTranslationWord("The term you are trying to promote in google (normally there are few terms eg flowers delivery, flowers delivery shop, flowers delivery New York, flowers delivery in New York etc)")
                },
                {
                    "data": "title",
                    "name": "title",
                    "tooltip": getTranslationWord("Shows the title of the given page, page title is very important for SEO, make sure you choose a title that contains the right keyword."),
                    "title": "Title",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return data;
                        // return data && data.length > 0 ? data  : "<span class='text-danger'>***Missing Title</span>";
                    }
                },
                {
                    "data": "wordsCount",
                    "name": "wordsCount",
                    "tooltip": getTranslationWord("Shows how many words the given page has, search engines love content - all your pages should have content, even your contact us page"),
                    "title": "Words",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        if (type === 'display' || type === 'filter') {
                            return formatNumber(formatBiggerThanZeroVal(data));
                        } else {
                            return data
                        }
                    }
                },
                {
                    "data": "dateCreated",
                    "name": "dateCreated",
                    "title": "Created On",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return getFormattedDate(data);
                    }
                },
                // {
                //     "data": "linksIn",
                //     "name": "linksIn",
                //     "tooltip": getTranslationWord("Shows how many internal links (to YOUR website) the given page has."),
                //     "title": "In. Links",
                //     "defaultContent": "",
                //     'visible': true,
                //     render: function (data, type, row) { return formatBiggerThanZeroVal(data);}
                // },
                // {
                //     "data": "linksOut",
                //     "name": "linksOut",
                //     "tooltip": getTranslationWord("Shows how many external links (to OTHER websites) the given page has."),
                //     "title": "Ext. Links",
                //     "defaultContent": "",
                //     'visible': true,
                //     render: function (data, type, row) { return formatBiggerThanZeroVal(data);}
                // },
                {
                    "data": "keyword",
                    "name": "keyword",
                    "tooltip": getTranslationWord("Shows the keyword you would like to optimize this page for, it is important to choose the right keyword for each page."),
                    "title": "Keyword",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        let keyword = data;
                        // console.log('keyword ' + keyword + ' and first keyword is ' + firstKeyword);
                        if (!firstKeyword && keyword) {
                            firstKeyword = keyword;
                        }
                        if (!keyword && firstKeyword) {
                            keyword = firstKeyword;
                        }
                        if (!keyword && keywordsSelectForLandingPages && keywordsSelectForLandingPages.length > 0) {
                            keyword = keywordsSelectForLandingPages[0];
                        }

                        keyword = formatNotEmptyVal(keyword);
                        let keywordsTD = '<select id="pageKeyword' + row.id + '" class="ignoreme keywordsSelectForLandingPages form-select form-select-lg js-example-placeholder-single dropdown-toggle"><option selected>' + keyword + '</option></select>';
                        return keywordsTD;
                    }
                },
                {
                    "data": "optScore",
                    "name": "optScore",
                    "tooltip": getTranslationWord("The score of your page, the better it is, the higher you can rank :)"),
                    "title": "Score",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return "<div id='optScoreDiv" + row.id + "'>" + renderOptScoreHtml(data) + "</div>";
                    }
                },
                {
                    "data": "failedTests",
                    "name": "failedTests",
                    "tooltip": getTranslationWord("Shows how many issues we found for the given page."),
                    "title": "Issues",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return "<span id='failedTestSpan" + row.id + "'>" + formatBiggerThanZeroVal(data) +
                            "</span><button class=\"tableOpenRow btn btn-sm btn-light\" type=\"button\"><img src=\"/assets/images/home_icon/zoom-in-2.png\" alt=\"\"></button>";
                    }
                },
                {
                    data: "id", 'visible': true, "title": "Pages Actions",
                    render: function (data, type, row) {
                        return '<button class="tableOnPageCompare btn btn-sm btn-light" type="button" onclick="showOnPageCompareModal(\'\',\'' + row.pageUrl + '\')"><img src="/assets/images/home_icon/compare.png" alt=""></button>&nbsp;&nbsp;&nbsp;' +
                            '<button class="tablerefreshPage ignoreme btn btn-sm btn-light refresh" type="button" onclick="reScan = true; refreshPage(' + data + ')"><span class="updateIcon"><img src="/assets/images/home_icon/reload.svg" alt=""></span></button>' +
                            '<button class="tableDelect ignoreme btn btn-sm btn-light delete" type="button" onclick="deletePage(' + data + ')"><img src="/assets/images/home_icon/delete.svg" alt=""> </button>';
                    }
                },
                // {
                //     data: "id", 'visible': true,
                //     render: function (data, type, row) {
                //         return '<button class="btn btn-sm btn-light refresh expand-button" type="button"><i class="fa-solid fa-maximize"></i></button>'
                //     }
                // }
            ],
            destroy: true,
            "language": {
                "emptyTable": "No Landing Pages found"
            },
            "rowCallback": function (row, data, index) {
            },
            buttons: ['copy', 'excel', 'print', {
                extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
            }],
            "dom": '<"dt-buttons"Bf><"clear">firtlp',
            // info: false,
            responsive: true,
            // "bFilter": true,
            // fixedHeader: true,
            // select: true,
            // deferRender: true,
            // paging: pagesCount > 150,
            // scrollY: scrollY,
            // scrollCollapse: true,
            // scroller: pagesCount > 150,
            info: false,
            fixedHeader: true,
            deferRender: true,
            paging: false,
            "bFilter": true,
            "aoColumnDefs": [{
                "searchable": false,
                "targets": [0]
            }],
            'fnCreatedRow': function (nRow, aData, iDataIndex) {
                $(nRow).attr('onclick', 'landingPagesTableClick()');
            },
            columnDefs: [{
                // targets: 2,
                // createdCell: function (td, cellData, rowData, row, col) {
                //     $(td).css('white-space', 'initial');
                // }
            }],
            "drawCallback": function () {
                // drawGridCharts(this);
            },
            "initComplete": function (settings, json) {
                initLandingPagesComplete();
                initShowHideColumns('landingPageTable', landingPageTable);

                addPopover('.tableOpenRow', 'See Page Optimization hints & recommendations');
                addPopover('.tableOnPageCompare', 'Compare your Landing Page with your competitors\' landing pages and get new ideas');
                addPopover('.tableDelect', 'Delete Page - It will only remove the page from the table, it will not delete the page from your website');
                addPopover('.tablerefreshPage', 'Rescan Page - If you made changes to your page, click here to rescan it');

                if (hideLandingPagesFromFreeWix) {
                    hideRestRows("pagesGrid", -1);
                }
                adjustExportButtons('tableSearch', landingPageTable);
                $(".keywordsSelectForLandingPages").select2({
                    tokenSeparators: [',', ', ', '\n'],
                    selectOnClose: true,
                    data: keywordsSelectForLandingPages,
                    tags: true,
                });

                // console.log('call showLandingPageOverview with tr ' + currTr);
                // if (isOpenFirstRow() && currTr == -1 && rowsCount > 0) {
                //     currTr = 1;
                // }
                // if (currTr >= 1) {
                //     // if (currTr >= 1 && (payingUser || !hideLandingPagesFromFreeWix)) {
                //     // console.log('call showLandingPageOverview with tr ' + $('#pagesGrid tr').eq(currTr).html());
                //     showLandingPageOverview($('#pagesGrid tr').eq(currTr));
                // }
            }
        });

        landingPageTable.on('order.dt search.dt', function () {
                try {
                    landingPageTable.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                } catch (err) {
                }
            }
        ).draw();
    } else {
        initLandingPagesComplete();
    }
    showHideTestingMode();
    return landingPageTable;
}


function loadLandingPagesList() {
    pagesCount = 0, sumWarnings = 0, sumSevere = 0, sumSuccess = 0, failedTests = 0,
        sumScore = 0, sumTitleIssues = 0, sumMetaDescIssues = 0, sumOtherMetaIssues = 0,
        sumKeywordsIssues = 0, sumWords = 0, sumH1Issues = 0, sumKeywordDensity = 0;
    avgScore = 0, pagesCount = 0, issuesSummary = '';
    // console.log('loadLandingPagesList url is ' + subUrl);
    $('.lp-table-spinner').show();
    $.getJSON(getApiUrl('jsonLandingPage?url=' + $('#inputSearchWebsite').val()), function (json) {
        // $('#landingForm div.spinner-border').hide();
        $('.lp-table-spinner').hide();
        loadLandingPagesListFromJson(json);
    });
}

function showPrevNextPage(val) {
    let newTr = currTr + val;
    // console.log('newTr is ' + newTr + ' and jsonLandingPages.length ' + jsonLandingPages.length);
    if (newTr < 1) {
        newTr = jsonLandingPages.length;
    } else if (newTr > jsonLandingPages.length) {
        newTr = 2;
    }
    showLandingPageOverview($('#pagesGrid tr').eq(newTr));
}

function isAllowRow() {
    console.log('payingUserOrFreeTrial ' + payingUserOrFreeTrial);
    console.log('currTr ' + currTr);
    const rowToShow = hideLandingPagesFromFreeWix ? 0 : 1;
    const isAllow = currTr <= rowToShow || payingUserOrFreeTrial;
    console.log('isAllowRow ' + isAllow)
    return isAllow;
}

function isAllowRowChange() {
    return true;
}

function showLandingPageOverview(tr) {
    // console.log('showLandingPageOverview on click tr ' + tr.html())
    // console.log('showLandingPageOverview on click tr index ' + tr.index())
    currTr = $(tr).index() + 1;
    var row = landingPageTable.row(tr);
    // console.log('showLandingPageOverview currTr is ' + currTr);
    const jsonCurrPage = row.data();
    // const jsonCurrPage = jsonLandingPages[$(tr).index()];
    // console.log('showLandingPageOverview ' + JSON.stringify(jsonCurrPage));
    // if (true || $(tr).index() < rowToShow) {
    if (isAllowRowChange()) {
        var row = landingPageTable.row(tr);
        console.log('curr pageUrl is ' + jsonCurrPage['pageUrl']);
        let pageId = $(tr).attr('id');
        console.log('showLandingPageOverview pageId ' + pageId);
        currKeywordTerm = jsonCurrPage['keyword'];
        let pageTrKeyword = $(tr).find('.form-select').val();
        let needRefresh = false;
        if (pageTrKeyword !== currKeywordTerm) {
            currKeywordTerm = pageTrKeyword;
            needRefresh = true;
        }
        var data = $('#landingPageTemplateOverview').html();
        if (data) {
            data = data.replace('landingPageOverviewPageId', 'landingPageOverviewPageId' + pageId);
            data = data.replace('pageKeywordSelect', 'pageKeyword' + pageId);
            data = data.replace('refreshPage()', 'refreshPage(' + pageId + ')');
        }
        // console.log('data' + data);
        if (openOverview && isAllowRow()) {
            if (showInModal || true) {
                openModalHtml('appDataModal', data, 'Landing Page Overview - ' + jsonCurrPage['title']);
            } else {
                if (isOpenBelowTable()) {
                    $('#landingPageOverviewDiv').html(data);
                    animateToDiv('landingPageOverviewDiv');
                } else {
                    row.child(data, 'childClass').show();
                }
            }
        }
        divId = '#landingPageOverviewPageId' + pageId;
        // console.log('open lp overview set currKeywordTerm ' + currKeywordTerm)

        // console.log('keyword is ' + currKeywordTerm);
        if ((isAllowRowChange()) && needRefresh) {
            refreshPage(pageId);
        } else {
            // console.log('showing page overview data is ' + data);
            $(divId).html(data);
            let json = jsonCurrPage["testResult"];
            console.log('jsonCurrPage["testResult"] ' + JSON.stringify(jsonCurrPage["testResult"]));
            try {
                json = JSON.parse(jsonCurrPage["testResult"]);
                calcPage(json, pageId, true);
            } catch (e) {
                console.log('error in lp ' + e);
            }
        }
        if (!keywordsSelectForLandingPages.includes(currKeywordTerm)) {
            keywordsSelectForLandingPages.push(currKeywordTerm);
        }
        $(".pageKeyword" + pageId).select2({
            tokenSeparators: [',', ', ', '\n'],
            selectOnClose: true,
            data: keywordsSelectForLandingPages,
            tags: true,
        });
        // setSelectedValue(document.getElementsByClassName(".pageKeyword" + pageId), currKeywordTerm);
        $(".pageKeyword" + pageId).val(currKeywordTerm).trigger('change.select2');
        $(".pageKeyword" + pageId).on('change', function (e) {
            if (!isAllowRow()) {
                showUpgradeModal('Would you like to upgrade your account to use Landing Pages Optimizer?');
            }
            // else {
                currKeywordTerm = $(".pageKeyword" + pageId).val();
                // console.log('currKeywordTerm ' + currKeywordTerm + ' jsonLandingPages[$(tr).index()][\'keyword\'] ' + jsonLandingPages[$(tr).index()]['keyword'] +
                //     'jsonLandingPages[$(tr).index()][\'testResult\'][\'keywordTerm\'] ' + jsonLandingPages[$(tr).index()]['testResult']['keywordTerm']);
                jsonLandingPages[$(tr).index()]['keywordTerm'] = currKeywordTerm;
                jsonLandingPages[$(tr).index()]['keyword'] = currKeywordTerm;
                jsonLandingPages[$(tr).index()]['testResult']['keywordTerm'] = currKeywordTerm;
                if (!keywordsSelectForLandingPages.includes(currKeywordTerm)) {
                    keywordsSelectForLandingPages.push(currKeywordTerm);
                }
                $("#pageKeyword" + pageId).select2({
                    tokenSeparators: [',', ', ', '\n'],
                    selectOnClose: true,
                    data: keywordsSelectForLandingPages,
                    tags: true,
                });
                $("#pageKeyword" + pageId).val(currKeywordTerm).trigger('change.select2');
                $(divId + ' div#allTips').html('<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>');
                $(divId + ' div#first').html('');
                // refreshPage(pageId);
                refreshPageByKeyword(pageId, currKeywordTerm);
            // }
        })
        if (!isAllowRow()) {
            $(divId + ' div#allTips').addClass('blur-content');
            $(divId + ' div#contentArea').addClass('blur-content');
            $(divId + ' .upgradeBlock').show();
        }
        enableTooltips();
    } else {
        let pageId = $(tr).attr('id');
        let pageTrKeyword = $(tr).find('.form-select').val();
        console.log('show upgrade modal pageId ' + pageId + ' pageTrKeyword ' + pageTrKeyword);
        refreshPageByKeyword(pageId, pageTrKeyword);
        // showUpgradeModal('Would you like to upgrade your account to use Landing Pages Optimizer?');
    }
    if (!isAllowRow()) {
        showUpgradeModal('Would you like to upgrade your account to use Landing Pages Optimizer?');
    }
}

function applyHowToChangeLink(ahref, wixUrl, shopifyUrl, weeblyUrl) {
    ahref = 'div#' + ahref.replaceAll(' ', '') + ' a.howToChangeLink';
    if (isWixUserOrWixLinksUser()) {
        $(ahref).attr("href", wixUrl);
    } else if (isShopifyUser()) {
        $(ahref).attr("href", shopifyUrl);
    } else if (appDomainName === 'Weebly') {
        $(ahref).attr("href", weeblyUrl);
    } else {
        $(ahref).hide();
    }
    $(ahref).html('How to Change')
}

function initLandingPages() {
    // $('#pageUrl').attr('placeholder', mainUserDetails['wixUrl'])
    // $('#pageUrl').attr('placeholder', 'Page URL e.g. ' + mainUserDetails['wixUrl'])
    if (landingPageTable) {
        landingPageTable.destroy();
        landingPageTable = null;
        $('#pagesGrid tbody').html('<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>');
    }
    console.log('start ready');
    // var tooltipsToIntro = [].slice.call(document.querySelectorAll('#tabData > div:not(.rabbitTable) [data-bs-toggle="popover"]'));
    // if (tooltipsToIntro.length > 0) {
    //     [].forEach.call(tooltipsToIntro, function (item) {
    //         if (item.tagName && item.tagName == 'TH') {
    //             let element = $(item);
    //             console.log('item.tagName ' + item.tagName + ': ' + element.attr("data-bs-content"));
    //             element.attr("data-intro", element.attr("data-bs-content"));
    //         }
    //     });
    // }
    currTr = -1;
    loadLandingPages();
    $('span#landingPageHint').text($('#inputSearchWebsite').val());
    // $('#pagesGrid').on('click', 'tbody td .delete', function (e) {
    //     var tr = $(this).closest('tr');
    //     deletePage(tr);
    // });

    $('#pagesGrid').on('click', 'tbody button.tableOpenRow', function () {
        const tr = $(event.target).closest('tr')[0];
        showLandingPageOverview(tr);
    });

    $('#pagesGrid').on('change', 'tbody td .keywordsSelectForLandingPages', function (e) {
        // $('#pagesGrid').on('change', 'tbody td select.form-select', function (e) {
        var tr = $(this).closest('tr');
        var row = landingPageTable.row(tr);
        // console.log('change hide')
        row.child.hide();
        openOverview = false;
        showLandingPageOverview(tr);
        openOverview = true;
        // refreshPage($(tr).attr('id'));
    })
    // $('#pagesGrid').on('click', 'tbody tr', function () {
    //     var tr = $(this).closest('tr');
    //     showLandingPageOverview(tr);
    // });
    $(".landingForm").click(function (e) {
        e.stopPropagation();
    });
}

function landingPagesTableClick() {
    const td = $(event.target).closest('td')[0];
    const tdHtml = td.innerHTML;
    console.log('landingPagesTableClick tdHtml ' + tdHtml)

    if (!tdHtml || !tdHtml.includes('ignoreme')) {
        var tr = $(td).closest('tr');
        // console.log('landingPagesTableClick trHtml ' + tr.text())
        var row = landingPageTable.row(tr);
        // console.log('row id ' + JSON.stringify(row.data()))
        if (row.child.isShown()) {
            row.child.hide();
        } else {
            if (tdHtml.includes('expand-button')) {
                showInModal = true;
            } else {
                showInModal = false;
            }
            showLandingPageOverview(tr);
        }
    }
}
