import { actionTypes } from '../actionTypes';

const {
    ADD_TYPES_STARTED,
    ADD_TYPES_SUCCESS,
    ADD_TYPES_FAILURE
} = actionTypes;

const initialState = {
    loading: false,
    listTypes: [],
    error: null
};

const addTypesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TYPES_STARTED:
            return {
                ...state,
                loading: true
            }
        
        case ADD_TYPES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                listTypes: action.types
            }
        
        case ADD_TYPES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        
        default:
            return state
    }
}

export default addTypesReducer;