import { createAction, createReducer } from '@reduxjs/toolkit';
import { actionTypesPokemon } from '../actionTypes';

const {
    ADD_POKEMONS_STARTED,
    ADD_POKEMONS_FAILURE,
    ADD_POKEMONS_SUCCESS
} = actionTypesPokemon;

interface PokemonsState {
    loading: boolean,
    listPokemons: Array<{}>,
    error: boolean
}

const addPokemonsStarted = createAction(ADD_POKEMONS_STARTED);
const addPokemonsSuccess = createAction<Array<{}>>(ADD_POKEMONS_SUCCESS);
const addPokemonsFailure = createAction<boolean>(ADD_POKEMONS_FAILURE);

const initialState = {
    loading: false,
    listPokemons: [],
    error: false
} as PokemonsState;

const pokemonsReducer = createReducer(initialState, builder => {
    builder
        .addCase(addPokemonsStarted, state => {
            state.loading = true;
        })
        .addCase(addPokemonsSuccess, (state, action) => {
            state.loading = false;
            state.error = false;
            state.listPokemons = action.payload;
        })
        .addCase(addPokemonsFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
});

export default pokemonsReducer;