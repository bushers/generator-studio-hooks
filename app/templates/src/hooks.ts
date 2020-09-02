import * as React from 'react';

const { useLayoutEffect } = React;

/**
 * Prevents body scrolling when called in component
 */
export const useLockBodyScroll = () => {
    useLayoutEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => (document.body.style.overflow = originalStyle);
    }, []);
};
