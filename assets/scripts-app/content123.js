$(document.head).append('<link rel="icon" type="image/x-icon" href="/assets/images/content123Favicon.ico">');
let contentTypes = JSON.parse('{"data":null,"list":[ { "id": 100110, "value": "1", "imageurl": "assets/images/content123/article.png", "title": "Article / Blog Post","type": "hot" }, { "id": 100111, "value": "2", "imageurl": "assets/images/content123/business-idea.png", "title": "Business Ideas","type": "hot" }, { "id": 100112, "value": "3", "imageurl": "assets/images/content123/tutorial.png", "title": "Tutorial","type": "hot" }, { "id": 100113, "value": "4", "imageurl": "assets/images/content123/landing-page.png", "title": "Landing Pages","type": "hot" }, { "id": 100114, "value": "5", "imageurl": "assets/images/content123/tips.png", "title": "Tips","type": "hot" }, { "id": 100115, "value": "6", "imageurl": "assets/images/content123/FAQ.png", "title": "FAQ Page","type": "normal" }, { "id": 100116, "value": "7", "imageurl": "assets/images/content123/bxs_contact.png", "title": "Contact Us Page","type": "normal" }, { "id": 100117, "value": "8", "imageurl": "assets/images/content123/mdi_account-service.png", "title": "Services Page ","type": "normal" }, { "id": 100118, "value": "9", "imageurl": "assets/images/content123/mdi_cta.png", "title": "Call to Action Text","type": "normal" }, { "id": 100119, "value": "10", "imageurl": "assets/images/content123/Social-media.png", "title": "Social Media Post","type": "normal" }, { "id": 100120, "value": "11", "imageurl": "assets/images/content123/product-page.png", "title": "Product Page","type": "normal" }, { "id": 100121, "value": "12", "imageurl": "assets/images/content123/teaser.png", "title": "Teasers","type": "normal" }, { "id": 100122, "value": "13", "imageurl": "assets/images/content123/about-us.png", "title": " About Us Page ","type": "normal" }, { "id": 100123, "value": "14", "imageurl": "assets/images/content123/newsletter.png", "title": " Marketing Newsletter ","type": "normal" }, { "id": 100124, "value": "15", "imageurl": "assets/images/content123/guide.png", "title": "How To Guide","type": "normal" }, { "id": 100125, "value": "16", "imageurl": "assets/images/content123/terms.png", "title": "Terms and Condition","type": "normal" }, { "id": 100126, "value": "17", "imageurl": "assets/images/content123/privacy.png", "title": "Privacy Policies","type": "normal" }, { "id": 100127, "value": "18", "imageurl": "assets/images/content123/whitepaper.png", "title": "Whitepapers","type": "normal" }, { "id": 100128, "value": "19", "imageurl": "assets/images/content123/bxs_report.png", "title": "Research Report","type": "normal" }, { "id": 100129, "value": "20", "imageurl": "assets/images/content123/news.png", "title": "News and Updates","type": "normal" }, { "id": 100130, "value": "21", "imageurl": "assets/images/content123/casestudies.png", "title": "Case Studies","type": "normal" }],"list2":null,"map":null,"map2":null,"obj":null,"page":0,"records":0,"rows":0,"sidx":"dateCreated","sord":"desc","status":"success","total":0}');

function showArticleOrderStepper() {
    var stepperFormEl = document.querySelector('#stepperForm')
    stepperForm = new Stepper(stepperFormEl, {
        animation: true,
        linear: true && !isDevOrLocalhost()
    })

    stepperFormEl.addEventListener('show.bs-stepper', function (event) {
        // You can call preventDefault to stop the rendering of your step
        // event.preventDefault()

        setLineBgColor(event.detail.indexStep);
        setLineChangeContent(event.detail.indexStep);
        // console.warn(event.detail.indexStep)

    })

    var btnNextList = [].slice.call(document.querySelectorAll('.btn-next-form'))
    btnNextList.forEach(function (btn) {
        btn.addEventListener('click', function () {
            stepperForm.next()
        })
    })

    $.get(assetsUrl + 'assets/data/teasers.txt', function (data) {
        tipsArray = data.split('\n');
    });

    loadLanguages();
}

function initArticleOrders() {
    loadArticleOrders();
    showUsedAndMax();
}

function contentTypeList() {
    var htmlHot = '';
    var html = '';
    let json = contentTypes;

    for (i = 0; i < json.list.length; i++) {
        if (json.list[i].type == 'hot') {
            htmlHot += '<div class="col"> <div class="content_type_item"> <input type="radio" value="' + json.list[i].title + '" name="contenttype"> <div> <img src="' + json.list[i].imageurl + '" alt="icon"> <p>' + json.list[i].title + '</p> </div> </div> </div>';
        }
        if (json.list[i].type == 'normal') {
            html += '<div class="col"> <div class="content_type_item"> <input type="radio" value="' + json.list[i].title + '" name="contenttype"> <div> <img src="' + json.list[i].imageurl + '" alt="icon"> <p>' + json.list[i].title + '</p> </div> </div> </div>';
        }
    }

    $('#hotcontent').append(htmlHot);
    $('#hotcontentnormal').append(html);
}

function generateArticleTopics(btn, prompt) {
    replaceBtnWithLoader(btn);
    mainKeywordVal = prompt;
    if (!isDev()) {
        const url = getApiUrl('getMyJsonOpenAiIdeasLink?keyword=' + encodeURIComponent(prompt));
        console.log('initTitleIdeas url is ' + url);
        $.getJSON(url, function (data) {
            addIdeas(data, btn);
        });
    } else {
        addIdeas(titleIdeasDevJson, btn);
    }
}

let contentTypeVal;

function initStep2(btn) {
    contentTypeVal = $('input[name="contenttype"]:checked').val();
    console.log('contentTypeVal ' + contentTypeVal)
    if (!contentTypeVal) {
        contentTypeVal = 'Blog Post';
    }
    // if (contentTypeVal) {
        const prompt = $('#websiteUrl').val();
        $('.contentTypeVal').html(contentTypeVal);
        $('.domainOrKeywordVal').val(prompt)
        mainKeywordVal = prompt;
        if (contentTypeVal === 'Article / Blog Post') {
            $('#articleView').show();
            $('#otherContentView').hide();
            $('.teasers-box').randomText(tipsArray, 10000);
            generateArticleTopics(btn, prompt);
        } else {
            $('#otherContentView').show();
            $('#articleView').hide();
            stepperForm.next();
        }
    // } else {
    //     showModal('Oops', 'Please choose content type to order', 'OK', '');
    // }
}

function initStep3(btn) {
    console.log('$(\'#articleTitle\').val() ' + $('#articleTitle').val());
    console.log('$(\'#domainOrKeyword2\').val() ' + $('#domainOrKeyword2').val());
    console.log('contentTypeVal ' + contentTypeVal);
    let title = $('#articleTitle').val() !== '' ? $('#articleTitle').val() : $('#domainOrKeyword2').val();
    mainKeywordVal = contentTypeVal === 'Article / Blog Post' ? mainKeywordVal : $('#domainOrKeyword2').val();
    if (verifyNotEmptyVal(mainKeywordVal, 'Please enter a keyword or domain')) {
        let data = getPostParams('title=' + title + '&contentType=' + contentTypeVal +
            // '&keyword=' + $('#domainOrKeyword2').val() +
            '&language=' + $('#language').val() +
            '&wordsCount=' + $('#wordsCount').val());
        console.log(data);
        $('#contentTypeLang').html($('#language').val());
        $.ajax({
            type: 'POST',
            url: apiUrl + 'createArticleLink?' + data,
            async: false,
            success: function (json) {
                console.log('success ' + JSON.stringify(json));
                let status = json.status;
                if (status && status === 'NoCredit') {
                    showUpgradeModal("You don't have enough credits to publish a new article. Would you like to upgrade?");
                } else {
                    submitArticleDetails(btn);
                    // stepperForm.next();
                    $('.imagesByKeyword').val(mainKeywordVal);
                    loadImagesByQuery(mainKeywordVal);
                }
                refreshUsage();
            }
        });
        $(btn).show();
    }
}

let articleOrdersTable;

function loadArticleOrdersFromJson(json) {
    if (!hasAlertToShow(json)) {
        var listLength = json['list'].length;
        if (listLength === 0) {
            $('#order-tab').click();
            resetStepper();
        }
        // console.log('listLength is ' + listLength);
        articleOrdersTable = $('#articleOrdersTable').DataTable({
            "datatype": "json",
            "data": json['list'],
            rowId: 'id',
            "columns": [
                {
                    "data": "title",
                    "name": "title",
                    "title": "Content Title",
                    // "defaultContent": "Google announces major breakthrough in quantum computing",
                    'visible': true
                },
                {
                    "data": "contentType",
                    "name": "contentType",
                    "title": "Content Type",
                    // "defaultContent": "Articel",
                    'visible': true
                },
                {
                    "data": "language",
                    "name": "language",
                    "title": "Language",
                    // "defaultContent": "English",
                    'visible': true,
                },
                {
                    "data": "wordsCount",
                    "name": "wordsCount",
                    "title": "Words",
                    // "defaultContent": "400",
                    'visible': true,
                },
                {
                    "data": "dateCreated",
                    "name": "dateCreated",
                    "title": "Order Date",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        return getFormattedDate(data);
                    }
                },
                {
                    "data": "action",
                    "name": "action",
                    "title": "Action",
                    'visible': true,
                    'class': 'text-center',
                    render: function (data, type, row) {
                        return "<button class='btn btn-info btn-sm m-1' data-bs-toggle='tooltip' data-bs-placement='top' title='View' onclick='articleOrderTableClick(1)'><img src='/assets/images/content123/eye.png' alt='icon'/>" +
                            "</button> <button class='btn btn-primary btn-sm m-1' data-bs-toggle='tooltip' data-bs-placement='top' title='Clipboard' onclick='articleOrderTableClick(2)'><img src='/assets/images/content123/clipboard-copy.png' alt='icon'/></button>" +
                            "<button class='btn btn-success btn-sm m-1' data-bs-toggle='tooltip' data-bs-placement='top' title='Download' onclick='articleOrderTableClick(3)'><img src='/assets/images/content123/download.png' alt='icon'/></button>";
                    }
                },
            ],
            // "order": [[1, "asc"]],
            destroy: true,
            buttons: ['copy', 'excel', 'print', {
                extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
            }],
            'fnCreatedRow': function (nRow, aData, iDataIndex) {
                $(nRow).attr('onclick', 'articleOrderTableClick(1)');
                $(nRow).attr('style', 'cursor:pointer');
            },
            "dom": '<"dt-buttons"Bf><"clear">firtlp',
            // info: false,
            // "bFilter": true,
            // // fixedHeader: true,
            // deferRender: true,
            // paging: listLength > 100,
            // scrollY: 700,
            // scrollCollapse: true,
            // scroller: listLength > 100,
            info: false,
            fixedHeader: false,
            deferRender: true,
            paging: false,
            "bFilter": true,
            "aoColumnDefs": [{
                "searchable": false,
                "targets": [0]
            }],
            "ordering": false,
        });
        $('[data-bs-toggle="tooltip"]').tooltip();
        adjustExportButtons('tableSearch', articleOrdersTable);
    }
}

function articleOrderTableClick(operation) {
    let row = articleOrdersTable.row($(event.target).closest('tr'));
    const articleOrderId = row.id();
    if (articleOrderId) {
        if (!isDev()) {
            $.getJSON(getApiUrl('getMyJsonRawArticleLink?id=' + articleOrderId), function (json) {
                console.log('getMyJsonRawArticleLink ' + JSON.stringify(json));
                if (json['obj']) {
                    if (operation === 1) {
                        showModal('Content Overview', json['obj'].replaceAll('\n', '<br>'), 'Download Word', 'Copy to Clipboard')
                        $('div#modalMessage button#modalSecondButton').click(function () {
                            copyToClipboard(json['obj']);
                        });
                        $('div#modalMessage button#modalFirstButton').click(function () {
                            $("div#modalMessage .modal-body").wordExport();
                        });
                    } else if (operation === 2) {
                        copyToClipboard(json['obj']);
                    } else if (operation === 3) {
                        $('.finalArticleText').html(json['obj']);
                        $('.finalArticleText').wordExport();
                    }
                }
            });
        } else {
            showModal('Content Overview', rawArticleDevJson['obj'], 'Download Word', 'Copy to Clipboard')
        }
    }
}

function loadArticleOrders() {
    console.log('start loadArticleOrders')
    $.getJSON(getApiUrl('jsonArticleOrder'), function (json) {
        console.log('jsonArticleOrder is ' + JSON.stringify(json));
        loadArticleOrdersFromJson(json);
    });
}

function changeDomain(newDomain) {
    console.log('changeDomain newDomain is ' + newDomain)
    $.getJSON(getApiUrl('changeDomainUser?domain=' + newDomain), function (data) {
        if (data['status']) {
            if (data['status'] === 'Updated') {
                fadeInAndOut('.domain-saved');
            } else {
                showModal('Result', data['status'], 'OK', '');
            }
        }
    });
}

function loadImagesContent(data) {
    console.log('getMyJsonImagesUrlsLink json ' + JSON.stringify(data));
    $('#imagesSection_Content123').html('');
    var list = data['list'];

    if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            if (list.length < 10 || i < 9) {
                $('#imagesSection_Content123').append('<div class="col-md-6 col-lg-4 mb-4"><div class="image_box_item"><input type="checkbox" value="' + [i] + '" class="checkbox_iamge" id="image' + [i] + '" hidden /><label class="article-image" for="image' + [i] + '" style="background:url(' + list[i] + ') no-repeat;"><img src="' + list[i] + '" class="d-none" /></label>' +
                    '<button data="' + list[i] + '" class="btn btn-light text-primary downloadimg" id="downloadImage" type="button" ><img src="/assets/images/content123/ic_baseline-file-download.png" alt="download"/> Download</button></div></div>');
            }
        }

        if (list.length > 15) {
            $('.extraNextButton').show();
        } else {
            $('.extraNextButton').hide();
        }

        let checkBox = [];
        console.log(checkBox);

        $("body").delegate(".checkbox_iamge", "change", function () {
            $('.checkbox_iamge').not(this).prop('checked', false);
            checkBox.push($('.checkbox_iamge:checked').val());
            // alert($('.checkbox_iamge:checked').val());
        });

        $("body").delegate(".article-image", "click", function () {
            const src = $(this).attr('src');
            $('#articleImage').val(src);
            $(this).parent().toggleClass("active");
        });
    }
}

function loadImagesnew(data) {
    console.log('getMyJsonImagesUrlsLink json ' + JSON.stringify(data));
    $('#imagesSection_Content123').append('');
    var list = data['list'];
    var pagenon = $("#imagepagination").val();
    var newpageno = parseInt(pagenon) + 5;
    if (list.length < newpageno) {
        $('#loadmore_image').hide();
        $('.loadmore').hide();

    }
    for (let i = 0; i < list.length; i++) {
        if (i >= pagenon && i < newpageno) {
            $('#imagesSection_Content123').append('<div class="col-md-6 col-lg-4 mb-4"><div class="image_box_item"><input type="checkbox" value="' + [i] + '" class="checkbox_iamge" id="image' + [i] + '" hidden /><label for="image' + [i] + '" style="background:url(' + list[i] + ') no-repeat;" src="' + list[i] + '" class="article-image"></label><button class="btn btn-light text-primary"><img src="/assets/images/content123/ic_baseline-file-download.png" alt="download"/> Download</button></div></div>');
        }

    }
    $("#imagepagination").val(newpageno);

    let checkBox = [];
    console.log(checkBox);

    $('.checkbox_iamge').on('change', function () {
        $('.checkbox_iamge').not(this).prop('checked', false);
        checkBox.push($('.checkbox_iamge:checked').val());
        // alert($('.checkbox_iamge:checked').val());
    });
    $('.article-image').click(function () {
        const src = $(this).attr('src');
        $('#articleImage').val(src);
        $(this).parent().toggleClass("active");
    });

    createBlogDomainsSelect();
}

$(document).ready(function () {
    isContent123UI = true;
    $("body").delegate("#loadmore_image", "click", function () {
        var pagenon = $("#imagepagination").val();
        var newpageno = parseInt(pagenon) + 5;

        if (!isDev()) {
            $.getJSON(getApiUrl('getMyJsonImagesUrlsLink'), function (data) {
                loadImagesContent(data);

            });
        } else {
            loadImagesnew(imagesDevJson);
        }
    });
});

function setLineChangeContent(i) {
    if (i == 0) {
        $('#changecontenttype').html('<p>Choose which type of content you would like to order</p>')
    }
    if (i == 1) {
        $('#changecontenttype').html('<p>Enter your promoted keyword to generate content for your website</p>')
    }
    if (i == 2) {
        $('#changecontenttype').html('<p>You can choose and Download this image to insert on your article or you can Skip it</p>')
    }
    if (i == 3) {
        $('#changecontenttype').html('<p>You can download or copy the content to your website. This content automatically saved by the system.</p>')
    }
}

$(document).ready(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
    $('.regenerate_step').hide();
    $('.download_artical').click(function () {
        $("#final_content_artical").wordExport();
    });

    $("body").delegate(".downloadimgs", "click", function () {
        addDownloadBtn();
    });


});
$(".navbar-nav .nav-link").click(function () {
    $(".navbar-collapse").removeClass("show");
});
$(document).ready(function () {
    $("body").delegate('.content_type_item input[type="radio"]', "change", function () {

        $('.content_type_item input[type="radio"]').parent().removeClass("checked");
        if ($(this).is(":checked")) {
            $(this).parent().addClass("checked");
        }
    });
});

let showTutorial = true;

$(document).ready(function () {
    console.log('location.toString() is ' + location.toString());
    $('.logoutLink').attr('href', getApiUrl('logoutGeneric'));
    initScreenView();
    setAjaxProgressBar();
});

function initScreenView() {
    let showSignup = mainUserDetails['keywordsUsed'] === 0 && mainUserDetails['linksUsed'] === 0;
    console.log('showSignup ' + showSignup);
    // for fast development ad testing
    if (isDev()) {
        showSignup = true;
        payingUser = true;
        setLineBgColor(0);
    } else {
        // showTutorial = false;
    }
    if (isDev()) {
        let json = '{"Starter":{"yearlyPrice":null,"planLinks":20,"planPriceCurrency":"$","planResearches":5,"planLinksBuilder":0,"guestBlogsMax":0,"packageId":67,"planName":"Starter","planWebsites":1,"planKeywords":3,"planPrice":0},"Premium":{"yearlyPrice":480,"planLinks":200,"planPriceCurrency":"$","planResearches":10,"planLinksBuilder":0,"guestBlogsMax":0,"packageId":68,"planName":"Premium","planWebsites":1,"planKeywords":50,"planPrice":40},"Guru":{"yearlyPrice":1200,"planLinks":1000,"planPriceCurrency":"$","planResearches":10,"planLinksBuilder":12,"guestBlogsMax":0,"packageId":69,"planName":"Guru","planWebsites":1,"planKeywords":250,"planPrice":100},"Business":{"yearlyPrice":1200,"planLinks":5000,"planPriceCurrency":"$","planResearches":10,"planLinksBuilder":60,"guestBlogsMax":3,"packageId":70,"planName":"Business","planWebsites":1,"planKeywords":1000,"planPrice":300}}';
        allPlans = JSON.parse(json);
        drawPlans();
    } else {
        initPlans();
    }
    if (showTutorial) {
        $('button#tutorial').show();
    } else {
        $('button#tutorial').hide();
    }

    showApp();
}

function showApp() {
    window.scrollTo(0, 0);
    activeTab = 'articles';
    $('#websiteUrl').val(mainUserDetails['wixUrl']);
    contentTypeList();
    handleUpgradeViews();
    $('.upgrade-button').hide();
    $('#upgrade-tab').hide();
    $('.pay-as-you-go-link').hide();
    payingUser = true;
    initArticleOrders();
    showArticleOrderStepper();
    // if (isTestingMode()) {
        showHeaderCountdown("1 December 2023 12:00:00 GMT+02:00", 'BDF6FridaySale');
    // }
}

function setAjaxProgressBar() {
    $(document).ajaxStart(function () {
        // $('.spinner-border').show();
    });
    $(document).ajaxStop(function () {
        $('.regenerate_step').hide();
        $('.progress_step:not(.article_progress_step)').hide();
    });
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
        const yearlyPrice = item['yearlyPrice'] / 12;
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

$(document).ready(function () {
    $('#expDate').attr('min', moment().format('YYYY') + '-' + moment().format('MM'));
    $('#expDate').attr('value', moment().format('YYYY') + '-' + moment().format('MM'));
});
