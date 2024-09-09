function createKeywordsOnChangeTrigger() {
    $("[id^=keyword]").keyup(function () {
        const articleSelector = modifyMode ? 'div#modifyArticleSection ' : '' + 'div.finalArticleText';
        if (!articleText) {
            articleText = $(articleSelector).html();
        }
        console.log('articleText ' + articleText)
        const keyword = $(this).val();
        console.log('keyword ' + keyword)
        // let href = $(modifyMode ? 'div#modifyArticleSection ' : '' + "#linkHrefArticle").val();
        let finalArticleText = articleText.replaceAll(keyword, '<span class="fw-bold">' + keyword + '</span>');
        // let finalArticleText = articleText.replace(keyword, '<a href="' + href + '" target="_blank">' + keyword + '</a>');
        $(articleSelector).html(finalArticleText);
    });
}

function showArticleStepper() {
    var stepperFormEl = document.querySelector('#stepperForm')
    stepperForm = new Stepper(stepperFormEl, {
        animation: true,
        linear: false
    })

    stepperFormEl.addEventListener('show.bs-stepper', function (event) {
        // You can call preventDefault to stop the rendering of your step
        // event.preventDefault()
        setLineBgColor(event.detail.indexStep);
        // console.warn(event.detail.indexStep)
    })

    var btnNextList = [].slice.call(document.querySelectorAll('.btn-next-form'))
    btnNextList.forEach(function (btn) {
        btn.addEventListener('click', function () {
            stepperForm.next()
        })
    })
    fillPublishDetailsForm();
    createKeywordsOnChangeTrigger();

    $.get(assetsUrl + 'assets/data/teasers.txt', function (data) {
        tipsArray = data.split('\n');
    });
}

function createPublishKeywordSelect() {
    $.getJSON(getApiUrl('getMyJsonPublishKeywordsWebsite'), function (data) {
        console.log('getMyJsonPublishKeywordsWebsite json ' + JSON.stringify(data));
        var list = data['list'];
        // list.unshift('');

        $("[id^=blogLinkKeyword]").empty().trigger("change");
        $("[id^=blogLinkKeyword]").select2({
            tokenSeparators: [',', ', ', '\n'],
            selectOnClose: true,
            data: list,
            tags: true,
            placeholder: 'Enter a keyword to promote',
            "language": {
                "noResults": () => 'Enter a keyword to promote'
            },
        });
    });
}

function createModalPublishKeywordSelect() {
    if (!isDev()) {
        $.getJSON(getApiUrl('getMyJsonPublishKeywordsWebsite'), function (data) {
            console.log('getMyJsonPublishKeywordsWebsite json ' + JSON.stringify(data));
            var list = data['list'];
            //alert(JSON.stringify(list));
            $("#blogKeywords").select2({
                dropdownParent: $("#ourModal"),
                tokenSeparators: [',', ', ', '\n'],
                selectOnClose: true,
                tags: true,
                placeholder: 'Enter a keyword',
                data: list,
            });
        });
    } else {
        list = ['test keyword 1', 'test keyword 2']
        $("#blogKeywords").select2({
            dropdownParent: $("#ourModal"),
            tokenSeparators: [',', ', ', '\n'],
            selectOnClose: true,
            tags: true,
            placeholder: 'Enter a keyword',
            data: list,
        });
    }
}

function initBlogDomains() {
    if (blogDomains.length === 0) {
        $.getJSON(getApiUrl('getMyJsonBlogsDomainsGeneric'), function (data) {
            console.log('initArticlesBuilding json ' + JSON.stringify(data));
            var list = data['list'];
            if (isRabbitUI) {
                let curr = {};
                curr['id'] = '';
                curr['text'] = '';
                blogDomains.push(curr);
            }

            for (let i = 0; i < list.length; i++) {
                let curr = {};
                curr['id'] = list[i];
                curr['text'] = list[i].replace("https://", "");
                blogDomains.push(curr);
                // console.log('blogDomains ' + JSON.stringify(blogDomains));
            }
            createBlogDomainsSelect();
        });
    } else {
        createBlogDomainsSelect();
    }
}

function initArticlesBuilding() {
    loadMonitoredLinks();
    showUsedAndMax();
    // createPagesSelect();
    createLandingPagesSelect();
    createPublishKeywordSelect();
    if (mainUserDetails['guestBlogsMax'] > 0) {
        $('.monthlyUsage').show();

        if (isEasySeoUI) {
            $('.btnGuestBlogsUsed').attr('data-bs-content', 'The articles usage should be reset on ' + mainUserDetails['resetCreditDay'] + 'th of every month, so at that day you get your publish new articles.');
            $('[data-bs-toggle="popover"]').popover();
        }
    }
    initBlogDomains();

    if (mainUserDetails['linksUsed'] === 0) {
        $('#publish-tab').click();
    }
}

function addIdeas(data, btn) {
    $(btn).show();

    if (data['list'] && data['list'].length > 0) {
        console.log('addIdeas json ' + JSON.stringify(data));
        titleIdeas = [];
        titleIdeas.push('');
        var list = data['list'];
        $('#articleIdeas').html('')
        for (let i = 0; i < list.length; i++) {
            titleIdeas.push(list[i]);
            $('#articleIdeas').append('<div class="form-check list-group-item" onclick="setArticleTitle(' + (i + 1) + ');"> ' +
                '<input class="form-check-input"  value="setArticleTitle(' + (i + 1) + ')" type="radio" name="flexRadioDefault" id="setArticleTitle' + i + '"> ' +
                '<label class="form-check-label" for="setArticleTitle' + (i) + '"> ' + list[i] + '</label> </div>');
        }
        if (continueNext) {
            stepperForm.next();
        } else {
            continueNext = true;
        }
    } else if (data['status'] && data['status'] === 'NoCredit') {
        showUpgradeModal("You don't have enough credits to publish a new article. Would you like to upgrade?");
    }
    return titleIdeas;
}

function waitForArticleInterval(btn) {
    let reloadLinksTable = false;
    clearInterval(theInterval);
    theInterval = setInterval(function () {
        if (theIntervalCounter++ === 1000) {
            clearInterval(theInterval);
        }
        $('.article_progress_step').show();
        console.log('in setInterval timout')
        const url = getApiUrl('getMyJsonPublishedArticleUrlLink');
        console.log('quickPublish url is ' + url);
        $.getJSON(url, function (data) {
            if (isRabbitUI && !reloadLinksTable) {
                console.log('reloadLinksTable');
                loadMonitoredLinks();
                reloadLinksTable = true;
            }
            if (data && data.status) {
                console.log('quickPublish got articleUrl ' + data.status);
                clearInterval(theInterval);
                $(btn).show();
                showArticleSuccess(data);
            }
        });
    }, 2000);

    refreshUsage();
}

function orderExclusiveBlogPost(btn) {
    console.log('$(\'#articleTitle\') ' + $('#articleTitle').val())
    if (isUserEmailExist() || $('#blogAskUserEmail').val().indexOf('@') !== -1) {
        if ($('#articleTitle').val() !== '' && $('#blogLinkKeyword').val() !== '') {
            historyPushState('order-blog-review', 'Publish Guest Blog Review');
            console.log('start orderExclusiveBlogPost')
            quickPublishRunningNow = false;
            $('#modalBlogConfirm').addClass('blogTitleLinksModalArea')
            const blogPrice = mainUserDetails['pricePerMonth'] > 0 ?
                '<p>Please note that each Guest Blog costs 4 links credits <span id="whyBlogPost" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-html="true" data-bs-content="Guest Blog is different than Listings links, we publish a complete article in highly ranked blogs, and you can also edit the article with its links. Guest Blog has many advantages: <br />1. Increasing website traffic <br />2. Improving search engine ranking <br /> 3. Increasing brand awareness <br />4. Improving Digital Marketing Strategy" class="text-muted"><img src="assets/images/home_icon/material-symbols_help.png" height="18"/></span></p>' : '';
            $('#modalBlogConfirm div.modal-body').html('<div class="blogTitleLinksModal"><div><label>Guest Blog Title</lable></div><br/> <strong>' + $('#articleTitle').val() + '</strong> ' +
                '<br/><div class="mt-4"><label>Link Type</label></div><br/><strong>Exclusive Guest Blog</strong>' +
                '<br/><div class="mt-4"><label>Landing Page</label></div><br/><strong>' + $('#linkHrefBlog').val() + '</strong>' +
                '<br/><div class="mt-4"><label>Keyword</label></div><br/><strong>' + $('#blogLinkKeyword').val() + '</strong>' +
                '<br/><div class="mt-4"><label>Language</label></div><br/><strong>' + $('#language').val() + '</strong>' +
                '<br/><div class="mt-4"><label>Publish Date</label></div><br/><strong>' + ($('#publishDate').val().length > 0 ? $('#publishDate').val() : 'Now') + '</strong>' +
                '<br/><div class="mt-4"><label>Add My Company Details                                                                             <img src="/assets/images/home_icon/material-symbols_help.png"\n' +
                '                                                                                 style="margin-left: 5px;"\n' +
                '                                                                                 class="addMyDetailsHtml"\n' +
                '                                                                                 alt="help">\n</label></div><br/><strong>' +
                // ($('#addMyDetails').prop('checked') ? 'Yes' : 'No') +
                '<div class="form-check form-switch">' +
                '                                                                            <input data-hj-allow type="checkbox"\n' +
                '                                                                                   id="addMyDetails"\n' +
                '                                                                                   checked="checked"\n' +
                '                                                                                   onchange="$(\'#hiddenAddUserDetails\').val($(this).prop(\'checked\') ? \'on\' : \'off\')"\n' +
                '                                                                                   class="form-check-input">\n' +
                '                                                                            <label class="form-check-label"\n' +
                '                                                                                   for="addMyDetails">\n' +
                '                                                                                Yes\n' +
                '                                                                            </label></div>' +
                '</strong>' +
                blogPrice + '</div>');
            $('#whyBlogPost').popover({html: true});
            $('#modalBlogConfirm button.modalSecondButton').click(function () {
                console.log('clicked modalSecondButton');
                $('#modalBlogConfirm').modal('hide');
                $('#blogItlemsDropdown').prev().dropdown('toggle');
                quickPublish(btn);
            });
            $('#modalBlogConfirm').modal('show');
            initBizSignaturePreview();
        } else {
            fadeModal('', 'Please choose a keyword and a title for your guest blog');
        }
    } else {
        fadeModal('', 'Please fill your email - it will not be published in the blog');
    }
}

let quickPublishRunningNow = false; // not sure why it call quickPublish multiple times

function quickPublish(btn) {
    if ($('#articleTitle').val() !== '') {
        console.log('start quickPublish')
        if (!quickPublishRunningNow) {
            quickPublishRunningNow = true;
            let status = ajaxSubmitForm('createBlogRequestLink');
            console.log('quickPublish status ' + status);

            if (status === 'OK') {
                if (isEasySeoUI || isSeoRushUser()) {
                    $('.article_progress_step').show();
                    replaceBtnWithLoader(btn);
                    theIntervalCounter = 0;
                    console.log('start loop to get articleResponse')
                    setTimeout($('.teasers-box').randomText(tipsArray, 10000), 2000);
                } else {
                    $('.post-spinner-border').show();
                    if (!dailySEOTipsArray) {
                        $.ajaxSetup({async: false});

                        $.get('/assets/data/tips.txt', function (data) {
                            dailySEOTipsArray = data.split('\n');
                        });

                        $.ajaxSetup({async: true});
                    }
                    if (dailySEOTipsArray && dailySEOTipsArray.length > 0) {
                        let currTip = dailySEOTipsArray[Math.floor(Math.random() * dailySEOTipsArray.length)];
                        if (currTip) {
                            $('.dailyTipText').html('<span class="dailyTipText_btn">Daily SEO Tip</span><br />' + currTip);
                        }
                    }
                    $('#publishPostModal').modal('show');
                    $('#orderBlogPostSection .dropdown .orderBlogPostButton').removeClass('show');
                    $('#orderBlogPostSection .dropdown .account_dropdown').removeClass('show');
                }
                waitForArticleInterval(btn);
            } else if (status && (status === 'NoCredit' || status.indexOf('0 links left') !== -1) && !isShabbat) {
                const msgText = isEasySeoUI ? "You don't have enough credits to publish a new article. Would you like to upgrade?" :
                    "You don't have enough credits to order a guest blog. Would you like to upgrade?";
                showUpgradeModal(msgText);
            } else if (status) {
                showModal("Publish Result", status, 'OK', '');
            }
        } else {
            console.log('quickPublishRunnigNow...')
        }
    } else {
        fadeModal('', 'Please choose a title for your guest blog');
    }
}

function createBlogPostTitleSelect(data) {
    $("[id^=articleTitle]").show();
    $(".articleTitleSection").show();
    titleIdeas = [];
    let curr = {};
    curr['id'] = '';
    curr['text'] = '';
    titleIdeas.push(curr);

    var list = data['list'];
    $('#articleIdeas').html('')
    if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            let curr = {};
            curr['id'] = list[i];
            curr['text'] = list[i];
            // curr['text'] = (i + 1) + '. ' + list[i];
            titleIdeas.push(curr);
        }
    }
    console.log('empty articleTitle');
    $("[id^=articleTitle]").empty().trigger("change");
    const placeholder = isLinksUI ? 'Choose a title or type your own' : 'Choose a guest blog title from the list or type your own title';
    $('[id^=articleTitle]').attr('data-placeholder', placeholder);

    console.log('creating articleTitle select2 ' + JSON.stringify(titleIdeas));
    $("[id^=articleTitle]").select2({
        tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: titleIdeas,
        tags: true,
        // dropdownParent:$('#blogItlemsDropdown'),
        placeholder: placeholder,
        searchInputPlaceholder: isLinksUI ? 'Titles don\'t match your business? Change the "Keyword" field and generate new titles!' : placeholder
    });
    // console.log('created articleTitle select2 ' + $("[id^=articleTitle]").select2().val());
    $("#orderBlogPostSection .newBlogItemSignup #articleTitle").select2({
        dropdownParent: $('#blogItlemsDropdown'),
    });
    $("#rabbitOnboarding .newBlogItemSignup #articleTitleSignup").select2({
        dropdownParent: $('#rabbitOnboarding'),
    });
    $('[id^=articleTitle]').on("select2:open", function () {
        $(".select2-dropdown").removeClass('searcInputNew');
        $(".select2-dropdown").addClass('searcInputNew');
        $(".newGenerateLink").remove();
        $(".showingOptions").remove();
        // if (list.length < 40) {
        if (isRabbitUI) {
            // if (isTestingMode() && isRabbitUI) {
            let addMsg = '<p class="text-muted text-center showingOptions border-top pt-2" style="margin-top: 5px; margin-bottom: 0">Showing ' + list.length + ' titles';

            if (list.length < 40) {
                addMsg += '<a class="newGenerateLink text-muted" href="javascript: initMoreBlogPosts();"><img src="/assets/images/loadmoregenerate_new.png" alt="loding" /> ' +
                    'Generate more titles for <span class="font-weight-bold userKeyword" style="font-weight: bold;">' + keywordToPromote + '</span></a>';
            }
            addMsg += '</p>';
            addMsg += '<p class="text-muted text-center showingOptions" style="margin-top: 8px; margin-bottom: 10px">Irrelevant Titles? <a class="text-dark" href="javascript: changeKeywordToPromote()">Change</a> \'Keyword to Promote\' field to generate new titles</p>';
            $(".select2-results").append(addMsg);
        }
    });

    $('.spinner-border').hide();
    $('.loadingContainer').hide();
    $('.articleTitleSignupText').hide();

    if (isRabbitUI) {
        console.log('openSelect ' + openSelect)
        console.log('inOnboardingNow ' + inOnboardingNow)

        if (inOnboardingNow && openSelect) {
            $("#articleTitleSignup").select2('open');
        } else if (list.length > 15) {
            $("#articleTitle").select2('open');
        }
    }
}

function changeKeywordToPromote() {
    if (isRabbitUI) {
        $("#articleTitle").select2('close');
        $("#blogLinkKeyword").select2('open');
    }
}

let blogIdeasCount = 5;

function initMoreBlogPosts() {
    // $('#neworderBlogPostSectionBtn #orderBlogPostButtons').trigger('click');
    initBlogPostTitles(blogIdeasCount + 5);
    $('.newGenerateLink').html('<span class="spinner-border text-primary"></span>');
    // $('.newGenerateLink').remove();
}

function initBlogPostTitles(count) {
    console.log('start initBlogPostTitles()')
    blogIdeasCount = count ? count : 5;
    if (blogIdeasCount > 25) {
        blogIdeasCount = 25;
    }

    if (verifyNotEmptyValBySelector('#blogLinkKeyword', 'Please fill keyword to generate guest blog titles')) {
        $('.spinner-border').show();
        $('.loadingContainer').show();
        $(".articleTitleSection").hide();
        $("[id^=articleTitle]").hide();
        let keywordParam = $("#blogLinkKeyword").val();
        console.log('initBlogPostTitles keyword is ' + keywordParam + ' and keywordToPromote is ' + keywordToPromote);
        console.log('initBlogPostTitles isRabbitUI is ' + isRabbitUI + ' and inOnboardingNow is ' + inOnboardingNow);

        if (isRabbitUI && inOnboardingNow && keywordToPromote) {
            keywordParam = keywordToPromote;
        }
        keywordToPromote = keywordParam;
        $('.userKeyword').html(keywordToPromote);
        let url = getPostParams(apiUrl + 'getMyJsonOpenAiIdeasLink?keyword=' + encodeURIComponent(keywordToPromote) + '&count=' + blogIdeasCount);
        if ($("#language") && $("#language").val()) {
            url += '&language=' + $("#language").val();
        }
        console.log('initTitleIdeas url is ' + url);
        $.getJSON(url, function (data) {
            let jsonStatus = data['status'];
            if (jsonStatus && jsonStatus === 'NoCredit') {
                if (isRabbitUI) {
                    createBlogPostTitleSelect(data);
                } else {
                    showUpgradeModal("You don't have enough credits to publish a new guest blog. Would you like to upgrade?");
                }
            } else {
                console.log('initBlogPostTitles ' + JSON.stringify(data));
                createBlogPostTitleSelect(data);
            }
        });
    } else {
        console.log('initBlogPostTitles no keyword')
    }
}

function initTitleIdeas(btn) {
    if ($("#blogLinkKeyword").val() && $("#blogLinkKeyword").val().length > 0 && $("#linkHrefArticle").val() && $("#linkHrefArticle").val().length > 0) {
        replaceBtnWithLoader(btn);
        $('.teasers-box').randomText(tipsArray, 10000);

        if ($("#blogLinkKeyword").val()) {
            const url = getApiUrl('getMyJsonOpenAiIdeasLink?keyword=' + encodeURIComponent($("#blogLinkKeyword").val()) +
                '&linkHref=' + encodeURIComponent($("#linkHrefArticle").val()) +
                ($("#language") ? '&language=' + encodeURIComponent($("#language").val()) : ''));
            console.log('initTitleIdeas url is ' + url);
            $.getJSON(url, function (data) {
                continueNext = true;
                addIdeas(data, btn);
            });
        }
    } else {
        showModal('Oops', 'Please fill keyword and landing page to promote in the published article', 'OK', '');
    }
}

function setArticleTitle(i) {
    const title = titleIdeas[i];
    console.log('title is ' + title);
    $('#articleTitle').val(title);
}

function replaceBtnWithLoader(btn) {
    if (btn) {
        $(btn).hide();
        // $('.progress_step').show();
        $(btn).next().filter('.progress_step').show();
        $(btn).next().filter('.regenerate_step').show();
        if (isRabbitUI) {
            $('.spinner-border').show();
        }
        // $(btn).parent().append('<span class="spinner-border text-primary"></span>');
    }
}

let firstLoad = false;

function loadImages(data) {
    console.log('getMyJsonImagesUrlsLink json ' + JSON.stringify(data));
    $('.imagesSection').html('');
    var list = data['list'];

    if (isRabbitUI) {
        const currVal = $('#imagesByKeywordSelect').val();
        console.log('currVal ' + currVal)
        console.log('currVal.length ' + currVal.length)
        console.log('data[\'obj\'] ' + data['obj']);

        if (firstLoad && (!currVal || currVal.length === 0) && data['obj'] !== '') {
            firstLoad = false;
            setArrayValsSelected(data['obj'].split(','), 'imagesByKeywordSelect');
        }
    }

    for (let i = 0; i < list.length; i++) {
        $('.imagesSection').append('<div class="col-12 col-sm-6 col-md-4"><div style="background:url(' + list[i] + ') no-repeat;" src="' + list[i] + '" class="article-image"></div></div>');
    }
    $('.article-image').click(function () {
        const src = $(this).attr('src');
        console.log('clicked image ' + src);
        $('.articleImage').removeClass('active');
        $('.articleImage').val(src);
        $('#chosenImage').val(src);
        $(this).toggleClass("active");
        if (modifyMode && !isRabbitUI && !isSeolyUI) {
            submitChangeLinks();
        }

    });
    const sliders = document.querySelectorAll('.slick-initialized');
    sliders.forEach(item => {
        $(item).slick('unslick');
    })

    if (!isRabbitUI) {
        if (!isLinksUI) {
            $('.imagesSection').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
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

    }
    if (isSeolyUI) {
        $('.imagesSection').slick('unslick');
    }
    createBlogDomainsSelect();
}

function initArticle(btn) {
    replaceBtnWithLoader(btn);
    let data = 'title=' + $("#articleTitle").val() + ($("#language") ? '&language=' + encodeURIComponent($("#language").val()) : '');
    console.log('initArticle request is ' + data)
    $.ajax({
        type: 'POST',
        url: getApiUrl('createArticleLink?' + data),
        async: true,
        success: function (json) {
            console.log('initArticle ' + JSON.stringify(json));
            if (json && json['status'] && json['status'] === 'NoCredit') {
                showUpgradeModal("You don't have enough credits to publish a new article. Would you like to upgrade?");
            } else {
                $(btn).show();
                stepperForm.next();
                loadImagesByQuery('');
            }
        }
    });
}

let articleText;

function submitUserDetails(btn) {
    if (($('#blogDomains').val() && $('#blogDomains').val().length > 0) || modifyMode) {
        replaceBtnWithLoader(btn);
        $('.teasers-box2').randomText(tipsArray, 10000);
        const addUserDetailsStepper = $((modifyMode ? 'div#modifyArticleSection ' : '') + '#addUserDetailsStepper').prop('checked');
        $('.hiddenAddUserDetails').val(addUserDetailsStepper ? 'on' : 'off');
        // $('.hiddenAddUserDetails').val($('#addUserDetailsStepper').val());
        console.log('addUserDetails ' + addUserDetailsStepper)
        // if (addUserDetails || true) {
        // if (addUserDetails) {
        let form = $(modifyMode ? '#modifySavePublishDetailsUser' : '#savePublishDetailsUser');
        let data = getFormValues(form);
        console.log('savePublishDetailsUser values ' + JSON.stringify(data));
        let url = apiUrl + 'getMyJsonCreatePublishDetailsUser';

        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: function (json) {
                console.log('submitUserDetails ' + JSON.stringify(json));
                if (modifyMode) {
                    submitChangeLinks();
                } else {
                    submitArticleDetails(btn);
                }
            },
            async: true
        });
    } else {
        showModal('Oops', 'Please choose a website to publish your article', 'OK', '');
    }
}

function loadFinalStep(json) {
    console.log('loadFinalStep json is ' + JSON.stringify(json));
    if (json && json.obj) {
        json = json.obj;
        $('#finalArticleTitle').html(json['articleTitle']);
        const articleText = json['articleTextFinal'].replaceAll('\n', '<br />');
        $('.finalArticleText').html(articleText);
        const articleImage = json['articleImage'];
        if (articleImage && articleImage.startsWith('http')) {
            $('#articleFinalImage').attr('src', articleImage);
            $('#articleFinalImage').show();
            $('div.articleFinalImage').show();
        } else {
            $('div.articleFinalImage').hide();
        }
        $('#publishInWebsite').html($('#blogDomains').val());
        $('#publishInCats').html(getSelect2ValSeparated('articleCategories'));
        $('#publishInTags').html(getSelect2ValSeparated('articleTags'));
        $('#publishLandingPage').html($('#linkHrefArticle').val());
        $('#userDetailsAdded').html($('#addUserDetailsStepper').prop('checked') ? 'Added' : 'Not added');
        $('.hiddenAddUserDetails').val($('#addUserDetailsStepper').prop('checked') ? 'on' : 'off');
        $('#articleWordsCount').html(json['wordsCount']);
        $('#articleLinksCount').html($('div.finalArticleText a').length);
        $('#keyword1').val(json['articleKeyword1']);
        $('#keyword2').val(json['articleKeyword2']);
        $('#keyword3').val(json['articleKeyword3']);
    }
    console.log('success ' + JSON.stringify(json));
    return json;
}

function getArticleResponse(url, data) {
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function (json) {
            console.log('submitArticleDetails json ' + JSON.stringify(json));
            if (json.obj && json.obj['articleTitle']) {
                articleResponse = json;
            }
        },
        async: true
    });
    // return result;
}

function submitArticleDetails(btn) {
    $('.article_progress_step').show();
    replaceBtnWithLoader(btn);
    let form = $('#submitArticleDetailsForm');
    let data = getFormValues(form);

    console.log('submitArticleDetails values ' + JSON.stringify(data));
    let url = apiUrl + 'getMyJsonSubmitArticleDetailsLink';

    articleResponse = null;
    theIntervalCounter = 0;
    console.log('start loop to get articleResponse')
    theInterval = setInterval(function () {
        if (theIntervalCounter++ === 1000) {
            clearInterval(theInterval);
        }
        $('.article_progress_step').show();
        console.log('in setInterval timout')
        getArticleResponse(url, data);
        if (articleResponse && articleResponse.obj && articleResponse.obj['articleTitle']) {
            console.log('got articleResponse')
            stepperForm.next();
            clearInterval(theInterval);
            $(btn).show();
            $('.article_progress_step').hide();
            loadFinalStep(articleResponse);
        }
    }, 2000);
}

function submitChangeLinks(btn) {
    // console.log('$(\'.finalArticleText\').html() ' + $('.finalArticleText').html());
    // console.log('$(\'#summernote\').summernote(\'code\') ' + $('#summernote').summernote('code'))
    replaceBtnWithLoader(btn);
    const addUserDetailsStepper = $((modifyMode ? 'div#modifyArticleSection ' : '') + '#addUserDetailsStepper').prop('checked');
    $('.hiddenAddUserDetails').val(addUserDetailsStepper ? 'on' : 'off');
    let form = $(modifyMode ? '#changeLinksModifyForm' : '#changeLinksForm');
    let data = getFormValues(form);
    console.log('submitChangeLinks values ' + JSON.stringify(data));
    let url = apiUrl + 'getMyJsonSubmitArticleDetailsLink';

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function (json) {
            console.log('submitChangeLinks json ' + JSON.stringify(json));

            if (isEasySeoUI) {
                loadFinalStep(json);
                $(btn).show();
            } else {
                doSubmitArticleFinal(btn);
            }
        },
        async: true
    });
}

function showArticleSuccess(json) {
    console.log('showArticleSuccess json ' + JSON.stringify(json));
    if (isSeoRushUser()) {
        articlePublished(json);
    }
    if (isRabbitUI) {
        historyPushState('order-blog-success', 'Order Blog Success');
        $('#publishPostModal').modal('hide');
        hidePublishBlogDropdown();
        $('.spinner-border').hide();
    }

    let url = json['status'];
    console.log('showArticleSuccess url is ' + url)
    if (url) {
        $('.articleBlogHomepage').attr('href', url);
    }
    if (json['data'] && isEnableModifyBlogPost()) {
        if (true) {
            // if (!isRabbitUI || !isRestrictRabbitUserModifyArticle()) {
            $('.articleBlogId').show();
            $('.articleBlogId').attr('onclick', "modifyArticle('" + json['data'] + "')");
        } else {
            $('.articleBlogIdDiv').hide();
            $('.articleBlogHomepageDiv').removeClass('col-6').addClass('col-12');
        }
    }

    if (json['obj'] && json['obj'] === 'DeleteArticle') {
        $('#trialRemoveLinkMsg').show();
    }

    if (modifyMode) {
        if (isEasySeoUI) {
            closeAppModal();
        } else {
            if (isSeolyUI) {
                closeAppModal();
            }
            fadeModalWithTime('Guest Blog Update Success', "You can see the updated post at " + getFormattedUrl(url), 7000);
        }
    } else {
        openSuccessArticleModal();
    }
    if (isEasySeoUI) {
        $('#dashboard-tab').click();
        $('.article_progress_step').hide();
    } else {
        modifyArticleTable();
    }
    refreshUsage();
    loadMonitoredLinks();

    if (isRabbitUI) {
        addLinksDetails();
    }

    // console.log('success ' + JSON.stringify(json));
}

function articleSubmitted(json, btn) {
    console.log('submitArticleFinal json ' + JSON.stringify(json));
    $(btn).show();
    let jsonStatus = json['status'];
    if (jsonStatus && jsonStatus === 'NoCredit') {
        showUpgradeModal("You don't have enough credits to publish a new article. Would you like to upgrade?");
    } else {
        if (jsonStatus) {
            showArticleSuccess(json);
        }
    }
}

function doSubmitArticleFinal(btn) {
    replaceBtnWithLoader(btn);
    $.ajax({
        type: 'POST',
        url: getApiUrl('submitArticleFinalLink' + (modifyMode ? '?linkId=' + $('div#modifyArticleSection .linkId').val() : '')),
        success: function (json) {
            articleSubmitted(json, btn);
        },
        async: true
    });
}

function submitArticleFinal(btn) {
    const selector = modifyMode ? 'div#modifyArticleSection div.finalArticleText a' : 'div#finalArticleText a';
    console.log('selector ' + selector);
    const links = $(selector).length;
    console.log('links is ' + links);
    // const linksCount = Math.min(3, links);
    const linksCount = links;

    console.log('submitArticleFinal linksCount is ' + linksCount);
    let text = 'You are now going to publish an article with ' + linksCount + ' links, would you like to proceed?';
    if (linksCount == 1) {
        text = 'You have added one link only, are you sure you want to publish the article with ' + linksCount + ' link?';
    }
    showModal('Confirm', text, 'No', 'Yes');
    $('div#modalMessage button#modalSecondButton').click(function () {
        doSubmitArticleFinal(btn);
    });
}

function createBlogDomainsSelect() {
    console.log('createBlogDomainsSelect blogDomains is ' + JSON.stringify(blogDomains));
    $("[id^=blogDomains]").select2({
        tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: blogDomains,
        // data: blogDomains.sort(),
        // tags: true,
        placeholder: 'Choose a blog to publish your article',
    });
    createBlogCategoriesSelect();
    $("#blogDomains").change(function () {
        $('[id^=articleCategories]').empty().trigger("change");
        createBlogCategoriesSelect();
    });
}

let lastLoadCat;

function initBlogCategories(data) {
    console.log('createBlogCategoriesSelect json ' + JSON.stringify(data));
    if (data && data['list']) {
        var list = data['list'];
        let blogCats = [];
        for (let i = 0; i < list.length; i++) {
            blogCats.push(decodeEntities(list[i]));
        }
        console.log('initBlogCategories blogCats is ' + JSON.stringify(blogCats));
        $("[id^=articleCategories]").select2({
            tokenSeparators: [',', ', ', '\n'],
            // selectOnClose: true,
            closeOnSelect: false,
            data: blogCats.sort(),
            maximumSelectionLength: 3,
            tags: false,
            placeholder: 'Choose Category (max 3)',
        });
        $("[id^=articleCategories]").change(function () {
            let count = $(this).select2('data').length;
            console.log('articleCategories count ' + count);
            if (count === 1 && (!lastLoadCat || lastLoadCat !== $(this).val())) {
                lastLoadCat = $(this).val();
                // loadImagesByQuery(lastLoadCat);
                loadImagesByQuery();
            }
        });
    }
}

function createBlogCategoriesSelect() {
    const blogDomain = modifyMode ? $("div#modifyArticleSection .blogUrl").val() : $("#blogDomains").val();
    if (!isDev() && blogDomain) {
        $.getJSON(getApiUrl('getMyJsonBlogsCategoriesGeneric?blogDomain=' + blogDomain), function (data) {
            initBlogCategories(data);
        });
    } else {
        initBlogCategories(blogCatsDevJson);
    }
}

function submitPublishArticleForm() {
    const result = ajaxSubmitForm('createBlogRequestLink');
    // console.log('result' + result);
    if (result && result.startsWith("http")) {
        // $('#linksBuildingForm').hide();
        $('#publishArticleError').hide();
        // $('#publishArticleSuccess').show();
        $('#articleId').attr('href', result);
        $('#articleId').html(result);

        refreshUsage();
        loadMonitoredLinks();
        $('#articlesTableDiv').show();
        $('#publishArticleDiv').hide();
    } else {
        $('#publishArticleSuccess').hide();
        $('#publishArticleError').show();
        $('#publishArticleError div.alert-danger p').html(result);
        // showModal("Message", result, "Close", "");
    }
}

function openSuccessArticleModal() {
    $('#ourModal').html($('#articlePublishedModal').html());
    $('#ourModal').modal('show');
}

function openLinksModal() {
    $.get('/assets/htmls/easySeoLinks.html', function (data) {
        $('#ourModal').html(data);
        for (let i = 0; i < blogDomains.length; i++) {
            if (blogDomains[i] && blogDomains[i]['id']) {
                let domain = '<div class="py-2"><a href="' + blogDomains[i]['id'] + '" class="text-primary" target="_blank" onclick="setBlogDomain(this)">' + blogDomains[i]['text'] + '</a></div>';
                $('#blogDomainLink').append(domain);
            }
        }
        $('#blogDomainLink').html();
        $('#ourModal').modal('show');
    });
}

function setBlogDomain(ahref) {
    $("#blogDomains").select2().val($(ahref).attr('href')).change();
}

function openSettingsModal() {
    $.get('/assets/htmls/easySeoUserSettings.html', function (data) {
        // console.log($(data));
        $('#ourModal').html(data);
        $('#ourModal').modal('show');

        $.getJSON(getApiUrl('getMyJsonPublishDetailsUser'), function (json) {
            console.log('getMyJsonPublishDetailsUser ' + JSON.stringify(json));
            json = JSON.parse(json['data']);
            if (json) {
                userPublishDetailsJson = json;
                fillForm('#savePublishDetailsUserModal', json);
                setArrayValsSelected(json['blogLinkKeyword'], 'blogKeywords');
            }

            // console.log('mainUserDetails[\'autoPilot\'] ' + mainUserDetails['autoPilot'])
            $('#autoPilot').prop('checked', mainUserDetails['autoPilot']);
            $('#autoPilot').change();

            $('#toggleEmbedDetails').prop('checked', mainUserDetails['addUserDetails']);
            $('#toggleEmbedDetails').change();
        });
        createModalPublishKeywordSelect();
        $('[data-bs-toggle="tooltip"]').tooltip();
        $("body").delegate("#autoPilot", "change", function () {
            if ($(this).is(':checked')) {
                $('#savePublishDetailsUserModal #blogKeywords').prop("disabled", false);
            } else {
                $('#savePublishDetailsUserModal #blogKeywords').prop("disabled", true);
            }
        });
        $("body").delegate("#toggleEmbedDetails", "change", function () {
            if ($(this).is(':checked')) {
                $('.toggleEmbedDetails .form-control').removeAttr('disabled');
            } else {
                $('.toggleEmbedDetails .form-control').attr("disabled", true);
            }
        });
    });
}

function submitUserDetailsModal(btn) {
    replaceBtnWithLoader(btn);
    const addUserDetails = $('#ourModal #addUserDetails').prop('checked');
    console.log('submitUserDetailsModal ' + addUserDetails)
    console.log('submitUserDetailsModal sessionId ' + mainUserDetails['sessionId'])
    console.log('submitUserDetailsModal sessionId item ' + JSON.stringify(sessionIdItem))
    let form = $('#savePublishDetailsUserModal');
    let data = getFormValues(form);
    console.log('savePublishDetailsUser values ' + JSON.stringify(data));
    let url = apiUrl + 'getMyJsonCreatePublishDetailsUser';

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function (json) {
            console.log('submitUserDetailsModal ' + JSON.stringify(json));
            $(btn).show();
            fadeModal('Success', 'Your changes were successfully saved');
        },
        async: true
    });
}

function resetStepper() {
    modifyMode = false;
    if (stepperForm) {
        stepperForm.to(1);
    }
    $('.userDetailsForm').hide();
    $('#addUserDetailsStepper').prop('checked', false);
    createArticleTagsSelect();
    showUserLogoIfExist();
    // $('.userDetailsForm').show();
    // $('#addUserDetailsStepper').prop('checked', 'checked');
}

function isRestrictRabbitUserModifyArticle() {
    // return !isShabbat && packageName !== 'Business' && packageName !== 'Best' && packageName !== 'Enterprise';
    // return !payingUser;
    // return !mainUserDetails['pricePerMonth'] || mainUserDetails['pricePerMonth'] === 0;
    return false;
}

function setModifyArticle(json) {
    console.log('setModifyArticle ' + json['obj']);
    $('.progress_step').hide();
    $('div#modifyArticleSection').show();
    if (json['obj']) {
        modifyMode = true;
        json = json['obj'];
        if (json) {
            $('.blogUrl').val(json['blogDomain']);

            if (json['cats']) {
                $('div#modifyArticleSection #publishInCats').html(json['cats'].join(", "));
            }
            if (json['tags']) {
                $('div#modifyArticleSection #publishInTags').html(json['tags'].join(", "));
            }

            $('div#modifyArticleSection #finalArticleTitle').html(json['title']);
            $('div#modifyArticleSection .finalArticleText').html(isRabbitUI ? json['content'] : json['content'].replace(json['title'], ''));
            const hasPublishDetails = json['content'].indexOf('Article posted by:') !== -1;
            $('div#modifyArticleSection #userDetailsAdded').html(hasPublishDetails ? 'Added' : 'Not added');
            const linksSelector = $("div#modifyArticleSection div.finalArticleText a");
            $('div#modifyArticleSection #articleLinksCount').html(Math.min(3, linksSelector.length));
            $('div#modifyArticleSection .linkId').val(json['linkId']);
            $('div#modifyArticleSection .linkHrefArticle').val(json['linkHrefArticle']);
            $('div#modifyArticleSection .articleImage').val(json['imageUrl']);
            $('div#modifyArticleSection #articleFinalImage').attr('src', json['imageUrl']);

            linksSelector.each(function (index) {
                const currLink = $(this).text();
                console.log(index + ": " + currLink);
                if (currLink) {
                    $('div#modifyArticleSection #keyword' + (index + 1)).val(currLink);
                    console.log('setModifyArticle currLink ' + currLink);
                    // $(this).attr('data-hint', "This link will be publish");
                }
                // introJs().addHints();
            });
            if (hasPublishDetails) {
                $('.userDetailsForm').show();
                $('div#modifyArticleSection #addUserDetailsStepper').prop('checked', true);
            } else {
                $('.userDetailsForm').hide();
                $('div#modifyArticleSection #addUserDetailsStepper').prop('checked', false);
            }
        }

        $.ajaxSetup({
            async: false
        });

        showUserLogoIfExist();
        createBlogCategoriesSelect();
        createArticleTagsSelect();

        $.ajaxSetup({
            async: true
        });
        setStringValsSelected(json['cats'], 'articleCategoriesModify');
        setStringValsSelected(json['tags'], 'articleTagsModify');
        // fillPublishDetailsForm();
        // createKeywordsOnChangeTrigger();
        $('div#modifyArticleSection').show();
        $('.progress_step').hide();

        $.getJSON(getApiUrl('getMyJsonPublishDetailsUser'), function (json) {
            console.log('getMyJsonPublishDetailsUser ' + JSON.stringify(json));
            $('div#modifyArticleSection').show();
            $('.progress_step').hide();
            json = JSON.parse(json['data']);
            if (json) {
                userPublishDetailsJson = json;
                fillForm('#modifySavePublishDetailsUser', json);
                $("#modifySavePublishDetailsUser input").change(function () {
                    submitUserDetails();
                });
            }
        });

        if (isRabbitUI) {
            console.log('check isRestrictRabbitUserModifyArticle ' + isRestrictRabbitUserModifyArticle());
            setTimeout(function () {
                if (isRestrictRabbitUserModifyArticle()) {
                    showUpgradeModal('Editing the Guest Blog Content and adding more links to the post is available on a higher package, would you like to upgrade now? (Anyway, you can still change the guest blog category and tags.)');
                    $('#summernote').summernote('disable');
                }
            }, 2000);

        }
    }
}

function modifyArticle(id) {
    if (isEasySeoUI) {
        openModalId('/assets/htmls/easySeoModify.html', 'appDataModal', 'Modify Article');
    } else if (isRabbitUI) {
        showRabbitModifyBlogSection();
        $('#ourModal').modal('hide');
    } else if (isLinksUI) {
        ajaxSimpleLoadToDiv('/assets/htmls/links4uBlogModify.html', 'modifyArticleSection' + id);
    } else if (isSeolyUI) {
        openModalId('/assets/htmls/seolyBlogModify.html', 'appDataModal', 'Change Post');
    }

    $.getJSON(getApiUrl('getMyJsonArticleToModifyLink?id=' + id), function (json) {
        console.log('getMyJsonArticleToModifyLink ' + JSON.stringify(json));
        setModifyArticle(json);
    });
}

function showRabbitModifyBlogSection() {
    if (activeTab !== 'links') {
        changeTab('links');
    }
    ajaxSimpleLoadToDiv('/assets/htmls/rabbitBlogModify.html', 'modifyArticleSection');
    $('#modifyArticleSection').show();
    $('#monitoringLinkTable').hide();
    $('#allLinksTable').hide();
    $('.top_blog_editlink').hide();
    $('#createNewLinksButton').hide();
    hidePublishBlogDropdown();

}

function modifyArticleTable() {
    $('#modifyArticleSection').hide();
    $('#monitoringLinkTable').show();
    $('#allLinksTable').show();
    $('.top_blog_editlink').show();
}

function showUserLogoIfExist() {
    if (mainUserDetails['hasCover']) {
        $('img.logoImg').show();
        $('img.uploadIcon').hide();
        $('img.logoImg').attr('src', (isDevOrLocalhost() ? 'https://www.rabbitseo.com' : '') + '/UserLogo?pdfImage=true');
        $('img.logoImg').attr('onerror', 'this.onerror=null; $(this).hide()');
    }
}

function toggleAdvancedSettings() {
    if ($('#advancedSettings').prop('checked')) {
        $('.advancedSettingsSection').show();
        $('.downshowarrow').addClass('activearrow');
    } else {
        $('.advancedSettingsSection').hide();
        $('.downshowarrow').removeClass('activearrow');
    }
}
function initImagesByKeyword() {
    $.getJSON(getApiUrl('getMyJsonImagesKeysLink'), function (data) {
        console.log('getMyJsonImagesKeysLink data ' + JSON.stringify(data))
        let list = data['list'];
        list.unshift('');
        $(".imagesByKeyword").select2({
            tokenSeparators: [',', ', ', '\n'],
            selectOnClose: true,
            data: list,
            tags: true,
            placeholder: 'Type an image query or choose from the list',
            searchInputPlaceholder: 'Type an image query or choose from the list',
            "language": {
                "noResults": () => 'Enter an image query'
            },
        });
    });
}
