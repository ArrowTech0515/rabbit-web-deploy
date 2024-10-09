console.log("start seo rush embed");var obj,r="",i={id:"",type:"",o:"",t:0,i:0,l:{g:2,p:3},u:function(o){return o=o.replace(/^#/,""),{red:parseInt(o.substring(0,2),16),green:parseInt(o.substring(2,4),16),blue:parseInt(o.substring(4,6),16)}},v:function(o){var o=new Date(o),e=o.getDate(),t=o.getFullYear();return e+(e%10==1&&11!==e?"st":e%10==2&&12!==e?"nd":e%10==3&&13!==e?"rd":"th")+` ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][o.getMonth()]}, `+t},h:function(data){var data=data.split("-"),type="",o=parseInt(data[1]);return this.type=data[0],[type="Template"==data[0]?"template":type,o]},m:function(){return`
                    <div id="loading-overlay" style="display: none">
                        <div class="spinner"></div><span class="message">Loading...</span>
                    </div>
                `},T:function(){return`
        <div class="col-md-12 blog-article-container">
                <div class="close_btn"><i class="bi bi-x-circle"></i></div>
                <div class="container">
                    <div class="row article-wrapper">
                        <div class="article-cover-area col-12">
                            <img src="/assets/images/blank_10.png" class="cover-image">
                        </div>
        
                        <div class="article-blog-area col-12">
                            <h1 class="for-postTitleFont for-postTitleColor for-postTitleSize">A Small Lake in the Forest: An Oasis of Peace and Beauty</h1>
                            <p class="for-postTextFont for-postTextColor for-postTextSize for-postTextSpacing">
                                Deep in the forest, far from the hustle and bustle of the city, lies a small lake that offers a sense of peace and beauty. This is a place where nature reveals its most secret treasures, inviting all who seek to escape from everyday worries.
                                The lake is surrounded by towering trees, which are reflected on its surface, creating enchanting images. As the sun rises, its rays dance on the water, transforming it into a true diamond. The gentle dew on the grass and the fresh scent of pine fill the air, creating an atmosphere that soothes the soul.
                                This corner of nature is home to a variety of wildlife. Occasionally, you might see small deer playing by the water, while colorful butterflies flutter above the lake. Beneath the surface, fish swim quietly among the reeds.
                                The small lake is an ideal place for relaxation and reflection. Here, you can have a picnic with friends or simply enjoy the silence while sitting on the shore. Visiting this lake allows you to immerse yourself in the harmony of nature and rejuvenate your spirit.
                            </p>
        
                            <div class="meta-info-wrapper">
                                <div class="personal-info">
                                    <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">Author Name</span>
                                    <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">6 days ago</span>
                                </div>
                                <div class="likes-info for-postLikesCounter for-postLikesCounterColor for-postLikeCounterSize">
                                    <span><i class="bi bi-heart"></i>12</span>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="background-container for-backgroundOpacity for-backgroundColor for-backgroundImage"></div>
                </div>
        </div>
        `},k:function(type,id){if("template"==type){if(1==id)return`
                                <div class="col-md-12 plugin-widget-container template-1" data-template="1">
                                    <div class="container">
                                        <div class="background-container"></div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="blog-header">
                                                    <img src="/assets/images/blank_15.png" class="for-coverImage for-coverImageBrightness">
                                                    <div class="header-wrapper">
                                                        <h1 class="for-blogTitleText for-blogTitleFont for-blogTitleColor">Blog Title</h1>
                                                        <p class="for-blogSubTitleText for-blogSubTitleFont for-blogSubTitleColor">Blog subtitle</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row blog-card-container justify-content-center for-topSpacing">
                                        </div>
                                    </div>
                                </div>
                `;if(2==id)return`
                                <div class="col-md-12 plugin-widget-container template-2" data-template="2">
                                    <div class="container p-0">
                                        <div class="background-container"></div>

                                        <div class="col-12 blog-header">
                                            <h1 class="for-blogTitleText for-blogTitleFont for-blogTitleColor">Welcome To Our Blog</h1>
                                            <p class="for-blogSubTitleText for-blogSubTitleFont for-blogSubTitleColor">Lorem ipsum dolor sit amet consectetur. Varius tellus neque mattis sapien orci.</p>
                                        </div>

                                        <img src="/assets/images/blank_10.png" alt="" class="top-image for-coverImage for-coverImageBrightness">

                                        <div class="col-12 blog-card-container justify-content-center for-topSpacing">
                                        </div>
                                    </div>
                                </div>
                `;if(3==id)return`
                                <div class="col-md-12 plugin-widget-container template-3" data-template="3">
                                    <div class="container">
                                        <div class="background-container"></div>

                                        <div class="col-12 blog-header">
                                            <h1 class="for-blogTitleText for-blogTitleFont for-blogTitleColor">Blog Title</h1>
                                        </div>

                                        <div class="col-12 blog-card-container special-card-container for-topSpacing">
                                        </div>

                                        <div class="col-12 blog-sub-header">
                                            <h3 class="for-blogSubTitleText for-blogSubTitleFont for-blogSubTitleColor">All Articles</h3>
                                        </div>

                                        <div class="col-12 blog-card-container default-card-container for-topSpacing">
                                        </div>
                                    </div>
                                </div>
                `;if(4==id)return`
                                <div class="col-md-12 plugin-widget-container template-4" data-template="4">
                                    <div class="container p-0">
                                        <div class="background-container"></div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="blog-header">
                                                    <img src="/assets/images/blank_15.png" class="for-coverImage for-coverImageBrightness">
                                                    <div class="header-wrapper">
                                                        <h1 class="for-blogTitleText for-blogTitleFont for-blogTitleColor">Blog Title</h1>
                                                        <p class="for-blogSubTitleText for-blogSubTitleFont for-blogSubTitleColor">Blog subtitle</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row blog-card-container justify-content-center for-topSpacing">
                                        </div>
                                    </div>
                                </div>
                `;if(5==id)return`
                                <div class="col-md-12 plugin-widget-container template-5 has-blog-article" data-template="5">
                                    <div class="container p-0">
                                        <div class="background-container"></div>
                                        <div class="row bg-1">
                                            <div class="col-12 p-0">
                                                <div class="blog-header">
                                                    <img src="/assets/images/blank_15.png" class="for-coverImage for-coverImageBrightness">
                                                    <div class="header-wrapper">
                                                        <h1 class="for-blogTitleText for-blogTitleFont for-blogTitleColor">Blog Title</h1>
                                                        <p class="for-blogSubTitleText for-blogSubTitleFont for-blogSubTitleColor">Blog subtitle</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row bg-1 blog-card-container favourite-card-container ">
                                        </div>

                                        <div class="row additional-wrapper for-topSpacing">
                                            <div class="col-7 for-blogWidth-100 blog-article-container opacity-0">
                                                <div class="row article-wrapper">
                                                    <div class="article-cover-area col-12">
                                                        <img src="/assets/images/blank_10.png" class="cover-image">
                                                    </div>

                                                    <div class="article-blog-area col-12">
                                                        <h1 class="for-postTitleFont for-postTitleColor for-postTitleSize">A Small Lake in the Forest: An Oasis of Peace and Beauty</h1>
                                                        <p class="for-postTextFont for-postTextColor for-postTextSize for-postTextSpacing">
                                                            Deep in the forest, far from the hustle and bustle of the city, lies a small lake that offers a sense of peace and beauty. This is a place where nature reveals its most secret treasures, inviting all who seek to escape from everyday worries.
                                                            The lake is surrounded by towering trees, which are reflected on its surface, creating enchanting images. As the sun rises, its rays dance on the water, transforming it into a true diamond. The gentle dew on the grass and the fresh scent of pine fill the air, creating an atmosphere that soothes the soul.
                                                            This corner of nature is home to a variety of wildlife. Occasionally, you might see small deer playing by the water, while colorful butterflies flutter above the lake. Beneath the surface, fish swim quietly among the reeds.
                                                            The small lake is an ideal place for relaxation and reflection. Here, you can have a picnic with friends or simply enjoy the silence while sitting on the shore. Visiting this lake allows you to immerse yourself in the harmony of nature and rejuvenate your spirit.
                                                        </p>

                                                        <div class="meta-info-wrapper">
                                                            <div class="personal-info">
                                                                <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">Author Name</span>
                                                                <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">6 days ago</span>
                                                            </div>
                                                            <div class="likes-info for-postLikesCounter for-postLikesCounterColor for-postLikeCounterSize">
                                                                <span><i class="bi bi-heart"></i>12</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="background-container for-backgroundOpacity for-backgroundColor for-backgroundImage"></div>
                                            </div>

                                            <div class="col-5 for-blogWidth blog-card-container list-card-container">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `;if(6==id)return`
                                <div class="col-md-12 plugin-widget-container template-6" data-template="6">
                                    <div class="container p-0">
                                        <div class="background-container for-coverImage for-coverImageBrightness"></div>

                                        <div class="row">
                                            <div class="col-12">
                                                <div class="blog-header">
                                                    <h1 class="for-blogTitleText for-blogTitleFont for-blogTitleColor">Blog Title</h1>
                                                    <p class="for-blogSubTitleText for-blogSubTitleFont for-blogSubTitleColor">Blog subtitle</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row blog-card-wrapper">
                                            <div class="col-12" style="background: linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0.3) 100%);">
                                                <div class="row blog-card-container justify-content-center for-topSpacing">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `}return'<div class="col-md-12 plugin-widget-container">'},C:function(type,id,data,index){var o="",element=".blog-card-container",e=!1,t=cdnUrl[r]+"user-links-images/"+data[0]+".png",a="Alex Plakov";return"template"==type&&(1==id?o=`
                                            <div class="blog-card for-blogWidth" data-id="${data[0]}">
                                                <div class="card for-shadow position-relative">
                                                    <div class="card-content">
                                                        <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${t}') center/cover no-repeat;">
                                                        <div class="meta-absolute-wrapper">
                                                            <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-meta">
                                                                <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.v(data[4])}</span>
                                                                <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${a}</span>
                                                            </div>
                                                            <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                            <p class="card-text for-postTextFont for-postTextColor">${data[3]}</p>
                                                            <a href="#" class="read-more-btn for-readMoreTextFont for-readMoreTextColor">Read More</a>
                                                        </div>
                                                    </div>
                                                    <div class="card-background for-backgroundOpacity for-backgroundColor for-backgroundImage"></div>
                                                </div>
                                            </div>
                `:2==id?o=`
                                            <div class="row blog-card" data-id="${data[0]}">
                                                <div class="col-12 card for-blogWidth position-relative">
                                                    <div class="row card-content mt-2 mb-2">
                                                        <div class="col ${index%2==0?"col-left":"col-right"} position-relative">
                                                            <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${t}') center/cover no-repeat;">
                                                            <div class="meta-absolute-wrapper">
                                                                <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                    <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col ${index%2==0?"col-right":"col-left"}">
                                                            <div class="card-body">
                                                                <div class="card-meta">
                                                                    <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.v(data[4])}</span>
                                                                    <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${a}</span>
                                                                </div>
                                                                <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                                <p class="card-text for-postTextFont for-postTextColor">${data[3]}</p>
                                                                <a href="#" class="read-more-btn for-readMoreTextFont for-readMoreTextColor">Read More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-background for-backgroundOpacity for-backgroundColor for-backgroundImage"></div>
                                                </div>
                                            </div>
                `:3==id?index>=i.l.g&&(element=".default-card-container",e=!0,o=`
                                                <div class="${0==(type=(index-i.l.g)%4)||3==type?"col-5":"col-7"} blog-card has-action ${0==type||3==type?"for-blogWidth":"for-blogWidth-100"} " data-id="${data[0]}">
                                                    <img src="/assets/images/blank_10.png" class="cover-image for-shadow" style="background: url('${t}') center/cover no-repeat;">

                                                    <div class="card-body">
                                                        <div class="card-meta">
                                                            <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.v(data[4])}</span>
                                                        </div>
                                                        <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                        <div class="card-meta">
                                                            <div class="personal-info">
                                                                <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${a}</span>
                                                            </div>
                                                            <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                `):4==id?o=`
                                            <div class="col-sm-6 blog-card for-blogWidth" data-id="${data[0]}">
                                                <div class="card for-shadow position-relative">
                                                    <div class="card-content">
                                                        <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${t}') center/cover no-repeat;">
                                                        <div class="card-body">
                                                            <div class="card-meta">
                                                                <div class="personal-info">
                                                                    <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${a}</span>
                                                                    <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.v(data[4])}</span>
                                                                </div>
                                                                <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                    <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                                </div>
                                                            </div>
                                                            <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                            <p class="card-text for-postTextFont for-postTextColor">${data[3]}</p>
                                                            <a href="#" class="read-more-btn for-readMoreTextFont for-readMoreTextColor">Read More</a>
                                                        </div>
                                                    </div>
                                                    <div class="card-background for-backgroundOpacity for-backgroundColor for-backgroundImage"></div>
                                                </div>
                                            </div>
                `:5==id?index>=i.l.p&&(element=".list-card-container",o=`
                                                <div class="blog-card has-action" data-id="${data[0]}">
                                                    <img src="/assets/images/blank_10.png" class="cover-image for-shadow" style="background: url('${t}') center/cover no-repeat;">

                                                    <div class="card-body">
                                                        <div class="card-meta">
                                                            <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.v(data[4])}</span>
                                                        </div>
                                                        <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                        <div class="card-meta">
                                                            <div class="personal-info">
                                                                <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${a}</span>
                                                            </div>
                                                            <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                `):6==id&&(o=`
                                                    <div class="blog-card for-blogWidth" data-id="${data[0]}">
                                                        <div class="card for-shadow position-relative">
                                                            <div class="card-content">
                                                                <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${t}') center/cover no-repeat;">
                                                                <div class="card-body">
                                                                    <div class="card-meta">
                                                                    </div>
                                                                    <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                                    <p class="card-text for-postTextFont for-postTextColor">${data[3]}</p>
                                                                    <a href="#" class="read-more-btn for-readMoreTextFont for-readMoreTextColor">Read More</a>
                                                                    <div class="card-meta mt-3">
                                                                        <div class="personal-info">
                                                                            <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${a}</span>
                                                                            <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.v(data[4])}</span>
                                                                        </div>
                                                                        <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                            <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="card-background for-backgroundOpacity for-backgroundColor for-backgroundImage"></div>
                                                        </div>
                                                    </div>
                `)),{element:element,body:o,F:e}},S:function(type,id,data,index){var o="",element="",e=cdnUrl[r]+"user-links-images/"+data[0]+".png",t="Alex Plakov";return"template"==type&&(1==id||2==id?o=`

                `:3==id?index<i.l.g&&(element=".special-card-container",o=`
                                            <div class="blog-card ${index%2==0?"":"right-align"}" data-id="${data[0]}">
                                                <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${e}') center/cover no-repeat;">

                                                <div class="card-body for-shadow for-blogWidth">
                                                    <div class="card-content">
                                                        <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                        <p class="card-text for-postTextFont for-postTextColor">${data[3]}</p>
                                                        <a href="#" class="read-more-btn for-readMoreTextFont for-readMoreTextColor">Read More</a>
                                                        <div class="card-meta">
                                                            <div class="personal-info">
                                                                <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${t}</span>
                                                                <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.v(data[4])}</span>
                                                            </div>
                                                            <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="card-background for-backgroundOpacity for-backgroundColor for-backgroundImage"></div>
                                                </div>
                                            </div>
                `):4==id?o=`
                `:5==id?index<i.l.p&&(element=".favourite-card-container",o=`
                                            <div class="col blog-card has-action" data-id="${data[0]}">
                                                <img src="/assets/images/blank_10.png" class="cover-image for-shadow" style="background: url('${e}') center/cover no-repeat;">

                                                <div class="card-body">
                                                    <div class="card-meta">
                                                        <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.v(data[4])}</span>
                                                    </div>
                                                    <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                    <div class="card-meta">
                                                        <div class="personal-info">
                                                            <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${t}</span>
                                                        </div>
                                                        <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                            <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                `):6==id&&(o=`

                `)),{element:element,body:o}},A:function(o){null==o||""==o?$("#loading-overlay .message").html("Loading..."):$("#loading-overlay .message").html(o),$("#loading-overlay").show()},L:function(){$("#loading-overlay").hide()},update:function(o,value,e){"blogTitleFont"==o?$(".plugin-widget-container .for-blogTitleFont").css("fontFamily",value):"blogSubTitleFont"==o?$(".plugin-widget-container .for-blogSubTitleFont").css("fontFamily",value):"postTitleFont"==o?($(".plugin-widget-container .for-postTitleFont").css("fontFamily",value),$(".blog-article-container .for-postTitleFont").css("fontFamily",value)):"postTextFont"==o?($(".plugin-widget-container .for-postTextFont").css("fontFamily",value),$(".blog-article-container .for-postTextFont").css("fontFamily",value)):"dateAuthorDetailFont"==o?($(".plugin-widget-container .for-dateAuthorDetailFont").css("fontFamily",value),$(".blog-article-container .for-dateAuthorDetailFont").css("fontFamily",value)):"readMoreTextFont"==o?$(".plugin-widget-container .for-readMoreTextFont").css("fontFamily",value):"coverImageBrightness"==o?$(".plugin-widget-container .for-coverImageBrightness").css("opacity",value/100):"blogLikesCounterOpacity"==o?e.isBlogLikesCounter&&$(".plugin-widget-container .for-blogLikesCounterOpacity").css("opacity",value/100):"opacity"==o?($(".plugin-widget-container .for-backgroundOpacity").css("opacity",value/100),$(".blog-article-container .for-backgroundOpacity").css("opacity",value/100)):"blogWidth"==o?($(".plugin-widget-container .for-blogWidth").css("width",value+"%"),$(".plugin-widget-container .for-blogWidth-100").css("width",100-value+"%")):"topSpacing"==o?$(".plugin-widget-container .for-topSpacing").css("marginTop",value+"px"):"shadowSize"!=o&&"shadowOpacity"!=o&&("postLikeCounterSize"==o?e.isPostLikesCounter&&$(".blog-article-container .for-postLikeCounterSize").css("fontSize",value+"px"):"titleSize"==o?$(".blog-article-container .for-postTitleSize").css("fontSize",value+"px"):"textSize"==o?$(".blog-article-container .for-postTextSize").css("fontSize",value+"px"):"spacing"==o?$(".blog-article-container .for-postTextSpacing").css("lineHeight",value+"px"):"pluginSize"==o?$(".btnTouch").css("fontSize",value+"px"):"rounding"==o?$(".btnTouch").css("borderRadius",value+"%"):"sideSpacing"!=o&&("blogTitleValue"==o?$(".plugin-widget-container .for-blogTitleText").text(value):"blogSubTitleValue"==o?$(".plugin-widget-container .for-blogSubTitleText").text(value):"isBlogLikesCounter"==o?value?$(".plugin-widget-container .for-blogLikesCounter").show():$(".plugin-widget-container .for-blogLikesCounter").hide():"isBackgroundColor"!=o&&"isBackgroundImage"!=o&&"isShadow"!=o&&("isPostLikesCounter"==o?value?($(".plugin-widget-container .for-postLikesCounter").show(),$(".blog-article-container .for-postLikesCounter").show()):($(".plugin-widget-container .for-postLikesCounter").hide(),$(".blog-article-container .for-postLikesCounter").hide()):"blogTitleColor"==o?$(".plugin-widget-container .for-blogTitleColor").css("color",value):"blogSubTitleColor"==o?$(".plugin-widget-container .for-blogSubTitleColor").css("color",value):"blogLikesCounterColor"==o?e.isBlogLikesCounter&&$(".plugin-widget-container .for-blogLikesCounterColor").css("color",value):"postTitleColor"==o?($(".plugin-widget-container .for-postTitleColor").css("color",value),$(".blog-article-container .for-postTitleColor").css("color",value)):"postTextColor"==o?($(".plugin-widget-container .for-postTextColor").css("color",value),$(".blog-article-container .for-postTextColor").css("color",value)):"dateAuthorDetailColor"==o?($(".plugin-widget-container .for-dateAuthorDetailColor").css("color",value),$(".blog-article-container .for-dateAuthorDetailColor").css("color",value)):"readMoreTextColor"==o?$(".plugin-widget-container .for-readMoreTextColor").css("color",value):"backgroundColor"==o?e.isBackgroundColor&&($(".plugin-widget-container .for-backgroundColor").css("background",value),$(".blog-article-container .for-backgroundColor").css("background",value)):"shadowColor"!=o&&("postLikesCounterColor"==o?e.isPostLikesCounter&&$(".blog-article-container .for-postLikesCounterColor").css("color",value):"iconBackgroundColor"==o?$(".btnTouch").css("backgroundColor",value):"iconForeColor"==o?$(".btnTouch").css("color",value):"synonymousColor"!=o&&("coverImage"==o?(""==value&&(value="/assets/images/blank_10.png"),$(".plugin-widget-container .for-coverImage").css("background","url('"+value+"') center/cover no-repeat")):"backgroundImage"==o?e.isBackgroundImage&&(""==value&&(value="/assets/images/blank_10.png"),$(".plugin-widget-container .for-backgroundImage").css("background","url('"+value+"') center/cover no-repeat"),$(".blog-article-container .for-backgroundImage").css("background","url('"+value+"') center/cover no-repeat")):"touchPosition"==o?"left-top"==value?$(".btnTouch").css("right","auto").css("bottom","auto").css("top",this.i+"px").css("left",this.i+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"right-top"==value?$(".btnTouch").css("left","auto").css("bottom","auto").css("top",this.i+"px").css("right",this.i+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"left-bottom"==value?$(".btnTouch").css("top","auto").css("right","auto").css("left",this.i+"px").css("bottom",this.i+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"right-bottom"==value?$(".btnTouch").css("top","auto").css("left","auto").css("right",this.i+"px").css("bottom",this.i+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"left-middle"==value?$(".btnTouch").css("right","auto").css("bottom","auto").css("top","50%").css("left",this.i+"px").css("transform","rotate(90deg) translateX(-50%) translateY(-100%)").css("transformOrigin","left top"):"right-middle"==value&&$(".btnTouch").css("left","auto").css("bottom","auto").css("top","50%").css("right",this.i+"px").css("transform","rotate(-90deg) translateX(50%) translateY(-100%)").css("transformOrigin","right top"):"touchIcon"==o?$(".btnTouch>.icon").html("<i class='bi bi-svg "+value+"'></i>"):"synonym"!=o&&"shadow"==o&&(e.isShadow?(o=this.u(value.color),$(".plugin-widget-container.active .for-shadow").css("boxShadow",value.size+"px "+value.size+"px "+2*parseInt(value.size)+"px rgba("+o.red+", "+o.green+", "+o.blue+", "+parseInt(value.opacity)/100+")")):$(".plugin-widget-container.active .for-shadow").css("boxShadow","none")))))))},D:function(layout){"1-row"==layout?($(".blog-article-container .article-wrapper>div").removeClass("order-1").removeClass("order-2"),$(".blog-article-container .article-wrapper>div").removeClass("col-6").addClass("col-12")):($(".blog-article-container .article-wrapper>div").removeClass("col-12").addClass("col-6"),("2-column-right"==layout?($(".blog-article-container .article-blog-area").removeClass("order-2").addClass("order-1"),$(".blog-article-container .article-cover-area")):($(".blog-article-container .article-cover-area").removeClass("order-2").addClass("order-1"),$(".blog-article-container .article-blog-area"))).removeClass("order-1").addClass("order-2"))},O:function(data){var e=this,t={},a={color:"#000000",size:1,opacity:0};e.i=0,$.each(data.is,function(index,o){t[o.name]=o.value,e.update(o.name,o.value)}),$.each(data.textfields,function(index,o){e.update(o.name,o.value,t)}),$.each(data.fonts,function(index,o){e.update(o.name,o.value,t)}),$.each(data.colors,function(index,o){"shadowColor"==o.name&&(a.color=o.value),e.update(o.name,o.value,t)}),$.each(data.sliders,function(index,o){"shadowSize"==o.name?a.size=o.value:"shadowOpacity"==o.name?a.opacity=o.value:"sideSpacing"==o.name&&(e.i=o.value),e.update(o.name,o.value,t)}),e.update("coverImage",data.image.cover,t),e.update("backgroundImage",data.image.background,t),null!=data.touch.icon&&e.update("touchIcon",data.touch.icon,t),null!=data.touch.position&&e.update("touchPosition",data.touch.position,t),e.update("synonym",data.synonym,t),null!=data.post&&""!=data.post.layout&&e.D(data.post.layout),e.update("shadow",a,t)},I:function(e){var t=this,o={};o.userId=userId[r],o.guid=r,t.A(),$.ajax({url:apiUrl[r]+"getMyJsonUserBlogGuest",dataType:"json",async:!0,type:"POST",data:o,success:function(o){console.log("getMyJsonUserBlogGuest result "+JSON.stringify(o)),null!=o&&o.list?t.B(o.list,e):t.B(null,e)},error:function(){t.L()}})},_:function(linkId,e){var t=this,o={};o.userId=userId[r],o.guid=r,o.linkId=linkId,t.A(),$.ajax({url:apiUrl[r]+"getMyJsonUserBlogPostGuest",dataType:"json",async:!0,type:"POST",data:o,success:function(o){t.L(),console.log("getMyJsonUserBlogPostGuest result "+JSON.stringify(o)),null!=o&&o.obj&&t.M(o.obj,e)},error:function(){t.L()}})},M:function(data,o){var e=cdnUrl[r]+"user-links-images/"+data.id+".png";$(".blog-article-container .article-blog-area h1").text(data.title),$(".blog-article-container .article-blog-area p").html(data.text),$(".blog-article-container .article-cover-area img").css("background",`url('${e}') center/cover no-repeat`),$(".blog-article-container .article-blog-area .date").text(this.v(new Date(data.dateCreated.time).toISOString())),$(".blog-article-container .article-blog-area .likes-info span").html('<i class="bi bi-heart"></i>'+data.wordsCount),o?$(".blog-article-container").removeClass("opacity-0"):$(".blog-article-container").fadeIn(),setTimeout(function(){$(".blog-article-container .background-container").css("height",$(".blog-article-container .article-wrapper").height()+64+"px")},100)},B:function(o,e){var t=this,a=-1,r="",i="";null!=o&&($.each(o,function(index,post){var o=t.C(t.o,t.t,post,index),post=t.S(t.o,t.t,post,index);""!=o.element&&(o.F?(++a%2==0&&(i+='<div class="row">'),r=o.element,i+=o.body,a%2==1&&(i+="</div>")):$(".plugin-widget-container "+o.element).append(o.body)),""!=post.element&&$(".plugin-widget-container "+post.element).append(post.body)}),0<a)&&(a%2==1&&(i+="</div>"),$(".plugin-widget-container "+r).append(i)),t.O(e),$(".btnTouch").on("click",function(o){o.preventDefault(),$(".plugin-widget-container").fadeIn(),$("#preview_widget").addClass("overlay"),$(".btnTouch").fadeOut(),setTimeout(function(){$(".plugin-widget-container .background-container").css("height",$(".plugin-widget-container .blog-card-wrapper").height()+$(".plugin-widget-container .blog-header").height()+200+60+"px")},100)}),$(".plugin-widget-container").on("click",".blog-card .read-more-btn",function(o){o.preventDefault(),t._($(this).closest(".blog-card").attr("data-id"),$(this).closest(".plugin-widget-container").hasClass("has-blog-article"))}),$(".plugin-widget-container").on("click",".blog-card.has-action",function(o){o.preventDefault(),t._($(this).attr("data-id"),$(this).closest(".plugin-widget-container").hasClass("has-blog-article"))}),$(".blog-article-container").on("click",".close_btn",function(o){o.preventDefault(),$(".blog-article-container").fadeOut()}),$(".plugin-widget-container").on("click",".close_btn",function(o){o.preventDefault(),$(".plugin-widget-container").fadeOut(),$("#preview_widget").removeClass("overlay"),$(".btnTouch").fadeIn()}),t.L()},init:function(data,o){var e=this,t=(e.id=data[0],this.h(data[2])),a=this.k(t[0],t[1]),t=(e.o=t[0],e.t=t[1],JSON.parse(data[4])),data=(console.log("blog template------------",data,t,o),$("#preview_widget").html(""),$(`<button class="btnTouch"><span class="icon"><i class="bi bi-svg ${t.touch.icon}"></i></span> <span class="text"></span></button>`));$("#preview_widget").append(data),$("#preview_widget").append(a),$("body").append(e.m()),$("#preview_widget .plugin-widget-container").append('<div class="close_btn"><i class="bi bi-x-circle"></i></div>'),0<$(".plugin-widget-container.has-blog-article").length||(o=this.T(),$("#preview_widget").append(o)),e.O(t),e.I(t)}};function t(obj){if("object"!=typeof obj||null===obj)return obj;var o,e=Array.isArray(obj)?[]:{};for(o in obj)obj.hasOwnProperty(o)&&(e[o]=t(obj[o]));return e}realSite&&(r=getAppGuid(),loadCss("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",r),loadCss("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",r),loadCss("assets/css/bootstrap.min.css",r),loadCss("assets/css/bootstrap-icons.min.css",r),loadCss("assets/css/seoRush.css",r),$("body").prepend('<div id="preview_widget"></div>'),null!=widgets[r])&&0<widgets[r].length&&(obj=t(i)).init(widgets[r][0],addPoweredBy[r]);