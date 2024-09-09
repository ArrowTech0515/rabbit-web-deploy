function initTour() {
  $("#onPage-tab").click();

  var introguide = introJs();
  introguide
      .setOptions({
        steps: [
          {
            title: "Welcome to SEOly - Boosting traffic!",
            intro:
                '<img src="/assets/images/seoly/Frame.svg" alt="seoly welcome" style="width: 100%" >' +
                "<br /><br />I'm your guide to SEOly app.<br/>Use the tutorial button or move through quickly using the dots & dashes",
          },
          // {
          //   element: document.querySelector(".upgrade-button"),
          //   intro: "You can upgrade your plan for better look",
          // },
          {
            title: "Dashboard",
            element: document.querySelector("#onPage-tab"),
            intro:
                "Use this to monitor your progress to higher rankings in Google.",
          },
          {
            title: "Site Overview",
            element: document.querySelector("#site-overview"),
            intro:
                "Prioristise fixing Severe first then ",
          },
          {
            title: "Landing Pages List",
            element: document.querySelector("#pagesUl"),
            intro: "Work through the pages on your list, focus on your home page first",
          },
          {
            title: "Adding More Landing Pages",
            element: document.querySelector("#pageUrl"),
            intro:
                "Landing page not there? Use this field to add, rescan and we will test it too.",
          },
          {
            title: "Rescan Your Website",
            element: document.querySelector(".btn.btn-primary.pageBtn.rescan"),
            intro:
                "Fixed issues or added pages, rescan to see improvements.",
          },
          {
            title: "Website Overall Score",
            element: document.querySelector(
                ".row.main-tabs.site-ov-main.scorRow"
            ),
            intro:
                "Aim to get to 100%. This is your current website optimization score.",
            title: "Top Severe Issues",
            element: document.querySelector("#topSevereIssues_onPageSEO"),
            intro:
                "List of the top severe issues that were found in your website.",
          },
          // {
          //   element: document.querySelector("#topWarnings_onPageSEO"),
          //   intro: "Top Warnings for OnPage SEO",
          // },
          {
            title: "Backlinks",
            element: document.querySelector("#offPage-tab"),
            intro: "Backlinks show the respect your site earns and are used in Google page ranking.",
          },
        ],
        tooltipClass: "idc-onPageSEO",
        exitOnOverlayClick: false,
      })
      .start();

  // Initialize the tour
}

$(document).ready(function () {
  $("#select2-searchEngineSelect-container").click(function () {
    // alert();
  });
  $(document).on("click", "body", function (e) {
    // console.log($("#keywordsDropdown").attr("aria-expanded"));
    // console.log(e.target);
    var targetElement = $(e.target);
    // alert(targetElement.is("span"));

    if ($("#keywordsDropdown").hasClass("show")) {
      $(".customeDropdown").show();
    } else if (!targetElement.is(".customeDropdown")) {
      if (!targetElement.is("span")) {
        if (targetElement.is("form#keywordForm > div")) {
          $(".customeDropdown").show();
        } else if (targetElement.is("form#keywordForm > div > h5")) {
          $(".customeDropdown").show();
        } else if (
            targetElement.is("form#keywordForm > div > label.formLable")
        ) {
          $(".customeDropdown").show();
          $(".customeDropdown").show();
        } else if (targetElement.is("form#keywordForm > div > button")) {
          $(".customeDropdown").show();
        } else if (targetElement.is("form#keywordForm")) {
          $(".customeDropdown").show();
        } else if (targetElement.is(".customeDropdown")) {
          $(".customeDropdown").show();
        } else if (targetElement.hasClass(".mb-3")) {
          $(".customeDropdown").show();
        } else if (targetElement.is("option")) {
          $(".customeDropdown").show();
        } else if (targetElement.is("select")) {
          $(".customeDropdown").show();
        } else if (targetElement.is("textarea")) {
          $(".customeDropdown").show();
        } else {
          $(".customeDropdown").hide();
        }
      } else {
        $(".customeDropdown").show();
      }
    } else {
      $(".customeDropdown").show();
    }
  });

  if (showTutorial) {
    var flag = false;
    $(document).on("click", ".introjs-button", function (e) {
      if (e.target.innerHTML == "Done") {
        e.target.innerHTML = "Next ";
      }
      console.log(flag);
      if (e.target.innerHTML != "Next ") return;
      else if (e.target.innerHTML == "Next " && flag == false) {
        flag = true;
        return;
      }

      var parentClass = $(this).parent().parent();

      if (parentClass.hasClass("idc-onPageSEO")) {
        introJs().exit();
        $("#offPage-tab").click();

        var offPageGuide = introJs();

        offPageGuide
            .setOptions({
              steps: [
                {
                  title: "Publish Your Website",
                  element: document.querySelector("#savePublishDetailsUser"),
                  intro: "Advice. Publish your website in directory listings for backlinks combined with those acquired here in SEOly.",
                },

                // {
                //   element: document.querySelector("#publishMyWebsite"),
                //   intro: "This is button for publishing website",
                // },
                {
                  title: "Create New Backlinks",
                  element: document.querySelector("#new-link-list"),
                  intro: "Order new backlinks every month for your website, vary keywords if you wish.",
                },
              ],
              tooltipClass: "idc-offPageSEO",
              exitOnOverlayClick: false,
            })
            .start();
      } else if (parentClass.hasClass("idc-offPageSEO")) {
        introJs().exit();

        $("#new-link-list")[0].click();

        var newsLinkList = introJs();

        newsLinkList
            .setOptions({
              steps: [
                {
                  title: "Links Order Details",
                  element: document.querySelector("#createRequestLink"),
                  intro: "Consider keyword, type, number of and landing page. Note may require an upgrade to your package.",
                },
                // {
                //   element: document.querySelector("#submitNewLinkBtn"),
                //   intro: "Click this button for submit new link",
                // },
                {
                  title: "My Links List",
                  element: document.querySelector("#my-links-list"),
                  intro: "In My Links tab you can see all the links you created with SEOly.(leave as is, perfect)",
                },
              ],
              tooltipClass: "idc-newsLinkList",
              exitOnOverlayClick: false,
            })
            .start();
      } else if (parentClass.hasClass("idc-newsLinkList")) {
        $("#my-links-list")[0].click();

        introJs()
            .setOptions({
              steps: [
                {
                  title: "Table shows links already published plus ordered / waiting to be published. ",
                  element: document.querySelector(
                      "#my-links-list h2.tab-custom-title"
                  ),
                  intro: "You can check your links table here",
                },
                // {
                //   element: document.querySelector("#backlinks-crawler-list"),
                //   intro: "Click this button for Site Statistics",
                // },
                {
                  title: "Promoting Keywords, Research and Monitoring",
                  element: document.querySelector("#ranks-tab"),
                  intro: "Advice. Keywords Research, compare & use keywords from your close competitors",
                },
              ],
              tooltipClass: "idc-myLinksList",
              exitOnOverlayClick: false,
            })
            .start();
        // } else if (parentClass.hasClass("idc-myLinksList")) {
        //   $("#backlinks-crawler-list")[0].click();
        //
        //   introJs()
        //     .setOptions({
        //       steps: [
        //         {
        //           element: document.querySelector("#backlinks_siteStatics"),
        //           intro: "Total Backlinks",
        //         },
        //         {
        //           element: document.querySelector("#referringpages_siteStatics"),
        //           intro: "Referring Pages",
        //         },
        //         {
        //           element: document.querySelector(
        //             "#referringDomains_siteStatics"
        //           ),
        //           intro: "Referring Domains on Site Statics",
        //         },
        //         {
        //           element: document.querySelector("#brokenBacklinks_siteStatics"),
        //           intro: "Broken Backlinks on Site Statics",
        //         },
        //         {
        //           element: document.querySelector("#brokenPages_siteStatics"),
        //           intro: "Broken Pages on Site Statics",
        //         },
        //         {
        //           element: document.querySelector("#siteRank_siteStatics"),
        //           intro: "Site Rank on Site Statics",
        //         },
        //         {
        //           element: document.querySelector(
        //             "#internalBacklinks_siteStatics"
        //           ),
        //           intro: "Internal Backlinks on Site Statics",
        //         },
        //         {
        //           element: document.querySelector(
        //             "#externalBacklinks_siteStatics"
        //           ),
        //           intro: "External Backlinks on Site Statics",
        //         },
        //         {
        //           element: document.querySelector("#linksList_wrapper"),
        //           intro: "Links for Site Statistics",
        //         },
        //         {
        //           element: document.querySelector("#ranks-tab"),
        //           intro: "Click this tab for keywords",
        //         },
        //       ],
        //
        //       tooltipClass: "idc-backlinksList",
        //       exitOnOverlayClick: false,
        //     })
        //     .start();
      } else if (parentClass.hasClass("idc-myLinksList")) {
        $("#ranks-tab")[0].click();

        introJs()
            .setOptions({
              steps: [
                {
                  title: "My Keywords List",
                  element: document.querySelector("#my-keywords-list"),
                  intro: "Track all your keywords, ranks and effectiveness. Results can take upto 40 seconds.",
                },
                // {
                //   element: document.querySelector("#xlsButton"),
                //   intro: "You can upload xls file here",
                // },
                // {
                //   element: document.querySelector("#keywordSearch"),
                //   intro: "Input keywords for search",
                // },
                {
                  title: "Add New Keywords",
                  element: document.querySelector("#keywordsDropdown"),
                  intro: "Add new keywords here",
                },
                {
                  title: "Keywords Usage",
                  element: document.querySelector(
                      ".keywords-credits"
                  ),
                  intro: "Check on your keyword usage against your allowance ",
                },
                // {
                //   element: document.querySelector("#keywordsTable"),
                //   intro: "Table for keywords",
                // },
                {
                  title: "Keywords Research",
                  element: document.querySelector("#suggested-keywords-list"),
                  intro: "Keywords , better understand your competitors and what Google thinks is good",
                },
              ],
              tooltipClass: "idc-ranksTab",
              exitOnOverlayClick: false,
            })
            .start();
        // } else if (parentClass.hasClass("idc-ranksTab")) {
        //   $("#ranked-keywords-list")[0].click();
        //
        //   introJs()
        //     .setOptions({
        //       steps: [
        //         {
        //           element: document.querySelector("#nav-ranks-tabContent"),
        //           intro: "You can see Ranked keywords here.",
        //         },
        //         {
        //           element: document.querySelector("#suggested-keywords-list"),
        //           intro: "Click here to see Hot Keywords",
        //         },
        //       ],
        //       tooltipClass: "idc-rankedKeywordsList",
        //       exitOnOverlayClick: false,
        //     })
        //     .start();
      } else if (parentClass.hasClass("idc-ranksTab")) {
        $("#suggested-keywords-list")[0].click();

        introJs()
            .setOptions({
              steps: [
                {
                  title: "Why do we need Keywords Research?",
                  element: document.querySelector("#suggested-keywords h2.tab-custom-title"),
                  intro: " Keyword research provides SEO maximisation. People use keywords to find what they want on the internet, so think about it carefully and use SEOly to help you do that.",
                },
              ],
              exitOnOverlayClick: false,
            })
            .start();
      }

      flag = false;
      return;
    });

    $(document).on("click", "li[role='presentation']>a", function () {
      var $introButtons = $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .children(".introjs-tooltipbuttons");
      var $nextButton = $introButtons.children().eq(1);

      if ($nextButton.html() == "Done") {
        $nextButton.html("Next ");
      }
      console.log(flag);
      if ($nextButton.html() != "Next ") return;
      else if ($nextButton.html() == "Next " && flag == false) {
        flag = true;
        return;
      }

      var parentClass = $nextButton.parent().parent();

      if (parentClass.hasClass("idc-onPageSEO")) {
        introJs().exit();
        $("#offPage-tab").click();

        var offPageGuide = introJs();

        offPageGuide
            .setOptions({
              steps: [
                {
                  element: document.querySelector("#offPage-tab"),
                  intro: "This is offpage  SEO",
                },
                {
                  element: document.querySelector("#savePublishDetailsUser"),
                  intro: "This is  for publishing website",
                },

                {
                  element: document.querySelector("#publishMyWebsite"),
                  intro: "This is button for publishing website",
                },
                {
                  element: document.querySelector("#new-link-list"),
                  intro: "Here you can add new link",
                },
              ],
              tooltipClass: "idc-offPageSEO",
              exitOnOverlayClick: false,
            })
            .start();
      } else if (parentClass.hasClass("idc-offPageSEO")) {
        introJs().exit();

        $("#new-link-list")[0].click();

        var newsLinkList = introJs();

        newsLinkList
            .setOptions({
              steps: [
                {
                  element: document.querySelector("#createRequestLink"),
                  intro: "Here you can input all fields for order new link",
                },
                {
                  element: document.querySelector("#submitNewLinkBtn"),
                  intro: "Click this button for submit new link",
                },
                {
                  element: document.querySelector("#my-links-list"),
                  intro: "Click this button for My Links Tab",
                },
              ],
              tooltipClass: "idc-newsLinkList",
              exitOnOverlayClick: false,
            })
            .start();
      } else if (parentClass.hasClass("idc-newsLinkList")) {
        $("#my-links-list")[0].click();

        introJs()
            .setOptions({
              steps: [
                {
                  element: document.querySelector(
                      "#monitoringLinkTableLive_wrapper"
                  ),
                  intro: "You can check your links table here",
                },
                {
                  element: document.querySelector("#backlinks-crawler-list"),
                  intro: "Click this button for Site Statistics",
                },
              ],
              tooltipClass: "idc-myLinksList",
              exitOnOverlayClick: false,
            })
            .start();
      } else if (parentClass.hasClass("idc-myLinksList")) {
        $("#backlinks-crawler-list")[0].click();

        introJs()
            .setOptions({
              steps: [
                {
                  element: document.querySelector("#backlinks_siteStatics"),
                  intro: "Total Backlinks",
                },
                {
                  element: document.querySelector("#referringpages_siteStatics"),
                  intro: "Referring Pages",
                },
                {
                  element: document.querySelector(
                      "#referringDomains_siteStatics"
                  ),
                  intro: "Referring Domains on Site Statics",
                },
                {
                  element: document.querySelector("#brokenBacklinks_siteStatics"),
                  intro: "Broken Backlinks on Site Statics",
                },
                {
                  element: document.querySelector("#brokenPages_siteStatics"),
                  intro: "Broken Pages on Site Statics",
                },
                {
                  element: document.querySelector("#siteRank_siteStatics"),
                  intro: "Site Rank on Site Statics",
                },
                {
                  element: document.querySelector(
                      "#internalBacklinks_siteStatics"
                  ),
                  intro: "Internal Backlinks on Site Statics",
                },
                {
                  element: document.querySelector(
                      "#externalBacklinks_siteStatics"
                  ),
                  intro: "External Backlinks on Site Statics",
                },
                {
                  element: document.querySelector("#linksList_wrapper"),
                  intro: "Links for Site Statistics",
                },
                {
                  element: document.querySelector("#ranks-tab"),
                  intro: "Click this tab for keywords",
                },
              ],

              tooltipClass: "idc-backlinksList",
              exitOnOverlayClick: false,
            })
            .start();
      } else if (parentClass.hasClass("idc-backlinksList")) {
        $("#ranks-tab")[0].click();

        introJs()
            .setOptions({
              steps: [
                {
                  element: document.querySelector("#my-keywords-list"),
                  intro: "You can check your keywords here",
                },
                {
                  element: document.querySelector("#xlsButton"),
                  intro: "You can upload xls file here",
                },
                {
                  element: document.querySelector("#keywordSearch"),
                  intro: "Input keywords for search",
                },
                {
                  element: document.querySelector("#keywordsDropdown"),
                  intro: "Click this button to add a keyword",
                },
                {
                  element: document.querySelector(
                      ".credits-avail.upgrade-button"
                  ),
                  intro: "Keywords Progress",
                },
                {
                  element: document.querySelector("#keywordsTable"),
                  intro: "Table for keywords",
                },
                {
                  element: document.querySelector("#ranked-keywords-list"),
                  intro: "Click here for Ranked Keywords",
                },
              ],
              tooltipClass: "idc-ranksTab",
              exitOnOverlayClick: false,
            })
            .start();
      } else if (parentClass.hasClass("idc-ranksTab")) {
        $("#ranked-keywords-list")[0].click();

        introJs()
            .setOptions({
              steps: [
                {
                  element: document.querySelector("#nav-ranks-tabContent"),
                  intro: "You can see Ranked keywords here.",
                },
                {
                  element: document.querySelector("#suggested-keywords-list"),
                  intro: "Click here to see Hot Keywords",
                },
              ],
              tooltipClass: "idc-rankedKeywordsList",
              exitOnOverlayClick: false,
            })
            .start();
      } else if (parentClass.hasClass("idc-rankedKeywordsList")) {
        $("#suggested-keywords-list")[0].click();

        introJs()
            .setOptions({
              steps: [
                {
                  element: document.querySelector("#keywordIdeasTable_wrapper"),
                  intro: "You can see Hot keywords here.",
                },
              ],
              exitOnOverlayClick: false,
            })
            .start();
      }

      flag = false;
      return;
    });

    $("#contactusLink").click(function () {});
  }
});
