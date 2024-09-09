var i = {
    t: function () {
        var e = new Date, t = e.getDate(), o = e.getMonth() + 1;
        return e.getFullYear() + "-" + (o = o < 10 ? "0" + o : o) + "-" + (t = t < 10 ? "0" + t : t)
    }, o: function (e) {
        var e = new Date(e), t = e.getDate(), o = e.getFullYear();
        return t + (t % 10 == 1 && 11 !== t ? "st" : t % 10 == 2 && 12 !== t ? "nd" : t % 10 == 3 && 13 !== t ? "rd" : "th") + ` ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][e.getMonth()]}, ` + o
    }, i: function () {
        return [{
            id: "English",
            text: '<div class="d-flex align-items-center gap-2" title="English"><img src="/assets/images/content123/flag/english.png"/> English </div>'
        }, {
            id: "Bulgarian",
            text: '<div class="d-flex align-items-center gap-2" title="Bulgarian"><img src="/assets/images/content123/flag/bulgarian.png"/> Bulgarian </div>'
        }, {
            id: "Czech",
            text: '<div class="d-flex align-items-center gap-2" title="Czech"><img src="/assets/images/content123/flag/czech.png"/> Czech </div>'
        }, {
            id: "Danish",
            text: '<div class="d-flex align-items-center gap-2" title="Danish"><img src="/assets/images/content123/flag/danish.png"/> Danish </div>'
        }, {
            id: "Dutch",
            text: '<div class="d-flex align-items-center gap-2" title="Dutch"><img src="/assets/images/content123/flag/dutch.png"/> Dutch </div>'
        }, {
            id: "Filipino",
            text: '<div class="d-flex align-items-center gap-2" title="Filipino"><img src="/assets/images/content123/flag/filipino.png"/> Filipino </div>'
        }, {
            id: "Finnish",
            text: '<div class="d-flex align-items-center gap-2" title="Finnish"><img src="/assets/images/content123/flag/finnish.png"/> Finnish </div>'
        }, {
            id: "French",
            text: '<div class="d-flex align-items-center gap-2" title="French"><img src="/assets/images/content123/flag/french.png"/> French </div>'
        }, {
            id: "German",
            text: '<div class="d-flex align-items-center gap-2" title="German"><img src="/assets/images/content123/flag/german.png"/> German </div>'
        }, {
            id: "Greek",
            text: '<div class="d-flex align-items-center gap-2" title="Greek"><img src="/assets/images/content123/flag/greek.png"/> Greek </div>'
        }, {
            id: "Hindi",
            text: '<div class="d-flex align-items-center gap-2" title="Hindi"><img src="/assets/images/content123/flag/hindi.png"/> Hindi </div>'
        }, {
            id: "Hungarian",
            text: '<div class="d-flex align-items-center gap-2" title="Hungarian"><img src="/assets/images/content123/flag/hungarian.png"/> Hungarian </div>'
        }, {
            id: "Indonesian",
            text: '<div class="d-flex align-items-center gap-2" title="Indonesian"><img src="/assets/images/content123/flag/indonesian.png"/> Indonesian </div>'
        }, {
            id: "Italian",
            text: '<div class="d-flex align-items-center gap-2" title="Italian"><img src="/assets/images/content123/flag/italian.png"/> Italian </div>'
        }, {
            id: "Japanese",
            text: '<div class="d-flex align-items-center gap-2" title="Japanese"><img src="/assets/images/content123/flag/japanese.png"/> Japanese </div>'
        }, {
            id: "Korean",
            text: '<div class="d-flex align-items-center gap-2" title="Korean"><img src="/assets/images/content123/flag/korean.png"/> Korean </div>'
        }, {
            id: "Latvian",
            text: '<div class="d-flex align-items-center gap-2" title="Latvian"><img src="/assets/images/content123/flag/latvian.png"/> Latvian </div>'
        }, {
            id: "Lithuanian",
            text: '<div class="d-flex align-items-center gap-2" title="Lithuanian"><img src="/assets/images/content123/flag/lithuanian.png"/> Lithuanian </div>'
        }, {
            id: "Malay",
            text: '<div class="d-flex align-items-center gap-2" title="Malay"><img src="/assets/images/content123/flag/malay.png"/> Malay </div>'
        }, {
            id: "Norwegian",
            text: '<div class="d-flex align-items-center gap-2" title="Norwegian"><img src="/assets/images/content123/flag/norwegian.png"/> Norwegian </div>'
        }, {
            id: "Polish",
            text: '<div class="d-flex align-items-center gap-2" title="Polish"><img src="/assets/images/content123/flag/polish.png"/> Polish </div>'
        }, {
            id: "Portuguese",
            text: '<div class="d-flex align-items-center gap-2" title="Portuguese"><img src="/assets/images/content123/flag/portuguese.png"/> Portuguese </div>'
        }, {
            id: "Romanian",
            text: '<div class="d-flex align-items-center gap-2" title="Romanian"><img src="/assets/images/content123/flag/romanian.png"/> Romanian </div>'
        }, {
            id: "Russian",
            text: '<div class="d-flex align-items-center gap-2" title="Russian"><img src="/assets/images/content123/flag/russian.png"/> Russian </div>'
        }, {
            id: "Slovak",
            text: '<div class="d-flex align-items-center gap-2" title="Slovak"><img src="/assets/images/content123/flag/slovak.png"/> Slovak </div>'
        }, {
            id: "Slovenian",
            text: '<div class="d-flex align-items-center gap-2" title="Slovenian"><img src="/assets/images/content123/flag/slovenian.png"/> Slovenian </div>'
        }, {
            id: "Spanish",
            text: '<div class="d-flex align-items-center gap-2" title="Spanish"><img src="/assets/images/content123/flag/spanish.png"/> Spanish </div>'
        }, {
            id: "Swedish",
            text: '<div class="d-flex align-items-center gap-2" title="Swedish"><img src="/assets/images/content123/flag/swedish.png"/> Swedish </div>'
        }, {
            id: "Thai",
            text: '<div class="d-flex align-items-center gap-2" title="Thai"><img src="/assets/images/content123/flag/thai.png"/> Thai </div>'
        }, {
            id: "Turkish",
            text: '<div class="d-flex align-items-center gap-2" title="Turkish"><img src="/assets/images/content123/flag/turkish.png"/> Turkish </div>'
        }, {
            id: "Ukrainian",
            text: '<div class="d-flex align-items-center gap-2" title="Ukrainian"><img src="/assets/images/content123/flag/ukrainian.png"/> Ukrainian </div>'
        }, {
            id: "Vietnamese",
            text: '<div class="d-flex align-items-center gap-2" title="Vietnamese"><img src="/assets/images/content123/flag/vietnamese.png"/> Vietnamese </div>'
        }]
    }, l: function (e) {
        return e = e.replace(/^#/, ""), {
            red: parseInt(e.substring(0, 2), 16),
            green: parseInt(e.substring(2, 4), 16),
            blue: parseInt(e.substring(4, 6), 16)
        }
    }, g: function (e) {
        null == e || "" == e ? $("#loading-overlay .message").html("Loading...") : $("#loading-overlay .message").html(e), $("#loading-overlay").show()
    }, u: function () {
        $("#loading-overlay").hide()
    }
}, o = {
    p: "", m: "", v: [], h: null, init: function () {
        var t = this,
            e = (null != mainUserDetails.embedScriptUrl && "" != mainUserDetails.embedScriptUrl ? $("#codeIntegrationDialog .code-snippet code").text(mainUserDetails.embedScriptUrl) : $(".welcome-page .code-integration-btn").hide(), mainUserDetails.hideCTAUpgradeLinks && $("#membership-upgrade-alert .btn").hide(), mainUserDetails.hideAllUpgradeLinks ? ($("#membership-upgrade-alert").hide(), $(".sidebar .logo").css("marginTop", "0rem")) : $(".sidebar .logo").css("marginTop", "3rem"), $("#membership-upgrade-alert").outerHeight());
        $(window).scroll(function () {
            $(this).scrollTop() > e ? $(".sidebar .logo").css("marginTop", "0rem") : $(".sidebar .logo").css("marginTop", "3rem")
        }), $("#membership-upgrade-alert").on("click", ".btn", function (e) {
            e.preventDefault(), callUpgradePage()
        }), $(".sidebar").on("click", ".nav-item a:not(.active)", function () {
            var e = $(this).data("menu");
            t.C(e)
        }), $(".welcome-page .publish-btn").on("click", function () {
            t.k()
        }), $("#wordLevelButton").on("click", ".btn", function () {
            $("#wordLevelButton .btn").removeClass("active"), $(this).addClass("active")
        }), $("#articleLanguage").select2({
            placeholder: "Please select a country",
            dropdownParent: $("#publishNewArticleDialog"),
            data: i.i(),
            templateResult: function (e) {
                return $(e.text)
            },
            templateSelection: function (e) {
                return $(e.text)
            }
        }), $("#blogLinkKeyword").select2({
            placeholder: "Type a keyword or choose from the list...",
            dropdownParent: $("#publishNewArticleDialog"),
            allowClear: !1
        }), $("#blogPostTitle").select2({
            placeholder: "Choose blog title from the list or type your own title...",
            dropdownParent: $("#publishNewArticleDialog"),
            allowClear: !1
        }), $("#blogLinkKeyword").on("change", function () {
            t.S($("#blogLinkKeyword").val())
        }), $.getJSON(getApiUrl("getMyJsonPublishKeywordsWebsite"), function (data) {
            console.log("getMyJsonPublishKeywordsWebsite json " + JSON.stringify(data));
            data = data.list;
            $("#blogLinkKeyword").empty().trigger("change"), $("#blogLinkKeyword").select2({
                tokenSeparators: [",", ", ", "\n"],
                selectOnClose: !0,
                dropdownParent: $("#publishNewArticleDialog"),
                data: data,
                tags: !0,
                placeholder: "Choose blog title from the list or type your own title...",
                language: {L: () => "Choose blog title from the list or type your own title..."}
            })
        }), $("#publishNewArticleDialog").on("click", ".btn-generate", function (e) {
            e.preventDefault(), t.T()
        }), $("#fullscreen-modal .article-preview-wrapper .content-editing-area textarea").summernote({
            placeholder: "Write something amazing...",
            tabsize: 2,
            height: 200,
            toolbar: [["style", ["style"]], ["font", ["bold", "italic", "underline", "clear"]], ["fontname", ["fontname"]], ["color", ["color"]], ["para", ["ul", "ol", "paragraph"]], ["table", ["table"]], ["insert", ["link", "picture", "video"]], ["view", ["fullscreen", "codeview", "help"]]]
        }), $("#fullscreen-modal").on("click", ".modal-content .back-btn", function () {
            $("#fullscreen-modal").hide()
        }), $("#fullscreen-modal").on("click", ".modal-content .change-cover-btn", function () {
            $("#galleryDialog .tag-buttons").hide(), $("#galleryDialog .image-grid").html(""), $("#galleryDialog").modal("show"), s.M = "#fullscreen-modal .article-preview-wrapper .header-information>.cover-image", s.F(o.m)
        }), $("#fullscreen-modal").on("click", ".save-draft-btn", function (e) {
            e.preventDefault(), e.stopPropagation(), t.P()
        }), $("#fullscreen-modal").on("click", ".publish-now-btn", function (e) {
            e.preventDefault(), e.stopPropagation(), t.P()
        }), $("#fullscreen-modal").on("click", ".rate-btn", function (e) {
            e.preventDefault(), e.stopPropagation(), $("#publishArticleSuccessModal").modal("hide")
        }), $("#fullscreen-modal").on("click", ".btn-primary", function (e) {
            e.preventDefault(), e.stopPropagation(), $("#publishArticleSuccessModal").modal("hide")
        }), $("#fullscreen-modal").on("click", ".add-new-btn", function (e) {
            e.preventDefault(), e.stopPropagation(), $("#publishArticleSuccessModal").modal("hide"), t.k()
        }), $("#fullscreen-modal").on("click", ".blog-design-btn", function (e) {
            e.preventDefault(), e.stopPropagation(), $("#publishArticleSuccessModal").modal("hide")
        }), t.D(), t.B(), $("#my_blog_table").on("click", ".action-edit", function (e) {
            e.preventDefault();
            e = t.h.row($(this).parent().parent().parent().parent()).data();
            t.I(e.id)
        }), $("#my_blog_table").on("click", ".action-delete", function () {
            t.h.row($(this).parent().parent().parent().parent()).data();
            confirm("Are you sure")
        }), $(".welcome-page .manage-blog-btn").on("click", function () {
            var button = $(this), e = button.offset();
            $("#managed_blog_modal").css({top: e.top + button.outerHeight() + 5, left: e.left - 40}).toggle()
        }), $(document).click(function (e) {
            $(e.target).closest(".welcome-page .manage-blog-btn, #managed_blog_modal").length || $("#managed_blog_modal").hide()
        }), $("#publishArticleSuccessModal").on("click", ".see-live-post-btn", function (e) {
            e.preventDefault(), $("#publishArticleSuccessModal").modal("hide")
        }), $("#publishArticleSuccessModal").on("click", ".add-new-btn", function (e) {
            e.preventDefault(), $("#publishArticleSuccessModal").modal("hide"), setTimeout(function () {
                t.k()
            }, 500)
        }), $("#publishArticleSuccessModal").on("click", ".blog-design-btn", function (e) {
            e.preventDefault(), $("#publishArticleSuccessModal").modal("hide"), o.C("my-blog")
        })
    }, C: function (e) {
        $(".sidebar a").removeClass("active"), $(".sidebar a[data-menu='" + e + "']").addClass("active"), $(".content").hide(), $(".content." + e + "-page").show(), "welcome" == e ? o.show() : "optimization" == e ? a.show() : "my-blog" == e || "local-listings" == e ? t.show() : "guest-posts" == e ? n.show() : "insights" == e ? l.show() : "keywords" == e ? r.show() : "competitors" == e && c.show()
    }, D: function () {
        this.h = $("#my_blog_table").DataTable({
            dom: "Bfrtip",
            buttons: ["copy", "csv", "excel", "pdf", "print"],
            columnDefs: [{orderable: !1, targets: -1}],
            columns: [{data: "pageTitle"}, {data: "pageUrl"}, {data: "keywordName"}, {
                render: function (data, type, e) {
                    return ""
                }
            }, {
                data: "linkStatus", render: function (data, type, e) {
                    return "Live" == data ? '<span class="badge-success">Visible</span>' : '<span class="badge-danger">Hidden</span>'
                }
            }, {
                data: "dateCreated", render: function (data, type, e) {
                    return i.o(data)
                }
            }, {
                render: function (data, type, e) {
                    return `
                            <div class="dropdown">
                                <span class="has-action bi bi-three-dots-vertical" id="dropdownMenuButton${e.id}" data-bs-toggle="dropdown" aria-expanded="false"></span>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton${e.id}">
                                    <li class="dropdown-item action-edit">
                                        <span><i class="bi bi-sliders"></i> &nbsp; Edit</span>
                                    </li>
                                    <li class="dropdown-item text-danger action-delete">
                                        <span><i class="bi bi-trash"></i> &nbsp; Delete</span>
                                    </li>
                                </ul>
                            </div>                         
                    `
                }
            }],
            order: [[5, "desc"]]
        })
    }, B: function () {
        var t = this, e = getApiUrl("jsonByOnlyBlogsLink");
        i.g(), $.getJSON(e, function (e) {
            i.u(), e && e.list && (t.v = e.list, t.O(e.list))
        })
    }, O: function (e) {
        o.h.clear(), $.each(e, function (index, e) {
            o.h.row.add(e)
        }), o.h.draw()
    }, S: function (e) {
        null == e || "" == e || 0 == e.length ? $("#blogPostTitle").empty().trigger("change") : (i.g(), e = getApiUrl("getMyJsonOpenAiIdeasLink?keyword=" + encodeURIComponent(e) + "&linkHref=" + encodeURIComponent("") + ($("#articleLanguage") ? "&language=" + encodeURIComponent($("#articleLanguage").val()) : "")), $.getJSON(e, function (data) {
            data.list && 0 < data.list.length ? ($("#blogPostTitle").empty().trigger("change"), $("#blogPostTitle").select2({
                tokenSeparators: [",", ", ", "\n"],
                selectOnClose: !0,
                dropdownParent: $("#publishNewArticleDialog"),
                data: data.list,
                tags: !0,
                placeholder: "Enter a keyword to promote",
                language: {L: () => "Enter a keyword to promote"}
            })) : $("#blogPostTitle").empty().trigger("change")
        }).done(function () {
            i.u()
        }).fail(function () {
            i.u()
        }))
    }, T: function () {
        var e = this, title = $("#blogPostTitle").val();
        if (null == title || "" == title) return alert("Please Choose Blog Post Title or Type it..."), !1;
        title = {};
        title.A = isTestingMode() ? 100 : parseInt($("#wordLevelButton .btn.active").data("level")), title.title = $("#blogPostTitle").val(), title._ = $("#blogLinkKeyword").val(), title.language = encodeURIComponent($("#articleLanguage").val()), i.g(), $.ajax({
            type: "POST",
            url: getApiUrl("generateArticleLink"),
            dataType: "json",
            data: title,
            async: !0,
            success: function (data) {
                i.u(), null == data.obj ? null != data.status && "" != data.status && alert(data.status) : (e.p = "", e.H(data))
            },
            error: function () {
                i.u()
            }
        })
    }, I: function (id) {
        var t = this, e = {};
        e.p = id, i.g(), $.ajax({
            type: "POST",
            url: getApiUrl("editMyBlogArticleLink"),
            dataType: "json",
            data: e,
            async: !0,
            success: function (e) {
                i.u(), console.log("editMyBlogArticleLink result " + JSON.stringify(e)), e.obj && (t.p = id, t.H(e))
            },
            error: function () {
                i.u()
            }
        })
    }, k: function () {
        $("#blogLinkKeyword").val("").trigger("change"), $("#blogPostTitle").empty().trigger("change"), $("#articleLanguage").val("English").trigger("change"), $("#wordLevelButton .btn").removeClass("active"), $("#wordLevelButton .btn[data-level=600]").addClass("active"), $("#publishDate").val(i.t()), $("#publishNewArticleDialog").modal("show")
    }, H: function (data) {
        $("#fullscreen-modal .article-preview-wrapper .header-information>h1").text(data.obj.title), $("#fullscreen-modal .article-preview-wrapper .header-information>p").text("" == o.p ? $("#publishDate").val() : i.t()), $("#fullscreen-modal .article-preview-wrapper .content-editing-area>textarea").summernote("code", data.obj.article.replace(/(\r\n|\r|\n)/g, "<br>")), this.m = data.obj.V, $("#fullscreen-modal").show()
    }, P: function () {
        var e = {},
            t = (e.p = this.p, e.N = $("#fullscreen-modal .article-preview-wrapper .header-information>.cover-image").attr("data-image"), e.title = $("#blogPostTitle").val(), $("#fullscreen-modal .article-preview-wrapper .content-editing-area>textarea").summernote("code"));
        e.j = t.replace(/<\/?[^>]+(>|$)/g, ""), e.text = t, e._ = $("#blogLinkKeyword").val(), i.g("Publishing....."), console.log("publishMyBlogArticle request is " + JSON.stringify(e)), $.ajax({
            type: "POST",
            url: getApiUrl("publishMyBlogArticleLink"),
            dataType: "json",
            data: e,
            async: !0,
            success: function (e) {
                i.u(), $("#fullscreen-modal").hide(), $("#publishNewArticleDialog").modal("hide"), $("#publishArticleSuccessModal").modal("show")
            },
            error: function () {
                i.u()
            }
        })
    }, show: function () {
        this.B()
    }
}, t = {
    Z: "desktop", init: function () {
        $("#blogTab").on("click", ".nav-item .nav-link", function (e) {
            var t = $(this).data("tab");
            "template" == t ? g.show("template") : "customize" == t && $("#customizationTab .nav-item .nav-link.active").trigger("click")
        }), $("#customizationTab").on("click", ".nav-item .nav-link", function (e) {
            var t = $(this).data("tab");
            "blog" == t ? g.show("template") : "post" == t && g.show("article")
        }), $(".my-blog-page .widget-area").on("click", ".blog-template-container .template-item:not(.active)", function (e) {
            var t = $(this).find("img").data("image");
            $(".my-blog-page .widget-area .blog-template-container .template-item").removeClass("active"), $(this).addClass("active"), g.show("template", t)
        }), $(".my-blog-page .preview-area .toolbar ").on("click", ".icons-section .icon-btn:not(.active)", function (e) {
            if (0 == $(".my-blog-page .widget-area .blog-template-container .template-item.active").length) return e.preventDefault(), !1;
            e = $(this).data("type");
            "desktop" == e || "mobile" == e ? ($(".my-blog-page .preview-area .toolbar .icons-section .icon-btn").removeClass("active"), $(this).addClass("active"), $("#preview_content").removeClass("mobile-view").removeClass("fullscreen-view"), "mobile" == e && $("#preview_content").addClass("mobile-view")) : ($("#fullscreen_preview_content").html($("#preview_content").html()), $("#fullscreenDialog").modal("show"))
        }), $(".my-blog-page .preview-area .toolbar ").on("click", ".buttons-section .btn", function (e) {
            if (0 == $(".my-blog-page .widget-area .blog-template-container .template-item.active").length) return e.preventDefault(), !1;
            e = $(this).data("type");
            "customize" == e ? $("#My_blog-customization-tab").tab("show") : "publish" == e && g.U(!1)
        })
    }, show: function () {
        this.Z = "desktop", g.J = !1, $(".my-blog-page .preview-area .toolbar .icons-section .icon-btn").removeClass("active"), $(".my-blog-page .preview-area .toolbar .icons-section .icon-btn[data-type='desktop']").addClass("active"), $("#My_blogTemplateTab .blog-template-container .template-item").removeClass("active"), $(".plugin-widget-container").removeClass("active"), $(".my-blog-page .preview-panel>.container-fluid>.blog-article-container").hide()
    }
}, a = {
    W: [`<svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4762 2.33031L31.4361 22.6251C32.1811 23.8851 32.1911 25.4001 31.4611 26.6751C30.7361 27.9501 29.4261 28.7101 27.9561 28.7101H4.04131C2.57633 28.7101 1.26134 27.9501 0.536347 26.6751C-0.188646 25.4051 -0.178646 23.8901 0.566347 22.6251L12.5262 2.32531C13.2562 1.08533 14.5562 0.340332 16.0012 0.340332C17.4462 0.340332 18.7462 1.08532 19.4762 2.33031ZM27.9561 27.7401C29.0711 27.7401 30.0661 27.1651 30.6211 26.1951C31.1761 25.2251 31.1661 24.0751 30.6011 23.1151L18.6412 2.82031C18.0862 1.87532 17.0962 1.31032 16.0012 1.31032C14.9062 1.31032 13.9162 1.87532 13.3612 2.82031L1.40134 23.1151C0.836344 24.0751 0.821344 25.2301 1.37634 26.1951C1.93133 27.1601 2.92632 27.7401 4.04131 27.7401H27.9561ZM18.1607 9.08558C17.7057 8.31058 16.9007 7.85059 16.0007 7.85059C15.1057 7.85059 14.2957 8.31058 13.8407 9.08558L7.0358 20.6355C6.57081 21.4205 6.56581 22.3605 7.0158 23.1504C7.4658 23.9404 8.28079 24.4154 9.19078 24.4154H22.8007C23.7106 24.4154 24.5256 23.9454 24.9756 23.1504C25.4256 22.3605 25.4206 21.4205 24.9556 20.6355L18.1607 9.08558ZM15.9415 19.1151C15.8065 19.1151 15.6915 19.0801 15.6065 19.0001C15.5215 18.9251 15.4715 18.8201 15.4615 18.7001L15.2715 15.2151V14.1651C15.2715 13.9801 15.3365 13.8201 15.4615 13.6901C15.7215 13.4351 16.1615 13.4351 16.4115 13.6951C16.5365 13.8201 16.6015 13.9801 16.6015 14.1651V15.2101L16.4065 18.6951C16.3965 18.8201 16.3515 18.9201 16.2715 19.0001C16.1865 19.0751 16.0765 19.1151 15.9415 19.1151ZM15.4154 19.9203C15.5604 19.7753 15.7354 19.6953 15.9404 19.6953C16.1504 19.6953 16.3254 19.7703 16.4754 19.9203C16.6204 20.0653 16.6954 20.2403 16.6954 20.4453C16.6954 20.6553 16.6204 20.8353 16.4754 20.9803C16.3304 21.1253 16.1504 21.2003 15.9404 21.2003C15.7354 21.2003 15.5604 21.1253 15.4154 20.9803C15.2704 20.8353 15.1904 20.6553 15.1904 20.4453C15.1904 20.2403 15.2704 20.0653 15.4154 19.9203ZM30.3566 10.6907C30.4466 10.8457 30.6066 10.9307 30.7766 10.9307C30.8616 10.9307 30.9466 10.9107 31.0216 10.8657C31.2516 10.7307 31.3266 10.4307 31.1916 10.2007L29.3766 7.11573C29.2416 6.88573 28.9416 6.80573 28.7116 6.94573C28.4816 7.08073 28.4067 7.38072 28.5417 7.61072L30.3566 10.6907ZM29.5512 14.6703C29.3812 14.6703 29.2212 14.5853 29.1312 14.4303L24.7262 6.96033C24.5912 6.73033 24.6662 6.43034 24.8962 6.29534C25.1262 6.15534 25.4262 6.23534 25.5612 6.46534L29.9662 13.9403C30.1012 14.1703 30.0262 14.4703 29.7962 14.6053C29.7212 14.6503 29.6362 14.6703 29.5512 14.6703ZM0.982157 10.8607C1.05716 10.9057 1.14216 10.9257 1.22715 10.9257C1.39215 10.9257 1.55715 10.8407 1.64715 10.6857L3.46213 7.60069C3.59713 7.37069 3.52213 7.07069 3.29214 6.93569C3.06214 6.80069 2.76214 6.87569 2.62714 7.10569L0.812158 10.1907C0.67716 10.4307 0.752159 10.7257 0.982157 10.8607ZM2.45644 14.6652C2.37144 14.6652 2.28645 14.6452 2.21145 14.6002C1.98145 14.4652 1.90145 14.1652 2.03645 13.9352L6.44641 6.4553C6.58141 6.2253 6.8814 6.1503 7.1114 6.2853C7.3414 6.4203 7.4164 6.7203 7.2814 6.9503L2.87644 14.4252C2.78644 14.5802 2.62144 14.6652 2.45644 14.6652Z" fill="#DC3545"/>
         </svg>`, `<svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4762 2.33031L31.4361 22.6251C32.1811 23.8851 32.1911 25.4001 31.4611 26.6751C30.7361 27.9501 29.4261 28.7101 27.9561 28.7101H4.04131C2.57633 28.7101 1.26134 27.9501 0.536347 26.6751C-0.188646 25.4051 -0.178646 23.8901 0.566347 22.6251L12.5262 2.32531C13.2562 1.08533 14.5562 0.340332 16.0012 0.340332C17.4462 0.340332 18.7462 1.08532 19.4762 2.33031ZM27.9561 27.7401C29.0711 27.7401 30.0661 27.1651 30.6211 26.1951C31.1761 25.2251 31.1661 24.0751 30.6011 23.1151L18.6412 2.82031C18.0862 1.87532 17.0962 1.31032 16.0012 1.31032C14.9062 1.31032 13.9162 1.87532 13.3612 2.82031L1.40134 23.1151C0.836344 24.0751 0.821344 25.2301 1.37634 26.1951C1.93133 27.1601 2.92632 27.7401 4.04131 27.7401H27.9561ZM18.1607 9.08558C17.7057 8.31058 16.9007 7.85059 16.0007 7.85059C15.1057 7.85059 14.2957 8.31058 13.8407 9.08558L7.0358 20.6355C6.57081 21.4205 6.56581 22.3605 7.0158 23.1504C7.4658 23.9404 8.28079 24.4154 9.19078 24.4154H22.8007C23.7106 24.4154 24.5256 23.9454 24.9756 23.1504C25.4256 22.3605 25.4206 21.4205 24.9556 20.6355L18.1607 9.08558ZM15.9415 19.1151C15.8065 19.1151 15.6915 19.0801 15.6065 19.0001C15.5215 18.9251 15.4715 18.8201 15.4615 18.7001L15.2715 15.2151V14.1651C15.2715 13.9801 15.3365 13.8201 15.4615 13.6901C15.7215 13.4351 16.1615 13.4351 16.4115 13.6951C16.5365 13.8201 16.6015 13.9801 16.6015 14.1651V15.2101L16.4065 18.6951C16.3965 18.8201 16.3515 18.9201 16.2715 19.0001C16.1865 19.0751 16.0765 19.1151 15.9415 19.1151ZM15.4154 19.9203C15.5604 19.7753 15.7354 19.6953 15.9404 19.6953C16.1504 19.6953 16.3254 19.7703 16.4754 19.9203C16.6204 20.0653 16.6954 20.2403 16.6954 20.4453C16.6954 20.6553 16.6204 20.8353 16.4754 20.9803C16.3304 21.1253 16.1504 21.2003 15.9404 21.2003C15.7354 21.2003 15.5604 21.1253 15.4154 20.9803C15.2704 20.8353 15.1904 20.6553 15.1904 20.4453C15.1904 20.2403 15.2704 20.0653 15.4154 19.9203ZM30.3566 10.6907C30.4466 10.8457 30.6066 10.9307 30.7766 10.9307C30.8616 10.9307 30.9466 10.9107 31.0216 10.8657C31.2516 10.7307 31.3266 10.4307 31.1916 10.2007L29.3766 7.11573C29.2416 6.88573 28.9416 6.80573 28.7116 6.94573C28.4816 7.08073 28.4067 7.38072 28.5417 7.61072L30.3566 10.6907ZM29.5512 14.6703C29.3812 14.6703 29.2212 14.5853 29.1312 14.4303L24.7262 6.96033C24.5912 6.73033 24.6662 6.43034 24.8962 6.29534C25.1262 6.15534 25.4262 6.23534 25.5612 6.46534L29.9662 13.9403C30.1012 14.1703 30.0262 14.4703 29.7962 14.6053C29.7212 14.6503 29.6362 14.6703 29.5512 14.6703ZM0.982157 10.8607C1.05716 10.9057 1.14216 10.9257 1.22715 10.9257C1.39215 10.9257 1.55715 10.8407 1.64715 10.6857L3.46213 7.60069C3.59713 7.37069 3.52213 7.07069 3.29214 6.93569C3.06214 6.80069 2.76214 6.87569 2.62714 7.10569L0.812158 10.1907C0.67716 10.4307 0.752159 10.7257 0.982157 10.8607ZM2.45644 14.6652C2.37144 14.6652 2.28645 14.6452 2.21145 14.6002C1.98145 14.4652 1.90145 14.1652 2.03645 13.9352L6.44641 6.4553C6.58141 6.2253 6.8814 6.1503 7.1114 6.2853C7.3414 6.4203 7.4164 6.7203 7.2814 6.9503L2.87644 14.4252C2.78644 14.5802 2.62144 14.6652 2.45644 14.6652Z" fill="#FD7E14"/>
        </svg>`, `<svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4762 2.33031L31.4361 22.6251C32.1811 23.8851 32.1911 25.4001 31.4611 26.6751C30.7361 27.9501 29.4261 28.7101 27.9561 28.7101H4.04131C2.57633 28.7101 1.26134 27.9501 0.536347 26.6751C-0.188646 25.4051 -0.178646 23.8901 0.566347 22.6251L12.5262 2.32531C13.2562 1.08533 14.5562 0.340332 16.0012 0.340332C17.4462 0.340332 18.7462 1.08532 19.4762 2.33031ZM27.9561 27.7401C29.0711 27.7401 30.0661 27.1651 30.6211 26.1951C31.1761 25.2251 31.1661 24.0751 30.6011 23.1151L18.6412 2.82031C18.0862 1.87532 17.0962 1.31032 16.0012 1.31032C14.9062 1.31032 13.9162 1.87532 13.3612 2.82031L1.40134 23.1151C0.836344 24.0751 0.821344 25.2301 1.37634 26.1951C1.93133 27.1601 2.92632 27.7401 4.04131 27.7401H27.9561ZM18.1607 9.08558C17.7057 8.31058 16.9007 7.85059 16.0007 7.85059C15.1057 7.85059 14.2957 8.31058 13.8407 9.08558L7.0358 20.6355C6.57081 21.4205 6.56581 22.3605 7.0158 23.1504C7.4658 23.9404 8.28079 24.4154 9.19078 24.4154H22.8007C23.7106 24.4154 24.5256 23.9454 24.9756 23.1504C25.4256 22.3605 25.4206 21.4205 24.9556 20.6355L18.1607 9.08558ZM20.0891 15.4994C20.0651 15.3514 19.9753 15.2259 19.8378 15.1203C19.7003 15.0147 19.557 14.9695 19.4118 14.9794C19.2677 14.9983 19.1437 15.065 19.0358 15.1845L16.112 18.5817L15.494 19.3867L15.3334 19.1774L13.225 16.718C13.1498 16.6353 13.0537 16.5862 12.9487 16.579C12.8409 16.5681 12.7365 16.6073 12.637 16.6835C12.5376 16.7598 12.4792 16.8514 12.459 16.9546C12.4452 17.0587 12.4686 17.1578 12.5318 17.2555L14.3567 19.9324L14.947 20.702C15.0079 20.7814 15.0803 20.8421 15.1623 20.8832C15.2562 20.9985 15.4977 21.0552 16.0846 21.0213C16.3136 20.9866 16.5049 20.8745 16.6496 20.686L17.4706 19.6166L20.0022 15.9183C20.0859 15.7883 20.117 15.6422 20.0891 15.4994ZM30.3566 10.6907C30.4466 10.8457 30.6066 10.9307 30.7766 10.9307C30.8616 10.9307 30.9466 10.9107 31.0216 10.8657C31.2516 10.7307 31.3266 10.4307 31.1916 10.2007L29.3766 7.11573C29.2416 6.88573 28.9416 6.80573 28.7116 6.94573C28.4816 7.08073 28.4067 7.38072 28.5417 7.61072L30.3566 10.6907ZM29.5512 14.6703C29.3812 14.6703 29.2212 14.5853 29.1312 14.4303L24.7262 6.96033C24.5912 6.73033 24.6662 6.43034 24.8962 6.29534C25.1262 6.15534 25.4262 6.23534 25.5612 6.46534L29.9662 13.9403C30.1012 14.1703 30.0262 14.4703 29.7962 14.6053C29.7212 14.6503 29.6362 14.6703 29.5512 14.6703ZM0.982157 10.8607C1.05716 10.9057 1.14216 10.9257 1.22715 10.9257C1.39215 10.9257 1.55715 10.8407 1.64715 10.6857L3.46213 7.60069C3.59713 7.37069 3.52213 7.07069 3.29214 6.93569C3.06214 6.80069 2.76214 6.87569 2.62714 7.10569L0.812158 10.1907C0.67716 10.4307 0.752159 10.7257 0.982157 10.8607ZM2.45644 14.6652C2.37144 14.6652 2.28645 14.6452 2.21145 14.6002C1.98145 14.4652 1.90145 14.1652 2.03645 13.9352L6.44641 6.4553C6.58141 6.2253 6.8814 6.1503 7.1114 6.2853C7.3414 6.4203 7.4164 6.7203 7.2814 6.9503L2.87644 14.4252C2.78644 14.5802 2.62144 14.6652 2.45644 14.6652Z" fill="#0D6EFD"/>
        </svg>`, `<svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4762 2.33031L31.4361 22.6251C32.1811 23.8851 32.1911 25.4001 31.4611 26.6751C30.7361 27.9501 29.4261 28.7101 27.9561 28.7101H4.04131C2.57633 28.7101 1.26134 27.9501 0.536347 26.6751C-0.188646 25.4051 -0.178646 23.8901 0.566347 22.6251L12.5262 2.32531C13.2562 1.08533 14.5562 0.340332 16.0012 0.340332C17.4462 0.340332 18.7462 1.08532 19.4762 2.33031ZM27.9561 27.7401C29.0711 27.7401 30.0661 27.1651 30.6211 26.1951C31.1761 25.2251 31.1661 24.0751 30.6011 23.1151L18.6412 2.82031C18.0862 1.87532 17.0962 1.31032 16.0012 1.31032C14.9062 1.31032 13.9162 1.87532 13.3612 2.82031L1.40134 23.1151C0.836344 24.0751 0.821344 25.2301 1.37634 26.1951C1.93133 27.1601 2.92632 27.7401 4.04131 27.7401H27.9561ZM18.1607 9.08558C17.7057 8.31058 16.9007 7.85059 16.0007 7.85059C15.1057 7.85059 14.2957 8.31058 13.8407 9.08558L7.0358 20.6355C6.57081 21.4205 6.56581 22.3605 7.0158 23.1504C7.4658 23.9404 8.28079 24.4154 9.19078 24.4154H22.8007C23.7106 24.4154 24.5256 23.9454 24.9756 23.1504C25.4256 22.3605 25.4206 21.4205 24.9556 20.6355L18.1607 9.08558ZM20.0891 15.4994C20.0651 15.3514 19.9753 15.2259 19.8378 15.1203C19.7003 15.0147 19.557 14.9695 19.4118 14.9794C19.2677 14.9983 19.1437 15.065 19.0358 15.1845L16.112 18.5817L15.494 19.3867L15.3334 19.1774L13.225 16.718C13.1498 16.6353 13.0537 16.5862 12.9487 16.579C12.8409 16.5681 12.7365 16.6073 12.637 16.6835C12.5376 16.7598 12.4792 16.8514 12.459 16.9546C12.4452 17.0587 12.4686 17.1578 12.5318 17.2555L14.3567 19.9324L14.947 20.702C15.0079 20.7814 15.0803 20.8421 15.1623 20.8832C15.2562 20.9985 15.4977 21.0552 16.0846 21.0213C16.3136 20.9866 16.5049 20.8745 16.6496 20.686L17.4706 19.6166L20.0022 15.9183C20.0859 15.7883 20.117 15.6422 20.0891 15.4994ZM30.3566 10.6907C30.4466 10.8457 30.6066 10.9307 30.7766 10.9307C30.8616 10.9307 30.9466 10.9107 31.0216 10.8657C31.2516 10.7307 31.3266 10.4307 31.1916 10.2007L29.3766 7.11573C29.2416 6.88573 28.9416 6.80573 28.7116 6.94573C28.4816 7.08073 28.4067 7.38072 28.5417 7.61072L30.3566 10.6907ZM29.5512 14.6703C29.3812 14.6703 29.2212 14.5853 29.1312 14.4303L24.7262 6.96033C24.5912 6.73033 24.6662 6.43034 24.8962 6.29534C25.1262 6.15534 25.4262 6.23534 25.5612 6.46534L29.9662 13.9403C30.1012 14.1703 30.0262 14.4703 29.7962 14.6053C29.7212 14.6503 29.6362 14.6703 29.5512 14.6703ZM0.982157 10.8607C1.05716 10.9057 1.14216 10.9257 1.22715 10.9257C1.39215 10.9257 1.55715 10.8407 1.64715 10.6857L3.46213 7.60069C3.59713 7.37069 3.52213 7.07069 3.29214 6.93569C3.06214 6.80069 2.76214 6.87569 2.62714 7.10569L0.812158 10.1907C0.67716 10.4307 0.752159 10.7257 0.982157 10.8607ZM2.45644 14.6652C2.37144 14.6652 2.28645 14.6452 2.21145 14.6002C1.98145 14.4652 1.90145 14.1652 2.03645 13.9352L6.44641 6.4553C6.58141 6.2253 6.8814 6.1503 7.1114 6.2853C7.3414 6.4203 7.4164 6.7203 7.2814 6.9503L2.87644 14.4252C2.78644 14.5802 2.62144 14.6652 2.45644 14.6652Z" fill="#198754"/>
        </svg>`], R: [], init: function () {
        var t = this, e = ($(".optimization-page .rescan-btn").on("click", function (e) {
                e.preventDefault(), t.Y()
            }), $(".optimization-page .add-landing-page-btn").on("click", function (e) {
                e.preventDefault(), t.G()
            }), $(".optimization-page .add-new-btn").on("click", function (e) {
                e.preventDefault(), t.G()
            }), $(".optimization-page .search-bar .bi-search").on("click", function (e) {
                t.K()
            }), document.createElementNS("http://www.w3.org/2000/svg", "svg")),
            o = (e.setAttribute("viewBox", "0 0 100 50"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), document.createElementNS("http://www.w3.org/2000/svg", "path")),
            a = (o.setAttribute("d", "M 10,50 A 40,40 0 1,1 90,50"), o.setAttribute("stroke", "#cccccc"), o.setAttribute("stroke-width", "16"), o.setAttribute("fill", "transparent"), document.createElementNS("http://www.w3.org/2000/svg", "path"));

        function i(e, index) {
            return $(e).children("td").eq(index).text()
        }

        a.setAttribute("d", "M 10,50 A 40,40 0 1,1 90,50"), a.setAttribute("stroke", "#007bff"), a.setAttribute("stroke-width", "16"), a.setAttribute("fill", "transparent"), e.appendChild(o), e.appendChild(a), $("#overall_seo_score_card .progress-container .half-circle").append(e), t.X = new ProgressBar.Path(a, {
            q: "easeInOut",
            duration: 1400,
            from: {color: "#007bff", width: 16},
            to: {color: "#007bff", width: 16},
            step: function (e, bar) {
                bar.path.setAttribute("stroke", e.color), bar.path.setAttribute("stroke-width", e.width)
            }
        }), t.X.set(0), t.X.animate(0), $("#overall_seo_score_card .progress-container .progress-value").html("0<small>%</small>"), $(".optimization-page .card-body .info-icon").tooltip(), $(".optimization-page .landing-pages-table th").click(function () {
            var index, e = $(this).parents("table").eq(0),
                t = e.find("tbody tr").toArray().sort((index = $(this).index(), function (e, t) {
                    e = i(e, index), t = i(t, index);
                    return "number" === $("th").eq(index).data("sort") ? parseFloat(e) - parseFloat(t) : e.toString().localeCompare(t)
                }));
            this.ee = !this.ee, this.ee || (t = t.reverse()), e.children("tbody").empty().html(t), $(".optimization-page .landing-pages-table .sorting-icon").removeClass("bi-chevron-up bi-chevron-down").addClass("bi-chevron-expand"), $(this).find(".sorting-icon").removeClass("bi-chevron-expand bi-chevron-up bi-chevron-down").addClass(this.ee ? "bi-chevron-up" : "bi-chevron-down")
        }), t.Y()
    }, te: function (e) {
        this.X.animate(e / 100), $("#overall_seo_score_card .progress-container .progress-value").html(e + "<small>%</small>")
    }, oe: function (type, e, element) {
        e < 5 ? $(element + " .icon").html(this.W[3]) : e < 20 ? $(element + " .icon").html(this.W[2]) : e < 50 ? $(element + " .icon").html(this.W[1]) : $(element + " .icon").html(this.W[0])
    }, Y: function () {
        var t = this;
        t.R = [], i.g(), $.getJSON(getApiUrl("jsonLandingPage"), function (e) {
            t.ae(e)
        }).done(function () {
            i.u()
        }).fail(function () {
            i.u()
        })
    }, ae: function (data) {
        var u = this, d = 0, p = 0, m = 0, v = 0, h = 0, b = 0, f = 0, C = 0, w = 0;
        $.each(data.list, function (index, e) {
            var t, o = 0, a = 0, success = 0, i = 0, n = 0, l = 0, r = 0, c = 0, s = 0, g = JSON.parse(e.testResult);
            0 == g.pageTitleLength ? (n++, i++) : 70 < g.pageTitleLength || g.pageTitleLength < 55 ? (n++, a++) : success++, g.pageTitleContainsKeyword ? success++ : (n++, r++, i++), g.metaDesc && "" != g.metaDesc ? 320 < (t = g.metaDesc.length) || t < 50 ? (l++, a++) : success++ : i++, g.metaDescContainsKeyword ? success++ : (l++, r++, i++), g.metaOgSiteName && "" != g.metaOgSiteName ? success++ : (l++, a++), g.metaOgSiteUrl && "" != g.metaOgSiteUrl ? success++ : (l++, a++), g.keywordDensity < 3 ? (r++, s++, i++) : success++, g.A < 100 ? i++ : success++, g.H1 && "" !== g.H1 ? g.H1Length && 30 < g.H1Length && g.H1Length < 150 ? success++ : (c++, a++) : (c++, i++), g.H1ContainsKeyword ? success++ : (c++, r++, i++), 0 === g.H2Exists ? a++ : success++, d += o += g.A, p += a, v += i, h += n, b += l, f += r, C += c, w += s, u.R.push({
                page: e.fullPageUrl,
                title: e.title,
                V: e.V,
                A: e.A,
                ie: e.ie,
                ne: g.ne || e.optScore || 0,
                le: i
            }), m += g.ne || e.optScore || 0
        }), m = parseInt(m / data.list.length), u.te(m), $("#pages_count_card h2").text(data.list.length), $("#site_content_card h2").text(d), $("#warnings_card h2").text(p), $("#server_issues_card h2").text(v), $("#title_card h2").text(h), $("#meta_description_tag_card h2").text(b), $("#keyword_optimization_card h2").text(f), $("#page_heading_card h2").text(C), $("#keyword_density_card h2").text(w), this.oe("server", v, "#server_issues_card"), this.oe("title", h, "#title_card"), this.oe("meta", b, "#meta_description_tag_card"), this.oe("keyword optimization", f, "#keyword_optimization_card"), this.oe("heading", C, "#page_heading_card"), this.oe("keyword density", w, "#keyword_density_card"), u.re(u.R)
    }, re: function (data) {
        var a = "";
        $(".optimization-page .landing-pages-table tbody").html(""), $.each(data, function (index, e) {
            var t = "", t = e.le < 5 ? "good" : e.le < 20 ? "acceptable" : e.le < 50 ? "warning" : "critical", o = "",
                o = 90 < e.ne ? "bg-success" : 75 < e.ne ? "bg-primary" : 50 < e.ne ? "bg-warning" : "bg-danger";
            a += `<tr>
                        <td><a href="${e.page}" target="_blank">${e.page}</a></td>
                        <td>${e.title}</td>
                        <td>${e.V}</td>
                        <td>${e.A}</td>
                        <td>${i.o(e.ie)}</td>
                        <td>
                            <div class="progress">
                                <div class="progress-bar ${o}" style="width: ${e.ne}%;">${e.ne}%</div>
                            </div>
                        </td>
                        <td>
                            <div class="issues-badge ${t}">
                                <i class="bi bi-exclamation-circle-fill"></i> ${e.le}
                            </div>
                        </td>
                    </tr>`
        }), $(".optimization-page .landing-pages-table tbody").html(a)
    }, K: function () {
        var t, o = $(".optimization-page .search-bar>input").val();
        "" == o ? this.re(this.R) : (t = [], $.each(this.R, function (index, e) {
            (-1 < e.page.indexOf(o) || -1 < e.title.indexOf(o) || -1 < e.V.indexOf(o)) && t.push(e)
        }), this.re(t))
    }, G: function () {
    }, show: function () {
        this.Y()
    }
}, e = {
    init: function () {
    }
}, n = {
    init: function () {
    }
}, l = {
    init: function () {
    }
}, r = {
    init: function () {
    }
}, c = {
    init: function () {
    }
}, s = {
    ce: "#90A1AB", se: "#FD7E14", M: "", init: function () {
        var t = this;
        $(".widget-area .tooltip-icon").tooltip(), $("#coverImageBrightnessSlider").slider({
            min: 0,
            max: 100,
            value: 100,
            tooltip: "hide"
        }).on("change", function (e) {
            g.update("coverImageBrightness", e.value.newValue)
        }), $("#blogLikesCounterOpacitySlider").slider({
            min: 0,
            max: 100,
            value: 100,
            tooltip: "hide"
        }).on("change", function (e) {
            g.update("blogLikesCounterOpacity", e.value.newValue)
        }), $("#opacitySlider").slider({min: 0, max: 100, value: 10, tooltip: "hide"}).on("change", function (e) {
            g.update("opacity", e.value.newValue)
        }), $("#blogWidthSlider").slider({min: 20, max: 100, value: 33, tooltip: "hide"}).on("change", function (e) {
            g.update("blogWidth", e.value.newValue)
        }), $("#topSpacingSlider").slider({min: 0, max: 100, value: 20, tooltip: "hide"}).on("change", function (e) {
            g.update("topSpacing", e.value.newValue)
        }), $("#shadowSizeSlider").slider({min: 0, max: 20, value: 0, tooltip: "hide"}).on("change", function (e) {
            g.update("shadowSize", e.value.newValue)
        }), $("#shadowOpacitySlider").slider({min: 0, max: 100, value: 50, tooltip: "hide"}).on("change", function (e) {
            g.update("shadowOpacity", e.value.newValue)
        }), $("#postLikesCounterSizeSlider").slider({
            min: 8,
            max: 15,
            value: 10,
            tooltip: "hide"
        }).on("change", function (e) {
            g.update("postLikeCounterSize", e.value.newValue)
        }), $("#titleSizeSlider").slider({min: 30, max: 70, value: 45, tooltip: "hide"}).on("change", function (e) {
            g.update("titleSize", e.value.newValue)
        }), $("#textSizeSlider").slider({min: 12, max: 45, value: 15, tooltip: "hide"}).on("change", function (e) {
            g.update("textSize", e.value.newValue)
        }), $("#spacingSlider").slider({min: 10, max: 70, value: 25, tooltip: "hide"}).on("change", function (e) {
            g.update("spacing", e.value.newValue)
        }), $("#pluginSizeSlider").slider({min: 10, max: 50, value: 10, tooltip: "hide"}).on("change", function (e) {
            g.update("pluginSize", e.value.newValue)
        }), $("#roundingSlider").slider({min: 0, max: 50, value: 12, tooltip: "hide"}).on("change", function (e) {
            g.update("rounding", e.value.newValue)
        }), $("#sideSpacingSlider").slider({min: 0, max: 24, value: 0, tooltip: "hide"}).on("change", function (e) {
            g.update("sideSpacing", e.value.newValue)
        }), $(".article-area").on("click", ".item:not(.active)", function () {
            $(".article-area .item").removeClass("active"), $(this).addClass("active");
            var layout = $(this).data("layout");
            g.ge(layout)
        }), $(".widget-area .form-check-input").on("change", function (e) {
            g.update($(this).data("target"), $(this).prop("checked"))
        }), $("#changeCoverImageButton").on("click", function () {
            $("#galleryDialog .tag-buttons").show(), $("#galleryDialog .tag-buttons .btn").removeClass("selected"), $("#galleryDialog .tag-buttons .btn.architecture").addClass("selected"), $("#galleryDialog").modal("show"), t.M = "#coverImage", t.F("Architecture")
        }), $("#changeBackgroundImage").on("click", function (e) {
            if (e.preventDefault(), !$("#backgroundImageOption").prop("checked")) return !1;
            $("#galleryDialog .tag-buttons").show(), $("#galleryDialog .tag-buttons .btn").removeClass("selected"), $("#galleryDialog .tag-buttons .btn.architecture").addClass("selected"), $("#galleryDialog").modal("show"), t.M = "#backgroundColorImage", t.F("Architecture")
        }), $("#galleryDialog").on("click", ".tag-buttons .btn", function () {
            $("#galleryDialog .tag-buttons .btn").removeClass("selected"), $(this).addClass("selected"), t.F($(this).text())
        }), $("#galleryDialog").on("click", ".image-grid img", function () {
            var e = $(this).attr("src");
            $("#galleryDialog").modal("hide"), $(t.M).css("background", "url('" + e + "') center/cover no-repeat"), $(t.M).attr("data-image", e), g.update($(t.M).data("target"), e)
        }), $(".widget-area .position-panel").on("mouseover", ".item:not(.active)", function () {
            $(".widget-area .position-panel .item:not(.active) svg > g > g > path").attr("fill", s.ce), $(this).find("svg > g > g > path").attr("fill", s.se)
        }), $(".widget-area .position-panel").on("mouseout", ".item:not(.active)", function () {
            $(".widget-area .position-panel .item:not(.active) svg > g > g > path").attr("fill", s.ce)
        }), $(".widget-area .position-panel").on("click", ".item", function () {
            var position = $(this).data("position");
            $(".widget-area .position-panel .item svg > g > g > path").attr("fill", s.ce), $(this).find("svg > g > g > path").attr("fill", s.se), $(".widget-area .position-panel .item").removeClass("active"), $(this).addClass("active"), g.ue(position)
        }), $(".widget-area .icon-btn").on("click", function () {
            $(".icon-btn").removeClass("selected"), $(this).addClass("selected"), g.update("touchIcon", $(this).data("icon"))
        }), $(".widget-area").on("click", ".color-circle", function () {
            "isBackgroundColor" == $(this).data("color-target") && !$("#backgroundColorOption").prop("checked") || $(this).next("input").trigger("click")
        }), $(".widget-area").on("change", ".color-item input", function () {
            var e = $(this).val(), t = $(this).prev(".color-circle"), o = $(t).data("color-target");
            t.css("background-color", e), g.update(o, e)
        }), $(".widget-area").on("change", "select.set-font", function () {
            var e = $(this).val(), t = $(this).data("target");
            g.update(t, e)
        }), $(".widget-area").on("change", "input.set-value", function () {
            var e = $(this).val(), t = $(this).data("target");
            g.update(t, e)
        }), $("#synonymSelect").on("change", function (e) {
            g.update("synonym", $(this).val())
        })
    }, F: function (e) {
        var t;
        $("#galleryDialog .image-grid").html(""), null != (list = getImagesListByQuery(e)) && (t = "", $.each(list, function (index, e) {
            t += '<img src="' + e + '" style="background: url(' + e + ') center center no-repeat;" alt="Image">'
        }), $("#galleryDialog .image-grid").html(t))
    }, ue: function (position) {
        $(".widget-area .position-panel .item[data-position='" + position + "']").trigger("click")
    }
}, g = {
    J: !1, de: "", pe: 0, init: function () {
        this.J = !1, $(".preview-area .tooltip-icon").tooltip(), $("#publishSuccessModal").on("click", ".btn-pink", function (e) {
            e.preventDefault()
        }), $("#publishSuccessModal").on("click", ".close", function (e) {
            e.preventDefault(), $("#publishSuccessModal").modal("hide")
        }), $("#publishSuccessModal").on("click", ".btn-outline-secondary", function (e) {
            e.preventDefault(), $("#publishSuccessModal").modal("hide"), o.C("welcome")
        }), this.me(), this.ve(), s.ue("right-bottom")
    }, he: function () {
        return 1 == this.pe ? {
            textfields: [{name: "blogTitleValue", value: "Welcome to Our Blog"}, {
                name: "blogSubTitleValue",
                value: "You can wrote some description here."
            }],
            fonts: [{name: "blogTitleFont", value: "Poppins"}, {
                name: "blogSubTitleFont",
                value: "Poppins"
            }, {name: "postTitleFont", value: "Poppins"}, {
                name: "postTextFont",
                value: "Poppins"
            }, {name: "dateAuthorDetailFont", value: "Poppins"}, {name: "readMoreTextFont", value: "Poppins"}],
            colors: [{name: "blogTitleColor", value: "#000000"}, {
                name: "blogSubTitleColor",
                value: "#000000"
            }, {name: "blogLikesCounterColor", value: "#ffffff"}, {
                name: "postTitleColor",
                value: "#000000"
            }, {name: "postTextColor", value: "#000000"}, {
                name: "dateAuthorDetailColor",
                value: "#141414"
            }, {name: "readMoreTextColor", value: "#1e24c6"}, {
                name: "backgroundColor",
                value: "#ffffff"
            }, {name: "shadowColor", value: "#2c3145"}, {
                name: "postLikesCounterColor",
                value: "#292929"
            }, {name: "iconBackgroundColor", value: "#000000"}, {
                name: "iconForeColor",
                value: "#ffffff"
            }, {name: "synonymousColor", value: "#000000"}],
            is: [{name: "isBlogLikesCounter", value: !0}, {
                name: "isBackgroundColor",
                value: !0
            }, {name: "isBackgroundImage", value: !1}, {name: "isShadow", value: !1}, {
                name: "isPostLikesCounter",
                value: !0
            }],
            sliders: [{name: "coverImageBrightness", value: "33"}, {
                name: "blogLikesCounterOpacity",
                value: "79"
            }, {name: "opacity", value: "10"}, {name: "blogWidth", value: "47"}, {
                name: "topSpacing",
                value: "46"
            }, {name: "shadowSize", value: "0"}, {name: "shadowOpacity", value: "50"}, {
                name: "postLikesCounterSize",
                value: "11"
            }, {name: "textSize", value: "15"}, {name: "spacing", value: "25"}, {
                name: "pluginSize",
                value: "10"
            }, {name: "rounding", value: "12"}, {name: "sideSpacing", value: "0"}],
            image: {
                cover: "https://images.unsplash.com/photo-1487603097198-fe76cd44579d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHwxMzB8fEFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MjQ2NDk5OTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
                background: ""
            },
            touch: {icon: "bi-envelope-fill", position: "right-bottom"},
            synonym: "blog"
        } : 2 == this.pe ? {
            textfields: [{name: "blogTitleValue", value: "Welcome to Our Blog"}, {
                name: "blogSubTitleValue",
                value: "You can wrote some description here."
            }],
            fonts: [{name: "blogTitleFont", value: "Poppins"}, {
                name: "blogSubTitleFont",
                value: "Poppins"
            }, {name: "postTitleFont", value: "Poppins"}, {
                name: "postTextFont",
                value: "Poppins"
            }, {name: "dateAuthorDetailFont", value: "Poppins"}, {name: "readMoreTextFont", value: "Poppins"}],
            colors: [{name: "blogTitleColor", value: "#000000"}, {
                name: "blogSubTitleColor",
                value: "#000000"
            }, {name: "blogLikesCounterColor", value: "#ffffff"}, {
                name: "postTitleColor",
                value: "#000000"
            }, {name: "postTextColor", value: "#000000"}, {
                name: "dateAuthorDetailColor",
                value: "#000000"
            }, {name: "readMoreTextColor", value: "#1e24c6"}, {
                name: "backgroundColor",
                value: "#ffffff"
            }, {name: "shadowColor", value: "#2c3145"}, {
                name: "postLikesCounterColor",
                value: "#000000"
            }, {name: "iconBackgroundColor", value: "#000000"}, {
                name: "iconForeColor",
                value: "#ffffff"
            }, {name: "synonymousColor", value: "#000000"}],
            is: [{name: "isBlogLikesCounter", value: !0}, {
                name: "isBackgroundColor",
                value: !0
            }, {name: "isBackgroundImage", value: !1}, {name: "isShadow", value: !1}, {
                name: "isPostLikesCounter",
                value: !1
            }],
            sliders: [{name: "coverImageBrightness", value: "100"}, {
                name: "blogLikesCounterOpacity",
                value: "79"
            }, {name: "opacity", value: "10"}, {name: "blogWidth", value: "100"}, {
                name: "topSpacing",
                value: "9"
            }, {name: "shadowSize", value: "0"}, {name: "shadowOpacity", value: "50"}, {
                name: "postLikesCounterSize",
                value: "10"
            }, {name: "textSize", value: "15"}, {name: "spacing", value: "25"}, {
                name: "pluginSize",
                value: "10"
            }, {name: "rounding", value: "12"}, {name: "sideSpacing", value: "0"}],
            image: {
                cover: "https://images.unsplash.com/photo-1461838239441-4475121c0b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHwxODR8fEFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MjQ2NDk0ODd8MA&ixlib=rb-4.0.3&q=80&w=1080",
                background: ""
            },
            touch: {icon: "bi-envelope-fill", position: "right-bottom"},
            synonym: "blog"
        } : 3 == this.pe ? {
            textfields: [{name: "blogTitleValue", value: "Newest in Our Blog"}, {
                name: "blogSubTitleValue",
                value: "All Articles"
            }],
            fonts: [{name: "blogTitleFont", value: "Poppins"}, {
                name: "blogSubTitleFont",
                value: "Poppins"
            }, {name: "postTitleFont", value: "Poppins"}, {
                name: "postTextFont",
                value: "Poppins"
            }, {name: "dateAuthorDetailFont", value: "Poppins"}, {name: "readMoreTextFont", value: "Poppins"}],
            colors: [{name: "blogTitleColor", value: "#000000"}, {
                name: "blogSubTitleColor",
                value: "#000000"
            }, {name: "blogLikesCounterColor", value: "#000000"}, {
                name: "postTitleColor",
                value: "#000000"
            }, {name: "postTextColor", value: "#000000"}, {
                name: "dateAuthorDetailColor",
                value: "#000000"
            }, {name: "readMoreTextColor", value: "#1e24c6"}, {
                name: "backgroundColor",
                value: "#ffffff"
            }, {name: "shadowColor", value: "#2c3145"}, {
                name: "postLikesCounterColor",
                value: "#000000"
            }, {name: "iconBackgroundColor", value: "#000000"}, {
                name: "iconForeColor",
                value: "#ffffff"
            }, {name: "synonymousColor", value: "#000000"}],
            is: [{name: "isBlogLikesCounter", value: !0}, {
                name: "isBackgroundColor",
                value: !1
            }, {name: "isBackgroundImage", value: !0}, {name: "isShadow", value: !1}, {
                name: "isPostLikesCounter",
                value: !1
            }],
            sliders: [{name: "coverImageBrightness", value: "100"}, {
                name: "blogLikesCounterOpacity",
                value: "94"
            }, {name: "opacity", value: "33"}, {name: "blogWidth", value: "35"}, {
                name: "topSpacing",
                value: "22"
            }, {name: "shadowSize", value: "8"}, {name: "shadowOpacity", value: "100"}, {
                name: "postLikesCounterSize",
                value: "10"
            }, {name: "textSize", value: "15"}, {name: "spacing", value: "25"}, {
                name: "pluginSize",
                value: "10"
            }, {name: "rounding", value: "12"}, {name: "sideSpacing", value: "0"}],
            image: {
                cover: "",
                background: "https://images.unsplash.com/photo-1455612693675-112974d4880b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHwxMjN8fEFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MjQ2NDk5OTF8MA&ixlib=rb-4.0.3&q=80&w=1080"
            },
            touch: {icon: "bi-envelope-fill", position: "right-bottom"},
            synonym: "blog"
        } : 4 == this.pe ? {
            textfields: [{name: "blogTitleValue", value: "Welcome to Our Blog"}, {
                name: "blogSubTitleValue",
                value: ""
            }],
            fonts: [{name: "blogTitleFont", value: "Poppins"}, {
                name: "blogSubTitleFont",
                value: "Poppins"
            }, {name: "postTitleFont", value: "Poppins"}, {
                name: "postTextFont",
                value: "Poppins"
            }, {name: "dateAuthorDetailFont", value: "Poppins"}, {name: "readMoreTextFont", value: "Poppins"}],
            colors: [{name: "blogTitleColor", value: "#ffffff"}, {
                name: "blogSubTitleColor",
                value: "#e6e6e6"
            }, {name: "blogLikesCounterColor", value: "#4f4f4f"}, {
                name: "postTitleColor",
                value: "#000000"
            }, {name: "postTextColor", value: "#000000"}, {
                name: "dateAuthorDetailColor",
                value: "#000000"
            }, {name: "readMoreTextColor", value: "#0f17ff"}, {
                name: "backgroundColor",
                value: "#d1d1d1"
            }, {name: "shadowColor", value: "#2c3145"}, {
                name: "postLikesCounterColor",
                value: "#000000"
            }, {name: "iconBackgroundColor", value: "#000000"}, {
                name: "iconForeColor",
                value: "#ffffff"
            }, {name: "synonymousColor", value: "#000000"}],
            is: [{name: "isBlogLikesCounter", value: !0}, {
                name: "isBackgroundColor",
                value: !0
            }, {name: "isBackgroundImage", value: !1}, {name: "isShadow", value: !0}, {
                name: "isPostLikesCounter",
                value: !1
            }],
            sliders: [{name: "coverImageBrightness", value: "100"}, {
                name: "blogLikesCounterOpacity",
                value: "100"
            }, {name: "opacity", value: "17"}, {name: "blogWidth", value: "48"}, {
                name: "topSpacing",
                value: "18"
            }, {name: "shadowSize", value: "4"}, {name: "shadowOpacity", value: "20"}, {
                name: "postLikesCounterSize",
                value: "10"
            }, {name: "textSize", value: "15"}, {name: "spacing", value: "25"}, {
                name: "pluginSize",
                value: "10"
            }, {name: "rounding", value: "12"}, {name: "sideSpacing", value: "0"}],
            image: {
                cover: "https://images.unsplash.com/photo-1597738755960-aeab75744b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHwxMjd8fEFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MjQ2NDk5OTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
                background: ""
            },
            touch: {icon: "bi-envelope-fill", position: "right-bottom"},
            synonym: "blog"
        } : 5 == this.pe ? {
            textfields: [{name: "blogTitleValue", value: "Welcome to Our Blog"}, {
                name: "blogSubTitleValue",
                value: "Welcome to Our Blog"
            }],
            fonts: [{name: "blogTitleFont", value: "Poppins"}, {
                name: "blogSubTitleFont",
                value: "Poppins"
            }, {name: "postTitleFont", value: "Poppins"}, {
                name: "postTextFont",
                value: "Poppins"
            }, {name: "dateAuthorDetailFont", value: "Poppins"}, {name: "readMoreTextFont", value: "Poppins"}],
            colors: [{name: "blogTitleColor", value: "#f5f5f5"}, {
                name: "blogSubTitleColor",
                value: "#ebebeb"
            }, {name: "blogLikesCounterColor", value: "#000000"}, {
                name: "postTitleColor",
                value: "#000000"
            }, {name: "postTextColor", value: "#000000"}, {
                name: "dateAuthorDetailColor",
                value: "#000000"
            }, {name: "readMoreTextColor", value: "#1e24c6"}, {
                name: "backgroundColor",
                value: "#b2aeae"
            }, {name: "shadowColor", value: "#2c3145"}, {
                name: "postLikesCounterColor",
                value: "#000000"
            }, {name: "iconBackgroundColor", value: "#000000"}, {
                name: "iconForeColor",
                value: "#ffffff"
            }, {name: "synonymousColor", value: "#000000"}],
            is: [{name: "isBlogLikesCounter", value: !1}, {
                name: "isBackgroundColor",
                value: !0
            }, {name: "isBackgroundImage", value: !1}, {name: "isShadow", value: !1}, {
                name: "isPostLikesCounter",
                value: !1
            }],
            sliders: [{name: "coverImageBrightness", value: "100"}, {
                name: "blogLikesCounterOpacity",
                value: "100"
            }, {name: "opacity", value: "6"}, {name: "blogWidth", value: "33"}, {
                name: "topSpacing",
                value: "21"
            }, {name: "shadowSize", value: "0"}, {name: "shadowOpacity", value: "50"}, {
                name: "postLikesCounterSize",
                value: "10"
            }, {name: "textSize", value: "15"}, {name: "spacing", value: "25"}, {
                name: "pluginSize",
                value: "10"
            }, {name: "rounding", value: "12"}, {name: "sideSpacing", value: "0"}],
            image: {
                cover: "https://images.unsplash.com/photo-1597738755960-aeab75744b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHwxMjd8fEFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MjQ2NDk5OTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
                background: ""
            },
            touch: {icon: "bi-envelope-fill", position: "right-bottom"},
            synonym: "blog"
        } : 6 == this.pe ? {
            textfields: [{name: "blogTitleValue", value: "Welcome to Our Blog"}, {
                name: "blogSubTitleValue",
                value: ""
            }],
            fonts: [{name: "blogTitleFont", value: "Poppins"}, {
                name: "blogSubTitleFont",
                value: "Poppins"
            }, {name: "postTitleFont", value: "Poppins"}, {
                name: "postTextFont",
                value: "Poppins"
            }, {name: "dateAuthorDetailFont", value: "Poppins"}, {name: "readMoreTextFont", value: "Poppins"}],
            colors: [{name: "blogTitleColor", value: "#000000"}, {
                name: "blogSubTitleColor",
                value: "#000000"
            }, {name: "blogLikesCounterColor", value: "#000000"}, {
                name: "postTitleColor",
                value: "#000000"
            }, {name: "postTextColor", value: "#000000"}, {
                name: "dateAuthorDetailColor",
                value: "#000000"
            }, {name: "readMoreTextColor", value: "#1e24c6"}, {
                name: "backgroundColor",
                value: "#ffffff"
            }, {name: "shadowColor", value: "#ff9ea3"}, {
                name: "postLikesCounterColor",
                value: "#000000"
            }, {name: "iconBackgroundColor", value: "#000000"}, {
                name: "iconForeColor",
                value: "#ffffff"
            }, {name: "synonymousColor", value: "#000000"}],
            is: [{name: "isBlogLikesCounter", value: !0}, {
                name: "isBackgroundColor",
                value: !0
            }, {name: "isBackgroundImage", value: !1}, {name: "isShadow", value: !0}, {
                name: "isPostLikesCounter",
                value: !1
            }],
            sliders: [{name: "coverImageBrightness", value: "100"}, {
                name: "blogLikesCounterOpacity",
                value: "71"
            }, {name: "opacity", value: "10"}, {name: "blogWidth", value: "32"}, {
                name: "topSpacing",
                value: "20"
            }, {name: "shadowSize", value: "3"}, {name: "shadowOpacity", value: "14"}, {
                name: "postLikesCounterSize",
                value: "10"
            }, {name: "textSize", value: "15"}, {name: "spacing", value: "25"}, {
                name: "pluginSize",
                value: "10"
            }, {name: "rounding", value: "12"}, {name: "sideSpacing", value: "0"}],
            image: {
                cover: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjYwNjJ8MHwxfHNlYXJjaHw0OHx8QnVzaW5lc3N8ZW58MHx8fHwxNzI0MTI2MzU3fDA&ixlib=rb-4.0.3&q=80&w=1080",
                background: ""
            },
            touch: {icon: "bi-envelope-fill", position: "right-bottom"},
            synonym: "blog"
        } : null
    }, me: function () {
        let e = mainUserDetails ? mainUserDetails.wixUrl : "";
        isTestingMode() && (e = "https://www.rabbitseo.com"), e = "https://www.rabbitseo.com", $("#sitePreview").attr("data", e)
    }, ve: function (e) {
        (e || mainUserDetails.avatar) && $("#sidebar .profile img").attr("src", null != e ? e : mainUserDetails.avatar)
    }, ue: function (position) {
        if (!this.J) return !1;
        this.update("touchPosition", position)
    }, be: function () {
        var color, size, opacity;
        $("#shadowOption").prop("checked") ? (color = i.l($('.widget-area .color-circle[data-color-target="shadowColor"]').next("input").val()), size = $("#shadowSizeSlider").val(), opacity = $("#shadowOpacitySlider").val(), $(".plugin-widget-container.active .for-shadow").css("boxShadow", size + "px " + size + "px " + parseInt(2 * size) + "px rgba(" + color.red + ", " + color.green + ", " + color.blue + ", " + opacity / 100 + ")")) : $(".plugin-widget-container.active .for-shadow").css("boxShadow", "none")
    }, ge: function (layout) {
        "1-row" == layout ? ($(".blog-article-container .article-wrapper>div").removeClass("order-1").removeClass("order-2"), $(".blog-article-container .article-wrapper>div").removeClass("col-6").addClass("col-12")) : ($(".blog-article-container .article-wrapper>div").removeClass("col-12").addClass("col-6"), ("2-column-right" == layout ? ($(".blog-article-container .article-blog-area").removeClass("order-2").addClass("order-1"), $(".blog-article-container .article-cover-area")) : ($(".blog-article-container .article-cover-area").removeClass("order-2").addClass("order-1"), $(".blog-article-container .article-blog-area"))).removeClass("order-1").addClass("order-2"))
    }, update: function (e, value) {
        "blogTitleFont" == e ? $(".plugin-widget-container.active .for-blogTitleFont").css("fontFamily", value) : "blogSubTitleFont" == e ? $(".plugin-widget-container.active .for-blogSubTitleFont").css("fontFamily", value) : "postTitleFont" == e ? ($(".plugin-widget-container.active .for-postTitleFont").css("fontFamily", value), $(".blog-article-container .for-postTitleFont").css("fontFamily", value)) : "postTextFont" == e ? ($(".plugin-widget-container.active .for-postTextFont").css("fontFamily", value), $(".blog-article-container .for-postTextFont").css("fontFamily", value)) : "dateAuthorDetailFont" == e ? ($(".plugin-widget-container.active .for-dateAuthorDetailFont").css("fontFamily", value), $(".blog-article-container .for-dateAuthorDetailFont").css("fontFamily", value)) : "readMoreTextFont" == e ? $(".plugin-widget-container.active .for-readMoreTextFont").css("fontFamily", value) : "coverImageBrightness" == e ? $(".plugin-widget-container.active .for-coverImageBrightness").css("opacity", value / 100) : "blogLikesCounterOpacity" == e ? $("#blogLikesCounterOption").prop("checked") && $(".plugin-widget-container.active .for-blogLikesCounterOpacity").css("opacity", value / 100) : "opacity" == e ? ($(".plugin-widget-container.active .for-backgroundOpacity").css("opacity", value / 100), $(".blog-article-container .for-backgroundOpacity").css("opacity", value / 100)) : "blogWidth" == e ? ($(".plugin-widget-container.active .for-blogWidth").css("width", value + "%"), $(".plugin-widget-container.active .for-blogWidth-100").css("width", 100 - value + "%")) : "topSpacing" == e ? $(".plugin-widget-container.active .for-topSpacing").css("marginTop", value + "px") : "shadowSize" == e || "shadowOpacity" == e ? this.be() : "postLikeCounterSize" == e ? $("#postLikesCounterOption").prop("checked") && $(".blog-article-container .for-postLikeCounterSize").css("fontSize", value + "px") : "titleSize" == e ? $(".blog-article-container .for-postTitleSize").css("fontSize", value + "px") : "textSize" == e ? $(".blog-article-container .for-postTextSize").css("fontSize", value + "px") : "spacing" == e ? $(".blog-article-container .for-postTextSpacing").css("lineHeight", value + "px") : "pluginSize" == e ? ($(".btnTouch").css("paddingLeft", 2 * value + "px"), $(".btnTouch").css("paddingRight", 2 * value + "px"), $(".btnTouch").css("paddingTop", value + "px"), $(".btnTouch").css("paddingBottom", value + "px")) : "rounding" == e ? $(".btnTouch").css("borderRadius", value + "px") : "sideSpacing" == e ? $(".btnTouch>.icon").css("marginRight", value + "px") : "blogTitleValue" == e ? $(".plugin-widget-container.active .for-blogTitleText").text(value) : "blogSubTitleValue" == e ? $(".plugin-widget-container.active .for-blogSubTitleText").text(value) : "isBlogLikesCounter" == e ? value ? ($(".plugin-widget-container.active .for-blogLikesCounter").show(), this.update("blogLikesCounterOpacity", $("#blogLikesCounterOpacitySlider").val()), this.update("blogLikesCounterColor", $(".widget-area .color-circle[data-color-target='blogLikesCounterColor']").next("input").val())) : $(".plugin-widget-container.active .for-blogLikesCounter").hide() : "isBackgroundColor" == e ? this.update("backgroundColor", $(".widget-area .color-circle[data-color-target='backgroundColor']").next("input").val()) : "isBackgroundImage" == e ? this.update("backgroundImage", $("#backgroundColorImage").attr("data-image")) : "isShadow" == e ? (this.update("shadowSize", $("#shadowSizeSlider").val()), this.update("shadowOpacity", $("#shadowOpacitySlider").val()), this.update("shadowColor", $(".widget-area .color-circle[data-color-target='shadowColor']").next("input").val())) : "isPostLikesCounter" == e ? value ? ($(".plugin-widget-container.active .for-postLikesCounter").show(), $(".blog-article-container .for-postLikesCounter").show(), this.update("postLikesCounterSize", $("#postLikesCounterSize").val()), this.update("postLikesCounterColor", $(".widget-area .color-circle[data-color-target='postLikesCounterColor']").next("input").val())) : ($(".plugin-widget-container.active .for-postLikesCounter").hide(), $(".blog-article-container .for-postLikesCounter").hide()) : "blogTitleColor" == e ? $(".plugin-widget-container.active .for-blogTitleColor").css("color", value) : "blogSubTitleColor" == e ? $(".plugin-widget-container.active .for-blogSubTitleColor").css("color", value) : "blogLikesCounterColor" == e ? $("#blogLikesCounterOption").prop("checked") && $(".plugin-widget-container.active .for-blogLikesCounterColor").css("color", value) : "postTitleColor" == e ? ($(".plugin-widget-container.active .for-postTitleColor").css("color", value), $(".blog-article-container .for-postTitleColor").css("color", value)) : "postTextColor" == e ? ($(".plugin-widget-container.active .for-postTextColor").css("color", value), $(".blog-article-container .for-postTextColor").css("color", value)) : "dateAuthorDetailColor" == e ? ($(".plugin-widget-container.active .for-dateAuthorDetailColor").css("color", value), $(".blog-article-container .for-dateAuthorDetailColor").css("color", value)) : "readMoreTextColor" == e ? $(".plugin-widget-container.active .for-readMoreTextColor").css("color", value) : "backgroundColor" == e ? $("#backgroundColorOption").prop("checked") ? ($(".plugin-widget-container.active .for-backgroundColor").css("background", value), $(".blog-article-container .for-backgroundColor").css("background", value)) : this.update("backgroundImage", $("#backgroundColorImage").attr("data-image")) : "shadowColor" == e ? this.be() : "postLikesCounterColor" == e ? $("#postLikesCounterOption").prop("checked") && $(".blog-article-container .for-postLikesCounterColor").css("color", value) : "iconBackgroundColor" == e ? $(".btnTouch").css("backgroundColor", value) : "iconForeColor" == e ? $(".btnTouch").css("color", value) : "synonymousColor" != e && ("coverImage" == e ? ("" == value && (value = "/assets/images/blank_10.png"), $(".plugin-widget-container.active .for-coverImage").css("background", "url('" + value + "') center/cover no-repeat")) : "backgroundImage" == e ? $("#backgroundImageOption").prop("checked") ? ("" == value && (value = "/assets/images/blank_10.png"), $(".plugin-widget-container.active .for-backgroundImage").css("background", "url('" + value + "') center/cover no-repeat"), $(".blog-article-container .for-backgroundImage").css("background", "url('" + value + "') center/cover no-repeat")) : this.update("backgroundColor", $(".widget-area .color-circle[data-color-target='backgroundColor']").next("input").val()) : "touchPosition" == e ? "left-top" == value ? $(".btnTouch").css("right", "auto").css("bottom", "auto").css("top", "10px").css("left", "24px") : "right-top" == value ? $(".btnTouch").css("left", "auto").css("bottom", "auto").css("top", "10px").css("right", "40px") : "left-bottom" == value ? $(".btnTouch").css("top", "auto").css("right", "auto").css("left", "24px").css("bottom", "10px") : "right-bottom" == value ? $(".btnTouch").css("top", "auto").css("left", "auto").css("right", "40px").css("bottom", "10px") : "left-middle" == value ? $(".btnTouch").css("right", "auto").css("bottom", "auto").css("top", "50%").css("left", "24px") : "right-middle" == value && $(".btnTouch").css("left", "auto").css("bottom", "auto").css("top", "50%").css("right", "40px") : "touchIcon" == e && $(".btnTouch>.icon").html("<i class='bi " + value + "'></i>"))
    }, apply: function (e, value) {
        "blogTitleFont" == e ? $('.widget-area select.set-font[data-target="blogTitleFont"]').val(value) : "blogSubTitleFont" == e ? $('.widget-area select.set-font[data-target="blogSubTitleFont"]').val(value) : "postTitleFont" == e ? $('.widget-area select.set-font[data-target="postTitleFont"]').val(value) : "postTextFont" == e ? $('.widget-area select.set-font[data-target="postTextFont"]').val(value) : "dateAuthorDetailFont" == e ? $('.widget-area select.set-font[data-target="dateAuthorDetailFont"]').val(value) : "readMoreTextFont" == e ? $('.widget-area select.set-font[data-target="readMoreTextFont"]').val(value) : "coverImageBrightness" == e ? $("#coverImageBrightnessSlider").slider("setValue", value) : "blogLikesCounterOpacity" == e ? $("#blogLikesCounterOpacitySlider").slider("setValue", value) : "opacity" == e ? $("#opacitySlider").slider("setValue", value) : "blogWidth" == e ? $("#blogWidthSlider").slider("setValue", value) : "topSpacing" == e ? $("#topSpacingSlider").slider("setValue", value) : "shadowSize" == e ? ($("#shadowSizeSlider").slider("setValue", value), this.be()) : "shadowOpacity" == e ? $("#shadowOpacitySlider").slider("setValue", value) : "postLikeCounterSize" == e ? $("#postLikesCounterSizeSlider").slider("setValue", value) : "titleSize" == e ? $("#titleSizeSlider").slider("setValue", value) : "textSize" == e ? $("#textSizeSlider").slider("setValue", value) : "spacing" == e ? $("#spacingSlider").slider("setValue", value) : "pluginSize" == e ? $("#pluginSizeSlider").slider("setValue", value) : "rounding" == e ? $("#roundingSlider").slider("setValue", value) : "sideSpacing" == e ? $("#sideSpacingSlider").slider("setValue", value) : "blogTitleValue" == e ? $('.widget-area input.set-value[data-target="blogTitleValue"]').val(value) : "blogSubTitleValue" == e ? $('.widget-area input.set-value[data-target="blogSubTitleValue"]').val(value) : "isBlogLikesCounter" == e ? $("#blogLikesCounterOption").prop("checked", value) : "isBackgroundColor" == e ? $("#backgroundColorOption").prop("checked", value) : "isBackgroundImage" == e ? $("#backgroundImageOption").prop("checked", value) : "isShadow" == e ? $("#shadowOption").prop("checked", value) : "isPostLikesCounter" == e ? $("#postLikesCounterOption").prop("checked", value) : "blogTitleColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='blogTitleColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='blogTitleColor']").next("input").val(value)) : "blogSubTitleColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='blogSubTitleColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='blogSubTitleColor']").next("input").val(value)) : "blogLikesCounterColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='blogLikesCounterColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='blogLikesCounterColor']").next("input").val(value)) : "postTitleColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='postTitleColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='postTitleColor']").next("input").val(value)) : "postTextColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='postTextColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='postTextColor']").next("input").val(value)) : "dateAuthorDetailColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='dateAuthorDetailColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='dateAuthorDetailColor']").next("input").val(value)) : "readMoreTextColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='readMoreTextColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='readMoreTextColor']").next("input").val(value)) : "backgroundColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='backgroundColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='backgroundColor']").next("input").val(value)) : "shadowColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='shadowColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='shadowColor']").next("input").val(value)) : "postLikesCounterColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='postLikesCounterColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='postLikesCounterColor']").next("input").val(value)) : "iconBackgroundColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='iconBackgroundColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='iconBackgroundColor']").next("input").val(value)) : "iconForeColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='iconForeColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='iconForeColor']").next("input").val(value)) : "synonymousColor" == e ? ($(".widget-area .color-item .color-circle[data-color-target='synonymousColor']").css("backgroundColor", value), $(".widget-area .color-item .color-circle[data-color-target='synonymousColor']").next("input").val(value)) : "coverImage" == e ? ($("#coverImage").attr("data-image", value), "" == value && (value = "/assets/images/blank_10.png"), $("#coverImage").css("background", "url('" + value + "') center/cover no-repeat")) : "backgroundImage" == e ? ($("#backgroundColorImage").attr("data-image", value), "" == value && (value = "/assets/images/blank_10.png"), $("#backgroundColorImage").css("background", "url('" + value + "') center/cover no-repeat")) : "touchPosition" == e ? s.ue(value) : "touchIcon" == e ? ($(".widget-area .icon-group .icon-btn").removeClass("selected"), $(".widget-area .icon-group .icon-btn[data-icon='" + value + "']").addClass("selected")) : "synonym" == e ? $("#synonymSelect").val(value) : "postLayout" == e && ($(".widget-area .article-area .item").removeClass("active"), $(".widget-area .article-area .item[data-layout='" + value + "']").addClass("active"))
    }, fe: function () {
        var t = this, data = t.he();
        null != data && ($.each(data.textfields, function (index, e) {
            t.apply(e.name, e.value)
        }), $.each(data.fonts, function (index, e) {
            t.apply(e.name, e.value)
        }), $.each(data.colors, function (index, e) {
            t.apply(e.name, e.value)
        }), $.each(data.is, function (index, e) {
            t.apply(e.name, e.value)
        }), $.each(data.sliders, function (index, e) {
            t.apply(e.name, e.value)
        }), t.apply("coverImage", data.image.cover), t.apply("backgroundImage", data.image.background), null != data.touch.icon && t.apply("touchIcon", data.touch.icon), null != data.touch.position && t.apply("touchPosition", data.touch.position), t.apply("synonym", data.synonym), null != data.post) && "" != data.post.layout && t.apply("postLayout", data.post.layout), $(".widget-area input.set-value").each(function (index, e) {
            t.update($(e).data("target"), $(e).val())
        }), $(".widget-area select.set-font").each(function (index, e) {
            t.update($(e).data("target"), $(e).val())
        }), $(".widget-area .color-circle").each(function (index, e) {
            t.update($(e).data("color-target"), $(e).next("input").val())
        }), $(".widget-area .form-check-input").each(function (index, e) {
            t.update($(e).data("target"), $(e).prop("checked"))
        }), $(".widget-area .set-slider").each(function (index, e) {
            t.update($(e).data("target"), $(e).val())
        }), t.update("coverImage", $("#coverImage").attr("data-image")), t.update("backgroundImage", $("#backgroundColorImage").attr("data-image")), t.update("touchIcon", $(".widget-area .icon-group .icon-btn.selected").data("icon")), t.update("touchPosition", $(".widget-area .position-panel .item.active").data("position")), t.update("synonym", $("#synonymSelect").val()), t.ge($(".widget-area .article-area .item.active").data("layout"))
    }, show: function (type, e) {
        this.J = !0, this.de = type, null != e && (this.pe = e), this.refresh()
    }, refresh: function () {
        $(".my-blog-page .preview-panel>.container-fluid>.blog-article-container").hide(), $("#preview_content .plugin-widget-container").removeClass("active"), "template" == this.de ? $("#preview_content .plugin-widget-container[data-template='" + this.pe + "']").addClass("active") : "article" == this.de && (5 == this.pe ? $("#preview_content .plugin-widget-container[data-template='" + this.pe + "']").addClass("active") : $(".my-blog-page .preview-panel>.container-fluid>.blog-article-container").show()), this.fe()
    }, Ce: function () {
        var data = {
            textfields: [],
            fonts: [],
            colors: [],
            is: [],
            sliders: [],
            image: {cover: "", background: ""},
            touch: {icon: "", position: ""},
            synonym: "",
            post: {layout: ""}
        };
        return $(".widget-area input.set-value").each(function (index, e) {
            data.textfields.push({name: $(e).data("target"), value: $(e).val()})
        }), $(".widget-area select.set-font").each(function (index, e) {
            data.fonts.push({name: $(e).data("target"), value: $(e).val()})
        }), $(".widget-area .color-circle").each(function (index, e) {
            data.colors.push({name: $(e).data("color-target"), value: $(e).next("input").val()})
        }), $(".widget-area .form-check-input").each(function (index, e) {
            data.is.push({name: $(e).data("target"), value: $(e).prop("checked")})
        }), $(".widget-area .set-slider").each(function (index, e) {
            data.sliders.push({name: $(e).data("target"), value: $(e).val()})
        }), data.image.cover = $("#coverImage").attr("data-image"), data.image.background = $("#backgroundColorImage").attr("data-image"), data.touch.icon = $(".widget-area .icon-group .icon-btn.selected").data("icon"), data.touch.position = $(".widget-area .position-panel .item.active").data("position"), data.synonym = $("#synonymSelect").val(), data.post.layout = $(".widget-area .article-area .item.active").data("layout"), data
    }, U: function (e) {
        e = null != e && e ? this.he() : this.Ce();
        console.log("Publishing..........", e), i.g("Publishing......"), createUpdateWidget("Template-" + this.pe, e, !0, !1, null, function (e) {
            i.u(), null != e && $("#publishSuccessModal").modal("show")
        })
    }
};
$(document).ready(function () {
    o.init(), a.init(), t.init(), e.init(), n.init(), l.init(), r.init(), c.init(), s.init(), g.init()
});