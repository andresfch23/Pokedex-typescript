export interface PokemonsState {
  loading: boolean,
  listPokemons: Array<{}>,
  error: boolean
};

export interface SearchInfoState {
  filterValue: string,
  filteredPokemons: { pokemons: Array<{}> },
  selectedPokemon: Object
};

export interface TypesState {
  loading: boolean,
  listTypes: Array<{}>,
  error: boolean
};

export interface TypePokemons {
  type: { name: string },
  weaknesses: Array<string>
};

export interface SpecificTypePokemon {
  name: string,
  weaknesses: Array<string>
};
