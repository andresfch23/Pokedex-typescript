import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchInfoState } from '../../interfaces';

const initialState = {
    filterValue: '',
    filteredPokemons: {
        pokemons: []
    },
    selectedPokemon: {}
} as SearchInfoState;

const searchInfoSlice = createSlice({
    name: 'searchInfo',
    initialState,
    reducers: {
        addFilteredPokemons(state, action: PayloadAction<Array<{}>>) {
            state.filteredPokemons = { pokemons: action.payload }
        },
        addFilterValue(state, action: PayloadAction<string>) {
            state.filterValue = action.payload
        },
        addSelectedPokemon(state, action: PayloadAction<Object>) {
            state.selectedPokemon = action.payload
        }
    }
});

export const {
    addFilteredPokemons,
    addFilterValue,
    addSelectedPokemon
} = searchInfoSlice.actions;

export default searchInfoSlice.reducer;