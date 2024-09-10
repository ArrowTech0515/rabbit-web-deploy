console.log('embed.js start')
function getAppGuid() {
    let guid = new URL(document.currentScript.src).searchParams.get("guid");
    return guid;
}
console.log('guid ---> ', getAppGuid());

// Ensure the window.realSite object is initialized
if (typeof window.realSite === 'undefined') {
    window.realSite = {};
}
if (typeof window.realSite[getAppGuid()] === 'undefined') {
    window.realSite[getAppGuid()] = true;
}

// Ensure the window.currentScript object is initialized
if (typeof window.currentScript === 'undefined') {
    window.currentScript = {};
}
if (typeof window.currentScript[getAppGuid()] === 'undefined') {
    window.currentScript[getAppGuid()] = new URL(document.currentScript.src);
}

// Ensure the window.currentLocation object is initialized
if (typeof window.currentLocation === 'undefined') {
    window.currentLocation = {};
}
if (typeof window.currentLocation[getAppGuid()] === 'undefined') {
    window.currentLocation[getAppGuid()] = new URL(location.href);
}

// Ensure the window.widgets object is initialized
if (typeof window.widgets === 'undefined') {
    window.widgets = {};
}
if (typeof window.widgets[getAppGuid()] === 'undefined') {
    window.widgets[getAppGuid()] = undefined;  // or some default value
}

// Ensure the window.userId object is initialized
if (typeof window.userId === 'undefined') {
    window.userId = {};
}
if (typeof window.userId[getAppGuid()] === 'undefined') {
    window.userId[getAppGuid()] = window.currentScript[getAppGuid()].searchParams.get("id");
}

// Ensure the window.addPoweredBy object is initialized
if (typeof window.addPoweredBy === 'undefined') {
    window.addPoweredBy = {};
}
if (typeof window.addPoweredBy[getAppGuid()] === 'undefined') {
    window.addPoweredBy[getAppGuid()] = false;
}

// Ensure the window.guid object is initialized
if (typeof window.guid === 'undefined') {
    window.guid = {};
}
if (typeof window.guid[getAppGuid()] === 'undefined') {
    window.guid[getAppGuid()] = window.currentScript[getAppGuid()].searchParams.get("guid");
}

// Ensure the window.app object is initialized
if (typeof window.app === 'undefined') {
    window.app = {};
}
if (typeof window.app[getAppGuid()] === 'undefined') {
    window.app[getAppGuid()] = window.currentScript[getAppGuid()].searchParams.get("app");
}

console.log('window.app ---> ', window.app[getAppGuid()]);

// Ensure the window.apiUrl object is initialized
if (typeof window.apiUrl === 'undefined') {
    window.apiUrl = {};
}
if (typeof window.apiUrl[getAppGuid()] === 'undefined') {
    window.apiUrl[getAppGuid()] = 'https://www.' + (window.app[getAppGuid()] && window.app[getAppGuid()].length > 0 ? window.app[getAppGuid()] : 'getleads.world') + '/';
}

// Ensure the window.cdnUrl object is initialized
if (typeof window.cdnUrl === 'undefined') {
    window.cdnUrl = {};
}
if (typeof window.cdnUrl[getAppGuid()] === 'undefined') {
    window.cdnUrl[getAppGuid()] = 'https://rabbit-web-deploy.onrender.com/';
}

if (location.toString().toLowerCase().indexOf("localhost:8080") !== -1) {
    window.apiUrl[getAppGuid()] = 'http://localhost:8080/';
} else if (location.toString().toLowerCase().indexOf("https://rabbit-web-deploy.onrender.com/") !== -1) {
    window.apiUrl[getAppGuid()] = 'https://rabbit-web-deploy.onrender.com/';
}

function preload(guid) {
    if (typeof jQuery != 'undefined') {
        console.log('timeout ------------ ', document.currentScript);      
        onLoad(guid);  
    } else {
        setTimeout(preload.bind(null, guid), 1000);
    }
}
console.log('*********************** ', typeof jQuery);
if (typeof jQuery == 'undefined') {
    const guid = getAppGuid();
    console.log('embed install jquery', guid);
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js', guid);
    setTimeout(preload.bind(null, guid), 1000);
} else {
    onLoad(getAppGuid());
}

function onLoad(guid) {
    console.log('embed currentScript is ' + window.currentScript[guid]);
    console.log('embed userId is ' + window.userId[guid]);

    if (window.userId[guid]) {
        logVisitor(guid, "Visit");
    }
}

function isTestingMode() {
    return location.toString().toLowerCase().indexOf("rabbitweb.test") !== -1 ||
        location.toString().toLowerCase().indexOf("127.0.0.1") !== -1 ||
        location.toString().toLowerCase().indexOf("localhost") !== -1;
}

function isMobile() {
    let mobile = false;
    if ("maxTouchPoints" in navigator) {
        mobile = navigator.maxTouchPoints > 0;
    }
    return mobile;
}

// actionType - Visit, Click, Submit
// widgetId - the widgetId of the widgets that user see or click or submit
// formData - if user submitted a form (contact us form etc..)
function logVisitor(guid, actionType, widgetId, formData) {
    console.log(typeof jQuery);
    console.log('logVisitor start actionType ' + actionType + ' widgetId ' + widgetId);
    let result;
    if (window.realSite[guid] && window.userId[guid] && window.guid[guid]) {
        let json = {};
        json['userId'] = window.userId[guid];
        json['guid'] = window.guid[guid];
        json['actionType'] = actionType;
        json['widgetId'] = widgetId;
        json['formData'] = JSON.stringify(formData);
        json['device'] = (isMobile() ? 'Mobile' : 'Desktop');
        // json['firstTime'] = isNewVisitor();
        json['pageTitle'] = $(document).find("title").text();
        json['url'] = location.href;
        let url = window.apiUrl[guid] + 'getMyJsonWebsiteWidgetsGuest';
        // let url = 'http://localhost:8080/getMyJsonWebsiteWidgetsGuest';
        console.log('logVisitor url is ' + url + ' data ' + JSON.stringify(json));

        $.ajax({
            url: url,
            dataType: 'json', async: false,
            type: 'POST', data: json,
            success: function (json) {
                result = json;
                console.log('embed result ' + JSON.stringify(json));
                if (json['obj'] && json['list']) {
                    window.widgets[guid] = json['list'];
                    window.addPoweredBy[guid] = json['obj2'] && json['obj2']['addPoweredBy'];
                    console.log('user widgets: ' + JSON.stringify(window.widgets[guid]));
                    loadScript('assets/embed/' + json['obj'] + 'Embed.js?guid='+guid, guid);
                }
            }
        });
    } else {
        return false;
    }
}

function sendEmail(guid, subject, text, widgetId) {
    if (realSite) {
        let result;
        let json = {};
        json['userId'] = window.userId[guid];
        json['guid'] = window.guid[guid];
        json['widgetId'] = widgetId;
        json['subject'] = subject;
        json['text'] = text;

        $.ajax({
            url: window.apiUrl[guid] + 'sendCustomEmailGuest',
            dataType: 'json', async: false,
            type: 'POST', data: json,
            success: function (json) {
                result = json;
                console.log('sendEmail result ' + JSON.stringify(json));
                return result;
            }
        });
    } else {
        return false;
    }
}

function visitorSubmit(guid, widgetId, formData) {
    // let userId = currentScript.searchParams.get("id");
    // let guid = currentScript.searchParams.get("guid");
    logVisitor(guid,  "Submit", widgetId, formData);
}
function visitorClick(guid, widgetId) {
    // let userId = currentScript.searchParams.get("id");
    // let guid = currentScript.searchParams.get("guid");
    logVisitor(guid, "Click", widgetId);
}

function loadScript(src, guid, onLoad) {
    console.log('start loadScript ' + src)
    if (src.indexOf('https://') === -1) {
        src = (isTestingMode() ? '/' : window.cdnUrl[guid]) + src;
    }
    console.log('loading now script ' + src);
    // const searchParams = new URL(document.currentScript.src).searchParams;
    // console.log('loadScript currentScript searchParams ' + searchParams)
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    // jqTag.src = src + "?" + searchParams;
    jqTag.src = src;
    if (onLoad) {
        jqTag.onload = onLoad;
    }
    console.log('jqTag ---> ', jqTag);
    headTag.appendChild(jqTag);
}
function loadCss(href, guid) {
    href = (isTestingMode() ? '/' : window.cdnUrl[guid]) + href;
    $('<link>')
        .appendTo('head')
        .attr({
            rel: 'stylesheet',
            href: href
        });
}

function uploadVisitorFile(guid, widgetId, userId) {
    let retVal;
    if (realSite) { // Input in html: <input type='file' name="fileInput" id="fileInput" onchange="uploadFile()">
        let formData = new FormData();
        formData.append('fileInput', fileInput.files[0]);
        formData.append('guid', guid);
        formData.append('widgetId', widgetId);
        formData.append('userId', userId);

        $.ajax({
            url: window.apiUrl[guid] + 'uploadUserFileGuest',
            method: 'POST',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log('uploadFile data ' + JSON.stringify(data));
                if (data['obj']) {
                    retVal = data['obj'];
                }
            }
        });
    } else {
        retVal = false;
    }
    return retVal;
}
// function isNewVisitor() {
//     let firstTimeUser = true;
//     // When a user visits your web-page
//     let timestamp = localStorage.getItem("myAppVisitTimestamp");
//
//     if (timestamp !== null) {
//         console.log('timestamp is ' + timestamp)
//         let date = new Date();
//         date.setTime(timestamp);
//         // taking visiting-gap as 15 minutes
//         let epochHour = 900;
//
//         // convert timestamp to seconds
//         let jsTimestamp = (date.getTime()) / 1000;
//         let currentTimestamp = (new Date().getTime()) / 1000;
//         console.log('jsTimestamp ' + jsTimestamp)
//         console.log('currentTimestamp ' + currentTimestamp)
//         const duration = currentTimestamp - jsTimestamp;
//         console.log('duration ' + duration);
//
//         // Mark visitor as returning if coming after the visiting-gap
//         if (duration < epochHour) {
//             firstTimeUser = false;
//         }
//         console.log('firstTimeUser ' + firstTimeUser);
//     } else {
//         // Save timestamp on first visit
//         timestamp = new Date().getTime();
//         localStorage.setItem("myAppVisitTimestamp", timestamp);
//     }
//     return firstTimeUser;
// }