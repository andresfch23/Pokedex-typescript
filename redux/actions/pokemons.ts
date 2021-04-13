import { actionTypesPokemon } from '../actionTypes';
import { fetchInitialInfo } from '../../requests/pokemons';
import { createAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

const {
    ADD_POKEMONS_SUCCESS,
    ADD_POKEMONS_STARTED,
    ADD_POKEMONS_FAILURE
} = actionTypesPokemon;

export const addPokemons = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(addPokemonsStarted());

        return fetchInitialInfo().then(res => {
            dispatch(addPokemonsSuccess(res));
        })
        .catch(err => {
            dispatch(addPokemonsFailure(err))
        });   
    }
}

const addPokemonsStarted = createAction<undefined>(ADD_POKEMONS_STARTED);
const addPokemonsSuccess = createAction<Array<{}> | undefined>(ADD_POKEMONS_SUCCESS);
const addPokemonsFailure = createAction<Object>(ADD_POKEMONS_FAILURE);

