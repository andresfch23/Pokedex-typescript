import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Loader from '../../components/Loader';
import NotFound from '../../components/NotFound';
import PokemonInfo from '../../components/PokemonInfo';
import Layout from '../../components/Layout';

// Request and helpers
import { fetchInfoPokemon, fetchImage } from '../../requests/pokemons';
import { abbreviateWord, autoScroll } from '../../utils/helpers';

// types
import { RootState } from '../../redux/rootReducer';
import { StatsPokemon } from '../../interfaces';

const Pokemon = () => {
    const router = useRouter();
    const { id: pokemonParamId } = router.query;

    const [pokemonInfo, setPokemonInfo] = useState<Object>({});
    const [notFound, setNotFound] = useState(false);
    
    const pokemons = useSelector((state: RootState) => state.pokemons.listPokemons);
    const selectedPokemon = useSelector((state: RootState) => state.searchInfo.selectedPokemon);
    const listTypes = useSelector((state: RootState) => state.types.listTypes);

    useEffect(() => {
        // Render the info of the pokemon if it exist (when the user comes from home clicking a pokemon),
        // or if doesn't exist a selectedPokemon and the list of all Pokemon exists, the function is
        // executed getting the param of the url and fetching the info 

        if (Object.entries(selectedPokemon).length > 0) {
            getPokemonInfo(true);
        } else if (Object.entries(selectedPokemon).length === 0) {
            getPokemonInfo(false);
        }

    }, []);

    useEffect(() => {
        // Executing the function when the list of pokemon is ready
        if (Object.entries(selectedPokemon).length === 0 && pokemons.length > 0) {
            getPokemonInfo(false);
        }

    }, [pokemons]);

    const getPokemonInfo = async (existSelectedPokemon: boolean) => {
        const { formatedNumber } = selectedPokemon;
        let pokemonInfo = {};
        let notFound: boolean = false;

        if (existSelectedPokemon) {
            const fullImage = await fetchImage(formatedNumber, 'full');

            pokemonInfo = {...selectedPokemon, image: fullImage};
            autoScroll()
            notFound = false
        } else {
            if (pokemons.length > 0) {
                const selectedPok = pokemons.find(pokemon => {
                    const { pokemon_species: { name } } = pokemon;
    
                    return name === pokemonParamId;
                });
    
                if (selectedPok) {
                    pokemonInfo = await fetchInfoPokemon(selectedPok.entry_number, 'full');
                    notFound = false;
                    
                    autoScroll();
                } else {
                    notFound = true
                }
            }
        }

        setPokemonInfo(pokemonInfo);
        setNotFound(notFound);
    }

    const finalStats = (stats: Array<StatsPokemon>) => {
        if (stats) {
            const finalStats = stats.reduce((acc: Array<{ name: string, base_stat: number }>, each) => {
                const { base_stat, stat: { name } } = each;
                const abbreviateStat = abbreviateWord(name);
                const completeName = `${abbreviateStat} (${base_stat})`;

                acc.push({ base_stat, name: completeName });
    
                return acc
            }, []);

            return finalStats;
        }
    }

    return (
        <Layout>
            {
                Object.entries(pokemonInfo).length === 0 && notFound ?
                    (
                        <NotFound type='Pokemon' />
                    ) :
                Object.entries(pokemonInfo).length === 0 ? 
                    (
                        <Loader 
                            classNameContainerImage='pokemon__loading-image-container'
                            classNameContainerLoader='pokemon__loading'
                            classNameImage='pokemon__loading-image'
                        />
                    ) :
                (
                    <PokemonInfo
                        {...pokemonInfo}
                        finalStats={finalStats}
                        listTypes={listTypes}
                    />
                )
            }
        </Layout>
    )
}

export default Pokemon;

Pokemon.propTypes = {
    selectedPokemon: PropTypes.object,
    pokemons: PropTypes.array,
    match: PropTypes.object,
    listTypes: PropTypes.array
};