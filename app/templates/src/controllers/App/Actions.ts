export const TYPES = {
    DATA_LOADED: 'APP_START',
    GET_DEEPLINK: 'GET_DEEPLINK',
    OPEN_DIALOG: 'OPEN_DIALOG',
    CLOSE_DIALOG: 'CLOSE_DIALOG',
};

export const ACTIONS = {
    DATA_LOADED: (data: any) => ({
        data,
        type: TYPES.DATA_LOADED,
    }),
    GET_DEEPLINK: (data: any) => ({
        data,
        type: TYPES.GET_DEEPLINK,
    }),
    OPEN_DIALOG: (content: React.ReactNode) => ({
        content,
        type: TYPES.OPEN_DIALOG,
    }),
    CLOSE_DIALOG: () => ({
        type: TYPES.CLOSE_DIALOG,
    }),
};
