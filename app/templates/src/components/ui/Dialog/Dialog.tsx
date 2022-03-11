import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useLockBodyScroll } from '../../../hooks';

export interface DialogProps {
    dialog: React.ReactNode;
    unSetDialog: () => void;
    close?: () => void;
    className?: string;
    animateIn?: string;
    animateOut?: string;
    animationSpeed?: number;
}

export interface DialogState {}

const Dialog: React.FC<DialogProps> = ({
    dialog,
    unSetDialog,
    className = '',
    close = () => ({}),
    animateIn = 'fadeIn',
    animateOut = 'fadeOut',
    animationSpeed = 500,
}) => {
    const clz = className;

    const backdropEl = React.useRef<HTMLDivElement>(null);
    const contentWrapperEl = React.useRef<HTMLDivElement>(null);

    const animateExit = () => {
        backdropEl?.current.classList.remove('animated', 'fadeIn');
        contentWrapperEl?.current.classList.remove('animated', animateIn);

        backdropEl?.current.classList.add('animated', 'fadeOut');
        contentWrapperEl?.current.classList.add('animated', animateOut);
    };

    useLockBodyScroll();

    return ReactDOM.createPortal(
        <div className={`dialog ${clz}`}>
            <div
                className={`dialog__backdrop animated fadeIn speed-${animationSpeed / 100} `}
                onClick={() => {
                    close();
                    animateExit();
                    setTimeout(() => {
                        unSetDialog();
                    }, animationSpeed);
                }}
                id="DialogBackdrop"
                ref={backdropEl}
            ></div>

            <div
                className={`dialog__wrapper animated ${animateIn} speed-${animationSpeed / 100} `}
                ref={contentWrapperEl}
            >
                <div
                    className="dialog__close-button"
                    id="DialogCloseButton"
                    onClick={() => {
                        close();
                        animateExit();
                        setTimeout(() => {
                            unSetDialog();
                        }, animationSpeed);
                    }}
                >
                    <i className="icon-close"></i>
                </div>
                <main className="dialog__content">{dialog}</main>
            </div>
        </div>,
        document.getElementById('dialog-root'),
    );
};

export default Dialog;
