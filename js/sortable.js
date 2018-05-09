$(function () {
    function update($sortable) {
        if ($sortable.data('sortable-input')) {
            var items = $sortable
                .find('li')
                .map(function() { return $(this).text(); })
                .get()
                .join(', ');
            $($sortable.data('sortable-input')).val(items);
        }
    }

    $(".sortable").each(function() {
        var $this = $(this);
        Sortable.create(this, {
            dragoverBubble: true,
            dropBubble: true,
            onUpdate: function() { update($this); }
        });
        update($this);
    });
});