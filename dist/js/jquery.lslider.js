/**
 * lSlider, simple free slider
 *
 * Copyright (C) 2014  Lebleu Steve <info@e-lless.be>
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
     */
    var _interval_id;

    /**
     *
     * @returns {{}}
     */
    var view = function() {

        /**
         * Initialize view component
         */
        var init = function() {

            if(!_$slider.length)
                return false;

            setView();
        };

        /**
         *
         */
        var setView = function() {

            var $wrapper = $('#lslider-wrapper');
            var $img = _$slider.find('li > img').first();
            var dist = ( $(window).width() - $img.width() ) / 2;

            $wrapper.css({
                width : '100%',
                height: $img.height() + 'px'
            });

            _$slider.css({
                height: $img.height() + 'px'
            });

            // ----- Bullets

            var $bulletsWrapper = $('<div>', {
                'class' : 'lslider-bullets-wrapper'
            });

            var $bulletsList = $('<ul>', {
                'class' : 'lslider-bullets',
                'id' : 'lslider-bullets'
            });

            var l = _$slider.children().length, i = 0;

            for (i; i < l; i++) {
                i === 0 && $bulletsList.append('<li><i class="icon-circle"></i></li>');
                i !== 0 && $bulletsList.append('<li><i class="icon-circle-empty"></i></li>');
            }

            $bulletsWrapper.append($bulletsList);

            $wrapper.append($bulletsWrapper);

            // ----- Navigation

            if(_options.navigation === true) {

                var $sliderNav = $('<div>', {
                    'class' : 'lslider-nav'
                });

                var $linkNav = $('<a>', {
                    'href': '#'
                });

                var $iconNav = $('<i>', {});

                var $linkLeft = $linkNav.clone().data('direction', 'prev');
                var $linkRight = $linkNav.clone().data('direction', 'next');

                var $iconLeft = $iconNav.clone().addClass('icon-left-dir');
                var $iconRight = $iconNav.clone().addClass('icon-right-dir');

                $linkLeft.append($iconLeft);
                $linkRight.append($iconRight);

                var $navLeft = $sliderNav
                  .clone()
                  .addClass('nav-left')
                  .append($linkLeft);

                var $navRight = $sliderNav
                  .clone()
                  .addClass('nav-right')
                  .append($linkRight);

                $navLeft.css({'left' : dist + 'px'});
                $navRight.css({'right' : dist + 'px'});

                $wrapper.append($navLeft, $navRight);
            }

            // ----- Alternative text

            var $alt = $('<span>', {
                'class' : 'lslider-alt'
            });

            $alt.css({'left' : ( dist + 25 ) + 'px'}).html(_$slider.find('img').eq(0).attr('alt'));

            $wrapper.append($alt);
        };

        /**
         *
         * @param e
         * @param direction
         */
        var slide = function(e, direction) {

            var elementToShow,
              sliderLength = _$slider.children().length,
              currentElement = _$slider.find('.active'),
              $alt = $('.lslider-alt'),
              currentIdx;

            _options.beforeDisplay(e, currentElement);

            currentElement.fadeOut(_options.animationSpeed);
            currentElement.removeClass('active');

            switch(direction) {

                case 'prev':

                    currentIdx = _$slider.children().index(currentElement) - 1;
                    elementToShow = currentIdx !== -1 ? currentElement.prev() : _$slider.find('li:last-child');

                    break;

                case 'next':

                    currentIdx = _$slider.children().index(currentElement) + 1;
                    elementToShow = currentIdx < sliderLength ? currentElement.next() : _$slider.find('li:first-child');

                    break;
            }

            elementToShow.fadeIn(_options.animationSpeed);
            elementToShow.addClass('active');

            $alt.html(elementToShow.find('img').attr('alt'));

            _options.afterDisplay(e, elementToShow);

            $(document).trigger('lslider.switch', [currentIdx !== -1 ? currentIdx : _$slider.children.length + 1]);
        };

        /**
         * Bullets icons display
         */
        var switchBullet = function(e, index) {

            var $listItems = $('#lslider-bullets').find('li');

            $.each($listItems, function(n, obj){
                $(this).html('<i class="icon-circle-empty"></i>');
            });

            var i = index === _$slider.children().length ? 0 : index;

            $($listItems[i]).html('<i class="icon-circle"></i>');
        };

        var that = {};

        that.init = init;
        that.setView = setView;
        that.slide = slide;
        that.switchBullet = switchBullet;

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
            onInitialize();
            onResize();
            _options.navigation && onNavigate();
        };

        /**
         *
         */
        var onInitialize = function() {
            _interval_id = setInterval(function(e) {
                  _app.view.slide(e, 'next');
              }, _options.pause
            );
        };

        /**
         *
         */
        var onResize = function() {
            $(window).on('resize', function() {
                _app.view.setView();
            });
        };

        /**
         *
         */
        var onNavigate = function() {
            $('body').on('click', '.lslider-nav a', function(e) {
                e.preventDefault();
                _app.view.slide(e, $(this).data('direction'));
                window.clearInterval(_interval_id);
                onInitialize();
            });
        };

        /**
         *
         */
        $(document).on('lslider.switch', _app.view.switchBullet);

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

        return this.each(function() {

            _$slider = $(this);

            // Apply any options to the settings, override the defaults
            _options = $.fn.lslider.defaults = $.extend({}, $.fn.lslider.defaults, options);

            // Init view component
            _app.view.init();

            // Bind events
            _app.handlers.init();

        });
    };

    // Defaults
    $.fn.lslider.defaults = {
        animationSpeed: 350, 			                          // Animation in speed (ms)
        pause: 5000,                                        // duration of one slide transition (ms)
        navigation: true,                                   // Show navigation
        beforeDisplay: function(e, hiddenElement){},        // Callback fired before display of result set
        afterDisplay: function(e, visibleElement){}         // Callback fired after display of result set
    };

    $.lslider = $.fn.lslider;

})(window, document, jQuery);

