function setUserDetailsValues () {}

function drawPlans() {
  let priceLst = $('#pricingCardList');
  priceLst.empty();
  let html;
  for (const key in allPlans) {
    var item = allPlans[key];
    const realPrice = yearly ? item['yearlyPrice'] : item['planPrice'];
    const planPrice = yearly ? item['yearlyPrice'] / 12 : item['planPrice'];

    const monthlyPrice = item['planPrice'];
    const yearlyPrice = item['yearlyPrice'] / 12;

    const percentDiscountnum = (monthlyPrice - planPrice) * 100 / monthlyPrice;
    const percentDiscount = Math.floor(percentDiscountnum);
    if (isNaN(percentDiscount)) {
      $('.percent_box').hide();
    }
    const active = (packageName === item['planName']);

    let newItem = `
            <div class="col-md-3">
                <div class="pricing-card ${active ? 'active' : ''}">
                    <h6 class="card-title">${item['planName']}</h6>
                    ${yearly && monthlyPrice > 0 ? `<div class="percent_box">${percentDiscount}% OFF</div>` : ''}
                    <div class="d-flex" style="align-items: center;">
                      ${yearly && monthlyPrice > 0 ? `<s class="fw-normal">${item['planPriceCurrency'] + monthlyPrice}</s>` : ''}
                      ${(!planPrice || planPrice === 0) ?
                      '<p class="card-price">Free</p>' :
                      `<p class="card-price">${item['planPriceCurrency'] + planPrice}/mo</p>`}
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
                    ${(yearly ? '<h3 class="annuallyPrice">$<b>' + realPrice + '</b>/year</h3>' : '')}
                    ${active && packageName === 'Starter' ? '' : getButton(item, realPrice, yearly)}
                </div>
            </div>
          `;
    priceLst.append(newItem);
  }
  hideLoading();
}

function showLoading(message) {
  if (message == null || message == "") {
      $("#loading-overlay .message").html("Loading...");
  } else {
      $("#loading-overlay .message").html(message);
  }

  $("#loading-overlay").show();
}

function hideLoading() {
  $("#loading-overlay").hide();
}

showLoading();

function writeLog(title, value) {
  let now = new Date();

  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  let day = String(now.getDate()).padStart(2, '0');

  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');
  let milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  console.log(`${formattedDateTime} --------------------> ${title}`);
  console.log(value);
}

$(document).ready(function () {
  var addPoweredBy = false;

  let siteToLoad = mainUserDetails ? mainUserDetails["wixUrl"] : "";
  let userSite = "http://127.0.0.1/testSiteWithWidget.html?app=Get%20Leads";
  if (isTestingMode()) {
    siteToLoad = "https://www.rabbitseo.com";
    userSite = "http://127.0.0.1/testSiteWithWidget.html?app=Get%20Leads";
  }
  siteToLoad = "https://www.rabbitseo.com";
  $("#sitePreview").attr("data", siteToLoad);

  $('[data-bs-toggle="tooltip"]').tooltip();
  
  function initHeader(){
    $("#hdr_userName").text(mainUserDetails['firstName']);
    $("#hdr_roleName").text(mainUserDetails['roleName']);
    $('.header .profile img').attr('src', mainUserDetails['avatar']);

    console.log('mainUserDetails ---> ', mainUserDetails);

    if (mainUserDetails['hideAllUpgradeLinks']) {
      $('#upgradeHeader').hide();
      $('#pricingCardList').hide();
    }
    if (mainUserDetails['hideCTAUpgradeLinks']) {
      $('#upgradeHeader button').hide();
    }
    $('#upgradeHeader button').on('click', function() {
      $(`.sidebar .nav-link[data-type="settings"]`).click();
    });

    let weblist = getWebsitesList();
    console.log('weblist ---> ', weblist);
    $('#websiteDropdown a').html(weblist ? weblist[0].name : '');
    $('#websiteDropdown ul').empty();
    weblist.forEach(item => {
      let newItem = `<li><a class="dropdown-item" target="_blank" href="https://www.${item.name}">${item.name}</a></li>`;
      $('#websiteDropdown ul').append(newItem);
    });
  }
  initHeader();

  var rowsPerPage = 10;
  var currentRows = []; // Array to hold the current rows (after filtering and sorting)
  var selectedImageSrc = '';

  var submissionWgtTable = $('#submissionTable').DataTable({
    dom: '<"table-top-bar"fB>rtip',
    buttons: [
        {
            extend: 'excel',
            text: `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_13_261)">
                      <path d="M22.0342 7.93749H18.8543V4.97273L13.55 0H0.965332V23H18.8542V19.6117H22.0342V7.93749H22.0342ZM20.1176 17.6951H6.70089V9.85416H20.1176V17.6951Z" fill="#D74444"/>
                      <path d="M11.468 13.108C11.468 13.332 11.414 13.542 11.306 13.738C11.202 13.934 11.036 14.092 10.808 14.212C10.584 14.332 10.3 14.392 9.956 14.392H9.254V16H8.414V11.812H9.956C10.28 11.812 10.556 11.868 10.784 11.98C11.012 12.092 11.182 12.246 11.294 12.442C11.41 12.638 11.468 12.86 11.468 13.108ZM9.92 13.714C10.152 13.714 10.324 13.662 10.436 13.558C10.548 13.45 10.604 13.3 10.604 13.108C10.604 12.7 10.376 12.496 9.92 12.496H9.254V13.714H9.92ZM13.5284 11.812C13.9684 11.812 14.3544 11.898 14.6864 12.07C15.0224 12.242 15.2804 12.488 15.4604 12.808C15.6444 13.124 15.7364 13.492 15.7364 13.912C15.7364 14.332 15.6444 14.7 15.4604 15.016C15.2804 15.328 15.0224 15.57 14.6864 15.742C14.3544 15.914 13.9684 16 13.5284 16H12.0644V11.812H13.5284ZM13.4984 15.286C13.9384 15.286 14.2784 15.166 14.5184 14.926C14.7584 14.686 14.8784 14.348 14.8784 13.912C14.8784 13.476 14.7584 13.136 14.5184 12.892C14.2784 12.644 13.9384 12.52 13.4984 12.52H12.9044V15.286H13.4984ZM18.9512 11.812V12.49H17.2052V13.564H18.5432V14.23H17.2052V16H16.3652V11.812H18.9512Z" fill="#D74444"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_13_261">
                      <rect width="23" height="23" fill="white"/>
                      </clipPath>
                      </defs>
                  </svg>
                `,
            className: 'btn btn-table-export'
        },
        {
            extend: 'pdf',
            text: `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_13_249)">
                      <path d="M22.0342 7.93749H18.8543V4.97273L13.55 0H0.965332V23H18.8542V19.6117H22.0342V7.93749H22.0342ZM20.1176 17.6951H6.70089V9.85416H20.1176V17.6951Z" fill="#2C9452"/>
                      <path d="M8.03085 15.6146H8.91251L9.90592 14.1217L10.8934 15.6146H11.7692L10.3291 13.5574L11.8162 11.4414H10.9404L9.90592 12.9931L8.86549 11.4414H7.98389L9.47096 13.5574L8.03085 15.6146Z" fill="#2C9452"/>
                      <path d="M15.1723 14.9034H13.0445V11.4414H12.2334V15.6146H15.1723V14.9034Z" fill="#2C9452"/>
                      <path d="M17.1237 14.9329C16.9629 14.9329 16.8063 14.9133 16.6535 14.8741C16.5006 14.835 16.3615 14.787 16.2361 14.7301C16.1107 14.6734 16.002 14.6165 15.9099 14.5597C15.8178 14.5029 15.7542 14.4568 15.7189 14.4215L15.3604 15.121C15.6033 15.2935 15.8776 15.4266 16.1832 15.5207C16.4889 15.6147 16.7984 15.6617 17.1119 15.6617C17.3157 15.6617 17.5106 15.6391 17.6968 15.5941C17.8828 15.5491 18.0474 15.4776 18.1905 15.3796C18.3335 15.2817 18.4471 15.1533 18.5314 14.9946C18.6156 14.8359 18.6578 14.6449 18.6578 14.4215C18.6578 14.2296 18.6264 14.0679 18.5637 13.9366C18.501 13.8054 18.4118 13.6927 18.2963 13.5986C18.1807 13.5046 18.0396 13.4263 17.8731 13.3635C17.7065 13.3009 17.5213 13.2421 17.3177 13.1872C17.1609 13.1481 17.0227 13.1108 16.9033 13.0755C16.7837 13.0403 16.6848 13.0012 16.6064 12.958C16.528 12.9149 16.4683 12.8649 16.4272 12.8081C16.386 12.7513 16.3655 12.6798 16.3655 12.5935C16.3655 12.4447 16.4203 12.329 16.53 12.2468C16.6397 12.1645 16.8063 12.1233 17.0296 12.1233C17.155 12.1233 17.2785 12.139 17.3999 12.1703C17.5213 12.2018 17.634 12.24 17.7379 12.285C17.8417 12.3301 17.9298 12.3761 18.0024 12.4231C18.0749 12.4701 18.1248 12.5074 18.1523 12.5348L18.5108 11.8765C18.3266 11.7511 18.1112 11.6424 17.8643 11.5502C17.6174 11.4582 17.347 11.4121 17.0532 11.4121C16.8416 11.4121 16.6436 11.4405 16.4595 11.4973C16.2752 11.5542 16.1136 11.6374 15.9746 11.7471C15.8354 11.8569 15.7267 11.994 15.6484 12.1586C15.5699 12.3232 15.5308 12.5113 15.5308 12.7229C15.5308 12.8836 15.5552 13.0217 15.6043 13.1372C15.6533 13.2529 15.7268 13.3547 15.8247 13.4429C15.9226 13.531 16.0451 13.6075 16.1921 13.6721C16.339 13.7368 16.5124 13.7966 16.7122 13.8514C16.8768 13.8984 17.0257 13.9416 17.159 13.9807C17.2921 14.0199 17.4058 14.063 17.4999 14.11C17.5939 14.157 17.6664 14.2119 17.7173 14.2746C17.7682 14.3373 17.7938 14.4137 17.7938 14.5038C17.7938 14.7899 17.5704 14.9329 17.1237 14.9329Z" fill="#2C9452"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_13_249">
                      <rect width="23" height="23" fill="white"/>
                      </clipPath>
                      </defs>
                  </svg>
                  `,
            className: 'btn btn-table-export'
        }
    ],
    columnDefs: [
      // {
      //   targets: 4,
      //   data: null,
      //   defaultContent: '<button class="edit"></button>'
      // }
    ],
    order: [[1, 'asc']]
  });

  // Event handler for editing
  // $('#submissionTable tbody').on('click', 'button.edit', function () {
  //   var data = submissionWgtTable.row($(this).parents('tr')).data();
  //   var newValue = prompt("Update the value:", data[3]);
  //   if (newValue !== null) {
  //     data[3] = newValue;
  //     submissionWgtTable.row($(this).parents('tr')).data(data).draw();
  //   }
  // });

  var dashboardLineChartCtx = $("#dashboardLineChart");
  var dashboardLineChart = new Chart(dashboardLineChartCtx, {
    type: "line",
    data: {
      labels: [
        "Sun 13th Aug",
        "Mon 14th Aug",
        "Tue 15th Aug",
        "Wed 16th Aug",
        "Thu 17th Aug",
        "Fri 18th Aug",
        "Sat 19th Aug",
      ],
      datasets: [
        {
          label: "Visits",
          data: [3],
          borderColor: "#007bff",
          fill: false,
          hidden: false,
        },
        {
          label: "Clicks",
          data: [],
          borderColor: "#ffc107",
          fill: false,
          hidden: false,
        },
        {
          label: "Submits",
          data: [],
          borderColor: "#7D7D7D",
          fill: false,
          hidden: false,
        }
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            font: {
              size: 14 // Adjust font size for X-axis labels
            }
          },
          grid: {
            display: false, // Removes grid lines on the x-axis
          },
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false, // Legend removed
        },
      },
    },
  });

  var reportLineChartCtx = $("#reportLineChart");
  var reportLineChart = new Chart(reportLineChartCtx, {
    type: "line",
    data: {
      labels: [
        "Sun 13th Aug",
        "Mon 14th Aug",
        "Tue 15th Aug",
        "Wed 16th Aug",
        "Thu 17th Aug",
        "Fri 18th Aug",
        "Sat 19th Aug",
      ],
      datasets: [
        {
          label: "Visits",
          data: [],
          borderColor: "#007bff",
          fill: false,
          hidden: false,
        },
        {
          label: "Clicks",
          data: [],
          borderColor: "#ffc107",
          fill: false,
          hidden: false,
        },
        {
          label: "Submits",
          data: [],
          borderColor: "#7D7D7D",
          fill: false,
          hidden: false,
        }
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: {
            font: {
              size: 14 // Adjust font size for X-axis labels
            }
          },
          grid: {
            display: false, // Removes grid lines on the x-axis
          },
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false, // Legend removed
        },
      },
    },
  });


  // -------------------------- Common functions ----------------------
  function getRandomColor() {
    // Generate a random color in hex format
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function setTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    let rpt_today = new Date().toISOString().split('T')[0];
    let date = new Date();
    date.setDate(date.getDate() - 7);
    let rpt_seven_days_ago = date.toISOString().split('T')[0];

    $('#st_startDate').val(rpt_seven_days_ago);
    $('#st_endDate').val(rpt_today);
    $('#rpt_startDate').val(rpt_seven_days_ago);
    $('#rpt_endDate').val(rpt_today);
  }
  setTodayDate();

  $('.left-side').on("change", '.image-upload', function () {
    let parent = $(this).attr('id');
    let file = $(this)[0].files[0];
    let imgGroup = $(this).closest('.group-details-section');
    if (file) {
      showLoading();
      
      uploadFile(file, function(retVal) {
        if (retVal !== null) {
          imgGroup.find('img').attr('src', retVal);
          imgGroup.find('.cover-image-val').val(retVal);
          writeLog('upload file return value', retVal);

          handleImageUpdate(parent);
        }
        hideLoading();
      });
    }
  });

  $('.left-side').on("click", '.explore-gallery', function () {
    $('#imageModal').data('parent', $(this).attr('id'));
    selectedImageSrc = '';
    $('#imageModal').fadeIn();
    loadImages('business'); // Load default images for the initial category
  });

  $('.preview-method button').on('click', function() {
    let type = $(this).data('type');
    $('#sitePreviewDiv').removeClass('preview-fullscreen preview-desktop preview-mobile').addClass(type);
    $('#sitePreviewDiv').data('value', type);
  });

  // left panel color selector
  function initializeColorPicker(pickerId, inputId) {
    $(`#${pickerId}`).on('click', function (event) {
      // Check if the click target is not the label or the input itself
      if (!$(event.target).is('label') && !$(event.target).is('input[type="color"]')) {
        $(`#${inputId}`).click();  // Trigger the color input click
      }
    });

    $(`#${inputId}`).on('input', function () {
      var selectedColor = $(this).val();
      $(`#${pickerId} .color-box`).css('background-color', selectedColor);  // Change color box background
    });
  }

  initializeColorPicker('rv_bgColorPicker', 'rv_bgColor');
  initializeColorPicker('rv_buttonColorPicker', 'rv_buttonColor');
  initializeColorPicker('rv_reviewsAnimationPicker', 'rv_reviewsAnimation');
  initializeColorPicker('rv_reviewsBgColorPicker', 'rv_reviewsBgColor');
  initializeColorPicker('st_bgColorPicker', 'st_bgColor');
  initializeColorPicker('st_titleColorPicker', 'st_titleColor');

  function getLastWidgetValue(widgetName, func) { 
    showLoading();
    getWidgetsList(function(widgetList, obj) {
      if (widgetList !== null) {
        writeLog('widgetsList', widgetList);

        let widgetValue = {};          
    
        let lastArray = widgetList.find(widget => widget[2] === widgetName);
        if (lastArray) {
          const valueArray = JSON.parse(lastArray[4]);
          valueArray.forEach(item => {
            widgetValue[item.name] = item.value;
          });
        }
        func(widgetValue, obj);
      }
      hideLoading();
    });
  }

  function setFormValue(widgetValue, formId) {
    if (!$.isEmptyObject(widgetValue)) {
      const $form = $(`#${formId}`); // Replace with your form's ID

      $.each(widgetValue, function (key, value) {
        const $field = $form.find(`[name="${key}"]`);

        if ($field.length) {
          // Handle checkboxes and radio buttons
          if ($field.is(':checkbox') || $field.is(':radio')) {
            $field.each(function () {
              if (Array.isArray(value)) {
                $(this).prop('checked', value.includes($(this).val()));
              } else {
                $(this).prop('checked', $(this).val() === value);
              }
            });
          }
          // Handle select elements (single or multiple)
          else if ($field.is('select')) {
            $field.val(value);
          }
          // Handle all other inputs and textareas
          else {
            $field.val(value);
          }
        }
      });
    }
  }

  $('#btnCheckLiveSite').on('click', function () {
    $(this).closest('.modal').modal('hide');
  });

  $('#btnUpgradePackage').on('click', function() {
    $(this).closest('.modal').modal('hide');
    $(`.sidebar .nav-link[data-type="settings"]`).click();
  });

  // Modal Functions
  function showSubmissionModal(title, content, liveSiteF = false) {
    if (liveSiteF) {
      $('#btnSubmissionDone').removeClass('w-100').addClass('half-width-btn');
      $('#btnCheckLiveSite').show();
      $('#btnCheckLiveSite').attr('href', userSite);
    }
    else {
      $('#btnSubmissionDone').removeClass('half-width-btn').addClass('w-100');
      $('#btnCheckLiveSite').hide();
    }
    $('#submissionModal .modal-body .modal-title').text(title);
    $('#submissionModal .modal-body p').text(content);
    $('#submissionModal').modal('show');
  }
  function showWarningModal(title) {
    if (!mainUserDetails['hideAllUpgradeLinks']) {
      $('#btnWaningDone').removeClass('w-100').addClass('half-width-btn');
      $('#btnUpgradePackage').show();
    }
    else {
      $('#btnWaningDone').removeClass('half-width-btn').addClass('w-100');
      $('#btnUpgradePackage').hide();
    }
    $('#warningModal .modal-body .modal-title').text(title);
    $('#warningModal').modal('show');
  }
  function showPersonalModal() {
    $('#email').val('');
    $('#wixUrl').val('');
    $('#password').val('');
    $('#extraEmails').val('');
    $('#updateAccountDetailsUser .alert-success').hide();
    fillForm('#updateAccountDetailsUser', mainUserDetails);
    $('#updateAccountDetailsUser img').attr('src', mainUserDetails['avatar']);
    $('#personalInfoModal').modal('show');
  }
  $('#saveUserInfo').on('click', function() {
    saveFormAndRefreshDetails(this);
  });

  function showFaqModal() {
    $('#searchInput').val('');
    $('#helpQuestionModal').modal('show');
  }
  function showAskQuestionModal() {
    $('#aq_emailAddress').val('');
    $('#aq_name').val('');
    $('#aq_Question').val('');
    $('#askQuestionModal').modal('show');
  }
  function showPayPackageModal(packageType, discount) {
    let price = 150;
    let packageName = 'Basic Package';
    if (packageType === 'standard') {
      price = 250;
      packageName = 'Standard Package';
    }
    else if (packageType === 'premium') {
      price = 350;
      packageName = 'Premium Package';
    }
    let total = price - discount;
    $('#payPackageModal .modal-header h5').text(`USD ${total.toFixed(2)}`);
    $('#payPackageModal .modal-header .package-name').text(packageName);
    $('#payPackageModal .modal-body .package-price').text(`${price.toFixed(2)} USD`);
    $('#payPackageModal .modal-body .package-discount').text(`${discount.toFixed(2)} USD`);
    $('#payPackageModal .modal-body .package-total').text(`${total.toFixed(2)} USD`);
    $('#pkg_cardNumber').val('');
    $('#pkg_month').val(0);
    $('#pkg_year').val(0);
    $('#pkg_cvv').val('');
    $('#pkg_cardHolder').val('');

    $('#payPackageModal').modal('show');
  }
  function showAddNewCardModal() {
    $('#anc_cardNumber').val('');
    $('#anc_month').val(0);
    $('#anc_year').val(0);
    $('#anc_cvv').val('');
    $('#anc_cardHolder').val('');

    $('#addNewCardModal').modal('show');
  }

  // ---------------------------------------------------------------------------------

  $('#popup_advanced_config_content').on('shown.bs.collapse', function () {
    $('#popup-show-hide-advanced-configuration .accordion-button').text('Hide Advanced Configuration');
  });
  $('#popup_advanced_config_content').on('hidden.bs.collapse', function () {
    $('#popup-show-hide-advanced-configuration .accordion-button').text('Show Advanced Configuration');
  });

  $('#popup_form_advanced_config_content').on('shown.bs.collapse', function () {
    $('#popup-form-show-hide-advanced-configuration .accordion-button').text('Hide Advanced Configuration');
  });
  $('#popup_form_advanced_config_content').on('hidden.bs.collapse', function () {
    $('#popup-form-show-hide-advanced-configuration .accordion-button').text('Show Advanced Configuration');
  });

  $('#faq_advanced_config_content').on('shown.bs.collapse', function () {
    $('#faq-show-hide-advanced-configuration .accordion-button').text('Hide Advanced Configuration');
  });
  $('#faq_advanced_config_content').on('hidden.bs.collapse', function () {
    $('#faq-show-hide-advanced-configuration .accordion-button').text('Show Advanced Configuration');
  });

  $('#review_advanced_config_content').on('shown.bs.collapse', function () {
    $('#review-show-hide-advanced-configuration .accordion-button').text('Hide Advanced Configuration');
  });
  $('#review_advanced_config_content').on('hidden.bs.collapse', function () {
    $('#review-show-hide-advanced-configuration .accordion-button').text('Show Advanced Configuration');
  });

  $('#story_advanced_config_content').on('shown.bs.collapse', function () {
    $('#story-show-hide-advanced-configuration .accordion-button').text('Hide Advanced Configuration');
  });
  $('#story_advanced_config_content').on('hidden.bs.collapse', function () {
    $('#story-show-hide-advanced-configuration .accordion-button').text('Show Advanced Configuration');
  });

  $('#contactus_advanced_config_content').on('shown.bs.collapse', function () {
    $('#contactus-show-hide-advanced-configuration .accordion-button').text('Hide Advanced Configuration');
  });
  $('#contactus_advanced_config_content').on('hidden.bs.collapse', function () {
    $('#contactus-show-hide-advanced-configuration .accordion-button').text('Show Advanced Configuration');
  });

  $('#message_advanced_config_content').on('shown.bs.collapse', function () {
    $('#message-show-hide-advanced-configuration .accordion-button').text('Hide Advanced Configuration');
  });
  $('#message_advanced_config_content').on('hidden.bs.collapse', function () {
    $('#message-show-hide-advanced-configuration .accordion-button').text('Show Advanced Configuration');
  });

  $('#contactus_advanced_config_content').on('shown.bs.collapse', function () {
    $('#contactus-show-hide-advanced-configuration .accordion-button').text('Hide Advanced Configuration');
  });
  $('#contactus_advanced_config_content').on('hidden.bs.collapse', function () {
    $('#contactus-show-hide-advanced-configuration .accordion-button').text('Show Advanced Configuration');
  });

  // ------------------------------------- Gallary Modal ------------------------------------- 
  // Close modal
  $('.gallery-close').on('click', function () {
    $('#imageModal').fadeOut();
  });

  // Load images based on selected category
  $('#imageCategory').on('change', function () {
    var selectedCategory = $(this).val();
    loadImages(selectedCategory);
  });

  // Function to load images
  function loadImages(category) {
    var imageGrid = $('#imageGrid');
    imageGrid.empty(); // Clear previous images

    images = getImagesListByQuery(category);
    images.forEach(function (src) {
      imageGrid.append('<div class="gallery-image-item"><img src="' + src + '" alt="Image"></div>');
    });

    // Add click event for newly loaded images
    $('.gallery-image-item img').on('click', function () {
      $('.gallery-image-item img').removeClass('selected');
      $(this).addClass('selected');
      selectedImageSrc = $(this).attr('src');
    });

    // Add click event for newly loaded images
    $('.gallery-image-item img').on('dblclick', function () {
      let parent = $('#imageModal').data('parent');
      selectedImageSrc = $(this).attr('src');
      if (selectedImageSrc) {
        $('#imageModal').fadeOut();
        $('#selectedImage').attr('src', selectedImageSrc);
        let imgGroup = $(`#${parent}`).closest('.group-details-section');
        imgGroup.find('img').attr("src", selectedImageSrc);
        imgGroup.find('.cover-image-val').val(selectedImageSrc);

        handleImageUpdate(parent);
      }
    });
  }

  function handleImageUpdate(parent) {
    let id = parent.substring(0, 2);
    switch (id) {
      case 'pu':
        if (parent.substring(0, 3) === 'puf') {
          updatePopupFormModal();
        }
        else {
          updatePopupModal();
        }
        break;
      case 'rv':
        updateReviewButton();
        break;
      case 'st':
        updateStoryTheme();
        break;
      case 'cu':
        updateContactUsSection();
        break;
    }
  }

  // ------------------------------------- Menu ------------------------------------- 
  updateScreen('dashboard');
  
  $(".sidebar .nav-link").on("click", function (e) {
    e.preventDefault();

    // Sidebar navigation
    $(".sidebar .nav-link").removeClass("active");
    $(this).addClass("active");

    var target = $(this).data("target");
    $(".content-item").removeClass("active");
    $(target).addClass("active");
  });

  $(".widgets-menu .nav-link").on("click", function (e) {
    e.preventDefault();

    // Widgets menu navigation
    $(".widgets-menu .nav-link").removeClass("active");
    $(this).addClass("active");

    var target = $(this).data("target");
    $(".widgets-content-item").removeClass("active");
    $(target).addClass("active");
  });

  $(".sidebar .nav-link").on("click", function () {
    updateScreen($(this).data("type"));
  });

  $(".widgets-menu .nav-link").on("click", function () {
    updateWidgets($(this).data("type"));
  });

  function updateScreen(selectedMenu) {
    switch (selectedMenu) {
      case 'dashboard':
        $('.add-widget-section').hide();
        $('.submission-table-section').hide();
        $('.dashboard-section').show();

        updateDashboard();
        break;
      case 'widgets':
        $('#widgetMainSection').show();
        $('#widgetSettingSection').hide();
        break;
      case 'reports':
        updateReportPage();
        break;
      case 'settings':
        updateSettingPage();
        break;
    }
  }

  function updateWidgetScreen(dataType) {
    $('#widgetMainSection').hide();
    $('#widgetSettingSection').show();
    $(`.widgets-menu .nav-link[data-type="${dataType}"]`).click();
  }

  function updateWidgets(selectedTab) {
    insertWidgets(selectedTab);
    switch (selectedTab) {
      case "popup":
        setPopupInitialValue();
        break;
      case "popup_form":
        setPopupFormInitialValue();
        break;
      case "faq":
        setFaqInitialValue();
        break;
      case "follow_us":
        setFollowUsInitialValue();
        break;
      case "review":
        setReviewInitialValue();
        break;
      case "story":
        setStoryInitialValue();
        break;
      case "contact_us":
        setContactUsInitialValue();
        break;
      case "message_bar":
        setMessageBarInitialValue();
        break;
    }
  }

  //------------------- Start of Script for Report -----------------------------

  function updateGroupDayChart(dayVal) {
    let newLabel = [];
    let newData = [[], [], []];  // Initialize array with three empty sub-arrays

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    dayVal.Visit.forEach((value, index) => {
      newLabel.push(daysOfWeek[value[0]-1]);  // Replace 'aa' with the actual label if available
      newData[0].push(value[1]);  // Populate data for Visits
      if (dayVal.Click) {
        newData[1].push(dayVal.Click[index] ? dayVal.Click[index][1] : 0);  // Populate data for Clicks
      }
      if (dayVal.Submit) {
        newData[2].push(dayVal.Submit[index] ? dayVal.Submit[index][1] : 0);  // Populate data for Submits
      }
    });

    // Update chart labels
    reportLineChart.data.labels = newLabel;
    newData.forEach((data, index) => {
      reportLineChart.data.datasets[index].data = data;
    });

    // Update the chart
    reportLineChart.update();
  }

  function updateCountriesChart(countryVal) {
    let newLabel = [];
    let newViews = [];
    let newClicks = [];
    let newColor = [];
    let len = 0;
    countryVal.Visit.forEach((value, index) => {
      newLabel.push(value[0]);
      newViews.push(value[1]);
      if (countryVal.Click) {
        newClicks.push(countryVal.Click[index] ? countryVal.Click[index][1] : 0);  // Populate data for Clicks
      }
      newColor.push(getRandomColor());
      len++;
    });

    countriesChart.data.labels = newLabel; // Update labels
    countriesChart.data.datasets[0].data = newViews; // Update data
    countriesChart.data.datasets[0].backgroundColor = newColor; // Update color
    countriesChart.update(); // Update chart

    let legendLst = $('.legend-item-list');
    legendLst.empty();
    for (let i = 0; i < len; i++) {
      let newItem = `
        <div class="legend-item">
            <div class="legend-country">
                <span class="country-icon" style="background-color: ${newColor[i]};"></span>
                <span>${newLabel[i]}</span>
            </div>
            <div class="legend-values">
                <span>${newViews[i]}</span>
                <span>${newClicks[i]}</span>
            </div>
        </div>
      `;
      legendLst.append(newItem);
    }
  }

  function updatePageTitleChart(pageVal) {
    let newLabel = [];
    let newData = [[], [], []];  // Initialize array with three empty sub-arrays

    // Assuming pageVal.Visit, pageVal.Click, and pageVal.Submit are of the same length and have corresponding labels
    pageVal.Visit.forEach((value, index) => {
      console.log(value[0]);
      newLabel.push(value[0]);  // Replace 'aa' with the actual label if available
      newData[0].push(value[1]);  // Populate data for Visits
      if (pageVal.Click) {
        newData[1].push(pageVal.Click[index] ? pageVal.Click[index][1] : 0);  // Populate data for Clicks
      }
      if (pageVal.Submit) {
        newData[2].push(pageVal.Submit[index] ? pageVal.Submit[index][1] : 0);  // Populate data for Submits
      }
    });

    // Update chart labels
    pageTitleChart.data.labels = newLabel;
    newData.forEach((data, index) => {
      pageTitleChart.data.datasets[index].data = data;
    });

    // Update the chart
    pageTitleChart.update();
  }

  function updateDeviceAndHourChart(deviceVal, hourVal) {
    let newLabel = [];
    let newData = [[], [], []];  // Initialize array with three empty sub-arrays

    // Assuming pageVal.Visit, pageVal.Click, and pageVal.Submit are of the same length and have corresponding labels
    hourVal.Visit.forEach((value, index) => {
      newLabel.push(value[0]);
      newData[0].push(value[1]);  // Populate data for Visits
      if (hourVal.Click) {
        newData[1].push(hourVal.Click[index] ? hourVal.Click[index][1] : 0);  // Populate data for Clicks
      }
      else 
        newData[1].push(0);
      if (hourVal.Submit) {
        newData[2].push(hourVal.Submit[index] ? hourVal.Submit[index][1] : 0);  // Populate data for Submits
      }
      else 
        newData[2].push(0);
    });

    let hourLst = $('.hour-item-list');
    hourLst.empty();
    let maxValue = Math.max(newData[0][0], newData[1][0], newData[2][0]);
    newLabel.forEach((value, index) => {
      let newItem = `
          <div class="visit-card">
              <div class="day-label">${value} hr</div>
              <div class="visits-container">
                  <div class="w-100"><div class="progress-bar-custom progress-bar-blue" data-width="${maxValue ? (Math.round(newData[0][index] / maxValue * 100)) : 0}%"></div></div>
                  <div class="visits-info">${newData[0][index] ? newData[0][index] : 0} Visits</div>
              </div>
              <div class="visits-container">
                  <div class="w-100"><div class="progress-bar-custom progress-bar-yellow" data-width="${maxValue ? (Math.round(newData[1][index] / maxValue * 100)) : 0}%"></div></div>
                  <div class="visits-info">${newData[1][index] ? newData[1][index] : 0} Clicks</div>
              </div>
              <div class="visits-container">
                  <div class="w-100"><div class="progress-bar-custom progress-bar-gray" data-width="${maxValue ? (Math.round(newData[2][index] / maxValue * 100)) : 0}%"></div></div>
                  <div class="visits-info">${newData[2][index] ? newData[2][index] : 0} Submits</div>
              </div>
          </div>
        `;

      hourLst.append(newItem);
    });

    newLabel = [];
    newData = [[], [], []];  // Initialize array with three empty sub-arrays

    // Assuming pageVal.Visit, pageVal.Click, and pageVal.Submit are of the same length and have corresponding labels
    deviceVal.Visit.forEach((value, index) => {
      newLabel.push(value[0]);
      newData[0].push(value[1]);  // Populate data for Visits
      if (deviceVal.Click) {
        newData[1].push(deviceVal.Click[index] ? deviceVal.Click[index][1] : 0);  // Populate data for Clicks
      }
      else 
        newData[1].push(0);
      if (deviceVal.Submit) {
        newData[2].push(deviceVal.Submit[index] ? deviceVal.Submit[index][1] : 0);  // Populate data for Submits
      }
      else 
        newData[2].push(0);
    });

    let deviceLst = $('.device-item-list');
    deviceLst.empty();
    maxValue = Math.max(newData[0][0], newData[1][0], newData[2][0]);
    newLabel.forEach((value, index) => {
      let newItem = `
          <div class="visit-card">
              <div class="day-label">${value}</div>
              <div class="visits-container">
                  <div class="w-100"><div class="progress-bar-custom progress-bar-blue" data-width="${maxValue ? (Math.round(newData[0][index] / maxValue * 100)) : 0}%"></div></div>
                  <div class="visits-info">${newData[0][index] ? newData[0][index] : 0} Visits</div>
              </div>
              <div class="visits-container">
                  <div class="w-100"><div class="progress-bar-custom progress-bar-yellow" data-width="${maxValue ? (Math.round(newData[1][index] / maxValue * 100)) : 0}%"></div></div>
                  <div class="visits-info">${newData[1][index] ? newData[1][index] : 0} Clicks</div>
              </div>
              <div class="visits-container">
                  <div class="w-100"><div class="progress-bar-custom progress-bar-gray" data-width="${maxValue ? (Math.round(newData[2][index] / maxValue * 100)) : 0}%"></div></div>
                  <div class="visits-info">${newData[2][index] ? newData[2][index] : 0} Submits</div>
              </div>
          </div>
        `;

      deviceLst.append(newItem);
    });

    $('.progress-bar-custom').each(function () {
      var width = $(this).data('width');
      $(this).css('width', width);
    });
  }

  $('#rpt_startDate, #rpt_endDate').on('change', updateReportPage);

  function updateReportPage() {
    let startDate = $('#rpt_startDate').val();
    let endDate = $('#rpt_endDate').val();

    showLoading();    
    getWidgetsReportSummary(startDate, endDate, null, 'All', function(result) {
      if (result !== null) {
        writeLog('getWidgetsReportSummary', result);
        
        let chartVal = JSON.parse(result.data);
        $('#reportSummary').html(`${chartVal.reportSummary.replace(/\n/g, '<br>')}`);
        updateGroupDayChart(chartVal.groupByDay);
        updateCountriesChart(chartVal.groupByCountry);
        updateDeviceAndHourChart(chartVal.groupByDevice, chartVal.groupByHour);
        updatePageTitleChart(chartVal.groupByPageTitle);
      }
      hideLoading();
    });    
  }

  // Toggle datasets
  $("#toggleVisits").change(function () {
    reportLineChart.data.datasets[0].hidden = !this.checked;
    reportLineChart.update();
  });
  $("#toggleClicks").change(function () {
    reportLineChart.data.datasets[1].hidden = !this.checked;
    reportLineChart.update();
  });
  $("#toggleSubmits").change(function () {
    reportLineChart.data.datasets[2].hidden = !this.checked;
    reportLineChart.update();
  });

  // countries chart
  var countriesChartCtx = $('#countriesChart')[0].getContext('2d');
  var countriesChart = new Chart(countriesChartCtx, {
    type: 'doughnut',
    data: {
      labels: ['Country here', 'Country here', 'Country here'],
      datasets: [{
        data: [30, 40, 30], // Adjust data as needed
        backgroundColor: ['#ffc107', '#007bff', '#6c757d'], // Colors matching the legend
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Ensures the chart fits within the container
      cutout: '70%', // Adjust the inner cutout to make it look like a donut
      plugins: {
        legend: {
          display: false // Hide default legend
        }
      }
    }
  });

  var reportVerticalChartCtx = $('#pageTitleChart');
  var chartData = {
    labels: ['Title 1', 'Title 2', 'Title 3'],
    datasets: [
      {
        label: 'Visits',
        data: [20, 25, 30],
        backgroundColor: '#4A90E2',
        barThickness: 10,
      },
      {
        label: 'Clicks',
        data: [30, 20, 10],
        backgroundColor: '#F5A623',
        barThickness: 10,
      },
      {
        label: 'Subs',
        data: [15, 12, 8],
        backgroundColor: '#9B9B9B',
        barThickness: 10,
      }
    ]
  };
  var pageTitleChart = new Chart(reportVerticalChartCtx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false // Remove vertical lines (column lines)
          },
          ticks: {
            font: {
              size: 12 // Adjust font size for X-axis labels
            }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10,
            font: {
              size: 12 // Adjust font size for Y-axis labels
            }
          },
          grid: {
            color: '#e0e0e0' // Light gray grid lines
          }
        }
      },
      plugins: {
        legend: {
          display: false, // Hide legend (custom legend is used)
        },
      }
    }
  });

  // Toggle visibility of datasets when legend items are clicked
  $('.chart-legend span').on('click', function () {
    var datasetIndex = $(this).data('dataset');
    var meta = pageTitleChart.getDatasetMeta(datasetIndex);
    meta.hidden = !meta.hidden;
    pageTitleChart.update();
  });

  // --------------------- Start of Script for Setting -----------------------

  function updateSettingPage() {
    showLoading();

    initPlans();
  }

  // avatar change
  $('#fileInput').on('change', function () {
    let file = $(this)[0].files[0];
    if (file) {
      const reader = new FileReader();
      const $img = $(this).closest('.file-container').find('img');

      reader.onload = function (e) {
        $img.attr("src", e.target.result);
        $('.header .profile img').attr('src', e.target.result);
      };

      reader.readAsDataURL(file);
    }
  });

  $('#settingsContent .button-item').click(function () {
    // Example action on click, you can replace with your own function
    if ($(this).attr('id') === 'personalInfoButton') {
      showPersonalModal();
    } else if ($(this).attr('id') === 'helpSupportButton') {
      showFaqModal();
    }
  });
  // Toggle answer visibility on question click
  $('.help-question-modal .modal-question-item').on('click', function () {
    $(this).next('.modal-question-answer').slideToggle();
    $(this).find('.arrow-icon').toggleClass('fa-chevron-down fa-chevron-up');
  });

  // Search functionality
  $('.help-question-modal #searchInput').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('.help-question-modal #faqContainer .modal-question-item').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $('#butAskUs').on('click', function () {
    $(this).closest('.modal').modal('hide');
    showAskQuestionModal();
  });
  $('#butSendQuestion').on('click', function () {
    $(this).closest('.modal').modal('hide');
    showSubmissionModal('Question Received', 'We will get in touch via mail with answers for your queries');
  });
  $('.package-btn').on('click', function () {
    $(this).closest('.modal').modal('hide');
    showPayPackageModal($(this).data('type'), 100);
  });
  $('#payPackage').on('click', function () {
    $(this).closest('.modal').modal('hide');
    showAddNewCardModal();
  });
  $('#ancSave').on('click', function () {
    $(this).closest('.modal').modal('hide');
    showSubmissionModal('Payment Success', 'We received the payment and the package is activated for your account');
  });

  //------------------- End of Script for Tab navigation bar -----------------------------

  /////////////////////////////////// Dashboard ////////////////////////////////////////
  $('#addNewWidget').on('click', function () {
    $('.add-widget-section').show();
    $('.dashboard-section').hide();
  });
  $('#backDashboard').on('click', function () {
    $('.add-widget-section').hide();
    $('.dashboard-section').show();
  });
  $('#sub_backToDashboard').on('click', function () {
    $('.submission-table-section').hide();
    $('.dashboard-section').show();
  });

  $('.add-widget-section .widget-btn').on('click', function () {
    $(`.sidebar .nav-link[data-type="widgets"]`).click();
    updateWidgetScreen($(this).data('type'));
  });

  $('#widgetMainSection .widget-btn').on('click', function() {
    updateWidgetScreen($(this).data('type'));
  });

  function showWidgetTableList(id) {
    $('.dashboard-section').hide();
    $('.submission-table-section').show();

    let list = getVisitorsSubmissionsList(id, null, null, 'dateCreated', false);
    writeLog('submission data', list);
    
    submissionWgtTable.clear();
    list.forEach(item => {
      submissionWgtTable.row.add([item[0], formatDate(item[1]), item[2], item[3], item[5], item[6]]);
    });
    submissionWgtTable.draw();
  }

  // var dashboardLineChartCtx;
  // var dashboardLineChart;
  function updateDashboardLineChart() {
    getWidgetsReport('DayOfMonth', null, null, null, 'All', null, function(result) {
      if (result !== null) {
        writeLog('getMyWidgetsReport', result);

        let chartVal = JSON.parse(result.data);
        if (!chartVal.demoStats) {
          $('.demo-message').hide();
        }
        else {
          $('.demo-message').show();
        }
    
        let newLabel = [];
        let newData = [[], [], []];  // Initialize array with three empty sub-arrays
    
        chartVal.Visit.forEach((value, index) => {
          newLabel.push(value[0] + ' d');  // Replace 'aa' with the actual label if available
          newData[0].push(value[1]);  // Populate data for Visits
          if (chartVal.Click) {
            newData[1].push(chartVal.Click[index] ? chartVal.Click[index][1] : 0);  // Populate data for Clicks
          }
          if (chartVal.Submit) {
            newData[2].push(chartVal.Submit[index] ? chartVal.Submit[index][1] : 0);  // Populate data for Submits
          }
        });
    
        // Update chart labels
        dashboardLineChart.data.labels = newLabel;
        newData.forEach((data, index) => {
          dashboardLineChart.data.datasets[index].data = data;
        });
    
        // Update the chart
        dashboardLineChart.update();
      }
    });
  }

  // Toggle datasets
  $("#toggleDashVisits").change(function () {
    dashboardLineChart.data.datasets[0].hidden = !this.checked;
    dashboardLineChart.update();
  });
  $("#toggleDashClicks").change(function () {
    dashboardLineChart.data.datasets[1].hidden = !this.checked;
    dashboardLineChart.update();
  });
  $("#toggleDashSubmits").change(function () {
    dashboardLineChart.data.datasets[2].hidden = !this.checked;
    dashboardLineChart.update();
  });

  $('#hd_writeReview').on('click', function() {    
    callWixReview();
  });

  $('#hd_integrationCode').on('click', function() {
    let dialog = $("#codeIntegrationDialog");
    if (dialog.hasClass('d-none')) {
      dialog.find('.copy-btn').html('<i class="fa-solid fa-clone"></i> Copy');
    }

    if (mainUserDetails["embedScriptUrl"]) {
      $('#codeIntegrationDialog input').val(mainUserDetails["embedScriptUrl"]);
    }
    else {
      $('#codeIntegrationDialog input').val("<script id='script-getleads' src='https://link_to_code_here' async='true'></script>");
    }
    dialog.toggleClass('d-none');
  });
  $("#codeIntegrationDialog").on('click', '.close-btn', function() {
    $("#codeIntegrationDialog .code-integration-header").fadeOut(200);
  });

  $("#codeIntegrationDialog").on('click', '.copy-btn', function() {
    var codeToCopy = $('#codeIntegrationDialog input').val();
    navigator.clipboard.writeText(codeToCopy).then(function() {
      $('#codeIntegrationDialog .copy-btn').html('<i class="fa-solid fa-check"></i> Copied');

      setTimeout(function() {
        $('#codeIntegrationDialog .copy-btn').html('<i class="fa-solid fa-clone"></i> Copy');
      }, 3000); // Reset after 3 seconds
    }).catch(function(err) {
      console.error('Error copying to clipboard: ', err);
    });
  });

  // Show the tooltip on hover
  $(".circle-counter, .tooltip-content").hover(
    function () {
      $(this).siblings(".tooltip-content").fadeIn(200);
    },
    function () {
      // Hide the tooltip when the mouse leaves both the circle and the tooltip area
      if (!$(this).is(":hover")) {
        $(this).siblings(".tooltip-content").fadeOut(200);
      }
    }
  );

  // Ensure that the tooltip remains visible when hovering over the tooltip itself
  $(".tooltip-content").hover(
    function () {
      $(this).stop(true, true).fadeIn(200); // Prevents the tooltip from fading out if the user moves the mouse quickly
    },
    function () {
      $(this).fadeOut(200); // Fades out the tooltip when mouse leaves the tooltip area
    }
  );
  
  function setProgress(count, total) {
    const percentage = (count / total) * 100;

    // Update the background gradient to represent progress starting from the top (0 degrees)
    $(".circle-counter").css(
      "background",
      `conic-gradient(#FFC107 0% ${percentage}%, #eaeaea ${percentage}% 100%)`
    );

    // Update the text inside the circle
    $("#counter-count").text(`${count}`);
    $("#counter-total").text(`/${total}`);
  }

  function updateDashboard() {
    showLoading();

    updateDashboardLineChart();

    getWidgetsList(function(widgetList) {
      if (widgetList !== null) {
        let widgetElement = $('.widget-list');
        widgetElement.empty();
    
        let active = 0, visits = 0, clicks = 0, submissions = 0;
        widgetList.forEach(widget => {
          if (widget[5]) {
            active++;
          }
          visits += widget[6];
          clicks += widget[7];
          submissions += widget[8];
    
          let newElement = `
              <div class="widget-row mb-3 p-3" data-id='${widget[0]}' data-name='${widget[1]}' data-type='${widget[2].toLowerCase().replace(' ', '_')}'>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="assets/getleads-img/Widgets/${widget[2].replace(' ', '')}.png" width="24px" height="24px" alt="${widget[2]} Icon">                                            
                        <div class="mx-3 d-flex align-items-center">
                            <h5 class="mb-0">${widget[1]}</h5>
                            <div class="tooltip-container">
                              <i class="fas fa-pencil-alt mx-3 update-widget-name"></i>
                              <div class="tooltip-content">
                                  Update Widget Name
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="d-flex align-items-center icon-group">
                            <span class="mx-3 update-widget" data-bs-toggle="tooltip" data-bs-placement="top" title="Modify Widget" style="cursor:pointer;">Update</span>
                            <div class="border-right"></div>
                            <span class="mx-3 update-widget" data-bs-toggle="tooltip" data-bs-placement="top" title="Insights and statistics. Thanks to these statistics, you will be able to better learn about the effectiveness of your widgets."><i class="fas fa-chart-bar widget-table-list"></i></span>
                            <div class="border-right"></div>
                            <span class="mx-3 update-widget" data-bs-toggle="tooltip" data-bs-placement="top" title="Toggle Widget"><i class="fas fa-eye toggle-widget-status"></i></span>
                            <div class="border-right"></div>
                            <span class="mx-3 delete-widget" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Widget"><i class="fas fa-trash-alt text-danger delete-widget"></i></span>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3 pt-3 stats-row">
                    <div class="stat-item">
                        <span>Views:</span>
                        <strong>${widget[6] ? widget[6].toLocaleString() : '0'}</strong>
                    </div>
                    <div class="stat-item">
                        <span>Clicks:</span>
                        <strong>${widget[7] ? widget[7].toLocaleString() : '0'}</strong>
                    </div>
                    <div class="stat-item">
                        <span>Created On:</span>
                        <strong>${formatDate(widget[3])}</strong>
                    </div>
                    <div class="stat-item">
                        <span>Status:</span>
                        <strong>${widget[5] ? 'Active' : 'Inactive'}</strong>
                    </div>
                </div>
            </div>
            `;
    
          widgetElement.append(newElement);
        });

        $('[data-bs-toggle="tooltip"]').tooltip();
    
        setProgress(active, widgetList.length);

        $('.dash-stats-section .stat-card-red h1').text(active.toLocaleString());
        $('.dash-stats-section .stat-card-yellow h1').text(visits.toLocaleString());
        $('.dash-stats-section .stat-card-green h1').text(clicks.toLocaleString());
        $('.dash-stats-section .stat-card-purple h1').text(submissions.toLocaleString());
      }
      hideLoading();
    });
  }

  function showWidgetModal(id, oldName) {
    $('#wgt_oldName').val(oldName);
    $('#wgt_newName').val('');
    $('#wgt_updateBtn').data('wgtId', id);
    $('#updateWidgetModal').modal('show');
  }

  $('#wgt_updateBtn').on('click', function () {
    let id = $(this).data('wgtId');
    let newName = $('#wgt_newName').val();
    $('#updateWidgetModal').modal('hide');
    updateWidgetName(id, newName);
    setTimeout(function () { updateDashboard(); }, 500);
  });
  $('.widget-list').on('click', '.update-widget-name', function () {
    let id = $(this).closest('.widget-row').data('id');
    let name = $(this).closest('.widget-row').data('name');
    showWidgetModal(id, name);
  });
  $('.widget-list').on('click', '.toggle-widget-status', function () {
    let id = $(this).closest('.widget-row').data('id');
    toggleWidgetStatus(id, false);
    setTimeout(function () { updateDashboard(); }, 500);
  });
  $('.widget-list').on('click', '.delete-widget', function () {
    if (confirm("Are you sure you want to delete this widget?")) {
      let id = $(this).closest('.widget-row').data('id');
      deleteWidget(id);
      setTimeout(function () { updateDashboard(); }, 500);
    }
  });
  $('.widget-list').on('click', '.update-widget', function () {
    let id = $(this).closest('.widget-row').data('id');
    let type = $(this).closest('.widget-row').data('type');
    $(`.sidebar .nav-link[data-type="widgets"]`).click();
    updateWidgetScreen(type);
  });
  $('.widget-list').on('click', '.widget-table-list', function () {
    let id = $(this).closest('.widget-row').data('id');
    showWidgetTableList(id);
  });
  
  //------------------ End of Script for Dashboard -------------------------------

  //------------------- Start of  for Popup -----------------------------
  function setPopupInitialValue() {
    getLastWidgetValue('Popup', function(widgetValue) {
      writeLog('Popup Value', widgetValue);
      if (!$.isEmptyObject(widgetValue)) {
        setFormValue(widgetValue, 'popupForm');
        $('#pu_coverImage').attr('src', widgetValue['pu_coverImageVal']);
      }
      updatePopupModal();
    });
  }

  function updatePopupModal() {
    const pu_title = $("#pu_title").val();
    const pu_buttonText = $("#pu_buttonText").val();
    const pu_text = $("#pu_text").val();
    const pu_showImage = $("#pu_showImage").val();
    const pu_position = $("#pu_position").val();
    const pu_showCloseButton = $("#pu_showCloseButton").val();
    const pu_bgColor = $("#pu_bgColor").val();
    const pu_buttonColor = $("#pu_buttonColor").val();
    const pu_textColor = $("#pu_textColor").val();
    const pu_buttonTextColor = $("#pu_buttonTextColor").val();

    const modal = $(".pu-widget .pop-modal");

    let modalWidth = "700px";
    if (pu_showImage === "no" || pu_position === "top" || pu_position === "top-cover") {
      modalWidth = "400px";
    }

    modal.css({
      width: modalWidth,
      "background-color": pu_bgColor,
    });

    $("#pu_modalHeader").text(pu_title).css("color", pu_textColor);
    $("#pu_modalText").text(pu_text).css("color", pu_textColor);
    $("#pu_modalButton")
      .text(pu_buttonText)
      .css({
        color: pu_buttonTextColor,
        "background-color": pu_buttonColor,
      })
      .off("click")
      .on("click", function () {
        // if (actionType === "new_tab") {
        //   window.open(buttonLink, "_blank");
        // } else if (actionType === "same_tab") {
        //   window.location.href = buttonLink;
        // } else {
        //   hideModal();
        // }
      });

    // if (imageLink) {
    //   $("#pu_modalImageLink").attr("href", imageLink).attr("target", "_blank");
    //   $(".modal img").css("cursor", "pointer");
    // } else {
    $("#pu_modalImageLink").removeAttr("href").removeAttr("target");
    modal.find("img").css("cursor", "default");
    // }

    setTimeout(function () { $("#pu_modalImage").attr("src", $('#pu_coverImage').attr('src')); }, 200);

    if (pu_showImage === 'yes') {
      $("#pu_modalImageLink").show();
    }
    else {
      $("#pu_modalImageLink").hide();
    }

    if (pu_showCloseButton === 'yes') {
      $("#pu_modalCloseButton").show();
    } else {
      $("#pu_modalCloseButton").hide();
    }

    modal.find("i").hide();
    modal.removeClass("top-cover top left-cover right-cover");
    modal.addClass(pu_position);

    showModal();
  }

  $('#popupForm input, #popupForm select, #popupForm textarea').change(updatePopupModal);

  $("#pu_publish").click(function () {
    var formData = $("#popupForm").serializeArray();
    let retVal = createUpdateWidget("Popup", formData, true, false);
    if (retVal['status'] === null) {
      showSubmissionModal('Success', `Your popup has been published successfully and you can track it's statistics from monitoring screen`, true);
    }
    else {
      showWarningModal(retVal['status']);
    }
  });

  $("#pu_saveDraft").click(function () {
    var formData = $("#popupForm").serializeArray();
    let id = createUpdateWidget("Popup", formData, false, false);
    // alert(`Save draft operation succeed! (id:${id})`);
  });
  //-------------------- End of Script for Popup ------------------------------

  //------------------- Start of Script for Popup Form -----------------------------
  function setPopupFormInitialValue() {
    getLastWidgetValue('Popup Form', function(widgetValue, obj) {
      console.log('PopupForm Value -----> ', obj, widgetValue);
      addPoweredBy = obj['addPoweredBy'];

      if (!$.isEmptyObject(widgetValue)) {
        var fieldCount = 0;
        $.each(widgetValue, function (key, value) {
          if (key.startsWith('pufPlaceholder_')) {
            fieldCount++;
          }
        });
  
        $('#puf_itemList').empty();
        for (let i = 1; i <= fieldCount; i++) {
          pufAddItemClicked();
        }
        setFormValue(widgetValue, 'popupformForm');
        $('#puf_coverImage').attr('src', widgetValue['puf_coverImageVal']);
      }
      updatePopupFormModal();
    });
  }

  function updatePopupFormModal() {
    const puf_title = $('#puf_title').val();
    const puf_buttonText = $('#puf_buttonText').val();
    const puf_subTitle = $('#puf_subtitle').val();
    const puf_successMessage = $('#puf_successMessage').val();
    const puf_showImage = $('#puf_showImage').val();
    // const puf_uploadFile = $('#puf_uploadFile')[0].files[0];
    const puf_showCloseButton = $('#puf_showCloseButton').val();
    const puf_bgColor = $('#puf_bgColor').val();
    const puf_buttonColor = $('#puf_buttonColor').val();
    const puf_textColor = $('#puf_textColor').val();
    const puf_buttonTextColor = $('#puf_buttonTextColor').val();
    const puf_appearAnimation = ($('#puf_appearAnimation').val() === 'yes');

    if (puf_appearAnimation)
      $(".pop-overlay, .pop-modal").removeClass("show");
    else
      $(".pop-overlay, .pop-modal").addClass("show");
    
    let modalWidth = '60%';
    if (puf_showImage === 'no')
      modalWidth = '45%';
    let position = "left-cover";
    let modal = $('.puf-widget .pop-modal');
    modal.css({
      'width': modalWidth,
      'background-color': puf_bgColor
    });

    if (!addPoweredBy) 
      $('.powered-msg').hide();

    $('.puf-form').show();
    $('.puf-success').hide();

    $('.puf-text-color').css('color', puf_textColor);
    $('.puf-modal-header').text(puf_title);
    $('#puf_modalText').html(puf_subTitle);
    $('.puf-success-msg').html(puf_successMessage);
    $('#puf_modalButton').text(puf_buttonText).css({
      'color': puf_buttonTextColor,
      'background-color': puf_buttonColor
    }).off('click').on('click', function () {
      $('.puf-form').hide();
      $('.puf-success').show();
    });

    setTimeout(function () { $("#puf_modalImageLink img").attr("src", $('#puf_coverImage').attr('src')); }, 200);

    if (puf_showImage === 'yes') {
      $("#puf_modalImageLink").show();
      $('.puf-form-panel').removeClass('col-12 col-8').addClass('col-8');
    }
    else {
      $("#puf_modalImageLink").hide();
      $('.puf-form-panel').removeClass('col-12 col-8').addClass('col-12');
    }

    modal.removeClass('top-cover top left-cover right-cover');
    modal.addClass(position);

    // Insert input text elements into #modalInputList
    const sectionsData = getPufSectionValues();
    const modalInputList = $('#puf_modalInputList');
    modalInputList.empty(); // Clear previous inputs

    sectionsData.forEach((section, index) => {
      const inputElement = $(`
                    <div class="col-md-12">
                        <div class="form-floating-label">
                            <input type="text" class="form-control" placeholder="${section.placeholder + (section.mandatory ? '*' : '')}" id="puf_modalInput_${index + 1}" name="${section.name}" ${section.mandatory ? 'required' : ''}>
                        </div>
                    </div>
                `);
      modalInputList.append(inputElement);
    });

    let dismissP = 0.1;
    if (dismissP > 0) {
      setTimeout(function () {
        $(".pop-overlay, .pop-modal").show();
        $(".pop-overlay, .pop-modal").addClass("show");
      }, dismissP * 1000); // Convert seconds to milliseconds
    }
  }

  $("#widget_section").on("click", "#puf_modalCloseButton", hideModal);

  $('#popupformForm input, #popupformForm select, #popupformForm textarea').change(updatePopupFormModal);

  function refreshPufContactNumbers() {
    $('#puf_itemList').find('.puf-panel').each(function (index) {
      let sectionNumber = index + 1;
      $(this).find('.contact-no').html(`#${sectionNumber}`);
      $(this).find('input, label').each(function () {
        let id = $(this).attr('id') || '';
        if (id) {
          let newId = id.split('_')[0] + '_' + sectionNumber;
          $(this).attr('id', newId);
          if ($(this).is('label')) {
            $(this).attr('for', newId);
          }
          if ($(this).is('input')) {
            $(this).attr('name', newId);
          }
        }
      });
    });
    updatePopupFormModal();
  }

  function getPufSectionValues() {
    let sectionsData = [];
    $('#puf_itemList').find('.puf-panel').each(function () {
      let section = $(this);
      let placeholder = section.find('input[id^="pufPlaceholder_"]').val();
      let name = section.find('input[id^="pufName_"]').val();
      let mandatory = section.find('input[id^="pufMandatory_"]').is(':checked');
      sectionsData.push({ placeholder, name, mandatory });
    });
    return sectionsData;
  }

  function pufAddItemClicked() {
    let sectionCount = $('#puf_itemList').find('.puf-panel').length + 1;

    let newSection = $(`
        <div class="col-md-6 puf-panel">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="py-1 px-2 rounded-2 contact-no" style="background-color: #dcdcdc;">#${sectionCount}</div>
                <div class="justify-content-end">
                    <button type="button" class="btn btn-icon p-0 delete-panel">
                        <i class="far fa-trash-alt" style="color: red;"></i>
                    </button>
                </div>
            </div>    
            <div class="form-floating-label">
                <input type="text" class="form-control" id="pufPlaceholder_${sectionCount}" name="pufPlaceholder_${sectionCount}" placeholder="">
                <label for="pufPlaceholder_${sectionCount}">Placeholder</label>
            </div>    
            <div class="form-floating-label">
                <input type="text" class="form-control" id="pufName_${sectionCount}" name="pufName_${sectionCount}" placeholder="">
                <label for="pufName_${sectionCount}">Name</label>
            </div>
            <div class="form-check form-switch mt-2">
                <input class="form-check-input bg-info" type="checkbox" id="pufMandatory_${sectionCount}" name="pufMandatory_${sectionCount}">
                <label class="form-check-label" for="pufMandatory_${sectionCount}">Mandatory</label>
            </div>
        </div>
    `);

    $('#puf_itemList').append(newSection);

    newSection.change(updatePopupFormModal);

    updatePopupFormModal();
  }
  $('#puf_addItem').on('click', pufAddItemClicked);

  $('#puf_itemList').on('click', '.delete-panel', function () {
    $(this).closest('.puf-panel').remove();
    refreshPufContactNumbers();
  });

  $("#puf_publish").click(function () {
    var formData = $("#popupformForm").serializeArray();
    let retVal = createUpdateWidget("Popup Form", formData, true, true);
    if (retVal['status'] === null) {
      showSubmissionModal('Success', `Your popup form has been published successfully and you can track it's statistics from monitoring screen`, true);
    }
    else {
      showWarningModal(retVal['status']);
    }
  });

  $("#puf_saveDraft").click(function () {
    var formData = $("#popupformForm").serializeArray();
    let id = createUpdateWidget("Popup Form", formData, false, true);
    // alert(`Save draft operation succeed! (id:${id})`);
  });
  //------------------ End of Script for Popup Form -------------------------------

  //------------------- Start of Script for FAQ -----------------------------
  function setFaqInitialValue() {
    getLastWidgetValue('FAQ', function(widgetValue, obj) {
      writeLog('FAQ Value', widgetValue);
      addPoweredBy = obj['addPoweredBy'];

      if (!$.isEmptyObject(widgetValue)) {
        var fieldCount = 0;
        $.each(widgetValue, function (key, value) {
          if (key.startsWith('faqQuestion')) {
            fieldCount++;
          }
        });
        $('#faq_questionList').empty();
        for (let i = 1; i <= fieldCount; i++) {
          faqAddItemClicked();
        }
        setFormValue(widgetValue, 'faqForm');
        setFaqButtonStyle(widgetValue['faq_buttonStyle']);
      }
  
      $('.faq-modal').hide();
  
      updateFaqButton();
    });
  }

  function updateFaqModal() {
    const showHeader = $('#faq_showHeader').is(':checked');
    const headerTitle = $('#faq_headerText').val();
    const headerSubtitle = $('#faq_headerSubtitle').val();
    const headerBackgroundColor = $('#faq_headerBgColor').val();
    const headerTextColor = $('#faq_headerTextColor').val();

    const questionsTextColor = $('#faq_questionTextColor').val();
    const answersTextColor = $('#faq_answerTextColor').val();
    const questionLinkColor = $('#faq_questionLinkColor').val();

    const showFooter = $('#faq_showFooter').is(':checked');
    const footerText = $('#faq_footerText').val();
    const footerBackgroundColor = $('#faq_footerBgColor').val();
    const footerTextColor = $('#faq_footerTextColor').val();
    const linkColor = $('#faq_footerLinkColor').val();

    if (showHeader) {
      $('#faqModal .modal-header').css({
        'color': headerTextColor,
        'background-color': headerBackgroundColor
      });
      $('#faqModal .modal-header h5').text(headerTitle);
      $('#faqModal .modal-header h6').text(headerSubtitle);

      $('#faqModal .modal-header').show();
    }
    else {
      $('#faqModal .modal-header').hide();
    }

    if (showFooter) {
      $('#faqModal .modal-footer').css({
        'color': footerTextColor,
        'background-color': footerBackgroundColor
      });
      $('#faqModal .modal-footer a').css('color', linkColor);
      $('#faqModal .modal-footer').text(footerText);

      $('#faqModal .modal-footer').show();
    }
    else {
      $('#faqModal .modal-footer').hide();
    }

    // Insert input text elements into #modalInputList
    const sectionsData = getFaqSectionValues();
    const modalList = $('#faqModal .modal-body');
    modalList.empty(); // Clear previous inputs

    sectionsData.forEach((section, index) => {
      const inputElement = $(`
            <div class="question-item">
                <div class="question-title">${section.question}</div>
                <span class="icon">+</span>
            </div>
            <div class="answer">
                <p class="mb-0">${section.answer}</p>
                <a href="${section.link}" target="_blank">${section.link}</a>
            </div>
        `);
      modalList.append(inputElement);
    });

    $('#faqModal .modal-body .question-item').css('color', questionsTextColor);
    $('#faqModal .modal-body .answer p').css('color', answersTextColor);
    $('#faqModal .modal-body .answer a').css('color', questionLinkColor);
  }

  function updateFaqButton() {
    let position = ($('#sitePreviewDiv').data('value') === 'preview-mobile') ? $('#faq_mobilePosition').val() : $('#faq_desktopPosition').val();
    let verticalMargin = $('#faq_verticalMargin').val() ? $('#faq_verticalMargin').val() : 0;
    let horizontalMargin = $('#faq_horizontalMargin').val() ? $('#faq_horizontalMargin').val() : 0;
    updateFaqPosition(position, verticalMargin, horizontalMargin);

    let appearAnimation = ($('#faq_appearAnimation').val() === 'yes');
    if (appearAnimation)
      $("#faq_questionButton").removeClass("show");
    else
      $("#faq_questionButton").addClass("show");
    
    let buttonType = getFaqButtonStyle();
    let buttonText = $('#faq_buttonText').val();
    let bgColor = $('#faq_buttonBgColor').val();
    let textColor = $('#faq_buttonTextColor').val();

    var btnElement = $('#faq_questionButton');
    var btnText = $('.fixed-button-text');
    btnElement.css({ 'background-color': bgColor, 'color': textColor });
    btnText.text(buttonText);
    if (buttonType === 'round-with-text' || buttonType === 'square-with-text') {
      btnElement.css({ 'background-color': bgColor, 'color': textColor, 'border': 'none' });
    }
    else {
      btnElement.css({ 'background-color': '', 'color': textColor, 'border': `3px solid ${bgColor}` });
    }

    btnElement.removeClass('round-with-text square-with-text outline-round outline-square').addClass(buttonType);

    if (!addPoweredBy) 
      $('.powered-msg').hide();

    if ($('#faq_shakeButton').val() === 'yes') {
      $(".faq-widget .fixed-button i").addClass("shake");
    }
    else {
      $(".faq-widget .fixed-button i").removeClass("shake");
    }

    if ($('#faq_wavesAnimation').val() === 'yes') {
      $(".faq-widget .fixed-button .wave-effect").removeClass('round-with-text square-with-text outline-round outline-square').addClass(buttonType);
      $(".faq-widget .fixed-button .wave-effect").css({ 'background-color': bgColor, 'opacity': 0.5 })
      $(".faq-widget .fixed-button .wave-effect").show();
    } else {
      $(".faq-widget .fixed-button .wave-effect").hide();
    }

    if ($('#faq_smallerButton').val() === 'yes') {
      $(".faq-widget .fixed-body").addClass("small-button");
    }
    else {
      $(".faq-widget .fixed-body").removeClass("small-button");
    }

    let dismissP = 0.1;
    if (dismissP > 0) {
      setTimeout(function () {
        $("#faq_questionButton").addClass("show");
      }, dismissP * 1000); // Convert seconds to milliseconds
    }

    updateFaqModal();
  }

  $("#widget_section").on("click", "#faq_questionButton", function () {
    updateFaqModal();
    $('.faq-modal').toggle();
  });

  $('.faq-button-style-section .option-card').on('click', function () {
    $('#faq_buttonStyle').val($(this).attr('value'));

    $('.faq-button-style-section .option-card').removeClass('active');
    $(this).addClass('active');

    updateFaqButton();
  });
  function getFaqButtonStyle() {
    return $('.faq-button-style-section .option-card.active').attr('value');
  }
  function setFaqButtonStyle(newVal) {
    $('.faq-button-style-section .option-card').each(function () {
      if ($(this).attr('value') === newVal) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  function refreshFaqContactNumbers() {
    $('#faq_questionList').find('.faq-panel').each(function (index) {
      let sectionNumber = index + 1;
      $(this).find('.contact-no').text(`#${sectionNumber}`);
      $(this).find('input, label').each(function () {
        let id = $(this).attr('id') || '';
        if (id) {
          let newId = id.split('_')[0] + '_' + sectionNumber;
          $(this).attr('id', newId);
          if ($(this).is('label')) {
            $(this).attr('for', newId);
          }
          if ($(this).is('input')) {
            $(this).attr('name', newId);
          }
        }
      });
    });
    updateFaqModal();
  }

  function getFaqSectionValues() {
    let sectionsData = [];
    $('#faq_questionList').find('.faq-panel').each(function () {
      let section = $(this);
      let question = section.find('input[id^="faqQuestion_"]').val();
      let link = section.find('input[id^="faqLink_"]').val();
      let answer = section.find('textarea[id^="faqAnswer_"]').val();
      sectionsData.push({ question, answer, link });
    });
    return sectionsData;
  }

  function faqAddItemClicked() {
    let sectionCount = $('#faq_questionList').find('.faq-panel').length + 1;

    let newSection = $(`
          <div class="col-md-6 faq-panel">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="py-1 px-2 rounded-2 contact-no" style="background-color: #dcdcdc;">#${sectionCount}</div>
                <div class="justify-content-end">
                    <button type="button" class="btn p-0 panel-close">
                        <i class="far fa-trash-alt" style="color: red;"></i>
                    </button>
                </div>
            </div>

            <div class="form-floating-label">
                <input type="text" class="form-control" id="faqQuestion_${sectionCount}" name="faqQuestion_${sectionCount}">
                <label for="faqQuestion_${sectionCount}">Questions</label>
            </div>

            <div class="form-floating-label">
                <input type="text" class="form-control" id="faqLink_${sectionCount}" name="faqLink_${sectionCount}">
                <label for="faqLink_${sectionCount}">Link</label>
            </div>

            <div class="form-floating-label">
                <textarea type="textarea" class="form-control" id="faqAnswer_${sectionCount}" name="faqAnswer_${sectionCount}" placeholder=""></textarea>
                <label for="faqAnswer_${sectionCount}">Answer</label>
            </div>
        </div>
    `);

    $('#faq_questionList').append(newSection);

    newSection.find('input').change(updateFaqModal);

    updateFaqModal();
  }

  $('#faqForm').on('change', 'input, select, textarea', updateFaqButton);

  $('#faq_addItem').on('click', faqAddItemClicked);

  $('#faq_questionList').on('click', '.panel-close', function () {
    $(this).closest('.faq-panel').remove();
    refreshFaqContactNumbers();
  });

  $("#faq_publish").click(function () {
    var formData = $("#faqForm").serializeArray();
    let retVal = createUpdateWidget("FAQ", formData, true, false);
    if (retVal['status'] === null) {
      showSubmissionModal('Success', `Your faq has been published successfully and you can track it's statistics from monitoring screen`, true);
    }
    else {
      showWarningModal(retVal['status']);
    }
  });

  $("#faq_saveDraft").click(function () {
    var formData = $("#faqForm").serializeArray();
    let id = createUpdateWidget("FAQ", formData, false, false);
    // alert(`Save draft operation succeed! (id:${id})`);
  });
  //------------------ End of Script for FAQ -------------------------------

  //------------------ Start of Script for Story --------------------------
  function setStoryInitialValue() {
    getLastWidgetValue('Story', function(widgetValue) {
      writeLog('Story Value', widgetValue);

      if (!$.isEmptyObject(widgetValue)) {
        var storyCount = 0;
        $.each(widgetValue, function (key, value) {
          if (key.startsWith(`stDuration_`)) {
            storyCount++;
          }
        });
        $('#storyList').empty();
        for (let j = 1; j <= storyCount; j++) {
          addStoryItem(storyList);
          $('#stCoverImage_' + j).attr('src', widgetValue['stCoverImageVal_' + j]);
        }
        $('#st_coverImage').attr('src', widgetValue['st_coverImageVal']);
  
        setFormValue(widgetValue, 'storyForm');
        setStoryAnimation(widgetValue['st_animation']);
        setStoryDesktopLayout(widgetValue['st_desktopLayout']);
        setStoryImageSetting(widgetValue['st_imageSetting']);
  
        $(`#st_bgColor`).trigger('input');
        $(`#st_titleColor`).trigger('input');
      }
      updateStoryTheme();
    });
  }

  function showStoryModal() {
    let storyList = getStoryValues();
    let bgColor = $('#st_bgColor').val();
    let titleColor = $('#st_titleColor').val();
    let imageSetting = getStoryImageSetting();

    $('.carousel').empty();
    storyList.forEach((story, index) => {
      let button = '';
      let content = '';
      if (imageSetting === 'images-text-button') {
        button = `<a href="${story.link}" class="btn btn-story-modal">${story.buttonText}</a>
                  `;
      }
      if (imageSetting !== 'images-only') {
        content = `
                  <div class="carousel-content margin-top-10">
                      <span class="story-content">${story.storyText}</span>
                  </div>
                  `;
      }
      const inputElement = $(`
                  <div class="carousel-slide" data-duration="${story.duration * 1000}">
                      <img src="https://via.placeholder.com/400x600" alt="Slide">
                      ${content};
                      ${button}
                  </div>
              `);
      $('.carousel').append(inputElement);
      inputElement.find('.story').css({ 'color': titleColor });
      // inputElement.find('.button').css({ 'background-color': bgColor, 'color': titleColor });
      inputElement.find('img').attr('src', story.storyImage);
    });

    $('.carousel .carousel-slide').first().addClass('active');
    $('.carousel-object').removeClass('hidden');

    showSlide(0);
  }

  $('#widget_section').on('click', '.story-container img', function () {
    // let storyNo = $(this).closest('.story-div').attr('story');
    showStoryModal();
  });

  function addStoryItem() {
    let storyList = $('#storyList');
    let sectionCount = storyList.find('.story-item').length + 1;

    let newSection = $(`
            <div class="col-6 story-item">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="py-1 px-2 rounded-2 contact-no" style="background-color: #dcdcdc;">#${sectionCount}</div>
                    <div class="justify-content-end">
                        <button type="button" class="btn btn-sm btn-icon ml-2 close-panel">
                            <i class="far fa-trash-alt" style="color: #EF6F81;"></i>
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-floating-label">
                            <input type="number" class="form-control" id="stDuration_${sectionCount}" name="stDuration_${sectionCount}" min="1" value="3">
                            <label for="stDuration_${sectionCount}">Duration</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-floating-label">
                            <input type="text" class="form-control" id="stTitle_${sectionCount}" name="stTitle_${sectionCount}">
                            <label for="stTitle_${sectionCount}">Title</label>
                        </div>
                    </div>
                    <div class="mb-2">Image</div>
                    <div class="group-details-section row px-0" style="margin-left:0px; margin-bottom: 10px;">
                      <div class="col-6">
                          <img id="stCoverImage_${sectionCount}" src="https://via.placeholder.com/400x300" class="story-news-img">
                          <input type="hidden" class="cover-image-val" name="stCoverImageVal_${sectionCount}" id="stCoverImageVal_${sectionCount}"></input>
                      </div>
                      <div class="col-6">
                          <div class="file-container">
                              <label for="stUploadStoryImg_${sectionCount}" class="custom-file-upload px-2 py-2"><i class="fas fa-upload"></i>Upload</label>
                              <input type="file" class="form-control image-upload" id="stUploadStoryImg_${sectionCount}">
                          </div>
                          <div class="form-floating-label">
                              <input type="button" class="w-100 px-2 py-2 explore-gallery" id="stExploreGallery_${sectionCount}" value="Explore Gallery">
                          </div>
                      </div>
                    </div>
                    
                    <div class="col-6">
                        <div class="form-floating-label">
                            <textarea type="textarea" class="form-control" id="stStoryText_${sectionCount}" name="stStoryText_${sectionCount}"></textarea>
                            <label for="stStoryText_${sectionCount}">Text</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-floating-label">
                            <input type="text" class="form-control" id="stButtonText_${sectionCount}" placeholder="Splash Target"
                                name="stButtonText_${sectionCount}">
                            <label for="stButtonText_${sectionCount}">Button Text</label>
                        </div>
                        <div class="form-floating-label">
                            <input type="text" class="form-control" id="stLink_${sectionCount}" placeholder="Splash Target"
                                name="stLink_${sectionCount}">
                            <label for="stLink_${sectionCount}">Link</label>
                        </div>
                    </div>
                </div>
            </div>
    `);

    storyList.append(newSection);

    updateFixedBar();
  }

  // Story List 
  $('#st_addItem').on('click', addStoryItem);

  $('#storyList').on('click', '.close-panel', function () {
    $(this).closest('.story-item').remove();
    refreshStoryList();
    updateFixedBar();
  });

  function refreshStoryList() {
    $('#storyList').find('.story-item').each(function (index) {
      let storyNumber = index + 1;
      $(this).find('.contact-no').text(`#${storyNumber}`);
      $(this).find('input, label').each(function () {
        let id = $(this).attr('id') || '';
        if (id) {
          let newId = id.split('_')[0] + '_' + storyNumber;
          $(this).attr('id', newId);
          if ($(this).is('label')) {
            $(this).attr('for', newId);
          }
          if ($(this).is('input')) {
            $(this).attr('name', newId);
          }
        }
      });
    });
  }

  function getStoryValues() {
    let storyData = [];
    $('#storyList').find('.story-item').each(function (index) {
      let storyNumber = index + 1;

      let duration = $(this).find('input[id^="stDuration_"]').val();
      let title = $(this).find('input[id^="stTitle_"]').val();
      let storyImage = $(this).find('img[id^="stCoverImage_"]').attr('src');
      let storyText = $(this).find('textarea[id^="stStoryText_"]').val();
      let buttonText = $(this).find('input[id^="stButtonText_"]').val();
      let link = $(this).find('input[id^="stLink_"]').val();

      storyData.push({ storyNumber, duration, title, storyImage, storyText, buttonText, link });
    });

    return storyData;
  }

  // UI Operate
  function updateFixedBar() {
    let animation = getStoryAnimationSetting();

    hideStoryModal();
    setTimeout(function () {
      const sectionsData = getStoryValues();
      const storyContainer = $('.story-container');
      storyContainer.empty(); // Clear previous inputs

      sectionsData.forEach((section, index) => {
        const inputElement = $(`
              <div class="story-div" story=${section.storyNumber}>
                  <img src="https://via.placeholder.com/60" alt="${section.title}">
                  <p>${section.title}</p>
              </div>
          `);
        storyContainer.append(inputElement);

        inputElement.find('img').attr('src', section.storyImage);
      });

      if (animation === 'glass-effect') {
        $('.story-div').addClass('no-outline');
      }
      else {
        $('.story-div').removeClass('no-outline');
      }

      $('.story-div').hover(function () {
        const $container = $(this);
        $container.addClass('animate');
  
        // Stop animation after rotation (0.5 seconds)
        setTimeout(function () {
            $container.removeClass('animate');
        }, 500);
      });
    }, 200);    
  }

  $('.story-animation-section .option-card').on('click', function () {
    $('#st_animation').val($(this).attr('value'));

    // Remove 'active' class from all option-cards
    $('.story-animation-section .option-card').removeClass('active');

    // Add 'active' class to the clicked option-card
    $(this).addClass('active');

    updateStoryTheme();
  });
  function getStoryAnimationSetting() {
    return $('.story-animation-section .option-card.active').attr('value');
  }
  function setStoryAnimation(newVal) {
    $('.story-animation-section .option-card').each(function () {
      if ($(this).attr('value') === newVal) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  $('.story-desktop-layout-section .option-card').on('click', function () {
    $('#st_desktopLayout').val($(this).attr('value'));

    // Remove 'active' class from all option-cards
    $('.story-desktop-layout-section .option-card').removeClass('active');

    // Add 'active' class to the clicked option-card
    $(this).addClass('active');

    updateStoryTheme();
  });
  function getStoryDesktopLayout() {
    return $('.story-desktop-layout-section .option-card.active').attr('value');
  }
  function setStoryDesktopLayout(newVal) {
    $('.story-desktop-layout-section .option-card').each(function () {
      if ($(this).attr('value') === newVal) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  $('.story-image-setting-section .option-card').on('click', function () {
    $('#st_imageSetting').val($(this).attr('value'));

    // Remove 'active' class from all option-cards
    $('.story-image-setting-section .option-card').removeClass('active');

    // Add 'active' class to the clicked option-card
    $(this).addClass('active');

    hideStoryModal();
  });
  function getStoryImageSetting() {
    return $('.story-image-setting-section .option-card.active').attr('value');
  }
  function setStoryImageSetting(newVal) {
    $('.story-image-setting-section .option-card').each(function () {
      if ($(this).attr('value') === newVal) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  function updateStoryTheme() {
    let desktopPosition = getStoryDesktopLayout();
    let backgroundColor = $('#st_bgColor').val();
    let titlesColor = $('#st_titleColor').val();
    let animation = getStoryAnimationSetting();
    let showHideButton = $('#st_showHideButton').is(':checked');
    let addSchedule = $('#st_addSchedule').is(':checked');
    let start = new Date($('#st_startDate').val());
    let end = new Date($('#st_endDate').val());
    let today = new Date(); // Current date    
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    $('.fixed-container').show();

    if (addSchedule && (today < start || today > end)) {
      $('.fixed-container').hide();
      return;
    }

    $('.hide-button').hide();
    if (desktopPosition != 'top-inside' && showHideButton) {
      $('.hide-button').show();
    }
    $('.hide-button').remove('rotate-90 rotate-270');
    switch(desktopPosition) {
      case 'top-inside':
        break;
      case 'top-over':
        $('.hide-button').text('\u25B2');
        $('.hide-button').css({ 'top': '128px', 'right': '', 'bottom': '', 'left': '' });
        break;
      case 'bottom-over':
        $('.hide-button').text('\u25BC');
        $('.hide-button').css({ 'top': '', 'right': '', 'bottom': '128px', 'left': '' });
        break;
      case 'left-over':
        $('.hide-button').text('\u25B2');
        $('.hide-button').add('rotate-90');
        $('.hide-button').css({ 'top': '', 'right': '', 'bottom': '', 'left': '128px' });
        break;
      case 'right-over':
        $('.hide-button').text('\u25BC');
        $('.hide-button').add('rotate-270');
        $('.hide-button').css({ 'top': '', 'right': '128px', 'bottom': '', 'left': '' });
    }
    $('.fixed-bar').removeClass('top-inside top-over bottom-over left-over right-over').addClass(desktopPosition);

    if (animation === 'glass-effect') {
      backgroundColor = hexToRgba(backgroundColor, 0.5);
    }

    $('.fixed-bar').css({ 'background-color': backgroundColor, 'color': titlesColor });
    $('.hide-button').css({ 'background-color': backgroundColor, 'color': titlesColor });

    updateFixedBar();
  }
  
  // Fixed Bar
  $('#widget_section').on('click', '.hide-button', function () {
    let desktopPosition = getStoryDesktopLayout();
    let fixedBar = $('.fixed-bar');
    fixedBar.toggleClass('hidden');

    if (desktopPosition === 'top-over') {
      $(this).html(fixedBar.hasClass('hidden') ? '\u25BC' : '\u25B2');
      if (fixedBar.hasClass('hidden')) {
        $(this).css('top', '0px');
      } else {
        $(this).css('top', '128px');
      }
    }
    else if (desktopPosition === 'bottom-over') {
      $(this).html(fixedBar.hasClass('hidden') ? '\u25B2' : '\u25BC');
      if (fixedBar.hasClass('hidden')) {
        $(this).css('bottom', '0px');
      } else {
        $(this).css('bottom', '128px');
      }
    }
  });

  $('#storyForm').on('change', 'input, select, textarea', updateStoryTheme);

  $("#st_publish").click(function () {
    var formData = $("#storyForm").serializeArray();
    let retVal = createUpdateWidget("Story", formData, true, false);
    if (retVal['status'] === null) {
      showSubmissionModal('Success', `Your story has been published successfully and you can track it's statistics from monitoring screen`, true);
    }
    else {
      showWarningModal(retVal['status']);
    }
  });

  $("#st_saveDraft").click(function () {
    var formData = $("#storyForm").serializeArray();
    let id = createUpdateWidget("Story", formData, false, false);
    // alert(`Save draft operation succeed! (id:${id})`);
  });
  //------------------ End of Script for Story -------------------------------

  //------------------- Start of Script for Review -----------------------------
  function setReviewInitialValue() {
    getLastWidgetValue('Review', function(widgetValue, obj) {
      console.log('Review Value ----> ', obj, widgetValue);
      addPoweredBy = obj['addPoweredBy'];

      if (!$.isEmptyObject(widgetValue)) {
        var fieldCount = 0;
        $.each(widgetValue, function (key, value) {
          if (key.startsWith('rvName_')) {
            fieldCount++;
          }
        });
  
        $('#rv_reviewList').empty();
        for (let i = 1; i <= fieldCount; i++) {
          addReviewItem();
          $('#rvCoverImage_' + i).attr('src', widgetValue['rvCoverImageVal_' + i]);
        }
  
        setFormValue(widgetValue, 'reviewForm');
        setReviewButtonStyle(widgetValue['rv_buttonStyle']);
  
        $(`#rv_bgColor`).trigger('input');
        $(`#rv_buttonColor`).trigger('input');
        $(`#rv_reviewsAnimation`).trigger('input');
        $(`#rv_reviewsBgColor`).trigger('input');
  
        $('#rv_reviewList').find('.review-item').each(function () {
          let val = $(this).find('input[id^="rvRatingValue_"]').val();
          $(this).find('div[id^="rvStarRating_"]').rateYo("rating", val ? val : 0);
        });
      }
      updateReviewButton();
    });
  }

  $('.review-button-style-section .option-card').on('click', function () {
    $('#rv_buttonStyle').val($(this).attr('value'));

    $('.review-button-style-section .option-card').removeClass('active');
    $(this).addClass('active');

    updateReviewButton();
  });
  function getReviewButtonStyle() {
    return $('.review-button-style-section .option-card.active').attr('value');
  }
  function setReviewButtonStyle(newVal) {
    $('.review-button-style-section .option-card').each(function () {
      if ($(this).attr('value') === newVal) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  function updateReviewMainModal() {
    let bgColor = $('#rv_reviewsBgColor').val();
    let name = $('#rvName_1').val();
    let rating = $('#rvRatingValue_1').val();
    let reviewtxt = $('#rvReviewtxt_1').val();
    let image = $('#rvCoverImage_1').attr('src');

    $("#reviewModalRating").rateYo({
      rating: 0,             // Initial rating value
      fullStar: true,        // Full stars only
      starWidth: "10px",     // Width of each star
      spacing: "3px",        // Space between stars
      ratedFill: "#FFD700",  // Gold color of the rated stars
      normalFill: "#e5e5e5", // Light grey color of the normal stars
      halfStar: true,        // Enable half stars
      onSet: function (rating, rateYoInstance) {
      }
    });

    $('#reviewModalRating').rateYo("rating", rating);
    $('.review-modal h5').text(name);
    $('.review-modal img').attr('src', image);
    $('.review-modal .review-text').text(reviewtxt);

    $('.review-modal button').text($('#rv_text').val()).css('background-color', bgColor);

    if (!addPoweredBy) 
      $('.review-modal .footer-text').hide();

    showReviewMainModal();
  }

  $('#widget_section').on('click', '#rv_reviewButton', function () {
    updateReviewMainModal();
  });

  function updateReviewButton() {
    let position = ($('#sitePreviewDiv').data('value') === 'preview-mobile') ? $('#rv_mobilePosition').val() : $('#rv_desktopPosition').val();
    updateReviewPosition(position);

    var btnElement = $('#rv_reviewButton');

    let appearAnimation = ($('#rv_appearAnimation').val() === 'yes');
    if (appearAnimation)
      btnElement.removeClass("show");
    else
      btnElement.addClass("show");
    
    let buttonType = getReviewButtonStyle();
    let buttonText = $('#rv_text').val();
    let bgColor = $('#rv_bgColor').val();
    let textColor = $('#rv_buttonColor').val();

    btnElement.find('span').text(buttonText);
    if (buttonType === 'round-with-text' || buttonType === 'square-with-text') {
      btnElement.css({ 'background-color': bgColor, 'color': textColor, 'border': 'none' });
    }
    else {
      btnElement.css({ 'background-color': '', 'color': textColor, 'border': `3px solid ${bgColor}` });
    }

    btnElement.removeClass('round-with-text square-with-text outline-round outline-square').addClass(buttonType);

    if ($('#rv_waveAnimation').val() === 'yes') {
      $(".review-widget .fixed-button .wave-effect").removeClass('round-with-text square-with-text outline-round outline-square').addClass(buttonType);
      $(".review-widget .fixed-button .wave-effect").css({ 'background-color': bgColor, 'opacity': 0.5 })
      $(".review-widget .fixed-button .wave-effect").show();
    } else {
      $(".review-widget .fixed-button .wave-effect").hide();
    }

    if ($('#rv_makeButtonSmaller').val() === 'yes') {
      $(".review-widget .fixed-body").addClass("small-button");
    }
    else {
      $(".review-widget .fixed-body").removeClass("small-button");
    }

    setReviewAvgValue();

    let dismissP = 0.1;
    if ($('#rv_delay').val() === 'yes')
      dismissP = 1.5;
    if (dismissP > 0) {
      setTimeout(function () {
        btnElement.addClass("show");
      }, dismissP * 1000); // Convert seconds to milliseconds
    }

    hideReviewMainModal();
  }

  // Predefined Reviews 
  function refreshReviewContactNumbers() {
    $('#rv_reviewList').find('.review-item').each(function (index) {
      let sectionNumber = index + 1;
      $(this).find('.contact-no').text(`#${sectionNumber}`);
      $(this).find('input, label').each(function () {
        let id = $(this).attr('id') || '';
        if (id) {
          let newId = id.split('_')[0] + '_' + sectionNumber;
          $(this).attr('id', newId);
          if ($(this).is('label')) {
            $(this).attr('for', newId);
          }
          if ($(this).is('input')) {
            $(this).attr('name', newId);
          }
        }
      });
    });
    updateReviewMainModal();
  }

  function getReviewSectionValues() {
    let sectionsData = [];
    $('#rv_reviewList').find('.review-item').each(function () {
      let section = $(this);
      let name = section.find('input[id^="rvName_"]').val();
      let rating = section.find('input[id^="rvRating_"]').val();
      let reviewtxt = section.find('input[id^="rvReviewtxt_"]').val();
      let image = section.find('input[id^="rvImage_"]').val();
      sectionsData.push({ name, rating, reviewtxt, image });
    });
    return sectionsData;
  }

  function setReviewAvgValue() {
    let count = 0, sum = 0;
    $('#rv_reviewList').find('.review-item').each(function () {
      let item = $(this).find('input[id^="rvRatingValue_"]');
      sum += (item? Number(item.val()) : 0);
      count++;
    });

    let avg = (count ? (sum / count) : 0);
    avg = parseFloat(avg.toFixed(1));

    $("#rv_avgRating").rateYo({
      rating: 0,             // Initial rating value
      fullStar: true,        // Full stars only
      starWidth: "10px",     // Width of each star
      spacing: "3px",        // Space between stars
      ratedFill: "#FFD700",  // Gold color of the rated stars
      normalFill: "#e5e5e5", // Light grey color of the normal stars
      halfStar: true,        // Enable half stars
      onSet: function (rating, rateYoInstance) {
      }
    });
    $('#rv_avgRating').rateYo("rating", avg);
    if (!($('#rv_makeButtonSmaller').val() === 'yes')) {
      $("#rv_avgRating").rateYo("option", "starWidth", "15px");
    }
    else {
      $("#rv_avgRating").rateYo("option", "starWidth", "10px");
    }
  }

  function addReviewItem() {
    let sectionCount = $('#rv_reviewList').find('.review-item').length + 1;

    let newSection = $(`
              <div class="col-md-6 review-item mt-3">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                      <div class="py-1 px-2 rounded-2 contact-no" style="background-color: #dcdcdc;">#${sectionCount}</div>
                      <div class="justify-content-end">
                          <button type="button" class="btn btn-sm btn-icon ml-2 close-panel">
                              <i class="far fa-trash-alt" style="color: red;"></i>
                          </button>
                      </div>
                  </div>
                  <div class='rating-section'>
                      <label class="mb-1" for="rvStarRating_${sectionCount}">Review Rating</label>
                      <input type="hidden" name="rvRatingValue_${sectionCount}" id="rvRatingValue_${sectionCount}" value="0">
                      <div id="rvStarRating_${sectionCount}" name="rvStarRating_${sectionCount}" class="ratoYo-rating"></div>
                  </div>
                  <div class="form-floating-label mt-4">
                      <input type="text" class="form-control" id="rvName_${sectionCount}"
                          name="rvName_${sectionCount}">
                      <label for="rvName_${sectionCount}">Name</label>
                  </div>
                  <div class="form-floating-label">
                      <input type="text" class="form-control" id="rvReviewtxt_${sectionCount}"
                          name="rvReviewtxt_${sectionCount}">
                      <label for="rvReviewtxt_${sectionCount}">Review Text</label>
                  </div>
                  <div class="row group-details-section">
                      <div class="mb-2">Image</div>
                      <div class="col-6">
                          <img id="rvCoverImage_${sectionCount}" src="https://via.placeholder.com/400x300" class="review-img">
                          <input type="hidden" class="cover-image-val" name="rvCoverImageVal_${sectionCount}" id="rvCoverImageVal_${sectionCount}"></input>
                      </div>
                      <div class="col-6">
                          <div class="file-container">
                              <label for="rvImage_${sectionCount}" class="custom-file-upload px-2 py-2"><i class="fas fa-upload"></i>Upload</label>
                              <input type="file" class="form-control review-item-file image-upload" id="rvImage_${sectionCount}" name="rvImage_${sectionCount}">
                          </div>
                          <div class="form-floating-label">
                              <input type="button" class="w-100 px-2 py-2 explore-gallery" id="rvExploreGallery_${sectionCount}" value="Explore Gallery">
                          </div>
                      </div>
                  </div>
              </div>
      `);

    $('#rv_reviewList').append(newSection);

    $(".ratoYo-rating").rateYo({
      rating: 0,             // Initial rating value
      fullStar: true,        // Full stars only
      starWidth: "20px",     // Width of each star
      spacing: "5px",        // Space between stars
      ratedFill: "#FFD700",  // Gold color of the rated stars
      normalFill: "#e5e5e5", // Light grey color of the normal stars
      halfStar: true,        // Enable half stars
      onSet: function (rating, rateYoInstance) {
        $(this).closest('.rating-section').find('input').val(rating);
        setReviewAvgValue();
      }
    });

    updateReviewMainModal();
  }

  $('#rv_addReviewItem').on('click', addReviewItem);

  $('#rv_reviewList').on('click', '.close-panel', function () {
    $(this).closest('.review-item').remove();
    refreshReviewContactNumbers();
  });

  // UI Operate 
  $("#reviewForm").on('change', 'input, select, textarea', updateReviewButton);

  $("#rv_publish").click(function () {
    var formData = $("#reviewForm").serializeArray();
    let retVal = createUpdateWidget("Review", formData, true, false);
    if (retVal['status'] === null) {
      showSubmissionModal('Success', `Your review has been published successfully and you can track it's statistics from monitoring screen`, true);
    }
    else {
      showWarningModal(retVal['status']);
    }
  });

  $("#rv_saveDraft").click(function () {
    var formData = $("#reviewForm").serializeArray();
    let id = createUpdateWidget("Review", formData, false, false);
    // alert(`Save draft operation succeed! (id:${id})`);
  });
  //------------------ End of Script for Review -------------------------------

  //------------------ Start of Script for Contact Us -------------------------------
  function setContactUsInitialValue() {
    getLastWidgetValue('Contact Us', function(widgetValue) {
      writeLog('ContactUs Value', widgetValue);

      if (!$.isEmptyObject(widgetValue)) {
        var fieldCount = 0;
        $.each(widgetValue, function (key, value) {
          if (key.startsWith('cuManagerName_')) {
            fieldCount++;
          }
        });
        $('#manager-list').empty();
        for (let i = 1; i <= fieldCount; i++) {
          addContactItem();
          $('#cuCoverImage_' + i).attr('src', widgetValue['cuCoverImageVal_' + i]);
        }
        setFormValue(widgetValue, 'contactusForm');
      }
  
      updateContactButton();
      updateContactUsSection();
    });
  }

  $('#widget_section').on('click', '#chatButton', function (event) {
    if ($('#cu_selectType').val() === "open-direct") {
      $('#contactLinkList').toggle();
    } else {
      $('#chatWindow').toggle();
    }
  });

  $('#manager-list').on('click', '.close-panel', function () {
    $(this).closest('.manager-item').remove();
    refreshContactUsNumbers();
  });

  function updateContactButton() {
    var btnElement = $('#chatButton');
    let buttonType = $('#cu_Type').val();
    let buttonText = $('#cu_Text').val();
    let bgColor = $('#cu_bgColor').val();
    let textColor = $('#cu_buttonColor').val();
    btnElement.css({ 'background-color': bgColor, 'color': textColor });
    btnElement.find(".fixed-button-text").text(buttonText);
    btnElement.removeClass('but-rounded but-square but-circle but-tab').addClass(buttonType);
    if (buttonType === 'but-circle') {
      btnElement.find(".fixed-button-text").hide();
    }
    else {
      btnElement.find(".fixed-button-text").show();
    }
    $('#chatHeader').css({ 'background-color': bgColor, 'color': textColor });
    $('#chatFooter button').css({ 'background-color': bgColor, 'color': textColor });

    let position = ($('#sitePreviewDiv').data('value') === 'preview-mobile') ? $('#cu_mobilePosition').val() : $('#cu_desktopPosition').val();
    let verticalMargin = $('#cu_verticalMargin').val();
    let horizontalMargin = $('#cu_horizontalMargin').val();
    updateContactUsPosition(position, verticalMargin, horizontalMargin);

    if ($('#cu_redDot').val() === 'yes') {
      $('.contactus-section .red-dot').show();
    }
    else {
      $('.contactus-section .red-dot').hide();
    }

    if ($('#cu_shakeButton').val() === 'yes') {
      $(".contactus-section .fixed-button i").addClass("shake");
    }
    else {
      $(".contactus-section .fixed-button i").removeClass("shake");
    }

    if ($('#cu_waveAnimation').val() === 'yes') {
      $(".contactus-section .fixed-button .wave-effect").removeClass('but-rounded but-square but-circle but-tab').addClass(buttonType);
      $(".contactus-section .fixed-button .wave-effect").css({ 'background-color': bgColor, 'opacity': 0.5 })
      $(".contactus-section .fixed-button .wave-effect").show();
    } else {
      $(".contactus-section .fixed-button .wave-effect").hide();
    }

    if ($('#cu_smallButton').val() === 'yes') {
      $(".contactus-section .fixed-body").addClass("small-button");
    }
    else {
      $(".contactus-section .fixed-body").removeClass("small-button");
    }
  }

  // Additional Review Fields 
  function refreshContactUsNumbers() {
    $('#manager-list').find('.manager-item').each(function (index) {
      let sectionNumber = index + 1;
      $(this).find('input, label').each(function () {
        let id = $(this).attr('id') || '';
        if (id) {
          let newId = id.split('_')[0] + '_' + sectionNumber;
          $(this).attr('id', newId);
          if ($(this).is('label')) {
            $(this).attr('for', newId);
          }
          if ($(this).is('input')) {
            $(this).attr('name', newId);
          }
        }
      });
    });
    updateContactUsSection();
  }

  function updateContactUsSection() {
    let behaviorType = $('#cu_selectType').val();
    let firstMgrUsed = ($('#cu_firstMgrUsed').val() === 'yes');

    if (behaviorType === 'open-direct') {
      $('.direct-content').show();
      $('.manager-section').hide();
      $('#cu_notificationWindow').hide();
      $('#chatWindow').hide();
    }
    else {
      $('.direct-content').hide();
      $('.manager-section').show();
      $('#cu_notificationWindow').show();
      $('#contactLinkList').hide();
    }

    updateContactButton();
    updateWidgetSection(behaviorType, firstMgrUsed);

    $('#selectedManagerChatHeaderArea .sm-box-title').html($('#cu_title').val());
    $('#selectedManagerChatHeaderArea .sm-box-subtitle').html($('#cu_subtitle').val());
    $('#firstManagerChatFooter .cu-start-chat-label').html($('#cu_footerStart').val());
    $('#selectedManagerChatFooter .sm-box-footer-info').html($('#cu_footer').val());

    if (behaviorType === 'support-managers') {
      if (!firstMgrUsed) {
        // Update Chat Section
        $('#firstManagerChatFooter').hide();
        $('#firstManagerChatBody').hide();
        $('#firstManagerChatHeaderArea').hide();
        $('#selectedManagerChatFooter').show();
        $('#selectedManagerChatBody').show();
        $('#selectedManagerChatHeaderArea').show();
      } else {
        $('#firstManagerChatFooter').show();
        $('#firstManagerChatBody').show();
        $('#firstManagerChatHeaderArea').show();
        $('#selectedManagerChatFooter').hide();
        $('#selectedManagerChatBody').hide();
        $('#selectedManagerChatHeaderArea').hide();
      }
    }
    else if (behaviorType === 'open-direct') {
      let contact = $('#contactLinkList .cu-expandable')
      contact.empty();
      if ($('#cu_directFacebook').val()) {
        contact.append(`
              <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://www.messenger.com/t/@facebook_messenger_id?call">
                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Ctitle%3EFacebook%20Messenger%3C%2Ftitle%3E%0A%09%09%3Cg%3E%0A%09%09%09%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230084ff%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M25%2C10c-8.29%2C0-15%2C6.22-15%2C13.89A13.5%2C13.5%2C0%2C0%2C0%2C15.59%2C34.7V40l5.11-2.8a16.45%2C16.45%2C0%2C0%2C0%2C4.3.58c8.28%2C0%2C15-6.22%2C15-13.89S33.28%2C10%2C25%2C10Zm1.49%2C18.7-3.82-4.07L15.22%2C28.7l8.2-8.7%2C3.91%2C4.07L34.69%2C20Z%22%0A%09%09%09%09style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
              </a>
          `);
      }
      if ($('#cu_directSkype').val()) {
        contact.append(`
              <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="skype:skype_account?chat">
                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%20%20%3Cg%3E%0A%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2315ace5%22%2F%3E%0A%09%20%20%20%20%3Cpath%20d%3D%22M38.89%2C27.72A14.34%2C14.34%2C0%2C0%2C0%2C39.15%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C10.85a14.34%2C14.34%2C0%2C0%2C0-2.72.26A8.17%2C8.17%2C0%2C0%2C0%2C11.11%2C22.28%2C14.34%2C14.34%2C0%2C0%2C0%2C10.85%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C39.15a14.34%2C14.34%2C0%2C0%2C0%2C2.72-.26A8.17%2C8.17%2C0%2C0%2C0%2C38.89%2C27.72Zm-13.62%2C7c-5%2C0-7.54-1.89-8.32-4.26s.92-3%2C1.46-3.09a1.85%2C1.85%2C0%2C0%2C1%2C2%2C1.06%2C4.68%2C4.68%2C0%2C0%2C0%2C3.86%2C3.29c2.42.24%2C4-.87%2C4.5-2s-.39-2.76-4.11-3.29-7.59-2.17-7.59-5.9%2C4.26-5.22%2C8.32-5.22%2C6.11%2C2.3%2C6.57%2C3.19c.56%2C1.12.37%2C3-1%2C3.29s-2.12-.43-3.14-2.32-4.78-1.45-6-.34-.92%2C2.71%2C4.3%2C3.72%2C7.15%2C2.9%2C7.15%2C5.85S30.3%2C34.72%2C25.27%2C34.72Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
              </a>
          `);
      }
      if ($('#cu_directTelegram').val()) {
        contact.append(`
              <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://t.me/@telegram">
                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Cg%3E%0A%09%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230088cc%22%2F%3E%0A%09%09%20%20%20%20%3Cpath%20d%3D%22M36%2C10.2%2C9.4%2C22.42c-1.81.87-1.8%2C2.07-.33%2C2.61L15.7%2C27.5l2.53%2C9.27c.31%2C1%2C.16%2C1.41%2C1.05%2C1.41a1.68%2C1.68%2C0%2C0%2C0%2C1.38-.82L24%2C33.52l6.89%2C6.07c1.27.84%2C2.19.4%2C2.5-1.4L37.9%2C12.76C38.36%2C10.55%2C37.19%2C9.54%2C36%2C10.2ZM16.74%2C26.93%2C31.68%2C15.69c.74-.54%2C1.43-.25.86.35L19.75%2C29.8l-.49%2C6.33Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
              </a>
          `);
      }
      if ($('#cu_directInstagram').val()) {
        contact.append(`
              <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://ig.me/m/@instagram">
                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%09%3ClinearGradient%20id%3D%22SVGID_1_%22%20gradientTransform%3D%22matrix(0%20-1.982%20-1.844%200%20-132.522%20-51.077)%22%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-37.106%22%20x2%3D%22-26.555%22%20y1%3D%22-72.705%22%20y2%3D%22-84.047%22%3E%0A%09%09%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fd5%22%2F%3E%0A%09%09%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%23ff543e%22%2F%3E%0A%09%09%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c837ab%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%0A%09%09d%3D%22m1.5%201.633c-1.886%201.959-1.5%204.04-1.5%2010.362%200%205.25-.916%2010.513%203.878%2011.752%201.497.385%2014.761.385%2016.256-.002%201.996-.515%203.62-2.134%203.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41%201.633z%22%0A%09%09fill%3D%22url(%23SVGID_1_)%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22m11.998%203.139c-3.631%200-7.079-.323-8.396%203.057-.544%201.396-.465%203.209-.465%205.805%200%202.278-.073%204.419.465%205.804%201.314%203.382%204.79%203.058%208.394%203.058%203.477%200%207.062.362%208.395-3.058.545-1.41.465-3.196.465-5.804%200-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794%201.597c7.574-.012%208.538-.854%208.006%2010.843-.189%204.137-3.339%203.683-7.211%203.683-7.06%200-7.263-.202-7.263-7.265%200-7.145.56-7.257%206.468-7.263zm5.524%201.471c-.587%200-1.063.476-1.063%201.063s.476%201.063%201.063%201.063%201.063-.476%201.063-1.063-.476-1.063-1.063-1.063zm-4.73%201.243c-2.513%200-4.55%202.038-4.55%204.551s2.037%204.55%204.55%204.55%204.549-2.037%204.549-4.55-2.036-4.551-4.549-4.551zm0%201.597c3.905%200%203.91%205.908%200%205.908-3.904%200-3.91-5.908%200-5.908z%22%0A%09%09fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E">
              </a>
          `);
      }
      if ($('#cu_directPhone').val()) {
        contact.append(`
              <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="tel:${$('#directPhoneNumber').val()}">
                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%235461f4%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.61%2C31.06h0c-1.14-2.15-4.78-4.33-5.2-4.58a3.37%2C3.37%2C0%2C0%2C0-2.52-.41%2C2.48%2C2.48%2C0%2C0%2C0-1.46%2C1.1c-.47.56-1.06%2C1.23-1.19%2C1.34a1.59%2C1.59%2C0%2C0%2C1-2.42-.25l-6.09-6.08a1.58%2C1.58%2C0%2C0%2C1-.27-2.38c.14-.17.81-.76%2C1.37-1.23a2.48%2C2.48%2C0%2C0%2C0%2C1.1-1.46%2C3.35%2C3.35%2C0%2C0%2C0-.42-2.53c-.24-.41-2.42-4.05-4.57-5.19A3.32%2C3.32%2C0%2C0%2C0%2C15%2C10l-1.34%2C1.34C11.25%2C13.75%2C8.29%2C19%2C15.77%2C26.43l7.8%2C7.8C27.15%2C37.81%2C30.21%2C39%2C32.69%2C39a8.45%2C8.45%2C0%2C0%2C0%2C6-2.68L40%2C35A3.32%2C3.32%2C0%2C0%2C0%2C40.61%2C31.06Z%22%20style%3D%22fill%3A%20%23ffffff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E">
              </a>
          `);
      }
      if ($('#cu_directWhatsapp').val()) {
        contact.append(`
              <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://wa.me/">
                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2330bf39%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M39.8%2C23.4A14.64%2C14.64%2C0%2C0%2C1%2C25.1%2C38%2C15.25%2C15.25%2C0%2C0%2C1%2C18%2C36.2L9.8%2C38.8%2C12.5%2C31a14.84%2C14.84%2C0%2C0%2C1-2.1-7.5%2C14.7%2C14.7%2C0%2C0%2C1%2C29.4-.1ZM25.1%2C11.2A12.38%2C12.38%2C0%2C0%2C0%2C12.7%2C23.5a12%2C12%2C0%2C0%2C0%2C2.4%2C7.2l-1.5%2C4.6%2C4.8-1.5A12.44%2C12.44%2C0%2C0%2C0%2C37.6%2C23.5%2C12.53%2C12.53%2C0%2C0%2C0%2C25.1%2C11.2Zm7.4%2C15.6a3.22%2C3.22%2C0%2C0%2C0-.7-.4l-2.5-1.2c-.3-.1-.6-.2-.8.2a8.54%2C8.54%2C0%2C0%2C1-1.1%2C1.4.59.59%2C0%2C0%2C1-.8.1%2C11%2C11%2C0%2C0%2C1-2.9-1.8%2C9.88%2C9.88%2C0%2C0%2C1-2-2.5.46.46%2C0%2C0%2C1%2C.2-.7%2C2.65%2C2.65%2C0%2C0%2C0%2C.5-.6c.2-.2.2-.4.4-.6a.64.64%2C0%2C0%2C0%2C0-.6c-.1-.2-.8-1.9-1.1-2.7s-.6-.6-.8-.6h-.7a1.85%2C1.85%2C0%2C0%2C0-1%2C.4%2C4.16%2C4.16%2C0%2C0%2C0-1.3%2C3%2C6.45%2C6.45%2C0%2C0%2C0%2C1.5%2C3.7c.2.2%2C2.5%2C4%2C6.2%2C5.4s3.7%2C1%2C4.3.9a3.74%2C3.74%2C0%2C0%2C0%2C2.4-1.7A2.82%2C2.82%2C0%2C0%2C0%2C32.5%2C26.8Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
              </a>
          `);
      }
      if ($('#cu_diretEmail').val()) {
        contact.append(`
              <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="mailto:${$('#directEmail').val()}">
                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%23fc872b%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M25%2C25.89%2C10%2C13.75H40Zm-6.78-2.28L10%2C17V32.58Zm13.56%2C0%2C8.22%2C9V17Zm-2%2C1.58L25%2C29.11l-4.84-3.92L10%2C36.25H40Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
              </a>
          `);
      }
      if ($('#cu_directImessages').val()) {
        contact.append(`
              <a class="show hover-opacity sm-button sm-button-circle is-imessages" target="_blank" href="sms://${$('#directIMessengerPhoneNumber').val()}">
                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%0A%09xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%0A%09xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%0A%09xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%0A%09xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%0A%09xmlns%3Asodipodi%3D%22http%3A%2F%2Fsodipodi.sourceforge.net%2FDTD%2Fsodipodi-0.dtd%22%0A%09xmlns%3Ainkscape%3D%22http%3A%2F%2Fwww.inkscape.org%2Fnamespaces%2Finkscape%22%0A%09width%3D%221024px%22%0A%09height%3D%221024px%22%0A%09viewBox%3D%220%200%2066.145836%2066.145836%22%0A%09version%3D%221.1%22%0A%09id%3D%22svg8%22%0A%09inkscape%3Aversion%3D%220.92.2%20(5c3e80d%2C%202017-08-06)%22%0A%09sodipodi%3Adocname%3D%22iMessage%20logo.svg%22%3E%0A%09%3Ctitle%0A%09%09id%3D%22title907%22%3EiMessage%20logo%3C%2Ftitle%3E%0A%09%3Cdefs%0A%09%09id%3D%22defs2%22%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09id%3D%22linearGradient899%22%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%220%22%0A%09%09%09%09id%3D%22stop895%22%2F%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%221%22%0A%09%09%09%09id%3D%22stop897%22%2F%3E%0A%09%09%3C%2FlinearGradient%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09xlink%3Ahref%3D%22%23linearGradient899%22%0A%09%09%09id%3D%22linearGradient901%22%0A%09%09%09x1%3D%22-25.272568%22%0A%09%09%09y1%3D%22207.52057%22%0A%09%09%09x2%3D%22-25.272568%22%0A%09%09%09y2%3D%22152.9982%22%0A%09%09%09gradientUnits%3D%22userSpaceOnUse%22%0A%09%09%09gradientTransform%3D%22matrix(0.98209275%2C0%2C0%2C0.98209275%2C-1.0651782%2C3.7961838)%22%2F%3E%0A%09%3C%2Fdefs%3E%0A%09%3Csodipodi%3Anamedview%0A%09%09id%3D%22base%22%0A%09%09pagecolor%3D%22%23ffffff%22%0A%09%09bordercolor%3D%22%23666666%22%0A%09%09borderopacity%3D%221.0%22%0A%09%09inkscape%3Apageopacity%3D%220.0%22%0A%09%09inkscape%3Apageshadow%3D%222%22%0A%09%09inkscape%3Azoom%3D%221%22%0A%09%09inkscape%3Acx%3D%22142.01984%22%0A%09%09inkscape%3Acy%3D%2261.975439%22%0A%09%09inkscape%3Adocument-units%3D%22px%22%0A%09%09inkscape%3Acurrent-layer%3D%22layer1%22%0A%09%09showgrid%3D%22false%22%0A%09%09inkscape%3Asnap-object-midpoints%3D%22false%22%0A%09%09showguides%3D%22true%22%0A%09%09inkscape%3Aguide-bbox%3D%22true%22%0A%09%09inkscape%3Asnap-intersection-paths%3D%22false%22%0A%09%09inkscape%3Awindow-width%3D%221920%22%0A%09%09inkscape%3Awindow-height%3D%221017%22%0A%09%09inkscape%3Awindow-x%3D%221358%22%0A%09%09inkscape%3Awindow-y%3D%22-8%22%0A%09%09inkscape%3Awindow-maximized%3D%221%22%0A%09%09fit-margin-top%3D%220%22%0A%09%09fit-margin-left%3D%220%22%0A%09%09fit-margin-right%3D%220%22%0A%09%09fit-margin-bottom%3D%220%22%2F%3E%0A%09%3Cmetadata%0A%09%09id%3D%22metadata5%22%3E%0A%09%09%3Crdf%3ARDF%3E%0A%09%09%09%3Ccc%3AWork%0A%09%09%09%09rdf%3Aabout%3D%22%22%3E%0A%09%09%09%09%3Cdc%3Aformat%3Eimage%2Fsvg%2Bxml%3C%2Fdc%3Aformat%3E%0A%09%09%09%09%3Cdc%3Atype%0A%09%09%09%09%09rdf%3Aresource%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2FStillImage%22%2F%3E%0A%09%09%09%09%3Cdc%3Atitle%3EiMessage%20logo%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%3Cdc%3Adate%3E02%2F04%2F2018%3C%2Fdc%3Adate%3E%0A%09%09%09%09%3Cdc%3Acreator%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3EApple%2C%20Inc.%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Acreator%3E%0A%09%09%09%09%3Cdc%3Apublisher%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3ECMetalCore%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Apublisher%3E%0A%09%09%09%09%3Cdc%3Asource%3Ehttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F85%2FIMessage_icon.png%3C%2Fdc%3Asource%3E%0A%09%09%09%3C%2Fcc%3AWork%3E%0A%09%09%3C%2Frdf%3ARDF%3E%0A%09%3C%2Fmetadata%3E%0A%09%3Cg%0A%09%09inkscape%3Alabel%3D%22Capa%201%22%0A%09%09inkscape%3Agroupmode%3D%22layer%22%0A%09%09id%3D%22layer1%22%0A%09%09transform%3D%22translate(59.483067%2C-145.8456)%22%3E%0A%09%09%3Cg%0A%09%09%09id%3D%22g963%22%3E%0A%09%09%09%3Crect%0A%09%09%09%09ry%3D%2214.567832%22%0A%09%09%09%09rx%3D%2214.567832%22%0A%09%09%09%09y%3D%22145.8456%22%0A%09%09%09%09x%3D%22-59.483067%22%0A%09%09%09%09height%3D%2266.145836%22%0A%09%09%09%09width%3D%2266.145836%22%0A%09%09%09%09id%3D%22rect826%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3Aurl(%23linearGradient901)%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.33634758%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09inkscape%3Aconnector-curvature%3D%220%22%0A%09%09%09%09id%3D%22path922%22%0A%09%09%09%09d%3D%22m%20-26.410149%2C157.29606%20a%2024.278298%2C20.222157%200%200%200%20-24.278105%2C20.22202%2024.278298%2C20.222157%200%200%200%2011.79463%2C17.31574%2027.365264%2C20.222157%200%200%201%20-4.245218%2C5.94228%2023.85735%2C20.222157%200%200%200%209.86038%2C-3.87367%2024.278298%2C20.222157%200%200%200%206.868313%2C0.83768%2024.278298%2C20.222157%200%200%200%2024.2781059%2C-20.22203%2024.278298%2C20.222157%200%200%200%20-24.2781059%2C-20.22202%20z%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3A%23ffffff%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.56409621%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
              </a>
          `);
      }
      if ($('#cu_directWeibo').val()) {
        contact.append(`
              <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://api.weibo.com/chat/#/?to_uid=${$('#directWeiboUserId').val()}">
                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221024%22%20height%3D%221024%22%20viewBox%3D%220%200%20300%20300%22%3E%0A%09%3Cg%3E%0A%09%09%3Ccircle%20cx%3D%22150%22%20cy%3D%22150%22%20r%3D%22150%22%20style%3D%22fill%3A%20%23f5f5f5%22%2F%3E%0A%09%09%3Cg%20transform%3D%22matrix(3.5%200%200%203.5%2070%2060)%22%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M50.448%2012.132c.217%202.814-.259%206.186-2.117%206.351-3.033.271-1.451-3.07-1.411-5.081.111-5.829-4.865-9.879-9.739-9.879-1.381%200-4.588.936-4.094-1.976.222-1.284%201.31-1.266%202.399-1.411%208.197-1.093%2014.386%204.546%2014.962%2011.996z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23D52A2C%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M37.04%2018.907c3.524%201.928%207.758%202.888%207.056%208.61-.168%201.371-.998%203.203-1.834%204.373-5.957%208.339-23.924%2011.844-35.144%205.506C3.355%2035.269-.539%2032.159.062%2025.962c.517-5.333%204.103-9.464%207.622-12.983%203.357-3.359%206.897-5.987%2011.714-7.198%205.226-1.314%206.771%203.043%205.363%207.339%203.027-.203%209.442-3.582%2012.279-.282%201.25%201.454.771%204.058%200%206.069zm-3.811%2013.548c1.129-1.28%202.264-3.231%202.257-5.503-.015-7.014-8.851-9.605-15.806-9.033-3.804.312-6.363%201.115-9.033%202.682-2.179%201.279-4.729%203.36-5.363%206.491-1.427%207.041%206.231%2010.35%2011.855%2010.726%206.498.437%2013.002-1.857%2016.09-5.363z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M43.531%2012.132c.296%202.149-.319%204.011-1.552%204.093-2.056.137-1.287-1.408-1.412-3.246-.078-1.132-1.016-2.439-1.835-2.823-1.606-.752-4.093.548-4.093-1.693%200-1.664%201.443-1.491%202.259-1.553%203.574-.272%206.216%202.191%206.633%205.222z%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M27.019%2026.246c3.007%209.088-12.66%2013.314-15.525%205.504-1.917-5.223%202.686-9.377%207.48-9.879%204.093-.429%207.144%201.658%208.045%204.375zm-7.198%201.553c.638%201.104%202.105.311%201.976-.564-.154-1.013-1.989-.863-1.976.564zm-2.541%204.799c2.634-.627%202.988-5.588-.988-4.658-3.34.78-2.694%205.533.988%204.658z%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
              </a>
          `);
      }
      if ($('#cu_directViber').val()) {
        contact.append(`
              <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="viber://pa?chatURI=${$('#directOrViberBotName').val()}">
                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20version%3D%221.0%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000000%22%0A%20width%3D%2250.000000pt%22%20height%3D%2250.000000pt%22%20viewBox%3D%220%200%2050.000000%2050.000000%22%0A%20preserveAspectRatio%3D%22xMidYMid%20meet%22%3E%0A%0A%3Ccircle%20cx%3D%2220pt%22%20cy%3D%2220pt%22%20r%3D%2216pt%22%20fill%3D%22%23fff%22%3E%3C%2Fcircle%3E%0A%3Cg%20transform%3D%22translate(0.000000%2C50.000000)%20scale(0.100000%2C-0.100000)%22%0Afill%3D%22blue%22%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M167%20484%20c-92%20-28%20-167%20-134%20-167%20-234%200%20-131%20119%20-250%20250%20-250%20129%0A0%20250%20121%20250%20250%200%20100%20-78%20207%20-172%20235%20-63%2018%20-98%2018%20-161%20-1z%20m198%20-86%0Ac34%20-27%2055%20-75%2055%20-128%200%20-94%20-54%20-150%20-144%20-150%20-37%200%20-56%20-6%20-72%20-21%20-25%0A-23%20-44%20-18%20-44%2010%200%2010%20-12%2026%20-26%2036%20-72%2047%20-71%20196%201%20253%2024%2019%2041%2022%20115%0A22%2074%200%2091%20-3%20115%20-22z%22%2F%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M185%20383%20c-11%20-3%20-30%20-14%20-42%20-26%20-19%20-17%20-23%20-31%20-23%20-85%200%20-57%203%0A-66%2030%20-94%2018%20-18%2030%20-40%2030%20-56%20l0%20-26%2028%2026%20c18%2018%2043%2028%2080%2033%2071%209%2092%2036%0A92%20120%200%2084%20-22%20106%20-112%20111%20-35%201%20-72%200%20-83%20-3z%20m112%20-38%20c24%20-17%2047%20-72%2032%0A-80%20-5%20-4%20-9%204%20-10%2017%200%2021%20-1%2021%20-8%204%20-7%20-19%20-8%20-19%20-13%202%20-4%2012%20-14%2025%20-25%0A29%20-18%207%20-33%2022%20-33%2036%200%2012%2034%208%2057%20-8z%20m-83%20-17%20c11%20-15%2012%20-25%205%20-34%20-21%0A-26%2030%20-75%2056%20-54%209%207%2019%205%2036%20-9%2023%20-19%2023%20-21%207%20-37%20-14%20-15%20-21%20-15%20-47%20-4%0A-35%2014%20-96%2077%20-106%20109%20-6%2021%209%2051%2026%2051%204%200%2015%20-10%2023%20-22z%20m71%20-29%20c11%20-17%0A-1%20-21%20-15%20-4%20-8%209%20-8%2015%20-2%2015%206%200%2014%20-5%2017%20-11z%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
              </a>
          `);
      }
    }
    // Update Initial Message Popup Section Inputs
    if (behaviorType !== 'open-direct') {
      $('#cu_notificationWindow').show();

      $('#cu_notificationWindow .mgr_name').html($('#cuManagerName_1').val());
      $('#cu_notificationWindow .mgr_role').html($('#cuRoles_1').val());
      $('#cu_notificationWindow .mgr_text').html($('#cuInitialWords_1').val());

      setTimeout(function () { $("#cu_notificationWindow img").attr("src", $('#cuCoverImage_1').attr('src')); }, 200);

      let dismissP = $('#cu_dismissPeriod').val();
      if (dismissP > 0) {
        setTimeout(function () {
          $("#cu_notificationWindow").fadeOut();
        }, dismissP * 1000); // Convert seconds to milliseconds
      }
    }
    else {
      $('#cu_notificationWindow').hide();
    }
  }

  $('#contactusForm').on('change', 'input, select, textarea', updateContactUsSection);

  function addContactItem() {
    let sectionCount = $('#manager-list').find('.manager-item').length + 1;
    let newItem = `
                <div class="manager-item">
                  <div class="row mb-2">
                      <div class="col-md-12">
                          <div class="d-flex justify-content-between align-items-center mb-4">
                              <div class="py-1 px-2 rounded-2 contact-no" style="background-color: #dcdcdc;">#${sectionCount}</div>
                              <div class="justify-content-end">
                                  <button type="button" class="btn btn-sm btn-icon ml-2 close-panel">
                                      <i class="far fa-trash-alt" style="color: red;"></i>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
                      
                  <div class="row group-details-section">
                      <div class="col-3 group-details-image-section">
                          <div class="mb-1">Image</div>
                          <img id="cuCoverImage_${sectionCount}" src="https://via.placeholder.com/400x300">
                          <input type="hidden" class="cover-image-val" name="cuCoverImageVal_${sectionCount}" id="cuCoverImageVal_${sectionCount}"></input>
                      </div>
                      <div class="col-9">
                          <div class="col-md-12">
                              <div class="form-floating-label" >
                                  <input type="text" class="form-control" id="cuManagerName_${sectionCount}" name="cuManagerName_${sectionCount}">
                                  <label for="cuManagerName_${sectionCount}">Manager Name</label>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col-8">
                                  <div class="file-container">
                                      <label for="cuUploadImage_${sectionCount}" class="custom-file-upload px-2 py-2"><i class="fas fa-upload"></i>Upload</label>
                                      <input type="file" class="form-control image-upload" id="cuUploadImage_${sectionCount}">
                                  </div>
                              </div>
                              <div class="col-4">
                                  <div class="form-floating-label">
                                      <input type="button" class="w-100 px-2 py-2 explore-gallery" id="cuExploreGallery_${sectionCount}" value="Explore Gallery">
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-6">
                          <div class="form-floating-label" >
                              <input type="text" class="form-control" id="cuRoles_${sectionCount}" name="cuRoles_${sectionCount}">
                              <label for="cuRoles_${sectionCount}">Roles</label>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-floating-label" >
                              <input type="text" class="form-control" id="cuCaption_${sectionCount}" name="cuCaption_${sectionCount}">
                              <label for="cuCaption_${sectionCount}">Caption</label>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-12">
                      <div class="form-floating-label">
                          <textarea type="textarea" class="form-control" id="cuInitialWords_${sectionCount}" placeholder="" name="cuInitialWords_${sectionCount}"></textarea>
                          <label for="cuInitialWords_${sectionCount}">Initial Words</label>
                      </div>
                  </div>
                  <div class="row g-3">
                      <!-- Facebook -->
                      <div class="col-12 col-md-6 col-lg-6 d-flex gap-2">
                          <div class="form-floating-label w-100">
                              <input type="text" class="form-control" id="cuFacebook_${sectionCount}" placeholder="Link here" name="cuFacebook_${sectionCount}">
                              <label for="cuFacebook_${sectionCount}">Facebook Messenger Id</label>
                          </div>
                          <div class="btn-group">
                              <button type="button" class="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <svg enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.0" viewBox="0 0 32 32" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M18,32V18h6l1-6h-7V9c0-2,1.002-3,3-3h3V0c-1,0-3.24,0-5,0c-5,0-7,3-7,8v4H6v6h6v14H18z" fill="#3B5998" id="f_1_"/><g/><g/><g/><g/><g/><g/></svg>
                                  <!-- <i class="fab fa-facebook pl-2"></i> -->
                              </button>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Option 1</a></li>
                                  <li><a class="dropdown-item" href="#">Option 2</a></li>
                              </ul>
                          </div>
                      </div>

                      <!-- Instagram -->
                      <div class="col-12 col-md-6 col-lg-6 d-flex gap-2">
                          <div class="form-floating-label w-100">
                              <input type="text" class="form-control" id="cuInstagram_${sectionCount}" placeholder="Link here" name="cuInstagram_${sectionCount}">
                              <label for="cuInstagram_${sectionCount}">Instagram Username</label>
                          </div>
                          <div class="btn-group">
                              <button type="button" class="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%09%3ClinearGradient%20id%3D%22SVGID_1_%22%20gradientTransform%3D%22matrix(0%20-1.982%20-1.844%200%20-132.522%20-51.077)%22%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-37.106%22%20x2%3D%22-26.555%22%20y1%3D%22-72.705%22%20y2%3D%22-84.047%22%3E%0A%09%09%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fd5%22%2F%3E%0A%09%09%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%23ff543e%22%2F%3E%0A%09%09%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c837ab%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%0A%09%09d%3D%22m1.5%201.633c-1.886%201.959-1.5%204.04-1.5%2010.362%200%205.25-.916%2010.513%203.878%2011.752%201.497.385%2014.761.385%2016.256-.002%201.996-.515%203.62-2.134%203.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41%201.633z%22%0A%09%09fill%3D%22url(%23SVGID_1_)%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22m11.998%203.139c-3.631%200-7.079-.323-8.396%203.057-.544%201.396-.465%203.209-.465%205.805%200%202.278-.073%204.419.465%205.804%201.314%203.382%204.79%203.058%208.394%203.058%203.477%200%207.062.362%208.395-3.058.545-1.41.465-3.196.465-5.804%200-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794%201.597c7.574-.012%208.538-.854%208.006%2010.843-.189%204.137-3.339%203.683-7.211%203.683-7.06%200-7.263-.202-7.263-7.265%200-7.145.56-7.257%206.468-7.263zm5.524%201.471c-.587%200-1.063.476-1.063%201.063s.476%201.063%201.063%201.063%201.063-.476%201.063-1.063-.476-1.063-1.063-1.063zm-4.73%201.243c-2.513%200-4.55%202.038-4.55%204.551s2.037%204.55%204.55%204.55%204.549-2.037%204.549-4.55-2.036-4.551-4.549-4.551zm0%201.597c3.905%200%203.91%205.908%200%205.908-3.904%200-3.91-5.908%200-5.908z%22%0A%09%09fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E">
                              </button>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Option 1</a></li>
                                  <li><a class="dropdown-item" href="#">Option 2</a></li>
                              </ul>
                          </div>
                      </div>

                      <!-- Skype -->
                      <div class="col-12 col-md-6 col-lg-6 d-flex gap-2">
                          <div class="form-floating-label w-100">
                              <input type="text" class="form-control" id="cuSkype_${sectionCount}" placeholder="Link here" name="cuSkype_${sectionCount}">
                              <label for="cuSkype_${sectionCount}">Skype Username</label>
                          </div>
                          <div class="btn-group">
                              <button type="button" class="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%20%20%3Cg%3E%0A%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2315ace5%22%2F%3E%0A%09%20%20%20%20%3Cpath%20d%3D%22M38.89%2C27.72A14.34%2C14.34%2C0%2C0%2C0%2C39.15%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C10.85a14.34%2C14.34%2C0%2C0%2C0-2.72.26A8.17%2C8.17%2C0%2C0%2C0%2C11.11%2C22.28%2C14.34%2C14.34%2C0%2C0%2C0%2C10.85%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C39.15a14.34%2C14.34%2C0%2C0%2C0%2C2.72-.26A8.17%2C8.17%2C0%2C0%2C0%2C38.89%2C27.72Zm-13.62%2C7c-5%2C0-7.54-1.89-8.32-4.26s.92-3%2C1.46-3.09a1.85%2C1.85%2C0%2C0%2C1%2C2%2C1.06%2C4.68%2C4.68%2C0%2C0%2C0%2C3.86%2C3.29c2.42.24%2C4-.87%2C4.5-2s-.39-2.76-4.11-3.29-7.59-2.17-7.59-5.9%2C4.26-5.22%2C8.32-5.22%2C6.11%2C2.3%2C6.57%2C3.19c.56%2C1.12.37%2C3-1%2C3.29s-2.12-.43-3.14-2.32-4.78-1.45-6-.34-.92%2C2.71%2C4.3%2C3.72%2C7.15%2C2.9%2C7.15%2C5.85S30.3%2C34.72%2C25.27%2C34.72Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
                              </button>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Option 1</a></li>
                                  <li><a class="dropdown-item" href="#">Option 2</a></li>
                              </ul>
                          </div>
                      </div>
                      
                      <!-- Telegram -->
                      <div class="col-12 col-md-6 col-lg-6 d-flex gap-2">
                          <div class="form-floating-label w-100">
                              <input type="text" class="form-control" id="cuTelegram_${sectionCount}" placeholder="Link here" name="cuTelegram_${sectionCount}">
                              <label for="cuTelegram_${sectionCount}">Telegram Username</label>
                          </div>
                          <div class="btn-group">
                              <button type="button" class="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Cg%3E%0A%09%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230088cc%22%2F%3E%0A%09%09%20%20%20%20%3Cpath%20d%3D%22M36%2C10.2%2C9.4%2C22.42c-1.81.87-1.8%2C2.07-.33%2C2.61L15.7%2C27.5l2.53%2C9.27c.31%2C1%2C.16%2C1.41%2C1.05%2C1.41a1.68%2C1.68%2C0%2C0%2C0%2C1.38-.82L24%2C33.52l6.89%2C6.07c1.27.84%2C2.19.4%2C2.5-1.4L37.9%2C12.76C38.36%2C10.55%2C37.19%2C9.54%2C36%2C10.2ZM16.74%2C26.93%2C31.68%2C15.69c.74-.54%2C1.43-.25.86.35L19.75%2C29.8l-.49%2C6.33Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">                                                                    
                              </button>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Option 1</a></li>
                                  <li><a class="dropdown-item" href="#">Option 2</a></li>
                              </ul>
                          </div>
                      </div>

                      <!-- Phone -->
                      <div class="col-12 col-md-6 col-lg-6 d-flex gap-2">
                          <div class="form-floating-label w-100">
                              <input type="text" class="form-control" id="cuPhoneNumber_${sectionCount}" placeholder="Link here" name="cuPhoneNumber_${sectionCount}">
                              <label for="cuPhoneNumber_${sectionCount}">Phone Number</label>
                          </div>
                          <div class="btn-group">
                              <button type="button" class="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%235461f4%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.61%2C31.06h0c-1.14-2.15-4.78-4.33-5.2-4.58a3.37%2C3.37%2C0%2C0%2C0-2.52-.41%2C2.48%2C2.48%2C0%2C0%2C0-1.46%2C1.1c-.47.56-1.06%2C1.23-1.19%2C1.34a1.59%2C1.59%2C0%2C0%2C1-2.42-.25l-6.09-6.08a1.58%2C1.58%2C0%2C0%2C1-.27-2.38c.14-.17.81-.76%2C1.37-1.23a2.48%2C2.48%2C0%2C0%2C0%2C1.1-1.46%2C3.35%2C3.35%2C0%2C0%2C0-.42-2.53c-.24-.41-2.42-4.05-4.57-5.19A3.32%2C3.32%2C0%2C0%2C0%2C15%2C10l-1.34%2C1.34C11.25%2C13.75%2C8.29%2C19%2C15.77%2C26.43l7.8%2C7.8C27.15%2C37.81%2C30.21%2C39%2C32.69%2C39a8.45%2C8.45%2C0%2C0%2C0%2C6-2.68L40%2C35A3.32%2C3.32%2C0%2C0%2C0%2C40.61%2C31.06Z%22%20style%3D%22fill%3A%20%23ffffff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E">                                                                     
                              </button>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Option 1</a></li>
                                  <li><a class="dropdown-item" href="#">Option 2</a></li>
                              </ul>
                          </div>
                      </div>

                      <!-- Whatsapp -->
                      <div class="col-12 col-md-6 col-lg-6 d-flex gap-2">
                          <div class="form-floating-label w-100">
                              <input type="text" class="form-control" id="cuWhatsapp_${sectionCount}" placeholder="Link here" name="cuWhatsapp_${sectionCount}">
                              <label for="cuWhatsapp_${sectionCount}">Whatsapp Phone Number</label>
                          </div>
                          <div class="btn-group">
                              <button type="button" class="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2330bf39%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M39.8%2C23.4A14.64%2C14.64%2C0%2C0%2C1%2C25.1%2C38%2C15.25%2C15.25%2C0%2C0%2C1%2C18%2C36.2L9.8%2C38.8%2C12.5%2C31a14.84%2C14.84%2C0%2C0%2C1-2.1-7.5%2C14.7%2C14.7%2C0%2C0%2C1%2C29.4-.1ZM25.1%2C11.2A12.38%2C12.38%2C0%2C0%2C0%2C12.7%2C23.5a12%2C12%2C0%2C0%2C0%2C2.4%2C7.2l-1.5%2C4.6%2C4.8-1.5A12.44%2C12.44%2C0%2C0%2C0%2C37.6%2C23.5%2C12.53%2C12.53%2C0%2C0%2C0%2C25.1%2C11.2Zm7.4%2C15.6a3.22%2C3.22%2C0%2C0%2C0-.7-.4l-2.5-1.2c-.3-.1-.6-.2-.8.2a8.54%2C8.54%2C0%2C0%2C1-1.1%2C1.4.59.59%2C0%2C0%2C1-.8.1%2C11%2C11%2C0%2C0%2C1-2.9-1.8%2C9.88%2C9.88%2C0%2C0%2C1-2-2.5.46.46%2C0%2C0%2C1%2C.2-.7%2C2.65%2C2.65%2C0%2C0%2C0%2C.5-.6c.2-.2.2-.4.4-.6a.64.64%2C0%2C0%2C0%2C0-.6c-.1-.2-.8-1.9-1.1-2.7s-.6-.6-.8-.6h-.7a1.85%2C1.85%2C0%2C0%2C0-1%2C.4%2C4.16%2C4.16%2C0%2C0%2C0-1.3%2C3%2C6.45%2C6.45%2C0%2C0%2C0%2C1.5%2C3.7c.2.2%2C2.5%2C4%2C6.2%2C5.4s3.7%2C1%2C4.3.9a3.74%2C3.74%2C0%2C0%2C0%2C2.4-1.7A2.82%2C2.82%2C0%2C0%2C0%2C32.5%2C26.8Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">                                                                       
                              </button>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Option 1</a></li>
                                  <li><a class="dropdown-item" href="#">Option 2</a></li>
                              </ul>
                          </div>
                      </div>

                      <!-- Email -->
                      <div class="col-12 col-md-6 col-lg-6 d-flex gap-2">
                          <div class="form-floating-label w-100">
                              <input type="text" class="form-control" id="cuEmail_${sectionCount}" placeholder="Link here" name="cuEmail_${sectionCount}">
                              <label for="cuEmail_${sectionCount}">Email</label>
                          </div>
                          <div class="btn-group">
                              <button type="button" class="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%23fc872b%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M25%2C25.89%2C10%2C13.75H40Zm-6.78-2.28L10%2C17V32.58Zm13.56%2C0%2C8.22%2C9V17Zm-2%2C1.58L25%2C29.11l-4.84-3.92L10%2C36.25H40Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">                                                                        
                              </button>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Option 1</a></li>
                                  <li><a class="dropdown-item" href="#">Option 2</a></li>
                              </ul>
                          </div>
                      </div>

                      <!-- iMessage -->
                      <div class="col-12 col-md-6 col-lg-6 d-flex gap-2">
                          <div class="form-floating-label w-100">
                              <input type="text" class="form-control" id="cuImessages_${sectionCount}" placeholder="Link here" name="cuImessages_${sectionCount}">
                              <label for="cuImessages_${sectionCount}">iMessages Phone Number</label>
                          </div>
                          <div class="btn-group">
                              <button type="button" class="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%0A%09xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%0A%09xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%0A%09xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%0A%09xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%0A%09xmlns%3Asodipodi%3D%22http%3A%2F%2Fsodipodi.sourceforge.net%2FDTD%2Fsodipodi-0.dtd%22%0A%09xmlns%3Ainkscape%3D%22http%3A%2F%2Fwww.inkscape.org%2Fnamespaces%2Finkscape%22%0A%09width%3D%221024px%22%0A%09height%3D%221024px%22%0A%09viewBox%3D%220%200%2066.145836%2066.145836%22%0A%09version%3D%221.1%22%0A%09id%3D%22svg8%22%0A%09inkscape%3Aversion%3D%220.92.2%20(5c3e80d%2C%202017-08-06)%22%0A%09sodipodi%3Adocname%3D%22iMessage%20logo.svg%22%3E%0A%09%3Ctitle%0A%09%09id%3D%22title907%22%3EiMessage%20logo%3C%2Ftitle%3E%0A%09%3Cdefs%0A%09%09id%3D%22defs2%22%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09id%3D%22linearGradient899%22%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%220%22%0A%09%09%09%09id%3D%22stop895%22%2F%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%221%22%0A%09%09%09%09id%3D%22stop897%22%2F%3E%0A%09%09%3C%2FlinearGradient%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09xlink%3Ahref%3D%22%23linearGradient899%22%0A%09%09%09id%3D%22linearGradient901%22%0A%09%09%09x1%3D%22-25.272568%22%0A%09%09%09y1%3D%22207.52057%22%0A%09%09%09x2%3D%22-25.272568%22%0A%09%09%09y2%3D%22152.9982%22%0A%09%09%09gradientUnits%3D%22userSpaceOnUse%22%0A%09%09%09gradientTransform%3D%22matrix(0.98209275%2C0%2C0%2C0.98209275%2C-1.0651782%2C3.7961838)%22%2F%3E%0A%09%3C%2Fdefs%3E%0A%09%3Csodipodi%3Anamedview%0A%09%09id%3D%22base%22%0A%09%09pagecolor%3D%22%23ffffff%22%0A%09%09bordercolor%3D%22%23666666%22%0A%09%09borderopacity%3D%221.0%22%0A%09%09inkscape%3Apageopacity%3D%220.0%22%0A%09%09inkscape%3Apageshadow%3D%222%22%0A%09%09inkscape%3Azoom%3D%221%22%0A%09%09inkscape%3Acx%3D%22142.01984%22%0A%09%09inkscape%3Acy%3D%2261.975439%22%0A%09%09inkscape%3Adocument-units%3D%22px%22%0A%09%09inkscape%3Acurrent-layer%3D%22layer1%22%0A%09%09showgrid%3D%22false%22%0A%09%09inkscape%3Asnap-object-midpoints%3D%22false%22%0A%09%09showguides%3D%22true%22%0A%09%09inkscape%3Aguide-bbox%3D%22true%22%0A%09%09inkscape%3Asnap-intersection-paths%3D%22false%22%0A%09%09inkscape%3Awindow-width%3D%221920%22%0A%09%09inkscape%3Awindow-height%3D%221017%22%0A%09%09inkscape%3Awindow-x%3D%221358%22%0A%09%09inkscape%3Awindow-y%3D%22-8%22%0A%09%09inkscape%3Awindow-maximized%3D%221%22%0A%09%09fit-margin-top%3D%220%22%0A%09%09fit-margin-left%3D%220%22%0A%09%09fit-margin-right%3D%220%22%0A%09%09fit-margin-bottom%3D%220%22%2F%3E%0A%09%3Cmetadata%0A%09%09id%3D%22metadata5%22%3E%0A%09%09%3Crdf%3ARDF%3E%0A%09%09%09%3Ccc%3AWork%0A%09%09%09%09rdf%3Aabout%3D%22%22%3E%0A%09%09%09%09%3Cdc%3Aformat%3Eimage%2Fsvg%2Bxml%3C%2Fdc%3Aformat%3E%0A%09%09%09%09%3Cdc%3Atype%0A%09%09%09%09%09rdf%3Aresource%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2FStillImage%22%2F%3E%0A%09%09%09%09%3Cdc%3Atitle%3EiMessage%20logo%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%3Cdc%3Adate%3E02%2F04%2F2018%3C%2Fdc%3Adate%3E%0A%09%09%09%09%3Cdc%3Acreator%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3EApple%2C%20Inc.%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Acreator%3E%0A%09%09%09%09%3Cdc%3Apublisher%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3ECMetalCore%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Apublisher%3E%0A%09%09%09%09%3Cdc%3Asource%3Ehttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F85%2FIMessage_icon.png%3C%2Fdc%3Asource%3E%0A%09%09%09%3C%2Fcc%3AWork%3E%0A%09%09%3C%2Frdf%3ARDF%3E%0A%09%3C%2Fmetadata%3E%0A%09%3Cg%0A%09%09inkscape%3Alabel%3D%22Capa%201%22%0A%09%09inkscape%3Agroupmode%3D%22layer%22%0A%09%09id%3D%22layer1%22%0A%09%09transform%3D%22translate(59.483067%2C-145.8456)%22%3E%0A%09%09%3Cg%0A%09%09%09id%3D%22g963%22%3E%0A%09%09%09%3Crect%0A%09%09%09%09ry%3D%2214.567832%22%0A%09%09%09%09rx%3D%2214.567832%22%0A%09%09%09%09y%3D%22145.8456%22%0A%09%09%09%09x%3D%22-59.483067%22%0A%09%09%09%09height%3D%2266.145836%22%0A%09%09%09%09width%3D%2266.145836%22%0A%09%09%09%09id%3D%22rect826%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3Aurl(%23linearGradient901)%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.33634758%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09inkscape%3Aconnector-curvature%3D%220%22%0A%09%09%09%09id%3D%22path922%22%0A%09%09%09%09d%3D%22m%20-26.410149%2C157.29606%20a%2024.278298%2C20.222157%200%200%200%20-24.278105%2C20.22202%2024.278298%2C20.222157%200%200%200%2011.79463%2C17.31574%2027.365264%2C20.222157%200%200%201%20-4.245218%2C5.94228%2023.85735%2C20.222157%200%200%200%209.86038%2C-3.87367%2024.278298%2C20.222157%200%200%200%206.868313%2C0.83768%2024.278298%2C20.222157%200%200%200%2024.2781059%2C-20.22203%2024.278298%2C20.222157%200%200%200%20-24.2781059%2C-20.22202%20z%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3A%23ffffff%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.56409621%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">                                                                       
                              </button>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Option 1</a></li>
                                  <li><a class="dropdown-item" href="#">Option 2</a></li>
                              </ul>
                          </div>
                      </div>

                      <!-- Weibo -->
                      <div class="col-12 col-md-6 col-lg-6 d-flex gap-2">
                          <div class="form-floating-label w-100">
                              <input type="text" class="form-control" id="cuWeibo_${sectionCount}" placeholder="Link here" name="cuWeibo_${sectionCount}">
                              <label for="cuWeibo_${sectionCount}">Weibo user ID</label>
                          </div>
                          <div class="btn-group">
                              <button type="button" class="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221024%22%20height%3D%221024%22%20viewBox%3D%220%200%20300%20300%22%3E%0A%09%3Cg%3E%0A%09%09%3Ccircle%20cx%3D%22150%22%20cy%3D%22150%22%20r%3D%22150%22%20style%3D%22fill%3A%20%23f5f5f5%22%2F%3E%0A%09%09%3Cg%20transform%3D%22matrix(3.5%200%200%203.5%2070%2060)%22%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M50.448%2012.132c.217%202.814-.259%206.186-2.117%206.351-3.033.271-1.451-3.07-1.411-5.081.111-5.829-4.865-9.879-9.739-9.879-1.381%200-4.588.936-4.094-1.976.222-1.284%201.31-1.266%202.399-1.411%208.197-1.093%2014.386%204.546%2014.962%2011.996z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23D52A2C%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M37.04%2018.907c3.524%201.928%207.758%202.888%207.056%208.61-.168%201.371-.998%203.203-1.834%204.373-5.957%208.339-23.924%2011.844-35.144%205.506C3.355%2035.269-.539%2032.159.062%2025.962c.517-5.333%204.103-9.464%207.622-12.983%203.357-3.359%206.897-5.987%2011.714-7.198%205.226-1.314%206.771%203.043%205.363%207.339%203.027-.203%209.442-3.582%2012.279-.282%201.25%201.454.771%204.058%200%206.069zm-3.811%2013.548c1.129-1.28%202.264-3.231%202.257-5.503-.015-7.014-8.851-9.605-15.806-9.033-3.804.312-6.363%201.115-9.033%202.682-2.179%201.279-4.729%203.36-5.363%206.491-1.427%207.041%206.231%2010.35%2011.855%2010.726%206.498.437%2013.002-1.857%2016.09-5.363z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M43.531%2012.132c.296%202.149-.319%204.011-1.552%204.093-2.056.137-1.287-1.408-1.412-3.246-.078-1.132-1.016-2.439-1.835-2.823-1.606-.752-4.093.548-4.093-1.693%200-1.664%201.443-1.491%202.259-1.553%203.574-.272%206.216%202.191%206.633%205.222z%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M27.019%2026.246c3.007%209.088-12.66%2013.314-15.525%205.504-1.917-5.223%202.686-9.377%207.48-9.879%204.093-.429%207.144%201.658%208.045%204.375zm-7.198%201.553c.638%201.104%202.105.311%201.976-.564-.154-1.013-1.989-.863-1.976.564zm-2.541%204.799c2.634-.627%202.988-5.588-.988-4.658-3.34.78-2.694%205.533.988%204.658z%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
                              </button>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Option 1</a></li>
                                  <li><a class="dropdown-item" href="#">Option 2</a></li>
                              </ul>
                          </div>
                      </div>

                      <!-- Viber -->
                      <div class="col-12 col-md-6 col-lg-6 d-flex gap-2">
                          <div class="form-floating-label w-100">
                              <input type="text" class="form-control" id="cuViber_${sectionCount}" placeholder="Link here" name="cuViber_${sectionCount}">
                              <label for="cuViber_${sectionCount}">Viber Phone Number</label>
                          </div>
                          <div class="btn-group">
                              <button type="button" class="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20version%3D%221.0%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000000%22%0A%20width%3D%2250.000000pt%22%20height%3D%2250.000000pt%22%20viewBox%3D%220%200%2050.000000%2050.000000%22%0A%20preserveAspectRatio%3D%22xMidYMid%20meet%22%3E%0A%0A%3Ccircle%20cx%3D%2220pt%22%20cy%3D%2220pt%22%20r%3D%2216pt%22%20fill%3D%22%23fff%22%3E%3C%2Fcircle%3E%0A%3Cg%20transform%3D%22translate(0.000000%2C50.000000)%20scale(0.100000%2C-0.100000)%22%0Afill%3D%22blue%22%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M167%20484%20c-92%20-28%20-167%20-134%20-167%20-234%200%20-131%20119%20-250%20250%20-250%20129%0A0%20250%20121%20250%20250%200%20100%20-78%20207%20-172%20235%20-63%2018%20-98%2018%20-161%20-1z%20m198%20-86%0Ac34%20-27%2055%20-75%2055%20-128%200%20-94%20-54%20-150%20-144%20-150%20-37%200%20-56%20-6%20-72%20-21%20-25%0A-23%20-44%20-18%20-44%2010%200%2010%20-12%2026%20-26%2036%20-72%2047%20-71%20196%201%20253%2024%2019%2041%2022%20115%0A22%2074%200%2091%20-3%20115%20-22z%22%2F%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M185%20383%20c-11%20-3%20-30%20-14%20-42%20-26%20-19%20-17%20-23%20-31%20-23%20-85%200%20-57%203%0A-66%2030%20-94%2018%20-18%2030%20-40%2030%20-56%20l0%20-26%2028%2026%20c18%2018%2043%2028%2080%2033%2071%209%2092%2036%0A92%20120%200%2084%20-22%20106%20-112%20111%20-35%201%20-72%200%20-83%20-3z%20m112%20-38%20c24%20-17%2047%20-72%2032%0A-80%20-5%20-4%20-9%204%20-10%2017%200%2021%20-1%2021%20-8%204%20-7%20-19%20-8%20-19%20-13%202%20-4%2012%20-14%2025%20-25%0A29%20-18%207%20-33%2022%20-33%2036%200%2012%2034%208%2057%20-8z%20m-83%20-17%20c11%20-15%2012%20-25%205%20-34%20-21%0A-26%2030%20-75%2056%20-54%209%207%2019%205%2036%20-9%2023%20-19%2023%20-21%207%20-37%20-14%20-15%20-21%20-15%20-47%20-4%0A-35%2014%20-96%2077%20-106%20109%20-6%2021%209%2051%2026%2051%204%200%2015%20-10%2023%20-22z%20m71%20-29%20c11%20-17%0A-1%20-21%20-15%20-4%20-8%209%20-8%2015%20-2%2015%206%200%2014%20-5%2017%20-11z%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">                                                                     
                              </button>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Option 1</a></li>
                                  <li><a class="dropdown-item" href="#">Option 2</a></li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
                    `;
    $('#manager-list').append(newItem);
    updateContactUsSection();
  }

  $('#cu_addMgrItem').click(addContactItem);

  function updateWidgetSection(behaviorType, firstMgrUsed) {
    if (behaviorType === "support-managers") {
      if (firstMgrUsed) {
        $('#firstManagerChatHeaderArea .sm-selected-manager').html(`
            <div class="sm-manager sm-manager-header">
                <div class="sm-avatar">
                </div>
                <div class="sm-info">
                    <div class="sm-name">${$('#cuManagerName_1').val()}</div>
                    <div class="sm-role">${$('#cuRoles_1').val()}</div>
                </div>
            </div>
            `);
        setTimeout(function () { $('#firstManagerChatHeaderArea .sm-selected-manager').find('.sm-avatar').css('background-image', `url(${$('#cuCoverImage_1').attr('src')})`); }, 200);
      }
      else {
        $('#firstManagerChatHeaderArea .sm-selected-manager').html(`
            <div class="sm-chat-back" style="rotate: 180deg;">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2225%22%20height%3D%2225%22%20viewBox%3D%220%200%2025%2025%22%3E%0A%09%3Cpath%20style%3D%22fill%3A%20%23fff%22%0A%09%20%20%20%20%20%20d%3D%22M19.45%2C11.52%2C8.32.4a1.36%2C1.36%2C0%2C0%2C0-1-.4%2C1.33%2C1.33%2C0%2C0%2C0-1%2C.4l-.82.82a1.35%2C1.35%2C0%2C0%2C0%2C0%2C1.93l9.34%2C9.34L5.56%2C21.85a1.45%2C1.45%2C0%2C0%2C0%2C0%2C2l.82.82a1.33%2C1.33%2C0%2C0%2C0%2C1%2C.4%2C1.36%2C1.36%2C0%2C0%2C0%2C1-.4l11.07-11.2a1.4%2C1.4%2C0%2C0%2C0%2C0-2l0%2C0Z%22%2F%3E%0A%3C%2Fsvg%3E">
            </div>
            <div class="sm-manager sm-manager-header">
                <div class="sm-info">
                    <div class="sm-name">--------</div>
                    <div class="sm-role">--------</div>
                </div>
                <div class="sm-avatar">
                </div>
            </div>
        `);
      }
    }

    if (behaviorType === "support-managers") {
      if (firstMgrUsed) {
        $('#firstManagerChatBody .message-author').html($('#cuManagerName_1').val());
        $('#firstManagerChatBody .message-text').html($('#cuInitialWords_1').val());
        updateContactFooterIcon(1);
      }
      else {
        $('#selectedManagerChatBody').empty();

        $('#manager-list').find('.manager-item').each(function (index) {
          let idx = index + 1;
          let newItem = $(`
            <div class="sm-manager" data-id="${index + 1}">
                        <div class="sm-avatar">
                        </div>
                        <div class="sm-info">
                            <div class="sm-role">${$('#cuRoles_' + idx).val()}</div>
                            <div class="sm-name">${$('#cuManagerName_' + idx).val()}</div>
                            <div class="sm-caption">${$('#cuCaption_' + idx).val()}</div>
                            <div class="sm-contact"></div>                          
                        </div>
                    </div>
            `);
          setTimeout(function () { newItem.find('.sm-avatar').css('background-image', `url(${$('#cuCoverImage_' + idx).attr('src')})`); }, 200);

          $('#selectedManagerChatBody').append(newItem);

          if ($('#cuFacebook_' + idx).val()) {
            newItem.find('.sm-contact').append(`
                  <span class="cu-manager-chat-button">
                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Ctitle%3EFacebook%20Messenger%3C%2Ftitle%3E%0A%09%09%3Cg%3E%0A%09%09%09%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230084ff%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M25%2C10c-8.29%2C0-15%2C6.22-15%2C13.89A13.5%2C13.5%2C0%2C0%2C0%2C15.59%2C34.7V40l5.11-2.8a16.45%2C16.45%2C0%2C0%2C0%2C4.3.58c8.28%2C0%2C15-6.22%2C15-13.89S33.28%2C10%2C25%2C10Zm1.49%2C18.7-3.82-4.07L15.22%2C28.7l8.2-8.7%2C3.91%2C4.07L34.69%2C20Z%22%0A%09%09%09%09style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A"></img>
                  </span>
              `);
          }
          if ($('#cuSkype_' + idx).val()) {
            newItem.find('.sm-contact').append(`
                  <span class="cu-manager-chat-button">
                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%20%20%3Cg%3E%0A%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2315ace5%22%2F%3E%0A%09%20%20%20%20%3Cpath%20d%3D%22M38.89%2C27.72A14.34%2C14.34%2C0%2C0%2C0%2C39.15%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C10.85a14.34%2C14.34%2C0%2C0%2C0-2.72.26A8.17%2C8.17%2C0%2C0%2C0%2C11.11%2C22.28%2C14.34%2C14.34%2C0%2C0%2C0%2C10.85%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C39.15a14.34%2C14.34%2C0%2C0%2C0%2C2.72-.26A8.17%2C8.17%2C0%2C0%2C0%2C38.89%2C27.72Zm-13.62%2C7c-5%2C0-7.54-1.89-8.32-4.26s.92-3%2C1.46-3.09a1.85%2C1.85%2C0%2C0%2C1%2C2%2C1.06%2C4.68%2C4.68%2C0%2C0%2C0%2C3.86%2C3.29c2.42.24%2C4-.87%2C4.5-2s-.39-2.76-4.11-3.29-7.59-2.17-7.59-5.9%2C4.26-5.22%2C8.32-5.22%2C6.11%2C2.3%2C6.57%2C3.19c.56%2C1.12.37%2C3-1%2C3.29s-2.12-.43-3.14-2.32-4.78-1.45-6-.34-.92%2C2.71%2C4.3%2C3.72%2C7.15%2C2.9%2C7.15%2C5.85S30.3%2C34.72%2C25.27%2C34.72Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A"></img>
                  </span>
              `);
          }
          if ($('#cuTelegram_' + idx).val()) {
            newItem.find('.sm-contact').append(`
                  <span class="cu-manager-chat-button">
                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Cg%3E%0A%09%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230088cc%22%2F%3E%0A%09%09%20%20%20%20%3Cpath%20d%3D%22M36%2C10.2%2C9.4%2C22.42c-1.81.87-1.8%2C2.07-.33%2C2.61L15.7%2C27.5l2.53%2C9.27c.31%2C1%2C.16%2C1.41%2C1.05%2C1.41a1.68%2C1.68%2C0%2C0%2C0%2C1.38-.82L24%2C33.52l6.89%2C6.07c1.27.84%2C2.19.4%2C2.5-1.4L37.9%2C12.76C38.36%2C10.55%2C37.19%2C9.54%2C36%2C10.2ZM16.74%2C26.93%2C31.68%2C15.69c.74-.54%2C1.43-.25.86.35L19.75%2C29.8l-.49%2C6.33Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A"></img>
                  </span>
              `);
          }
          if ($('#cuInstagram_' + idx).val()) {
            newItem.find('.sm-contact').append(`
                  <span class="cu-manager-chat-button">
                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%09%3ClinearGradient%20id%3D%22SVGID_1_%22%20gradientTransform%3D%22matrix(0%20-1.982%20-1.844%200%20-132.522%20-51.077)%22%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-37.106%22%20x2%3D%22-26.555%22%20y1%3D%22-72.705%22%20y2%3D%22-84.047%22%3E%0A%09%09%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fd5%22%2F%3E%0A%09%09%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%23ff543e%22%2F%3E%0A%09%09%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c837ab%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%0A%09%09d%3D%22m1.5%201.633c-1.886%201.959-1.5%204.04-1.5%2010.362%200%205.25-.916%2010.513%203.878%2011.752%201.497.385%2014.761.385%2016.256-.002%201.996-.515%203.62-2.134%203.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41%201.633z%22%0A%09%09fill%3D%22url(%23SVGID_1_)%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22m11.998%203.139c-3.631%200-7.079-.323-8.396%203.057-.544%201.396-.465%203.209-.465%205.805%200%202.278-.073%204.419.465%205.804%201.314%203.382%204.79%203.058%208.394%203.058%203.477%200%207.062.362%208.395-3.058.545-1.41.465-3.196.465-5.804%200-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794%201.597c7.574-.012%208.538-.854%208.006%2010.843-.189%204.137-3.339%203.683-7.211%203.683-7.06%200-7.263-.202-7.263-7.265%200-7.145.56-7.257%206.468-7.263zm5.524%201.471c-.587%200-1.063.476-1.063%201.063s.476%201.063%201.063%201.063%201.063-.476%201.063-1.063-.476-1.063-1.063-1.063zm-4.73%201.243c-2.513%200-4.55%202.038-4.55%204.551s2.037%204.55%204.55%204.55%204.549-2.037%204.549-4.55-2.036-4.551-4.549-4.551zm0%201.597c3.905%200%203.91%205.908%200%205.908-3.904%200-3.91-5.908%200-5.908z%22%0A%09%09fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E"></img>
                  </span>
              `);
          }
          if ($('#cuPhoneNumber_' + idx).val()) {
            newItem.find('.sm-contact').append(`
                  <span class="cu-manager-chat-button">
                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%235461f4%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.61%2C31.06h0c-1.14-2.15-4.78-4.33-5.2-4.58a3.37%2C3.37%2C0%2C0%2C0-2.52-.41%2C2.48%2C2.48%2C0%2C0%2C0-1.46%2C1.1c-.47.56-1.06%2C1.23-1.19%2C1.34a1.59%2C1.59%2C0%2C0%2C1-2.42-.25l-6.09-6.08a1.58%2C1.58%2C0%2C0%2C1-.27-2.38c.14-.17.81-.76%2C1.37-1.23a2.48%2C2.48%2C0%2C0%2C0%2C1.1-1.46%2C3.35%2C3.35%2C0%2C0%2C0-.42-2.53c-.24-.41-2.42-4.05-4.57-5.19A3.32%2C3.32%2C0%2C0%2C0%2C15%2C10l-1.34%2C1.34C11.25%2C13.75%2C8.29%2C19%2C15.77%2C26.43l7.8%2C7.8C27.15%2C37.81%2C30.21%2C39%2C32.69%2C39a8.45%2C8.45%2C0%2C0%2C0%2C6-2.68L40%2C35A3.32%2C3.32%2C0%2C0%2C0%2C40.61%2C31.06Z%22%20style%3D%22fill%3A%20%23ffffff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"></img>
                  </span>
              `);
          }
          if ($('#cuWhatsapp_' + idx).val()) {
            newItem.find('.sm-contact').append(`
                  <span class="cu-manager-chat-button">
                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2330bf39%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M39.8%2C23.4A14.64%2C14.64%2C0%2C0%2C1%2C25.1%2C38%2C15.25%2C15.25%2C0%2C0%2C1%2C18%2C36.2L9.8%2C38.8%2C12.5%2C31a14.84%2C14.84%2C0%2C0%2C1-2.1-7.5%2C14.7%2C14.7%2C0%2C0%2C1%2C29.4-.1ZM25.1%2C11.2A12.38%2C12.38%2C0%2C0%2C0%2C12.7%2C23.5a12%2C12%2C0%2C0%2C0%2C2.4%2C7.2l-1.5%2C4.6%2C4.8-1.5A12.44%2C12.44%2C0%2C0%2C0%2C37.6%2C23.5%2C12.53%2C12.53%2C0%2C0%2C0%2C25.1%2C11.2Zm7.4%2C15.6a3.22%2C3.22%2C0%2C0%2C0-.7-.4l-2.5-1.2c-.3-.1-.6-.2-.8.2a8.54%2C8.54%2C0%2C0%2C1-1.1%2C1.4.59.59%2C0%2C0%2C1-.8.1%2C11%2C11%2C0%2C0%2C1-2.9-1.8%2C9.88%2C9.88%2C0%2C0%2C1-2-2.5.46.46%2C0%2C0%2C1%2C.2-.7%2C2.65%2C2.65%2C0%2C0%2C0%2C.5-.6c.2-.2.2-.4.4-.6a.64.64%2C0%2C0%2C0%2C0-.6c-.1-.2-.8-1.9-1.1-2.7s-.6-.6-.8-.6h-.7a1.85%2C1.85%2C0%2C0%2C0-1%2C.4%2C4.16%2C4.16%2C0%2C0%2C0-1.3%2C3%2C6.45%2C6.45%2C0%2C0%2C0%2C1.5%2C3.7c.2.2%2C2.5%2C4%2C6.2%2C5.4s3.7%2C1%2C4.3.9a3.74%2C3.74%2C0%2C0%2C0%2C2.4-1.7A2.82%2C2.82%2C0%2C0%2C0%2C32.5%2C26.8Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A"></img>
                  </span>
              `);
          }
          if ($('#cuEmail_' + idx).val()) {
            newItem.find('.sm-contact').append(`
                  <span class="cu-manager-chat-button">
                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%23fc872b%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M25%2C25.89%2C10%2C13.75H40Zm-6.78-2.28L10%2C17V32.58Zm13.56%2C0%2C8.22%2C9V17Zm-2%2C1.58L25%2C29.11l-4.84-3.92L10%2C36.25H40Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A"></img>
                  </span>
              `);
          }
          if ($('#cuImessages_' + idx).val()) {
            newItem.find('.sm-contact').append(`
                  <span class="cu-manager-chat-button">
                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%0A%09xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%0A%09xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%0A%09xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%0A%09xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%0A%09xmlns%3Asodipodi%3D%22http%3A%2F%2Fsodipodi.sourceforge.net%2FDTD%2Fsodipodi-0.dtd%22%0A%09xmlns%3Ainkscape%3D%22http%3A%2F%2Fwww.inkscape.org%2Fnamespaces%2Finkscape%22%0A%09width%3D%221024px%22%0A%09height%3D%221024px%22%0A%09viewBox%3D%220%200%2066.145836%2066.145836%22%0A%09version%3D%221.1%22%0A%09id%3D%22svg8%22%0A%09inkscape%3Aversion%3D%220.92.2%20(5c3e80d%2C%202017-08-06)%22%0A%09sodipodi%3Adocname%3D%22iMessage%20logo.svg%22%3E%0A%09%3Ctitle%0A%09%09id%3D%22title907%22%3EiMessage%20logo%3C%2Ftitle%3E%0A%09%3Cdefs%0A%09%09id%3D%22defs2%22%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09id%3D%22linearGradient899%22%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%220%22%0A%09%09%09%09id%3D%22stop895%22%2F%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%221%22%0A%09%09%09%09id%3D%22stop897%22%2F%3E%0A%09%09%3C%2FlinearGradient%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09xlink%3Ahref%3D%22%23linearGradient899%22%0A%09%09%09id%3D%22linearGradient901%22%0A%09%09%09x1%3D%22-25.272568%22%0A%09%09%09y1%3D%22207.52057%22%0A%09%09%09x2%3D%22-25.272568%22%0A%09%09%09y2%3D%22152.9982%22%0A%09%09%09gradientUnits%3D%22userSpaceOnUse%22%0A%09%09%09gradientTransform%3D%22matrix(0.98209275%2C0%2C0%2C0.98209275%2C-1.0651782%2C3.7961838)%22%2F%3E%0A%09%3C%2Fdefs%3E%0A%09%3Csodipodi%3Anamedview%0A%09%09id%3D%22base%22%0A%09%09pagecolor%3D%22%23ffffff%22%0A%09%09bordercolor%3D%22%23666666%22%0A%09%09borderopacity%3D%221.0%22%0A%09%09inkscape%3Apageopacity%3D%220.0%22%0A%09%09inkscape%3Apageshadow%3D%222%22%0A%09%09inkscape%3Azoom%3D%221%22%0A%09%09inkscape%3Acx%3D%22142.01984%22%0A%09%09inkscape%3Acy%3D%2261.975439%22%0A%09%09inkscape%3Adocument-units%3D%22px%22%0A%09%09inkscape%3Acurrent-layer%3D%22layer1%22%0A%09%09showgrid%3D%22false%22%0A%09%09inkscape%3Asnap-object-midpoints%3D%22false%22%0A%09%09showguides%3D%22true%22%0A%09%09inkscape%3Aguide-bbox%3D%22true%22%0A%09%09inkscape%3Asnap-intersection-paths%3D%22false%22%0A%09%09inkscape%3Awindow-width%3D%221920%22%0A%09%09inkscape%3Awindow-height%3D%221017%22%0A%09%09inkscape%3Awindow-x%3D%221358%22%0A%09%09inkscape%3Awindow-y%3D%22-8%22%0A%09%09inkscape%3Awindow-maximized%3D%221%22%0A%09%09fit-margin-top%3D%220%22%0A%09%09fit-margin-left%3D%220%22%0A%09%09fit-margin-right%3D%220%22%0A%09%09fit-margin-bottom%3D%220%22%2F%3E%0A%09%3Cmetadata%0A%09%09id%3D%22metadata5%22%3E%0A%09%09%3Crdf%3ARDF%3E%0A%09%09%09%3Ccc%3AWork%0A%09%09%09%09rdf%3Aabout%3D%22%22%3E%0A%09%09%09%09%3Cdc%3Aformat%3Eimage%2Fsvg%2Bxml%3C%2Fdc%3Aformat%3E%0A%09%09%09%09%3Cdc%3Atype%0A%09%09%09%09%09rdf%3Aresource%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2FStillImage%22%2F%3E%0A%09%09%09%09%3Cdc%3Atitle%3EiMessage%20logo%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%3Cdc%3Adate%3E02%2F04%2F2018%3C%2Fdc%3Adate%3E%0A%09%09%09%09%3Cdc%3Acreator%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3EApple%2C%20Inc.%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Acreator%3E%0A%09%09%09%09%3Cdc%3Apublisher%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3ECMetalCore%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Apublisher%3E%0A%09%09%09%09%3Cdc%3Asource%3Ehttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F85%2FIMessage_icon.png%3C%2Fdc%3Asource%3E%0A%09%09%09%3C%2Fcc%3AWork%3E%0A%09%09%3C%2Frdf%3ARDF%3E%0A%09%3C%2Fmetadata%3E%0A%09%3Cg%0A%09%09inkscape%3Alabel%3D%22Capa%201%22%0A%09%09inkscape%3Agroupmode%3D%22layer%22%0A%09%09id%3D%22layer1%22%0A%09%09transform%3D%22translate(59.483067%2C-145.8456)%22%3E%0A%09%09%3Cg%0A%09%09%09id%3D%22g963%22%3E%0A%09%09%09%3Crect%0A%09%09%09%09ry%3D%2214.567832%22%0A%09%09%09%09rx%3D%2214.567832%22%0A%09%09%09%09y%3D%22145.8456%22%0A%09%09%09%09x%3D%22-59.483067%22%0A%09%09%09%09height%3D%2266.145836%22%0A%09%09%09%09width%3D%2266.145836%22%0A%09%09%09%09id%3D%22rect826%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3Aurl(%23linearGradient901)%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.33634758%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09inkscape%3Aconnector-curvature%3D%220%22%0A%09%09%09%09id%3D%22path922%22%0A%09%09%09%09d%3D%22m%20-26.410149%2C157.29606%20a%2024.278298%2C20.222157%200%200%200%20-24.278105%2C20.22202%2024.278298%2C20.222157%200%200%200%2011.79463%2C17.31574%2027.365264%2C20.222157%200%200%201%20-4.245218%2C5.94228%2023.85735%2C20.222157%200%200%200%209.86038%2C-3.87367%2024.278298%2C20.222157%200%200%200%206.868313%2C0.83768%2024.278298%2C20.222157%200%200%200%2024.2781059%2C-20.22203%2024.278298%2C20.222157%200%200%200%20-24.2781059%2C-20.22202%20z%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3A%23ffffff%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.56409621%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A"></img>
                  </span>
              `);
          }
          if ($('#cuWeibo_' + idx).val()) {
            newItem.find('.sm-contact').append(`
                  <span class="cu-manager-chat-button">
                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221024%22%20height%3D%221024%22%20viewBox%3D%220%200%20300%20300%22%3E%0A%09%3Cg%3E%0A%09%09%3Ccircle%20cx%3D%22150%22%20cy%3D%22150%22%20r%3D%22150%22%20style%3D%22fill%3A%20%23f5f5f5%22%2F%3E%0A%09%09%3Cg%20transform%3D%22matrix(3.5%200%200%203.5%2070%2060)%22%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M50.448%2012.132c.217%202.814-.259%206.186-2.117%206.351-3.033.271-1.451-3.07-1.411-5.081.111-5.829-4.865-9.879-9.739-9.879-1.381%200-4.588.936-4.094-1.976.222-1.284%201.31-1.266%202.399-1.411%208.197-1.093%2014.386%204.546%2014.962%2011.996z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23D52A2C%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M37.04%2018.907c3.524%201.928%207.758%202.888%207.056%208.61-.168%201.371-.998%203.203-1.834%204.373-5.957%208.339-23.924%2011.844-35.144%205.506C3.355%2035.269-.539%2032.159.062%2025.962c.517-5.333%204.103-9.464%207.622-12.983%203.357-3.359%206.897-5.987%2011.714-7.198%205.226-1.314%206.771%203.043%205.363%207.339%203.027-.203%209.442-3.582%2012.279-.282%201.25%201.454.771%204.058%200%206.069zm-3.811%2013.548c1.129-1.28%202.264-3.231%202.257-5.503-.015-7.014-8.851-9.605-15.806-9.033-3.804.312-6.363%201.115-9.033%202.682-2.179%201.279-4.729%203.36-5.363%206.491-1.427%207.041%206.231%2010.35%2011.855%2010.726%206.498.437%2013.002-1.857%2016.09-5.363z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M43.531%2012.132c.296%202.149-.319%204.011-1.552%204.093-2.056.137-1.287-1.408-1.412-3.246-.078-1.132-1.016-2.439-1.835-2.823-1.606-.752-4.093.548-4.093-1.693%200-1.664%201.443-1.491%202.259-1.553%203.574-.272%206.216%202.191%206.633%205.222z%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M27.019%2026.246c3.007%209.088-12.66%2013.314-15.525%205.504-1.917-5.223%202.686-9.377%207.48-9.879%204.093-.429%207.144%201.658%208.045%204.375zm-7.198%201.553c.638%201.104%202.105.311%201.976-.564-.154-1.013-1.989-.863-1.976.564zm-2.541%204.799c2.634-.627%202.988-5.588-.988-4.658-3.34.78-2.694%205.533.988%204.658z%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
                  </span>
              `);
          }
          if ($('#cuViber_' + idx).val()) {
            newItem.find('.sm-contact').append(`
                  <span class="cu-manager-chat-button">
                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20version%3D%221.0%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000000%22%0A%20width%3D%2250.000000pt%22%20height%3D%2250.000000pt%22%20viewBox%3D%220%200%2050.000000%2050.000000%22%0A%20preserveAspectRatio%3D%22xMidYMid%20meet%22%3E%0A%0A%3Ccircle%20cx%3D%2220pt%22%20cy%3D%2220pt%22%20r%3D%2216pt%22%20fill%3D%22%23fff%22%3E%3C%2Fcircle%3E%0A%3Cg%20transform%3D%22translate(0.000000%2C50.000000)%20scale(0.100000%2C-0.100000)%22%0Afill%3D%22blue%22%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M167%20484%20c-92%20-28%20-167%20-134%20-167%20-234%200%20-131%20119%20-250%20250%20-250%20129%0A0%20250%20121%20250%20250%200%20100%20-78%20207%20-172%20235%20-63%2018%20-98%2018%20-161%20-1z%20m198%20-86%0Ac34%20-27%2055%20-75%2055%20-128%200%20-94%20-54%20-150%20-144%20-150%20-37%200%20-56%20-6%20-72%20-21%20-25%0A-23%20-44%20-18%20-44%2010%200%2010%20-12%2026%20-26%2036%20-72%2047%20-71%20196%201%20253%2024%2019%2041%2022%20115%0A22%2074%200%2091%20-3%20115%20-22z%22%2F%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M185%20383%20c-11%20-3%20-30%20-14%20-42%20-26%20-19%20-17%20-23%20-31%20-23%20-85%200%20-57%203%0A-66%2030%20-94%2018%20-18%2030%20-40%2030%20-56%20l0%20-26%2028%2026%20c18%2018%2043%2028%2080%2033%2071%209%2092%2036%0A92%20120%200%2084%20-22%20106%20-112%20111%20-35%201%20-72%200%20-83%20-3z%20m112%20-38%20c24%20-17%2047%20-72%2032%0A-80%20-5%20-4%20-9%204%20-10%2017%200%2021%20-1%2021%20-8%204%20-7%20-19%20-8%20-19%20-13%202%20-4%2012%20-14%2025%20-25%0A29%20-18%207%20-33%2022%20-33%2036%200%2012%2034%208%2057%20-8z%20m-83%20-17%20c11%20-15%2012%20-25%205%20-34%20-21%0A-26%2030%20-75%2056%20-54%209%207%2019%205%2036%20-9%2023%20-19%2023%20-21%207%20-37%20-14%20-15%20-21%20-15%20-47%20-4%0A-35%2014%20-96%2077%20-106%20109%20-6%2021%209%2051%2026%2051%204%200%2015%20-10%2023%20-22z%20m71%20-29%20c11%20-17%0A-1%20-21%20-15%20-4%20-8%209%20-8%2015%20-2%2015%206%200%2014%20-5%2017%20-11z%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
                  </span>
              `);
          }
        });
      }
    }
  }

  function updateContactFooterIcon(index) {
    let contact = $('#firstManagerChatFooter .cu-manager-footer-chat-buttons-wrapper');
    contact.empty();
    if ($('#cuFacebook_' + index).val()) {
      contact.append(`
            <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://www.messenger.com/t/@facebook_messenger_id?call">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Ctitle%3EFacebook%20Messenger%3C%2Ftitle%3E%0A%09%09%3Cg%3E%0A%09%09%09%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230084ff%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M25%2C10c-8.29%2C0-15%2C6.22-15%2C13.89A13.5%2C13.5%2C0%2C0%2C0%2C15.59%2C34.7V40l5.11-2.8a16.45%2C16.45%2C0%2C0%2C0%2C4.3.58c8.28%2C0%2C15-6.22%2C15-13.89S33.28%2C10%2C25%2C10Zm1.49%2C18.7-3.82-4.07L15.22%2C28.7l8.2-8.7%2C3.91%2C4.07L34.69%2C20Z%22%0A%09%09%09%09style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if ($('#cuSkype_' + index).val()) {
      contact.append(`
            <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="skype:skype_account?chat">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%20%20%3Cg%3E%0A%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2315ace5%22%2F%3E%0A%09%20%20%20%20%3Cpath%20d%3D%22M38.89%2C27.72A14.34%2C14.34%2C0%2C0%2C0%2C39.15%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C10.85a14.34%2C14.34%2C0%2C0%2C0-2.72.26A8.17%2C8.17%2C0%2C0%2C0%2C11.11%2C22.28%2C14.34%2C14.34%2C0%2C0%2C0%2C10.85%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C39.15a14.34%2C14.34%2C0%2C0%2C0%2C2.72-.26A8.17%2C8.17%2C0%2C0%2C0%2C38.89%2C27.72Zm-13.62%2C7c-5%2C0-7.54-1.89-8.32-4.26s.92-3%2C1.46-3.09a1.85%2C1.85%2C0%2C0%2C1%2C2%2C1.06%2C4.68%2C4.68%2C0%2C0%2C0%2C3.86%2C3.29c2.42.24%2C4-.87%2C4.5-2s-.39-2.76-4.11-3.29-7.59-2.17-7.59-5.9%2C4.26-5.22%2C8.32-5.22%2C6.11%2C2.3%2C6.57%2C3.19c.56%2C1.12.37%2C3-1%2C3.29s-2.12-.43-3.14-2.32-4.78-1.45-6-.34-.92%2C2.71%2C4.3%2C3.72%2C7.15%2C2.9%2C7.15%2C5.85S30.3%2C34.72%2C25.27%2C34.72Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if ($('#cuTelegram_' + index).val()) {
      contact.append(`
            <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://t.me/@telegram">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Cg%3E%0A%09%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230088cc%22%2F%3E%0A%09%09%20%20%20%20%3Cpath%20d%3D%22M36%2C10.2%2C9.4%2C22.42c-1.81.87-1.8%2C2.07-.33%2C2.61L15.7%2C27.5l2.53%2C9.27c.31%2C1%2C.16%2C1.41%2C1.05%2C1.41a1.68%2C1.68%2C0%2C0%2C0%2C1.38-.82L24%2C33.52l6.89%2C6.07c1.27.84%2C2.19.4%2C2.5-1.4L37.9%2C12.76C38.36%2C10.55%2C37.19%2C9.54%2C36%2C10.2ZM16.74%2C26.93%2C31.68%2C15.69c.74-.54%2C1.43-.25.86.35L19.75%2C29.8l-.49%2C6.33Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if ($('#cuInstagram_' + index).val()) {
      contact.append(`
            <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://ig.me/m/@instagram">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%09%3ClinearGradient%20id%3D%22SVGID_1_%22%20gradientTransform%3D%22matrix(0%20-1.982%20-1.844%200%20-132.522%20-51.077)%22%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-37.106%22%20x2%3D%22-26.555%22%20y1%3D%22-72.705%22%20y2%3D%22-84.047%22%3E%0A%09%09%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fd5%22%2F%3E%0A%09%09%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%23ff543e%22%2F%3E%0A%09%09%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c837ab%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%0A%09%09d%3D%22m1.5%201.633c-1.886%201.959-1.5%204.04-1.5%2010.362%200%205.25-.916%2010.513%203.878%2011.752%201.497.385%2014.761.385%2016.256-.002%201.996-.515%203.62-2.134%203.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41%201.633z%22%0A%09%09fill%3D%22url(%23SVGID_1_)%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22m11.998%203.139c-3.631%200-7.079-.323-8.396%203.057-.544%201.396-.465%203.209-.465%205.805%200%202.278-.073%204.419.465%205.804%201.314%203.382%204.79%203.058%208.394%203.058%203.477%200%207.062.362%208.395-3.058.545-1.41.465-3.196.465-5.804%200-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794%201.597c7.574-.012%208.538-.854%208.006%2010.843-.189%204.137-3.339%203.683-7.211%203.683-7.06%200-7.263-.202-7.263-7.265%200-7.145.56-7.257%206.468-7.263zm5.524%201.471c-.587%200-1.063.476-1.063%201.063s.476%201.063%201.063%201.063%201.063-.476%201.063-1.063-.476-1.063-1.063-1.063zm-4.73%201.243c-2.513%200-4.55%202.038-4.55%204.551s2.037%204.55%204.55%204.55%204.549-2.037%204.549-4.55-2.036-4.551-4.549-4.551zm0%201.597c3.905%200%203.91%205.908%200%205.908-3.904%200-3.91-5.908%200-5.908z%22%0A%09%09fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E">
            </a>
        `);
    }
    if ($('#cuPhoneNumber_' + index).val()) {
      contact.append(`
            <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="tel:${$('#phoneNumber_' + index).val()}">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%235461f4%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.61%2C31.06h0c-1.14-2.15-4.78-4.33-5.2-4.58a3.37%2C3.37%2C0%2C0%2C0-2.52-.41%2C2.48%2C2.48%2C0%2C0%2C0-1.46%2C1.1c-.47.56-1.06%2C1.23-1.19%2C1.34a1.59%2C1.59%2C0%2C0%2C1-2.42-.25l-6.09-6.08a1.58%2C1.58%2C0%2C0%2C1-.27-2.38c.14-.17.81-.76%2C1.37-1.23a2.48%2C2.48%2C0%2C0%2C0%2C1.1-1.46%2C3.35%2C3.35%2C0%2C0%2C0-.42-2.53c-.24-.41-2.42-4.05-4.57-5.19A3.32%2C3.32%2C0%2C0%2C0%2C15%2C10l-1.34%2C1.34C11.25%2C13.75%2C8.29%2C19%2C15.77%2C26.43l7.8%2C7.8C27.15%2C37.81%2C30.21%2C39%2C32.69%2C39a8.45%2C8.45%2C0%2C0%2C0%2C6-2.68L40%2C35A3.32%2C3.32%2C0%2C0%2C0%2C40.61%2C31.06Z%22%20style%3D%22fill%3A%20%23ffffff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E">
            </a>
        `);
    }
    if ($('#cuWhatsapp_' + index).val()) {
      contact.append(`
            <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://wa.me/">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2330bf39%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M39.8%2C23.4A14.64%2C14.64%2C0%2C0%2C1%2C25.1%2C38%2C15.25%2C15.25%2C0%2C0%2C1%2C18%2C36.2L9.8%2C38.8%2C12.5%2C31a14.84%2C14.84%2C0%2C0%2C1-2.1-7.5%2C14.7%2C14.7%2C0%2C0%2C1%2C29.4-.1ZM25.1%2C11.2A12.38%2C12.38%2C0%2C0%2C0%2C12.7%2C23.5a12%2C12%2C0%2C0%2C0%2C2.4%2C7.2l-1.5%2C4.6%2C4.8-1.5A12.44%2C12.44%2C0%2C0%2C0%2C37.6%2C23.5%2C12.53%2C12.53%2C0%2C0%2C0%2C25.1%2C11.2Zm7.4%2C15.6a3.22%2C3.22%2C0%2C0%2C0-.7-.4l-2.5-1.2c-.3-.1-.6-.2-.8.2a8.54%2C8.54%2C0%2C0%2C1-1.1%2C1.4.59.59%2C0%2C0%2C1-.8.1%2C11%2C11%2C0%2C0%2C1-2.9-1.8%2C9.88%2C9.88%2C0%2C0%2C1-2-2.5.46.46%2C0%2C0%2C1%2C.2-.7%2C2.65%2C2.65%2C0%2C0%2C0%2C.5-.6c.2-.2.2-.4.4-.6a.64.64%2C0%2C0%2C0%2C0-.6c-.1-.2-.8-1.9-1.1-2.7s-.6-.6-.8-.6h-.7a1.85%2C1.85%2C0%2C0%2C0-1%2C.4%2C4.16%2C4.16%2C0%2C0%2C0-1.3%2C3%2C6.45%2C6.45%2C0%2C0%2C0%2C1.5%2C3.7c.2.2%2C2.5%2C4%2C6.2%2C5.4s3.7%2C1%2C4.3.9a3.74%2C3.74%2C0%2C0%2C0%2C2.4-1.7A2.82%2C2.82%2C0%2C0%2C0%2C32.5%2C26.8Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if ($('#cuEmail_' + index).val()) {
      contact.append(`
            <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="mailto:${$('#email_' + index).val()}">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%23fc872b%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M25%2C25.89%2C10%2C13.75H40Zm-6.78-2.28L10%2C17V32.58Zm13.56%2C0%2C8.22%2C9V17Zm-2%2C1.58L25%2C29.11l-4.84-3.92L10%2C36.25H40Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if ($('#cuImessages_' + index).val()) {
      contact.append(`
            <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="sms://${$('#iMessengerPhoneNumber_' + index).val()}">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%0A%09xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%0A%09xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%0A%09xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%0A%09xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%0A%09xmlns%3Asodipodi%3D%22http%3A%2F%2Fsodipodi.sourceforge.net%2FDTD%2Fsodipodi-0.dtd%22%0A%09xmlns%3Ainkscape%3D%22http%3A%2F%2Fwww.inkscape.org%2Fnamespaces%2Finkscape%22%0A%09width%3D%221024px%22%0A%09height%3D%221024px%22%0A%09viewBox%3D%220%200%2066.145836%2066.145836%22%0A%09version%3D%221.1%22%0A%09id%3D%22svg8%22%0A%09inkscape%3Aversion%3D%220.92.2%20(5c3e80d%2C%202017-08-06)%22%0A%09sodipodi%3Adocname%3D%22iMessage%20logo.svg%22%3E%0A%09%3Ctitle%0A%09%09id%3D%22title907%22%3EiMessage%20logo%3C%2Ftitle%3E%0A%09%3Cdefs%0A%09%09id%3D%22defs2%22%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09id%3D%22linearGradient899%22%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%220%22%0A%09%09%09%09id%3D%22stop895%22%2F%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%221%22%0A%09%09%09%09id%3D%22stop897%22%2F%3E%0A%09%09%3C%2FlinearGradient%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09xlink%3Ahref%3D%22%23linearGradient899%22%0A%09%09%09id%3D%22linearGradient901%22%0A%09%09%09x1%3D%22-25.272568%22%0A%09%09%09y1%3D%22207.52057%22%0A%09%09%09x2%3D%22-25.272568%22%0A%09%09%09y2%3D%22152.9982%22%0A%09%09%09gradientUnits%3D%22userSpaceOnUse%22%0A%09%09%09gradientTransform%3D%22matrix(0.98209275%2C0%2C0%2C0.98209275%2C-1.0651782%2C3.7961838)%22%2F%3E%0A%09%3C%2Fdefs%3E%0A%09%3Csodipodi%3Anamedview%0A%09%09id%3D%22base%22%0A%09%09pagecolor%3D%22%23ffffff%22%0A%09%09bordercolor%3D%22%23666666%22%0A%09%09borderopacity%3D%221.0%22%0A%09%09inkscape%3Apageopacity%3D%220.0%22%0A%09%09inkscape%3Apageshadow%3D%222%22%0A%09%09inkscape%3Azoom%3D%221%22%0A%09%09inkscape%3Acx%3D%22142.01984%22%0A%09%09inkscape%3Acy%3D%2261.975439%22%0A%09%09inkscape%3Adocument-units%3D%22px%22%0A%09%09inkscape%3Acurrent-layer%3D%22layer1%22%0A%09%09showgrid%3D%22false%22%0A%09%09inkscape%3Asnap-object-midpoints%3D%22false%22%0A%09%09showguides%3D%22true%22%0A%09%09inkscape%3Aguide-bbox%3D%22true%22%0A%09%09inkscape%3Asnap-intersection-paths%3D%22false%22%0A%09%09inkscape%3Awindow-width%3D%221920%22%0A%09%09inkscape%3Awindow-height%3D%221017%22%0A%09%09inkscape%3Awindow-x%3D%221358%22%0A%09%09inkscape%3Awindow-y%3D%22-8%22%0A%09%09inkscape%3Awindow-maximized%3D%221%22%0A%09%09fit-margin-top%3D%220%22%0A%09%09fit-margin-left%3D%220%22%0A%09%09fit-margin-right%3D%220%22%0A%09%09fit-margin-bottom%3D%220%22%2F%3E%0A%09%3Cmetadata%0A%09%09id%3D%22metadata5%22%3E%0A%09%09%3Crdf%3ARDF%3E%0A%09%09%09%3Ccc%3AWork%0A%09%09%09%09rdf%3Aabout%3D%22%22%3E%0A%09%09%09%09%3Cdc%3Aformat%3Eimage%2Fsvg%2Bxml%3C%2Fdc%3Aformat%3E%0A%09%09%09%09%3Cdc%3Atype%0A%09%09%09%09%09rdf%3Aresource%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2FStillImage%22%2F%3E%0A%09%09%09%09%3Cdc%3Atitle%3EiMessage%20logo%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%3Cdc%3Adate%3E02%2F04%2F2018%3C%2Fdc%3Adate%3E%0A%09%09%09%09%3Cdc%3Acreator%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3EApple%2C%20Inc.%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Acreator%3E%0A%09%09%09%09%3Cdc%3Apublisher%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3ECMetalCore%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Apublisher%3E%0A%09%09%09%09%3Cdc%3Asource%3Ehttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F85%2FIMessage_icon.png%3C%2Fdc%3Asource%3E%0A%09%09%09%3C%2Fcc%3AWork%3E%0A%09%09%3C%2Frdf%3ARDF%3E%0A%09%3C%2Fmetadata%3E%0A%09%3Cg%0A%09%09inkscape%3Alabel%3D%22Capa%201%22%0A%09%09inkscape%3Agroupmode%3D%22layer%22%0A%09%09id%3D%22layer1%22%0A%09%09transform%3D%22translate(59.483067%2C-145.8456)%22%3E%0A%09%09%3Cg%0A%09%09%09id%3D%22g963%22%3E%0A%09%09%09%3Crect%0A%09%09%09%09ry%3D%2214.567832%22%0A%09%09%09%09rx%3D%2214.567832%22%0A%09%09%09%09y%3D%22145.8456%22%0A%09%09%09%09x%3D%22-59.483067%22%0A%09%09%09%09height%3D%2266.145836%22%0A%09%09%09%09width%3D%2266.145836%22%0A%09%09%09%09id%3D%22rect826%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3Aurl(%23linearGradient901)%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.33634758%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09inkscape%3Aconnector-curvature%3D%220%22%0A%09%09%09%09id%3D%22path922%22%0A%09%09%09%09d%3D%22m%20-26.410149%2C157.29606%20a%2024.278298%2C20.222157%200%200%200%20-24.278105%2C20.22202%2024.278298%2C20.222157%200%200%200%2011.79463%2C17.31574%2027.365264%2C20.222157%200%200%201%20-4.245218%2C5.94228%2023.85735%2C20.222157%200%200%200%209.86038%2C-3.87367%2024.278298%2C20.222157%200%200%200%206.868313%2C0.83768%2024.278298%2C20.222157%200%200%200%2024.2781059%2C-20.22203%2024.278298%2C20.222157%200%200%200%20-24.2781059%2C-20.22202%20z%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3A%23ffffff%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.56409621%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if ($('#cuWeibo_' + index).val()) {
      contact.append(`
            <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://api.weibo.com/chat/#/?to_uid=${$('#weiboUserId_' + index).val()}">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221024%22%20height%3D%221024%22%20viewBox%3D%220%200%20300%20300%22%3E%0A%09%3Cg%3E%0A%09%09%3Ccircle%20cx%3D%22150%22%20cy%3D%22150%22%20r%3D%22150%22%20style%3D%22fill%3A%20%23f5f5f5%22%2F%3E%0A%09%09%3Cg%20transform%3D%22matrix(3.5%200%200%203.5%2070%2060)%22%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M50.448%2012.132c.217%202.814-.259%206.186-2.117%206.351-3.033.271-1.451-3.07-1.411-5.081.111-5.829-4.865-9.879-9.739-9.879-1.381%200-4.588.936-4.094-1.976.222-1.284%201.31-1.266%202.399-1.411%208.197-1.093%2014.386%204.546%2014.962%2011.996z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23D52A2C%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M37.04%2018.907c3.524%201.928%207.758%202.888%207.056%208.61-.168%201.371-.998%203.203-1.834%204.373-5.957%208.339-23.924%2011.844-35.144%205.506C3.355%2035.269-.539%2032.159.062%2025.962c.517-5.333%204.103-9.464%207.622-12.983%203.357-3.359%206.897-5.987%2011.714-7.198%205.226-1.314%206.771%203.043%205.363%207.339%203.027-.203%209.442-3.582%2012.279-.282%201.25%201.454.771%204.058%200%206.069zm-3.811%2013.548c1.129-1.28%202.264-3.231%202.257-5.503-.015-7.014-8.851-9.605-15.806-9.033-3.804.312-6.363%201.115-9.033%202.682-2.179%201.279-4.729%203.36-5.363%206.491-1.427%207.041%206.231%2010.35%2011.855%2010.726%206.498.437%2013.002-1.857%2016.09-5.363z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M43.531%2012.132c.296%202.149-.319%204.011-1.552%204.093-2.056.137-1.287-1.408-1.412-3.246-.078-1.132-1.016-2.439-1.835-2.823-1.606-.752-4.093.548-4.093-1.693%200-1.664%201.443-1.491%202.259-1.553%203.574-.272%206.216%202.191%206.633%205.222z%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M27.019%2026.246c3.007%209.088-12.66%2013.314-15.525%205.504-1.917-5.223%202.686-9.377%207.48-9.879%204.093-.429%207.144%201.658%208.045%204.375zm-7.198%201.553c.638%201.104%202.105.311%201.976-.564-.154-1.013-1.989-.863-1.976.564zm-2.541%204.799c2.634-.627%202.988-5.588-.988-4.658-3.34.78-2.694%205.533.988%204.658z%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if ($('#cuViber_' + index).val()) {
      contact.append(`
            <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="viber://pa?chatURI=${$('#orViberBotName_' + index).val()}">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20version%3D%221.0%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000000%22%0A%20width%3D%2250.000000pt%22%20height%3D%2250.000000pt%22%20viewBox%3D%220%200%2050.000000%2050.000000%22%0A%20preserveAspectRatio%3D%22xMidYMid%20meet%22%3E%0A%0A%3Ccircle%20cx%3D%2220pt%22%20cy%3D%2220pt%22%20r%3D%2216pt%22%20fill%3D%22%23fff%22%3E%3C%2Fcircle%3E%0A%3Cg%20transform%3D%22translate(0.000000%2C50.000000)%20scale(0.100000%2C-0.100000)%22%0Afill%3D%22blue%22%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M167%20484%20c-92%20-28%20-167%20-134%20-167%20-234%200%20-131%20119%20-250%20250%20-250%20129%0A0%20250%20121%20250%20250%200%20100%20-78%20207%20-172%20235%20-63%2018%20-98%2018%20-161%20-1z%20m198%20-86%0Ac34%20-27%2055%20-75%2055%20-128%200%20-94%20-54%20-150%20-144%20-150%20-37%200%20-56%20-6%20-72%20-21%20-25%0A-23%20-44%20-18%20-44%2010%200%2010%20-12%2026%20-26%2036%20-72%2047%20-71%20196%201%20253%2024%2019%2041%2022%20115%0A22%2074%200%2091%20-3%20115%20-22z%22%2F%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M185%20383%20c-11%20-3%20-30%20-14%20-42%20-26%20-19%20-17%20-23%20-31%20-23%20-85%200%20-57%203%0A-66%2030%20-94%2018%20-18%2030%20-40%2030%20-56%20l0%20-26%2028%2026%20c18%2018%2043%2028%2080%2033%2071%209%2092%2036%0A92%20120%200%2084%20-22%20106%20-112%20111%20-35%201%20-72%200%20-83%20-3z%20m112%20-38%20c24%20-17%2047%20-72%2032%0A-80%20-5%20-4%20-9%204%20-10%2017%200%2021%20-1%2021%20-8%204%20-7%20-19%20-8%20-19%20-13%202%20-4%2012%20-14%2025%20-25%0A29%20-18%207%20-33%2022%20-33%2036%200%2012%2034%208%2057%20-8z%20m-83%20-17%20c11%20-15%2012%20-25%205%20-34%20-21%0A-26%2030%20-75%2056%20-54%209%207%2019%205%2036%20-9%2023%20-19%2023%20-21%207%20-37%20-14%20-15%20-21%20-15%20-47%20-4%0A-35%2014%20-96%2077%20-106%20109%20-6%2021%209%2051%2026%2051%204%200%2015%20-10%2023%20-22z%20m71%20-29%20c11%20-17%0A-1%20-21%20-15%20-4%20-8%209%20-8%2015%20-2%2015%206%200%2014%20-5%2017%20-11z%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
  }

  $('#widget_section').on('click', '#chatBody .sm-manager', function (event) {
    let index = $(this).attr('data-id');
    let bodyContent =
      `<div class="sm-box-body manager-mode">
                  <div class="sm-message sm-disable-animation">
                      <div class="message-author">${index} ${$('#cuManagerName_' + index).val()}</div>
                      <div class="message-text">${$('#cuInitialWords_' + index).val()}</div>
                      <div class="message-time">13:14</div>
                  </div>
              </div>`;
    $('#firstManagerChatBody').html(bodyContent);
    $('#firstManagerChatBody .message-author').val(index + ' ' + $('#cuManagerName_' + index).val());
    $('#firstManagerChatBody .message-text').val($('#cuInitialWords_' + index).val());

    $('#firstManagerChatHeaderArea .sm-selected-manager .sm-name').html($('#cuManagerName_' + index).val());
    $('#firstManagerChatHeaderArea .sm-selected-manager .sm-role').html($('#cuRoles_' + index).val());

    setTimeout(function () { $('#firstManagerChatHeaderArea .sm-selected-manager').find('.sm-avatar').css('background-image', `url(${$('#cuCoverImage_' + index).attr('src')})`); }, 200);

    updateContactFooterIcon(index);

    $('#firstManagerChatFooter').show();
    $('#firstManagerChatBody').show();
    $('#firstManagerChatHeaderArea').show();
    $('#selectedManagerChatFooter').hide();
    $('#selectedManagerChatBody').hide();
    $('#selectedManagerChatHeaderArea').hide();
  });

  $("#cu_publish").click(function () {
    let formData = $("#contactusForm").serializeArray();
    let retVal = createUpdateWidget("Contact Us", formData, true, false);
    if (retVal['status'] === null) {
      showSubmissionModal('Success', `Your contact us has been published successfully and you can track it's statistics from monitoring screen`, true);
    }
    else {
      showWarningModal(retVal['status']);
    }
  });

  $("#cu_saveDraft").click(function () {
    let formData = $("#contactusForm").serializeArray();
    let id = createUpdateWidget("Contact Us", formData, false, false);
    // alert(`Save draft operation succeed! (id:${id})`);
  });

  //------------------ End of Script for Contact Us.html --------------------------

  //------------------ Start Script for Message Bar --------------------------
  $('.mb-message-position-section .option-card').on('click', function () {
    $('#mb_position').val($(this).attr('value'));

    $('.mb-message-position-section .option-card').removeClass('active');
    $(this).addClass('active');

    updateMessageBar();
  });
  function getMbBarPositionValue() {
    return $('.mb-message-position-section .option-card.active').attr('value');
  }
  function setMbBarPositionValue(newVal) {
    $('.mb-message-position-section .option-card').each(function () {
      if ($(this).attr('value') === newVal) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  function setMessageBarInitialValue() {
    getLastWidgetValue('Message Bar', function(widgetValue) {
      writeLog('Message Bar Value', widgetValue);

      if (!$.isEmptyObject(widgetValue)) {
        setFormValue(widgetValue, 'mbForm');
        setMbBarPositionValue(widgetValue['mb_position']);
      }
      updateMessageBar();
    });
  }

  function updateMessageBar() {
    let messageText = $('#mbText_1').val();
    let buttonText = $('#mbButtonText_1').val();
    let buttonLink = $('#mbLink_1').val();

    let barPosition = getMbBarPositionValue();
    let containerStyle = $('#mb_containerStyle').val();
    let hideDelay = $('#mb_dismissIn').val();
    let bgColor = $('#mb_bgColor').val();
    let textColor = $('#mb_textColor').val();
    let msgButtonBgColor = $('#mb_buttonColor').val();
    let msgButtonTextColor = $('#mb_buttonTextColor').val();

    $("#mb_messageBar").show();
    $("#mb_messageBar").removeClass('prominent slim').addClass(containerStyle);

    $("#mb_messageText").html(messageText);
    $("#mb_messageBar").css({ 'background-color': bgColor, 'color': textColor });

    if (containerStyle === "prominent") {
      $("#mb_messageButton").css({
        "background-color": msgButtonBgColor,
        "color": msgButtonTextColor
      });
    } else {
      $("#mb_messageButton").css({
        "background-color": "",
        "color": textColor,
      });
    }
    $("#mb_messageButton").html(buttonText);
    $("#mb_messageButton").prop("href", buttonLink);

    $('#mb_messageBar').removeClass('over-top top-bar bottom-bar').addClass(barPosition);
    $("#mb_closeButton").show();

    if (hideDelay > 0) {
      setTimeout(function () {
        $("#mb_messageBar").fadeOut();
      }, hideDelay * 1000); // Convert seconds to milliseconds
    }
  }

  $('#widget_section').on('click', '#mb_closeButton', function() {
    $("#mb_messageBar").fadeOut();
  });

  $('#mbForm').on('change', 'input, select', updateMessageBar);

  $("#mb_publish").click(function () {
    let formData = $("#mbForm").serializeArray();
    let retVal = createUpdateWidget("Message Bar", formData, true, false);
    if (retVal['status'] === null) {
      showSubmissionModal('Success', `Your message bar has been published successfully and you can track it's statistics from monitoring screen`, true);
    }
    else {
      showWarningModal(retVal['status']);
    }
  });

  $("#mb_saveDraft").click(function () {
    let formData = $("#mbForm").serializeArray();
    let id = createUpdateWidget("Message Bar", formData, false, false);
    // alert(`Save draft operation succeed! (id:${id})`);
  });
  //------------------ End of Script for Message Bar -------------------------------

  //------------------ Start of Script for Follow Us -------------------------------
  $('.fu-bar-position-section .option-card').on('click', function () {
    $('#fu_barPosition').val($(this).attr('value'));

    $('.fu-bar-position-section .option-card').removeClass('active');
    $(this).addClass('active');

    updateFollowUs();
  });
  function getFUBarPositionValue() {
    return $('.fu-bar-position-section .option-card.active').attr('value');
  }
  function setFUBarPositionValue(newVal) {
    $('.fu-bar-position-section .option-card').each(function () {
      if ($(this).attr('value') === newVal) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  function setFollowUsInitialValue() {
    getLastWidgetValue('Follow Us', function(widgetValue) {
      writeLog('Follow Us Value', widgetValue);
  
      if (!$.isEmptyObject(widgetValue)) {
        setFormValue(widgetValue, 'followUsForm');
        setFUBarPositionValue(widgetValue['fu_barPosition']);
      }
  
      updateFollowUs();
    });
  }

  function updateFollowUs() {
    var barPosition = getFUBarPositionValue();
    var colorTheme = $('#fu_colorTheme').val();
    var buttonShape = $('#fu_buttonShape').val();
    var animationType = $('#fu_animationType').val();
    var buttonSpace = $('#fu_buttonSpace').val();
    var closeButtonDisplay = $('#fu_closeButtonDisplay').is(':checked');
    var showOnMobile = $('#fu_showOnMobile').is(':checked');

    $('.follow-container').show();
    if ($('#sitePreviewDiv').data('value') === 'preview-mobile' && !showOnMobile) {
      $('.follow-container').hide();
      return ;
    }

    const buttons = [
      { name: "Facebook", icon: "facebook-f", color: "#3a579a" },
      { name: "Instagram", icon: "instagram", color: "#f31e58" },
      { name: "Twitter", icon: "twitter", color: "#000000" },
      { name: "LinkedIn", icon: "linkedin-in", color: "#127bb6" },
      { name: "Pinterest", icon: "pinterest", color: "#cd1c1f" },
      { name: "YouTube", icon: "youtube", color: "#a8240f" },
      { name: "TikTok", icon: "tiktok", color: "#000000" },
      { name: "WeChat", icon: "weixin", color: "#00e26e" },
      { name: "Weibo", icon: "weibo", color: "#fff" },
      { name: "VK", icon: "vk", color: "#0077FF" },
      { name: "Snapchat", icon: "snapchat-ghost", color: "#FFFC00" }
    ];

    var buttonHtml = '<div class="follow-us-icon" style="display: flex; font-size: 16px;">';
    buttons.forEach(button => {
      var backColor = colorTheme === "light" ? "white" : colorTheme === "dark" ? "rgba(0,0,0,0.7)" : button.color;
      var textColor = colorTheme === "light" ? "black" : backColor === "#fff" ? "rgba(255,0,0,0.7)" : "white";
      var url = $(`#fu_${button.name.toLowerCase()}`).val();
      if (url) {
        buttonHtml += `<a href="${url}" class="${buttonShape} ${colorTheme} social-button" style=" 
                  background-color: ${backColor}; color: ${textColor}; font-size:22px;" target="_blank">
                      <i class="fab fa-${button.icon}"></i>
                  </a>`;
      }
    });
    buttonHtml += '</div>';

    $('#socialBar').html(buttonHtml);

    var button = $('#socialBar').find('.follow-us-icon');

    if (barPosition === 'left-bar' || barPosition === 'right-bar') {
      button.addClass('vertical');
    } else {
      button.removeClass('vertical');
    }

    let hideButton = $('#socialHideButton');
    hideButton.hide();
    if (closeButtonDisplay) {
      hideButton.show();
    }

    // Update bar position
    switch (barPosition) {
      case 'bottom-bar':
        button.css({
          'bottom': '10px',
          'left': '50%',
          'right': 'auto',
          'top': 'auto'
        });
        hideButton.css({
          'bottom': '70px',
          'left': '50%',
          'right': 'auto',
          'top': 'auto'
        });
        hideButton.text('\u25BD');
        break;
      case 'top-bar':
        button.css({
          'top': '10px',
          'left': '50%',
          'right': 'auto',
          'bottom': 'auto'
        });
        hideButton.css({
          'top': '70px',
          'left': '50%',
          'right': 'auto',
          'bottom': 'auto'
        });
        hideButton.text('\u25B3');
        break;
      case 'left-bar':
        button.css({
          'top': '50%',
          'left': '10px',
          'right': 'auto',
          'bottom': 'auto'
        });
        hideButton.css({
          'top': '50%',
          'left': '70px',
          'right': 'auto',
          'bottom': 'auto'
        });
        hideButton.text('\u25C1');
        break;
      case 'right-bar':
        button.css({
          'top': '50%',
          'right': '10px',
          'left': 'auto',
          'bottom': 'auto'
        });
        hideButton.css({
          'top': '50%',
          'right': '70px',
          'left': 'auto',
          'bottom': 'auto'
        });
        hideButton.text('\u25B7');
        break;
    }

    // Apply the button spacing class
    $('#socialBar .follow-us-icon').removeClass('small-space no-space').addClass(buttonSpace);
    $('#socialBar .follow-us-icon').removeClass('top-bar right-bar left-bar bottom-bar').addClass(barPosition);
  }

  $('#widget_section').on('click', '#socialHideButton', function() {
    var barPosition = getFUBarPositionValue();
    let fixedBar = $('#socialBar .follow-us-icon');
    fixedBar.toggleClass('hide-bar');
    switch(barPosition) {
      case 'top-bar':
        $(this).html(fixedBar.hasClass('hide-bar') ? '\u25BD' : '\u25B3');
        if (fixedBar.hasClass('hide-bar')) {
          $(this).css('top', '0px');
        } else {
          $(this).css('top', '70px');
        }
        break;
      case 'bottom-bar':
        $(this).html(fixedBar.hasClass('hide-bar') ? '\u25B3' : '\u25BD');
        if (fixedBar.hasClass('hide-bar')) {
          $(this).css('bottom', '0px');
        } else {
          $(this).css('bottom', '70px');
        }
        break;
      case 'right-bar':
        $(this).html(fixedBar.hasClass('hide-bar') ? '\u25C1' : '\u25B7');
        if (fixedBar.hasClass('hide-bar')) {
          $(this).css('right', '0px');
        } else {
          $(this).css('right', '70px');
        }
        break;
      case 'left-bar':
        $(this).html(fixedBar.hasClass('hide-bar') ? '\u25B7' : '\u25C1');
        if (fixedBar.hasClass('hide-bar')) {
          $(this).css('left', '0px');
        } else {
          $(this).css('left', '70px');
        }
        break;
    }
  });

  $('#followUsForm input, #followUsForm select').change(updateFollowUs);

  $("#fu_publish").click(function () {
    var formData = $("#followUsForm").serializeArray();
    let retVal = createUpdateWidget("Follow Us", formData, true, false);
    if (retVal['status'] === null) {
      showSubmissionModal('Success', `Your follow us has been published successfully and you can track it's statistics from monitoring screen`, true);
    }
    else {
      showWarningModal(retVal['status']);
    }
  });

  $("#fu_saveDraft").click(function () {
    var formData = $("#followUsForm").serializeArray();
    let id = createUpdateWidget("Follow Us", formData, false, false);
    // alert(`Save draft operation succeed! (id:${id})`);
  });
});




