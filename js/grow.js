$(function () {
    $("[class^=\"grow-\"]").each(function() {
        var $current = $(this);
        while($current.prop("tagName") !== 'BODY' && !$current.parent().hasClass("growable")) {
            console.log($current);
            $current = $current.parent();
            $current.addClass("growable");
            if(!$current.hasClass("grow")) {
                $current.addClass("grow");
            }
        }
    });
});