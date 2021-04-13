import { actionTypes } from '../actionTypes';
import { createAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { fetchTypePokemons } from '../../requests/pokemons';

const {
    ADD_TYPES_STARTED,
    ADD_TYPES_SUCCESS,
    ADD_TYPES_FAILURE
} = actionTypes;

export const addTypes = () => {
    return async (dispatch : AppDispatch) => {
        dispatch(addTypesStarted());

        return fetchTypePokemons()
        .then(res => {
            dispatch(addTypesSuccess(res));
        })
        .catch(error => {
            dispatch(addTypesFailure(error))
        });
    }
}

const addTypesStarted = createAction<undefined>(ADD_TYPES_STARTED);

const addTypesSuccess = createAction<Array<{}> | undefined>(ADD_TYPES_SUCCESS);

const addTypesFailure = createAction<boolean>(ADD_TYPES_FAILURE);