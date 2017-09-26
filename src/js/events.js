import * as $ from './utilities';

// Globals
const { PointerEvent } = window;

// Events
const EVENT_POINTER_DOWN = PointerEvent ? 'pointerdown' : 'touchstart mousedown';
const EVENT_POINTER_MOVE = PointerEvent ? 'pointermove' : 'touchmove mousemove';
const EVENT_POINTER_UP = PointerEvent ? ' pointerup pointercancel' : 'touchend touchcancel mouseup';
const EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
const EVENT_DBLCLICK = 'dblclick';
const EVENT_RESIZE = 'resize';
const EVENT_CROP_START = 'cropstart';
const EVENT_CROP_MOVE = 'cropmove';
const EVENT_CROP_END = 'cropend';
const EVENT_CROP = 'crop';
const EVENT_ZOOM = 'zoom';

export default {
  bind() {
    const { element, options, cropper } = this;

    if ($.isFunction(options.cropstart)) {
      $.addListener(element, EVENT_CROP_START, options.cropstart);
    }

    if ($.isFunction(options.cropmove)) {
      $.addListener(element, EVENT_CROP_MOVE, options.cropmove);
    }

    if ($.isFunction(options.cropend)) {
      $.addListener(element, EVENT_CROP_END, options.cropend);
    }

    if ($.isFunction(options.crop)) {
      $.addListener(element, EVENT_CROP, options.crop);
    }

    if ($.isFunction(options.zoom)) {
      $.addListener(element, EVENT_ZOOM, options.zoom);
    }

    $.addListener(cropper, EVENT_POINTER_DOWN, (this.onCropStart = $.proxy(this.cropStart, this)));

    if (options.zoomable && options.zoomOnWheel) {
      $.addListener(cropper, EVENT_WHEEL, (this.onWheel = $.proxy(this.wheel, this)));
    }

    if (options.toggleDragModeOnDblclick) {
      $.addListener(cropper, EVENT_DBLCLICK, (this.onDblclick = $.proxy(this.dblclick, this)));
    }

    $.addListener(document, EVENT_POINTER_MOVE, (this.onCropMove = $.proxy(this.cropMove, this)));
    $.addListener(document, EVENT_POINTER_UP, (this.onCropEnd = $.proxy(this.cropEnd, this)));

    if (options.responsive) {
      $.addListener(window, EVENT_RESIZE, (this.onResize = $.proxy(this.resize, this)));
    }
  },

  unbind() {
    const { element, options, cropper } = this;

    if ($.isFunction(options.cropstart)) {
      $.removeListener(element, EVENT_CROP_START, options.cropstart);
    }

    if ($.isFunction(options.cropmove)) {
      $.removeListener(element, EVENT_CROP_MOVE, options.cropmove);
    }

    if ($.isFunction(options.cropend)) {
      $.removeListener(element, EVENT_CROP_END, options.cropend);
    }

    if ($.isFunction(options.crop)) {
      $.removeListener(element, EVENT_CROP, options.crop);
    }

    if ($.isFunction(options.zoom)) {
      $.removeListener(element, EVENT_ZOOM, options.zoom);
    }

    $.removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);

    if (options.zoomable && options.zoomOnWheel) {
      $.removeListener(cropper, EVENT_WHEEL, this.onWheel);
    }

    if (options.toggleDragModeOnDblclick) {
      $.removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
    }

    $.removeListener(document, EVENT_POINTER_MOVE, this.onCropMove);
    $.removeListener(document, EVENT_POINTER_UP, this.onCropEnd);

    if (options.responsive) {
      $.removeListener(window, EVENT_RESIZE, this.onResize);
    }
  },
};
