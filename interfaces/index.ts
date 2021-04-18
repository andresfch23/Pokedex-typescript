export interface PokemonsState {
  loading: boolean,
  listPokemons: Array<InfoPokemon>,
  error: boolean
};

export interface SearchInfoState {
  filterValue: string,
  filteredPokemons: { pokemons: Array<SpecificInfoPokemon> },
  selectedPokemon: { formatedNumber?: string }
};

export interface TypesState {
  loading: boolean,
  listTypes: Array<SpecificTypePokemon>,
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
  abilities: [
    {
      ability: {
        name: string
      }
    }
  ],
  base_experience: number,
  forms: [],
  height: number,
  id: number,
  moves: [],
  name: string,
  order: number,
  species: {
    name: string
  },
  stats: [],
  types: [
    { 
      type : { 
        name: string,
        url: string
      }
    }
  ],
  weight: number,
  image: string,
  formatedNumber: string,
  complementInfo: string
};
export interface StatsPokemon {
  base_stat: number,
  stat: {
    name: string,
    url: string
  }
  name: string
}