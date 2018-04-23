$(function() {
    var $carousel = $('.main-carousel');

    $('.scrollsnap-next').on( 'click', function() {
        $carousel.flickity('next');
    });

    $carousel.on('ready.flickity', function( event, index ) {
        console.log('Flickity ready');
        setTimeout(function() {
            var flick = $carousel.data('flickity');
            $(flick.selectedElement).find("[data-animation]").each(function () {
                $(this).addClass("animated " + $(this).data("animation"));
            });
        }, 10)
    });

    $carousel.on('settle.flickity', function( event, index ) {
        console.log( 'Flickity settled at ' + index );

        var flick = $carousel.data('flickity');
        $carousel.find("[data-animation]").each(function () {
            $(this).removeClass("animated");
            $(this).removeClass($(this).data("animation"));
        });

        console.log(flick.selectedElement);
        $(flick.selectedElement).find("[data-animation]").each(function () {
            $(this).addClass("animated " + $(this).data("animation"));
        });
    });

    $carousel.flickity({
        cellAlign: 'left',
        contain: true,
        // fullscreen: true,
        pageDots: false
    });

    $carousel.focus();
});