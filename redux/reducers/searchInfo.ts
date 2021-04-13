import { actionTypesFilterInfo } from '../../globalVars';

const {
    ADD_FILTERED_POKEMONS,
    ADD_FILTER_VALUE,
    ADD_SELECTED_POKEMON
} = actionTypesFilterInfo;

const initialState = {
    filterValue: '',
    filteredPokemons: {
        pokemons: []
    },
    selectedPokemon: {}
}

const searchInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_FILTERED_POKEMONS:
            return {
                ...state,
                filteredPokemons: {
                    pokemons: action.filteredPokemons
                }
            }

        case ADD_FILTER_VALUE:
            return {
                ...state,
                filterValue: action.filterValue
            }

        case ADD_SELECTED_POKEMON:
            return {
                ...state,
                selectedPokemon: action.selectedPokemon
            }
        
        default:
            return state;
    }
};

export default searchInfoReducer;