$(function () {
    var $carousel = $('.main-carousel');
    var flick = $carousel.data('flickity');
    $(".rspca-nav").each(function() {
        var $nav = $(this);
        $nav.find('> .column').click(function() {
            var $item = $(this);
            var pages = $item.index() - $item.parent().find('.active').index();
            $carousel.flickity('select', flick.selectedIndex + pages, false, false);
        });
    });
});