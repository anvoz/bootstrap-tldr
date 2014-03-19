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

        // HTML inspector button
        var inspectorParentCls = 'js-html-inspector',
            inspectorBtnCls = 'js-btn-inspector',
            $inspectorDialog = $('#dialog-html-inspector'),
            $inspectorBtn = $('<button class="btn btn-default btn-xs ' + inspectorBtnCls + '">' +
                '<span class="glyphicon glyphicon-search"></span>' +
            '</button>');
        $inspectorBtn.click(function() {
            var $html = $(this).closest('.' + inspectorParentCls).clone();

            // Clean some elements
            $html.find('.' + inspectorBtnCls).remove();

            // Copy html to dialog and launch
            $inspectorDialog
                .find('.modal-body pre').text($html.html()).end()
                .modal();
        });
        // Add inspector button
        $('.' + inspectorParentCls).hover(function() {
            $(this).append($inspectorBtn);
        });
    });
})(window);