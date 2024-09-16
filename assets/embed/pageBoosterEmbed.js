// Capture the time when the script first runs
const startTime = Date.now();

const pageBoosterSearchParams = new URL(document.currentScript.src).searchParams;
// let pageBoosterUserId = '4';
// let pageBoosterGuid = '5';
let totalImages = 0;
let missingImages = 0;
let optImages = pageBoosterSearchParams.get("ignoreOptimization") === null || pageBoosterSearchParams.get("ignoreOptimization") === 'false';
let errorImages = [];
let pageBoosterUserId = pageBoosterSearchParams.get("id");
let pageBoosterGuid = pageBoosterSearchParams.get("guid");
console.log('start pageBooster now pageBoosterUserId ' + pageBoosterUserId + ' pageBoosterGuid ' + pageBoosterGuid + ' optImages ' + optImages);

function getMinifiedLocation() {
    return location.href.replace('https://www.', '').replace('https://', '');
}

function getNewSrcFile(orgSrc) {
    let newSrc = orgSrc;
    if (orgSrc.indexOf('/') !== -1) {
        orgSrc = orgSrc.substring(orgSrc.lastIndexOf('/') + 1);
    }
    // console.log('booster getNewSrcFile orgSrc ' + orgSrc);
    newSrc = 'https://dlnil54eooeso.cloudfront.net/user-files/' + pageBoosterUserId + '/' + getMinifiedLocation() + orgSrc;
    // console.log('booster getNewSrcFile newSrc ' + newSrc);
    return newSrc;
}

function replaceMyImgs() {
    let images = document.getElementsByTagName("img");
    console.log('booster images ' + images.length)
    let backgroundImagesList = document.querySelectorAll('[style*="background-image"]');
    console.log('booster backgroundImagesList ' + backgroundImagesList.length)

    for (let i = 0; i < images.length && optImages; i++) {
        let orgSrc = images[i].src;
        let newSrc = getNewSrcFile(orgSrc);
        images[i].src = newSrc;
        images[i]['org-src'] = orgSrc;
        images[i].onerror = onImageError;
        totalImages++;
        if (missingImages >= (images.length / 5)) {
            console.log('booster stop opting images')
            optImages = false;
        }
        images[i].loading = "lazy"
    }

    for (let i = 0; i < backgroundImagesList.length && optImages; i++) {
        console.log('backgroundImagesList[i].id ' + JSON.stringify(backgroundImagesList[i].style))
        let orgSrc = backgroundImagesList[i].style.backgroundImage;
        let newSrc = getNewSrcFile(orgSrc);
        console.log('orgSrc ' + orgSrc + ' and newSrc ' + newSrc)
        backgroundImagesList[i].style.backgroundImage = 'url: (\'' + newSrc + '\'), url: (\'' + orgSrc + '\')';
        console.log('backgroundImagesList[i].style.backgroundImage after ' + JSON.stringify(backgroundImagesList[i].style.backgroundImage))
        totalImages++;
    }

    setTimeout(
        function() {
            console.log('booster missingImages ' + missingImages + ' 10% of total ' + (images.length / 5))
            if (missingImages >= (images.length / 5)) {
                processPageImages();
            }
            processErrorImages();
            logPageView();
        }, 4000);

    console.log('pageBooster totalImages ' + totalImages + ' missingImages ' + missingImages);
}
function onImageError() {
    console.log('pageBooster onImageError for orgSrc ' + this['org-src'] + ' new src was ' + this['src']);
    missingImages++;
    this['src'] = this['org-src'];
    this.onerror=null;
    errorImages.push(this['src']);
}

replaceMyImgs();
// window.onload = replaceMyImgs;

// Define variables to store timestamps
let domContentLoadedTime;
let pageLoadTime;
let imageLoadTimes = {};

document.addEventListener("DOMContentLoaded", () => {
    domContentLoadedTime = Date.now();
    console.log("Booster DOM fully loaded and parsed");
    console.log('Booster Time to DOMContentLoaded:' + domContentLoadedTime - startTime);
});

window.addEventListener("load", () => {
    pageLoadTime = Date.now();
    console.log("Booster Page fully loaded");
    console.log('Booster Time to Load: ' + pageLoadTime - startTime);

// Optional: Measure image load times
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
// Use a unique ID for each image to track its load time
        img.addEventListener('load', () => {
            imageLoadTimes[img.src] = Date.now() - startTime;
            console.log('Booster Image loaded: ' + img.src);
            console.log('Booster Time to Image Load: ' + imageLoadTimes[img.src] + ' ms since page load start');
        });
    });
});

let loadTime = startTime - window.performance.timing.navigationStart;
console.log('pageBooster loadTime ' + loadTime);

function processPageImages() {
    console.log('booster getPageMappings start');
    if (pageBoosterUserId && pageBoosterGuid) {
        let json = {};
        json['userId'] = pageBoosterUserId;
        json['guid'] = pageBoosterGuid;
        json['pageUrl'] = location.href;
        json['refreshAll'] = true;
        let url = getPageBoosterUrl('getSiteImagesSourcesGuest');
        loadXMLDoc(url + '?' + new URLSearchParams(json).toString());
    }
}

function processErrorImages() {
    console.log('booster processErrorImages start');
    if (pageBoosterUserId && pageBoosterGuid && errorImages.length > 0) {
        for (let i = 0; i < errorImages.length; i++) {
            let json = {};
            json['userId'] = pageBoosterUserId;
            json['guid'] = pageBoosterGuid;
            json['pageUrl'] = location.href;
            json['imgSrc'] = errorImages[i];
            let url = getPageBoosterUrl('getSingleImageGuest');
            loadXMLDoc(url + '?' + new URLSearchParams(json).toString());
        }
    }
}

// after finished loading the page report to server the loading time of this page
function logPageView() {
    console.log('logPageView start loadingTime ' + loadTime + ' location.href ' + location.href);
    if (pageBoosterUserId && pageBoosterGuid) {
        let json = {};
        json['userId'] = pageBoosterUserId;
        json['guid'] = pageBoosterGuid;
        json['actionType'] = 'LoadingTime';
        json['loadingTime'] = loadTime;
        json['missingImages'] = errorImages.length;
        json['device'] = (isMobile() ? 'Mobile' : 'Desktop');
        json['pageTitle'] = document.title;
        json['url'] = location.href;
        let url = getPageBoosterUrl('getMyJsonWebsiteWidgetsGuest');
        console.log('logPageView url is ' + url + ' data ' + JSON.stringify(json));
        loadXMLDoc(url + '?' + new URLSearchParams(json).toString());
        // $.ajax({
        //     url: url,
        //     dataType: 'json',
        //     async: true,
        //     type: 'POST',
        //     data: json,
        //     success: function (json) {
        //         console.log('logPageView ' + JSON.stringify(json));
        //     }
        // });
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
    console.log('pageBooster location.toString() ' + location.toString())
    // let host = 'http://localhost:8080/';
    let host = 'https://www.rabbitseo.com/';
    let url = host + apiName;
    console.log('getPageBoosterUrl ' + url)
    return url;
}
function loadXMLDoc(url) {
    var xmlhttp = new XMLHttpRequest();
    console.log('pageBooster loadXMLDoc url ' + url)
    xmlhttp.onreadystatechange = function() {
        // if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            // console.log('booster page images ' + xmlhttp.responseText);
        // }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}