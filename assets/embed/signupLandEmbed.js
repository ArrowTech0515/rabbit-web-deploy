var r="",SignupLandEmbeddedObject={o:!1,t:!1,id:0,type:"",i:"",plugin:"",l:0,g:!1,p:0,u:0,m:function(data){var data=data.split("-"),type="",o=parseInt(data[1]);return this.type=data[0],"Contact_Us"==data[0]?type="contact_forms":"Join_Newsletter"==data[0]?type="join_newsletter":"Lead_Generation"==data[0]?type="lead_generation":"Support_Ticket"==data[0]?type="support_ticket":"Leave_Comment"==data[0]?type="leave_comment":"Request_Quote"==data[0]&&(type="request_quote"),[type,o]},v:function(o){return o=o.replace(/^#/,""),{red:parseInt(o.substring(0,2),16),green:parseInt(o.substring(2,4),16),blue:parseInt(o.substring(4,6),16)}},h:function(type,o){var t=this.id;if("contact_forms"==type){if(1==o)return`
                                <div class="col-md-12 plugin-widget-container contact_forms form_1" data-plugin="1" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-8 col-lg-10 col-md-12 form-wrapper for-backgroundColor">
                                            <div class="row">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title editable for-editTitle for-titleTextColor for-titleFont">Contact Us Today!</h1>
                                                    <p class="description editable for-editDescription for-sizeHeightMarginBottom for-bodyTextColor for-secondaryFont">If you have any questions or want to know more about our service, contact us using the contact form below</p>
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

                                                        <div class="actions-area for-sizeHeightMarginBottom">
                                                            <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Submit</button>
                                                        </div>

                                                        <div class="logo-area">
                                                            <img src="/assets/images/signup/logo_dark.svg" class="logo">
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `;if(2==o)return`
                                <div class="col-md-12 plugin-widget-container contact_forms form_2" data-plugin="2" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-8 col-lg-10 col-md-12 form-wrapper for-backgroundColor">
                                            <div class="contact-image"></div>

                                            <!-- Right side form -->
                                            <div class="contact-form">
                                                <span class="close-button">&times;</span>

                                                <h1 class="editable for-editTitle for-titleTextColor for-titleFont">Contact Us Today!</h1>
                                                <p class="editable for-editDescription for-sizeHeightMarginBottom for-bodyTextColor for-secondaryFont">If you have any questions or want to know more about our service, contact us using the contact form below</p>
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

                                                    <div class="actions-area for-sizeHeightMarginBottom">
                                                        <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Submit</button>
                                                    </div>
                                                </form>

                                                <div class="logo-area">
                                                    <img src="/assets/images/signup/logo_light.svg" class="logo">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `;if(3==o)return`
                                <div class="col-md-12 plugin-widget-container has-strokeOpacity contact_forms form_3" data-plugin="3" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-8 col-lg-10 col-md-12 form-wrapper for-controlBorderBottomOnly">
                                            <div class="contact-image">
                                                <h1 class="editable for-editTitle for-titleTextColor for-titleFont">Contact Us</h1>
                                                <h2 class="editable for-editSubTitle for-titleFont">Today!</h2>
                                                <div class="editable-area">
                                                    <div class="editable description for-editDescription for-bodyTextColor for-secondaryFont">
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

                                                <form class="form-container for-sizeHeightMarginTop" style="padding-right: 1rem;" method="post">
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

                                                    <div class="actions-area for-sizeHeightMarginBottom">
                                                        <button type="button" class="btn btn-submit for-fieldFont">Submit</button>
                                                    </div>
                                                </form>

                                                <div class="logo-area">
                                                    <img src="/assets/images/signup/logo_dark.svg" class="logo">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `;if(4==o)return`
                                <div class="col-md-12 plugin-widget-container has-strokeOpacity contact_forms form_4" data-plugin="4" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-8 col-lg-10 col-md-12 form-wrapper for-backgroundColor">
                                            <div class="contact-image for-accentBackgroundColor">
                                                <h1 class="editable for-editTitle for-titleTextColor for-titleFont">Get In<br>Touch!</h1>
                                                <p class="editable description for-editDescription for-bodyTextColor for-secondaryFont">
                                                    company@mail.com<br>
                                                    1-000-111-2222<br>
                                                    82323423 dsfas 23423 3343<br>
                                                    4343-343<br>
                                                </p>
                                            </div>

                                            <!-- Right side form -->
                                            <div class="contact-form">
                                                <span class="close-button">&times;</span>

                                                <form class="form-container for-sizeHeightMarginTop" method="post">
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

                                                    <div class="actions-area for-sizeHeightMarginBottom">
                                                        <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">SENT</button>
                                                    </div>
                                                </form>

                                                <div class="logo-area">
                                                    <img src="/assets/images/signup/logo_dark.svg" class="logo">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `}else if("join_newsletter"==type){if(1==o)return`
                                <div class="col-md-12 plugin-widget-container join_newsletter form_1" data-plugin="1" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper for-backgroundColor">
                                            <div class="row mt-5 mb-3">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <div class="d-flex justify-content-center for-sizeHeightMarginTop">
                                                            <span class="cover-icon">
                                                                <i class="bi bi-envelope-paper-fill"></i>
                                                            </span>
                                                    </div>
                                                    <h1 class="editable for-editTitle title for-titleTextColor for-titleFont">Subscribe Now</h1>
                                                    <p class="editable for-editDescription description for-bodyTextColor for-secondaryFont">Enter your email to receive daily updates.</p>

                                                    <form class="form-container " method="post">
                                                        <div class="form-group-list">
                                                        </div>

                                                        <div class="form-custom-wrapper for-sizeHeightMarginBottom">
                                                            <div class="form-group for-sideSpacingMarginRight">
                                                                <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Email" placeholder="Enter your Email" style="min-width: 250px;">
                                                            </div>

                                                            <div class="actions-area">
                                                                <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">SUBSCRIBE</button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                    <div class="logo-area">
                                                        <img src="/assets/images/signup/logo_dark.svg" class="logo">
                                                    </div>

                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `;if(2==o)return`
                                <div class="col-md-12 plugin-widget-container join_newsletter form_2" data-plugin="2" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper for-backgroundColor for-controlBorderBottomOnly">
                                            <div class="row mt-5 mb-5">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="editable for-editTitle title for-titleTextColor for-titleFont">SUBSCRIBE</h1>
                                                    <p class="editable for-editDescription description for-bodyTextColor for-secondaryFont">Get notified about the next update.</p>

                                                    <form class="form-container for-sizeHeightMarginTop" method="post">
                                                        <div class="form-group-list">
                                                        </div>
                                                        <div class="form-custom-wrapper for-sizeHeightMarginBottom">
                                                            <div class="form-group for-sideSpacingMarginRight">
                                                                <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Email" placeholder="Enter Your Email" style="min-width: 250px;">
                                                            </div>

                                                            <div class="actions-area">
                                                                <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Subscribe</button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                    <div class="logo-area no-margin-bottom">
                                                        <img src="/assets/images/signup/logo_light.svg" class="logo">
                                                    </div>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `;if(3==o)return`
                                <div class="col-md-12 plugin-widget-container join_newsletter form_3" data-plugin="3" data-id="${t}">
                                    <div class="row" >
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper for-controlBorderBottomOnly">
                                            <div class="row mt-4">
                                                <span class="close-button">&times;</span>
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <div class="row p-5">
                                                        <div class="col-6">
                                                            <h1 class="title editable for-editTitle for-titleTextColor for-titleFont for-sizeHeightMarginTop">Join Our Newsletter</h1>
                                                            <p class="description editable for-editDescription for-bodyTextColor for-secondaryFont">Get notified about the next update.</p>

                                                            <form class="form-container" method="post">
                                                                <div class="form-group-list">
                                                                </div>
                                                                <div class="form-custom-wrapper">
                                                                    <div class="form-group for-sideSpacingMarginRight">
                                                                        <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Email" placeholder="Enter Your Email" style="min-width: 250px;">
                                                                    </div>

                                                                    <div class="actions-area">
                                                                        <button type="button" class="btn btn-submit for-fieldFont">JOIN</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div class="col-6"></div>
                                                    </div>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>

                                            <div class="logo-area no-margin-top">
                                                <img src="/assets/images/signup/logo_light.svg" class="logo">
                                            </div>

                                        </div>
                                    </div>
                                </div>
                  `;if(4==o)return`
                                <div class="col-md-12 plugin-widget-container join_newsletter form_4" data-plugin="4" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper for-backgroundColor">
                                            <div class="row mt-5 mb-5">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title editable for-editTitle for-titleTextColor for-titleFont">Keep in Touch</h1>
                                                    <p class="description editable for-editDescription for-bodyTextColor for-secondaryFont">Join us for the finest holiday inspiration along with some exclusive deals - just between us</p>

                                                    <form class="form-container for-sizeHeightMarginTop" method="post">
                                                        <div class="form-group-list">
                                                        </div>
                                                        <div class="form-custom-wrapper for-sizeHeightMarginBottom">
                                                            <div class="form-group for-sideSpacingMarginRight">
                                                                <input class="form-control for-fieldTextColor for-fieldFont" type="text" name="Email" placeholder="Enter Your Email" style="min-width: 250px;">
                                                            </div>

                                                            <div class="actions-area">
                                                                <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Join Us</button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                    <div class="logo-area no-margin-bottom">
                                                        <img src="/assets/images/signup/logo_dark.svg" class="logo">
                                                    </div>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `}else if("lead_generation"==type){if(5==o)return`
                                <div class="col-md-12 plugin-widget-container lead_generation form_5" data-plugin="5" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper for-accentBorderColor for-backgroundColor">
                                            <div class="row mt-5 mb-3">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title editable for-editTitle for-titleTextColor for-titleFont">GET IN <b>TOUCH</b></h1>
                                                    <p class="description editable for-editDescription for-sizeHeightMarginBottom for-bodyTextColor for-secondaryFont">If you have any questions or want to know more about our service, contact us using the contact form below</p>

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

                                                        <div class="actions-area for-sizeHeightMarginBottom">
                                                            <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">SENT</button>
                                                        </div>

                                                        <div class="logo-area">
                                                            <img src="/assets/images/signup/logo_light.svg" class="logo">
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `;if(3==o)return`
                                <div class="col-md-12 plugin-widget-container lead_generation form_3" data-plugin="3" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper for-backgroundColor">
                                            <div class="row mt-10"></div>
                                            <div class="row for-sizeHeightMarginTop for-sizeHeightMarginBottom">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title editable for-editTitle for-titleTextColor for-titleFont for-accentBackgroundColor">Registration</h1>

                                                    <form class="form-container" method="post">
                                                        <div class="form-group-list">
                                                        </div>

                                                        <div class="actions-area">
                                                            <button type="button" class="btn btn-submit for-fieldFont for-titleTextColor for-accentBackgroundColor">Register</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                            <div class="row">
                                                <p class="editable description for-editDescription for-bodyTextColor for-secondaryFont">Lorem ipsum dolor sit amet consectetur. Consequat viverra non diam placerat.</p>

                                                <div class="logo-area">
                                                    <img src="/assets/images/signup/logo_light.svg" class="logo">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `;if(4==o)return`
                                <div class="col-md-12 plugin-widget-container lead_generation form_4" data-plugin="4" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper">
                                            <div class="row mt-10"></div>
                                            <div class="row">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title editable for-editTitle for-titleTextColor for-titleFont mb-10">Book a Call</h1>
                                                    <p class="editable sub-title for-editSubTitle for-bodyTextColor for-secondaryFont for-sizeHeightMarginTop">Please fill out this form:</p>

                                                    <form class="form-container" method="post">
                                                        <div class="form-group-list">
                                                        </div>

                                                        <div class="actions-area for-sizeHeightMarginBottom">
                                                            <button type="button" class="btn btn-submit for-fieldFont">Call Me</button>
                                                        </div>

                                                        <div class="additional mt-4" style="text-align: center;">
                                                            <span class="description for-editDescription for-bodyTextColor for-secondaryFont">No Thanks</span>
                                                        </div>

                                                        <div class="logo-area">
                                                            <img src="/assets/images/signup/logo_dark.svg" class="logo">
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `;if(1==o)return`
                                <div class="col-md-12 plugin-widget-container lead_generation form_1" data-plugin="1" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper">
                                            <div class="row">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <div class="p-5 for-sizeHeightMarginTop for-sizeHeightMarginBottom" style="padding-bottom: 0 !important;">
                                                        <h1 class="title editable for-editTitle for-titleTextColor for-titleFont mb-5">Download Our Application for free</h1>
                                                        <div class="actions-area for-badgeSize">
                                                            <a href="#" class="app-link" target="_blank"><img src="/assets/images/signup/lead_generation/1_app_apple.svg"></a>
                                                            <a href="#" class="google-link" target="_blank"><img src="/assets/images/signup/lead_generation/1_play_market.svg"></a>
                                                        </div>
                                                    </div>

                                                    <div class="logo-area no-margin-top">
                                                        <img src="/assets/images/signup/logo_light.svg" class="logo">
                                                    </div>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `}else if("support_ticket"==type){if(1==o)return`
                                <div class="col-md-12 plugin-widget-container support_ticket form_1 has-rating" data-plugin="1" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper for-backgroundColor">
                                            <div class="row mt-3 mb-3">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title editable for-editTitle for-titleTextColor for-titleFont for-sizeHeightMarginTop">We appreciate your feedback</h1>
                                                    <p class="description editable for-editDescription for-bodyTextColor for-secondaryFont">We are always looking a way to improve your experience. Please take a moment to evaluate and tell us what you think.</p>

                                                    <div class="rating for-accentSvgRateColor for-bodySvgNormalColor">
                                                        <svg class="star" data-value="5" width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.2065 2.89352C21.9402 1.40703 24.0598 1.40703 24.7935 2.89352L29.3404 12.1065C29.923 13.2871 31.0493 14.1054 32.3521 14.2947L42.5192 15.772C44.1597 16.0104 44.8147 18.0264 43.6277 19.1834L36.2707 26.3547C35.3279 27.2737 34.8977 28.5977 35.1203 29.8953L36.857 40.0213C37.1372 41.6551 35.4224 42.9011 33.9551 42.1297L24.8614 37.3488C23.6961 36.7362 22.3039 36.7362 21.1386 37.3488L12.0449 42.1297C10.5776 42.9011 8.86275 41.6551 9.14297 40.0213L10.8797 29.8953C11.1023 28.5977 10.6721 27.2737 9.72934 26.3547L2.37233 19.1834C1.1853 18.0264 1.84032 16.0104 3.48076 15.772L13.6479 14.2947C14.9507 14.1054 16.077 13.2871 16.6596 12.1065L21.2065 2.89352Z" stroke="#A2ABBE" stroke-width="2"/>
                                                        </svg>
                                                        <svg class="star" data-value="4" width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.2065 2.89352C21.9402 1.40703 24.0598 1.40703 24.7935 2.89352L29.3404 12.1065C29.923 13.2871 31.0493 14.1054 32.3521 14.2947L42.5192 15.772C44.1597 16.0104 44.8147 18.0264 43.6277 19.1834L36.2707 26.3547C35.3279 27.2737 34.8977 28.5977 35.1203 29.8953L36.857 40.0213C37.1372 41.6551 35.4224 42.9011 33.9551 42.1297L24.8614 37.3488C23.6961 36.7362 22.3039 36.7362 21.1386 37.3488L12.0449 42.1297C10.5776 42.9011 8.86275 41.6551 9.14297 40.0213L10.8797 29.8953C11.1023 28.5977 10.6721 27.2737 9.72934 26.3547L2.37233 19.1834C1.1853 18.0264 1.84032 16.0104 3.48076 15.772L13.6479 14.2947C14.9507 14.1054 16.077 13.2871 16.6596 12.1065L21.2065 2.89352Z" stroke="#A2ABBE" stroke-width="2"/>
                                                        </svg>
                                                        <svg class="star" data-value="3" width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.2065 2.89352C21.9402 1.40703 24.0598 1.40703 24.7935 2.89352L29.3404 12.1065C29.923 13.2871 31.0493 14.1054 32.3521 14.2947L42.5192 15.772C44.1597 16.0104 44.8147 18.0264 43.6277 19.1834L36.2707 26.3547C35.3279 27.2737 34.8977 28.5977 35.1203 29.8953L36.857 40.0213C37.1372 41.6551 35.4224 42.9011 33.9551 42.1297L24.8614 37.3488C23.6961 36.7362 22.3039 36.7362 21.1386 37.3488L12.0449 42.1297C10.5776 42.9011 8.86275 41.6551 9.14297 40.0213L10.8797 29.8953C11.1023 28.5977 10.6721 27.2737 9.72934 26.3547L2.37233 19.1834C1.1853 18.0264 1.84032 16.0104 3.48076 15.772L13.6479 14.2947C14.9507 14.1054 16.077 13.2871 16.6596 12.1065L21.2065 2.89352Z" stroke="#A2ABBE" stroke-width="2"/>
                                                        </svg>
                                                        <svg class="star" data-value="2" width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.2065 2.89352C21.9402 1.40703 24.0598 1.40703 24.7935 2.89352L29.3404 12.1065C29.923 13.2871 31.0493 14.1054 32.3521 14.2947L42.5192 15.772C44.1597 16.0104 44.8147 18.0264 43.6277 19.1834L36.2707 26.3547C35.3279 27.2737 34.8977 28.5977 35.1203 29.8953L36.857 40.0213C37.1372 41.6551 35.4224 42.9011 33.9551 42.1297L24.8614 37.3488C23.6961 36.7362 22.3039 36.7362 21.1386 37.3488L12.0449 42.1297C10.5776 42.9011 8.86275 41.6551 9.14297 40.0213L10.8797 29.8953C11.1023 28.5977 10.6721 27.2737 9.72934 26.3547L2.37233 19.1834C1.1853 18.0264 1.84032 16.0104 3.48076 15.772L13.6479 14.2947C14.9507 14.1054 16.077 13.2871 16.6596 12.1065L21.2065 2.89352Z" stroke="#A2ABBE" stroke-width="2"/>
                                                        </svg>
                                                        <svg class="star" data-value="1" width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.2065 2.89352C21.9402 1.40703 24.0598 1.40703 24.7935 2.89352L29.3404 12.1065C29.923 13.2871 31.0493 14.1054 32.3521 14.2947L42.5192 15.772C44.1597 16.0104 44.8147 18.0264 43.6277 19.1834L36.2707 26.3547C35.3279 27.2737 34.8977 28.5977 35.1203 29.8953L36.857 40.0213C37.1372 41.6551 35.4224 42.9011 33.9551 42.1297L24.8614 37.3488C23.6961 36.7362 22.3039 36.7362 21.1386 37.3488L12.0449 42.1297C10.5776 42.9011 8.86275 41.6551 9.14297 40.0213L10.8797 29.8953C11.1023 28.5977 10.6721 27.2737 9.72934 26.3547L2.37233 19.1834C1.1853 18.0264 1.84032 16.0104 3.48076 15.772L13.6479 14.2947C14.9507 14.1054 16.077 13.2871 16.6596 12.1065L21.2065 2.89352Z" stroke="#A2ABBE" stroke-width="2"/>
                                                        </svg>
                                                    </div>

                                                    <form class="form-container" method="post">
                                                        <div class="form-group-list">
                                                        </div>

                                                        <div class="actions-area for-sizeHeightMarginBottom">
                                                            <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">Submit My Feedback</button>
                                                        </div>

                                                        <div class="logo-area no-margin-bottom">
                                                            <img src="/assets/images/signup/logo_dark.svg" class="logo">
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `}else if("leave_comment"==type){if(1==o)return`
                                <div class="col-md-12 plugin-widget-container leave_comment form_1 has-rating has-ratingGradient" data-plugin="1" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper">
                                            <div class="row mt-3 mb-3">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title editable for-editTitle for-titleTextColor for-titleFont for-sizeHeightMarginTop">We appreciate your feedback</h1>
                                                    <p class="description editable for-editDescription for-bodyTextColor for-secondaryFont">
                                                        We are always looking a way to improve your experience.<br>
                                                        Please take a moment to evaluate and tell us what you think.
                                                    </p>

                                                    <div class="rating for-bodySvgNormalColor">
                                                        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                                                            <defs>
                                                                <linearGradient id="paint0_linear_178_1781_rating" x1="-4" y1="-3" x2="60.6574" y2="17.6816" gradientUnits="userSpaceOnUse">
                                                                    <stop stop-color="#F7B15D"/>
                                                                    <stop offset="1" stop-color="#FFF17D"/>
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                        <svg class="star" data-value="5" width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.2065 2.89352C21.9402 1.40703 24.0598 1.40703 24.7935 2.89352L29.3404 12.1065C29.923 13.2871 31.0493 14.1054 32.3521 14.2947L42.5192 15.772C44.1597 16.0104 44.8147 18.0264 43.6277 19.1834L36.2707 26.3547C35.3279 27.2737 34.8977 28.5977 35.1203 29.8953L36.857 40.0213C37.1372 41.6551 35.4224 42.9011 33.9551 42.1297L24.8614 37.3488C23.6961 36.7362 22.3039 36.7362 21.1386 37.3488L12.0449 42.1297C10.5776 42.9011 8.86275 41.6551 9.14297 40.0213L10.8797 29.8953C11.1023 28.5977 10.6721 27.2737 9.72934 26.3547L2.37233 19.1834C1.1853 18.0264 1.84032 16.0104 3.48076 15.772L13.6479 14.2947C14.9507 14.1054 16.077 13.2871 16.6596 12.1065L21.2065 2.89352Z" stroke="#A2ABBE" stroke-width="2"/>
                                                        </svg>
                                                        <svg class="star" data-value="4" width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.2065 2.89352C21.9402 1.40703 24.0598 1.40703 24.7935 2.89352L29.3404 12.1065C29.923 13.2871 31.0493 14.1054 32.3521 14.2947L42.5192 15.772C44.1597 16.0104 44.8147 18.0264 43.6277 19.1834L36.2707 26.3547C35.3279 27.2737 34.8977 28.5977 35.1203 29.8953L36.857 40.0213C37.1372 41.6551 35.4224 42.9011 33.9551 42.1297L24.8614 37.3488C23.6961 36.7362 22.3039 36.7362 21.1386 37.3488L12.0449 42.1297C10.5776 42.9011 8.86275 41.6551 9.14297 40.0213L10.8797 29.8953C11.1023 28.5977 10.6721 27.2737 9.72934 26.3547L2.37233 19.1834C1.1853 18.0264 1.84032 16.0104 3.48076 15.772L13.6479 14.2947C14.9507 14.1054 16.077 13.2871 16.6596 12.1065L21.2065 2.89352Z" stroke="#A2ABBE" stroke-width="2"/>
                                                        </svg>
                                                        <svg class="star" data-value="3" width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.2065 2.89352C21.9402 1.40703 24.0598 1.40703 24.7935 2.89352L29.3404 12.1065C29.923 13.2871 31.0493 14.1054 32.3521 14.2947L42.5192 15.772C44.1597 16.0104 44.8147 18.0264 43.6277 19.1834L36.2707 26.3547C35.3279 27.2737 34.8977 28.5977 35.1203 29.8953L36.857 40.0213C37.1372 41.6551 35.4224 42.9011 33.9551 42.1297L24.8614 37.3488C23.6961 36.7362 22.3039 36.7362 21.1386 37.3488L12.0449 42.1297C10.5776 42.9011 8.86275 41.6551 9.14297 40.0213L10.8797 29.8953C11.1023 28.5977 10.6721 27.2737 9.72934 26.3547L2.37233 19.1834C1.1853 18.0264 1.84032 16.0104 3.48076 15.772L13.6479 14.2947C14.9507 14.1054 16.077 13.2871 16.6596 12.1065L21.2065 2.89352Z" stroke="#A2ABBE" stroke-width="2"/>
                                                        </svg>
                                                        <svg class="star" data-value="2" width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.2065 2.89352C21.9402 1.40703 24.0598 1.40703 24.7935 2.89352L29.3404 12.1065C29.923 13.2871 31.0493 14.1054 32.3521 14.2947L42.5192 15.772C44.1597 16.0104 44.8147 18.0264 43.6277 19.1834L36.2707 26.3547C35.3279 27.2737 34.8977 28.5977 35.1203 29.8953L36.857 40.0213C37.1372 41.6551 35.4224 42.9011 33.9551 42.1297L24.8614 37.3488C23.6961 36.7362 22.3039 36.7362 21.1386 37.3488L12.0449 42.1297C10.5776 42.9011 8.86275 41.6551 9.14297 40.0213L10.8797 29.8953C11.1023 28.5977 10.6721 27.2737 9.72934 26.3547L2.37233 19.1834C1.1853 18.0264 1.84032 16.0104 3.48076 15.772L13.6479 14.2947C14.9507 14.1054 16.077 13.2871 16.6596 12.1065L21.2065 2.89352Z" stroke="#A2ABBE" stroke-width="2"/>
                                                        </svg>
                                                        <svg class="star" data-value="1" width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.2065 2.89352C21.9402 1.40703 24.0598 1.40703 24.7935 2.89352L29.3404 12.1065C29.923 13.2871 31.0493 14.1054 32.3521 14.2947L42.5192 15.772C44.1597 16.0104 44.8147 18.0264 43.6277 19.1834L36.2707 26.3547C35.3279 27.2737 34.8977 28.5977 35.1203 29.8953L36.857 40.0213C37.1372 41.6551 35.4224 42.9011 33.9551 42.1297L24.8614 37.3488C23.6961 36.7362 22.3039 36.7362 21.1386 37.3488L12.0449 42.1297C10.5776 42.9011 8.86275 41.6551 9.14297 40.0213L10.8797 29.8953C11.1023 28.5977 10.6721 27.2737 9.72934 26.3547L2.37233 19.1834C1.1853 18.0264 1.84032 16.0104 3.48076 15.772L13.6479 14.2947C14.9507 14.1054 16.077 13.2871 16.6596 12.1065L21.2065 2.89352Z" stroke="#A2ABBE" stroke-width="2"/>
                                                        </svg>
                                                    </div>

                                                    <form class="form-container" method="post">
                                                        <div class="form-group-list">
                                                        </div>

                                                        <div class="actions-area for-sizeHeightMarginBottom">
                                                            <button type="button" class="btn btn-submit for-fieldFont">Submit My Feedback</button>
                                                        </div>

                                                        <div class="logo-area no-margin-bottom">
                                                            <img src="/assets/images/signup/logo_dark.svg" class="logo">
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `}else if("request_quote"==type){if(1==o)return`
                                <div class="col-md-12 plugin-widget-container request_quote form_1 has-coverImage has-controlLabel has-backgroundAlpha" data-plugin="1" data-background-alpha="e5" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-8 col-lg-10 col-md-12 form-wrapper for-controlBorderBottomOnly">
                                            <div class="background for-coverImage for-coverImageBrightness"></div>
                                            <span class="close-button">&times;</span>

                                            <div class="row position-relative for-sizeHeightMarginTop for-sizeHeightMarginBottom p-5">
                                                <div class="col-md-6">
                                                    <h1 class="for-titleFont for-titleTextColor">Get a <span class="for-accentTextColor">Free</span> Quote</h1>
                                                    <p class="editable description for-editDescription for-bodyTextColor for-secondaryFont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis moles tie, dictum est a, mattis tellus.</p>
                                                </div>

                                                <div class="col-md-6">
                                                    <form class="form-container for-backgroundColor" method="post">
                                                        <div class="corner-design for-accentBorderColor"></div>

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
                                                            <button type="button" class="btn btn-submit for-accentBackgroundColor for-fieldFont">Request a Quote</button>
                                                        </div>

                                                        <div class="logo-area no-margin-bottom">
                                                            <img src="/assets/images/signup/logo_dark.svg" class="logo">
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `;if(2==o)return`
                                <div class="col-md-12 plugin-widget-container request_quote form_2 has-coverImage" data-plugin="2" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-8 col-lg-10 col-md-12 form-wrapper">
                                            <div class="background for-coverImage for-coverImageBrightness"></div>

                                            <span class="close-button">&times;</span>

                                            <div class="row position-relative for-sizeHeightMarginTop for-sizeHeightMarginBottom p-5">
                                                <div class="col-md-12">
                                                    <div class="mb-4">
                                                        <h1 class="editable for-editTitle for-titleFont for-titleTextColor">REQUEST A QUOTE</h1>
                                                        <p class="editable for-editDescription description for-bodyTextColor for-secondaryFont">Please fill out the form below to schedule an appointment with our specialists:</p>
                                                    </div>

                                                    <form class="form-container for-backgroundColor" method="post">
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
                                                            <button type="button" class="btn btn-submit for-accentBackgroundColor for-fieldFont">Request A Quote</button>
                                                        </div>

                                                        <div class="logo-area no-margin-bottom">
                                                            <img src="/assets/images/signup/logo_light.svg" class="logo">
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `;if(3==o)return`
                                <div class="col-md-12 plugin-widget-container request_quote form_3 has-coverImage" data-plugin="3" data-id="${t}">
                                    <div class="row">
                                        <div class="col-xl-8 col-lg-10 col-md-12 form-wrapper">
                                            <div class="background for-coverImage for-coverImageBrightness"></div>
                                            <span class="close-button">&times;</span>

                                            <div class="row position-relative for-sizeHeightMarginTop for-sizeHeightMarginBottom p-5">
                                                <div class="col-md-6">
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="mb-4">
                                                        <h1 class="editable for-editTitle for-titleFont for-titleTextColor">Book an Appointment</h1>
                                                        <p class="editable description for-editDescription for-bodyTextColor for-secondaryFont">Please fill out the form below to schedule an appointment with our specialists:</p>
                                                    </div>


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
                                                            <button type="button" class="btn btn-submit for-accentBackgroundColor for-fieldFont">Book Appointment</button>
                                                        </div>

                                                        <div class="logo-area no-margin-bottom">
                                                            <img src="/assets/images/signup/logo_light.svg" class="logo">
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `}return`<div class="col-md-12 plugin-widget-container" data-id="${t}">`},C:function(o,color,t){var i=this,background="#F5576C",background="contact_forms"==i.i&&3==i.widgetID?"#C493F3":"lead_generation"==i.i&&1==i.widgetID?"#F5576C":"lead_generation"==i.i&&4==i.widgetID?"#F1EA7C":"join_newsletter"==i.i&&3==i.widgetID?"#f6d365":"leave_comment"==i.i&&1==i.widgetID?"#0C41D2":t,t=`
                    <div class="modal thankYouModal" id="thankYouModal${i.id}" tabindex="-1" aria-labelledby="thankYouModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header border-0" style="justify-content: end;">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="border:none; outline: none; background: transparent;">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body text-center">
                                    <div class="d-block" style="text-align: center;">
                                        <i class="cover-icon" style="color: ${background}"></i>
                                    </div>
                                    <h5 class="modal-title mb-3" style="display: ${o.title.is?"block":"none"};">${o.title.text}</h5>
                                    <p class="mb-1" style="display: ${o.text.is?"block":"none"};">${o.text.text}</p>
                                </div>
                                <div class="modal-footer">
                                    <a href="#" class="btn" style="display: ${o.button.is?"block":"none"}; color: ${color.button}; background: ${background};" >${o.button.text}</a>
                                </div>
                            </div>
                        </div>
                    </div>
        `;$("body").append(t)},update:function(o,value){var t,i=this;"backgroundColor"==o?$(".plugin-widget-container[data-id="+i.id+"]").hasClass("has-backgroundAlpha")?(t=$(".plugin-widget-container[data-id="+i.id+"].has-backgroundAlpha").data("background-alpha"),$(".plugin-widget-container[data-id="+i.id+"] .for-backgroundColor").css("backgroundColor",value+t)):$(".plugin-widget-container[data-id="+i.id+"] .for-backgroundColor").css("backgroundColor",value):"titleTextColor"==o?$(".plugin-widget-container[data-id="+i.id+"] .for-titleTextColor").css("color",value):"bodyTextColor"==o?($(".plugin-widget-container[data-id="+i.id+"] .for-bodyTextColor").css("color",value),$(".plugin-widget-container[data-id="+i.id+"] .for-bodySvgNormalColor svg>path").attr("stroke",value)):"fieldTextColor"==o?("contact_forms"==this.i&&4==this.plugin?$(".plugin-widget-container[data-id="+i.id+"] .for-fieldTextColor").css("color",value+"b2"):$(".plugin-widget-container[data-id="+i.id+"] .for-fieldTextColor").css("color",value),t="placeholder-style-"+i.id,0===$("#"+t).length?("contact_forms"==this.i&&4==this.plugin?$('<style id="'+t+'">.plugin-widget-container[data-id='+i.id+"] .form-group:has(select.form-control)::after{ color: "+value+"b2; } .plugin-widget-container[data-id="+i.id+"] .for-fieldTextColor::placeholder { color: "+value+"b2; }</style>"):$('<style id="'+t+'">.plugin-widget-container[data-id='+i.id+"] .form-group:has(select.form-control)::after{ color: "+value+"; } .plugin-widget-container[data-id="+i.id+"] .for-fieldTextColor::placeholder { color: "+value+"; }</style>")).appendTo("head"):"contact_forms"==this.i&&4==this.plugin?$("#"+t).html(".plugin-widget-container[data-id="+i.id+"] .form-group:has(select.form-control)::after{ color: "+value+"b2; } .plugin-widget-container[data-id="+i.id+"] .for-fieldTextColor::placeholder { color: "+value+"b2; }"):$("#"+t).html(".plugin-widget-container[data-id="+i.id+"] .form-group:has(select.form-control)::after{ color: "+value+"; } .plugin-widget-container[data-id="+i.id+"] .for-fieldTextColor::placeholder { color: "+value+"; }")):"accentColor"==o?($(".plugin-widget-container[data-id="+i.id+"] .for-accentBackgroundColor").css("backgroundColor",value),$(".plugin-widget-container[data-id="+i.id+"] .for-accentTextColor").css("color",value),$(".plugin-widget-container[data-id="+i.id+"] .for-accentBorderColor").css("borderColor",value),$(".plugin-widget-container[data-id="+i.id+"] .for-accentBorderColor").css("borderColor",value),$(".plugin-widget-container[data-id="+i.id+"] .for-accentSvgRateColor svg.active").css("fill",value)):"titleFont"==o?$(".plugin-widget-container[data-id="+i.id+"] .for-titleFont").css("fontFamily",value):"secondaryFont"==o?($(".plugin-widget-container[data-id="+i.id+"] .for-secondaryFont").css("fontFamily",value),$(".plugin-widget-container[data-id="+i.id+"] .for-fieldFont").css("fontFamily",value)):"fieldFont"!=o&&("iconBackgroundColor"==o?$(".btnTouch[data-id="+i.id+"]").css("backgroundColor",value):"iconForeColor"==o?$(".btnTouch[data-id="+i.id+"]>.icon").css("color",value):"textColor"==o?$(".btnTouch[data-id="+i.id+"]>.text").css("color",value):"touchText"==o?$(".btnTouch[data-id="+i.id+"]>.text").html(value):"touchFont"==o?$(".btnTouch[data-id="+i.id+"]>.text").css("fontFamily",value):"touchIcon"==o?$(".btnTouch[data-id="+i.id+"]>.icon").html("<i class='type-"+this.i+" bi bi-svg "+value+"'></i>"):"touchType"!=o&&("touchPosition"==o?"left-top"==value?$(".btnTouch[data-id="+i.id+"]").css("right","auto").css("bottom","auto").css("top",this.p+"px").css("left",this.u+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"right-top"==value?$(".btnTouch[data-id="+i.id+"]").css("left","auto").css("bottom","auto").css("top",this.p+"px").css("right",this.u+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"left-bottom"==value?$(".btnTouch[data-id="+i.id+"]").css("top","auto").css("right","auto").css("left",this.u+"px").css("bottom",this.p+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"right-bottom"==value?$(".btnTouch[data-id="+i.id+"]").css("top","auto").css("left","auto").css("right",this.u+"px").css("bottom",this.p+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"left-middle"==value?$(".btnTouch[data-id="+i.id+"]").css("right","auto").css("bottom","auto").css("top","50%").css("left",this.u+"px").css("transform","rotate(90deg) translateX(-50%) translateY(-100%)").css("transformOrigin","left top"):"right-middle"==value&&$(".btnTouch[data-id="+i.id+"]").css("left","auto").css("bottom","auto").css("top","50%").css("right",this.u+"px").css("transform","rotate(-90deg) translateX(50%) translateY(-100%)").css("transformOrigin","right top"):"touchShow"==o?value?$(".btnTouch[data-id="+i.id+"]").show():$(".btnTouch[data-id="+i.id+"]").hide():"touchTextIs"==o?value?$(".btnTouch[data-id="+i.id+"] span.text").show():$(".btnTouch[data-id="+i.id+"] span.text").hide():"touchIconIs"==o?value?$(".btnTouch[data-id="+i.id+"] span.icon").show():$(".btnTouch[data-id="+i.id+"] span.icon").hide():"pluginSize"==o?($(".btnTouch[data-id="+i.id+"]>.icon").css("fontSize",value+"px"),$(".btnTouch[data-id="+i.id+"]").css("fontSize",parseInt(70*parseInt(value)/100)+"px")):"bottomSpacing"!=o&&"sideSpacing"!=o&&("rounding"==o?$(".btnTouch[data-id="+i.id+"]").css("borderRadius",value+(this.g?"px":"%")):"roundingX"!=o&&("sizeWidth"==o?$(".plugin-widget-container[data-id="+i.id+"] .form-wrapper").css("width",value+"%"):"sizeHeight"==o?($(".plugin-widget-container[data-id="+i.id+"] .for-sizeHeightMarginBottom").css("marginBottom",value+"rem"),$(".plugin-widget-container[data-id="+i.id+"] .for-sizeHeightMarginTop").css("marginTop",value+"rem")):"shadow"==o?(t=this.v(value.color),$(".plugin-widget-container[data-id="+i.id+"] .form-wrapper").css("boxShadow",value.size+"px "+value.size+"px "+2*parseInt(value.size)+"px rgba("+t.red+", "+t.green+", "+t.blue+", "+parseInt(value.opacity)/100+")")):"coverImage"==o?$(".plugin-widget-container[data-id="+i.id+"] .for-coverImage").css("background","url('"+value+"') center/cover no-repeat"):"brightness"==o?$(".plugin-widget-container[data-id="+i.id+"] .for-coverImageBrightness").css("opacity",value/100):"border"==o?value.is?(t=value.size+"px solid "+value.color,$(".plugin-widget-container[data-id="+i.id+"]").hasClass("has-strokeOpacity")&&(t+="10"),$(".plugin-widget-container[data-id="+i.id+"] .form-wrapper").hasClass("for-controlBorderBottomOnly")?$(".plugin-widget-container[data-id="+i.id+"] .form-control").css("borderBottom",t):$(".plugin-widget-container[data-id="+i.id+"] .form-control").css("border",t)):$(".plugin-widget-container[data-id="+i.id+"] .form-control").css("border","none"):"controlSize"==o&&($(".plugin-widget-container[data-id="+i.id+"] .for-badgeSize").removeClass("small").removeClass("medium").removeClass("large"),$(".plugin-widget-container[data-id="+i.id+"] .for-badgeSize").addClass(value),"small"==value?($(".plugin-widget-container[data-id="+i.id+"] input.form-control").css("height","40px"),$(".plugin-widget-container[data-id="+i.id+"] select.form-control").css("height","40px"),$(".plugin-widget-container[data-id="+i.id+"] textarea.form-control").css("height","80px"),$(".plugin-widget-container[data-id="+i.id+"] .form-control").css("padding","8px 20px"),$(".plugin-widget-container[data-id="+i.id+"] .btn-submit").css("height","40px")):"medium"==value?($(".plugin-widget-container[data-id="+i.id+"] input.form-control").css("height","60px"),$(".plugin-widget-container[data-id="+i.id+"] select.form-control").css("height","60px"),$(".plugin-widget-container[data-id="+i.id+"] textarea.form-control").css("height","120px"),$(".plugin-widget-container[data-id="+i.id+"] .form-control").css("padding","12px 25px"),$(".plugin-widget-container[data-id="+i.id+"] .btn-submit").css("height","60px")):"large"==value&&($(".plugin-widget-container[data-id="+i.id+"] input.form-control").css("height","80px"),$(".plugin-widget-container[data-id="+i.id+"] select.form-control").css("height","80px"),$(".plugin-widget-container[data-id="+i.id+"] textarea.form-control").css("height","160px"),$(".plugin-widget-container[data-id="+i.id+"] .form-control").css("padding","16px 30px"),$(".plugin-widget-container[data-id="+i.id+"] .btn-submit").css("height","80px")))))))},T:function(data){var description,t=this,i={title:"#000",text:"#000",button:"#000"},e={size:0,opacity:0,color:"#000000"},a={is:!1,size:0,color:"#000000"},r="#F5576C",s="",l=($(".plugin-widget-container[data-id="+t.id+"] .form-group-list").html(""),$(".plugin-widget-container[data-id="+t.id+"]").hasClass("has-controlLabel"));$.each(data.fields,function(index,o){var type=o.type,name=o.name,required=(""==name&&(name="Field "+parseInt(99999*Math.random())),o.required),hidden=o.hidden;s+='<div class="form-group '+(!hidden&&required?"required":"")+'">',hidden?s+='<input class="form-control for-fieldTextColor for-fieldFont" type="hidden" name="'+name+'" placeholder="'+name+'">':(l&&(s+='<label class="control-label for-bodyTextColor for-secondaryFont">'+("selection"==type?"":"Enter ")+name+" ...</label>"),"short-text"==type?s+='<input class="form-control for-fieldTextColor for-fieldFont '+(required?"required":"")+'" '+(required?"required":"")+' type="text" name="'+name+'" placeholder="'+name+'">':"long-text"==type?s+='<textarea class="form-control for-fieldTextColor for-fieldFont '+(required?"required":"")+'" '+(required?"required":"")+' name="'+name+'" placeholder="'+name+'"></textarea>':"selection"==type&&(type=null!=(hidden=o.fields)&&""!=hidden?hidden.split(","):[],s=s+'<select class="form-control for-fieldTextColor for-fieldFont" '+(required?"required":"")+' name="'+name+'"><option value="">'+name+"</option>",$.each(type,function(o,t){""!=t&&(s+='<option value="'+t+'">'+t+"</option>")}),s+="</select>")),s+="</div>"}),$(".plugin-widget-container[data-id="+t.id+"] .form-group-list").html(s),null!=data.title&&""!=data.title&&(description=(description=(description=data.title.replace(/\n/g,"<br>")).replace(/(<br>\s*){2,}/g,"<br>")).replace(/(<br\s*\/?>\s*){2,}/g,"<br />"),$(".plugin-widget-container[data-id="+t.id+"] .for-editTitle").html(description)),null!=data.subTitle&&""!=data.subTitle&&(description=(description=(description=data.subTitle.replace(/\n/g,"<br>")).replace(/(<br>\s*){2,}/g,"<br>")).replace(/(<br\s*\/?>\s*){2,}/g,"<br />"),$(".plugin-widget-container[data-id="+t.id+"] .for-editSubTitle").html(description)),null!=data.description&&""!=data.description&&(description=(description=(description=data.description.replace(/\n/g,"<br>")).replace(/(<br>\s*){2,}/g,"<br>")).replace(/(<br\s*\/?>\s*){2,}/g,"<br />"),$(".plugin-widget-container[data-id="+t.id+"] .for-editDescription").html(description)),$.each(data.colors,function(index,o){"shadowColor"==o.name?e.color=o.value:"thicknessColor"==o.name?a.color=o.value:"thanksTitleColor"==o.name?i.title=o.value:"thanksTextColor"==o.name?i.text=o.value:"thanksButtonColor"==o.name?i.button=o.value:"accentColor"==o.name&&(r=o.value),t.update(o.name,o.value)}),$.each(data.fonts,function(index,o){t.update(o.name,o.value)}),null!=data.advanced.plugin&&t.update("pluginSize",data.advanced.plugin),null!=data.advanced.bottomSpacing&&(t.p=data.advanced.bottomSpacing),null!=data.advanced.sideSpacing&&(t.u=data.advanced.sideSpacing),null!=data.advanced.stroke?a.is=data.advanced.stroke:a.is=!1,null!=data.advanced.thickness?a.size=data.advanced.thickness:a.size=0,t.update("border",a),t.g=!(null==data.touch||null==data.touch.is||!data.touch.is),null!=data.position?t.update("touchPosition",data.position):t.update("touchPosition","right-bottom"),null!=data.advanced.rounding?t.update("rounding",data.advanced.rounding):t.update("rounding",0),null!=data.touch.icon&&t.update("touchIcon",data.touch.icon),null!=data.touch.text&&t.update("touchText",data.touch.text),null!=data.touch.is?t.update("touchTextIs",data.touch.is):t.update("touchTextIs",!1),null!=data.touch.show?t.update("touchIconIs",data.touch.show):t.update("touchIconIs",!0),null!=data.touch.open&&"button"==data.touch.open?t.update("touchShow",!0):t.update("touchShow",!1),null!=data.advanced.shadowSize?e.size=data.advanced.shadowSize:e.size=0,null!=data.advanced.shadowOpacity?e.opacity=data.advanced.shadowOpacity:e.opacity=0,t.update("shadow",e),null!=data.advanced.width?t.update("sizeWidth",data.advanced.width):t.update("sizeWidth",90),null!=data.advanced.height?t.update("sizeHeight",data.advanced.height):t.update("sizeHeight",1),null!=data.advanced.size?t.update("controlSize",data.advanced.size):t.update("controlSize","small"),null!=data.cover?(t.update("coverImage",data.cover.image),t.update("brightness",data.cover.brightness)):t.update("brightness",100),null!=data.thanks&&!0===data.thanks.is&&(t.C(data.thanks,i,r),t.o=!0,$("body").on("click","#thankYouModal"+t.id+" .close",function(o){o.preventDefault(),$("#thankYouModal"+t.id).fadeOut(),$("#preview_widget").removeClass("overlay"),t.t&&$(".btnTouch").fadeIn(),closeThankYouInSignupForm()}),$("body").on("click","#thankYouModal"+t.id+" .btn",function(o){o.preventDefault(),$("#thankYouModal"+t.id).fadeOut(),$("#preview_widget").removeClass("overlay"),t.t&&$(".btnTouch").fadeIn(),doThankYouInSignupForm()})),$(".plugin-widget-container[data-id="+t.id+"].has-rating .star").on("click",function(){t.l=parseInt($(this).data("value")),$(this).parent().find(".star").removeClass("active"),$(this).addClass("active"),$(this).nextAll().addClass("active"),$(this).parent().find(".star.active>path").attr("stroke-width","0"),$(this).parent().find(".star:not(.active)>path").attr("stroke-width","2")}),null!=data.linksIn&&""!=data.linksIn&&$(".plugin-widget-container[data-id="+t.id+"] .app-link").attr("href",data.linksIn),null!=data.linksOut&&""!=data.linksOut&&$(".plugin-widget-container[data-id="+t.id+"] .google-link").attr("href",data.linksOut),$(".plugin-widget-container[data-id="+t.id+"] .close-button").on("click",function(o){o.preventDefault(),$(".plugin-widget-container[data-id="+t.id+"]").fadeOut(),$("#preview_widget").removeClass("overlay"),t.t&&$(".btnTouch").fadeIn(),closeSignupForm()}),$(".plugin-widget-container[data-id="+t.id+"] .btn-submit").on("click",function(o){o.preventDefault();var i=!0;$(".plugin-widget-container[data-id="+t.id+"] .form-group-list .form-control").each(function(index,o){var t;i&&$(o).attr("required")&&(t=$(o).prop("tagName").toLowerCase(),""==$(o).val())&&("select"==t?alert('Please select "'+$(this).attr("name")+'"'):alert('Please input "'+$(this).attr("name")+'"'),i=!1),i&&-1<$(o).attr("name").toLowerCase().indexOf("mail")&&(t=$(o).val(),/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)||(alert('Please input valid "'+$(this).attr("name")+'"'),i=!1)),i&&-1<$(o).attr("name").toLowerCase().indexOf("phone")&&(t=$(o).val(),/^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/.test(t)||(alert('Please input valid "'+$(this).attr("name")+'"'),i=!1))}),i&&"Join_Newsletter"==t.type&&$(".plugin-widget-container[data-id="+t.id+"] .form-control").each(function(index,o){i&&""==$(o).val()&&(alert('Please input "'+$(this).attr("name")+'"'),i=!1)}),i&&((o=$(this).closest("form").serializeArray()).push({name:"form",value:t.type+"-"+t.plugin}),$(".plugin-widget-container[data-id="+t.id+"]").hasClass("has-rating")&&o.push({name:"Rating",value:t.l}),t.submit(o),submitSignupForm(t.id,o,t.o,t.t))}),"button"==data.touch.open?$(".btnTouch[data-id="+t.id+"]").on("click",function(o){o.preventDefault(),$(".plugin-widget-container[data-id="+t.id+"]").fadeIn(),$("#preview_widget").addClass("overlay"),t.t&&$(".btnTouch").fadeOut(),setTimeout(function(){t.k()},100),t._()}):setTimeout(function(){$(".plugin-widget-container[data-id="+t.id+"]").fadeIn(),$("#preview_widget").addClass("overlay"),setTimeout(function(){t.k()},100),t._()},1e3*data.touch.duration)},k:function(){var o=parseInt($(".plugin-widget-container[data-id="+this.id+"]").css("height").replace("px",""));parseInt($("body").css("height").replace("px",""))<o&&($("#preview_widget").css("overflowY","auto"),$("body>#preview_widget>.plugin-widget-container[data-id="+this.id+"]").css("transform","translateX(-50%)"))},_:function(){var o=this;setTimeout(function(){visitorClick(r,o.id)},300)},submit:function(data){var o=this,t="",i="",e="text-align: center; padding: 1rem 1rem; margin: 0; color: #F5576C;font-family: sans-serif; font-size: 30px; font-weight: 800; line-height: 30px; text-align: center;",a="border: 0; height: 0px; border-bottom: 1px solid #E1E4E8;margin-top: 4px; margin-bottom: 4px;",i=(i=(i+=`<div style="display: block; text-align: center; margin-bottom: 1rem;">
                            <img style="margin: auto;" src="https://${isTestingMode()?"rabbit-web-deploy.onrender.com":"dlnil54eooeso.cloudfront.net"}/assets/images/signup/email/logo.png" style="height: 22px;"/>
                        </div>`)+`<div style="display: block; text-align: center; margin-bottom: 0.5rem;">
                            <img src="https://${isTestingMode()?"rabbit-web-deploy.onrender.com":"dlnil54eooeso.cloudfront.net"}/assets/images/signup/email/hello.png" style="width: 22px; height: 22px;"/>
                            <span style="vertical-align: top; margin-left: 4px; font-family: sans-serif; font-size: 16px; font-weight: 400; letter-spacing: 0.02em; text-align: left; ">Hello! <b></b></span>
                        </div>`,"Contact_Us"==o.type?(t="Contact US",i+=`<h2 style="${e}">You&apos;ve got a new submission.</h2>`):"Join_Newsletter"==o.type?(t="Join our Newsletter",i+=`<h2 style="${e}">You&apos;ve got a new subscription.</h2>`):"Lead_Generation"==o.type?(t="Lead Generation",i+=`<h2 style="${e}">You&apos;ve got a new lead generation.</h2>`):"Request_Quote"==o.type?(t="Request a Quote",i+=`<h2 style="${e}">You&apos;ve got a new quote.</h2>`):"Leave_Comment"==o.type?(t="Leave a Comment",i+=`<h2 style="${e}">You&apos;ve got a new comment.</h2>`):"Support_Ticket"==o.type&&(t="Support Ticket",i+=`<h2 style="${e}">You&apos;ve got a new ticket.</h2>`),i=(i+=`<hr style="${a}" />`)+`<div style="display: block; padding: 0rem 2rem; margin-bottom: 1rem;">
                        <h3 style="text-align: center; color: #2D324A; font-family: sans-serif; font-weight: 700; line-height: 18px; letter-spacing: 0.02em;">${o.type.replace("_"," ")}</h3>
                    `,$.each(data,function(index,o){"form"!=o.name&&(i=(i+=`<p style="font-size: 12px; font-family: sans-serif; font-weight: 700; line-height: 12px; letter-spacing: 0.005em; color: #F5576C;">${o.name}:</p>`)+`<p style="font-size: 12px; font-family: sans-serif; font-weight: 700; line-height: 12px; letter-spacing: 0.005em; color: #2D324A;">${o.value}</p>`,index<data.length-2)&&(i+=`<hr style="${a}" />`)}),(i=(i=(i=(i=i+"</div>"+'<hr style="color: #E1E4E8; margin-top: 4px; margin-bottom: 4px;" />')+`<div style="display:block; text-align: center; margin-top: 1rem; margin-bottom: 2rem;">
                        <a href="https://facebook.com/" target="_blank"><img src="https://${isTestingMode()?"rabbit-web-deploy.onrender.com":"dlnil54eooeso.cloudfront.net"}/assets/images/signup/email/figma.png" style="width: 16px;"></a>
                        <a href="https://twitter.com/" target="_blank"><img src="https://${isTestingMode()?"rabbit-web-deploy.onrender.com":"dlnil54eooeso.cloudfront.net"}/assets/images/signup/email/twitter.png" style="width: 16px;"></a>
                        <a href="https://plus.google.com/" target="_blank"><img src="https://${isTestingMode()?"rabbit-web-deploy.onrender.com":"dlnil54eooeso.cloudfront.net"}/assets/images/signup/email/google.png" style="width: 16px;"></a>
                    </div>`)+'<h6 style="font-family: sans-serif; font-size: 8px; color: #8e91a5; font-weight: 700; line-height: 12px; letter-spacing: 0.02em; text-align: center;">Change your email preferences in Signup.land</h6>'+'<div style="display:block; text-align: center; margin-bottom: 2rem;">\n                        <a href="https://www.signup.land/${appUrl}emailClickGuest?userId=${user.id?c}&name=${template}&url=${appUrl}activationLoginGuest?activationCode=${user.activationCode}&source=${template}${appDomain}&userId=${user.id?c}" target="_blank" style="font-family: sans-serif; font-size: 8px; font-weight: 700; line-height: 12px; text-align: left; background: #F5576C; color: #fff; border-radius: 55px; border: none; text-decoration: none; outline: none; box-shadow: none; padding: 10px 20px;">Go to Signup.land</a>\n                    </div>')+'<h6 style="font-family: sans-serif; font-size: 8px; color: #8e91a5; font-weight: 700; line-height: 12px; letter-spacing: 0.02em; text-align: center; margin: 4px 0;">Have a Questions?</h6>'+'<h6 style="font-family: sans-serif; font-size: 8px; color: #8e91a5; font-weight: 400; line-height: 12px; letter-spacing: 0.02em; text-align: center; margin: 4px 0;">We are always happy to help! Contact our support team at</h6>')+`<div style="display:block; text-align: center; margin-bottom: 1rem;">
                        <a href="mailto:support@signupland.com?subject=I have a Question." style="font-family: sans-serif; font-size: 8px; font-weight: 700; line-height: 12px; letter-spacing: 0.02em; text-align: center; text-decoration: underline; box-shadow: none; border: none;">support@signupland.com</a>
                    </div>`+'<h6 style="font-family: sans-serif; font-size: 8px; color: #8e91a5; font-weight: 400; line-height: 12px; letter-spacing: 0.02em; text-align: center;">&copy;2024 <b>Signup.land</b>, All rights reserved</h6>');console.log("Form",data),visitorSubmit(r,o.id,data),sendEmail(r,t,i,o.id)},init:function(data,o){var button,t=this,i=this.m(data[2]),i=(t.id=data[0],t.o=!1,t.i=i[0],t.plugin=i[1],this.h(i[0],i[1])),data=data[4].replace(/\n/g,"<br>"),data=(data=(data=data.replace(/(<br>\s*){2,}/g,"<br>")).replace(/(<br\s*\/?>\s*){2,}/g,"<br />"),JSON.parse(data));console.log("Config------",t.i,t.plugin,data),"button"==data.touch.open&&(this.t=!0,button=$(`<button class="btnTouch" data-id="${t.id}"><span class="icon"><i class="type-${t.i} bi bi-svg ${data.touch.icon}"></i></span> <span class="text">${data.touch.text}</span></button>`),$("#preview_widget").append(button)),$("#preview_widget").append(i),o||$("#preview_widget .logo-area").remove(),t.T(data)}};function submitSignupForm(o,data,t,i){$(".plugin-widget-container[data-id="+o+"]").fadeOut(),t?$("#thankYouModal"+o).fadeIn():(alert("Form Submitted!"),$("#preview_widget").removeClass("overlay"),i&&$(".btnTouch").fadeIn())}function closeSignupForm(){console.log("Form closed")}function doThankYouInSignupForm(){console.log("Thank You!")}function closeThankYouInSignupForm(){console.log("Thank you closed")}function i(obj){if("object"!=typeof obj||null===obj)return obj;var o,t=Array.isArray(obj)?[]:{};for(o in obj)obj.hasOwnProperty(o)&&(t[o]=i(obj[o]));return t}if(realSite&&(r=getAppGuid(),loadCss("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",r),loadCss("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",r),loadCss("assets/css/bootstrap.min.css",r),loadCss("assets/css/bootstrap-icons.min.css",r),loadCss("assets/css/signUp.css",r),$("body").prepend('<div id="preview_widget"></div>'),null!=widgets[r])&&0<widgets[r].length)for(var o=0;o<widgets[r].length;o++){var obj=i(SignupLandEmbeddedObject);obj.init(widgets[r][o],addPoweredBy[r])}