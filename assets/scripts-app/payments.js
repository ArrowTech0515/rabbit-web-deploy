function isShowAccounting() {
    return mainUserDetails['roleName'] === 'SuperAdmin' || mainUserDetails['roleName'] === 'Accounting';
}

$(document).ready(function () {
    showPaymentData();

    if (isShowAccounting()) {
        $.getJSON(apiUrl + 'getMyJsonByMonthPayment', function (data) {
            console.log('getMyJsonPaymentsByMonthPayment json ' + JSON.stringify(data));
            if (data['obj']) {
                var array = data['obj']['daysList'];
                var newHTML = [];

                array = data['obj']['monthsList'];
                newHTML = [];
                for (var i = 0; i < array.length; i++) {
                    newHTML.push('<span>' + array[i][0] + ' - $' + formatNumber(array[i][1]) + ' - ' + formatNumber(array[i][2]) + '₪ </span><br />');
                }
                $(".paymentsByMonth").append(newHTML.join(""));
            }
        });
        $('.payment-search').show();
        $('.payment-by-month').show();
    }
});
function showPaymentData() {
    paymentsTable = $('#paymentsTable').DataTable({
        "scrollCollapse": true,
        "serverSide": true,
        "ordering": true,
        "searching": true,
        "ajax": function ( data, callback, settings ) {
            setTimeout( function () {
                let query = getSearchAndOrder(data, 'email');
                const url = getPostParams(getApiUrl('jsonPayment?start=' + data.start + '&rows=' + Math.min(100,data.length) + query));
                console.log('url is ' + url)
                $.getJSON(url, function (json) {
                    console.log('json is ' + JSON.stringify(json))
                    $('.tableCount').html(json['records']);
                    // console.log('result is ' + JSON.stringify(json['list']))
                    callback( {
                        "draw": data.draw,
                        "data": json['list'],
                        "recordsTotal": json['records'],
                        "recordsFiltered": json['recordsFiltered']
                    });
                });
            }, 50 );
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
        order: [[5, 'desc']],
        "columns": [
            {"data": "id", "name": "id", "defaultContent": "", "title": "Download", "visible" : isShowAccounting(),
                render: function (data, type, row) {
                    // return data;
                    if (type === 'display' || type === 'filter') {
                        return "<a target='_blank' href='https://admin.rabbitseo.com/downloadInvoicePayment?id=" + data + "'>" + row.invoiceId + "</a>";
                    } else {
                        return data;
                    }
                },
            },
            {"data": "userEmail", "name": "userEmail", "defaultContent": "", "title": "Email", "visible" : isShowAccounting()},
            // {"data": "userEmail", "name": "userEmail", "defaultContent": "", "title": "Email", render: $.fn.dataTable.render.ellipsis(40)},
            {"data": "name", "name": "name", "defaultContent": "", "title": "Name", "visible" : isShowAccounting()},
            // {"data": "payerId", "name": "payerId", "defaultContent": "", "title": "Id"},
            // {"data": "paymentIp", "name": "paymentIp", "defaultContent": "", "title": "IP"},
            {"data": "paymentType", "name": "paymentType", "defaultContent": "", "title": "Source", "visible" : isShowAccounting()},
            {"data": "orderType", "name": "orderType", "defaultContent": "", "title": "Type"},
            {"data": "dateCreated", "name": "dateCreated", "defaultContent": "", "title": "Date",},
            {"data": "last4digits", "name": "last4digits", "defaultContent": "", "title": "4 Digits",},
            {"data": "expiryDate", "name": "expiryDate", "defaultContent": "", "title": "Exp. Date", "visible" : isShowAccounting()},
            // {"data": "invoiceId", "name": "invoiceId", "defaultContent": "", "title": "Invoice#",},
            {"data": "amount", "name": "amount", "defaultContent": "", "title": "Amount",},
            {"data": "amountNis", "name": "amountNis", "defaultContent": "", "title": "NIS Amount", "visible" : isShowAccounting()},
            {"data": "comment", "name": "comment", "defaultContent": "", "title": "Description", "visible" : isShowAccounting()},
            {"data": "id", "name": "id", "defaultContent": "", "title": "Download", "visible" : !isShowAccounting(),
                render: function (data, type, row) {
                    // return data;
                    if (type === 'display' || type === 'filter') {
                        return "<a target='_blank' href='https://www.rabbitseo.com/downloadInvoicePayment?id=" + data + "'>Download</a>";
                    } else {
                        return data;
                    }
                },
            },
        ],
        destroy: true,
        "language": {
            "emptyTable": "No payments found"
        },
        info: true,
        "bFilter": true,
        columnDefs: [{
            // "searchable": false,
            // targets: [0,1,2],
            // render: $.fn.dataTable.render.ellipsis(10)
        }],
        "initComplete": function (settings, json) {
            adjustExportButtons('keywordSearch', paymentsTable);
            thBreakLine = true;
            enableTooltips();
        }
    });
}