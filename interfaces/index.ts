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
