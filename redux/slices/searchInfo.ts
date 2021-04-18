import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchInfoState, SpecificInfoPokemon } from '../../interfaces';

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
        addFilteredPokemons(state, action: PayloadAction<Array<SpecificInfoPokemon>>) {
            state.filteredPokemons = { pokemons: action.payload }
        },
        addFilterValue(state, action: PayloadAction<string>) {
            state.filterValue = action.payload
        },
        addSelectedPokemon(state, action: PayloadAction<SpecificInfoPokemon>) {
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