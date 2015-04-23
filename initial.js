(function ($) {
    $.fn.initial = function (options) {
        var colors, colorIndex, index;
        // the options must include colors
        if ("colors" in options) {
            colors = options.colors;
        } else {
            throw Error("Options passed to generate initials must include an array of colors to be used");
        }

        return this.each(function (index, el) {

            var e = $(this);
            var settings = $.extend({
                // Default settings
                name: 'Name',
                charCount: 1,
                textColor: '#ffffff',
                height: 100,
                width: 100,
                fontSize: 60,
                fontWeight: 400,
                fontFamily: 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif'
            }, options);

            // overriding from data attributes
            settings = $.extend(settings, {
                name: $(e).attr('data-name'),
                index: $(e).attr('data-index')
            });

            // making the text object
            var c = settings.name.substr(0, settings.charCount).toUpperCase();
            var cobj = $('<text text-anchor="middle"></text>').attr({
                'y': '50%',
                'x': '50%',
                'dy' : '0.35em',
                'pointer-events':'auto',
                'fill': settings.textColor,
                'font-family': settings.fontFamily
            }).html(c).css({
                'font-weight': settings.fontWeight,
                'font-size': settings.fontSize+'px',
            });

            // we have a fixed number of colors, we will rotate
            // it to generate any numebr of initials
            if (settings.index >= colors.length ) {
                colorIndex = colors.length % settings.index;
            } else {
                colorIndex = settings.index;
            }

            var svg = $('<svg></svg>').attr({
                'xmlns': 'http://www.w3.org/2000/svg',
                'pointer-events':'none',
                'width': settings.width,
                'height': settings.height
            }).css({
                'background-color': colors[colorIndex],
                'width': settings.width+'px',
                'height': settings.height+'px',
                'border-radius': settings.borderRadius + 'px'
            });

            svg.append(cobj);
            var svgHtml = window.btoa(unescape(encodeURIComponent($('<div>').append(svg.clone()).html())));

            e.attr("src", 'data:image/svg+xml;base64,' + svgHtml);

        });
    };

}(Zepto));