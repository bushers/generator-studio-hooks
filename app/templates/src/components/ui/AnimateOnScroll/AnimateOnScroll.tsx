import * as React from 'react';
import { useInView } from 'react-intersection-observer';

export interface AnimateOnScrollProps {
    className?: string;
    triggerOnce: boolean;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ className, children, triggerOnce }) => {
    const cls = className || '';
    const [ref, inView, entry] = useInView({
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px',
        triggerOnce,
    });

    return (
        <div className={'animate-on-scroll ' + cls} ref={ref} style={{ opacity: inView ? 1 : 0 }}>
            {children}
        </div>
    );
};

export default AnimateOnScroll;
