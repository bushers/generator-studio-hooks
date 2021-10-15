import * as React from 'react';

import Dialog, { DialogProps } from './components/ui/Dialog/Dialog';

const { useLayoutEffect } = React;

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

const DialogContext = React.createContext<DialogContext | null>(null);

export const DialogProvider = (props) => {
    const [dialog, setDialogState] = React.useState<DialogWithProps | null>();

    const setDialog = (dialogComponent: JSX.Element | JSX.Element[], dialogProps: Partial<DialogProps> = null) => {
        setDialogState({ dialogComponent, dialogProps });
    };
    const unSetDialog = React.useCallback(() => {
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
    const context = React.useContext(DialogContext);
    if (context === undefined) {
        throw new Error('useDialog must be used within a DialogProvider');
    }

    return context;
};
