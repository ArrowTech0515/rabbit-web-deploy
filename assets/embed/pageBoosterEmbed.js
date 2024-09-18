// Capture the time when the script first runs
const pageBoosterStartTime = Date.now();

const pageBoosterSearchParams = new URL(document.currentScript.src).searchParams;
// let pageBoosterUserId = '4';
// let pageBoosterGuid = '5';
let totalImages = 0;
let missingImages = 0;
let optImages = new URLSearchParams(window.location.search).get("ignorePageBoosterOpt") === null || pageBoosterSearchParams.get("ignoreOptimization") === 'false';
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

    console.log('pageBooster totalImages ' + totalImages + ' missingImages ' + missingImages);
}
function onImageError() {
    const orgSrc = this['org-src'];
    if (orgSrc && (
        orgSrc.indexOf('.png') !== -1
        || orgSrc.indexOf('.PNG') !== -1
        || orgSrc.indexOf('.jpg') !== -1
        || orgSrc.indexOf('.JPG') !== -1
        || orgSrc.indexOf('.gif') !== -1
        || orgSrc.indexOf('.GIF') !== -1
    )) {
        console.log('pageBooster onImageError adding to missingImages for orgSrc ' + orgSrc + ' new src was ' + this['src']);
        missingImages++;
        errorImages.push(this['src']);
    } else {
        console.log('pageBooster onImageError SKIP adding to missingImages for orgSrc ' + orgSrc + ' new src was ' + this['src']);
    }
    this['src'] = orgSrc;
    this.onerror=null;
}

function processImagesOpt() {
    if (optImages) {
        replaceMyImgs();
    } else {
        // console.log('############## set images loading eager')
        // let images = document.getElementsByTagName("img");
        // for (let i = 0; i < images.length && optImages; i++) {
        //     images[i].loading = "eager";
        // }
    }
}

processImagesOpt();
// window.onload = processImagesOpt();

// Define variables to store timestamps
let imageLoadTimes = {};

document.addEventListener("DOMContentLoaded", () => {
    console.log('################ Booster Time to DOMContentLoaded:' + (Date.now() - pageBoosterStartTime));
});

window.addEventListener("load", () => {
    loadTime = (Date.now() - pageBoosterStartTime);
    console.log('################ Booster Page fully loaded - Time to Load: ' + loadTime);

// Optional: Measure image load times
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
// Use a unique ID for each image to track its load time
        img.addEventListener('load', () => {
            imageLoadTimes[img.src] = Date.now() - pageBoosterStartTime;
            // console.log('Booster Image loaded: ' + img.src);
            // console.log('Booster Time to Image Load: ' + imageLoadTimes[img.src] + ' ms since page load start');
        });
    });

    setTimeout(
        function() {
            console.log('booster missingImages ' + missingImages + ' 10% of total ' + (images.length / 5))
            if (missingImages >= (images.length / 5)) {
                processPageImages();
            }
            processErrorImages();
            logPageView();
        }, 2000);
});

// let loadTime = pageBoosterStartTime - window.performance.timing.navigationStart;
// console.log('################ pageBooster loadTime ' + loadTime);

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
            console.log('booster processErrorImages curr errorImages ' + errorImages[i]);
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
    console.log('################ logPageView start loadingTime ' + loadTime + ' location.href ' + location.href);
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
    let host = location.toString().indexOf(':8080') ? 'http://localhost:8080/' : 'https://www.rabbitseo.com/';
    let url = host + apiName;
    console.log('getPageBoosterUrl ' + url)
    return url;
}
function loadXMLDoc(url) {
    let xmlhttp = new XMLHttpRequest();
    console.log('pageBooster loadXMLDoc url ' + url)
    xmlhttp.onreadystatechange = function() {
        // if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            // console.log('booster page images ' + xmlhttp.responseText);
        // }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}