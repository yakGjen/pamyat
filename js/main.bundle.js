/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 2 */
/***/ (() => {

/*!
	Zoom 1.7.21
	license: MIT
	http://www.jacklmoore.com/zoom
*/
(function ($) {
  var defaults = {
    url: false,
    callback: false,
    target: false,
    duration: 120,
    on: 'mouseover',
    // other options: grab, click, toggle
    touch: true,
    // enables a touch fallback
    onZoomIn: false,
    onZoomOut: false,
    magnify: 1
  }; // Core Zoom Logic, independent of event listeners.

  $.zoom = function (target, source, img, magnify) {
    var targetHeight,
        targetWidth,
        sourceHeight,
        sourceWidth,
        xRatio,
        yRatio,
        offset,
        $target = $(target),
        position = $target.css('position'),
        $source = $(source); // The parent element needs positioning so that the zoomed element can be correctly positioned within.

    target.style.position = /(absolute|fixed)/.test(position) ? position : 'relative';
    target.style.overflow = 'hidden';
    img.style.width = img.style.height = '';
    $(img).addClass('zoomImg').css({
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      width: img.width * magnify,
      height: img.height * magnify,
      border: 'none',
      maxWidth: 'none',
      maxHeight: 'none'
    }).appendTo(target);
    return {
      init: function () {
        targetWidth = $target.outerWidth();
        targetHeight = $target.outerHeight();

        if (source === target) {
          sourceWidth = targetWidth;
          sourceHeight = targetHeight;
        } else {
          sourceWidth = $source.outerWidth();
          sourceHeight = $source.outerHeight();
        }

        xRatio = (img.width - targetWidth) / sourceWidth;
        yRatio = (img.height - targetHeight) / sourceHeight;
        offset = $source.offset();
      },
      move: function (e) {
        var left = e.pageX - offset.left,
            top = e.pageY - offset.top;
        top = Math.max(Math.min(top, sourceHeight), 0);
        left = Math.max(Math.min(left, sourceWidth), 0);
        img.style.left = left * -xRatio + 'px';
        img.style.top = top * -yRatio + 'px';
      }
    };
  };

  $.fn.zoom = function (options) {
    return this.each(function () {
      var settings = $.extend({}, defaults, options || {}),
          //target will display the zoomed image
      target = settings.target && $(settings.target)[0] || this,
          //source will provide zoom location info (thumbnail)
      source = this,
          $source = $(source),
          img = document.createElement('img'),
          $img = $(img),
          mousemove = 'mousemove.zoom',
          clicked = false,
          touched = false; // If a url wasn't specified, look for an image element.

      if (!settings.url) {
        var srcElement = source.querySelector('img');

        if (srcElement) {
          settings.url = srcElement.getAttribute('data-src') || srcElement.currentSrc || srcElement.src;
        }

        if (!settings.url) {
          return;
        }
      }

      $source.one('zoom.destroy', function (position, overflow) {
        $source.off(".zoom");
        target.style.position = position;
        target.style.overflow = overflow;
        img.onload = null;
        $img.remove();
      }.bind(this, target.style.position, target.style.overflow));

      img.onload = function () {
        var zoom = $.zoom(target, source, img, settings.magnify);

        function start(e) {
          zoom.init();
          zoom.move(e); // Skip the fade-in for IE8 and lower since it chokes on fading-in
          // and changing position based on mousemovement at the same time.

          $img.stop().fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
        }

        function stop() {
          $img.stop().fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
        } // Mouse events


        if (settings.on === 'grab') {
          $source.on('mousedown.zoom', function (e) {
            if (e.which === 1) {
              $(document).one('mouseup.zoom', function () {
                stop();
                $(document).off(mousemove, zoom.move);
              });
              start(e);
              $(document).on(mousemove, zoom.move);
              e.preventDefault();
            }
          });
        } else if (settings.on === 'click') {
          $source.on('click.zoom', function (e) {
            if (clicked) {
              // bubble the event up to the document to trigger the unbind.
              return;
            } else {
              clicked = true;
              start(e);
              $(document).on(mousemove, zoom.move);
              $(document).one('click.zoom', function () {
                stop();
                clicked = false;
                $(document).off(mousemove, zoom.move);
              });
              return false;
            }
          });
        } else if (settings.on === 'toggle') {
          $source.on('click.zoom', function (e) {
            if (clicked) {
              stop();
            } else {
              start(e);
            }

            clicked = !clicked;
          });
        } else if (settings.on === 'mouseover') {
          zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.

          $source.on('mouseenter.zoom', start).on('mouseleave.zoom', stop).on(mousemove, zoom.move);
        } // Touch fallback


        if (settings.touch) {
          $source.on('touchstart.zoom', function (e) {
            e.preventDefault();

            if (touched) {
              touched = false;
              stop();
            } else {
              touched = true;
              start(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]);
            }
          }).on('touchmove.zoom', function (e) {
            e.preventDefault();
            zoom.move(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]);
          }).on('touchend.zoom', function (e) {
            e.preventDefault();

            if (touched) {
              touched = false;
              stop();
            }
          });
        }

        if ($.isFunction(settings.callback)) {
          settings.callback.call(img);
        }
      };

      img.setAttribute('role', 'presentation');
      img.alt = '';
      img.src = settings.url;
    });
  };

  $.fn.zoom.defaults = defaults;
})(window.jQuery);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery_zoom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var jquery_zoom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_zoom__WEBPACK_IMPORTED_MODULE_1__);


$(document).ready(function () {
  $('#burger').click(function (e) {
    $('.mobile-nav__dropdown').toggleClass('mobile-nav__dropdown_show');
    $('.mobile-nav__burger_open').toggleClass('mobile-nav__burger_open-disactive');
    $('.mobile-nav__burger_close').toggleClass('mobile-nav__burger_close-disactive');
  });
  var show = false;
  $('.zm').css('cursor', 'zoom-in').zoom({
    on: 'click',
    magnify: 1.5
  });
  $('.zm').click(function () {
    if (!show) {
      $('.zm').css('cursor', 'zoom-out');
      show = true;
    } else {
      $('.zm').css('cursor', 'zoom-in');
      show = false;
    }
  });
});
})();

/******/ })()
;