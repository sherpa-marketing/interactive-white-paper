$(function () {
    $("[data-radio-sync-target]").each(function(event) {
        var $target = $('#' + $(this).data('radio-sync-target'));
        $(this).checkbox({
            onChecked: function() { $target.checkbox('set checked'); },
            onUnchecked: function() { $target.checkbox('set unchecked'); }
        });
    });
});