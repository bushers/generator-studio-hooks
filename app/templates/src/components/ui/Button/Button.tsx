import * as React from 'react';

import { IS_MOBILE } from '../../../config';

export interface ButtonProps {
    onClick: (e: any) => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ className, onClick, children }) => {
    const cls = className || '';
    return (
        <div className={'button ' + cls} onClick={onClick}>
            <div className="button__label">{children}</div>
        </div>
    );
};

export interface LinkButtonProps {
    className?: string;
    href: string;
}

function redirectTo(e: React.SyntheticEvent<any>) {
    if (IS_MOBILE) {
        const el: HTMLAnchorElement = e.currentTarget as HTMLAnchorElement;

        window.location.href = el.href;
    }
}

export const LinkButton: React.FC<LinkButtonProps> = ({ className, href, children }) => {
    const cls = className || '';

    return (
        <a href={href || ''} className={'button ' + cls} onTouchStart={redirectTo}>
            <div className="button__label">{children}</div>
        </a>
    );
};
