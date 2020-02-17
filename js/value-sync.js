$(function () {
    $("[data-value-source]").each(function() {
        var $target = $(this);
        var $source = $('#' + $(this).data('value-source'));
        $target.text($source.val());
        $source.change(function() {
            $target.text($source.val());
        });
    });
});