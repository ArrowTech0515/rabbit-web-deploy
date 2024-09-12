//////////////////////////////////////////////////////////////////////
// #region (global variables)

var g_channels = [];

const g_properties = {
    "Whatsapp": {
        color: '#00cc66',
        desktop: true,
        mobile: true,
        hoverText: "Whatsapp",
        hoverTextOnClose: "Close",
    },
    "Messenger": {
        color: '#1E88E5',
        desktop: true,
        mobile: true,
        hoverText: "Messenger",
        hoverTextOnClose: "Close",
    },
    "Phone": {
        color: '#03E78B',
        desktop: true,
        mobile: true,
        hoverText: "Phone",
        hoverTextOnClose: "Close",
    },
    "Email": {
        color: '#FF485F',
        desktop: true,
        mobile: true,
        hoverText: "Email",
        hoverTextOnClose: "Close",
    },
    "Instagram": {
        color: '#9737bd',
        desktop: true,
        mobile: true,
        hoverText: "Instagram",
        hoverTextOnClose: "Close",
    },
    "SMS": {
        color: '#FF549C',
        desktop: true,
        mobile: true,
        hoverText: "SMS",
        hoverTextOnClose: "Close",
    },
    "ContactForm": {
        color: '#253974',
        desktop: true,
        mobile: true,
        hoverText: "Contact Form",
        hoverTextOnClose: "Close",
        titleBGColor: '#3988D7',
        titleTxtColor: '#ffffff',
        closeIconColor: '#3988D7',
        titleText: 'Contact Us Today!',
        buttonBGColor: '#3988D7',
        textColor: '#ffffff',
        closeAfterSubmission: false,
        closeAfterSec: 0,
        redirect: false,
        redirectUrl: '',
        thankyou: '',
        buttonRange: 100,
        fieldSize: 100,
        buttonSize: 100,
    },
    "Line": {
        color: '#38B900',
        desktop: true,
        mobile: true,
        hoverText: "Line",
        hoverTextOnClose: "Close",
    },
    "Telegram": {
        color: '#3E99D8',
        desktop: true,
        mobile: true,
        hoverText: "Telegram",
        hoverTextOnClose: "Close",
    },
    "Viber": {
        color: '#665CAC',
        desktop: true,
        mobile: true,
        hoverText: "Viber",
        hoverTextOnClose: "Close",
    },
    "Twitter": {
        color: '#000000',
        desktop: true,
        mobile: true,
        hoverText: "Twitter",
        hoverTextOnClose: "Close",
    },
    "Wechat": {
        color: '#45DC00',
        desktop: true,
        mobile: true,
        hoverText: "WeChat",
        hoverTextOnClose: "Close",
    },
    "Snapchat": {
        color: '#FFE81D',
        desktop: true,
        mobile: true,
        hoverText: "Snapchat",
        hoverTextOnClose: "Close",
    },
    "Skype": {
        color: '#03A9F4',
        desktop: true,
        mobile: true,
        hoverText: "Skype",
        hoverTextOnClose: "Close",
    },
    "Waze": {
        color: '#6ECCEF',
        desktop: true,
        mobile: true,
        hoverText: "Waze",
        hoverTextOnClose: "Close",
    },
    "Linkedin": {
        color: '#0077b5',
        desktop: true,
        mobile: true,
        hoverText: "LinkedIn",
        hoverTextOnClose: "Close",
    },
    "Facebook": {
        color: "#455595",
        desktop: true,
        mobile: true,
        hoverText: "Facebook",
        hoverTextOnClose: "Close",
    },
    "Slack": {
        color: '#000033',
        desktop: true,
        mobile: true,
        hoverText: "Slack",
        hoverTextOnClose: "Close",
    },
    "ConnectedApps": {
        color: '#FF5733', // Example color
        desktop: true,
        mobile: true,
        hoverText: "Connected Apps",
        hoverTextOnClose: "Close",
    },
    "Integration": {
        color: '#C70039', // Example color
        desktop: true,
        mobile: true,
        hoverText: "Integration",
        hoverTextOnClose: "Close",
    }
};

// #endregion

/////////////////////////////////////////////////////////////////////
// #region (show/hide loading functions)

function showLoading() {
    $(".c-loading-lay").removeClass("d-none");
}
  
function hideLoading() {
    $(".c-loading-lay").addClass("d-none");
}

// #endregion

$(document).ready(function() {

//////////////////////////////////////////////////////////////////////
// #region (read data from server)

showLoading();

let guid;
let userSite = !(realSite === false);
if (userSite) {
    guid = new URL(document.currentScript.src).searchParams.get("guid");
}

var serverData;
getWidgetsList(function (widgetList) {
    serverData = widgetList;

    if (serverData !== undefined) {
        serverData.map(widget => {
            g_properties[widget[2]] = JSON.parse(widget[4]);
            g_properties[widget[2]].id = widget[0];
            g_properties[widget[2]].createdDate = formatDate(widget[3]);
            g_properties[widget[2]].visits = widget[6];
            g_properties[widget[2]].clicks = widget[7];
            g_properties[widget[2]].submissions = widget[8];
            g_properties[widget[2]].state = widget[9];
            selectChannel(widget[2]);
        });
    }
    
    // set widgets location
    setWidgetPosition(g_properties["Whatsapp"].position);

    hideLoading();
});

// #endregion

/////////////////////////////////////////////////////////////////////
// #region (draw pages using downloaded data)

if (realSite) {
    loadCss('assets/css/easyChat.css');
    loadCss('assets/css/bootstrap.min.css');
    loadScript('assets/scripts/jquery.rateyo.min.js');
    $("body").prepend(`
        <div class='c-chatbuttons-container9102938194756 c-position-bottom-right'>
            <div class="modal fade" id="contactusSubmitModal" aria-hidden="true" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content position-relative" style="border-radius: 20px;">

                    <!-- Modal Header -->
                    <div class="modal-header w-100 d-flex justify-content-between" 
                        style="background: #3988D7; padding: 30px 40px; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                        <p class="text-modal-title text-white">Contact Us Today!</p>
                        <img src="../assets/images/easychatty/close-circle.png" alt="close" style="cursor: pointer;" data-bs-dismiss="modal">
                    </div>

                    <!-- Modal body -->
                    <form class="modal-body d-flex flex-column" style="gap: 10px; padding: 40px; margin-bottom: 68px;" onsubmit="submitContactUs(event)">
                        
                        <!-- your name -->
                        <div>
                        <label for="contactUsName" class="form-label text-3-bold main-text">Your Name</label>
                        <input type="text" class="form-control" id="contactUsName" placeholder="Enter Your Name" required>
                        </div>

                        <!-- email -->
                        <div>
                        <label for="contactUsEmail" class="form-label text-3-bold main-text">Email</label>
                        <input type="email" class="form-control" id="contactUsEmail" placeholder="Enter Your Email Address" required>
                        </div>

                        <!-- message -->
                        <div>
                        <label for="nacontactUsMessage" class="form-label text-3-bold main-text">Message</label>
                        <input type="text" class="form-control" id="nacontactUsMessage" placeholder="Enter Your Message" required>
                        </div>

                        <!-- submit button -->
                        <div style="padding-top: 40px;">
                        <button type="submit" class="btn btn-primary w-100">Submit</button>
                        </div>
                    </form>

                    <!-- icon -->
                    <img src="../assets/images/easychatty/icon_ContactForm.png" alt="contact-us" class="position-absolute bottom-0 end-0">
                    </div>
                </div>
                </div>

                <div class="modal fade" id="contactusSubmitSuccessModal" aria-hidden="true" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content position-relative" style="border-radius: 20px;">

                    <!-- Modal Header -->
                    <div class="modal-header w-100 d-flex justify-content-end bg-white border-0" 
                        style="padding: 30px 40px; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                        <img src="../assets/images/easychatty/close.png" alt="close" style="cursor: pointer;" data-bs-dismiss="modal">
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body d-flex flex-column" style="gap: 10px; padding: 40px; margin-bottom: 68px;">
                        
                        <div class="d-flex">
                        <img src="../assets/images/easychatty/thank_you.png" alt="thank-you">
                        </div>

                        <!-- submit button -->
                        <div style="padding-top: 40px;">
                        <button type="button" class="btn btn-primary w-100" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>

                    <!-- icon -->
                    <img src="../assets/images/easychatty/icon_ContactForm.png" alt="contact-us" class="position-absolute bottom-0 end-0">
                    </div>
                </div>
                </div>
        </div>`);
}

// draw chat icons
UpdateChatIcons();

// #endregion

});

//////////////////////////////////////////////////////////////////////
// #region (function to draw channels on the page)

function UpdateChatIcons() {

    // remove all icons
    $(".c-chatbuttons-container9102938194756").html("");

    // add icons
    g_channels.forEach(id => {
        
        // prepare element
        let element = $("#channelIconHiddenWrapper").html();
        element = element.replace(/Normal/g, id);

        if (realSite) {
            element = element.replace("width: 30px; height: 30px;", "width: 48px; height: 48px");
        }

        // mobile or phone
        if (realSite) {
            if (!isMobile() && g_properties[id].desktop) // desktop
                $(".c-chatbuttons-container9102938194756").append(element);
            if (isMobile() && g_properties[id].mobile)
                $(".c-chatbuttons-container9102938194756").append(element);
        } else {
            if ($("#setPreviewModeDesktop").hasClass("blue-new-accent-1") &&
                    g_properties[id].desktop)
                $(".c-chatbuttons-container9102938194756").append(element);
            if ($("#setPreviewModeMobile").hasClass("blue-new-accent-1") &&
                    g_properties[id].mobile)
                $(".c-chatbuttons-container9102938194756").append(element);
        }

        // set settings
        $(`#liveChannelIcon${id}`).css("background-color", g_properties[id].color); // bg color
        $(`#liveChannelIcon${id}`).attr("title", g_properties[id].hoverText); // hover text
    });

    initTooltip();
}

// pos
// 0: bottom right
// 1: bottom left
// 2: top right
// 3: top left
function setWidgetPosition(pos) {

    g_properties["Whatsapp"].position = pos;

    // remove all classes
    $(".c-chatbuttons-container9102938194756").removeClass("c-position-bottom-right");
    $(".c-chatbuttons-container9102938194756").removeClass("c-position-bottom-left");
    $(".c-chatbuttons-container9102938194756").removeClass("c-position-top-right");
    $(".c-chatbuttons-container9102938194756").removeClass("c-position-top-left");
                                                            
    if (g_properties["Whatsapp"].position == 0) {
        $(".c-chatbuttons-container9102938194756").addClass("c-position-bottom-right");
    } else if (g_properties["Whatsapp"].position == 1) {
        $(".c-chatbuttons-container9102938194756").addClass("c-position-bottom-left");
    } else if (g_properties["Whatsapp"].position == 2) { 
        $(".c-chatbuttons-container9102938194756").addClass("c-position-top-right");
    } else {
        $(".c-chatbuttons-container9102938194756").addClass("c-position-top-left");
    }

    // set sidebar and settings icons
    $(".c-channel-icon-preview-block").removeClass("active");
    $(`#position${pos}.c-channel-icon-preview-block.position`).addClass("active");
    $(`#positionMobile${pos}.c-channel-icon-preview-block.position`).addClass("active");
}

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (save contact information)

function submitContactUs(event) {

    // prevent moving
    event.preventDefault();

    // send data
    $("#contactusSubmitModal").modal(hide);
    $("#contactusSubmitSuccessModal").modal(show);

    // send data to server
    // visitSubmit()
}

// #endregion

//////////////////////////////////////////////////////////////////////
// #region (utilites)

function initTooltip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
}

function linkWithCommunicationApp(obj) {

    // send click event
    // visitorClick(g_properties[id].id);

    // send real connection
    let id = $(obj).attr("id").replace("liveChannelIcon", "");
    let contact = g_properties[id]?.contact;
    let url = "";

    switch (id) {
        case "Whatsapp":
            url = 'https://wa.me/' + contact.replace(/\+|\s/g, "");
            break;
        case "Skype":
            url = 'skype:' + contact + '?chat';
            break;
        case "Messenger":
            url = 'https://m.me/' + contact;
            break;
        case "Phone":
            url = 'tel:' + contact;
            break;
        case "Email":
            url = 'mailto:' + contact;
            break;
        case "Instagram":
            url = 'https://www.instagram.com/' + contact;
            break;
        case "SMS":
            url = 'sms:' + contact;
            break;
        case "Line":
            url = 'https://line.me/R/ti/p/' + contact;
            break;
        case "Telegram":
            url = 'https://t.me/' + contact;
            break;
        case "Viber":
            url = 'viber://chat?number=' + contact;
            break;
        case "Twitter":
            url = 'https://twitter.com/' + contact;
            break;
        case "Wechat":
            // WeChat does not support direct linking; provide instructions or fallback URL
            url = 'https://www.wechat.com/';
            break;
        case "Snapchat":
            url = 'https://www.snapchat.com/add/' + contact;
            break;
        case "Waze":
            url = 'https://waze.com/ul?q=' + encodeURIComponent(contact);
            break;
        case "Linkedin":
            url = 'https://www.linkedin.com/in/' + contact;
            break;
        case "Facebook":
            url = 'https://www.facebook.com/' + contact;
            break;
        case "Slack":
            url = 'slack://user?team=T12345678&id=' + contact; // Replace T12345678 with your Slack team ID
            break;
        case "ConnectedApps":
            url = '/connected-apps'; // Replace with actual URL for connected apps
            break;
        case "Integration":
            url = '/integration'; // Replace with actual URL for integrations
            break;
        case "ContactForm":
            $("#contactusSubmitModal").modal("show");
            return;
    }
    
    window.open(url, '_blank');
}

function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

function formatDate(dateString) {
    const date = new Date(dateString);

    // Get the month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    // Format as MM.DD.YYYY
    return `${month}.${day}.${year}`;
}

// #endregion