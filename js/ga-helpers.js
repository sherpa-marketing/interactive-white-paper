$(function() {
    var $carousel = $('.main-carousel');

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function cuid() {
        var cuid = localStorage.getItem('cuid');
        if (!cuid) {
            cuid = guid();
            localStorage.setItem('cuid', cuid);
        }
        return cuid;
    }

    function sendPage() {
        if (ga) {
            var flick = $carousel.data('flickity');
            ga('set', 'page', window.location.pathname + "/" + $(flick.selectedElement).data('ga-page'));
            ga('set', 'dimension1', $carousel.data('ga-dimension1'));
            ga('set', 'dimension2', cuid());
            ga('set', 'userId', cuid());
            ga('send', 'pageview');
        }
    }

    $('[data-ga-event-category]').click(function() {
        $this = $(this);
        if (ga) {
            ga('send', 'event', {
                eventCategory: $this.data('ga-event-category'),
                eventAction: $this.data('ga-event-action')
            });
        }
    });

    $carousel.on('settle.flickity', sendPage);
    sendPage();
});