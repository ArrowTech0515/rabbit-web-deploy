console.log("start seo rush embed");var obj,r="",i={id:"",type:"",o:"",t:0,i:0,l:"button",g:{u:2,p:3},configuration:null,h:null,v:function(o){return o=o.replace(/^#/,""),{red:parseInt(o.substring(0,2),16),green:parseInt(o.substring(2,4),16),blue:parseInt(o.substring(4,6),16)}},m:function(o){var o=new Date(o),t=o.getDate(),e=o.getFullYear();return t+(t%10==1&&11!==t?"st":t%10==2&&12!==t?"nd":t%10==3&&13!==t?"rd":"th")+` ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][o.getMonth()]}, `+e},T:function(data){var data=data.split("-"),type="",o=parseInt(data[1]);return this.type=data[0],[type="Template"==data[0]?"template":type,o]},k:function(){return`
                    <div id="loading-overlay" style="display: none">
                        <div class="circle-container">
                            <div class="circle">
                                <div class="progress"></div>
                                <div class="progress inner"></div>
                                <div class="progress small"></div>
                            </div>
                        </div>
                        <span class="message">Loading...</span>
                    </div>
                `},C:function(){return`
        <div class="col-md-12 blog-article-container">
                <div class="container">
                    <div class="close_btn"><i class="bi bi-arrow-left-short"></i> <span>Blog</span></div>
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
        `},F:function(type,id){if("template"==type){if(1==id)return`
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
                `}return'<div class="col-md-12 plugin-widget-container">'},S:function(type,id,data,index){var obj,o="",element=".blog-card-container",t=!1,e=cdnUrl[r]+"user-links-images/"+data[0]+".png",a="";return null!=data[6]&&""!=data[6]&&null!=(obj=JSON.parse(data[6]))&&null!=obj.name&&(a=obj.name),"template"==type&&(1==id?o=`
                                            <div class="blog-card for-blogWidth" data-id="${data[0]}">
                                                <div class="card for-shadow position-relative">
                                                    <div class="card-content">
                                                        <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${e}') center/cover no-repeat;">
                                                        <div class="meta-absolute-wrapper">
                                                            <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-meta">
                                                                <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.m(data[4])}</span>
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
                                                            <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${e}') center/cover no-repeat;">
                                                            <div class="meta-absolute-wrapper">
                                                                <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                    <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col ${index%2==0?"col-right":"col-left"}">
                                                            <div class="card-body">
                                                                <div class="card-meta">
                                                                    <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.m(data[4])}</span>
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
                `:3==id?index>=i.g.u&&(element=".default-card-container",t=!0,o=`
                                                <div class="${0==(obj=(index-i.g.u)%4)||3==obj?"col-5":"col-7"} blog-card has-action ${0==obj||3==obj?"for-blogWidth":"for-blogWidth-100"} " data-id="${data[0]}">
                                                    <img src="/assets/images/blank_10.png" class="cover-image for-shadow" style="background: url('${e}') center/cover no-repeat;">

                                                    <div class="card-body">
                                                        <div class="card-meta">
                                                            <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.m(data[4])}</span>
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
                                                        <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${e}') center/cover no-repeat;">
                                                        <div class="card-body">
                                                            <div class="card-meta">
                                                                <div class="personal-info">
                                                                    <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${a}</span>
                                                                    <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.m(data[4])}</span>
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
                `:5==id?index>=i.g.p&&(element=".list-card-container",o=`
                                                <div class="blog-card has-action" data-id="${data[0]}">
                                                    <img src="/assets/images/blank_10.png" class="cover-image for-shadow" style="background: url('${e}') center/cover no-repeat;">

                                                    <div class="card-body">
                                                        <div class="card-meta">
                                                            <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.m(data[4])}</span>
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
                                                                <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${e}') center/cover no-repeat;">
                                                                <div class="card-body">
                                                                    <div class="card-meta">
                                                                    </div>
                                                                    <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                                    <p class="card-text for-postTextFont for-postTextColor">${data[3]}</p>
                                                                    <a href="#" class="read-more-btn for-readMoreTextFont for-readMoreTextColor">Read More</a>
                                                                    <div class="card-meta mt-3">
                                                                        <div class="personal-info">
                                                                            <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${a}</span>
                                                                            <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.m(data[4])}</span>
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
                `)),{element:element,body:o,B:t}},A:function(type,id,data,index){var obj,o="",element="",t=cdnUrl[r]+"user-links-images/"+data[0]+".png",e="";return null!=data[6]&&""!=data[6]&&null!=(obj=JSON.parse(data[6]))&&null!=obj.name&&(e=obj.name),"template"==type&&(1==id||2==id?o=`

                `:3==id?index<i.g.u&&(element=".special-card-container",o=`
                                            <div class="blog-card ${index%2==0?"":"right-align"}" data-id="${data[0]}">
                                                <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${t}') center/cover no-repeat;">

                                                <div class="card-body for-shadow for-blogWidth">
                                                    <div class="card-content">
                                                        <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                        <p class="card-text for-postTextFont for-postTextColor">${data[3]}</p>
                                                        <a href="#" class="read-more-btn for-readMoreTextFont for-readMoreTextColor">Read More</a>
                                                        <div class="card-meta">
                                                            <div class="personal-info">
                                                                <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${e}</span>
                                                                <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.m(data[4])}</span>
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
                `:5==id?index<i.g.p&&(element=".favourite-card-container",o=`
                                            <div class="col blog-card has-action" data-id="${data[0]}">
                                                <img src="/assets/images/blank_10.png" class="cover-image for-shadow" style="background: url('${t}') center/cover no-repeat;">

                                                <div class="card-body">
                                                    <div class="card-meta">
                                                        <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.m(data[4])}</span>
                                                    </div>
                                                    <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                    <div class="card-meta">
                                                        <div class="personal-info">
                                                            <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${e}</span>
                                                        </div>
                                                        <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                            <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                `):6==id&&(o=`

                `)),{element:element,body:o}},L:function(o){null==o||""==o?$("#loading-overlay .message").html("Loading..."):$("#loading-overlay .message").html(o),$("#loading-overlay").show()},D:function(){$("#loading-overlay").hide()},update:function(o,value,t){var size;"blogTitleFont"==o?$(".plugin-widget-container .for-blogTitleFont").css("fontFamily",value):"blogSubTitleFont"==o?$(".plugin-widget-container .for-blogSubTitleFont").css("fontFamily",value):"postTitleFont"==o?($(".plugin-widget-container .for-postTitleFont").css("fontFamily",value),$(".blog-article-container .for-postTitleFont").css("fontFamily",value)):"postTextFont"==o?($(".plugin-widget-container .for-postTextFont").css("fontFamily",value),$(".blog-article-container .for-postTextFont").css("fontFamily",value)):"dateAuthorDetailFont"==o?($(".plugin-widget-container .for-dateAuthorDetailFont").css("fontFamily",value),$(".blog-article-container .for-dateAuthorDetailFont").css("fontFamily",value)):"readMoreTextFont"==o?$(".plugin-widget-container .for-readMoreTextFont").css("fontFamily",value):"touchTextFont"==o?$(".btnTouch>.text").css("fontFamily",value):"coverImageBrightness"==o?$(".plugin-widget-container .for-coverImageBrightness").css("opacity",value/100):"blogLikesCounterOpacity"==o?t.isBlogLikesCounter&&$(".plugin-widget-container .for-blogLikesCounterOpacity").css("opacity",value/100):"opacity"==o?$(".plugin-widget-container .background-container").css("opacity",value/100):"blogWidth"==o?($(".plugin-widget-container .for-blogWidth").css("width",value+"%"),$(".plugin-widget-container .for-blogWidth-100").css("width",100-value+"%")):"topSpacing"==o?$(".plugin-widget-container .for-topSpacing").css("marginTop",value+"px"):"shadowSize"!=o&&"shadowOpacity"!=o&&("postLikeCounterSize"==o?t.isPostLikesCounter&&$(".blog-article-container .for-postLikeCounterSize").css("fontSize",value+"px"):"titleSize"==o?$(".blog-article-container .for-postTitleSize").css("fontSize",value+"px"):"textSize"==o?$(".blog-article-container .for-postTextSize").css("fontSize",value+"px"):"spacing"==o?$(".blog-article-container .for-postTextSpacing").css("lineHeight",value+"px"):"pluginSize"==o?($(".btnTouch>.icon").css("fontSize",value+"px"),$(".btnTouch>.text").css("fontSize",parseInt(70*parseInt(value)/100)+"px")):"rounding"==o?$(".btnTouch").css("borderRadius",value+"%"):"sideSpacing"!=o&&("blogTitleValue"==o?$(".plugin-widget-container .for-blogTitleText").text(value):"blogSubTitleValue"==o?$(".plugin-widget-container .for-blogSubTitleText").text(value):"touchTextValue"==o?$(".btnTouch>.text").text(value):"isBlogLikesCounter"==o?value?$(".plugin-widget-container .for-blogLikesCounter").show():$(".plugin-widget-container .for-blogLikesCounter").hide():"isBackgroundColor"!=o&&"isBackgroundImage"!=o&&"isShadow"!=o&&("isPostLikesCounter"==o?value?($(".plugin-widget-container .for-postLikesCounter").show(),$(".blog-article-container .for-postLikesCounter").show()):($(".plugin-widget-container .for-postLikesCounter").hide(),$(".blog-article-container .for-postLikesCounter").hide()):"isTouchText"==o?value?$(".btnTouch>.text").show():$(".btnTouch>.text").hide():"blogTitleColor"==o?$(".plugin-widget-container .for-blogTitleColor").css("color",value):"blogSubTitleColor"==o?$(".plugin-widget-container .for-blogSubTitleColor").css("color",value):"blogLikesCounterColor"==o?t.isBlogLikesCounter&&$(".plugin-widget-container .for-blogLikesCounterColor").css("color",value):"postTitleColor"==o?($(".plugin-widget-container .for-postTitleColor").css("color",value),$(".blog-article-container .for-postTitleColor").css("color",value)):"postTextColor"==o?($(".plugin-widget-container .for-postTextColor").css("color",value),$(".blog-article-container .for-postTextColor").css("color",value)):"dateAuthorDetailColor"==o?($(".plugin-widget-container .for-dateAuthorDetailColor").css("color",value),$(".blog-article-container .for-dateAuthorDetailColor").css("color",value)):"readMoreTextColor"==o?$(".plugin-widget-container .for-readMoreTextColor").css("color",value):"backgroundColor"==o?t.isBackgroundColor&&$(".plugin-widget-container .background-container").css("background",value):"shadowColor"!=o&&("postLikesCounterColor"==o?t.isPostLikesCounter&&$(".blog-article-container .for-postLikesCounterColor").css("color",value):"iconBackgroundColor"==o?$(".btnTouch").css("backgroundColor",value):"iconForeColor"==o?$(".btnTouch").css("color",value):"synonymousColor"!=o&&("touchTextColor"==o?$(".btnTouch>.text").css("color",value):"coverImage"==o?(""==value&&(value="/assets/images/blank_10.png"),$(".plugin-widget-container .for-coverImage").css("background","url('"+value+"') center/cover no-repeat")):"backgroundImage"==o?t.isBackgroundImage&&(""==value&&(value="/assets/images/blank_10.png"),$(".plugin-widget-container .background-container").css("background","url('"+value+"') center/cover no-repeat")):"touchPosition"==o?"left-top"==value?$(".btnTouch").css("right","auto").css("bottom","auto").css("top",this.i+"px").css("left",this.i+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"right-top"==value?$(".btnTouch").css("left","auto").css("bottom","auto").css("top",this.i+"px").css("right",this.i+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"left-bottom"==value?$(".btnTouch").css("top","auto").css("right","auto").css("left",this.i+"px").css("bottom",this.i+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"right-bottom"==value?$(".btnTouch").css("top","auto").css("left","auto").css("right",this.i+"px").css("bottom",this.i+"px").css("transform","rotate(0)").css("transformOrigin","inherit"):"left-middle"==value?$(".btnTouch").css("right","auto").css("bottom","auto").css("top","50%").css("left",this.i+"px").css("transform","rotate(90deg) translateX(-50%) translateY(-100%)").css("transformOrigin","left top"):"right-middle"==value?$(".btnTouch").css("left","auto").css("bottom","auto").css("top","50%").css("right",this.i+"px").css("transform","rotate(-90deg) translateX(50%) translateY(-100%)").css("transformOrigin","right top"):"top-full"==value?$(".touchBar").css("top",0).css("bottom","auto"):"bottom-full"==value&&$(".touchBar").css("top","auto").css("bottom",0):"touchIcon"==o?($(".btnTouch>.icon").html("<i class='bi bi-svg "+value+"'></i>"),$(".touchBar .icon").html("<i class='bi bi-svg "+value+"'></i>")):"barBackgroundColor"==o?$(".touchBar").css("background",value):"barSize"==o?($(".touchBar").css("paddingTop",1+.2*value+"rem"),$(".touchBar").css("paddingBottom",1+.2*value+"rem"),$(".touchBar .icon").css("fontSize",20+6*value+"px"),$(".touchBar .t-1").css("fontSize",11+3*value+"px"),$(".touchBar .t-2").css("fontSize",8+2*value+"px")):"barTitleValue"==o?$(".touchBar .t-1").text(value):"barTitleFont"==o?$(".touchBar .t-1").css("fontFamily",value):"barTitleColor"==o?($(".touchBar .icon").css("color",value),$(".touchBar .t-1").css("color",value)):"barTextValue"==o?$(".touchBar .t-2").text(value):"barTextFont"==o?$(".touchBar .t-2").css("fontFamily",value):"barTextColor"==o?$(".touchBar .t-2").css("color",value):"barButtonSize"==o?($(".touchBar .btn").css("padding",value+"px"),$(".touchBar .btn").css("fontSize",value+"px")):"barButtonBackgroundColor"==o?$(".touchBar .btn").css("background",value):"barButtonValue"==o?$(".touchBar .btn").text(value):"barButtonFont"==o?$(".touchBar .btn").css("fontFamily",value):"barButtonColor"==o?$(".touchBar .btn").css("color",value):"imageSize"==o?(size=400,"medium"==value?size=300:"small"==value&&(size=200),$(".blog-article-container .article-wrapper .cover-image").css("maxHeight",size+"px")):"synonym"!=o&&"shadow"==o&&(t.isShadow?(size=this.v(value.color),$(".plugin-widget-container.active .for-shadow").css("boxShadow",value.size+"px "+value.size+"px "+2*parseInt(value.size)+"px rgba("+size.red+", "+size.green+", "+size.blue+", "+parseInt(value.opacity)/100+")")):$(".plugin-widget-container.active .for-shadow").css("boxShadow","none")))))))},O:function(){"button"==this.l?($(".btnTouch").show(),$(".touchBar").hide()):($(".btnTouch").hide(),$(".touchBar").show())},I:function(layout){"1-row"==layout?($(".blog-article-container .article-wrapper>div").removeClass("order-1").removeClass("order-2"),$(".blog-article-container .article-wrapper>div").removeClass("col-6").addClass("col-12")):($(".blog-article-container .article-wrapper>div").removeClass("col-12").addClass("col-6"),("2-column-right"==layout?($(".blog-article-container .article-blog-area").removeClass("order-2").addClass("order-1"),$(".blog-article-container .article-cover-area")):($(".blog-article-container .article-cover-area").removeClass("order-2").addClass("order-1"),$(".blog-article-container .article-blog-area"))).removeClass("order-1").addClass("order-2"))},_:function(data){var t=this,e={M:!1},a={color:"#000000",size:1,opacity:0};t.i=0,$.each(data.is,function(index,o){e[o.name]=o.value,t.update(o.name,o.value)}),t.update("isTouchText",e.M),$.each(data.textfields,function(index,o){t.update(o.name,o.value,e)}),$.each(data.fonts,function(index,o){t.update(o.name,o.value,e)}),$.each(data.colors,function(index,o){"shadowColor"==o.name&&(a.color=o.value),t.update(o.name,o.value,e)}),$.each(data.sliders,function(index,o){"shadowSize"==o.name?a.size=o.value:"shadowOpacity"==o.name?a.opacity=o.value:"sideSpacing"==o.name&&(t.i=o.value),t.update(o.name,o.value,e)}),t.update("coverImage",data.image.cover,e),t.update("backgroundImage",data.image.background,e),null!=data.touch.icon&&t.update("touchIcon",data.touch.icon,e),null!=data.touch.position?t.update("touchPosition",data.touch.position,e):(this.l="button",t.update("touchPosition","right-bottom",e)),t.O(),t.update("synonym",data.synonym,e),null!=data.post&&""!=data.post.layout&&t.I(data.post.layout),null!=data.post&&""!=data.post.size?t.update("imageSize",data.post.size):t.update("imageSize","medium"),t.update("shadow",a,e)},P:function(t,e){var a=this,o={};o.userId=userId[r],o.guid=r,a.L(),$.ajax({url:apiUrl[r]+"getMyJsonUserBlogGuest",dataType:"json",async:!0,type:"POST",data:o,success:function(o){console.log("getMyJsonUserBlogGuest result "+JSON.stringify(o)),null!=o&&o.list?a.W(o.list,t,e):a.W(null,t,e)},error:function(){a.D()}})},J:function(linkId,t){var e=this,o={};o.userId=userId[r],o.guid=r,o.linkId=linkId,e.L(),$.ajax({url:apiUrl[r]+"getMyJsonUserBlogPostGuest",dataType:"json",async:!0,type:"POST",data:o,success:function(o){e.D(),console.log("getMyJsonUserBlogPostGuest result "+JSON.stringify(o)),null!=o&&o.obj&&e.j(o.obj,t)},error:function(){e.D()}})},j:function(data,o){var post,t=cdnUrl[r]+"user-links-images/"+data.id+".png",e="";null!=this.h&&null!=(post=this.h.find(function(o){return o[0]==data.id}))&&null!=post[6]&&""!=post[6]&&null!=(post=JSON.parse(post[6]))&&null!=post.name&&(e=post.name),$(".blog-article-container .article-blog-area h1").text(data.title),$(".blog-article-container .article-blog-area p").html(data.text),$(".blog-article-container .article-cover-area img").css("background",`url('${t}') center/cover no-repeat`),$(".blog-article-container .article-blog-area .author-name").text(e),$(".blog-article-container .article-blog-area .date").text(this.m(new Date(data.dateCreated.time).toISOString())),$(".blog-article-container .article-blog-area .likes-info span").html('<i class="bi bi-heart"></i>'+data.wordsCount),o?$(".blog-article-container").removeClass("opacity-0"):$(".blog-article-container").fadeIn(),setTimeout(function(){$(".blog-article-container .background-container").css("height",$(".blog-article-container .article-wrapper").height()+64+"px")},100)},V:function(){var o=this;o.P(o.configuration,function(){$(".plugin-widget-container").fadeIn(),$("#preview_widget").addClass("overlay"),("button"==o.l?$(".btnTouch"):$(".touchBar")).fadeOut(),setTimeout(function(){$(".plugin-widget-container .background-container").css("height",$(".plugin-widget-container .blog-card-wrapper").height()+$(".plugin-widget-container .blog-header").height()+200+60+"px")},100)})},N:function(){$(".plugin-widget-container").fadeOut(),$("#preview_widget").removeClass("overlay"),("button"==this.l?$(".btnTouch"):$(".touchBar")).fadeIn()},W:function(o,t,e){var a=this,r=-1,i="",l="";null!=(a.h=o)&&($.each(o,function(index,post){var o=a.S(a.o,a.t,post,index),post=a.A(a.o,a.t,post,index);""!=o.element&&(o.B?(++r%2==0&&(l+='<div class="row">'),i=o.element,l+=o.body,r%2==1&&(l+="</div>")):$(".plugin-widget-container "+o.element).append(o.body)),""!=post.element&&$(".plugin-widget-container "+post.element).append(post.body)}),0<r)&&(r%2==1&&(l+="</div>"),$(".plugin-widget-container "+i).append(l)),a._(t),a.D(),null!=e&&e()},init:function(data,o){var t=this,e=(t.id=data[0],JSON.parse(data[4])),a=(t.configuration=e,this.T(null!=e.template?e.template:data[2])),template=this.F(a[0],a[1]),a=(t.o=a[0],t.t=a[1],console.log("blog template------------",data,e,o),t.l=null==e.touch.position||"top-full"!=e.touch.position&&"bottom-full"!=e.touch.position?"button":"bar",$("#preview_widget").html(""),$(`<button class="btnTouch"><span class="icon"><i class="bi bi-svg ${e.touch.icon}"></i></span> <span class="text"></span></button>`)),data=$(`<div class="touchBar">
                        <div class="wrapper">
                            <div class="bar-wrapper">
                                <span class="icon"><i class="bi bi-svg bi-envelope-fill"></i></span>
                                <div class="text-wrapper">
                                    <p class="t-1">Explore More in our blog</p>
                                    <p class="t-2">Learn more and get the best tips from our articles</p>
                                </div>
                            </div>
                            <button class="btn">VISIT BLOG</button>
                        </div>
                    </div>`);$("#preview_widget").append(a),$("#preview_widget").append(data),$("#preview_widget").append(template),$("body").append(t.k()),$("#preview_widget .plugin-widget-container").append('<div class="close_btn"><i class="bi bi-x-circle"></i></div>'),0<$(".plugin-widget-container.has-blog-article").length||(o=this.C(),$("#preview_widget").append(o)),t._(e),$(".btnTouch").on("click",function(o){o.preventDefault(),t.V()}),$(".touchBar .btn").on("click",function(o){o.preventDefault(),t.V()}),$(".plugin-widget-container").on("click",".blog-card .read-more-btn",function(o){o.preventDefault(),t.J($(this).closest(".blog-card").attr("data-id"),$(this).closest(".plugin-widget-container").hasClass("has-blog-article"))}),$(".plugin-widget-container").on("click",".blog-card.has-action",function(o){o.preventDefault(),t.J($(this).attr("data-id"),$(this).closest(".plugin-widget-container").hasClass("has-blog-article"))}),$(".blog-article-container").on("click",".close_btn",function(o){o.preventDefault(),$(".blog-article-container").fadeOut()}),$(".plugin-widget-container").on("click",".close_btn",function(o){o.preventDefault(),t.N()})}};function e(obj){if("object"!=typeof obj||null===obj)return obj;var o,t=Array.isArray(obj)?[]:{};for(o in obj)obj.hasOwnProperty(o)&&(t[o]=e(obj[o]));return t}realSite&&(r=getAppGuid(),loadCss("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",r),loadCss("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",r),loadCss("assets/css/bootstrap.min.css",r),loadCss("assets/css/bootstrap-icons.min.css",r),loadCss("assets/css/seoRush.css",r),$("body").prepend('<div id="preview_widget"></div>'),null!=widgets[r])&&0<widgets[r].length&&(obj=e(i)).init(widgets[r][0],addPoweredBy[r]);