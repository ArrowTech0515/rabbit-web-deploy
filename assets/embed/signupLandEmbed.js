var SignupLandEmbeddedObject={guid:"",o:!1,id:0,type:"",plugin:"",t:0,i:0,l:function(data){var data=data.split("-"),type="",o=parseInt(data[1]);return this.type=data[0],"Contact_Us"==data[0]?type="contact_forms":"Join_Newsletter"==data[0]?type="join_newsletter":"Lead_Generation"==data[0]&&(type="lead_generation"),[type,o]},u:function(o){return o=o.replace(/^#/,""),{red:parseInt(o.substring(0,2),16),green:parseInt(o.substring(2,4),16),blue:parseInt(o.substring(4,6),16)}},p:function(type,o){if("contact_forms"==type){if(1==o)return`
                    <div class="col-md-12 plugin-widget-container contact_forms form_1" data-plugin="1">
                        <div class="row">
                            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 form-wrapper for-backgroundColor">
                                <div class="row">
                                    <div class="col-1"></div>
                                    <div class="col-10">
                                        <span class="close-button">&times;</span>

                                        <h1 class="title for-editTitle for-titleTextColor for-titleFont">Contact Us Today!</h1>
                                        <p class="description for-editDescription for-sizeHeightMarginBottom for-bodyTextColor for-secondaryFont">If you have any questions or want to know more about our service, contact us using the contact form below</p>
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
                                                <button type="button" class="btn btn-submit for-fieldFont for-accentBackgroundColor">SENT</button>
                                            </div>

                                            <div class="logo-area">
                                                <span class="for-secondaryFont">Powered By</span><img src="/assets/images/signup/contact_forms/1_powered_by.png" class="logo">
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                  `;if(2==o)return`
                    <div class="col-md-12 plugin-widget-container contact_forms form_2" data-plugin="2">
                        <div class="row">
                            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 form-wrapper for-backgroundColor">
                                <div class="contact-image"></div>

                                <!-- Right side form -->
                                <div class="contact-form">
                                    <span class="close-button">&times;</span>

                                    <h1 class="for-editTitle for-titleTextColor for-titleFont">Contact Us Today!</h1>
                                    <p class="for-editDescription for-sizeHeightMarginBottom for-bodyTextColor for-secondaryFont">If you have any questions or want to know more about our service, contact us using the contact form below</p>
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
                                        <span class="for-secondaryFont">Powered By</span><img src="/assets/images/signup/contact_forms/2_powered_by.png" class="logo">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  `;if(3==o)return`
                                    <div class="col-md-12 plugin-widget-container contact_forms form_3" data-plugin="3">
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
                                                        <span class="for-secondaryFont">Powered By</span><img src="/assets/images/signup/contact_forms/4_powered_by.png" class="logo">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                  `;if(4==o)return`
                                    <div class="col-md-12 plugin-widget-container contact_forms form_4" data-plugin="4">
                                        <div class="row">
                                            <div class="col-xl-8 col-lg-10 col-md-12 form-wrapper for-backgroundColor">
                                                <div class="contact-image for-accentBackgroundColor">
                                                    <h1 class="editable for-editTitle for-titleTextColor for-titleFont">Get In<br>Touch!</h1>
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
                                                        <span class="for-secondaryFont">Powered By</span><img src="/assets/images/signup/contact_forms/4_powered_by.png" class="logo">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                  `}else if("join_newsletter"==type){if(1==o)return`
                                <div class="col-md-12 plugin-widget-container join_newsletter form_1" data-plugin="1">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-6 col-md-8 form-wrapper for-backgroundColor">
                                            <div class="row mt-5 mb-3">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <div class="d-flex justify-content-center">
                                                        <span class="cover-icon for-accentTextColor"><i class="bi bi-envelope-paper-fill"></i></span>
                                                    </div>
                                                    <h1 class="title for-editTitle for-titleTextColor for-titleFont">Subscribe Now</h1>
                                                    <p class="description for-editDescription for-bodyTextColor for-secondaryFont">Enter your email to receive daily updates.</p>

                                                    <form class="form-container for-sizeHeightMarginTop" method="post">
                                                        <div class="form-custom-wrapper for-sizeHeightMarginBottom">
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
                                    </div>
                                </div>
                  `;if(2==o)return`
                                <div class="col-md-12 plugin-widget-container join_newsletter form_2" data-plugin="2">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-6 col-md-8 form-wrapper for-backgroundColor for-controlBorderBottomOnly">
                                            <div class="row mt-5 mb-5">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title for-editTitle for-titleTextColor for-titleFont">SUBSCRIBE</h1>
                                                    <p class="description for-editDescription for-bodyTextColor for-secondaryFont">Get notified about the next update.</p>

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
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `;if(3==o)return`
                                <div class="col-md-12 plugin-widget-container join_newsletter form_3" data-plugin="3">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-6 col-md-8 form-wrapper for-backgroundColor for-controlBorderBottomOnly">
                                            <div class="row mt-5 mb-5">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <div class="row">
                                                        <div class="col">
                                                            <h1 class="title for-editTitle for-titleTextColor for-titleFont">Join Our Newsletter</h1>
                                                            <p class="description for-editDescription for-bodyTextColor for-secondaryFont">Get notified about the next update.</p>

                                                            <form class="form-container for-sizeHeightMarginTop" method="post">
                                                                <div class="form-group-list">
                                                                </div>
                                                                <div class="form-custom-wrapper for-sizeHeightMarginBottom">
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
                                    </div>
                                </div>
                  `;if(4==o)return`
                                <div class="col-md-12 plugin-widget-container join_newsletter form_4" data-plugin="4">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-6 col-md-8 form-wrapper for-backgroundColor">
                                            <div class="row mt-5 mb-5">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title for-editTitle for-titleTextColor for-titleFont">Keep in Touch</h1>
                                                    <p class="description for-editDescription for-bodyTextColor for-secondaryFont">Join us for the finest holiday inspiration along with some exclusive deals - just between us</p>

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
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `}else if("lead_generation"==type&&5==o)return`
                                <div class="col-md-12 plugin-widget-container lead_generation form_5" data-plugin="5">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-8 col-md-10 form-wrapper for-accentBorderColor for-backgroundColor">
                                            <div class="row mt-5 mb-3">
                                                <div class="col-1"></div>
                                                <div class="col-10">
                                                    <span class="close-button">&times;</span>

                                                    <h1 class="title for-editTitle for-titleTextColor for-titleFont">GET IN <b>TOUCH</b></h1>
                                                    <p class="description for-editDescription for-sizeHeightMarginBottom for-bodyTextColor for-secondaryFont">If you have any questions or want to know more about our service, contact us using the contact form below</p>

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
                                                    </form>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                  `;return'<div class="col-md-12 plugin-widget-container">'},g:function(o,color){color=`
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
                                    <h5 class="modal-title mb-3" style="display: ${o.title.is?"block":"none"};">${o.title.text}</h5>
                                    <p class="mb-1" style="display: ${o.text.is?"block":"none"};">${o.text.text}</p>
                                </div>
                                <div class="modal-footer">
                                    <a href="#" class="btn" style="display: ${o.button.is?"block":"none"}; color: ${color.button};" >${o.button.text}</a>
                                </div>
                            </div>
                        </div>
                    </div>
        `;$("body").append(color)},update:function(o,value){var color;"backgroundColor"==o?$(".plugin-widget-container .for-backgroundColor").css("backgroundColor",value):"titleTextColor"==o?$(".plugin-widget-container .for-titleTextColor").css("color",value):"bodyTextColor"==o?$(".plugin-widget-container .for-bodyTextColor").css("color",value):"fieldTextColor"==o?($(".plugin-widget-container .for-fieldTextColor").css("color",value),$(".plugin-widget-container .for-fieldTextColor").css("--placeholderColor",value)):"accentColor"==o?($(".plugin-widget-container .for-accentBackgroundColor").css("backgroundColor",value),$(".plugin-widget-container .for-accentTextColor").css("color",value),$(".plugin-widget-container .for-accentBorderColor").css("borderColor",value)):"titleFont"==o?$(".plugin-widget-container .for-titleFont").css("fontFamily",value):"secondaryFont"==o?$(".plugin-widget-container .for-secondaryFont").css("fontFamily",value):"fieldFont"!=o&&("iconBackgroundColor"==o?$(".btnTouch").css("backgroundColor",value):"iconForeColor"==o?$(".btnTouch>.icon").css("color",value):"textColor"==o?$(".btnTouch>.text").css("color",value):"touchText"==o?$(".btnTouch>.text").html(value):"touchFont"==o?$(".btnTouch>.text").css("fontFamily",value):"touchIcon"==o?$(".btnTouch>.icon").html("<i class='bi bi-svg "+value+"'></i>"):"touchType"!=o&&("touchPosition"==o?"left-top"==value?$(".btnTouch").css("right","auto").css("bottom","auto").css("top",this.t+"px").css("left",this.i+"px"):"right-top"==value?$(".btnTouch").css("left","auto").css("bottom","auto").css("top",this.t+"px").css("right",this.i+"px"):"left-bottom"==value?$(".btnTouch").css("top","auto").css("right","auto").css("left","24px").css("bottom",this.t+"px"):"right-bottom"==value?$(".btnTouch").css("top","auto").css("left","auto").css("right","40px").css("bottom",this.t+"px"):"left-middle"==value?$(".btnTouch").css("right","auto").css("bottom","auto").css("top","50%").css("left",this.i+"px"):"right-middle"==value&&$(".btnTouch").css("left","auto").css("bottom","auto").css("top","50%").css("right",this.i+"px"):"touchShow"==o?value?$(".btnTouch").show():$(".btnTouch").hide():"touchTextIs"==o?value?$(".btnTouch span.text").show():$(".btnTouch span.text").hide():"pluginSize"==o?$(".btnTouch").css("fontSize",value+"px"):"bottomSpacing"!=o&&"sideSpacing"!=o&&("rounding"==o?$(".btnTouch").css("borderRadius",value+"px"):"roundingX"==o?$(".btnTouch").css("borderRadius",value+"%"):"sizeWidth"==o?$(".plugin-widget-container .form-wrapper").css("width",value+"%"):"sizeHeight"==o?($(".plugin-widget-container .for-sizeHeightMarginBottom").css("marginBottom",value+"rem"),$(".plugin-widget-container .for-sizeHeightMarginTop").css("marginTop",value+"rem")):"shadow"==o?(color=this.u(value.color),$(".plugin-widget-container .form-wrapper").css("boxShadow",value.size+"px "+value.size+"px "+2*parseInt(value.size)+"px rgba("+color.red+", "+color.green+", "+color.blue+", "+parseInt(value.opacity)/100+")")):"border"==o?value.is?(color=value.size+"px solid "+value.color,$(".plugin-widget-container .form-wrapper").hasClass("for-controlBorderBottomOnly")?$(".plugin-widget-container .form-control").css("borderBottom",color):$(".plugin-widget-container .form-control").css("border",color)):$(".plugin-widget-container .form-control").css("border","none"):"controlSize"==o&&("small"==value?($(".plugin-widget-container input.form-control").css("height","40px"),$(".plugin-widget-container textarea.form-control").css("height","80px"),$(".plugin-widget-container .form-control").css("padding","8px 20px"),$(".plugin-widget-container .btn-submit").css("height","40px")):"medium"==value?($(".plugin-widget-container input.form-control").css("height","60px"),$(".plugin-widget-container textarea.form-control").css("height","120px"),$(".plugin-widget-container .form-control").css("padding","12px 25px"),$(".plugin-widget-container .btn-submit").css("height","60px")):"large"==value&&($(".plugin-widget-container input.form-control").css("height","80px"),$(".plugin-widget-container textarea.form-control").css("height","160px"),$(".plugin-widget-container .form-control").css("padding","16px 30px"),$(".plugin-widget-container .btn-submit").css("height","80px"))))))},m:function(data){var description,i=this,t={title:"#000",text:"#000",button:"#000"},e={size:0,opacity:0,color:"#000000"},r={is:!1,size:0,color:"#000000"},n="";$(".plugin-widget-container .form-group-list").html(""),$.each(data.fields,function(index,o){var type=o.type,name=o.name,required=(""==name&&(name="Field "+parseInt(99999*Math.random())),o.required),o=o.hidden;n+='<div class="form-group '+(!o&&required?"required":"")+'">',o?n+='<input class="form-control for-fieldTextColor for-fieldFont" type="hidden" name="'+name+'" placeholder="'+name+'">':"short-text"==type?n+='<input class="form-control for-fieldTextColor for-fieldFont '+(required?"required":"")+'" '+(required?"required":"")+' type="text" name="'+name+'" placeholder="'+name+'">':"long-text"==type&&(n+='<textarea class="form-control for-fieldTextColor for-fieldFont '+(required?"required":"")+'" '+(required?"required":"")+' name="'+name+'" placeholder="'+name+'"></textarea>'),n+="</div>"}),$(".plugin-widget-container .form-group-list").html(n),null!=data.title&&""!=data.title&&(description=(description=(description=data.title.replace(/\n/g,"<br>")).replace(/(<br>\s*){2,}/g,"<br>")).replace(/(<br\s*\/?>\s*){2,}/g,"<br />"),$(".plugin-widget-container .for-editTitle").html(description)),null!=data.subTitle&&""!=data.subTitle&&(description=(description=(description=data.subTitle.replace(/\n/g,"<br>")).replace(/(<br>\s*){2,}/g,"<br>")).replace(/(<br\s*\/?>\s*){2,}/g,"<br />"),$(".plugin-widget-container .for-editSubTitle").html(description)),null!=data.description&&""!=data.description&&(description=(description=(description=data.description.replace(/\n/g,"<br>")).replace(/(<br>\s*){2,}/g,"<br>")).replace(/(<br\s*\/?>\s*){2,}/g,"<br />"),$(".plugin-widget-container .for-editDescription").html(description)),$.each(data.colors,function(index,o){"shadowColor"==o.name?e.color=o.value:"thicknessColor"==o.name?r.color=o.value:"thanksTitleColor"==o.name?t.title=o.value:"thanksTextColor"==o.name?t.text=o.value:"thanksButtonColor"==o.name&&(t.button=o.value),i.update(o.name,o.value)}),$.each(data.fonts,function(index,o){i.update(o.name,o.value)}),null!=data.advanced.plugin&&i.update("pluginSize",data.advanced.plugin),null!=data.advanced.bottomSpacing&&(i.t=data.advanced.bottomSpacing),null!=data.advanced.sideSpacing&&(i.i=data.advanced.sideSpacing),null!=data.advanced.stroke?r.is=data.advanced.stroke:r.is=!1,null!=data.advanced.thickness?r.size=data.advanced.thickness:r.size=0,i.update("border",r),null!=data.plugin&&null!=data.position?(i.update("touchPosition",data.position),null!=data.advanced.rounding&&i.update("rect"==data.plugin?"rounding":"roundingX",data.advanced.rounding)):(i.update("touchPosition","right-bottom"),null!=data.advanced.rounding&&i.update("rounding",data.advanced.rounding)),null!=data.touch.is?i.update("touchTextIs",data.touch.is):i.update("touchTextIs",!1),null!=data.touch.icon&&i.update("touchIcon",data.touch.icon),null!=data.touch.text&&i.update("touchText",data.touch.text),null!=data.touch.open&&"button"==data.touch.open?i.update("touchShow",!0):i.update("touchShow",!1),null!=data.advanced.shadowSize?e.size=data.advanced.shadowSize:e.size=0,null!=data.advanced.shadowOpacity?e.opacity=data.advanced.shadowOpacity:e.opacity=0,i.update("shadow",e),null!=data.advanced.width?i.update("sizeWidth",data.advanced.width):i.update("sizeWidth",90),null!=data.advanced.height?i.update("sizeHeight",data.advanced.height):i.update("sizeHeight",1),null!=data.advanced.size?i.update("controlSize",data.advanced.size):i.update("controlSize","small"),null!=data.thanks&&!0===data.thanks.is&&(i.g(data.thanks,t),i.o=!0,$("body").on("click","#thankYouModal .close",function(o){o.preventDefault(),$("#thankYouModal").fadeOut(),$("#preview_widget").removeClass("overlay"),closeThankYouInSignupForm()}),$("body").on("click","#thankYouModal .btn",function(o){o.preventDefault(),$("#thankYouModal").fadeOut(),$("#preview_widget").removeClass("overlay"),doThankYouInSignupForm()})),$(".plugin-widget-container .close-button").on("click",function(o){o.preventDefault(),$(".plugin-widget-container").fadeOut(),$("#preview_widget").removeClass("overlay"),closeSignupForm()}),$(".plugin-widget-container .btn-submit").on("click",function(o){o.preventDefault();var t=!0;$(".plugin-widget-container .form-group-list .form-control").each(function(index,o){t&&$(o).attr("required")&&""==$(o).val()&&(alert('Please input "'+$(this).attr("name")+'"'),t=!1)}),t&&"Join_Newsletter"==i.type&&$(".plugin-widget-container .form-control").each(function(index,o){t&&""==$(o).val()&&(alert('Please input "'+$(this).attr("name")+'"'),t=!1)}),t&&confirm("Are you sure?")&&(o=$(this).closest("form").serializeArray(),i.submit(o),submitSignupForm(o))}),"button"==data.touch.open?$(".btnTouch").on("click",function(o){o.preventDefault(),$(".plugin-widget-container").fadeIn(),$("#preview_widget").addClass("overlay")}):setTimeout(function(){$(".plugin-widget-container").fadeIn(),$("#preview_widget").addClass("overlay")},1e3*data.touch.duration)},submit:function(data){visitorSubmit(SignupLandEmbeddedObject.guid,SignupLandEmbeddedObject.id,data);var o="",t="";"Contact_Us"==SignupLandEmbeddedObject.type?(o="Contact US",t='<h2 style="color: #fff;">You&apos;ve got a new submission.</h2>'):"Join_Newsletter"==SignupLandEmbeddedObject.type?(o="Join our Newsletter!",t='<h2 style="color: #fff;">You&apos;ve got a new subscription.</h2>'):"Lead_Generation"==SignupLandEmbeddedObject.type&&(o="Lead Generation",t='<h2 style="color: #fff;">You&apos;ve got a new lead generation.</h2>'),$.each(data,function(index,o){t=(t+=`<p style="font-size: 12px; color: #ff6e90;">${o.name}</p>`)+`<p style="font-size: 12px; color: #fff;">${o.value}</p>`+"<hr>"}),console.log("Form",data),sendEmail(SignupLandEmbeddedObject.guid,o,t,SignupLandEmbeddedObject.id)},init:function(data,o){var t=this,i=this.l(data[2]),plugin=this.p(i[0],i[1]),i=(t.id=data[0],t.o=!1,t.plugin=i[1],data[4].replace(/\n/g,"<br>")),data=(i=(i=i.replace(/(<br>\s*){2,}/g,"<br>")).replace(/(<br\s*\/?>\s*){2,}/g,"<br />"),JSON.parse(i));console.log("Config------",data),$("#preview_widget").html(""),"button"==data.touch.open&&(i=$(`<button class="btnTouch"><span class="icon"><i class="bi bi-svg ${data.touch.icon}"></i></span> <span class="text">${data.touch.text}</span></button>`),$("#preview_widget").append(i)),$("#preview_widget").append(plugin),o||$("#preview_widget .logo-area").remove(),t.m(data)}};function submitSignupForm(data){$(".plugin-widget-container").fadeOut(),SignupLandEmbeddedObject.o?$("#thankYouModal").fadeIn():(alert("Form Submitted!"),$("#preview_widget").removeClass("overlay"))}function closeSignupForm(){console.log("Form closed")}function doThankYouInSignupForm(){console.log("Thank You!")}function closeThankYouInSignupForm(){console.log("Thank you closed")}realSite&&(SignupLandEmbeddedObject.guid=getAppGuid(),loadCss("assets/css/bootstrap.min.css",SignupLandEmbeddedObject.guid),loadCss("assets/css/bootstrap-icons.min.css",SignupLandEmbeddedObject.guid),loadCss("assets/css/signUp.css",SignupLandEmbeddedObject.guid),$("body").prepend('<div id="preview_widget"></div>'),null!=widgets[SignupLandEmbeddedObject.guid])&&0<widgets[SignupLandEmbeddedObject.guid].length&&SignupLandEmbeddedObject.init(widgets[SignupLandEmbeddedObject.guid][0],addPoweredBy[SignupLandEmbeddedObject.guid]);