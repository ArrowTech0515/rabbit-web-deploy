var linksList;

function findTooltipOfLinkSemanticLocation(key) {
    let tooltip = "";
    if (key === 'section') {
        tooltip = 'Link from a section in a document';
    }
    if (key === 'header') {
        tooltip = 'Link from header of a document or section"';
    }
    if (key === 'aside') {
        tooltip = 'Link from content aside from the page content';
    }
    if (key === 'article') {
        tooltip = 'Link from independent, self-contained content';
    }
    if (key === 'figure') {
        tooltip = 'Link from specifies self-contained content, like illustrations, diagrams, photos, code listings, etc';
    }
    if (key === 'section') {
        tooltip = 'Link from a section in a document';
    }
    if (key === 'main') {
        tooltip = 'Link from the main content of a document';
    }
    if (key === 'nav') {
        tooltip = 'Link from the navigation links';
    }
    if (key === 'footer') {
        tooltip = 'Link from the footer for a document or section';
    }
    return tooltip;
}

function getTooltipStr(tooltip) {
    return 'data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="' + tooltip + '"';
}

function createArticleTagsSelect() {
    if (tagsArray) {
        applySelectToTags();
    } else {
        $.get(assetsUrl + 'assets/data/tags.txt', function (data) {
            let tempTags = data.split('\n');
            tagsArray = [];
            for (let i = 0; i < tempTags.length; i++) {
                const tag = tempTags[i];
                if (tagsArray.indexOf(tag) === -1) {
                    tagsArray.push(tag.replace("\n", ""));
                }
                // console.log(JSON.stringify(tags));
            }
            applySelectToTags();
        });
    }
}
function applySelectToTags() {
    $("[id^=articleTags]").select2({
        tokenSeparators: [',', ', ', '\n'],
        // selectOnClose: true,
        closeOnSelect: false,
        data: tagsArray.sort(),
        maximumSelectionLength: 10,
        tags: true,
        placeholder: 'Choose Tags (max 10)',
    });
}
function loadLinksSummaryFromJson(json, drawChartsNow) {
    if (!hasAlertToShow(json)) {
        json = JSON.parse(json["data"]);
        if (json) {
            $('#targetRank').html(formatNumber(json.rank));
            $('#backlinks').html(formatNumber(json.backlinks));
            $('#internal_links_count').html(formatNumber(json.internal_links_count));
            $('#external_links_count').html(formatNumber(json.external_links_count));
            $('#broken_backlinks').html(formatNumber(json.broken_backlinks));
            $('#broken_pages').html(formatNumber(json.broken_pages));
            $('#referring_domains').html(formatNumber(json.referring_domains));
            $('#referring_main_domains').html(formatNumber(json.referring_main_domains));
            $('#referring_pages').html(formatNumber(json.referring_pages));

            if (drawChartsNow) {
                var x_linksTypes = [];
                var y_linksTypes = [];
                var totalLinksTypesVal = 0;
                var totalLinksTypesTBodyHtml = "";
                var x_linksSemantics = [];
                var y_linksSemantics = [];
                var totalLinksSemanticVal = 0;
                var totalLinksSemanticTBodyHtml = "";
                var x_linksAttributes = [];
                var y_linksAttributes = [];
                var totalLinksAttrVal = 0;
                var totalLinksAttrTBodyHtml = "";

                for (const key in json['referring_links_types']) {
                    x_linksTypes.push(key);
                    let val = json['referring_links_types'][key];
                    totalLinksTypesVal += val;
                    y_linksTypes.push(val);
                }
                for (const key in json['referring_links_types']) {
                    let val = json['referring_links_types'][key];
                    let percent = (val * 100) / totalLinksTypesVal;
                    totalLinksTypesTBodyHtml += "<tr><td>" + key + "</td><td><b>" + nFormatter(val, 2) + "</b></td><td><b>" + nFormatter(percent, 2) + "</b></td></tr>";
                }
                // console.log('totalLinksTypesTBodyHtml ' + totalLinksTypesTBodyHtml);
                $('#linkTypesTBody').html(totalLinksTypesTBodyHtml);

                // console.log('json[\'referring_links_semantic_locations\']' + JSON.stringify(json['referring_links_semantic_locations']));
                for (const key in json['referring_links_semantic_locations']) {
                    x_linksSemantics.push(key);
                    let val = json['referring_links_semantic_locations'][key];
                    totalLinksSemanticVal += val;
                    y_linksSemantics.push(val);
                }
                for (const key in json['referring_links_semantic_locations']) {
                    let val = json['referring_links_semantic_locations'][key];
                    let percent = (val * 100) / totalLinksSemanticVal;
                    let tooltip = findTooltipOfLinkSemanticLocation(key);
                    let tooltipStr = '';
                    if (tooltip && tooltip.length > 0) {
                        tooltipStr = getTooltipStr(tooltip);
                        // console.log(tooltipStr);
                    }

                    totalLinksSemanticTBodyHtml += "<tr><td " + tooltipStr + ">" + (!key || key == '' ? 'Other' : key) + "</td><td><b>" + nFormatter(val, 2) + "</b></td><td><b>" + nFormatter(percent, 2) + "</b></td></tr>";
                }
                $('#linkSemanticTBody').html(totalLinksSemanticTBodyHtml);

                for (const key in json['referring_links_attributes']) {
                    x_linksAttributes.push(key);
                    let val = json['referring_links_attributes'][key];
                    totalLinksAttrVal += val;
                    y_linksAttributes.push(val);
                }
                for (const key in json['referring_links_attributes']) {
                    let val = json['referring_links_attributes'][key];
                    let percent = (val * 100) / totalLinksAttrVal;
                    totalLinksAttrTBodyHtml += "<tr><td>" + key + "</td><td><b>" + nFormatter(val, 2) + "</b></td><td><b>" + nFormatter(percent, 2) + "</b></td></tr>";
                }
                $('#linkAttrTBody').html(totalLinksAttrTBodyHtml);
                var config = {
                    'displayModeBar': false,
                    'displaylogo': false,
                    'modeBarButtonsToRemove': ['zoom2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toggleSpikelines']
                }
                drawCharts(x_linksTypes, y_linksTypes, x_linksSemantics, y_linksSemantics, x_linksAttributes, y_linksAttributes)
            }
        } else {
            $('.spinner-border').hide();
            fadeModalWithTime('', 'Oops, no data was found', 5000, true);
        }
        enableTooltips();
    }
    return json;
}

let linksSummaryLoaded = false;

function loadLinksSummary(drawChartsNow) {
    const siteUrl = $('#inputSearchWebsite').val();
    const url = getApiUrl(links_url + '?api=WebsiteLinksSummary' + (siteUrl ? '&url=' + siteUrl : ''));
    // console.log('start loadLinksSummary url is ' + url);
    $.getJSON(url, function (json) {
        // console.log('loadLinksSummary ' + JSON.stringify(json));
        loadLinksSummaryFromJson(json, drawChartsNow);
    });
}

function drawCharts(x_linksTypes, y_linksTypes, x_linksSemantics, y_linksSemantics, x_linksAttributes, y_linksAttributes) {
    var linkTypesChart = document.getElementById("linkTypesChart");
    var linkSemanticChart = document.getElementById("linkSemanticChart");
    var linkAttrChart = document.getElementById("linkAttrChart");

    var pieChart1 = new Chart(linkTypesChart, {
        type: 'pie',
        data: {
            labels: x_linksTypes,
            datasets: [{
                label: 'Referring Links Types',
                data: y_linksTypes,
                backgroundColor: [
                    '#A9C1FD',
                    '#558EFF',
                    '#DEE6FF',
                    '#1F58E7',
                    '#193B90',
                    '#25282B',
                ],
                hoverOffset: 4,
                options: {
                    legend: {
                        display: false
                    },
                }
            }],
        },
    });

    var pieChart2 = new Chart(linkSemanticChart, {
        type: 'pie',
        data: {
            labels: x_linksSemantics,
            datasets: [{
                label: 'Referring Links Types',
                data: y_linksSemantics,
                backgroundColor: [
                    '#A9C1FD',
                    '#558EFF',
                    '#DEE6FF',
                    '#1F58E7',
                    '#193B90',
                    '#25282B',
                ],
                hoverOffset: 4,
                options: {
                    legend: {
                        display: false
                    },
                }
            }],
        },
    });

    var pieChart3 = new Chart(linkAttrChart, {
        type: 'pie',
        data: {
            labels: x_linksAttributes,
            datasets: [{
                label: 'Referring Links Types',
                data: y_linksAttributes,
                backgroundColor: [
                    '#A9C1FD',
                    '#558EFF',
                    '#DEE6FF',
                    '#1F58E7',
                    '#193B90',
                    '#25282B',
                ],
                hoverOffset: 4,
                options: {
                    legend: {
                        display: false
                    },
                }
            }],
        },
    });
}

function loadBacklinksListFromJson(json, websiteUrl) {
    console.log('loadBacklinksListFromJson ' + JSON.stringify(json));
    $('.spinner-border').hide();
    if (!hasAlertToShow(json)) {
        json = JSON.parse(json["data"]);
        if (json) {
            let mode = json["mode"];
            const selectedWebsite = $('#inputSearchWebsite').val();
            if (selectedWebsite && websiteUrl === selectedWebsite) {
                console.log('websiteUrl ' + websiteUrl + " - " + selectedWebsite);
                if (!websiteData) {
                    $.getJSON(getApiUrl('getMyJsonDataWebsite?url=' + selectedWebsite), function (json) {
                        websiteData = JSON.parse(json["data"]);
                        $('#totalBacklinks').html(nFormatter(websiteData["linksCount"], 2));
                    });
                } else {
                    $('#totalBacklinks').html(nFormatter(websiteData["linksCount"], 2));
                }
            } else {
                $('#totalBacklinksDiv').hide();
            }

            // $('#totalBacklinks').html(nFormatter(json["total_count"], 2));
            // console.log('json links is ' + JSON.stringify(json));
            json = json['items'];
            loadBacklinks(json);
            // console.log('json length is ' + json.length + ' mode is ' + mode);
            if (json && json.length < 500 && mode === 'one_per_domain') {
                $('#fewLinksAlert').show();
            } else {
                $('#fewLinksAlert').hide();
            }
        }
    } else {
        if (isFreeUser()) {
            showUpgradeModal(genericUpgradeMsg);
        }

        $('#linksList tbody').html('No data found');
    }
    return json;
}

function loadBacklinksList(websiteUrl) {
    const url = getApiUrl(links_url + '?api=WebsiteLinks&url=' + (payingUser ? websiteUrl : 'amazon.com'));
    // console.log('$(\'#inputSearchWebsite\').val() ' + $('#inputSearchWebsite').val());

    if (isDev()) {
        loadBacklinksListFromJson(JSON.parse(crawlerList), 'sample.com');
    } else {
        $.getJSON(url, function (json) {
            // console.log('loadBacklinksList ' + JSON.stringify(json));
            loadBacklinksListFromJson(json, websiteUrl);
        });
    }
}

function loadMonitoredLinksFromJson(json) {
    if (!hasAlertToShow(json)) {
        var listLength = json['list'].length;
        // console.log('listLength is ' + listLength);
        const tableId = activeTab && activeTab === 'articles' ? 'articlesTable' : 'monitoringLinkTable';
        // alert(tableId);
        console.log('loadMonitoredLinksFromJson tableId ' + tableId)
        var linksList = $('#' + tableId).DataTable({
            "datatype": "json",
            "data": json['list'],
            rowId: 'id',
            "columns": linksColumns(),
            // "order": [[1, "asc"]],
            destroy: true,
            buttons: ['copy', 'excel', 'print', {
                extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
            }],
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
            fixedHeader: listLength > 100,
            deferRender: true,
            paging: false,
            "bFilter": true,
            "aoColumnDefs": [{
                "searchable": false,
                "targets": [0]
            }],
            responsive: true,
            // responsive: {
            //     details: {
            //         type: 'inline'
            //     }
            // },
            // columnDefs: [ {
            //     className: 'dtr-control',
            //     orderable: false,
            //     targets:   0
            // } ],
            // order: [ 1, 'asc' ],
            // columnDefs: [
            //     { orderable: false, targets: 0 }
            // ],
            //order: [[0, 'desc']],
            "ordering": true,
            "initComplete": function (settings, json) {
                let linksList = $('#' + tableId).DataTable();
                let myLiveBacklinks = 0, myPendingBacklinks = 0, myBlogPosts = 0;
                linksList.rows().every(function (rowIdx, tableLoop, rowLoop) {
                    var row = this.data();
                    if (row.enabled) {
                        if (isLinkTypeArticle(row.orderLinkType)) {
                            myBlogPosts++;
                        } else {
                            myLiveBacklinks++;
                        }
                    } else {
                        myPendingBacklinks++;
                    }
                });
                $('#myBacklinks').html(linksList.rows().count());
                $('#myLiveBacklinks').html(myLiveBacklinks);
                $('#myPendingBacklinks').html(myPendingBacklinks);
                $('#myBlogPosts').html(myBlogPosts);

                initShowHideColumns(tableId, linksList);
                adjustExportButtons('tableSearch', linksList);
            }
        });
        if (isRabbitUI) {
            linksList.on('order.dt search.dt', function () {
                linksList.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
        //  linksList.responsive.rebuild();
        //  linksList.responsive.recalc();
        // // linksList.recalc();
        //  //linksList.responsive.recale();
        //  window.resizeTo(window.screen.availWidth-100,window.screen.availHeight);

    } else {
        $('#link tbody').html("Create your first link now");
    }
}

function linksColumns() {
    return [
         {
            "data": "",
            "name": "id",
            "title": "",
            "defaultContent": "",
            'visible': isRabbitUI,
        },
        {
            "data": "pageUrl",
            "name": "pageUrl",
            "title": isEasySeoUser() ? "Article Link" : "Page Url",
            "defaultContent": "",
            'visible': true,
            render: function (data, type, row) {
                return data === 'Awaiting' ? data : getFormattedUrl(data);
            }
        },
        {
            "data": "pageTitle",
            "name": "pageTitle",
            "title": "Title",
            "defaultContent": "",
            'visible': isRabbitUI || activeTab && activeTab === 'articles',
            render: function (data, type, row) {
                return isRabbitUI && !isLinkTypeArticle(row['orderLinkType']) ? ('Listing - ' + mainUserDetails['wixUrl']) : data;
            }
        },
        {
            "data": "href",
            "name": "href",
            "title": isEasySeoUser() ? "Page" : "Href",
            "defaultContent": "",
            'visible': !isSeoRushUser(),
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
            'visible': isRabbitUI && isEnableBlogPost(),
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    return isLinkTypeArticle(data) ? 'Exclusive Guest Blog' : data;
                }
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
                    return "<p id='linkOn" + row.id + "'" + (!data || data !== true ? ' style="display: none"' : '') + " class=\"on-btn\">ON</p>" +
                        "<p id='linkOff" + row.id + "'" + (data && data === true ? ' style="display: none"' : '') + " class=\"off-btn\">OFF</p>";
                }
            }
        },
        {
            "data": "dateCreated",
            "name": "dateCreated",
            "title": isEasySeoUser() ? "Publish Date" : "Created On",
            "defaultContent": "",
            'visible': true,
            render: function (data, type, row) {
                return getFormattedDate(data);
            }
        },
        {
            "data": "lastChecked",
            "name": "lastChecked",
            "title": "Last Seen",
            "defaultContent": "",
            'visible': false,
            render: function (data, type, row) {
                return getFormattedDate(data);
            }
        },
        {
            "data": "contactPerson",
            "name": "contactPerson",
            "title": "Contact Person",
            "defaultContent": "",
            'visible': false,
            'hideCol': isExternalUser(),
        },
        {
            "data": "contactEmail",
            "name": "contactEmail",
            "title": "Email",
            "defaultContent": "",
            'visible': false,
            'hideCol': isExternalUser(),
        },
        {
            "data": "contactPhone",
            "name": "contactPhone",
            "title": "Phone",
            "defaultContent": "",
            'visible': false,
            'hideCol': isExternalUser(),
        },
        {
            "data": "monthlyCost",
            "name": "monthlyCost",
            "title": "Cost",
            "defaultContent": "",
            'visible': false,
            'hideCol': isExternalUser(),
        },
        {
            "data": "exchangeHref",
            "name": "exchangeHref",
            "title": "Href",
            "defaultContent": "",
            'visible': false,
            'hideCol': isExternalUser(),
        },
        {
            "data": "subject",
            "name": "subject",
            "title": "Subject",
            "defaultContent": "",
            'visible': false,
            'hideCol': isExternalUser(),
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
            "title": "Modify",
            'visible': isEasySeoUser(),
            // 'visible': isEasySeoUI && isLocalhost(),
            render: function (data, type, row) {
                return !isLinkTypeArticle(row.orderLinkType) ? '' : '<a class="no-click" onclick="modifyArticle(' + row.id + ')"><img src="/assets/images/icon/edit.png" style="height: 20px; cursor: pointer" alt="Edit"></a>';
            }
        },
        {
            data: "id", "name": "id",
            "title": "Modify",
            'visible': isSeoRushUser(),
            render: function (data, type, row) {
                return '<a class="no-click" onclick="editMyBlogArticle(' + row.id + ')"><img src="/assets/images/icon/edit.png" style="height: 20px; cursor: pointer" alt="Edit"></a>';
            }
        },
        {
            data: "id", "name": "id",
            "title": isRabbitUI ? "Edit / Share" : "Delete",
            'visible': true,
            className: "showSocialDotmain",
            // 'visible': !isWebsiteOwner || (activeTab && activeTab === 'articles'),
            render: function (data, type, row) {
                let html = '<div class="d-flex ">';
                const ownListing = row.ownListing;
                html += '<a id="deleteLink' + row.id + '"' + (!row.enabled ? ' style="display: none"' : '') + ' class="no-click" onclick="deleteLink(' + row.id + ',' + ownListing + ')"><img src="/assets/images/icon/remove.png" style="cursor: pointer" alt="Remove"></a>';
                if (ownListing) {
                    html += '<a id="activateLink' + row.id + '"' + (row.enabled ? ' style="display: none"' : '') + ' class="no-click" onclick="editLink(' + row.id + ')"><img src="/assets/images/icon/active.png" height="20" style="cursor: pointer" alt="Remove"></a>';
                }
                // if (isRabbitUI && isEnableModifyBlogPost() && isLinkTypeArticle(row.orderLinkType)) {
                if (isRabbitUI) {
                    if (isLinkTypeArticle(row.orderLinkType)) {
                        if (isEnableModifyBlogPost()) {
                            html += '&nbsp;&nbsp;&nbsp;<a class="no-click" onclick="modifyArticle(' + row.id + ')"><img src="/assets/images/icon/update.png" style="height: 24px; cursor: pointer" alt="Edit"></a>';
                        }
                    } else {
                        html += '&nbsp;&nbsp;&nbsp;<a class="no-click" onclick="openUpdateListingDetailsModal(\'' + row.pageUrl + '\')"><img src="/assets/images/icon/update.png" style="height: 24px; cursor: pointer" alt="Edit"></a>';
                        // html += '&nbsp;&nbsp;&nbsp;<a class="no-click" onclick="$(\'#rabbitOnboarding\').html(\'\'); openModal(\'/assets/htmls/publishLink.html\', \'My Website Details\');"><img src="/assets/images/icon/update.png" style="height: 24px; cursor: pointer" alt="Edit"></a>';
                    }
                }
                if (isRabbitUI && isLinkTypeArticle(row.orderLinkType)) {
                    html += "&nbsp;&nbsp;&nbsp;<div class='showSocialDotmain dropdown'><a class='showSocialDot' href='javascript:;' data-bs-toggle='dropdown' " +
                        "aria-expanded='false'><img src='/assets/images/social_share.png' height='20' /> </a>" +
                        "<div class='dropdown-menu showSocial'>" +
                        "<div><span>Share your Guest Blog</span><a href='javascript:;' data-bs-toggle='modal' data-bs-target='#facebookquestion'>  <img src='/assets/images/home_icon/material-symbols_help.png' height='16'/></a></div>" +
                        "<a href='https://www.facebook.com/sharer/sharer.php?u="+ row.pageUrl +"'  target='_blank'><img src='/assets/images/home_icon/facebook.png' alt='facebook' height='20'/></a> " +
                        "<a href='https://www.twitter.com/share?url="+ row.pageUrl +"'  target='_blank'><img src='/assets/images/home_icon/twitter.png' alt='twitter' height='20'/></a> " +
                        "<a href='https://www.linkedin.com/shareArticle?mini=true&url="+ row.pageUrl +"'  target='_blank'><img src='/assets/images/home_icon/linkedin.png' alt='linkedin' height='20'/></a> " +
                        "<a href='https://pinterest.com/pin/create/button?url="+ row.pageUrl +"'  target='_blank'><img src='/assets/images/home_icon/pinterest.png' alt='pinterest' height='20'/></a></div></div>"
                }
                html += '</div>'
                return html;
            }
        }
    ];
}

function loadLinksScroller(linksUrl) {
    const tableId = activeTab && activeTab === 'articles' ? 'articlesTable' : 'monitoringLinkTable';
    console.log('loadMonitoredLinksFromJson tableId ' + tableId)
    var linksList = $('#' + tableId).DataTable({
        "scrollCollapse": true,
        "serverSide": true,
        "ordering": true,
        "searching": true,
        "ajax": function (data, callback, settings) {
            setTimeout(function () {
                let query = getSearchAndOrder(data, 'keywordName');
                let url = getPostParams(linksUrl + '&start=' + data.start + '&rows=' + data.length + query);
                console.log('url is ' + url)
                $.getJSON(url, function (json) {
                    console.log('json is ' + JSON.stringify(json))
                    $('#myBacklinks').html(json['records']);
                    $('#myLiveBacklinks').html(json['records'] - mainUserDetails['articlesUsed']);
                    $('#myBlogPosts').html(mainUserDetails['articlesUsed']);
                    let myPendingBacklinks = 0;
                    for (var i = 0; i < json['list'].length; i++) {
                        var row = json['list'][i];
                        if (!row['enabled']) {
                            myPendingBacklinks++;
                        }
                    }
                    $('#myPendingBacklinks').html(myPendingBacklinks);

                    callback({
                        "draw": data.draw,
                        "data": json['list'],
                        "recordsTotal": json['records'],
                        "recordsFiltered": json['recordsFiltered']
                    });
                });
            }, 50);
        },
        "scroller": {
            "loadingIndicator": true,
            "trace": true
        },
        "dom": "rtiS",
        "scrollY": "500px",
        rowId: 'id',
        "columns": linksColumns(),
        destroy: true,
        buttons: ['copy', 'excel', 'print', {
            extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
        }],
        "bFilter": true,
        autoWidth: true,
        fixedHeader: false,
        deferRender: true,
        // responsive: true,
        "initComplete": function (settings, json) {
            adjustExportButtons('tableSearch', linksList);
            initShowHideColumns(tableId, linksList);
        }
    });

    if (isRabbitUI) {
        linksList.on('order.dt search.dt', function () {
            linksList.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
    }
}

function isEnableModifyBlogPost() {
    // console.log('isEnableModifyBlogPost: isEnableBlogPost() ' + isEnableBlogPost())
    return isEasySeoUI || (isRabbitUI && isEnableBlogPost());
}

function loadMonitoredLinks() {
    console.log('start loadMonitoredLinks')
    let jsonApi = activeTab && activeTab === 'articles' ? 'jsonByOnlyBlogsLink' : 'jsonLink';
    console.log('loadMonitoredLinks jsonApi' + jsonApi)
    const linksUrl = getApiUrl(jsonApi + '?url=' + $('#inputSearchWebsite').val());
    if (mainUserDetails['linksUsed'] > enableServerSideTable) {
        // if (isLocalhost() || keywordsUsed > 200) {
        //     $('div#keywordsFirstRow div.col').hide();
        loadLinksScroller(linksUrl);
    } else {
        $.getJSON(linksUrl, function (json) {
            // console.log('jsonLink is ' + JSON.stringify(json));
            loadMonitoredLinksFromJson(json);
        });
    }
}

function initLinksBuilding() {
    refreshLinksUsageInForm();
    loadAddLinksForm();
    // $('#overviewOf').html(' <span>My Links</span>');

    if (isWebsiteOwner) {
        $('#columnsChooser').hide();
        $('#linksBuilderButton').show();
        // $('#editPublishDetailsButton').show();
        // $('#linksAddButton').hide();
        $('#pageTitle').hide();
        $('#pageTour').hide();
        if (!payingUser) {
            $('.upgradeBlock').show();
            $('.upgradeBlock').attr("onclick", upgradeLink);
        }
        console.log('hide pageTitle')
    } else {
        // $('.dashfirstRow').hide();
        $('#managedLinksService').hide();
        $('#managedServiceCol').hide();
        $('#pendingBacklinksCol').hide();
        // $('#editPublishDetailsButton').hide();
        $('#linksBuilderButton').hide();
        $('#linksAddButton').show();
        $('#linkColumnsChooser').show();
    }
    if (mainUserDetails['enableAutoPilot']) {
        $('#autoPilot').prop('checked', mainUserDetails['autoPilot'] ? 'on' : '');
    } else {
        $('#autoPilot').hide();
    }
    // $('#overviewOf').html($('#inputSearchWebsite').val() + ' <span>Links Monitoring</span>');
    $(".account_dropdown").click(function (e) {
        e.stopPropagation();
    });
    loadMonitoredLinks();
}

function loadAddLinksForm() {
    if (mainUserDetails["email"] && mainUserDetails["email"].length > 0) {
        $('.userEmail').html('at ' + mainUserDetails["email"]);
    }
    $('#autoPilot').prop('checked', mainUserDetails['autoPilot'] ? 'on' : '');
    $('#usedLinksBuild').html(linksRequestUsed);
    $('#maxLinksBuild').html(linksRequestMax + (linksRequestMax > 1 ? ' links' : ' link'));
    createKeywordSelect();
    createLandingPagesSelect();
}

function submitBlogPostRequestForm() {
    if (!isRabbitUI || linksLeft >= 4) {
        ajaxSubmitFormNoWait('createBlogRequestLink');
        refreshUsage();
        $('#blogPostBuildingSuccess').show();
    } else {
        showModal('Oops...', 'There are not enough links in your package to publish a guest blog', 'OK', '');
    }
}

function submitLinkRequestForm() {
    const result = ajaxSubmitForm('createRequestLink');
    console.log('result submitLinkRequestForm' + result);
    if (!result) {
        historyPushState('order-listing-success', 'Publish Listing Success');
        // $('#linksBuildingForm').hide();
        $('#linksBuildingError').hide();
        if (isRabbitUI) {
            fadeModalWithTime('', 'Great, New business listing was created.<br />You can access or modify the link in the links table.', 5000, true);
        } else {
            $('#linksBuildingSuccess').show();
        }

        refreshUsage();
        loadMonitoredLinks();
    } else if (result.indexOf('0 links left') !== -1){
        if (!isShabbat) {
            const msgText = "You don't have enough credits to publish a new listing. Would you like to upgrade?";
            showUpgradeModal(msgText);
        } else {
            const msgText = "You don't have enough credits to publish a new listing.";
            fadeModalWithTime(msgText, 5000);
        }
    } else {
        $('#linksBuildingSuccess').hide();
        $('#linksBuildingError').show();
        $('#linksBuildingError div.alert-danger p').html(result);
        // showModal("Message", result, "Close", "");
    }
}

function submitLinkRequestFormNoWait() {
    const result = ajaxSubmitFormNoWait('createRequestLink');
    console.log('result submitLinkRequestFormNoWait' + result);
    if (!result) {
        // $('#linksBuildingForm').hide();
        $('#linksBuildingError').hide();
        if (isRabbitUI) {
            fadeModalWithTime('', 'Great, New business listing was created.<br />You can access or modify the link in the links table.', 5000, true);
        } else {
            $('#linksBuildingSuccess').show();
        }

        refreshUsage();
        loadMonitoredLinks();
    } else {
        $('#linksBuildingSuccess').hide();
        $('#linksBuildingError').show();
        $('#linksBuildingError div.alert-danger p').html(result);
        // showModal("Message", result, "Close", "");
    }
}

function addLink() {
    const json = getFormDValues(addLinkForm);
    $.ajax({
        type: 'POST',
        url: apiUrl + 'saveLink',
        dataType: 'json',
        data: json,
        success: function (result) {
            showModal("Add Links", result.status, "Close", "");
            loadMonitoredLinks();
            // console.log('success ' + JSON.stringify(result));
        },
        complete: function (result) {
            // console.log('complete ' + JSON.stringify(result));
        }
    });
}

function doLinkDelete(id, ownListing, $row) {
    $.ajax({
        type: 'POST',
        url: apiUrl + 'editLink',
        data: getPostParams('oper=del&id=' + id),
        success: function (result) {
            console.log('doLinkDelete ' + JSON.stringify(result));

            if (!ownListing) {
                $row.remove();
                if (isRabbitUI) {
                    fadeModalWithTime('', 'Link was deleted, your credit has been re-applied to your account.', 3000, true);
                } else {
                    fadeModal("Link Deleted", "");
                }
                refreshUserDetails();
                if (isRabbitUI) {
                    addLinksDetails();
                }
            } else {
                $('#deleteLink' + id).toggle();
                $('#activateLink' + id).toggle();
                $('#linkOn' + id).toggle();
                $('#linkOff' + id).toggle();
            }
            $('#modalMessage').modal('hide');
        }
    });
}

function deleteLink(id, ownListing) {
    var $target = $(event.target);
    var $row = $target.closest('tr');
    let text = 'Are you sure you want to delete the link?';
    if (isEasySeoUser()) {
        text = 'Are you sure you want to delete this article? The article will be unpublished.';
    }
    if (isConfirmDelete()) {
        showModal('Confirm', text, 'No', 'Yes');
        $('div#modalMessage button#modalSecondButton').click(function () {
            confirmDelete = false;
            doLinkDelete(id, ownListing, $row);
        });
    } else {
        doLinkDelete(id, ownListing, $row);
    }
}
function editLink(id) {
    $.ajax({
        type: 'POST',
        url: apiUrl + 'editLink',
        data: getPostParams('oper=del&id=' + id),
        success: function (result) {
            loadBacklinksList(mainUserDetails["wixUrl"]);
            fadeModal('Listing Status - Active', 'Your link is Active now!');
            $('#deleteLink' + id).toggle();
            $('#activateLink' + id).toggle();
            $('#linkOn' + id).toggle();
            $('#linkOff' + id).toggle();
        }
    });
}

function toggleAutoPilot() {
    if (payingUser) {
        let autoPilot = $('#autoPilot').prop('checked');
        console.log('toggleAutoPilot autoPilot ' + autoPilot)
        const url = getApiUrl('toggleAutoPilotUser?autoPilot=' + autoPilot);
        console.log('toggleAutoPilot url ' + url);
        $.get(url, function (data) {
            console.log('toggleAutoPilot ' + data);
            refreshUserDetails();
        });
    } else {
        showUpgradeModal('Upgrade your account to enable Managed Service Links Building');
    }
}

function toggleAddUserDetails(obj) {
    let toggleEmbedDetails = $(obj).prop('checked');
    console.log('toggleAddUserDetails toggleEmbedDetails ' + toggleEmbedDetails)
    const url = getApiUrl('toggleEmbedDetailsUser?toggleEmbedDetails=' + toggleEmbedDetails);
    console.log('toggleAddUserDetails url ' + url);
    $.get(url, function (data) {
        console.log('toggleAddUserDetails ' + data);
        refreshUserDetails();
    });
}

function getLinksHtmlTable(links) {
    let html = '';
    // let html = '<span class="btn btn-link float-right pop-close">x</span>';
    // console.log('loadPageLinks url is ' + url + ' result ' + JSON.stringify(links));

    html += '<div class="extraLinkTable">';
    html += '<div class="extraLinkTableHead"><strong>No</strong><strong>Link URL</strong><strong>Link Keyword</strong></div>';
    for (let i = 0; i < links.length; i++) {
        // console.log('links[i][\'keyword\'] ' + links[i]['keyword'])
        html += '<div class="extraLinkTableBody">' + '<div>' + (i + 1) + '</div><div>' +
            getFormattedExternalUrl(links[i]['href']) +
            '</div> <div> ' + (links[i]['keyword'] && links[i]['keyword'].length > 0 ? links[i]['keyword'] : '[Image]') + '</div></div>';
    }

    html += '</div>';
    return html;
}

function loadPageLinks(selector, linksType, url) {
    $.getJSON(getApiUrl('getMyJsonPageLinksLandingPage?url=' + url), function (json) {
        const links = json['map'][linksType];
        let html = getLinksHtmlTable(links);
        createAndShowPopover(selector, html);
    });
}