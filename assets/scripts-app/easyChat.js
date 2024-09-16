$(document).ready(function() {

//////////////////////////////////////////////////////////////////////
// #region (set global settings)

// load avatar
$("#avatarImage").attr("src", mainUserDetails.avatar); // for settings
$("#avatarImageSidebar").attr("src", mainUserDetails.avatar); // for sidebar
$("#avatarImageSidebar2").attr("src", mainUserDetails.avatar); // for sidebar

// set user name
$("#firstName").val(mainUserDetails.firstName);

// set email
$("#email").val(mainUserDetails.email);

// set integration code
$(".c-integration-code").html(mainUserDetails.embedScriptUrl);

// set preview
let siteToLoad = mainUserDetails ? mainUserDetails['wixUrl'] : 'https://www.rabbitseo.com';;
$('#sitePreview').attr('data', siteToLoad); 

// set channel name
let channelName = mainUserDetails ? mainUserDetails['name'] : '';
$("#inputChannelName").val(channelName);

// set domain
let channelDomain = mainUserDetails ? mainUserDetails['wixUrl'] : '';
$("#inputDomain").val(channelDomain);

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (functions for dashboard page)

// init first select
$('#dashboardViewSelect').select2({
    templateResult: formatState,
    templateSelection: formatState,
    minimumResultsForSearch: Infinity, // Disable the search bar
    width: '100%' // Set width to 100% of the parent container
});

// init mobile view select
$('#dashboardMobileViewSelect').select2({
    templateResult: formatState,
    templateSelection: formatState,
    minimumResultsForSearch: Infinity, // Disable the search bar
    width: '100%' // Set width to 100% of the parent container
});

// init second select
$('#dashboardMobileDeviceSelect').select2({
    templateResult: formatState,
    templateSelection: formatState,
    minimumResultsForSearch: Infinity, // Disable the search bar
    width: '100%' // Set width to 100% of the parent container
});

// link dashboardViewSelect and dashboardMobileViewSelect
{
    let isDashboardViewSelectUpdating = false; // Flag to prevent infinite loop

    $("#dashboardViewSelect").on('change', function() {
        if (isDashboardViewSelectUpdating) return; // Exit if an update is already in progress
        isDashboardViewSelectUpdating = true; // Set the flag to indicate an update is in progress
        $("#dashboardMobileViewSelect").val($(this).val()).trigger('change');
        isDashboardViewSelectUpdating = false; // Reset the flag after update
    });

    $("#dashboardMobileViewSelect").on('change', function() {
        if (isDashboardViewSelectUpdating) return; // Exit if an update is already in progress
        isDashboardViewSelectUpdating = true; // Set the flag to indicate an update is in progress
        $("#dashboardViewSelect").val($(this).val()).trigger('change');
        isDashboardViewSelectUpdating = false; // Reset the flag after update
    });
}

// link select events
$("#dashboardViewSelect").on('change', drawDashboardCharts);
$("#dashboardMobileDeviceSelect").on('change', selectDashboardDevice($(this).val()));
$("#dashboardMobileDeviceSelect").on('change', drawDashboardCharts);

// create charts
var dashboardVisitChart = createChart($('#dashboardVisitChart')[0].getContext('2d'), "green");
var dashboardClickChart = createChart($('#dashboardClickChart')[0].getContext('2d'), "blue");

// draw charts using filter
function drawDashboardCharts() {

    // get select values
    var groupView = "Hour";
    switch ($("#dashboardViewSelect").val()) {
        case "0":
            groupView = "Hour";
            break;
        case "1":
            groupView = "Day";
            break;
        case "2":
            groupView = "City";
            break;
        case "3":
            groupView = "CountryName";
            break;
    }
    
    var groupDevice = "Desktop";
    switch($("#dashboardDeviceSelect").val()) {
        case "0":
            groupDevice = "All";
            break;
        case "1":
            groupDevice = "Desktop";
            break;
        case "2":
            groupDevice = "Mobile";
            break;
    }
    
    // get data
    var rawData = getWidgetsReport(groupView, null, null, null, groupDevice, true);
    var data = JSON.parse(rawData.data);
    
    // draw charts
    var label = [], visitData = [], clickData = [];
    data.Click.forEach((item) => {
        label.push(item[0]);
        clickData.push(item[1]);
    });

    data.Visit.forEach((item) => {
        visitData.push(item[1]);
    });

    dashboardVisitChart.data.labels = label;
    dashboardVisitChart.data.datasets[0].data = visitData;
    dashboardVisitChart.update();

    dashboardClickChart.data.labels = label;
    dashboardClickChart.data.datasets[0].data = clickData;
    dashboardClickChart.update();
}

// manage dashboard table
new DataTable('#dashboardTable', {
    paging: false,    // Disable pagination
    searching: false, // Disable the search box
    info: false,      // Disable the information text
    columnDefs: [
        { orderable: false, targets: [0, 3, 4, 5] } // Disable sorting for all columns except the 2nd (1) and 3rd (2) columns
    ],
    responsive: true,
    order: [], //column indexes is zero based
});

// Add CSS classes to <thead> and <tbody>
$('#dashboardTable th').addClass('c-datatable-header');
$('#dashboardTable td').addClass('c-datatable-body');

drawDashboardCharts();
populateDashboardTable();

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (functions for insights page)

// init select2
$('#insightsWidgetSelect').select2({
    templateResult: insightsSelectFormatState,
    templateSelection: insightsSelectFormatState,
    minimumResultsForSearch: Infinity, // Disable the search bar
    width: '100%' // Set width to 100% of the parent container
});

// init view select
$('#insightsViewSelect').select2({
    templateResult: formatState,
    templateSelection: formatState,
    minimumResultsForSearch: Infinity, // Disable the search bar
    width: '100%' // Set width to 100% of the parent container
});

// init mobile view select
$('#insightsMobileDeviceSelect').select2({
    templateResult: formatState,
    templateSelection: formatState,
    minimumResultsForSearch: Infinity, // Disable the search bar
    width: '100%' // Set width to 100% of the parent container
});

// link actions
$("#insightsWidgetSelect").on('change', updateInsightPage);
$("#insightsViewSelect").on('change', updateInsightPage);
$("#insightsMobileDeviceSelect").on('change', updateInsightPage);

// draw charts with upper data
var insightsTopChart  = createChart($('#insightsTopChart')[0].getContext('2d'), "blue", 800);
var insightsChart2    = createChart($('#insightsChart2')[0].getContext('2d'), "blue", 800);
var insightsChart3    = createChart($('#insightsChart3')[0].getContext('2d'), "blue", 800);
var insightsChart4    = createBarChart($('#insightsChart4')[0].getContext('2d'), "blue", 800);
var insightsChart5    = createBarChart($('#insightsChart5')[0].getContext('2d'), "blue", 800);
var insightsChart6    = createPieChart($('#insightsChart6')[0].getContext('2d'), "blue");

function updateInsightPage() {

    // prepare widgets report parameter
    var groupBy = "Hour";
    var startDate = "";
    var endDate = "";
    var id = $("#insightsWidgetSelect").val() === "All" ? "" : g_properties[$("#insightsWidgetSelect").val()].id;

    switch ($("#insightsViewSelect").val()) {
        case "0":
            groupBy = "Day";

            const lastWeekDates = getLastWeekDates();
            startDate = lastWeekDates.startOfLastWeek;
            endDate = lastWeekDates.endOfLastWeek;
            break;
        case "1":
            groupBy = "DayOfMonth";
            break;
    }

    // get data
    var data = JSON.parse(getWidgetsReportSummary(groupBy, startDate, endDate, id).data);
    console.log("ddddddddddddd", data);
    return;
    // write summary
    $("#insightSummary").html(data.reportSummary);

    // show graph
    var groupByDayOfMonthVisit = data.groupByDayOfMonth.Visit;
    var groupByDayOfMonthClick = data.groupByDayOfMonth.Click;
    
    var groupByHourVisit = data.groupByHour.Visit;
    var groupByHourClick = data.groupByHour.Click;
    
    var groupByDayVisit = data.groupByDay.Visit;
    var groupByDayClick = data.groupByDay.Click;

    var groupByCityVisit = data.groupByCity.Visit;
    var groupByCityClick = data.groupByCity.Click;

    var groupByCountryVisit = data.groupByCountry.Visit;
    var groupByCountryClick = data.groupByCountry.Click;

    var groupByDeviceVisit = data.groupByDevice.Visit;
    var groupByDeviceClick = data.groupByDevice.Click;

    var label1 = [], visitData1 = [], clickData1 = [];
    var label2 = [], visitData2 = [], clickData2 = [];
    var label3 = [], visitData3 = [], clickData3 = [];
    var label4 = [], visitData4 = [], clickData4 = [];
    var label5 = [], visitData5 = [], clickData5 = [];
    var label6 = [], visitData6 = [], clickData6 = [];

    groupByDayOfMonthVisit.map(item => { label1.push(item[0]); visitData1.push(item[1]); });
    groupByDayOfMonthClick.map(item => { clickData1.push(item[1])});

    label2 = Array.from({ length: 24 }, (_, i) => i);
    visitData2 = Array.from({ length: 24 }, () => 0);
    clickData2 = Array.from({ length: 24 }, () => 0);
    groupByHourVisit.map(item => { visitData2[item[0]] = item[1]; });
    groupByHourClick.map(item => { clickData2[item[0]] = item[1]; });

    label3 = Array.from({ length: 7 }, (_, i) => i);
    visitData3 = Array.from({ length: 7 }, () => 0);
    clickData3 = Array.from({ length: 7 }, () => 0);
    groupByDayVisit.map(item => { visitData3[item[0]] = item[1]; });
    groupByDayClick.map(item => { clickData3[item[0]] = item[1]; });    
                
    groupByCityVisit.map(item => {

        if (item[0]) {
    
            // remove subfix of each city
            var deliminateIndex = item[0].indexOf("-");
            if (deliminateIndex > -1)
                label4.push(item[0].substring(0, deliminateIndex).trim());
            else
                label4.push(item[0]);
            
            visitData4.push(item[1]);
        }                    
    });
    groupByCityClick.map(item => {
        if (item[0])
            clickData4.push(item[1]);
    });
                
    groupByCountryVisit.map(item => { label5.push(item[0]); visitData5.push(item[1]); });
    groupByCountryClick.map(item => { clickData5.push(item[1]); });

    groupByDeviceVisit.map(item => { label6.push(item[0]); visitData6.push(item[1]); });
    groupByDeviceClick.map(item => { clickData6.push(item[1]); });

    insightsTopChart.data.labels = label1;
    insightsTopChart.data.datasets[0].data = visitData1;
    insightsTopChart.data.datasets[1].data = clickData1;
    insightsTopChart.update();

    insightsChart2.data.labels = label2;
    insightsChart2.data.datasets[0].data = visitData2;
    insightsChart2.data.datasets[1].data = clickData2;
    insightsChart2.update();

    insightsChart3.data.labels = label3;
    insightsChart3.data.datasets[0].data = visitData3;
    insightsChart3.data.datasets[1].data = clickData3;
    insightsChart3.update();

    insightsChart4.data.labels = label4;
    insightsChart4.data.datasets[0].data = visitData4;
    insightsChart4.data.datasets[1].data = clickData4;
    insightsChart4.update();

    insightsChart5.data.labels = label5;
    insightsChart5.data.datasets[0].data = visitData5;
    insightsChart5.data.datasets[1].data = clickData5;
    insightsChart5.update();

    insightsChart6.data.labels = label6;
    insightsChart6.data.datasets[0].data = visitData6;
    insightsChart6.data.datasets[1].data = clickData6;
    insightsChart6.update();
}

// add widgets to the insights page's select
addWidgetOnInsightsPage();

// update all charts
updateInsightPage();

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (customize widget page)

setPreviewDevice(0);
    
// channel type/design
$("[id^='channelCustomizeNav']").on("click", function() {
    var id = $(this).attr("id");

    // remove default style
    $("#channelCustomizeNavType").removeClass("active");
    $("#channelCustomizeNavType").removeClass("sec-text");
    $("#channelCustomizeNavDesign").removeClass("active");
    $("#channelCustomizeNavDesign").removeClass("sec-text");
    $("#channelCustomizeNavType i").removeClass("text-orange");
    $("#channelCustomizeNavDesign i").removeClass("text-orange");

    $("#channelTypePage").removeClass("d-none");
    $("#channelDesignPage").removeClass("d-none");

    if (id == "channelCustomizeNavType")
    {
        // set style
        $("#channelCustomizeNavType").addClass("active");
        $("#channelCustomizeNavDesign").addClass("sec-text");
        $("#channelCustomizeNavType i").addClass("text-orange");

        // control
        $("#channelDesignPage").addClass("d-none");
    } else {
        // set style
        $("#channelCustomizeNavDesign").addClass("active");
        $("#channelCustomizeNavType").addClass("sec-text");
        $("#channelCustomizeNavDesign i").addClass("text-orange");

        // control
        $("#channelTypePage").addClass("d-none");
    }
});

// show settings / hide settings at the collapse bar
$(".c-show-hide-collapse").on("click", function() {
    if ($(this).hasClass("collapsed")) {
        $(this).find("div").html("Show Settings");
    } else {
        $(this).find("div").html("Hide Settings");
    }
});

// #endregion

});

//////////////////////////////////////////////////////////////////////
// #region (functions to navigate pages)

function gotoDashboard() {

    // show the first page and hide all
    $("#homePage").removeClass("d-none");
    $("#createChannelPage").addClass("d-none");

    // set the first content in homepage
    $("#mainContentDashboard").removeClass("d-none");
    $("#mainContentInsights").addClass("d-none");
    $("#mainContentSettings").addClass("d-none");
    $("#mainContentHelp").addClass("d-none");

    // set the sidebar item
    $("[id^='menuItem']").removeClass("active"); // remove nav menu item active class
    $("[id^='menuItemDashboard']").addClass("active");

    $("[id^='mobileMenuItem']").removeClass("active"); // remove nav menu item active class
    $("[id^='mobileMenuItemDashboard']").addClass("active");
}

function gotoInsights(widget) {
    // show the first page and hide all
    $("#homePage").removeClass("d-none");
    $("#createChannelPage").addClass("d-none");

    // set the first content in homepage
    $("#mainContentDashboard").addClass("d-none");
    $("#mainContentInsights").removeClass("d-none");
    $("#mainContentSettings").addClass("d-none");
    $("#mainContentHelp").addClass("d-none");

    // set the sidebar item
    $("[id^='menuItem']").removeClass("active"); // remove nav menu item active class
    $("[id^='menuItemInsights']").addClass("active");

    $("[id^='mobileMenuItem']").removeClass("active"); // remove nav menu item active class
    $("[id^='mobileMenuItemInsights']").addClass("active");
}

function gotoSettings() {
    // show the first page and hide all
    $("#homePage").removeClass("d-none");
    $("#createChannelPage").addClass("d-none");

    // set the first content in homepage
    $("#mainContentDashboard").addClass("d-none");
    $("#mainContentInsights").addClass("d-none");
    $("#mainContentSettings").removeClass("d-none");
    $("#mainContentHelp").addClass("d-none");

    // set the sidebar item
    $("[id^='menuItem']").removeClass("active"); // remove nav menu item active class
    $("[id^='menuItemSettings']").addClass("active");

    $("[id^='mobileMenuItem']").removeClass("active"); // remove nav menu item active class
    $("[id^='mobileMenuItemSettings']").addClass("active");
}

function gotoHelp() {
    // show the first page and hide all
    $("#homePage").removeClass("d-none");
    $("#createChannelPage").addClass("d-none");

    // set the first content in homepage
    $("#mainContentDashboard").addClass("d-none");
    $("#mainContentInsights").addClass("d-none");
    $("#mainContentSettings").addClass("d-none");
    $("#mainContentHelp").removeClass("d-none");

    // set the sidebar item
    $("[id^='menuItem']").removeClass("active"); // remove nav menu item active class
    $("[id^='menuItemHelp']").addClass("active");

    $("[id^='mobileMenuItem']").removeClass("active"); // remove nav menu item active class
    $("[id^='mobileMenuItemHelp']").addClass("active");
}

function gotoCreateChannel() {
    $("#homePage").addClass("d-none");
    $("#createChannelPage").removeClass("d-none");

    $("#createChannelAddPanel").removeClass("d-none");
    $("#createChannelCustomizePanel").addClass("d-none");
}

function gotoCustomizeChannel(id) {
    if (id == 0) { // channel add page
        $("#createChannelAddPanel").removeClass("d-none");
        $("#createChannelCustomizePanel").addClass("d-none");

        // set title
        $("#createChannelPageTitle").html("<span class='text-orange'>Add Channel</span> to Your Website!")
    }
    else { // channel customize page
        $("#createChannelAddPanel").addClass("d-none");
        $("#createChannelCustomizePanel").removeClass("d-none");

        // set title
        $("#createChannelPageTitle").html("<span class='text-orange'>Customize</span> Your Channel!")
    }
}

function showMobileSidebar() {
    $("#mobileSidebarModal").modal("show");
}

function showMobileSecondSidebar() {
    $("#mobileSecondSidebarModal").modal("show");
}

function showMobileCustomization() {
    $("#mobileThirdSidebarModal").modal("show");
}

function showMobileChannelType(id) {
    if (id == 0) {
        $("#mobileChannelCustomizeNavType").addClass("active");
        $("#mobileChannelCustomizeNavDesign").removeClass("active");

        $("#mobileShowChannelTypes").removeClass("d-none");
        $("#mobileShowChannelDesign").addClass("d-none");
    } else {
        $("#mobileChannelCustomizeNavType").removeClass("active");
        $("#mobileChannelCustomizeNavDesign").addClass("active");

        $("#mobileShowChannelTypes").addClass("d-none");
        $("#mobileShowChannelDesign").removeClass("d-none");
    }
}

function showMobilePreview() {
    $("#mobileBottomBarChannels").removeClass("active");
    $("#mobileBottomBarCustomization").removeClass("active");
    $("#mobileBottomBarPreview").addClass("active");

    $("#customizationPageLeftPanel").addClass("d-none");
    $("#customizationPagePreview").removeClass("d-none");
}

function showMobileChannels() {
    $("#mobileBottomBarChannels").addClass("active");
    $("#mobileBottomBarCustomization").removeClass("active");
    $("#mobileBottomBarPreview").removeClass("active");

    $("#customizationPageLeftPanel").removeClass("d-none");
    $("#customizationPagePreview").addClass("d-none");
}

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (functions for dashboard page)

// for code integration
function showIntegrationCode() {
    $('#integrationCodeModal').modal('show');
}

// for device settings
function selectDashboardDevice(id) {

    if (id === "")
        id = '1';

    // remove all active classes
    $("#dashboardDeviceSelect").children().removeClass("active");
    $("#dashboardDeviceSelect").children(`:nth-child(${Number(id)})`).addClass("active");

    // link with the mobile select
    $("#dashboardMobileDeviceSelect").val(id).trigger("change");
}

function populateDashboardTable() {
    
    const table = $('#dashboardTable').DataTable(); // Initialize DataTable instance
    table.clear(); // Clear existing data
    
    g_channels.forEach(row => {

        // Add a new row
        table.row.add([
            `
                <div class="d-flex gap-2 align-items-center">
                    <img class="me-2 table-channel-img" src="../assets/images/easychatty/icon_${row}.png" alt="${row}" style="width: 30px; height: 30px;">
                    <p class="text-2-bold" style="color: #1C2028;">${row}</p>
                </div>
            `,
            `<p class="text-2-bold" style="color: #1C2028;">${g_properties[row].createdDate}</p>`,
            `
                <div class="d-flex align-items-center gap-2">
                    <div id="dashboardTableLiveStatus${row}" class="${g_properties[row].live ? 'c-channel-table-visible' : 'c-channel-table-hidden' } text-2-medium text-center">${g_properties[row].live ? "Visible" : "Hidden" }</div>
                    <div class="form-check form-switch">
                        <input id="dashboardTableLiveCheck${row}" class="form-check-input" type="checkbox" style="height: 1.2em;" ${g_properties[row].live ? 'checked' : ''} onchange="dashboardTableToggleVisible('${row}')">
                        <label id="dashboardTableLiveLabel${row}" for="dashboardTableLiveCheck${row}" class="form-check-label text-3-regular sec-text">${g_properties[row].live ? "Hide" : "Show" }</label>
                    </div>
                </div>
            `,
            `<p class="text-2-bold" style="color: #1C2028;">${g_properties[row].visits}</p>`,
            `<p class="text-2-bold" style="color: #1C2028;">${g_properties[row].clicks}</p>`,
            `
                <div class="d-flex gap-4 align-items-center">
                    <button class="btn btn-white gap-2 text-3-regular" style="height: 38px; color: #434A63 !important; font-size: 12px; font-weight: 400;" type="button" onclick="gotoCreateChannel()">
                        <img src="../assets/images/easychatty/edit-4.png" alt="Edit" />Edit
                    </button>
                    <button class="btn btn-white gap-2 text-3-regular" style="height: 38px; color: #434A63 !important; font-size: 12px; font-weight: 400;" type="button" onclick="gotoInsights('${row}')">
                        <img src="../assets/images/easychatty/graph-up.png" alt="Insights" />Insights
                    </button>
                </div>
            `
        ]).draw(); // Add and redraw the table

        // for mobile
        $("#dashboardTableMobile").append(
            `<div class="d-flex flex-column" style="padding: 20px; gap: 20px; background: #FFFFFF66; box-shadow: 0px 40px 80px 0px #3949620A;">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2">
                  <img src="../assets/images/easychatty/icon_${row}.png" alt="${row}" width="30" height="30">
                  <div>
                    <p class="text-2-bold main-tex">${row}</p>
                    <p class="text-4-400 sec-text">Created: ${g_properties[row].createdDate}</p>
                  </div>
                </div>
                <div>
                  <p class="text-2-bold main-tex">${g_properties[row].visits}</p>
                  <p class="text-4-400 sec-text">Visitors</p>
                </div>
                <div>
                  <p class="text-2-bold main-tex">${g_properties[row].clicks}</p>
                  <p class="text-4-400 sec-text">Clicks</p>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center gap-2">
                <p id="dashboardMobileTableLiveStatus${row}" class="w-50 text-3-regular ${g_properties[row].live ? 'green' : 'red' } text-center d-flex align-items-center justify-content-center" style="height: 27px;">
                  ${g_properties[row].live ? "Visible" : "Hidden" }</p>
                <div class="form-check form-switch">
                  <input id="dashboardMobileTableLiveCheck${row}" class="form-check-input" type="checkbox" style="height: 1.2em;" ${g_properties[row].live ? 'checked' : ''} onchange="dashboardTableToggleVisible('${row}')">
                  <label id="dashboardMobileTableLiveLabel${row}" for="dashboardMobileTableLiveCheck${row}" class="form-check-label text-3-regular sec-text">${g_properties[row].live ? "Hide" : "Show" }</label>
                </div>
              </div>
              <div class="d-flex gap-2 align-items-center">
                <button class="btn btn-white gap-2 text-3-regular flex-grow-1" style="height: 38px; color: #434A63 !important; font-size: 12px; font-weight: 400;" type="button" onclick="gotoCreateChannel()">
                    <img src="../assets/images/easychatty/edit-4.png" alt="Edit" />Edit
                </button>
                <button class="btn btn-white gap-2 text-3-regular flex-grow-1" style="height: 38px; color: #434A63 !important; font-size: 12px; font-weight: 400;" type="button" onclick="gotoInsights('${row}')">
                    <img src="../assets/images/easychatty/graph-up.png" alt="Insights" />Insights
                </button>
              </div>
            </div>`
        )
    });
}

function integrationCodeCopy() {
    
    // Copy the text inside the text field
    navigator.clipboard.writeText($(".c-integration-code").html()
                                        .replace(/&lt;/g, '<')
                                        .replace(/&gt;/g, '>'));

    $(".c-integration-code-copy-tooltip").html("Copied!");
}

function revertCopyTooltip() {
    $(".c-integration-code-copy-tooltip").html("Copy");
}

// change visible status in tables
function dashboardTableToggleVisible(widget) {
    
    // save status to the server
    g_properties[widget].live ^= 1;
    toggleWidgetStatus(g_properties[widget].id, g_properties[widget].live);

    // save status for tables
    $(`#dashboardTableLiveCheck${widget}`).checked = g_properties[widget].live;
    $(`#dashboardMobileTableLiveCheck${widget}`).checked = g_properties[widget].live;

    $(`#dashboardTableLiveStatus${widget}`).removeClass('c-channel-table-visible c-channel-table-hidden');
    $(`#dashboardMobileTableLiveStatus${widget}`).removeClass("red green");
    if (g_properties[widget].live) {
        $(`#dashboardTableLiveStatus${widget}`).addClass('c-channel-table-visible');
        $(`#dashboardTableLiveLabel${widget}`).html("Hide");
        $(`#dashboardMobileTableLiveLabel${widget}`).html("Hide");
        $(`#dashboardMobileTableLiveStatus${widget}`).addClass("green");
        $(`#dashboardMobileTableLiveStatus${widget}`).html("Visible");
    } else {
        $(`#dashboardTableLiveStatus${widget}`).addClass('c-channel-table-hidden');
        $(`#dashboardTableLiveLabel${widget}`).html("Show");
        $(`#dashboardMobileTableLiveLabel${widget}`).html("Show");
        $(`#dashboardMobileTableLiveStatus${widget}`).addClass("red");
        $(`#dashboardMobileTableLiveStatus${widget}`).html("Hidden");
    }
}

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (functions for insights page)
function selectInsightsDevice(id) {

    if (id === "")
        id = '1';

    // remove all active classes
    $("#insightsDeviceSelect").children().removeClass("active");
    $("#insightsDeviceSelect").children(`:nth-child(${Number(id)})`).addClass("active");

    // link with the mobile select
    $("#insightsMobileDeviceSelect").val(id).trigger("change");
}

function addWidgetOnInsightsPage() {
    
    var clicks = 0;
    var visits = 0;

    // remove all options except first "All Channels" option.
    $('#insightsWidgetSelect').children('option:not(:first)').remove();

    g_channels.forEach(widget => {
        $("#insightsWidgetSelect").append(`
            <option value="${widget}" data-image="../assets/images/easychatty/icon_${widget}.png">${widget}</option>
        `);

        clicks += g_properties[widget].clicks;
        visits += g_properties[widget].visits;
    });

    // set total visits and clicks for today
    $("#dashboardTotalVisit").html(visits);
    $("#dashboardTotalClick").html(clicks);

    // Trigger change event to update Select2 UI
    $("#insightsWidgetSelect").trigger('change');
}

// get start and end date of last week
function getLastWeekDates() {
    // Create a new Date object for today
    const today = new Date();
  
    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayOfWeek = today.getDay();
  
    // Calculate the date of the last Saturday (end of the last week)
    const endOfLastWeek = new Date(today);
    endOfLastWeek.setDate(today.getDate() - currentDayOfWeek - 1); // Last week's Saturday
  
    // Calculate the date of the last Sunday's (start of the last week)
    const startOfLastWeek = new Date(endOfLastWeek);
    startOfLastWeek.setDate(endOfLastWeek.getDate() - 6); // Last week's Sunday
  
    // Utility function to format date as "YYYY-MM-DD"
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, add 1 and pad with '0'
        const day = String(date.getDate()).padStart(2, '0'); // Pad day with '0'
        return `${year}-${month}-${day}`;
    }
  
    return {
        startOfLastWeek: formatDate(startOfLastWeek),
        endOfLastWeek: formatDate(endOfLastWeek),
    };
}

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (functions for settings page)

function gotoSettingsProfile() {

    // move page
    $("#settingsDetailProfile").removeClass("d-none");
    $("#settingsDetailBilling").addClass("d-none");

    // set navbar
    $("#settingsNavMobileProfile").removeClass("text-1 sec-text");
    $("#settingsNavMobileProfile").addClass("text-1-bold c-settings-mobile-nav-active");

    $("#settingsNavMobileBilling").addClass("text-1 sec-text");
    $("#settingsNavMobileBilling").removeClass("text-1-bold c-settings-mobile-nav-active");

    $("#settingsNavProfile").removeClass("text-1 sec-text");
    $("#settingsNavProfile").addClass("text-1-bold");

    $("#settingsNavBilling").addClass("text-1 sec-text");
    $("#settingsNavBilling").removeClass("text-1-bold");
}

function gotoSettingsBilling() {

    // move page
    $("#settingsDetailProfile").addClass("d-none");
    $("#settingsDetailBilling").removeClass("d-none");

    // set navbar
    $("#settingsNavMobileProfile").addClass("text-1 sec-text");
    $("#settingsNavMobileProfile").removeClass("text-1-bold c-settings-mobile-nav-active");

    $("#settingsNavMobileBilling").removeClass("text-1 sec-text");
    $("#settingsNavMobileBilling").addClass("text-1-bold c-settings-mobile-nav-active");

    $("#settingsNavProfile").addClass("text-1 sec-text");
    $("#settingsNavProfile").removeClass("text-1-bold");

    $("#settingsNavBilling").removeClass("text-1 sec-text");
    $("#settingsNavBilling").addClass("text-1-bold");
}

function settingsUploadAvatar() {
    $("#fileInput").click();
}

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (functions for select widget page)

function selectChannel(widget) {

    // set sidebar icon
    $(`#sidebarChannelIcon${widget}`).toggleClass("active");
    $(`#mobileSidebarChannelIcon${widget}`).toggleClass("active");

    // Check if the value is already in the stack
    const index = g_channels.indexOf(widget);
    
    if (index > -1) { // already exist
        g_channels.splice(index, 1); // for logic
        $("#addedChannelsPanel").children().eq(index).remove(); // for main panel
    } else { // add new
        g_channels.unshift(widget);
        
        // prepare channel edit block
        let block = "";
        if (widget == "Whatsapp") {
            block = $("#channelBlockWhatsapp").html();
        } else if (widget == "ContactForm") {
            block = $("#channelBlockContactForm").html();
        } else {
            block = $("#channelBlockNormal").html();
            block = block.replace(/Normal/g, widget);   
        }
        
        // insert block
        $("#addedChannelsPanel").prepend(block); // for main panel

        // set settings of that block
        $(`#channelUsername${widget}`).val(g_properties[widget].contact); // username
        $(`#iconColor${widget}`).val(g_properties[widget].color); // bg color
        $(`#iconHoverText${widget}`).val(g_properties[widget].hoverText); // hover text
        $(`#iconHoverTextOnClose${widget}`).attr("title", g_properties[widget].hoverTextOnClose); // hover text on close

        // set for contact us
        if (widget == "ContactForm") {
            $("#contactFormTitleBgColor").val(g_properties[widget].titleBGColor);
            $("#contactFormTitleTxtColor").val(g_properties[widget].titleTxtColor);
            $("#contactFormCloseIconColor").val(g_properties[widget].closeIconColor);
            $("#contactFormTitleText").val(g_properties[widget].titleText);
            $("#contactFormButtonBgColor").val(g_properties[widget].buttonBGColor);
            $("#contactFormButtonTxtColor").val(g_properties[widget].textColor);
            $("#contactFormButtonText").val(g_properties[widget].buttonText);
            $("#contactFormCloseAfterSubmission").val(g_properties[widget].closeAfterSubmission);
            $("#contactFormCloseAfterSec").val(g_properties[widget].closeAfterSec);
            $("#contactFormRedirect").val(g_properties[widget].redirect);
            $("#contactFormRedirectUrl").val(g_properties[widget].redirectUrl);
            $("#contactFormThankyou").val(g_properties[widget].thankyou);
            $("#contactFormTitleTxtSize").val(g_properties[widget].titleTxtSize);
            $("#contactFormFieldSize").val(g_properties[widget].fieldSize);
            $("#contactFormButtonSize").val(g_properties[widget].buttonSize);
        }
    }

    UpdateChatIcons();
}

// preview mode
function setPreviewDevice(id) {
    
    if (id < 2) {
        $("#setPreviewModeDesktop").removeClass("blue-new-accent-1");
        $("#setPreviewModeMobile").removeClass("blue-new-accent-1");
    }

    switch (id) {
        case 0: // for desktop view
            $("#setPreviewModeDesktop").addClass("blue-new-accent-1");

            $("#sitePreview").attr("width", "100%");
            $("#sitePreview").attr("height", "600");
            break;
        case 1: // for mobile view
            $("#setPreviewModeMobile").addClass("blue-new-accent-1");

            $("#sitePreview").attr("width", "300");
            $("#sitePreview").attr("height", "800");
            break;
        case 2: // for full screen
            $("#sitePreview").attr("width", "100%");
            $("#sitePreview").attr("height", "800");
            break;
    }
}

// remove channel using trash icon
function removeChannel(obj) {
    
    let src_id = $(obj).attr("id");
    let widget = src_id.replace("trashChannel", "");

    // set left channel icon state
    $(`#sidebarChannelIcon${widget}`).removeClass("active");   
    $(`#mobileSidebarChannel${widget}`).removeClass("active");
    
    // Check if the value is already in the stack
    const index = g_channels.indexOf(widget);
    $("#addedChannelsPanel").children().eq(index).remove(); // for main panel
    g_channels.splice(index, 1);

    // for preview
    UpdateChatIcons();
}

function inputContactInfo(obj) {
    let id = $(obj).attr("id").replace("channelUsername", "");

    // change color
    g_properties[id].contact = $(obj).val();
}

function changeChatIconColor(obj) {
    let id = $(obj).attr("id").replace("iconColor", "");

    // change color
    g_properties[id].color = $(obj).val();
    UpdateChatIcons();
}

function changeChatIconHoverText(obj) {
    let id = $(obj).attr("id").replace("iconHoverText", "");

    // change color
    g_properties[id].hoverText = $(obj).val();
    UpdateChatIcons();
}

function changeChatIconHoverTextOnClose(obj) {
    let id = $(obj).attr("id").replace("iconHoverTextOnClose", "");

    // change color
    g_properties[id].hoverTextOnClose = $(obj).val();
    UpdateChatIcons();
}

function changeChatDesktop(obj) {
    let id = $(obj).attr("id").replace("iconShowonDesktop", "");

    // change color
    g_properties[id].desktop = $(obj).is(":checked");
    UpdateChatIcons();
}

function changeChatMobile(obj) {
    let id = $(obj).attr("id").replace("iconShowonMobile", "");

    // change color
    g_properties[id].mobile = $(obj).is(":checked");
    UpdateChatIcons();
}

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (functions for customize widget page)

function channelsSave(publish_type) { // publish_type: 0(draft), 1(publish)
    
    showLoading();

    // Check all inputs
    for (let item of g_channels) {
        if (g_properties[item].contact === undefined || g_properties[item].contact === "") {
            alert("Please input all contact information");
            return; // Exit the entire function if a contact is missing
        }
    }

    // save channels
    let updatedList = [];
    g_channels.forEach(item => {

        let live = publish_type == 1;
        g_properties[item].live = live;
        let userProps   = g_properties[item];

        if (g_properties[item].hasOwnProperty("id")) {
            createUpdateWidget(item, userProps, live, false, g_properties[item].id);
        }
        else {
            g_properties[item].id = createUpdateWidget(item, userProps, live)['obj'];
        }
        updatedList.push(g_properties[item].id);
    });

    for (const key in g_properties) {
        if (g_properties[key].hasOwnProperty("id") && 
            !updatedList.includes(g_properties[key].id)) {
            deleteWidget(g_properties[key].id);
        }
    }

    hideLoading();

    $('#saveChannelModal').modal('show');
}

// stroke type
function setStrokeType(id) {
    $(".c-design-stroke-type > div").removeClass("bg-white");
    if (id == 0) {
        $(".c-design-stroke-type > div:nth-last-of-type(2)").addClass("bg-white");
    } else {
        $(".c-design-stroke-type > div:nth-last-of-type(1)").addClass("bg-white");
    }
}

// stroke icon
function setCustomIcon(id) {
    $(".c-design-icon > div").removeClass("bg-white");
    $(".c-design-icon div path").css("fill", "#C5CCDC");

    switch(id) {
        case 0:
            $(".c-design-icon > div:nth-last-of-type(5)").addClass("bg-white");
            $(".c-design-icon > div:nth-last-of-type(5) path").css("fill", "#10487F");
            break;
        case 1:
            $(".c-design-icon > div:nth-last-of-type(4)").addClass("bg-white");
            $(".c-design-icon > div:nth-last-of-type(4) path").css("fill", "#10487F");
            break;
        case 2:
            $(".c-design-icon > div:nth-last-of-type(3)").addClass("bg-white");
            $(".c-design-icon > div:nth-last-of-type(3) path").css("fill", "#10487F");
            break;
        case 3:
            $(".c-design-icon > div:nth-last-of-type(2)").addClass("bg-white");
            $(".c-design-icon > div:nth-last-of-type(2) path").css("fill", "#10487F");
            break;
        case 4:
            $(".c-design-icon > div:nth-last-of-type(1)").addClass("bg-white");
            $(".c-design-icon > div:nth-last-of-type(1) path").css("fill", "#10487F");
            break;
    }
}

// whatsapp channel type
function selectWhatsappType(id) {
    if (id == 0) {
        $("#whatsappType0").addClass("active");
        $("#whatsappType1").removeClass("active");
    } else {
        $("#whatsappType1").addClass("active");
        $("#whatsappType0").removeClass("active");
    }
};

function setContactFormData() {
    g_properties['ContactForm'].titleBGColor = $("#contactFormTitleBgColor").val();
    g_properties['ContactForm'].titleTxtColor = $("#contactFormTitleTxtColor").val();
    g_properties['ContactForm'].closeIconColor = $("#contactFormCloseIconColor").val();
    g_properties['ContactForm'].titleText = $("#contactFormTitleText").val();
    g_properties['ContactForm'].buttonBGColor = $("#contactFormButtonBgColor").val();
    g_properties['ContactForm'].buttonTxtColor = $("#contactFormButtonTxtColor").val();
    g_properties['ContactForm'].buttonText = $("#contactFormButtonText").val();
    g_properties['ContactForm'].closeAfterSubmission = $("#contactFormCloseAfterSubmission").val();
    g_properties['ContactForm'].closeAfterSec = $("#contactFormCloseAfterSec").val();
    g_properties['ContactForm'].redirect = $("#contactFormRedirect").val();
    g_properties['ContactForm'].redirectUrl = $("#contactFormRedirectUrl").val();
    g_properties['ContactForm'].thankyou = $("#contactFormThankyou").val();
    g_properties['ContactForm'].titleTxtSize = $("#contactFormTitleTxtSize").val();
    g_properties['ContactForm'].fieldSize = $("#contactFormFieldSize").val();
    g_properties['ContactForm'].buttonSize = $("#contactFormButtonSize").val();
    UpdateChatIcons();
}

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (utility functions for select2, chart)
function formatState (state) {
    if (!state.id) { return state.text; }
    var $state = $(
        '<span>'+ state.text + '</span>'
    );
    return $state;
};

function insightsSelectFormatState(state) {
    if (!state.id) {
      return state.text; // Return the text for the default rendering
    }

    var baseUrl = $(state.element).data('image');
    var $state = $(
      '<span><img src="' + baseUrl + '" class="img-flag" style="width: 20px; height: 20px; margin-right: 8px;" /> ' + state.text + '</span>'
    );
    return $state;
}

// Chart configuration function
function createChart(ctx, type="green", height = 300) {
    
    var gradient1 = ctx.createLinearGradient(0, 20, 0, height);
    gradient1.addColorStop(0, 'rgba(132, 250, 176, 0.31)');
    gradient1.addColorStop(1, 'rgba(255, 255, 255, 0)');

    var border1 = 'rgba(132, 250, 176, 1)';

    if (type == "blue") {
        gradient1 = ctx.createLinearGradient(0, 20, 0, height);
        gradient1.addColorStop(0, 'rgba(63, 58, 249, 0.5)');
        gradient1.addColorStop(1, 'rgba(255, 255, 255, 0)');

        border1 = 'rgba(118, 114, 251, 1)';
    }

    var gradient2 = ctx.createLinearGradient(0, 20, 0, height);
    gradient2.addColorStop(0, 'rgba(132, 250, 176, 0.31)');
    gradient2.addColorStop(1, 'rgba(255, 255, 255, 0)');

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: gradient1,
                    borderWidth: 2,
                    fill: true,
                    borderColor: border1,
                    borderWidth: 2, 
                    pointRadius: 0,
                    pointHoverRadius: 2,
                },
                {
                    data: [],
                    backgroundColor: gradient2,
                    fill: false,               
                }
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
            },
            interaction: {
                mode: 'index', // Trigger tooltips across the entire x-axis
                intersect: false, // Don't require direct point intersection
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                    grid: {
                        display: false,
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                    },
                    grid: {
                        display: true,
                    }
                }
            },
            tension: 0.4,
        }
    });
}

function createBarChart(ctx, type="green", height = 300) {
    var gradient1 = ctx.createLinearGradient(0, 0, height, 0); // Horizontal gradient
    gradient1.addColorStop(0, 'rgba(132, 250, 176, 0.31)');
    gradient1.addColorStop(1, 'rgba(255, 255, 255, 0)');

    var border1 = 'rgba(132, 250, 176, 1)';

    if (type === "blue") {
        gradient1 = ctx.createLinearGradient(0, 0, height, 0); // Horizontal gradient for blue
        gradient1.addColorStop(0, 'rgba(63, 58, 249, 0.5)');
        gradient1.addColorStop(1, 'rgba(255, 255, 255, 0)');

        border1 = 'rgba(118, 114, 251, 1)';
    }

    // Second gradient for second dataset
    var gradient2 = ctx.createLinearGradient(0, 0, height, 0);
    gradient2.addColorStop(0, 'rgba(132, 250, 176, 0.31)');
    gradient2.addColorStop(1, 'rgba(255, 255, 255, 0)');

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [], // Define labels for the horizontal axis
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [], // Provide data for the first bar chart
                    backgroundColor: gradient1,
                    borderColor: border1,
                    borderWidth: 1,
                    hoverBackgroundColor: border1, // Hover effect color
                },
                {
                    label: 'Dataset 2',
                    data: [], // Provide data for the second bar chart
                    backgroundColor: gradient2,
                    borderWidth: 1,
                    hoverBackgroundColor: border1, // Hover effect color for dataset 2
                }
            ],
        },
        options: {
            responsive: true,
            indexAxis: 'y', // Set horizontal bars
            plugins: {
                legend: {
                    display: true, // Show legend for multiple datasets
                },
                title: {
                    display: false,
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                    }
                },
                y: {
                    grid: {
                        display: false,
                    }
                }
            }
        }
    });
}

function createPieChart(ctx, type="green") {
    var backgroundColors1 = ['rgba(132, 250, 176, 0.6)', 'rgba(63, 58, 249, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];
    var backgroundColors2 = ['rgba(118, 114, 251, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 205, 86, 0.6)'];

    if (type === "blue") {
        backgroundColors1 = ['rgba(63, 58, 249, 0.6)', 'rgba(132, 250, 176, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];
        backgroundColors2 = ['rgba(255, 159, 64, 0.6)', 'rgba(118, 114, 251, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 205, 86, 0.6)'];
    }

    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [], // Define labels for the pie chart
            datasets: [
                {
                    label: 'Desktop',
                    data: [], // Provide data for the first pie chart dataset
                    backgroundColor: backgroundColors1, // Colors for each slice
                    borderWidth: 1
                },
                {
                    label: 'Mobile',
                    data: [], // Provide data for the second pie chart dataset
                    backgroundColor: backgroundColors2, // Colors for each slice of the second dataset
                    borderWidth: 1
                }
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true, // Display legend
                    position: 'top',
                },
                title: {
                    display: false,
                }
            }
        }
    });
}

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (phone number for whatsapp)

// 253 countries
const countries = [
    { name: "Afghanistan", code: "AF", phone: 93 },
    { name: "Aland Islands", code: "AX", phone: 358 },
    { name: "Albania", code: "AL", phone: 355 },
    { name: "Algeria", code: "DZ", phone: 213 },
    { name: "American Samoa", code: "AS", phone: 1684 },
    { name: "Andorra", code: "AD", phone: 376 },
    { name: "Angola", code: "AO", phone: 244 },
    { name: "Anguilla", code: "AI", phone: 1264 },
    { name: "Antarctica", code: "AQ", phone: 672 },
    { name: "Antigua and Barbuda", code: "AG", phone: 1268 },
    { name: "Argentina", code: "AR", phone: 54 },
    { name: "Armenia", code: "AM", phone: 374 },
    { name: "Aruba", code: "AW", phone: 297 },
    { name: "Australia", code: "AU", phone: 61 },
    { name: "Austria", code: "AT", phone: 43 },
    { name: "Azerbaijan", code: "AZ", phone: 994 },
    { name: "Bahamas", code: "BS", phone: 1242 },
    { name: "Bahrain", code: "BH", phone: 973 },
    { name: "Bangladesh", code: "BD", phone: 880 },
    { name: "Barbados", code: "BB", phone: 1246 },
    { name: "Belarus", code: "BY", phone: 375 },
    { name: "Belgium", code: "BE", phone: 32 },
    { name: "Belize", code: "BZ", phone: 501 },
    { name: "Benin", code: "BJ", phone: 229 },
    { name: "Bermuda", code: "BM", phone: 1441 },
    { name: "Bhutan", code: "BT", phone: 975 },
    { name: "Bolivia", code: "BO", phone: 591 },
    { name: "Bonaire, Sint Eustatius and Saba", code: "BQ", phone: 599 },
    { name: "Bosnia and Herzegovina", code: "BA", phone: 387 },
    { name: "Botswana", code: "BW", phone: 267 },
    { name: "Bouvet Island", code: "BV", phone: 55 },
    { name: "Brazil", code: "BR", phone: 55 },
    { name: "British Indian Ocean Territory", code: "IO", phone: 246 },
    { name: "Brunei Darussalam", code: "BN", phone: 673 },
    { name: "Bulgaria", code: "BG", phone: 359 },
    { name: "Burkina Faso", code: "BF", phone: 226 },
    { name: "Burundi", code: "BI", phone: 257 },
    { name: "Cambodia", code: "KH", phone: 855 },
    { name: "Cameroon", code: "CM", phone: 237 },
    { name: "Canada", code: "CA", phone: 1 },
    { name: "Cape Verde", code: "CV", phone: 238 },
    { name: "Cayman Islands", code: "KY", phone: 1345 },
    { name: "Central African Republic", code: "CF", phone: 236 },
    { name: "Chad", code: "TD", phone: 235 },
    { name: "Chile", code: "CL", phone: 56 },
    { name: "China", code: "CN", phone: 86 },
    { name: "Christmas Island", code: "CX", phone: 61 },
    { name: "Cocos (Keeling) Islands", code: "CC", phone: 672 },
    { name: "Colombia", code: "CO", phone: 57 },
    { name: "Comoros", code: "KM", phone: 269 },
    { name: "Congo", code: "CG", phone: 242 },
    { name: "Congo, Democratic Republic of the Congo", code: "CD", phone: 242 },
    { name: "Cook Islands", code: "CK", phone: 682 },
    { name: "Costa Rica", code: "CR", phone: 506 },
    { name: "Cote D'Ivoire", code: "CI", phone: 225 },
    { name: "Croatia", code: "HR", phone: 385 },
    { name: "Cuba", code: "CU", phone: 53 },
    { name: "Curacao", code: "CW", phone: 599 },
    { name: "Cyprus", code: "CY", phone: 357 },
    { name: "Czech Republic", code: "CZ", phone: 420 },
    { name: "Denmark", code: "DK", phone: 45 },
    { name: "Djibouti", code: "DJ", phone: 253 },
    { name: "Dominica", code: "DM", phone: 1767 },
    { name: "Dominican Republic", code: "DO", phone: 1809 },
    { name: "Ecuador", code: "EC", phone: 593 },
    { name: "Egypt", code: "EG", phone: 20 },
    { name: "El Salvador", code: "SV", phone: 503 },
    { name: "Equatorial Guinea", code: "GQ", phone: 240 },
    { name: "Eritrea", code: "ER", phone: 291 },
    { name: "Estonia", code: "EE", phone: 372 },
    { name: "Ethiopia", code: "ET", phone: 251 },
    { name: "Falkland Islands (Malvinas)", code: "FK", phone: 500 },
    { name: "Faroe Islands", code: "FO", phone: 298 },
    { name: "Fiji", code: "FJ", phone: 679 },
    { name: "Finland", code: "FI", phone: 358 },
    { name: "France", code: "FR", phone: 33 },
    { name: "French Guiana", code: "GF", phone: 594 },
    { name: "French Polynesia", code: "PF", phone: 689 },
    { name: "French Southern Territories", code: "TF", phone: 262 },
    { name: "Gabon", code: "GA", phone: 241 },
    { name: "Gambia", code: "GM", phone: 220 },
    { name: "Georgia", code: "GE", phone: 995 },
    { name: "Germany", code: "DE", phone: 49 },
    { name: "Ghana", code: "GH", phone: 233 },
    { name: "Gibraltar", code: "GI", phone: 350 },
    { name: "Greece", code: "GR", phone: 30 },
    { name: "Greenland", code: "GL", phone: 299 },
    { name: "Grenada", code: "GD", phone: 1473 },
    { name: "Guadeloupe", code: "GP", phone: 590 },
    { name: "Guam", code: "GU", phone: 1671 },
    { name: "Guatemala", code: "GT", phone: 502 },
    { name: "Guernsey", code: "GG", phone: 44 },
    { name: "Guinea", code: "GN", phone: 224 },
    { name: "Guinea-Bissau", code: "GW", phone: 245 },
    { name: "Guyana", code: "GY", phone: 592 },
    { name: "Haiti", code: "HT", phone: 509 },
    { name: "Heard Island and McDonald Islands", code: "HM", phone: 0 },
    { name: "Holy See (Vatican City State)", code: "VA", phone: 39 },
    { name: "Honduras", code: "HN", phone: 504 },
    { name: "Hong Kong", code: "HK", phone: 852 },
    { name: "Hungary", code: "HU", phone: 36 },
    { name: "Iceland", code: "IS", phone: 354 },
    { name: "India", code: "IN", phone: 91 },
    { name: "Indonesia", code: "ID", phone: 62 },
    { name: "Iran, Islamic Republic of", code: "IR", phone: 98 },
    { name: "Iraq", code: "IQ", phone: 964 },
    { name: "Ireland", code: "IE", phone: 353 },
    { name: "Isle of Man", code: "IM", phone: 44 },
    { name: "Israel", code: "IL", phone: 972 },
    { name: "Italy", code: "IT", phone: 39 },
    { name: "Jamaica", code: "JM", phone: 1876 },
    { name: "Japan", code: "JP", phone: 81 },
    { name: "Jersey", code: "JE", phone: 44 },
    { name: "Jordan", code: "JO", phone: 962 },
    { name: "Kazakhstan", code: "KZ", phone: 7 },
    { name: "Kenya", code: "KE", phone: 254 },
    { name: "Kiribati", code: "KI", phone: 686 },
    { name: "Korea, Democratic People's Republic of", code: "KP", phone: 850 },
    { name: "Korea, Republic of", code: "KR", phone: 82 },
    { name: "Kosovo", code: "XK", phone: 383 },
    { name: "Kuwait", code: "KW", phone: 965 },
    { name: "Kyrgyzstan", code: "KG", phone: 996 },
    { name: "Lao People's Democratic Republic", code: "LA", phone: 856 },
    { name: "Latvia", code: "LV", phone: 371 },
    { name: "Lebanon", code: "LB", phone: 961 },
    { name: "Lesotho", code: "LS", phone: 266 },
    { name: "Liberia", code: "LR", phone: 231 },
    { name: "Libyan Arab Jamahiriya", code: "LY", phone: 218 },
    { name: "Liechtenstein", code: "LI", phone: 423 },
    { name: "Lithuania", code: "LT", phone: 370 },
    { name: "Luxembourg", code: "LU", phone: 352 },
    { name: "Macao", code: "MO", phone: 853 },
    { name: "Macedonia, the Former Yugoslav Republic of", code: "MK", phone: 389 },
    { name: "Madagascar", code: "MG", phone: 261 },
    { name: "Malawi", code: "MW", phone: 265 },
    { name: "Malaysia", code: "MY", phone: 60 },
    { name: "Maldives", code: "MV", phone: 960 },
    { name: "Mali", code: "ML", phone: 223 },
    { name: "Malta", code: "MT", phone: 356 },
    { name: "Marshall Islands", code: "MH", phone: 692 },
    { name: "Martinique", code: "MQ", phone: 596 },
    { name: "Mauritania", code: "MR", phone: 222 },
    { name: "Mauritius", code: "MU", phone: 230 },
    { name: "Mayotte", code: "YT", phone: 262 },
    { name: "Mexico", code: "MX", phone: 52 },
    { name: "Micronesia, Federated States of", code: "FM", phone: 691 },
    { name: "Moldova, Republic of", code: "MD", phone: 373 },
    { name: "Monaco", code: "MC", phone: 377 },
    { name: "Mongolia", code: "MN", phone: 976 },
    { name: "Montenegro", code: "ME", phone: 382 },
    { name: "Montserrat", code: "MS", phone: 1664 },
    { name: "Morocco", code: "MA", phone: 212 },
    { name: "Mozambique", code: "MZ", phone: 258 },
    { name: "Myanmar", code: "MM", phone: 95 },
    { name: "Namibia", code: "NA", phone: 264 },
    { name: "Nauru", code: "NR", phone: 674 },
    { name: "Nepal", code: "NP", phone: 977 },
    { name: "Netherlands", code: "NL", phone: 31 },
    { name: "Netherlands Antilles", code: "AN", phone: 599 },
    { name: "New Caledonia", code: "NC", phone: 687 },
    { name: "New Zealand", code: "NZ", phone: 64 },
    { name: "Nicaragua", code: "NI", phone: 505 },
    { name: "Niger", code: "NE", phone: 227 },
    { name: "Nigeria", code: "NG", phone: 234 },
    { name: "Niue", code: "NU", phone: 683 },
    { name: "Norfolk Island", code: "NF", phone: 672 },
    { name: "Northern Mariana Islands", code: "MP", phone: 1670 },
    { name: "Norway", code: "NO", phone: 47 },
    { name: "Oman", code: "OM", phone: 968 },
    { name: "Pakistan", code: "PK", phone: 92 },
    { name: "Palau", code: "PW", phone: 680 },
    { name: "Palestinian Territory, Occupied", code: "PS", phone: 970 },
    { name: "Panama", code: "PA", phone: 507 },
    { name: "Papua New Guinea", code: "PG", phone: 675 },
    { name: "Paraguay", code: "PY", phone: 595 },
    { name: "Peru", code: "PE", phone: 51 },
    { name: "Philippines", code: "PH", phone: 63 },
    { name: "Pitcairn", code: "PN", phone: 64 },
    { name: "Poland", code: "PL", phone: 48 },
    { name: "Portugal", code: "PT", phone: 351 },
    { name: "Puerto Rico", code: "PR", phone: 1787 },
    { name: "Qatar", code: "QA", phone: 974 },
    { name: "Reunion", code: "RE", phone: 262 },
    { name: "Romania", code: "RO", phone: 40 },
    { name: "Russian Federation", code: "RU", phone: 7 },
    { name: "Rwanda", code: "RW", phone: 250 },
    { name: "Saint Barthelemy", code: "BL", phone: 590 },
    { name: "Saint Helena", code: "SH", phone: 290 },
    { name: "Saint Kitts and Nevis", code: "KN", phone: 1869 },
    { name: "Saint Lucia", code: "LC", phone: 1758 },
    { name: "Saint Martin", code: "MF", phone: 590 },
    { name: "Saint Pierre and Miquelon", code: "PM", phone: 508 },
    { name: "Saint Vincent and the Grenadines", code: "VC", phone: 1784 },
    { name: "Samoa", code: "WS", phone: 684 },
    { name: "San Marino", code: "SM", phone: 378 },
    { name: "Sao Tome and Principe", code: "ST", phone: 239 },
    { name: "Saudi Arabia", code: "SA", phone: 966 },
    { name: "Senegal", code: "SN", phone: 221 },
    { name: "Serbia", code: "RS", phone: 381 },
    { name: "Serbia and Montenegro", code: "CS", phone: 381 },
    { name: "Seychelles", code: "SC", phone: 248 },
    { name: "Sierra Leone", code: "SL", phone: 232 },
    { name: "Singapore", code: "SG", phone: 65 },
    { name: "St Martin", code: "SX", phone: 721 },
    { name: "Slovakia", code: "SK", phone: 421 },
    { name: "Slovenia", code: "SI", phone: 386 },
    { name: "Solomon Islands", code: "SB", phone: 677 },
    { name: "Somalia", code: "SO", phone: 252 },
    { name: "South Africa", code: "ZA", phone: 27 },
    { name: "South Georgia and the South Sandwich Islands", code: "GS", phone: 500 },
    { name: "South Sudan", code: "SS", phone: 211 },
    { name: "Spain", code: "ES", phone: 34 },
    { name: "Sri Lanka", code: "LK", phone: 94 },
    { name: "Sudan", code: "SD", phone: 249 },
    { name: "Suriname", code: "SR", phone: 597 },
    { name: "Svalbard and Jan Mayen", code: "SJ", phone: 47 },
    { name: "Swaziland", code: "SZ", phone: 268 },
    { name: "Sweden", code: "SE", phone: 46 },
    { name: "Switzerland", code: "CH", phone: 41 },
    { name: "Syrian Arab Republic", code: "SY", phone: 963 },
    { name: "Taiwan, Province of China", code: "TW", phone: 886 },
    { name: "Tajikistan", code: "TJ", phone: 992 },
    { name: "Tanzania, United Republic of", code: "TZ", phone: 255 },
    { name: "Thailand", code: "TH", phone: 66 },
    { name: "Timor-Leste", code: "TL", phone: 670 },
    { name: "Togo", code: "TG", phone: 228 },
    { name: "Tokelau", code: "TK", phone: 690 },
    { name: "Tonga", code: "TO", phone: 676 },
    { name: "Trinidad and Tobago", code: "TT", phone: 1868 },
    { name: "Tunisia", code: "TN", phone: 216 },
    { name: "Turkey", code: "TR", phone: 90 },
    { name: "Turkmenistan", code: "TM", phone: 7370 },
    { name: "Turks and Caicos Islands", code: "TC", phone: 1649 },
    { name: "Tuvalu", code: "TV", phone: 688 },
    { name: "Uganda", code: "UG", phone: 256 },
    { name: "Ukraine", code: "UA", phone: 380 },
    { name: "United Arab Emirates", code: "AE", phone: 971 },
    { name: "United Kingdom", code: "GB", phone: 44 },
    { name: "United States", code: "US", phone: 1 },
    { name: "United States Minor Outlying Islands", code: "UM", phone: 1 },
    { name: "Uruguay", code: "UY", phone: 598 },
    { name: "Uzbekistan", code: "UZ", phone: 998 },
    { name: "Vanuatu", code: "VU", phone: 678 },
    { name: "Venezuela", code: "VE", phone: 58 },
    { name: "Viet Nam", code: "VN", phone: 84 },
    { name: "Virgin Islands, British", code: "VG", phone: 1284 },
    { name: "Virgin Islands, U.s.", code: "VI", phone: 1340 },
    { name: "Wallis and Futuna", code: "WF", phone: 681 },
    { name: "Western Sahara", code: "EH", phone: 212 },
    { name: "Yemen", code: "YE", phone: 967 },
    { name: "Zambia", code: "ZM", phone: 260 },
    { name: "Zimbabwe", code: "ZW", phone: 263 }
];

// Assuming `countries` is an array of country objects
countries.forEach(function(country) {
    var option = `
    <li class="option" onclick="phoneNumberSelect(this)">
        <div>
            <span class="iconify" data-icon="flag:${country.code.toLowerCase()}-4x3"></span>
            <span class="country-name">${country.name}</span>
        </div>
        <strong>+${country.phone}</strong>
    </li>`;

    $('.c-phone-number-input-container .options ol').append(option);
});

// show search list
function showPhoneNumberList() {
    $(".c-phone-number-input-container .options").toggleClass('active');
}

function phoneNumberSearchCountry() {
    var searchQuery = $('.c-phone-number-search-box').val().toLowerCase();
    $(".c-phone-number-input-container .options .option").each(function() {
        var $option = $(this),
            isMatched = $option.find('.country-name').text().toLowerCase().includes(searchQuery);
        $option.toggleClass('hide', !isMatched);
    });
}

function phoneNumberSelect(obj) {
    var $icon = $(obj).find('.iconify').clone(),
        $phoneCode = $(obj).find('strong').clone();

    var $selectedOption = $(".c-phone-number-input-selected-pad div");
    $selectedOption.empty();
    $selectedOption.append($icon, $phoneCode);
    $selectedOption.append('<i class="material-icons lh-1">keyboard_arrow_down</i>');

    $(".c-phone-number-input-selected-pad input").val($phoneCode.text() + " ");
    $(".c-phone-number-input-container .options").removeClass('active');
    $(".c-phone-number-input-container .options input").val('');
    $(".c-phone-number-input-container .options .option").removeClass('hide');
}

//#endregion
