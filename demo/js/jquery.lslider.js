/**
 * lSlider is a free slider script
 *
 * Copyright (C) 2014  Lebleu Steve <dev@e-lless.be>
 *
 * URL : http://plugins.e-lless.be/lslider/

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Creative Commons Licence.
 *
 * @author S. Lebleu
 * @update 24/04/2017
 *
 **/

(function(window, document, $) {

    "use strict";

    var _app = {};

    var _options;

    var _$slider;

    /**
     *
     * @returns {{}}
     */
    var view = function() {

        /**
         *
         */
        var init = function() {

        };

        var that = {};

        that.init = init;

        return that;
    };

    _app.view = view();

    /**
     *
     * @returns {{}}
     */
    var handlers = function() {

        /**
         *
         */
        var init = function() {

            setInterval(function()
            {
                var elementToShow,
                    sliderLength = _$slider.children().length,
                    currentElement = _$slider.find('.active'),
                    currentIdx = _$slider.children().index(currentElement) + 1;

                currentElement.fadeOut(750);
                currentElement.removeClass('active');

                elementToShow = currentIdx < sliderLength ? currentElement.next() : _$slider.find('li:first-child');

                elementToShow.fadeIn(750);
                elementToShow.addClass('active');

            }, 5000);
        };

        var that = {};
        that.init = init;
        return that;
    };

    _app.handlers = handlers();

    /**
     *
     * @param options
     * @returns {$.fn}
     */
    $.fn.lslider = function(options) {

        // Ensure that only one completer exists
        if (!$.data(document.body, 'lslider')) {

            $.data(document.body, 'lslider', true);

            _$slider = $(this);

            // Apply any options to the settings, override the defaults
            _options = $.fn.lslider.defaults = $.extend({}, $.fn.lslider.defaults, options);

            // Initialize view component
            //_app.view.init();

            // Bind events
            _app.handlers.init();

            return $(this);
        }
    };

    // Defaults
    $.fn.lslider.defaults = {
        url: null,                                          // Path of script or file REQUIRED
        lsliderName: 'lslider',                             // Element ID
        animation: 'fade', 				                          // Fade, slide, none
        animationSpeed: 350, 			                          // Animation in speed (ms)
        begin: true,                                        // Check by string begin if true, in all world if false
        onChar: 2,                                          // Launch request after n chars
        maxResults: 10,                                     // Number of max results to display
        field: null,                                        // Field on to apply filter REQUIRED
        fieldsToDisplay: null,                              // Fields to display on the result item REQUIRED
        beforeDisplay: function(e, dataset){},              // Callback fired before display of result set
        afterDisplay: function(e, dataset){},               // Callback fired after display of result set
        beforeFocus: function(e, element){},                // Callback fired before focus on result item
        afterFocus: function(e, element){},                 // Callback fired after focus on result item
        beforeComplete: function(e, dataset, element){},    // Callback fired before insertion of result
        afterComplete: function(e, dataset, element){}      // Callback fired after insertion of result
    };

    $.lslider = $.fn.lslider;

})(window, document, jQuery);

