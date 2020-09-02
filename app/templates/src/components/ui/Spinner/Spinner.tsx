import * as React from 'react';

export interface SpinnerProps {
    className?: string;
    size?: 'small' | 'medium' | 'large';
    type?:
        | 'double-dot-in'
        | 'dot-in'
        | 'double-dot-stick'
        | 'dot-stick'
        | 'double-dot-out'
        | 'dot-out'
        | 'wave-out'
        | 'wave-in'
        | 'huge-wave-out'
        | 'huge-wave-in'
        | 'double-section'
        | 'double-section-in'
        | 'double-section-out'
        | 'double-section-far'
        | 'section-far';
    animationDuration?: number;
}

export function Spinner(props: SpinnerProps) {
    const cls = props.className || '';
    const size = 'spinner--' + (props.size || 'medium');
    const animationDuration: string = props.animationDuration + 's' || '1s';
    const type = 'spinner-' + (props.type || 'double-section');
    return (
        <div className={`spinner  ${cls} ${size}`}>
            <div
                className={`${type} speed-3`}
                style={{
                    animationDuration: animationDuration,
                }}
            ></div>
        </div>
    );
}
