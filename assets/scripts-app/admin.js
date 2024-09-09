var linksList;

$(document).ready(function () {
    console.log('start getMyJsonBuilderUsageLink');

    $.getJSON(apiUrl + '/getMyJsonBuilderUsageLink', function (data) {
        console.log('getMyJsonBuilderUsageLink json ' + JSON.stringify(data));
        if (data['obj']) {
            var array = data['obj']['daysList'];
            var newHTML = [];
            for (var i = 0; i < array.length; i++) {
                newHTML.push('<span>' + array[i][0] + ' - ' + array[i][1] + ' links</span><br />');
            }
            $(".linksByDay").append(newHTML.join(""));

            array = data['obj']['monthsList'];
            newHTML = [];
            for (var i = 0; i < array.length; i++) {
                newHTML.push('<span>' + array[i][0] + ' - ' + array[i][1] + ' links</span><br />');
            }
            $(".linksByMonth").append(newHTML.join(""));
        }

    });
    loadMonitoredLinks();
});

function submitLinkBuildForm() {
    const result = ajaxSubmitForm('buildLink');
    console.log('result' + result);
    handleResult(result);
}

function handleResult(result) {
    showModal("Message", result, "Close", "");
    loadMonitoredLinks();
    refreshUserDetails();
    setCompletedValues();
}

function uploadLink(curr) {
    // console.log("curr " + curr);
    const url = $("#" + curr).val();
    const data = getPostParams('currLink=' + curr.replace('url', '') + '&urls=' + encodeURIComponent(url));
    console.log('data ' + data);
    $.ajax({
        type: 'POST',
        url: apiUrl + 'buildLink',
        data: data,
        success: function (json) {
            console.log('success ' + JSON.stringify(json));
            handleResult(json.status);
        },
        async: false
    });
}

var jsonUrl = 'jsonByAwaitingLink';

function toggleCompleted() {
    if (jsonUrl === 'jsonByAwaitingLink') {
        jsonUrl = 'jsonByLiveLink';
    } else {
        jsonUrl = 'jsonByAwaitingLink';
    }
    loadMonitoredLinks();
}

function setCompletedValues() {
    $('#linksCount').html(mainUserDetails['linksRequestUsed']);
    $('#guestBlogsCount').html(mainUserDetails['guestBlogsUsed']);
    const amountBlogs = parseInt(mainUserDetails['guestBlogsUsed']) * 5;
    const amountLinks = parseInt(mainUserDetails['linksRequestUsed']) * 0.5;
    $('#amountToPay').html('$' + (amountLinks + amountBlogs));
}

function loadMonitoredLinks() {
    if (linksList) {
        linksList.destroy();
    }
    $.getJSON(apiUrl + jsonUrl + '?url=' + $('#inputSearchWebsite').val(), function (json) {
        // console.log('jsonLink is ' + JSON.stringify(json));
        if (!hasAlertToShow(json)) {
            var listLength = json['list'].length;
            linksList = $('#monitoringLinkTable').DataTable({
                "datatype": "json",
                "data": json['list'],
                rowId: 'id',
                "columns": [
                    {
                        "data": "href",
                        "name": "href",
                        "title": "Href",
                        "defaultContent": "",
                        'visible': true,
                        render: function (data, type, row) {
                            return getFormattedExternalUrl(data);
                        }
                    },
                    {
                        "data": "keywordName",
                        "name": "keywordName",
                        "title": "Keyword",
                        "defaultContent": "",
                        'visible': true,
                    },
                    {
                        "data": "dateCreated",
                        "name": "dateCreated",
                        "title": "Date",
                        "defaultContent": "",
                        'visible': false,
                        render: function (data, type, row) {
                            return getFormattedDate(data);
                        }
                    },
                    {
                        "data": "linkStatus",
                        "name": "linkStatus",
                        "title": "Status",
                        "defaultContent": "",
                        'visible': false,
                    },
                    {
                        "data": "orderLinkType",
                        "name": "orderLinkType",
                        "title": "Type",
                        "defaultContent": "",
                        'visible': true,
                        render: function (data, type, row) {
                            return (data === 'Guest Blog' ? '<span class="bold" style="color: orangered">Guest Blog</span>' : data);
                        }
                    },
                    {
                        "data": "domain",
                        "name": "domain",
                        "title": "Domain",
                        "defaultContent": "",
                        'visible': false,
                    },
                    {
                        "data": "businessName",
                        "name": "businessName",
                        "title": "Business Name",
                        "defaultContent": "",
                        'visible': true,
                    },
                    // {
                    //     "data": "email",
                    //     "name": "email",
                    //     "title": "Email",
                    //     "defaultContent": "",
                    //     'visible': true,
                    // },
                    {
                        "data": "category",
                        "name": "category",
                        "title": "Category",
                        "defaultContent": "",
                        'visible': true,
                    },
                    {
                        "data": "description",
                        "name": "description",
                        "title": "Description",
                        "defaultContent": "",
                        'visible': true,
                    },
                    {
                        "data": "location",
                        "name": "location",
                        "title": "Location",
                        "defaultContent": "",
                        'visible': true,
                    },
                    {
                        "data": "address",
                        "name": "address",
                        "title": "Address",
                        "defaultContent": "",
                        'visible': true,
                    },
                    {
                        "data": "highQuality",
                        "name": "highQuality",
                        "title": "Quality Link",
                        "defaultContent": "",
                        'visible': false,
                        render: function (data, type, row) {
                            if (type === 'display' || type === 'filter') {
                                return formatCheckedOrUnChecked(data);
                            }
                        }
                    },
                    {
                        "data": "userId",
                        "name": "userId",
                        "title": "Image",
                        "defaultContent": "",
                        'visible': true,
                        render: function (data, type, row) {
                            if (type === 'display' || type === 'filter') {
                                return data ? ("<a href=/UserLogo?pdfImage=true&id=" + data + " download='image" + data + ".jpg'>Download</a>") : "";
                            }
                        }
                    },
                    {
                        "data": "comment",
                        "name": "comment",
                        "title": "Comment",
                        "defaultContent": "",
                        'visible': true,
                    },
                    {
                        "data": "pageUrl",
                        "name": "pageUrl",
                        "title": "Page Url",
                        "defaultContent": "",
                        'visible': true,
                        render: function (data, type, row) {
                            if (jsonUrl === 'jsonByAwaitingLink') {
                                return '<input id="url' + row.id + '" class="form-control" type="text" placeholder="Page Url"><a href="javascript: uploadLink(\'url' + row.id + '\')">Submit Page</a>';
                            } else {
                                return getFormattedExternalUrl(data);
                            }
                        }
                    },
                ],
                // "order": [[1, "asc"]],
                destroy: true,
                buttons: ['copy', 'excel', 'print', {
                    extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL'
                }],
                "dom": '<"dt-buttons"Bf><"clear">firtlp',
                info: false,
                "bFilter": true,
                fixedHeader: true,
                deferRender: true,
                paging: listLength > 100,
                scrollY: 700,
                scrollCollapse: true,
                scroller: listLength > 100,
                "aoColumnDefs": [{
                    "searchable": false,
                    "targets": [0]
                }],
                "initComplete": function (settings, json) {
                }
            });
            initShowHideColumns('monitoringLinksTable', linksList);
            adjustExportButtons('tableSearch', linksList);
        } else {
            $('#link tbody').html("Create your first link now");
        }
        setCompletedValues();
    });
}