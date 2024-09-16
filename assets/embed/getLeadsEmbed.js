let guid;
let userSite = !(realSite === false);
console.log('Is user site?', userSite);
if (userSite) {
  guid = new URL(document.currentScript.src).searchParams.get("guid");
}
// let guid;
console.log('RealSite =======> ', userSite, guid);

if (userSite) {
  loadCss('assets/css/bootstrap.min.css');
  loadCss('assets/css/getLeads.css');
  loadCss('assets/css/fontawesome-6.6.0/css/all.min.css');
  loadCss('assets/css/jquery.rateyo.min.css');
  // loadScript('assets/embed/embed.js');
  loadScript('assets/scripts/jquery.rateyo.min.js');

  $('body').prepend('<div id="widget_section"></div>');
  $('body').css('overflow', 'hidden');
}

let widgetValue;

// Function to convert hex color to RGB
function hexToRgb(hex) {
  hex = hex.replace('#', '');

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

// Function to convert hex + opacity to rgba
function hexToRgba(hex, opacity) {
  let rgb = hexToRgb(hex);
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
}

function formatDate(dateString) {
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

//------------------ Common Script for adding widget in real user site -----------------------------
function getLastRealWidgetValue(widgetName) {
  console.log(`-------- getLastRealWidgetValue : ${widgetName} --------\n`);
  console.log(window.widgets[guid]);

  let widgetVal = {};
  let lastArray = window.widgets[guid][0];
  if (widgetName) {
    lastArray = window.widgets[guid].find(widget => widget[2] === widgetName);
  }
  if (lastArray) {
    const valueArray = JSON.parse(lastArray[4]);
    valueArray.forEach(item => {
      widgetVal[item.name] = item.value;
    });
  }
  widgetVal['widgetId'] = lastArray[0];
  widgetVal['widgetName'] = lastArray[2];
  return widgetVal;
}

function showModal() {
  $(".pop-overlay, .pop-modal").show();
  $(".pop-overlay, .pop-modal").addClass("show");
}

function hideModal() {
  $(".pop-overlay, .pop-modal").hide();
  $(".pop-overlay, .pop-modal").removeClass("show");
}

//------------------ Start of Script for Popup.html -----------------------------
function showRealPopupModal() {
  const pu_title = widgetValue['pu_title'];
  const pu_buttonText = widgetValue['pu_buttonText'];
  const pu_text = widgetValue['pu_text'];
  // const pu_successMessage = widgetValue['pu_successMessage'];
  const pu_showImage = widgetValue['pu_showImage'];
  // const pu_uploadFile = widgetValue['pu_uploadFile")[0].files[0];
  const pu_position = widgetValue['pu_position'];
  const pu_showCloseButton = widgetValue['pu_showCloseButton'];
  const pu_bgColor = widgetValue['pu_bgColor'];
  const pu_buttonColor = widgetValue['pu_buttonColor'];
  const pu_textColor = widgetValue['pu_textColor'];
  const pu_buttonTextColor = widgetValue['pu_buttonTextColor'];

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

  $("#pu_modalImage").attr("src", widgetValue['pu_coverImageVal']);

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

$("#widget_section").on("click", ".puf-widget .pop-overlay", function () {
  hideModal();
});

$("#widget_section").on("click", "#pu_modalCloseButton", hideModal);

//------------------ Start of Script for PopupForm.html -----------------------------
function showRealPopupFormModal() {
  const puf_title = widgetValue['puf_title'];
  const puf_buttonText = widgetValue['puf_buttonText'];
  const puf_subTitle = widgetValue['puf_subtitle'];
  const puf_successMessage = widgetValue['puf_successMessage'];
  const puf_showImage = widgetValue['puf_showImage'];
  // const puf_uploadFile = widgetValue['puf_uploadFile')[0].files[0];
  const puf_showCloseButton = widgetValue['puf_showCloseButton'];
  const puf_bgColor = widgetValue['puf_bgColor'];
  const puf_buttonColor = widgetValue['puf_buttonColor'];
  const puf_textColor = widgetValue['puf_textColor'];
  const puf_buttonTextColor = widgetValue['puf_buttonTextColor'];

  let modalWidth = '700px';
  if (puf_showImage === 'no')
    modalWidth = '400px';
  let position = "left-cover";
  let modal = $('.puf-widget .pop-modal');
  modal.css({
    'width': modalWidth,
    'background-color': puf_bgColor
  });

  $('#puf_modalHeader').text(puf_title).css('color', puf_textColor);
  $('#puf_modalText').html(puf_subTitle).css('color', puf_textColor);
  $('#puf_modalButton').show().text(puf_buttonText).css({
    'color': puf_buttonTextColor,
    'background-color': puf_buttonColor
  }).off('click').on('click', function () {
    $('#puf_modalButton').hide();
    let data = $(this).closest('form').serializeArray();
    visitorSubmit(guid, widgetValue['widgetId'], data);

    var message = `
            <table cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; margin: 0 auto; text-align: left; border: none; background-image: radial-gradient(circle, #ccc 1px, rgba(255, 255, 255, 0) 1px); background-size: 20px 20px;">
              <tbody style="background-color: transparent;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <img src="https://dlnil54eooeso.cloudfront.net/user-files/359154-logo.pngGetLeads.png" alt="GetLeads Logo" width="21" height="20" style="display: inline-block; vertical-align: middle;">
                    <span style="font-family: Chopin-Trial, sans-serif; font-size: 17px; font-weight: 700; color: #3B3B3B; display: inline-block; vertical-align: middle; padding-left: 7px;">
                      GetLeads
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">
                    <div style="font-family: Poppins, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; color: black;">
                      Hello <span style="font-weight: 700;">Username!</span>
                    </div>
                    <div style="font-family: Poppins, sans-serif; font-size: 30px; font-weight: 800; color: #E7B902; padding: 10px 0;">
                      <div style="margin-bottom: -10px;">New submission</div>
                      <span>received</span>
                    </div>
                  </td> 
                </tr>
                <tr>
                  <td>
                    <div style="padding: 24px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); text-align: center;">
                      <div style="font-family: Poppins, sans-serif; font-size: 12px; font-weight: 700; color: black;">
                        Form Name
                      </div>
                      <div style="position: relative; margin-bottom: 10px;">
                        <input type="text" style="width: 100%; padding: 0.6rem; height: auto; border-radius: 0.75rem; border: 1px solid #e3e3e3; box-shadow: none; font-size: 10px; font-weight: 400; line-height: 15px;" id="faq_buttonText" name="faq_buttonText" placeholder="Enter Title" value="Any questions?">
                        <label style="position: absolute; top: -0.5rem; left: 0.5rem; padding: 0.2rem; color: #000; pointer-events: none; transition: all 0.2s; background-color: white; font-size: 8px; font-weight: 300; line-height: 12px;" for="faq_buttonText">Text</label>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
    `;
    // var message = `
    //    <table style="max-width: 600px; width: 100%; margin: 0 auto; text-align: left; border: none;" border="0" cellspacing="0" cellpadding="0">
    //       <tbody>
    //          <tr>
    //             <td  style="background: #333333; padding:16px;  "><img src="https://dlnil54eooeso.cloudfront.net/assets/newsletter/images/emailtemplate/rabbitseo/logo.png" alt="" title=""/></td> 
    //             <td  style="background: #333333; padding:16px; text-align: right;  ">
    //             </td> 
    //          </tr>
    //           <br />
    //          <tr>
    //             <td colspan="5"> 
    //             </td>
    //          </tr>
    //          <br />
           
    //          <tr>
    //             <td colspan="5"  style=" padding:0px 35px 16px 33px;">
    //                <div style="padding: 24px; background: #333333;border-radius: 8px;">
    //                   <p style="margin: 0; font-size: 14px; color: #FFFFFF">Dear ,</p>
    //                   <br />
    //                   <p style="margin: 0; margin-bottom: 15px; font-size: 14px; color: #FFFFFF"></p>
    //                   <p style="margin: 0; font-size: 14px; color: #FFFFFF">Thanks</p>
    //                   <p style="margin: 0; font-size: 14px; color: #FFFFFF">Rabbit SEO Team.</p>
    //                </div> 
    //             </td>
    //          </tr>
        
           
    //          <tr>
    //             <td colspan="5"  style="background: #333333; padding:15px; text-align: center;">
    //                <p style="margin: 0; font-size: 14px; margin-bottom:5px; color: #ffffff">This email is being sent to you because you are a member of Rabbit SEO</p>
    //             </td>
    //          </tr> 
    //       </tbody>
    //    </table>
    // `;
    // $.each(data, function(index, row) {
    //     message += `
    //     <div style="margin-bottom: 20px; padding: 10px; border-radius: 10px; border: 1px solid #e5e5e5;">
    //         <p style="font-size: 14px; font-weight: bold; color: #ffcc66; margin: 0;">${row.name.charAt(0).toUpperCase() + row.name.slice(1)}:</p>
    //         <p style="font-size: 16px; color: #333; margin-top: 5px;">${row.value}</p>
    //     </div>
    //     `;
    // });

    sendEmail(guid, 'GetLeads Popup', message, widgetValue['widgetId']);
    $('#puf_modalInputList').empty().append(`<p>${puf_successMessage}</p>`);
  });

  $("#puf_modalImage").attr("src", widgetValue['puf_coverImageVal']);

  if (puf_showImage === 'yes') {
    $("#puf_modalImageLink").show();
  }
  else {
    $("#puf_modalImageLink").hide();
  }

  if (puf_showCloseButton === 'yes') {
    $("#puf_modalCloseButton").show();
  } else {
    $("#puf_modalCloseButton").hide();
  }

  modal.find('i').hide();
  modal.removeClass('top-cover top left-cover right-cover');
  modal.addClass(position);

  var fieldCount = 0;
  $.each(widgetValue, function (key, value) {
    if (key.startsWith('pufPlaceholder_')) {
      fieldCount++;
    }
  });
  // Insert input text elements into #modalInputList
  const modalInputList = $('#puf_modalInputList');
  modalInputList.empty(); // Clear previous inputs

  for (let i = 1; i <= fieldCount; i++) {
    const inputElement = $(`
                  <div class="col-md-12">
                      <div class="form-floating-label">
                          <input type="text" class="form-control" placeholder="${widgetValue['pufPlaceholder_' + i]}" id="popupFormModalInput_${i}" name="${widgetValue['pufName_' + i]}" ${widgetValue['pufMandatory_' + i] ? 'required' : ''}>
                      </div>
                  </div>
              `);
    modalInputList.append(inputElement);
  }

  showModal();
}

$("#widget_section").on("click", "#puf_modalCloseButton", hideModal);

//------------------ Start of Script for FAQ -----------------------------

function updateRealFaqModal() {
  const showHeader = (widgetValue['faq_showHeader'] === 'on');
  const headerTitle = widgetValue['faq_headerText'];
  const headerSubtitle = widgetValue['faq_headerSubtitle'];
  const headerBackgroundColor = widgetValue['faq_headerBgColor'];
  const headerTextColor = widgetValue['faq_headerTextColor'];

  const questionsTextColor = widgetValue['faq_questionTextColor'];
  const answersTextColor = widgetValue['faq_answerTextColor'];
  const questionLinkColor = widgetValue['faq_questionLinkColor'];

  const showFooter = (widgetValue['faq_showFooter'] === 'on');
  const footerText = widgetValue['faq_footerText'];
  const footerBackgroundColor = widgetValue['faq_footerBgColor'];
  const footerTextColor = widgetValue['faq_footerTextColor'];
  const linkColor = widgetValue['faq_footerLinkColor'];

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
    $('#faqModal .modal-footer h6').text(footerText);

    $('#faqModal .modal-footer').show();
  }
  else {
    $('#faqModal .modal-footer').hide();
  }

  var fieldCount = 0;
  $.each(widgetValue, function (key, value) {
    if (key.startsWith('faqQuestion')) {
      fieldCount++;
    }
  });

  const modalList = $('#faqModal .modal-body');
  modalList.empty(); // Clear previous inputs

  for (let i = 1; i <= fieldCount; i++) {
    const inputElement = $(`
          <div class="question-item">
              <h5 class="question-title">${widgetValue['faqQuestion_' + i]}</h5>
              <span class="icon">+</span>
          </div>
          <div class="answer">
              <p class="mb-0">${widgetValue['faqAnswer_' + i]}</p>
              <a href="${widgetValue['faqLink_' + i]}" target="_blank">${widgetValue['faqLink_' + i]}</a>
          </div>
      `);
    modalList.append(inputElement);
  };

  $('#faqModal .modal-body .question-item').css('color', questionsTextColor);
  $('#faqModal .modal-body .answer p').css('color', answersTextColor);
  $('#faqModal .modal-body .answer a').css('color', questionLinkColor);
}

function updateRealFaqButton() {
  let position = widgetValue['faq_desktopPosition'];
  let buttonType = widgetValue['faq_buttonStyle'];
  let verticalMargin = widgetValue['faq_verticalMargin'];
  let horizontalMargin = widgetValue['faq_horizontalMargin'];
  let buttonText = widgetValue['faq_buttonText'];
  let bgColor = widgetValue['faq_buttonBgColor'];
  let textColor = widgetValue['faq_buttonTextColor'];

  updateFaqPosition(position, verticalMargin, horizontalMargin);

  var btnElement = $('#faq_questionButton');
  var btnText = $('.fixed-button-text');

  btnElement.css({ 'background-color': bgColor, 'color': textColor });
  btnText.text(buttonText);
  if (buttonType === 'round-with-text' || buttonType === 'square-with-text') {
    btnElement.css({ 'background-color': bgColor, 'color': textColor });
  }
  else {
    btnElement.css({ 'background-color': '', 'color': textColor, 'border': `3px solid ${bgColor}` });
  }

  btnElement.removeClass('round-with-text square-with-text outline-round outline-square').addClass(buttonType);

  if (widgetValue['faq_shakeButton'] === 'yes') {
    $(".faq-widget .fixed-button i").addClass("shake");
  }
  else {
    $(".faq-widget .fixed-button i").removeClass("shake");
  }

  if (widgetValue['faq_wavesAnimation'] === 'yes') {
    $(".faq-widget .fixed-button .wave-effect").removeClass('round-with-text square-with-text outline-round outline-square').addClass(buttonType);
    $(".faq-widget .fixed-button .wave-effect").css({ 'background-color': bgColor, 'opacity': 0.5 })
    $(".faq-widget .fixed-button .wave-effect").show();
  } else {
    $(".faq-widget .fixed-button .wave-effect").hide();
  }

  if (widgetValue['faq_smallerButton'] === 'yes') {
    $(".faq-widget .fixed-body").addClass("small-button");
  }
  else {
    $(".faq-widget .fixed-body").removeClass("small-button");
  }

  updateRealFaqModal();
}

if (userSite) {
  $("#widget_section").on("click", "#faq_questionButton", function () {
    // visitorClick(widgetValue['widgetId']);
    updateRealFaqModal();
    $('.faq-modal').toggle();
  });
}

$("#widget_section").on("click", ".faq-modal .question-item", function () {
  var $answer = $(this).next('.answer');
  var $icon = $(this).find('.icon');

  $answer.slideToggle(300);
  $icon.text($icon.text() == '+' ? '-' : '+');
});

$("#widget_section").on("click", ".close-button", function () {
  $('.faq-modal').hide();
});

function updateFaqPosition(position, verticalMargin, horizontalMargin) {
  let btnElement = $('#faq_questionButton');
  let modalElement = $('.faq-modal');
  switch (position) {
    case 'bottom-right':
      btnElement.css({
        'bottom': '20px',
        'right': '20px',
        'left': 'auto',
        'top': 'auto',
        'margin': `0px ${horizontalMargin}px ${verticalMargin}px 0px`,
        'transform': 'translate(0%, 0%)'
      });
      modalElement.css({
        'bottom': '70px',
        'right': '20px',
        'left': 'auto',
        'top': 'auto',
        'margin': `0px ${horizontalMargin}px ${verticalMargin}px 0px`,
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'bottom-center':
      btnElement.css({
        'bottom': '20px',
        'left': '50%',
        'right': 'auto',
        'top': 'auto',
        'margin': `0px ${horizontalMargin}px ${verticalMargin}px 0px`,
        'transform': 'translate(-50%, 0%)'
      });
      modalElement.css({
        'bottom': '70px',
        'left': '50%',
        'right': 'auto',
        'top': 'auto',
        'margin': `0px ${horizontalMargin}px ${verticalMargin}px 0px`,
        'transform': 'translate(-50%, 0%)'
      });
      break;
    case 'bottom-left':
      btnElement.css({
        'bottom': '20px',
        'left': '20px',
        'right': 'auto',
        'top': 'auto',
        'margin': `0px 0px ${verticalMargin}px ${horizontalMargin}px`,
        'transform': 'translate(0%, 0%)'
      });
      modalElement.css({
        'bottom': '70px',
        'left': '20px',
        'right': 'auto',
        'top': 'auto',
        'margin': `0px 0px ${verticalMargin}px ${horizontalMargin}px`,
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'top-right':
      btnElement.css({
        'top': '20px',
        'right': '20px',
        'left': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(0%, 0%)'
      });
      modalElement.css({
        'top': '70px',
        'right': '20px',
        'left': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'top-center':
      btnElement.css({
        'top': '20px',
        'left': '50%',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(-50%, 0%)'
      });
      modalElement.css({
        'top': '70px',
        'left': '50%',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(-50%, 0%)'
      });
      break;
    case 'top-left':
      btnElement.css({
        'top': '20px',
        'left': '20px',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px 0px 0px ${horizontalMargin}px`,
        'transform': 'translate(0%, 0%)'
      });
      modalElement.css({
        'top': '70px',
        'left': '20px',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px 0px 0px ${horizontalMargin}px`,
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'left':
      btnElement.css({
        'top': '50%',
        'left': '20px',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px 0px 0px ${horizontalMargin}px`,
        'transform': 'translate(0%, -50%)'
      });
      modalElement.css({
        'top': '50%',
        'left': '70px',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px 0px 0px ${horizontalMargin}px`,
        'transform': 'translate(0%, -50%)'
      });
      break;
    case 'right':
      btnElement.css({
        'top': '50%',
        'right': '20px',
        'left': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(0%, -50%)'
      });
      modalElement.css({
        'top': '50%',
        'right': '70px',
        'left': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(0%, -50%)'
      });
      break;
  }
}

// ************************ Story Script ***************************
// Story Modal Operate 
var slideTimeout;

function showSlide(index) {
  var slides = $('.carousel-slide');
  slides.removeClass('active').css('opacity', '0');
  slides.eq(index).addClass('active').css('opacity', '1');

  var duration = slides.eq(index).data('duration');

  // Clear any existing timeout
  clearTimeout(slideTimeout);

  slideTimeout = setTimeout(function () {
    var nextIndex = (index + 1) % slides.length;
    showSlide(nextIndex);
  }, duration);
}

function showRealStoryModal() {
  let bgColor = widgetValue['st_bgColor'];
  let titleColor = widgetValue['st_titleColor'];
  let imageSetting = widgetValue['st_imageSetting'];

  var fieldCount = 0;
  $.each(widgetValue, function (key, value) {
    if (key.startsWith('stDuration_')) {
      fieldCount++;
    }
  });

  $('.carousel').empty();
  for (let i = 1; i <= fieldCount; i++) {
    let button = '';
    let content = '';
    if (imageSetting === 'images-text-button') {
      button = `<a href="${widgetValue['stLink_' + i]}" class="btn btn-story-modal">${widgetValue['stButtonText_' + i]}</a>
                `;
    }
    if (imageSetting !== 'images-only') {
      content = `
                <div class="carousel-content margin-top-10">
                    <span class="story-content">${widgetValue['stStoryText_' + i]}</span>
                </div>
                `;
    }
    const inputElement = $(`
                <div class="carousel-slide" data-duration="${widgetValue['stDuration_' + i] * 1000}">
                    <img src="https://via.placeholder.com/400x600" alt="Slide">
                    ${content};
                    ${button}
                </div>
            `);
    $('.carousel').append(inputElement);
    inputElement.find('.story').css({ 'color': titleColor });
    // inputElement.find('.button').css({ 'background-color': bgColor, 'color': titleColor });
    inputElement.find('img').attr('src', widgetValue['stCoverImageVal_' + i]);
  };

  $('.carousel .carousel-slide').first().addClass('active');
  $('.carousel-object').removeClass('hidden');

  showSlide(0);
}

function hideStoryModal() {
  $('.carousel-object').addClass('hidden');
}

$('#widget_section').on('click', '.carousel-object .close-button', hideStoryModal);

if (userSite) {
  $('#widget_section').on('click', '.story-container img', function () {
    // let storyNo = $(this).closest('.story-div').attr('story');
    showRealStoryModal();
  });

  $('#widget_section').on('click', '.btn-story-modal', function() {
    visitorClick(guid, widgetValue['widgetId']);
  });
}

// UI Operate
function updateRealFixedBar() {
  let animation = widgetValue['st_animation'];

  hideStoryModal();

  var fieldCount = 0;
  $.each(widgetValue, function (key, value) {
    if (key.startsWith('stDuration_')) {
      fieldCount++;
    }
  });

  const storyContainer = $('.story-container');
  storyContainer.empty(); // Clear previous inputs

  for (let i = 1; i <= fieldCount; i++) {
    const inputElement = $(`
          <div class="story-div" story=${i}>
              <img src="https://via.placeholder.com/60" alt="${widgetValue['stTitle_' + i]}">
              <p>${widgetValue['stTitle_' + i]}</p>
          </div>
      `);
    storyContainer.append(inputElement);

    inputElement.find('img').attr('src', widgetValue['stCoverImageVal_' + i]);
  };
  
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
}

function updateRealStoryTheme() {
  let desktopPosition = widgetValue['st_desktopLayout'];
  let backgroundColor = widgetValue['st_bgColor'];
  let titlesColor = widgetValue['st_titleColor'];
  let animation = widgetValue['st_animation'];
  let showHideButton = (widgetValue['st_showHideButton'] === 'on');
  let start = new Date(widgetValue['st_startDate']);
  let end = new Date(widgetValue['st_endDate']);
  let today = new Date(); // Current date    
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  $('.fixed-container').show();

  if (today < start || today > end) {
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

  // Fixed Bar
  $('#widget_section').on('click', '.hide-button', function () {
    let desktopPosition = widgetValue['st_desktopLayout'];
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

  updateRealFixedBar();
}

// ****************************** Contact Us Script ********************************
if (userSite) {
  $('#widget_section').on('click', '#chatButton', function (event) {
    // visitorClick(widgetValue['widgetId']);
    if (widgetValue['cu_selectType'] === "open-direct") {
      $('#contactLinkList').toggle();
    } else {
      $('#chatWindow').toggle();
    }
  });
  $('#widget_section').on('click', '#contactLinkList a, #firstManagerChatFooter a', function() {
    visitorClick(guid, widgetValue['widgetId']);
  });
}
$('#widget_section').on('click', '#cu_notificationWindow', function () {
  $(this).hide();
  $('#chatWindow').toggle();
});
$('#widget_section').on('click', '#closeChat', function (event) {
  $('#chatWindow').toggle();
});

function updateContactUsPosition(position, verticalMargin, horizontalMargin) {
  let btnElement = $('#chatButton');
  switch (position) {
    case 'bottom-right':
      btnElement.css({
        'bottom': '10px',
        'right': '20px',
        'left': 'auto',
        'top': 'auto',
        'margin': `0px ${horizontalMargin}px ${verticalMargin}px 0px`,
        'transform': 'translate(0%, 0%)'
      });
      $('#contactLinkList, #chatWindow, #cu_notificationWindow').css({
        'bottom': '60px',
        'right': '20px',
        'left': 'auto',
        'top': 'auto',
        'margin': `0px ${horizontalMargin}px ${verticalMargin}px 0px`,
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'bottom-center':
      btnElement.css({
        'bottom': '10px',
        'left': '50%',
        'right': 'auto',
        'top': 'auto',
        'margin': `0px ${horizontalMargin}px ${verticalMargin}px 0px`,
        'transform': 'translate(-50%, 0%)'
      });
      $('#contactLinkList, #chatWindow, #cu_notificationWindow').css({
        'bottom': '60px',
        'left': '50%',
        'right': 'auto',
        'top': 'auto',
        'margin': `0px ${horizontalMargin}px ${verticalMargin}px 0px`,
        'transform': 'translate(-50%, 0%)'
      });
      break;
    case 'bottom-left':
      btnElement.css({
        'bottom': '10px',
        'left': '20px',
        'right': 'auto',
        'top': 'auto',
        'margin': `0px 0px ${verticalMargin}px ${horizontalMargin}px`,
        'transform': 'translate(0%, 0%)'
      });
      $('#contactLinkList, #chatWindow, #cu_notificationWindow').css({
        'bottom': '60px',
        'left': '20px',
        'right': 'auto',
        'top': 'auto',
        'margin': `0px 0px ${verticalMargin}px ${horizontalMargin}px`,
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'top-right':
      btnElement.css({
        'top': '20px',
        'right': '20px',
        'left': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(0%, 0%)'
      });
      $('#contactLinkList, #chatWindow, #cu_notificationWindow').css({
        'top': '60px',
        'right': '20px',
        'left': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'top-center':
      btnElement.css({
        'top': '20px',
        'left': '50%',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(-50%, 0%)'
      });
      $('#contactLinkList, #chatWindow, #cu_notificationWindow').css({
        'top': '60px',
        'left': '50%',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(-50%, 0%)'
      });
      break;
    case 'top-left':
      btnElement.css({
        'top': '20px',
        'left': '20px',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px 0px 0px ${horizontalMargin}px`,
        'transform': 'translate(0%, 0%)'
      });
      $('#contactLinkList, #chatWindow, #cu_notificationWindow').css({
        'top': '60px',
        'left': '20px',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px 0px 0px ${horizontalMargin}px`,
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'left':
      btnElement.css({
        'top': '50%',
        'left': '20px',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px 0px 0px ${horizontalMargin}px`,
        'transform': 'translate(0%, -50%)'
      });
      $('#contactLinkList, #chatWindow, #cu_notificationWindow').css({
        'top': '50%',
        'left': '60px',
        'right': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px 0px 0px ${horizontalMargin}px`,
        'transform': 'translate(0%, -50%)'
      });
      break;
    case 'right':
      btnElement.css({
        'top': '50%',
        'right': '20px',
        'left': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(0%, -50%)'
      });
      $('#contactLinkList, #chatWindow, #cu_notificationWindow').css({
        'top': '50%',
        'right': '60px',
        'left': 'auto',
        'bottom': 'auto',
        'margin': `${verticalMargin}px ${horizontalMargin}px 0px 0px`,
        'transform': 'translate(0%, -50%)'
      });
      break;
  }
}

function updateRealContactButton() {
  var btnElement = $('#chatButton');

  let buttonType = widgetValue['cu_Type'];
  let buttonText = widgetValue['cu_Text'];
  let bgColor = widgetValue['cu_bgColor'];
  let textColor = widgetValue['cu_buttonColor'];

  btnElement.css({ 'background-color': bgColor, 'color': textColor });
  btnElement.find("span").text(buttonText);
  btnElement.removeClass('but-rounded but-square but-circle but-tab').addClass(buttonType);
  if (buttonType === 'but-circle') {
    btnElement.find("span").hide();
  }
  else {
    btnElement.find("span").show();
  }
  $('#chatHeader').css({ 'background-color': bgColor, 'color': textColor });
  $('#chatFooter button').css({ 'background-color': bgColor, 'color': textColor });
  
  let position = widgetValue['cu_desktopPosition'];
  let verticalMargin = widgetValue['cu_verticalMargin'];
  let horizontalMargin = widgetValue['cu_horizontalMargin'];
  updateContactUsPosition(position, verticalMargin, horizontalMargin);

  if (widgetValue['cu_redDot'] === 'yes') {
    $('.contactus-section .red-dot').show();
  }
  else {
    $('.contactus-section .red-dot').hide();
  }

  if (widgetValue['cu_shakeButton'] === 'yes') {
    $(".contactus-section .fixed-button i").addClass("shake");
  }
  else {
    $(".contactus-section .fixed-button i").removeClass("shake");
  }

  if (widgetValue['cu_waveAnimation'] === 'yes') {
    $(".contactus-section .fixed-button .wave-effect").removeClass('but-rounded but-square but-circle but-tab').addClass(buttonType);
    $(".contactus-section .fixed-button .wave-effect").css({ 'background-color': bgColor, 'opacity': 0.5 })
    $(".contactus-section .fixed-button .wave-effect").show();
  } else {
    $(".contactus-section .fixed-button .wave-effect").hide();
  }

  if (widgetValue['cu_smallButton'] === 'yes') {
    $(".contactus-section .fixed-button-text").addClass("small-button");
  }
  else {
    $(".contactus-section .fixed-button-text").removeClass("small-button");
  }
}

function updateRealContactUsSection() {
  let behaviorType = widgetValue['cu_selectType'];
  let firstMgrUsed = (widgetValue['cu_firstMgrUsed'] === 'yes');

  if (behaviorType === 'open-direct') {
    $('#cu_notificationWindow').hide();
    $('#chatWindow').hide();
  }
  else {
    $('#cu_notificationWindow').show();
    $('#contactLinkList').hide();
  }

  updateRealContactButton();
  updateRealWidgetSection(behaviorType, firstMgrUsed);

  $('#selectedManagerChatHeaderArea .sm-box-title').html(widgetValue['cu_title']);
  $('#selectedManagerChatHeaderArea .sm-box-subtitle').html(widgetValue['cu_subtitle']);
  $('#firstManagerChatFooter .cu-start-chat-label').html(widgetValue['cu_footerStart']);
  $('#selectedManagerChatFooter .sm-box-footer-info').html(widgetValue['cu_footer']);

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
    if (widgetValue['cu_directFacebook']) {
      contact.append(`
            <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://www.messenger.com/t/@facebook_messenger_id?call">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Ctitle%3EFacebook%20Messenger%3C%2Ftitle%3E%0A%09%09%3Cg%3E%0A%09%09%09%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230084ff%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M25%2C10c-8.29%2C0-15%2C6.22-15%2C13.89A13.5%2C13.5%2C0%2C0%2C0%2C15.59%2C34.7V40l5.11-2.8a16.45%2C16.45%2C0%2C0%2C0%2C4.3.58c8.28%2C0%2C15-6.22%2C15-13.89S33.28%2C10%2C25%2C10Zm1.49%2C18.7-3.82-4.07L15.22%2C28.7l8.2-8.7%2C3.91%2C4.07L34.69%2C20Z%22%0A%09%09%09%09style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if (widgetValue['cu_directSkype']) {
      contact.append(`
            <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="skype:skype_account?chat">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%20%20%3Cg%3E%0A%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2315ace5%22%2F%3E%0A%09%20%20%20%20%3Cpath%20d%3D%22M38.89%2C27.72A14.34%2C14.34%2C0%2C0%2C0%2C39.15%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C10.85a14.34%2C14.34%2C0%2C0%2C0-2.72.26A8.17%2C8.17%2C0%2C0%2C0%2C11.11%2C22.28%2C14.34%2C14.34%2C0%2C0%2C0%2C10.85%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C39.15a14.34%2C14.34%2C0%2C0%2C0%2C2.72-.26A8.17%2C8.17%2C0%2C0%2C0%2C38.89%2C27.72Zm-13.62%2C7c-5%2C0-7.54-1.89-8.32-4.26s.92-3%2C1.46-3.09a1.85%2C1.85%2C0%2C0%2C1%2C2%2C1.06%2C4.68%2C4.68%2C0%2C0%2C0%2C3.86%2C3.29c2.42.24%2C4-.87%2C4.5-2s-.39-2.76-4.11-3.29-7.59-2.17-7.59-5.9%2C4.26-5.22%2C8.32-5.22%2C6.11%2C2.3%2C6.57%2C3.19c.56%2C1.12.37%2C3-1%2C3.29s-2.12-.43-3.14-2.32-4.78-1.45-6-.34-.92%2C2.71%2C4.3%2C3.72%2C7.15%2C2.9%2C7.15%2C5.85S30.3%2C34.72%2C25.27%2C34.72Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if (widgetValue['cu_directTelegram']) {
      contact.append(`
            <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://t.me/@telegram">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Cg%3E%0A%09%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230088cc%22%2F%3E%0A%09%09%20%20%20%20%3Cpath%20d%3D%22M36%2C10.2%2C9.4%2C22.42c-1.81.87-1.8%2C2.07-.33%2C2.61L15.7%2C27.5l2.53%2C9.27c.31%2C1%2C.16%2C1.41%2C1.05%2C1.41a1.68%2C1.68%2C0%2C0%2C0%2C1.38-.82L24%2C33.52l6.89%2C6.07c1.27.84%2C2.19.4%2C2.5-1.4L37.9%2C12.76C38.36%2C10.55%2C37.19%2C9.54%2C36%2C10.2ZM16.74%2C26.93%2C31.68%2C15.69c.74-.54%2C1.43-.25.86.35L19.75%2C29.8l-.49%2C6.33Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if (widgetValue['cu_directInstagram']) {
      contact.append(`
            <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://ig.me/m/@instagram">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%09%3ClinearGradient%20id%3D%22SVGID_1_%22%20gradientTransform%3D%22matrix(0%20-1.982%20-1.844%200%20-132.522%20-51.077)%22%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-37.106%22%20x2%3D%22-26.555%22%20y1%3D%22-72.705%22%20y2%3D%22-84.047%22%3E%0A%09%09%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fd5%22%2F%3E%0A%09%09%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%23ff543e%22%2F%3E%0A%09%09%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c837ab%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%0A%09%09d%3D%22m1.5%201.633c-1.886%201.959-1.5%204.04-1.5%2010.362%200%205.25-.916%2010.513%203.878%2011.752%201.497.385%2014.761.385%2016.256-.002%201.996-.515%203.62-2.134%203.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41%201.633z%22%0A%09%09fill%3D%22url(%23SVGID_1_)%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22m11.998%203.139c-3.631%200-7.079-.323-8.396%203.057-.544%201.396-.465%203.209-.465%205.805%200%202.278-.073%204.419.465%205.804%201.314%203.382%204.79%203.058%208.394%203.058%203.477%200%207.062.362%208.395-3.058.545-1.41.465-3.196.465-5.804%200-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794%201.597c7.574-.012%208.538-.854%208.006%2010.843-.189%204.137-3.339%203.683-7.211%203.683-7.06%200-7.263-.202-7.263-7.265%200-7.145.56-7.257%206.468-7.263zm5.524%201.471c-.587%200-1.063.476-1.063%201.063s.476%201.063%201.063%201.063%201.063-.476%201.063-1.063-.476-1.063-1.063-1.063zm-4.73%201.243c-2.513%200-4.55%202.038-4.55%204.551s2.037%204.55%204.55%204.55%204.549-2.037%204.549-4.55-2.036-4.551-4.549-4.551zm0%201.597c3.905%200%203.91%205.908%200%205.908-3.904%200-3.91-5.908%200-5.908z%22%0A%09%09fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E">
            </a>
        `);
    }
    if (widgetValue['cu_directPhone']) {
      contact.append(`
            <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="tel:${widgetValue['directPhoneNumber']}">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%235461f4%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.61%2C31.06h0c-1.14-2.15-4.78-4.33-5.2-4.58a3.37%2C3.37%2C0%2C0%2C0-2.52-.41%2C2.48%2C2.48%2C0%2C0%2C0-1.46%2C1.1c-.47.56-1.06%2C1.23-1.19%2C1.34a1.59%2C1.59%2C0%2C0%2C1-2.42-.25l-6.09-6.08a1.58%2C1.58%2C0%2C0%2C1-.27-2.38c.14-.17.81-.76%2C1.37-1.23a2.48%2C2.48%2C0%2C0%2C0%2C1.1-1.46%2C3.35%2C3.35%2C0%2C0%2C0-.42-2.53c-.24-.41-2.42-4.05-4.57-5.19A3.32%2C3.32%2C0%2C0%2C0%2C15%2C10l-1.34%2C1.34C11.25%2C13.75%2C8.29%2C19%2C15.77%2C26.43l7.8%2C7.8C27.15%2C37.81%2C30.21%2C39%2C32.69%2C39a8.45%2C8.45%2C0%2C0%2C0%2C6-2.68L40%2C35A3.32%2C3.32%2C0%2C0%2C0%2C40.61%2C31.06Z%22%20style%3D%22fill%3A%20%23ffffff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E">
            </a>
        `);
    }
    if (widgetValue['cu_directWhatsapp']) {
      contact.append(`
            <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://wa.me/">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2330bf39%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M39.8%2C23.4A14.64%2C14.64%2C0%2C0%2C1%2C25.1%2C38%2C15.25%2C15.25%2C0%2C0%2C1%2C18%2C36.2L9.8%2C38.8%2C12.5%2C31a14.84%2C14.84%2C0%2C0%2C1-2.1-7.5%2C14.7%2C14.7%2C0%2C0%2C1%2C29.4-.1ZM25.1%2C11.2A12.38%2C12.38%2C0%2C0%2C0%2C12.7%2C23.5a12%2C12%2C0%2C0%2C0%2C2.4%2C7.2l-1.5%2C4.6%2C4.8-1.5A12.44%2C12.44%2C0%2C0%2C0%2C37.6%2C23.5%2C12.53%2C12.53%2C0%2C0%2C0%2C25.1%2C11.2Zm7.4%2C15.6a3.22%2C3.22%2C0%2C0%2C0-.7-.4l-2.5-1.2c-.3-.1-.6-.2-.8.2a8.54%2C8.54%2C0%2C0%2C1-1.1%2C1.4.59.59%2C0%2C0%2C1-.8.1%2C11%2C11%2C0%2C0%2C1-2.9-1.8%2C9.88%2C9.88%2C0%2C0%2C1-2-2.5.46.46%2C0%2C0%2C1%2C.2-.7%2C2.65%2C2.65%2C0%2C0%2C0%2C.5-.6c.2-.2.2-.4.4-.6a.64.64%2C0%2C0%2C0%2C0-.6c-.1-.2-.8-1.9-1.1-2.7s-.6-.6-.8-.6h-.7a1.85%2C1.85%2C0%2C0%2C0-1%2C.4%2C4.16%2C4.16%2C0%2C0%2C0-1.3%2C3%2C6.45%2C6.45%2C0%2C0%2C0%2C1.5%2C3.7c.2.2%2C2.5%2C4%2C6.2%2C5.4s3.7%2C1%2C4.3.9a3.74%2C3.74%2C0%2C0%2C0%2C2.4-1.7A2.82%2C2.82%2C0%2C0%2C0%2C32.5%2C26.8Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if (widgetValue['cu_diretEmail']) {
      contact.append(`
            <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="mailto:${widgetValue['directEmail']}">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%23fc872b%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M25%2C25.89%2C10%2C13.75H40Zm-6.78-2.28L10%2C17V32.58Zm13.56%2C0%2C8.22%2C9V17Zm-2%2C1.58L25%2C29.11l-4.84-3.92L10%2C36.25H40Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if (widgetValue['cu_directImessages']) {
      contact.append(`
            <a class="show hover-opacity sm-button sm-button-circle is-imessages" target="_blank" href="sms://${widgetValue['directIMessengerPhoneNumber']}">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%0A%09xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%0A%09xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%0A%09xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%0A%09xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%0A%09xmlns%3Asodipodi%3D%22http%3A%2F%2Fsodipodi.sourceforge.net%2FDTD%2Fsodipodi-0.dtd%22%0A%09xmlns%3Ainkscape%3D%22http%3A%2F%2Fwww.inkscape.org%2Fnamespaces%2Finkscape%22%0A%09width%3D%221024px%22%0A%09height%3D%221024px%22%0A%09viewBox%3D%220%200%2066.145836%2066.145836%22%0A%09version%3D%221.1%22%0A%09id%3D%22svg8%22%0A%09inkscape%3Aversion%3D%220.92.2%20(5c3e80d%2C%202017-08-06)%22%0A%09sodipodi%3Adocname%3D%22iMessage%20logo.svg%22%3E%0A%09%3Ctitle%0A%09%09id%3D%22title907%22%3EiMessage%20logo%3C%2Ftitle%3E%0A%09%3Cdefs%0A%09%09id%3D%22defs2%22%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09id%3D%22linearGradient899%22%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%220%22%0A%09%09%09%09id%3D%22stop895%22%2F%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%221%22%0A%09%09%09%09id%3D%22stop897%22%2F%3E%0A%09%09%3C%2FlinearGradient%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09xlink%3Ahref%3D%22%23linearGradient899%22%0A%09%09%09id%3D%22linearGradient901%22%0A%09%09%09x1%3D%22-25.272568%22%0A%09%09%09y1%3D%22207.52057%22%0A%09%09%09x2%3D%22-25.272568%22%0A%09%09%09y2%3D%22152.9982%22%0A%09%09%09gradientUnits%3D%22userSpaceOnUse%22%0A%09%09%09gradientTransform%3D%22matrix(0.98209275%2C0%2C0%2C0.98209275%2C-1.0651782%2C3.7961838)%22%2F%3E%0A%09%3C%2Fdefs%3E%0A%09%3Csodipodi%3Anamedview%0A%09%09id%3D%22base%22%0A%09%09pagecolor%3D%22%23ffffff%22%0A%09%09bordercolor%3D%22%23666666%22%0A%09%09borderopacity%3D%221.0%22%0A%09%09inkscape%3Apageopacity%3D%220.0%22%0A%09%09inkscape%3Apageshadow%3D%222%22%0A%09%09inkscape%3Azoom%3D%221%22%0A%09%09inkscape%3Acx%3D%22142.01984%22%0A%09%09inkscape%3Acy%3D%2261.975439%22%0A%09%09inkscape%3Adocument-units%3D%22px%22%0A%09%09inkscape%3Acurrent-layer%3D%22layer1%22%0A%09%09showgrid%3D%22false%22%0A%09%09inkscape%3Asnap-object-midpoints%3D%22false%22%0A%09%09showguides%3D%22true%22%0A%09%09inkscape%3Aguide-bbox%3D%22true%22%0A%09%09inkscape%3Asnap-intersection-paths%3D%22false%22%0A%09%09inkscape%3Awindow-width%3D%221920%22%0A%09%09inkscape%3Awindow-height%3D%221017%22%0A%09%09inkscape%3Awindow-x%3D%221358%22%0A%09%09inkscape%3Awindow-y%3D%22-8%22%0A%09%09inkscape%3Awindow-maximized%3D%221%22%0A%09%09fit-margin-top%3D%220%22%0A%09%09fit-margin-left%3D%220%22%0A%09%09fit-margin-right%3D%220%22%0A%09%09fit-margin-bottom%3D%220%22%2F%3E%0A%09%3Cmetadata%0A%09%09id%3D%22metadata5%22%3E%0A%09%09%3Crdf%3ARDF%3E%0A%09%09%09%3Ccc%3AWork%0A%09%09%09%09rdf%3Aabout%3D%22%22%3E%0A%09%09%09%09%3Cdc%3Aformat%3Eimage%2Fsvg%2Bxml%3C%2Fdc%3Aformat%3E%0A%09%09%09%09%3Cdc%3Atype%0A%09%09%09%09%09rdf%3Aresource%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2FStillImage%22%2F%3E%0A%09%09%09%09%3Cdc%3Atitle%3EiMessage%20logo%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%3Cdc%3Adate%3E02%2F04%2F2018%3C%2Fdc%3Adate%3E%0A%09%09%09%09%3Cdc%3Acreator%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3EApple%2C%20Inc.%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Acreator%3E%0A%09%09%09%09%3Cdc%3Apublisher%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3ECMetalCore%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Apublisher%3E%0A%09%09%09%09%3Cdc%3Asource%3Ehttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F85%2FIMessage_icon.png%3C%2Fdc%3Asource%3E%0A%09%09%09%3C%2Fcc%3AWork%3E%0A%09%09%3C%2Frdf%3ARDF%3E%0A%09%3C%2Fmetadata%3E%0A%09%3Cg%0A%09%09inkscape%3Alabel%3D%22Capa%201%22%0A%09%09inkscape%3Agroupmode%3D%22layer%22%0A%09%09id%3D%22layer1%22%0A%09%09transform%3D%22translate(59.483067%2C-145.8456)%22%3E%0A%09%09%3Cg%0A%09%09%09id%3D%22g963%22%3E%0A%09%09%09%3Crect%0A%09%09%09%09ry%3D%2214.567832%22%0A%09%09%09%09rx%3D%2214.567832%22%0A%09%09%09%09y%3D%22145.8456%22%0A%09%09%09%09x%3D%22-59.483067%22%0A%09%09%09%09height%3D%2266.145836%22%0A%09%09%09%09width%3D%2266.145836%22%0A%09%09%09%09id%3D%22rect826%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3Aurl(%23linearGradient901)%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.33634758%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09inkscape%3Aconnector-curvature%3D%220%22%0A%09%09%09%09id%3D%22path922%22%0A%09%09%09%09d%3D%22m%20-26.410149%2C157.29606%20a%2024.278298%2C20.222157%200%200%200%20-24.278105%2C20.22202%2024.278298%2C20.222157%200%200%200%2011.79463%2C17.31574%2027.365264%2C20.222157%200%200%201%20-4.245218%2C5.94228%2023.85735%2C20.222157%200%200%200%209.86038%2C-3.87367%2024.278298%2C20.222157%200%200%200%206.868313%2C0.83768%2024.278298%2C20.222157%200%200%200%2024.2781059%2C-20.22203%2024.278298%2C20.222157%200%200%200%20-24.2781059%2C-20.22202%20z%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3A%23ffffff%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.56409621%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if (widgetValue['cu_directWeibo']) {
      contact.append(`
            <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://api.weibo.com/chat/#/?to_uid=${widgetValue['directWeiboUserId']}">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221024%22%20height%3D%221024%22%20viewBox%3D%220%200%20300%20300%22%3E%0A%09%3Cg%3E%0A%09%09%3Ccircle%20cx%3D%22150%22%20cy%3D%22150%22%20r%3D%22150%22%20style%3D%22fill%3A%20%23f5f5f5%22%2F%3E%0A%09%09%3Cg%20transform%3D%22matrix(3.5%200%200%203.5%2070%2060)%22%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M50.448%2012.132c.217%202.814-.259%206.186-2.117%206.351-3.033.271-1.451-3.07-1.411-5.081.111-5.829-4.865-9.879-9.739-9.879-1.381%200-4.588.936-4.094-1.976.222-1.284%201.31-1.266%202.399-1.411%208.197-1.093%2014.386%204.546%2014.962%2011.996z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23D52A2C%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M37.04%2018.907c3.524%201.928%207.758%202.888%207.056%208.61-.168%201.371-.998%203.203-1.834%204.373-5.957%208.339-23.924%2011.844-35.144%205.506C3.355%2035.269-.539%2032.159.062%2025.962c.517-5.333%204.103-9.464%207.622-12.983%203.357-3.359%206.897-5.987%2011.714-7.198%205.226-1.314%206.771%203.043%205.363%207.339%203.027-.203%209.442-3.582%2012.279-.282%201.25%201.454.771%204.058%200%206.069zm-3.811%2013.548c1.129-1.28%202.264-3.231%202.257-5.503-.015-7.014-8.851-9.605-15.806-9.033-3.804.312-6.363%201.115-9.033%202.682-2.179%201.279-4.729%203.36-5.363%206.491-1.427%207.041%206.231%2010.35%2011.855%2010.726%206.498.437%2013.002-1.857%2016.09-5.363z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M43.531%2012.132c.296%202.149-.319%204.011-1.552%204.093-2.056.137-1.287-1.408-1.412-3.246-.078-1.132-1.016-2.439-1.835-2.823-1.606-.752-4.093.548-4.093-1.693%200-1.664%201.443-1.491%202.259-1.553%203.574-.272%206.216%202.191%206.633%205.222z%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M27.019%2026.246c3.007%209.088-12.66%2013.314-15.525%205.504-1.917-5.223%202.686-9.377%207.48-9.879%204.093-.429%207.144%201.658%208.045%204.375zm-7.198%201.553c.638%201.104%202.105.311%201.976-.564-.154-1.013-1.989-.863-1.976.564zm-2.541%204.799c2.634-.627%202.988-5.588-.988-4.658-3.34.78-2.694%205.533.988%204.658z%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
    if (widgetValue['cu_directViber']) {
      contact.append(`
            <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="viber://pa?chatURI=${widgetValue['directOrViberBotName']}">
                <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20version%3D%221.0%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000000%22%0A%20width%3D%2250.000000pt%22%20height%3D%2250.000000pt%22%20viewBox%3D%220%200%2050.000000%2050.000000%22%0A%20preserveAspectRatio%3D%22xMidYMid%20meet%22%3E%0A%0A%3Ccircle%20cx%3D%2220pt%22%20cy%3D%2220pt%22%20r%3D%2216pt%22%20fill%3D%22%23fff%22%3E%3C%2Fcircle%3E%0A%3Cg%20transform%3D%22translate(0.000000%2C50.000000)%20scale(0.100000%2C-0.100000)%22%0Afill%3D%22blue%22%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M167%20484%20c-92%20-28%20-167%20-134%20-167%20-234%200%20-131%20119%20-250%20250%20-250%20129%0A0%20250%20121%20250%20250%200%20100%20-78%20207%20-172%20235%20-63%2018%20-98%2018%20-161%20-1z%20m198%20-86%0Ac34%20-27%2055%20-75%2055%20-128%200%20-94%20-54%20-150%20-144%20-150%20-37%200%20-56%20-6%20-72%20-21%20-25%0A-23%20-44%20-18%20-44%2010%200%2010%20-12%2026%20-26%2036%20-72%2047%20-71%20196%201%20253%2024%2019%2041%2022%20115%0A22%2074%200%2091%20-3%20115%20-22z%22%2F%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M185%20383%20c-11%20-3%20-30%20-14%20-42%20-26%20-19%20-17%20-23%20-31%20-23%20-85%200%20-57%203%0A-66%2030%20-94%2018%20-18%2030%20-40%2030%20-56%20l0%20-26%2028%2026%20c18%2018%2043%2028%2080%2033%2071%209%2092%2036%0A92%20120%200%2084%20-22%20106%20-112%20111%20-35%201%20-72%200%20-83%20-3z%20m112%20-38%20c24%20-17%2047%20-72%2032%0A-80%20-5%20-4%20-9%204%20-10%2017%200%2021%20-1%2021%20-8%204%20-7%20-19%20-8%20-19%20-13%202%20-4%2012%20-14%2025%20-25%0A29%20-18%207%20-33%2022%20-33%2036%200%2012%2034%208%2057%20-8z%20m-83%20-17%20c11%20-15%2012%20-25%205%20-34%20-21%0A-26%2030%20-75%2056%20-54%209%207%2019%205%2036%20-9%2023%20-19%2023%20-21%207%20-37%20-14%20-15%20-21%20-15%20-47%20-4%0A-35%2014%20-96%2077%20-106%20109%20-6%2021%209%2051%2026%2051%204%200%2015%20-10%2023%20-22z%20m71%20-29%20c11%20-17%0A-1%20-21%20-15%20-4%20-8%209%20-8%2015%20-2%2015%206%200%2014%20-5%2017%20-11z%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
            </a>
        `);
    }
  }
  // Update Initial Message Popup Section Inputs
  if (behaviorType !== 'open-direct') {
    $('#cu_notificationWindow').show();

    $('#cu_notificationWindow .mgr_name').html(widgetValue['cuManagerName_1']);
    $('#cu_notificationWindow .mgr_role').html(widgetValue['cuRoles_1']);
    $('#cu_notificationWindow .mgr_text').html(widgetValue['cuInitialWords_1']);

    $("#cu_notificationWindow img").attr("src", widgetValue['cuCoverImageVal_1']);
    
    let dismissP = widgetValue['cu_dismissPeriod'];
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

function updateRealWidgetSection(behaviorType, firstMgrUsed) {
  if (behaviorType === "support-managers") {
    if (firstMgrUsed) {
      $('#firstManagerChatHeaderArea .sm-selected-manager').html(`
          <div class="sm-manager sm-manager-header">
              <div class="sm-avatar">
              </div>
              <div class="sm-info">
                  <div class="sm-name">${widgetValue['cuManagerName_1']}</div>
                  <div class="sm-role">${widgetValue['cuRoles_1']}</div>
              </div>
          </div>
          `);

      $('#firstManagerChatHeaderArea .sm-selected-manager').find('.sm-avatar').css('background-image', `url(${widgetValue['cuCoverImageVal_1']})`);
    }
    else {
      $('#firstManagerChatHeaderArea .sm-selected-manager').html(`
          <div class="sm-chat-back" style="rotate: 180deg;">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2225%22%20height%3D%2225%22%20viewBox%3D%220%200%2025%2025%22%3E%0A%09%3Cpath%20style%3D%22fill%3A%20%23fff%22%0A%09%20%20%20%20%20%20d%3D%22M19.45%2C11.52%2C8.32.4a1.36%2C1.36%2C0%2C0%2C0-1-.4%2C1.33%2C1.33%2C0%2C0%2C0-1%2C.4l-.82.82a1.35%2C1.35%2C0%2C0%2C0%2C0%2C1.93l9.34%2C9.34L5.56%2C21.85a1.45%2C1.45%2C0%2C0%2C0%2C0%2C2l.82.82a1.33%2C1.33%2C0%2C0%2C0%2C1%2C.4%2C1.36%2C1.36%2C0%2C0%2C0%2C1-.4l11.07-11.2a1.4%2C1.4%2C0%2C0%2C0%2C0-2l0%2C0Z%22%2F%3E%0A%3C%2Fsvg%3E">
          </div>
          <div class="sm-manager sm-manager-header">
              <div class="sm-info">
                  <div class="sm-name"></div>
                  <div class="sm-role"></div>
              </div>
              <div class="sm-avatar">
              </div>
          </div>
      `);
    }
  }

  if (behaviorType === "support-managers") {
    if (firstMgrUsed) {
      $('#firstManagerChatBody .message-author').html(widgetValue['cuManagerName_1']);
      $('#firstManagerChatBody .message-text').html(widgetValue['cuInitialWords_1']);
      updateRealContactFooterIcon(1);
    }
    else {
      $('#selectedManagerChatBody').empty();

      var fieldCount = 0;
      $.each(widgetValue, function (key, value) {
        if (key.startsWith('cuManagerName_')) {
          fieldCount++;
        }
      });

      for (let i = 1 ; i <= fieldCount ; i ++) {
        let idx = i;
        let newItem = $(`
          <div class="sm-manager" data-id="${idx}">
                      <div class="sm-avatar">
                      </div>
                      <div class="sm-info">
                          <div class="sm-role">${widgetValue['cuRoles_' + idx]}</div>
                          <div class="sm-name">${widgetValue['cuManagerName_' + idx]}</div>
                          <div class="sm-caption">${widgetValue['cuCaption_' + idx]}</div>
                          <div class="sm-contact"></div>                          
                      </div>
                  </div>
          `);
        newItem.find('.sm-avatar').css('background-image', `url(${widgetValue['cuCoverImageVal_' + idx]})`);

        $('#selectedManagerChatBody').append(newItem);

        if (widgetValue['cuFacebook_' + idx]) {
          newItem.find('.sm-contact').append(`
                <span class="cu-manager-chat-button">
                    <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Ctitle%3EFacebook%20Messenger%3C%2Ftitle%3E%0A%09%09%3Cg%3E%0A%09%09%09%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230084ff%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M25%2C10c-8.29%2C0-15%2C6.22-15%2C13.89A13.5%2C13.5%2C0%2C0%2C0%2C15.59%2C34.7V40l5.11-2.8a16.45%2C16.45%2C0%2C0%2C0%2C4.3.58c8.28%2C0%2C15-6.22%2C15-13.89S33.28%2C10%2C25%2C10Zm1.49%2C18.7-3.82-4.07L15.22%2C28.7l8.2-8.7%2C3.91%2C4.07L34.69%2C20Z%22%0A%09%09%09%09style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A"></img>
                </span>
            `);
        }
        if (widgetValue['cuSkype_' + idx]) {
          newItem.find('.sm-contact').append(`
                <span class="cu-manager-chat-button">
                    <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%20%20%3Cg%3E%0A%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2315ace5%22%2F%3E%0A%09%20%20%20%20%3Cpath%20d%3D%22M38.89%2C27.72A14.34%2C14.34%2C0%2C0%2C0%2C39.15%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C10.85a14.34%2C14.34%2C0%2C0%2C0-2.72.26A8.17%2C8.17%2C0%2C0%2C0%2C11.11%2C22.28%2C14.34%2C14.34%2C0%2C0%2C0%2C10.85%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C39.15a14.34%2C14.34%2C0%2C0%2C0%2C2.72-.26A8.17%2C8.17%2C0%2C0%2C0%2C38.89%2C27.72Zm-13.62%2C7c-5%2C0-7.54-1.89-8.32-4.26s.92-3%2C1.46-3.09a1.85%2C1.85%2C0%2C0%2C1%2C2%2C1.06%2C4.68%2C4.68%2C0%2C0%2C0%2C3.86%2C3.29c2.42.24%2C4-.87%2C4.5-2s-.39-2.76-4.11-3.29-7.59-2.17-7.59-5.9%2C4.26-5.22%2C8.32-5.22%2C6.11%2C2.3%2C6.57%2C3.19c.56%2C1.12.37%2C3-1%2C3.29s-2.12-.43-3.14-2.32-4.78-1.45-6-.34-.92%2C2.71%2C4.3%2C3.72%2C7.15%2C2.9%2C7.15%2C5.85S30.3%2C34.72%2C25.27%2C34.72Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A"></img>
                </span>
            `);
        }
        if (widgetValue['cuTelegram_' + idx]) {
          newItem.find('.sm-contact').append(`
                <span class="cu-manager-chat-button">
                    <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Cg%3E%0A%09%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230088cc%22%2F%3E%0A%09%09%20%20%20%20%3Cpath%20d%3D%22M36%2C10.2%2C9.4%2C22.42c-1.81.87-1.8%2C2.07-.33%2C2.61L15.7%2C27.5l2.53%2C9.27c.31%2C1%2C.16%2C1.41%2C1.05%2C1.41a1.68%2C1.68%2C0%2C0%2C0%2C1.38-.82L24%2C33.52l6.89%2C6.07c1.27.84%2C2.19.4%2C2.5-1.4L37.9%2C12.76C38.36%2C10.55%2C37.19%2C9.54%2C36%2C10.2ZM16.74%2C26.93%2C31.68%2C15.69c.74-.54%2C1.43-.25.86.35L19.75%2C29.8l-.49%2C6.33Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A"></img>
                </span>
            `);
        }
        if (widgetValue['cuInstagram_' + idx]) {
          newItem.find('.sm-contact').append(`
                <span class="cu-manager-chat-button">
                    <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%09%3ClinearGradient%20id%3D%22SVGID_1_%22%20gradientTransform%3D%22matrix(0%20-1.982%20-1.844%200%20-132.522%20-51.077)%22%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-37.106%22%20x2%3D%22-26.555%22%20y1%3D%22-72.705%22%20y2%3D%22-84.047%22%3E%0A%09%09%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fd5%22%2F%3E%0A%09%09%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%23ff543e%22%2F%3E%0A%09%09%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c837ab%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%0A%09%09d%3D%22m1.5%201.633c-1.886%201.959-1.5%204.04-1.5%2010.362%200%205.25-.916%2010.513%203.878%2011.752%201.497.385%2014.761.385%2016.256-.002%201.996-.515%203.62-2.134%203.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41%201.633z%22%0A%09%09fill%3D%22url(%23SVGID_1_)%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22m11.998%203.139c-3.631%200-7.079-.323-8.396%203.057-.544%201.396-.465%203.209-.465%205.805%200%202.278-.073%204.419.465%205.804%201.314%203.382%204.79%203.058%208.394%203.058%203.477%200%207.062.362%208.395-3.058.545-1.41.465-3.196.465-5.804%200-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794%201.597c7.574-.012%208.538-.854%208.006%2010.843-.189%204.137-3.339%203.683-7.211%203.683-7.06%200-7.263-.202-7.263-7.265%200-7.145.56-7.257%206.468-7.263zm5.524%201.471c-.587%200-1.063.476-1.063%201.063s.476%201.063%201.063%201.063%201.063-.476%201.063-1.063-.476-1.063-1.063-1.063zm-4.73%201.243c-2.513%200-4.55%202.038-4.55%204.551s2.037%204.55%204.55%204.55%204.549-2.037%204.549-4.55-2.036-4.551-4.549-4.551zm0%201.597c3.905%200%203.91%205.908%200%205.908-3.904%200-3.91-5.908%200-5.908z%22%0A%09%09fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E"></img>
                </span>
            `);
        }
        if (widgetValue['cuPhoneNumber_' + idx]) {
          newItem.find('.sm-contact').append(`
                <span class="cu-manager-chat-button">
                    <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%235461f4%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.61%2C31.06h0c-1.14-2.15-4.78-4.33-5.2-4.58a3.37%2C3.37%2C0%2C0%2C0-2.52-.41%2C2.48%2C2.48%2C0%2C0%2C0-1.46%2C1.1c-.47.56-1.06%2C1.23-1.19%2C1.34a1.59%2C1.59%2C0%2C0%2C1-2.42-.25l-6.09-6.08a1.58%2C1.58%2C0%2C0%2C1-.27-2.38c.14-.17.81-.76%2C1.37-1.23a2.48%2C2.48%2C0%2C0%2C0%2C1.1-1.46%2C3.35%2C3.35%2C0%2C0%2C0-.42-2.53c-.24-.41-2.42-4.05-4.57-5.19A3.32%2C3.32%2C0%2C0%2C0%2C15%2C10l-1.34%2C1.34C11.25%2C13.75%2C8.29%2C19%2C15.77%2C26.43l7.8%2C7.8C27.15%2C37.81%2C30.21%2C39%2C32.69%2C39a8.45%2C8.45%2C0%2C0%2C0%2C6-2.68L40%2C35A3.32%2C3.32%2C0%2C0%2C0%2C40.61%2C31.06Z%22%20style%3D%22fill%3A%20%23ffffff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"></img>
                </span>
            `);
        }
        if (widgetValue['cuWhatsapp_' + idx]) {
          newItem.find('.sm-contact').append(`
                <span class="cu-manager-chat-button">
                    <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2330bf39%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M39.8%2C23.4A14.64%2C14.64%2C0%2C0%2C1%2C25.1%2C38%2C15.25%2C15.25%2C0%2C0%2C1%2C18%2C36.2L9.8%2C38.8%2C12.5%2C31a14.84%2C14.84%2C0%2C0%2C1-2.1-7.5%2C14.7%2C14.7%2C0%2C0%2C1%2C29.4-.1ZM25.1%2C11.2A12.38%2C12.38%2C0%2C0%2C0%2C12.7%2C23.5a12%2C12%2C0%2C0%2C0%2C2.4%2C7.2l-1.5%2C4.6%2C4.8-1.5A12.44%2C12.44%2C0%2C0%2C0%2C37.6%2C23.5%2C12.53%2C12.53%2C0%2C0%2C0%2C25.1%2C11.2Zm7.4%2C15.6a3.22%2C3.22%2C0%2C0%2C0-.7-.4l-2.5-1.2c-.3-.1-.6-.2-.8.2a8.54%2C8.54%2C0%2C0%2C1-1.1%2C1.4.59.59%2C0%2C0%2C1-.8.1%2C11%2C11%2C0%2C0%2C1-2.9-1.8%2C9.88%2C9.88%2C0%2C0%2C1-2-2.5.46.46%2C0%2C0%2C1%2C.2-.7%2C2.65%2C2.65%2C0%2C0%2C0%2C.5-.6c.2-.2.2-.4.4-.6a.64.64%2C0%2C0%2C0%2C0-.6c-.1-.2-.8-1.9-1.1-2.7s-.6-.6-.8-.6h-.7a1.85%2C1.85%2C0%2C0%2C0-1%2C.4%2C4.16%2C4.16%2C0%2C0%2C0-1.3%2C3%2C6.45%2C6.45%2C0%2C0%2C0%2C1.5%2C3.7c.2.2%2C2.5%2C4%2C6.2%2C5.4s3.7%2C1%2C4.3.9a3.74%2C3.74%2C0%2C0%2C0%2C2.4-1.7A2.82%2C2.82%2C0%2C0%2C0%2C32.5%2C26.8Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A"></img>
                </span>
            `);
        }
        if (widgetValue['cuEmail_' + idx]) {
          newItem.find('.sm-contact').append(`
                <span class="cu-manager-chat-button">
                    <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%23fc872b%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M25%2C25.89%2C10%2C13.75H40Zm-6.78-2.28L10%2C17V32.58Zm13.56%2C0%2C8.22%2C9V17Zm-2%2C1.58L25%2C29.11l-4.84-3.92L10%2C36.25H40Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A"></img>
                </span>
            `);
        }
        if (widgetValue['cuImessages_' + idx]) {
          newItem.find('.sm-contact').append(`
                <span class="cu-manager-chat-button">
                    <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%0A%09xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%0A%09xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%0A%09xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%0A%09xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%0A%09xmlns%3Asodipodi%3D%22http%3A%2F%2Fsodipodi.sourceforge.net%2FDTD%2Fsodipodi-0.dtd%22%0A%09xmlns%3Ainkscape%3D%22http%3A%2F%2Fwww.inkscape.org%2Fnamespaces%2Finkscape%22%0A%09width%3D%221024px%22%0A%09height%3D%221024px%22%0A%09viewBox%3D%220%200%2066.145836%2066.145836%22%0A%09version%3D%221.1%22%0A%09id%3D%22svg8%22%0A%09inkscape%3Aversion%3D%220.92.2%20(5c3e80d%2C%202017-08-06)%22%0A%09sodipodi%3Adocname%3D%22iMessage%20logo.svg%22%3E%0A%09%3Ctitle%0A%09%09id%3D%22title907%22%3EiMessage%20logo%3C%2Ftitle%3E%0A%09%3Cdefs%0A%09%09id%3D%22defs2%22%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09id%3D%22linearGradient899%22%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%220%22%0A%09%09%09%09id%3D%22stop895%22%2F%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%221%22%0A%09%09%09%09id%3D%22stop897%22%2F%3E%0A%09%09%3C%2FlinearGradient%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09xlink%3Ahref%3D%22%23linearGradient899%22%0A%09%09%09id%3D%22linearGradient901%22%0A%09%09%09x1%3D%22-25.272568%22%0A%09%09%09y1%3D%22207.52057%22%0A%09%09%09x2%3D%22-25.272568%22%0A%09%09%09y2%3D%22152.9982%22%0A%09%09%09gradientUnits%3D%22userSpaceOnUse%22%0A%09%09%09gradientTransform%3D%22matrix(0.98209275%2C0%2C0%2C0.98209275%2C-1.0651782%2C3.7961838)%22%2F%3E%0A%09%3C%2Fdefs%3E%0A%09%3Csodipodi%3Anamedview%0A%09%09id%3D%22base%22%0A%09%09pagecolor%3D%22%23ffffff%22%0A%09%09bordercolor%3D%22%23666666%22%0A%09%09borderopacity%3D%221.0%22%0A%09%09inkscape%3Apageopacity%3D%220.0%22%0A%09%09inkscape%3Apageshadow%3D%222%22%0A%09%09inkscape%3Azoom%3D%221%22%0A%09%09inkscape%3Acx%3D%22142.01984%22%0A%09%09inkscape%3Acy%3D%2261.975439%22%0A%09%09inkscape%3Adocument-units%3D%22px%22%0A%09%09inkscape%3Acurrent-layer%3D%22layer1%22%0A%09%09showgrid%3D%22false%22%0A%09%09inkscape%3Asnap-object-midpoints%3D%22false%22%0A%09%09showguides%3D%22true%22%0A%09%09inkscape%3Aguide-bbox%3D%22true%22%0A%09%09inkscape%3Asnap-intersection-paths%3D%22false%22%0A%09%09inkscape%3Awindow-width%3D%221920%22%0A%09%09inkscape%3Awindow-height%3D%221017%22%0A%09%09inkscape%3Awindow-x%3D%221358%22%0A%09%09inkscape%3Awindow-y%3D%22-8%22%0A%09%09inkscape%3Awindow-maximized%3D%221%22%0A%09%09fit-margin-top%3D%220%22%0A%09%09fit-margin-left%3D%220%22%0A%09%09fit-margin-right%3D%220%22%0A%09%09fit-margin-bottom%3D%220%22%2F%3E%0A%09%3Cmetadata%0A%09%09id%3D%22metadata5%22%3E%0A%09%09%3Crdf%3ARDF%3E%0A%09%09%09%3Ccc%3AWork%0A%09%09%09%09rdf%3Aabout%3D%22%22%3E%0A%09%09%09%09%3Cdc%3Aformat%3Eimage%2Fsvg%2Bxml%3C%2Fdc%3Aformat%3E%0A%09%09%09%09%3Cdc%3Atype%0A%09%09%09%09%09rdf%3Aresource%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2FStillImage%22%2F%3E%0A%09%09%09%09%3Cdc%3Atitle%3EiMessage%20logo%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%3Cdc%3Adate%3E02%2F04%2F2018%3C%2Fdc%3Adate%3E%0A%09%09%09%09%3Cdc%3Acreator%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3EApple%2C%20Inc.%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Acreator%3E%0A%09%09%09%09%3Cdc%3Apublisher%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3ECMetalCore%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Apublisher%3E%0A%09%09%09%09%3Cdc%3Asource%3Ehttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F85%2FIMessage_icon.png%3C%2Fdc%3Asource%3E%0A%09%09%09%3C%2Fcc%3AWork%3E%0A%09%09%3C%2Frdf%3ARDF%3E%0A%09%3C%2Fmetadata%3E%0A%09%3Cg%0A%09%09inkscape%3Alabel%3D%22Capa%201%22%0A%09%09inkscape%3Agroupmode%3D%22layer%22%0A%09%09id%3D%22layer1%22%0A%09%09transform%3D%22translate(59.483067%2C-145.8456)%22%3E%0A%09%09%3Cg%0A%09%09%09id%3D%22g963%22%3E%0A%09%09%09%3Crect%0A%09%09%09%09ry%3D%2214.567832%22%0A%09%09%09%09rx%3D%2214.567832%22%0A%09%09%09%09y%3D%22145.8456%22%0A%09%09%09%09x%3D%22-59.483067%22%0A%09%09%09%09height%3D%2266.145836%22%0A%09%09%09%09width%3D%2266.145836%22%0A%09%09%09%09id%3D%22rect826%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3Aurl(%23linearGradient901)%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.33634758%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09inkscape%3Aconnector-curvature%3D%220%22%0A%09%09%09%09id%3D%22path922%22%0A%09%09%09%09d%3D%22m%20-26.410149%2C157.29606%20a%2024.278298%2C20.222157%200%200%200%20-24.278105%2C20.22202%2024.278298%2C20.222157%200%200%200%2011.79463%2C17.31574%2027.365264%2C20.222157%200%200%201%20-4.245218%2C5.94228%2023.85735%2C20.222157%200%200%200%209.86038%2C-3.87367%2024.278298%2C20.222157%200%200%200%206.868313%2C0.83768%2024.278298%2C20.222157%200%200%200%2024.2781059%2C-20.22203%2024.278298%2C20.222157%200%200%200%20-24.2781059%2C-20.22202%20z%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3A%23ffffff%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.56409621%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A"></img>
                </span>
            `);
        }
        if (widgetValue['cuWeibo_' + idx]) {
          newItem.find('.sm-contact').append(`
                <span class="cu-manager-chat-button">
                    <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221024%22%20height%3D%221024%22%20viewBox%3D%220%200%20300%20300%22%3E%0A%09%3Cg%3E%0A%09%09%3Ccircle%20cx%3D%22150%22%20cy%3D%22150%22%20r%3D%22150%22%20style%3D%22fill%3A%20%23f5f5f5%22%2F%3E%0A%09%09%3Cg%20transform%3D%22matrix(3.5%200%200%203.5%2070%2060)%22%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M50.448%2012.132c.217%202.814-.259%206.186-2.117%206.351-3.033.271-1.451-3.07-1.411-5.081.111-5.829-4.865-9.879-9.739-9.879-1.381%200-4.588.936-4.094-1.976.222-1.284%201.31-1.266%202.399-1.411%208.197-1.093%2014.386%204.546%2014.962%2011.996z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23D52A2C%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M37.04%2018.907c3.524%201.928%207.758%202.888%207.056%208.61-.168%201.371-.998%203.203-1.834%204.373-5.957%208.339-23.924%2011.844-35.144%205.506C3.355%2035.269-.539%2032.159.062%2025.962c.517-5.333%204.103-9.464%207.622-12.983%203.357-3.359%206.897-5.987%2011.714-7.198%205.226-1.314%206.771%203.043%205.363%207.339%203.027-.203%209.442-3.582%2012.279-.282%201.25%201.454.771%204.058%200%206.069zm-3.811%2013.548c1.129-1.28%202.264-3.231%202.257-5.503-.015-7.014-8.851-9.605-15.806-9.033-3.804.312-6.363%201.115-9.033%202.682-2.179%201.279-4.729%203.36-5.363%206.491-1.427%207.041%206.231%2010.35%2011.855%2010.726%206.498.437%2013.002-1.857%2016.09-5.363z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M43.531%2012.132c.296%202.149-.319%204.011-1.552%204.093-2.056.137-1.287-1.408-1.412-3.246-.078-1.132-1.016-2.439-1.835-2.823-1.606-.752-4.093.548-4.093-1.693%200-1.664%201.443-1.491%202.259-1.553%203.574-.272%206.216%202.191%206.633%205.222z%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M27.019%2026.246c3.007%209.088-12.66%2013.314-15.525%205.504-1.917-5.223%202.686-9.377%207.48-9.879%204.093-.429%207.144%201.658%208.045%204.375zm-7.198%201.553c.638%201.104%202.105.311%201.976-.564-.154-1.013-1.989-.863-1.976.564zm-2.541%204.799c2.634-.627%202.988-5.588-.988-4.658-3.34.78-2.694%205.533.988%204.658z%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
                </span>
            `);
        }
        if (widgetValue['cuViber_' + idx]) {
          newItem.find('.sm-contact').append(`
                <span class="cu-manager-chat-button">
                    <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20version%3D%221.0%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000000%22%0A%20width%3D%2250.000000pt%22%20height%3D%2250.000000pt%22%20viewBox%3D%220%200%2050.000000%2050.000000%22%0A%20preserveAspectRatio%3D%22xMidYMid%20meet%22%3E%0A%0A%3Ccircle%20cx%3D%2220pt%22%20cy%3D%2220pt%22%20r%3D%2216pt%22%20fill%3D%22%23fff%22%3E%3C%2Fcircle%3E%0A%3Cg%20transform%3D%22translate(0.000000%2C50.000000)%20scale(0.100000%2C-0.100000)%22%0Afill%3D%22blue%22%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M167%20484%20c-92%20-28%20-167%20-134%20-167%20-234%200%20-131%20119%20-250%20250%20-250%20129%0A0%20250%20121%20250%20250%200%20100%20-78%20207%20-172%20235%20-63%2018%20-98%2018%20-161%20-1z%20m198%20-86%0Ac34%20-27%2055%20-75%2055%20-128%200%20-94%20-54%20-150%20-144%20-150%20-37%200%20-56%20-6%20-72%20-21%20-25%0A-23%20-44%20-18%20-44%2010%200%2010%20-12%2026%20-26%2036%20-72%2047%20-71%20196%201%20253%2024%2019%2041%2022%20115%0A22%2074%200%2091%20-3%20115%20-22z%22%2F%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M185%20383%20c-11%20-3%20-30%20-14%20-42%20-26%20-19%20-17%20-23%20-31%20-23%20-85%200%20-57%203%0A-66%2030%20-94%2018%20-18%2030%20-40%2030%20-56%20l0%20-26%2028%2026%20c18%2018%2043%2028%2080%2033%2071%209%2092%2036%0A92%20120%200%2084%20-22%20106%20-112%20111%20-35%201%20-72%200%20-83%20-3z%20m112%20-38%20c24%20-17%2047%20-72%2032%0A-80%20-5%20-4%20-9%204%20-10%2017%200%2021%20-1%2021%20-8%204%20-7%20-19%20-8%20-19%20-13%202%20-4%2012%20-14%2025%20-25%0A29%20-18%207%20-33%2022%20-33%2036%200%2012%2034%208%2057%20-8z%20m-83%20-17%20c11%20-15%2012%20-25%205%20-34%20-21%0A-26%2030%20-75%2056%20-54%209%207%2019%205%2036%20-9%2023%20-19%2023%20-21%207%20-37%20-14%20-15%20-21%20-15%20-47%20-4%0A-35%2014%20-96%2077%20-106%20109%20-6%2021%209%2051%2026%2051%204%200%2015%20-10%2023%20-22z%20m71%20-29%20c11%20-17%0A-1%20-21%20-15%20-4%20-8%209%20-8%2015%20-2%2015%206%200%2014%20-5%2017%20-11z%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
                </span>
            `);
        }
      };
    }
  }
}

function updateRealContactFooterIcon(index) {
  let contact = $('#firstManagerChatFooter .cu-manager-footer-chat-buttons-wrapper');
  contact.empty();
  if (widgetValue['cuFacebook_' + index]) {
    contact.append(`
          <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://www.messenger.com/t/@facebook_messenger_id?call">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Ctitle%3EFacebook%20Messenger%3C%2Ftitle%3E%0A%09%09%3Cg%3E%0A%09%09%09%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230084ff%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M25%2C10c-8.29%2C0-15%2C6.22-15%2C13.89A13.5%2C13.5%2C0%2C0%2C0%2C15.59%2C34.7V40l5.11-2.8a16.45%2C16.45%2C0%2C0%2C0%2C4.3.58c8.28%2C0%2C15-6.22%2C15-13.89S33.28%2C10%2C25%2C10Zm1.49%2C18.7-3.82-4.07L15.22%2C28.7l8.2-8.7%2C3.91%2C4.07L34.69%2C20Z%22%0A%09%09%09%09style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
          </a>
      `);
  }
  if (widgetValue['cuSkype_' + index]) {
    contact.append(`
          <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="skype:skype_account?chat">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%20%20%3Cg%3E%0A%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2315ace5%22%2F%3E%0A%09%20%20%20%20%3Cpath%20d%3D%22M38.89%2C27.72A14.34%2C14.34%2C0%2C0%2C0%2C39.15%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C10.85a14.34%2C14.34%2C0%2C0%2C0-2.72.26A8.17%2C8.17%2C0%2C0%2C0%2C11.11%2C22.28%2C14.34%2C14.34%2C0%2C0%2C0%2C10.85%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C39.15a14.34%2C14.34%2C0%2C0%2C0%2C2.72-.26A8.17%2C8.17%2C0%2C0%2C0%2C38.89%2C27.72Zm-13.62%2C7c-5%2C0-7.54-1.89-8.32-4.26s.92-3%2C1.46-3.09a1.85%2C1.85%2C0%2C0%2C1%2C2%2C1.06%2C4.68%2C4.68%2C0%2C0%2C0%2C3.86%2C3.29c2.42.24%2C4-.87%2C4.5-2s-.39-2.76-4.11-3.29-7.59-2.17-7.59-5.9%2C4.26-5.22%2C8.32-5.22%2C6.11%2C2.3%2C6.57%2C3.19c.56%2C1.12.37%2C3-1%2C3.29s-2.12-.43-3.14-2.32-4.78-1.45-6-.34-.92%2C2.71%2C4.3%2C3.72%2C7.15%2C2.9%2C7.15%2C5.85S30.3%2C34.72%2C25.27%2C34.72Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
          </a>
      `);
  }
  if (widgetValue['cuTelegram_' + index]) {
    contact.append(`
          <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://t.me/@telegram">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Cg%3E%0A%09%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230088cc%22%2F%3E%0A%09%09%20%20%20%20%3Cpath%20d%3D%22M36%2C10.2%2C9.4%2C22.42c-1.81.87-1.8%2C2.07-.33%2C2.61L15.7%2C27.5l2.53%2C9.27c.31%2C1%2C.16%2C1.41%2C1.05%2C1.41a1.68%2C1.68%2C0%2C0%2C0%2C1.38-.82L24%2C33.52l6.89%2C6.07c1.27.84%2C2.19.4%2C2.5-1.4L37.9%2C12.76C38.36%2C10.55%2C37.19%2C9.54%2C36%2C10.2ZM16.74%2C26.93%2C31.68%2C15.69c.74-.54%2C1.43-.25.86.35L19.75%2C29.8l-.49%2C6.33Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
          </a>
      `);
  }
  if (widgetValue['cuInstagram_' + index]) {
    contact.append(`
          <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://ig.me/m/@instagram">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%09%3ClinearGradient%20id%3D%22SVGID_1_%22%20gradientTransform%3D%22matrix(0%20-1.982%20-1.844%200%20-132.522%20-51.077)%22%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-37.106%22%20x2%3D%22-26.555%22%20y1%3D%22-72.705%22%20y2%3D%22-84.047%22%3E%0A%09%09%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fd5%22%2F%3E%0A%09%09%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%23ff543e%22%2F%3E%0A%09%09%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c837ab%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%0A%09%09d%3D%22m1.5%201.633c-1.886%201.959-1.5%204.04-1.5%2010.362%200%205.25-.916%2010.513%203.878%2011.752%201.497.385%2014.761.385%2016.256-.002%201.996-.515%203.62-2.134%203.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41%201.633z%22%0A%09%09fill%3D%22url(%23SVGID_1_)%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22m11.998%203.139c-3.631%200-7.079-.323-8.396%203.057-.544%201.396-.465%203.209-.465%205.805%200%202.278-.073%204.419.465%205.804%201.314%203.382%204.79%203.058%208.394%203.058%203.477%200%207.062.362%208.395-3.058.545-1.41.465-3.196.465-5.804%200-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794%201.597c7.574-.012%208.538-.854%208.006%2010.843-.189%204.137-3.339%203.683-7.211%203.683-7.06%200-7.263-.202-7.263-7.265%200-7.145.56-7.257%206.468-7.263zm5.524%201.471c-.587%200-1.063.476-1.063%201.063s.476%201.063%201.063%201.063%201.063-.476%201.063-1.063-.476-1.063-1.063-1.063zm-4.73%201.243c-2.513%200-4.55%202.038-4.55%204.551s2.037%204.55%204.55%204.55%204.549-2.037%204.549-4.55-2.036-4.551-4.549-4.551zm0%201.597c3.905%200%203.91%205.908%200%205.908-3.904%200-3.91-5.908%200-5.908z%22%0A%09%09fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E">
          </a>
      `);
  }
  if (widgetValue['cuPhoneNumber_' + index]) {
    contact.append(`
          <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="tel:${widgetValue['phoneNumber_' + index]}">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%235461f4%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.61%2C31.06h0c-1.14-2.15-4.78-4.33-5.2-4.58a3.37%2C3.37%2C0%2C0%2C0-2.52-.41%2C2.48%2C2.48%2C0%2C0%2C0-1.46%2C1.1c-.47.56-1.06%2C1.23-1.19%2C1.34a1.59%2C1.59%2C0%2C0%2C1-2.42-.25l-6.09-6.08a1.58%2C1.58%2C0%2C0%2C1-.27-2.38c.14-.17.81-.76%2C1.37-1.23a2.48%2C2.48%2C0%2C0%2C0%2C1.1-1.46%2C3.35%2C3.35%2C0%2C0%2C0-.42-2.53c-.24-.41-2.42-4.05-4.57-5.19A3.32%2C3.32%2C0%2C0%2C0%2C15%2C10l-1.34%2C1.34C11.25%2C13.75%2C8.29%2C19%2C15.77%2C26.43l7.8%2C7.8C27.15%2C37.81%2C30.21%2C39%2C32.69%2C39a8.45%2C8.45%2C0%2C0%2C0%2C6-2.68L40%2C35A3.32%2C3.32%2C0%2C0%2C0%2C40.61%2C31.06Z%22%20style%3D%22fill%3A%20%23ffffff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E">
          </a>
      `);
  }
  if (widgetValue['cuWhatsapp_' + index]) {
    contact.append(`
          <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://wa.me/">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2330bf39%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M39.8%2C23.4A14.64%2C14.64%2C0%2C0%2C1%2C25.1%2C38%2C15.25%2C15.25%2C0%2C0%2C1%2C18%2C36.2L9.8%2C38.8%2C12.5%2C31a14.84%2C14.84%2C0%2C0%2C1-2.1-7.5%2C14.7%2C14.7%2C0%2C0%2C1%2C29.4-.1ZM25.1%2C11.2A12.38%2C12.38%2C0%2C0%2C0%2C12.7%2C23.5a12%2C12%2C0%2C0%2C0%2C2.4%2C7.2l-1.5%2C4.6%2C4.8-1.5A12.44%2C12.44%2C0%2C0%2C0%2C37.6%2C23.5%2C12.53%2C12.53%2C0%2C0%2C0%2C25.1%2C11.2Zm7.4%2C15.6a3.22%2C3.22%2C0%2C0%2C0-.7-.4l-2.5-1.2c-.3-.1-.6-.2-.8.2a8.54%2C8.54%2C0%2C0%2C1-1.1%2C1.4.59.59%2C0%2C0%2C1-.8.1%2C11%2C11%2C0%2C0%2C1-2.9-1.8%2C9.88%2C9.88%2C0%2C0%2C1-2-2.5.46.46%2C0%2C0%2C1%2C.2-.7%2C2.65%2C2.65%2C0%2C0%2C0%2C.5-.6c.2-.2.2-.4.4-.6a.64.64%2C0%2C0%2C0%2C0-.6c-.1-.2-.8-1.9-1.1-2.7s-.6-.6-.8-.6h-.7a1.85%2C1.85%2C0%2C0%2C0-1%2C.4%2C4.16%2C4.16%2C0%2C0%2C0-1.3%2C3%2C6.45%2C6.45%2C0%2C0%2C0%2C1.5%2C3.7c.2.2%2C2.5%2C4%2C6.2%2C5.4s3.7%2C1%2C4.3.9a3.74%2C3.74%2C0%2C0%2C0%2C2.4-1.7A2.82%2C2.82%2C0%2C0%2C0%2C32.5%2C26.8Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
          </a>
      `);
  }
  if (widgetValue['cuEmail_' + index]) {
    contact.append(`
          <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="mailto:${widgetValue['email_' + index]}">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%23fc872b%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M25%2C25.89%2C10%2C13.75H40Zm-6.78-2.28L10%2C17V32.58Zm13.56%2C0%2C8.22%2C9V17Zm-2%2C1.58L25%2C29.11l-4.84-3.92L10%2C36.25H40Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
          </a>
      `);
  }
  if (widgetValue['cuImessages_' + index]) {
    contact.append(`
          <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="sms://${widgetValue['iMessengerPhoneNumber_' + index]}">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%0A%09xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%0A%09xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%0A%09xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%0A%09xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%09xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%0A%09xmlns%3Asodipodi%3D%22http%3A%2F%2Fsodipodi.sourceforge.net%2FDTD%2Fsodipodi-0.dtd%22%0A%09xmlns%3Ainkscape%3D%22http%3A%2F%2Fwww.inkscape.org%2Fnamespaces%2Finkscape%22%0A%09width%3D%221024px%22%0A%09height%3D%221024px%22%0A%09viewBox%3D%220%200%2066.145836%2066.145836%22%0A%09version%3D%221.1%22%0A%09id%3D%22svg8%22%0A%09inkscape%3Aversion%3D%220.92.2%20(5c3e80d%2C%202017-08-06)%22%0A%09sodipodi%3Adocname%3D%22iMessage%20logo.svg%22%3E%0A%09%3Ctitle%0A%09%09id%3D%22title907%22%3EiMessage%20logo%3C%2Ftitle%3E%0A%09%3Cdefs%0A%09%09id%3D%22defs2%22%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09id%3D%22linearGradient899%22%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%220%22%0A%09%09%09%09id%3D%22stop895%22%2F%3E%0A%09%09%09%3Cstop%0A%09%09%09%09style%3D%22stop-color%3A%230cbd2a%3Bstop-opacity%3A1%22%0A%09%09%09%09offset%3D%221%22%0A%09%09%09%09id%3D%22stop897%22%2F%3E%0A%09%09%3C%2FlinearGradient%3E%0A%09%09%3ClinearGradient%0A%09%09%09inkscape%3Acollect%3D%22always%22%0A%09%09%09xlink%3Ahref%3D%22%23linearGradient899%22%0A%09%09%09id%3D%22linearGradient901%22%0A%09%09%09x1%3D%22-25.272568%22%0A%09%09%09y1%3D%22207.52057%22%0A%09%09%09x2%3D%22-25.272568%22%0A%09%09%09y2%3D%22152.9982%22%0A%09%09%09gradientUnits%3D%22userSpaceOnUse%22%0A%09%09%09gradientTransform%3D%22matrix(0.98209275%2C0%2C0%2C0.98209275%2C-1.0651782%2C3.7961838)%22%2F%3E%0A%09%3C%2Fdefs%3E%0A%09%3Csodipodi%3Anamedview%0A%09%09id%3D%22base%22%0A%09%09pagecolor%3D%22%23ffffff%22%0A%09%09bordercolor%3D%22%23666666%22%0A%09%09borderopacity%3D%221.0%22%0A%09%09inkscape%3Apageopacity%3D%220.0%22%0A%09%09inkscape%3Apageshadow%3D%222%22%0A%09%09inkscape%3Azoom%3D%221%22%0A%09%09inkscape%3Acx%3D%22142.01984%22%0A%09%09inkscape%3Acy%3D%2261.975439%22%0A%09%09inkscape%3Adocument-units%3D%22px%22%0A%09%09inkscape%3Acurrent-layer%3D%22layer1%22%0A%09%09showgrid%3D%22false%22%0A%09%09inkscape%3Asnap-object-midpoints%3D%22false%22%0A%09%09showguides%3D%22true%22%0A%09%09inkscape%3Aguide-bbox%3D%22true%22%0A%09%09inkscape%3Asnap-intersection-paths%3D%22false%22%0A%09%09inkscape%3Awindow-width%3D%221920%22%0A%09%09inkscape%3Awindow-height%3D%221017%22%0A%09%09inkscape%3Awindow-x%3D%221358%22%0A%09%09inkscape%3Awindow-y%3D%22-8%22%0A%09%09inkscape%3Awindow-maximized%3D%221%22%0A%09%09fit-margin-top%3D%220%22%0A%09%09fit-margin-left%3D%220%22%0A%09%09fit-margin-right%3D%220%22%0A%09%09fit-margin-bottom%3D%220%22%2F%3E%0A%09%3Cmetadata%0A%09%09id%3D%22metadata5%22%3E%0A%09%09%3Crdf%3ARDF%3E%0A%09%09%09%3Ccc%3AWork%0A%09%09%09%09rdf%3Aabout%3D%22%22%3E%0A%09%09%09%09%3Cdc%3Aformat%3Eimage%2Fsvg%2Bxml%3C%2Fdc%3Aformat%3E%0A%09%09%09%09%3Cdc%3Atype%0A%09%09%09%09%09rdf%3Aresource%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2FStillImage%22%2F%3E%0A%09%09%09%09%3Cdc%3Atitle%3EiMessage%20logo%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%3Cdc%3Adate%3E02%2F04%2F2018%3C%2Fdc%3Adate%3E%0A%09%09%09%09%3Cdc%3Acreator%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3EApple%2C%20Inc.%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Acreator%3E%0A%09%09%09%09%3Cdc%3Apublisher%3E%0A%09%09%09%09%09%3Ccc%3AAgent%3E%0A%09%09%09%09%09%09%3Cdc%3Atitle%3ECMetalCore%3C%2Fdc%3Atitle%3E%0A%09%09%09%09%09%3C%2Fcc%3AAgent%3E%0A%09%09%09%09%3C%2Fdc%3Apublisher%3E%0A%09%09%09%09%3Cdc%3Asource%3Ehttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F85%2FIMessage_icon.png%3C%2Fdc%3Asource%3E%0A%09%09%09%3C%2Fcc%3AWork%3E%0A%09%09%3C%2Frdf%3ARDF%3E%0A%09%3C%2Fmetadata%3E%0A%09%3Cg%0A%09%09inkscape%3Alabel%3D%22Capa%201%22%0A%09%09inkscape%3Agroupmode%3D%22layer%22%0A%09%09id%3D%22layer1%22%0A%09%09transform%3D%22translate(59.483067%2C-145.8456)%22%3E%0A%09%09%3Cg%0A%09%09%09id%3D%22g963%22%3E%0A%09%09%09%3Crect%0A%09%09%09%09ry%3D%2214.567832%22%0A%09%09%09%09rx%3D%2214.567832%22%0A%09%09%09%09y%3D%22145.8456%22%0A%09%09%09%09x%3D%22-59.483067%22%0A%09%09%09%09height%3D%2266.145836%22%0A%09%09%09%09width%3D%2266.145836%22%0A%09%09%09%09id%3D%22rect826%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3Aurl(%23linearGradient901)%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.33634758%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09inkscape%3Aconnector-curvature%3D%220%22%0A%09%09%09%09id%3D%22path922%22%0A%09%09%09%09d%3D%22m%20-26.410149%2C157.29606%20a%2024.278298%2C20.222157%200%200%200%20-24.278105%2C20.22202%2024.278298%2C20.222157%200%200%200%2011.79463%2C17.31574%2027.365264%2C20.222157%200%200%201%20-4.245218%2C5.94228%2023.85735%2C20.222157%200%200%200%209.86038%2C-3.87367%2024.278298%2C20.222157%200%200%200%206.868313%2C0.83768%2024.278298%2C20.222157%200%200%200%2024.2781059%2C-20.22203%2024.278298%2C20.222157%200%200%200%20-24.2781059%2C-20.22202%20z%22%0A%09%09%09%09style%3D%22opacity%3A1%3Bfill%3A%23ffffff%3Bfill-opacity%3A1%3Bstroke%3Anone%3Bstroke-width%3A1.56409621%3Bstroke-linecap%3Asquare%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-dasharray%3Anone%3Bstroke-dashoffset%3A0%3Bstroke-opacity%3A1%3Bpaint-order%3Amarkers%20stroke%20fill%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
          </a>
      `);
  }
  if (widgetValue['cuWeibo_' + index]) {
    contact.append(`
          <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://api.weibo.com/chat/#/?to_uid=${widgetValue['weiboUserId_' + index]}">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221024%22%20height%3D%221024%22%20viewBox%3D%220%200%20300%20300%22%3E%0A%09%3Cg%3E%0A%09%09%3Ccircle%20cx%3D%22150%22%20cy%3D%22150%22%20r%3D%22150%22%20style%3D%22fill%3A%20%23f5f5f5%22%2F%3E%0A%09%09%3Cg%20transform%3D%22matrix(3.5%200%200%203.5%2070%2060)%22%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M50.448%2012.132c.217%202.814-.259%206.186-2.117%206.351-3.033.271-1.451-3.07-1.411-5.081.111-5.829-4.865-9.879-9.739-9.879-1.381%200-4.588.936-4.094-1.976.222-1.284%201.31-1.266%202.399-1.411%208.197-1.093%2014.386%204.546%2014.962%2011.996z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23D52A2C%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M37.04%2018.907c3.524%201.928%207.758%202.888%207.056%208.61-.168%201.371-.998%203.203-1.834%204.373-5.957%208.339-23.924%2011.844-35.144%205.506C3.355%2035.269-.539%2032.159.062%2025.962c.517-5.333%204.103-9.464%207.622-12.983%203.357-3.359%206.897-5.987%2011.714-7.198%205.226-1.314%206.771%203.043%205.363%207.339%203.027-.203%209.442-3.582%2012.279-.282%201.25%201.454.771%204.058%200%206.069zm-3.811%2013.548c1.129-1.28%202.264-3.231%202.257-5.503-.015-7.014-8.851-9.605-15.806-9.033-3.804.312-6.363%201.115-9.033%202.682-2.179%201.279-4.729%203.36-5.363%206.491-1.427%207.041%206.231%2010.35%2011.855%2010.726%206.498.437%2013.002-1.857%2016.09-5.363z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23E99315%22%0A%09%09%09%20%20%20%20%20%20d%3D%22M43.531%2012.132c.296%202.149-.319%204.011-1.552%204.093-2.056.137-1.287-1.408-1.412-3.246-.078-1.132-1.016-2.439-1.835-2.823-1.606-.752-4.093.548-4.093-1.693%200-1.664%201.443-1.491%202.259-1.553%203.574-.272%206.216%202.191%206.633%205.222z%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M27.019%2026.246c3.007%209.088-12.66%2013.314-15.525%205.504-1.917-5.223%202.686-9.377%207.48-9.879%204.093-.429%207.144%201.658%208.045%204.375zm-7.198%201.553c.638%201.104%202.105.311%201.976-.564-.154-1.013-1.989-.863-1.976.564zm-2.541%204.799c2.634-.627%202.988-5.588-.988-4.658-3.34.78-2.694%205.533.988%204.658z%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
          </a>
      `);
  }
  if (widgetValue['cuViber_' + index]) {
    contact.append(`
          <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="viber://pa?chatURI=${widgetValue['orViberBotName_' + index]}">
              <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20version%3D%221.0%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000000%22%0A%20width%3D%2250.000000pt%22%20height%3D%2250.000000pt%22%20viewBox%3D%220%200%2050.000000%2050.000000%22%0A%20preserveAspectRatio%3D%22xMidYMid%20meet%22%3E%0A%0A%3Ccircle%20cx%3D%2220pt%22%20cy%3D%2220pt%22%20r%3D%2216pt%22%20fill%3D%22%23fff%22%3E%3C%2Fcircle%3E%0A%3Cg%20transform%3D%22translate(0.000000%2C50.000000)%20scale(0.100000%2C-0.100000)%22%0Afill%3D%22blue%22%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M167%20484%20c-92%20-28%20-167%20-134%20-167%20-234%200%20-131%20119%20-250%20250%20-250%20129%0A0%20250%20121%20250%20250%200%20100%20-78%20207%20-172%20235%20-63%2018%20-98%2018%20-161%20-1z%20m198%20-86%0Ac34%20-27%2055%20-75%2055%20-128%200%20-94%20-54%20-150%20-144%20-150%20-37%200%20-56%20-6%20-72%20-21%20-25%0A-23%20-44%20-18%20-44%2010%200%2010%20-12%2026%20-26%2036%20-72%2047%20-71%20196%201%20253%2024%2019%2041%2022%20115%0A22%2074%200%2091%20-3%20115%20-22z%22%2F%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M185%20383%20c-11%20-3%20-30%20-14%20-42%20-26%20-19%20-17%20-23%20-31%20-23%20-85%200%20-57%203%0A-66%2030%20-94%2018%20-18%2030%20-40%2030%20-56%20l0%20-26%2028%2026%20c18%2018%2043%2028%2080%2033%2071%209%2092%2036%0A92%20120%200%2084%20-22%20106%20-112%20111%20-35%201%20-72%200%20-83%20-3z%20m112%20-38%20c24%20-17%2047%20-72%2032%0A-80%20-5%20-4%20-9%204%20-10%2017%200%2021%20-1%2021%20-8%204%20-7%20-19%20-8%20-19%20-13%202%20-4%2012%20-14%2025%20-25%0A29%20-18%207%20-33%2022%20-33%2036%200%2012%2034%208%2057%20-8z%20m-83%20-17%20c11%20-15%2012%20-25%205%20-34%20-21%0A-26%2030%20-75%2056%20-54%209%207%2019%205%2036%20-9%2023%20-19%2023%20-21%207%20-37%20-14%20-15%20-21%20-15%20-47%20-4%0A-35%2014%20-96%2077%20-106%20109%20-6%2021%209%2051%2026%2051%204%200%2015%20-10%2023%20-22z%20m71%20-29%20c11%20-17%0A-1%20-21%20-15%20-4%20-8%209%20-8%2015%20-2%2015%206%200%2014%20-5%2017%20-11z%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
          </a>
      `);
  }
}

if (userSite) {
  $('#widget_section').on('click', '#chatBody .sm-manager', function (event) {
    let index = $(this).attr('data-id');
    let bodyContent =
      `<div class="sm-box-body manager-mode">
                  <div class="sm-message sm-disable-animation">
                      <div class="message-author">${index} ${widgetValue['cuManagerName_' + index]}</div>
                      <div class="message-text">${widgetValue['cuInitialWords_' + index]}</div>
                      <div class="message-time">13:14</div>
                  </div>
              </div>`;
    $('#firstManagerChatBody').html(bodyContent);
    $('#firstManagerChatBody .message-author').val(index + ' ' + widgetValue['cuManagerName_' + index]);
    $('#firstManagerChatBody .message-text').val(widgetValue['cuInitialWords_' + index]);

    $('#firstManagerChatHeaderArea .sm-selected-manager .sm-name').html(widgetValue['cuManagerName_' + index]);
    $('#firstManagerChatHeaderArea .sm-selected-manager .sm-role').html(widgetValue['cuRoles_' + index]);

    $('#firstManagerChatHeaderArea .sm-selected-manager').find('.sm-avatar').css('background-image', `url(${widgetValue['cuCoverImageVal_' + index]})`);

    updateRealContactFooterIcon(index);

    $('#firstManagerChatFooter').show();
    $('#firstManagerChatBody').show();
    $('#firstManagerChatHeaderArea').show();
    $('#selectedManagerChatFooter').hide();
    $('#selectedManagerChatBody').hide();
    $('#selectedManagerChatHeaderArea').hide();
  });
}

$('#widget_section').on('click', '.sm-chat-back', function () {
  $('#firstManagerChatFooter').hide();
  $('#firstManagerChatBody').hide();
  $('#firstManagerChatHeaderArea').hide();
  $('#selectedManagerChatFooter').show();
  $('#selectedManagerChatBody').show();
  $('#selectedManagerChatHeaderArea').show();
})

// ****************************** Review Script ********************************
$('#widget_section').on('click', '.review-overlay', function () {
  hideReviewMainModal();
});

function showReviewMainModal() {
  $('.review-modal').show();
  $('.review-overlay').show();
}

function hideReviewMainModal() {
  $('.review-modal').hide();
  $('.review-overlay').hide();
}

function updateRealReviewMainModal() {
  setRealReviewAvgValue();

  let name = widgetValue['rvName_1'];
  let rating = widgetValue['rvRatingValue_1'];
  let reviewtxt = widgetValue['rvReviewtxt_1'];
  let image = widgetValue['rvCoverImageVal_1'];

  $("#reviewModalRating").rateYo({
    rating: 0,             // Initial rating value
    fullStar: true,        // Full stars only
    starWidth: "3px",     // Width of each star
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

  $('.review-modal button').text(widgetValue['rv_text']);

  if (!window.addPoweredBy[guid])
    $('.review-modal .footer-text').hide();

  showReviewMainModal();
}

// Review Button 
function updateReviewPosition(type) {
  let btnElement = $('#rv_reviewButton');
  switch (type) {
    case 'bottom-right':
      btnElement.css({
        'bottom': '10px',
        'right': '20px',
        'left': 'auto',
        'top': 'auto',
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'bottom-center':
      btnElement.css({
        'bottom': '10px',
        'left': '50%',
        'right': 'auto',
        'top': 'auto',
        'transform': 'translate(-50%, 0%)'
      });
      break;
    case 'bottom-left':
      btnElement.css({
        'bottom': '10px',
        'left': '20px',
        'right': 'auto',
        'top': 'auto',
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'top-right':
      btnElement.css({
        'top': '20px',
        'right': '20px',
        'left': 'auto',
        'bottom': 'auto',
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'top-center':
      btnElement.css({
        'top': '20px',
        'left': '50%',
        'right': 'auto',
        'bottom': 'auto',
        'transform': 'translate(-50%, 0%)'
      });
      break;
    case 'top-left':
      btnElement.css({
        'top': '20px',
        'left': '20px',
        'right': 'auto',
        'bottom': 'auto',
        'transform': 'translate(0%, 0%)'
      });
      break;
    case 'left':
      btnElement.css({
        'top': '50%',
        'left': '20px',
        'right': 'auto',
        'bottom': 'auto',
        'transform': 'translate(0%, -50%)'
      });
      break;
    case 'right':
      btnElement.css({
        'top': '50%',
        'right': '20px',
        'left': 'auto',
        'bottom': 'auto',
        'transform': 'translate(0%, -50%)'
      });
      break;
  }
}

if (userSite) {
  $('#widget_section').on('click', '#rv_reviewButton', function () {
    // visitorClick(widgetValue['widgetId']);
    updateRealReviewMainModal();
  });
  $('#widget_section').on('click', '.review-modal button', function () {
    visitorClick(guid, widgetValue['widgetId']);
  });
}

function updateRealReviewButton() {
  updateReviewPosition(widgetValue['rv_desktopPosition']);

  let buttonText = widgetValue['rv_text'];
  let bgColor = widgetValue['rv_bgColor'];
  let textColor = widgetValue['rv_buttonColor'];
  let buttonType = widgetValue['rv_buttonStyle'];

  var btnElement = $('#rv_reviewButton');
  btnElement.find('span').text(buttonText);
  if (buttonType === 'round-with-text' || buttonType === 'square-with-text') {
    btnElement.css({ 'background-color': bgColor, 'color': textColor });
  }
  else {
    btnElement.css({ 'background-color': '', 'color': textColor, 'border': `3px solid ${bgColor}` });
  }

  btnElement.removeClass('round-with-text square-with-text outline-round outline-square').addClass(buttonType);

  if (widgetValue['rv_waveAnimation'] === 'yes') {
    $(".review-widget .fixed-button .wave-effect").removeClass('round-with-text square-with-text outline-round outline-square').addClass(buttonType);
    $(".review-widget .fixed-button .wave-effect").css({ 'background-color': bgColor, 'opacity': 0.5 })
    $(".review-widget .fixed-button .wave-effect").show();
  } else {
    $(".review-widget .fixed-button .wave-effect").hide();
  }

  if (widgetValue['rv_makeButtonSmaller'] === 'yes') {
    $(".review-widget .fixed-body").addClass("small-button");
  }
  else {
    $(".review-widget .fixed-body").removeClass("small-button");
  }
  hideReviewMainModal();
  setRealReviewAvgValue();
}

function setRealReviewAvgValue() {
  var fieldCount = 0, sum = 0;
  $.each(widgetValue, function (key, value) {
    if (key.startsWith('rvRatingValue_')) {
      fieldCount++;
      sum += Number(value);
    }
  });

  let avg = sum / fieldCount;
  avg = parseFloat(avg.toFixed(1));

  $("#rv_avgRating").rateYo({
    rating: 0,             // Initial rating value
    fullStar: true,        // Full stars only
    starWidth: "15px",     // Width of each star
    spacing: "5px",        // Space between stars
    ratedFill: "#FFD700",  // Gold color of the rated stars
    normalFill: "#e5e5e5", // Light grey color of the normal stars
    halfStar: true,        // Enable half stars
    onSet: function (rating, rateYoInstance) {
    }
  });
  $('#rv_avgRating').rateYo("rating", avg);
}

// --------------------- Message Bar Script ---------------------------
function updateRealMessageBar() {
  let messageText = widgetValue['mbText_1'];
  let buttonText = widgetValue['mbButtonText_1'];
  let buttonLink = widgetValue['mbLink_1'];

  let barPosition = widgetValue['mb_position'];
  let containerStyle = widgetValue['mb_containerStyle'];
  let hideDelay = widgetValue['mb_dismissIn'];
  let bgColor = widgetValue['mb_bgColor'];
  let textColor = widgetValue['mb_textColor'];
  let msgButtonBgColor = widgetValue['mb_buttonColor'];
  let msgButtonTextColor = widgetValue['mb_buttonTextColor'];

  $("#mb_messageBar").show();

  $("#mb_messageText").html(messageText);
  $("#mb_messageBar").css({ 'background-color': bgColor, 'color': textColor });

  if (containerStyle === "prominent") {
    $("#mb_messageBar").css({
      "font-size": "16px",
      "padding": "15px 30px"
    });
    $("#mb_messageButton").css({
      "font-size": "16px",
      "background-color": msgButtonBgColor,
      "color": msgButtonTextColor
    });
  } else {
    $("#mb_messageBar").css({
      "font-size": "12px",
      "padding": "8px 20px"
    });
    $("#mb_messageButton").css({
      "font-size": "12px",
      "background-color": "",
      "color": textColor,
      "padding": "10px 20px",
    });
  }
  $("#mb_messageButton").html(buttonText);
  $("#mb_messageButton").prop("href", buttonLink);

  $('#mb_messageBar').removeClass('over-top top-bar bottom-bar').addClass(barPosition);

  // if (showCloseButton) {
    $("#mb_closeButton").show();
  // } else {
  //   $("#mb_closeButton").hide();
  // }

  if (hideDelay > 0) {
    setTimeout(function () {
      $("#mb_messageBar").fadeOut();
    }, hideDelay * 1000); // Convert seconds to milliseconds
  }
}

if (userSite) {
  $('#widget_section').on('click', '#mb_messageBar a', function() {
    visitorClick(guid, widgetValue['widgetId']);
  });
}

// ------------------ Follow Us Script -------------------
function updateRealFollowUs() {
  var barPosition = widgetValue['fu_barPosition'];
  var colorTheme = widgetValue['fu_colorTheme'];
  var buttonShape = widgetValue['fu_buttonShape'];
  var animationType = widgetValue['fu_animationType'];
  var buttonSpace = widgetValue['fu_buttonSpace'];
  var buttonDisplay = (widgetValue['fu_closeButtonDisplay'] === 'on');

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
    var url = widgetValue[`fu_${button.name.toLowerCase()}`];
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
  if (buttonDisplay) {
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

if (userSite) {
  $('#widget_section').on('click', '#socialBar a', function() {
    visitorClick(guid, widgetValue['widgetId']);
  });
  
  $('#widget_section').on('click', '#socialHideButton', function() {
    var barPosition = widgetValue['fu_barPosition'];
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
}

//------------------ Start of Script for adding widget -----------------------------

function insertWidgets(widgetType) {
  let contentHtml = "";
  switch (widgetType) {
    case "popup":
      contentHtml = `
        <div class='pu-widget'>
          <div class="pop-overlay">
          </div>
          <div class="pop-modal">
            <a href="#" target="_blank" id="pu_modalImageLink">
                <img src="https://via.placeholder.com/400x300" alt="Placeholder Image" id="pu_modalImage">
            </a>
            <div class="align-content-center" style="padding: 10px;">
                <h2 id="pu_modalHeader">User put a modal here</h2>
                <p id="pu_modalText">Up to 15% off for limited time and on selected items. plus free shipping for the
                    first 100 buyers</p>
                <button id="pu_modalButton">Get the discount now!</button>
            </div>
            <a class="close-button" id="pu_modalCloseButton">X</a>
          </div>
        </div>
      `;
      break;
    case "popup_form":
      contentHtml = `
        <div class='puf-widget'>
          <div class="pop-overlay"></div>
          <div class="pop-modal row text-start">
            <div class="col-4" id="puf_modalImageLink">
                <img src="https://via.placeholder.com/400x300" alt="Placeholder Image" id="puf_modalImage">
            </div>
            <div class="col-8 puf-form-panel" style="padding: 10px">
              <div class="puf-form">
                <h2 class="puf-modal-header puf-text-color">User put a modal here</h2>
                <p id="puf_modalText" class="puf-text-color">Up to 15% off for limited time and on selected items. plus free shipping for the first 100 buyers</p>
                <form>
                  <div class='row' id="puf_modalInputList">
                  </div>
                  <div class='col-md-12'>
                    <a id="puf_modalButton" class="btn">Get the discount now!</a>
                  </div>
                </form>
                <div class='powered-msg puf-text-color'>
                  Powered by GetLeads
                </div>
              </div>
              <div class="puf-success puf-text-color">
                  <h2 class="puf-modal-header">User put a modal here</h2>
                  <p class="puf-success-msg">Lorem ipsum dolor sit amet, consece por ps Lorem ipsum dolor sit amet, consece por ps Lorem ipsum dolor sit amet, consece por ps</p>
                  <p class="powered-msg">Powered by GetLeads</p>
              </div>
          </div>
        </div>
        `;
      break;
    case "faq":
      contentHtml = `
        <div class='faq-widget'>
            <div class="fixed-button" id="faq_questionButton">
              <div class="wave-effect"></div>
              <div class="wave-effect"></div>
              <div class="wave-effect-container">
                <div class='fixed-body'>   
                  <i class="fas fa-question"></i>
                  <span class="fixed-button-text">Any questions? Check our FAQ</span>
                </div>
              </div>
            </div>
            <div class="faq-modal" id="faqModal" tabindex="-1" aria-labelledby="faqModalLabel" aria-hidden="true">
                <div class="modal-dialog m-0 text-start">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5>Header</h5>
                            <h6>Subtitle</h6>
                        </div>
                        <div class="modal-body">
                            <div class="question-item">
                                <div class="question-title">Lorem Ipsum Dolor</div>
                                <span class="icon">+</span>
                            </div>
                            <div class="answer">
                                <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <a href="https://www.example.com" target="_blank">https://www.example.com</a>
                            </div>

                            <div class="question-item">
                                <h5 class="question-title">Lorem Ipsum Dolor</h5>
                                <span class="icon">+</span>
                            </div>
                            <div class="answer">
                                <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <a href="https://www.example.com" target="_blank">https://www.example.com</a>
                            </div>
                        </div>
                        <div class="modal-footer">modal footer</div>
                    </div>
                    <div class="powered-msg">Powered by GetLeads</div>
                </div>
            </div>
        </div>
        `;
      break;
    case "follow_us":
      contentHtml = `
        <div class="follow-container">
          <div class='social-bar' id="socialBar"></div>
          <button class="hide-button" id="socialHideButton">&#x25B2;</button>
        </div>
      `;
      break;
    case "review":
      contentHtml = `
        <div class='review-widget'>
            <div class="fixed-button" id="rv_reviewButton">
              <div class="wave-effect"></div>
              <div class="wave-effect"></div>
              <div class="wave-effect-container">
                <div class='fixed-body'>   
                  <div id="rv_avgRating" name="rv_avgRating"></div>
                  <div class="d-flex justify-content-center mt-1"><span class="fixed-button-text">Button Text</span></div>
                </div>
              </div>
            </div>
            <div class="review-overlay"></div>
            <div class="review-modal">
              <div class="modal-body">
                  <div class="d-flex justify-content-between">
                      <div>
                          <h5>Reviews Title</h5>
                          <div id='reviewModalRating'></div>
                      </div>
                      <div class="user-info">
                          <img src="https://via.placeholder.com/40" alt="User Image">
                      </div>
                  </div>
                  <p class='review-text'>Lorem ipsum dolor sit amet, consecte por incididunt ut larore et dolore mali trud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                  <button class="action-button mt-1">Button Text</button>
                  <div class="footer-text">
                      Powered by GetLeads
                  </div>
              </div>
          </div>
        </div>
      `;
      break;
    case "story":
      contentHtml = `
        <div class="story-widget">
          <div class="carousel-object hidden">
              <div class="carousel-container">
                <span class="close-button">&times;</span>
                <div class="carousel">
                </div>
              </div>
          </div>

          <div class="fixed-container">
              <div class="fixed-bar glass-effect">
                  <div class="story-container">
                      <div class="story-div" story=1>
                          <img src="https://via.placeholder.com/60" alt="Hot News">
                          <div>Hot News</div>
                      </div>
                      <div class="story-div" story=2>
                          <img src="https://via.placeholder.com/60" alt="Big Sales">
                          <div>Big Sales</div>
                      </div>
                      <div class="story-div" story=3>
                          <img src="https://via.placeholder.com/60" alt="Our Sho">
                          <div>Our Shop</div>
                      </div>
                  </div>
              </div>
              <button class="hide-button">&#x25B2;</button>
          </div>  
        </div>  
      `;
      break;
    case "contact_us":
      contentHtml = `
          <div class="contactus-section">
              <div class="fixed-button" id="chatButton">
                  <div class='red-dot'></div>
                  <div class="wave-effect"></div>
                  <div class="wave-effect"></div>
                  <div class="wave-effect-container">
                    <div class='fixed-body gap-2 d-flex'>   
                      <i class="fas fa-message"></i>
                      <div>
                        <div class="fixed-button-text">Any questions? Check our FAQ</div>
                        <div class="powered-msg">Powered by GetLeads</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div id="cu_notificationWindow">
                <div class="d-flex gap-2">
                    <img src="https://via.placeholder.com/20" alt="Profile Picture">
                    <div class="gap-2">
                      <div class='mgr_name'></div>
                      <div class='mgr_role'></div>
                    </div>
                </div>
                <div class='mgr_text'></div>
              </div>
              <div id="chatWindow" style='display: none;'>
                  <div id="chatHeader">
                      <div id="firstManagerChatHeaderArea">
                          <div class="sm-box-header">
                              <div class="sm-selected-manager align-items-center">
                                  
                              </div>
                          </div>
                      </div>
                      <div id="selectedManagerChatHeaderArea">
                          <div class="sm-box-header">
                              <h3 class="sm-box-title" style="color: rgb(255, 255, 255);">Hello 👋</h3>
                              <p class="sm-box-subtitle" style="color: rgb(255, 255, 255);">Click one of our representatives below to chat or send
                                  us an email to <a href="mailto:example@gmail.com" style="color: inherit">example@gmail.com</a></p>
                          </div>
                      </div>
                      <button id="closeChat" style="position: absolute; top: 5px; right: 10px;">&times;</button>
                  </div>
                  <div id="chatBody">
                      <div id="firstManagerChatBody">
                          <div class="sm-box-body manager-mode">
                              <div class="sm-message sm-disable-animation">
                                  <div class="message-author"></div>
                                  <div class="message-text"></div>
                                  <div class="message-time">01:44</div>
                              </div>
                          </div>
                      </div>
                      <div id="selectedManagerChatBody">
                          <div class="sm-manager" data-id="1">
                              <div class="sm-avatar">
                              </div>
                              <div class="sm-info">
                                  <div class="sm-role"></div>
                                  <div class="sm-name"></div>
                                  <div class="sm-caption"></div>
                                  <div class="sm-contact"></div>                          
                              </div>
                          </div>
                      </div>
                  </div>
                  <div id="chatFooter">
                      <div id="firstManagerChatFooter">
                          <div class="sm-box-footer manager-mode">
                              <div class="cu-start-chat-label">Start Chat with:</div>
                              <div class="cu-manager-footer-chat-buttons-wrapper">
                                  <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="skype:skype_account?chat">
                                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%20%20%3Cg%3E%0A%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2315ace5%22%2F%3E%0A%09%20%20%20%20%3Cpath%20d%3D%22M38.89%2C27.72A14.34%2C14.34%2C0%2C0%2C0%2C39.15%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C10.85a14.34%2C14.34%2C0%2C0%2C0-2.72.26A8.17%2C8.17%2C0%2C0%2C0%2C11.11%2C22.28%2C14.34%2C14.34%2C0%2C0%2C0%2C10.85%2C25%2C14.16%2C14.16%2C0%2C0%2C0%2C25%2C39.15a14.34%2C14.34%2C0%2C0%2C0%2C2.72-.26A8.17%2C8.17%2C0%2C0%2C0%2C38.89%2C27.72Zm-13.62%2C7c-5%2C0-7.54-1.89-8.32-4.26s.92-3%2C1.46-3.09a1.85%2C1.85%2C0%2C0%2C1%2C2%2C1.06%2C4.68%2C4.68%2C0%2C0%2C0%2C3.86%2C3.29c2.42.24%2C4-.87%2C4.5-2s-.39-2.76-4.11-3.29-7.59-2.17-7.59-5.9%2C4.26-5.22%2C8.32-5.22%2C6.11%2C2.3%2C6.57%2C3.19c.56%2C1.12.37%2C3-1%2C3.29s-2.12-.43-3.14-2.32-4.78-1.45-6-.34-.92%2C2.71%2C4.3%2C3.72%2C7.15%2C2.9%2C7.15%2C5.85S30.3%2C34.72%2C25.27%2C34.72Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
                                  </a>
                                  <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://t.me/@telegram">
                                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Cg%3E%0A%09%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230088cc%22%2F%3E%0A%09%09%20%20%20%20%3Cpath%20d%3D%22M36%2C10.2%2C9.4%2C22.42c-1.81.87-1.8%2C2.07-.33%2C2.61L15.7%2C27.5l2.53%2C9.27c.31%2C1%2C.16%2C1.41%2C1.05%2C1.41a1.68%2C1.68%2C0%2C0%2C0%2C1.38-.82L24%2C33.52l6.89%2C6.07c1.27.84%2C2.19.4%2C2.5-1.4L37.9%2C12.76C38.36%2C10.55%2C37.19%2C9.54%2C36%2C10.2ZM16.74%2C26.93%2C31.68%2C15.69c.74-.54%2C1.43-.25.86.35L19.75%2C29.8l-.49%2C6.33Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
                                  </a>
                                  <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://ig.me/m/@instagram">
                                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%09%3ClinearGradient%20id%3D%22SVGID_1_%22%20gradientTransform%3D%22matrix(0%20-1.982%20-1.844%200%20-132.522%20-51.077)%22%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-37.106%22%20x2%3D%22-26.555%22%20y1%3D%22-72.705%22%20y2%3D%22-84.047%22%3E%0A%09%09%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fd5%22%2F%3E%0A%09%09%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%23ff543e%22%2F%3E%0A%09%09%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c837ab%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%0A%09%09d%3D%22m1.5%201.633c-1.886%201.959-1.5%204.04-1.5%2010.362%200%205.25-.916%2010.513%203.878%2011.752%201.497.385%2014.761.385%2016.256-.002%201.996-.515%203.62-2.134%203.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41%201.633z%22%0A%09%09fill%3D%22url(%23SVGID_1_)%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22m11.998%203.139c-3.631%200-7.079-.323-8.396%203.057-.544%201.396-.465%203.209-.465%205.805%200%202.278-.073%204.419.465%205.804%201.314%203.382%204.79%203.058%208.394%203.058%203.477%200%207.062.362%208.395-3.058.545-1.41.465-3.196.465-5.804%200-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794%201.597c7.574-.012%208.538-.854%208.006%2010.843-.189%204.137-3.339%203.683-7.211%203.683-7.06%200-7.263-.202-7.263-7.265%200-7.145.56-7.257%206.468-7.263zm5.524%201.471c-.587%200-1.063.476-1.063%201.063s.476%201.063%201.063%201.063%201.063-.476%201.063-1.063-.476-1.063-1.063-1.063zm-4.73%201.243c-2.513%200-4.55%202.038-4.55%204.551s2.037%204.55%204.55%204.55%204.549-2.037%204.549-4.55-2.036-4.551-4.549-4.551zm0%201.597c3.905%200%203.91%205.908%200%205.908-3.904%200-3.91-5.908%200-5.908z%22%0A%09%09fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E">
                                  </a>
                                  <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="https://www.messenger.com/t/@facebook_messenger_id?call">
                                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Ctitle%3EFacebook%20Messenger%3C%2Ftitle%3E%0A%09%09%3Cg%3E%0A%09%09%09%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230084ff%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M25%2C10c-8.29%2C0-15%2C6.22-15%2C13.89A13.5%2C13.5%2C0%2C0%2C0%2C15.59%2C34.7V40l5.11-2.8a16.45%2C16.45%2C0%2C0%2C0%2C4.3.58c8.28%2C0%2C15-6.22%2C15-13.89S33.28%2C10%2C25%2C10Zm1.49%2C18.7-3.82-4.07L15.22%2C28.7l8.2-8.7%2C3.91%2C4.07L34.69%2C20Z%22%0A%09%09%09%09style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
                                  </a>
                                  <a class="hover-opacity cu-manager-chat-button cu-clickable" target="_blank" href="tel:79503587034">
                                      <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%235461f4%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.61%2C31.06h0c-1.14-2.15-4.78-4.33-5.2-4.58a3.37%2C3.37%2C0%2C0%2C0-2.52-.41%2C2.48%2C2.48%2C0%2C0%2C0-1.46%2C1.1c-.47.56-1.06%2C1.23-1.19%2C1.34a1.59%2C1.59%2C0%2C0%2C1-2.42-.25l-6.09-6.08a1.58%2C1.58%2C0%2C0%2C1-.27-2.38c.14-.17.81-.76%2C1.37-1.23a2.48%2C2.48%2C0%2C0%2C0%2C1.1-1.46%2C3.35%2C3.35%2C0%2C0%2C0-.42-2.53c-.24-.41-2.42-4.05-4.57-5.19A3.32%2C3.32%2C0%2C0%2C0%2C15%2C10l-1.34%2C1.34C11.25%2C13.75%2C8.29%2C19%2C15.77%2C26.43l7.8%2C7.8C27.15%2C37.81%2C30.21%2C39%2C32.69%2C39a8.45%2C8.45%2C0%2C0%2C0%2C6-2.68L40%2C35A3.32%2C3.32%2C0%2C0%2C0%2C40.61%2C31.06Z%22%20style%3D%22fill%3A%20%23ffffff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E">
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div id="selectedManagerChatFooter">
                          <div class="sm-box-footer">
                              <div class="sm-box-footer-info" style="color: #777; font-size: 12px">
                                  Call us to <a href="tel:+89997774652 " style="color: #1e24c2">+89997774652 </a>from0:00 to 24:00
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div id="contactLinkList" style='display: none;'>
                  <div class="cu-expandable gap-2 sm-fixed with-button-rounded_text">
                      <a class="show hover-opacity sm-button sm-button-circle" target="_blank" href="https://t.me/telegram_username">
                          <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Cg%3E%0A%09%09%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230088cc%22%2F%3E%0A%09%09%20%20%20%20%3Cpath%20d%3D%22M36%2C10.2%2C9.4%2C22.42c-1.81.87-1.8%2C2.07-.33%2C2.61L15.7%2C27.5l2.53%2C9.27c.31%2C1%2C.16%2C1.41%2C1.05%2C1.41a1.68%2C1.68%2C0%2C0%2C0%2C1.38-.82L24%2C33.52l6.89%2C6.07c1.27.84%2C2.19.4%2C2.5-1.4L37.9%2C12.76C38.36%2C10.55%2C37.19%2C9.54%2C36%2C10.2ZM16.74%2C26.93%2C31.68%2C15.69c.74-.54%2C1.43-.25.86.35L19.75%2C29.8l-.49%2C6.33Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%20%20%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
                      </a>
                      <a class="show hover-opacity sm-button sm-button-circle " target="_blank" href="https://ig.me/m/instagram_username">
                          <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%09%3ClinearGradient%20id%3D%22SVGID_1_%22%20gradientTransform%3D%22matrix(0%20-1.982%20-1.844%200%20-132.522%20-51.077)%22%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-37.106%22%20x2%3D%22-26.555%22%20y1%3D%22-72.705%22%20y2%3D%22-84.047%22%3E%0A%09%09%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fd5%22%2F%3E%0A%09%09%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%23ff543e%22%2F%3E%0A%09%09%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c837ab%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%0A%09%09d%3D%22m1.5%201.633c-1.886%201.959-1.5%204.04-1.5%2010.362%200%205.25-.916%2010.513%203.878%2011.752%201.497.385%2014.761.385%2016.256-.002%201.996-.515%203.62-2.134%203.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41%201.633z%22%0A%09%09fill%3D%22url(%23SVGID_1_)%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22m11.998%203.139c-3.631%200-7.079-.323-8.396%203.057-.544%201.396-.465%203.209-.465%205.805%200%202.278-.073%204.419.465%205.804%201.314%203.382%204.79%203.058%208.394%203.058%203.477%200%207.062.362%208.395-3.058.545-1.41.465-3.196.465-5.804%200-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794%201.597c7.574-.012%208.538-.854%208.006%2010.843-.189%204.137-3.339%203.683-7.211%203.683-7.06%200-7.263-.202-7.263-7.265%200-7.145.56-7.257%206.468-7.263zm5.524%201.471c-.587%200-1.063.476-1.063%201.063s.476%201.063%201.063%201.063%201.063-.476%201.063-1.063-.476-1.063-1.063-1.063zm-4.73%201.243c-2.513%200-4.55%202.038-4.55%204.551s2.037%204.55%204.55%204.55%204.549-2.037%204.549-4.55-2.036-4.551-4.549-4.551zm0%201.597c3.905%200%203.91%205.908%200%205.908-3.904%200-3.91-5.908%200-5.908z%22%0A%09%09fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E">
                      </a>
                      <a class="show hover-opacity sm-button sm-button-circle " target="_blank" href="https://wa.me/79503587034">
                          <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%2330bf39%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M39.8%2C23.4A14.64%2C14.64%2C0%2C0%2C1%2C25.1%2C38%2C15.25%2C15.25%2C0%2C0%2C1%2C18%2C36.2L9.8%2C38.8%2C12.5%2C31a14.84%2C14.84%2C0%2C0%2C1-2.1-7.5%2C14.7%2C14.7%2C0%2C0%2C1%2C29.4-.1ZM25.1%2C11.2A12.38%2C12.38%2C0%2C0%2C0%2C12.7%2C23.5a12%2C12%2C0%2C0%2C0%2C2.4%2C7.2l-1.5%2C4.6%2C4.8-1.5A12.44%2C12.44%2C0%2C0%2C0%2C37.6%2C23.5%2C12.53%2C12.53%2C0%2C0%2C0%2C25.1%2C11.2Zm7.4%2C15.6a3.22%2C3.22%2C0%2C0%2C0-.7-.4l-2.5-1.2c-.3-.1-.6-.2-.8.2a8.54%2C8.54%2C0%2C0%2C1-1.1%2C1.4.59.59%2C0%2C0%2C1-.8.1%2C11%2C11%2C0%2C0%2C1-2.9-1.8%2C9.88%2C9.88%2C0%2C0%2C1-2-2.5.46.46%2C0%2C0%2C1%2C.2-.7%2C2.65%2C2.65%2C0%2C0%2C0%2C.5-.6c.2-.2.2-.4.4-.6a.64.64%2C0%2C0%2C0%2C0-.6c-.1-.2-.8-1.9-1.1-2.7s-.6-.6-.8-.6h-.7a1.85%2C1.85%2C0%2C0%2C0-1%2C.4%2C4.16%2C4.16%2C0%2C0%2C0-1.3%2C3%2C6.45%2C6.45%2C0%2C0%2C0%2C1.5%2C3.7c.2.2%2C2.5%2C4%2C6.2%2C5.4s3.7%2C1%2C4.3.9a3.74%2C3.74%2C0%2C0%2C0%2C2.4-1.7A2.82%2C2.82%2C0%2C0%2C0%2C32.5%2C26.8Z%22%20style%3D%22fill%3A%20%23fff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
                      </a>
                      <a class="show hover-opacity sm-button sm-button-circle " target="_blank" href="tel:79503587034">
                          <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%235461f4%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.61%2C31.06h0c-1.14-2.15-4.78-4.33-5.2-4.58a3.37%2C3.37%2C0%2C0%2C0-2.52-.41%2C2.48%2C2.48%2C0%2C0%2C0-1.46%2C1.1c-.47.56-1.06%2C1.23-1.19%2C1.34a1.59%2C1.59%2C0%2C0%2C1-2.42-.25l-6.09-6.08a1.58%2C1.58%2C0%2C0%2C1-.27-2.38c.14-.17.81-.76%2C1.37-1.23a2.48%2C2.48%2C0%2C0%2C0%2C1.1-1.46%2C3.35%2C3.35%2C0%2C0%2C0-.42-2.53c-.24-.41-2.42-4.05-4.57-5.19A3.32%2C3.32%2C0%2C0%2C0%2C15%2C10l-1.34%2C1.34C11.25%2C13.75%2C8.29%2C19%2C15.77%2C26.43l7.8%2C7.8C27.15%2C37.81%2C30.21%2C39%2C32.69%2C39a8.45%2C8.45%2C0%2C0%2C0%2C6-2.68L40%2C35A3.32%2C3.32%2C0%2C0%2C0%2C40.61%2C31.06Z%22%20style%3D%22fill%3A%20%23ffffff%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E">
                      </a>
                      <a class="show hover-opacity sm-button sm-button-circle " target="_blank" href="https://www.messenger.com/t/facebook messenger id?call">
                          <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%09%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%0A%09%09%3Ctitle%3EFacebook%20Messenger%3C%2Ftitle%3E%0A%09%09%3Cg%3E%0A%09%09%09%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2225%22%20style%3D%22fill%3A%20%230084ff%22%2F%3E%0A%09%09%09%3Cpath%0A%09%09%09%09d%3D%22M25%2C10c-8.29%2C0-15%2C6.22-15%2C13.89A13.5%2C13.5%2C0%2C0%2C0%2C15.59%2C34.7V40l5.11-2.8a16.45%2C16.45%2C0%2C0%2C0%2C4.3.58c8.28%2C0%2C15-6.22%2C15-13.89S33.28%2C10%2C25%2C10Zm1.49%2C18.7-3.82-4.07L15.22%2C28.7l8.2-8.7%2C3.91%2C4.07L34.69%2C20Z%22%0A%09%09%09%09style%3D%22fill%3A%20%23fff%22%2F%3E%0A%09%09%3C%2Fg%3E%0A%09%3C%2Fsvg%3E%0A">
                      </a>
                      <a class="show hover-opacity sm-button sm-button-circle " target="_blank" href="viber://chat?number=%2B79503587034">
                          <img alt="" src="data:image/svg+xml;charset=utf-8,%0A%3Csvg%20version%3D%221.0%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000000%22%0A%20width%3D%2250.000000pt%22%20height%3D%2250.000000pt%22%20viewBox%3D%220%200%2050.000000%2050.000000%22%0A%20preserveAspectRatio%3D%22xMidYMid%20meet%22%3E%0A%0A%3Ccircle%20cx%3D%2220pt%22%20cy%3D%2220pt%22%20r%3D%2216pt%22%20fill%3D%22%23fff%22%3E%3C%2Fcircle%3E%0A%3Cg%20transform%3D%22translate(0.000000%2C50.000000)%20scale(0.100000%2C-0.100000)%22%0Afill%3D%22blue%22%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M167%20484%20c-92%20-28%20-167%20-134%20-167%20-234%200%20-131%20119%20-250%20250%20-250%20129%0A0%20250%20121%20250%20250%200%20100%20-78%20207%20-172%20235%20-63%2018%20-98%2018%20-161%20-1z%20m198%20-86%0Ac34%20-27%2055%20-75%2055%20-128%200%20-94%20-54%20-150%20-144%20-150%20-37%200%20-56%20-6%20-72%20-21%20-25%0A-23%20-44%20-18%20-44%2010%200%2010%20-12%2026%20-26%2036%20-72%2047%20-71%20196%201%20253%2024%2019%2041%2022%20115%0A22%2074%200%2091%20-3%20115%20-22z%22%2F%3E%0A%3Cpath%20fill%3D%22%23665CAC%22%20d%3D%22M185%20383%20c-11%20-3%20-30%20-14%20-42%20-26%20-19%20-17%20-23%20-31%20-23%20-85%200%20-57%203%0A-66%2030%20-94%2018%20-18%2030%20-40%2030%20-56%20l0%20-26%2028%2026%20c18%2018%2043%2028%2080%2033%2071%209%2092%2036%0A92%20120%200%2084%20-22%20106%20-112%20111%20-35%201%20-72%200%20-83%20-3z%20m112%20-38%20c24%20-17%2047%20-72%2032%0A-80%20-5%20-4%20-9%204%20-10%2017%200%2021%20-1%2021%20-8%204%20-7%20-19%20-8%20-19%20-13%202%20-4%2012%20-14%2025%20-25%0A29%20-18%207%20-33%2022%20-33%2036%200%2012%2034%208%2057%20-8z%20m-83%20-17%20c11%20-15%2012%20-25%205%20-34%20-21%0A-26%2030%20-75%2056%20-54%209%207%2019%205%2036%20-9%2023%20-19%2023%20-21%207%20-37%20-14%20-15%20-21%20-15%20-47%20-4%0A-35%2014%20-96%2077%20-106%20109%20-6%2021%209%2051%2026%2051%204%200%2015%20-10%2023%20-22z%20m71%20-29%20c11%20-17%0A-1%20-21%20-15%20-4%20-8%209%20-8%2015%20-2%2015%206%200%2014%20-5%2017%20-11z%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
                      </a>
                  </div>
              </div>
          </div>`;
      break;
    case "message_bar":
      contentHtml = `
              <div id="mb_section">
                  <div id="mb_messageBar" class="message-bar">
                    <div class="message-all">
                      <div class="powered-msg">Powered by GetLeads</div>
                      <div class="message-body">
                        <div id="mb_messageText">Message Text Here.</div>
                        <a id="mb_messageButton" class="message-button" href="#" target="_blank">Check agreement</a>
                        <div id="mb_closeButton" class="" style="display:none">X</div>
                      </div>
                    </div>
                  </div>
              </div>
          `;
      break;
  }
  $("#widget_section").html(contentHtml);
}


if (userSite) {
  $('#widget_section').on('click', '#pu_modalButton', function () {
    visitorClick(guid, widgetValue['widgetId']);
  });

  $('#widget_section').on('click', '#mb_closeButton', function() {
    $("#mb_messageBar").fadeOut();
  });

  $(document).ready(function () {
    widgetValue = getLastRealWidgetValue();
    console.log(widgetValue);

    let widgetType = widgetValue['widgetName'];
    insertWidgets(widgetType.toLowerCase().replace(' ', '_'));
    switch (widgetType) {
      case 'Popup':
        showRealPopupModal();
        break;
      case 'Popup Form':
        showRealPopupFormModal();
        break;
      case 'FAQ':
        updateRealFaqButton();
        break;
      case 'Story':
        updateRealStoryTheme();
        break;
      case 'Contact Us':
        updateRealContactButton();
        updateRealContactUsSection();
        break;
      case 'Review':
        updateRealReviewButton();
        break;
      case 'Message Bar':
        updateRealMessageBar();
        break;
      case 'Follow Us':
        updateRealFollowUs();
        break;
    }
  });
}
