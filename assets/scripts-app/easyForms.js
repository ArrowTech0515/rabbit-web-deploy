let form_size = "medium";
let form_alignment = "left";

let font_family = "Plus Jakarta Sans";
let color_preheader = "#8537FC";
let color_form_title = "#1C2028";
let color_text = "#444B57";
let color_default_fields_text = "#A4ABB8";
let color_active_fields = "#8537FC";
let color_button = "#8537FC";
let field_size = "medium";
let field_type = "medium";
let field_name_motion = "animated";
let field_theme = "";
let button_size = "medium";
let button_border_style = "medium";

let hour_chart, day_chart, device_chart, date_chart, countries_chart, cities_chart;

$(document).ready(function () {

    let siteToLoad = mainUserDetails ? mainUserDetails['wixUrl'] : '';
        $('#easyFormsIframe').attr('src', 'http://localhost/loginEasyFormsUser?sessionId=' + mainUserDetails['sessionId']);
    console.log('start easy forms site url ' + siteToLoad);

    if (isTestingMode()) {
        siteToLoad = 'https://www.rabbitseo.com';
    }
    $('#sitePreview').attr('data', siteToLoad);


    load_chart_data();

});

let current_path = "";

// window.addEventListener('load', () => {
//     const progressBar = document.getElementById('myBar');
//     let width = 0;
//     const interval = setInterval(() => {
//         if (width >= 100) {
//             clearInterval(interval);
//         } else {
//             width++;
//             progressBar.style.width = width + '%';
//         }
//     }, 1);
// });
// document.addEventListener('DOMContentLoaded', (event) => {
//     const progressBar = document.getElementById('myBar');
//     const totalResources = document.querySelectorAll('link[rel="stylesheet"], script, img').length;
//     let loadedResources = 0;
//
//     // Update progress bar
//     const updateProgressBar = () => {
//         loadedResources += 1;
//         const progressPercentage = (loadedResources / totalResources) * 100;
//         progressBar.style.width = `${progressPercentage}%`;
//     };
//
//     // Add event listeners for resource load
//     document.querySelectorAll('link[rel="stylesheet"], script, img').forEach(resource => {
//         resource.addEventListener('load', updateProgressBar, { once: true });
//         resource.addEventListener('error', updateProgressBar, { once: true });  // To handle resource loading errors
//     });
//
//     // Ensure the progress bar reaches 100% once the window is fully loaded
//     window.addEventListener('load', () => {
//         progressBar.style.width = '100%';
//         // setTimeout(() => {
//         //     progressBar.style.opacity = 0;
//         // }, 500);  // Optionally, hide the progress bar after a short delay
//     });
// });

load_chart_data = function(type) {
    const ctx_by_hours = document.getElementById('by_hours').getContext('2d');
    const ctx_by_days = document.getElementById('by_days').getContext('2d');
    const ctx_by_devices = document.getElementById('by_devices').getContext('2d');
    let ctx_by_date, ctx_by_countries, ctx_by_cities;
    if (type == 1) {
        ctx_by_date = document.getElementById('by_date').getContext('2d');
        ctx_by_countries = document.getElementById('by_countries').getContext('2d');
        ctx_by_cities = document.getElementById('by_cities').getContext('2d');
    }

    let visitors_gradient = ctx_by_hours.createLinearGradient(0, 0, 0, 400);
    visitors_gradient.addColorStop(0, 'rgba(192, 153, 251, 0.5)');
    visitors_gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    let clicks_gradient = ctx_by_hours.createLinearGradient(0, 0, 0, 400);
    clicks_gradient.addColorStop(0, 'rgba(142, 54, 247, 0.5)');
    clicks_gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    let submissions_gradient = ctx_by_hours.createLinearGradient(0, 0, 0, 400);
    submissions_gradient.addColorStop(0, 'rgba(255, 114, 98, 0.5)');
    submissions_gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    let mobile_gradient = ctx_by_devices.createLinearGradient(0, 0, 0, 400);
    mobile_gradient.addColorStop(0, 'rgba(101, 49, 247, 1)');
    mobile_gradient.addColorStop(1, 'rgba(202, 61, 246, 1)');
    let desktop_gradient = ctx_by_devices.createLinearGradient(0, 0, 0, 400);
    desktop_gradient.addColorStop(0, 'rgba(248, 216, 33, 1)');
    desktop_gradient.addColorStop(1, 'rgba(251, 60, 108, 1)');

    let data_by_hours = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
        datasets: [
            {
                label: 'Visitors',
                data: [12, 19, 3, 5, 2, 3, 9, 8, 5, 6, 10, 14, 16, 18, 15, 20, 22, 25, 20, 18, 15, 12, 10, 8],
                fill: true,
                backgroundColor: visitors_gradient,
                borderColor: '#C099FB',
                tension: 0.3,
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 10,
                pointBackgroundColor: '#C099FB',
            },
            {
                label: 'Clicks',
                data: [8, 7, 6, 5, 7, 9, 10, 12, 14, 16, 18, 20, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 3, 2],
                fill: true,
                backgroundColor: clicks_gradient,
                borderColor: '#8E36F7',
                tension: 0.3,
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 10,
                pointBackgroundColor: '#8E36F7',
            },
            {
                label: 'Submissions',
                data: [4, 6, 8, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 4, 6, 8, 10, 12, 14],
                fill: true,
                backgroundColor: submissions_gradient,
                borderColor: '#FD7B6F',
                tension: 0.3,
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 10,
                pointBackgroundColor: '#FD7B6F',
            }
        ]
    };

    let data_by_days = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Visitors',
                data: [12, 19, 8, 22, 22, 10, 8],
                fill: true,
                backgroundColor: visitors_gradient,
                borderColor: '#C099FB',
                tension: 0.3,
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 10,
                pointBackgroundColor: '#C099FB',
            },
            {
                label: 'Clicks',
                data: [8, 7, 16, 12, 4, 8, 2],
                fill: true,
                backgroundColor: clicks_gradient,
                borderColor: '#8E36F7',
                tension: 0.3,
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 10,
                pointBackgroundColor: '#8E36F7',
            },
            {
                label: 'Submissions',
                data: [7, 4, 15, 8, 10, 12, 14],
                fill: true,
                backgroundColor: submissions_gradient,
                borderColor: '#FD7B6F',
                tension: 0.3,
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 10,
                pointBackgroundColor: '#FD7B6F',
            }
        ]
    };

    let data_by_devices = {
        labels: [
            'Mobile',
            'Desktop',
        ],
        datasets: [{
            data: [40, 60],
            backgroundColor: [
                desktop_gradient,
                mobile_gradient,
            ],
            hoverOffset: 4,
            borderRadius: 10
        }]
    };

    let data_by_date = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        datasets: [
            {
                label: 'Visitors',
                data: [12, 19, 3, 5, 2, 3, 9, 8, 5, 6, 10, 14, 16, 18, 15, 20, 22, 25, 20, 18, 15, 12, 10, 8, 14, 16, 18, 15, 20, 22, 25],
                fill: true,
                backgroundColor: visitors_gradient,
                borderColor: '#C099FB',
                tension: 0.3,
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 10,
                pointBackgroundColor: '#C099FB',
            },
            {
                label: 'Clicks',
                data: [8, 7, 6, 5, 7, 9, 10, 12, 14, 16, 18, 20, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 3, 2, 10, 12, 14, 16, 18, 20, 22],
                fill: true,
                backgroundColor: clicks_gradient,
                borderColor: '#8E36F7',
                tension: 0.3,
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 10,
                pointBackgroundColor: '#8E36F7',
            },
            {
                label: 'Submissions',
                data: [4, 6, 8, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 4, 6, 8, 10, 12, 14, 18, 20, 18, 16, 14, 12, 10],
                fill: true,
                backgroundColor: submissions_gradient,
                borderColor: '#FD7B6F',
                tension: 0.3,
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 10,
                pointBackgroundColor: '#FD7B6F',
            }
        ]
    };

    let data_by_countries = {
        labels: ['United State', 'United State', 'United State', 'United State', 'United State', 'United State', 'United State', 'United State', 'United State'],
        datasets: [
            {
                label: 'visitors',
                data: [400, 400, 400, 400, 400, 400, 400, 400, 400, 400],
                backgroundColor: 'rgba(192, 153, 251, 1)',
                borderColor: 'rgba(192, 153, 251, 1)',
                borderWidth: 1,
                barPercentage: 0.6,
                borderRadius: 5,
            },
            {
                label: 'clicks',
                data: [270, 270, 270, 270, 270, 270, 270, 270, 270, 270],
                backgroundColor: 'rgba(142, 54, 247, 1)',
                borderColor: 'rgba(142, 54, 247, 1)',
                borderWidth: 1,
                barPercentage: 0.6,
                borderRadius: 5,
            },
            {
                label: 'submissions',
                data: [180, 180, 180, 180, 180, 180, 180, 180, 180, 180],
                backgroundColor: 'rgba(255, 114, 98, 1)',
                borderColor: 'rgba(255, 114, 98, 1)',
                borderWidth: 1,
                barPercentage: 0.6,
                borderRadius: 5,
            }
        ]
    };

    let data_by_cities = {
        labels: ['United State', 'United State', 'United State', 'United State', 'United State', 'United State', 'United State', 'United State', 'United State'],
        datasets: [
            {
                label: 'visitors',
                data: [400, 400, 400, 400, 400, 400, 400, 400, 400, 400],
                backgroundColor: 'rgba(192, 153, 251, 1)',
                borderColor: 'rgba(192, 153, 251, 1)',
                borderWidth: 1,
                barPercentage: 0.6,
                borderRadius: 5,
            },
            {
                label: 'clicks',
                data: [270, 270, 270, 270, 270, 270, 270, 270, 270, 270],
                backgroundColor: 'rgba(142, 54, 247, 1)',
                borderColor: 'rgba(142, 54, 247, 1)',
                borderWidth: 1,
                barPercentage: 0.6,
                borderRadius: 5,
            },
            {
                label: 'submissions',
                data: [180, 180, 180, 180, 180, 180, 180, 180, 180, 180],
                backgroundColor: 'rgba(255, 114, 98, 1)',
                borderColor: 'rgba(255, 114, 98, 1)',
                borderWidth: 1,
                barPercentage: 0.6,
                borderRadius: 5,
            }
        ]
    };
// Create the chart
    hour_chart = new Chart(ctx_by_hours, {
        type: 'line',
        data: data_by_hours,
        options: {
            maintainAspectRatio: false,
            aspectRatio: 2,
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            plugins: {
                title: {
                    display: false,
                },
                legend: {
                    display: false, // Hide the default legend
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            if (tooltipItems.length > 0) {
                                return tooltipItems[0].label+':00';
                            }
                            return null;
                        },
                        footer: function(tooltipItems) {
                            // Customize and return the content for the tooltip footer
                            if (tooltipItems.length > 0) {
                                return 'Conversation Rate '; // You can customize this based on your specific data
                            }
                            return null; // Return null if no footer content is needed
                        },
                        afterFooter: function () {
                            return '83.33%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'category', // Define the scale type, such as 'linear', 'time', 'logarithmic', or 'category' for string values
                    ticks: {
                        beginAtZero: true, // Start the axis at zero if true
                        // Other tick options such as max, min, stepSize, callback functions, etc.
                    },
                    grid: {
                        display: false, // Remove grid lines for the Y-axis
                    }
                },
                y:
                    {
                        type: 'linear',
                        min: 0,
                        max: 40,
                        beginAtZero: true,
                        grid: {
                            display: true, // Show the y-axis grid lines

                        },
                        position: 'left',

                    }

            },
        },
    });

    day_chart = new Chart(ctx_by_days, {
        type: 'line',
        data: data_by_days,
        options: {
            maintainAspectRatio: false,
            aspectRatio: 2,
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            plugins: {
                title: {
                    display: false,
                },
                legend: {
                    display: false, // Hide the default legend
                },
                tooltip: {
                    callbacks: {
                        footer: function(tooltipItems) {
                            // Customize and return the content for the tooltip footer
                            if (tooltipItems.length > 0) {
                                return 'Conversation Rate '; // You can customize this based on your specific data
                            }
                            return null; // Return null if no footer content is needed
                        },
                        afterFooter: function () {
                            return '83.33%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'category', // Define the scale type, such as 'linear', 'time', 'logarithmic', or 'category' for string values
                    ticks: {
                        beginAtZero: true, // Start the axis at zero if true
                        // Other tick options such as max, min, stepSize, callback functions, etc.
                    },
                    grid: {
                        display: false, // Remove grid lines for the Y-axis
                    }
                },
                y:
                    {
                        type: 'linear',
                        min: 0,
                        max: 40,
                        beginAtZero: true,
                        grid: {
                            display: true, // Show the y-axis grid lines

                        },
                        position: 'left',

                    }

            },
        },
    });

    device_chart = new Chart(ctx_by_devices, {
        type: 'doughnut',
        data: data_by_devices,
        options: {
            plugins: {
                legend: {
                    display: false, // Hide the default legend
                },
            }
        }
    });

    if (type == 1) {
        date_chart = new Chart(ctx_by_date, {
            type: 'line',
            data: data_by_date,
            options: {
                maintainAspectRatio: false,
                aspectRatio: 2,
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                stacked: false,
                plugins: {
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false, // Hide the default legend
                    },
                    tooltip: {
                        callbacks: {
                            footer: function(tooltipItems) {
                                // Customize and return the content for the tooltip footer
                                if (tooltipItems.length > 0) {
                                    return 'Conversation Rate '; // You can customize this based on your specific data
                                }
                                return null; // Return null if no footer content is needed
                            },
                            afterFooter: function () {
                                return '83.33%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'category', // Define the scale type, such as 'linear', 'time', 'logarithmic', or 'category' for string values
                        ticks: {
                            beginAtZero: true, // Start the axis at zero if true
                            // Other tick options such as max, min, stepSize, callback functions, etc.
                        },
                        grid: {
                            display: false, // Remove grid lines for the Y-axis
                        }
                    },
                    y:
                        {
                            type: 'linear',
                            min: 0,
                            max: 40,
                            beginAtZero: true,
                            grid: {
                                display: true, // Show the y-axis grid lines

                            },
                            position: 'left',

                        }

                },
            },
        });
        countries_chart = new Chart(ctx_by_countries, {
            type: 'bar',
            data: data_by_countries,
            options: {
                maintainAspectRatio: false,
                aspectRatio: 0.5,
                indexAxis: 'y',
                scales: {
                    x: {
                        position: 'top',
                        min: 0, // Set minimum value for x-axis
                        max: 500,
                        beginAtZero: true,
                    },
                    y: {

                    }
                },
                plugins: {
                    legend: {
                        display: false, // Hide the default legend
                    },
                }
            }
        });
        cities_chart = new Chart(ctx_by_cities, {
            type: 'bar',
            data: data_by_cities,
            options: {
                maintainAspectRatio: false,
                aspectRatio: 0.5,
                indexAxis: 'y',
                scales: {
                    x: {
                        position: 'top',
                        min: 0, // Set minimum value for x-axis
                        max: 500,
                        beginAtZero: true,
                    },
                    y: {

                    }
                },
                plugins: {
                    legend: {
                        display: false, // Hide the default legend
                    },
                }
            }
        })
    }
}

change_hour_chart_line = function(index) {
    let dataset = hour_chart.data.datasets[index];
    dataset.hidden = !dataset.hidden; // Toggle the visibility of the dataset
    hour_chart.update();
};
change_day_chart_line = function(index) {
    let dataset = day_chart.data.datasets[index];
    dataset.hidden = !dataset.hidden; // Toggle the visibility of the dataset
    day_chart.update();
};

change_date_chart_line = function(index) {
    let dataset = date_chart.data.datasets[index];
    dataset.hidden = !dataset.hidden; // Toggle the visibility of the dataset
    date_chart.update();
};
change_country_chart_line = function(index) {
    let dataset = countries_chart.data.datasets[index];
    dataset.hidden = !dataset.hidden; // Toggle the visibility of the dataset
    countries_chart.update();
};
change_city_chart_line = function(index) {
    let dataset = cities_chart.data.datasets[index];
    dataset.hidden = !dataset.hidden; // Toggle the visibility of the dataset
    cities_chart.update();
};

loadFormTemplatesHtml = function () {
    $.get('/assets/htmls-main/formTemplates.html', function (data) {
        $('body .left-side-panel .nav .nav-item').removeClass('active');
        $('body .left-side-panel .nav-item-space').css('height', '300px');
        $('body .left-side-panel .banner').css('display', 'none');

        $('.top-update-bar').removeClass('d-flex');
        $('.top-update-bar').addClass('d-none');

        $('body .main').empty();
        $('body .main').html(data);
    });
};
loadSimpleContactForm = function () {
    $.get('/assets/htmls-main/simpleContactForm.html', function (data) {
        $('body .main').empty();
        $('body .main').html(data);
    });
};
loadEasyFormsHtml = function () {
    $.get('/assets/htmls-main/easyForms.html', function (data) {
        $('body').empty();
        $('body').html(data);
        load_chart_data(0);
    });
};
loadInsightsHtml = function(obj) {
    $('body .left-side-panel .nav .nav-item').removeClass('active');
    $(obj).parent().addClass('active');
    $('.top-update-bar').removeClass('d-flex');
    $('.top-update-bar').addClass('d-none');
    $.get('/assets/htmls-main/insights.html', function (data) {
        $('body .main').empty();
        $('body .main').html(data);
        load_chart_data(1);
    });
};

loadSubmissionsHtml = function(obj) {
    $('body .left-side-panel .nav .nav-item').removeClass('active');
    $(obj).parent().addClass('active');
    $('.top-update-bar').removeClass('d-flex');
    $('.top-update-bar').addClass('d-none');
    $.get('/assets/htmls-main/submissions.html', function (data) {
        $('body .main').empty();
        $('body .main').html(data);
    });

    setTimeout(function () {
        const myDateRangePickerCustomRanges = document.getElementById('myDateRangePickerCustomRanges')
        if (myDateRangePickerCustomRanges) {
            const optionsCustomRanges = {
                locale: 'en-US',
                calendars: 1,
                firstDayOfWeek: 7,
                footer: true,
                confirmButton: "APPLY",
                confirmButtonClasses: ['btn', 'btn-sm', 'calendar-active-footer-button'],
                todayButtonClasses: ['btn', 'btn-sm', 'calendar-active-footer-button', 'me-auto'],
                cancelButtonClasses: ['btn', 'btn-sm', 'calendar-cancel-footer-button'],
                inputDateFormat: date => date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
                ranges: {
                    Today: [new Date(), new Date()],
                    Yesterday: [
                        new Date(new Date().setDate(new Date().getDate() - 1)),
                        new Date(new Date().setDate(new Date().getDate() - 1))
                    ],
                    'Last Week': [
                        new Date(new Date().setDate(new Date().getDate() - 6)),
                        new Date(new Date())
                    ],
                    'Last Month': [
                        new Date(new Date().setDate(new Date().getDate() - 29)),
                        new Date(new Date())
                    ],
                    '3 Months': [
                        new Date(new Date().getFullYear(), new Date().getMonth() - 2, new Date().getDate()),
                        new Date(new Date())
                    ],
                    '6 Months': [
                        new Date(new Date().getFullYear(), new Date().getMonth() - 5, new Date().getDate()),
                        new Date(new Date())
                    ],
                    'Custom Range': [

                    ]
                }
            }

            new coreui.DateRangePicker(myDateRangePickerCustomRanges, optionsCustomRanges)
        }
    }, 200);
};

loadSettingHtml = function() {
    $('.top-update-bar').removeClass('d-flex');
    $('.top-update-bar').addClass('d-none');
    $.get('/assets/htmls-main/setting.html', function (data) {
        $('body .main').empty();
        $('body .main').html(data);
    });
};

change_template_category = function(obj, type) {
    $('.main .template-categories .template-category').removeClass('active');
    $(obj).addClass('active');
    if (type == "all") {
        $('.main .templates .template-item').fadeIn();
    } else {
        $('.main .templates .template-item').fadeOut();
        $('.main .templates .template-item.' + type).fadeIn();
    }
};

createNewForm = function () {
    $.get('/assets/htmls-main/createForm.html', function (data) {
        $('body').empty();
        $('body').html(data);
    });
};

go_to_start_with_easyforms = function() {
    $('.create-new-form-modal').css('display', 'none');
    $('.create-form').removeClass('d-none');
    $('.create-form').addClass('d-flex');
};
go_to_second_modal = function() {
    $('.create-new-form-modal.first-step').css('display', 'none');
    $('.create-new-form-modal.second-step').css('display', 'block');
};
go_back_to_first_step = function() {
    $('.create-new-form-modal.second-step').css('display', 'none');
    $('.create-new-form-modal.first-step').css('display', 'block');
}

click_build_button = function () {
    $('.create-form .menu .menus .setting').fadeOut();
    $('.create-form .menu .menus > div').removeClass('active');
    $('.create-form .menu .menus .build').addClass('active');
    $('.create-form .adjustment').removeClass('d-block');
    $('.create-form .adjustment').removeClass('d-none');
    $('.create-form .adjustment.customize-adjustment').addClass('d-none');
    $('.create-form .adjustment.template-adjustment').addClass('d-none');
    $('.create-form .adjustment.publish-adjustment').addClass('d-none');
    $('.create-form .adjustment.form-build-adjustment').addClass('d-block');
    $('.add-element-modal').css('display', 'none');
};
click_customize_button = function () {
    $('.create-form .menu .menus .setting').fadeOut();
    $('.create-form .menu .menus > div').removeClass('active');
    $('.create-form .menu .menus .customize').addClass('active');

    $('.create-form .adjustment').removeClass('d-block');
    $('.create-form .adjustment').removeClass('d-none');
    $('.create-form .adjustment.form-build-adjustment').addClass('d-none');
    $('.create-form .adjustment.template-adjustment').addClass('d-none');
    $('.create-form .adjustment.publish-adjustment').addClass('d-none');
    $('.create-form .adjustment.customize-adjustment').addClass('d-block');
    $('.add-element-modal').css('display', 'none');



    let dropArea = document.getElementById('company-logo-drag-and-drop')

    dropArea.addEventListener('dragenter', function() {
        console.log('dragenter');
    }, false);
    dropArea.addEventListener('dragleave', function () {
        console.log('dragleave');
    }, false);
    dropArea.addEventListener('dragover', function () {
        console.log('dragover');
    }, false);
    dropArea.addEventListener('drop', function () {
        console.log('drop');
    }, false);

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    });

    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }

};
click_template_button = function () {
    $('.create-form .menu .menus .setting').fadeOut();
    $('.create-form .menu .menus > div').removeClass('active');
    $('.create-form .menu .menus .template').addClass('active');
    $('.create-form .adjustment').removeClass('d-block');
    $('.create-form .adjustment').removeClass('d-none');
    $('.create-form .adjustment.form-build-adjustment').addClass('d-none');
    $('.create-form .adjustment.customize-adjustment').addClass('d-none');
    $('.create-form .adjustment.publish-adjustment').addClass('d-none');
    $('.create-form .adjustment.template-adjustment').addClass('d-block');
    $('.add-element-modal').css('display', 'none');
};
click_setting_button = function () {

};

renamePage = function (obj) {
    $(obj).closest(".page-item").find('.page-title-input').css('display', 'block');
    $(obj).closest(".page-item").find('.page-title-input').focus();
    $(obj).closest(".page-item").find('.page-title').css('display', 'none');
    // $(obj).closest('div.page-title')
};

change_title_name = function (obj) {
    var title = $(obj).val();
    $(obj).closest(".page-item").find('.page-title-input').css('display', 'none');
    $(obj).closest(".page-item").find('.page-title .page-name').text(title);
    $(obj).closest(".page-item").find('.page-title').css('display', 'flex');
};

set_custom_color_setting_active = function (obj) {
    $(obj).closest('.color-setting-tab').find('.color-setting-template').removeClass('active');
    $(obj).addClass('active');
    $(obj).closest('.color-setting-content').find('.color-setting-custom-content').removeClass('d-none');
    $(obj).closest('.color-setting-content').find('.color-setting-custom-content').addClass('d-block');
    $(obj).closest('.color-setting-content').find('.color-setting-template-content').removeClass('d-block');
    $(obj).closest('.color-setting-content').find('.color-setting-template-content').addClass('d-none');
};

set_template_color_setting_active = function (obj) {
    $(obj).closest('.color-setting-tab').find('.color-setting-custom').removeClass('active');
    $(obj).addClass('active');
    $(obj).closest('.color-setting-content').find('.color-setting-custom-content').addClass('d-none');
    $(obj).closest('.color-setting-content').find('.color-setting-custom-content').removeClass('d-block');
    $(obj).closest('.color-setting-content').find('.color-setting-template-content').addClass('d-block');
    $(obj).closest('.color-setting-content').find('.color-setting-template-content').removeClass('d-none');
};

select_ws_widget = function (obj) {
    if ($(obj).hasClass('selected')) {
        $(obj).removeClass('selected')
    } else {
        $(obj).closest('.ws-page-item-content').find('.ws-widget').removeClass('selected');
        $(obj).addClass('selected')
    }
    $('.create-form #adjustment-setting').removeClass('d-none');
    $('.create-form #adjustment-setting').addClass('d-block');
    $('.create-form #workspace-page-item').removeClass('d-block');
    $('.create-form #workspace-page-item').addClass('d-none');
    $('.create-form #new-page-item').removeClass('d-block');
    $('.create-form #new-page-item').addClass('d-none');

    click_build_button();
};
add_new_page = function () {
    $('.create-form #workspace-page-item').removeClass('d-none');
    $('.create-form #workspace-page-item').addClass('d-block');
    $('.create-form #adjustment-setting').addClass('d-none');
    $('.create-form #new-page-item').removeClass('d-none');
    $('.create-form #new-page-item').addClass('d-block');
};

publish_form = function () {
    $('.create-form .adjustment').removeClass('d-block');
    $('.create-form .adjustment').removeClass('d-none');
    $('.create-form .adjustment.form-build-adjustment').addClass('d-none');
    $('.create-form .adjustment.customize-adjustment').addClass('d-none');
    $('.create-form .adjustment.template-adjustment').addClass('d-none');
    $('.create-form .adjustment.publish-adjustment').addClass('d-block');
    $('.create-form .workspace').removeClass('d-block');
    $('.create-form .workspace').removeClass('d-none');
    $('.create-form .workspace.form-creating').addClass('d-none');
    $('.create-form .workspace.publish-share').addClass('d-block');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item').removeClass('d-block');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item').removeClass('d-none');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item.ws-publish-embed-content').addClass('d-none');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item.workspace-publish-list-content').addClass('d-block');
};

goto_publish_list = function (obj) {
    $(obj).closest('ul').find('li').removeClass('selected');
    $(obj).addClass('selected');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item').removeClass('d-block');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item').removeClass('d-none');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item.ws-publish-embed-content').addClass('d-none');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item.workspace-publish-list-content').addClass('d-block');
};
goto_publish_embed = function (obj) {
    $(obj).closest('ul').find('li').removeClass('selected');
    $(obj).addClass('selected');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item').removeClass('d-block');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item').removeClass('d-none');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item.workspace-publish-list-content').addClass('d-none');
    $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item.ws-publish-embed-content').addClass('d-flex');
};
change_embed_style = function () {
    if ($('.create-form .workspace .workspace-publish-content .workspace-publish-content-item.ws-publish-embed-content').hasClass('flex-content')) {
        $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item.ws-publish-embed-content').removeClass('flex-content');
    } else {
        $('.create-form .workspace .workspace-publish-content .workspace-publish-content-item.ws-publish-embed-content').addClass('flex-content');
    }
};


let render_content = '<div class="ws-page-item-content">';

render_form = function () {
    render_content += $('.create-form .workspace.form-creating .workspace-content .workspace-page-item.active .ws-page-item-content').html();
    render_content += "</div>";
    $('.create-form').removeClass('d-flex');
    $('.create-form').addClass('d-none');
    $('.render-preview').removeClass('d-none');
    $('.render-preview').addClass('d-block');
    $('.render-preview .render-content .desktop-view').empty();
    $('.render-preview .render-content .desktop-view').html(render_content);
    $('.render-preview .render-content .mobile-view .mobile-view-container .mobile-view-content').empty();
    $('.render-preview .render-content .mobile-view .mobile-view-container .mobile-view-content').html(render_content);
};
cancel_render_preview = function () {
    $('.create-form').removeClass('d-none');
    $('.create-form').addClass('d-flex');
    $('.render-preview').removeClass('d-block');
    $('.render-preview').addClass('d-none');
};
show_desktop_preview = function (obj) {
    $('.render-preview .render-header .preview-item.mobile-item').removeClass('active');
    $('.render-preview .render-header .preview-item.desktop-item').addClass('active');
    $('.render-preview .render-footer .changed-alert span').text("Desktop View")
    $('.render-preview .render-content .mobile-view').css('display', 'none');
    $('.render-preview .render-content .desktop-view').css('display', 'block');
};
show_mobile_preview = function (obj) {
    $('.render-preview .render-header .preview-item.desktop-item').removeClass('active');
    $('.render-preview .render-header .preview-item.mobile-item').addClass('active');
    $('.render-preview .render-footer .changed-alert span').text("Mobile View")
    $('.render-preview .render-content .desktop-view').css('display', 'none');
    $('.render-preview .render-content .mobile-view').css('display', 'block');
};

open_add_element_modal = function () {
    $('.add-element-modal').css('display', 'block');
};
close_add_element_modal = function () {
    $('.add-element-modal').css('display', 'none');
};
select_input_element = function (obj) {
    if ($(obj).hasClass('active')) return;
    $(obj).closest('.add-element-tabs').find('.add-element-tab-item').removeClass('active');
    $(obj).addClass('active');
    $('.add-element-modal .add-element-content .layout-element-tab-content').removeClass('d-flex');
    $('.add-element-modal .add-element-content .layout-element-tab-content').addClass('d-none');
    $('.add-element-modal .add-element-content .input-element-tab-content').removeClass('d-none');
    $('.add-element-modal .add-element-content .input-element-tab-content').addClass('d-flex');
};
select_layout_element = function (obj) {
    if ($(obj).hasClass('active')) return;
    $(obj).closest('.add-element-tabs').find('.add-element-tab-item').removeClass('active');
    $(obj).addClass('active');
    $('.add-element-modal .add-element-content .input-element-tab-content').removeClass('d-flex');
    $('.add-element-modal .add-element-content .input-element-tab-content').addClass('d-none');
    $('.add-element-modal .add-element-content .layout-element-tab-content').removeClass('d-none');
    $('.add-element-modal .add-element-content .layout-element-tab-content').addClass('d-flex');
};
select_add_element = function (obj, type) {
    if ($(obj).hasClass('selected')) {
        $(obj).removeClass('selected');
    } else {
        $(obj).addClass('selected');
    }
};

show_hide_text_shadow = function (obj) {
    if($(obj).prop("checked")) {
        $('.text-shadow-setting-content').css('display', 'block');
    } else {
        $('.text-shadow-setting-content').css('display', 'none');
    }
};

select_form_size = function (obj, value) {
    $(obj).closest('.size-setting-content').find('button').removeClass('active');
    $(obj).addClass('active');
    form_size = value;
};
select_form_alignment = function (obj, value) {
    $(obj).closest('.alignment-setting-content').find('button').removeClass('active');
    $(obj).addClass('active');
    form_alignment = value;
};
set_custom_color = function (obj, type) {
    let color_value = $(obj).val();
    switch (type) {
        case "preheader":
            color_preheader = color_value;
            break;
        case "form_title":
            color_form_title = color_value;
            break;
        case "text":
            color_text = color_value;
            break;
        case "default_fields_text":
            color_default_fields_text = color_value;
            break;
        case "active_fields":
            color_active_fields = color_value;
            break;
        case "button":
            color_button = color_value;
            break;
        default:
            break;
    }
};
select_custom_field_size = function (obj, value) {
    $(obj).closest('.fields-style-size-setting-content').find('button').removeClass('active');
    $(obj).addClass('active');
    field_size = value;
};
select_custom_field_type = function (obj, value) {
    $(obj).closest('.fields-style-type-setting-content').find('button').removeClass('active');
    $(obj).addClass('active');
    field_type = value;
};

select_field_name_motion = function (obj, value) {
    $(obj).closest('.fields-style-field-name-setting-content').find('button').removeClass('active');
    $(obj).addClass('active');
    field_name_motion = value;
    if (value == "animated") {
        $('.fields-style-theme-setting-content button').addClass('disabled');
        $('.fields-style-theme-setting-content button').removeClass('active');
    }
};
select_custom_theme = function (obj, value) {
    if (field_name_motion == "animated") {
        return;
    }
    $(obj).closest('.fields-style-theme-setting-content').find('button').removeClass('disabled');
    $(obj).closest('.fields-style-theme-setting-content').find('button').removeClass('active');
    $(obj).addClass('active');
    field_theme = value;
};
select_button_size = function (obj, value) {
    $(obj).closest('.button-size-setting-content').find('button').removeClass('active');
    $(obj).addClass('active');
    button_size = value;
};
select_button_style = function (obj, value) {
    $(obj).closest('.button-size-setting-content').find('button').removeClass('active');
    $(obj).addClass('active');
    button_border_style = value;
};
show_hide_image = function(obj) {
    if($(obj).prop("checked")) {
        $('#advanced-image-drag-and-drop').css('display', 'block');
    } else {
        $('#advanced-image-drag-and-drop').css('display', 'none');
    }
};
show_hide_company_logo = function(obj) {
    if($(obj).prop("checked")) {
        $('#company-logo-drag-and-drop').css('display', 'block');
    } else {
        $('#company-logo-drag-and-drop').css('display', 'none');
    }
};
select_form_background = function (obj, value) {
    $(obj).closest('.advanced-form-background-setting-content').find('button').removeClass('active');
    $(obj).addClass('active');
    switch (value) {
        case "transparent":
            $('.advanced-form-background-setting-content-detail').css('display', 'none');
            break;
        case "colour":
            $('.advanced-form-background-setting-content-detail').css('display', 'block');
            $('.advanced-form-background-setting-content-detail .selected-color-for-form-back').removeClass('d-none');
            break;
        case "image":
            $('.advanced-form-background-setting-content-detail').css('display', 'block');
            $('.advanced-form-background-setting-content-detail .form-back-drag-and-drop').removeClass('d-none');
            break;
    }
};

set_form_background_color = function (obj) {

};
