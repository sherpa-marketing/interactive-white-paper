function Pages(container) {
    var that = this;
    this.wrapper = $("<div></div>");
    this.container = $(container);
    this.pages = this.container.find("> section");
    this.current = 0;

    this.wrapper.insertAfter(this.container);
    this.wrapper.append(this.container);
    this.wrapper.css({"overflow": "hidden"});
    this.container.css({
        "overflow-x": "scroll",
        "overflow-y": "hidden",
        "white-space": "nowrap"
    });

    this.container.contents().filter(
        function() { return (this.nodeType === 3 && !/\S/.test(this.nodeValue)); })
        .remove();

    this.findMaxPageHeight = function() {
        var height = 0;
        for (var i = 0; i < this.pages.length; ++i) {
            height = Math.max(height, $(this.pages[i]).height());
        }
        return height;
    };

    this.resize = function() {
        var height = that.findMaxPageHeight() + 17;
        var width = that.container.width();
        that.wrapper.css({height: height + "px"});
        for (var i = 0; i < that.pages.length; ++i) {
            $(that.pages[i]).css({width: width, height: height + "px"});
        }
    };

    this.redraw = function() {
        for (var i = 0; i < that.pages.length; ++i) {
            $(that.pages[i]).css({
                "display": "inline-block",
                "overflow-x": "hidden",
                "white-space": "normal",
                "vertical-align": "top"
            });
        }
    };

    this.container.scrollsnap({
        snaps: 'section',
        direction: "x",
        easing : 'easeInCubic'
    });

    this.resize();
    this.redraw();
    $(window).resize(function() {
        waitForFinalEvent(function(){
            that.resize();
        }, 200, "pages");
    });
}


$(function() {
    $(".pages").each(function() {
       var pages = new Pages(this);
    });
}());