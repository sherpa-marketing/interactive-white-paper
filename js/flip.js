$(function() {
    $("[data-flip-target]").each(function() {
        var $this = $(this);
        $this.click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            var target = $($this.data("flip-target"));
            target.shape('flip.over');
            return false;
        });
    });
}());