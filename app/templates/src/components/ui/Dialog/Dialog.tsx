import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useLockBodyScroll } from '../../../hooks';

export interface DialogProps {
    dialog: React.ReactNode;
    unSetDialog: () => void;
    close?: () => void;
    className?: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'middle';
    spacing?: 'small' | 'medium' | 'large';
    wrapHeight?: 'default' | 'full-height' | 'small-height' | 'medium-height' | 'large-height';
    wrapWidth?: 'default' | 'full-width' | 'small-width' | 'medium-width' | 'large-width';
    backdropColor?: string;
    dialogColor?: string;
    animateIn?: string;
    animateOut?: string;
}

export interface DialogState {}

const Dialog: React.FC<DialogProps> = ({
    dialog,
    unSetDialog,
    className = '',
    position = 'middle',
    close = () => ({}),
    spacing = 'medium',
    wrapHeight = 'default',
    wrapWidth = 'default',
    backdropColor = null,
    dialogColor = null,
    animateIn = 'fadeIn',
    animateOut = 'fadeOut',
    children,
}) => {
    const clz = className;
    const pos = 'dialog--' + position;
    const spacingCls = 'dialog--spacing-' + spacing;
    const wrapHeightCls = 'dialog--' + wrapHeight;
    const wrapWidthCls = 'dialog--' + wrapWidth;

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
        <div className={`dialog ${clz} ${pos} ${spacingCls} ${wrapHeightCls} ${wrapWidthCls}`}>
            <div
                className="dialog__backdrop animated speed-5 fadeIn"
                onClick={close}
                id="DialogBackdrop"
                style={{
                    backgroundColor: backdropColor,
                }}
                ref={backdropEl}
            ></div>

            <div
                className={`dialog__wrapper animated speed-5 ${animateIn}`}
                style={{
                    backgroundColor: dialogColor,
                }}
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
