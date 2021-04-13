import axios from 'axios';
import { noZeroatBegin } from '../globalVars';
import { formatNumber } from '../helpers';

export const fetchInitialInfo = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokedex/1/');

    const { data: { pokemon_entries } } = response;

    return pokemon_entries;
};

export const fetchPokemons = async (queryText, infoPokemons) => {
    try {
        const filteredPokemons = infoPokemons.reduce((acc, pokemon) => {
            const { entry_number, pokemon_species: { name } } = pokemon;
            const removeZeroAtBegin = !isNaN(queryText) && queryText.replace(noZeroatBegin, "");
                    
            if (entry_number.toString() === removeZeroAtBegin || name.includes(queryText.toLowerCase())) {
                acc.push(fetchInfoPokemon(entry_number, 'detail'));
            }

            return acc;
        }, []);

        const pokemons = await Promise.all(filteredPokemons);

        return pokemons;
    } catch (error) {
        console.error(error);
    }
}

export const fetchTypePokemons = async () => {
    try {
        const request = await axios.get('https://pokeapi.co/api/v2/type/');
        const types = request.data.results;

        const typesInfo = await types.map(async type => {
            const { name, url } = type;
            const request = await axios.get(url);
            const data = request.data;
            const { double_damage_from } = data.damage_relations;
            const namesDamage = double_damage_from.map(each => each.name);

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

export const fetchImage = async (num, type) => {
    const typeImg = type === 'detail' ? 'detail' : type === 'full' && 'full';

    const urlImage = `https://cors-anywhere.herokuapp.com/http://assets.pokemon.com/assets/cms2/img/pokedex/${typeImg}/${num}.png`;

    const image = await axios.get(urlImage, { responseType: 'arraybuffer' }).then(response => {
        return `data:image/png;base64, ${Buffer.from(response.data, 'binary').toString('base64')}` ;
    });

    return image;
} 

export const fetchInfoPokemon = async (urlInfo, typeImg) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${urlInfo}`;
        const response = await axios.get(url);
        const data = response.data;
        const formatedNumber = formatNumber(data.id); 
        const image = await fetchImage(formatedNumber, typeImg);

        const complementInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${urlInfo}`).then(response => {
            const { data: { flavor_text_entries } } = response;

            const a = flavor_text_entries.find(description => {
                return description.language.name === 'en';
            });

            return a.flavor_text.replace(/\s/g, " ");
        });
        
        const infoPokemon = {...data, image, complementInfo, formatedNumber};
        
        return infoPokemon;
    } catch(error) {
        console.error(error)
    }
}