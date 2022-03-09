import React, { useContext, useState, useLayoutEffect, createContext, useCallback, useEffect } from 'react';

import Dialog, { DialogProps } from './components/ui/Dialog/Dialog';

/**
 * Prevents body scrolling when called in component
 */
export const useLockBodyScroll = () => {
    useLayoutEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);
};

/**
 * Runs a function if a click occurs outside an element
 */
 export const useOutsideAlerter = (ref, func) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                func();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
};

/**
 * Allows components to use a Dialog/Modal
 */
interface DialogWithProps {
    dialogComponent: JSX.Element | JSX.Element[];
    dialogProps: Partial<DialogProps>;
}

interface DialogContext {
    setDialog: (dialogComponent: JSX.Element | JSX.Element[], dialogProps?: Partial<DialogProps>) => void;
    unSetDialog: () => void;
    dialog: DialogWithProps;
}

const DialogContext = createContext<DialogContext | null>(null);

export const DialogProvider = (props) => {
    const [dialog, setDialogState] = useState<DialogWithProps | null>();

    const setDialog = (dialogComponent: JSX.Element | JSX.Element[], dialogProps: Partial<DialogProps> = null) => {
        setDialogState({ dialogComponent, dialogProps });
    };
    const unSetDialog = useCallback(() => {
        setDialogState(null);
    }, [setDialogState]);

    return (
        <DialogContext.Provider value={{ unSetDialog, setDialog, dialog }} {...props}>
            {props.children}
            {dialog && <Dialog dialog={dialog.dialogComponent} unSetDialog={unSetDialog} {...dialog.dialogProps} />}
        </DialogContext.Provider>
    );
};

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (context === undefined) {
        throw new Error('useDialog must be used within a DialogProvider');
    }

    return context;
};

/**
 * Reuseable pagination state
 */
export const usePagination = (data: unknown, numToShow: number, startIdx = 0) => {
    const [displayedDataIdx, setDisplayedDataIdx] = useState({ start: startIdx, end: numToShow });

    const onPageChange = (idx: number) => {
        setDisplayedDataIdx({ start: idx * numToShow - numToShow, end: idx * numToShow });
    };

    useEffect(() => {
        return () => {
            setDisplayedDataIdx({ start: startIdx, end: numToShow });
        };
    }, [data]);

    return { displayedDataIdx, onPageChange };
};
