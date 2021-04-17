import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '../store';
import { fetchTypePokemons } from '../../requests/pokemons';
import { TypesState } from '../../interfaces';

const initialState = {
    loading: false,
    listTypes: [],
    error: false
} as TypesState;

const typesSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        addStarted(state) {
            state.loading = true;
        },
        addSuccess(state, action: PayloadAction<Array<{}>>) {
            state.loading = false;
            state.error = false;
            state.listTypes = action.payload;
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
} = typesSlice.actions;

export const addTypes = (): AppThunk  => async (dispatch: AppDispatch) => {
    dispatch(addStarted());

    return fetchTypePokemons().then(res => {
        dispatch(addSuccess(res));
    })
    .catch(err => {
        console.error(err);
        dispatch(addFailure())
    });   
};

export default typesSlice.reducer;