$(document.head).append('<link rel="icon" type="image/x-icon" href="/assets/images/seoly/fac-ico.jpeg">');

var showLongProgressBar = false;
var loadingTitle, loadingText;
let showTutorial = true;

function loadMyKeywords() {
    console.log('siteTable ' + siteTable);
    if (!siteTable) {
        if (isDev()) {
            loadKeywordsTableFromJson(JSON.parse(jsonKFWData), true);
        } else {
            loadKeywordTable(true);
        }
    } else {
        if (needToRefreshKeywords) {
            refreshKeywordTable();
        }
    }
}

function showApp() {
    window.scrollTo(0, 0);

    $('#signupDiv').hide();
    $('#headerMenu').show();
    $('#navbarSupportedContent').show();
    $('#tabs').show();
    // if (!payingUser && isWixUserOrWixLinksUser()) {
    //     // $('#couponHeader').show();
    // } else {
    //     $('#upgrade-tab').html('Plans');
    // }
    const siteUrl = mainUserDetails['wixUrl'];
    $('#inputSearchWebsite').html(siteUrl);
    loadAllLandingPages();
    if (mainUserDetails["linksCount"] && mainUserDetails["linksCount"] > 0) {
        $('#backlinks-crawler-list').show();
    } else {
        $('#backlinks-crawler-list').hide();
    }
    if (mainUserDetails["ranksCount"] && mainUserDetails["ranksCount"] > 0) {
        $('#ranked-keywords-list').show();
    } else {
        $('#ranked-keywords-list').hide();
    }
    $('#my-keywords-list').click(function(){
        loadMyKeywords();
    });
    $('#ranked-keywords-list').click(function(){
        if (!rankedKeywords) {
            if (isDev()) {
                loadRanksExplorerFromJson(JSON.parse(jsonRankedKeywordsData));
            } else {
                loadRanksExplorer();
            }
        }
    });
    $('#suggested-keywords-list').click(function(){
        console.log('keywordIdeasTable ' + keywordIdeasTable)
        if (!keywordIdeasTable) {
            loadKeywordResearchList();
        }
    });
    $('#offPage-tab').click(function() {
        if (mainUserDetails["linksUsed"] && mainUserDetails["linksUsed"] > 0) {
            console.log('tab click mainUserDetails["linksUsed"] ' + mainUserDetails["linksUsed"]);
            $('[href="#my-links-list"]').tab('show');
            $('.publishOrUpdate').html('Business Details');
        } else {
            $('[href="#publish-link-list"]').tab('show');
            $('.publishOrUpdate').html('Publish Website');
        }
        showImageGallery();
    });
    $('#ranks-tab').click(function(){
        loadMyKeywords();
    });
    $('#backlinks-crawler-list').click(function(){
        if (!linksSummaryLoaded) {
            if (isDev()) {
                loadLinksSummaryFromJson(JSON.parse(jsonLinksSummary), false);
                loadBacklinksList('sample.com');
            } else {
                loadLinksSummary(false);
                loadBacklinksList(siteUrl);
            }
            linksSummaryLoaded = true;
        }
    });
    $('#my-links-list').click(function(){
        if (!linksListTable) {
            loadMonitoredLinks();
        }
    });
    $('#competitors-list').click(function(){
        loadKeywordsPairList();
    });

    if (isShowWixBillingPage()) {
        $('#upgrade-tab').attr("onclick", "callUpgradePage()");
        $('#upgrade-tab').attr("data-bs-target", "");
    } else {
        $('#upgrade-tab').click(function(){
            if (!allPlans) {
                if (isDev()) {
                    allPlans = JSON.parse(pricesJson);
                    drawPlans();
                } else {
                    initPlans();
                }
            }
        });
    }
    if (isShabbat) {
        $('.upgrade-button').hide();
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
    $('#userFlag').attr('src', mainUserDetails['countryFlag']);
    $('#linkHref').val(mainUserDetails['wixUrl']);

    $('.countrySelect').select2({tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: getCountriesArray(),
        width: "100%",
    });
    fillPublishDetailsForm();
    createArticleTagsSelect();
    refreshUsage();
    // $('.btn-upgrade').attr("onclick", upgradeLink);
    if (!isShabbat) {
        $('.btn-upgrade').attr("onclick", '$("#upgrade-tab").click()');
    }

    if (!payingUserOrFreeTrial) {
        $('.upgradeBlock').show();
        $('.upgradeBlock').attr("onclick", '$("#upgrade-tab").click()');
        // $('#linksList').css('opacity', 0.3);
        // $('#linksList').addClass('ignoreme');
    } else {
        console.log('hide upgrade block')
        $('.upgradeBlock').hide();
    }
    enableTooltips();
    if (mainUserDetails['askReview']) {
        $('#askReviewModal').modal('show');
    }
    // if (isTestingMode()) {
        showHeaderCountdown("1 December 2023 09:56:00 GMT+01:00", '29D2BFriday');
        // showHeaderCountdown("27 November 2023 22:56:00 GMT+01:00", '29D2BFriday');
    // }
}

function setAjaxProgressBar() {
    $(document).ajaxStart(function () {
        if (showLongProgressBar && false) {
            animateProgressBar(loadingTitle, loadingText, 70);
            showLongProgressBar = false;
        } else {
            $('.loadingBar').show();
        }
    });
    $(document).ajaxStop(function () {
        hideProgressBar();
        $('.loadingBar').hide();
    });
}
function loadAllLandingPages() {
    $('#pagesUl').html('');
    $.getJSON(getApiUrl('jsonLandingPage'), function (json) {
        console.log('jsonLandingPage ' + JSON.stringify(json));
        if (json) {
            drawLandingPages(json);
        }
    });
}

function publishLink() {
    const formId = 'savePublishDetailsUser';
    var result = ajaxSubmitForm(formId);
    console.log('result ' + result);
    refreshUserDetails();
    if (result && result.indexOf('Please fill') !== -1) {
        showModal('Account Details', result, 'Close', '');
    } else {
        window.scrollTo(0, 0);
        $('.loadingBar').show();
        // animateProgressBar("Publishing " + mainUserDetails["wixUrl"] + " in progress", "Few more seconds...");
        // setTimeout(function () {
            console.log('finish publishLinks calling hide');
            // hideProgressBar();
            loadMonitoredLinks();
            $('.loadingBar').hide();
            var html = "Hurray, Your website was published in 2 directories:<br /><br />";
            html += result;
            // showModal('Publish Website Success', html, 'Close', '');
            // $('#my-links-list').click();
            // $('[href="#my-links"]').tab('show');
            fadeModal('Success!', 'Details Successfully Saved')
        // }, 5000);
    }
}

function saveUserDetails(btn) {
    console.log('saveUserDetails');
    const formId = 'savePublishDetailsUser';
    if (!isDev()) {
        var result = ajaxSubmitForm(formId);
        console.log('result ' + result);
        refreshUserDetails();
        if (result && result.indexOf('http') !== -1) {
            let responseDiv = '#' + formId + ' div.alert-success';
            $(responseDiv).show();
        }
    } else {
    }
}

function openTutorialModal() {
    $.get('/assets/htmls/tutorial.html', function (data) {
        // console.log($(data));
        $('#ourModal').html(data);
        $('#ourModal').modal('show');
    });
}

function openContactUsModal() {
    $.get('/assets/htmls/contactUs.html', function (data) {
        // console.log($(data));
        $('#ourModal').html(data);
        $('#ourModal').modal('show');
    });
}

let linksListTable;
function createLinkTable(json) {
    if (!hasAlertToShow(json)) {
        var listLength = json['list'].length;
        // console.log('listLength is ' + listLength);
        linksListTable = $('#monitoringLinkTableLive').DataTable({
            "datatype": "json",
            "data": json['list'],
            rowId: 'id',
            "columns": [
                {
                    "data": "pageUrl",
                    "name": "pageUrl",
                    "title": "Website",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return data === 'Awaiting' ? 'Pending' : ((row['isNew'] ? ' <img src="/assets/images/icon/new.png" style="height: 45px; margin-right: 10px;" />' : '') + getFormattedUrl(data));
                    }
                },
                {
                    "data": "href",
                    "name": "href",
                    "title": "Point To",
                    "defaultContent": "",
                    'visible': true,
                    // render: function (data, type, row) { return getFormattedUrl(data);}
                },
                {
                    "data": "keywordName",
                    "name": "keywordName",
                    "title": "Keyword",
                    "defaultContent": "",
                    'visible': true,
                },
                {
                    "data": "orderLinkType",
                    "name": "orderLinkType",
                    "title": "Type",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        let html = data;
                        html += !isLinkTypeArticle(row.orderLinkType) ? '' : '<a class="no-click" onclick="modifyArticle(' + row.id + ')"><img src="/assets/images/home_icon/browser.gif" style="height: 30px; cursor: pointer" alt="Edit"></a>';
                        return html;
                    }

                },
                {
                    "data": "enabled",
                    "name": "enabled",
                    "title": "Live",
                    "defaultContent": "",
                    'visible': !isEasySeoUser(),
                    render: function (data, type, row) {
                        if (type === 'display' || type === 'filter') {
                            // return data && data == true ? "<p id='linkOn" + row.id + "' class=\"on-btn\">ON</p>" : "<p id='linkOff" + row.id + "' class=\"off-btn\">OFF</p>";
                            return "<p id='linkOn" + row.id + "'" + (!data || data !== true ? ' style="display: none"' : '') + " class=\"on-btn\">Live</p>" +
                                "<p id='linkOff" + row.id + "'" + (data && data === true ? ' style="display: none"' : '') + " class=\"off-btn\">Disabled</p>";
                        }
                    }
                },
                //
                // {
                //     "data": "enabled",
                //     "name": "enabled",
                //     "title": "Live",
                //     "defaultContent": "",
                //     'visible': true,
                //     render: function (data, type, row) {
                //         if (type === 'display' || type === 'filter') {
                //             return data && data === true ? "Live" : "-";
                //         }
                //     }
                //
                // },
                {
                    "data": "dateCreated",
                    "name": "dateCreated",
                    "title": "Created Date",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return getFormattedDate(data);
                    }
                },
                {
                    "data": "comment",
                    "name": "comment",
                    "title": "Comment",
                    "defaultContent": "",
                    'visible': false,
                },
                {
                    data: "id", "name": "id",
                    "title": isRabbitUI ? "Edit / Delete" : "Actions",
                    'visible': true,
                    render: function (data, type, row) {
                        let html = '';
                        const ownListing = row.ownListing;
                        // html += !isLinkTypeArticle(row.orderLinkType) ? '' : '<a class="no-click" onclick="modifyArticle(' + row.id + ')"><img src="/assets/images/home_icon/update.png" style="height: 20px; cursor: pointer" alt="Edit"></a>';
                        html += '<a id="deleteLink' + row.id + '"' + (!row.enabled ? ' style="display: none"' : '') + ' class="no-click" onclick="deleteLink(' + row.id + ',' + ownListing + ')"><img src="/assets/images/icon/remove.png" style="cursor: pointer" alt="Remove"></a>';
                        // if (ownListing) {
                        //     html += '<a id="activateLink' + row.id + '"' + (row.enabled ? ' style="display: none"' : '') + ' class="no-click" onclick="editLink(' + row.id + ')"><img src="/assets/images/icon/active.png" height="20" style="cursor: pointer" alt="Remove"></a>';
                        // }
                        return html;
                    }
                }

                // {
                //     data: "id", "name": "id", "title": "Delete", 'visible': true,
                //     render: function (data, type, row) {
                //         return '<a class="no-click" onclick="deleteLink(' + row.id + ')"><img src="images/icon/remove.png" alt="Remove"></a>';
                //     }
                // }
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
            // paging: listLength > 100,
            // scrollY: 700,
            // scrollCollapse: true,
            // scroller: listLength > 100,
            // "aoColumnDefs": [{
            //     "searchable": false,
            //     "targets": [0]
            // }],
            order: [[6, 'desc']],
            info: false,
            fixedHeader: true,
            deferRender: true,
            paging: false,
            "bFilter": true,
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            }],
            "initComplete": function (settings, json) {
            }
        });
        initShowHideColumns('monitoringLinksTableLive', linksListTable);
        adjustExportButtons('tableSearch', linksListTable);
    } else {
        $('#link tbody').html("Create your first link now");
    }
}

function loadMonitoredLinks() {
    if (!isDev()) {
        $.getJSON(getApiUrl('jsonLink'), function (json) {
            console.log('jsonLink is ' + JSON.stringify(json));
            createLinkTable(json);
        });
    } else {
        createLinkTable(linksJsonData);
    }
}

function submitLinkRequestForm() {
    const result = ajaxSubmitForm('createRequestLink');
    // console.log('result' + result);
    if (!result || result === 'OK') {
        refreshUserDetails();
        if ($('#linkType').val() === 'Article') {
            showModal("New Guest Blog Request", 'Your guest blog request was <span>successfully</span> created!<br/>We will email you when the guest blog is live, you can check the status in My Links tab.', "Close", "My Links");
        } else {
            showModal("New Link Request", 'Your link request was <span>successfully</span> created!<br/>We will email you when the link is live.', "Close", "My Links");
        }
        linksListTable = null;
        $('div#modalMessage button#modalSecondButton').click(function () {
            $('#my-links-list')[0].click();
        });
    } else {
        showModal("Message", result, "Close", "");
    }
}

function submitOnboarding() {
    var result = ajaxSubmitForm('onboardingKeywordForWebsite');
    console.log('submitOnboarding result ' + result);
    if (result && result !== 'added') {
        if (result === 'limit') {
            showApp();
        } else {
            showModal("Message", result, "Close", "");
        }
    } else {
        showLongProgressBar = true;
        loadingTitle = 'We are scanning your website now';
        loadingText = 'Please wait few more seconds...';
        showApp();
        if (showTutorial) {
            initTour();
        }
    }
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
        const yearlyPrice = item['yearlyPrice'];
        // const yearlyPrice = item['yearlyPrice'] / 12;
        html +=
            '<div class="col">' +
            '<div class="card mb-4 rounded-3 shadow-sm ' + (packageName === item['planName'] ? 'border-primary' : '') + '">' +
            '<div class="card-header py-3 ' + (packageName === item['planName'] ? '' : '') + '">' +
            '<h4 class="my-0 fw-normal ' + (packageName === item['planName'] ? 'text-white' : '') + '"><span class="sm2 ' + (packageName === item['planName'] ? 'text-decoration-underline' : '') + '">' + item['planName'] +
            '</span></h4>' +
            '<h1 class="card-title pricing-card-title">' + (!planPrice || planPrice === 0 ? "Free" : item['planPriceCurrency'] +
                (yearly ? discountedPlanPrice : planPrice) + '/mo ' +
                '<small class="preMonth" style="margin-top: 10px">' + item['planPriceCurrency'] + yearlyPrice + ' Annualy</small>') +
            
            (yearly && planPrice > 0 ? ('<s>' + item['planPriceCurrency'] + planPrice + '</s>') : '') + ' </h1>' +
            (packageName === item['planName'] && !blockedUntilPayment ? '<div style="visibility:hidden">' : '') +
            getButton(item, realPrice, yearly) +
            (packageName === item['planName'] && !blockedUntilPayment ? '</div>' : '') +
            '</div>' +
            '<div class="card-body p-0">' +
            '<ul class="list-unstyled m-0" style="text-align: left;list-style: inside;">' +
            (item['planKeywords'] > 0 ? ('<li class="customRow"> ' + item['planKeywords'] + ' Keywords</li>') : '') +
            (planPrice > 0 ? '<li class="customRow">On Page Optimization</li>' : '<li class="customRow">Limited On Page Optimizer</li>') +
            (item['creditsMax'] > 0 ? ('<li class="customRow">' + item['creditsMax'] + ' Off Page SEO Credits</li>') : '<li class="customRow">Off Page 2 Directory Listings</li>') +
            (planPrice > 0 ? '<li class="customRow">Hot Keywords Research</li>' : '') +
            (planPrice > 0 ? '<li class="customRow">Backlinks Explorer</li>' : '') +
            '</ul>' +
            '<h2 class="annuallyPrice">' + (realPrice > 0 ? '$<b>' + realPrice + '</b><span>"/' + (yearly ? 'yr' : 'mo') : 'Free') + '</span></h2>' +
            // getButton(item, realPrice, yearly) +
          
            '</div>' +
            '</div>' +
            '</div>';
    }
    $('#plans main div').html(html);
}
$(document).ready(function () {
    isSeolyUI = true;
    $('body').addClass("links4u sm_responsive");
    $('[data-toggle="tooltip"]').tooltip();
    // $('table#linksList th').removeClass('sorting');
    // $('thead#keywordIdeasTableHeader th').removeClass('sorting');
    // $('table#rankedKeywords th').removeClass('sorting');
    $('div#pagesUl a > div+span').addClass('small-inner-border');


    let height = $("#nav-tabContent").height();
    $(".col-custom0").css('max-height', height < 1400 ? 1400 : height + 'px');

    $(".list-group-item.list-group-item-action").click(function() {
    })
});

$(document).ready(function () {
    $("#keywordsDropdown, .customeDropdown a.close, form#keywordForm button#addKeyword").click(function () {
        $(".customeDropdown").toggleClass("active_drop");
    });
});


$(document).ready(function () {
    console.log('location.toString() is ' + location.toString());
    initScreenView();
    setAjaxProgressBar();
});

function initScreenView() {
    let showSignup = mainUserDetails['keywordsUsed'] === 0 && mainUserDetails['linksUsed'] === 0;
    console.log('showSignup ' + showSignup);
    if (showTutorial) {
        $('button#tutorial').show();
    } else {
        $('button#tutorial').hide();
    }
    if (isShabbat) {
        payingUser = true;
        $('#upgrade-tab').hide();
        $('#launchOffer').hide();
    }

    if (showSignup || (isTestingMode() && devShowSignup)) {
        $('#navbarSupportedContent').hide();
        $('#signupDiv').show();
        loadKeywordsSuggestions();
        ajaxSimpleLoadToDiv('/assets/htmls/ranksExplorer.html', 'keywordSuggestions');

        if (mainUserDetails['wixUrl'] && mainUserDetails['wixUrl'].length > 5) {
            $('#url').val(mainUserDetails['wixUrl']);
        }
    } else {
        $('.loadingBar').hide();
        showApp();
    }
}
$(document).ready(function () {
    $('#expDate').attr('min', moment().format('YYYY') + '-' + moment().format('MM'));
    $('#expDate').attr('value', moment().format('YYYY') + '-' + moment().format('MM'));
});
function changeLinkType() {
    const linkType = $('#linkType').val();
    console.log('changeLinkType ' + linkType);
    if (linkType === 'Article') {
        $('.articleTitleDiv').show();
    } else {
        $('.articleTitleDiv').hide();
    }
}