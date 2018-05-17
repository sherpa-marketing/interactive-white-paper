(function() {
    function get() {
        var url = window.location.search.substring(1);
        var tuples = url.split('&');
        var params = {};
        for (var i = 0; i < tuples.length; ++i) {
            var param = tuples[i].split('=');
            if (param[0].indexOf('utm_') === 0 || param[0] === 'cb') {
                params[param[0]] = param[1];
            }
        }
        return params;
    }

    var iframe = document.getElementById("interactive-asset");
    if (iframe && iframe.dataset.src) {
        var src = iframe.dataset.src;
        var params = get();
        Object.keys(params).forEach(function(key, index) {
            src +=  (src.indexOf('?') < 0) ? '?' : '&';
            src += key + "=" + params[key];
        });
        iframe.src = src;
    }
})();
