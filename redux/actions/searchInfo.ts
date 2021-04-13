import { actionTypesFilterInfo } from '../actionTypes';
import { createAction } from '@reduxjs/toolkit';

const {
    ADD_FILTERED_POKEMONS,
    ADD_FILTER_VALUE,
    ADD_SELECTED_POKEMON
} = actionTypesFilterInfo;

export const addFilterValue = createAction<string>(ADD_FILTER_VALUE);
export const addFilteredPokemons = createAction<Array<{}>>(ADD_FILTERED_POKEMONS);
export const selectedPokemon = createAction<Object>(ADD_SELECTED_POKEMON);
