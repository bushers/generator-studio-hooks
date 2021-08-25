import * as React from 'react';
import Dialog from './components/ui/Dialog/Dialog';

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
const DialogContext = React.createContext(null);

export const DialogProvider = (props) => {
    const [dialog, setDialog] = React.useState();
    const unSetDialog = React.useCallback(() => {
        setDialog(null);
    }, [setDialog]);

    return (
        <DialogContext.Provider value={{ unSetDialog, setDialog, dialog }} {...props}>
            {props.children}
            {dialog && <Dialog dialog={dialog} unSetDialog={unSetDialog} />}
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
