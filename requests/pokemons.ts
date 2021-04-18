import axios from 'axios';
import { noZeroatBegin } from '../utils/globalVars';
import { formatNumber } from '../utils/helpers';
import { InfoPokemon, TypePokemons } from '../interfaces';

export const fetchInitialInfo = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokedex/1/');

    const { data: { pokemon_entries } } = response;

    return pokemon_entries;
};

export const fetchPokemons = async (queryText: string, infoPokemons: Array<InfoPokemon>) : Promise<any> => {
    try {
        const filteredPokemons = infoPokemons.reduce((acc: Array<Promise<any>>, pokemon) => {
            const { entry_number, pokemon_species: { name } } = pokemon;
            const removeZeroAtBegin = !isNaN(+queryText) && queryText.replace(noZeroatBegin, "");
                    
            if (entry_number.toString() === removeZeroAtBegin || name.includes(queryText.toLowerCase())) {
                const fetchedInfo = fetchInfoPokemon(entry_number, 'detail');
                acc.push(fetchedInfo);
            }

            return acc;
        }, []);

        const pokemons = await Promise.all(filteredPokemons);

        return pokemons;
    } catch (error) {
        console.error(error);
    }
}

export const fetchTypePokemons = async (): Promise<any> => {
    try {
        const request = await axios.get('https://pokeapi.co/api/v2/type/');
        const types = request.data.results;

        const typesInfo = await types.map(async (type: TypePokemons) => {
            const { name, url } = type;
            const request = await axios.get(url);
            const data = request.data;
            const { double_damage_from } = data.damage_relations;
            const namesDamage = double_damage_from.map((each: TypePokemons) => each.name);

            return {
                name,
                weaknesses: namesDamage
            };
        });

        const info = await Promise.all(typesInfo);
        
        return info;
    } catch(error) {
        console.error(error);
    }
}

export const fetchImage = async (num: string | undefined, type: string) => {
    const typeImg = type === 'detail' ? type : 'full';
    const urlImage = `/api/images/${typeImg}/${num}`;
    const response = await axios.get(urlImage);
    const image = response.data?.image;

    return image;
} 

export const fetchInfoPokemon = async (urlInfo: string, typeImg: string) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${urlInfo}`;
        const response = await axios.get(url);
        const data = response.data;
        const formatedNumber = formatNumber(data.id); 
        const image = await fetchImage(formatedNumber, typeImg);

        const complementInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${urlInfo}`).then(response => {
            const { data: { flavor_text_entries } } = response;

            const arrayDescriptions = flavor_text_entries
                .find(({ language: { name } }: { language: { name: string } })  => name === 'en');

            return arrayDescriptions.flavor_text.replace(/\s/g, " ");
        });
        
        const infoPokemon = {...data, image, complementInfo, formatedNumber};
        
        return infoPokemon;
    } catch(error) {
        console.error(error)
    }
}