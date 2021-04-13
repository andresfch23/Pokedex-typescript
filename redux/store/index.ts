import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import pokemonsReducer from '../reducers/pokemons';
import typesReducer from '../reducers/types';
import searchInfoReducer from '../reducers/searchInfo';

const store = configureStore({
    pokemons: pokemonsReducer,
    types: typesReducer,
    searchInfo: searchInfoReducer
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

