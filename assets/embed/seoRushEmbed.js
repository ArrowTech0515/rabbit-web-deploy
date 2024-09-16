console.log('start seo rush embed');
let apiUrl = 'https://seorush.me/';
// let apiUrl = isTestingMode() ? 'http://localhost:8080/' : 'https://seorush.me/';
//'<img width="200px" height="100px" src="' + cdnUrl + 'user-links-images/' + result[i][0] + '.png">' +
var SEORushEmbeddedObject = {
        guid: '',
        id: '',
        type: '',
        templateType: '',
        templateID: 0,

        Const: {
                Template_3_Special_Card: 2,
                Template_5_Special_Card: 3,
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
        formatDate: function (dateString) {
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
        },

        getPluginType: function (data) {
                var v = data.split("-");
                var type = "";
                var pluginId = parseInt(v[1]);

                this.type = v[0];
                // TODO - separate plugin type
                if (v[0] == 'Template') {
                        type = "template"
                }

                return [type, pluginId]
        },

        getLoadingOverlay: function () {
                return `
                    <div id="loading-overlay" style="display: none">
                        <div class="spinner"></div><span class="message">Loading...</span>
                    </div>
                `;
        },
        getDefaultArticleLayout: function () {
                return `
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
        `
        },
        getDefaultTemplate: function (type, id) {
                if (type == "template") {
                        if (id == 1) {
                                return `
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
                `;
                        } else if (id == 2) {
                                return `
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
                `;
                        } else if (id == 3) {
                                return `
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
                `;
                        } else if (id == 4) {
                                return `
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
                `;
                        } else if (id == 5) {
                                return `
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
                `;
                        } else if (id == 6) {
                                return `
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
                `;
                        }
                }

                return `<div class="col-md-12 plugin-widget-container">`;
        },
        getDefaultBlogCard: function (type, id, data, index) {
                var me = this;

                var body = '';
                var element = '.blog-card-container';
                var pair = false;

                // blog details
                var img = cdnUrl[SEORushEmbeddedObject.guid] + 'user-links-images/' + data[0] + '.png';
                var author = "Alex Plakov";

                if (type == "template") {
                        if (id == 1) {
                                body = `
                                            <div class="blog-card for-blogWidth" data-id="${data[0]}">
                                                <div class="card for-shadow position-relative">
                                                    <div class="card-content">
                                                        <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${img}') center/cover no-repeat;">
                                                        <div class="meta-absolute-wrapper">
                                                            <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-meta">
                                                                <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.formatDate(data[4])}</span>
                                                                <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${author}</span>
                                                            </div>
                                                            <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                            <p class="card-text for-postTextFont for-postTextColor">${data[3]}</p>
                                                            <a href="#" class="read-more-btn for-readMoreTextFont for-readMoreTextColor">Read More</a>
                                                        </div>
                                                    </div>
                                                    <div class="card-background for-backgroundOpacity for-backgroundColor for-backgroundImage"></div>
                                                </div>
                                            </div>
                `;
                        } else if (id == 2) {
                                body = `
                                            <div class="row blog-card" data-id="${data[0]}">
                                                <div class="col-12 card for-blogWidth position-relative">
                                                    <div class="row card-content mt-2 mb-2">
                                                        <div class="col ${index % 2 == 0 ? 'col-left' : 'col-right'} position-relative">
                                                            <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${img}') center/cover no-repeat;">
                                                            <div class="meta-absolute-wrapper">
                                                                <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                    <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col ${index % 2 == 0 ? 'col-right' : 'col-left'}">
                                                            <div class="card-body">
                                                                <div class="card-meta">
                                                                    <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.formatDate(data[4])}</span>
                                                                    <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${author}</span>
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
                `;
                        } else if (id == 3) {
                                // TODO - top X articles are special
                                if (index >= SEORushEmbeddedObject.Const.Template_3_Special_Card) {
                                        var order = (index - SEORushEmbeddedObject.Const.Template_3_Special_Card) % 4;
                                        element = '.default-card-container';
                                        pair = true;
                                        // TODO - adjust column,  parent -- <div class="row">
                                        body = `
                                                <div class="${order == 0 || order == 3 ? 'col-5' : 'col-7'} blog-card has-action ${order == 0 || order == 3 ? 'for-blogWidth' : 'for-blogWidth-100'} " data-id="${data[0]}">
                                                    <img src="/assets/images/blank_10.png" class="cover-image for-shadow" style="background: url('${img}') center/cover no-repeat;">

                                                    <div class="card-body">
                                                        <div class="card-meta">
                                                            <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.formatDate(data[4])}</span>
                                                        </div>
                                                        <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                        <div class="card-meta">
                                                            <div class="personal-info">
                                                                <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${author}</span>
                                                            </div>
                                                            <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                `;
                                }
                        } else if (id == 4) {
                                body = `
                                            <div class="col-sm-6 blog-card for-blogWidth" data-id="${data[0]}">
                                                <div class="card for-shadow position-relative">
                                                    <div class="card-content">
                                                        <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${img}') center/cover no-repeat;">
                                                        <div class="card-body">
                                                            <div class="card-meta">
                                                                <div class="personal-info">
                                                                    <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${author}</span>
                                                                    <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.formatDate(data[4])}</span>
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
                `;
                        } else if (id == 5) {
                                if (index >= SEORushEmbeddedObject.Const.Template_5_Special_Card) {
                                        element = '.list-card-container';
                                        body = `
                                                <div class="blog-card has-action" data-id="${data[0]}">
                                                    <img src="/assets/images/blank_10.png" class="cover-image for-shadow" style="background: url('${img}') center/cover no-repeat;">

                                                    <div class="card-body">
                                                        <div class="card-meta">
                                                            <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.formatDate(data[4])}</span>
                                                        </div>
                                                        <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                        <div class="card-meta">
                                                            <div class="personal-info">
                                                                <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${author}</span>
                                                            </div>
                                                            <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                `;
                                }
                        } else if (id == 6) {
                                body = `
                                                    <div class="blog-card for-blogWidth" data-id="${data[0]}">
                                                        <div class="card for-shadow position-relative">
                                                            <div class="card-content">
                                                                <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${img}') center/cover no-repeat;">
                                                                <div class="card-body">
                                                                    <div class="card-meta">
                                                                    </div>
                                                                    <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                                    <p class="card-text for-postTextFont for-postTextColor">${data[3]}</p>
                                                                    <a href="#" class="read-more-btn for-readMoreTextFont for-readMoreTextColor">Read More</a>
                                                                    <div class="card-meta mt-3">
                                                                        <div class="personal-info">
                                                                            <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${author}</span>
                                                                            <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.formatDate(data[4])}</span>
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
                `;
                        }
                }

                return {element: element, body: body, pair: pair}
        },
        getSpecialBlogCard: function (type, id, data, index) {
                var body = '';
                var element = '';

                var img = cdnUrl[SEORushEmbeddedObject.guid] + 'user-links-images/' + data[0] + '.png';
                var author = "Alex Plakov";

                if (type == "template") {
                        if (id == 1) {
                                body = `

                `;
                        } else if (id == 2) {
                                body = `

                `;
                        } else if (id == 3) {
                                if (index < SEORushEmbeddedObject.Const.Template_3_Special_Card) {
                                        element = '.special-card-container';
                                        body = `
                                            <div class="blog-card ${index % 2 == 0 ? '' : 'right-align'}" data-id="${data[0]}">
                                                <img src="/assets/images/blank_10.png" class="cover-image" style="background: url('${img}') center/cover no-repeat;">

                                                <div class="card-body for-shadow for-blogWidth">
                                                    <div class="card-content">
                                                        <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                        <p class="card-text for-postTextFont for-postTextColor">${data[3]}</p>
                                                        <a href="#" class="read-more-btn for-readMoreTextFont for-readMoreTextColor">Read More</a>
                                                        <div class="card-meta">
                                                            <div class="personal-info">
                                                                <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${author}</span>
                                                                <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.formatDate(data[4])}</span>
                                                            </div>
                                                            <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                                <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="card-background for-backgroundOpacity for-backgroundColor for-backgroundImage"></div>
                                                </div>
                                            </div>
                `;
                                }
                        } else if (id == 4) {
                                body = `
                `;
                        } else if (id == 5) {
                                if (index < SEORushEmbeddedObject.Const.Template_5_Special_Card) {
                                        element = '.favourite-card-container';
                                        body = `
                                            <div class="col blog-card has-action" data-id="${data[0]}">
                                                <img src="/assets/images/blank_10.png" class="cover-image for-shadow" style="background: url('${img}') center/cover no-repeat;">

                                                <div class="card-body">
                                                    <div class="card-meta">
                                                        <span class="date for-dateAuthorDetailFont for-dateAuthorDetailColor">${this.formatDate(data[4])}</span>
                                                    </div>
                                                    <h5 class="card-title for-postTitleFont for-postTitleColor">${data[2]}</h5>
                                                    <div class="card-meta">
                                                        <div class="personal-info">
                                                            <span class="author-name for-dateAuthorDetailFont for-dateAuthorDetailColor">${author}</span>
                                                        </div>
                                                        <div class="likes-info for-blogLikesCounter for-blogLikesCounterOpacity for-blogLikesCounterColor">
                                                            <span><i class="bi bi-heart"></i>${data[5]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                `;
                                }
                        } else if (id == 6) {
                                body = `

                `;
                        }
                }

                return {element: element, body: body}
        },

        showLoading: function (message) {
                if (message == null || message == "") {
                        $("#loading-overlay .message").html("Loading...");
                } else {
                        $("#loading-overlay .message").html(message);
                }

                $("#loading-overlay").show();
        },
        hideLoading: function () {
                $("#loading-overlay").hide();
        },

        update: function (target, value, config) {
                // font
                if (target == 'blogTitleFont') {
                        $(".plugin-widget-container .for-blogTitleFont").css('fontFamily', value);
                } else if (target == 'blogSubTitleFont') {
                        $(".plugin-widget-container .for-blogSubTitleFont").css('fontFamily', value);
                } else if (target == 'postTitleFont') {
                        $(".plugin-widget-container .for-postTitleFont").css('fontFamily', value);
                        $(".blog-article-container .for-postTitleFont").css('fontFamily', value);
                } else if (target == 'postTextFont') {
                        $(".plugin-widget-container .for-postTextFont").css('fontFamily', value);
                        $(".blog-article-container .for-postTextFont").css('fontFamily', value);
                } else if (target == 'dateAuthorDetailFont') {
                        $(".plugin-widget-container .for-dateAuthorDetailFont").css('fontFamily', value);
                        $(".blog-article-container .for-dateAuthorDetailFont").css('fontFamily', value);
                } else if (target == 'readMoreTextFont') {
                        $(".plugin-widget-container .for-readMoreTextFont").css('fontFamily', value);
                }

                // slider
                else if (target == 'coverImageBrightness') {
                        $(".plugin-widget-container .for-coverImageBrightness").css('opacity', value / 100);
                } else if (target == 'blogLikesCounterOpacity') {
                        if (config['isBlogLikesCounter']) {
                                $(".plugin-widget-container .for-blogLikesCounterOpacity").css('opacity', value / 100);
                        }
                } else if (target == 'opacity') {
                        $(".plugin-widget-container .for-backgroundOpacity").css('opacity', value / 100);
                        $(".blog-article-container .for-backgroundOpacity").css('opacity', value / 100);
                } else if (target == 'blogWidth') {
                        $(".plugin-widget-container .for-blogWidth").css('width', value + '%');
                        $(".plugin-widget-container .for-blogWidth-100").css('width', (100 - value) + '%');
                } else if (target == 'topSpacing') {
                        $(".plugin-widget-container .for-topSpacing").css('marginTop', value + 'px');
                } else if (target == 'shadowSize') {
                } else if (target == 'shadowOpacity') {
                } else if (target == 'postLikeCounterSize') {
                        if (config['isPostLikesCounter']) {
                                $(".blog-article-container .for-postLikeCounterSize").css('fontSize', value + 'px');
                        }
                } else if (target == 'titleSize') {
                        $(".blog-article-container .for-postTitleSize").css('fontSize', value + 'px');
                } else if (target == 'textSize') {
                        $(".blog-article-container .for-postTextSize").css('fontSize', value + 'px');
                } else if (target == 'spacing') {
                        $(".blog-article-container .for-postTextSpacing").css('lineHeight', value + 'px');
                } else if (target == 'pluginSize') {
                        $('.btnTouch').css('paddingLeft', (value * 2) + 'px');
                        $('.btnTouch').css('paddingRight', (value * 2) + 'px');
                        $('.btnTouch').css('paddingTop', value + 'px');
                        $('.btnTouch').css('paddingBottom', value + 'px');

                } else if (target == 'rounding') {
                        $('.btnTouch').css('borderRadius', value + 'px');

                } else if (target == 'sideSpacing') {
                        $('.btnTouch>.icon').css('marginRight', value + 'px');
                }

                // input text
                else if (target == 'blogTitleValue') {
                        $(".plugin-widget-container .for-blogTitleText").text(value);
                } else if (target == 'blogSubTitleValue') {
                        $(".plugin-widget-container .for-blogSubTitleText").text(value);
                }

                // yes/no
                else if (target == 'isBlogLikesCounter') {
                        if (value) {
                                $(".plugin-widget-container .for-blogLikesCounter").show();
                        } else {
                                $(".plugin-widget-container .for-blogLikesCounter").hide();
                        }
                } else if (target == 'isBackgroundColor') {

                } else if (target == 'isBackgroundImage') {

                } else if (target == 'isShadow') {
                } else if (target == 'isPostLikesCounter') {
                        if (value) {
                                $(".plugin-widget-container .for-postLikesCounter").show();
                                $(".blog-article-container .for-postLikesCounter").show();
                        } else {
                                $(".plugin-widget-container .for-postLikesCounter").hide();
                                $(".blog-article-container .for-postLikesCounter").hide();
                        }
                }

                // color
                else if (target == 'blogTitleColor') {
                        $(".plugin-widget-container .for-blogTitleColor").css('color', value);

                } else if (target == 'blogSubTitleColor') {
                        $(".plugin-widget-container .for-blogSubTitleColor").css('color', value);

                } else if (target == 'blogLikesCounterColor') {
                        if (config['isBlogLikesCounter']) {
                                $(".plugin-widget-container .for-blogLikesCounterColor").css('color', value);
                        }
                } else if (target == 'postTitleColor') {
                        $(".plugin-widget-container .for-postTitleColor").css('color', value);
                        $(".blog-article-container .for-postTitleColor").css('color', value);
                } else if (target == 'postTextColor') {
                        $(".plugin-widget-container .for-postTextColor").css('color', value);
                        $(".blog-article-container .for-postTextColor").css('color', value);
                } else if (target == 'dateAuthorDetailColor') {
                        $(".plugin-widget-container .for-dateAuthorDetailColor").css('color', value);
                        $(".blog-article-container .for-dateAuthorDetailColor").css('color', value);
                } else if (target == 'readMoreTextColor') {
                        $(".plugin-widget-container .for-readMoreTextColor").css('color', value);
                } else if (target == 'backgroundColor') {
                        if (config['isBackgroundColor']) {
                                $(".plugin-widget-container .for-backgroundColor").css('background', value);
                                $(".blog-article-container .for-backgroundColor").css('background', value);
                        } else {
                        }
                } else if (target == 'shadowColor') {
                } else if (target == 'postLikesCounterColor') {
                        if (config['isPostLikesCounter']) {
                                $(".blog-article-container .for-postLikesCounterColor").css('color', value);
                        }
                } else if (target == 'iconBackgroundColor') {
                        $(".btnTouch").css('backgroundColor', value);

                } else if (target == 'iconForeColor') {
                        $(".btnTouch").css('color', value);

                } else if (target == 'synonymousColor') {
                        // TODO -
                }

                // image
                else if (target == 'coverImage') {
                        if (value == '') {
                                value = '/assets/images/blank_10.png';
                        }

                        $(".plugin-widget-container .for-coverImage").css('background', "url('" + value + "') center/cover no-repeat");
                } else if (target == 'backgroundImage') {
                        if (config['isBackgroundImage']) {
                                if (value == '') {
                                        value = '/assets/images/blank_10.png';
                                }

                                $(".plugin-widget-container .for-backgroundImage").css('background', "url('" + value + "') center/cover no-repeat");
                                $(".blog-article-container .for-backgroundImage").css('background', "url('" + value + "') center/cover no-repeat");
                        } else {
                        }
                }

                // touch icon
                else if (target == "touchPosition") {
                        if (value == "left-top") {
                                $(".btnTouch").css('right', 'auto').css('bottom', 'auto').css('top', '10px').css('left', '24px');
                        } else if (value == "right-top") {
                                $(".btnTouch").css('left', 'auto').css('bottom', 'auto').css('top', '10px').css('right', '40px');
                        } else if (value == "left-bottom") {
                                $(".btnTouch").css('top', 'auto').css('right', 'auto').css('left', '24px').css('bottom', '10px');
                        } else if (value == 'right-bottom') {
                                $(".btnTouch").css('top', 'auto').css('left', 'auto').css('right', '40px').css('bottom', '10px');
                        } else if (value == "left-middle") {
                                $(".btnTouch").css('right', 'auto').css('bottom', 'auto').css('top', '50%').css('left', '24px');
                        } else if (value == "right-middle") {
                                $(".btnTouch").css('left', 'auto').css('bottom', 'auto').css('top', '50%').css('right', '40px');
                        }
                } else if (target == "touchIcon") {
                        $(".btnTouch>.icon").html("<i class='bi " + value + "'></i>");
                }

                // additional
                else if (target == 'synonym') {
                        // TODO
                } else if (target == 'shadow') {
                        if (config['isShadow']) {
                                var color = this.hexToRgb(value.color);
                                $(".plugin-widget-container.active .for-shadow").css('boxShadow', value.size + "px " + value.size + "px " + (parseInt(value.size) * 2) + "px rgba(" + color.red + ", " + color.green + ", " + color.blue + ", " + (parseInt(value.opacity) / 100) + ")");
                        } else {
                                $(".plugin-widget-container.active .for-shadow").css('boxShadow', 'none');
                        }
                }
        },
        updatePostLayout: function (layout) {
                if (layout == '1-row') {
                        $(".blog-article-container .article-wrapper>div").removeClass('order-1').removeClass('order-2');
                        $(".blog-article-container .article-wrapper>div").removeClass('col-6').addClass('col-12');
                } else {
                        $(".blog-article-container .article-wrapper>div").removeClass('col-12').addClass('col-6');
                        if (layout == '2-column-right') {
                                $(".blog-article-container .article-blog-area").removeClass('order-2').addClass('order-1');
                                $(".blog-article-container .article-cover-area").removeClass('order-1').addClass('order-2');
                        } else {
                                $(".blog-article-container .article-cover-area").removeClass('order-2').addClass('order-1');
                                $(".blog-article-container .article-blog-area").removeClass('order-1').addClass('order-2');
                        }
                }
        },
        updateLayout: function (data) {
                var me = this;
                var config = {}, shadow = {
                        color: '#000000',
                        size: 1,
                        opacity: 0
                };

                $.each(data.is, function (index, row) {
                        config[row.name] = row.value;
                        me.update(row.name, row.value);
                });

                $.each(data.textfields, function (index, row) {
                        me.update(row.name, row.value, config);
                });

                $.each(data.fonts, function (index, row) {
                        me.update(row.name, row.value, config);
                });

                $.each(data.colors, function (index, row) {
                        if (row.name == 'shadowColor')
                                shadow.color = row.value;
                        me.update(row.name, row.value, config);
                });

                $.each(data.sliders, function (index, row) {
                        if (row.name == 'shadowSize')
                                shadow.size = row.value;
                        else if (row.name == 'shadowOpacity')
                                shadow.opacity = row.value;
                        me.update(row.name, row.value, config);
                });

                // cover image
                me.update('coverImage', data.image.cover, config);
                me.update('backgroundImage', data.image.background, config);

                // touch icon
                if (data.touch.icon != null) {
                        me.update("touchIcon", data.touch.icon, config);
                }

                if (data.touch.position != null) {
                        me.update("touchPosition", data.touch.position, config);
                }

                // additional
                me.update("synonym", data.synonym, config);
                if (data.post != null && data.post.layout != "")
                        me.updatePostLayout(data.post.layout);
                me.update("shadow", shadow, config);
        },

        loadMyBlogPosts: function (configs) {
                var me = this;
                var json = {};
                json['userId'] = userId[this.guid];
                json['guid'] = this.guid;

                me.showLoading();

                $.ajax({
                        url: apiUrl + 'getMyJsonUserBlogGuest',
                        dataType: 'json', async: true,
                        type: 'POST', data: json,
                        success: function (json) {
                                console.log('getMyJsonUserBlogGuest result ' + JSON.stringify(json));
                                if (json != null && json['list']) {
                                        me.refreshLayout(json['list'], configs);
                                } else {
                                        me.hideLoading()
                                }
                        },
                        error: function () {
                                me.hideLoading();
                        }
                });
        },
        getMyBlogPost: function (linkId, isModal) {
                var me = this;
                var json = {};
                json['userId'] = userId[this.guid];
                json['guid'] = this.guid;
                json['linkId'] = linkId;

                me.showLoading();
                $.ajax({
                        url: apiUrl + 'getMyJsonUserBlogPostGuest',
                        dataType: 'json', async: true,
                        type: 'POST', data: json,
                        success: function (json) {
                                me.hideLoading();
                                console.log('getMyJsonUserBlogPostGuest result ' + JSON.stringify(json));
                                if (json != null && json['obj']) {
                                        me.showMyBlogPost(json['obj'], isModal);
                                }
                        },
                        error: function () {
                                me.hideLoading();
                        }
                });
        },
        showMyBlogPost: function (data, isModal) {
                var img = cdnUrl[SEORushEmbeddedObject.guid] + 'user-links-images/' + data.id + '.png';
                $(".blog-article-container .article-blog-area h1").text(data.title);
                $(".blog-article-container .article-blog-area p").html(data.text);
                $(".blog-article-container .article-cover-area img").css('background', `url('${img}') center/cover no-repeat`);
                $(".blog-article-container .article-blog-area .date").text(this.formatDate(new Date(data.dateCreated.time).toISOString()));
                $(".blog-article-container .article-blog-area .likes-info span").html('<i class="bi bi-heart"></i>' + data.wordsCount);

                if (isModal)
                        $(".blog-article-container").removeClass('opacity-0');
                else
                        $(".blog-article-container").fadeIn();
                setTimeout(function () {
                        $(".blog-article-container .background-container").css('height', ($(".blog-article-container .article-wrapper").height() + 64) + 'px');
                }, 100)
        },

        refreshLayout: function (posts, configs) {
                var me = this;
                var pair = -1;
                var pair_element = "";
                var pair_content = "";

                $.each(posts, function (index, post) {
                        var d_card = me.getDefaultBlogCard(me.templateType, me.templateID, post, index);
                        var s_card = me.getSpecialBlogCard(me.templateType, me.templateID, post, index);

                        // TODO - add default card to container
                        if (d_card.element != '') {
                                if (d_card.pair) {
                                        pair++;
                                        if (pair % 2 == 0)
                                                pair_content += '<div class="row">';

                                        pair_element = d_card.element;
                                        pair_content += d_card.body;

                                        if (pair % 2 == 1)
                                                pair_content += '</div>';
                                } else
                                        $(".plugin-widget-container " + d_card.element).append(d_card.body);
                        }

                        // TODO - add special card to container
                        if (s_card.element != '') {
                                $(".plugin-widget-container " + s_card.element).append(s_card.body);
                        }
                });

                if (pair > 0) {
                        if (pair % 2 == 1)
                                pair_content += '</div>';
                        $(".plugin-widget-container " + pair_element).append(pair_content);
                }

                me.updateLayout(configs);

                // events
                $(".btnTouch").on('click', function (e) {
                        e.preventDefault();

                        $(".plugin-widget-container").fadeIn();
                        $("#preview_widget").addClass('overlay');
                        $(".btnTouch").fadeOut();

                        setTimeout(function () {
                                $(".plugin-widget-container .background-container").css('height', ($(".plugin-widget-container .blog-card-wrapper").height() + $(".plugin-widget-container .blog-header").height() + 200 + 60) + 'px');
                        }, 100)
                });

                $(".plugin-widget-container").on('click', '.blog-card .read-more-btn', function (e) {
                        e.preventDefault();
                        me.getMyBlogPost($(this).closest('.blog-card').attr('data-id'), $(this).closest('.plugin-widget-container').hasClass('has-blog-article'));
                });

                $(".plugin-widget-container").on('click', '.blog-card.has-action', function (e) {
                        e.preventDefault();
                        me.getMyBlogPost($(this).attr('data-id'), $(this).closest('.plugin-widget-container').hasClass('has-blog-article'));
                });

                $(".blog-article-container").on('click', '.close_btn', function (e) {
                        e.preventDefault();
                        $(".blog-article-container").fadeOut();
                });

                me.hideLoading();
        },

        init: function (data, addPowerBy) {
                var me = this;

                me.id = data[0];
                var v = this.getPluginType(data[2])
                var template = this.getDefaultTemplate(v[0], v[1]);
                me.templateType = v[0];
                me.templateID = v[1];

                var configs = JSON.parse(data[4]);
                console.log("blog template------------", data, configs, addPowerBy);

                $("#preview_widget").html("");
                var button = $(`<button class="btnTouch"><span class="icon"><i class="bi ${configs.touch.icon}"></i></span> <span class="text"></span></button>`);
                $("#preview_widget").append(button);
                $("#preview_widget").append(template);
                $('body').append(me.getLoadingOverlay());

                if ($(".plugin-widget-container.has-blog-article").length > 0) {

                } else {
                        var blog = this.getDefaultArticleLayout();
                        $("#preview_widget").append(blog);
                }

                //
                me.updateLayout(configs);
                me.loadMyBlogPosts(configs);

                // TODO - remove logo if neccessary
                // if (!addPowerBy) {
                //         $("#preview_widget .logo-area").remove();
                // }
        },
};

if (realSite) {
        loadCss('assets/css/bootstrap.min.css');
        loadCss('assets/css/bootstrap-icons.min.css');
        loadCss('assets/css/seoRush.css');

        SEORushEmbeddedObject.guid = getAppGuid();
        $('body').prepend('<div id="preview_widget"></div>');
        if (widgets[SEORushEmbeddedObject.guid] != null && widgets[SEORushEmbeddedObject.guid].length > 0)
                SEORushEmbeddedObject.init(widgets[SEORushEmbeddedObject.guid][0], addPoweredBy[SEORushEmbeddedObject.guid])
}