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
}

export interface DialogState {}

const Dialog: React.FC<DialogProps> = ({
    dialog,
    unSetDialog,
    className = '',
    close = () => ({}),
    animateIn = 'fadeIn',
    animateOut = 'fadeOut',
}) => {
    const clz = className;

    const backdropEl = React.useRef(null);
    const contentWrapperEl = React.useRef(null);

    // const animteExit = () => {
    //     this.backdropEl.classList.remove('animated', 'fadeIn');
    //     this.contentWrapperEl.classList.remove('animated', animateIn);

    //     this.backdropEl.classList.add('animated', 'fadeOut');
    //     this.contentWrapperEl.classList.add('animated', animateOut);
    // };

    useLockBodyScroll();

    return ReactDOM.createPortal(
        <div className={`dialog ${clz}`}>
            <div
                className="dialog__backdrop animated speed-5 fadeIn"
                onClick={close}
                id="DialogBackdrop"
                ref={backdropEl}
            ></div>

            <div
                className={`dialog__wrapper animated speed-5 ${animateIn}`}
                ref={contentWrapperEl}
            >
                <div
                    className="dialog__close-button"
                    id="DialogCloseButton"
                    onClick={() => {
                        close();
                        unSetDialog();
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
