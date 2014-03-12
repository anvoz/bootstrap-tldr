(function(window, undefined) {
    'use strict';

    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();

        // Prevent demo links from navigating
        $('a[href="#"]:not([data-toggle], [rel="async"])').click(function() {
            return false;
        });
        // Prevent demo forms from submitting
        $('form:not([action])').submit(function() {
            return false;
        });
    });
})(window);