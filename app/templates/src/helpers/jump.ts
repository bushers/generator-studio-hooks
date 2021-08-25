/**
 * Allows for scmooth scrolling to section when hash links are clicked
 */

type EasingFunc = (t: number, b: number, c: number, d: number) => number;

const easeInOutQuad: EasingFunc = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

const jumper = () => {
    let element: HTMLElement | null; // element to scroll to
    let start: number; // where scroll starts (px)
    let stop: number; // where scroll stops (px)
    let offset: number; // adjustment from the stop position (px)
    let easing: EasingFunc;
    let a11y: boolean; // accessibility support flag (boolean)
    let distance: number; // distance of scroll (px)
    let duration: number; // scroll duration (ms)
    let timeStart: number | boolean; // time scroll started (ms)
    let timeElapsed: number; // time spent scrolling thus far (ms)
    let next: number; // next scroll position (px)
    let callback: () => any; // to call when done scrolling (function)

    function location() {
        return window.scrollY || window.pageYOffset;
    }

    function top(element: HTMLElement) {
        return element.getBoundingClientRect().top + start;
    }

    function done() {
        // account for rAF time rounding inaccuracies
        window.scrollTo(0, start + distance);

        // if scrolling to an element, and accessibility is enabled
        if (element && a11y) {
            // add tabindex indicating programmatic focus
            element.setAttribute('tabindex', '-1');

            // focus the element
            element.focus();
        }

        // if it exists, fire the callback
        if (typeof callback === 'function') {
            callback();
        }

        // reset time for next jump
        timeStart = false;
    }

    // rAF loop helper
    function loop(timeCurrent: number) {
        // store time scroll started, if not started already
        if (!timeStart) {
            timeStart = timeCurrent;
        }
        // determine time spent scrolling so far
        timeElapsed = timeCurrent - (timeStart as number);

        // calculate next scroll position
        next = easing(timeElapsed, start, distance, duration);

        // scroll to it
        window.scrollTo(0, next);

        // check progress
        timeElapsed < duration
            ? window.requestAnimationFrame(loop) // continue scroll loop
            : done(); // scrolling is done
    }

    interface Options {
        duration?: number;
        offset?: number;
        callback?: any;
        easing?: EasingFunc;
        a11y?: boolean;
    }

    function jump(target: HTMLElement, options: Options = {}) {
        duration = options.duration || 1000;
        offset = options.offset || 0;
        callback = options.callback; // "undefined" is a suitable default, and won't be called
        easing = options.easing || easeInOutQuad;
        a11y = options.a11y || false;

        // cache starting position
        start = location();

        if (typeof target === 'object') {
            element = target;
            stop = top(element);
        } else {
            element = document.querySelector(target);
            stop = top(element as any);
        }

        distance = stop - start + offset;
        duration = options.duration as number;

        // start the loop
        window.requestAnimationFrame(loop);
    }

    // expose only the jump method
    return jump;
};

// export singleton

export const singleton = jumper();
