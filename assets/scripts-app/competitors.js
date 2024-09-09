var compsTable;
function toggleCompsView(viewType) {
    if (!viewType || viewType === 'comfortView') {
        showCompsList(compsJson);
    } else if (viewType === 'rankingsView') {
        showCompsTable(compsJson);
    } else if (viewType === 'tableView') {
        showCompsListTableView(compsJson);
    }
    // if ($('#compsView').prop('checked')) {
    //     console.log('goto showCompsTable')
    //     showCompsTable(compsJson);
    // } else {
    //     console.log('goto showCompsList')
    //     showCompsList(compsJson);
    // }
}

function getCompHtml(compUrl, compTitle, compDesc, currComp, currCompMain, compAvgRank) {
   let hidemyClass =  (compDesc == 'null' ? "d-none" : "");
   // console.log('minifyDomainUrl(compUrl) ' + minifyDomainUrl(compUrl) + ', minifyDomainUrl(websiteData[\'websiteName\']) ' + minifyDomainUrl(websiteData['websiteName']));
   let sameDomainClass = minifyDomainUrl(currCompMain) === minifyDomainUrl(websiteData['websiteName']) ? 'highlighted-card' : '';

    return '<div class="card ' + sameDomainClass + '">\n' +
        '  <div class="card-body">\n' + 
        '    <div class="competitor-grid"><div class="competitor-detail-div"><div class="competitorList">' +
        '<div class="competitorListTitle">Domain name</div><div class="competitorListDes">' +
        '<h5 class="card-title">' + getFormattedExternalUrl(currCompMain) + '</h5>\n'+'</div></div>'+
        '<div class="competitorList"><div class="competitorListTitle">Landing Page</div><div class="competitorListDes">' +
        '<h5 class="card-title">' + getFormattedUrl(compUrl) + '</h5>\n'+'</div></div>'+'<div class="competitorList">' +
        '<div class="competitorListTitle">Page title</div>' +
        '<div class="competitorListDes"><h6 class="card-subtitle mb-2 text-muted">' + compTitle + '</h6>\n' +'</div></div>'+
        ' <div class="competitorList"><div class="competitorListTitle">Page Description</div><div class="competitorListDes"> ' +
        '<p class="card-text text-muted dd ' + hidemyClass + '">' + compDesc + '</p></div></div></div><div class="competitor-rank">\n' +
        (compAvgRank && compAvgRank > 0 ? '    <p class="card-text text-muted">' + compAvgRank + '</p><p>Average Rank</p></div></div>\n' : '' ) +
        '</div><div class="competitorList mb-0"><div class="competitorListTitle"> </div><div class="competitorListDes">'+
        '    <div class="bottom_link">' +
        '    <a href="javascript:showOnPageCompareModal(\'' + compUrl + '\')" class="card-link btn btn-primary pageBtn addwebsitebtn mw-125px onPageCompareTooltip"> <img class="me-1" src="/assets/images/newicon/iconOnpage.png" height="16" width="16"/> <span>On Page Compare</span> </a>' +
        '    <a href="javascript:showOnPageOverviewModal(\'' + currComp + '\')" class="card-link btn btn-primary pageBtn addwebsitebtn mw-125px onPageOverviewTooltip"> <img class="me-1" src="/assets/images/newicon/iconPageReview.png" height="16" width="15"/> <span>On Page Overview</span> </a>' +
        '   <a href="javascript:showCompResearch(\'ranksExplorer\', \'' + currComp + '\', \' Keyword Research\')" class="card-link btn btn-primary pageBtn ranksExplorerTooltip addwebsitebtn mw-125px"><img class="me-1" src="/assets/images/newicon/iconKeywork.png" height="15" width="14"/> <span>Ranked Keywords</span></a>\n' +
        '    <a href="javascript:showCompResearch(\'linksAll\', \'' + currComp + '\', \'\')" class="linksExplorerTooltip card-link btn btn-primary pageBtn addwebsitebtn mw-125px"><img class="me-1" src="/assets/images/newicon/iconBlockLink.png" height="14" width="15"/> <span>Competitor Backlinks</span> </a>' +
        '</div>\n' +
        ' </div></div> </div>\n' +
        '</div><br/>';
}

function showOnPageCompareModal(domain, href) {
    console.log('showOnPageCompareModal domain ' + domain + ' href ' + href)
    competitorDomain = domain;
    if (href && href.length > 2) {
        myLandingPageHref = 'https://' + href;
    } else {
        myLandingPageHref = '';
    }
    console.log('showOnPageCompareModal competitorDomain ' + competitorDomain + ' myLandingPageHref ' + myLandingPageHref)
    if (!competitorDomain && compsList.length > 0) {
        console.log('showOnPageCompareModal in if competitorDomain ' + competitorDomain + ' myLandingPageHref ' + myLandingPageHref)
        competitorDomain = compsList[0];
    }
    openModal('/assets/htmls/onPageCompare.html', 'On Page Comparison <img class="compareIntro" src="/assets/images/home_icon/material-symbols_help.png" style="height: 18px">');
    $('#appDataModal .modal-dialog').addClass('max-80');
}
function showOnPageOverviewModal(domain) {
    competitorDomain = domain;
    openModal('/assets/htmls/onPageOverview.html', 'Competitor Top Landing Pages Overview <img class="onpageIntro" src="/assets/images/home_icon/material-symbols_help.png" style="height: 18px">');
}
function showCompsListTableView(json) {
    console.log('showCompsListTableView ' + JSON.stringify(json))
    $('#compsTableListSection').show();
    $('#compsList').hide();
    $('#compsList').html('');
    $('#compsTable').hide();
    $('#exportOptions').hide();

    if (!hasAlertToShow(json)) {
        let comps = json.list;
        if (comps && comps.length > 0) {
            if (keywordsUsed < 5) {
                $('#fewKeywordsAlert').show();
            }
            let tableHtml = '';
            for (let i = 0; i < comps.length; i++) {
                let currComp = comps[i][0];
                const compUrl = comps[i][7];
                const compAvgRank = comps[i][6] ? formatNumber(comps[i][6]) : '';
                const compTitle = comps[i][8] ? comps[i][8] : '';
                const compDesc = comps[i][9] ? comps[i][9] : '';

                tableHtml += '<tr>' +
                    '<td style="display: none" class="dt-control" rowId=' + i + '>' + (i + 1) + '</td>' +
                    '<td>' + getFormattedUrl(currComp) + '</td>' +
                    '<td>' + getFormattedUrl(compUrl) + '</td>' +
                    '<td class="m-lines">' + compTitle + '</td>' +
                    '<td class="m-lines">' + compDesc + '</td>' +
                    // '<td data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="' + compTitle + '">' + compTitle + '</td>' +
                    // '<td data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="' + compDesc + '">' + compDesc + '</td>' +
                    '<td>' + compAvgRank + '</td>' +
                    '<td><a href="javascript:showOnPageOverviewModal(\'' + currComp + '\', \'\')" class="onPageOverviewTooltip btn btn-outline-primary pageBtn-competitor iconPageReviewLarge" > <img src="/assets/images/newicon/iconPageReviewLarge.png"/></a> ' +
                    '<a href="javascript:showOnPageCompareModal(\'' + currComp + '\', \'\')" class="onPageCompareTooltip btn btn-outline-primary pageBtn-competitor testing-mode iconOnpageLarge" > <img  src="/assets/images/newicon/iconOnpageLarge.png"/></a> ' +
                    '<a href="javascript:showCompResearch(\'ranksExplorer\', \'' + currComp + '\', \' Keyword Research\')" class="ranksExplorerTooltip btn btn-outline-primary pageBtn-competitor excludeIntroJs iconKeyworkLarge"><img src="/assets/images/newicon/iconKeyworkLarge.png" ></a> ' +
                    '<a href="javascript:showCompResearch(\'linksAll\', \'' + currComp + '\', \'\')" class="linksExplorerTooltip btn btn-outline-primary pageBtn-competitor excludeIntroJs iconBlockLinkLarge"><img src="/assets/images/newicon/iconBlockLinkLarge.png" ></a></td>' +
                    // '<td><a data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="Keywords Gap Research - This research will show you the keywords gap between your competitor website and your website, which keywords your competitor is ranked for and your website not, you can find very useful information and new keywords that you can also easily promote here" class="btn btn-outline-primary pageBtn smallPageBtn" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="This research will show you the keywords gap between your competitor website and your website, which keywords your competitor is ranked for and your website not, you can find very useful information and new keywords that you can also easily promote here" href="javascript:showCompResearch(\'ranksGap\', \'' + currComp + '\')" ><i class="fa-solid fa-code-compare"></i></a></td>' +
                    '</tr>';
            }
            console.log('getMyJsonTopCompsWebsite tableHtml' + tableHtml);
            $('#compsListTable tbody').html('');
            $('#compsListTable').DataTable().destroy();
            $('#compsListTable tbody').html(tableHtml);
            let compsListTable = $('#compsListTable').DataTable({
                buttons: ['copy', 'excel', 'print', {
                    extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
                }],
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }],
                "dom": '<"dt-buttons"Bf><"clear">firtlp',
                destroy: true,
                info: false,
                paging: false,
                "bFilter": true,
                fixedHeader: true,
            });
            adjustExportButtons('tableSearch', compsListTable);
            enableTooltips();
            addCompTooltips();
        }
    }
}

function showCompsList(json) {
    // console.log('showCompsList json is ' + JSON.stringify(json))
    $('#compsList').show();
    $('#compsList').html('');
    $('#compsTable').hide();
    $('#compsTableListSection').hide();
    $('#exportOptions').hide();

    let comps = json.list;
    let currHtml = '';
    for (let i = 0; i < comps.length; i++) {
        let currComp = comps[i][0];
        let currCompMain = comps[i][0];
        const compUrl = comps[i][7];
        const compAvgRank = comps[i][6] ? formatNumber(comps[i][6]) : '';
        const compTitle = comps[i][8] ? comps[i][8] : '';
        const compDesc = comps[i][9] ? comps[i][9] : '';
        currHtml = getCompHtml(compUrl, compTitle, compDesc, currComp, currCompMain, compAvgRank);
        $('#compsList').append(currHtml);
        addCompTooltips();
    }
}

function showCompsTable(json) {
    $('#compsList').hide();
    $('#compsTableListSection').hide();
    $('#compsTable').show();
    $('#exportOptions').show();
    $('#competitorsDashboardLoading').hide();
    console.log('getMyJsonTopCompsWebsite ' + JSON.stringify(json.list));
    if (!hasAlertToShow(json)) {
        let comps = json.list;
        if (comps && comps.length > 0) {
            if (keywordsUsed < 5) {
                $('#fewKeywordsAlert').show();
            }
            let tableHtml = '';
            for (let i = 0; i < comps.length; i++) {
                let currComp = comps[i][0];
                tableHtml += '<tr>' +
                    '<td style="display: none" class="dt-control" rowId=' + i + '>' + (i + 1) + '</td>' +
                    '<td>' + getFormattedUrl(currComp) + '</td>' +
                    '<td>' + nFormatter(comps[i][6], 2) + '</td>' +
                    '<td>' + nFormatter(comps[i][7], 2) + '</td>' +
                    '<td>' + comps[i][1] + '</td>' +
                    '<td>' + comps[i][2] + '</td>' +
                    '<td>' + comps[i][3] + '</td>' +
                    '<td>' + comps[i][4] + '</td>' +
                    '<td>' + comps[i][5] + '</td>' +
                    '<td><a href="javascript:showOnPageOverviewModal(\'' + currComp + '\', \'\')" class="onPageOverviewTooltip btn btn-outline-primary pageBtn-competitor iconPageReviewLarge" > <img src="/assets/images/newicon/iconPageReviewLarge.png"/></a> ' +
                    '<a href="javascript:showOnPageCompareModal(\'' + currComp + '\', \'\')" class="onPageCompareTooltip btn btn-outline-primary pageBtn-competitor testing-mode iconOnpageLarge" > <img  src="/assets/images/newicon/iconOnpageLarge.png"/></a> ' +
                    '<a href="javascript:showCompResearch(\'ranksExplorer\', \'' + currComp + '\', \' Keyword Research\')" class="ranksExplorerTooltip btn btn-outline-primary pageBtn-competitor excludeIntroJs iconKeyworkLarge"><img src="/assets/images/newicon/iconKeyworkLarge.png" ></a> ' +
                    '<a href="javascript:showCompResearch(\'linksAll\', \'' + currComp + '\', \'\')" class="linksExplorerTooltip btn btn-outline-primary pageBtn-competitor excludeIntroJs iconBlockLinkLarge"><img src="/assets/images/newicon/iconBlockLinkLarge.png" ></a></td>' +
                    // '<td><a data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="Keywords Research - This research will show you the keywords that your competitor is ranked for including information on the given keywords, you can find very useful information and new keywords that you can also easily promote here" href="javascript:showCompResearch(\'ranksExplorer\', \'' + currComp + '\', \' Keyword Research\')" class="btn btn-outline-primary pageBtn smallPageBtn"><i class="fa-solid fa-key"></i></a></td>' +
                    // '<td><a data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="Backlinks Research - This research will show you the backlinks that are leading to your competitor website" href="javascript:showCompResearch(\'linksAll\', \'' + currComp + '\', \'\')" class="btn btn-outline-primary pageBtn smallPageBtn"><i class="fa-solid fa-link"></i></a></td>' +
                    // '<td><a data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="Keywords Gap Research - This research will show you the keywords gap between your competitor website and your website, which keywords your competitor is ranked for and your website not, you can find very useful information and new keywords that you can also easily promote here" class="btn btn-outline-primary pageBtn smallPageBtn" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="This research will show you the keywords gap between your competitor website and your website, which keywords your competitor is ranked for and your website not, you can find very useful information and new keywords that you can also easily promote here" href="javascript:showCompResearch(\'ranksGap\', \'' + currComp + '\')" ><i class="fa-solid fa-code-compare"></i></a></td>' +
                    '</tr>';
            }
            console.log('getMyJsonTopCompsWebsite tableHtml' + tableHtml);
            $('#compsTable tbody').html('');
            $('#compsTable').DataTable().destroy();
            $('#compsTable tbody').html(tableHtml);
            compsTable = $('#compsTable').DataTable({
                'fnCreatedRow': function (nRow, data, iDataIndex) {
                    $(nRow).attr('onclick', 'compsTableClick(\'' + data[1] + '\')');
                    $(nRow).attr('style', 'cursor:pointer');
                },
                buttons: ['copy', 'excel', 'print', {
                    extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
                }],
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }],
                "dom": '<"dt-buttons"Bf><"clear">firtlp',
                destroy: true,
                info: false,
                paging: false,
                "bFilter": true,
                fixedHeader: true,
            });
            adjustExportButtons('tableSearch', compsTable);
            enableTooltips();
        }
    }
}

function loadCompsToSelect(selector, initVal) {
    console.log('loadCompsToSelect start selector ' + selector + ' initVal ' + initVal)
    $.ajax({
        type: 'POST',
        url: getApiUrl('getMyJsonTopCompsWebsite'),
        // data: ,
        success: function (json) {
            console.log('loadCompsToSelect ' + JSON.stringify(json));
            compsList = [];
            json = json['list'];
            for (let i = 0; i < json.length; i++) {
                const compUrl = json[i][0];
                compsList.push(compUrl);
            }
            console.log('loadCompsToSelect load to select ' + JSON.stringify(compsList));
            const searchInputPlaceholder = 'Enter competitor url or choose a competitor from the list';
            $(selector).select2({
                tokenSeparators: [',', ', ', '\n'],
                selectOnClose: true,
                data: compsList,
                width: "100%",
                tags: true,
                placeholder: searchInputPlaceholder,
                searchInputPlaceholder: searchInputPlaceholder
            });
            if (initVal) {
                setSelectedValue(document.getElementById(selector.replace('#', '')), initVal);
                $(selector).val(initVal).change();
            }
        },
        async: true
    });
}
function fetchComps() {
    historyPushState('fetch-competitors', 'Fetch Competitors');
    const keywordIds = $("#keywordIdsList").val();
    console.log('keywordIds ' + keywordIds);
    // const url = apiUrl + 'getMyJsonTopCompsWebsite';
    const url = getApiUrl('getMyJsonTopCompsWebsite');
    console.log('showCompetitors url ' + url);

    $.ajax({
        type: 'POST',
        url: url,
        data: 'keywordIds=' + keywordIds + (isRabbitUI ? '&includeTopDomains=' + $('#includeTopDomains').prop('checked') : ''),
        // dataType: 'json',
        // contentType: 'json',
        success: function (json) {
            console.log('success ' + JSON.stringify(json));
            $('#filterByKeywords').html($("#keywordIdsList").select2('data').length);
            $('#listedCompetitor').html(json.list.length);
            compsJson = json;
            toggleCompsView();
        },
        async: false
    });
}
function fetchCompsByUrl() {
    const keywordIds = $("#keywordIdsList").val();
    console.log('keywordIds ' + keywordIds);
    // const url = apiUrl + 'getMyJsonTopCompsWebsite';
    const url = getApiUrl('getMyJsonPageTestLandingPage?url=' + $('#compDomain').val());
    console.log('fetchCompsByUrl url ' + url);
    $.getJSON(url, function (json) {
        // console.log('fetchCompsByUrl ' + JSON.stringify(json));
        showOneCompResult(json);
    });
}
function showOneCompResult(json) {
    $('#compsList').show();
    $('#compsList').html('');
    $('#compsTable').hide();
    $('#exportOptions').hide();
    console.log('showOneCompResult json ' + JSON.stringify(json));
    let compHtml = getCompHtml(json.map['pageUrl'], json.map['title'], json.map['metaDesc'], json.map['pageUrl'], json.map['pageUrl']);
    $('#compsList').append(compHtml);
    addCompTooltips();

}
// function fetchComps() {
//     $.getJSON(apiUrl + 'getMyJsonTopCompsWebsite?url=' + $('#inputSearchWebsite').val(), function (json) {
//         $('#compsTable').show();
//         $('#exportOptions').show();
//         $('#competitorsDashboardLoading').hide();
//         console.log('getMyJsonTopCompsWebsite ' + JSON.stringify(json.list));
//         if (!checkStatus(json)) {
//             let comps = json.list;
//             if (comps && comps.length > 0) {
//                 if (keywordsUsed < 5) {
//                     $('#fewKeywordsAlert').show();
//                 }
//                 let tableHtml = '';
//                 for (let i = 0; i < comps.length; i++) {
//                     let currComp = comps[i][0];
//                     tableHtml += '<tr>' +
//                         '<td style="display: none" class="dt-control" rowId=' + i + '>' + (i + 1) + '</td>' +
//                         '<td>' + currComp + '</td>' +
//                         '<td>' + nFormatter(comps[i][6], 2) + '</td>' +
//                         '<td>' + nFormatter(comps[i][7], 2) + '</td>' +
//                         '<td>' + comps[i][1] + '</td>' +
//                         '<td>' + comps[i][2] + '</td>' +
//                         '<td>' + comps[i][3] + '</td>' +
//                         '<td>' + comps[i][4] + '</td>' +
//                         '<td>' + comps[i][5] + '</td>' +
//                         '<td><a data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="Keywords Research - This research will show you the keywords that your competitor is ranked for including information on the given keywords, you can find very useful information and new keywords that you can also easily promote here" href="javascript:showCompResearch(\'ranksExplorer\', \'' + currComp + '\', \' Keyword Research\')" class="btn btn-outline-primary pageBtn smallPageBtn"><i class="fa-solid fa-key"></i></a></td>' +
//                         '<td><a data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="Backlinks Research - This research will show you the backlinks that are leading to your competitor website" href="javascript:showCompResearch(\'linksAll\', \'' + currComp + '\', \'\')" class="btn btn-outline-primary pageBtn smallPageBtn"><i class="fa-solid fa-link"></i></a></td>' +
//                         '<td><a data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="Keywords Gap Research - This research will show you the keywords gap between your competitor website and your website, which keywords your competitor is ranked for and your website not, you can find very useful information and new keywords that you can also easily promote here" class="btn btn-outline-primary pageBtn smallPageBtn" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="This research will show you the keywords gap between your competitor website and your website, which keywords your competitor is ranked for and your website not, you can find very useful information and new keywords that you can also easily promote here" href="javascript:showCompResearch(\'ranksGap\', \'' + currComp + '\')" ><i class="fa-solid fa-code-compare"></i></a></td>' +
//                         '</tr>';
//                 }
//                 $('#listedItemsCount').html(comps.length + ' ' + getTranslationWord("Listed Competitors"));
//                 $('#compsTable tbody').html(tableHtml);
//                 compsTable = $('#compsTable').DataTable({
//                     'fnCreatedRow': function (nRow, data, iDataIndex) {
//                         $(nRow).attr('onclick', 'compsTableClick(\'' + data[1] + '\')');
//                         $(nRow).attr('style', 'cursor:pointer');
//                     },
//                     buttons: ['copy', 'excel', 'print', {
//                         extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
//                     }],
//                     "columnDefs": [{
//                         "targets": 'no-sort',
//                         "orderable": false,
//                     }],
//                     "dom": '<"dt-buttons"Bf><"clear">firtlp',
//                     destroy: true,
//                     info: false,
//                     paging: false,
//                     "bFilter": true,
//                     fixedHeader: true,
//                 });
//                 adjustExportButtons('tableSearch', compsTable);
//                 enableTooltips();
//             }
//         }
//     });
// }

function initCompsTab() {
    loadKeywordsPairList();
    $('#backToCompetitorsLink').hide();
    $('#competitorsTitle').hide();

    $('#overviewOf').html('<span>Competitors</span>');
    // fetchComps();
}



function compsTableClick(domain) {
    console.log('domain ' + domain);
    let tdHtml = $(event.target).closest('td')[0].innerHTML;
    console.log('tdHtml ' + tdHtml)
    if (!tdHtml || (!tdHtml.includes('href'))) {
        let row = compsTable.row($(event.target).closest('tr'));
        if (row.child.isShown()) {
            row.child.hide();
        } else {
            console.log('compsTableClick row id ' + row.index())
            let html = $('#compsTableChild').html();
            const tableId = 'compsRanksTable' + row.index();
            html = html.replaceAll('compsRanksTable', tableId)
            row.child(html, 'childClass').show();
            var compsRanksTable = $('#' + tableId).DataTable({
                "ajax": {
                    "url": getApiUrl('getMyJsonCompRanksWebsite?url=' + $('#inputSearchWebsite').val() + '&comp=' + domain),
                    "type": "get",
                    "datatype": "json",
                    "dataSrc": "list",
                },
                "columns": [

                    {title: "Keyword"},
                    {title: "Search Volume"},
                    {title: $('#inputSearchWebsite').val()},
                    {title: domain},
                    {
                        "title": "Url",
                        render: function (data, type, row) {
                            if (type === 'display' || type === 'filter') {
                                return getFormattedUrl(data);
                            }
                            return data;
                        },
                    },
                    // {title: "Title"},
                ],
                // "order": [[1, "asc"]],
                // destroy: true,
                buttons: ['copy', 'excel', 'print', {
                    extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
                }],
                "initComplete": function (settings, json) {
                    let count = compsRanksTable.rows().count();
                    $('#listedInnerCount').html(count + " Listed Keywords");
                    if (count < 5 && payingUser == false) {
                        $('.upgradeBlock').show();
                    }
                },
                "dom": '<"dt-buttons"Bf><"clear">firtlp',
                info: false,
                paging: false,
                "bFilter": true,
                fixedHeader: true,
                deferRender: true,
                scrollY: 1000,
                scrollCollapse: true,
                autoWidth: true
            });
            adjustExportButtonsInner('tableSearchInner', compsRanksTable);
        }
    }
}