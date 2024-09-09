(function ($) {
    var Defaults = $.fn.select2.amd.require('select2/defaults');
    $.extend(Defaults.defaults, {
        searchInputPlaceholder: ''
    });
    var SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search');
    var _renderSearchDropdown = SearchDropdown.prototype.render;
    SearchDropdown.prototype.render = function (decorated) {
        // invoke parent method
        var $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));
        this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));
        return $rendered;
    };
})(window.jQuery);

function addMatomo() {
    if (!isDev() && location && !location.toString().includes("localhost") && !location.toString().includes("127.0.0.1")) {
        console.log('start matomo rabbit');
        // var _paq = window._paq = window._paq || [];
        // /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        // _paq.push(['trackPageView']);
        // _paq.push(['enableLinkTracking']);
        // (function() {
        //     var u="//blog.rabbitseo.com/matomo/";
        //     _paq.push(['setTrackerUrl', u+'matomo.php']);
        //     _paq.push(['setSiteId', '1']);
        //     var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        //     g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        // })();
        <!-- Matomo -->
        try {
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function () {
                var u = "https://rabbitseo.matomo.cloud/";
                _paq.push(['setTrackerUrl', u + 'matomo.php']);
                _paq.push(['setSiteId', '2']);
                var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                g.async = true;
                g.src = 'https://cdn.matomo.cloud/rabbitseo.matomo.cloud/matomo.js';
                s.parentNode.insertBefore(g, s);
            })();
        } catch (e) {
            console.log(e);
        }
    }
}

function addHotjar(id) {
    if (!isDev() && !isShopifyUser() && location && !location.toString().includes("localhost") && !location.toString().includes("127.0.0.1")) {
        console.log('start addHotjar ' + id);
        <!-- Hotjar Tracking Code for 123content.net -->
            (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:id,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    }
}

function addLiveChat() {
    // var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    // (function () {
    //     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    //     s1.async = true;
    //     s1.src = 'https://embed.tawk.to/62fb9ff354f06e12d88ef3b8/1gajehk33';
    //     s1.charset = 'UTF-8';
    //     s1.setAttribute('crossorigin', '*');
    //     s0.parentNode.insertBefore(s1, s0);
    // })();

    if (!isTestingMode()) {
        (function (d, src, c) {
            var t = d.scripts[d.scripts.length - 1], s = d.createElement('script');
            s.id = 'la_x2s6df8d';
            s.defer = true;
            s.src = src;
            s.onload = s.onreadystatechange = function () {
                var rs = this.readyState;
                if (rs && (rs != 'complete') && (rs != 'loaded')) {
                    return;
                }
                c(this);
            };
            t.parentElement.insertBefore(s, t.nextSibling);
        })(document,
            'https://seotools.ladesk.com/scripts/track.js',
            function (e) {
                LiveAgent.createButton('pqt7cmsx', e);
            });
    }

}
