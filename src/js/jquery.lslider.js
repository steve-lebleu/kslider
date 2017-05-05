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

    /**
     *
     * @type {{}}
     */
    var _app = {};

    /**
     *
     */
    var _options;

    /**
     *
     */
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

            setInterval(function(e)
            {
                var elementToShow,
                    sliderLength = _$slider.children().length,
                    currentElement = _$slider.find('.active'),
                    currentIdx = _$slider.children().index(currentElement) + 1;

                _options.beforeDisplay(e, currentElement);

                currentElement.fadeOut(_options.animationSpeed);
                currentElement.removeClass('active');

                elementToShow = currentIdx < sliderLength ? currentElement.next() : _$slider.find('li:first-child');

                elementToShow.fadeIn(_options.animationSpeed);
                elementToShow.addClass('active');

                _options.afterDisplay(e, elementToShow);

            }, _options.pause);
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
        animationSpeed: 350, 			                          // Animation in speed (ms)
        pause: 5000,                                        // duration of one slide transition (ms)
        beforeDisplay: function(e, hiddenElement){},        // Callback fired before display of result set
        afterDisplay: function(e, visibleElement){}         // Callback fired after display of result set
    };

    $.lslider = $.fn.lslider;

})(window, document, jQuery);

