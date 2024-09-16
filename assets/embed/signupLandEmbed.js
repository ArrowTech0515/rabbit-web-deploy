var SignupLandEmbeddedObject = {
    guid: '',
    isThankYouModal: false,
    id: 0,
    type: '',
    plugin: '',

    iconVSpacing: 0,
    iconHSpacing: 0,

    /**
     * SignupUtilities
     * @param data
     * @returns {[string, number]}
     */
    getPluginType: function (data) {
        var v = data.split("-");
        var type = "";
        var pluginId = parseInt(v[1]);

        this.type = v[0];
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
    hexToRgb: function (hex) {
        // Remove the hash at the start if it's there
        hex = hex.replace(/^#/, '');

        // Parse the hex value into R, G, and B components
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return {red: r, green: g, blue: b};
    },

    getDefaultPlugin: function (type, widgetID) {
        if (type == "contact_forms") {
            if (widgetID == 1) {
                return `
                    <div class="col-md-12 plugin-widget-container contact_forms form_1" data-plugin="1">
                        <div class="row">
                            <div class="col-xl-3 col-lg-2 col-md-1"></div>
                            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 form-wrapper for-backgroundColor">
                                <div class="row">
                                    <div class="col-1"></div>
                                    <div class="col-10">
                                        <span class="close-button">&times;</span>

                                        <h1 class="title for-titleTextColor for-titleFont">Contact Us Today!</h1>
                                        <p class="description for-bodyTextColor for-secondaryFont">If you have any questions or want to know more about our service, contact us using the contact form below</p>
                                        <form class="form-container" method="post">
                                            <div class="form-group-list">
                                                <div class="form-group">
                                                    <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="First Name" placeholder="First Name">
                                                </div>
                                                <div class="form-group">
                                                    <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Your Mail" placeholder="Your Mail">
                                                </div>
                                                <div class="form-group">
                                                    <textarea class="form-control for-fieldTextColor for-fieldFont" name="Your Message" placeholder="Your Message"></textarea>
                                                </div>
                                            </div>

                                            <div class="actions-area">
                                                <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Submit</button>
                                            </div>

                                            <div class="logo-area">
                                                <span class="for-secondaryFont">Powered By</span><img src="/assets/images/signup/contact_forms/1_powered_by.png" class="logo">
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-1"></div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-2 col-md-1"></div>
                        </div>
                    </div>
                  `;
            } else if (widgetID == 2) {
                return `
                    <div class="col-md-12 plugin-widget-container contact_forms form_2" data-plugin="2">
                        <div class="row">
                            <div class="col-xl-3 col-lg-2 col-md-1"></div>
                            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 form-wrapper for-backgroundColor">
                                <div class="contact-image"></div>

                                <!-- Right side form -->
                                <div class="contact-form">
                                    <span class="close-button">&times;</span>

                                    <h1 class="for-titleTextColor for-titleFont">Contact Us Today!</h1>
                                    <p class="for-bodyTextColor for-secondaryFont">If you have any questions or want to know more about our service, contact us using the contact form below</p>
                                    <form class="form-container" method="post">
                                        <div class="form-group-list">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Full Name">
                                            </div>
                                            <div class="form-group">
                                                <input type="email" class="form-control" placeholder="Your Mail" required>
                                            </div>
                                            <div class="form-group">
                                                <textarea class="form-control" placeholder="Message" rows="5" maxlength="400"></textarea>
                                            </div>
                                        </div>

                                        <div class="actions-area">
                                            <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Submit</button>
                                        </div>
                                    </form>

                                    <div class="logo-area">
                                        <span class="for-secondaryFont">Powered By</span><img src="/assets/images/signup/contact_forms/2_powered_by.png" class="logo">
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-2 col-md-1"></div>
                        </div>
                    </div>
                  `;
            } else if (widgetID == 3) {
                return `
                            <div class="col-md-12 plugin-widget-container contact_forms form_3" data-plugin="3">
                                <div class="row">
                                    <div class="col-xl-3 col-lg-2 col-md-1"></div>
                                    <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 form-wrapper for-backgroundColor">
                                        <div class="contact-image">
                                            <div class="corner-design for-accentBackgroundColor"></div>
                                            <div class="background-text-1"><h4>Get In<br>Touch!</h4></div>
                                            <h1 class="for-titleTextColor for-titleFont">Contact Us</h1>
                                            <h2 class="for-accentTextColor for-titleFont">Today!</h2>
                                            <div class="editable-area">
                                                <div class="editable description for-bodyTextColor for-secondaryFont">
                                                    company@mail.com<br>
                                                    1-000-111-2222<br>
                                                    82323423 dsfas 23423 3343<br>
                                                    4343-343<br>
                                                </div>
                                            </div>
                                        </div>
    
                                        <!-- Right side form -->
                                        <div class="contact-form">
                                            <span class="close-button">&times;</span>
    
                                            <form class="form-container" method="post">
                                                <div class="form-group-list">
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" placeholder="Full Name">
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="email" class="form-control" placeholder="Your Mail" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <textarea class="form-control" placeholder="Message" rows="5" maxlength="400"></textarea>
                                                    </div>
                                                </div>
    
                                                <div class="actions-area">
                                                    <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Submit</button>
                                                </div>
                                            </form>
    
                                            <div class="logo-area">
                                                <span class="for-secondaryFont">Powered By</span><img src="/assets/images/signup/contact_forms/4_powered_by.png" class="logo">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-2 col-md-1"></div>
                                </div>
                            </div>
                  `;
            } else if (widgetID == 4) {
                return `
                            <div class="col-md-12 plugin-widget-container contact_forms form_4" data-plugin="4">
                                <div class="row">
                                    <div class="col-xl-3 col-lg-2 col-md-1"></div>
                                    <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 form-wrapper for-backgroundColor">
                                        <div class="contact-image for-accentBackgroundColor">
                                            <h1 class="for-titleTextColor for-titleFont">Get In<br>Touch!</h1>
                                            <div class="editable-area">
                                                <div class="editable description for-bodyTextColor for-secondaryFont">
                                                    company@mail.com<br>
                                                    1-000-111-2222<br>
                                                    82323423 dsfas 23423 3343<br>
                                                    4343-343<br>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Right side form -->
                                        <div class="contact-form">
                                            <span class="close-button">&times;</span>

                                            <form class="form-container" method="post">
                                                <div class="form-group-list">
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" placeholder="Full Name">
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="email" class="form-control" placeholder="Your Mail" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <textarea class="form-control" placeholder="Message" rows="5" maxlength="400"></textarea>
                                                    </div>
                                                </div>

                                                <div class="actions-area">
                                                    <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Submit</button>
                                                </div>
                                            </form>

                                            <div class="logo-area">
                                                <span class="for-secondaryFont">Powered By</span><img src="/assets/images/signup/contact_forms/4_powered_by.png" class="logo">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-2 col-md-1"></div>
                                </div>
                            </div>
                  `;
            }
        } else if (type == 'join_newsletter') {
            if (widgetID == 1) {
                return `
                                <div class="col-md-12 plugin-widget-container join_newsletter form_1" data-plugin="1">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-3 col-md-2"></div>
                                        <div class="col-xl-4 col-lg-6 col-md-8 form-wrapper for-backgroundColor">
                                            <div class="row mt-5 mb-3">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <div class="d-flex justify-content-center">
                                                        <span class="cover-icon for-accentTextColor"><i class="bi bi-envelope-paper-fill"></i></span>
                                                    </div>
                                                    <h1 class="title for-titleTextColor for-titleFont">Subscribe Now</h1>
                                                    <p class="description for-bodyTextColor for-secondaryFont">Enter your email to receive daily updates.</p>

                                                    <form class="form-container" method="post">
                                                        <div class="form-custom-wrapper">
                                                            <div class="form-group for-sideSpacingMarginRight">
                                                                <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Email" placeholder="Enter your Email" style="min-width: 250px;">
                                                            </div>

                                                            <div class="actions-area">
                                                                <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">SUBSCRIBE</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-3 col-md-2"></div>
                                    </div>
                                </div>
                  `;
            } else if (widgetID == 2) {
                return `
                                <div class="col-md-12 plugin-widget-container join_newsletter form_2" data-plugin="2">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-3 col-md-2"></div>
                                        <div class="col-xl-4 col-lg-6 col-md-8 form-wrapper for-backgroundColor">
                                            <div class="row mt-5 mb-5">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title for-titleTextColor for-titleFont">SUBSCRIBE</h1>
                                                    <p class="description for-bodyTextColor for-secondaryFont">Get notified about the next update.</p>

                                                    <form class="form-container" method="post">
                                                        <div class="form-group-list">
                                                        </div>
                                                        <div class="form-custom-wrapper">
                                                            <div class="form-group for-sideSpacingMarginRight">
                                                                <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Email" placeholder="Enter Your Email" style="min-width: 250px;">
                                                            </div>

                                                            <div class="actions-area">
                                                                <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Subscribe</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-3 col-md-2"></div>
                                    </div>
                                </div>
                  `;
            } else if (widgetID == 3) {
                return `
                                <div class="col-md-12 plugin-widget-container join_newsletter form_3" data-plugin="3">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-3 col-md-2"></div>
                                        <div class="col-xl-4 col-lg-6 col-md-8 form-wrapper for-backgroundColor">
                                            <div class="row mt-5 mb-5">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <div class="row">
                                                        <div class="col">
                                                            <h1 class="title for-titleTextColor for-titleFont">Join Our Newsletter</h1>
                                                            <p class="description for-bodyTextColor for-secondaryFont">Get notified about the next update.</p>

                                                            <form class="form-container" method="post">
                                                                <div class="form-group-list">
                                                                </div>
                                                                <div class="form-custom-wrapper">
                                                                    <div class="form-group for-sideSpacingMarginRight">
                                                                        <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Email" placeholder="Enter Your Email" style="min-width: 250px;">
                                                                    </div>

                                                                    <div class="actions-area">
                                                                        <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">JOIN</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div class="col" style="background: url('/assets/images/signup/join_newsletter/3_bg.png') center/cover no-repeat; opacity: .4;">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-3 col-md-2"></div>
                                    </div>
                                </div>
                  `;
            } else if (widgetID == 4) {
                return `
                                <div class="col-md-12 plugin-widget-container join_newsletter form_4" data-plugin="4">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-3 col-md-2"></div>
                                        <div class="col-xl-4 col-lg-6 col-md-8 form-wrapper for-backgroundColor">
                                            <div class="row mt-5 mb-5">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title for-titleTextColor for-titleFont">Keep in Touch</h1>
                                                    <p class="description for-bodyTextColor for-secondaryFont">Join us for the finest holiday inspiration along with some exclusive deals - just between us</p>

                                                    <form class="form-container" method="post">
                                                        <div class="form-group-list">
                                                        </div>
                                                        <div class="form-custom-wrapper">
                                                            <div class="form-group for-sideSpacingMarginRight">
                                                                <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Email" placeholder="Enter Your Email" style="min-width: 250px;">
                                                            </div>

                                                            <div class="actions-area">
                                                                <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Join Us</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-3 col-md-2"></div>
                                    </div>
                                </div>
                  `;
            }
        } else if (type == 'lead_generation') {
            if (widgetID == 5) {
                return `
                                <div class="col-md-12 plugin-widget-container lead_generation form_5" data-plugin="5">
                                    <div class="row">
                                        <div class="col-xl-3 col-lg-2 col-md-1"></div>
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper for-accentBorderColor for-backgroundColor">
                                            <div class="row mt-5 mb-3">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title for-titleTextColor for-titleFont">GET IN <b>TOUCH</b></h1>
                                                    <p class="description for-bodyTextColor for-secondaryFont">If you have any questions or want to know more about our service, contact us using the contact form below</p>

                                                    <form class="form-container" method="post">
                                                        <div class="form-group-list">
                                                            <div class="form-group">
                                                                <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Full Name" placeholder="Full Name">
                                                            </div>
                                                            <div class="form-group">
                                                                <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Email" placeholder="Email">
                                                            </div>
                                                            <div class="form-group">
                                                                <textarea class="form-control for-fieldTextColor for-fieldFont" name="Message" placeholder="Message"></textarea>
                                                            </div>
                                                        </div>

                                                        <div class="actions-area">
                                                            <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">SENT</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-2 col-md-1"></div>
                                    </div>
                                </div>
                  `;
            }
        }


        return `<div class="col-md-12 plugin-widget-container">`
    },

    addThankYouModal: function (config, color) {
        var modal = `
                    <div class="modal" id="thankYouModal" tabindex="-1" aria-labelledby="thankYouModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header border-0" style="justify-content: end;">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="border:none; outline: none; background: transparent;">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body text-center">
                                    <img src="/assets/images/signup/thanks.png" style="margin: auto;">
                                    <h5 class="modal-title mb-3" style="display: ${config.title.is ? 'block' : 'none'};">${config.title.text}</h5>
                                    <p class="mb-1" style="display: ${config.text.is ? 'block' : 'none'};">${config.text.text}</p>
                                </div>
                                <div class="modal-footer">
                                    <a href="#" class="btn" style="display: ${config.button.is ? 'block' : 'none'}; color: ${color.button};" >${config.button.text}</a>
                                </div>
                            </div>
                        </div>
                    </div>
        `;

        $('body').append(modal)
    },

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
        } else if (target == "touchText") {
            $(".btnTouch>.text").html(value);
        } else if (target == "touchFont") {
            $(".btnTouch>.text").css('fontFamily', value);
        } else if (target == "touchIcon") {
            $(".btnTouch>.icon").html("<i class='bi " + value + "'></i>");
        } else if (target == "touchType") {
            // if (value=='rect') {
            //     $(".btnTouch").css('borderRadius', '32px');
            // } else if (value=='circle') {
            //     $(".btnTouch").css('borderRadius', '50%');
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
        } else if (target == 'touchShow') {
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
        } else if (target == "pluginSize") {
            $(".btnTouch").css('fontSize', value + 'px');
        } else if (target == "bottomSpacing") {
        } else if (target == "sideSpacing") {
        } else if (target == "rounding") {
            $('.btnTouch').css('borderRadius', value + 'px');
        } else if (target == "roundingX") {
            $('.btnTouch').css('borderRadius', value + '%');
        } else if (target == 'sizeWidth') {
            $('.plugin-widget-container .form-group>input').css('width', value + '%');
            $('.plugin-widget-container .form-group>textarea').css('width', (value) + '%');
            $('.plugin-widget-container .actions-area button').css('width', value + '%');
        } else if (target == 'sizeHeight') {
            $('.plugin-widget-container .form-group>input').css('height', value + 'px');
            $('.plugin-widget-container .form-group>textarea').css('height', (value * 2) + 'px');
            $('.plugin-widget-container .actions-area button').css('height', value + 'px');
        } else if (target == 'shadow') {
            var color = this.hexToRgb(value.color);
            // $('.plugin-widget-container .form-group>input').css('boxShadow', value.size + "px " + value.size + "px " + (parseInt(value.size)*2) + "px rgba(" + color.red + ", " + color.green + ", " + color.blue + ", " + (parseInt(value.opacity) / 100) + ")");
            // $('.plugin-widget-container .form-group>textarea').css('boxShadow', value.size + "px " + value.size + "px " + (parseInt(value.size)*2) + "px rgba(" + color.red + ", " + color.green + ", " + color.blue + ", " + (parseInt(value.opacity) / 100) + ")");
            $('.plugin-widget-container .form-wrapper').css('boxShadow', value.size + "px " + value.size + "px " + (parseInt(value.size) * 2) + "px rgba(" + color.red + ", " + color.green + ", " + color.blue + ", " + (parseInt(value.opacity) / 100) + ")");
        }

    },

    updateAll: function (data) {
        var me = this;
        var thanksColor = {
            title: '#000',
            text: '#000',
            button: '#000',
        }
        var shadow = {
            size: 0,
            opacity: 0,
            color: '#000000',
        };

        var html = "";
        $(".plugin-widget-container .form-group-list").html("");
        $.each(data.fields, function (index, row) {
            html += '<div class="form-group">';

            var type = row.type;
            var name = row.name;
            if (name == "") {
                name = "Field " + parseInt(Math.random() * 99999);
            }

            var required = row.required;
            var hidden = row.hidden;

            if (hidden) {
                html += '<input class="form-control for-fieldTextColor for-fieldFont" type="hidden" name="' + name + '" placeholder="' + name + '">';
            } else {
                if (type == 'short-text') {
                    html += '<input class="form-control for-fieldTextColor for-fieldFont" ' + (required ? 'required' : '') + ' type="text" name="' + name + '" placeholder="' + name + '">';
                } else if (type == 'long-text') {
                    html += '<textarea class="form-control for-fieldTextColor for-fieldFont" ' + (required ? 'required' : '') + ' name="' + name + '" placeholder="' + name + '"></textarea>';
                }
            }

            html += '</div>';
        });
        $(".plugin-widget-container .form-group-list").html(html);

        if (data.description != null && data.description != "") {
            var description = data.description.replace(/\n/g, '<br>');
            description = description.replace(/(<br>\s*){2,}/g, '<br>');
            description = description.replace(/(<br\s*\/?>\s*){2,}/g, '<br />');
            $(".plugin-widget-container.active .editable.description").html(description);
        }


        $.each(data.colors, function (index, row) {
            if (row.name == 'shadowColor') {
                shadow.color = row.value;
            }

            if (row.name == "thanksTitleColor") {
                thanksColor.title = row.value;
            } else if (row.name == "thanksTextColor") {
                thanksColor.text = row.value;
            } else if (row.name == "thanksButtonColor") {
                thanksColor.button = row.value;
            }

            me.update(row.name, row.value);
        });

        $.each(data.fonts, function (index, row) {
            me.update(row.name, row.value);
        });

        // icon advanced
        if (data.advanced.plugin != null) {
            me.update("pluginSize", data.advanced.plugin);
        }
        if (data.advanced.bottomSpacing != null) {
            me.iconVSpacing = data.advanced.bottomSpacing;
        }
        if (data.advanced.sideSpacing != null) {
            me.iconHSpacing = data.advanced.sideSpacing;
        }

        if (data.plugin != null && data.position != null) {
            // me.update("touchType", data.plugin);
            me.update("touchPosition", data.position);

            if (data.advanced.rounding != null) {
                me.update(data.plugin == 'rect' ? "rounding" : "roundingX", data.advanced.rounding);
            }

        } else {
            // me.update("touchType", "rect");
            me.update("touchPosition", 'right-bottom');

            if (data.advanced.rounding != null) {
                me.update("rounding", data.advanced.rounding);
            }
        }

        if (data.touch.is != null) {
            me.update("touchTextIs", data.touch.is);
        } else {
            me.update("touchTextIs", false);
        }
        if (data.touch.icon != null) {
            me.update("touchIcon", data.touch.icon);
        }
        if (data.touch.text != null) {
            me.update("touchText", data.touch.text);
        }

        if (data.touch.open != null && data.touch.open == 'button') {
            me.update("touchShow", true);
        } else {
            me.update("touchShow", false);
        }

        if (data.advanced.shadowSize != null) {
            shadow.size = data.advanced.shadowSize;
        } else {
            shadow.size = 0;
        }

        if (data.advanced.shadowOpacity != null) {
            shadow.opacity = data.advanced.shadowOpacity;
        } else {
            shadow.opacity = 0;
        }

        me.update("shadow", shadow);


        // TODO - thank you
        if (data.thanks != null && data.thanks.is === true) {
            me.addThankYouModal(data.thanks, thanksColor);
            me.isThankYouModal = true;

            $("body").on('click', '#thankYouModal .close', function (e) {
                e.preventDefault();
                $("#thankYouModal").fadeOut();
                $("#preview_widget").removeClass('overlay');
                closeThankYouInSignupForm();
            });

            $("body").on('click', '#thankYouModal .btn', function (e) {
                e.preventDefault();
                $("#thankYouModal").fadeOut();
                $("#preview_widget").removeClass('overlay');
                doThankYouInSignupForm();
            });
        }

        // event
        $(".plugin-widget-container .close-button").on('click', function (e) {
            e.preventDefault();
            $(".plugin-widget-container").fadeOut();
            $("#preview_widget").removeClass('overlay');
            closeSignupForm();
        });

        // submit
        $(".plugin-widget-container .btn-submit").on('click', function (e) {
            e.preventDefault();
            // TODO - validate
            var isValidated = true;
            $(".plugin-widget-container .form-group-list .form-control").each(function (index, row) {
                if (isValidated && $(row).attr('required')) {
                    if ($(row).val() == '') {
                        alert("Please input \"" + $(this).attr('name') + "\"");
                        isValidated = false;
                    }
                }
            });

            // TODO - other type form validation such as "Join Newsletter"
            if (isValidated) {
                if (me.type == "Join_Newsletter") {
                    $(".plugin-widget-container .form-control").each(function (index, row) {
                        if (isValidated) {
                            if ($(row).val() == '') {
                                alert("Please input \"" + $(this).attr('name') + "\"");
                                isValidated = false;
                            }
                        }
                    });
                }
            }

            if (isValidated) {
                if (confirm("Are you sure?")) {
                    submitSignupForm($(this).closest('form').serializeArray());
                }
            }
        });

        if (data.touch.open == 'button') {
            $(".btnTouch").on('click', function (e) {
                e.preventDefault();
                $(".plugin-widget-container").fadeIn();

                $("#preview_widget").addClass('overlay');
            });
        } else {
            setTimeout(function () {
                $(".plugin-widget-container").fadeIn();
                $("#preview_widget").addClass('overlay');
            }, data.touch.duration * 1000);
        }
    },

    init: function (data, addPowerBy) {
        var me = this;
        var v = this.getPluginType(data[2])
        var plugin = this.getDefaultPlugin(v[0], v[1]);

        me.id = data[0];
        me.isThankYouModal = false;
        me.plugin = v[1];

        var description = data[4].replace(/\n/g, '<br>');
        description = description.replace(/(<br>\s*){2,}/g, '<br>');
        description = description.replace(/(<br\s*\/?>\s*){2,}/g, '<br />');
        var configs = JSON.parse(description);

        console.log("Config------", configs);

        $("#preview_widget").html("");
        if (configs.touch.open == 'button') {
            var button = $(`<button class="btnTouch"><span class="icon"><i class="bi ${configs.touch.icon}"></i></span> <span class="text">${configs.touch.text}</span></button>`);
            $("#preview_widget").append(button);
        }

        $("#preview_widget").append(plugin)
        if (!addPowerBy) {
            $("#preview_widget .logo-area").remove();
        }

        me.updateAll(configs);
    },
};

function submitSignupForm(data) {
    visitorSubmit(SignupLandEmbeddedObject.guid, SignupLandEmbeddedObject.id, data);

    var subject = "";
    var message = "";
    if (SignupLandEmbeddedObject.type == "Contact_Us") {
        subject = "Contact US";
        message = '<h2 style="color: #fff;">You&apos;ve got a new submission.</h2>';

    } else if (SignupLandEmbeddedObject.type == "Join_Newsletter") {
        subject = "Join our Newsletter!";
        message = '<h2 style="color: #fff;">You&apos;ve got a new subscription.</h2>';
    }

    $.each(data, function (index, row) {
        message += `<p style="font-size: 12px; color: #ff6e90;">${row.name}</p>`;
        message += `<p style="font-size: 12px; color: #fff;">${row.value}</p>`;
        message += '<hr>';
    });

    console.log("Form", data);

    sendEmail(SignupLandEmbeddedObject.guid, subject, message, SignupLandEmbeddedObject.id);
    $(".plugin-widget-container").fadeOut();

    if (SignupLandEmbeddedObject.isThankYouModal) {
        $("#thankYouModal").fadeIn();
    } else {
        alert("Form Submitted!");
        $("#preview_widget").removeClass('overlay');
    }
}

function closeSignupForm() {
    console.log("Form closed");
}

function doThankYouInSignupForm() {
    console.log("Thank You Modal Action!");
}

function closeThankYouInSignupForm() {
    console.log("Thank you closed");
}

if (realSite) {
    SignupLandEmbeddedObject.guid = getAppGuid();

    loadCss()
    loadCss('assets/css/bootstrap.min.css', SignupLandEmbeddedObject.guid);
    loadCss('assets/css/bootstrap-icons.min.css', SignupLandEmbeddedObject.guid);
    loadCss('assets/css/signUp.css', SignupLandEmbeddedObject.guid);

    $('body').prepend('<div id="preview_widget"></div>');
    if (widgets[SignupLandEmbeddedObject.guid] != null && widgets[SignupLandEmbeddedObject.guid].length > 0)
        SignupLandEmbeddedObject.init(widgets[SignupLandEmbeddedObject.guid][0], addPoweredBy[SignupLandEmbeddedObject.guid])
}

