var SEORushUtilities = {
    today: function () {
        // Get the current date
        var today = new Date();
        // Get the day of the month
        var dd = today.getDate();

        // Get the month (adding 1 because months are zero-based)
        var mm = today.getMonth() + 1;

        // Get the year
        var yyyy = today.getFullYear();

        // Add leading zero if the day is less than 10
        if (dd < 10) {
            dd = '0' + dd;
        }

        // Add leading zero if the month is less than 10
        if (mm < 10) {
            mm = '0' + mm;
        }

        return yyyy + "-" + mm + "-" + dd;
    },
    formatDate: function (dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const year = date.getFullYear();

        // Get the month name
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];

        // Get the ordinal suffix for the day
        const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
            (day % 10 === 2 && day !== 12) ? 'nd' :
                (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

        // Format the date
        return `${day}${suffix} ${month}, ${year}`;
    },

    loadLanguages: function () {
        let languages = [{
            id: 'English',
            text: '<div class="d-flex align-items-center gap-2" title="English"><img src="/assets/images/content123/flag/english.png"/> English </div>'
        }, {
            id: 'Bulgarian',
            text: '<div class="d-flex align-items-center gap-2" title="Bulgarian"><img src="/assets/images/content123/flag/bulgarian.png"/> Bulgarian </div>'
        }, {
            id: 'Czech',
            text: '<div class="d-flex align-items-center gap-2" title="Czech"><img src="/assets/images/content123/flag/czech.png"/> Czech </div>'
        }, {
            id: 'Danish',
            text: '<div class="d-flex align-items-center gap-2" title="Danish"><img src="/assets/images/content123/flag/danish.png"/> Danish </div>'
        }, {
            id: 'Dutch',
            text: '<div class="d-flex align-items-center gap-2" title="Dutch"><img src="/assets/images/content123/flag/dutch.png"/> Dutch </div>'
        }, {
            id: 'Filipino',
            text: '<div class="d-flex align-items-center gap-2" title="Filipino"><img src="/assets/images/content123/flag/filipino.png"/> Filipino </div>'
        }, {
            id: 'Finnish',
            text: '<div class="d-flex align-items-center gap-2" title="Finnish"><img src="/assets/images/content123/flag/finnish.png"/> Finnish </div>'
        }, {
            id: 'French',
            text: '<div class="d-flex align-items-center gap-2" title="French"><img src="/assets/images/content123/flag/french.png"/> French </div>'
        }, {
            id: 'German',
            text: '<div class="d-flex align-items-center gap-2" title="German"><img src="/assets/images/content123/flag/german.png"/> German </div>'
        }, {
            id: 'Greek',
            text: '<div class="d-flex align-items-center gap-2" title="Greek"><img src="/assets/images/content123/flag/greek.png"/> Greek </div>'
        }, {
            id: 'Hindi',
            text: '<div class="d-flex align-items-center gap-2" title="Hindi"><img src="/assets/images/content123/flag/hindi.png"/> Hindi </div>'
        }, {
            id: 'Hungarian',
            text: '<div class="d-flex align-items-center gap-2" title="Hungarian"><img src="/assets/images/content123/flag/hungarian.png"/> Hungarian </div>'
        }, {
            id: 'Indonesian',
            text: '<div class="d-flex align-items-center gap-2" title="Indonesian"><img src="/assets/images/content123/flag/indonesian.png"/> Indonesian </div>'
        }, {
            id: 'Italian',
            text: '<div class="d-flex align-items-center gap-2" title="Italian"><img src="/assets/images/content123/flag/italian.png"/> Italian </div>'
        }, {
            id: 'Japanese',
            text: '<div class="d-flex align-items-center gap-2" title="Japanese"><img src="/assets/images/content123/flag/japanese.png"/> Japanese </div>'
        }, {
            id: 'Korean',
            text: '<div class="d-flex align-items-center gap-2" title="Korean"><img src="/assets/images/content123/flag/korean.png"/> Korean </div>'
        }, {
            id: 'Latvian',
            text: '<div class="d-flex align-items-center gap-2" title="Latvian"><img src="/assets/images/content123/flag/latvian.png"/> Latvian </div>'
        }, {
            id: 'Lithuanian',
            text: '<div class="d-flex align-items-center gap-2" title="Lithuanian"><img src="/assets/images/content123/flag/lithuanian.png"/> Lithuanian </div>'
        }, {
            id: 'Malay',
            text: '<div class="d-flex align-items-center gap-2" title="Malay"><img src="/assets/images/content123/flag/malay.png"/> Malay </div>'
        }, {
            id: 'Norwegian',
            text: '<div class="d-flex align-items-center gap-2" title="Norwegian"><img src="/assets/images/content123/flag/norwegian.png"/> Norwegian </div>'
        }, {
            id: 'Polish',
            text: '<div class="d-flex align-items-center gap-2" title="Polish"><img src="/assets/images/content123/flag/polish.png"/> Polish </div>'
        }, {
            id: 'Portuguese',
            text: '<div class="d-flex align-items-center gap-2" title="Portuguese"><img src="/assets/images/content123/flag/portuguese.png"/> Portuguese </div>'
        }, {
            id: 'Romanian',
            text: '<div class="d-flex align-items-center gap-2" title="Romanian"><img src="/assets/images/content123/flag/romanian.png"/> Romanian </div>'
        }, {
            id: 'Russian',
            text: '<div class="d-flex align-items-center gap-2" title="Russian"><img src="/assets/images/content123/flag/russian.png"/> Russian </div>'
        }, {
            id: 'Slovak',
            text: '<div class="d-flex align-items-center gap-2" title="Slovak"><img src="/assets/images/content123/flag/slovak.png"/> Slovak </div>'
        }, {
            id: 'Slovenian',
            text: '<div class="d-flex align-items-center gap-2" title="Slovenian"><img src="/assets/images/content123/flag/slovenian.png"/> Slovenian </div>'
        }, {
            id: 'Spanish',
            text: '<div class="d-flex align-items-center gap-2" title="Spanish"><img src="/assets/images/content123/flag/spanish.png"/> Spanish </div>'
        }, {
            id: 'Swedish',
            text: '<div class="d-flex align-items-center gap-2" title="Swedish"><img src="/assets/images/content123/flag/swedish.png"/> Swedish </div>'
        }, {
            id: 'Thai',
            text: '<div class="d-flex align-items-center gap-2" title="Thai"><img src="/assets/images/content123/flag/thai.png"/> Thai </div>'
        }, {
            id: 'Turkish',
            text: '<div class="d-flex align-items-center gap-2" title="Turkish"><img src="/assets/images/content123/flag/turkish.png"/> Turkish </div>'
        }, {
            id: 'Ukrainian',
            text: '<div class="d-flex align-items-center gap-2" title="Ukrainian"><img src="/assets/images/content123/flag/ukrainian.png"/> Ukrainian </div>'
        }, {
            id: 'Vietnamese',
            text: '<div class="d-flex align-items-center gap-2" title="Vietnamese"><img src="/assets/images/content123/flag/vietnamese.png"/> Vietnamese </div>'
        }]

        return languages;
    },

    hexToRgb: function (hex) {
        // Remove the hash at the start if it's there
        hex = hex.replace(/^#/, '');

        // Parse the hex value into R, G, and B components
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return {red: r, green: g, blue: b};
    },

    showLoading: function (message) {
        if (message == null || message == "") {
            $("#loading-overlay .message").html("Loading...");
        } else {
            $("#loading-overlay .message").html(message);
        }

        $("#loading-overlay").show();
    },
    hideLoading: function () {
        $("#loading-overlay").hide();
    },
};

var SEORushHome = {
    CDN_URL: 'https://dlnil54eooeso.cloudfront.net/',

    linkId: "",
    linkKeyword: '',
    linkTitle: '',

    MY_BLOG_POSTS: [],
    myBlogPostsTable: null,

    init: function () {
        var me = this;

        $('#managed_blog_modal .tooltip-icon').tooltip();

        // global
        if (mainUserDetails['embedScriptUrl'] != null && mainUserDetails['embedScriptUrl'] != '') {
            $("#codeIntegrationDialog .code-snippet code").text(mainUserDetails['embedScriptUrl']);
        } else {
            $(".welcome-page .code-integration-btn").hide();
        }

        if (mainUserDetails['hideCTAUpgradeLinks']) {
            $("#membership-upgrade-alert .btn").hide();
        }

        if (mainUserDetails['hideAllUpgradeLinks']) {
            $("#membership-upgrade-alert").hide();
            $('.sidebar .logo').css('marginTop', '0rem');
        } else {
            $('.sidebar .logo').css('marginTop', '3rem');
        }

        // logout
        $(".sidebar .logout .nav-link").attr('href', getApiUrl('logoutGeneric'));

        // adjust sidebar logo
        var topBarHeight = $('#membership-upgrade-alert').outerHeight();
        $(window).scroll(function () {
            if ($(this).scrollTop() > topBarHeight) {
                // If scrolled past the top bar, remove the margin
                $('.sidebar .logo').css('marginTop', '0rem');
            } else {
                // If top bar is visible, add the margin
                $('.sidebar .logo').css('marginTop', '3rem');
            }
        });

        $("#membership-upgrade-alert").on('click', '.btn', function (e) {
            e.preventDefault();
            callUpgradePage();
        });

        // Sidebar
        $(".sidebar").on('click', '.nav-item a:not(.active)', function () {
            var menu = $(this).data('menu');
            me.gotoPage(menu);
        });


        // buttons
        $(".welcome-page .publish-btn").on('click', function () {
            me.showPublishNewArticleDialog();
        });

        $("#wordLevelButton").on('click', '.btn', function () {
            $("#wordLevelButton .btn").removeClass('active');
            $(this).addClass('active');
        })

        // managed blog
        $('.welcome-page .manage-blog-btn').on('click', function () {
            var button = $(this);
            var offset = button.offset();

            // Position the popup below the button
            $('#managed_blog_modal').css({
                top: offset.top + button.outerHeight() + 5,
                left: offset.left - 200
            }).toggle(); // Toggle visibility of the popup
        });

        // Publish New Article Dialog
        $('#articleLanguage').select2({
            placeholder: "Please select a country",
            dropdownParent: $('#publishNewArticleDialog'), // Attaches the dropdown to the modal
            data: SEORushUtilities.loadLanguages(),
            templateResult: function (d) {
                return $(d.text);
            },
            templateSelection: function (d) {
                return $(d.text);
            },
        });

        $('#blogLinkKeyword').select2({
            placeholder: "Type a keyword or choose from the list...",
            dropdownParent: $('#publishNewArticleDialog'), // Attaches the dropdown to the modal
            allowClear: false,
        });

        $('#blogPostTitle').select2({
            placeholder: "Choose blog title from the list or type your own title...",
            dropdownParent: $('#publishNewArticleDialog'), // Attaches the dropdown to the modal
            allowClear: false,
        });

        $('#blogLinkKeyword').on('change', function () {
            me.loadBlogPostTitle($('#blogLinkKeyword').val());
        });

        $.getJSON(getApiUrl('getMyJsonPublishKeywordsWebsite'), function (data) {
            console.log('getMyJsonPublishKeywordsWebsite json ' + JSON.stringify(data));
            var list = data['list'];

            $("#blogLinkKeyword").empty().trigger("change");
            $("#blogLinkKeyword").select2({
                tokenSeparators: [',', ', ', '\n'],
                selectOnClose: true,
                dropdownParent: $('#publishNewArticleDialog'), // Attaches the dropdown to the modal
                data: list,
                tags: true,
                placeholder: 'Choose blog title from the list or type your own title...',
                "language": {
                    "noResults": () => 'Choose blog title from the list or type your own title...'
                },
            });
        });

        $("#publishNewArticleDialog").on('click', '.btn-generate', function (e) {
            e.preventDefault();
            me.generateArticle();
        })

        // fullscreen modal
        $('#fullscreen-modal .article-preview-wrapper .content-editing-area textarea').summernote({
            placeholder: 'Write something amazing...',
            tabsize: 2,
            height: 200,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ]
        });

        $("#fullscreen-modal").on('click', '.modal-content .back-btn', function () {
            $("#fullscreen-modal").hide();
        });

        $("#fullscreen-modal").on('click', '.modal-content .change-cover-btn', function () {
            $("#galleryDialog .tag-buttons").hide();

            $("#galleryDialog .image-grid").html("");
            $("#galleryDialog").modal('show');

            WidgetComponentPanel.GALLERY_COMPONENT = '#fullscreen-modal .article-preview-wrapper .header-information>.cover-image';
            WidgetComponentPanel.loadGallery(SEORushHome.linkKeyword);
        });

        $("#fullscreen-modal").on('click', '.save-draft-btn', function (e) {
            e.preventDefault()
            e.stopPropagation()

            me.publishMyBlogArticle();
        });

        $("#fullscreen-modal").on('click', '.publish-now-btn', function (e) {
            e.preventDefault()
            e.stopPropagation()

            me.publishMyBlogArticle();
        });

        // Publish Article Success Dialog
        $("#fullscreen-modal").on('click', '.rate-btn', function (e) {
            e.preventDefault()
            e.stopPropagation();

            $("#publishArticleSuccessModal").modal('hide');
        });

        // see live blog post
        $("#fullscreen-modal").on('click', '.btn-primary', function (e) {
            e.preventDefault()
            e.stopPropagation()

            $("#publishArticleSuccessModal").modal('hide');
        });

        $("#fullscreen-modal").on('click', '.add-new-btn', function (e) {
            e.preventDefault()
            e.stopPropagation()

            $("#publishArticleSuccessModal").modal('hide');
            me.showPublishNewArticleDialog();
        });

        $("#fullscreen-modal").on('click', '.blog-design-btn', function (e) {
            e.preventDefault()
            e.stopPropagation()

            $("#publishArticleSuccessModal").modal('hide');
        });

        me.initMyBlogPostsTable();
        me.loadMyBlogPosts();

        $("#my_blog_table").on('click', '.action-edit', function (e) {
            e.preventDefault();
            var row = me.myBlogPostsTable.row($(this).parent().parent().parent().parent()).data();
            me.editArticle(row.id);
        });

        $("#my_blog_table").on('click', '.action-delete', function () {
            var row = me.myBlogPostsTable.row($(this).parent().parent().parent().parent()).data();
            if (confirm("Are you sure")) {
                me.deleteArticle(row.id);
            }
        });

        $(document).click(function (event) {
            if (!$(event.target).closest('.welcome-page .manage-blog-btn, #managed_blog_modal').length) {
                $('#managed_blog_modal').hide();
            }
        });

        $("#publishArticleSuccessModal").on('click', '.see-live-post-btn', function (e) {
            e.preventDefault();
            $("#publishArticleSuccessModal").modal('hide');
        });

        $("#publishArticleSuccessModal").on('click', '.add-new-btn', function (e) {
            e.preventDefault();
            $("#publishArticleSuccessModal").modal('hide');
            setTimeout(function () {
                me.showPublishNewArticleDialog();
            }, 500);
        });

        $("#publishArticleSuccessModal").on('click', '.blog-design-btn', function (e) {
            e.preventDefault();
            $("#publishArticleSuccessModal").modal('hide');
            SEORushHome.gotoPage('my-blog');
        });
    },

    gotoPage: function (menu) {
        $(".sidebar a").removeClass('active');
        $(".sidebar a[data-menu='" + menu + "']").addClass('active');

        // $(".top-nav a").removeClass('active');
        // $(".sidebar a[data-menu='"+menu+"']").addClass('active');

        $(".content").hide();
        $(".content." + menu + "-page").show()

        if (menu == 'welcome') {
            SEORushHome.show();
        } else if (menu == 'optimization') {
            OptimizationPage.show();
        } else if (menu == 'my-blog') {
            MyBlogPage.show();
        } else if (menu == 'local-listings') {
            MyBlogPage.show();
        } else if (menu == 'guest-posts') {
            GuestPostsPage.show();
        } else if (menu == 'insights') {
            InsightsPage.show();
        } else if (menu == 'keywords') {
            KeywordsPage.show();
        } else if (menu == 'competitors') {
            CompetitorsPage.show();
        }
    },

    initMyBlogPostsTable: function () {
        this.myBlogPostsTable = $('#my_blog_table').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            columnDefs: [{orderable: false, targets: -1}],
            columns: [{
                data: 'pageTitle',
            }, {
                data: 'pageUrl',
            }, {
                data: 'keywordName',
            }, {
                render: function (data, type, row) {
                    return '';
                }
            }, {
                data: 'linkStatus',
                render: function (data, type, row) {
                    if (data == 'Live')
                        return '<span class="badge-success">Visible</span>';
                    return '<span class="badge-danger">Hidden</span>';
                }
            }, {
                data: 'dateCreated',
                render: function (data, type, row) {
                    return SEORushUtilities.formatDate(data);
                }
            }, {
                render: function (data, type, row) {
                    return `
                            <div class="dropdown">
                                <span class="has-action bi bi-three-dots-vertical" id="dropdownMenuButton${row.id}" data-bs-toggle="dropdown" aria-expanded="false"></span>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton${row.id}">
                                    <li class="dropdown-item action-edit">
                                        <span><i class="bi bi-sliders"></i> &nbsp; Edit</span>
                                    </li>
                                    <li class="dropdown-item text-danger action-delete">
                                        <span><i class="bi bi-trash"></i> &nbsp; Delete</span>
                                    </li>
                                </ul>
                            </div>                         
                    `;
                }
            }
            ],
            order: [[5, 'desc']]
        });
    },

    loadMyBlogPosts: function () {
        var me = this;
        const linksUrl = getApiUrl('jsonByOnlyBlogsLink');
        SEORushUtilities.showLoading();
        $.getJSON(linksUrl, function (json) {
            SEORushUtilities.hideLoading();
            if (json && json['list']) {
                me.MY_BLOG_POSTS = json['list'];
                me.showMyBlogPosts(json['list']);
            }
        });
    },

    showMyBlogPosts: function (list) {
        var me = this;

        SEORushHome.myBlogPostsTable.clear();
        $.each(list, function (index, row) {
            SEORushHome.myBlogPostsTable.row.add(row);
        });

        SEORushHome.myBlogPostsTable.draw();

        $("#my_blog_post_count .text-muted").html("(" + list.length + (list.length > 1 ? ' Items' : ' Item') + ")");
    },

    loadBlogPostTitle: function (keyword) {
        if (keyword == null || keyword == "" || keyword.length == 0) {
            $("#blogPostTitle").empty().trigger("change");
            return;
        }

        this.linkKeyword = keyword;
        SEORushUtilities.showLoading();
        const url = getApiUrl('getMyJsonOpenAiIdeasLink?keyword=' + encodeURIComponent(keyword) +
            '&linkHref=' + encodeURIComponent("") +
            ($("#articleLanguage") ? '&language=' + encodeURIComponent($("#articleLanguage").val()) : ''));
        // console.log('initTitleIdeas url is ' + url);

        $.getJSON(url, function (data) {
            if (data['list'] && data['list'].length > 0) {
                $("#blogPostTitle").empty().trigger("change");
                $("#blogPostTitle").select2({
                    tokenSeparators: [',', ', ', '\n'],
                    selectOnClose: true,
                    dropdownParent: $('#publishNewArticleDialog'), // Attaches the dropdown to the modal
                    data: data['list'],
                    tags: true,
                    placeholder: 'Enter a keyword to promote',
                    "language": {
                        "noResults": () => 'Enter a keyword to promote'
                    },
                });
            } else {
                $("#blogPostTitle").empty().trigger("change");
            }
        }).done(function () {
            SEORushUtilities.hideLoading();
        }).fail(function () {
            SEORushUtilities.hideLoading();
        });
    },

    generateArticle: function () {
        var me = this;
        var title = $("#blogPostTitle").val();
        if (title == null || title == "") {
            alert('Please Choose Blog Post Title or Type it...');
            return false;
        }

        let json = {};
        json['wordsCount'] = isTestingMode() ? 100 : parseInt($("#wordLevelButton .btn.active").data('level'));
        json['title'] = $("#blogPostTitle").val();
        json['linkKeyword'] = $("#blogLinkKeyword").val();
        json['language'] = encodeURIComponent($("#articleLanguage").val());

        SEORushUtilities.showLoading();
        $.ajax({
            type: 'POST',
            url: getApiUrl('generateArticleLink'),
            dataType: 'json',
            data: json,
            async: true,
            success: function (data) {
                SEORushUtilities.hideLoading();
                if (data.obj == null) {
                    if (data['status'] != null && data['status'] != '') {
                        alert(data['status'])
                    }
                } else {
                    me.linkId = "";
                    me.showArticlePreviewDialog(data);
                }
            },
            error: function () {
                SEORushUtilities.hideLoading();
            }
        });
    },

    editArticle: function (id) {
        var me = this;
        var json = {};
        json['linkId'] = id;

        SEORushUtilities.showLoading();
        $.ajax({
            type: 'POST',
            url: getApiUrl('editMyBlogArticleLink'),
            dataType: 'json',
            data: json,
            async: true,
            success: function (json) {
                SEORushUtilities.hideLoading();
                console.log('editMyBlogArticleLink result ' + JSON.stringify(json));
                if (json['obj']) {
                    me.linkId = id;
                    me.linkKeyword = json['obj']['keyword'];
                    me.linkTitle = json['obj']['title'];
                    me.showArticlePreviewDialog(json);
                }
            },
            error: function () {
                SEORushUtilities.hideLoading();
            }
        });
    },

    showPublishNewArticleDialog: function () {
        $("#blogLinkKeyword").val("").trigger('change');
        $("#blogPostTitle").empty().trigger("change");

        $("#articleLanguage").val('English').trigger('change');
        $("#wordLevelButton .btn").removeClass('active')
        $("#wordLevelButton .btn[data-level=600]").addClass('active');
        $("#publishDate").val(SEORushUtilities.today());

        $("#publishNewArticleDialog").modal('show');
    },

    showArticlePreviewDialog: function (data) {
        var me = this;

        $("#fullscreen-modal .article-preview-wrapper .header-information>h1").text(data['obj']['title']);

        var img = SEORushHome.CDN_URL + "user-links-images/" + me.linkId + '.png'
        if (me.linkId == "") {
            img = "";
        }

        $("#fullscreen-modal .article-preview-wrapper .header-information>.cover-image").attr('data-image', img);
        $("#fullscreen-modal .article-preview-wrapper .header-information>.cover-image").css('background', "url('" + (img == '' ? '/assets/images/blank_10.png' : img) + "') center/cover no-repeat");

        $("#fullscreen-modal .article-preview-wrapper .header-information>p").text(SEORushHome.linkId == "" ? $("#publishDate").val() : SEORushUtilities.today());
        $("#fullscreen-modal .article-preview-wrapper .content-editing-area>textarea").summernote('code', data['obj']['article'].replace(/<br\s*\/?>\n/g, '<br>'));

        $("#fullscreen-modal").show();
    },

    publishMyBlogArticle: function () {
        // TODO - add structure to uglify
        var me = this;
        let json = {};
        json['linkId'] = me.linkId;
        json['imageUrl'] = $("#fullscreen-modal .article-preview-wrapper .header-information>.cover-image").attr('data-image');
        json['title'] = me.linkId = "" ? $("#blogPostTitle").val() : me.linkTitle;
        const summernote = $("#fullscreen-modal .article-preview-wrapper .content-editing-area>textarea").summernote('code');
        json['plainText'] = summernote.replace(/<\/?[^>]+(>|$)/g, "");
        json['text'] = summernote;
        json['linkKeyword'] = me.linkId == "" ? $("#blogLinkKeyword").val() : me.linkKeyword;

        SEORushUtilities.showLoading("Publishing.....")
        console.log('publishMyBlogArticle request is ' + JSON.stringify(json));
        $.ajax({
            type: 'POST',
            url: getApiUrl('publishMyBlogArticleLink'),
            dataType: 'json',
            data: json,
            async: true,
            success: function (json) {
                console.log("--------publishing  article-------", json);
                SEORushUtilities.hideLoading();


                $('#fullscreen-modal').hide();
                $("#publishNewArticleDialog").modal('hide');

                if (json != null && json['status'] != null) {
                    if (json['status'] != "")
                        alert(json['status']);
                } else {
                    $("#publishArticleSuccessModal").modal('show');
                }
            },
            error: function () {
                SEORushUtilities.hideLoading()
            }
        });
    },
    deleteArticle: function (id) {
        var me = this;

        SEORushUtilities.showLoading("Deleting.....")
        $.ajax({
            type: 'POST',
            url: getApiUrl('editLink'),
            data: getPostParams('oper=del&id=' + id),
            async: true,
            success: function (json) {
                SEORushUtilities.hideLoading()
                console.log("--------deleting article-------", json);

                if (json != null && json['status'] != null) {
                    if (json['status'] != "")
                        alert(json['status']);
                } else {
                    me.loadMyBlogPosts()
                }
            },
            error: function () {
                SEORushUtilities.hideLoading()
            }
        });
    },

    show: function () {
        this.loadMyBlogPosts()
    },
};

var MyBlogPage = {
    previewMode: "desktop",

    init: function () {
        $("#blogTab").on('click', '.nav-item .nav-link', function (e) {
            var tab = $(this).data('tab');
            if (tab == 'template') {
                PreviewWidget.show('template')
            } else if (tab == 'customize') {
                $("#customizationTab .nav-item .nav-link.active").trigger('click');
            }
        });

        $("#customizationTab").on('click', '.nav-item .nav-link', function (e) {
            var tab = $(this).data('tab');
            if (tab == 'blog') {
                PreviewWidget.show('template')
            } else if (tab == 'post') {
                PreviewWidget.show('article')
            } else if (tab == 'icon') {

            }
        });

        // template item
        $(".my-blog-page .widget-area").on('click', '.blog-template-container .template-item:not(.active)', function (e) {
            var template = $(this).find('img').data('image');
            $(".my-blog-page .widget-area .blog-template-container .template-item").removeClass('active');
            $(this).addClass('active');

            PreviewWidget.show("template", template);
        });

        // preview actions (desktop, mobile, fullscreen)
        $(".my-blog-page .preview-area .toolbar ").on('click', '.icons-section .icon-btn:not(.active)', function (e) {
            if ($(".my-blog-page .widget-area .blog-template-container .template-item.active").length == 0) {
                e.preventDefault();
                return false;
            }

            var type = $(this).data('type');
            if (type == "desktop" || type == "mobile") {
                $(".my-blog-page .preview-area .toolbar .icons-section .icon-btn").removeClass('active');
                $(this).addClass('active');

                $("#preview_content").removeClass('mobile-view').removeClass('fullscreen-view');
                if (type == "mobile") {
                    $("#preview_content").addClass('mobile-view')
                }
            } else {    // fullscreen
                $("#fullscreen_preview_content").html($("#preview_content").html());
                $("#fullscreenDialog").modal('show');
            }
        });

        // customize, publish
        $(".my-blog-page .preview-area .toolbar ").on('click', '.buttons-section .btn', function (e) {
            if ($(".my-blog-page .widget-area .blog-template-container .template-item.active").length == 0) {
                e.preventDefault();
                return false;
            }

            var type = $(this).data('type');
            if (type == "customize") {
                // TODO - customize blog template
                $('#My_blog-customization-tab').tab('show');

            } else if (type == "publish") {
                // TODO - publish template directly
                PreviewWidget.publish(false);
            }
        });

        // Create a ResizeObserver instance
        var resizeObserver = new ResizeObserver(function (entries) {
            entries.forEach(function (entry) {
                var h = $(".my-blog-page .widget-area").height() - 180;
                $("#sitePreview").css('height', h + 'px');
                $("#sitePreview").css('maxHeight', h + 'px');

                $(window).trigger('scroll');
            });
        });
        resizeObserver.observe($(".my-blog-page .widget-area")[0]);
    },

    show: function () {
        var me = this;

        me.previewMode = "desktop";
        PreviewWidget.isPreview = false;

        $(".my-blog-page .preview-area .toolbar .icons-section .icon-btn").removeClass('active');
        $(".my-blog-page .preview-area .toolbar .icons-section .icon-btn[data-type='desktop']").addClass('active');

        $("#My_blogTemplateTab .blog-template-container .template-item").removeClass('active');
        $(".plugin-widget-container").removeClass('active');
        $("#preview_content").removeClass('overlay');
        $(".my-blog-page .preview-panel>.container-fluid>.blog-article-container").hide();

        $(window).trigger('scroll');
    }
}

var OptimizationPage = {
    LEVELS: [
        `<svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4762 2.33031L31.4361 22.6251C32.1811 23.8851 32.1911 25.4001 31.4611 26.6751C30.7361 27.9501 29.4261 28.7101 27.9561 28.7101H4.04131C2.57633 28.7101 1.26134 27.9501 0.536347 26.6751C-0.188646 25.4051 -0.178646 23.8901 0.566347 22.6251L12.5262 2.32531C13.2562 1.08533 14.5562 0.340332 16.0012 0.340332C17.4462 0.340332 18.7462 1.08532 19.4762 2.33031ZM27.9561 27.7401C29.0711 27.7401 30.0661 27.1651 30.6211 26.1951C31.1761 25.2251 31.1661 24.0751 30.6011 23.1151L18.6412 2.82031C18.0862 1.87532 17.0962 1.31032 16.0012 1.31032C14.9062 1.31032 13.9162 1.87532 13.3612 2.82031L1.40134 23.1151C0.836344 24.0751 0.821344 25.2301 1.37634 26.1951C1.93133 27.1601 2.92632 27.7401 4.04131 27.7401H27.9561ZM18.1607 9.08558C17.7057 8.31058 16.9007 7.85059 16.0007 7.85059C15.1057 7.85059 14.2957 8.31058 13.8407 9.08558L7.0358 20.6355C6.57081 21.4205 6.56581 22.3605 7.0158 23.1504C7.4658 23.9404 8.28079 24.4154 9.19078 24.4154H22.8007C23.7106 24.4154 24.5256 23.9454 24.9756 23.1504C25.4256 22.3605 25.4206 21.4205 24.9556 20.6355L18.1607 9.08558ZM15.9415 19.1151C15.8065 19.1151 15.6915 19.0801 15.6065 19.0001C15.5215 18.9251 15.4715 18.8201 15.4615 18.7001L15.2715 15.2151V14.1651C15.2715 13.9801 15.3365 13.8201 15.4615 13.6901C15.7215 13.4351 16.1615 13.4351 16.4115 13.6951C16.5365 13.8201 16.6015 13.9801 16.6015 14.1651V15.2101L16.4065 18.6951C16.3965 18.8201 16.3515 18.9201 16.2715 19.0001C16.1865 19.0751 16.0765 19.1151 15.9415 19.1151ZM15.4154 19.9203C15.5604 19.7753 15.7354 19.6953 15.9404 19.6953C16.1504 19.6953 16.3254 19.7703 16.4754 19.9203C16.6204 20.0653 16.6954 20.2403 16.6954 20.4453C16.6954 20.6553 16.6204 20.8353 16.4754 20.9803C16.3304 21.1253 16.1504 21.2003 15.9404 21.2003C15.7354 21.2003 15.5604 21.1253 15.4154 20.9803C15.2704 20.8353 15.1904 20.6553 15.1904 20.4453C15.1904 20.2403 15.2704 20.0653 15.4154 19.9203ZM30.3566 10.6907C30.4466 10.8457 30.6066 10.9307 30.7766 10.9307C30.8616 10.9307 30.9466 10.9107 31.0216 10.8657C31.2516 10.7307 31.3266 10.4307 31.1916 10.2007L29.3766 7.11573C29.2416 6.88573 28.9416 6.80573 28.7116 6.94573C28.4816 7.08073 28.4067 7.38072 28.5417 7.61072L30.3566 10.6907ZM29.5512 14.6703C29.3812 14.6703 29.2212 14.5853 29.1312 14.4303L24.7262 6.96033C24.5912 6.73033 24.6662 6.43034 24.8962 6.29534C25.1262 6.15534 25.4262 6.23534 25.5612 6.46534L29.9662 13.9403C30.1012 14.1703 30.0262 14.4703 29.7962 14.6053C29.7212 14.6503 29.6362 14.6703 29.5512 14.6703ZM0.982157 10.8607C1.05716 10.9057 1.14216 10.9257 1.22715 10.9257C1.39215 10.9257 1.55715 10.8407 1.64715 10.6857L3.46213 7.60069C3.59713 7.37069 3.52213 7.07069 3.29214 6.93569C3.06214 6.80069 2.76214 6.87569 2.62714 7.10569L0.812158 10.1907C0.67716 10.4307 0.752159 10.7257 0.982157 10.8607ZM2.45644 14.6652C2.37144 14.6652 2.28645 14.6452 2.21145 14.6002C1.98145 14.4652 1.90145 14.1652 2.03645 13.9352L6.44641 6.4553C6.58141 6.2253 6.8814 6.1503 7.1114 6.2853C7.3414 6.4203 7.4164 6.7203 7.2814 6.9503L2.87644 14.4252C2.78644 14.5802 2.62144 14.6652 2.45644 14.6652Z" fill="#DC3545"/>
         </svg>`,   // critical
        `<svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4762 2.33031L31.4361 22.6251C32.1811 23.8851 32.1911 25.4001 31.4611 26.6751C30.7361 27.9501 29.4261 28.7101 27.9561 28.7101H4.04131C2.57633 28.7101 1.26134 27.9501 0.536347 26.6751C-0.188646 25.4051 -0.178646 23.8901 0.566347 22.6251L12.5262 2.32531C13.2562 1.08533 14.5562 0.340332 16.0012 0.340332C17.4462 0.340332 18.7462 1.08532 19.4762 2.33031ZM27.9561 27.7401C29.0711 27.7401 30.0661 27.1651 30.6211 26.1951C31.1761 25.2251 31.1661 24.0751 30.6011 23.1151L18.6412 2.82031C18.0862 1.87532 17.0962 1.31032 16.0012 1.31032C14.9062 1.31032 13.9162 1.87532 13.3612 2.82031L1.40134 23.1151C0.836344 24.0751 0.821344 25.2301 1.37634 26.1951C1.93133 27.1601 2.92632 27.7401 4.04131 27.7401H27.9561ZM18.1607 9.08558C17.7057 8.31058 16.9007 7.85059 16.0007 7.85059C15.1057 7.85059 14.2957 8.31058 13.8407 9.08558L7.0358 20.6355C6.57081 21.4205 6.56581 22.3605 7.0158 23.1504C7.4658 23.9404 8.28079 24.4154 9.19078 24.4154H22.8007C23.7106 24.4154 24.5256 23.9454 24.9756 23.1504C25.4256 22.3605 25.4206 21.4205 24.9556 20.6355L18.1607 9.08558ZM15.9415 19.1151C15.8065 19.1151 15.6915 19.0801 15.6065 19.0001C15.5215 18.9251 15.4715 18.8201 15.4615 18.7001L15.2715 15.2151V14.1651C15.2715 13.9801 15.3365 13.8201 15.4615 13.6901C15.7215 13.4351 16.1615 13.4351 16.4115 13.6951C16.5365 13.8201 16.6015 13.9801 16.6015 14.1651V15.2101L16.4065 18.6951C16.3965 18.8201 16.3515 18.9201 16.2715 19.0001C16.1865 19.0751 16.0765 19.1151 15.9415 19.1151ZM15.4154 19.9203C15.5604 19.7753 15.7354 19.6953 15.9404 19.6953C16.1504 19.6953 16.3254 19.7703 16.4754 19.9203C16.6204 20.0653 16.6954 20.2403 16.6954 20.4453C16.6954 20.6553 16.6204 20.8353 16.4754 20.9803C16.3304 21.1253 16.1504 21.2003 15.9404 21.2003C15.7354 21.2003 15.5604 21.1253 15.4154 20.9803C15.2704 20.8353 15.1904 20.6553 15.1904 20.4453C15.1904 20.2403 15.2704 20.0653 15.4154 19.9203ZM30.3566 10.6907C30.4466 10.8457 30.6066 10.9307 30.7766 10.9307C30.8616 10.9307 30.9466 10.9107 31.0216 10.8657C31.2516 10.7307 31.3266 10.4307 31.1916 10.2007L29.3766 7.11573C29.2416 6.88573 28.9416 6.80573 28.7116 6.94573C28.4816 7.08073 28.4067 7.38072 28.5417 7.61072L30.3566 10.6907ZM29.5512 14.6703C29.3812 14.6703 29.2212 14.5853 29.1312 14.4303L24.7262 6.96033C24.5912 6.73033 24.6662 6.43034 24.8962 6.29534C25.1262 6.15534 25.4262 6.23534 25.5612 6.46534L29.9662 13.9403C30.1012 14.1703 30.0262 14.4703 29.7962 14.6053C29.7212 14.6503 29.6362 14.6703 29.5512 14.6703ZM0.982157 10.8607C1.05716 10.9057 1.14216 10.9257 1.22715 10.9257C1.39215 10.9257 1.55715 10.8407 1.64715 10.6857L3.46213 7.60069C3.59713 7.37069 3.52213 7.07069 3.29214 6.93569C3.06214 6.80069 2.76214 6.87569 2.62714 7.10569L0.812158 10.1907C0.67716 10.4307 0.752159 10.7257 0.982157 10.8607ZM2.45644 14.6652C2.37144 14.6652 2.28645 14.6452 2.21145 14.6002C1.98145 14.4652 1.90145 14.1652 2.03645 13.9352L6.44641 6.4553C6.58141 6.2253 6.8814 6.1503 7.1114 6.2853C7.3414 6.4203 7.4164 6.7203 7.2814 6.9503L2.87644 14.4252C2.78644 14.5802 2.62144 14.6652 2.45644 14.6652Z" fill="#FD7E14"/>
        </svg>`,    // warning
        `<svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4762 2.33031L31.4361 22.6251C32.1811 23.8851 32.1911 25.4001 31.4611 26.6751C30.7361 27.9501 29.4261 28.7101 27.9561 28.7101H4.04131C2.57633 28.7101 1.26134 27.9501 0.536347 26.6751C-0.188646 25.4051 -0.178646 23.8901 0.566347 22.6251L12.5262 2.32531C13.2562 1.08533 14.5562 0.340332 16.0012 0.340332C17.4462 0.340332 18.7462 1.08532 19.4762 2.33031ZM27.9561 27.7401C29.0711 27.7401 30.0661 27.1651 30.6211 26.1951C31.1761 25.2251 31.1661 24.0751 30.6011 23.1151L18.6412 2.82031C18.0862 1.87532 17.0962 1.31032 16.0012 1.31032C14.9062 1.31032 13.9162 1.87532 13.3612 2.82031L1.40134 23.1151C0.836344 24.0751 0.821344 25.2301 1.37634 26.1951C1.93133 27.1601 2.92632 27.7401 4.04131 27.7401H27.9561ZM18.1607 9.08558C17.7057 8.31058 16.9007 7.85059 16.0007 7.85059C15.1057 7.85059 14.2957 8.31058 13.8407 9.08558L7.0358 20.6355C6.57081 21.4205 6.56581 22.3605 7.0158 23.1504C7.4658 23.9404 8.28079 24.4154 9.19078 24.4154H22.8007C23.7106 24.4154 24.5256 23.9454 24.9756 23.1504C25.4256 22.3605 25.4206 21.4205 24.9556 20.6355L18.1607 9.08558ZM20.0891 15.4994C20.0651 15.3514 19.9753 15.2259 19.8378 15.1203C19.7003 15.0147 19.557 14.9695 19.4118 14.9794C19.2677 14.9983 19.1437 15.065 19.0358 15.1845L16.112 18.5817L15.494 19.3867L15.3334 19.1774L13.225 16.718C13.1498 16.6353 13.0537 16.5862 12.9487 16.579C12.8409 16.5681 12.7365 16.6073 12.637 16.6835C12.5376 16.7598 12.4792 16.8514 12.459 16.9546C12.4452 17.0587 12.4686 17.1578 12.5318 17.2555L14.3567 19.9324L14.947 20.702C15.0079 20.7814 15.0803 20.8421 15.1623 20.8832C15.2562 20.9985 15.4977 21.0552 16.0846 21.0213C16.3136 20.9866 16.5049 20.8745 16.6496 20.686L17.4706 19.6166L20.0022 15.9183C20.0859 15.7883 20.117 15.6422 20.0891 15.4994ZM30.3566 10.6907C30.4466 10.8457 30.6066 10.9307 30.7766 10.9307C30.8616 10.9307 30.9466 10.9107 31.0216 10.8657C31.2516 10.7307 31.3266 10.4307 31.1916 10.2007L29.3766 7.11573C29.2416 6.88573 28.9416 6.80573 28.7116 6.94573C28.4816 7.08073 28.4067 7.38072 28.5417 7.61072L30.3566 10.6907ZM29.5512 14.6703C29.3812 14.6703 29.2212 14.5853 29.1312 14.4303L24.7262 6.96033C24.5912 6.73033 24.6662 6.43034 24.8962 6.29534C25.1262 6.15534 25.4262 6.23534 25.5612 6.46534L29.9662 13.9403C30.1012 14.1703 30.0262 14.4703 29.7962 14.6053C29.7212 14.6503 29.6362 14.6703 29.5512 14.6703ZM0.982157 10.8607C1.05716 10.9057 1.14216 10.9257 1.22715 10.9257C1.39215 10.9257 1.55715 10.8407 1.64715 10.6857L3.46213 7.60069C3.59713 7.37069 3.52213 7.07069 3.29214 6.93569C3.06214 6.80069 2.76214 6.87569 2.62714 7.10569L0.812158 10.1907C0.67716 10.4307 0.752159 10.7257 0.982157 10.8607ZM2.45644 14.6652C2.37144 14.6652 2.28645 14.6452 2.21145 14.6002C1.98145 14.4652 1.90145 14.1652 2.03645 13.9352L6.44641 6.4553C6.58141 6.2253 6.8814 6.1503 7.1114 6.2853C7.3414 6.4203 7.4164 6.7203 7.2814 6.9503L2.87644 14.4252C2.78644 14.5802 2.62144 14.6652 2.45644 14.6652Z" fill="#0D6EFD"/>
        </svg>`,    // acceptable
        `<svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4762 2.33031L31.4361 22.6251C32.1811 23.8851 32.1911 25.4001 31.4611 26.6751C30.7361 27.9501 29.4261 28.7101 27.9561 28.7101H4.04131C2.57633 28.7101 1.26134 27.9501 0.536347 26.6751C-0.188646 25.4051 -0.178646 23.8901 0.566347 22.6251L12.5262 2.32531C13.2562 1.08533 14.5562 0.340332 16.0012 0.340332C17.4462 0.340332 18.7462 1.08532 19.4762 2.33031ZM27.9561 27.7401C29.0711 27.7401 30.0661 27.1651 30.6211 26.1951C31.1761 25.2251 31.1661 24.0751 30.6011 23.1151L18.6412 2.82031C18.0862 1.87532 17.0962 1.31032 16.0012 1.31032C14.9062 1.31032 13.9162 1.87532 13.3612 2.82031L1.40134 23.1151C0.836344 24.0751 0.821344 25.2301 1.37634 26.1951C1.93133 27.1601 2.92632 27.7401 4.04131 27.7401H27.9561ZM18.1607 9.08558C17.7057 8.31058 16.9007 7.85059 16.0007 7.85059C15.1057 7.85059 14.2957 8.31058 13.8407 9.08558L7.0358 20.6355C6.57081 21.4205 6.56581 22.3605 7.0158 23.1504C7.4658 23.9404 8.28079 24.4154 9.19078 24.4154H22.8007C23.7106 24.4154 24.5256 23.9454 24.9756 23.1504C25.4256 22.3605 25.4206 21.4205 24.9556 20.6355L18.1607 9.08558ZM20.0891 15.4994C20.0651 15.3514 19.9753 15.2259 19.8378 15.1203C19.7003 15.0147 19.557 14.9695 19.4118 14.9794C19.2677 14.9983 19.1437 15.065 19.0358 15.1845L16.112 18.5817L15.494 19.3867L15.3334 19.1774L13.225 16.718C13.1498 16.6353 13.0537 16.5862 12.9487 16.579C12.8409 16.5681 12.7365 16.6073 12.637 16.6835C12.5376 16.7598 12.4792 16.8514 12.459 16.9546C12.4452 17.0587 12.4686 17.1578 12.5318 17.2555L14.3567 19.9324L14.947 20.702C15.0079 20.7814 15.0803 20.8421 15.1623 20.8832C15.2562 20.9985 15.4977 21.0552 16.0846 21.0213C16.3136 20.9866 16.5049 20.8745 16.6496 20.686L17.4706 19.6166L20.0022 15.9183C20.0859 15.7883 20.117 15.6422 20.0891 15.4994ZM30.3566 10.6907C30.4466 10.8457 30.6066 10.9307 30.7766 10.9307C30.8616 10.9307 30.9466 10.9107 31.0216 10.8657C31.2516 10.7307 31.3266 10.4307 31.1916 10.2007L29.3766 7.11573C29.2416 6.88573 28.9416 6.80573 28.7116 6.94573C28.4816 7.08073 28.4067 7.38072 28.5417 7.61072L30.3566 10.6907ZM29.5512 14.6703C29.3812 14.6703 29.2212 14.5853 29.1312 14.4303L24.7262 6.96033C24.5912 6.73033 24.6662 6.43034 24.8962 6.29534C25.1262 6.15534 25.4262 6.23534 25.5612 6.46534L29.9662 13.9403C30.1012 14.1703 30.0262 14.4703 29.7962 14.6053C29.7212 14.6503 29.6362 14.6703 29.5512 14.6703ZM0.982157 10.8607C1.05716 10.9057 1.14216 10.9257 1.22715 10.9257C1.39215 10.9257 1.55715 10.8407 1.64715 10.6857L3.46213 7.60069C3.59713 7.37069 3.52213 7.07069 3.29214 6.93569C3.06214 6.80069 2.76214 6.87569 2.62714 7.10569L0.812158 10.1907C0.67716 10.4307 0.752159 10.7257 0.982157 10.8607ZM2.45644 14.6652C2.37144 14.6652 2.28645 14.6452 2.21145 14.6002C1.98145 14.4652 1.90145 14.1652 2.03645 13.9352L6.44641 6.4553C6.58141 6.2253 6.8814 6.1503 7.1114 6.2853C7.3414 6.4203 7.4164 6.7203 7.2814 6.9503L2.87644 14.4252C2.78644 14.5802 2.62144 14.6652 2.45644 14.6652Z" fill="#198754"/>
        </svg>`,    // good
    ],
    LANDING_PAGES: [],
    landingPageDetails: null,

    init: function () {
        var me = this;

        // tooltip
        $('.optimization-page .card-body .info-icon').tooltip();

        $('#landingPageDetails_keywordsList').select2({
            placeholder: "No Keyword",
            dropdownParent: $('#keyword_overview_card'), // Attaches the dropdown to the modal
            allowClear: false,
        });

        $("#landingPageDetails_keywordsList").on('change', function(e) {
            var keyword = $(this).val();
            if (keyword!=null && keyword!='') {
                me.landingPageDetails.keyword = keyword;
                me.getLandingPageDetails(me.landingPageDetails);
            }
        });

        // table
        $('.optimization-page .landing-pages-table th').click(function () {
            var table = $(this).parents('table').eq(0)
            var rows = table.find('tbody tr').toArray().sort(comparer($(this).index()))
            this.asc = !this.asc
            if (!this.asc) {
                rows = rows.reverse()
            }
            table.children('tbody').empty().html(rows)
            resetSortingIcons();
            $(this).find('.sorting-icon')
                .removeClass('bi-chevron-expand bi-chevron-up bi-chevron-down')
                .addClass(this.asc ? 'bi-chevron-up' : 'bi-chevron-down');
        });

        function resetSortingIcons() {
            $('.optimization-page .landing-pages-table .sorting-icon').removeClass('bi-chevron-up bi-chevron-down').addClass('bi-chevron-expand');
        }

        function comparer(index) {
            return function (a, b) {
                var valA = getCellValue(a, index)
                var valB = getCellValue(b, index)
                var sortType = $('th').eq(index).data('sort');
                if (sortType === 'number') {
                    return parseFloat(valA) - parseFloat(valB)
                } else {
                    return valA.toString().localeCompare(valB)
                }
            }
        }

        function getCellValue(row, index) {
            return $(row).children('td').eq(index).text()
        }

        $('.optimization-page .landing-pages-table tbody').on('click', 'tr', function (e) {
            e.preventDefault();

            $('.optimization-page .landing-pages-table tr').removeClass('active');
            $(this).addClass('active');
            var index = $(this).data('index');

            me.getLandingPageDetails(me.LANDING_PAGES[index]);
        });

        // landing detail page
        $('.optimization-page .internal-links-table th').click(function () {
            var table = $(this).parents('table').eq(0)
            var rows = table.find('tbody tr').toArray().sort(comparer($(this).index()))
            this.asc = !this.asc
            if (!this.asc) {
                rows = rows.reverse()
            }
            table.children('tbody').empty().html(rows)
            resetSortingIconsForInternalLinks();
            $(this).find('.sorting-icon')
                .removeClass('bi-chevron-expand bi-chevron-up bi-chevron-down')
                .addClass(this.asc ? 'bi-chevron-up' : 'bi-chevron-down');
        });

        function resetSortingIconsForInternalLinks() {
            $('.optimization-page .internal-links-table .sorting-icon').removeClass('bi-chevron-up bi-chevron-down').addClass('bi-chevron-expand');
        }

        $('.optimization-page .external-links-table th').click(function () {
            var table = $(this).parents('table').eq(0)
            var rows = table.find('tbody tr').toArray().sort(comparer($(this).index()))
            this.asc = !this.asc
            if (!this.asc) {
                rows = rows.reverse()
            }
            table.children('tbody').empty().html(rows)
            resetSortingIconsForExternalLinks();
            $(this).find('.sorting-icon')
                .removeClass('bi-chevron-expand bi-chevron-up bi-chevron-down')
                .addClass(this.asc ? 'bi-chevron-up' : 'bi-chevron-down');
        });

        function resetSortingIconsForExternalLinks() {
            $('.optimization-page .external-links-table .sorting-icon').removeClass('bi-chevron-up bi-chevron-down').addClass('bi-chevron-expand');
        }

        // actions
        $(".optimization-page .rescan-btn").on('click', function (e) {
            e.preventDefault();

            if ($('.optimization-page .landing-pages-table tr.active').length == 0 || me.landingPageDetails == null) {
                return;
            }

            me.getLandingPageDetails(me.landingPageDetails);
        });

        // page title
        $("#page_title_card .btn-new-page-title").on('click', function (e) {
            e.preventDefault();
        });
        $("#page_title_card .btn-learn-more").on('click', function (e) {
            e.preventDefault();
        });

        // h1 tag
        $("#h1_tag_card .btn-new-h1-tag").on('click', function (e) {
            e.preventDefault();
        });
        $("#h1_tag_card .btn-learn-more").on('click', function (e) {
            e.preventDefault();
        });

        // meta description
        $("#meta_description_card .btn-new-meta-description").on('click', function (e) {
            e.preventDefault();
        });
        $("#meta_description_card .btn-learn-more").on('click', function (e) {
            e.preventDefault();
        });

        // page content
        $("#page_content_card .btn-more-page-content").on('click', function (e) {
            e.preventDefault();
        });
        $("#page_content_card .btn-learn-more").on('click', function (e) {
            e.preventDefault();
        });

        $(".optimization-page .details-keyword .card.card-keyword .overlay-upgrade-btn").on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            // TODO - test upgrade dialog
            callUpgradePage();
        })
    },

    getLandingPageDetails: function (data) {
        var me = this;
        // if (payingUserOrFreeTrial) {
        if (data.keyword=="") {
            if (keywordsSelectForLandingPages.length>0)
                data.keyword = keywordsSelectForLandingPages[0];
        }

        const json = getPostParams('id=' + data.id + '&doRefresh=true&keywordTerm=' + data.keyword);
        SEORushUtilities.showLoading();

        $.ajax({
            type: 'POST',
            url: getApiUrl('getMyJsonRefreshSingleLandingPage'),
            async: true,
            data: json,
            success: function (result) {
                if (result!=null && result['map']!=null) {
                    me.showLandingPageDetails(data, result["map"], result["map"]["pageUrl"], data.id);
                } else {
                    SEORushUtilities.hideLoading();
                }
            },
            error: function () {
                SEORushUtilities.hideLoading();
            }
        });
        // } else {
        //     callUpgradePage();
        // }
    },
    getLandingPageKeywords: function(url, keyword) {
        var me = this;
        $.getJSON(getApiUrl('getMyJsonKwrdsListLandingPage?url=' + url), function (json) {
            if (json!=null && json['list']!=null) {
                $.each (json['list'], function (index, row) {
                    if (suggestedKeywords.indexOf(row) == -1 && row.length > 5 && row.length < MAX_KEYWORD_LENGTH) {
                        suggestedKeywords.push(row);
                        if (!keywordsSelectForLandingPages.includes(row)) {
                            keywordsSelectForLandingPages.push(row);
                        }
                    }
                });

                $("#landingPageDetails_keywordsList").empty();
                $("#landingPageDetails_keywordsList").select2({
                    tokenSeparators: [',', ', ', '\n'],
                    selectOnClose: true,
                    dropdownParent: $('#keyword_overview_card'), // Attaches the dropdown to the modal
                    data: keywordsSelectForLandingPages,
                    tags: true,
                    placeholder: "No Keyword",
                    "language": {
                        // "noResults": () => 'Enter a keyword to promote'
                    },
                });

                $("#landingPageDetails_keywordsList").val(keyword)
            }
        });
    },
    getLandingPageLinks: function (url) {
        var me = this;
        $.getJSON(getApiUrl('getMyJsonPageLinksLandingPage?url=' + url), function (json) {
            if (json!=null && json['map']!=null) {
                me.showLandingPageLinks("#internal_links_card .table tbody", json['map']['linksIn']);
                me.showLandingPageLinks("#external_links_card .table tbody", json['map']['linksOut']);
            }
        });
    },
    showLandingPageLinks: function (table, list) {
        var me = this;
        $(table).html("");

        if (list==null || list.length==0)
            return;

        var html = "";
        $.each(list, function (index, row) {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${row.href}</td>
                    <td>${row.keyword}</td>
                </tr>
                `;
        });

        $(table).html(html);
    },
    showLandingPageDetails: function (data, map, pageUrl, id) {
        var me = this;
        me.landingPageDetails = data;

        console.log("--------landing details-----", data, map, pageUrl, id);

        // header
        $(".optimization-page .landing-page-details.details-header .page-title").html(map.minPageUrl);
        $(".optimization-page .landing-page-details.details-header .description").html(map.title);

        // overview
        var strokeDashOffset = 251.2 - (251.2 / 2 * data.score / 100);
        $("#seo_score_card path.progress-path").css('strokeDashoffset', strokeDashOffset);
        $("#seo_score_card .center-text").html(data.score + '<span class="text-muted">%</span>');
        $("#success_test_card h2").text(data.successTests);
        $("#failed_test_card h2").text(data.failedTests);

        $("#page_title_card .results").html('');
        $("#h1_tag_card .results").html("");
        $("#meta_description_card .results").html("");
        $("#page_content_card .content-results").html("");
        $("#page_content_card .image-results").html("");

        $("#landingPageDetails_keywordsList").empty();
        $("#landingPageDetails_keywordsList").select2({
            tokenSeparators: [',', ', ', '\n'],
            selectOnClose: true,
            dropdownParent: $('#keyword_overview_card'), // Attaches the dropdown to the modal
            data: keywordsSelectForLandingPages,
            tags: true,
            placeholder: "No Keyword",
            "language": {
                // "noResults": () => 'Enter a keyword to promote'
            },
        });

        $(".optimization-page .landing-page-details").show();

        $(".optimization-page .details-keyword .card .overlay").hide();
        $(".optimization-page .details-keyword .card .overlay-upgrade-btn").hide();
        if (payingUser) {
        } else {
            $(".optimization-page .details-keyword .card .overlay").show();
            $(".optimization-page .details-keyword .card .overlay-upgrade-btn").show();
        }

        if (map == null) {
            return;
        }

        // keyword
        var keyword = map.keywordTerm == null || data.keywordTerm == '' ? '' : map.keywordTerm;
        me.getLandingPageKeywords(map["minPageUrl"], keyword);

        // page title
        var html = "";
        html += `<p class="contents">${map.title != null ? map.title : ''}</p>`
        html += `<ul class="test-list">`

        var pageTitleLength = "", pageTitleLengthStatus = "warning";
        if (map.pageTitleLength == null || map.pageTitleLength == 0) {
            pageTitleLength = "Page title is missing! Add a title ASAP, ideal length should be 55-70 chars."
        } else if (map.pageTitleLength > 70) {
            pageTitleLength = "Page Title is too long (" + map.pageTitleLength + " characters), it should be 55~70 chars."
        } else if (map.pageTitleLength < 55) {
            pageTitleLength = "Page Title is too short (" + map.pageTitleLength + " characters), it should be 55~70 chars."
        } else {
            pageTitleLength = "Page title is perfect (" + map.pageTitleLength + " characters).";
            pageTitleLengthStatus = "success";
        }

        html += `
                                                        <li class="item item-${pageTitleLengthStatus}">
                                                            <div class="">
                                                                <span class="icon"><i class="bi ${pageTitleLengthStatus == 'warning' ? 'bi-info' : 'bi-check'}"></i></span>
                                                                <span class="status ">${pageTitleLengthStatus == 'warning' ? 'Warning' : 'Success'}:</span>
                                                                <span class="reason">Page Title Length</span>
                                                            </div>
                                                            <p>${pageTitleLength}</p>
                                                        </li>
        `;

        var pageTitleWithKeyword = "", pageTitleWithKeywordStatus = "warning";
        if (map.pageTitleContainsKeyword == null || !map.pageTitleContainsKeyword) {
            pageTitleWithKeyword = "The keyword '" + keyword + "' is missing in the page title";
        } else {
            pageTitleWithKeyword = "The keyword '" + keyword + "' exists in the page title";
            pageTitleWithKeywordStatus = "success";
        }

        html += `
                                                        <li class="item item-${pageTitleWithKeywordStatus}">
                                                            <div class="">
                                                                <span class="icon"><i class="bi ${pageTitleWithKeywordStatus == 'warning' ? 'bi-info' : 'bi-check'}"></i></span>
                                                                <span class="status ">${pageTitleWithKeywordStatus == 'warning' ? 'Warning' : 'Success'}:</span>
                                                                <span class="reason">Page Title with Keyword</span>
                                                            </div>
                                                            <p>${pageTitleWithKeyword}</p>
                                                        </li>
        `;
        html += `</ul>`;

        if (pageTitleLengthStatus == 'success' && pageTitleWithKeywordStatus == 'success') {
            html += `<p class="description"><span><i class="bi bi-check-circle"></i></span> Your Page Title is well optimized and needs no improvement. But we can offer you some improvements. Just generate and view the improved Page Title.</p>`;
        }

        $("#page_title_card .results").html(html);


        // h1 tag
        html = "";
        html += `<p class="contents">${map.H1 != null ? map.H1 : ''}</p>`;
        html += `<ul class="test-list">`

        var h1Length = "", h1LengthStatus = "warning";
        if (map.H1Length == null || map.H1Length < 30 || map.H1Length > 150) {
            h1Length = "Your H1 tag length is " + map.H1Length + " characters! It should be between 30-150 characters.";
        } else {
            h1Length = "H1 tag length is " + map.H1Length + " characters, that great! Should be between 30-150 characters.";
            h1LengthStatus = "success";
        }

        html += `
                                                        <li class="item item-${h1LengthStatus}">
                                                            <div class="">
                                                                <span class="icon"><i class="bi ${h1LengthStatus == 'warning' ? 'bi-info' : 'bi-check'}"></i></span>
                                                                <span class="status ">${h1LengthStatus == 'warning' ? 'Warning' : 'Success'}:</span>
                                                                <span class="reason">H1 Tag Length</span>
                                                            </div>
                                                            <p>${h1Length}</p>
                                                        </li>
        `;

        var h1WithKeyword = "", h1WithKeywordStatus = "warning";
        if (map.H1ContainsKeyword == null || !map.H1ContainsKeyword) {
            h1WithKeyword = "H1 tag doesn't contain the keyword '" + keyword + "', add it to improve your rankings.";
        } else {
            h1WithKeyword = "H1 tag contains the keyword '" + keyword + "', great job!";
            h1WithKeywordStatus = "success";
        }

        html += `
                                                        <li class="item item-${h1WithKeywordStatus}">
                                                            <div class="">
                                                                <span class="icon"><i class="bi ${h1WithKeywordStatus == 'warning' ? 'bi-info' : 'bi-check'}"></i></span>
                                                                <span class="status ">${h1WithKeywordStatus == 'warning' ? 'Warning' : 'Success'}:</span>
                                                                <span class="reason">H1 Tag with Keyword</span>
                                                            </div>
                                                            <p>${h1WithKeyword}</p>
                                                        </li>
        `;
        html += `</ul>`;

        if (h1LengthStatus == 'success' && h1WithKeywordStatus == 'success') {
            html += `<p class="description"><span><i class="bi bi-check-circle"></i></span> Your H1 tag is well optimized and needs no improvement. But we can offer you some improvements. Just generate and view the improved H1 tag.</p>`;
        }

        $("#h1_tag_card .results").html(html);

        // meta description
        html = "";
        html += `<p class="contents">${map.metaDesc != null ? map.metaDesc : ''}</p>`;
        html += `<ul class="test-list">`

        var metaDesc = "", metaDescStatus = "warning";
        if (map.metaDesc == null || map.metaDesc.length < 50 || map.metaDesc.length > 320) {
            metaDesc = "Meta Description Tag length is (" + (map.metaDesc == null ? 0 : map.metaDesc.length) + " chars), try to make it between 50-320 chars";
        } else {
            metaDesc = "Meta Description Tag is great (" + map.metaDesc.length + " chars), ideal length is between 50-320 chars";
            metaDescStatus = "success";
        }

        html += `
                                                        <li class="item item-${metaDescStatus}">
                                                            <div class="">
                                                                <span class="icon"><i class="bi ${metaDescStatus == 'warning' ? 'bi-info' : 'bi-check'}"></i></span>
                                                                <span class="status ">${metaDescStatus == 'warning' ? 'Warning' : 'Success'}:</span>
                                                                <span class="reason">Meta Description Length</span>
                                                            </div>
                                                            <p>${metaDesc}</p>
                                                        </li>
        `;

        var metaDescWithKeyword = "", metaDescWithKeywordStatus = "warning";
        if (map.metaDescContainsKeyword == null || !map.metaDescContainsKeyword) {
            metaDescWithKeyword = "Meta Description Tag doesn't contain the keyword '" + keyword + "'";
        } else {
            metaDescWithKeyword = "H1 tag contains the keyword '" + keyword + "', great job!";
            metaDescWithKeywordStatus = "success";
        }

        html += `
                                                        <li class="item item-${metaDescWithKeywordStatus}">
                                                            <div class="">
                                                                <span class="icon"><i class="bi ${metaDescWithKeywordStatus == 'warning' ? 'bi-info' : 'bi-check'}"></i></span>
                                                                <span class="status ">${metaDescWithKeywordStatus == 'warning' ? 'Warning' : 'Success'}:</span>
                                                                <span class="reason">Meta Description with Keyword</span>
                                                            </div>
                                                            <p>${metaDescWithKeyword}</p>
                                                        </li>
        `;
        html += `</ul>`;

        if (metaDescStatus == 'success' && metaDescWithKeywordStatus == 'success') {
            html += `<p class="description"><span><i class="bi bi-check-circle"></i></span> Your Meta Description is well optimized and needs no improvement. But we can offer you some improvements. Just generate and view the improved Meta Description.</p>`;
        }

        $("#meta_description_card .results").html(html);

        // page content
        html = "";
        html += `<p class="contents">${map.content != null ? map.content : ''}</p>`;
        html += `<ul class="test-list">`

        var wordsCount = "", wordsCountStatus = "warning";
        if (map.wordsCount == null || map.wordsCount < 100) {
            wordsCount = "Page has only " + (map.wordsCount == null ? 0 : map.wordsCount) + " words, add more high quality content for better SEO, remember to write for humans, not for SEO engines.";
        } else {
            wordsCount = "Page has " + map.wordsCount + " words! That's great for your SEO, make sure to add more pages with high quality content.";
            wordsCountStatus = "success";
        }

        html += `
                                                        <li class="item item-${wordsCountStatus}">
                                                            <div class="">
                                                                <span class="icon"><i class="bi ${wordsCountStatus == 'warning' ? 'bi-info' : 'bi-check'}"></i></span>
                                                                <span class="status ">${wordsCountStatus == 'warning' ? 'Warning' : 'Success'}:</span>
                                                                <span class="reason">Words Count</span>
                                                            </div>
                                                            <p>${wordsCount}</p>
                                                        </li>
        `;

        var keywordDensity = "", keywordDensityStatus = "warning";
        if (map.keywordDensity == null || map.keywordDensity < 3) {
            keywordDensity = "Page has only " + (map.wordsCount == null ? 0 : map.wordsCount) + " words, add more high quality content for better SEO, remember to write for humans, not for SEO engines.";
        } else {
            keywordDensity = "Keyword density is great! The keyword '" + keyword + "' was found " + (map.countWordMatches == null ? 0 : map.countWordMatches) + " times in a page with " + map.wordsCount + " words.";
            keywordDensityStatus = "success";
        }

        html += `
                                                        <li class="item item-${keywordDensityStatus}">
                                                            <div class="">
                                                                <span class="icon"><i class="bi ${keywordDensityStatus == 'warning' ? 'bi-info' : 'bi-check'}"></i></span>
                                                                <span class="status ">${keywordDensityStatus == 'warning' ? 'Warning' : 'Success'}:</span>
                                                                <span class="reason">Keyword Density</span>
                                                            </div>
                                                            <p>${keywordDensity}</p>
                                                        </li>
        `;

        html += `</ul>`;

        if (wordsCountStatus == 'success' && keywordDensityStatus == 'success') {
            html += `<p class="description"><span><i class="bi bi-check-circle"></i></span> Your Page Content is well optimized and needs no improvement. But we can offer you some improvements. Just generate and view the improved Page Content.</p>`;
        }

        $("#page_content_card .content-results").html(html);

        html = "";
        $("#page_content_card .image-results").html(html);

        // load links
        me.getLandingPageLinks(map["minPageUrl"]);

        //
        SEORushUtilities.hideLoading();
    },

    loadAllLandingPages: function () {
        var me = this;

        me.LANDING_PAGES = [];
        $('.optimization-page .landing-pages-table tr').removeClass('active');
        $(".optimization-page .landing-page-details").hide();

        SEORushUtilities.showLoading();
        $.getJSON(getApiUrl('jsonLandingPage'), function (json) {
            me.calculateOverview(json);
        }).done(function () {
            SEORushUtilities.hideLoading();
        }).fail(function () {
            SEORushUtilities.hideLoading();
        });
    },
    calculateOverview: function (data) {
        var me = this;

        $.each(data.list, function (index, row) {
            var siteContent = 0, warnings = 0, success = 0;
            var serverIssues = 0, titleIssues = 0, metaDescriptionTag = 0, keywordOptimization = 0, pageHeading = 0,
                keywordDensity = 0;

            var testResult = JSON.parse(row.testResult);
            if (testResult.pageTitleLength == 0) {
                // const msg = "Page title is missing! Add a title ASAP, ideal length should be 55-70 chars";
                titleIssues++;
                serverIssues++;
            } else if (testResult.pageTitleLength > 70) {
                titleIssues++;
                warnings++;
            } else if (testResult.pageTitleLength < 55) {
                titleIssues++;
                warnings++;
            } else {
                success++;
            }

            if (!testResult.pageTitleContainsKeyword) {
                titleIssues++;
                keywordOptimization++;
                serverIssues++;
            } else {
                success++;
            }

            if (testResult.metaDesc && testResult.metaDesc != "") {
                const metaDescLength = testResult.metaDesc.length;
                if (metaDescLength > 320) {
                    metaDescriptionTag++;
                    warnings++;
                } else if (metaDescLength < 50) {
                    metaDescriptionTag++;
                    warnings++;
                } else {
                    success++;
                }
            } else {
                serverIssues++;
            }

            if (!testResult.metaDescContainsKeyword) {
                metaDescriptionTag++;
                keywordOptimization++;
                serverIssues++;
            } else {
                success++;
            }

            if (!testResult.metaOgSiteName || testResult.metaOgSiteName == '') {
                metaDescriptionTag++;
                warnings++;
            } else {
                success++;
            }

            if (!testResult.metaOgSiteUrl || testResult.metaOgSiteUrl == '') {
                metaDescriptionTag++;
                warnings++;
            } else {
                success++;
            }

            if (testResult.keywordDensity < 3) {
                keywordOptimization++;
                keywordDensity++;
                serverIssues++;
            } else {
                success++;
            }

            if (testResult.wordsCount < 100) {
                serverIssues++;
            } else {
                success++;
            }

            if (testResult.H1 && testResult.H1 !== '') {
                if (testResult.H1Length && testResult.H1Length > 30 && testResult.H1Length < 150) {
                    success++;
                } else {
                    pageHeading++;
                    warnings++;
                }
            } else {
                pageHeading++;
                serverIssues++;
            }

            if (!testResult.H1ContainsKeyword) {
                pageHeading++;
                keywordOptimization++;
                serverIssues++;
            } else {
                success++;
            }

            if (testResult.H2Exists === 0) {
                warnings++;
            } else {
                success++;
            }

            siteContent += testResult.wordsCount;

            // TODO - add structure to uglifyjs config
            me.LANDING_PAGES.push({
                index: index,
                id: row.id,
                page: row.fullPageUrl,
                title: row.title,
                keyword: row.keyword,
                wordsCount: row.wordsCount,
                dateCreated: row.dateCreated,
                score: testResult.score ? testResult.score : (row.optScore ? row.optScore : 0),
                failedTests: row.failedTests ? row.failedTests : 0,
                successTests: success,
                testResult: testResult,
            });
        });

        me.showLandingPages(me.LANDING_PAGES);
    },
    showLandingPages: function (data) {
        var me = this;
        var html = "";

        $(".optimization-page .page-title .text-muted").html("(" + data.length + ")");
        $(".optimization-page .landing-pages-table tbody").html("");

        $.each(data, function (index, row) {
            var progress = row.score; // Example progress value (78%)
            var progressValue = 251.2 - (251.2 / 2 * progress / 100);

            html += `<tr data-index="${row.index}" data-id="${row.id}">
                        <td>
                            <div class="outer-container">
<div class="half-circle-container">
    <svg viewBox="0 0 100 50">
        <defs>
            <linearGradient id="rainbowGradient${index}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">
                <stop offset="0%" stop-color="#F54E4E" />
                <stop offset="25%" stop-color="#F5BB4E" />
                <stop offset="50%" stop-color="#F5C64E" />
                <stop offset="75%" stop-color="#F5CE4E" />
                <stop offset="100%" stop-color="#18B027" />
            </linearGradient>
        </defs>

        <!-- The background trail path (gray, always full) -->
        <path class="trail-path" d="M 10,50 A 40,40 0 1,1 90,50" />

        <!-- The progress path (rainbow gradient, only for the filled part) -->
        <path class="progress-path" d="M 10,50 A 40,40 0 1,1 90,50" style="stroke: url(#rainbowGradient${index}); stroke-dashoffset: ${progressValue};" />
    </svg>

    <!-- Text for the progress percentage -->
    <div class="center-text">${progress}<span class="text-muted">%</span></div>
</div>
                            </div>
                        </td>
                        <td><a href="${row.page}" target="_blank">${row.page}</a></td>
                        <td>${row.title}</td>
                    </tr>`;
        });

        $(".optimization-page .landing-pages-table tbody").html(html);

        SEORushUtilities.hideLoading();
    },

    show: function () {
        this.loadAllLandingPages();
    },
}

var LocalListingsPage = {
    init: function () {

    },
    show: function () {

    },
};

var GuestPostsPage = {
    init: function () {

    },
    show: function () {

    },
}

var KeywordsPage = {
    init: function () {

    },

    show: function () {

    },
}

var WidgetComponentPanel = {
    POSITION_NON_SELECTED_COLOR: '#90A1AB',
    POSITION_SELECTED_COLOR: '#FD7E14',

    GALLERY_COMPONENT: '',

    init: function () {
        var me = this;
        // Tooltip
        $('.widget-area .tooltip-icon').tooltip();

        // Slider
        $('#coverImageBrightnessSlider').slider({
            min: 0,
            max: 100,
            value: 100,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("coverImageBrightness", event.value.newValue);
        });

        $('#blogLikesCounterOpacitySlider').slider({
            min: 0,
            max: 100,
            value: 100,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("blogLikesCounterOpacity", event.value.newValue);
        });

        $("#opacitySlider").slider({
            min: 0,
            max: 100,
            value: 10,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("opacity", event.value.newValue);
        });

        $("#blogWidthSlider").slider({
            min: 20,
            max: 100,
            value: 33,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("blogWidth", event.value.newValue);
        });

        $("#topSpacingSlider").slider({
            min: 0,
            max: 100,
            value: 20,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("topSpacing", event.value.newValue);
        });

        $("#shadowSizeSlider").slider({
            min: 0,
            max: 20,
            value: 0,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("shadowSize", event.value.newValue);
        });

        $("#shadowOpacitySlider").slider({
            min: 0,
            max: 100,
            value: 50,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("shadowOpacity", event.value.newValue);
        });

        $('#postLikesCounterSizeSlider').slider({
            min: 8,
            max: 15,
            value: 10,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("postLikeCounterSize", event.value.newValue);
        });

        $('#titleSizeSlider').slider({
            min: 30,
            max: 70,
            value: 45,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("titleSize", event.value.newValue);
        });

        $('#textSizeSlider').slider({
            min: 12,
            max: 45,
            value: 15,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("textSize", event.value.newValue);
        });

        $('#spacingSlider').slider({
            min: 10,
            max: 70,
            value: 25,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("spacing", event.value.newValue);
        });

        $('#pluginSizeSlider').slider({
            min: 10,
            max: 50,
            value: 10,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("pluginSize", event.value.newValue);
        });

        $('#roundingSlider').slider({
            min: 0,
            max: 50,
            value: 12,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("rounding", event.value.newValue);
        });

        $('#sideSpacingSlider').slider({
            min: 0,
            max: 24,
            value: 0,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("sideSpacing", event.value.newValue);
        });

        // Article Layout
        $(".article-area").on('click', '.item:not(.active)', function () {
            $(".article-area .item").removeClass('active');
            $(this).addClass('active')

            var layout = $(this).data('layout');
            PreviewWidget.updatePostLayout(layout);
        });

        // switch
        $('.widget-area .form-check-input').on('change', function (e) {
            PreviewWidget.update($(this).data('target'), $(this).prop('checked'));
        });

        // Change Cover Image
        $("#changeCoverImageButton").on('click', function () {
            $("#galleryDialog .tag-buttons").show();
            $("#galleryDialog .tag-buttons .btn").removeClass('selected');
            $("#galleryDialog .tag-buttons .btn.architecture").addClass('selected');
            $("#galleryDialog").modal('show');

            me.GALLERY_COMPONENT = "#coverImage";
            me.loadGallery('Architecture');
        })

        $("#changeBackgroundImage").on('click', function (e) {
            e.preventDefault();
            if (!$("#backgroundImageOption").prop('checked')) {
                return false;
            }

            $("#galleryDialog .tag-buttons").show();
            $("#galleryDialog .tag-buttons .btn").removeClass('selected');
            $("#galleryDialog .tag-buttons .btn.architecture").addClass('selected');
            $("#galleryDialog").modal('show');

            me.GALLERY_COMPONENT = "#backgroundColorImage";
            me.loadGallery('Architecture');
        })

        // Gallery Dialog
        $("#galleryDialog").on('click', '.tag-buttons .btn', function () {
            $("#galleryDialog .tag-buttons .btn").removeClass('selected')
            $(this).addClass('selected');

            me.loadGallery($(this).text());
        });

        // TODO - apply selected image to element.
        $("#galleryDialog").on('click', '.image-grid img', function () {
            var img = $(this).attr('src');
            $("#galleryDialog").modal('hide');

            $(me.GALLERY_COMPONENT).css('background', "url('" + img + "') center/cover no-repeat");
            $(me.GALLERY_COMPONENT).attr('data-image', img);

            PreviewWidget.update($(me.GALLERY_COMPONENT).data('target'), img);
        });

        // Position Alignment Widget
        $(".widget-area .position-panel").on('mouseover', '.item:not(.active)', function () {
            $(".widget-area .position-panel .item:not(.active) svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
            $(this).find("svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_SELECTED_COLOR);
        });
        $(".widget-area .position-panel").on('mouseout', '.item:not(.active)', function () {
            $(".widget-area .position-panel .item:not(.active) svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
        });

        $(".widget-area .position-panel").on('click', '.item', function () {
            var position = $(this).data('position');
            $(".widget-area .position-panel .item svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
            $(this).find("svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_SELECTED_COLOR);
            $(".widget-area .position-panel .item").removeClass('active');
            $(this).addClass('active');

            PreviewWidget.updateIconPosition(position);
        });

        // Icon group
        $('.widget-area .icon-btn').on('click', function () {
            $(".icon-btn").removeClass('selected');
            $(this).addClass('selected');

            PreviewWidget.update('touchIcon', $(this).data('icon'));
        });

        // Color picker
        $('.widget-area').on('click', '.color-circle', function () {
            var target = $(this).data('color-target')
            if (target == 'isBackgroundColor') {
                if ($("#backgroundColorOption").prop('checked')) {
                    $(this).next('input').trigger('click')
                }
            } else {
                $(this).next('input').trigger('click')
            }
        });

        $('.widget-area').on('change', '.color-item input', function () {
            var newColor = $(this).val();
            var targetCircle = $(this).prev('.color-circle');
            var target = $(targetCircle).data('color-target')
            targetCircle.css('background-color', newColor);

            PreviewWidget.update(target, newColor);
        });

        // font
        $(".widget-area").on('change', 'select.set-font', function () {
            var font = $(this).val();
            var target = $(this).data('target');

            PreviewWidget.update(target, font);
        });

        // input field
        $(".widget-area").on('change', 'input.set-value', function () {
            var font = $(this).val();
            var target = $(this).data('target');

            PreviewWidget.update(target, font);
        });

        // additional
        $("#synonymSelect").on('change', function (e) {
            PreviewWidget.update('synonym', $(this).val());
        });

        // scroll event
        $(window).scroll(function () {
            // Select the element and its parent
            var $element = $('#preview_content');
            if ($('#preview_content .plugin-widget-container.active').length == 0) {
                // $element = $('#preview_content .plugin-widget-container.active');
                // if ($element.length==0)
                return;
            }

            var $parent = $element.parent();

            var windowWidth = $(window).width();
            var windowHeight = $(window).height();

            // Get the element's dimensions
            var elementWidth = $element.outerWidth();
            var elementHeight = $element.outerHeight();

            // Get the current scroll position
            var scrollTop = $(window).scrollTop();
            var scrollLeft = $(window).scrollLeft();

            // Get the parent's offset
            var parentOffset = $parent.offset();

            // Calculate the new position to center the element relative to the window
            var newLeft = scrollLeft + (windowWidth - elementWidth) / 2 - parentOffset.left;
            var newTop = scrollTop - 200 // + (windowHeight - elementHeight) / 2 - parentOffset.top;
            if (newTop < 0)
                newTop = 0;

            // Update the element's position
            $element.css({
                top: newTop + 'px'
            });
        });
    },

    loadGallery: function (query) {
        $("#galleryDialog .image-grid").html("");
        list = getImagesListByQuery(query)
        if (list == null)
            return;

        var html = ""
        $.each(list, function (index, row) {
            html += '<img src="' + row + '" style="background: url(' + row + ') center center no-repeat;" alt="Image">';
        });
        $("#galleryDialog .image-grid").html(html);
    },

    updateIconPosition: function (position) {
        $(".widget-area .position-panel .item[data-position='" + position + "']").trigger('click');
    },
};

var PreviewWidget = {
    isPreview: false,
    previewType: '',
    templateID: 0,

    init: function () {
        this.isPreview = false;

        // Tooltip
        $('.preview-area .tooltip-icon').tooltip();

        // publish success dialog action
        $("#publishSuccessModal").on('click', '.btn-pink', function (e) {
            e.preventDefault();
        });

        $("#publishSuccessModal").on('click', '.close', function (e) {
            e.preventDefault();
            $("#publishSuccessModal").modal('hide');
        });

        // go to dashboard
        $("#publishSuccessModal").on('click', '.btn-outline-secondary', function (e) {
            e.preventDefault();

            $("#publishSuccessModal").modal('hide');
            SEORushHome.gotoPage('welcome')
        });


        //
        this.loadPreviewSite()
        this.updateUserInformation();

        //
        WidgetComponentPanel.updateIconPosition("right-bottom");
    },

    getDefaultData: function () {
        if (this.templateID == 1) {
            return {
                "textfields": [
                    {
                        "name": "blogTitleValue",
                        "value": "Welcome to Our Blog"
                    },
                    {
                        "name": "blogSubTitleValue",
                        "value": "You can write some description here."
                    }
                ],
                "fonts": [
                    {
                        "name": "blogTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "blogSubTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTextFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "dateAuthorDetailFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "readMoreTextFont",
                        "value": "Poppins"
                    }
                ],
                "colors": [
                    {
                        "name": "blogTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "blogSubTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "blogLikesCounterColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "postTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "postTextColor",
                        "value": "#000000"
                    },
                    {
                        "name": "dateAuthorDetailColor",
                        "value": "#141414"
                    },
                    {
                        "name": "readMoreTextColor",
                        "value": "#1e24c6"
                    },
                    {
                        "name": "backgroundColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "shadowColor",
                        "value": "#2c3145"
                    },
                    {
                        "name": "postLikesCounterColor",
                        "value": "#292929"
                    },
                    {
                        "name": "iconBackgroundColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconForeColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "synonymousColor",
                        "value": "#000000"
                    }
                ],
                "is": [
                    {
                        "name": "isBlogLikesCounter",
                        "value": true
                    },
                    {
                        "name": "isBackgroundColor",
                        "value": true
                    },
                    {
                        "name": "isBackgroundImage",
                        "value": false
                    },
                    {
                        "name": "isShadow",
                        "value": false
                    },
                    {
                        "name": "isPostLikesCounter",
                        "value": true
                    }
                ],
                "sliders": [
                    {
                        "name": "coverImageBrightness",
                        "value": "33"
                    },
                    {
                        "name": "blogLikesCounterOpacity",
                        "value": "79"
                    },
                    {
                        "name": "opacity",
                        "value": "10"
                    },
                    {
                        "name": "blogWidth",
                        "value": "47"
                    },
                    {
                        "name": "topSpacing",
                        "value": "46"
                    },
                    {
                        "name": "shadowSize",
                        "value": "0"
                    },
                    {
                        "name": "shadowOpacity",
                        "value": "50"
                    },
                    {
                        "name": "postLikesCounterSize",
                        "value": "11"
                    },
                    {
                        "name": "textSize",
                        "value": "15"
                    },
                    {
                        "name": "spacing",
                        "value": "25"
                    },
                    {
                        "name": "pluginSize",
                        "value": "10"
                    },
                    {
                        "name": "rounding",
                        "value": "12"
                    },
                    {
                        "name": "sideSpacing",
                        "value": "0"
                    }
                ],
                "image": {
                    "cover": "https://images.unsplash.com/photo-1487603097198-fe76cd44579d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHwxMzB8fEFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MjQ2NDk5OTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
                    "background": ""
                },
                "touch": {
                    "icon": "bi-envelope-fill",
                    "position": "right-bottom"
                },
                "synonym": "blog"
            };
        } else if (this.templateID == 2) {
            return {
                "textfields": [
                    {
                        "name": "blogTitleValue",
                        "value": "Welcome to Our Blog"
                    },
                    {
                        "name": "blogSubTitleValue",
                        "value": "You can write some description here."
                    }
                ],
                "fonts": [
                    {
                        "name": "blogTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "blogSubTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTextFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "dateAuthorDetailFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "readMoreTextFont",
                        "value": "Poppins"
                    }
                ],
                "colors": [
                    {
                        "name": "blogTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "blogSubTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "blogLikesCounterColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "postTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "postTextColor",
                        "value": "#000000"
                    },
                    {
                        "name": "dateAuthorDetailColor",
                        "value": "#000000"
                    },
                    {
                        "name": "readMoreTextColor",
                        "value": "#1e24c6"
                    },
                    {
                        "name": "backgroundColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "shadowColor",
                        "value": "#2c3145"
                    },
                    {
                        "name": "postLikesCounterColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconBackgroundColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconForeColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "synonymousColor",
                        "value": "#000000"
                    }
                ],
                "is": [
                    {
                        "name": "isBlogLikesCounter",
                        "value": true
                    },
                    {
                        "name": "isBackgroundColor",
                        "value": true
                    },
                    {
                        "name": "isBackgroundImage",
                        "value": false
                    },
                    {
                        "name": "isShadow",
                        "value": false
                    },
                    {
                        "name": "isPostLikesCounter",
                        "value": false
                    }
                ],
                "sliders": [
                    {
                        "name": "coverImageBrightness",
                        "value": "100"
                    },
                    {
                        "name": "blogLikesCounterOpacity",
                        "value": "79"
                    },
                    {
                        "name": "opacity",
                        "value": "10"
                    },
                    {
                        "name": "blogWidth",
                        "value": "100"
                    },
                    {
                        "name": "topSpacing",
                        "value": "9"
                    },
                    {
                        "name": "shadowSize",
                        "value": "0"
                    },
                    {
                        "name": "shadowOpacity",
                        "value": "50"
                    },
                    {
                        "name": "postLikesCounterSize",
                        "value": "10"
                    },
                    {
                        "name": "textSize",
                        "value": "15"
                    },
                    {
                        "name": "spacing",
                        "value": "25"
                    },
                    {
                        "name": "pluginSize",
                        "value": "10"
                    },
                    {
                        "name": "rounding",
                        "value": "12"
                    },
                    {
                        "name": "sideSpacing",
                        "value": "0"
                    }
                ],
                "image": {
                    "cover": "https://images.unsplash.com/photo-1461838239441-4475121c0b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHwxODR8fEFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MjQ2NDk0ODd8MA&ixlib=rb-4.0.3&q=80&w=1080",
                    "background": ""
                },
                "touch": {
                    "icon": "bi-envelope-fill",
                    "position": "right-bottom"
                },
                "synonym": "blog"
            };
        } else if (this.templateID == 3) {
            return {
                "textfields": [
                    {
                        "name": "blogTitleValue",
                        "value": "Newest in Our Blog"
                    },
                    {
                        "name": "blogSubTitleValue",
                        "value": "All Articles"
                    }
                ],
                "fonts": [
                    {
                        "name": "blogTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "blogSubTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTextFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "dateAuthorDetailFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "readMoreTextFont",
                        "value": "Poppins"
                    }
                ],
                "colors": [
                    {
                        "name": "blogTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "blogSubTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "blogLikesCounterColor",
                        "value": "#000000"
                    },
                    {
                        "name": "postTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "postTextColor",
                        "value": "#000000"
                    },
                    {
                        "name": "dateAuthorDetailColor",
                        "value": "#000000"
                    },
                    {
                        "name": "readMoreTextColor",
                        "value": "#1e24c6"
                    },
                    {
                        "name": "backgroundColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "shadowColor",
                        "value": "#2c3145"
                    },
                    {
                        "name": "postLikesCounterColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconBackgroundColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconForeColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "synonymousColor",
                        "value": "#000000"
                    }
                ],
                "is": [
                    {
                        "name": "isBlogLikesCounter",
                        "value": true
                    },
                    {
                        "name": "isBackgroundColor",
                        "value": false
                    },
                    {
                        "name": "isBackgroundImage",
                        "value": true
                    },
                    {
                        "name": "isShadow",
                        "value": false
                    },
                    {
                        "name": "isPostLikesCounter",
                        "value": false
                    }
                ],
                "sliders": [
                    {
                        "name": "coverImageBrightness",
                        "value": "100"
                    },
                    {
                        "name": "blogLikesCounterOpacity",
                        "value": "94"
                    },
                    {
                        "name": "opacity",
                        "value": "33"
                    },
                    {
                        "name": "blogWidth",
                        "value": "35"
                    },
                    {
                        "name": "topSpacing",
                        "value": "22"
                    },
                    {
                        "name": "shadowSize",
                        "value": "8"
                    },
                    {
                        "name": "shadowOpacity",
                        "value": "100"
                    },
                    {
                        "name": "postLikesCounterSize",
                        "value": "10"
                    },
                    {
                        "name": "textSize",
                        "value": "15"
                    },
                    {
                        "name": "spacing",
                        "value": "25"
                    },
                    {
                        "name": "pluginSize",
                        "value": "10"
                    },
                    {
                        "name": "rounding",
                        "value": "12"
                    },
                    {
                        "name": "sideSpacing",
                        "value": "0"
                    }
                ],
                "image": {
                    "cover": "",
                    "background": "https://images.unsplash.com/photo-1455612693675-112974d4880b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHwxMjN8fEFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MjQ2NDk5OTF8MA&ixlib=rb-4.0.3&q=80&w=1080"
                },
                "touch": {
                    "icon": "bi-envelope-fill",
                    "position": "right-bottom"
                },
                "synonym": "blog"
            };
        } else if (this.templateID == 4) {
            return {
                "textfields": [
                    {
                        "name": "blogTitleValue",
                        "value": "Welcome to Our Blog"
                    },
                    {
                        "name": "blogSubTitleValue",
                        "value": ""
                    }
                ],
                "fonts": [
                    {
                        "name": "blogTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "blogSubTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTextFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "dateAuthorDetailFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "readMoreTextFont",
                        "value": "Poppins"
                    }
                ],
                "colors": [
                    {
                        "name": "blogTitleColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "blogSubTitleColor",
                        "value": "#e6e6e6"
                    },
                    {
                        "name": "blogLikesCounterColor",
                        "value": "#4f4f4f"
                    },
                    {
                        "name": "postTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "postTextColor",
                        "value": "#000000"
                    },
                    {
                        "name": "dateAuthorDetailColor",
                        "value": "#000000"
                    },
                    {
                        "name": "readMoreTextColor",
                        "value": "#0f17ff"
                    },
                    {
                        "name": "backgroundColor",
                        "value": "#d1d1d1"
                    },
                    {
                        "name": "shadowColor",
                        "value": "#2c3145"
                    },
                    {
                        "name": "postLikesCounterColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconBackgroundColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconForeColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "synonymousColor",
                        "value": "#000000"
                    }
                ],
                "is": [
                    {
                        "name": "isBlogLikesCounter",
                        "value": true
                    },
                    {
                        "name": "isBackgroundColor",
                        "value": true
                    },
                    {
                        "name": "isBackgroundImage",
                        "value": false
                    },
                    {
                        "name": "isShadow",
                        "value": true
                    },
                    {
                        "name": "isPostLikesCounter",
                        "value": false
                    }
                ],
                "sliders": [
                    {
                        "name": "coverImageBrightness",
                        "value": "100"
                    },
                    {
                        "name": "blogLikesCounterOpacity",
                        "value": "100"
                    },
                    {
                        "name": "opacity",
                        "value": "17"
                    },
                    {
                        "name": "blogWidth",
                        "value": "48"
                    },
                    {
                        "name": "topSpacing",
                        "value": "18"
                    },
                    {
                        "name": "shadowSize",
                        "value": "4"
                    },
                    {
                        "name": "shadowOpacity",
                        "value": "20"
                    },
                    {
                        "name": "postLikesCounterSize",
                        "value": "10"
                    },
                    {
                        "name": "textSize",
                        "value": "15"
                    },
                    {
                        "name": "spacing",
                        "value": "25"
                    },
                    {
                        "name": "pluginSize",
                        "value": "10"
                    },
                    {
                        "name": "rounding",
                        "value": "12"
                    },
                    {
                        "name": "sideSpacing",
                        "value": "0"
                    }
                ],
                "image": {
                    "cover": "https://images.unsplash.com/photo-1597738755960-aeab75744b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHwxMjd8fEFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MjQ2NDk5OTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
                    "background": ""
                },
                "touch": {
                    "icon": "bi-envelope-fill",
                    "position": "right-bottom"
                },
                "synonym": "blog"
            };
        } else if (this.templateID == 5) {
            return {
                "textfields": [
                    {
                        "name": "blogTitleValue",
                        "value": "Welcome to Our Blog"
                    },
                    {
                        "name": "blogSubTitleValue",
                        "value": "Welcome to Our Blog"
                    }
                ],
                "fonts": [
                    {
                        "name": "blogTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "blogSubTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTextFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "dateAuthorDetailFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "readMoreTextFont",
                        "value": "Poppins"
                    }
                ],
                "colors": [
                    {
                        "name": "blogTitleColor",
                        "value": "#f5f5f5"
                    },
                    {
                        "name": "blogSubTitleColor",
                        "value": "#ebebeb"
                    },
                    {
                        "name": "blogLikesCounterColor",
                        "value": "#000000"
                    },
                    {
                        "name": "postTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "postTextColor",
                        "value": "#000000"
                    },
                    {
                        "name": "dateAuthorDetailColor",
                        "value": "#000000"
                    },
                    {
                        "name": "readMoreTextColor",
                        "value": "#1e24c6"
                    },
                    {
                        "name": "backgroundColor",
                        "value": "#b2aeae"
                    },
                    {
                        "name": "shadowColor",
                        "value": "#2c3145"
                    },
                    {
                        "name": "postLikesCounterColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconBackgroundColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconForeColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "synonymousColor",
                        "value": "#000000"
                    }
                ],
                "is": [
                    {
                        "name": "isBlogLikesCounter",
                        "value": false
                    },
                    {
                        "name": "isBackgroundColor",
                        "value": true
                    },
                    {
                        "name": "isBackgroundImage",
                        "value": false
                    },
                    {
                        "name": "isShadow",
                        "value": false
                    },
                    {
                        "name": "isPostLikesCounter",
                        "value": false
                    }
                ],
                "sliders": [
                    {
                        "name": "coverImageBrightness",
                        "value": "100"
                    },
                    {
                        "name": "blogLikesCounterOpacity",
                        "value": "100"
                    },
                    {
                        "name": "opacity",
                        "value": "6"
                    },
                    {
                        "name": "blogWidth",
                        "value": "33"
                    },
                    {
                        "name": "topSpacing",
                        "value": "21"
                    },
                    {
                        "name": "shadowSize",
                        "value": "0"
                    },
                    {
                        "name": "shadowOpacity",
                        "value": "50"
                    },
                    {
                        "name": "postLikesCounterSize",
                        "value": "10"
                    },
                    {
                        "name": "textSize",
                        "value": "15"
                    },
                    {
                        "name": "spacing",
                        "value": "25"
                    },
                    {
                        "name": "pluginSize",
                        "value": "10"
                    },
                    {
                        "name": "rounding",
                        "value": "12"
                    },
                    {
                        "name": "sideSpacing",
                        "value": "0"
                    }
                ],
                "image": {
                    "cover": "https://images.unsplash.com/photo-1597738755960-aeab75744b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHwxMjd8fEFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MjQ2NDk5OTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
                    "background": ""
                },
                "touch": {
                    "icon": "bi-envelope-fill",
                    "position": "right-bottom"
                },
                "synonym": "blog"
            };
        } else if (this.templateID == 6) {
            return {
                "textfields": [
                    {
                        "name": "blogTitleValue",
                        "value": "Welcome to Our Blog"
                    },
                    {
                        "name": "blogSubTitleValue",
                        "value": ""
                    }
                ],
                "fonts": [
                    {
                        "name": "blogTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "blogSubTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTitleFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "postTextFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "dateAuthorDetailFont",
                        "value": "Poppins"
                    },
                    {
                        "name": "readMoreTextFont",
                        "value": "Poppins"
                    }
                ],
                "colors": [
                    {
                        "name": "blogTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "blogSubTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "blogLikesCounterColor",
                        "value": "#000000"
                    },
                    {
                        "name": "postTitleColor",
                        "value": "#000000"
                    },
                    {
                        "name": "postTextColor",
                        "value": "#000000"
                    },
                    {
                        "name": "dateAuthorDetailColor",
                        "value": "#000000"
                    },
                    {
                        "name": "readMoreTextColor",
                        "value": "#1e24c6"
                    },
                    {
                        "name": "backgroundColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "shadowColor",
                        "value": "#ff9ea3"
                    },
                    {
                        "name": "postLikesCounterColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconBackgroundColor",
                        "value": "#000000"
                    },
                    {
                        "name": "iconForeColor",
                        "value": "#ffffff"
                    },
                    {
                        "name": "synonymousColor",
                        "value": "#000000"
                    }
                ],
                "is": [
                    {
                        "name": "isBlogLikesCounter",
                        "value": true
                    },
                    {
                        "name": "isBackgroundColor",
                        "value": true
                    },
                    {
                        "name": "isBackgroundImage",
                        "value": false
                    },
                    {
                        "name": "isShadow",
                        "value": true
                    },
                    {
                        "name": "isPostLikesCounter",
                        "value": false
                    }
                ],
                "sliders": [
                    {
                        "name": "coverImageBrightness",
                        "value": "100"
                    },
                    {
                        "name": "blogLikesCounterOpacity",
                        "value": "71"
                    },
                    {
                        "name": "opacity",
                        "value": "10"
                    },
                    {
                        "name": "blogWidth",
                        "value": "32"
                    },
                    {
                        "name": "topSpacing",
                        "value": "20"
                    },
                    {
                        "name": "shadowSize",
                        "value": "3"
                    },
                    {
                        "name": "shadowOpacity",
                        "value": "14"
                    },
                    {
                        "name": "postLikesCounterSize",
                        "value": "10"
                    },
                    {
                        "name": "textSize",
                        "value": "15"
                    },
                    {
                        "name": "spacing",
                        "value": "25"
                    },
                    {
                        "name": "pluginSize",
                        "value": "10"
                    },
                    {
                        "name": "rounding",
                        "value": "12"
                    },
                    {
                        "name": "sideSpacing",
                        "value": "0"
                    }
                ],
                "image": {
                    "cover": "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHw0OHx8QnVzaW5lc3N8ZW58MHx8fHwxNzI0MTI2MzU3fDA&ixlib=rb-4.0.3&q=80&w=1080",
                    "background": ""
                },
                "touch": {
                    "icon": "bi-envelope-fill",
                    "position": "right-bottom"
                },
                "synonym": "blog"
            };
        }

        return null;
    },

    loadPreviewSite: function () {
        // Load preview site
        let siteToLoad = mainUserDetails ? mainUserDetails["wixUrl"] : "";
        if (isTestingMode()) {
            siteToLoad = "https://www.rabbitseo.com";
        }
        // TODO - remove this when publish
        siteToLoad = "https://www.rabbitseo.com";

        $("#sitePreview").attr("data", siteToLoad);
    },

    updateUserInformation: function (avatar) {
        // User
        if (avatar || mainUserDetails['avatar']) {
            $("#sidebar .profile img").attr('src', avatar != null ? avatar : mainUserDetails['avatar']);
        }
    },
    updateIconPosition: function (position) {
        if (!this.isPreview)
            return false;

        this.update("touchPosition", position);
    },
    updateBlogShadow: function () {
        if ($("#shadowOption").prop('checked')) {
            // TODO - apply to preview content
            var color = SEORushUtilities.hexToRgb($('.widget-area .color-circle[data-color-target="shadowColor"]').next('input').val());
            var size = $("#shadowSizeSlider").val();
            var opacity = $("#shadowOpacitySlider").val();

            $(".plugin-widget-container.active .for-shadow").css('boxShadow', size + "px " + size + "px " + parseInt(size * 2) + "px rgba(" + color.red + ", " + color.green + ", " + color.blue + ", " + (opacity / 100) + ")");
        } else {
            $(".plugin-widget-container.active .for-shadow").css('boxShadow', 'none');
        }
    },
    updatePostLayout: function (layout) {
        if (layout == '1-row') {
            $(".blog-article-container .article-wrapper>div").removeClass('order-1').removeClass('order-2');
            $(".blog-article-container .article-wrapper>div").removeClass('col-6').addClass('col-12');
        } else {
            $(".blog-article-container .article-wrapper>div").removeClass('col-12').addClass('col-6');
            if (layout == '2-column-right') {
                $(".blog-article-container .article-blog-area").removeClass('order-2').addClass('order-1');
                $(".blog-article-container .article-cover-area").removeClass('order-1').addClass('order-2');
            } else {
                $(".blog-article-container .article-cover-area").removeClass('order-2').addClass('order-1');
                $(".blog-article-container .article-blog-area").removeClass('order-1').addClass('order-2');
            }
        }
    },

    update: function (target, value) {
        // font
        if (target == 'blogTitleFont') {
            $(".plugin-widget-container.active .for-blogTitleFont").css('fontFamily', value);
        } else if (target == 'blogSubTitleFont') {
            $(".plugin-widget-container.active .for-blogSubTitleFont").css('fontFamily', value);
        } else if (target == 'postTitleFont') {
            $(".plugin-widget-container.active .for-postTitleFont").css('fontFamily', value);
            $(".blog-article-container .for-postTitleFont").css('fontFamily', value);
        } else if (target == 'postTextFont') {
            $(".plugin-widget-container.active .for-postTextFont").css('fontFamily', value);
            $(".blog-article-container .for-postTextFont").css('fontFamily', value);
        } else if (target == 'dateAuthorDetailFont') {
            $(".plugin-widget-container.active .for-dateAuthorDetailFont").css('fontFamily', value);
            $(".blog-article-container .for-dateAuthorDetailFont").css('fontFamily', value);
        } else if (target == 'readMoreTextFont') {
            $(".plugin-widget-container.active .for-readMoreTextFont").css('fontFamily', value);
        }

        // slider
        else if (target == 'coverImageBrightness') {
            $(".plugin-widget-container.active .for-coverImageBrightness").css('opacity', value / 100);
        } else if (target == 'blogLikesCounterOpacity') {
            if ($("#blogLikesCounterOption").prop('checked')) {
                $(".plugin-widget-container.active .for-blogLikesCounterOpacity").css('opacity', value / 100);
            }
        } else if (target == 'opacity') {
            $(".plugin-widget-container.active .for-backgroundOpacity").css('opacity', value / 100);
            $(".blog-article-container .for-backgroundOpacity").css('opacity', value / 100);
        } else if (target == 'blogWidth') {
            $(".plugin-widget-container.active .for-blogWidth").css('width', value + '%');
            $(".plugin-widget-container.active .for-blogWidth-100").css('width', (100 - value) + '%');
        } else if (target == 'topSpacing') {
            $(".plugin-widget-container.active .for-topSpacing").css('marginTop', value + 'px');
        } else if (target == 'shadowSize') {
            this.updateBlogShadow();
        } else if (target == 'shadowOpacity') {
            this.updateBlogShadow();
        } else if (target == 'postLikeCounterSize') {
            if ($("#postLikesCounterOption").prop('checked')) {
                $(".blog-article-container .for-postLikeCounterSize").css('fontSize', value + 'px');
            }
        } else if (target == 'titleSize') {
            $(".blog-article-container .for-postTitleSize").css('fontSize', value + 'px');
        } else if (target == 'textSize') {
            $(".blog-article-container .for-postTextSize").css('fontSize', value + 'px');
        } else if (target == 'spacing') {
            $(".blog-article-container .for-postTextSpacing").css('lineHeight', value + 'px');
        } else if (target == 'pluginSize') {
            $('.btnTouch').css('paddingLeft', (value * 2) + 'px');
            $('.btnTouch').css('paddingRight', (value * 2) + 'px');
            $('.btnTouch').css('paddingTop', value + 'px');
            $('.btnTouch').css('paddingBottom', value + 'px');

        } else if (target == 'rounding') {
            $('.btnTouch').css('borderRadius', value + 'px');

        } else if (target == 'sideSpacing') {
            $('.btnTouch>.icon').css('marginRight', value + 'px');
        }

        // input text
        else if (target == 'blogTitleValue') {
            $(".plugin-widget-container.active .for-blogTitleText").text(value);
        } else if (target == 'blogSubTitleValue') {
            $(".plugin-widget-container.active .for-blogSubTitleText").text(value);
        }

        // yes/no
        else if (target == 'isBlogLikesCounter') {
            if (value) {
                $(".plugin-widget-container.active .for-blogLikesCounter").show();
                this.update('blogLikesCounterOpacity', $("#blogLikesCounterOpacitySlider").val());
                this.update('blogLikesCounterColor', $(".widget-area .color-circle[data-color-target='blogLikesCounterColor']").next('input').val());
            } else {
                $(".plugin-widget-container.active .for-blogLikesCounter").hide();
            }
        } else if (target == 'isBackgroundColor') {
            this.update('backgroundColor', $(".widget-area .color-circle[data-color-target='backgroundColor']").next('input').val());

        } else if (target == 'isBackgroundImage') {
            this.update('backgroundImage', $("#backgroundColorImage").attr('data-image'));

        } else if (target == 'isShadow') {
            this.update('shadowSize', $("#shadowSizeSlider").val());
            this.update('shadowOpacity', $("#shadowOpacitySlider").val());
            this.update('shadowColor', $(".widget-area .color-circle[data-color-target='shadowColor']").next('input').val());
        } else if (target == 'isPostLikesCounter') {
            if (value) {
                $(".plugin-widget-container.active .for-postLikesCounter").show();
                $(".blog-article-container .for-postLikesCounter").show();
                this.update('postLikesCounterSize', $("#postLikesCounterSize").val());
                this.update('postLikesCounterColor', $(".widget-area .color-circle[data-color-target='postLikesCounterColor']").next('input').val());
            } else {
                $(".plugin-widget-container.active .for-postLikesCounter").hide();
                $(".blog-article-container .for-postLikesCounter").hide();
            }
        }

        // color
        else if (target == 'blogTitleColor') {
            $(".plugin-widget-container.active .for-blogTitleColor").css('color', value);

        } else if (target == 'blogSubTitleColor') {
            $(".plugin-widget-container.active .for-blogSubTitleColor").css('color', value);

        } else if (target == 'blogLikesCounterColor') {
            if ($("#blogLikesCounterOption").prop('checked')) {
                $(".plugin-widget-container.active .for-blogLikesCounterColor").css('color', value);
            }
        } else if (target == 'postTitleColor') {
            $(".plugin-widget-container.active .for-postTitleColor").css('color', value);
            $(".blog-article-container .for-postTitleColor").css('color', value);
        } else if (target == 'postTextColor') {
            $(".plugin-widget-container.active .for-postTextColor").css('color', value);
            $(".blog-article-container .for-postTextColor").css('color', value);
        } else if (target == 'dateAuthorDetailColor') {
            $(".plugin-widget-container.active .for-dateAuthorDetailColor").css('color', value);
            $(".blog-article-container .for-dateAuthorDetailColor").css('color', value);
        } else if (target == 'readMoreTextColor') {
            $(".plugin-widget-container.active .for-readMoreTextColor").css('color', value);
        } else if (target == 'backgroundColor') {
            if ($("#backgroundColorOption").prop('checked')) {
                $(".plugin-widget-container.active .for-backgroundColor").css('background', value);
                $(".blog-article-container .for-backgroundColor").css('background', value);
            } else {
                this.update('backgroundImage', $("#backgroundColorImage").attr('data-image'));
            }
        } else if (target == 'shadowColor') {
            this.updateBlogShadow();
        } else if (target == 'postLikesCounterColor') {
            if ($("#postLikesCounterOption").prop('checked')) {
                $(".blog-article-container .for-postLikesCounterColor").css('color', value);
            }
        } else if (target == 'iconBackgroundColor') {
            $(".btnTouch").css('backgroundColor', value);

        } else if (target == 'iconForeColor') {
            $(".btnTouch").css('color', value);

        } else if (target == 'synonymousColor') {
            // TODO -
        }

        // image
        else if (target == 'coverImage') {
            if (value == '') {
                value = '/assets/images/blank_10.png';
            }

            $(".plugin-widget-container.active .for-coverImage").css('background', "url('" + value + "') center/cover no-repeat");
        } else if (target == 'backgroundImage') {
            if ($("#backgroundImageOption").prop('checked')) {
                if (value == '') {
                    value = '/assets/images/blank_10.png';
                }

                $(".plugin-widget-container.active .for-backgroundImage").css('background', "url('" + value + "') center/cover no-repeat");
                $(".blog-article-container .for-backgroundImage").css('background', "url('" + value + "') center/cover no-repeat");
            } else {
                this.update('backgroundColor', $(".widget-area .color-circle[data-color-target='backgroundColor']").next('input').val());
            }
        }

        // touch icon
        else if (target == "touchPosition") {
            if (value == "left-top") {
                $(".btnTouch").css('right', 'auto').css('bottom', 'auto').css('top', '10px').css('left', '24px');
            } else if (value == "right-top") {
                $(".btnTouch").css('left', 'auto').css('bottom', 'auto').css('top', '10px').css('right', '40px');
            } else if (value == "left-bottom") {
                $(".btnTouch").css('top', 'auto').css('right', 'auto').css('left', '24px').css('bottom', '10px');
            } else if (value == 'right-bottom') {
                $(".btnTouch").css('top', 'auto').css('left', 'auto').css('right', '40px').css('bottom', '10px');
            } else if (value == "left-middle") {
                $(".btnTouch").css('right', 'auto').css('bottom', 'auto').css('top', '50%').css('left', '24px');
            } else if (value == "right-middle") {
                $(".btnTouch").css('left', 'auto').css('bottom', 'auto').css('top', '50%').css('right', '40px');
            }
        } else if (target == "touchIcon") {
            $(".btnTouch>.icon").html("<i class='bi " + value + "'></i>");
        }

        // additional
        else if (target == 'synonym') {
            // TODO
        }

    },
    apply: function (target, value) {
        // font
        if (target == 'blogTitleFont') {
            $('.widget-area select.set-font[data-target="blogTitleFont"]').val(value);
        } else if (target == 'blogSubTitleFont') {
            $('.widget-area select.set-font[data-target="blogSubTitleFont"]').val(value);
        } else if (target == 'postTitleFont') {
            $('.widget-area select.set-font[data-target="postTitleFont"]').val(value);
        } else if (target == 'postTextFont') {
            $('.widget-area select.set-font[data-target="postTextFont"]').val(value);
        } else if (target == 'dateAuthorDetailFont') {
            $('.widget-area select.set-font[data-target="dateAuthorDetailFont"]').val(value);
        } else if (target == 'readMoreTextFont') {
            $('.widget-area select.set-font[data-target="readMoreTextFont"]').val(value);
        }

        // slider
        else if (target == 'coverImageBrightness') {
            $("#coverImageBrightnessSlider").slider('setValue', value);
        } else if (target == 'blogLikesCounterOpacity') {
            $("#blogLikesCounterOpacitySlider").slider('setValue', value);
        } else if (target == 'opacity') {
            $("#opacitySlider").slider('setValue', value);
        } else if (target == 'blogWidth') {
            $("#blogWidthSlider").slider('setValue', value);
        } else if (target == 'topSpacing') {
            $("#topSpacingSlider").slider('setValue', value);
        } else if (target == 'shadowSize') {
            $("#shadowSizeSlider").slider('setValue', value);
            this.updateBlogShadow();
        } else if (target == 'shadowOpacity') {
            $("#shadowOpacitySlider").slider('setValue', value);
        } else if (target == 'postLikeCounterSize') {
            $("#postLikesCounterSizeSlider").slider('setValue', value);
        } else if (target == 'titleSize') {
            $("#titleSizeSlider").slider('setValue', value);
        } else if (target == 'textSize') {
            $("#textSizeSlider").slider('setValue', value);
        } else if (target == 'spacing') {
            $("#spacingSlider").slider('setValue', value);
        } else if (target == 'pluginSize') {
            $("#pluginSizeSlider").slider('setValue', value);
        } else if (target == 'rounding') {
            $("#roundingSlider").slider('setValue', value);
        } else if (target == 'sideSpacing') {
            $("#sideSpacingSlider").slider('setValue', value);
        }

        // input text
        else if (target == 'blogTitleValue') {
            $('.widget-area input.set-value[data-target="blogTitleValue"]').val(value);
        } else if (target == 'blogSubTitleValue') {
            $('.widget-area input.set-value[data-target="blogSubTitleValue"]').val(value);
        }

        // yes/no
        else if (target == 'isBlogLikesCounter') {
            $("#blogLikesCounterOption").prop('checked', value);
        } else if (target == 'isBackgroundColor') {
            $("#backgroundColorOption").prop('checked', value);
        } else if (target == 'isBackgroundImage') {
            $("#backgroundImageOption").prop('checked', value);
        } else if (target == 'isShadow') {
            $("#shadowOption").prop('checked', value);
        } else if (target == 'isPostLikesCounter') {
            $("#postLikesCounterOption").prop('checked', value);
        }

        // color
        else if (target == 'blogTitleColor') {
            $(".widget-area .color-item .color-circle[data-color-target='blogTitleColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='blogTitleColor']").next('input').val(value);
        } else if (target == 'blogSubTitleColor') {
            $(".widget-area .color-item .color-circle[data-color-target='blogSubTitleColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='blogSubTitleColor']").next('input').val(value);
        } else if (target == 'blogLikesCounterColor') {
            $(".widget-area .color-item .color-circle[data-color-target='blogLikesCounterColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='blogLikesCounterColor']").next('input').val(value);
        } else if (target == 'postTitleColor') {
            $(".widget-area .color-item .color-circle[data-color-target='postTitleColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='postTitleColor']").next('input').val(value);
        } else if (target == 'postTextColor') {
            $(".widget-area .color-item .color-circle[data-color-target='postTextColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='postTextColor']").next('input').val(value);
        } else if (target == 'dateAuthorDetailColor') {
            $(".widget-area .color-item .color-circle[data-color-target='dateAuthorDetailColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='dateAuthorDetailColor']").next('input').val(value);
        } else if (target == 'readMoreTextColor') {
            $(".widget-area .color-item .color-circle[data-color-target='readMoreTextColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='readMoreTextColor']").next('input').val(value);
        } else if (target == 'backgroundColor') {
            $(".widget-area .color-item .color-circle[data-color-target='backgroundColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='backgroundColor']").next('input').val(value);
        } else if (target == 'shadowColor') {
            $(".widget-area .color-item .color-circle[data-color-target='shadowColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='shadowColor']").next('input').val(value);
        } else if (target == 'postLikesCounterColor') {
            $(".widget-area .color-item .color-circle[data-color-target='postLikesCounterColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='postLikesCounterColor']").next('input').val(value);
        } else if (target == 'iconBackgroundColor') {
            $(".widget-area .color-item .color-circle[data-color-target='iconBackgroundColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='iconBackgroundColor']").next('input').val(value);
        } else if (target == 'iconForeColor') {
            $(".widget-area .color-item .color-circle[data-color-target='iconForeColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='iconForeColor']").next('input').val(value);
        } else if (target == 'synonymousColor') {
            $(".widget-area .color-item .color-circle[data-color-target='synonymousColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='synonymousColor']").next('input').val(value);
        }

        // image
        else if (target == 'coverImage') {
            $("#coverImage").attr('data-image', value);
            if (value == '') {
                value = '/assets/images/blank_10.png';
            }

            $("#coverImage").css('background', "url('" + value + "') center/cover no-repeat");
        } else if (target == 'backgroundImage') {
            $("#backgroundColorImage").attr('data-image', value);
            if (value == '') {
                value = '/assets/images/blank_10.png';
            }

            $("#backgroundColorImage").css('background', "url('" + value + "') center/cover no-repeat");
        }

        // touch icon
        else if (target == "touchPosition") {
            WidgetComponentPanel.updateIconPosition(value);
        } else if (target == "touchIcon") {
            $(".widget-area .icon-group .icon-btn").removeClass('selected');
            $(".widget-area .icon-group .icon-btn[data-icon='" + value + "']").addClass('selected');
        }

        // additional
        else if (target == 'synonym') {
            $("#synonymSelect").val(value);
        } else if (target == 'postLayout') {
            $(".widget-area .article-area .item").removeClass('active');
            $(".widget-area .article-area .item[data-layout='" + value + "']").addClass('active');
        }
    },

    /**
     * Apply all preview component's value to preview widget
     */
    updateAll: function () {
        var me = this;
        var data = me.getDefaultData();

        if (data != null) {
            $.each(data.textfields, function (index, row) {
                me.apply(row.name, row.value);
            });

            $.each(data.fonts, function (index, row) {
                me.apply(row.name, row.value);
            });

            $.each(data.colors, function (index, row) {
                me.apply(row.name, row.value);
            });

            $.each(data.is, function (index, row) {
                me.apply(row.name, row.value);
            });

            $.each(data.sliders, function (index, row) {
                me.apply(row.name, row.value);
            });


            // cover image
            me.apply('coverImage', data.image.cover);
            me.apply('backgroundImage', data.image.background);

            // touch icon
            if (data.touch.icon != null) {
                me.apply("touchIcon", data.touch.icon);
            }

            if (data.touch.position != null) {
                me.apply("touchPosition", data.touch.position);
            }

            // additional
            me.apply("synonym", data.synonym);

            if (data.post != null && data.post.layout != "") {
                me.apply("postLayout", data.post.layout);
            }
        }

        // textfield
        $(".widget-area input.set-value").each(function (index, row) {
            me.update($(row).data('target'), $(row).val());
        });

        // font
        $(".widget-area select.set-font").each(function (index, row) {
            me.update($(row).data('target'), $(row).val());
        });

        // color
        $(".widget-area .color-circle").each(function (index, row) {
            me.update($(row).data('color-target'), $(row).next('input').val());
        });

        // switch
        $('.widget-area .form-check-input').each(function (index, row) {
            me.update($(row).data('target'), $(row).prop('checked'));
        });

        // slider
        $('.widget-area .set-slider').each(function (index, row) {
            me.update($(row).data('target'), $(row).val());
        });

        // cover image
        me.update('coverImage', $("#coverImage").attr('data-image'));
        me.update('backgroundImage', $("#backgroundColorImage").attr('data-image'));

        // touch icon
        me.update('touchIcon', $(".widget-area .icon-group .icon-btn.selected").data('icon'));
        me.update('touchPosition', $(".widget-area .position-panel .item.active").data('position'));

        // additional
        me.update('synonym', $('#synonymSelect').val());
        me.updatePostLayout($(".widget-area .article-area .item.active").data('layout'));
    },

    show: function (type, template) {
        this.isPreview = true;
        this.previewType = type;
        if (template != null)
            this.templateID = template;
        this.refresh();
    },

    refresh: function () {
        $(".my-blog-page .preview-panel>.container-fluid>.blog-article-container").hide();
        $("#preview_content").addClass('overlay');
        $("#preview_content .plugin-widget-container").removeClass('active');
        if (this.previewType == 'template') {
            $("#preview_content .plugin-widget-container[data-template='" + this.templateID + "']").addClass('active');
        } else if (this.previewType == 'article') {
            if (this.templateID == 5) {   // this template has article layout
                $("#preview_content .plugin-widget-container[data-template='" + this.templateID + "']").addClass('active');
            } else {
                $(".my-blog-page .preview-panel>.container-fluid>.blog-article-container").show();
            }
        }

        this.updateAll();
        $(window).trigger('scroll');
    },

    serialize: function () {
        var data = {
            textfields: [],
            fonts: [],
            colors: [],
            is: [],
            sliders: [],
            image: {
                cover: '',
                background: '',
            },
            touch: {
                icon: '',
                position: '',
            },
            synonym: '',
            post: {
                layout: '',
            }
        };

        // textfield
        $(".widget-area input.set-value").each(function (index, row) {
            data.textfields.push({name: $(row).data('target'), value: $(row).val()});
        });

        // font
        $(".widget-area select.set-font").each(function (index, row) {
            data.fonts.push({name: $(row).data('target'), value: $(row).val()});
        });

        // color
        $(".widget-area .color-circle").each(function (index, row) {
            data.colors.push({name: $(row).data('color-target'), value: $(row).next('input').val()});
        });

        // switch
        $('.widget-area .form-check-input').each(function (index, row) {
            data.is.push({name: $(row).data('target'), value: $(row).prop('checked')});
        });

        // slider
        $('.widget-area .set-slider').each(function (index, row) {
            data.sliders.push({name: $(row).data('target'), value: $(row).val()});
        });

        data.image.cover = $("#coverImage").attr('data-image');
        data.image.background = $("#backgroundColorImage").attr('data-image');

        data.touch.icon = $(".widget-area .icon-group .icon-btn.selected").data('icon');
        data.touch.position = $(".widget-area .position-panel .item.active").data('position');

        data.synonym = $('#synonymSelect').val();
        data.post.layout = $(".widget-area .article-area .item.active").data('layout');

        return data;
    },

    publish: function (isDirectly) {
        var userProps = isDirectly != null && isDirectly ? this.getDefaultData() : this.serialize();
        console.log("Publishing..........", userProps);

        SEORushUtilities.showLoading("Publishing......");
        createUpdateWidget("Template-" + this.templateID, userProps, true, false, null, function (result) {
            SEORushUtilities.hideLoading();
            if (result != null) {
                $("#publishSuccessModal").modal('show');
            } else {

            }
        });
    },
}

$(document).ready(function () {
    loadKeywordsSuggestions();

    SEORushHome.init();
    OptimizationPage.init();
    MyBlogPage.init();
    LocalListingsPage.init();
    GuestPostsPage.init();
    KeywordsPage.init();

    WidgetComponentPanel.init();
    PreviewWidget.init();
});
