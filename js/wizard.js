$(function () {
    $(".wizard").each(function() {
        var $this = $(this);
        $this.find('.wizard-page').each(function() {
            var $page = $(this);
            $page.find('.wizard-next').click(function() {
                $page.toggleClass('active', false);
                $page.next('.wizard-page').toggleClass('active', true);
            });
        });
    });
});