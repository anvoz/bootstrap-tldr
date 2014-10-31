(function(window, undefined) {
  'use strict';

  function inspector() {

    var parentClass = 'js-html-inspector';
    var buttonClass = 'js-btn-inspector';
    var $dialog     = $('#dialog-html-inspector');
    var $button     = $('<button class="btn btn-default btn-xs ' + buttonClass + '">' +
      '<span class="glyphicon glyphicon-search"></span>' +
    '</button>');

    $button.click(function() {

      var $parent = $(this).closest('.' + parentClass).clone();

      // Replace elements
      var replaceTarget = $parent.data('replace-target');
      if (replaceTarget) {
        $parent.find(replaceTarget).each(function() {
          $(this).replaceWith($(this).html());
        });
      }

      // Remove elements
      var removeTargets = $parent.data('remove-target') || [];
      if (!(removeTargets instanceof Array)) {
        removeTargets = [removeTargets];
      }
      removeTargets.push('.' + buttonClass);
      $.each(removeTargets, function(index, target) {
        $parent.find(target).remove();
      });

      // Remove classes from elements
      var removeClassesTargets = $parent.data('remove-class-target') || [];
      if (!(removeClassesTargets instanceof Array)) {
        removeClassesTargets = [removeClassesTargets];
      }
      $.each(removeClassesTargets, function(index, target) {
        $parent.find(target).removeClass(target.split('.')[1]);
      });

      // Trim whitespaces
      var lines = $parent.html().split('\n');
      if (lines.length > 0) {
        // Remove all empty lines on the top
        while(lines[0].trim().length === 0) {
          lines.shift();
        }

        // Change indentation based on the first line
        var indent  = lines[0].length - lines[0].trim().length;
        var regex   = new RegExp(' {' + indent + '}');
        var html    = [];
        $.each(lines, function(index, line) {
          if (line.trim().length > 0 && line.match(regex)) {
            html.push(line.substring(indent));
          } else if (line.length === 0) {
            // Intended empty line
            html.push('');
          }
        });

        // Copy html to dialog and launch
        $dialog
          .find('.modal-body code').text(html.join('\n')).end()
          .modal();
      }
    });

    // Add inspector button
    $('.' + parentClass).hover(function() {
      $(this).append($button);
    });
  }

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

    // Show inspector button on hover
    inspector();
  });
})(window);
