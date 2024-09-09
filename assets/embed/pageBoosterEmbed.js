const pageBoosterSearchParams = new URL(document.currentScript.src).searchParams;
let pageBoosterUserId = pageBoosterSearchParams.get("id");
let pageBoosterGuid = pageBoosterSearchParams.get("guid");
let pageBoosterPageId; // need to fill it when get page mappings or create page mappings (if it is first time)

function getPageMappings() {
    let result;
    console.log('getPageMappings start');
    if (pageBoosterUserId && pageBoosterGuid) {
        let json = {};
        json['userId'] = pageBoosterUserId;
        json['guid'] = pageBoosterGuid;
        json['pageUrl'] = location.href;
        let url = getPageBoosterUrl('getPageMappingsGuest');

        $.ajax({
            url: url,
            dataType: 'json',
            async: false,
            type: 'POST',
            data: json,
            success: function (json) {
                console.log('getPageMappings ' + JSON.stringify(json));
                if (json['obj']) {
                    result = json['obj'];
                    pageBoosterPageId = result['pageId'];
                    if (result['runOptimization']) {
                        // todo - Roman here you process the mappings you have saved before using createOrUpdatePageMappings()
                        // result['mappings']
                        // if mappings is empty needs to create them now (and also if user added a new image / css need to add to current mappings
                    }
                }
            }
        });
    }
    return result;
}

function createOrUpdatePageMappings(mappings) {
    let json = {};
    json['userId'] = pageBoosterUserId;
    json['guid'] = pageBoosterGuid;
    json['pageId'] = pageBoosterPageId;
    json['mappings'] = mappings;
    let url = getPageBoosterUrl('createOrUpdatePageMappingsGuest');

    $.ajax({
        type: 'POST',
        url: url,
        async: true,
        data: json,
        success: function (result) {
            console.log('createOrUpdatePageMappings result json ' + JSON.stringify(result));
        }
    });
}

function uploadCompressedFile() {
    let retVal;
    // Change to parameter or html element for example: <input type='file' name="fileInput" id="fileInput" onchange="uploadFile()">
    let formData = new FormData();
    formData.append('fileInput', fileInput.files[0]);
    formData.append('guid', pageBoosterGuid);
    formData.append('widgetId', pageBoosterPageId);
    formData.append('userId', pageBoosterUserId);

    $.ajax({
        url: getPageBoosterUrl('uploadUserFileGuest'),
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

    return retVal;
}

// after finished loading the page report to server the loading time of this page
function logVisitor(loadingTime, pageId) {
    console.log('logVisitor start loadingTime ' + loadingTime + ' pageId ' + pageId);
    if (pageBoosterUserId && pageBoosterGuid) {
        let json = {};
        json['userId'] = pageBoosterUserId;
        json['guid'] = pageBoosterGuid;
        json['actionType'] = 'LoadingTime';
        json['widgetId'] = pageId;
        json['loadingTime'] = loadingTime;
        json['device'] = (isMobile() ? 'Mobile' : 'Desktop');
        json['pageTitle'] = $(document).find("title").text();
        json['url'] = location.href;
        let url = getPageBoosterUrl('getMyJsonWebsiteWidgetsGuest');
        console.log('logVisitor url is ' + url + ' data ' + JSON.stringify(json));

        $.ajax({
            url: url,
            dataType: 'json',
            async: true,
            type: 'POST',
            data: json,
            success: function (json) {
                console.log('logVisitor ' + JSON.stringify(json));
            }
        });
    }
}

function isMobile() {
    let mobile = false;
    if ("maxTouchPoints" in navigator) {
        mobile = navigator.maxTouchPoints > 0;
    }
    return mobile;
}

function getPageBoosterUrl(apiName) {
    let host = location.toString().toLowerCase().indexOf("localhost") !== -1 ? 'http://localhost:8080/' : 'https://www.rabbitseo.com/';
    let url = host + apiName;
    console.log('getPageBoosterUrl ' + url)
    return url;
}
