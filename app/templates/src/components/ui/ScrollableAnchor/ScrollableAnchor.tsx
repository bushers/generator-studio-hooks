import * as React from 'react';
import { useInView } from 'react-intersection-observer';

export interface ScrollableAnchorProps {
    className?: string;
    hashId: string;
}

export const ScrollableAnchor: React.FC<ScrollableAnchorProps> = ({ children, className, hashId }) => {
    const cls = className || '';
    const [ref, inView, entry] = useInView({
        threshold: 0.4,
        rootMargin: '0px 0px 0px 0px',
    });

    React.useEffect(() => {
        if (inView) {
            history.pushState(null, null, `#${hashId}`);
        }
    }, [inView]);

    return (
        <div className={'scrollable-anchor ' + cls} id={hashId} ref={ref}>
            {children}
        </div>
    );
};

export default ScrollableAnchor;
