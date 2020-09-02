import { TYPES } from './Actions';
import { AppInitState } from './StateAndProps';
import I18n from '../../services/I18n';

export function Reducer(state = AppInitState, action): any {
    switch (action.type) {
        case TYPES.DATA_LOADED:
            I18n.setLocale({ ...action.data.locale });
            return {
                ...state,
                locale: action.data.locale,
                data: action.data.data,
                navData: action.data.navData,
                content: action.data.content,
            };

        case TYPES.GET_DEEPLINK:
            return { ...state, deeplinkHtml: action.data };

        case TYPES.OPEN_DIALOG:
            return { ...state, isDialogOpen: true, dialogContent: action.content };

        case TYPES.CLOSE_DIALOG:
            return { ...state, isDialogOpen: false, dialogContent: null };

        default:
            return state;
    }
}
