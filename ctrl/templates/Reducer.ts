import { <%= uCamelCName %>State, <%= uCamelCName %>InitState } from './StateAndProps';

export function Reducer(state = <%= uCamelCName %>InitState, action): any {
	switch (action.type) {

		default:
			return state;
	}
}
