console.log('start pageBooster app');
// getWidgetsList();
$(document).ready(function () {
    if (mainUserDetails['appItemsUsed'] === 0) {
        $.getJSON(getApiUrl('getPagesWebsite'), function (json) {
            console.log('getPagesWebsite ' + JSON.stringify(json));
            $('.pagesList').html(JSON.stringify(json['list']));
        });
        // $.getJSON('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?key=AIzaSyDbMl5rLxc4lR2M7M8y7q_87bYfGnasf28&url=' + mainUserDetails['wixUrl'], function (json) {
        //     console.log('pagespeedonline ' + JSON.stringify(json));
        //
        // });
        $('.landingPage').html(mainUserDetails['wixUrl']);
        $('#landingPageObj').attr('data', mainUserDetails['wixUrl']);
        $('.landingPageLoadingTime').html(window['loadTime']);
        setTimeout(
            function() {
                console.log('window[\'loadTime\'] ' + window.pageBoosterLoadTime)
                console.log('window[\'loadTime\'] json ' + JSON.stringify(window.pageBoosterLoadTime))
                $('.landingPageLoadingTime').html('');
            }, 5000);

    }
});
function processPagesImages() {
    $.getJSON(getApiUrl('processPagesImagesWebsite'), function (json) {
        console.log('processPagesImagesWebsite ' + JSON.stringify(json));
    });
}