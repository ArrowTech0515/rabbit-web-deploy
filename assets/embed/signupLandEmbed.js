var l={o:"",t:!1,id:0,type:"",plugin:"",l:function(data){var data=data.split("-"),type="",o=parseInt(data[1]);return this.type=data[0],"Contact_Us"==data[0]?type="contact_forms":"Join_Newsletter"==data[0]&&(type="join_newsletter"),[type,o]},i:function(type,o){if("contact_forms"==type){if(1==o)return`
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
                  `;if(2==o)return`
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
                  `;if(3==o)return`
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
                  `;if(4==o)return`
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
                  `;if(5==o)return`
                                <div class="col-md-12 plugin-widget-container contact_forms form_5" data-plugin="5">
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
                  `}else if("join_newsletter"==type){if(1==o)return`
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
                  `;if(2==o)return`
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
                  `;if(3==o)return`
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
                  `;if(4==o)return`
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
                  `}return'<div class="col-md-12 plugin-widget-container">'},u:function(o,color){color=`
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
                                    <h5 class="modal-title mb-3" style="display: ${o.title.is?"block":"none"}; color: ${color.title};">${o.title.text}</h5>
                                    <p class="mb-1" style="display: ${o.text.is?"block":"none"}; color: ${color.text};">${o.text.text}</p>
                                </div>
                                <div class="modal-footer">
                                    <a href="#" class="btn" style="display: ${o.button.is?"block":"none"}; color: ${color.button};" >${o.button.text}</a>
                                </div>
                            </div>
                        </div>
                    </div>
        `;$("body").append(color)},update:function(o,value){"backgroundColor"==o?$(".plugin-widget-container .for-backgroundColor").css("backgroundColor",value):"titleTextColor"==o?$(".plugin-widget-container .for-titleTextColor").css("color",value):"bodyTextColor"==o?$(".plugin-widget-container .for-bodyTextColor").css("color",value):"fieldTextColor"==o?$(".plugin-widget-container .for-fieldTextColor").css("color",value):"accentColor"==o?($(".plugin-widget-container .for-accentBackgroundColor").css("backgroundColor",value),$(".plugin-widget-container .for-accentTextColor").css("color",value),$(".plugin-widget-container .for-accentBorderColor").css("borderColor",value)):"titleFont"==o?$(".plugin-widget-container .for-titleFont").css("fontFamily",value):"secondaryFont"==o?$(".plugin-widget-container .for-secondaryFont").css("fontFamily",value):"fieldFont"==o?$(".plugin-widget-container .for-fieldFont").css("fontFamily",value):"iconBackgroundColor"==o?$(".btnTouch").css("backgroundColor",value):"iconForeColor"==o?$(".btnTouch>.icon").css("color",value):"textColor"==o?$(".btnTouch>.text").css("color",value):"touchText"==o?$(".btnTouch>.text").html(value):"touchFont"==o?$(".btnTouch>.text").css("fontFamily",value):"touchIcon"==o?$(".btnTouch>.icon").html("<i class='bi "+value+"'></i>"):"touchType"==o?"rect"==value?$(".btnTouch").css("borderRadius","32px"):"circle"==value&&$(".btnTouch").css("borderRadius","50%"):"touchPosition"==o?"left-top"==value?$(".btnTouch").css("right","auto").css("bottom","auto").css("top","10px").css("left","24px"):"right-top"==value?$(".btnTouch").css("left","auto").css("bottom","auto").css("top","10px").css("right","40px"):"left-bottom"==value?$(".btnTouch").css("top","auto").css("right","auto").css("left","24px").css("bottom","10px"):"right-bottom"==value?$(".btnTouch").css("top","auto").css("left","auto").css("right","40px").css("bottom","10px"):"left-middle"==value?$(".btnTouch").css("right","auto").css("bottom","auto").css("top","50%").css("left","24px"):"right-middle"==value&&$(".btnTouch").css("left","auto").css("bottom","auto").css("top","50%").css("right","40px"):"touchShow"==o?value?$(".btnTouch").show():$(".btnTouch").hide():"pluginSize"==o?($(".plugin-widget-container .form-group>input").css("height",value+"px"),$(".plugin-widget-container .form-group>textarea").css("height",2*value+"px"),$(".plugin-widget-container .actions-area button").css("height",value+"px")):"bottomSpacing"==o?$(".plugin-widget-container .form-group").css("marginBottom",value+"px"):"sideSpacing"==o?($(".plugin-widget-container .for-sideSpacingMarginRight").css("marginRight",value+"px"),$(".plugin-widget-container .form-group-list").css("marginBottom",value+"px")):"rounding"==o&&($(".plugin-widget-container .form-group>input").css("borderRadius",value+"px"),$(".plugin-widget-container .form-group>textarea").css("borderRadius",value+"px"),$(".plugin-widget-container .actions-area button").css("borderRadius",value+"px"))},p:function(data){var description,l=this,t={title:"#000",text:"#000",button:"#000"},i=($.each(data.colors,function(index,o){"thanksTitleColor"==o.name?t.title=o.value:"thanksTextColor"==o.name?t.text=o.value:"thanksButtonColor"==o.name&&(t.button=o.value),l.update(o.name,o.value)}),$.each(data.fonts,function(index,o){l.update(o.name,o.value)}),null!=data.plugin&&null!=data.position?(l.update("touchType",data.plugin),l.update("touchPosition",data.position)):(l.update("touchType","rect"),l.update("touchPosition","right-bottom")),null!=data.touch.icon&&l.update("touchIcon",data.touch.icon),null!=data.touch.text&&l.update("touchText",data.touch.text),null!=data.touch.open&&"button"==data.touch.open?l.update("touchShow",!0):l.update("touchShow",!1),"");$(".plugin-widget-container .form-group-list").html(""),$.each(data.fields,function(index,o){i+='<div class="form-group">';var type=o.type,name=o.name,required=(""==name&&(name="Field "+parseInt(99999*Math.random())),o.required);o.hidden?i+='<input class="form-control for-fieldTextColor for-fieldFont" type="hidden" name="'+name+'" placeholder="'+name+'">':"short-text"==type?i+='<input class="form-control for-fieldTextColor for-fieldFont" '+(required?"required":"")+' type="text" name="'+name+'" placeholder="'+name+'">':"long-text"==type&&(i+='<textarea class="form-control for-fieldTextColor for-fieldFont" '+(required?"required":"")+' name="'+name+'" placeholder="'+name+'"></textarea>'),i+="</div>"}),$(".plugin-widget-container .form-group-list").html(i),null!=data.description&&""!=data.description&&(description=(description=(description=data.description.replace(/\n/g,"<br>")).replace(/(<br>\s*){2,}/g,"<br>")).replace(/(<br\s*\/?>\s*){2,}/g,"<br />"),$(".plugin-widget-container.active .editable.description").html(description)),null!=data.advanced.plugin&&l.update("pluginSize",data.advanced.plugin),null!=data.advanced.bottomSpacing&&l.update("bottomSpacing",data.advanced.bottomSpacing),null!=data.advanced.sideSpacing&&l.update("sideSpacing",data.advanced.sideSpacing),null!=data.advanced.rounding&&l.update("rounding",data.advanced.rounding),null!=data.thanks&&!0===data.thanks.is&&(l.u(data.thanks,t),l.t=!0,$("body").on("click","#thankYouModal .close",function(o){o.preventDefault(),$("#thankYouModal").fadeOut(),closeThankYouInSignupForm()}),$("body").on("click","#thankYouModal .btn",function(o){o.preventDefault(),$("#thankYouModal").fadeOut(),doThankYouInSignupForm()})),$(".plugin-widget-container .close-button").on("click",function(o){o.preventDefault(),$(".plugin-widget-container").fadeOut(),closeSignupForm()}),$(".plugin-widget-container .btn-submit").on("click",function(o){o.preventDefault();var t=!0;$(".plugin-widget-container .form-group-list .form-control").each(function(index,o){t&&$(o).attr("required")&&""==$(o).val()&&(alert('Please input "'+$(this).attr("name")+'"'),t=!1)}),t&&"Join_Newsletter"==l.type&&$(".plugin-widget-container .form-control").each(function(index,o){t&&""==$(o).val()&&(alert('Please input "'+$(this).attr("name")+'"'),t=!1)}),t&&($(".plugin-widget-container").fadeOut(),submitSignupForm($(this).closest("form").serializeArray()))}),"button"==data.touch.open?$(".btnTouch").on("click",function(o){o.preventDefault(),$(".plugin-widget-container").fadeIn(),$("#preview_widget").addClass("overlay")}):setTimeout(function(){$(".plugin-widget-container").fadeIn(),$("#preview_widget").addClass("overlay")},1e3*data.touch.duration)},init:function(data,o){var t=this,l=this.l(data[2]),plugin=this.i(l[0],l[1]),l=(t.id=data[0],t.t=!1,t.plugin=l[1],data[4].replace(/\n/g,"<br>")),data=(l=(l=l.replace(/(<br>\s*){2,}/g,"<br>")).replace(/(<br\s*\/?>\s*){2,}/g,"<br />"),JSON.parse(l));console.log("Config------",data),$("#preview_widget").html(""),"button"==data.touch.open&&(l=$(`<button class="btnTouch"><span class="icon"><i class="bi ${data.touch.icon}"></i></span> <span class="text">${data.touch.text}</span></button>`),$("#preview_widget").append(l)),$("#preview_widget").append(plugin),o||$("#preview_widget .logo-area").remove(),t.p(data)}};function submitSignupForm(data){visitorSubmit(l.o,l.id,data);var o="",t="";"Contact_Us"==l.type?(o="Contact US",t='<h2 style="color: #fff;">You&apos;ve got a new submission.</h2>'):"Join_Newsletter"==l.type&&(o="Join our Newsletter!",t='<h2 style="color: #fff;">You&apos;ve got a new subscription.</h2>'),$.each(data,function(index,o){t=(t+=`<p style="font-size: 12px; color: #ff6e90;">${o.name}</p>`)+`<p style="font-size: 12px; color: #fff;">${o.value}</p>`+"<hr>"}),console.log("Form",data),sendEmail(l.o,o,t,l.id),l.t?$("#thankYouModal").fadeIn():(alert("Form Submitted!"),$("#preview_widget").removeClass("overlay"))}function closeSignupForm(){console.log("Form closed"),$("#preview_widget").removeClass("overlay")}function doThankYouInSignupForm(){console.log("Thank You Modal Action!"),$("#preview_widget").removeClass("overlay")}function closeThankYouInSignupForm(){console.log("Thank you closed"),$("#preview_widget").removeClass("overlay")}realSite&&(l.o=getAppGuid(),loadCss("assets/css/bootstrap.min.css",l.o),loadCss("assets/css/bootstrap-icons.min.css",l.o),loadCss("assets/css/signUp.css",l.o),$("body").prepend('<div id="preview_widget"></div>'),null!=widgets[l.o])&&0<widgets[l.o].length&&l.init(widgets[l.o][0],addPoweredBy[l.o]);