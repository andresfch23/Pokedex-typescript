import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '../store';
import { fetchInitialInfo } from '../../requests/pokemons';
import { PokemonsState, InfoPokemon } from '../../interfaces';

const initialState = {
    loading: false,
    listPokemons: [],
    error: false
} as PokemonsState;

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        addStarted(state) {
            state.loading = true;
        },
        addSuccess(state, action: PayloadAction<Array<InfoPokemon>>) {
            state.loading = false;
            state.error = false;
            state.listPokemons = action.payload;
        },
        addFailure(state) {
            state.loading = false;
            state.error = true;
        }
    }
});

const {
    addStarted,
    addSuccess,
    addFailure
} = pokemonsSlice.actions;

export const addPokemons = (): AppThunk  => async (dispatch: AppDispatch) => {
    dispatch(addStarted());

    return fetchInitialInfo().then(res => {
        dispatch(addSuccess(res));
    })
    .catch(err => {
        console.error(err);
        dispatch(addFailure())
    });   
}

export default pokemonsSlice.reducer;