export interface PokemonsState {
  loading: boolean,
  listPokemons: Array<InfoPokemon>,
  error: boolean
};

export interface SearchInfoState {
  filterValue: string,
  filteredPokemons: { pokemons: Array<SpecificInfoPokemon> },
  selectedPokemon: Object
};

export interface TypesState {
  loading: boolean,
  listTypes: Array<{}>,
  error: boolean
};

export interface TypePokemons {
    name: string,
    url: string
};

export interface SpecificTypePokemon {
  name: string,
  weaknesses: Array<string>
};

export interface InfoPokemon {
  entry_number: string,
  pokemon_species: TypePokemons,
};

export interface SpecificInfoPokemon {
  abilities: [],
  base_experience: number,
  forms: [],
  height: number,
  id: number,
  is_default: boolean,
  moves: [],
  name: string,
  order: number,
  species: {
    name: string
  },
  stats: [],
  types: [],
  weight: number,
  image: string,
  formatedNumber: string
}