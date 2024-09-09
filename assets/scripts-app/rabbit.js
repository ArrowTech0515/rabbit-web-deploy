$(document.head).append('<link rel="icon" type="image/x-icon" href="/assets/images/rabbitFavicon.ico">');
const bizDescContent = '<h5>How to Write your Business Description:</h5>' +
    'Writing a compelling business description is crucial for conveying your brand identity and attracting potential customers.' +
    '<br /><br /><strong>Start with a Compelling Introduction</strong>' +
    '<br />Begin with a strong opening that captures the reader\'s attention. Consider using a compelling anecdote, a surprising fact, or a statement that conveys your company\'s passion or mission.' +
    '<br /><br /><strong>Provide Basic Information</strong>' +
    '<br />Include essential details such as your company name, location, and the industry you operate in. Clearly state what your company does.' +
    '<br /><br /><strong>Tell Your Story</strong>' +
    '<br />Share the story of how your company was founded. Highlight key milestones, challenges overcome, and any unique aspects of your journey.' +
    '<br /><br /><strong>Highlight Achievements and Milestones</strong>' +
    '<br />Showcase significant achievements, awards, or milestones. This helps build credibility and instill confidence in your company.' +
    '<br /><br /><strong>Describe Your Products or Services</strong>' +
    '<br />Provide a brief overview of your main products or services. Focus on the value they bring to customers and how they address specific needs.' +
    '<br /><br /><strong>Emphasize Customer Benefits</strong>' +
    '<br />Clearly communicate how your products or services benefit customers. Use real examples or testimonials if available.' +
    '<br /><br /><strong>Introduce Your Team</strong>' +
    '<br />If applicable, introduce key members of your team. Share their expertise and emphasize how their skills contribute to the success of your company.';
const bizDescContentShort = 'Add basic information such as your company name, location, and the industry you operate in. State what your company does, and add a brief overview of your main products or services.';
const onPageOverviewTooltip = 'Landing Pages Overview Research will show you the top landing pages of your competitor, with their Titles, H1 tags, Meta Description etc. It\'s a great way to spy on your competitors and get ideas of new pages, and attractive titles, then adjust your landing pages accordingly. ' +
    '<br />Having said that, you need to make sure to have different titles and tags from your competitors, so do not copy paste them as they are, make some changes to the text.';
const onPageCompareTooltip = 'Landing Pages Compare Research will show you a comparison of your landing page and your competitor landing page. <br />You can easily compare the titles, meta descriptions, keywords density, content and more. You can get important insights on the competitors landing page and adjust your landing pages accordingly. ' +
    '<br />Having said that, you need to make sure to have different titles and tags from your competitors, so do not copy paste them as they are, make some changes to the text.';
const ranksExplorerTooltip = 'Keywords Research will show you the keywords that your competitor is ranked for including information on the given keywords, you can find very useful information and new keywords that you can also easily promote here';
const backlinksExplorerTooltip = 'Backlinks Research will show you the backlinks that are leading to your competitor website';
const searchEngineKeywords = 'Search engine keywords are the specific words or phrases that users enter into a search engine\'s query box when looking for information, products, or services. <br /><br />These keywords are crucial for search engine optimization (SEO) because they help search engines understand the content of web pages and match them with relevant user queries. <br /><br />When creating content or optimizing a website, identifying and incorporating relevant keywords is a fundamental aspect of SEO.';
const searchEngineKeywordsShort = 'Keywords are the words or phrases people type into search engines when looking for something online, like your products or services. <br />Using the right keywords helps your business show up at the top of search results, making it easier for customers to find you.';
// const searchEngineKeywordsShort = 'Search engine keywords are the specific words or phrases that users enter into a search engine\'s query box when looking for information, products, or services.';
const internalLinkTooltip = 'An internal link is any link from one page on your website to another page on your website. Both your users and search engines use links to find content on your website. Your users use links to navigate through your site and to find the content they want to find.<br /><br />Why are internal links important? Internal links are important because they can help Google understand and rank your website better. By giving Google links to follow along with descriptive anchor text, you can indicate to Google which pages of your site are important, as well as what they are about. Internal links are also good for user experience and may improve engagement. <br /><br />How many internal links are too many? While there is no definite answer as to how many internal links on a page are too many, Google has indicated they can crawl 100s of links per page. Practically speaking, lots of links isn\'t always good for user experience, and limiting the number of links per page to a reasonable number (typically around 100 or less) can provide additional SEO benefits. One of the best ways to find internal linking opportunities is to find pages on your site that rank for related topics and make sure they link with descriptive anchor text.';
const externalLinkTooltip = 'External Links are backlinks that point at (target) any domain other than the domain the link exists on (source). Basically, if another website links to you, this is considered an external link to your site. Similarly, if you link out to another website, this is also considered an external link.<br /> <br />What is internal linking vs external linking? Very simply, internal linking occurs when a site links to other URLs on the same site, whereas external linking occurs when a site links to URLs on a different site. Put another way, internal links are when you link to your own pages, while external links point to pages on other domains.<br /> <br />Generally speaking, you don\'t need permission to link to another website. While there are some legal edge-cases and special requirements in some parts of the world, most webmasters are free to link to whatever they please.';

$(document).ready(function () {
    isRabbitUI = true;
    let orgBase = $('base').attr('href');
    // $('#ranks-tab').click();
    $("ul#myTab > li > a").click(function () {
        activeTab = $(this).attr("id").replace('-tab', '');
        let currBase = $('base').attr('href');
        console.log('curr base ' + currBase);
        console.log('org base ' + orgBase);
        console.log('activeTab ' + activeTab);

        if (activeTab === 'reports-tab') {
        } else if (orgBase !== currBase) {
            console.log('change base from ' + currBase + ' to ' + orgBase)
            $('base').attr('href', orgBase);
        }
        historyPushState(activeTab, $(this).text());
        // $('#' + activeTab + ' h4').html(loadingDivHtml);
        // $('#' + activeTab + ' tbody').html(loadingDivHtml);
        hideTabData();
        $('.upgradeBlock').hide();
    });
    $('#onpage-tab').click(function () {
        // if (!loadedLandingPages) {
        initLandingPages();
        loadCompsToSelect('#onPageCompOverviewUrl');
        $('#landingForm').keypress(function (e) {
            if (e.which == 13) {
                savePage()
                return false;
            }
        });
        // loadedLandingPages = true;
        // }
    });
    $('#links-tab').click(function () {
        $('#links tbody').html(loadingDivHtml);
        initLinksBuilding();
        initBlogDomains();
        initHelpSection();
        initPostWordsCount();
        initLinksDropdownsHandlers();
        loadLanguages();
        modifyArticleTable();
        initBizSignaturePreview();
        // $('#language').change(function () {
        //     initBlogPostTitles();
        // });
    });
    $('#articles-tab').click(function () {
        $('#articles tbody').html(loadingDivHtml);
        initArticlesBuilding();
    });
    $('#ranks-tab').click(function () {
        if (isLocalhost() || true) {
            if (true || !siteTable || daysCount < 10) {
                $('.keywordsTableDiv').html('<table class="table notranslate hover" id="keywordsTable" style="width: 100%;">\n' +
                    '<thead id="keywordsTableHeader" class="text-primary thead-dark" data-intro="You can choose which columns to show, for example you can choose to see if landing page of the given keyword contains the keyword etc."></thead>\n' +
                    '<tbody data-intro="Click on the keyword to see more details, you can see the top 100 results, and also you can track your progress and see the previous ranks you had. You can also find Related Keywords and add them to your list"><tr><td><div class="spinner-border ms-auto" role="status" aria-hidden="true"></div></td></tr></tbody>\n' +
                    '</table>')
                initKeywords();
            }
        } else {
            ajaxLoadToDivIfEmpty('/assets/htmls/keywords.html', 'tabData')
        }
    });
    $('#comps-tab').click(function () {
        initCompsTab();
    });
    $('#linksSummary-tab').click(function () {
        ajaxLoadToDivIfEmpty('/assets/htmls/linksSummary.html', 'tabData')
    });
    $('#linksExplorer-tab').click(function () {
        console.log('#linksExplorer-tab click')
        ajaxLoadToDivIfEmpty('/assets/htmls/linksExplorer.html', 'tabData')
    });
    $('#linksBroken-tab').click(function () {
        // if (payingUser) {
        console.log('brokenLinks ' + brokenLinks);
        // if (brokenLinks && brokenLinks > 0) {
        // if (brokenLinks > 0 || isDev()) {
        ajaxLoadToDivIfEmpty('/assets/htmls/linksBroken.html', 'tabData')
        // } else {
        //     showModalFadeOut('Hooray', 'Great job, no broken links were found for your website! Use the Backlinks Building to get more links.');
        // }
        // } else {
        //     callUpgradePage();
        //     showUpgradeModal('Upgrade your account to find your broken links, would you like to upgrade now?');
        // }
    });
    $('#linksHistory-tab').click(function () {
        ajaxLoadToDivIfEmpty('/assets/htmls/linksHistory.html', 'tabData')
    });
    // $('#analytics-tab').click(function () {
    //     ajaxLoadToDivIfEmpty('/assets/htmls/analytics.html', 'tabData')
    // });
    $('#reports-tab').click(function () {
        console.log('assetsUrl ' + assetsUrl);
        // assetsUrl = $('base').attr('href');
        $('base').attr('href', '/');
        $('#rabbitOnboarding').html('');
        ajaxLoadToDivIfEmpty('/assets/htmls/reports.html', 'tabData')
        // ajaxLoadToDivIfEmpty('http://localhost:8080/assets/htmls/reports.html', 'tabData')
    });
    $('#settings-tab').click(function () {
        ajaxLoadToDivIfEmpty('/assets/htmls/myAccount.html', 'tabData')
    });
    $("ul#dropdownMenuList a").click(function () {
        $(this).closest(".dropdown-menu").prev().dropdown("toggle");
    });
});
reveresedLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        labels: {
            usePointStyle: true
        }
    },
    scales: {
        y: {
            reverse: true,
            ticks: {
                beginAtZero: true,
                precision: 0,
            },
            grid: {
                display: true,
                stepSize: 1,
                // color: "#D7DBDE"
            }
        },
        x: {
            // reverse: true,
            ticks: {
                // reverse: true,
                beginAtZero: true
            },
            grid: {
                display: true,
            }
        },
    }
}

function createAvgPositionChart(canvasId, labels, data) {
    return new Chart(document.getElementById(canvasId), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Website Average Position',
                data: data,
                borderColor: '#336CFB',
                backgroundColor: '#336CFB',
                // lineTension: 0.4,
                // pointRadius: 0
            }]
        },
        options: reveresedLineOptions,
    });
}

function addCompTooltips() {
    addTooltipWithSubjectToSelector('.onPageOverviewTooltip', 'Competitor Landing Pages Overview', onPageOverviewTooltip, true);
    addTooltipWithSubjectToSelector('.onPageCompareTooltip', 'Landing Pages Comparison', onPageCompareTooltip, true);
    addTooltipWithSubjectToSelector('.ranksExplorerTooltip', 'Competitor Keywords', ranksExplorerTooltip, true);
    addTooltipWithSubjectToSelector('.linksExplorerTooltip', 'Competitor Backlinks Explorer', backlinksExplorerTooltip, true);
    showHideTestingMode();
}

function addCompetitorsDetails(comps) {
    if (comps && comps.length > 0) {
        $('#competitorsDashboard').show();
        let compsHtml = '';
        let compsLabels = [];
        let compsVisibility = [];
        for (let i = 0; i < comps.length && i < 5; i++) {
            let currComp = comps[i][0];
            compsLabels.push(currComp);
            compsVisibility.push(comps[i][3]);
            // compsVisibility.push(20 - comps[i][6]);
            let compActions =   '<a href="javascript:showOnPageOverviewModal(\'' + currComp + '\', \'\')" class="onPageOverviewTooltip btn btn-outline-primary pageBtn-competitor iconPageReviewLarge" > <img src="/assets/images/newicon/iconPageReviewLarge.png"/>   </a> ' +
            // '<a href="javascript:showOnPageCompareModal(\'' + currComp + '\', \'\')" class="onPageCompareTooltip btn btn-outline-primary pageBtn-competitor testing-mode iconOnpageLarge" > <img  src="/assets/images/newicon/iconOnpageLarge.png"/> </a> ' +
        ' <a href="javascript:showCompResearch(\'ranksExplorer\', \'' + currComp + '\', \' Keyword Research\')" class="ranksExplorerTooltip btn btn-outline-primary pageBtn-competitor excludeIntroJs iconKeyworkLarge"><img src="/assets/images/newicon/iconKeyworkLarge.png" ></a> ' +
        ' <a href="javascript:showCompResearch(\'linksAll\', \'' + currComp + '\', \' Backlinks Explorer\'); scrollToDiv(\'compResearch\')" class="linksExplorerTooltip btn btn-outline-primary pageBtn-competitor excludeIntroJs iconBlockLinkLarge"><img src="/assets/images/newicon/iconBlockLinkLarge.png" ></a> ';

            let compHtml = '<li>\n' +
                '                            <div class="d-flex justify-content-between">\n' +
                '                                <div class="d-flex align-items-center">\n' +
                // '                                    <span class="myRound blue-bg"></span>\n' +
                '                                    <p class="mb-0">' + currComp + '</p>\n' +
                '                                </div>\n' +
                '                                <div class="myCount">' + compActions + '</div>\n' +
                '                            </div>\n' +
                '                        </li>'
            compsHtml += compHtml;
        }
        $('#shortCompsList').html(compsHtml);
        addCompTooltips();

        if (false) { // console.log(JSON.stringify(compsVisibility));
            var data11 = {
                labels: [compsLabels[1], compsLabels[2], compsLabels[0], compsLabels[4], compsLabels[3]],
                datasets: [{
                    label: "Competitors",
                    backgroundColor: ["#16D090", "#336CFB", "#FAC032", "rgba(255, 99, 132, 0.2)"],
                    data: [compsVisibility[1], compsVisibility[2], compsVisibility[0], compsVisibility[4], compsVisibility[3]],
                    borderRadius: 4,
                }]
            };
            var options11 = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        display: false,
                        grid: {
                            display: false,
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            };
            if (competitorsChart) {
                competitorsChart.destroy();
            }

            competitorsChart = new Chart('compsChart', {
                type: 'bar',
                options: options11,
                data: data11
            });
        }
    } else {
        $('#competitorsDashboard').hide();
    }
}

function createChartsFromJson(json) {
    console.log('getMyJsonAvgRanksReportWebsite ' + JSON.stringify(json));
    if (!hasAlertToShow(json) && json.map) {
        if (json.map.days) {
            let daysLabels = Object.keys(json.map.days);
            let daysValues = Object.values(json.map.days);
            if (avgPositionWeek) {
                avgPositionWeek.destroy();
            }

            avgPositionWeek = createAvgPositionChart("averagePositionWeek", daysLabels, daysValues);
        }
        if (json.map.months) {
            let monthsLabels = Object.keys(json.map.months);
            let monthsValues = Object.values(json.map.months);
            if (avgPositionMonths) {
                avgPositionMonths.destroy();
            }

            avgPositionMonths = createAvgPositionChart("averagePositionMonth", monthsLabels, monthsValues);
        }
    }
}

function addMonitoringDetails() {
    $.getJSON(getApiUrl('getMyJsonAvgRanksReportWebsite?url=' + $('#inputSearchWebsite').val()), function (json) {
        createChartsFromJson(json);
    });
}

function initDashboard() {
    // console.log('Request email ' + mainUserDetails["askEmail"]);
    if (mainUserDetails['askEmail']) {
        $('#requestEmailModal').modal('show');
        // } else if (mainUserDetails['askLinksExchange'] || true) {
    } else if (mainUserDetails['askLinksExchange']) {
        $('#askLinksModal').modal('show');
    } else if (mainUserDetails['askReview']) {
        // } else if (mainUserDetails['askReview'] || true) {
        let reviewLink;
        if (reviewLink) {
            $('a.reviewLink').attr('href', reviewLink);
            $('a.reviewLink').html(reviewLink);
        } else {
            $('a.reviewLink').show();
        }
        $('#askReviewModal').modal('show');
    } else if (mainUserDetails['showUserMsg']) {
        if (mainUserDetails['showUserTitle'].indexOf('gift') !== -1) {
            mainUserDetails['showUserTitle'] += "&nbsp;&nbsp; <img src='/assets/images/icon/giftbox.png' class='smallIcon' />"
        }
        showModal(mainUserDetails['showUserTitle'], mainUserDetails['showUserMsg'], '', '');
    }

    loadDashboard();
    enableTooltips();
    enableIntroJs();
    createArticleTagsSelect();
    
    if (inOnboardingNow) {
        inOnboardingNow = false;
        firstLogin = true;

        // todo currently hiding it
        // showModal('Welcome!', 'Would you be interested in a quick one-minute guide?', 'No', 'Yes');
        // $('div#modalMessage button#modalSecondButton').click(function () { closeModalMessage(); runIntro(); });
    }

    // $('#monitoringDashboard').hide();
    // $('#analyticsDashboard').hide();
    // $('#competitorsDashboard').hide();
}


// function addAnalyticsDetails() {
//     $('#avgVisitsPerDay').html(websiteData.analyticsSection.avgVisitsPerDay);
//     $('#visitLastMonth').html(nFormatter(websiteData.analyticsSection.visitLastMonth, 2));
//     $('#avgTimeOnSite').html(nFormatter(websiteData.analyticsSection.avgTimeOnSite, 2));
//     $('#avgBounceRate').html(websiteData.analyticsSection.avgBounceRate);
//     $('#avgPageViews').html(websiteData.analyticsSection.avgPageViews);
//
//     $('#analyticsDashboardLoading').show();
//     $.getJSON(apiUrl + analyticsVisits_url, function (json) {
//         // if (!checkStatus(json)) {
//         if (json["map2"]) {
//             json = json["map2"];
//             var xValues = [];
//             var yValues = [];
//             for (const key in json) {
//                 if (Object.hasOwnProperty.call(json, key)) {
//                     xValues.push(getFormattedDate(Number(key)));
//                     yValues.push(json[key]);
//                 }
//             }
//
//             $('#analyticsDashboardLoading').hide();
//             $('#analyticsDashboard').show();
//             if (xValues.length > 0 && yValues.length > 0) {
//                 $('#websiteVisitsTitle').html(getTranslationWord('Website Visits Last Month'));
//                 if (websiteVisits) {
//                     websiteVisits.destroy();
//                 }
//
//                 websiteVisits = new Chart(document.getElementById("websiteVisit"), {
//                     type: 'line',
//                     data: {
//                         labels: xValues,
//                         datasets: [{
//                             label: '',
//                             data: yValues,
//                             borderColor: '#336CFB',
//                             backgroundColor: '#336CFB',
//                             lineTension: 0.4,
//                             pointRadius: 0
//                         }]
//                     },
//                     options: {
//                         legend: {
//                             display: false
//                         },
//                         responsive: true,
//                         maintainAspectRatio: false,
//
//                     },
//                     scales: {
//                         yAxes: [{
//                             display: true,
//                             ticks: {
//                                 min: 0,
//                                 max: 600,
//
//                                 stepSize: 100
//                             }
//                         }]
//                     }
//                 });
//             }
//         } else {
//             $('#analyticsDashboardLoading').hide();
//         }
//     });
// }

function setMainWebsiteDataDetails(json) {
    websiteData = JSON.parse(json["data"]);
    console.log('websiteData: ' + JSON.stringify(websiteData));
    isAddedToMyWebsites = websiteData.isAddedToMyWebsites;
    $('#dashboardTitle').html(websiteData.websiteName + ' <span>Overview</span>');
    if (mainUserDetails['websitesUsed'] > 1) {
        $('.myKeywords').html(nFormatter(websiteData.generalDetails.keywordsInTrack, 2));
        $('.myBacklinks').html(nFormatter(websiteData.generalDetails.linksInTrack, 2));
    } else {
        $('.myKeywords').html(mainUserDetails['keywordsUsed']);
        $('.myBacklinks').html(mainUserDetails['linksUsed']);
    }
    return websiteData;
}

function loadKeywordsIdeas(rankedKeywords) {
    $('.spinner-border').show();
    setTimeout(function () {
        $('p.load-keywords-ideas').hide();
        $('.keywordsIdeasTab').show();
        $('.spinner-border').hide();
    }, 2000);


    loadAjaxTabs();
    if (rankedKeywords > 0) { // load first tab content
        $('#ranked-keywords-view').load($('#ranked-keywords').attr("href"), function (result) {
            $('#ranked-keywords').tab('show');
        });
    } else {
        $('#ranked-keywords').hide();
        $('#keywords-ideas-view').load($('#keywords-ideas').attr("href"), function (result) {
            $('#keywords-ideas').tab('show');
        });
    }
}

function initDashboardFromJson(json) {
    $('.loadingProgressBar').hide();
    hasAlertToShow(json);
    // $('#menuBar').show();
    // console.log('getMyJsonDataWebsite ' + JSON.stringify(json));
    const websiteData = setMainWebsiteDataDetails(json);
    if (websiteData['generalDetails']['optScore'] && websiteData['generalDetails']['optScore'] > 0) {
        $('.myLandingPages').html(websiteData['generalDetails']['landingPagesInTrack']);
        $('.myFailedTests').html(websiteData['generalDetails']['failedTest']);
        $('.myScore').html(websiteData['generalDetails']['optScore'] + '%');
        loadedLandingPages = false;
    } else {
        initLandingPages();
        loadedLandingPages = true;
    }

    const rankedKeywords = websiteData.rankedKeywords;
    const linksCount = websiteData.linksCount;
    if (rankedKeywords > 0 && linksCount > 0) {
        $('#dashboardFirstRow').show();
    }
    $('#rankedKeyword').html(nFormatter(rankedKeywords, 2));
    $('#totalBacklinks').html(nFormatter(linksCount, 2));
    brokenLinks = websiteData.brokenLinks;
    $('#brokenLinks').html(nFormatter(brokenLinks, 2));
    // let pinterest = websiteData.pinterestCount;
    // if (pinterest > 0) {
    //     $('#pinterestPins').html(nFormatter(pinterest, 2));
    // } else {
    //     $('#pinterestDiv').hide();
    // }
    // $('#facebookLikes').html(nFormatter(websiteData.facebookCount, 2));
    $('#websiteRank').html(nFormatter(websiteData.websiteRank, 2));
    $('#refDomains').html(nFormatter(websiteData.referringDomains, 2));

    if (!isAddedToMyWebsites) {
        // if (websitesMax > 1) {
        // $('#quickAdd').show();
        // }
        $('#landingTab').hide();
        $('#keywordsTab').hide();
        $('#competitorsTab').hide();
        $('#linksMonitoringTab').hide();
        // $('#googleAnalyticsTab').hide();
    } else {
        console.log('websiteData.generalDetails.avgPos7 ' + websiteData.generalDetails.avgPos7);
        console.log('websiteData.generalDetails.avgPosCurr ' + websiteData.generalDetails.avgPosCurr);
        console.log('websiteData.generalDetails.ranksUp ' + websiteData.generalDetails.ranksUp);
        console.log('websiteData.generalDetails.ranksDown ' + websiteData.generalDetails.ranksDown);
        // if ((!isExternalUser() && daysCount > 0) ||
        if (
            (daysCount > 120
            && websiteData.generalDetails.avgPosCurr < 100
                && (daysCount > 70 || (websiteData.generalDetails.avgPos7 && websiteData.generalDetails.avgPosCurr && websiteData.generalDetails.avgPos7 > websiteData.generalDetails.avgPosCurr))
            //     && websiteData.generalDetails.ranksUp && websiteData.generalDetails.ranksDown && websiteData.generalDetails.ranksUp >= websiteData.generalDetails.ranksDown
        )
        ) {
            console.log('passed addMonitoringDetails condition')
            addMonitoringDetails();
            $('#monitoringDashboard').show();
        }
        addCompetitorsDetails(websiteData.comps);
        addLinksDetails();
        $('#quickAdd').hide();
        $('#landingTab').show();
        $('#keywordsTab').show();
        $('#competitorsTab').show();
        $('#linksMonitoringTab').show();
        $('#keywordsInTrack').html(nFormatter(websiteData.generalDetails.keywordsInTrack, 2));
        $('#landingPagesInTrack').html(nFormatter(websiteData.generalDetails.landingPagesInTrack, 2));
        $('#ranksUp').html(nFormatter(websiteData.generalDetails.ranksUp, 2));
        $('#ranksDown').html(nFormatter(websiteData.generalDetails.ranksDown, 2));
        $('#ranksInTop').html(nFormatter(websiteData.generalDetails.ranksInTop, 2));
        $('#keywordsInTop10').html(nFormatter(websiteData.generalDetails.keywordsInTop10, 2));
        $('#keywordsInTop20').html(nFormatter(websiteData.generalDetails.keywordsInTop20, 2));
        $('#avgPosCurr').html(nFormatter(websiteData.generalDetails.avgPosCurr, 2));
        $('#avgPosYesterday').html(nFormatter(websiteData.generalDetails.avgPosYesterday, 2));
        $('#avgPos7').html(nFormatter(websiteData.generalDetails.avgPos7, 2));
        $('#avgPos30').html(nFormatter(websiteData.generalDetails.avgPos30, 2));
        $('#changePercent').html(formatNumber(websiteData.generalDetails.changePercent));
        // $('#avgScore').append(nFormatter(websiteData.generalDetails.avgScore, 2));
        // $('#failedTests').append(websiteData.generalDetails.failedTests);

        // if (websiteData.analyticsSection) {
        //     addAnalyticsDetails();
        // } else {
        //     $('#analyticsDashboard').hide();
        // }
    }

    if (daysCount < 10) {
        loadKeywordsIdeas(rankedKeywords);
    }

    return websiteData;
}

function loadWebsiteData() {
    if (isDev()) {
        initDashboardFromJson(JSON.parse(websiteJsonData));
    } else {
        var p = $.getJSON(getApiUrl('getMyJsonDataWebsite?url=' + $('#inputSearchWebsite').val()), function (json) {
            initDashboardFromJson(json);
        });
    }
}

function refreshWebsiteData() {
    if (isDev()) {
        initDashboardFromJson(JSON.parse(websiteJsonData));
    } else {
        $.ajaxSetup({async: false});
        var p = $.getJSON(getApiUrl('getMyJsonDataWebsite?url=' + $('#inputSearchWebsite').val()), function (json) {
            setMainWebsiteDataDetails(json);
        });
        $.ajaxSetup({async: true});
    }
}

function loadDashboard() {
    $('.loadingProgressBar').show();
    makeProgress();
    // console.log(apiUrl + 'getMyJsonDataWebsite?url=' + $('#inputSearchWebsite').val());
    loadWebsiteData();
}

function addLinksDetails() {
    $.getJSON(getApiUrl('jsonByOnlyBlogsLink?page=1&rows=5'), function (json) {
        if (json && json['list'] && json['list'].length > 0) {
            let linksHtml = '';
            for (let i = 0; i < json['list'].length && i < 5; i++) {
                let currHtml = '<li>\n' +
                    '                            <div class="">\n' +
                    '                                <div class="row">\n' +
                    // '                            <div class="d-flex justify-content-between">\n' +
                    // '                                <div class="d-flex align-items-center row">\n' +
                    // '                                    <span class="myRound blue-bg"></span>\n' +
                    '                                    <div class="mb-0 col-5 text-truncate">' + getFormattedUrl(json['list'][i]['pageUrl']) + '</div>\n' +
                    '                                    <div class="mb-0 col-2 text-truncate">' + (json['list'][i]['keywordName']) + '</div>\n' +
                    '                                    <div class="mb-0 col-4 text-truncate">' + (json['list'][i]['pageTitle']) + '</div>\n' +
                    '                                <div class="myCount mb-0 col-1 text-truncate text-end">' + getFormattedDate(json['list'][i]['dateCreated']) + '</div>\n' +
                    '                                </div>\n' +

                    '                            </div>\n' +
                    '                        </li>'
                linksHtml += currHtml;
            }
            $('#blogsPreviewList').html(linksHtml);
            if (json['list'].length < 5) {
                $('#orderExclusiveBlogPostSection').html(
                    '\n' +
                    '    <div class="text-center" style="margin-top: 50px;">\n' +
                    '        <button type="button" onclick="showOrderBlogForm()" class="btn btn-primary pageBtn addnewkeyBtn"><span>Publish Exclusive Guest Blog</span></button>\n' +
                    '    </div>\n' +
                    '\n');
            }
        } else {
            $('#orderExclusiveBlogPostSection').html('' +
                '\n' +
                '    <div class="text-center" style="margin-top: 50px;">\n' +
                '        <button type="button" onclick="showOrderBlogForm()" class="btn btn-primary pageBtn addnewkeyBtn"><span>Publish Exclusive Guest Blog</span></button>\n' +
                // '        <button type="button" onclick="$(\'#links-tab\').click(); if (isWebsiteOwner) {openModal(\'publishLink.html\', \'My Website Details\');}" class="btn btn-primary pageBtn addnewkeyBtn">Create New Backlinks</button>\n' +
                '    </div>\n' +
                '\n');
            // $('#recentBacklinksSection').hide();
        }
    });
    $.getJSON(getApiUrl('jsonExcludeBlogsLink?page=1&rows=5'), function (json) {
        // console.log('jsonByLiveLink is ' + JSON.stringify(json));
        if (json && json['list'] && json['list'].length > 0) {
            let linksHtml = '';
            for (let i = 0; i < json['list'].length && i < 5; i++) {
                let currHtml = '<li>\n' +
                    '                            <div class="">\n' +
                    '                                <div class="row">\n' +
                    // '                            <div class="d-flex justify-content-between">\n' +
                    // '                                <div class="d-flex align-items-center row">\n' +
                    // '                                    <span class="myRound blue-bg"></span>\n' +
                    '                                   <div class="mb-0 col-9 text-truncate">' + getFormattedUrl(json['list'][i]['pageUrl']) + '</div>\n' +
                    '                                   <div class="myCount mb-0 col-2 text-truncate">' + getFormattedDate(json['list'][i]['dateCreated']) + '</div>\n' +
                    '                                   <div class="mb-0 col-1 text-truncate"><a href="javascript: openUpdateListingDetailsModal(\'' + json['list'][i]['pageUrl'] + '\')" class="text-muted"><img src="/assets/images/icon/update.png" style="height: 24px; cursor: pointer" class="update-listings" alt="Edit"></a></div>\n' +
                    '                                </div>\n' +

                    '                            </div>\n' +
                    '                        </li>'
                linksHtml += currHtml;
            }
            $('#linksPreviewList').html(linksHtml);
            if (json['list'].length < 5) {
                $('#orderPremiumLinkSection').html(
                    '\n' +
                    '    <div class="text-center" style="margin-top: 50px;">\n' +
                    '        <button type="button" onclick="showOrderLinksForm()" class="btn btn-primary pageBtn addnewkeyBtn"><span>Publish Premium Business Listings</span></button>\n' +
                    '    </div>\n' +
                    '\n');
            }
            addTooltipToSelector('.update-listings', 'Modify Your Listing - Add Keywords, Contact Info, You Tube Video, Images, Social Pages and more.');
            console.log('showListingsSuccess ' + showListingsSuccess)
            openListingsSuccessModal(json['list'][0]['pageUrl']);
        } else {
            $('#orderPremiumLinkSection').html('' +
                '\n' +
                '    <div class="text-center" style="margin-top: 50px;">\n' +
                '        <button type="button" onclick="showOrderLinksForm()" class="btn btn-primary pageBtn addnewkeyBtn">Publish Premium Business Listings</button>\n' +
                '    </div>\n' +
                '\n');
            // $('#recentBacklinksSection').hide();
        }
    });
}
function openListingsSuccessModal(href) {
    if (showListingsSuccess) {
        if (href) {
            console.log('openListingsSuccessModal href ' + href)
            $('#ourModal').html($('#listingPublishedModal').html());
            $('.lastListingLink').attr('href', href);
            $('#ourModal').modal('show');
        }
        showListingsSuccess = false; // once is enough
    } else {

    }
}
function showOrderBlogForm() {
    simpleShowTab('#links-tab');
    $('#blogItlemsDropdown').prev().dropdown('toggle');
}
function showOrderLinksForm() {
    simpleShowTab('#links-tab');
    $('#blogItlemsDropdown').prev().dropdown('toggle');
}

function fixOnboardingSelect2() {
    try {
        $('body form#savePublishDetailsUser.newSignupFormOnboarding .regis-Category-select #categorySelect').on('select2:opening', function (e) {
            // select2 is opened, handle event
            $('body form#savePublishDetailsUser.newSignupFormOnboarding .regis-Category-select').parent('.newInput').addClass('removeRadius');
        });
        $('body form#savePublishDetailsUser.newSignupFormOnboarding .regis-Category-select #categorySelect').on('select2:closing', function (e) {
            // select2 is opened, handle event
            $('body form#savePublishDetailsUser.newSignupFormOnboarding .regis-Category-select').parent('.newInput').removeClass('removeRadius');
        });

        $('body form#savePublishDetailsUser.newSignupFormOnboarding #keywordsToPromote').on('select2:opening', function (e) {
            // select2 is opened, handle event
            $('body form#savePublishDetailsUser.newSignupFormOnboarding .newInput.bizKeywordsSection').addClass('removeRadius');
            $('body form#savePublishDetailsUser.newSignupFormOnboarding .newInput.bizKeywordsSection .select2-search--inline').addClass('openSearchTrue');
        });
        $('body form#savePublishDetailsUser.newSignupFormOnboarding #keywordsToPromote').on('select2:closing', function (e) {
            // select2 is opened, handle event
            var selectedValue = $(this).val();
            $('body form#savePublishDetailsUser.newSignupFormOnboarding .newInput.bizKeywordsSection').removeClass('removeRadius');
            $('body form#savePublishDetailsUser.newSignupFormOnboarding .newInput.bizKeywordsSection .select2-search--inline').removeClass('openSearchTrue');
            if (selectedValue.length == 0) {
                $('body form#savePublishDetailsUser.newSignupFormOnboarding .newInput.bizKeywordsSection .select2-search--inline').addClass('openSearchTrue');
            }
        });
        $('body form#savePublishDetailsUser.newSignupFormOnboarding #articleTitleSignup').on('select2:opening', function (e) {
            // select2 is opened, handle event
            $('body form#savePublishDetailsUser.newSignupFormOnboarding .regis-Category-select.newInput').addClass('removeRadius');
        });
        $('body form#savePublishDetailsUser.newSignupFormOnboarding #articleTitleSignup').on('select2:closing', function (e) {
            // select2 is opened, handle event
            $('body form#savePublishDetailsUser.newSignupFormOnboarding .regis-Category-select.newInput').removeClass('removeRadius');

        });

        var selectedValuekeywordsToPromote = $('body form#savePublishDetailsUser.newSignupFormOnboarding #keywordsToPromote').val();
        if (selectedValuekeywordsToPromote !== null) {
            $('body form#savePublishDetailsUser.newSignupFormOnboarding .newInput.bizKeywordsSection .select2-search--inline').addClass('openSearchTrue');
        }
    } catch (e) {
        logError(e);
    }
}

function initOnbaordingSimple() {
    console.log('onboarding ranks ' + mainUserDetails["ranksCount"]);
    console.log('onboarding links ' + mainUserDetails["linksCount"]);
    // console.log('email is ' + mainUserDetails["email"]);
    inOnboardingNow = true;

    if (!mainUserDetails["email"]) {
        $('#emailSection').show();
    }
    $('#upgradeContainer').hide();
    $('#accountDiv').hide();
    fillPublishDetailsForm();
    if ($('#name').val() && $('#name').val() === 'editor.wix.com') {
        $('#name').val('');
    }
    const description = $('#description').val();
    console.log('publish form desc is ' + description);
    if (!description || description === '') {
        generateDesc();
    }

    // if (!isTestingMode()) {
        $('.bizDescSection').hide();
        $('.bizCategorySection').hide();

    if (mainUserDetails['isABTest']) {
        $('#whereToPublish').hide();
    } else {
        $('#whereToPublish').show();
    }

    fixOnboardingSelect2();

    if (mainUserDetails['hasLogo'] || mainUserDetails['isABTest'] || true) {
        $('.bizLogoSection').hide();
    } else {
        $('.bizLogoSection').show();
    }

    if ($('#domain').val() !== '') {
        $('.bizDomainSection').hide();
    }
    const random = 0;
    // const random = Math.floor(Math.random() * 3);
    console.log('whereToPublish random ' + random);

    if (random === 0) {
        whereToPublishClick('listings');
        showListingsSuccess = true;
    } else if (random === 1) {
        whereToPublishClick('blogPost');
    } else if (random === 2) {
        whereToPublishClick('both');
        showListingsSuccess = true;
    }

    $("#articleTitleSignup").select2({
        // data: titleIdeas,
        tags: true,
        dropdownParent:$('#blogItlemsDropdown'),
        placeholder: 'Choose a guest blog title from the list',
        searchInputPlaceholder: 'Choose a guest blog title from the list'
    });
}

function initAccountDetails() {
    $('.logoAnchur').click(function () {
        $('#logoInput').click();
    });
    console.log('mainUserDetails ' + JSON.stringify(mainUserDetails));
    // $('#name').val(mainUserDetails.name);
    // $('#firstName').val(mainUserDetails.firstName != mainUserDetails.name ? mainUserDetails.firstName : '');
    // $('#lastName').val(mainUserDetails.lastName != mainUserDetails.name ? mainUserDetails.lastName : '');
    // $('#phone').val(mainUserDetails.phone);
    // $('#email').val(mainUserDetails.email);
    fillForm('#updateAccountDetailsUser', mainUserDetails);
    if (isWebsiteOnboarding()) {
        $('#searchEngineDiv').hide();
    } else {
        var searchEngineSelect = $("#searchEngineSelect").select2({
            tokenSeparators: [',', ', ', '\n'],
            selectOnClose: true,
            data: availableSearchEngines,
            width: "100%",
        });
        searchEngineSelect.val(searchEngine).change();

        $(".select-tag").select2({
            tokenSeparators: [',', ', ', '\n'],
            selectOnClose: true,
            tags: true,
            width: '100%',
            tokenSeparators: [',', ' ']
        });
    }

    $(".account_dropdown").click(function (e) {
        e.stopPropagation();
    });

    const deleteMessage = 'We will be sad to see you leaving and but if you wish to cancel your account with us ';
    if (isExternalUser()) {
        $('#cancelAccountDiv').html(deleteMessage + 'you should do it via you ' + appDomainName + ' dashboard.');
    } else {
        $('#cancelAccountDivBrowser').show();
    }
}

function initDisplaySettings() {
    $('.logoAnchur').click(function () {
        $('#logoInput').click();
    });
    console.log('mainUserDetails ' + JSON.stringify(mainUserDetails));
    // $('#name').val(mainUserDetails.name);
    // $('#firstName').val(mainUserDetails.firstName != mainUserDetails.name ? mainUserDetails.firstName : '');
    // $('#lastName').val(mainUserDetails.lastName != mainUserDetails.name ? mainUserDetails.lastName : '');
    // $('#phone').val(mainUserDetails.phone);
    // $('#email').val(mainUserDetails.email);
    if (mainUserDetails.extraData && mainUserDetails.extraData.displaySettings) {
        fillForm('#addUserExtraDataGeneric', mainUserDetails.extraData.displaySettings);
    }
}

function saveDisplaySettings() {
    const json = getFormDValues(addUserExtraDataGeneric);
    console.log('saveDisplaySettings ' + JSON.stringify(json));
    $.ajax({
        type: 'POST',
        url: apiUrl + 'addUserExtraDataGeneric',
        data: 'key=displaySettings&val=' + JSON.stringify(json),
        success: function (result) {
            console.log('saveDisplaySettings ' + JSON.stringify(result));
            result = JSON.parse(result['data']);
            mainUserDetails = result;
            let responseDiv = '#addUserExtraDataGeneric div.alert-success';
            $(responseDiv).show();
            location.reload();
        }
    });
}

function showTabData() {
    $('#tabData').html('<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>');
    $('#tabData').show();
    $('#allTabsContent').hide();
}

function hideTabData() {
    // console.log('activeTab ' + activeTab);
    if (activeTab !== 'dropdownNavLink') {
        $('#tabData').hide();
        $('#allTabsContent').show();
    }
}

function showAllWebsitesDiv() {
    $('#menuBar').hide();
    showWebsiteChooser();
    showTabData();
    ajaxLoadToDiv('/assets/htmls/allWebsites.html', 'tabData');
}

function setViewText() {
    if (!isWebsiteOwner) {
        $('#myBacklinksText').text(getTranslationWord('Links Monitoring'));
        $('#createNewLinksButton').html('Add Link')
    } else {
        $('#myBacklinksText').text(getTranslationWord('Links Building'));
    }
    if (appDomainName === 'Rabbit SEO') {
        $('#reportTab').show();
    }
    if (isDev()) {
        // if (isDev() || location.toString().toLowerCase().includes("localhost") || mainUserDetails["isTryNewFeatures"]) {
        $('#articlesListItem').show();
    }
}

function createWebsiteSelect() {
    $.getJSON(getApiUrl('miniListJsonWebsite'), function (data) {
        if (websitesMax > 1) {
            if (websitesUsed > 1) {
                availableWebsites.push(getTranslationWord("All Websites"));
            }
            showWebsiteChooser();
        }
        for (let i = 0; i < data['list'].length; i++) {
            if (i == 0) {
                firstWebsite = data['list'][i]['name'];
            }
            availableWebsites.push(data['list'][i]['name']);
        }
        if (websitesMax > 1) {
            if (appDomainName === 'Rabbit SEO' && !demoAccount) {
                availableWebsites.push(getTranslationWord("Add New Website"));
            }
        }

        websiteSelect2 = $("#inputSearchWebsite").select2({
            tokenSeparators: [',', ', ', '\n'],
            selectOnClose: true,
            data: availableWebsites,
            tags: true,
            searchInputPlaceholder: 'Search new website...'
        });
        setApiAndWebsiteFromUrl();
    });
}

function setCommonTooltips() {
    addTooltipWithSubjectToSelector('.listingsTooltip', 'Why are Listing Backlinks valuable for my SEO?',
        'Listing links typically refer to web links that are associated with online business directories or listings. ' +
        '<br /><br />These directories are platforms where businesses can create profiles or listings to provide information about their products, ' +
        'services, and contact details. These listings are often used for local search engine optimization (Local SEO) ' +
        'and can help businesses improve their online visibility.')
    addTooltipWithSubjectToSelector('.managedServiceTooltip', 'You can publish your backlinks in 2 ways:',
        '<br /><strong>1. Manual Publish</strong> - Publish Business Listings & Guest Blogs using the forms below (Mostly recommended for Guest Blogs, as you can choose topics that match your business). ' +
        '<br /><br /><strong>2. Managed Service</strong>  - Rabbit SEO will publish the links for you based on the keywords you choose (Usually once we reach a fair amount of listings links we will publish guest blogs).' +
        '<br /><br /><strong>Please Note: </strong> Your monthly credits reset on the ' + mainUserDetails['resetCreditDay'] + 'th of every month.');
    addTooltipWithSubjectToSelector('.blogPostTooltip','Why are Guest Blogs Backlinks valuable for my SEO?',
        'Guest Blog links can be a valuable part of your digital marketing strategy, helping you' +
        ' increase traffic to your website, increases brand awareness, improve search engine rankings, build relationships.' +
        '<br /><br />Backlinks from guest blogs, are considered as signals of authority and trustworthiness by search engines.' +
        ' When reputable websites link to your guest blogs, it enhances your site\'s credibility.');
    addTooltipWithSubjectToSelector('.myTotalBacklinksTooltip', 'The Backlinks Rabbit SEO Created for You',
        'Link building is the process of acquiring backlinks from other websites to your own. A backlink ' +
        'is a way for users to navigate between pages on the Internet. Search engines use links to crawl ' +
        'the web.' +
        '<br /><br />They will crawl the links between the individual pages on your website, and they will crawl the links ' +
        'between entire websites.')
    // addTooltipWithSubjectToSelector('.searchEngineKeywords', 'What are Search Engine Keywords?', searchEngineKeywords);
    addTooltipToSelector('.searchEngineKeywords', searchEngineKeywordsShort);
    addTooltipWithSubjectToSelector('.topCompetitorsTooltip', 'How do we compose your competitors list?', 'Your Top Competitors are calculated based on the Keywords you choose in \'My Keywords\' tab.<br />We are fetching the tops results in Google and calculating the competitors according to their rankings. <br />If you change the keywords - your competitors should also change.');
    addTooltipToSelector('.go-to-comps', 'See All Competitors');
    addTooltipToSelector('.go-to-listings', 'See All Listings');
    addTooltipToSelector('.go-to-blogs', 'See All Guest Blogs');
    enableTooltips();
    addTooltipToSelector('.bisDescTooltip', bizDescContentShort);
    // addPopoverToSelector('.bisDescTooltip', bizDescContent);
}

function initScreenView() {
    console.log('start initScreenView isWebsiteOnboarding() ' + isWebsiteOnboarding());
    console.log('start initScreenView websitesUsed ' + websitesUsed);
    console.log('start initScreenView mainUserDetails[\'keywordsUsed\'] ' + mainUserDetails['keywordsUsed']);
    console.log('start initScreenView mainUserDetails[\'linksUsed\'] ' + mainUserDetails['linksUsed']);
    websiteUrl = mainUserDetails['wixUrl'];
    setCommonTooltips();

    if (
        (devShowSignup && isTestingMode()) ||
        isWebsiteOnboarding() || websitesUsed === 0 ||
        (
            // (!mainUserDetails['keywordsUsed'] || mainUserDetails['keywordsUsed'] === 0) &&
            ((!mainUserDetails['linksUsed'] === 0 || mainUserDetails['linksUsed'] === 0) &&
                (!mainUserDetails['pricePerMonth'] || mainUserDetails['pricePerMonth'] === 0))
        // || (isExternalUser() && (!mainUserDetails['linksUsed'] || mainUserDetails['linksUsed'] === 0)
        )
    ) {
        // if (isWebsiteOnboarding() || websitesUsed === 0
        //     || (isExternalUser() && (!mainUserDetails['linksUsed'] || mainUserDetails['linksUsed'] === 0))) {
        if (isWebsiteOwner) {
            console.log('load onboarding tab');
            $('#rabbitOnboarding').show();
            initOnbaordingSimple();
            historyPushState('onboarding', 'Onboarding');
            $('#usageFooterDiv').hide();
        } else {
            historyPushState('onboarding-new-site', 'Onboarding New Site')
            createWebsiteSelect();
            ajaxLoadToDiv('/assets/htmls/onboardingAccount.html', 'tabData');
        }
    } else {
        historyPushState('dashboard', 'Dashboard');
        
        if (websitesMax === 1) {
            showTab();
            createWebsiteSelect();
        } else {
            createWebsiteSelect();
            $("#inputSearchWebsite").change(function () {
                if (!addNewWebsite) {
                    let val = $("#inputSearchWebsite").val();
                    var activeId = $('#allTabsContent .tab-content .active').attr('id');
                    console.log('activeId ' + activeId);
                    console.log('in change tabToShow ' + tabToShow + ' and val is ' + val + ' and onboarding is ' + isWebsiteOnboarding() + ' keywordsUsed ' + mainUserDetails['keywordsUsed'] + ' linksUsed ' + mainUserDetails['linksUsed']);
                    initDefaultTabToShow();
                    siteTable = null;
                    // if (isWebsiteOnboarding() || true) { // login first time
                    if (val === getTranslationWord("All Websites")) { // multiple websites account
                        showAllWebsitesDiv();
                    } else if (val === getTranslationWord("Add New Website")) { // add new website
                        // console.log('payingUser ' + payingUser + ' user ' + websitesUsed + ' max ' + websitesMax);
                        if (websitesUsed < websitesMax) {
                            ajaxLoadToDiv('/assets/htmls/onboardingWebsite.html', 'tabData');
                        } else {
                            showUpgradeModal(websitesLimitUpgrade);
                            return;
                        }
                    } else { // just choose a website to show
                        if (websitesUsed > 1) {
                            refreshWebsiteData();
                        }
                        tabToShow = activeTab
                        $('#menuBar').show();
                        $('#tabData').hide();
                        $('#allTabsContent').show();
                        if (val) {
                            // history.pushState("", "", "home.html?url=" + val);
                        }
                        showTab();
                    }
                } else {
                    addNewWebsite = false;
                }
            });
            if (websitesUsed > 1) {
                const allParams = location.search.slice(1, location.search.length);
                console.log('allParams ' + allParams);
                if (allParams && allParams.includes("url=") && !allParams.includes("url=null")) {
                    websiteUrl = allParams.slice(allParams.indexOf("url="), allParams.length);
                    console.log('websiteUrl loaded ' + websiteUrl);
                    if (websiteUrl) {
                        websiteUrl = websiteUrl.replace("url=", "");
                        if (availableWebsites && availableWebsites.includes(websiteUrl)) {
                            websiteSelect2.val(websiteUrl).change();
                        } else {
                            console.log('website is not there ' + websiteUrl)
                            showAllWebsitesDiv();
                        }
                    }
                } else {
                    showAllWebsitesDiv();
                }
            } else {
                websiteUrl = firstWebsite;
                if (websiteSelect2) {
                    websiteSelect2.val(websiteUrl).change();
                }
            }
        }
    }
    setViewText();

    console.log('show freeUsers ' + !payingUser);
    if (!payingUser || isTestingMode()) {
        $('.freeUsers').show();
    } else {
        $('.freeUsers').hide();
    }
    if (mainUserDetails['firstPaymentDate'] !== null && !isExternalUser()) {
        $('.payments-link').show();
    }
    showHideAskUserEmail();

    try {
        if (mainUserDetails['userUpgraded']) {
            console.log('mainUserDetails[\'userUpgraded\'] ' + mainUserDetails['userUpgraded']);
            historyPushState('upgrade-success', 'Upgrade Success');
            gtag("event", "purchase", {
                transaction_id: generateUUID(),
                value: mainUserDetails['pricePerMonth'],
                currency: "USD",
                items: [
                    {
                        item_id: mainUserDetails['appDomainName'] + '-' + mainUserDetails['packageName'],
                        item_name: mainUserDetails['appDomainName'] + '-' + mainUserDetails['packageName']
                    }]
            });
        }
    } catch (e) {
    }
}

function publishLinkInRabbit() {
    const formId = 'savePublishDetailsUser';
    const whereToPublish = $('#hiddenWhereToPublish').val();
    if ((whereToPublish && (whereToPublish === 'blogPost' || whereToPublish === 'both')) && $('#articleTitleSignup').val() === '') {
        fadeModal('', 'Please choose a title for your guest blog');
    } else {
        let result = ajaxSubmitForm(formId);
        console.log('publishLinkInRabbit result ' + JSON.stringify(result));
        console.log(result && result.indexOf('http://') !== -1);

        if (result.indexOf('Please fill ') !== -1) {
            showModal('Oops', result, 'Close', '');
        } else {
            if ((whereToPublish && whereToPublish === 'blogPost') || (result && result.indexOf('https://') !== -1)) {
                let title = 'Business Listings';
                let html = "Hurray, Your links are live! You can see them on:<br />";

                if (!whereToPublish || whereToPublish === 'listings') {
                    html += result;
                } else if (whereToPublish === 'blogPost') {
                    title = 'Guest Blog';
                    html = "Hurray, Your Guest Blog is on the way, we will notify you when it's live<br />";
                    result = "(approx 1 minute)";
                    waitForArticleInterval();
                } else if (whereToPublish === 'both') {
                    title = 'Backlinks'
                    html = "Hurray, Your listing is live (and the guest blog is on the way)! You can see it on:<br />"
                    html += result;
                    waitForArticleInterval();
                }

                refreshUserDetails();
                animatePublishProgressBar(title, html);
            } else {
                if (result && !inOnboardingNow) {
                    if (currPageUrlLink) {
                        loadMonitoredLinks();
                        fadeModalWithTime("", "Business Listing is updated. <a href='" + currPageUrlLink + "' target='_blank' style='color: #FEC200'>Show Me</a>", 2000, true);
                        // showModal('Success', 'Your details were successfully saved. Your business listing is updated!', 'Close', 'Show Listing');
                        // $('div#modalMessage button#modalSecondButton').click(function () {
                        //     window.open(currPageUrlLink, '_blank');
                        //     $('div#modalMessage button#modalSecondButton').off('click');
                        // });
                    } else {
                        showModal('Success', 'Your details were successfully saved. Your business listing is updated!', 'Close', '');
                    }
                    // showModal('Account Details', result, 'Close', '');
                } else {
                    showApp();
                }
            }
        }
        let responseDiv = '#' + formId + ' div.alert-success';
        $(responseDiv).show();
    }
}

function animatePublishProgressBar(title, html) {
    let linksType = 'backlinks';
    try {
        linksType = $(".btnpublishlist.active").text().trim();
    } catch (e) {}

    $('.js-loading-bar h5.modalLoadingTitle').html("We are publishing your " + linksType + " now");
    $('.js-loading-bar h5.modalLoadingText').html("Few seconds and your links will be live!");
    $('#modalLoadingProgressBar').show();
    i = 0;
    makeModalFastProgress();
    var $modal = $('.js-loading-bar');
    $modal.modal('show');
    afterOnboarding = true;

    setTimeout(function () {
        $modal.modal('hide');
        $('#modalLoadingProgressBar').hide();
        // toggleLinksView();
        if (inOnboardingNow) {
            let hasLoadedWebsite = false;
            // showModal('<span class="rabbit-title">' + title  + ' Published</span><img src="/assets/images/home_icon/signup-check.png" class="dashcardIcon"/>', html, 'Continue to Rabbit SEO', '');
            showModal('<span class="rabbit-title">' + title  + ' Published</span><img src="/assets/images/home_icon/signup-check.png" class="dashcardIcon"/>',
                html, 'Take me to the Dashboard', '');
            $('div#modalMessage button#modalFirstButton').addClass('btn btn-primary btn-lg pageBtn')
            $('div#modalMessage button#modalFirstButton').click(function () {
                hasLoadedWebsite = true;
                showApp();
            });
            if (!isDev()) {
                setTimeout(function () {
                    if (!hasLoadedWebsite) {
                        showApp();
                    }
                }, 7000);
            }
        } else {
            if (!payingUser) {
                html += '<br/><br /><a href="javascript: callUpgradePage()">Upgrade now</a>  and make your website more discoverable!';
                // html += 'Do you want to get listed in other websites and get links for your targeted keywords? <a href="javascript: callUpgradePage()">Upgrade now</a>  and publish your website';
            }
            showModal('Business Listings Published', html, 'Close', '');
            loadMonitoredLinks();
            closeAppModal();
        }
    }, isDev() ? 1000 : 5000);
}

function isEnableBlogPost() {
    // const val = mainUserDetails["packageName"] === 'Enterprise' ||
    // mainUserDetails["packageName"] === 'Business' ||
    // mainUserDetails['isABTest'];
    return true;
}

function showHideBlogPosts() {
    // views
    if (isEnableBlogPost()) {
        $('.orderListingsTitle').html('Publish Premium Listings');
        $('.orderBlogPost').html('Publish Exclusive Guest Blog');
        $('#orderBlogPostSection').show();
        $('#myBlogPostsCol').show();
        $('#pendingBacklinksCol').hide();
        $('#liveListingsCol span').html('Premium Listings');
    }
    if (isWixUser() || isShopifyUser()) {
        if (!mainUserDetails['pricePerMonth'] || mainUserDetails['pricePerMonth'] < 50) {
            $('.blogDomainsDiv').hide();
        }
        $('#linksAddButton').hide();
    }

    $('.advancedSettingsSwitch').show();
}

function showAppDivs() {
    $('#rabbitOnboarding').hide();
    $('#usageFooterDiv').show();
    $('#accountDiv').show();
    $('#body-pd').show();
    $('#menuBar').show();
    if (isShabbat) {
        $('.pay-as-you-go-link').hide();
        $('#upgradeLinkMenu').hide();
        $('#upgradeLinkFooter').hide();
        $('.usageFooter').attr('onclick', '');
        $('#upgradeContainer').hide();
    } else {
        console.log('showAppDivs packageName ' + packageName)
        if (packageName === 'Starter') {
            $('#upgradeContainer').show();
            $('.freeMessage').show();
            // } else if (mainUserDetails['pricePerMonth'] && mainUserDetails['pricePerMonth'] > 0) {
        } else if (packageName === 'Premium') {
            $('.freeMessage').hide();
            if (isRandDivideBy(2) && false) {
                $('#upgradeContainer').show();
                
                if (isWixUser()) {
                    $('.moreLinksMessage').show();
                } else {
                    $('.moreLinksMessageRabbit').show();
                }
            } else {
                $('#upgradeContainer').hide();
                $('.cupon_container').hide();
                $('.cuppon_btn').hide();
            }
        } else {
            $('.freeMessage').hide();
            $('.cuppon_btn').hide();
        }
    }

    showHideBlogPosts();
    if (isTestingMode()) {
        // $('#upgradeContainer').show();
        showHeaderCountdown("30 November 2023 9:56:00 GMT+01:00", '1308Sale');
    }

    if (mainUserDetails['guestBlogsUsed'] === -1) {
        $('.newGiftHeader').show();
    } else {
        $('.newGiftHeader').hide();
    }
}

function showAppFromJson(json) {
    console.log('refreshUserDetails ' + JSON.stringify(json));
    json = JSON.parse(json['data']);
    mainUserDetails = json;
    setUserDetailsFromJson(json);
    $('#usernameSpan').html('Hello ' + mainUserDetails["firstName"]);
    setUserDetailsValues();
    refreshUsage();
    showAppDivs();
    $('#modalMessage').modal('hide');
    if (useNewHome) {
        showTab();
    } else {
    }
    console.log('start rabbit.js isWebsiteOwner ' + isWebsiteOwner)
    return mainUserDetails;
}

function showApp() {
    $.getJSON(getApiUrl('getMyJsonMainDetailsGeneric'), function (json) {
        showAppFromJson(json);
    });
}

function initPostWordsCount() {
    $("#postWordsCount").change(
        function (e) {
            // console.log(e);
            $('.postWordsCountval').text(e.target.value);
            $('.postWordsCountval').css('left', `${(e.target.value - e.target.min) / (e.target.max - e.target.min) * 100}%`);
            $('html[dir=rtl] .postWordsCountval').css('right', `${(e.target.value - e.target.min) / (e.target.max - e.target.min) * 100}%`);
            $('html[dir=rtl] .postWordsCountval').css('left', 'inherit');

            if (e.target.value == 300) {
                $('.postWordsCountval').text('');
                $('.postWordsCountvalmin').addClass('text-primary');
            } else {
                $('.postWordsCountvalmin').removeClass('text-primary');
            }
            if (e.target.value == 1000) {
                $('.postWordsCountval').text('');
                $('.postWordsCountvalmax').addClass('text-primary');
            } else {
                $('.postWordsCountvalmax').removeClass('text-primary');
            }
        }
    );
    $('#postWordsCount').val(400);
    $('#postWordsCount').trigger('change');

    const slider = document.getElementById("postWordsCount")

    const min = slider.min
    const max = slider.max
    const value = slider.value

    if (document.dir == "rtl") {
        slider.style.background = `linear-gradient(to left, #FFBD3D 0%, #FFBD3D ${(value - min) / (max - min) * 100}%, #D9D9D9 ${(value - min) / (max - min) * 100}%, #D9D9D9 100%)`
    } else {
        slider.style.background = `linear-gradient(to right, #FFBD3D 0%, #FFBD3D ${(value - min) / (max - min) * 100}%, #D9D9D9 ${(value - min) / (max - min) * 100}%, #D9D9D9 100%)`
    }

    // $('.postWordsCountval').text(this.value);
    // $('.postWordsCountval').css('left' , `${(this.value-this.min)/(this.max-this.min)*100}%`);
    slider.oninput = function () {

        $('.postWordsCountval').text(this.value);
        $('.postWordsCountval').css('left', `${(this.value - this.min) / (this.max - this.min) * 100}%`);
        $('html[dir=rtl] .postWordsCountval').css('right', `${(this.value - this.min) / (this.max - this.min) * 100}%`);
        $('html[dir=rtl] .postWordsCountval').css('left', 'inherit');
        if (document.dir == "rtl") {
            this.style.background = `linear-gradient(to left, #FFBD3D 0%, #FFBD3D ${(this.value - this.min) / (this.max - this.min) * 100}%, #D9D9D9 ${(this.value - this.min) / (this.max - this.min) * 100}%, #D9D9D9 100%)`
        } else {
            this.style.background = `linear-gradient(to right, #FFBD3D 0%, #FFBD3D ${(this.value - this.min) / (this.max - this.min) * 100}%, #D9D9D9 ${(this.value - this.min) / (this.max - this.min) * 100}%, #D9D9D9 100%)`
        }
    };
}
function initBizSignaturePreview() {
    $.getJSON(getApiUrl('getMyJsonEmbedUserDetailsExampleLink'), function (json) {
        console.log('getMyJsonEmbedUserDetailsExampleLink ' + JSON.stringify(json));
        if (json['obj'] && json['obj'].length > 30) {
            const html = 'At the end of the guest blog we will post this section:' + json['obj'];
            console.log('initBizSignaturePreview html is ' + html)
            addTooltipToSelector('.addMyDetailsHtml', html);
            // addPopoverToSelector('.addMyDetailsHtml', html);
            // $('.addMyDetailsHtml').attr('data-bs-content', html);
            // $('.addMyDetailsHtml').html(html)
            // enableTooltips();
        }
    });
}

function initHelpSection() {
    var divs = $('.mydivs>div');
    var now = 0; // currently shown div
    divs.hide().first().show(); // hide all divs except first
    $("button[name=next]").click(function () {
        divs.eq(now).hide();
        now = (now + 1 < divs.length) ? now + 1 : 0;
        divs.eq(now).show(); // show next
    });
    $("button[name=prev]").click(function () {
        divs.eq(now).hide();
        now = (now > 0) ? now - 1 : divs.length - 1;
        divs.eq(now).show(); // show previous
    });

    var socialdivs = $('.mysicialdivs>div');
    var socialnow = 0; // currently shown div
    socialdivs.hide().first().show(); // hide all socialdivs except first
    $("button[name=next]").click(function () {
        socialdivs.eq(socialnow).hide();
        socialnow = (socialnow + 1 < socialdivs.length) ? socialnow + 1 : 0;
        socialdivs.eq(socialnow).show(); // show next
    });
    $("button[name=prev]").click(function () {
        socialdivs.eq(socialnow).hide();
        socialnow = (socialnow > 0) ? socialnow - 1 : socialdivs.length - 1;
        socialdivs.eq(socialnow).show(); // show previous
    });

}

function initLinksDropdownsHandlers() {
    $('a[data-bs-target="#links"]').on('shown.bs.tab', function (e) {
        var myModal = document.getElementById('ourModal')
        myModal.addEventListener('hide.bs.modal', function (e) {
            showmodal = 1;
            frommodal = 2;
            return false;
        });
        myModal.addEventListener('show.bs.modal', function (e) {

            showmodal = 2;
            return false;
        });
        var myDropdown = document.getElementById('orderBlogPostButtons')
        myDropdown.addEventListener('hide.bs.dropdown', function (e) {
            console.log('orderBlogPostButtons' + e);
            if (frommodal == 2 || showmodal == 2) {
                e.preventDefault();
                frommodal = 1;
            }
            return false;
        });
    });
}

function toggleKeywordsInput() {
    $('#keywordsSelectContDiv').toggle();
    $('#keywordsTextContDiv').toggle();
}

function hidePublishBlogDropdown() {
    $('#blogItlemsDropdown').prev().dropdown('hide');
}

function openUpdateListingDetailsModal(link) {
    hidePublishBlogDropdown();
    currPageUrlLink = link;
    $('#rabbitOnboarding').html('');
    openModal('/assets/htmls/publishLink.html', 'Business Listings Details');
    $('#appDataModal div.modal-dialog-centered').css( "maxWidth", "920px");
    // openModal('/assets/htmls/publishLink.html', 'My Website Details');
}

$(document).ready(function () {
    console.log('start rabbit ready doc');
    if (!checkIfBlocked()) {
        initScreenView();
    } else {
    }
    setAjaxProgressBar();

    $("body").delegate(".addcompectColumnCompact", "click", function () {
        $('#keywordsTable_wrapper .table').addClass("compact");
        // $( '.addcompectColumnText' ).text( "Compact View" );

    })
    $("body").delegate(".addcompectColumnComfort", "click", function () {
        $('#keywordsTable_wrapper .table').removeClass("compact");
        // $( '.addcompectColumnText' ).text( "Comfort View" );
    })
    $('.logoutLink').attr('href', getApiUrl('logoutGeneric'));
});


function homeReady() {
    if (window.performance) {
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            localStorage.setItem("refreshPage", 1);
        }
    }
    this.$('.js-loading-bar').modal({
        backdrop: 'static',
        show: false
    });
}

$(document).ready(function () {
    //$('#links-tab[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
        $.fn.dataTable.tables({visible: true, api: true}).columns.adjust().responsive.recalc();
    });
    $(document).on('shown.bs.tab', function (e) {
        console.log('adjust column now');
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
    })

    useNewHome = true;
    $.ajaxSetup({
        async: false
    });
    homeReady();
    refreshUsage();
    $.ajaxSetup({
        async: true
    });
    if (isDevOrLocalhost()) {
        showHideBlogPosts();
    }
    // initDashboard();
});

function setAjaxProgressBar() {
    $(document).ajaxStart(function () {
        $('.rabbit-loader').show();
        $('.rabbit-loader').css("width", "0%");
    });
    $(document).ajaxComplete(function () {
        $('.rabbit-loader').hide();
    });
}

function openTutorialModal() {
    ajaxLoadToDiv('/assets/htmls/tutorial.html', 'tabData');
}

function setUserDetailsValues() {
}

function loadPublishBlogTopics() {
    console.log('start loadPublishBlogTopics')
    console.log('$(\'#hiddenWhereToPublish\').val() ' + $('#hiddenWhereToPublish').val())

    if ($('#keywordsToPromote').select2('data') && $('#keywordsToPromote').select2('data')[0] && $('#keywordsToPromote').select2('data')[0]['text']) {
        keywordToPromote = $('#keywordsToPromote').select2('data')[$('#keywordsToPromote').select2('data').length - 1]['text'];
        console.log('keywordsToPromote ' + keywordToPromote);
    }

    $('.userDomain').html($('#domain').val().replace("http://", "").replace("https://", "").replace("www.", ""));
    // $('.userKeyword').html(keywordToPromote);

    $('.signupprogress').show();
    $('.articleTitleSignupText').show();
    initBlogPostTitles(5);
    // var elem = document.getElementById("signup_progressbar");
    // var width = 0;
    // var started = false;
    // var id = setInterval(function () {
    //     if (!started) {
    //         initBlogPostTitles(5);
    //     }
    //     started = true;
    //     if (width === 100) {
    //         clearInterval(id);
    //         $("#articleTitleSignup").select2('open');
    //         elem.style.width = 0 + '%';
    //     } else {
    //         width++;
    //         elem.style.width = width + '%';
    //     }
    // }, 50);
}

function whereToPublishClick(val) {
    if (val) {
        $('#hiddenWhereToPublish').val(val);
        console.log('.btnpublishlist clicked')
        $(".btnpublishlist").removeClass('active');
        $('#' + val + 'Publish').toggleClass('active');
    }
    // console.log('active text ' + $(".btnpublishlist.active").text().trim());
    console.log('whereToPublishClick val ' + val);
    if (val === 'listings') {
        $('.firstPublishButton').text('PUBLISH MY FIRST BUSINESS LISTING');
    } else if (val === 'blogPost') {
        $('.firstPublishButton').text('PUBLISH MY FIRST GUEST BLOG');
    } else {
        $('.firstPublishButton').text('PUBLISH MY FIRST LISTING & BLOG POST');
    }
    if (val === 'blogPost' || val === 'both') {
    // if (val === 'listings' || val === 'blogPost' || val === 'both') {
        $('.articleTitleSignupDiv').show();

        // if (val === 'listings' || val === 'both') {
        //     $('.categorySignupSection').show();
        // } else {
        //     console.log('hide categorySignupSection')
        //     $('.categorySignupSection').hide();
        // }

        if (val === 'blogPost' || val === 'both') {
            $('.blogTitleSignupSection').show();
        } else {
            $('.blogTitleSignupSection').hide();
        }

        $('#articleTitleSignup').on('select2:opening', function (e) {
            console.log('in select2:opening keywordToPromote is ' + keywordToPromote)
            const length = $("#articleTitleSignup option").length;
            console.log('in select2:opening length is ' + length)
            
            if (length === 0) {
                openSelect = true;
                loadPublishBlogTopics();
            }
        });
        $('.signupKeywordToPromote').on('select2:select', function (e) {
            if ($('#articleTitleSignup option').length > 0) {
                openSelect = false;
                loadPublishBlogTopics();
            }
        });
    } else {
        $('.articleTitleSignupDiv').hide();
    }
}

$(document).ready(function () {
    $('#publishDate').attr('min', moment().format('YYYY') + '-' + moment().format('MM') + '-' + moment().format('DD'));
    // $('#publishDate').attr('value', moment().format('YYYY') + '-' + moment().format('MM') + '-' + moment().format('DD'));
});
$('.my-trigger-btn').on('click', function (e) {
    e.stopPropagation();
    $(this).next('.dropdown').find('[data-toggle=dropdown]').dropdown('toggle');
});