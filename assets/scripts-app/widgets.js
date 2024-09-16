let widgets;
let realSite = false;
// userProps - the custom parameters of widget
// live - if user save as a draft - false, if user click publish - true
// widgetId - if it's an update fill widgetId otherwise leave null
function createUpdateWidget(widgetType, userProps, live, isForm, widgetId, func) {
    let retVal;
    console.log('getApiUrl(\'createUpdateWidgetWebsite\') ' + getApiUrl('createUpdateWidgetWebsite'))

    const postParams = getPostParams('widgetType=' + widgetType + '&active=' + live + '&isForm=' + isForm +
        '&widgetId=' + widgetId + '&userProps=' + encodeURIComponent(JSON.stringify(userProps)));
    console.log('createUpdateWidget postParams ' + postParams)

    // $.getJSON(getApiUrl('createUpdateWidgetWebsite?' + postParams), function (data) {
    //     console.log('createUpdateWidget ' + JSON.stringify(data));
    // });

    $.ajax({
        type: 'POST',
        url: getApiUrl('createUpdateWidgetWebsite'),
        async: !!func,
        data: postParams,
        success: function (result) {
            console.log('createUpdateWidget result json ' + JSON.stringify(result));
            retVal = result;
            if (func) func(retVal);
            // if (result && result['obj']) {
            //     result = result['obj'];
            // }
        },
        error: function () {
            if (func) func(null); // Call the callback with null on error
        }
    });
    return func ? undefined : retVal;
}

/**
 * 
 * @param {*} func : callback function
 * @returns if func is null return widget list, if else return undefined and call callback function with the result.
 */
function getWidgetsList(func) {
    let obj = null;
    $.ajax({
        type: 'POST',
        url: getApiUrl('getMyJsonWidgetsWebsite'),
        async: !!func, // If func is provided, use async mode
        success: function (result) {
            console.log('getWidgetsList ' + JSON.stringify(result));
            widgets = result?.list || null; // Use optional chaining to safely access the list
            obj = result?.obj2 || null;
            if (func) func(widgets, obj); // If a callback function is provided, call it with the widgets
        },
        error: function () {
            if (func) func(null, null); // Call the callback with null on error
        }
    });

    // Return the widgets if async is false, otherwise return undefined
    return func ? undefined : widgets;
}

/**
 * 
 * @param {*} widgetId : 
 * @param {*} fromDate :
 * @param {*} toDate :
 * @param {*} orderBy : values - id, dateCreated, countryName, city, pageTitle, url, device (those are also the objects in the list)
 * @param {*} isAsc : for order by - true or false
 * @param {*} func : callback function
 * @returns if func is null return widget list, if else return undefined and call callback function with the result.
 */
function getVisitorsSubmissionsList(widgetId, fromDate, toDate, orderBy, isAsc, func) {
    let list;
    let json = {};
    json['widgetId'] = widgetId;
    json['fromDateVal'] = fromDate;
    json['toDateVal'] = toDate;
    json['orderBy'] = orderBy;
    json['isAsc'] = isAsc;

    $.ajax({
        type: 'POST',
        url: getApiUrl('getMyJsonVisitorsSubmissionsWebsite'),
        data: json,
        async: !!func, // If func is provided, use async mode
        success: function (result) {
            console.log('getVisitorsSubmissionsList ' + JSON.stringify(result));
            list = result?.list || null;
            if (func) func(list); // If a callback function is provided, call it with the list
        },
        error: function () {
            if (func) func(null); // Call the callback with null on error
        }
    });
    return func ? undefined : list;
}

// live - if user save as a draft - false, if user click publish - true
function toggleWidgetStatus(id, live) {
    $.getJSON(getApiUrl('toggleWidgetStatusWebsite?widgetId=' + id + '&active=' + live), function (data) {
        console.log('toggleWidgetStatus ' + JSON.stringify(data));
    });
}

function updateWidgetName(id, name) {
    $.getJSON(getApiUrl('updateWidgetNameWebsite?widgetId=' + id + '&name=' + name), function (data) {
        console.log('updateWidgetName ' + JSON.stringify(data));
    });
}


function deleteWidget(id) {
    $.getJSON(getApiUrl('deleteWidgetWebsite?widgetId=' + id), function (data) {
        console.log('deleteWidgetStatus ' + JSON.stringify(data));
    });
}

// fromDate and toDate format should be yyyy-MM-dd (can be null also)
// device - Can filter by device - All, Desktop, Mobile
function getWidgetsReportSummary(fromDate, toDate, widgetId, device, func) {
    let retVal;
    let json = {};
    json['widgetId'] = widgetId;
    json['fromDateVal'] = fromDate;
    json['toDateVal'] = toDate;
    json['device'] = device;
    json['hoursDiff'] = getHoursDifference();
    $.ajax({
        type: 'POST',
        async: !!func,
        url: getApiUrl('getMyJsonWidgetStatSummaryWebsite'),
        data: json,
        success: function (result) {
            retVal = result;
            if (func) func(retVal);
        },
        error: function () {
            if (func) func(null); // Call the callback with null on error
        }
    });
    return func ? undefined : retVal;
}

// groupBy values - Hour, Day, DayOfMonth, CountryName, City, Device, Url, PageTitle
// fromDate and toDate format should be yyyy-MM-dd (can be null also)
// device - Can filter by device - All, Desktop, Mobile
function getWidgetsReport(groupBy, fromDate, toDate, widgetId, device, includeChanges, func) {
    let retVal;
    let json = {};
    json['groupBy'] = groupBy;
    json['widgetId'] = widgetId;
    json['fromDateVal'] = fromDate;
    json['toDateVal'] = toDate;
    json['device'] = device;
    json['includeChanges'] = includeChanges;
    json['hoursDiff'] = getHoursDifference();
    console.log('calling getMyJsonWidgetStatWebsite async ' + !!func + ' params ' + JSON.stringify(json));

    $.ajax({
        type: 'POST',
        async: !!func,
        url: getApiUrl('getMyJsonWidgetStatWebsite'),
        data: json,
        success: function (result) {
            console.log('getMyJsonWidgetStat json ' + JSON.stringify(result));
            retVal = result;
            if (func) func(retVal);
        },
        error: function () {
            if (func) func(null); // Call the callback with null on error
        }
    });

    return func ? undefined : retVal;
}
