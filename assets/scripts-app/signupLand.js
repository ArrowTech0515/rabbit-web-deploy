function drawPlans() {
    let priceLst = $('#pricingCardList');
    priceLst.empty();
    for (const key in allPlans) {
        var item = allPlans[key];
        const realPrice = yearly ? item['yearlyPrice'] : item['planPrice'];
        const planPrice = yearly ? item['yearlyPrice'] / 12 : item['planPrice'];

        const monthlyPrice = item['planPrice'];
        const yearlyPrice = item['yearlyPrice'] / 12;

        const percentDiscountnum = (monthlyPrice - planPrice) * 100 / monthlyPrice;
        const percentDiscount = Math.floor(percentDiscountnum);
        if (isNaN(percentDiscount)) {
            $('#pricingCardList .percent_box').hide();
        }
        const active = (packageName === item['planName']);

        let newItem = `
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="pricing-card ${active ? 'active' : ''}">
                    <h6 class="card-title">${item['planName']}</h6>
                    ${yearly && monthlyPrice > 0 ? `<div class="percent_box">${percentDiscount}% OFF</div>` : ''}
                    <div class="d-flex montly-price" style="justify-content: center;">
                      ${yearly && monthlyPrice > 0 ? `<s class="fw-normal">${item['planPriceCurrency'] + monthlyPrice}</s>` : ''}
                      ${(!planPrice || planPrice === 0) ?
            '<p class="card-price">Free</p>' :
            `<p class="card-price">${item['planPriceCurrency'] + planPrice}/month</p>`}
                    </div>
                    <div class="d-flex yearly-price" style="justify-content: center;">
                      <p class="card-price">${realPrice == 0 ? 'Free' : item['planPriceCurrency'] + realPrice + '/year'}</p>
                    </div>
                    <ul class="card-features">
                        ${appDomainName.indexOf('Wix') !== -1 || appDomainName.indexOf('Shopify') !== -1 ? '' : `<li> ${item['planWebsites'] + (item['planWebsites'] > 1 ? ' Websites' : ' Website')}</li>`}
                        ${item['planKeywords'] > 0 ? (`<li>${item['planKeywords']} Keywords</li>`) : ''}
                        ${`<li> ${planPrice === 0 ? 'Limited Optimization' : 'Full On Page Optimization'}</li>`}
                        ${(item['planLinksBuilder'] > 0 ? `<li>${item['planLinksBuilder']} New Backlinks / mo</li>` : '')}
                        ${'<li> ' + item['planResearches'] + ' Researches / mo</li>'}
                        ${(planPrice !== 0 ? '' : '<li>One Exclusive Guest Blog</li>')}
                        ${(planPrice !== 0 ? '' : '<li>One Premium Listing</li>')}
                        ${(planPrice === 0 ? '' : '<li>Rankings Monitoring</li>')}
                        ${(planPrice < 50 ? '' : '<li>Related Keywords Finder</li>')}
                        ${(planPrice === 0 ? '' : '<li>Backlinks Managed Service</li>')}
                        ${(planPrice === 0 ? '' : '<li>Guest Blogs Categories</li>')}
                        ${(planPrice === 0 ? '' : '<li>Guest Blogs Tags</li>')}
                        ${(planPrice < 50 ? '' : '<li>Guest Blogs Custom Image</li>')}
                        ${(planPrice < 50 ? '' : '<li>Competitors Keywords</li>')}
                        ${(planPrice < 50 ? '' : '<li>Competitors Backlinks</li>')}
                        ${(planPrice < 100 ? '' : '<li>Backlinks History</li>')}
                        ${(planPrice < 100 ? '' : '<li>API Access</li>')}
                    </ul>
                    ${active && packageName === 'Starter' ? '' : getButton(item, realPrice, yearly)}
                </div>
            </div>
          `;
        priceLst.append(newItem);
    }

    if ($("#subscriptionMode").prop('checked')) {
        $('#pricingCardList .montly-price').removeClass('d-flex').hide();
        $('#pricingCardList .yearly-price').addClass('d-flex').show();
    } else {
        $('#pricingCardList .montly-price').addClass('d-flex').show();
        $('#pricingCardList .yearly-price').removeClass('d-flex').hide();
    }
}

function setUserDetailsValues() {
}

var SignupUtilities = {
    showLoading: function (message) {
        if (message == null || message == "") {
            $("#loading-overlay .message").html("Loading...");
        } else {
            $("#loading-overlay .message").html(message);
        }

        $("#loading-overlay").show();
    },
    hideLoading: function () {
        $("#loading-overlay").hide();
    },

    getPluginType: function (data) {
        var v = data.split("-");
        var type = "";
        var pluginId = parseInt(v[1]);

        // TODO - separate plugin type
        if (v[0] == 'Contact_Us') {
            type = "contact_forms"
        } else if (v[0] == 'Join_Newsletter') {
            type = "join_newsletter"
        } else if (v[0] == 'Lead_Generation') {
            type = "lead_generation"
        }

        return [type, pluginId]
    },

    getWidgetType: function (type, index) {
        if (type == "contact_forms") {
            return "Contact_Us-" + index;
        } else if (type == 'join_newsletter') {
            return "Join_Newsletter-" + index;
        } else if (type == 'lead_generation') {
            return "Lead_Generation-" + index;
        }
    },

    isForm: function (type, index) {
        if (type == "contact_forms")
            return true;

        return false;
    },
    hexToRgb: function (hex) {
        // Remove the hash at the start if it's there
        hex = hex.replace(/^#/, '');

        // Parse the hex value into R, G, and B components
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return {red: r, green: g, blue: b};
    },

    getToday: function () {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    },
    getDateFewDaysAgo: function (few) {
        const date = new Date();
        date.setDate(date.getDate() - few);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    },
    getDateFewMonthsAgo: function (few) {
        const date = new Date();
        date.setMonth(date.getMonth() - few);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    },

    formatDate: function (dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const year = date.getFullYear();

        // Get the month name
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];

        // Get the ordinal suffix for the day
        const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
            (day % 10 === 2 && day !== 12) ? 'nd' :
                (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

        // Format the date
        return `${day}${suffix} ${month}, ${year}`;
    }
};

var SignupLandHome = {
    activityChart: null,
    WIDGET_LIST: [],

    analyticsBy: 'Day',
    analyticsChart: null,
    deviceChart: null,

    reportByPlugin: null,
    reportByRange: 'Day',
    reportByDevice: 'All',
    reportsResult: null,

    reportHourChart: null,
    reportDeviceChart: null,
    reportDayChart: null,
    reportCountryChart: null,
    reportCityChart: null,

    leadsByWidget: null,
    leadsByPlugin: null,
    leadsByRange: 'Day',
    leadsByDevice: 'All',
    myLeadsTable: null,

    myWidgetTable: null,

    init: function () {
        var me = this;

        // initialize from global variable
        if (mainUserDetails['embedScriptUrl'] != null && mainUserDetails['embedScriptUrl'] != '') {
            $("#codeIntegrationDialog .code-snippet code").text(mainUserDetails['embedScriptUrl']);
        } else {
            $(".welcome-page .code-integration-btn").hide();
        }

        if (mainUserDetails['hideCTAUpgradeLinks']) {
            $("#membership-upgrade-alert .btn").hide();
        } else {
            $("#sidebar .sidebar-container").css('marginTop', '4rem');
        }

        if (mainUserDetails['hideAllUpgradeLinks']) {
            $("#membership-upgrade-alert").hide();
            $("#welcomeSettingsMenu a[data-menu='subscription']").hide();   // hide "Subscription" page
        } else {
            $("#sidebar .sidebar-container").css('marginTop', '4rem');
        }

        // adjust sidebar logo
        var topBarHeight = $('#membership-upgrade-alert').outerHeight();
        $(window).scroll(function () {
            if ($(this).scrollTop() > topBarHeight) {
                // If scrolled past the top bar, remove the margin
                $("#sidebar .sidebar-container").css('marginTop', '0');
            } else {
                // If top bar is visible, add the margin
                $("#sidebar .sidebar-container").css('marginTop', '4rem');
            }
        });

        $("#membership-upgrade-alert").on('click', '.btn', function (e) {
            e.preventDefault();
            callUpgradePage();
        });

        // mobile sidebar
        $(".mobile-header").on('click', '.menu-toggle', function (e) {
            e.preventDefault();
            $("#sidebar").addClass('active');
        });

        $("#sidebar").on('click', '.close-btn', function (e) {
            e.preventDefault();
            $("#sidebar").removeClass('active');
        });

        // top toolbar
        $("#dashboard_section .new-plugin-btn").on('click', function () {
            SignupLandHome.hide();
            WidgetHome.show();
        });

        $('.code-integration-btn').on('click', function () {
            $("#codeIntegrationDialog").toggleClass('d-none');
        });
        $("#codeIntegrationDialog").on('click', '.close-btn', function () {
            $("#codeIntegrationDialog").toggleClass('d-none');
        });
        $("#codeIntegrationDialog").on('click', '.copy-btn', function () {
            navigator.clipboard.writeText($(this).parent('.code-snippet').find('code').text());
            $("#codeIntegrationDialog").toggleClass('d-none');
        });

        // table
        $("#my_widget_table").on('click', '.action-visible', function (e) {
            e.preventDefault();

            var status = !$(this).find('input').prop('checked');
            var row = me.myWidgetTable.row($(this).parent().parent().parent().parent()).data();
            var id = row.id;

            $.getJSON(getApiUrl('toggleWidgetStatusWebsite?widgetId=' + id + '&active=' + status), function (data) {
                me.getWidgetList();
            });
        });

        $("#my_widget_table").on('click', '.action-submission', function () {
            var row = me.myWidgetTable.row($(this).parent().parent().parent().parent()).data();
            me.showLeadsPage(row.id);
        });

        $("#my_widget_table").on('click', '.action-edit', function () {
            var row = me.myWidgetTable.row($(this).parent().parent().parent().parent()).data();
            var index = row.index;
            var data = JSON.parse(me.WIDGET_LIST[index][4].replace(/\n/g, '<br>'));

            var types = SignupUtilities.getPluginType(me.WIDGET_LIST[index][2]);
            data.widget = {
                id: me.WIDGET_LIST[index][0],
                index: types[1],
                type: types[0],
            }

            me.hide();
            PluginCustomization.show(data);
        });

        $("#my_widget_table").on('click', '.action-rename', function () {
            var td = $(this).parent().parent().parent().parent().find('td:nth-child(2)');
            var text = $(td).text();
            $(td).html('<input type="text" class="cell-name" value="' + text + '">');
            $(td).find('input').focus();
        });

        $("#my_widget_table").on('change', 'input.cell-name', function () {
            var name = $(this).val();
            var row = me.myWidgetTable.row($(this).parent().parent()).data();
            var id = row.id;
            $.getJSON(getApiUrl('updateWidgetNameWebsite?widgetId=' + id + '&name=' + name), function (data) {
                me.getWidgetList();
            });
        });

        $("#my_widget_table").on('click', '.action-delete', function () {
            var row = me.myWidgetTable.row($(this).parent().parent().parent().parent()).data();
            var id = row.id;
            if (confirm("Are you sure")) {
                $.getJSON(getApiUrl('deleteWidgetWebsite?widgetId=' + id), function (data) {
                    me.getWidgetList();
                });
            }
        });

        // sidebar
        $('.profile-section').on('click', '.settings-icon', function () {
            $("#sidebar").removeClass('active');
            me.showSettingsPage();
        });

        // rate us
        $(".rate-us-btn").on('click', function (e) {
            e.preventDefault();
        });

        $('.top-right-avatar').on('click', '.settings-btn', function () {
            me.showSettingsPage();
        });

        $("#sidebar").on('click', '.nav-item>.nav-link:not(.active)', function () {
            $("#sidebar").removeClass('active');
            var menu = $(this).data('menu');
            if (menu == 'home') {
                me.showWelcomePage()
            } else if (menu == 'reports') {
                me.showReportsPage();
            } else if (menu == 'leads') {
                me.showLeadsPage();

            } else if (menu == 'help') {
                me.showHelpPage();
            }
        })

        // header navigation
        $("#main_content").on('click', '.settings-page .breadcrumb-item:not(.active) a', function () {
            me.showWelcomePage();
        })

        $("#main_content").on('click', '.settings-page .sub-menu a:not(.active)', function () {
            var menu = $(this).data('menu');

            // enable new sub menu
            $("#main_content .settings-page .sub-menu a").removeClass('active');
            $(this).addClass('active');

            // show/hide menu content
            $('#main_content .settings-page .content').hide();
            $('#main_content .settings-page .content.settings-' + menu).show();
        })

        $("#main_content").on('click', '.settings-page .settings-header .back-arrow', function () {
            me.showWelcomePage();
        });

        // account page
        $("#updateAccountDetailsUser .save-btn").on('click', function () {
            // validate form
            if ($("#updateAccountDetailsUser input[name='firstName']").val() == '') {
                alert("Please Enter 'FirstName'");
                return false;
            }

            saveFormAndRefreshDetails(this);

            SignupUtilities.showLoading();
            setTimeout(function () {
                PreviewWidget.updateUserInformation();
                SignupUtilities.hideLoading();
            }, 2000);
        });

        $("#updateEmailUser .save-btn").on('click', function () {
            // validate form
            if ($("#updateEmailUser input[name='email']").val() == '') {
                alert("Please Enter 'Email'");
                return false;
            }

            saveFormAndRefreshDetails(this);

            SignupUtilities.showLoading();
            setTimeout(function () {
                PreviewWidget.updateUserInformation();
                SignupUtilities.hideLoading();
            }, 2000);
        });

        $("#updateAccountDetailsUser .delete-btn").on('click', function () {
            deleteAccount();
        });

        $(".settings-page .settings-account .change-avatar-btn").on('click', function (e) {
            e.preventDefault();
            $("#fileInput").trigger('click');
        });

        $("#fileInput").on('change', function (e) {
            me.uploadAvatar();
        });

        $("#subscriptionMode").on('change', function (e) {
            if ($(this).prop('checked')) {
                $('#pricingCardList .montly-price').removeClass('d-flex').hide();
                $('#pricingCardList .yearly-price').addClass('d-flex').show();
            } else {
                $('#pricingCardList .montly-price').addClass('d-flex').show();
                $('#pricingCardList .yearly-price').removeClass('d-flex').hide();
            }
        });

        // analytics
        $('.welcome-page .dropdown.datepicker .dropdown-item').on('click', function () {
            $('.welcome-page .dropdown.datepicker .dropdown-item').removeClass('active');
            $(this).addClass('active');
            $('#analyticsPickerDropdown').text($(this).text());

            me.analyticsBy = $(this).data('by');
            me.loadAnalyticsGraphData();
        });

        // reports
        $('.reports-page .dropdown.by-plugin .dropdown-item').on('click', function () {
            $('.reports-page .dropdown.by-plugin .dropdown-item').removeClass('active');
            $(this).addClass('active');
            $('#reportsPickerDropdown').text($(this).text());

            me.reportByPlugin = $(this).data('by');
            me.loadWidgetsReportSummary();
        });

        $('.reports-page .dropdown.by-range .dropdown-item').on('click', function () {
            $('.reports-page .dropdown.by-range .dropdown-item').removeClass('active');
            $(this).addClass('active');
            $('#reportsRangeDropdown').text($(this).text());

            me.reportByRange = $(this).data('by');
            me.loadWidgetsReportSummary();
        });

        $('.reports-page .dropdown.by-device .dropdown-item').on('click', function () {
            $('.reports-page .dropdown.by-device .dropdown-item').removeClass('active');
            $(this).addClass('active');
            $('#devicePickerDropdown').text($(this).text());

            me.reportByDevice = $(this).data('by');
            me.loadWidgetsReportSummary();
        });

        $('#toggleVisitors_Aanalytics, #toggleClicks_Aanalytics, #toggleSubmissions_Aanalytics').on('change', function () {
            me.updateChart('Analytics');
        });

        $('#toggleVisitors_Hour, #toggleClicks_Hour, #toggleSubmissions_Hour').on('change', function () {
            me.updateChart('Hour');
        });

        $('#toggleVisitors_Day, #toggleClicks_Day, #toggleSubmissions_Day').on('change', function () {
            me.updateChart('Day');
        });

        $('#toggleVisitors_Country, #toggleClicks_Country, #toggleSubmissions_Country').on('change', function () {
            me.updateChart('Country');
        });

        $('#toggleVisitors_City, #toggleClicks_City, #toggleSubmissions_City').on('change', function () {
            me.updateChart('City');
        });

        // leads
        $('.leads-page .dropdown.by-plugin .dropdown-item').on('click', function () {
            $('.leads-page .dropdown.by-plugin .dropdown-item').removeClass('active');
            $(this).addClass('active');
            $('#leadsPickerDropdown').text($(this).text());

            me.leadsByPlugin = $(this).data('by');
            me.loadLeadsData();
        });

        $('.leads-page .dropdown.by-range .dropdown-item').on('click', function () {
            $('.leads-page .dropdown.by-range .dropdown-item').removeClass('active');
            $(this).addClass('active');
            $('#leadsRangeDropdown').text($(this).text());

            me.leadsByRange = $(this).data('by');
            me.loadLeadsData();
        });

        $('.leads-page .dropdown.by-device .dropdown-item').on('click', function () {
            $('.leads-page .dropdown.by-device .dropdown-item').removeClass('active');
            $(this).addClass('active');
            $('#leadsDeviceDropdown').text($(this).text());

            me.leadsByDevice = $(this).data('by');
            me.loadLeadsData();
        });

        // initial data
        me.initWidgetTable();
        me.getWidgetList();

        // price plan
        initPlans();

        // graph
        me.initGraph();

        me.loadAnalyticsGraphData();
        getWidgetsReport("Device", null, null, null, null, null, me.refreshDeviceGraph);

        // reports
        me.loadWidgetsReportSummary();

        // leads
        me.initLeadsTable();
        me.loadLeadsData();
    },

    uploadAvatar: function () {
        SignupUtilities.showLoading("Uploading.....");
        uploadAvatar(function (retVal) {
            SignupUtilities.hideLoading();
            if (retVal == null)
                return;

            $(".settings-page .settings-account .avatar-section .avatar").attr('src', retVal);
            PreviewWidget.updateUserInformation(retVal);
        });
    },

    initGraph: function () {
        var me = this;

        var date = new Date();
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        var DATA_COUNT = lastDay;

        var labels = [];
        if (me.analyticsBy == 'Day') {
            labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            DATA_COUNT = 7;
        } else {
            for (let i = 1; i <= DATA_COUNT; i++) {
                labels.push(i.toString());
            }
        }

        var datapoints = [];
        for (let i = 1; i <= DATA_COUNT; i++) {
            datapoints.push(0);
        }

        var datasets = [
            {
                label: 'Visitors',
                data: datapoints,
                borderColor: '#8bd4cc',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }, {
                label: 'Clicks',
                data: datapoints,
                borderColor: '#F3959A',
                fill: false,
                tension: 0.4
            }, {
                label: 'Submissions',
                data: datapoints,
                borderColor: '#026d98',
                fill: false
            }
        ];

        var data = {
            labels: labels,
            datasets: datasets,
        };

        var config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Value'
                        },
                        suggestedMin: 0,
                        suggestedMax: 200
                    }
                }
            },
        };

        this.analyticsChart = new Chart(document.getElementById('analyticsCanvas'), config);

        var datasets1 = [
            {
                label: 'Visitors',
                data: [0, 0],
                backgroundColor: ['#B4D7F7', '#396CAD'],
            }
        ];

        var data1 = {
            labels: ['Desktop', 'Mobile'],
            datasets: datasets1,
        };

        var config1 = {
            type: 'doughnut',
            data: data1,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        };

        this.deviceChart = new Chart(document.getElementById('deviceCanvas'), config1);

        var labels3 = []
        var datapoints3 = [];
        for (let i = 1; i <= 24; i++) {
            labels3.push(i.toString());
            datapoints3.push(0);
        }
        var datasets3 = [
            {
                label: 'Visitors',
                data: datapoints3,
                borderColor: '#8bd4cc',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }, {
                label: 'Clicks',
                data: datapoints3,
                borderColor: '#F3959A',
                fill: false,
                tension: 0.4
            }, {
                label: 'Submissions',
                data: datapoints3,
                borderColor: '#026d98',
                fill: false
            }
        ];

        this.reportHourChart = new Chart(document.getElementById('reportHourCanvas'), {
            type: 'line',
            data: {
                labels: labels3,
                datasets: datasets3,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Value'
                        },
                        suggestedMin: 0,
                        suggestedMax: 200
                    }
                }
            },
        });

        var labels4 = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var datapoints4 = [0, 0, 0, 0, 0, 0, 0];
        var datasets4 = [
            {
                label: 'Visitors',
                data: datapoints4,
                borderColor: '#8bd4cc',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }, {
                label: 'Clicks',
                data: datapoints4,
                borderColor: '#F3959A',
                fill: false,
                tension: 0.4
            }, {
                label: 'Submissions',
                data: datapoints4,
                borderColor: '#026d98',
                fill: false
            }
        ];

        this.reportDayChart = new Chart(document.getElementById('reportDayCanvas'), {
            type: 'line',
            data: {
                labels: labels4,
                datasets: datasets4,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Value'
                        },
                        suggestedMin: 0,
                        suggestedMax: 200
                    }
                }
            },
        });

        var datasets5 = [
            {
                label: 'Visitors',
                data: [0, 0],
                backgroundColor: ['#B4D7F7', '#396CAD'],
            }
        ];

        var data5 = {
            labels: ['Desktop', 'Mobile'],
            datasets: datasets5,
        };

        this.reportDeviceChart = new Chart(document.getElementById('reportDeviceCanvas'), {
            type: 'doughnut',
            data: data5,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });

        var datasets6 = [
            {
                label: 'Visitors',
                data: [],
                borderColor: '#8bd4cc',
                backgroundColor: '#8bd4cc',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }, {
                label: 'Clicks',
                data: [],
                borderColor: '#F3959A',
                backgroundColor: '#F3959A',
                fill: false,
                tension: 0.4
            }, {
                label: 'Submissions',
                data: [],
                borderColor: '#026d98',
                backgroundColor: '#026d98',
                fill: false
            }
        ];

        this.reportCountryChart = new Chart(document.getElementById('reportCountryCanvas'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: datasets6
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });

        var datasets7 = [
            {
                label: 'Visitors',
                data: [],
                borderColor: '#8bd4cc',
                backgroundColor: '#8bd4cc',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }, {
                label: 'Clicks',
                data: [],
                borderColor: '#F3959A',
                backgroundColor: '#F3959A',
                fill: false,
                tension: 0.4
            }, {
                label: 'Submissions',
                data: [],
                borderColor: '#026d98',
                backgroundColor: '#026d98',
                fill: false
            }
        ];

        this.reportCityChart = new Chart(document.getElementById('reportCityCanvas'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: datasets7
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                }
            },
        });
    },

    loadAnalyticsGraphData: function () {
        var me = this;
        SignupUtilities.showLoading();
        var group = "Day";
        var from = "", to = null; // SignupUtilities.getToday();
        if (me.analyticsBy == "Day") {
            from = SignupUtilities.getDateFewDaysAgo(7);
        } else {
            group = "DayOfMonth";

            if (me.analyticsBy == "Month3") {
                from = SignupUtilities.getDateFewMonthsAgo(3);
            } else {
                from = SignupUtilities.getDateFewMonthsAgo(6);
            }
        }

        getWidgetsReport(group, from, to, null, null, null, me.refreshAnalyticsGraph);
    },
    refreshAnalyticsGraph: function (result) {
        SignupUtilities.hideLoading();

        if (result == null || result.obj == null)
            return;

        var data = result.obj;
        var me = SignupLandHome;
        var date = new Date();
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        var DATA_COUNT = 31 // lastDay;

        var labels = [];
        if (me.analyticsBy == 'Day') {
            labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            DATA_COUNT = 7;
        } else {
            for (let i = 1; i <= DATA_COUNT; i++) {
                labels.push(i.toString());
            }
        }

        var datapoints1 = [], datapoints2 = [], datapoints3 = [];
        for (let i = 1; i <= DATA_COUNT; i++) {
            datapoints1.push(0);
            datapoints2.push(0);
            datapoints3.push(0);
        }

        if (data.Visit != null) {
            $.each(data.Visit, function (index, row) {
                datapoints1[row[0] - 1] = row[1];
            });
        }

        if (data.Click != null) {
            $.each(data.Click, function (index, row) {
                datapoints2[row[0] - 1] = row[1];
            });
        }

        if (data.Submission != null) {
            $.each(data.Submission, function (index, row) {
                datapoints3[row[0] - 1] = row[1];
            });
        }

        me.analyticsChart.data.labels = labels;
        me.analyticsChart.data.datasets[0].data = datapoints1;
        me.analyticsChart.data.datasets[1].data = datapoints2;
        me.analyticsChart.data.datasets[2].data = datapoints3;
        me.analyticsChart.update();
    },

    refreshDeviceGraph: function (result) {
        SignupUtilities.hideLoading();

        if (result == null || result.obj == null)
            return;

        var me = SignupLandHome;
        var data = result.obj;
        var datasets = [0, 0];
        if (data.Visit != null) {
            $.each(data.Visit, function (index, row) {
                if (row[0] == 'Desktop') {
                    datasets[0] = row[1];
                } else {
                    datasets[1] = row[1]
                }
            })
        }

        me.deviceChart.data.datasets[0].data = datasets;
        me.deviceChart.update();
    },

    loadWidgetsReportSummary: function () {
        var me = this;
        SignupUtilities.showLoading();
        var to = null, from = null, device = me.reportByDevice;

        if (me.reportByRange == 'Day')
            from = SignupUtilities.getDateFewDaysAgo(7);
        else if (me.reportByRange == 'DayOfMonth3')
            from = SignupUtilities.getDateFewMonthsAgo(3);
        else if (me.reportByRange == 'DayOfMonth6')
            from = SignupUtilities.getDateFewMonthsAgo(6);

        getWidgetsReportSummary(from, to, null, device, me.refreshReports);
    },

    refreshReports: function (result) {
        SignupUtilities.hideLoading()
        console.log("---------", result);

        if (result == null || result.obj == null)
            return;

        SignupLandHome.reportsResult = result;
        $('.reports-page .summary').html(result.obj.reportSummary.replace(/\n/g, '<br>'));
        if (result.obj.demoStats != null && result.obj.demoStats === true) {
            $(".membership-demo-stats").show();
        } else {
            $(".membership-demo-stats").hide();
        }

        SignupLandHome.refreshReportsHourGraph(result.obj.groupByHour)
        SignupLandHome.refreshReportsDayGraph(result.obj.groupByDay)
        SignupLandHome.refreshReportsDeviceGraph(result.obj.groupByDevice)
        SignupLandHome.refreshReportsCountryGraph(result.obj.groupByCountry)
        SignupLandHome.refreshReportsCityGraph(result.obj.groupByCity)
    },
    refreshReportsHourGraph: function (data) {
        var datapoints1 = [], datapoints2 = [], datapoints3 = [];
        for (let i = 1; i <= 24; i++) {
            datapoints1.push(0);
            datapoints2.push(0);
            datapoints3.push(0);
        }

        if (data.Visit != null) {
            $.each(data.Visit, function (index, row) {
                datapoints1[row[0] - 1] = row[1];
            });
        }

        if (data.Click != null) {
            $.each(data.Click, function (index, row) {
                datapoints2[row[0] - 1] = row[1];
            });
        }

        if (data.Submission != null) {
            $.each(data.Submission, function (index, row) {
                datapoints3[row[0] - 1] = row[1];
            });
        }

        SignupLandHome.reportHourChart.data.datasets[0].data = datapoints1;
        SignupLandHome.reportHourChart.data.datasets[1].data = datapoints2;
        SignupLandHome.reportHourChart.data.datasets[2].data = datapoints3;
        SignupLandHome.reportHourChart.update();
    },
    refreshReportsDayGraph: function (data) {
        var datapoints1 = [], datapoints2 = [], datapoints3 = [];
        for (let i = 1; i <= 7; i++) {
            datapoints1.push(0);
            datapoints2.push(0);
            datapoints3.push(0);
        }

        if (data.Visit != null) {
            $.each(data.Visit, function (index, row) {
                datapoints1[row[0]] = row[1];
            });
        }

        if (data.Click != null) {
            $.each(data.Click, function (index, row) {
                datapoints2[row[0]] = row[1];
            });
        }

        if (data.Submission != null) {
            $.each(data.Submission, function (index, row) {
                datapoints3[row[0]] = row[1];
            });
        }

        SignupLandHome.reportDayChart.data.datasets[0].data = datapoints1;
        SignupLandHome.reportDayChart.data.datasets[1].data = datapoints2;
        SignupLandHome.reportDayChart.data.datasets[2].data = datapoints3;
        SignupLandHome.reportDayChart.update();
    },
    refreshReportsDeviceGraph: function (data) {
        var datasets = [0, 0];
        if (data.Visit != null) {
            $.each(data.Visit, function (index, row) {
                if (row[0] == 'Desktop') {
                    datasets[0] = row[1];
                } else {
                    datasets[1] = row[1]
                }
            })
        }

        SignupLandHome.reportDeviceChart.data.datasets[0].data = datasets;
        SignupLandHome.reportDeviceChart.update();
    },
    refreshReportsCountryGraph: function (data) {
        var labels = [];
        var datasets1 = [], datasets2 = [], datasets3 = [];

        // labels
        if (data.Visit != null) {
            $.each(data.Visit, function (index, row) {
                if (labels.indexOf(row[0]) > -1) {

                } else {
                    labels.push(row[0]);
                    datasets1.push(0);
                    datasets2.push(0);
                    datasets3.push(0);
                }
            });
        }

        if (data.Click != null) {
            $.each(data.Click, function (index, row) {
                if (labels.indexOf(row[0]) > -1) {

                } else {
                    labels.push(row[0]);
                    datasets1.push(0);
                    datasets2.push(0);
                    datasets3.push(0);
                }
            });
        }

        if (data.Submission != null) {
            $.each(data.Visit, function (index, row) {
                if (labels.Submission(row[0]) > -1) {

                } else {
                    labels.push(row[0]);
                    datasets1.push(0);
                    datasets2.push(0);
                    datasets3.push(0);
                }
            });
        }

        // datasets
        if (data.Visit != null) {
            $.each(data.Visit, function (index, row) {
                datasets1[labels.indexOf(row[0])] = row[1];
            });
        }

        if (data.Click != null) {
            $.each(data.Click, function (index, row) {
                datasets2[labels.indexOf(row[0])] = row[1];
            });
        }

        if (data.Submission != null) {
            $.each(data.Submission, function (index, row) {
                datasets3[labels.indexOf(row[0])] = row[1];
            });
        }

        SignupLandHome.reportCountryChart.data.labels = labels;
        SignupLandHome.reportCountryChart.data.datasets[0].data = datasets1;
        SignupLandHome.reportCountryChart.data.datasets[1].data = datasets2;
        SignupLandHome.reportCountryChart.data.datasets[2].data = datasets3;
        SignupLandHome.reportCountryChart.update();
    },
    refreshReportsCityGraph: function (data) {
        var labels = [];
        var datasets1 = [], datasets2 = [], datasets3 = [];

        // labels
        if (data.Visit != null) {
            $.each(data.Visit, function (index, row) {
                if (labels.indexOf(row[0]) > -1) {

                } else {
                    labels.push(row[0]);
                    datasets1.push(0);
                    datasets2.push(0);
                    datasets3.push(0);
                }
            });
        }

        if (data.Click != null) {
            $.each(data.Click, function (index, row) {
                if (labels.indexOf(row[0]) > -1) {

                } else {
                    labels.push(row[0]);
                    datasets1.push(0);
                    datasets2.push(0);
                    datasets3.push(0);
                }
            });
        }

        if (data.Submission != null) {
            $.each(data.Visit, function (index, row) {
                if (labels.Submission(row[0]) > -1) {

                } else {
                    labels.push(row[0]);
                    datasets1.push(0);
                    datasets2.push(0);
                    datasets3.push(0);
                }
            });
        }

        // datasets
        if (data.Visit != null) {
            $.each(data.Visit, function (index, row) {
                datasets1[labels.indexOf(row[0])] = row[1];
            });
        }

        if (data.Click != null) {
            $.each(data.Click, function (index, row) {
                datasets2[labels.indexOf(row[0])] = row[1];
            });
        }

        if (data.Submission != null) {
            $.each(data.Submission, function (index, row) {
                datasets3[labels.indexOf(row[0])] = row[1];
            });
        }

        SignupLandHome.reportCityChart.data.labels = labels;
        SignupLandHome.reportCityChart.data.datasets[0].data = datasets1;
        SignupLandHome.reportCityChart.data.datasets[1].data = datasets2;
        SignupLandHome.reportCityChart.data.datasets[2].data = datasets3;
        SignupLandHome.reportCityChart.update();
    },

    updateChart: function (type) {
        if (type == 'Analytics') {
            this.analyticsChart.data.datasets[0].hidden = !$('#toggleVisitors_Aanalytics').prop('checked');
            this.analyticsChart.data.datasets[1].hidden = !$('#toggleClicks_Aanalytics').prop('checked');
            this.analyticsChart.data.datasets[2].hidden = !$('#toggleSubmissions_Aanalytics').prop('checked');
            this.analyticsChart.update();
        }

        if (type == 'Hour') {
            this.reportHourChart.data.datasets[0].hidden = !$('#toggleVisitors_Hour').prop('checked');
            this.reportHourChart.data.datasets[1].hidden = !$('#toggleClicks_Hour').prop('checked');
            this.reportHourChart.data.datasets[2].hidden = !$('#toggleSubmissions_Hour').prop('checked');
            this.reportHourChart.update();
        }

        if (type == 'Day') {
            this.reportDayChart.data.datasets[0].hidden = !$('#toggleVisitors_Day').prop('checked');
            this.reportDayChart.data.datasets[1].hidden = !$('#toggleClicks_Day').prop('checked');
            this.reportDayChart.data.datasets[2].hidden = !$('#toggleSubmissions_Day').prop('checked');
            this.reportDayChart.update();
        }

        if (type == 'Country') {
            this.reportCountryChart.data.datasets[0].hidden = !$('#toggleVisitors_Country').prop('checked');
            this.reportCountryChart.data.datasets[1].hidden = !$('#toggleClicks_Country').prop('checked');
            this.reportCountryChart.data.datasets[2].hidden = !$('#toggleSubmissions_Country').prop('checked');
            this.reportCountryChart.update();
        }

        if (type == 'City') {
            this.reportCityChart.data.datasets[0].hidden = !$('#toggleVisitors_City').prop('checked');
            this.reportCityChart.data.datasets[1].hidden = !$('#toggleClicks_City').prop('checked');
            this.reportCityChart.data.datasets[2].hidden = !$('#toggleSubmissions_City').prop('checked');
            this.reportCityChart.update();
        }
    },

    initLeadsTable: function () {
        var me = this;
        this.myLeadsTable = $('#submissionTable').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            columnDefs: [],
            order: [[0, 'asc']]
        });

        this.myLeadsTable.on('draw', function () {
            $("#submissionTable_wrapper .dt-buttons .dt-button").hide();
            if ($("#submissionTable_wrapper .dt-buttons a.button-custom").length == 0) {
                $("#submissionTable_wrapper .dt-buttons").append(`<a class="button-custom button-pdf"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.800293 2.35368C0.800293 1.91301 0.975347 1.49039 1.28695 1.17879C1.59855 0.867193 2.02116 0.692139 2.46183 0.692139L11.5527 0.692139L15.2003 4.33977V15.646C15.2003 16.0867 15.0252 16.5093 14.7136 16.8209C14.402 17.1325 13.9794 17.3075 13.5388 17.3075H2.46183C2.02116 17.3075 1.59855 17.1325 1.28695 16.8209C0.975347 16.5093 0.800293 16.0867 0.800293 15.646V2.35368ZM3.56952 7.33829H1.90799V12.8768H3.01568V10.6614H3.56952C4.01019 10.6614 4.43281 10.4863 4.74441 10.1747C5.05601 9.86312 5.23106 9.4405 5.23106 8.99983C5.23106 8.55916 5.05601 8.13654 4.74441 7.82495C4.43281 7.51335 4.01019 7.33829 3.56952 7.33829ZM8.00029 7.33829H6.33876V12.8768H8.00029C8.44096 12.8768 8.86358 12.7017 9.17518 12.3901C9.48678 12.0785 9.66183 11.6559 9.66183 11.2152V8.99983C9.66183 8.55916 9.48678 8.13654 9.17518 7.82495C8.86358 7.51335 8.44096 7.33829 8.00029 7.33829ZM10.7695 12.8768V7.33829H14.0926V8.44599H11.8772V9.55368H12.9849V10.6614H11.8772V12.8768H10.7695Z" fill="#F18E90"/>
</svg>
</a>`);

                $("#submissionTable_wrapper .dt-buttons").append(`<a class="button-custom button-excel"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.799805 2.35392C0.799805 1.91325 0.974859 1.49064 1.28646 1.17904C1.59806 0.867437 2.02068 0.692383 2.46134 0.692383L11.5522 0.692383L15.1998 4.34001V15.6462C15.1998 16.0869 15.0248 16.5095 14.7132 16.8211C14.4016 17.1327 13.9789 17.3078 13.5383 17.3078H2.46134C2.02068 17.3078 1.59806 17.1327 1.28646 16.8211C0.974859 16.5095 0.799805 16.0869 0.799805 15.6462V2.35392ZM3.01519 8.77078V7.33854H1.9075V9.22937L2.7859 10.1078L1.9075 10.9862V12.877H3.01519V11.4448L3.56904 10.8909L4.12288 11.4448V12.877H5.23057V10.9862L4.35217 10.1078L5.23057 9.22937V7.33854H4.12288V8.77078L3.56904 9.32463L3.01519 8.77078ZM6.33827 7.33854H7.44596V11.7693H9.66134V12.877H6.33827V7.33854ZM14.0921 7.33854H10.769V10.6616H12.9844V11.7693H10.769V12.877H14.0921V9.55392H11.8767V8.44623H14.0921V7.33854Z" fill="#AEEAAE"/>
</svg>
</a>`);
            }

        });

        $(".leads-page").on('click', '#submissionTable_wrapper .dt-buttons .button-pdf', function (e) {
            e.preventDefault();
            me.myLeadsTable.button('.buttons-pdf').trigger();
        });
        $(".leads-page").on('click', '#submissionTable_wrapper .dt-buttons .button-excel', function (e) {
            e.preventDefault();
            me.myLeadsTable.button('.buttons-excel').trigger();
        });
    },
    loadLeadsData: function () {
        var me = this;
        var from = "", to = null;

        SignupUtilities.showLoading();

        if (me.leadsByRange == 'Day')
            from = SignupUtilities.getDateFewDaysAgo(7);
        else if (me.leadsByRange == 'DayOfMonth3')
            from = SignupUtilities.getDateFewMonthsAgo(3);
        else if (me.leadsByRange == 'DayOfMonth6')
            from = SignupUtilities.getDateFewMonthsAgo(6);

        getVisitorsSubmissionsList(me.leadsByWidget, from, to, 'dateCreated', false, me.refreshLeadsTable);
    },
    refreshLeadsTable: function (list) {
        SignupUtilities.hideLoading();
        if (list == null)
            return;

        SignupLandHome.myLeadsTable.clear();
        $.each(list, function (index, item) {
            if (item[7] != null && item[7] != "") {
                var rows = JSON.parse(item[7]);
                var name = "", email = "", phone = "", message = "";
                $.each(rows, function (index1, row) {
                    var field = row.name.toLowerCase();
                    if (field.indexOf("name") > -1) {
                        if (name != "") name += " ";
                        name += row.value;
                    } else if (field.indexOf("mail") > -1) {
                        if (email != "") email += ", ";
                        email += row.value;
                    } else if (field.indexOf("phone") > -1) {
                        if (phone != "") phone += ", ";
                        phone += row.value;
                    } else if (field.indexOf("message") > -1 || field.indexOf("content") > -1) {
                        if (message != "") message += "<br>";
                        message = row.value;
                    }
                });

                if (name != "" || email != "" || phone != "")
                    SignupLandHome.myLeadsTable.row.add([SignupUtilities.formatDate(item[1]), name, email, phone, message, '']);
            }
        });

        SignupLandHome.myLeadsTable.draw();
    },


    initWidgetTable: function () {
        var me = this;
        this.myWidgetTable = $('#my_widget_table').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            columnDefs: [{orderable: false, targets: -1}],
            columns: [{
                data: 'preview',
                render: function (data, type, row) {
                    return `<img class="thumb" src="/assets/images/signup/${data}_thumb.png">`;
                }
            }, {
                data: 'name',
            }, {
                data: 'dateCreated',
                render: function (data, type, row) {
                    return SignupUtilities.formatDate(data);
                }
            }, {
                data: 'status',
                render: function (data, type, row) {
                    return `<span class="badge ${data ? 'bg-success' : 'bg-danger'}">${data ? 'Visible' : 'Hidden'}</span>`;
                }
            }, {
                data: 'views',
            }, {
                data: 'clicks',
            }, {
                data: 'submissions',
            }, {
                data: 'conversions',
            }, {
                render: function (data, type, row) {
                    return `
                            <div class="dropdown">
                                <span class="bi bi-three-dots-vertical" id="dropdownMenuButton${row.index + 1}" data-bs-toggle="dropdown" aria-expanded="false"></span>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton${row.index + 1}">
                                    <li class="dropdown-item action-visible">
                                        <label for="toggleStatus${row.index + 1}">Visible</label>
                                        <div class="switch">
                                            <input type="checkbox" id="toggleStatus${row.index + 1}" ${row.status ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </div>
                                    </li>
                                    <li class="dropdown-item action-submission">
                                        <span><i class="bi bi-envelope"></i> &nbsp; Submissions</span>
                                    </li>
                                    <li class="dropdown-item action-edit">
                                        <span><i class="bi bi-sliders"></i> &nbsp; Edit</span>
                                    </li>
                                    <li class="dropdown-item action-rename">
                                        <span><i class="bi bi-pencil"></i> &nbsp; Rename</span>
                                    </li>
                                    <li class="dropdown-item text-danger action-delete">
                                        <span><i class="bi bi-trash"></i> &nbsp; Delete</span>
                                    </li>
                                </ul>
                            </div>                         
                    `;
                }
            }
            ],
            order: [[1, 'desc']]
        });

        this.myWidgetTable.on('draw', function () {
            $("#my_widget_table_wrapper .dt-buttons .dt-button").hide();
            if ($("#my_widget_table_wrapper .dt-buttons a.button-custom").length == 0) {
                $("#my_widget_table_wrapper .dt-buttons").append(`<a class="button-custom button-pdf"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.800293 2.35368C0.800293 1.91301 0.975347 1.49039 1.28695 1.17879C1.59855 0.867193 2.02116 0.692139 2.46183 0.692139L11.5527 0.692139L15.2003 4.33977V15.646C15.2003 16.0867 15.0252 16.5093 14.7136 16.8209C14.402 17.1325 13.9794 17.3075 13.5388 17.3075H2.46183C2.02116 17.3075 1.59855 17.1325 1.28695 16.8209C0.975347 16.5093 0.800293 16.0867 0.800293 15.646V2.35368ZM3.56952 7.33829H1.90799V12.8768H3.01568V10.6614H3.56952C4.01019 10.6614 4.43281 10.4863 4.74441 10.1747C5.05601 9.86312 5.23106 9.4405 5.23106 8.99983C5.23106 8.55916 5.05601 8.13654 4.74441 7.82495C4.43281 7.51335 4.01019 7.33829 3.56952 7.33829ZM8.00029 7.33829H6.33876V12.8768H8.00029C8.44096 12.8768 8.86358 12.7017 9.17518 12.3901C9.48678 12.0785 9.66183 11.6559 9.66183 11.2152V8.99983C9.66183 8.55916 9.48678 8.13654 9.17518 7.82495C8.86358 7.51335 8.44096 7.33829 8.00029 7.33829ZM10.7695 12.8768V7.33829H14.0926V8.44599H11.8772V9.55368H12.9849V10.6614H11.8772V12.8768H10.7695Z" fill="#F18E90"/>
</svg>
</a>`);

                $("#my_widget_table_wrapper .dt-buttons").append(`<a class="button-custom button-excel"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.799805 2.35392C0.799805 1.91325 0.974859 1.49064 1.28646 1.17904C1.59806 0.867437 2.02068 0.692383 2.46134 0.692383L11.5522 0.692383L15.1998 4.34001V15.6462C15.1998 16.0869 15.0248 16.5095 14.7132 16.8211C14.4016 17.1327 13.9789 17.3078 13.5383 17.3078H2.46134C2.02068 17.3078 1.59806 17.1327 1.28646 16.8211C0.974859 16.5095 0.799805 16.0869 0.799805 15.6462V2.35392ZM3.01519 8.77078V7.33854H1.9075V9.22937L2.7859 10.1078L1.9075 10.9862V12.877H3.01519V11.4448L3.56904 10.8909L4.12288 11.4448V12.877H5.23057V10.9862L4.35217 10.1078L5.23057 9.22937V7.33854H4.12288V8.77078L3.56904 9.32463L3.01519 8.77078ZM6.33827 7.33854H7.44596V11.7693H9.66134V12.877H6.33827V7.33854ZM14.0921 7.33854H10.769V10.6616H12.9844V11.7693H10.769V12.877H14.0921V9.55392H11.8767V8.44623H14.0921V7.33854Z" fill="#AEEAAE"/>
</svg>
</a>`);
            }

        });

        $(".welcome-page").on('click', '#my_widget_table_wrapper .dt-buttons .button-pdf', function (e) {
            e.preventDefault();
            me.myWidgetTable.button('.buttons-pdf').trigger();
        });
        $(".welcome-page").on('click', '#my_widget_table_wrapper .dt-buttons .button-excel', function (e) {
            e.preventDefault();
            me.myWidgetTable.button('.buttons-excel').trigger();
        });
    },

    getWidgetList: function () {
        var me = this;
        SignupUtilities.showLoading();

        getWidgetsList(function (result) {
            SignupUtilities.hideLoading();
            if (result == null)
                return;

            me.WIDGET_LIST = result;
            me.showWidgetList(result);
        });
    },

    showWidgetList: function (list) {
        var active_plugins = 0, visitors = 0, clicks = 0, submissions = 0;

        SignupLandHome.myWidgetTable.clear();

        $.each(list, function (index, row) {
            active_plugins += row[5] ? 1 : 0;
            visitors += row[6] == null ? 0 : row[6];
            clicks += row[7] == null ? 0 : row[7];
            submissions += row[8] == null ? 0 : row[8];

            var v = SignupUtilities.getPluginType(row[2])
            var type = v[0];
            var pluginId = v[1];

            SignupLandHome.myWidgetTable.row.add({
                preview: type + "/" + pluginId,
                index: index,
                id: row[0],
                name: row[1],
                dateCreated: row[3],
                status: row[5],
                views: row[6] == null ? 0 : row[6],
                clicks: row[7] == null ? 0 : row[7],
                submissions: row[8] == null ? 0 : row[8],
                conversions: '',
            });
        });

        SignupLandHome.myWidgetTable.draw();

        $(".stat-card.card-active_plugins .stat-number").text(active_plugins);
        $(".stat-card.card-visitors .stat-number").text(visitors);
        $(".stat-card.card-clicks .stat-number").text(clicks);
        $(".stat-card.card-submissions .stat-number").text(submissions);

        $(".welcome-page .table tbody td.action input[type='checkbox']").trigger('change');

        PreviewWidget.updateWidgetStatus(list.length, active_plugins);
    },

    hideWelcomePage: function () {
        $('.sidebar-right').hide();
        $("#sidebar .nav-link").removeClass('active');
        $("#dashboard_section .welcome-page").hide();
    },

    showWelcomePage: function () {
        this.hideSettingsPage();
        this.hideReportsPage();
        this.hideLeadsPage();
        this.hideHelpPage();

        $("#sidebar").show();
        $("#main_content").removeClass('shifted');

        $("#dashboard_section").removeClass('no-sidebar-right');
        $('.sidebar-right').show();

        $(".sidebar .nav-link").removeClass('active');
        $(".sidebar .nav-link[data-menu='home']").addClass('active');
        $("#dashboard_section .welcome-page").show();

        $("#dashboard_section").show();
    },

    hideSettingsPage: function () {
        $("#dashboard_section .settings-page").hide();
    },

    showSettingsPage: function () {
        this.hideWelcomePage();
        this.hideReportsPage();
        this.hideLeadsPage();
        this.hideHelpPage();

        $("#sidebar").show();
        $("#main_content").removeClass('shifted');

        $("#dashboard_section").addClass('no-sidebar-right');
        $('.sidebar-right').hide();
        $("#dashboard_section .settings-page .sub-menu a[data-menu='account']").trigger('click');
        $("#dashboard_section .settings-page").show();

        if (mainUserDetails['avatar']) {
            $("#dashboard_section .settings-account .avatar-section .avatar").attr('src', mainUserDetails['avatar']);
        }

        fillForm('#updateAccountDetailsUser', mainUserDetails);
        fillForm('#updateEmailUser', mainUserDetails);

        $("#dashboard_section").show();
    },

    showSubscriptionPage: function () {
        this.hideWelcomePage();
        this.hideReportsPage();
        this.hideLeadsPage();
        this.hideHelpPage();

        $("#dashboard_section").addClass('no-sidebar-right');
        $('.sidebar-right').hide();
        $("#dashboard_section .settings-page .sub-menu a[data-menu='subscription']").trigger('click');
        $("#dashboard_section .settings-page").show();

        $("#dashboard_section").show();
    },

    showReportsPage: function () {
        this.hideWelcomePage();
        this.hideSettingsPage();
        this.hideLeadsPage();
        this.hideHelpPage();

        $("#dashboard_section").addClass('no-sidebar-right');
        $('.sidebar-right').hide();
        $(".sidebar .nav-link").removeClass('active');
        $(".sidebar .nav-link[data-menu='reports']").addClass('active');

        $("#dashboard_section .reports-page").show();
        $("#dashboard_section").show();

        SignupUtilities.showLoading();
        getWidgetsReportSummary(null, null, null, null, this.refreshReports);
    },

    hideReportsPage: function () {
        $("#dashboard_section .reports-page").hide();
    },

    showLeadsPage: function (widgetId) {
        this.leadsByWidget = widgetId;

        this.hideWelcomePage();
        this.hideSettingsPage();
        this.hideReportsPage();
        this.hideHelpPage();

        $("#dashboard_section").addClass('no-sidebar-right');
        $('.sidebar-right').hide();
        $(".sidebar .nav-link").removeClass('active');
        $(".sidebar .nav-link[data-menu='leads']").addClass('active');

        $("#dashboard_section .leads-page").show();
        $("#dashboard_section").show();

        this.loadLeadsData();
    },

    hideLeadsPage: function () {
        $("#dashboard_section .leads-page").hide();
    },

    showHelpPage: function () {
        this.hideWelcomePage();
        this.hideSettingsPage();
        this.hideReportsPage();
        this.hideLeadsPage();

        $("#dashboard_section").addClass('no-sidebar-right');
        $('.sidebar-right').hide();
        $(".sidebar .nav-link").removeClass('active');
        $(".sidebar .nav-link[data-menu='help']").addClass('active');

        $("#dashboard_section .help-page").show();
        $("#dashboard_section").show();
    },

    hideHelpPage: function () {
        $("#dashboard_section .help-page").hide();
    },

    hide: function () {
        $("#sidebar").hide();
        $("#main_content").addClass('shifted');
        $('.sidebar-right').hide();
        $("#dashboard_section").hide();
    },

    show: function () {  // call it from Plugin page
        this.showWelcomePage();
        this.getWidgetList();   // reload widget list
    }
};

var WidgetHome = {
    previewMode: "desktop",

    init: function () {
        var me = this;

        $('#widget_section .preview-area h5 i').tooltip();
        $('#widget_section .tooltip-icon').tooltip();

        $("#widget_section").on('click', '.page-toolbar-part .back-arrow', function () {
            me.hide();
            SignupLandHome.showWelcomePage();
        });

        $("#widget_section").on('click', '.icon-toolbar .settings-btn', function (e) {
            e.preventDefault();
            me.hide();
            SignupLandHome.showSettingsPage();
        })

        $("#widget_section").on('click', '.header-container .breadcrumb-item:not(.active) a', function () {
            me.hide();
            SignupLandHome.showWelcomePage();
        })

        $("#widget_section").on('click', '.left-side .tab-content .template-item:not(.active)', function () {
            // TODO - get exact image path
            $("#widget_section .left-side .tab-content .template-item").removeClass('active');
            $(this).addClass('active');

            $(".widget-section .plugin-widget-container").removeClass('active');

            var type = $(this).data('type');
            var index = $(this).data('index');
            me.preview(type, index);
        });

        $("#widget_section").on('click', '.preview-toolbar .btn:not(.active)', function (e) {
            if ($("#widget_section .left-side .tab-content .template-item.active").length == 0) {
                e.preventDefault();
                return false;
            }

            var type = $(this).data('type');
            if (type == "desktop" || type == "mobile") {
                $("#widget_section .preview-toolbar .btn").removeClass('active');
                $(this).addClass('active');

                $("#preview_content").removeClass('mobile-view').removeClass('fullscreen-view');
                if (type == "mobile") {
                    $("#preview_content").addClass('mobile-view')
                }
            } else {    // fullscreen
                $("#fullscreen_preview_content").html($("#preview_content").html());
                $("#fullscreenDialog").modal('show');
            }
        });

        $("#widget_section").on('click', '.preview-actions .btn', function (e) {
            if ($("#widget_section .left-side .tab-content .template-item.active").length == 0) {
                e.preventDefault();
                return false;
            }

            var type = $(this).data('type');
            if (type == "customize") {
                me.hide();

                var data = {};
                data.widget = {
                    id: "",
                    index: $("#widget_section .left-side .tab-content .template-item.active").data('index'),
                    type: $("#widget_section .left-side .tab-content .template-item.active").data('type'),
                }

                PluginCustomization.show(data);
            } else if (type == "publish") {
                PreviewWidget.widgetType = $("#widget_section .left-side .tab-content .template-item.active").data('type');
                PreviewWidget.widgetID = $("#widget_section .left-side .tab-content .template-item.active").data('index');
                PreviewWidget.pluginID = "";
                PreviewWidget.publish(true, true);
            }
        });

        // add plugin close event
        $("#widget_section .plugin-widget-container").on('click', '.close-button', function (e) {
            e.preventDefault();
            $("#widget_section .left-side .tab-content .template-item").removeClass('active');
            $("#widget_section .plugin-widget-container").removeClass('active');
        });

    },

    preview: function (type, index) {
        PreviewWidget.isPreview = true
        PreviewWidget.widgetType = type;
        PreviewWidget.widgetID = index;
        PreviewWidget.pluginID = "";

        var data = {};
        data = PreviewWidget.getDefaultData();
        var active_container = "." + type + "." + "form_" + index;
        $(".widget-section .plugin-widget-container" + active_container).addClass('active');

        data.widget = {
            id: "",
            index: index,
            type: type,
        }

        PreviewWidget.updateAll(data);

        $(window).trigger('scroll');
    },

    show: function () {
        var me = this;

        // TODO - need to be initialize widget or plugin.
        // TODO - initialize parameters and ui according to parameters.
        $("#widget_section .left-side .tab-content .template-item").removeClass('active');

        me.previewMode = "desktop";
        $("#widget_section .preview-toolbar .btn").removeClass('active');
        $("#widget_section .preview-toolbar .btn[data-type='desktop']").addClass('active');

        $("#widget_section .plugin-widget-container").removeClass('active');

        $('.widget-section').show()

        $(window).trigger('scroll');
    },

    hide: function () {
        $('.widget-section').hide()
        // $('.plugin-section').hide()
    }
};

var PluginCustomization = {
    previewMode: "desktop",

    init: function () {
        var me = this;

        $('#plugin_section .preview-area h5 i').tooltip();

        $("#plugin_section").on('click', '.page-toolbar-part .back-arrow', function () {
            me.hide();
            WidgetHome.show();
        });

        $("#plugin_section").on('click', '.icon-toolbar .settings-btn', function (e) {
            e.preventDefault();
            me.hide();
            SignupLandHome.showSettingsPage();
        })

        $("#plugin_section").on('click', '.header-container .breadcrumb-item:not(.active) a', function () {
            var menu = $(this).parent('.breadcrumb-item').data('menu');
            me.hide();

            if (menu == 'home') {
                SignupLandHome.showWelcomePage();
            } else if (menu == 'plugin') {
                WidgetHome.show();
            }
        });

        $("#plugin_section").on('click', '.preview-toolbar .btn:not(.active)', function () {
            var type = $(this).data('type');
            console.log("-----", type)
            if (type == "desktop" || type == "mobile") {
                $("#plugin_section .preview-toolbar .btn").removeClass('active');
                $(this).addClass('active');

                $("#preview_widget").removeClass('mobile-view').removeClass('fullscreen-view');
                if (type == "mobile") {
                    $("#preview_widget").addClass('mobile-view')
                }
            } else {    // fullscreen
                $("#fullscreen_preview_content").html($("#preview_widget").html());
                $("#fullscreenDialog").modal('show');
            }
        });

        // Save a draft
        $("#plugin_section").on('click', '.preview-actions .btn-save-draft', function (e) {
            e.preventDefault();
            me.hide();
            WidgetHome.show();
        });

        // Publish template
        $("#plugin_section").on('click', '.preview-actions .btn-publish', function (e) {
            e.preventDefault();
            PreviewWidget.publish(true, false);
        });

        $("#pluginFormIconTab button").on('shown.bs.tab', function (e) {
            var target = $(e.target).data('bs-target');
            if (target == '#form_tab') {
                PreviewWidget.update('touchShow', false);
                var active_container = "." + PreviewWidget.widgetType + "." + "form_" + PreviewWidget.widgetID;
                $(".plugin-section .plugin-widget-container" + active_container).addClass('active');
            } else if (target == '#icon_tab') {
                PreviewWidget.update('touchShow', true);
                var active_container = "." + PreviewWidget.widgetType + "." + "form_" + PreviewWidget.widgetID;
                $(".plugin-section .plugin-widget-container" + active_container).removeClass('active');
            }
        });
    },

    hide: function () {
        // TODO - initialize parameters and ui according to parameters.
        PreviewWidget.isPreview = false
        PreviewWidget.widgetType = '';
        PreviewWidget.widgetID = '';
        PreviewWidget.pluginID = '';

        $(".plugin-section").hide();
    },

    show: function (data) {
        // TODO - initialize parameters and ui according to parameters.
        console.log("-------------", data);

        $(".plugin-section .plugin-widget-container").removeClass('active');

        if (data.widget) {
            PreviewWidget.isPreview = true
            PreviewWidget.widgetType = data.widget.type;
            PreviewWidget.widgetID = data.widget.index;
            PreviewWidget.pluginID = data.widget.id;

            var active_container = "." + data.widget.type + "." + "form_" + data.widget.index;
            $(".plugin-section .plugin-widget-container" + active_container).addClass('active');

            if (PreviewWidget.pluginID == "") { // new widget
                data = PreviewWidget.getDefaultData();
            }

            PreviewWidget.update('touchShow', false);
            $("#formTab").tab('show');

            PreviewWidget.updateAll(data);
            $(".plugin-section").show();

            $(window).trigger('scroll');
        }
    }
}

var WidgetComponentPanel = {
    POSITION_NON_SELECTED_COLOR: '#8e91a5',
    POSITION_SELECTED_COLOR: '#F5576C',

    init: function () {
        // Color picker
        $('.widget-area').on('click', '.color-circle', function () {
            $(this).next('input').trigger('click')
        });

        $('.widget-area').on('change', '.color-item input', function () {
            var newColor = $(this).val();
            var targetCircle = $(this).prev('.color-circle');
            var target = $(targetCircle).data('color-target')
            targetCircle.css('background-color', newColor);

            if (target == 'shadowColor') {
                PreviewWidget.shadow.color = newColor;
                PreviewWidget.updateInputShadow();
            } else {
                PreviewWidget.update(target, newColor);
            }
        });

        // Font
        $(".widget-area").on('change', 'select.set-font', function () {
            var font = $(this).val();
            var target = $(this).data('target');

            PreviewWidget.update(target, font);
        });

        // Icon Tab / Plugin, Position
        $(".widget-area .plugin-panel").on('mouseover', '.item:not(.active)', function () {
            $(".plugin-panel .item:not(.active) svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
            $(".plugin-panel .item:not(.active) svg > g > g > g > rect:last-child").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
            $(this).find("svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_SELECTED_COLOR);
            $(this).find("svg > g > g > g > rect:last-child").attr('fill', WidgetComponentPanel.POSITION_SELECTED_COLOR);
        });
        $(".widget-area .plugin-panel").on('mouseout', '.item:not(.active)', function () {
            $(".plugin-panel .item:not(.active) svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
            $(".plugin-panel .item:not(.active) svg > g > g > g > rect:last-child").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
        });

        $(".widget-area .plugin-panel").on('click', '.item:not(.active)', function () {
            var plugin = $(this).data('plugin');
            $(".widget-area .plugin-panel .item svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
            $(".widget-area .plugin-panel .item svg > g > g > g > rect:last-child").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
            $(this).find("svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_SELECTED_COLOR);
            $(this).find("svg > g > g > g > rect:last-child").attr('fill', WidgetComponentPanel.POSITION_SELECTED_COLOR);

            $(".widget-area .position-panel .item").hide();
            $(".widget-area .position-panel .item[data-plugin='" + plugin + "']").show()

            $(".widget-area .plugin-panel .item").removeClass('active');
            $(this).addClass('active');

            if (plugin=='circle')
                $("#roundingSlider").val(50);
            else
                $("#roundingSlider").val(8);

            if ($(".widget-area .position-panel .item[data-plugin='" + plugin + "'].active").length == 0) {
                $(".widget-area .position-panel .item[data-plugin='" + plugin + "'][data-position='" + "right-bottom" + "']").trigger('click');
            } else {
                PreviewWidget.updatePluginAndPosition(plugin, $(".widget-area .position-panel .item[data-plugin='" + plugin + "'].active").data('position'));
            }
        });

        $(".widget-area .position-panel").on('mouseover', '.item:not(.active)', function () {
            $(".widget-area .position-panel .item:not(.active) svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
            $(this).find("svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_SELECTED_COLOR);
        });
        $(".widget-area .position-panel").on('mouseout', '.item:not(.active)', function () {
            $(".widget-area .position-panel .item:not(.active) svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
        });

        $(".widget-area .position-panel").on('click', '.item:not(.active)', function () {
            var position = $(this).data('position');

            $(".widget-area .position-panel .item svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
            $(".widget-area .position-panel .item svg > g > g > rect:last-child").attr('fill', WidgetComponentPanel.POSITION_NON_SELECTED_COLOR);
            $(this).find("svg > g > g > path").attr('fill', WidgetComponentPanel.POSITION_SELECTED_COLOR);
            $(this).find("svg > g > g > rect:last-child").attr('fill', WidgetComponentPanel.POSITION_SELECTED_COLOR);
            $(".widget-area .position-panel .item").removeClass('active');
            $(this).addClass('active');

            PreviewWidget.updatePluginAndPosition($(".widget-area .plugin-panel .item.active").data('plugin'), position);
        });

        // Tooltip
        $('.widget-area .tooltip-icon').tooltip();

        // Open After Page loaded
        $("#openByButton").on('change', function () {
            if ($(this).prop('checked')) {
                $("#openAfterPageLoaded_Time").prop('disabled', true);
            } else {
                $("#openAfterPageLoaded_Time").prop('disabled', false);
            }
        })

        $("#openAfterPageLoaded").on('change', function () {
            if ($(this).prop('checked')) {
                $("#openAfterPageLoaded_Time").prop('disabled', false)
            } else {
                $("#openAfterPageLoaded_Time").prop('disabled', true)
            }
        })

        // Slider
        $('#pluginSizeSlider').slider({
            min: 12,
            max: 32,
            value: 16,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("pluginSize", event.value.newValue);
        });

        $('#spacingBottomSlider').slider({
            min: 0,
            max: 50,
            value: 0,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.iconVSpacing = event.value.newValue;
            PreviewWidget.update("bottomSpacing", event.value.newValue);
        });

        $('#spacingSideSlider').slider({
            min: 0,
            max: 50,
            value: 0,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.iconHSpacing = event.value.newValue;
            PreviewWidget.update("sideSpacing", event.value.newValue);
        });

        $('#roundingSlider').slider({
            min: 0,
            max: 50,
            value: 0,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("rounding", event.value.newValue);
        });

        $('#sizeWidthSlider').slider({
            min: 50,
            max: 100,
            value: 100,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("sizeWidth", event.value.newValue);
        });

        $('#sizeHeightSlider').slider({
            min: 12,
            max: 75,
            value: 40,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.update("sizeHeight", event.value.newValue);
        });

        $('#shadowSizeSlider').slider({
            min: 0,
            max: 10,
            value: 0,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.shadow.size = event.value.newValue;
            PreviewWidget.updateInputShadow();
        });

        $('#shadowOpacitySlider').slider({
            min: 0,
            max: 100,
            value: 0,
            tooltip: 'hide'
        }).on('change', function (event) {
            PreviewWidget.shadow.opacity = event.value.newValue;
            PreviewWidget.updateInputShadow();
        });

        // Icon group
        $('.widget-area .icon-btn').on('click', function () {
            $(".widget-area .icon-btn").removeClass('selected');
            $(this).addClass('selected');
            PreviewWidget.update('touchIcon', $(this).data('icon'));
        });

        $("#addTextOption").on('change', function (e) {
            PreviewWidget.update("touchTextIs", $(this).prop('checked'))
        });

        $(".widget-area").on('change', 'input.design-text-input', function () {
            PreviewWidget.update("touchText", $(this).val());
        });

        // Add Field
        $('.widget-area .fields-container .btn-add').on('click', function (e) {
            e.stopPropagation()
            const $popup = $(this).next('.actions-popup');
            $popup.show();
        });

        $('.widget-area .fields-container .actions-popup').on('click', '.action-item', function (e) {
            e.stopPropagation();
            e.preventDefault()

            var name = "Field " + parseInt(Math.random() * 99999);

            // Hide all other popups
            $('.widget-area .fields-container .actions-popup').hide();
            var type = $(this).data('type');
            var html = `<tr data-type="${type}">
                            <td class="cell-name">
                                <input type="text" name="${name}" value="${name}" placeholder="${name}">
                            </td>
                            <td class="cell-required">
                                <div class="custom-switch">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox">
                                    </div>
                                </div>
                            </td>
                            <td class="cell-hidden">
                                <div class="custom-switch">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox">
                                    </div>
                                </div>
                            </td>
                            <td class="cell-action"><span><i class="bi bi-x-circle"></i></span></td>
                        </tr>`;
            $("#fields_table tbody").append(html);
            PreviewWidget.updateInputFields();
        });

        // thanks you screen
        $(".widget-area .thanks-container").on('change', 'input[type="text"]', function () {
            PreviewWidget.update($(this).data('target'), $(this).val());
        });

        $(".widget-area .thanks-container").on('change', 'input[type="checkbox"]', function () {
            PreviewWidget.update($(this).data('target'), $(this).prop('checked'));
        });

        $(".thanks-you-screen").on('click', '.close', function (e) {
            e.preventDefault();
            $(".widget-area .btn-view-thanks-screen").trigger('click');
        });

        $(".widget-area .btn-view-thanks-screen").on('click', function (e) {
            e.preventDefault();

            if ($(this).hasClass('selected')) {
                $(this).html("View Thanks You Screen");
                $(this).removeClass('selected');
                $("#thankYouModal").hide();
            } else {
                $(this).html("Hide Thanks You Screen");
                $(this).addClass('selected');
                $("#thankYouModal").show();
            }
        });

        // remove field button
        $('.widget-area .fields-container #fields_table').on('click', 'td.cell-action span', function (e) {
            $(this).parent('td').parent('tr').remove();
            PreviewWidget.updateInputFields();
        });

        // table record
        $('.widget-area .fields-container #fields_table').on('change', 'td.cell-name>input', function (e) {
            PreviewWidget.updateInputFields();
        });
        $('.widget-area .fields-container #fields_table').on('change', 'td.cell-required input', function (e) {
            PreviewWidget.updateInputFields();
        });
        $('.widget-area .fields-container #fields_table').on('change', 'td.cell-hidden input', function (e) {
            PreviewWidget.updateInputFields();
        });

        // scroll event
        $(window).scroll(function () {
            // Select the element and its parent
            var $element = $('#preview_widget .plugin-widget-container.active');
            if ($element.length == 0) {
                // $element = $('#preview_content .plugin-widget-container.active');
                // if ($element.length==0)
                return;
            }

            var $parent = $element.parent().parent();

            var windowWidth = $(window).width();
            var windowHeight = $(window).height();

            // Get the element's dimensions
            var elementWidth = $element.outerWidth();
            var elementHeight = $element.outerHeight();

            // Get the current scroll position
            var scrollTop = $(window).scrollTop();
            var scrollLeft = $(window).scrollLeft();

            // Get the parent's offset
            var parentOffset = $parent.offset();

            // Calculate the new position to center the element relative to the window
            var newLeft = scrollLeft + (windowWidth - elementWidth) / 2 - parentOffset.left;
            var newTop = scrollTop + (windowHeight - elementHeight) / 2 - parentOffset.top - 16;
            if (newTop < 16)
                newTop = 16;

            // Update the element's position
            $element.css({
                top: newTop + 'px'
            });

            var screenTop = scrollTop + (windowHeight - $(".thanks-you-screen .modal-content").outerHeight()) / 2 - parentOffset.top - 16;
            if (screenTop < 16)
                screenTop = 16;

            $(".thanks-you-screen").css({top: screenTop + 'px'})
        });

        // Create a ResizeObserver instance
        var resizeObserver = new ResizeObserver(function (entries) {
            entries.forEach(function (entry) {
                if ($(entry.target).hasClass('left-side')) {
                    var h = $("#widget_section .left-side").height() - 230;
                    $("#sitePreview").css('height', h + 'px');

                    $(window).trigger('scroll');
                }

                if ($(entry.target).hasClass('customization-side')) {
                    var h = $("#plugin_section .customization-side").height() - 230;
                    $("#sitePreview2").css('height', h + 'px');

                    $(window).trigger('scroll');
                }
            });
        });
        resizeObserver.observe($("#plugin_section .customization-side")[0]);
        resizeObserver.observe($("#widget_section .left-side")[0]);
    },

    updatePluginAndPosition: function (plugin, position) {
        $(".widget-area .plugin-panel .item[data-plugin='" + plugin + "']").trigger('click');
        setTimeout(function () {
            $(".widget-area .position-panel .item[data-plugin='" + plugin + "'][data-position='" + position + "']").trigger('click');
        }, 30);
    }
}

var PreviewWidget = {
    isPreview: false,
    pluginID: null, // id
    widgetID: '',   // widget index
    widgetType: '',

    roundingType: '',
    touchPosition: 'right-bottom',
    iconVSpacing: 0,
    iconHSpacing: 0,
    shadow: {
        size: 0,
        opacity: 0,
        color: '#000000',
    },

    init: function () {
        this.isPreview = false;
        this.widgetID = '';
        this.widgetType = '';
        this.pluginID = null;

        // edit text
        $('.plugin-widget-container .editable').on('click', function (e) {
            // Get the current content
            var currentContent = $(this).html().trim().replace(/<br>/g, '\n');
            if (currentContent.indexOf('<textarea') > -1) {
                e.preventDefault();
                return false;
            }

            var me = $(this);

            // Replace the content with a textarea
            $(this).html('<textarea id="edit-textarea" rows="5">' + currentContent + '</textarea>');

            // Auto-focus the textarea
            $('#edit-textarea').focus();

            // When the textarea loses focus, replace it with the edited content
            $('#edit-textarea').on('blur', function () {
                var updatedContent = $(this).val().replace(/\n/g, '<br>');
                me.html(updatedContent);
            });
        });

        // publish success dialog action
        $("#publishSuccessModal").on('click', '.btn-pink', function (e) {
            e.preventDefault();
        });

        $("#publishSuccessModal").on('click', '.close', function (e) {
            e.preventDefault();
            $("#publishSuccessModal").modal('hide');
        });

        // go to dashboard
        $("#publishSuccessModal").on('click', '.btn-outline-secondary', function (e) {
            e.preventDefault();

            $("#publishSuccessModal").modal('hide');
            PluginCustomization.hide();
            SignupLandHome.show();
        });

        // reach limit modal
        $("#limitReachedModal").on('click', '.btn-pink', function (e) {
            e.preventDefault();
            callUpgradePage();
            // SignupLandHome.showSubscriptionPage();
        });

        // go to dashboard
        $("#limitReachedModal").on('click', '.btn-outline-secondary, .close', function (e) {
            e.preventDefault();
            $("#limitReachedModal").modal('hide');
        });

        this.loadPreviewSite();
        this.updateUserInformation();
        WidgetComponentPanel.updatePluginAndPosition('rect', 'right-bottom');
    },

    getDefaultData: function () {
        var data = {
            colors: [],
            fonts: [],
            touch: {
                icon: 'bi-envelope-fill',
                text: '',
                open: 'button',
                duration: 10,
            },
            fields: [],
            advanced: {
                plugin: 40,
                bottomSpacing: 10,
                sideSpacing: 0,
                rounding: 0,
            },
            "thanks": {
                "is": false,
                "title": {
                    "is": false,
                    "text": "Thanks for submitting!"
                },
                "text": {
                    "is": false,
                    "text": "Your message has been sent!"
                },
                "button": {
                    "is": false,
                    "text": "Go Home"
                }
            },
            position: 'right-bottom',
            plugin: 'rect',
            thanks: {}
        };

        if (this.widgetType == "contact_forms") {
            if (this.widgetID == 1) {
                return {
                    "colors": [
                        {
                            "name": "backgroundColor",
                            "value": "#400571"
                        },
                        {
                            "name": "accentColor",
                            "value": "#ff0f83"
                        },
                        {
                            "name": "titleTextColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "bodyTextColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "fieldTextColor",
                            "value": "#2e2e2e"
                        },
                        {
                            "name": "iconBackgroundColor",
                            "value": "#f53dd3"
                        },
                        {
                            "name": "iconForeColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "textColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "thanksTitleColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksButtonColor",
                            "value": "#ffffff"
                        }
                    ],
                    "fonts": [
                        {
                            "name": "titleFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "secondaryFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "fieldFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "touchFont",
                            "value": "Plus Jakarta Sans"
                        }
                    ],
                    "touch": {
                        "icon": "bi-envelope-fill",
                        "text": "Get In Touch!",
                        "open": "button",
                        "duration": "5"
                    },
                    "fields": [
                        {
                            "type": "short-text",
                            "name": "Your Name",
                            "required": true,
                            "hidden": false
                        },
                        {
                            "type": "short-text",
                            "name": "Your Email",
                            "required": true,
                            "hidden": false
                        },
                        {
                            "type": "long-text",
                            "name": "Your Message",
                            "required": false,
                            "hidden": false
                        }
                    ],
                    "advanced": {
                        "plugin": "40",
                        "bottomSpacing": "10",
                        "sideSpacing": "0",
                        "rounding": "0"
                    },
                    "thanks": {
                        "is": false,
                        "title": {
                            "is": false,
                            "text": "Thanks for submitting!"
                        },
                        "text": {
                            "is": false,
                            "text": "Your message has been sent!"
                        },
                        "button": {
                            "is": false,
                            "text": "Go Home"
                        }
                    },
                    "plugin": "rect",
                    "position": 'right-bottom',
                };
            } else if (this.widgetID == 2) {
                return {
                    "colors": [
                        {
                            "name": "backgroundColor",
                            "value": "#f0f0f0"
                        },
                        {
                            "name": "accentColor",
                            "value": "#044e4c"
                        },
                        {
                            "name": "titleTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "bodyTextColor",
                            "value": "#787878"
                        },
                        {
                            "name": "fieldTextColor",
                            "value": "#121212"
                        },
                        {
                            "name": "iconBackgroundColor",
                            "value": "#bd00b6"
                        },
                        {
                            "name": "iconForeColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "textColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "thanksTitleColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksButtonColor",
                            "value": "#ffffff"
                        }
                    ],
                    "fonts": [
                        {
                            "name": "titleFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "secondaryFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "fieldFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "touchFont",
                            "value": "Plus Jakarta Sans"
                        }
                    ],
                    "touch": {
                        "icon": "bi-envelope-fill",
                        "text": "Contact Us",
                        "open": "button",
                        "duration": "10"
                    },
                    "fields": [
                        {
                            "type": "short-text",
                            "name": "Full Name",
                            "required": true,
                            "hidden": false
                        },
                        {
                            "type": "short-text",
                            "name": "Your Mail",
                            "required": true,
                            "hidden": false
                        },
                        {
                            "type": "long-text",
                            "name": "Message",
                            "required": true,
                            "hidden": false
                        }
                    ],
                    "advanced": {
                        "plugin": "49",
                        "bottomSpacing": "7",
                        "sideSpacing": "0",
                        "rounding": "20"
                    },
                    "thanks": {
                        "is": false,
                        "title": {
                            "is": false,
                            "text": "Thanks for submitting!"
                        },
                        "text": {
                            "is": false,
                            "text": "Your message has been sent!"
                        },
                        "button": {
                            "is": false,
                            "text": "Go Home"
                        }
                    },
                    "position": "right-bottom",
                    "plugin": "rect",
                };
            } else if (this.widgetID == 3) {
                return {
                    "colors": [
                        {
                            "name": "backgroundColor",
                            "value": "#3b3b3b"
                        },
                        {
                            "name": "accentColor",
                            "value": "#b27cff"
                        },
                        {
                            "name": "titleTextColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "bodyTextColor",
                            "value": "#c2c2c2"
                        },
                        {
                            "name": "fieldTextColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "iconBackgroundColor",
                            "value": "#2c3145"
                        },
                        {
                            "name": "iconForeColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "textColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "thanksTitleColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksButtonColor",
                            "value": "#ffffff"
                        }
                    ],
                    "fonts": [
                        {
                            "name": "titleFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "secondaryFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "fieldFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "touchFont",
                            "value": "Plus Jakarta Sans"
                        }
                    ],
                    "touch": {
                        "icon": "bi-envelope-fill",
                        "text": "",
                        "open": "button",
                        "duration": "10"
                    },
                    "fields": [
                        {
                            "type": "short-text",
                            "name": "First Name",
                            "required": true,
                            "hidden": false
                        },
                        {
                            "type": "short-text",
                            "name": "Last Name",
                            "required": true,
                            "hidden": false
                        },
                        {
                            "type": "short-text",
                            "name": "Phone Number",
                            "required": false,
                            "hidden": false
                        },
                        {
                            "type": "short-text",
                            "name": "Your Mail",
                            "required": true,
                            "hidden": false
                        },
                        {
                            "type": "long-text",
                            "name": "Your Message",
                            "required": false,
                            "hidden": false
                        }
                    ],
                    "advanced": {
                        "plugin": "40",
                        "bottomSpacing": "6",
                        "sideSpacing": "0",
                        "rounding": "21"
                    },
                    "thanks": {
                        "is": false,
                        "title": {
                            "is": false,
                            "text": "Thanks for submitting!"
                        },
                        "text": {
                            "is": false,
                            "text": "Your message has been sent!"
                        },
                        "button": {
                            "is": false,
                            "text": "Go Home"
                        }
                    },
                    "position": "right-bottom",
                    "plugin": "rect",
                    "description": "company@mail.com<br /><br>1-000-111-2222<br /><br>82323423 dsfas 23423 3343<br /><br>4343-343",
                    "widget": {
                        "id": 537,
                        "index": 3,
                        "type": "contact_forms"
                    }
                };
            } else if (this.widgetID == 4) {
                return {
                    "colors": [
                        {
                            "name": "backgroundColor",
                            "value": "#303030"
                        },
                        {
                            "name": "accentColor",
                            "value": "#fff694"
                        },
                        {
                            "name": "titleTextColor",
                            "value": "#050505"
                        },
                        {
                            "name": "bodyTextColor",
                            "value": "#303030"
                        },
                        {
                            "name": "fieldTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "iconBackgroundColor",
                            "value": "#2c3145"
                        },
                        {
                            "name": "iconForeColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "textColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "thanksTitleColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksButtonColor",
                            "value": "#ffffff"
                        }
                    ],
                    "fonts": [
                        {
                            "name": "titleFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "secondaryFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "fieldFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "touchFont",
                            "value": "Plus Jakarta Sans"
                        }
                    ],
                    "touch": {
                        "icon": "bi-envelope-fill",
                        "text": "",
                        "open": "button",
                        "duration": "10"
                    },
                    "fields": [
                        {
                            "type": "short-text",
                            "name": "First Name",
                            "required": false,
                            "hidden": false
                        },
                        {
                            "type": "short-text",
                            "name": "Last Name",
                            "required": false,
                            "hidden": false
                        },
                        {
                            "type": "short-text",
                            "name": "Phone Number",
                            "required": false,
                            "hidden": false
                        },
                        {
                            "type": "short-text",
                            "name": "Email Address",
                            "required": false,
                            "hidden": false
                        },
                        {
                            "type": "long-text",
                            "name": "Your Message",
                            "required": false,
                            "hidden": false
                        }
                    ],
                    "advanced": {
                        "plugin": "40",
                        "bottomSpacing": "10",
                        "sideSpacing": "0",
                        "rounding": "0"
                    },
                    "thanks": {
                        "is": false,
                        "title": {
                            "is": false,
                            "text": "Thanks for submitting!"
                        },
                        "text": {
                            "is": false,
                            "text": "Your message has been sent!"
                        },
                        "button": {
                            "is": false,
                            "text": "Go Home"
                        }
                    },
                    "position": "right-bottom",
                    "plugin": "rect",
                    "description": "my_343@gmai.com<br /><br>1-233-343-3434<br /><br>3433, S3 Street, 342 State, US.<br /><br>343434",
                };
            }
        } else if (this.widgetType == 'join_newsletter') {
            if (this.widgetID == 1) {
                return {
                    "colors": [
                        {
                            "name": "backgroundColor",
                            "value": "#303030"
                        },
                        {
                            "name": "accentColor",
                            "value": "#ff1fd6"
                        },
                        {
                            "name": "titleTextColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "bodyTextColor",
                            "value": "#a3a3a3"
                        },
                        {
                            "name": "fieldTextColor",
                            "value": "#2e2e2e"
                        },
                        {
                            "name": "iconBackgroundColor",
                            "value": "#2c3145"
                        },
                        {
                            "name": "iconForeColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "textColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "thanksTitleColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksButtonColor",
                            "value": "#ffffff"
                        }
                    ],
                    "fonts": [
                        {
                            "name": "titleFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "secondaryFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "fieldFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "touchFont",
                            "value": null
                        }
                    ],
                    "touch": {
                        "icon": "bi-envelope-fill",
                        "text": "",
                        "open": "button",
                        "duration": "10"
                    },
                    "fields": [],
                    "advanced": {
                        "plugin": "51",
                        "bottomSpacing": "0",
                        "sideSpacing": "7",
                        "rounding": "24"
                    },
                    "thanks": {
                        "is": false,
                        "title": {
                            "is": false,
                            "text": "Thanks for submitting!"
                        },
                        "text": {
                            "is": false,
                            "text": "Your message has been sent!"
                        },
                        "button": {
                            "is": false,
                            "text": "Go Home"
                        }
                    },
                    "position": "right-bottom",
                    "plugin": "rect",
                    "description": "my_343@gmai.com<br /><br>1-233-343-3434<br /><br>3433, S3 Street, 342 State, US.<br /><br>343434",
                    "widget": {
                        "id": 720,
                        "index": 1,
                        "type": "join_newsletter"
                    }
                };
            } else if (this.widgetID == 2) {
                return {
                    "colors": [
                        {
                            "name": "backgroundColor",
                            "value": "#f5f5f5"
                        },
                        {
                            "name": "accentColor",
                            "value": "#99bbff"
                        },
                        {
                            "name": "titleTextColor",
                            "value": "#121212"
                        },
                        {
                            "name": "bodyTextColor",
                            "value": "#9e9e9e"
                        },
                        {
                            "name": "fieldTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "iconBackgroundColor",
                            "value": "#2c3145"
                        },
                        {
                            "name": "iconForeColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "textColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "thanksTitleColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksButtonColor",
                            "value": "#ffffff"
                        }
                    ],
                    "fonts": [
                        {
                            "name": "titleFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "secondaryFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "fieldFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "touchFont",
                            "value": "Plus Jakarta Sans"
                        }
                    ],
                    "touch": {
                        "icon": "bi-envelope-fill",
                        "text": "",
                        "open": "button",
                        "duration": "10"
                    },
                    "fields": [],
                    "advanced": {
                        "plugin": "39",
                        "bottomSpacing": "10",
                        "sideSpacing": "7",
                        "rounding": "0"
                    },
                    "thanks": {
                        "is": false,
                        "title": {
                            "is": false,
                            "text": "Thanks for submitting!"
                        },
                        "text": {
                            "is": false,
                            "text": "Your message has been sent!"
                        },
                        "button": {
                            "is": false,
                            "text": "Go Home"
                        }
                    },
                    "position": "right-bottom",
                    "plugin": "rect",
                    "widget": {
                        "id": 721,
                        "index": 2,
                        "type": "join_newsletter"
                    }
                };
            } else if (this.widgetID == 3) {
                return {
                    "colors": [
                        {
                            "name": "backgroundColor",
                            "value": "#ffa34d"
                        },
                        {
                            "name": "accentColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "titleTextColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "bodyTextColor",
                            "value": "#f5f5f5"
                        },
                        {
                            "name": "fieldTextColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "iconBackgroundColor",
                            "value": "#2c3145"
                        },
                        {
                            "name": "iconForeColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "textColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "thanksTitleColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksButtonColor",
                            "value": "#ffffff"
                        }
                    ],
                    "fonts": [
                        {
                            "name": "titleFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "secondaryFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "fieldFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "touchFont",
                            "value": "Plus Jakarta Sans"
                        }
                    ],
                    "touch": {
                        "icon": "bi-envelope-fill",
                        "text": "",
                        "open": "button",
                        "duration": "10"
                    },
                    "fields": [],
                    "advanced": {
                        "plugin": "40",
                        "bottomSpacing": "12",
                        "sideSpacing": "13",
                        "rounding": "23"
                    },
                    "thanks": {
                        "is": false,
                        "title": {
                            "is": false,
                            "text": "Thanks for submitting!"
                        },
                        "text": {
                            "is": false,
                            "text": "Your message has been sent!"
                        },
                        "button": {
                            "is": false,
                            "text": "Go Home"
                        }
                    },
                    "position": "right-bottom",
                    "plugin": "rect",
                    "widget": {
                        "id": 723,
                        "index": 3,
                        "type": "join_newsletter"
                    }
                };
            } else if (this.widgetID == 4) {
                return {
                    "colors": [
                        {
                            "name": "backgroundColor",
                            "value": "#000000"
                        },
                        {
                            "name": "accentColor",
                            "value": "#129900"
                        },
                        {
                            "name": "titleTextColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "bodyTextColor",
                            "value": "#bdbdbd"
                        },
                        {
                            "name": "fieldTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "iconBackgroundColor",
                            "value": "#2c3145"
                        },
                        {
                            "name": "iconForeColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "textColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "thanksTitleColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksButtonColor",
                            "value": "#ffffff"
                        }
                    ],
                    "fonts": [
                        {
                            "name": "titleFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "secondaryFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "fieldFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "touchFont",
                            "value": "Plus Jakarta Sans"
                        }
                    ],
                    "touch": {
                        "icon": "bi-envelope-fill",
                        "text": "",
                        "open": "button",
                        "duration": "10"
                    },
                    "fields": [],
                    "advanced": {
                        "plugin": "40",
                        "bottomSpacing": "10",
                        "sideSpacing": "0",
                        "rounding": "29"
                    },
                    "thanks": {
                        "is": false,
                        "title": {
                            "is": false,
                            "text": "Thanks for submitting!"
                        },
                        "text": {
                            "is": false,
                            "text": "Your message has been sent!"
                        },
                        "button": {
                            "is": false,
                            "text": "Go Home"
                        }
                    },
                    "position": "right-bottom",
                    "plugin": "rect",
                    "widget": {
                        "id": 722,
                        "index": 4,
                        "type": "join_newsletter"
                    }
                };
            }
        } else if (this.widgetType == 'lead_generation') {
            if (this.widgetID == 5) {
                return {
                    "colors": [
                        {
                            "name": "backgroundColor",
                            "value": "#f5f5f5"
                        },
                        {
                            "name": "accentColor",
                            "value": "#1ca800"
                        },
                        {
                            "name": "titleTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "bodyTextColor",
                            "value": "#787878"
                        },
                        {
                            "name": "fieldTextColor",
                            "value": "#4f4f4f"
                        },
                        {
                            "name": "iconBackgroundColor",
                            "value": "#00b840"
                        },
                        {
                            "name": "iconForeColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "textColor",
                            "value": "#ffffff"
                        },
                        {
                            "name": "thanksTitleColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksTextColor",
                            "value": "#000000"
                        },
                        {
                            "name": "thanksButtonColor",
                            "value": "#ffffff"
                        }
                    ],
                    "fonts": [
                        {
                            "name": "titleFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "secondaryFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "fieldFont",
                            "value": "Plus Jakarta Sans"
                        },
                        {
                            "name": "touchFont",
                            "value": "Plus Jakarta Sans"
                        }
                    ],
                    "touch": {
                        "icon": "bi-envelope-fill",
                        "text": "GET IN TOUCH!",
                        "open": "button",
                        "duration": "10"
                    },
                    "fields": [
                        {
                            "type": "short-text",
                            "name": "Full Name",
                            "required": true,
                            "hidden": false
                        },
                        {
                            "type": "short-text",
                            "name": "Email",
                            "required": true,
                            "hidden": false
                        },
                        {
                            "type": "long-text",
                            "name": "Message",
                            "required": false,
                            "hidden": false
                        }
                    ],
                    "advanced": {
                        "plugin": "40",
                        "bottomSpacing": "10",
                        "sideSpacing": "0",
                        "rounding": "0"
                    },
                    "thanks": {
                        "is": false,
                        "title": {
                            "is": false,
                            "text": "Thanks for submitting!"
                        },
                        "text": {
                            "is": false,
                            "text": "Your message has been sent!"
                        },
                        "button": {
                            "is": false,
                            "text": "Go Home"
                        }
                    },
                    "position": "right-bottom",
                    "plugin": "rect",
                    "widget": {
                        "id": 717,
                        "index": 5,
                        "type": "contact_forms"
                    }
                };
            }
        }

        return data;
    },

    loadPreviewSite: function () {
        // Load preview site
        let siteToLoad = mainUserDetails ? mainUserDetails["wixUrl"] : "";
        if (isTestingMode()) {
            siteToLoad = "https://www.rabbitseo.com";
        }

        $("#sitePreview").attr("data", siteToLoad);
        $("#sitePreview2").attr("data", siteToLoad);
    },

    updateUserInformation: function (avatar) {
        // User
        $("#dashboard_section .welcome-user").text("Hello " + mainUserDetails['firstName'] + "!");

        if (avatar || mainUserDetails['avatar']) {
            $("#dashboard_section .profile-section .profile-img").attr('src', avatar != null ? avatar : mainUserDetails['avatar']);
            $(".sidebar-right .profile-section .profile-img").attr('src', avatar != null ? avatar : mainUserDetails['avatar']);
        }

        $("#dashboard_section .profile-section .profile-details h5").text(mainUserDetails['firstName']);
        $("#dashboard_section .profile-section .profile-details p").text(mainUserDetails['roleName']);
        $(".sidebar-right .profile-section .profile-details h5").text(mainUserDetails['firstName']);
        $(".sidebar-right .profile-section .profile-details p").text(mainUserDetails['roleName']);

        if (avatar || mainUserDetails['avatar']) {
            $("#sidebar .profile-section .profile-img").attr('src', avatar != null ? avatar : mainUserDetails['avatar']);
        }

        if (avatar || mainUserDetails['avatar']) {
            $("#dashboard_section .top-right-avatar img").attr('src', avatar != null ? avatar : mainUserDetails['avatar']);
        }
        $("#dashboard_section .top-right-avatar strong").text(mainUserDetails['firstName']);
        $("#dashboard_section .top-right-avatar small").text(mainUserDetails['roleName']);

        if (avatar || mainUserDetails['avatar']) {
            $("#plugin_section .top-right-avatar img").attr('src', avatar != null ? avatar : mainUserDetails['avatar']);
        }
        $("#plugin_section .top-right-avatar strong").text(mainUserDetails['firstName']);
        $("#plugin_section .top-right-avatar small").text(mainUserDetails['roleName']);

        if (avatar || mainUserDetails['avatar']) {
            $("#widget_section .top-right-avatar img").attr('src', avatar != null ? avatar : mainUserDetails['avatar']);
        }
        $("#widget_section .top-right-avatar strong").text(mainUserDetails['firstName']);
        $("#widget_section .top-right-avatar small").text(mainUserDetails['roleName']);
    },

    updatePluginAndPosition: function (plugin, position) {
        if (!this.isPreview)
            return false;

        console.log(">>>", "Icon updated", plugin, position)

        this.roundingType = plugin == "circle" ? "X" : "";
        this.touchPosition = position;

        // this.update("touchType", plugin);
        this.update('rounding', $("#roundingSlider").val());
        this.update("touchPosition", position);
    },

    updateWidgetStatus: function (total, active) {
        var percentage = (active / total) * 100;
        var rotation = (percentage / 100) * 360;
        var gradient = 'conic-gradient(#ff0080 0%, #ff0080 ' + percentage + '%, #f0f0f0 ' + percentage + '%, #f0f0f0 100%)';

        $('.progress-circle-container .circle-progress').css('background', gradient);
        $('.progress-circle-container .circle-progress').css('transform', 'rotate(0deg)');

        $(".progress-circle-container .progress-circle .circle-inner span:nth-child(1)").text(active);
        $(".progress-circle-container .progress-circle .circle-inner span:nth-child(2)").text(total);
    },

    updateInputFields: function () {
        var html = "";
        $(".plugin-widget-container .form-group-list").html("");

        $("#fields_table tbody tr").each(function (index, row) {
            html += '<div class="form-group">';

            var type = $(row).data('type');
            var name = $(row).find('.cell-name>input').val();
            if (name == "") {
                name = "Field " + parseInt(Math.random() * 99999);
            }

            var required = $(row).find('.cell-required input').prop('checked') ? "required" : "";
            var hidden = $(row).find('.cell-hidden input').prop('checked');

            if (hidden) {
                html += '<input class="form-control for-fieldTextColor for-fieldFont" type="hidden" name="' + name + '" value="' + name + '" placeholder="' + name + '">';
            } else {
                if (type == 'short-text') {
                    html += '<input class="form-control for-fieldTextColor for-fieldFont" ' + required + ' type="text" name="' + name + '" value="' + name + '" placeholder="' + name + '">';
                } else if (type == 'long-text') {
                    html += '<textarea class="form-control for-fieldTextColor for-fieldFont" name="' + name + '" placeholder="' + name + '">' + name + '</textarea>';
                }
            }

            html += '</div>';
        });

        $(".plugin-widget-container .form-group-list").html(html);

        setTimeout(function () {
            PreviewWidget.update("pluginSize", $("#pluginSizeSlider").val());
            PreviewWidget.update("bottomSpacing", $("#spacingBottomSlider").val())
            PreviewWidget.update("sideSpacing", $("#spacingSideSlider").val())
            PreviewWidget.update("rounding", $("#roundingSlider").val())
        }, 50);
    },

    updateInputShadow: function () {
        var me = this;
        var color = SignupUtilities.hexToRgb(me.shadow.color);
        // $('.plugin-widget-container .form-group>input').css('boxShadow', me.shadow.size + "px " + me.shadow.size + "px " + (parseInt(me.shadow.size) * 2) + "px rgba(" + color.red + ", " + color.green + ", " + color.blue + ", " + (parseInt(me.shadow.opacity) / 100) + ")");
        // $('.plugin-widget-container .form-group>textarea').css('boxShadow', me.shadow.size + "px " + me.shadow.size + "px " + (parseInt(me.shadow.size) * 2) + "px rgba(" + color.red + ", " + color.green + ", " + color.blue + ", " + (parseInt(me.shadow.opacity) / 100) + ")");
        $('.plugin-widget-container .form-wrapper').css('boxShadow', me.shadow.size + "px " + me.shadow.size + "px " + (parseInt(me.shadow.size) * 2) + "px rgba(" + color.red + ", " + color.green + ", " + color.blue + ", " + (parseInt(me.shadow.opacity) / 100) + ")");
    },

    /**
     * Apply Preview Widget Component to Preview Content.
     * @param target
     * @param value
     */
    update: function (target, value) {
        // Color
        if (target == 'backgroundColor') {
            $(".plugin-widget-container .for-backgroundColor").css('backgroundColor', value);
        } else if (target == 'titleTextColor') {
            $(".plugin-widget-container .for-titleTextColor").css('color', value);
        } else if (target == 'bodyTextColor') {
            $(".plugin-widget-container .for-bodyTextColor").css('color', value);
        } else if (target == 'fieldTextColor') {
            $(".plugin-widget-container .for-fieldTextColor").css('color', value);
            $(".plugin-widget-container .for-fieldTextColor").css('--placeholderColor', value);
        } else if (target == "accentColor") {
            $(".plugin-widget-container .for-accentBackgroundColor").css('backgroundColor', value);
            $(".plugin-widget-container .for-accentTextColor").css('color', value);
            $(".plugin-widget-container .for-accentBorderColor").css('borderColor', value);
        }

        // Font
        else if (target == "titleFont") {
            $(".plugin-widget-container .for-titleFont").css('fontFamily', value);
        } else if (target == "secondaryFont") {
            $(".plugin-widget-container .for-secondaryFont").css('fontFamily', value);
        } else if (target == "fieldFont") {
            $(".plugin-widget-container .for-fieldFont").css('fontFamily', value);
        }

        // Touch
        else if (target == 'iconBackgroundColor') {
            $(".btnTouch").css('backgroundColor', value);

        } else if (target == 'iconForeColor') {
            $(".btnTouch>.icon").css('color', value);
        } else if (target == "textColor") {
            $(".btnTouch>.text").css('color', value);
        }
        else if (target == "touchText") {
            $(".btnTouch>.text").text(value);
        } else if (target == "touchFont") {
            $(".btnTouch>.text").css('fontFamily', value);
        } else if (target == "touchIcon") {
            $(".btnTouch>.icon").html("<i class='bi " + value + "'></i>");
        } else if (target == "touchType") {
            // if (value=='rect') {
            //   $(".btnTouch").css('borderRadius', '32px');
            // } else if (value=='circle') {
            //   $(".btnTouch").css('borderRadius', '50%');
            // }
        } else if (target == "touchPosition") {
            if (value == "left-top") {
                $(".btnTouch").css('right', 'auto').css('bottom', 'auto').css('top', this.iconVSpacing + 'px').css('left', this.iconHSpacing + 'px');
            } else if (value == "right-top") {
                $(".btnTouch").css('left', 'auto').css('bottom', 'auto').css('top', this.iconVSpacing + 'px').css('right', this.iconHSpacing + 'px');
            } else if (value == "left-bottom") {
                $(".btnTouch").css('top', 'auto').css('right', 'auto').css('left', '24px').css('bottom', this.iconVSpacing + 'px');
            } else if (value == 'right-bottom') {
                $(".btnTouch").css('top', 'auto').css('left', 'auto').css('right', '40px').css('bottom', this.iconVSpacing + 'px');
            } else if (value == "left-middle") {
                $(".btnTouch").css('right', 'auto').css('bottom', 'auto').css('top', '50%').css('left', this.iconHSpacing + 'px');
            } else if (value == "right-middle") {
                $(".btnTouch").css('left', 'auto').css('bottom', 'auto').css('top', '50%').css('right', this.iconHSpacing + 'px');
            }
        }
        else if (target == 'touchShow') {
            if (value) {
                $(".btnTouch").show();
            } else {
                $(".btnTouch").hide();
            }
        } else if (target == 'touchTextIs') {
            if (value)
                $(".btnTouch span.text").show();
            else
                $(".btnTouch span.text").hide();
        }
        else if (target == "pluginSize") {
            $(".btnTouch").css('fontSize', value + 'px');
        } else if (target == "bottomSpacing") {
            if (this.touchPosition.indexOf("top") > -1) {
                $(".btnTouch").css('top', this.iconVSpacing + 'px');
            } else if (this.touchPosition.indexOf("bottom") > -1) {
                $(".btnTouch").css('bottom', this.iconVSpacing + 'px');
            }
        } else if (target == "sideSpacing") {
            if (this.touchPosition.indexOf("left") > -1) {
                $(".btnTouch").css('left', this.iconHSpacing + 'px');
            } else if (this.touchPosition.indexOf("right") > -1) {
                $(".btnTouch").css('right', this.iconHSpacing + 'px');
            }
        } else if (target == "rounding") {
            $('.btnTouch').css('borderRadius', value + (this.roundingType == 'X' ? '%' : 'px'));
        }
        else if (target == 'sizeWidth') {
            $('.plugin-widget-container .form-group>input').css('width', value + '%');
            $('.plugin-widget-container .form-group>textarea').css('width', (value) + '%');
            $('.plugin-widget-container .actions-area button').css('width', value + '%');
        } else if (target == 'sizeHeight') {
            $('.plugin-widget-container .form-group>input').css('height', value + 'px');
            $('.plugin-widget-container .form-group>textarea').css('height', (value * 2) + 'px');
            $('.plugin-widget-container .actions-area button').css('height', value + 'px');
        }

            // thank you
        /*
        else if (target=='thanksTitleColor') {
          $("#thankYouModal .modal-title").css('color', value);
        }
        else if (target=='thanksTextColor') {
          $("#thankYouModal .modal-body>p").css('color', value);
        }
    */
        else if (target == 'thanksButtonColor') {
            $("#thankYouModal .btn").css('color', value);
        } else if (target == "addThankYouScreen") {
        } else if (target == "thankYouScreenTitle") {
            if (value)
                $("#thankYouModal .modal-title").show();
            else
                $("#thankYouModal .modal-title").hide();

            $(window).trigger('scroll');
        } else if (target == "thankYouScreenText") {
            if (value)
                $("#thankYouModal .modal-body>p").show();
            else
                $("#thankYouModal .modal-body>p").hide();

            $(window).trigger('scroll');
        } else if (target == "thankYouScreenButton") {
            if (value)
                $("#thankYouModal .btn").show();
            else
                $("#thankYouModal .btn").hide();
            $(window).trigger('scroll');
        } else if (target == "thankYouScreenTitleText") {
            $("#thankYouModal .modal-title").text(value);
        } else if (target == "thankYouScreenTextText") {
            $("#thankYouModal .modal-body>p").text(value);
        } else if (target == "thankYouScreenButtonText") {
            $("#thankYouModal .btn").text(value);
        }
    },

    /**
     * Apply to Preview Widget Component
     * @param target
     * @param value
     */
    apply: function (target, value) {
        // Color
        if (target == 'backgroundColor') {
            $(".widget-area .color-item .color-circle[data-color-target='backgroundColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='backgroundColor']").next('input').val(value);
        } else if (target == 'titleTextColor') {
            $(".widget-area .color-item .color-circle[data-color-target='titleTextColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='titleTextColor']").next('input').val(value);
        } else if (target == 'bodyTextColor') {
            $(".widget-area .color-item .color-circle[data-color-target='bodyTextColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='bodyTextColor']").next('input').val(value);
        } else if (target == 'fieldTextColor') {
            $(".widget-area .color-item .color-circle[data-color-target='fieldTextColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='fieldTextColor']").next('input').val(value);
        } else if (target == "accentColor") {
            $(".widget-area .color-item .color-circle[data-color-target='accentColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='accentColor']").next('input').val(value);
        } else if (target == "shadowColor") {
            $(".widget-area .color-item .color-circle[data-color-target='shadowColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='shadowColor']").next('input').val(value);
        }

        // Font
        else if (target == "titleFont") {
            $(".widget-area select.set-font[data-target='titleFont']").val(value);
        } else if (target == "secondaryFont") {
            $(".widget-area select.set-font[data-target='secondaryFont']").val(value);
        } else if (target == "fieldFont") {
            $(".widget-area select.set-font[data-target='fieldFont']").val(value);
        }

        // Touch
        else if (target == 'iconBackgroundColor') {
            $(".widget-area .color-item .color-circle[data-color-target='iconBackgroundColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='iconBackgroundColor']").next('input').val(value);
        } else if (target == 'iconForeColor') {
            $(".widget-area .color-item .color-circle[data-color-target='iconForeColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='iconForeColor']").next('input').val(value);
        } else if (target == "textColor") {
            $(".widget-area .color-item .color-circle[data-color-target='textColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='textColor']").next('input').val(value);
        } else if (target == "touchText") {
            $(".widget-area .design-text-input").val(value);
        } else if (target == "touchFont") {
            $(".widget-area select.set-font[data-target='touchFont']").val(value);
        } else if (target == "touchIcon") {
            $(".widget-area .icon-group>.icon-btn").removeClass('selected');
            $(".widget-area .icon-group>.icon-btn[data-icon='" + value + "']").addClass('selected');
        } else if (target == 'touchShow') {
            if (value) {
                $("#openByButton").prop('checked', true);
                $("#openByButton").trigger('change');
            } else {
                $("#openAfterPageLoaded").prop('checked', true);
                $("#openAfterPageLoaded").trigger('change');
            }
        } else if (target == 'touchDuration') {
            $("#openAfterPageLoaded_Time").val(value);
        } else if (target == "pluginSize") {
            $("#pluginSizeSlider").slider('setValue', value);
        } else if (target == "bottomSpacing") {
            $("#spacingBottomSlider").slider('setValue', value);
        } else if (target == "sideSpacing") {
            $("#spacingSideSlider").slider('setValue', value);
        } else if (target == "rounding") {
            $("#roundingSlider").slider('setValue', value);
        } else if (target == 'sizeWidth') {
            $("#sizeWidthSlider").slider('setValue', value);
        } else if (target == 'sizeHeight') {
            $("#sizeHeightSlider").slider('setValue', value);
        } else if (target == 'shadowOpacity') {
            $("#shadowOpacitySlider").slider('setValue', value);
        } else if (target == 'shadowSize') {
            $("#shadowSizeSlider").slider('setValue', value);
        }

            // thank you
        /*
        else if (target=='thanksTitleColor') {
          $(".widget-area .color-item .color-circle[data-color-target='thanksTitleColor']").css('backgroundColor', value)
          $(".widget-area .color-item .color-circle[data-color-target='thanksTitleColor']").next('input').val(value);
        }
        else if (target=='thanksTextColor') {
          $(".widget-area .color-item .color-circle[data-color-target='thanksTextColor']").css('backgroundColor', value)
          $(".widget-area .color-item .color-circle[data-color-target='thanksTextColor']").next('input').val(value);
        }
    */
        else if (target == 'thanksButtonColor') {
            $(".widget-area .color-item .color-circle[data-color-target='thanksButtonColor']").css('backgroundColor', value)
            $(".widget-area .color-item .color-circle[data-color-target='thanksButtonColor']").next('input').val(value);
        } else if (target == "addThankYouScreen") {
            $("#addThankYouScreen").prop('checked', value);
        } else if (target == "thankYouScreenTitle") {
            $("#thankYouScreenTitle").prop('checked', value);
        } else if (target == "thankYouScreenText") {
            $("#thankYouScreenText").prop('checked', value);
        } else if (target == "thankYouScreenButton") {
            $("#thankYouScreenButton").prop('checked', value);
        } else if (target == "thankYouScreenTitleText") {
            $(".thank-you-title-input").val(value);
        } else if (target == "thankYouScreenTextText") {
            $(".thank-you-text-input").val(value);
        } else if (target == "thankYouScreenButtonText") {
            $(".thank-you-button-input").val(value);
        }

    },

    updateAll: function (data) {
        var me = this;

        var html = "";
        $("#fields_table tbody").html("");
        if ($(".plugin-widget-container.active .form-group-list").length > 0) {
            $.each(data.fields, function (index, row) {
                html += `<tr data-type="${row.type}">
                            <td class="cell-name">
                                <input type="text" name="${row.name}" value="${row.name}" placeholder="${row.name}">
                            </td>
                            <td class="cell-required">
                                <div class="custom-switch">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" ${row.required ? 'checked' : ''}>
                                    </div>
                                </div>
                            </td>
                            <td class="cell-hidden">
                                <div class="custom-switch">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" ${row.hidden ? 'checked' : ''}>
                                    </div>
                                </div>
                            </td>
                            <td class="cell-action"><span><i class="bi bi-x-circle"></i></span></td>
                        </tr>`;
            });

            $("#fields_table tbody").html(html);
            PreviewWidget.updateInputFields();
        } else {
            // TODO - remove custom fields area if no needed
            $(".widget-area .fields-container").hide();
        }

        if (data.description != null && data.description != "") {
            var description = data.description.replace(/\n/g, '<br>');
            description = description.replace(/(<br>\s*){2,}/g, '<br>');
            description = description.replace(/(<br\s*\/?>\s*){2,}/g, '<br />');
            $(".plugin-widget-container.active .editable.description").html(description);
        }

        $.each(data.colors, function (index, row) {
            if (row.name == 'shadowColor') {
                me.shadow.color = row.value;
            }

            me.update(row.name, row.value);
            me.apply(row.name, row.value);
        });

        $.each(data.fonts, function (index, row) {
            me.update(row.name, row.value);
            me.apply(row.name, row.value);
        });

        if (data.plugin != null && data.position != null) {
            me.roundingType = data.plugin == 'rect' ? '' : 'X';
            me.touchPosition = data.position;
            WidgetComponentPanel.updatePluginAndPosition(data.plugin, data.position);
        } else {
            me.roundingType = "";
            me.touchPosition = "right-bottom";
            WidgetComponentPanel.updatePluginAndPosition('rect', 'right-bottom');
        }

        if (data.touch.is != null) {
            me.update("touchTextIs", data.touch.is);
            me.apply("touchTextIs", data.touch.is);
        } else {
            me.update("touchTextIs", false);
            me.apply("touchTextIs", false);
        }

        if (data.touch.icon != null) {
            me.update("touchIcon", data.touch.icon);
            me.apply("touchIcon", data.touch.icon);
        }
        if (data.touch.text != null) {
            me.update("touchText", data.touch.text);
            me.apply("touchText", data.touch.text);
        }
        if (data.touch.open != null && data.touch.open == 'button') {
            // me.update("touchShow", true);
            me.apply("touchShow", true);
        } else {
            // me.update("touchShow", false);
            me.apply("touchShow", false);
        }
        if (data.touch.duration != null) {
            me.update("touchDuration", data.touch.duration);
            me.apply("touchDuration", data.touch.duration);
        }

        if (data.advanced.plugin != null) {
            me.update("pluginSize", data.advanced.plugin);
            me.apply("pluginSize", data.advanced.plugin);
        }

        if (data.advanced.bottomSpacing != null)
            me.iconVSpacing = data.advanced.bottomSpacing;
        else
            me.iconVSpacing = 0;

        me.update("bottomSpacing", me.iconVSpacing);
        me.apply("bottomSpacing", me.iconVSpacing);

        if (data.advanced.sideSpacing != null)
            me.iconHSpacing = data.advanced.sideSpacing;
        else
            me.iconHSpacing = 0;

        me.update("sideSpacing", me.iconHSpacing);
        me.apply("sideSpacing", me.iconHSpacing);

        if (data.advanced.rounding != null) {
            me.update("rounding", data.advanced.rounding);
            me.apply("rounding", data.advanced.rounding);
        }

        if (data.advanced.shadowSize != null) {
            me.shadow.size = data.advanced.shadowSize;
        } else {
            me.shadow.size = 0;
        }
        me.apply("shadowSize", me.shadow.size);

        if (data.advanced.shadowOpacity != null) {
            me.shadow.opacity = data.advanced.shadowOpacity;
        } else {
            me.shadow.opacity = 0;
        }
        me.apply("shadowOpacity", me.shadow.opacity);

        me.updateInputShadow();

        // thank you
        $(".widget-area .btn-view-thanks-screen").removeClass('selected');
        $(".widget-area .btn-view-thanks-screen").html("View Thanks You Screen");
        $("#thankYouModal").hide();

        if (data.thanks != null) {
            me.apply('addThankYouScreen', data.thanks.is);

            me.update('thankYouScreenTitle', data.thanks.title.is);
            me.apply('thankYouScreenTitle', data.thanks.title.is);

            me.update('thankYouScreenText', data.thanks.text.is);
            me.apply('thankYouScreenText', data.thanks.text.is);

            me.update('thankYouScreenButton', data.thanks.button.is);
            me.apply('thankYouScreenButton', data.thanks.button.is);

            me.update('thankYouScreenTitleText', data.thanks.title.text);
            me.apply('thankYouScreenTitleText', data.thanks.title.text);

            me.update('thankYouScreenTextText', data.thanks.text.text);
            me.apply('thankYouScreenTextText', data.thanks.text.text);

            me.update('thankYouScreenButtonText', data.thanks.button.text);
            me.apply('thankYouScreenButtonText', data.thanks.button.text);

            $(window).trigger('scroll');
        }
    },

    serialize: function () {
        var data = {
            colors: [],
            fonts: [],
            touch: {
                is: false,
                icon: '',
                text: '',
                open: '',
                duration: 0,
            },
            fields: [],
            advanced: {
                plugin: 0,
                bottomSpacing: 0,
                sideSpacing: 0,
                rounding: 0,
                width: 0,
                height: 0,
                // thickness: 0,
                shadowSize: 0,
                shadowOpacity: 0,
            },
            thanks: {
                is: false,
                title: {
                    is: false,
                    text: '',
                },
                text: {
                    is: false,
                    text: '',
                },
                button: {
                    is: false,
                    text: '',
                }
            },
            position: '',
            plugin: '',
        };

        $(".widget-area .color-item input").each(function (index, row) {
            var target = $(this).prev('.color-circle').data('color-target');
            var value = $(this).val();

            data.colors.push({name: target, value: value});
        });

        $(".widget-area .set-font").each(function (index, row) {
            var target = $(this).data('target')
            var value = $(this).val();

            data.fonts.push({name: target, value: value});
        });

        data.touch.is = $("#addTextOption").prop('checked');
        data.touch.icon = $("#designSettings .icon-group .icon-btn.selected").data('icon');
        data.touch.text = $(".widget-area .design-text-input").val();
        data.touch.open = $("#openByButton").prop('checked') ? 'button' : 'page';
        data.touch.duration = $("#openAfterPageLoaded_Time").val();

        data.advanced.plugin = $("#pluginSizeSlider").val();
        data.advanced.bottomSpacing = $("#spacingBottomSlider").val();
        data.advanced.sideSpacing = $("#spacingSideSlider").val();
        data.advanced.rounding = $("#roundingSlider").val();
        data.advanced.width = $("#sizeWidthSlider").val();
        data.advanced.height = $("#sizeHeightSlider").val();
        data.advanced.shadowSize = $("#shadowSizeSlider").val();
        data.advanced.shadowOpacity = $("#shadowOpacitySlider").val();
        // data.advanced.thickness = $("#thicknessSlider").val();

        $("#fields_table tbody tr").each(function (index, row) {
            data.fields.push({
                type: $(this).data('type'),
                name: $(this).find('td.cell-name>input').val(),
                required: $(this).find('td.cell-required input').prop('checked'),
                hidden: $(this).find('td.cell-hidden input').prop('checked')
            });
        });

        data.plugin = $("#icon_tab .plugin-panel>.item.active").data('plugin');
        data.position = $("#icon_tab .position-panel>.item.active").data('position');

        // thank you screen
        data.thanks.is = $("#addThankYouScreen").prop('checked');
        data.thanks.title.is = $("#thankYouScreenTitle").prop('checked');
        data.thanks.title.text = $(".thank-you-title-input").val();
        data.thanks.text.is = $("#thankYouScreenText").prop('checked');
        data.thanks.text.text = $(".thank-you-text-input").val();
        data.thanks.button.is = $("#thankYouScreenButton").prop('checked');
        data.thanks.button.text = $(".thank-you-button-input").val();

        // have editable text
        if ($(".plugin-widget-container.active .editable").length > 0) {
            var description = $(".plugin-widget-container.active .editable").html();
            data.description = description.replace(/\n/g, '<br>');
        }

        return data;
    },

    publish: function (isActive, isDirectly) {
        var userProps = isDirectly != null && isDirectly ? this.getDefaultData() : this.serialize();
        var widgetType = SignupUtilities.getWidgetType(this.widgetType, this.widgetID);
        var isForm = SignupUtilities.isForm(this.widgetType, this.widgetID);

        SignupUtilities.showLoading("Publishing.....");
        createUpdateWidget(widgetType, userProps, isActive, isForm, this.pluginID != "" ? this.pluginID : null, function (retVal) {
            SignupUtilities.hideLoading();

            if (retVal != null && retVal['status'] === null) {
                $("#publishSuccessModal").modal('show');
            } else {
                $("#limitReachedModal").modal('show');
            }
        });
    },
}

$(document).ready(function () {
    SignupLandHome.init();
    WidgetComponentPanel.init();
    WidgetHome.init();
    PluginCustomization.init();
    PreviewWidget.init();
});
