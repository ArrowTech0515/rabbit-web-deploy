$(document.head).append('<link rel="icon" type="image/x-icon" href="/assets/images/links4u/favicon.ico">');

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
}

/*
==================================
    Read More Read Less Button
==================================
*/
/* function smx_read_more() {
  var smx_dots = document.getElementById("smx_dots");
  var smx_moreText = document.getElementById("smx_more");
  var smx_btnText = document.getElementById("smx_myBtn");

  if (smx_dots.style.display === "none") {
    smx_dots.style.display = "inline";
    smx_btnText.innerHTML = "Read more";
    smx_moreText.style.display = "none";
  } else {
    smx_dots.style.display = "none";
    smx_btnText.innerHTML = "Read less";
    smx_moreText.style.display = "inline";
  }
}

function smx_read_more_1() {
  var smx_dots_1 = document.getElementById("smx_dots_1");
  var smx_moreText_1 = document.getElementById("smx_more_1");
  var smx_btnText_1 = document.getElementById("smx_myBtn_1");

  if (smx_dots_1.style.display === "none") {
    smx_dots_1.style.display = "inline";
    smx_btnText_1.innerHTML = "Read more";
    smx_moreText_1.style.display = "none";
  } else {
    smx_dots_1.style.display = "none";
    smx_btnText_1.innerHTML = "Read less";
    smx_moreText_1.style.display = "inline";
  }
}
 */

/*table = $('#monitoringLinkTableLive').DataTable( {
   paging: false
} );*/

var settingsForm = ';'

function showLoadingProgressBar() {
    window.scrollTo(0, 0);
    var progress = $('.loadingBar');
    progress.show();
    var progressBar = $('.loading-progress-bar');
    progressBar.css('width', '10%');
    setTimeout(function () {
        progressBar.css('width', '30%');
        setTimeout(function () {
            progressBar.css('width', '100%');
            setTimeout(function () {
                progress.css('display', 'none');
                if (isDev()) {
                    refreshUserDetails();
                } else {
                    setUserDetailsValues();
                }
                showApp();
            }, 1000); // WAIT 5 milliseconds
        }, 2000); // WAIT 2 seconds
    }, 1500); // WAIT 1 seconds
}

$(document).ready(function () {
    settingsForm = $('#userDetailsDiv').html();
    isLinksUI = true;
    $('body').addClass("links4u sm_responsive");
    // $('#signupDiv').hide();
    // $('#headerMenu').hide();
    // $('#tabs').hide();
    // $('#couponHeader').hide();
    initScreenView();
    setAjaxProgressBar();
});

function loadSettingsScreen() {
    $('#userDetailsDiv').html('');
    $('#settingsDiv').html(settingsForm);
    $('#publishLinkButton').attr("onclick", "saveUserDetails(this)");
    $('#publishLinkButton').html('Submit');
}

function setAjaxProgressBar() {
}

function isShowHooray() {
    return !payingUser && mainUserDetails['linksRequestMax'] === 0;
}

function showApp() {
    window.scrollTo(0, 0);
    $('#signupDiv').hide();
    $('#headerMenu').show();
    $('#tabs').show();
    initUpdateSettingsModal();
    console.log('in showApp payingUser ' + payingUser)
    console.log('in showApp mainUserDetails[\'linksRequestMax\'] ' + mainUserDetails['linksRequestMax'])
  
    if (isShowHooray()) {
        showReviews();
        // var hoorayReview = $('#hooray').html();
        // var hoorayReviewIndex = hoorayReview.indexOf('<!-- newReviewBoxList Start -->');
        // var hoorayReviewIndexEnd = hoorayReview.indexOf('<!-- newReviewBoxList end -->');
        // var myHoorayReview = hoorayReview.substring(0,hoorayReviewIndex);
        // var mymyHoorayReviewEnd = hoorayReview.substring(hoorayReviewIndexEnd);
        // var homeDooray = myHoorayReview + mymyHoorayReviewEnd;
        // $('#home').html(homeDooray); 
       $('#home').html($('#hooray').html());
        var elements = $('.reviewsContents'); 
        // Count the number of elements
        var count = elements.length; 
        // Check if there are elements to remove
        if (count > 0) {
          // Remove the last element
          elements.last().remove();
        }
        // loadMonitoredLinks();
    }
    if (!payingUser && isWixUserOrWixLinksUser()) {
        $('#couponHeader').show();
    } else {
        $('#upgrade-tab').html('Plans');
    }
    console.log('mainUserDetails["linksCount"]' + mainUserDetails["linksCount"]);
    if (mainUserDetails["linksCount"] && mainUserDetails["linksCount"] > 0 && false) {
        // if (isDev() && mainUserDetails["linksCount"] && mainUserDetails["linksCount"] > 0) {
        $('#statistic-tab').show();
        loadLinksSummary(false);
        if (payingUser) {
            loadBacklinksList(mainUserDetails["wixUrl"]);
        } else {
            $('#backlinksListUpgrade').show();
        }
    }
    if (mainUserDetails['linksRequestUsed'] <= 0) {
        $('#listings-tab').hide();
    } else {
        $('#listings-tab').show();
    }
    createArticleTagsSelect();
    loadMonitoredLinks();
    setUserDetailsValues();
    loadKeywordResearchList();
    // loadSettingsScreen();
    fillPublishDetailsForm();
    if (isShowWixBillingPage()) {
        $('#upgrade-tab').attr("onclick", "callUpgradePage()");
        $('#upgrade-tab').attr("data-bs-target", "");
    }
    if (mainUserDetails['askReview']) {
        $('#askReviewModal').modal('show');
    }
    if (isTestingMode()) {
        showHeaderCountdown("7 December 2023 09:56:00 GMT+01:00", "3B30WinterSale");
    }
}

function showSignupScreen() {
    $('#signupDiv').show();
    $('#headerMenu').hide();
    $('#tabs').hide();
    $('#couponHeader').hide();
    generateDesc();
    if (mainUserDetails['isABTest']) {
        $('.abTesting').hide();
    } else {
        $('.abTesting').show();
    }
}

function initScreenView() {
    console.log('start initScreenView()');
    fillPublishDetailsForm();

    let showSignup = mainUserDetails['linksUsed'] === 0;
    // let showSignup = mainUserDetails['linksUsed'] === 0 || true;
    console.log('showSignup ' + showSignup);

    if (isShabbat) {
        payingUser = true;
        $('#upgrade-tab').hide();
        $('.pay-as-you-go-link').hide();
        $('.upgrade-call').hide();
        $('#couponHeader').hide();
    }

    if (mainUserDetails['linksRequestMax'] === 0) {
        $('.noMonthlyListings').hide();
    }

    if (showSignup || devShowSignup) {
        showSignupScreen();
    } else {
        showApp();
    }

    initPlans();
}

function setUserDetailsValues() {
    console.log('in setUserDetailsValues');
    $('#autoPilotLinks').prop('checked', mainUserDetails['autoPilot'] ? 'on' : '');
    
    $('input[name="linkHref"]').val(mainUserDetails["wixUrl"]);
    if (mainUserDetails['linksRequestUsed'] === 0) {
        $('#monthlyListingsSection').hide();
    }

    if (mainUserDetails['linksRequestUsed'] !== 0 && mainUserDetails['linksRequestUsed'] !== mainUserDetails['linksRequestMax']) {
        $('#linksRequestUsed').html(mainUserDetails['linksRequestUsed']);
    }
    $('#linksRequestMax').html(mainUserDetails['linksRequestMax']);
    if (mainUserDetails['guestBlogsUsed'] > 0 && mainUserDetails['guestBlogsUsed'] !== mainUserDetails['guestBlogsMax']) {
        $('#guestBlogsUsed').html(mainUserDetails['guestBlogsUsed']);
    }
    $('#guestBlogsMax').html(mainUserDetails['guestBlogsMax']);
    $('.links_used_progress').css('width', mainUserDetails['linksRequestUsed'] * 100 / mainUserDetails['linksRequestMax'] + '%');
    $('.blogs_used_progress').css('width', mainUserDetails['guestBlogsUsed'] * 100 / mainUserDetails['guestBlogsMax'] + '%');
    if (mainUserDetails['guestBlogsMax'] === 0) {
        $('#guestBlogsUsedSection').hide();
    }
    $('.linkSuccessMessage').html("Once your article is live and published we will email you at " +
        mainUserDetails["email"]);

    $.getJSON(getApiUrl('getMyJsonPublishKeywordsWebsite'), function (data) {
        console.log('getMyJsonPublishKeywordsWebsite json ' + JSON.stringify(data));
        var list = data['list'];

        $("[id^=blogLinkKeyword]").empty().trigger("change");
        var mySelect2Option = $("[id^=blogLinkKeyword]").select2({
            tokenSeparators: [',', ', ', '\n'],
            selectOnClose: true,
            data: list,
            tags: true,
            placeholder: 'Enter a keyword to promote',
            "language": {
                "noResults": () => 'Enter a keyword to promote'
            },
        });
        // var mySelect2Option = $("#createBlogRequestLink #blogLinkKeyword").append('<option value="anotherchossen"> Custom Title</option>');
        mySelect2Option.trigger("change");
        $('#createBlogRequestLink .customTitle').parent().addClass('customTitleContntent');
        $('#createBlogRequestLink .customTitle').show();
        $('#createBlogRequestLink #blogLinkKeyword').on('select2:select', function (e) {
            var data = $(this).val();
            // var data = e.params.data;

            console.log(data);
            if (data==="anotherchossen") {
                $('#createBlogRequestLink .customTitle').show();
                $('#createBlogRequestLink .customTitle').parent().addClass('customTitleContntent');


            }else{
                $('#createBlogRequestLink .customTitle').val('');
                $('#createBlogRequestLink .customTitle').hide();
                $('#createBlogRequestLink .customTitle').parent().removeClass('customTitleContntent');
            }
        });
    });
}

function toggleAutoPilotLinks4u() {
    if (payingUser) {
        let autoPilot = $('#autoPilotLinks').prop('checked');
        console.log('toggleAutoPilot autoPilot ' + autoPilot)
        const url = getApiUrl('toggleAutoPilotUser?autoPilot=' + autoPilot);
        console.log('toggleAutoPilot url ' + url);
        $.get(url, function (data) {
            console.log('toggleAutoPilot ' + data);
            refreshUserDetails();
            fadeModal('Auto Pilot', 'Auto Pilot mode is set to ' + (autoPilot ? 'On' : 'Off'));
        });
    } else {
        showUpgradeModal('Upgrade your account to enable Auto Pilot Mode');
    }
}

function publishLink() {
    const formId = 'savePublishDetailsUser';
    if (!isDev()) {
        var result = ajaxSubmitFormGetFullResult(formId);
        console.log('result ' + result);
        refreshUserDetails();
        if (result && result.status && result.status.indexOf('Please fill') !== -1) {
            // console.log('result ' + JSON.stringify(result));
            showModal('Account Details', result.status, 'Close', '');
        } else {
            showLoadingProgressBar();
            console.log('result.list ' + JSON.stringify(result.list));
            if (result.list && result.list[0] && result.list[1]) {
                $('#firstLink').attr('href', "http://" + result.list[0] + "/business.html?" + mainUserDetails["wixUrl"]);
                $('#firstLink').html(result.list[0]);
                $('#secondLink').attr('href', "http://" + result.list[1] + "/business.html?" + mainUserDetails["wixUrl"]);
                $('#secondLink').html(result.list[1]);
            }
        }
    } else {
        showLoadingProgressBar();
    }
}

function saveUserDetails(btn) {
    console.log('saveUserDetails');
    $('#userDetailsDiv').html('');
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
        setUserDetailsValues();
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

function toggleFeatured(pageUrl, rowId) {
    console.log('toggleFeatured featured pageurl is ' + pageUrl);
    pageUrl = pageUrl.split('?')[0];
    const hostname = getHostname(pageUrl);
    $.ajax({
        type: 'POST',
        url: getApiUrl("toggleFeaturedListingUser"),
        data: "url=" + hostname,
        success: function (result) {
            console.log('toggleFeaturedListing result ' + result.status);
            if (result.status === 'added') {
                $('#featured' + rowId).html('<img height="24px" src="/assets/images/icon/featured-active.png">');
                fadeModal('Featured Listing is Live', 'Featured listing is live on ' + getFormattedExternalUrl(pageUrl));
            } else if (result.status === 'removed') {
                $('#featured' + rowId).html('<img height="24px" src="/assets/images/icon/featured-disabled.png">');
                fadeModal('Featured Listing was removed', 'Featured listing was removed from ' + getFormattedExternalUrl(pageUrl));
            } else if (result.status === 'limit') {
                console.log('limit')
                fadeModal('Featured Listing Limit', 'In your current package you can add up to ' + mainUserDetails['featuredListings'] + ' featured listings');
            }
        }
    });
}

function createLinkTable(json, linkStatus) {
    if (!hasAlertToShow(json)) {
        var listLength = json['list'].length;
        // console.log('listLength is ' + listLength);
        const tableId = '#' + (isShowHooray() ? 'hooray' : '') + 'monitoringLinkTable' + linkStatus;
        console.log('in createLinkTable listLength is ' + listLength)
        console.log('in createLinkTable tableId is ' + tableId)
        console.log('in createLinkTable linkStatus is ' + linkStatus)
        const featuredVisible = (linkStatus === 'Live' || linkStatus === 'Listing') && mainUserDetails['fixedListings'] && mainUserDetails['fixedListings'] > 0;
        console.log('in createLinkTable featuredVisible is ' + featuredVisible)
        var linksList = $(tableId).DataTable({
            "datatype": "json",
            responsive: true,
            "data": json['list'],
            rowId: 'id',
            "columns": [
                {
                    data: "pageUrl",
                    render: function (data, type, row) {
                        if (type === 'display' || type === 'filter') {
                            const hostname = getHostname(data);
                            const isOn = userFeaturedLinks && userFeaturedLinks.indexOf(hostname) !== -1;
                            return '<a id="featured' + row.id + '"' +
                                // ' data-bs-toggle="tooltip" data-bs-html="true" ' +
                                // ' data-bs-placement="top"\n' +
                                // ' title="Add my listing the Featured Listings section" ' +
                                // ' title="Create Featured Listing on ' + getFormattedExternalUrl(data.split('?')[0]) + '" ' +
                                ' href="javascript:toggleFeatured(\'' + data + '\', ' + row.id + ')">' + (isOn ? '<img height="25px" src="/assets/images/icon/featured-active.png"></a>' : '<img height="25px" src="/assets/images/icon/featured-disabled.png"></a>');
                            // return '<a id="star' + row.id + '" href="javascript:toggleFeatured(\'KeywordForWebsite\', ' + row.id + ', ' + data + ')">' + (data ? '<img src="/assets/images/icon/starFill.png"></a>' : '<img src="/assets/images/icon/star.png"></a>');
                        } else {
                            return data;
                        }
                    },
                    visible: featuredVisible
                },
                {
                    "data": "pageUrl",
                    "name": "pageUrl",
                    "title": "Website",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return data === 'Awaiting' ? 'Pending' : getFormattedUrl(data);
                    }
                },
                {
                    "data": "href",
                    "name": "href",
                    "title": "Point To",
                    "defaultContent": "",
                    'visible': linkStatus !== 'Blog',
                    // render: function (data, type, row) { return getFormattedUrl(data);}
                },
                {
                    "data": "pageTitle",
                    "name": "pageTitle",
                    "title": "Title",
                    "defaultContent": "",
                    'visible': linkStatus === 'Blog',
                },
                {
                    "data": "keywordName",
                    "name": "keywordName",
                    "title": "Keyword",
                    "defaultContent": "",
                    'visible': true,
                },
                // {
                //     "data": "orderLinkType",
                //     "name": "orderLinkType",
                //     "title": "Type",
                //     "defaultContent": "",
                //     'visible': true,
                //     render: function (data, type, row) {
                //         if (type === 'display' || type === 'filter') {
                //             if (data && (data === 'Article' || data === 'Blog Post')) {
                //                 data = 'Blog Post&nbsp;&nbsp;<span class="text-muted text-decoration-underline updateBlogPost" style="cursor: pointer">Update</span>';
                //             } else {
                //
                //             }
                //         }
                //         return data;
                //     }
                // },
                {
                    "data": "enabled",
                    "name": "enabled",
                    "title": "Live",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        if (type === 'display' || type === 'filter') {
                            return data && data == true ? "Live" : "-";
                        }
                    }
                },
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
                    data: "id", "name": "id", "title": "Enhance",
                    'visible': true,
                    // 'visible': (linkStatus === 'Blog'),
                    render: function (data, type, row) {
                        let html = '';
                        if (row.orderLinkType && row.pageUrl && row.pageUrl !== 'Pending') {
                            if (row.orderLinkType === 'Article' || row.orderLinkType === 'Blog Post') {
                                html = '<span class="text-muted text-decoration-underline updateBlogPost" style="cursor: pointer"><img src="/assets/images/icon/--update.png" width="20px" height="20px" alt="Update"></span>&nbsp;&nbsp;';
                            } else {
                                html = '<span class="text-muted text-decoration-underline updateListings" style="cursor: pointer"><img src="/assets/images/icon/--update.png" width="20px" height="20px" alt="Update"></span>&nbsp;&nbsp;';
                            }
                        }

                        return html;
                    }
                },
                {
                    data: "id", "name": "id", "title": "Delete", 'visible': true,
                    render: function (data, type, row) {
                        return '<a class="no-click" style="cursor: pointer" onclick="deleteLink(' + row.id + ')"><img src="/assets/images/icon/remove.png" alt="Remove"></a>';
                    }
                }
            ],
            // "order": [[1, "asc"]],
            destroy: true,
            // buttons: ['copy', 'excel', 'print', {
            //   extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
            // }],
            buttons: [{
                extend: 'collection',
                text: 'Export',
                className: 'linksExportButton',
                buttons: [
                    {extend: 'excel', text: 'Export To Excel', className: 'linksExcelButton'},
                    {extend: 'copy', text: 'Copy to Clipboard', className: 'linksCopyButton'},
                    {extend: 'pdf', text: 'Export To PDF', className: 'linksPDFButton'},
                ]
            }
            ],

            "dom": '<"dt-buttons"Bf><"clear">firtlp',
            info: false,
            "bFilter": true,
            fixedHeader: true,
            deferRender: true,
            paging: false,
            order: [[6, 'desc']],
            // paging: listLength > 100,
            // scrollY: 700,
            // scrollCollapse: true,
            // scroller: listLength > 100,
            "aoColumnDefs": [{
                "searchable": false,
                "targets": [0]
            }],
            "initComplete": function (settings, json) {
            }
        });
        console.log('enable table row click')
        $(tableId + ' tbody tr').on('click', 'td', function () {
            // $('#usersTable tbody tr').on('click', 'td:first-child', function () {
            console.log('tbody click')
            let tr = $(this).closest('tr');
            let td = $(this).closest('td');
            let row = linksList.row(tr);
            let data = row.data();
            const tdHtml = td.html();
            if (tdHtml.indexOf('updateListings') !== -1) {
                // openUpdateSettingsModal();
                $('#listings-details-tab').click();
            } else if (data.orderLinkType && (data.orderLinkType === 'Article' || data.orderLinkType === 'Blog Post')) {
                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                } else {

                    if (tdHtml.indexOf('updateBlogPost') !== -1 && tdHtml.indexOf('no-click') === -1) {
                        row.child('<div id="modifyArticleSection' + row.id() + '"><span class="spinner-border text-primary"></span></div>', 'childClass').show();
                        tr.addClass('shown');
                        modifyArticle(row.id());
                    }
                }
            } else {
            }
        });
        adjustExportButtons('tableSearch', linksList);
        $('[data-bs-toggle="tooltip"]').tooltip();
    } else {
        $('#link tbody').html("Create your first link now");
    }
}

function loadMonitoredLinks() {
    console.log('start loadMonitoredLinks')
    $.getJSON(getApiUrl('jsonByOnlyBlogsLink'), function (json) {
        console.log('jsonByOnlyBlogsLink is ' + JSON.stringify(json));
        createLinkTable(json, 'Blog');
        console.log(json['list'].length);
        if (json['list'] && json['list'].length > 0) {
            $('.createNewBlogPostBtnBtm').hide();
            $('.createNewBlogPostBtnTop').show(); 
        }else{ 
            $('.createNewBlogPostBtnBtm').show();
            $('.createNewBlogPostBtnTop').hide();

        }
    });
    $.getJSON(getApiUrl('jsonExcludeBlogsLink'), function (json) {
        console.log('jsonExcludeBlogsLink is ' + JSON.stringify(json));
        createLinkTable(json, 'Listing');
    });
    // if (!isShowHooray()) {
    //     $.getJSON(apiUrl + 'jsonByAwaitingLink?url=', function (json) {
    //         console.log('jsonByAwaitingLink is ' + JSON.stringify(json));
    //         if (json['list'] && json['list'].length > 0) {
    //             createLinkTable(json, 'Pending');
    //         } else {
    //             $('.pendingTableDiv').hide();
    //         }
    //     });
    // }
}

function submitLinkRequestForm() {
    const result = ajaxSubmitForm('createRequestLink');
    // console.log('result' + result);
    if (!result) {
        $('#linksBuildingForm').hide();
        $('#linksBuildingSuccess').show();
        loadMonitoredLinks();
    } else {
        showModal("Message", result, "Close", "");
    }
}

function submitBlogLinkRequestForm() {
    if ($('#articleTitle').val() !== '') {
        const result = ajaxSubmitForm('createBlogRequestLink');
        // console.log('result' + result);
        if (!result || result === 'OK') {
            $('#blogLinksBuildingForm').hide();
            $('#blogLinksBuildingSuccess').show();
            loadMonitoredLinks();
        } else if (result && (result === 'NoCredit' || result.indexOf('0 links left') !== -1) && !isShabbat) {
            const msgText = "Your blog posts credits are already used. You can Upgrade your subscription or Purchase Pay As You Go Credits.";
            showModal('Sorry', msgText, 'Pay As You Go', '', 'Upgrade Subscription');
            $('div#modalMessage button#modalFirstButton').click(function () { closeModalMessage(); showPayAsYouGoModal(); });
            $('div#modalMessage a#modalConfirmBtn').attr("href", "javascript: closeModalMessage(); $('#upgrade-tab').click() ");
        } else {
            showModal("Message", result, "Close", "");
        }
    } else {
        fadeModal('', 'Please choose a title for your blog post');
    }
}

$(document).ready(function () {
    $('#expDate').attr('min', moment().format('YYYY') + '-' + moment().format('MM'));
    $('#expDate').attr('value', moment().format('YYYY') + '-' + moment().format('MM'));
});

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
            '<div class="card mb-4 rounded-3 shadow-sm ' + (packageName == item['planName'] ? 'border-primary' : '') + '">' +
            '<div class="card-header py-3 ' + (packageName == item['planName'] ? 'bg-primary border-primary' : '') + '">' +
            '<h4 class="my-0 fw-normal ' + (packageName == item['planName'] ? 'text-white' : '') + '"><span class="sm2">' + item['planName'] + '</span></h4>' +
            '<h1 class="card-title pricing-card-title">' + (!planPrice || planPrice === 0 ? "FREE" : item['planPriceCurrency'] + (yearly ? discountedPlanPrice : planPrice) + '<small class="text-muted fw-light">/mo</small>') +
            (yearly && planPrice > 0 ? ('<s>' + item['planPriceCurrency'] + planPrice + '</s>') : '') + ' </h1>' +
            (packageName === item['planName'] && !blockedUntilPayment ? '<div style="visibility:hidden">' : '') +
            getButton(item, realPrice, yearly) +
            (packageName === item['planName'] && !blockedUntilPayment ? '</div>' : '') +
            '</div>' +
            '<div class="card-body">' +
            '<ul class="list-unstyled mt-3 mb-4" style="text-align: left;list-style: none;">' +
            (item['fixedListings'] === 1 ? ('<li> One Premium Listing</li>') : '') +
            (item['fixedListings'] === 1 ? ('<li> One Premium Blog Post</li>') : '') +
            (item['fixedListings'] > 1 ? ('<li> ' + item['fixedListings'] + ' Premium Listings</li>') : '') +
            (item['featuredListings'] > 0 ? ('<li> ' + item['featuredListings'] + ' Featured Listings</li>') : '') +
            (item['planLinksBuilder'] > 0 ? ('<li> ' + item['planLinksBuilder'] + ' New Listings / mo</li>') : '') +
            (item['guestBlogsMax'] > 0 ? ('<li> ' + item['guestBlogsMax'] + ' New Blog Posts / mo</li>') : '') +
            // (item['planLinksBuilder'] > 0 ? ('<li>Free Listings</li>') : '<li>Limited Free Listings</li>') +
            // (item['planLinksBuilder'] > 0 ? ('<li>Directories & Index Publish</li>') : '') +
            // (item['planLinksBuilder'] > 0 ? ('<li>Links Building</li>') : '') +
            // (item['planLinksBuilder'] > 0 ? ('<li>Hot Keywords</li>') : '') +
            // (item['guestBlogsMax'] > 0 ? ('<li>Social Bookmarking</li>') : '') +
            // (item['guestBlogsMax'] > 0 ? ('<li>Keywords Support</li>') : '') +
            // (item['guestBlogsMax'] > 0 ? ('<li>' + item['guestBlogsMax'] + ' Guest Blogs Link / mo</li>') : '') +
            // (item['guestBlogsMax'] > 1 ? ('<li>Full SEO & Keywords Support</li>') : '') +
            // (item['planLinksBuilder'] > 0 ? ('<li> ' + item['planLinksBuilder'] + ' Listings / mo</li>') : '') +
            // (item['guestBlogsMax'] > 0 ? ('<li> ' + item['guestBlogsMax'] + ' Guest Blogs Link / mo</li>') : '') +
            // '<li>Limited Free Listings</li>' +
            // (realPrice > 0 ? '<li>2 Extra links</li>' : '') +
            '</ul>' +
            '<h2 class="annuallyPrice">' + (realPrice > 0 ? '$<b>' + realPrice + '</b>/' + (yearly ? 'year' : 'mo') : 'Free') + '</h2>' +
            // getButton(item, realPrice, yearly) +

            '</div>' +
            '</div>' +
            '</div>';
    }
    $('#plans main div').html(html);
}

$("button#smx_myBtn_1").click(function () {
    $("#smx_more_1").slideToggle("slow");
    $("#smx_dots_1").slideToggle("slow");
});
$("button#smx_myBtn").click(function () {
    $("#smx_more").slideToggle("slow");
    $("#smx_dots").slideToggle("slow");
});
function openUpdateSettingsModal(link) {
    $('#signupDiv').html('');
    // currPageUrlLink = link;
    openModal('/assets/htmls/links4uSettings.html', 'Website Listing Information');
}
function initUpdateSettingsModal(link) {
    $('#signupDiv').html('');
    // currPageUrlLink = link;
    ajaxLoadToDiv('/assets/htmls/links4uSettings.html', 'listings-details-form');
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function showReviews() {
    $.getJSON('assets/data/reviewsLinks4uHome.json', function (response) {
        console.log('showReviews json ' + JSON.stringify(response));

        const json = shuffle(response['list']);
        var reviewHtml = '';
        for (let i = 0; i < json.length; i+=2) {

            reviewHtml+='<div><div class="reviewDivBox">' +
                '<div class="reviewHeaders">' +
                '<div class="reviewsContentsLeft">'+
                '<h6>'+  json[i]['reviewsCompanyName'] + '</h6>'+
                '<div class="reviewImagess'+  json[i]['reviewRating'] + '"></div>'+
                '</div>'+
                '<div class="counterReview"><span>'+json[i]['reviewsCount']+'</span>/<span class="counterReviewTotal">'+json.length+'</span></div>'+
                '</div>'+
                '<div class="reviewsContentsRight"><div>'+
                '<div class="reviewsImage">'+
                '<img src="'+json[i]['reviewsImage']+'">'+
                '</div>'+
                '<h6>'+  json[i]['reviewsTitle'] + '</h6>'+
                '<div>' +  json[i]['reviewsDescription'] +
                '</div></div></div>'+
                '</div> ' ;
            try{
                reviewHtml+=' <div class="reviewDivBox">' +
                    '<div class="reviewHeaders">' +
                    '<div class="reviewsContentsLeft">'+
                    '<h6>'+  json[i+1]['reviewsCompanyName'] + '</h6>'+
                    '<div class="reviewImagess'+  json[i+1]['reviewRating'] + '"></div>'+
                    '</div>'+
                    '<div class="counterReview"><span>'+json[i+1]['reviewsCount']+'</span>/<span class="counterReviewTotal">'+json.length+'</span></div>'+
                    '</div>'+
                    '<div class="reviewsContentsRight"><div>'+
                    '<div class="reviewsImage">'+
                    '<img src="'+json[i+1]['reviewsImage']+'">'+
                    '</div>'+
                    '<h6>'+  json[i+1]['reviewsTitle'] + '</h6>'+
                    '<div>' +  json[i+1]['reviewsDescription'] +
                    '</div></div></div>'+
                    '</div></div>' ;
            } catch(err){}

        }
        console.log('reviewHtml ' + reviewHtml)
        $('.myreviewsdivs').html(reviewHtml) ;
        var reviewsdivs = $('.myreviewsdivs>div');
        var reviewsnow = 0; // currently shown div

        reviewsdivs.hide().first().show(); // hide all divs except first

        $( "body" ).delegate( ".myreviewsdivs_btn button[name=next]", "click", function() {

            reviewsdivs.eq(reviewsnow).hide();
            reviewsnow = (reviewsnow + 1 < reviewsdivs.length) ? reviewsnow + 1 : 0;
            console.log(reviewsnow);
            reviewsdivs.eq(reviewsnow).addClass('aassssss'); // show next
            reviewsdivs.eq(reviewsnow).show(); // show next
        });

        $( "body" ).delegate( ".myreviewsdivs_btn button[name=prev]", "click", function() {
            reviewsdivs.eq(reviewsnow).hide();
            reviewsnow = (reviewsnow > 0) ? reviewsnow - 1 : reviewsdivs.length - 1;
            reviewsdivs.eq(reviewsnow).show(); // show previous
        });
        $(document).keydown(function(event) {
            if (event.which === 39) {
                // Right arrow key was pressed
                $( ".reviewsContents .myreviewsdivs_btn button[name=next]").trigger('click');
                // Add your code to handle right arrow key press here
            } else if (event.which === 37) {
                // Left arrow key was pressed
                $( ".reviewsContents .myreviewsdivs_btn button[name=prev]").trigger('click');
                // Add your code to handle left arrow key press here
            }
        });
    });
}