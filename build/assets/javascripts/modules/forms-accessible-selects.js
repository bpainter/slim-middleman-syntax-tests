// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {
  // undefined is used here as the undefined global
  // variable in ECMAScript 3 and is mutable (i.e. it can
  // be changed by someone else). undefined isn't really
  // being passed in so we can ensure that its value is
  // truly undefined. In ES5, undefined can no longer be
  // modified.

  // window and document are passed through as local
  // variables rather than as globals, because this (slightly)
  // quickens the resolution process and can be more
  // efficiently minified (especially when both are
  // regularly referenced in your plugin).

  // Create the defaults once
  var pluginName = "customSelect",
      defaults = {
          selectWidth: false
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;

    // jQuery has an extend method that merges the
    // contents of two or more objects, storing the
    // result in the first object. The first object
    // is generally empty because we don't want to alter
    // the default options for future instances of the plugin
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function() {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.options
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.element, this.options).
      var options              = this.options;
      var originalSelect       = $(this.element);

      // Set up placeholders
      var isDisabled           = "";
      var isSelected           = "";
      var customSelect         = "";
      var customSelectOptions  = "";
      var customSelectText     = "";

      // Get the value of the original selected option
      // <div class="custom-select-text">Value</div>
      customSelectText = '<div class="custom-select-text">' + originalSelect.val() + '</div>'
      console.log('Original Select Value', customSelectText);

      // Get the original list of options for the select
      // and create a new list for each one
      // <li aria-disabled="false" aria-selected="true" role="option" tabindex="0">Value</li>
      originalSelect.children().each(function(index) {
        // check to see if the option field is disabled
        if($(this).is(":disabled")) {
          isDisabled = ' aria-disabled="true"';
        } else {
          isDisabled = ' aria-disabled="false"';
        }

        // check to see if the option field is selected
        if($(this).is(":selected")) {
          isSelected = ' aria-selected="true"';
        } else {
          isSelected = ' aria-selected="false"';
        }
        customSelectOptions  += '<li' + isDisabled + isSelected +' role="option" tabindex="0" >' + $(this).text() + '</li>';
      });
      console.log('Custom List', customSelectOptions);

      // Create the custom select
      // <div class="custom-select-basic">
      //   <div class="custom-select-text">Value</div>
      //   <ul class="custom-select-list">
      //     <li>Value</li>
      //     ...
      //   </ul>
      // </div>
      customSelect = '<div class="custom-select-basic"> \
                        <div class="custom-select-text">' + customSelectText + '</div> \
                        <ul class="custom-select-list">' + customSelectOptions + '</ul> \
                      </div>';


      // Wrap the original select in a div so it will provide
      // constraints on the width for the custom select
      // <div class="custom-select-wrapper">
      originalSelect.wrap('<div class="custom-select-wrapper" />').after(customSelect);


      // Create the functionality

      // Clicking
      // clicked to open the dropdown
      // clicked to close the dropdown
      // clicked anywhere off the plugin close the dropdown

      // scrolling closes the dropdown

      // Keyboard navigation
      // keyboard up/down navigates through the items in the dropdown
      // keyboard up/down error handling if at beginning or end of items in dropdown
      // Spacebar or Return select item in dropdown
      // Typing letters selects the the closest item
    },

    // yourOtherFunction: function(el, options) {
    //   // some logic
    // }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName,
        new Plugin( this, options ));
      }
    });
  };

})( jQuery, window, document );
