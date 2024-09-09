 

function showAppOptimize() { 
    createBlogCategoriesSelect();
    loadAllLandingPages();
 
}
  
function loadAllLandingPages() {
    $('#pagesUl').html('');
    // if (isDev()) {
    //     var json = JSON.parse(lpJson);
    //     drawTopSelect(json.list);
       
    // } else {
    //     $.getJSON(apiUrl + 'jsonLandingPage', function (json) { 
    //         drawTopSelect(json);
    //     });
    // } 
     $.getJSON('https://rabbitseo.com/' + 'jsonLandingPage', function (json) { 
        
        console.log(json['list']);
         var json = json['list'];
          drawTopSelect(json);
        });
    // if (isDev()) {
    //      $.getJSON(apiUrl + 'lpJson.json', function (data) { 
    //         console.log(data);
    //         var  list = data['list'];
    //         drawTopSelect(list);
            
    //     });
       
    // } else {
    //     $.getJSON(apiUrl + 'jsonLandingPage', function (json) { 
    //         drawTopSelect(list);
    //     });
    // }
}
function applyHowToChangeLink(ahref, wixUrl, shopifyUrl, weeblyUrl) {
    ahref = '#' + ahref + ' a.howToChangeLink';
    if (isWixUserOrWixLinksUser()) {
        $(ahref).attr("href", wixUrl);
    } else if (isShopifyUser()) {
        $(ahref).attr("href", shopifyUrl);
    } else if (appDomainName === 'Weebly') {
        $(ahref).attr("href", weeblyUrl);
    } else {
        $(ahref).hide();
    }
    $(ahref).html('Instructions')
}

function drawTopSelect(json){ 
   
     const landingpagenew = [];
      pagesCount = 0, sumWarnings = 0, sumSevere = 0, sumSuccess = 0,
        sumScore = 0, sumTitleIssues = 0, sumMetaDescIssues = 0, sumOtherMetaIssues = 0,
        sumKeywordsIssues = 0, sumWords = 0, sumH1Issues = 0, sumKeywordDensity = 0,
        warningsArr = [], severeArr = [];


     for (let i = 0; i < json.length; i++) {
       
        const pageId = json[i]["id"];
        const pageUrl = json[i]["pageUrl"];
       // let shortPageUrl = pageUrl.substring(pageUrl.indexOf('/'));
        let title = json[i]["title"];

        let optScore = json[i]["optScore"]; 
        let scoreClass = ""

        title = title && title !== 'null' && title.length > 0 ? title : "<span class='text-danger'>Title Not Found</span>";
     
        if (optScore>=80) {
            scoreClass='bg-success';
            scoreText='Outstanding';
            scoreProgress='success'; 
        }else if(optScore>=60){
            scoreClass='bg-success-soft';
            scoreText='Satisfactory';
            scoreProgress='success-light';
        }else if(optScore>=40){
            scoreClass='bg-warning';
            scoreText='Moderate';
            scoreProgress='warning';
        }else if(optScore>=20){
            scoreClass='bg-danger-soft';
            scoreText='High Priority';
            scoreProgress='danger-light';
        }else{
            scoreClass='bg-danger';
            scoreText='Critical';
            scoreProgress='danger';
        }
      
            const pinfo = { id: pageId , pageUrl:pageUrl, text: '<div class="d-flex align-items-center gap-2 select2_customs" title="'+pageUrl+'"> <span class="p-1 px-4 rounded-pill text-light '+scoreClass+'">'+scoreText+'</span> <span class="pageurls">'+pageUrl+'</span>  <div class="ms-auto progress_drop"><div class="progress '+scoreProgress+'"> <div class="progress-bar" role="progressbar" style="width: '+optScore+'%" aria-valuenow="'+optScore+'" aria-valuemin="0" aria-valuemax="100"></div> </div></div> <div class="progressreport ms-auto"> <div class="d-flex mb-2">'+scoreText+' <div  class="ms-auto"><img src="/assets/images/optimize/question.png"></div></div> <div class="progress '+scoreProgress+'"> <div class="progress-bar" role="progressbar" style="width: '+optScore+'%" aria-valuenow="'+optScore+'" aria-valuemin="0" aria-valuemax="100"></div> </div> </div></div>'};

            landingpagenew[i]=pinfo;


        let newKeyworklist = json[i].keyword.split(',');

        
      
        $("[id^=OptimizationarticleCategories]").select2({
            tokenSeparators: [',', ', ', '\n'],
            // selectOnClose: true,
            closeOnSelect: false,
            data:newKeyworklist,
            maximumSelectionLength: 3,
            tags: true, 
            placeholder: 'Choose Category (max 3)',
        });
        $('[id^=OptimizationarticleCategories]').val(json[0].keyword);
     }

    $('#ChooseLandingPage').select2({
        placeholder: "Please select a country", 
        data: landingpagenew,
        templateResult: function(d) {
            return $(d.text);
        },
        templateSelection: function(d) {
            return $(d.text);
        },
    });

    if (json[0]["testResult"]) { 
        globalLandingJson = json[0];
        drawSinglePage(json[0]);
    } 
 
   // $('#rescanpages').attr("href", "javascript: refreshPage(" + id + ")") 
   // function refreshPage(id){
   //  var vv = $("#ChooseLandingPage").val();
  
   // }
    $( "body" ).delegate( "#ChooseLandingPage", "change", function() {
      //alert()
       for (let j = 0; j < json.length; j++) { 
         if (json[j].id == this.value ) {
             globalLandingJson = json[j];
             drawSinglePage(json[j]);
            
         }  

       }
       
    });
    
    
}

// single page
let currPageUrl, divId, warnings = 0, severe = 0, success = 0;
function allInstructions(){
    applyHowToChangeLink('pageTitleSection', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageTitleLength', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageMetaDescriptionTag', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageH1TagLength', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageMetaSiteNameTag', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageMetaSiteURLTag', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageExternalLinkCount', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageInternalLinksCount', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageKeywordDensity', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageTitleWithKeyword', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageH1TagWithKeyword', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageMetaDescriptionWithKeyword', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageKeywordDensityTechnology', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageTitleWithKeywordTechnology', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");
    applyHowToChangeLink('pageH1TagWithKeywordTechnology', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag"); 
    applyHowToChangeLink('pageMetaDescriptionWithKeywordTechnology', "https://support.wix.com/en/article/adding-seo-page-titles-and-descriptions-meta-tags",
        "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page",
        "https://www.weebly.com/seo/title-tag");



}

function optimizeSingleKeyword(json,keyword){

    let keywordTremH1TagNew;

    if (!json.keywordTerm === keyword) {  
          keywordTremH1TagNew = "H1 tag doesn't contain the keyword '" + keyword + "', add it to improve your rankings.";
       // $('.pagekeywordTerm').text(msg);
    } else {
          keywordTremH1TagNew = "H1 tag contains the keyword '" + keyword + "', great job!";
       // $('.pagekeywordTerm').text(msg);
    }
    // Meta Description With Keyword 
    let metaDescContainsKeyword;
    if (!json.metaDescContainsKeyword === keyword) { 
       metaDescContainsKeyword = "Meta Description Tag doesn't contain the keyword '" +keyword + "'";
       // $('.pagemetakeywordTerm').text(msg);
    } else {
        metaDescContainsKeyword = "Meta Description Tag contains the keyword '" + keyword + "'";
       // $('.pagemetakeywordTerm').text(msg);
    }

    // 
    let msgkeywordDensity ;
    if (!json.keywordDensity || json.keywordDensity === '') { 
         msgkeywordDensity = "Missing";
        //$('.msgkeywordDensity').text(msg);
    } else {
         msgkeywordDensity = "" + json.keywordDensity + "";
       // $('.msgkeywordDensity').text(msg); 
    }
    var scoreText = 'Satisfactory';
    var optScore = 30;
    var scoreProgress = 30;
 

  $('.showKeywordOptimizer').append( 
    `<div class="mb-4 optimize_box_list">
    <div class="d-flex  mb-3">
        <div class="header_optimize_box_list">
            <h3 class="subheading m-0"><span class="text-dark">Keyword</span> <span>${keyword}</span></h3>
            <div>
                <div class="progressreport ms-auto d-block">
                    <div class="d-flex mb-2">${scoreText}</div>
                    <div class="pageOptimizerNewValue">
                        <div class="progress ${scoreProgress}">
                          <div class="progress-bar" role="progressbar" style="width: ${optScore}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div> 
    </div>
    
    <div class="row">
        <div class="col-md-6 mb-3">
            <div class="optimize_box">
                <div class="optimize_box_header">
                    <div><img src="assets/images/optimize/keyword_density.png"> Keyword Density <a href="#" class="ms-2 text-info text-decoration-none" onclick="applyHowToChangeLink('ahref', 'wixUrl', 'shopifyUrl', 'weeblyUrl')"> Instructions </a> </div>
                    <div class="ms-auto"><img src="assets/images/optimize/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="Enter a keyword that you would like to promote and we will suggest topics for articles for the chosen keyword"></div>

                </div>
                <div class="optimize_box_content">
                    <h6>Your Keyword Density </h6>
                    <p><span class="msgkeywordDensity">${msgkeywordDensity}</span></p> 
                    <h6>Recommendation</h6>
                    <p>Add it more and improve your rankings</p>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-3">
            <div class="optimize_box">
                <div class="optimize_box_header">
                    <div><img src="assets/images/optimize/title_with_keyword.png"> Title With Keyword <a href="#" class="ms-2 text-info text-decoration-none" onclick="applyHowToChangeLink('ahref', 'wixUrl', 'shopifyUrl', 'weeblyUrl')"> Instructions </a> </div>
                    <div class="ms-auto"><img src="assets/images/optimize/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="Enter a keyword that you would like to promote and we will suggest topics for articles for the chosen keyword"></div>

                </div>
                <div class="optimize_box_content">
                    <h6>The keyword is missing </h6>
                    <p><span>${keyword}</span></p>
                    <h6>Recommendation</h6>
                    <p>Add the Keyword in the title</p>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-3">
            <div class="optimize_box">
                <div class="optimize_box_header">
                    <div><img src="assets/images/optimize/h1_tag_with_keyword.png"> H1 Tag With Keyword  <a href="#" class="ms-2 text-info text-decoration-none" onclick="applyHowToChangeLink('ahref', 'wixUrl', 'shopifyUrl', 'weeblyUrl')"> Instructions </a> </div>
                    <div class="ms-auto"><img src="assets/images/optimize/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="Enter a keyword that you would like to promote and we will suggest topics for articles for the chosen keyword"></div>

                </div>
                <div class="optimize_box_content">
                    <h6>The keyword is missing </h6>
                    <p> <span class="pagekeywordTerm">${keywordTremH1TagNew}</span></p>
                    <h6>Recommendation</h6>
                    <p>add it to improve your rankings.</p>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-3">
            <div class="optimize_box">
                <div class="optimize_box_header">
                    <div><img src="assets/images/optimize/meta_with_keyword.png"> Meta Description With Keyword <a href="#" class="ms-2 text-info text-decoration-none" onclick="applyHowToChangeLink('ahref', 'wixUrl', 'shopifyUrl', 'weeblyUrl')"> Instructions </a> </div>
                    <div class="ms-auto"><img src="assets/images/optimize/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="Enter a keyword that you would like to promote and we will suggest topics for articles for the chosen keyword"></div>

                </div>
                <div class="optimize_box_content">
                    <h6>Your Meta Description</h6>
                    <p><span class="pagemetakeywordTerm">${metaDescContainsKeyword}</span></p>
                    <h6>Recommendation</h6>
                    <p>Make to 50-150 Chars Length</p>
                </div>
            </div>
        </div> 
    </div>

</div>` );   
  

}
var globalLandingJson;
function drawSinglePage(jsonData, pageUrl, pageId) {
 
 
    currPageUrl = jsonData.pageUrl;
 
    warnings = 0, severe = 0, success = 0;
    totalTests = 0;
    divId = "pageId" + jsonData.pageId;

   
   $('[id^=OptimizationarticleCategories]').val(jsonData.keyword);
   $('[id^=OptimizationarticleCategories]').trigger('change'); 


    allInstructions();


 
    var json = JSON.parse(jsonData.testResult);
    globalLandingJson = json;

    console.log(json);
    let optScore = jsonData.optScore;
    let scoreClass='';
    let scoreText='';
    let scoreProgress='';
    if (optScore>=80) {
        scoreClass='bg-success';
        scoreText='Outstanding';
        scoreProgress='success'; 
    }else if(optScore>=60){
        scoreClass='bg-success-soft';
        scoreText='Satisfactory';
        scoreProgress='success-light';
    }else if(optScore>=40){
        scoreClass='bg-warning';
        scoreText='Moderate';
        scoreProgress='warning';
    }else if(optScore>=20){
        scoreClass='bg-danger-soft';
        scoreText='High Priority';
        scoreProgress='danger-light';
    }else{
        scoreClass='bg-danger';
        scoreText='Critical';
        scoreProgress='danger';
    }
    $('.pageOptimizerNewTitle').text(scoreText);
    $('.pageOptimizerNewValue .progress').removeClass('success success-light warning danger-light danger');

   $('.pageOptimizerNewValue .progress').addClass(scoreProgress);
     $('.pageOptimizerNewValue .progress-bar').css('width', '0%');
    $('.pageOptimizerNewValue .progress-bar').css('width', optScore+'%');

    // Page Content
    if (!json.wordsCount || json.wordsCount === '') { 
        const msg = "Missing";
        $('.WordsCount').text(msg);
    } else {
        const msg = "" + json.wordsCount + "";
       $('.WordsCount').text(msg);
    }
    
    // Title Length
    if (!json.pageTitleLength || json.pageTitleLength === '') { 
        const msg = "Missing";
        $('.titleChars').text(msg);
    } else {
        const msg = "" + json.pageTitleLength + "";
       $('.titleChars').text(msg);
    } 

    // Meta Description Tag Length  

    var metaDescLength = 0;
    if (typeof json.metaDesc ==='undefined') {
         metaDescLength = 0;
    }else{
         metaDescLength = json.metaDesc.length;
    }
     
    if (!metaDescLength || metaDescLength === '') { 

        const msg = "Missing";
        $('.metaDescLength').text(msg);
    } else {
        const msg = "" + metaDescLength + "";
       $('.metaDescLength').text(msg);
    }
     
 // H1 Tag Length 
    if (!json.H1Length || json.H1Length === '') { 
        const msg = "Missing";
        $('.msgH1Length').text(msg);
    } else {
        const msg = "" + json.H1Length + "";
       $('.msgH1Length').text(msg);
    }
     
    // Meta Site Name Tag
    if (!json.metaOgSiteName || json.metaOgSiteName === '') { 
        const msg = "Missing";
        $('.msgmetaOgSiteName').text(msg);
    } else {
        const msg = "" + json.metaOgSiteName + "";
       $('.msgmetaOgSiteName').text(msg);
    }

    // Meta Site URL Tag
    if (!json.metaOgSiteUrl || json.metaOgSiteUrl === '') { 
        const msg = "Missing";
        $('.msgmetaOgSiteUrl').text(msg);
    } else {
        const msg = "" + json.metaOgSiteUrl + "";
       $('.msgmetaOgSiteUrl').text(msg);
    }
    // External Link Count
    if (!json.metaOgSiteUrl || json.metaOgSiteUrl === '') { 
        const msg = "Missing";
        $('.msgmetaOgSiteUrl').text(msg);
    } else {
        const msg = "" + json.metaOgSiteUrl + "";
       $('.msgmetaOgSiteUrl').text(msg);
    }

    // External Link Count
    // console.log(json); 
    // console.log(jsonData.keyword); 

    //   console.log(json.keywordDensity); 
    // console.log(json.content); 
   
    // External Link Count
    if (!json.linksIn || json.linksIn === '') { 
        const msg = "Missing";
        $('.currentExternalLink').text(msg);
    } else {
        const msg = "" + json.linksIn + "";
       $('.currentExternalLink').text(msg);
    }
     // External Link Count
    if (!json.linksOut || json.linksOut === '') { 
        const msg = "Missing";
        $('.currentInternalLink').text(msg);
    } else {
        const msg = "" + json.linksOut + "";
       $('.currentInternalLink').text(msg);
    }


    let newKeywork = jsonData.keyword.split(',');

    var assigneedata = [];
     var msgkeyword = [];

     for (let i = 0; i < newKeywork.length; i++) { 
        var str = jsonData.title;
      
         if(str.indexOf(newKeywork[i])){
            
            msgkeyword.push(newKeywork[i]);
           
        }else{ 
           
            msgkeyword.push(newKeywork[i]);
           
        }
     } 



 $('.pageTitleContainsKeyword').text(msgkeyword);

    // Title With Keyword
    // if (!json.pageTitleContainsKeyword) { 
    //     const msg = "" + json.keywordTerm + "";
    //     $('.pageTitleContainsKeyword').text(msg);
    // } else {
    //     const msg = "" + json.keywordTerm + "";
    //      $('.pageTitleContainsKeyword').text(msg);
    // }
    // H1 Tag With Keyword



     // title testing
 // 'scoreText':scoreText,'optScore':optScore,'scoreProgress':scoreProgress,

    // let keyword = json.keywordTerm;
    // optimizeSingleKeyword(json,keyword)
     
 }

 
// function initBlogCategories(data) {
//     console.log('createBlogCategoriesSelect json ' + JSON.stringify(data));
//     if (data && data['list']) {
//         var list = data['list'];
//         let blogCats = [];
//         for (let i = 0; i < list.length; i++) {
//             blogCats.push(decodeEntities(list[i]));
//         }
//         console.log('initBlogCategories blogCats is ' + JSON.stringify(blogCats));
//         $("[id^=OptimizationarticleCategories]").select2({
//             tokenSeparators: [',', ', ', '\n'],
//             // selectOnClose: true,
//             closeOnSelect: false,
//             data: blogCats.sort(),
//             maximumSelectionLength: 3,
//             tags: false,
//             placeholder: 'Choose Category (max 3)',
//         });
//         $("[id^=OptimizationarticleCategories]").change(function () {
//             let count = $(this).select2('data').length;
//             console.log('articleCategories count ' + count);
//             if (count === 1 && (!lastLoadCat || lastLoadCat !== $(this).val())) {
//                 lastLoadCat = $(this).val();
//                 loadImagesByQuery(lastLoadCat);
//             }
//         });

     

//     }
// }
//  function createBlogCategoriesSelect() {
//     const blogDomain = modifyMode ? $("div#modifyArticleSection .blogUrl").val() : $("#blogDomains").val();
//     if (!isDev() && blogDomain) {
//         $.getJSON(apiUrl + 'getMyJsonBlogsCategoriesGeneric?blogDomain=' + blogDomain, function (data) {
//             initBlogCategories(data);
//         });
//     } else {
//         initBlogCategories(blogCatsDevJson);
//     }
// }

$("[id^=OptimizationarticleCategories]").change(function () {
    let countKeyword = $(this).val(); 
    $('.showKeywordOptimizer').html('');
    for (let i = 0; i < countKeyword.length; i++) { 
        optimizeSingleKeyword(globalLandingJson,countKeyword[i])


    }

})
