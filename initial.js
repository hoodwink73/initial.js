(function ($) {
    $.fn.initial = function (options) {

        // Defining Colors
        // 10 colors for ten index
        // the rest will be gray
        var colors = ["#D9B3E7",
                      "#CFE465",
                      "#7FDED7",
                      "#EBA97A",
                      "#8EC6E6",
                      "#F0A6B8",
                      "#E0C468",
                      "#ADDD8B",
                      "#7AE0AE",
                      "#CCC9DA",
                      // gray
                      "#d9e5eb"];
        var colorIndex;
        return this.each(function () {

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
            settings = $.extend(settings, e.data());

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

            // the background-color of the initial depends on its index
            // elements upto index 10 will be designated a color otherwise
            // the background color will be gray
            if (settings.index < 10) {
                colorIndex = settings.index;
            } else {
                colorIndex = 10;
            }

            var svg = $('<svg></svg>').attr({
                'xmlns': 'http://www.w3.org/2000/svg',
                'pointer-events':'none',
                'width': settings.width,
                'height': settings.height
            }).css({
                'background-color': colors[colorIndex],
                'width': settings.width+'px',
                'height': settings.height+'px'
            });

            svg.append(cobj);
           // svg.append(group);
            var svgHtml = window.btoa(unescape(encodeURIComponent($('<div>').append(svg.clone()).html())));

            e.attr("src", 'data:image/svg+xml;base64,' + svgHtml);

        });
    };

}(jQuery));