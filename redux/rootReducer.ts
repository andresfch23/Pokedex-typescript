import { combineReducers } from '@reduxjs/toolkit';
import pokemonsReducer from '../redux/slices/pokemon';
import searchInfoReducer from '../redux/slices/searchInfo';
import typesReducer from '../redux/slices/types';

const rootReducer = combineReducers({
    pokemons: pokemonsReducer,
    types: typesReducer,
    searchInfo: searchInfoReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;