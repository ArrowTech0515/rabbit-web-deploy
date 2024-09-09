var siteTable;
var keywordId;
var keywordRowData;
let showAllKeywords = false;
// function organicNormalResult(id) {
//     $('#organicView').html('<div class="wrapper"><div class="spinner-border ms-auto organicSpinner" role="status" aria-hidden="true"></div></div>');
//     $.getJSON(apiUrl + 'getMyJsonSerpResultKeyword?id=' + id, function (json) {
//         if (!checkStatus(json)) {
//             json = JSON.parse(json['data']);
//             if (json['result'] && json['result'][0] && json['result'][0]['items']) {
//                 var organicResultArray = json['result'][0]['items'];
//                 if (organicResultArray != null) {
//                     $('#organicView').pagination({
//                         dataSource: organicResultArray,
//                         pageSize: 150,
//                         callback: function (data, pagination) {
//                             var wrapper = $('#organicView .wrapper').empty();
//                             $.each(data, function (i, f) {
//                                 // console.log(JSON.stringify(f));
//                                 if (f.url && f.domain) {
//                                     $('#organicView .wrapper').append('<ul class="list-style-none or_ul"><li>' + (i + 1) + '. <a href="' + f.url + '" class="text-truncate">' + f.domain + '</a><p class="text-primary mb-0" data-toggle="tooltip" title="' + f.description + '">' + f.title + '</p></li></ul>');
//                                 }
//                             });
//                         }
//                     });
//                 }
//             }
//         } else {
//             $('#organicView').html('');
//         }
//     })
// }
function organicGoogleResult(id) {
    var taskValue = $('select#googleDateSelect').val();
    console.log('organicGoogleResult taskValue ' + taskValue)
    $('#googleView').html('<div class="spinner-border ms-auto organicSpinner" role="status" aria-hidden="true"></div>');
    const url = getPostParams(apiUrl + 'getMyJsonSerpResultKeyword?id=' + id + '&task=' + taskValue + '&viewType=html');
    // console.log('organicGoogleResult url ' + url)
    $.getJSON(url, function (json) {
        // console.log('google result ' + JSON.stringify(json));
        if (!hasAlertToShow(json)) {
            json = JSON.parse(json['data']);
            if (json['tasks'][0]['result'] != null) {
                var html = json['tasks'][0]['result'][0]['items'][0]['html'];
                var iframe = document.createElement('iframe');
                $('#googleView').html(iframe);
                $('#googleView :input').attr("disabled", true);
                iframe.setAttribute("style", "height:500px;width:100%;");
                if (iframe.contentWindow && iframe.contentWindow.document) {
                    iframe.contentWindow.document.open();
                    iframe.contentWindow.document.write(html);
                    iframe.contentWindow.document.close();
                }
            } else {
                $('#googleView').html('No data for Google View');
            }
            //clearTimeout(myTimeout);
        } else {
            $('#googleView').html('');
            //organicGoogleResult(id);
            //const myTimeout = setTimeout(organicGoogleResult(id), 2000);
            //const myInterval = setInterval(organicGoogleResult, 2000);
        }
    })
}

deleteChildRow = async (id) => {
    const response = await fetch(getApiUrl('editWebsiteGooglePosition?oper=del&id=' + id), {
        mode: 'no-cors',
        method: 'post',
    });
    $('tr#sub_' + id).remove()
    refreshUsage()
}

function relatedKeywordsSubgrid(list, index) {
    var relatedKeywords = $('#relatedKeywordsTable').DataTable();
    var tr = $(event.target).closest('tr');
    var row = relatedKeywords.row(tr);

    if (row.child.isShown()) {
        row.child.hide();
    } else {
        console.log('relatedKeywordsSubgrid d ' + JSON.stringify(list[index]));
        var formattedInnerRow = relatedformat(index);
        row.child(formattedInnerRow, 'childClass').show();

        var chartId = "chartRelatedKeyword" + (index);
        var ctx = document.getElementById(chartId).getContext("2d");
        ctx.canvas.height = 300;
        ctx.canvas.width = 800;
        new Chart(ctx, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [
                    {
                        label: "Search Volume History",
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(0,0,255,1.0)",
                        borderColor: "rgba(0,0,255,0.1)",
                        data: yValues
                    }
                ]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                legend: {display: false},
            }
        });
    }
};

function relatedformat(d) {
    var monthlySearches = relatedKeywordsArray[d[0] - 1]["keyword_data.keyword_info.monthly_searches"];
    if (monthlySearches) {
        xValues = [];
        yValues = [];
        for (var i = 0; i < monthlySearches.length; i++) {
            var curr = monthlySearches[i];
            xValues.push(curr["month"] + "-" + curr["year"]);
            yValues.push(curr["search_volume"]);
        }
    }
    return "<canvas id='chartRelatedKeyword" + (d[0] - 1) + "'></canvas>"
}

var keywordsTableSettings;

function isColVisible(ourCol, defaultVal) {
    if (!keywordsTableSettings && tableColsSettings && tableColsSettings['keywordsTable']) {
        keywordsTableSettings = JSON.parse(tableColsSettings['keywordsTable']);
    }
    if (ourCol.includes('Chart')) {
        // console.log('keywordsTableSettings ' + JSON.stringify(keywordsTableSettings));
        // console.log('keywordsTableSettings col ' + keywordsTableSettings[ourCol]);
    }
    const userSavedVal = keywordsTableSettings && keywordsTableSettings[ourCol] && keywordsTableSettings[ourCol] == 'on';
    const defaultColShow = !keywordsTableSettings && defaultVal;
    // console.log('isColVisible for col ' + ourCol + ' userSavedVal ' + userSavedVal + ' defaultColShow ' + defaultColShow);
    return userSavedVal || defaultColShow;
}

let refreshTryCount = 0;

function refreshKeywordsGridIfNeed() {
    needToRefreshKeywords = false;
    setTimeout(function () {
        const countNeedToRefresh = $('button.needToRefresh').length;
        console.log('countNeedToRefresh ' + countNeedToRefresh + ' and refreshTryCount ' + refreshTryCount);
        if (countNeedToRefresh > 0 && refreshTryCount++ < 3) {
            $('.keywordsLoadingProgressBar').show();
            makeProgress();

            needToRefreshKeywords = true;
            // if (!isExternalUser()) {
            console.log('set another timeout ' + countNeedToRefresh);
            setTimeout(function () {
                refreshKeywordTable();
            }, 8000);
            // }
        } else {
            $('.keywordsLoadingProgressBar').hide();
        }
    }, 2000);
}

function loadKeywordsTableFromJson(json, initShowHideCols) {
    if (!hasAlertToShow(json)) {
        json = json.list;
        keywordsRowsCount = json.length;
        console.log('rowsCount ' + keywordsRowsCount);
        let tableName = showAllKeywords ? 'allKeywordsTable' : 'keywordsTable';
        siteTable = $('#' + tableName).DataTable({
            // "ajax": {
            // "url": apiUrl + 'jsonKeywordForWebsite?url=' + $('#inputSearchWebsite').val(),
            // "type": "get",
            "datatype": "json",
            "data": json,
            // "dataSrc": "list",
            // },
            rowId: 'id',
            "columns": keywordColumns(true),
            'fnCreatedRow': function (nRow, aData, iDataIndex) {
                $(nRow).attr('onclick', 'keywordsTableClick()');
                $(nRow).attr('style', 'cursor:pointer');
            },
            destroy: true,
            "language": {
                "emptyTable": "<span>No keywords found</span>, <span>create your first keyword now</span>"
                // "emptyTable": "No keywords found, <a href=\"javascript:;\" id='addNewKeywordLink'>create your first keyword now</a>"
            },
            "rowCallback": function (row, data, index) {
            },

            buttons: ['copy', 'excel', 'print', {
                extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
            }],
            "dom": '<"dt-buttons"Bf><"clear">firtlp',
            // info: false,
            // responsive: true,
            // "bFilter": true,
            // fixedHeader: true,
            // select: true,
            // deferRender: true,
            // paging: keywordsRowsCount > 100,
            // scrollY: keywordsRowsCount > 100 ? (isOpenBelowTable() ? 400 : 700) : "",
            // scrollCollapse: true,
            // scroller: keywordsRowsCount > 100,
            info: false,
            scrollY: false,
            scrollX: true,
            fixedHeader: false,
            deferRender: true,
            paging: false,
            autoWidth: true,
            "bFilter": true,
            "aoColumnDefs": [{
                "searchable": false,
                "targets": [0]
            }],
            columnDefs: [{
                targets: 2,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('white-space', 'initial');
                }
            }],
            "drawCallback": function () {
                drawGridCharts(this);
            },
            "initComplete": function (settings, json) {
                // enableTooltips();
                if (!showAllKeywords) {
                    initIconsData(keywordsRowsCount);
                }
                $('#refreshLoading').hide();
                console.log('isOpenFirstRow() ' + isOpenFirstRow());
                if (isOpenFirstRow() && siteTable.rows().count() > 0 && siteTable.rows().count() < 5) {
                    loadKeywordOverviewData(siteTable.row(0));
                }

                adjustExportButtons('keywordSearch', siteTable);

                if (initShowHideCols) {
                    thBreakLine = false;
                    initShowHideColumns(tableName, siteTable);
                    thBreakLine = false;
                }
                // setFirstColWithRowNum('#' + tableName);

            }
        });
        showAllKeywords = false;

        if (isRabbitUI) {
            siteTable.on('order.dt search.dt', function () {
                siteTable.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
        }
    }
    refreshKeywordsGridIfNeed();
    return json;
}

function keywordColumns(rowNumVisible) {
    return [
        // {
        //     "className": 'details-control',
        //     "orderable": false,
        //     "data": null,
        //     "defaultContent": '<img src="images/icon/blue_arrow.png"  width="30" height="30" class="blueArrow" /> <img src="images/icon/arrow_down.png" class="grayArrow" width="30" height="30" />'
        // },
        // {"name": "row", "defaultContent": "", "title": "", 'visible': true,},
        {
            "data": "",
            "name": "id",
            "title": "",
            "defaultContent": "",
            'visible': isRabbitUI && rowNumVisible,
        },
        {
            data: "starred",
            render: function (data, type, row) {
                // return data;
                if (type === 'display' || type === 'filter') {
                    return '<a id="star' + row.id + '" href="javascript:toggleStar(\'KeywordForWebsite\', ' + row.id + ', ' + data + ')">' + (data ? '<img src="/assets/images/icon/starFill.png"></a>' : '<img src="/assets/images/icon/star.png"></a>');
                } else {
                    return data;
                }
            },
            visible: true
        },
        {
            "data": "websiteName", "defaultContent": "", "title": "Website", 'visible': showAllKeywords,
        },
        {
            "data": "keywordName",
            "name": "keywordName",
            "defaultContent": "",
            "title": "Keyword",
            "sClass": "m-lines",
            visible: true,
            'hideCol': true,
            "tooltip": getTranslationWord("The term you are trying to promote in google (normally there are few terms eg flowers delivery, flowers delivery shop, flowers delivery New York, flowers delivery in New York etc)")
        },
        {
            "data": "dateCreated",
            "name": "dateCreated",
            "defaultContent": "",
            "title": "Date<br />Created",
            'visible': isColVisible('dateCreated', false)
        },
        {
            data: "keywordLocalSearch", 'visible': true, "showHideGroup": "Keyword",
            'visible': isColVisible('keywordLocalSearch', false),
            "name": "keywordLocalSearch", "title": "Search<br />Volume",
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    // return '<div class="container">' +
                    //     '  <div class="row">' +
                    //     '    <div class="col-md-2">' +
                    //     nFormatter(data, 2) +
                    //     '    </div>' +
                    //     '    <div class="col-md-10">' +
                    //     '<div id="keywordHistoricalSearchVolumeCont' + row.id + '" class="rowChartContainer"></div>' +
                    //     '    </div>' +
                    //     '  </div>' +
                    //     '</div>';
                    return nFormatter(data, 2);
                }
                return data;
            },
            "tooltip": getTranslationWord("Indicates the (approximate) number of monthly searches for the given keyword on the search engine"),
        },
        {
            "data": "keywordHistoricalSearchVolume",
            "name": "keywordHistoricalSearchVolume",
            "title": getTranslationWord("Search Volume History"),
            'visible': isColVisible('keywordHistoricalSearchVolume', false),
            "showHideGroup": "Keyword",
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        return '<div id="keywordHistoricalSearchVolumeCont' + row.id + '" class="rowChartContainer"></div>';
                    } else {
                        return '';
                    }
                }
                return data;
            },
        },
        {
            "data": "keywordDifficulty",
            "name": "keywordDifficulty",
            "title": "Difficulty",
            "showHideGroup": "Keyword",
            'visible': isColVisible('keywordDifficulty', false),
            "tooltip": getTranslationWord("Indicates the chance of getting in top-10 organic results for a keyword on a logarithmic scale from 0 to 100, where 1 is easy and 100 is extremely hard"),
        },
        {
            "name": "keywordCompetition",
            "title": "Competition",
            "showHideGroup": "Keyword",
            'visible': isColVisible('keywordCompetition', false),
            "data": function (data, type, dataToSet) {
                return formatNumber(data.keywordCompetition);
            },
            "tooltip": getTranslationWord("Indicates the relative amount of competition associated with the given keyword"),
        },
        {
            "name": "keywordCpc",
            "title": "CPC",
            'visible': isColVisible('keywordCpc', false),
            "showHideGroup": "Keyword",
            "data": "keywordCpc",
            // "data": function (data, type, dataToSet) {
            //     return data.keywordCpc && data.keywordCpc.indexOf("-") == -1 ? formatNumber(data.keywordCpc) : data.keywordCpc;
            // },
            "tooltip": getTranslationWord("Indicates the average cost per click (USD) historically paid for the given keyword"),
        },
        {
            data: "keywordResults",
            "name": "keywordResults",
            "title": "Results",
            "showHideGroup": "Keyword",
            'visible': isColVisible('keywordResults', isRabbitUI),
            "tooltip": getTranslationWord("Indicates the number of search results returned for the given keyword"),
            render: function (data, type, row) {
                // If display or filter data is requested, format the date
                if (type === 'display' || type === 'filter') {
                    return nFormatter(data, 2);
                }
                return data;
            }
        },
        {
            "name": "currentPosition", "title": "Live Rank",
            data: "currentPosition",
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    let defaltion;
                    let inflation;
                    let value = (row.daysAgo1 - data);
                    if (value > 0 && data > 0 && row.daysAgo1 > 0) {
                        return data + " <img src='/assets/images/icon/upload-up.png' />" + value;
                    } else if (value < 0 && data > 0 && row.daysAgo1 > 0) {
                        return data + " <img src='/assets/images/icon/upload-down.png' />" + value;
                    } else if (data == 0) {
                        return '<button class="btn btn-sm btn-light refresh needToRefresh" onclick="refreshKeywordTable()" type="button"><i class="fa fa-refresh"></i> </button>';
                    } else {
                        return formatRank(data);
                    }
                } else {
                    return data;
                }
            }, 'visible': true
        },
        {
            "data": "firstPos",
            "name": "firstPos",
            "title": "Initial<br />Rank",
            'visible': isColVisible('firstPos', daysCount > 5),
            "tooltip": getTranslationWord("Indicates the initial monitored rank of the given keyword, very useful for reports and tracking progress")
        },
        {
            "data": "bestRank",
            "name": "bestRank",
            "title": "Best<br />Rank",
            'visible': isColVisible('bestRank', false),
            "tooltip": getTranslationWord("Indicates the best monitored rank that was captured for the given keyword")
        },
        {
            "data": "prevRank",
            "name": "prevRank",
            "title": "<span>Last Rank</span>",
            'visible': isColVisible('prevRank', false),
            "tooltip": getTranslationWord("Indicates the previous monitored rank of the given keyword")
        },
        {
            "data": "pageUrl",
            "name": "pageUrl",
            "title": "Page Url",
            "defaultContent": "",
            "autoWidth": true,
            "sClass": "m-lines",
            // render: $.fn.dataTable.render.ellipsis(20),
            'visible': isColVisible('pageUrl', !isSeolyUI),
            "tooltip": getTranslationWord("The page in your website that google links when someone search for this keyword, if your website is not found in top 100 results for this keyword, we will show the homepage by default")
        },
        // {
        //     "data": "keywordGroupName",
        //     "name": "keywordGroupName",
        //     "title": "Group",
        //     "defaultContent": "",
        //     'visible': false
        // },
        {
            "data": "searchEngine",
            "name": "searchEngineName",
            "title": "Search<br />Engine",
            "defaultContent": "",
            'visible': isColVisible('searchEngine', true),
            "tooltip": "The search engine of the given keyword, you can have multiple keywords with different search engines. To change the search engine - you should delete the keyword and create a new keyword with the required search engine",
            render: function (data, type, row) {
                if (!data) {
                    data = mainUserDetails['searchEngineName'];
                }
                if (type === 'display' || type === 'filter') {
                    return row['countryFlag'] ? ('<img style="height: 20px; margin-right: 10px;margin-left: 10px;" src="' + row['countryFlag'] + '" />' + data) : data;
                } else {
                    return data;
                }
            },
        },
        {
            "data": "device",
            "name": "device",
            "title": "Device",
            "defaultContent": "",
            'visible': isColVisible('device', false),
            "tooltip": "Which device the given keyword is being searched on - Desktop or Mobile"
        },
        {
            "data": "lastYearChart",
            "name": "lastYearChart",
            "defaultContent": "",
            "title": getTranslationWord("Last Year"),
            "showHideGroup": "LastYear",
            'visible': isColVisible('lastYearChart', false),
            // 'visible': daysCount > 60,
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    return '<div id="lastYearChartContainer' + row.id + '" class="rowChartContainer"></div>';
                }
                return data;
            }
        },
        {
            "data": "monthAgo1",
            "name": "monthAgo1",
            "title": getMonthsAgoName(1),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo1', false)
        },
        {
            "data": "monthAgo2",
            "name": "monthAgo2",
            "title": getMonthsAgoName(2),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo2', false)
        },
        {
            "data": "monthAgo3",
            "name": "monthAgo3",
            "title": getMonthsAgoName(3),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo3', false)
        },
        {
            "data": "monthAgo4",
            "name": "monthAgo4",
            "title": getMonthsAgoName(4),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo4', false)
        },
        {
            "data": "monthAgo5",
            "name": "monthAgo5",
            "title": getMonthsAgoName(5),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo5', false)
        },

        {
            "data": "monthAgo6",
            "name": "monthAgo6",
            "title": getMonthsAgoName(6),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo6', false)
        },
        {
            "data": "monthAgo7",
            "name": "monthAgo7",
            "title": getMonthsAgoName(7),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo7', false)
        },
        {
            "data": "monthAgo8",
            "name": "monthAgo8",
            "title": getMonthsAgoName(8),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo8', false)
        },
        {
            "data": "monthAgo9",
            "name": "monthAgo9",
            "title": getMonthsAgoName(9),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo9', false)
        },
        {
            "data": "monthAgo10",
            "name": "monthAgo10",
            "title": getMonthsAgoName(10),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo10', false)
        },

        {
            "data": "monthAgo11",
            "name": "monthAgo11",
            "title": getMonthsAgoName(11),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo11', false)
        },
        {
            "data": "monthAgo12",
            "name": "monthAgo12",
            "title": getMonthsAgoName(12),
            "showHideGroup": "LastYear",
            'visible': isColVisible('monthAgo12', false) && !showAllKeywords,
            "tooltip": getTranslationWord("Indicates the rank one year ago of the given keyword, very useful for reports and tracking progress")
        },
        {
            "data": "lastWeekChart",
            "name": "lastWeekChart",
            "defaultContent": "",
            "title": "Last<br />Week",
            "showHideGroup": "LastDays",
            'visible': isColVisible('lastWeekChart', daysCount > 30) && !isSEOlyUser() && !isSeolyUI && !showAllKeywords,
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    return '<div id="lastWeekChartContainer' + row.id + '" class="rowChartContainer"></div>';
                }
                return data;
            }
        },
        {
            "data": "daysAgo1",
            "name": "daysAgo1",
            "title": "Yesterday",
            "showHideGroup": "LastDays",
            'visible': isColVisible('daysAgo1', daysCount > 0),
        },
        {
            "data": "daysAgo2",
            "name": "daysAgo2",
            "title": getDaysAgoName(2),
            "showHideGroup": "LastDays",
            'visible': isColVisible('daysAgo2', false),
        },
        {
            "data": "daysAgo3",
            "name": "daysAgo3",
            "title": getDaysAgoName(3),
            "showHideGroup": "LastDays",
            'visible': isColVisible('daysAgo3', false),
        },
        {
            "data": "daysAgo4",
            "name": "daysAgo4",
            "title": getDaysAgoName(4),
            "showHideGroup": "LastDays",
            'visible': isColVisible('daysAgo4', false),
        },
        {
            "data": "daysAgo5",
            "name": "daysAgo5",
            "title": getDaysAgoName(5),
            "showHideGroup": "LastDays",
            'visible': isColVisible('daysAgo5', false),
        },
        {
            "data": "daysAgo6",
            "name": "daysAgo6",
            "title": getDaysAgoName(6),
            "showHideGroup": "LastDays",
            'visible': isColVisible('daysAgo6', false),
        },
        {
            "data": "daysAgo7",
            "name": "daysAgo7",
            "title": getDaysAgoName(7),
            "showHideGroup": "LastDays",
            'visible': isColVisible('daysAgo7', false),
            "tooltip": getTranslationWord("Indicates the rank a week ago of the given keyword")
        },
        // { "data": "posChange"},
        {
            "data": "lastChecked",
            "name": "lastChecked",
            "title": "Last Checked",
            "defaultContent": "",
            'visible': isColVisible('lastChecked', false),
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    return Number.isInteger(data) ? data + ' hours ago' : data;
                } else {
                    return data
                }
            }
        },
        {
            "data": "keywordDensity",
            "name": "keywordDensity",
            "title": "Keyword<br />Density",
            "showHideGroup": "LandingPage",
            "defaultContent": "",
            'visible': isColVisible('keywordDensity', true),
            "tooltip": getTranslationWord("Indicates how many times the give keywords appears in the content of the landing page"),
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    return data ? (formatNumberGreenHigh(data, 3, 8)) : '';
                } else {
                    return data
                }
            }
        },
        {
            "data": "wordsCount",
            "name": "wordsCount",
            "title": "Words<br />Count",
            "showHideGroup": "LandingPage",
            "defaultContent": "",
            'visible': isColVisible('wordsCount', !isSeolyUI),
            render: function (data, type, row) {
                return data ? (formatNumberGreenHigh(data, 100, 500)) : '';
            }
        },
        {
            "data": "pageTitle",
            "name": "pageTitle",
            "title": "Page<br />Title",
            "sClass": "m-lines",
            "showHideGroup": "LandingPage",
            render: $.fn.dataTable.render.ellipsis(10),
            "defaultContent": "",
            'visible': isColVisible('pageTitle', !isRabbitUI),
        },
        {
            "data": "pageTitleContainsKeyword",
            "name": "pageTitleContainsKeyword",
            "title": "Title<br />Contains<br />Keyword",
            "showHideGroup": "LandingPage",
            "defaultContent": "",
            // <i className="fa-solid fa-circle-xmark"></i>
            'visible': isColVisible('pageTitleContainsKeyword', false),
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    return formatCheckedOrUnChecked(data);
                }
            }
        },
        {
            "data": "pageTitleLength",
            "name": "pageTitleLength",
            "title": "Title<br />Length",
            "showHideGroup": "LandingPage",
            "defaultContent": "",
            'visible': isColVisible('pageTitleLength', false)
        },
        {
            "data": "H1",
            "name": "H1",
            "title": "H1",
            "sClass": "m-lines",
            "defaultContent": "",
            "showHideGroup": "LandingPage",
            'visible': isColVisible('H1', false)
        },
        // {
        //     "data": "H1moreThanOnce",
        //     "name": "H1moreThanOnce",
        //     "title": "H1 more than once",
        //     "showHideGroup": "LandingPage",
        //     'visible': false
        // },
        {
            "data": "H1containsKeyword",
            "name": "H1containsKeyword",
            "title": "H1<br />Contains<br />Keyword",
            "showHideGroup": "LandingPage",
            "defaultContent": "",
            'visible': isColVisible('H1containsKeyword', false),
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    return formatCheckedOrUnChecked(data);
                }
            }
        },
        {
            "data": "H2exists",
            "name": "H2exists",
            "title": "H2",
            "showHideGroup": "LandingPage",
            "defaultContent": "",
            'visible': isColVisible('H2exists', false),
            render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                    return formatCheckedOrUnChecked(data);
                }
            }
        },
        {
            "data": "H2tags",
            "name": "H2tags",
            "title": "H2<br />Count",
            "defaultContent": "",
            "showHideGroup": "LandingPage",
            'visible': isColVisible('H2tags', false)
        },
        {
            data: "id", 'visible': true,
            render: function (data, type, row) {
                return '<a class="ignoreme" onclick="deleteKeyword(' + row.id + ')"><img src="/assets/images/home_icon/delete.png" alt="Close"></a>';
            }
        }
    ];
}

function getSearchAndOrder(data, defaultSearchCol) {
    let query = '';
    // console.log('ajax table ' + JSON.stringify(data));
    // console.log('data[\'order\'] ' + JSON.stringify(data['order']))
    if (data['order'] && data['order'][0]) {
        console.log('data[\'order\'][0][\'column\'] ' + data['order'][0]['column'])
        let orderIndex = data['order'][0]['column'];
        console.log('orderIndex ' + orderIndex)
        console.log('data[\'columns\'][orderIndex] ' + JSON.stringify(data['columns'][orderIndex]))
        console.log('data[\'columns\'][orderIndex][\'name\'] ' + data['columns'][orderIndex]['name'])
        let orderName = data['columns'][orderIndex]['name'];
        console.log('orderName ' + orderName)
        if (!orderName) {
            orderName = data['columns'][orderIndex]['data'];
        }
        let orderDir = data['order'][0]['dir'];
        if (orderName && orderDir) {
            query = getPostParams('&sidx=' + orderName + '&sord=' + orderDir);
        }
    }
    if (defaultSearchCol && data['search'] && data['search']['value']) {
        let val = data['search']['value'];
        query += getPostParams('&_search=true&searchOper=bt&searchField=' + defaultSearchCol + '&searchString=' + val);
    }
    return query;
}

function syncLoadKeywordsTable(kfwUrl, initShowHideCols) {
    $.ajaxSetup({
        async: false
    });
    $.getJSON(kfwUrl, function (json) {
        // console.log('jsonKeywordForWebsite ' + JSON.stringify(json));
        loadKeywordsTableFromJson(json, initShowHideCols);
    });
    $.ajaxSetup({
        async: true
    });
}

function loadKeywordsScroller(kfwUrl, initShowHideCols) {
    console.log('start loadKeywordsScroller')
    let tableName = showAllKeywords ? 'allKeywordsTable' : 'keywordsTable';
    siteTable = $('#' + tableName).DataTable({
        "scrollCollapse": true,
        "serverSide": true,
        "ordering": true,
        "searching": true,
        "ajax": function (data, callback, settings) {
            setTimeout(function () {
                let query = getSearchAndOrder(data, 'keywordName');
                const url = getPostParams(kfwUrl + '&start=' + data.start + '&rows=' + data.length + query);
                console.log('url is ' + url)
                $.getJSON(url, function (json) {
                    console.log('json is ' + JSON.stringify(json))
                    $('.keywordsTableCount').html(json['records']);
                    // console.log('result is ' + JSON.stringify(json['list']))
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
        "deferRender": true,
        "dom": "rtiS",
        "scrollY": "500px",
        fixedHeader: true,
        rowId: 'id',
        "columns": keywordColumns(false),
        'fnCreatedRow': function (nRow, aData, iDataIndex) {
            $(nRow).attr('onclick', 'keywordsTableClick()');
            $(nRow).attr('style', 'cursor:pointer');
        },
        "drawCallback": function () {
            drawGridCharts(this);
        },
        destroy: true,
        "language": {
            "emptyTable": "No keywords found, create your first keyword now"
        },
        buttons: ['copy', 'excel', 'print', {
            extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
        }],
        autoWidth: true,
        "bFilter": true,
        "aoColumnDefs": [{
            "searchable": false,
            "targets": [1]
        }],
        order: [[3, 'desc']],
        columnDefs: [{
            targets: 2,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('white-space', 'initial');
            }
        }],
        "initComplete": function (settings, json) {
            // enableTooltips();
            $('#refreshLoading').hide();
            console.log('isOpenFirstRow() ' + isOpenFirstRow());
            if (isOpenFirstRow() && siteTable.rows().count() > 0 && siteTable.rows().count() < 5) {
                loadKeywordOverviewData(siteTable.row(0));
            }
            if (initShowHideCols) {
                thBreakLine = true;
                initShowHideColumns(tableName, siteTable);
                thBreakLine = false;
            }
            adjustExportButtons('keywordSearch', siteTable);
            const divWithElements = $("#keywordsTable_wrapper").parent().parent();
            divWithElements.find(" a.xlsButton").click(function () {
                syncLoadKeywordsTable(kfwUrl, initShowHideCols);
                $('div#keywordsTable_wrapper button.buttons-excel').click();
            });
            divWithElements.find(" a.copyButton").click(function () {
                syncLoadKeywordsTable(kfwUrl, initShowHideCols);
                $('div#keywordsTable_wrapper button.buttons-copy').click();
            });
            divWithElements.find(" a.pdfButton").click(function () {
                syncLoadKeywordsTable(kfwUrl, initShowHideCols);
                $('div#keywordsTable_wrapper button.buttons-pdf').click();
            });
            // setFirstColWithRowNum('#' + tableName);
        }
    });

    // if (isRabbitUI) {
    //     siteTable.on('order.dt search.dt', function () {
    //         siteTable.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
    //             cell.innerHTML = i + 1;
    //         });
    //     }).draw();
    // }

    showAllKeywords = false;
    refreshKeywordsGridIfNeed();
}

function loadKeywordTable(initShowHideCols) {
    console.log('loadKeywordTable start')
    // console.log("start loadKeywordTable");
    $('#overviewOf').html(' <span>' + getTranslationWord("My Keywords") + '</span>');
    // $('#overviewOf').html($('#inputSearchWebsite').val() + ' <span>' + getTranslationWord("My Keywords") + '</span>');
    keywordsRowsCount = websiteData && websiteData.generalDetails && websiteData.generalDetails.keywordsInTrack ? websiteData.generalDetails.keywordsInTrack : keywordsUsed;
    let cols = '';
    // console.log('loadKeywordTable keywordsRowsCount ' + keywordsRowsCount)
    // try {
    //     if (tableColsSettings) {
    //         const colsJson = JSON.parse(tableColsSettings['keywordsTable']);
    //         let arr = Object.keys(colsJson);
    //         for (let i = 0; i < arr.length; i++) {
    //             if (colsJson[arr[i]] === 'on' && arr[i].indexOf('Chart') === -1) {
    //                 cols += arr[i] + ',';
    //             }
    //         }
    //         console.log('cols is ' + cols);
    //         cols += 'keywordName,device,countryFlag';
    //     }
    // } catch (e) {
    // }
    //
    // console.log('loadKeywordTable tableColsSettings ' + JSON.stringify(tableColsSettings));
    currTableUrl = getApiUrl('jsonKeywordForWebsite' + (!showAllKeywords ? ('?url=' + $('#inputSearchWebsite').val()) : '?&showAllWebsites=true') +
        (cols && cols.length > 0 ? '&selectedCols=' + cols : ''));
    
    if (keywordsRowsCount > enableServerSideTable) {
        loadKeywordsScroller(currTableUrl, initShowHideCols);
        if (!showAllKeywords && websiteData) {
            $('#trackedKeywords').html(websiteData['generalDetails']['keywordsInTrack']);
            $('#trackedRanksInTop').html(websiteData['generalDetails']['keywordsInTop10']);
            $('#trackedKeywordsUp').html(websiteData['generalDetails']['ranksUp']);
            $('#trackedKeywordsDown').html(websiteData['generalDetails']['ranksDown']);
            const avgPos = websiteData['generalDetails']['avgPosCurr'].toFixed(2);
            $('#trackedKeywordsAvgPos').html(avgPos);
            if (avgPos > 80) {
                // if (avgPos > 80 && rowsCount < 5) {
                $('#competitiveKeywordsWarningDiv').toggle(1000);
            }
        }
    } else {
        $.getJSON(currTableUrl, function (json) {
            // console.log('jsonKeywordForWebsite ' + JSON.stringify(json));
            loadKeywordsTableFromJson(json, initShowHideCols);
        });
    }
}

function drawGridCharts(ourGrid) {
    let searchVolumeVisible = ourGrid.api().column('keywordHistoricalSearchVolume:name').visible();
    let lastYearChartVisible = ourGrid.api().column('lastYearChart:name').visible();
    let lastWeekChartVisible = ourGrid.api().column('lastWeekChart:name').visible();
    // console.log('drawCallback searchVolumeVisible: ' + searchVolumeVisible);
    // console.log('drawCallback lastYearChartVisible: ' + lastYearChartVisible);
    if (searchVolumeVisible) {
        var rows = ourGrid.api().rows({page: 'current'}).data();
        // console.log('rows showing ' + rows.length);
        if (rows.length !== 0) {
            // Loop through each row to render each chart
            for (var i = 0; i < rows.length; i++) {
                // Find the chart intended for this data
                // console.log('rows[i].keywordHistoricalSearchVolume ' + rows[i].keywordHistoricalSearchVolume);
                if (rows[i].keywordHistoricalSearchVolume) {
                    // console.log('rows[i].keywordHistoricalSearchVolume ' + rows[i].keywordHistoricalSearchVolume);
                    var currRow = rows[i].keywordHistoricalSearchVolume;
                    var labels = [];
                    var chartData = [];
                    var data = JSON.parse(currRow);
                    // console.log(data);
                    // console.log(data.length);

                    for (var j = 0; j < data.length; j++) {
                        let curr = data[j];
                        // console.log(curr);
                        labels.push(curr["year"] + '-' + curr.month);
                        chartData.push(nFormatter(curr.search_volume, 2));
                    }
                    // console.log('rtl ' + rtl);
                    if (!rtl) {
                        labels.reverse();
                        chartData.reverse();
                    }
                    // console.log("keywordHistoricalSearchVolume" + rows[i].id);
                    // console.log(rows[i].id + ': ' + labels + ", " + chartData);
                    // if (i < 100) {
                    let id = rows[i].id;
                    // console.log('now id is ' + id);
                    createSmallChart(id, labels, chartData);
                    // }
                }
            }
        }
    }
    if (lastYearChartVisible) {
        var rows = ourGrid.api().rows({page: 'current'}).data();
        // console.log('rows showing ' + rows.length);
        if (rows.length !== 0) {
            // Loop through each row to render each chart
            for (var i = 0; i < rows.length; i++) {
                // Find the chart intended for this data
                // console.log('rows[i].monthsAgo1 ' + rows[i].monthAgo1);
                if (rows[i].monthAgo1 && rows[i].monthAgo1 > 0) {
                    // console.log('rows[i].keywordHistoricalSearchVolume ' + rows[i].keywordHistoricalSearchVolume);
                    var currRow = rows[i];
                    var labels = [];
                    var chartData = [];
                    labels.push(getTranslationWord('Live Rank'));
                    chartData.push(currRow.currentPosition);

                    for (var j = 1; j <= 12; j++) {
                        let curr = currRow["monthAgo" + j];

                        if (curr && curr > 0) {
                            labels.push(getMonthsAgoName(j));
                            chartData.push(curr);
                        }
                    }

                    if (rtl) {
                        labels.reverse();
                        chartData.reverse();
                    }
                    let id = rows[i].id;
                    createSmallLineChart('Year', id, labels, chartData);
                }
            }
        }
    }
    if (lastWeekChartVisible) {
        var rows = ourGrid.api().rows({page: 'current'}).data();
        // console.log('rows showing ' + rows.length);
        if (rows.length !== 0) {
            // Loop through each row to render each chart
            for (var i = 0; i < rows.length; i++) {
                // Find the chart intended for this data
                // console.log('rows[i].monthsAgo1 ' + rows[i].monthAgo1);
                if (rows[i].daysAgo2 && rows[i].daysAgo2 > 0) {
                    // console.log('rows[i].keywordHistoricalSearchVolume ' + rows[i].keywordHistoricalSearchVolume);
                    var currRow = rows[i];
                    var labels = [];
                    var chartData = [];
                    labels.push(getTranslationWord('Live Rank'));
                    chartData.push(currRow.currentPosition);

                    for (var j = 1; j <= 7; j++) {
                        let curr = currRow["daysAgo" + j];

                        if (curr && curr > 0) {
                            labels.push(getDaysAgoName(j));
                            chartData.push(curr);
                        }
                    }

                    if (rtl) {
                        labels.reverse();
                        chartData.reverse();
                    }
                    let id = rows[i].id;
                    createSmallLineChart('Week', id, labels, chartData);
                }
            }
        }
    }
}

function createSmallChart(chartId, labels, data) {
    // console.log(chartId);
    let canvasDiv = $('#keywordHistoricalSearchVolumeCont' + chartId);
    // console.log('canvasDiv.html()' + canvasDiv.html());
    if (!canvasDiv.html() || !canvasDiv.html().includes('canvas')) {
        canvasDiv.html('<canvas id="canvasSearchVolume' + chartId + '" class="rowChart"></canvas>');
        var ctx = document.getElementById('canvasSearchVolume' + chartId);
        var smallchartdata = {
            labels: labels,
            datasets: [
                {
                    label: "",
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "#A9C1FD",
                    borderColor: "#A9C1FD",
                    borderWidth: 0,
                    data: data,

                }
            ]
        };

        new Chart(ctx, {
            type: 'bar',
            options: smallChartOptions,
            data: smallchartdata
        });
    }
}

function createSmallLineChart(timeType, chartId, labels, data) {
    // console.log(chartId + ' labels ' + labels + ' data ' + data);
    let canvasDiv = $('#last' + timeType + 'ChartContainer' + chartId);
    // console.log('lastYearChartContainer' + chartId + canvasDiv.html());
    if (!canvasDiv.html() || !canvasDiv.html().includes('canvas')) {
        canvasDiv.html('<canvas id="canvasLast' + timeType + 'Chart' + chartId + '" class="rowChart"></canvas>');
        var ctx = document.getElementById('canvasLast' + timeType + 'Chart' + chartId);
        var smallchartdata = {
            labels: labels,
            datasets: [
                {
                    // fill: true,
                    label: "",
                    lineTension: 0.3,
                    backgroundColor: "#336CFB",
                    borderColor: "#336CFB",
                    data: data,
                    yAxisID: 'y',
                    xAxisID: 'x'
                }
            ]
        };

        try {
            new Chart(ctx, {
                type: 'line',
                options: smallLineChartOptions,
                data: smallchartdata
            });
        } catch (e) {
            console.log('error creating chart id is ' + chartId + ' data is ' + data)
        }
    }
}

var smallLineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        tooltip: {
            boxPadding: 5,
            yAlign: "top",
            xAlign: "right",
            enabled: true,
        },
        legend: {
            display: false
        }
    },
    legend: {
        display: false
    },
    scales: {
        y: {
            reverse: true,
            ticks: {
                beginAtZero: true,
                precision: 0,
            },
            grid: {
                display: false,
                stepSize: 1,
                color: "#D7DBDE"
            }
        },
        x: {
            reverse: true,
            ticks: {
                reverse: true,
                beginAtZero: true,
                display: false
            },
            grid: {
                display: false
            }
        }
    },
}

function formatCheckedOrUnChecked(data) {
    return data && data == true ? "<p class=\"on-btn\">ON</p>" : "<p class=\"off-btn\">OFF</p>";
}

function initIconsData(rowsCount) {
    siteTable = $('#keywordsTable').DataTable();
    rowsCount = siteTable.rows().count();
    let sumRanks = 0, ranksFirstPage = 0, ranksInTop = 0, ranksUp = 0, ranksDown = 0;
    siteTable.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var row = this.data();
        // console.log('row ' + Object.values(row));
        sumRanks += Number(row.currentPosition);
        // console.log('sumRanks ' + sumRanks + ' curr pos ' + row.currentPosition);
        if (row.currentPosition <= 10) {
            ranksFirstPage++;
            if (row.currentPosition <= 10) {
                ranksInTop++;
            }
        }
        if (row.currentPosition < row.daysAgo1 && row.daysAgo1 !== 0) {
            ranksUp++;
        } else if (row.currentPosition > row.daysAgo1 && row.daysAgo1 !== 0) {
            ranksDown++;
        }
    });

    $('#trackedKeywords').html(rowsCount);
    if (rowsCount > 0) {
        $('#trackedRanksInTop').html(ranksInTop);
        $('#trackedKeywordsUp').html(ranksUp);
        $('#trackedKeywordsDown').html(ranksDown);
        const avgPos = (sumRanks / rowsCount).toFixed(2);
        $('#trackedKeywordsAvgPos').html(avgPos);
        if (avgPos > 80 && rowsCount < 5) {
            $('#competitiveKeywordsWarningDiv').toggle(1000);
        }
    } else {
        $('#trackedRanksInTop').html("-");
        $('#trackedKeywordsUp').html("-");
        $('#trackedKeywordsDown').html("-");
        $('#trackedKeywordsAvgPos').html("-");

        // let trigger = document.getElementById('landingDropdown')
        // document.getElementById('addNewKeywordLink').addEventListener("click", (e)=>{
        //     bootstrap.Dropdown.getOrCreateInstance(trigger).toggle()
        // });
    }
}

var keywordsRowsCount;

function doKeywordDelete(id, tr) {
    $.ajax({
        type: 'POST',
        url: getApiUrl('editKeywordForWebsite'),
        data: getPostParams('oper=del&id=' + id),
        success: function (result) {
            console.log(JSON.stringify(result));
            if (result.status) {
                showModal("Message", result.status, "Close", "");
            } else {
                siteTable.rows(tr).remove().draw();
                $("#keywordOverview" + id).hide();
                if (isRabbitUI) {
                    fadeModalWithTime("", "Keyword Removed", 1000,true);
                } else {
                    fadeModal("Keyword Deleted", "");
                }
                initIconsData();
                refreshUsage();
                createKeywordsSelect(keywordsMax - keywordsUsed);
            }
        }
    });
}

deleteKeyword = async (id) => {
    var $target = $(event.target);
    var tr = $target.closest('tr');
    if (isConfirmDelete()) {
        showModal('Confirm', 'Are you sure you want to delete this keyword?', 'No', 'Yes');
        $('div#modalMessage button#modalSecondButton').click(function () {
            confirmDelete = false;
            doKeywordDelete(id, tr);
        });
    } else {
        doKeywordDelete(id, tr);
    }
}

function refreshKeywordTable() {
    loadKeywordTable(false);
    refreshUsage();
}

function keywordsTableClick() {
    const td = $(event.target).closest('td')[0];
    if (td) {
        let tdHtml = td.innerHTML;
        if (!tdHtml || (!tdHtml.includes('star') && !tdHtml.includes('ignoreme') && !tdHtml.includes('needToRefresh'))) {
            let row = siteTable.row($(event.target).closest('tr'));
            loadKeywordOverviewData(row);
        }
    }
}

function loadKeywordOverviewData(row) {
    if (payingUser || true) {
        keywordId = row.id();
        keywordRowData = row.data();
        // console.log('start loadKeywordOverviewData seoly? ' + (isSEOlyUser() || isSeolyUI));
        if (isSEOlyUser() || isSeolyUI) {
            if (isOpenBelowTable() && siteTable.rows().count() < 10) {
                $.get('/assets/htmls/keywordOverview.html', function (data) {
                    // console.log(data);
                    data = "<div id='keywordOverview" + keywordId + "'>" + data + "</div>";
                    $('#keywordsOverviewDiv').html(data);
                });
            } else {
                if (row.child.isShown()) {
                    row.child.hide();
                } else {
                    $.get('/assets/htmls/keywordOverview.html', function (data) {
                        // console.log(data);
                        data = "<div id='keywordOverview" + keywordId + "'>" + data + "</div>";
                        row.child(data, 'childClass').show();
                    });
                }
            }
        } else {
            $.get('/assets/htmls/keywordOverview.html', function (data) {
                data = "<div id='keywordOverview" + keywordId + "'>" + data + "</div>";
                openModalHtml('appDataModal', data);
                // $('#appDataModal div.modal-body').html(data);
                // $('#appDataModal').modal('show');
                // $('div#appDataModal button#modalSecondButton').click(function () {
                //     $('#modalMessage').modal('hide');
                // });
            });
        }
    } else {
        showUpgradeModal('Upgrade your account to get more results, would you like to upgrade now?');
    }
}

function saveKeyword() {
    let json = getFormDValues(keywordForm);
    console.log("keywords form " + JSON.stringify(json));
    // console.log("$('#keywordTermSelect').val() " + $('#keywordTermSelect').val().toString().trim().length);
    // console.log("$('#keywordTermSelect').val() " + $('#keywordTermSelect').val().length);
    if ($('#keywordTermSelect').val().toString().trim().length > 0) {
        json = 'newSearchEngine=' + $('#searchEngineSelect').val() +
            '&device=' + $('#device').val() +
            '&newKeyword2=' + encodeURIComponent($('#keywordTermSelect').val()) +
            '&sessionId=' + mainUserDetails['sessionId'];
    }
    console.log("keywords form after " + JSON.stringify(json));

    $.ajax({
        type: 'POST',
        url: getApiUrl('saveNewKeywordForWebsite'),
        data: json,
        success: function (result) {
            if (result.status == 'added') {
                if (isRabbitUI) {
                    fadeModalWithTime("", "Keywords were added successfully<br />It can take few seconds until you can see live results!", 5000,true);
                    $('#addNewKeywordsModal').prev().dropdown('hide');
                } else {
                    $('#keywordsAddedDiv').show();
                }

                refreshKeywordTable();
                $('#keywordTerm').val('');
                $('#keywordTermSelect').val(null).trigger('change');
                $('#linkKeywordSelect').val(null).trigger('change');
                // $('#keywordTermSelect').empty().trigger('change');
                // $('.linkKeywordSelect').empty().trigger('change');
                historyPushState('add-new-keyword-success', 'Add New Keyword Success');
            } else if (result.status == 'limit') {
                showUpgradeModal(keywordsLimitUpgrade);
                historyPushState('add-new-keyword-limit', 'Add New Keyword Limit');
            } else {
                showModal("Message", result.status, "Close", "");
                historyPushState('add-new-keyword-error', 'Add New Keyword Error');
            }
            // console.log('success ' + JSON.stringify(result));
        },
        complete: function (result) {
            // console.log('complete ' + JSON.stringify(result));
        }
    });
}

function saveNewKeyword(keyword) {
    $('#similarKeywordAddedDiv').hide();
    $.ajax({
        type: 'POST',
        url: getApiUrl('saveNewKeywordForWebsite?newKeyword=' + keyword),
        success: function (result) {
            if (result.status == 'added') {
                $('#similarKeywordAddedDiv').show();
                refreshKeywordTable();
                historyPushState('save-new-keyword-success', 'Add New Keyword Success');
            } else if (result.status == 'limit') {
                showUpgradeModal(keywordsLimitUpgrade);
            } else {
                showModal("Message", result.status, "Close");
            }

        }
    });
}

function hideRanksExplorer() {
    console.log('isAddedToMyWebsites ' + isAddedToMyWebsites)
    $('#keywordSuggestions').hide();
    $('#keywordForm').show();
    $('#rankedKeywords tbody').html('No results found for this website');
    if (isAddedToMyWebsites) {
        $('#ranksExplorer').hide();
    }
}

function createDashboardCharts(organic, paid) {
    var xValue_organic = [];
    var yValue_organic = [];
    var xValue_paid = [];
    var yValue_paid = [];
    for (const key in organic) {
        if (key.includes('pos') && key.indexOf('pos') == 0) {
            xValue_organic.push(key.slice(4));
            yValue_organic.push(organic[key]);
        }
    }
    for (const key in paid) {
        if (key.includes('pos') && key.indexOf('pos') == 0) {
            xValue_paid.push(key.slice(4));
            yValue_paid.push(paid[key]);
        }
    }
    // chart colors
    var colors = ['#007bff', '#28a745', '#444444', '#c3e6cb', '#dc3545', '#6c757d'];

    const organicChartObj = document.getElementById("organic_chBar");
    if (organicChartObj) {
        var chBar_organic = organicChartObj.getContext('2d'),
            gradient = chBar_organic.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#336CFB');
        gradient.addColorStop(1, '#A9C1FD');

        var chartData_organic = {
            labels: xValue_organic,
            datasets: [
                {
                    data: yValue_organic,
                    backgroundColor: gradient,
                    borderColor: "rgba(2,117,216,1)",
                    borderRadius: 4,
                }
            ]
        };

        if (chBar_organic) {
            if (organicChart) {
                organicChart.destroy();
            }
            organicChart = new Chart(chBar_organic, {
                type: 'bar',
                data: chartData_organic,
                options: {
                    plugins: {
                        legend: false,
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            barPercentage: 0.4,
                            categoryPercentage: 0.5,
                            "display": false,
                            "drawBorder": false
                        }
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: false
                                }
                            }
                        ]
                    },

                    title: {
                        display: true,
                        text: "Organic Chart"
                    }
                }
            });
        }
    }
}

function loadRanksExplorerFromJson(json) {
    $('#keywordSuggestionsLoading').hide();
    if (hasAlertToShow(json) || json.data === 'No results found') {
        // console.log('getMyJsonRankedKeywordsKeywordForWebsite got no results ');
        hideRanksExplorer();
        return;
    }
    var jsonExistingKeywords = json.list;
    json = JSON.parse(json['data']);
    // console.log('getMyJsonRankedKeywordsKeywordForWebsite ' + JSON.stringify(json));
    if (json && json.items_count && json.items_count > 0) {
        // console.log('getMyJsonRankedKeywordsKeywordForWebsite got results ' + json.items_count);
        rankedKeywordsJson = json;
        const totalCount = json.total_count;
        if (!isWebsiteOnboarding()) {
            // $('#ranksExplorerInfo').show();
            var organic = json["metrics"].organic;
            var paid = json["metrics"].paid;
            $('#total_count').append(nFormatter(totalCount, 2));
            $('#top1').html(nFormatter(organic.pos_1, 2));
            $('#top3').html(nFormatter(organic.pos_1 + organic.pos_2_3, 2));
            $('#top10').html(nFormatter(organic.pos_1 + organic.pos_2_3 + organic.pos_4_10, 2));
            $('#etv').html(nFormatter(organic.etv, 2));
            $('#is_new').html(nFormatter(organic.is_new, 2));
            $('#is_up').html(nFormatter(organic.is_up, 2));
            $('#is_down').html(nFormatter(organic.is_down, 2));
            $('#is_lost').html(nFormatter(organic.is_lost, 2));
            if (paid != null) {
                $('#paid_top1').html(nFormatter(paid.pos_1, 2));
                $('#paid_top3').html(nFormatter(paid.pos_1 + paid.pos_2_3, 2));
                $('#paid_top10').html(nFormatter(paid.pos_1 + paid.pos_2_3 + paid.pos_4_10, 2));
                $('#paid_etv').html(nFormatter(paid.etv, 2));
                $('#paid_is_new').html(nFormatter(paid.is_new, 2));
                $('#paid_is_up').html(nFormatter(paid.is_up, 2));
                $('#paid_is_down').html(nFormatter(paid.is_down, 2));
                $('#paid_is_lost').html(nFormatter(paid.is_lost, 2));
            }
            createDashboardCharts(organic, paid);
        } else {
            $('#ranksExplorerInfo').hide();
        }

        var html1 = '';
        var currItem = '';

        if (jsonExistingKeywords && jsonExistingKeywords != 'undefined') {
            for (let j = 0; j < jsonExistingKeywords.length; j++) {
                existingKeywordsList.push(jsonExistingKeywords[j]);
            }
        }
        // console.log('jsonExistingKeywords ' + existingKeywordsList);
        keywordItems = json.items;
        // let lengthToLoop = keywordItems.length;
        // let lengthToLoop = keywordItems.length > 100 ? 100 : keywordItems.length;
        let lengthToLoop = payingUser === false && keywordItems.length > 100 ? 100 : keywordItems.length;
        var i = 0;
        while (i < keywordItems.length) {
            // for (var i = 0; i < lengthToLoop; i++) {
            currItem = keywordItems[i];
            var url = currItem["ranked_serp_element.serp_item.relative_url"];
            // var decodedUrl = url;
            var decodedUrl = decodeURI(url);
            // console.log('decodeURI' + url + ": " + decodedUrl);

            let keywordAlreadyExist = -1;
            if (existingKeywordsList.length > 0) {
                keywordAlreadyExist = existingKeywordsList.indexOf(currItem["keyword_data.keyword"]);
            }
            // if (keywordAlreadyExist != -1) {
            //     console.log("keyword " + currItem["keyword_data.keyword"] + " exists: " + keywordAlreadyExist);
            // }
            if (keywordAlreadyExist == -1 || !hideExistingKeywords) {
                i++;
                html1 += '<tr style="cursor: pointer">' +
                    '<td style="display: none" class=" dt-control" rowId=' + i + '>' + (i + 1) + '</td>' +
                    '<td class="ignoreme">' + (keywordAlreadyExist == -1 ? '<a  style="cursor: pointer" class="btn btn-outline-light addkey" id="' + currItem['keyword_data.keyword'] + '" onclick="addCurrKeywordTrack(this)"><i class="fas fa-plus"></i></a>' :
                        '<a style="cursor: none" class="btn btn-outline-light addkey active" id="' + currItem['keyword_data.keyword'] + '" ><i class="fas fa-check active"></i></a>') + '</td>' +
                    '</tr>';
                if (suggestedKeywords.indexOf(currItem['keyword_data.keyword']) == -1) {
                    suggestedKeywords.push(currItem['keyword_data.keyword']);
                }
            } else {
                keywordItems.splice(i, 1);
            }
        }

        // console.log("keywordItems " + JSON.stringify(keywordItems));
        let contDiv = showingCompNow ? '#appDataModal ' : '';
        rankedKeywords = $(contDiv + '#rankedKeywords').DataTable({
            "datatype": "json",
            "data": keywordItems,
            "columns": [
                {
                    data: ["keyword_data.keyword"],
                    render: function (data, type, row, meta) {
                        return isSeolyUI ?
                            '<a style="cursor: pointer" class="ignoreme btn btn-outline-light addkey" id="' + data + '" onclick="addCurrKeywordTrack(this, ' + meta.row + ')"><i class="fas fa-plus"></i></a>' :
                            '<a style="cursor: pointer" class="ignoreme addNewKeyword" id="' + data + '" onclick="addCurrKeywordTrack(this, ' + meta.row + ')">Add</a>';
                        ;
                    },
                    visible: true
                },
                {
                    "data": ["keyword_data.keyword"],
                    "name": "keyword_data.keyword",
                    "tooltip": getTranslationWord("Indicates the keyword that your website is already ranked for"),
                    "title": "Keyword",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        // return data;
                        return (!payingUser && rankedKeywordUrl && rankedKeywordUrl === 'amazon.com') ? 'Upgrade to see' : data;
                    }
                },
                {
                    "data": ["ranked_serp_element.serp_item.rank_absolute"],
                    "name": "ranked_serp_element.serp_item.rank_absolute",
                    "tooltip": getTranslationWord("Indicates the last rank (position in google) found for that keyword"),
                    "title": "Rank",
                    "defaultContent": "",
                    'visible': true,
                },
                {
                    "data": ["keyword_data.keyword_info.search_volume"],
                    "name": "keyword_data.keyword_info.search_volume",
                    "title": "Search Volume",
                    "defaultContent": "",
                    "tooltip": getTranslationWord("Indicates the (approximate) number of monthly searches for the given keyword on google"),
                    'visible': true,
                    render: function (data, type, row) {
                        if (type === 'display' || type === 'filter') {
                            return nFormatter(data, 2);
                        } else {
                            return data
                        }
                    }
                },
                {
                    "data": ["keyword_data.location"],
                    "name": "keyword_data.location",
                    "title": "Location",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        let val;
                        // console.log('data ' + data)
                        // console.log('row[\'keyword_data.locationFlag\'] ' + row['keyword_data.locationFlag'])
                        if (formatNotEmptyVal(data) === '' || data === 'OK') {
                            val = mainUserDetails["countryName"];
                        } else {
                            if (row['keyword_data.locationFlag'] && row['keyword_data.locationFlag'].indexOf('http') !== -1) {
                                val = '<img style="height: 20px; margin-right: 10px;" src="' + row['keyword_data.locationFlag'] + '" />' + data;
                            } else {
                                val = data;
                            }
                        }
                        return val;
                    }
                },
                {
                    "data": ["ranked_serp_element.serp_item.etv"],
                    "name": "ranked_serp_element.serp_item.etv",
                    "title": "EOT",
                    "tooltip": getTranslationWord("Indicates the Estimated Organic monthly Traffic to the domain calculated as the product of CTR (click-through-rate) and search volume values of the returned keyword"),
                    "defaultContent": "",
                    'visible': !inOnboardingNow && !isExternalUser(),
                    render: function (data, type, row) {
                        return nFormatter(data, 2);
                    }
                },
                {
                    "data": ["ranked_serp_element.keyword_difficulty"],
                    "name": "ranked_serp_element.keyword_difficulty",
                    "tooltip": getTranslationWord("Indicates the chance of getting in top-10 organic results for a keyword on a logarithmic scale from 0 to 100, where 1 is easy and 100 is extremely hard"),
                    "title": "Difficulty",
                    "defaultContent": "",
                    'visible': !inOnboardingNow && !isSeolyUI,
                    render: function (data, type, row) {
                        return formatNumber(data);
                    }
                },
                {
                    "data": ["keyword_data.keyword_info.competition"],
                    "name": "keyword_data.keyword_info.competition",
                    "tooltip": getTranslationWord("Indicates the relative amount of competition associated with the given keyword"),
                    "title": "Competition",
                    "defaultContent": "",
                    'visible': !inOnboardingNow,
                    render: function (data, type, row) {
                        return data ? (formatNumberGreenLowPercent(data * 100, 50, 80)) : '';
                    }
                },
                {
                    "data": ["keyword_data.keyword_info.cpc"],
                    "name": "keyword_data.keyword_info.cpc",
                    "tooltip": getTranslationWord("Indicates the average cost per click (USD) historically paid for the given keyword"),
                    "title": "CPC",
                    "defaultContent": "",
                    'visible': !inOnboardingNow && !isExternalUser(),
                    render: function (data, type, row) {
                        return formatNumber(data);
                    }
                },
                {
                    "data": ["ranked_serp_element.se_results_count"],
                    "name": "ranked_serp_element.se_results_count",
                    "tooltip": getTranslationWord("Indicates the number of search results returned for the given keyword"),
                    "title": "Results",
                    "defaultContent": "",
                    'visible': !inOnboardingNow && !isExternalUser(),
                    render: function (data, type, row) {
                        return formatNumber(data);
                    }
                },
                {
                    "data": ["ranked_serp_element.serp_item.relative_url"],
                    "name": "ranked_serp_element.serp_item.relative_url",
                    "tooltip": getTranslationWord("Indicates the landing page google directs for the given keyword"),
                    "title": "Landing Page",
                    "defaultContent": "",
                    'visible': true,
                    render: function (data, type, row) {
                        // const url = decodeURI(data);
                        // return url && url === '/' ? 'Homepage' : getFormattedExternalUrl(url);
                        return getFormattedExternalUrl(rankedKeywordUrl + url);
                        // return url && url === '/' ? 'Homepage' : url;
                    }
                },
                {
                    "data": ["keyword_data.keyword_info.monthly_searches"],
                    "name": "keyword_data.keyword_info.monthly_searches",
                    "title": "Results",
                    "defaultContent": "",
                    'visible': false,
                },
            ],
            destroy: true,
            "language": {
                "emptyTable": "No keywords found"
            },
            "rowCallback": function (row, data, index) {
            },
            buttons: ['copy', 'excel', 'print', {
                extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
            }],
            "dom": '<"dt-buttons"Bf><"clear">firtlp',
            // info: false,
            // responsive: true,
            // "bFilter": true,
            // fixedHeader: true,
            // select: true,
            // deferRender: true,
            // paging: lengthToLoop > 100,
            // scrollY: lengthToLoop > 100 ? (isWebsiteOnboarding() ? 400 : 700) : "",
            // scrollCollapse: true,
            // scroller: lengthToLoop > 100,
            info: false,
            fixedHeader: false,
            deferRender: true,
            paging: false,
            "bFilter": true,
            "aoColumnDefs": [{
                "searchable": false,
                "targets": [0]
            }],
            columnDefs: [{
                // targets: 2,
                // createdCell: function (td, cellData, rowData, row, col) {
                //     $(td).css('white-space', 'initial');
                // }
            }],
            "drawCallback": function () {
                // drawGridCharts(this);
            },
            "initComplete": function (settings, json) {
                $('#refreshLoading').hide();
                rankedKeywords = $(contDiv + '#rankedKeywords').DataTable();
                const rowsCount = rankedKeywords.rows().count();
                console.log('rowsCount ' + rowsCount);
                console.log('rowsToHideForFree ' + rowsToHideForFree);
                if (totalCount > 200) {
                    if (rowsCount != totalCount) {
                        $('#listedItemsCount').html(rowsCount + ' ' + getTranslationWord('Listed Keywords') + ' | ' + nFormatter(totalCount, 2) + ' ' + getTranslationWord('Total Keywords'));
                    } else {
                        $('#listedItemsCount').html(rowsCount + ' ' + getTranslationWord('Listed Keywords'));
                    }
                } else {
                    $('#listedItemsCount').html(rowsCount + ' ' + getTranslationWord('Listed Keywords'));
                }
                if (totalCount > rowsToHideForFree && !demoAccount) {
                    hideRestRows("rankedKeywords", rowsToHideForFree);
                }

                if (rowsCount > 0) {
                    adjustExportButtons(isSeolyUI ? 'keywordsTableSearch' : 'tableSearch', rankedKeywords);
                    // initShowHideColumns('rankedKeywords', rankedKeywords);
                    enableTooltips();
                }
                if (inOnboardingNow) {
                    if (rowsCount > 3) {
                        // $('#keywordForm').hide();
                        // $('.stepperFormNext').show();
                        $('.hideOnboarding').hide();
                    } else {
                        hideRanksExplorer();
                    }
                } else {
                    if (!payingUser && rankedKeywordUrl && rankedKeywordUrl === 'amazon.com') {
                        $(contDiv + '.upgradeBlock').attr("onclick", upgradeLink);
                        $(contDiv + '.upgradeBlock').show();
                        $(contDiv + '#rankedKeywords').css('opacity', 0.3);
                    }
                }
            }
        });

        if (suggestedKeywords.length > 0) {
            // console.log('suggestedKeywords ' + JSON.stringify(suggestedKeywords));
            if (isSEOlyUser()) {
                loadKeywordsSuggestions();
            } else {
                loadAddKeywordsSelect();
            }
        } else {
            $('#keywordSuggestions').show();
            $('#keywordSuggestionsNextButton').show();
        }

        $("#rankedKeywordDiv").click(function () {
            $('html, body').animate({
                scrollTop: $("#keywordSuggestionsDiv").offset().top
            }, 500);
        });
    } else {
        hideRanksExplorer();
        $('#ranked-keywords-list').hide();
    }
    $('#rankedKeywords').on('click', 'tbody tr', function (e) {
        // $('#rankedKeywords').on('click', 'tbody td.dt-control', function () {
        var tr = $(this).closest('tr');
        var td = $(e.target).closest('td');
        var row = rankedKeywords.row(tr);
        // console.log('td is ' + td.html());
        if (!td.hasClass('ignoreme') && !td.html().includes('ignoreme')) {
            if (row.child.isShown()) {
                row.child.hide();
            } else {
                var d = row.data();
                var formattedInnerRow = format(d);
                row.child(formattedInnerRow, 'childClass').show();

                var chartId = "chartRankKeyword" + (d[0] - 1);
                var ctx = document.getElementById(chartId).getContext("2d");
                ctx.canvas.height = 300;
                ctx.canvas.width = "100%";
                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: xValues,
                        datasets: [
                            {
                                label: "Search Volume History",
                                fill: false,
                                lineTension: 0,
                                backgroundColor: "#EBF0FF",
                                borderColor: "#336CFB",
                                borderWidth: 1,
                                data: yValues
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        legend: {display: false},
                    }
                });
            }
        }

    });
    return json;
}

let rankedKeywordUrl;

function loadRanksExplorer() {
    rankedKeywordUrl = getMyUrlOrComp();
    console.log(apiUrl + 'getMyJsonRankedKeywordsKeywordForWebsite?&url=' + rankedKeywordUrl);
    $.getJSON(getApiUrl('getMyJsonRankedKeywordsKeywordForWebsite?&url=' + rankedKeywordUrl), function (json) {
        // console.log('getMyJsonRankedKeywordsKeywordForWebsite ' + JSON.stringify(json));
        loadRanksExplorerFromJson(json);
    })
}

function format(d) {
    // console.log(JSON.stringify(d));
    var monthlySearches = d["keyword_data.keyword_info.monthly_searches"];
    // var monthlySearches = rankedKeywordsJson.items[d[0] - 1]["keyword_data.keyword_info.monthly_searches"];
    if (monthlySearches) {
        xValues = [];
        yValues = [];
        for (var i = 0; i < monthlySearches.length; i++) {
            var curr = monthlySearches[i];
            xValues.push(curr["month"] + "-" + curr["year"]);
            yValues.push(curr["search_volume"]);
        }
    }
    return "<div class='card page-card key-child-card'>\n\
                <div class='card-body'>\n\
                    <canvas id='chartRankKeyword" + (d[0] - 1) + "' width='100%'></canvas >\n\
                </div>\n\
                </div>"
    // return "<div class='card page-card key-child-card'>\n\
    //         <div class='card-body'>\n\
    //             <div class='d-flex justify-content-between'>\n\
    //                 <div class='childtableTitle'>Search Volume Per Month</div>\n\
    //                 <div class='d-flex childTab'>\n\
    //                     <a href='javascript:;' class='childTabbtn active'>Google</a> \n\
    //                     <a href='javascript:;' class='childTabbtn'>Bing</a> \n\
    //                 </div>\n\
    //             </div>\n\
    //             <canvas id='chartRankKeyword" + (d[0] - 1) + "' width='100%'></canvas >\n\
    //         </div>\n\
    //         </div>"
}

function createKeywordsSelect(keywordsToAdd) {
    console.log('createKeywordsSelect keywordsToAdd ' + keywordsToAdd)
    const placeholder = 'Enter keywords you want to promote' + (suggestedKeywords.length > 1 ? ' or choose from the list' : '');
    $("#keywordTermSelect").select2({
        tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: suggestedKeywords, tags: true,
        // maximumSelectionLength: keywordsToAdd === 0 ? 1 : keywordsToAdd,
        placeholder: placeholder,
        searchInputPlaceholder: placeholder
    });
    console.log('end createKeywordsSelect')
}

function loadKeywordsPairList() {
    if (isDev()) {
        let data = '{"data":null,"list":[{"id":"755830","text":"Window Cleaning Service Fort Myers"},{"id":"755832","text":",window cleaning fort myers"},{"id":"755831","text":",pressure cleaning fort myers"},{"id":"755828","text":"roof cleaners fort myers (Desktop)"},{"id":"755829","text":"roof-cleaning fort myers (Desktop)"},{"id":"756065","text":"Diversified Window & Pressure Cleaning"},{"id":"756066","text":"window cleaner fort myers"},{"id":"756067","text":"diversified windows"},{"id":"756068","text":"roof cleaning fort myers fl"},{"id":"756069","text":"cheap moving and hauling in baltimore"},{"id":"756070","text":"baltimore hauling"},{"id":"756072","text":"junk removal dundalk"},{"id":"756073","text":"junk removal towson"},{"id":"756074","text":"junk removal perry hall"},{"id":"756075","text":"junk removal near me"}],"list2":null,"map":null,"map2":null,"obj":null,"page":0,"records":0,"rows":0,"sidx":null,"sord":null,"status":null,"total":0}';
        loadKeywordsPairListFromJson(JSON.parse(data));
    } else {
        $.ajaxSetup({
            async: false
        });
        $.getJSON(getApiUrl('getMyJsonKeywordsPairListKeywordForWebsite?url=' + $('#inputSearchWebsite').val()), function (json) {
            // console.log('getMyJsonKeywordsPairListKeywordForWebsite ' + JSON.stringify(json));
            loadKeywordsPairListFromJson(json);
            if (isSeolyUI) {
                showCompetitors();
            } else {
                fetchComps();
            }
        });
        $.ajaxSetup({
            async: true
        });
    }
}

function showCompetitors() {
    const keywordIds = $(".keywordIdsList").val();
    // const url = apiUrl + 'getMyJsonTopCompsWebsite';
    const url = getApiUrl('getMyJsonTopCompsWebsite?keywordIds=' + keywordIds);
    console.log('showCompetitors url ' + url);
    $.getJSON(url, function (json) {
        console.log('getMyJsonTopCompsWebsite ' + JSON.stringify(json.list));
        $('#compsList').html('');
        let comps = json.list;
        let currHtml = '';
        for (let i = 0; i < comps.length; i++) {
            let currComp = comps[i][0];
            currHtml = '<div class="alert alert-primary">' +
                '<span>Name: ' + currComp + '</span><br />' +
                '<span>Url:  ' + comps[i][7] + '</span><br />' +
                '<span>Title: ' + comps[i][8] + '</span><br />' +
                '<span>Desc:  ' + comps[i][9] + '</span><br />' +
                '<span>Avg: ' + comps[i][6] + '</span><br />' +
                '<a data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="Keywords Research - This research will show you the keywords that your competitor is ranked for including information on the given keywords, you can find very useful information and new keywords that you can also easily promote here" href="javascript:showCompResearch(\'ranksExplorer\', \'' + currComp + '\', \' Keyword Research\')" class="btn btn-outline-primary pageBtn smallPageBtn">Competitor Ranked Keywords</a>' +
                '<a data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="Backlinks Research - This research will show you the backlinks that are leading to your competitor website" href="javascript:showCompResearch(\'linksAll\', \'' + currComp + '\', \'\')" class="btn btn-outline-primary pageBtn smallPageBtn"><span>Competitor Backlinks</span></a>' +
                '</div><br/><br/>';

            $('#compsList').append(currHtml);
        }
    });
}

function loadKeywordsPairListFromJson(json) {
    json = json['list'];
    // console.log('load keywordIdsList with ' + JSON.stringify(json));
    const placeholder = 'Choose keywords to filter competitors';
    $(".keywordIdsList").select2({
        tokenSeparators: [',', ', ', '\n'],
        selectOnClose: true,
        data: json,
        width: "100%",
        placeholder: placeholder,
        searchInputPlaceholder: placeholder,
        "language": {
            "noResults": () => 'You can only keywords from My Keywords tab (for those keywords we store competitors results)'
        },
    });
    selectAll('.keywordIdsList', true);
}

var searchEngineSelect;
var showKeywordsSelect = true;

function initKeywords() {
    console.log('initKeywords start')
    if (daysCount < 2) {
        $('#keywordsFirstRow').hide();
    }
    $('#addNewKeywordsBtn').html(getTranslationWord('<i class="fas fa-plus"></i> <span>Add New Keywords</span>'));
    $("#keywordForm").click(function (e) {
        e.stopPropagation();
    });
    refreshTryCount = 0;
    console.log('initKeywords call loadKeywordTable')
    loadKeywordTable(true);
    const keywordsToAdd = keywordsMax - keywordsUsed;
    console.log('initKeywords call createKeywordsSelect')
    createKeywordsSelect(keywordsToAdd);
    console.log('initKeywords call loadSearchEngineSelect')
    loadSearchEngineSelect();
    console.log('initKeywords call initCloudLocalization')
    initCloudLocalization();
}

function makeAjaxCallPopupResult(url) {
    $('#spinner-border').show();
    $.ajax({
        type: 'POST',
        url: getApiUrl(url),
        success: function (result) {
            $('#spinner-border').hide();
            if (result.status !== '') {
                showModal("Message", result.status, "Close", '');
                setTimeout(function () {
                    $('#modalMessage').modal('hide');
                }, 2000);
            }
        }
    });
}

function loadKeywordOverviewPerformance(json) {
    console.log('jsonByKeywordForWebsiteWebsiteGooglePosition ' + JSON.stringify(json));
    var html = ''
    json = json['list'];
    // json.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
    var xValue = [];
    var yValue = [];
    for (let i = 0; i < json.length; i++) {
        if (xValue.length < 12) {
            // console.log('xValue ' + JSON.stringify(xValue));
            // console.log('yValue ' + JSON.stringify(yValue));
            xValue.push(json[i].dateCreated);
            yValue.push(json[i].position);
        }
        let url = json[i].url;
        if (!url || url == 'undefined') {
            url = keywordRowData.pageUrl;
            // console.log(keywordRowData);
        }
        html += '<tr id="sub_' + json[i]['id'] + '">' +
            '<td>' + json[i].dateCreated + '</td>' +
            '<td><a href="' + addHttpsIfNeeded(url) + '" target="_blank" className="tableLink">' + url.replace("https://", "").replace("http://", "").replace("www.", "") + '</a></td>' +
            '<td>' + (json[i].position === 100 ? json[i].position + '+' : json[i].position) + '</td>' +
            '<td><a class="d-inline-block" title="Remove" onclick="deleteChildRow(' + json[i]['id'] + ', this)"><img src="/assets/images/icon/remove.png"></a></td>' +
            '</tr>';
    }


    $('#keywordOverview' + keywordId + ' .myPerformanceTbody').html(html);
    $("#keywordOverview" + keywordId + " .col:eq(1)").html('<canvas id="performanceChart' + keywordId + '" height="300"></canvas>');

    // console.log('xValue ' + xValue + ' yValue ' + yValue);
    var ctxChart = document.getElementById('performanceChart' + keywordId);
    var performanceChart = new Chart(ctxChart, {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                        color: "#D7DBDE"
                    }
                },
                x: {
                    reverse: true,
                    ticks: {
                        reverse: true,
                        beginAtZero: true
                    },
                    grid: {
                        display: true,
                    }
                },
            }
        },
        data: {
            // labels: ["11/25,2021", "11/27/2021", "12/01/2021", "12/02/2021"],
            labels: xValue,
            datasets: [{
                label: "My Ranks",
                backgroundColor: "#ffffff",
                borderColor: "#336CFB",
                borderWidth: 2,
                hoverBackgroundColor: "#ffffff",
                hoverBorderColor: "#336CFB",
                // data: [65, 59, 20, 81],
                data: yValue,
                yAxisID: 'y',
                xAxisID: 'x'
            }]
        }
    });
}