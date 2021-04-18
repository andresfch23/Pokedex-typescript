import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';

// Components
import PokemonCard from '../components/PokemonCard';
import Loader from '../components/Loader';

// Other stuff
import { noSpecialCharacters } from '../utils/globalVars';
import { fetchPokemons } from '../requests/pokemons';
import { autoScroll } from '../utils/helpers';
import { addFilteredPokemons, addFilterValue, addSelectedPokemon } from '../redux/slices/searchInfo';

// Interfaces
import { RootState } from '../redux/rootReducer';
import { SpecificInfoPokemon } from '../interfaces';

let inputTimer: ReturnType<typeof setTimeout>;

const Home = () => {
  // Props of Redux store
  const pokemons = useSelector((state: RootState) => state.pokemons.listPokemons);
  const filterValue = useSelector((state: RootState) => state.searchInfo.filterValue);
  const filteredPokemons = useSelector((state: RootState) => state.searchInfo.filteredPokemons.pokemons);
  const dispatch = useDispatch();

  // State 
  const [searchVal, setSearchVal] = useState(filterValue || '');
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const classNameContainerState =
    searchVal.length <= 2 ?
      'pokemons-container-empty' :
      filteredPokemons.length > 0 ?
        'pokemons-container-ready' :
        notFound &&
        'pokemons-container-notFound';

  const onChangeInput = (e: { target: { value: string } }) => {
    const value = e.target.value.trim().replace(noSpecialCharacters, '');
    const previousVal = searchVal;
    const duration = 500;

    if (value !== previousVal) {

      setSearchVal(value);
      setNotFound(false);

      dispatch(addFilterValue(value));

      if (value.length >= 3) {
        setLoading(true);
      }

      // Delaying the execution of the function when the user type a letter            

      clearTimeout(inputTimer);

      inputTimer = setTimeout(() => {

        // Searching a pokemon only when the user writte 3 or more letters
        if (value.length <= 2) {
          dispatch(addFilteredPokemons([]));

          setLoading(false);
        } else {
          setLoading(true)
          fetchPokemons(value, pokemons).then((filteredPokemons) => {
            dispatch(addFilteredPokemons(filteredPokemons));

            autoScroll();

            setError('');
            setNotFound(filteredPokemons.length > 0 ? false : true);
            setLoading(false);

          }).catch(error => {
            setError(error);
          });
        }
      }, duration);

    }
  }

  const onClickPokemon = (info: SpecificInfoPokemon) => {
    dispatch(addSelectedPokemon(info));
  };

  return (
    <Layout title="Home">
      <div className="home">
        <div className="home__search">
          <input
            type='text'
            placeholder="NAME OR NUMBER"
            value={searchVal}
            onChange={onChangeInput}
            className='home__search-input'
          />
        </div>

        <div className="home__description">
          <div className="home__description-container">
            <p>Search the pokemon by name or number. You must to writte at least 3 characters to search a pokemon. Example: {`'bul'`} or 001</p>
          </div>
        </div>

        {loading && (
          <Loader
            classNameContainerImage='home-loading-image-container'
            classNameContainerLoader='home-loading'
            classNameImage='home-loading-image'
          />
        )}

        <div className={`pokemons-container ${classNameContainerState}`}>

          {filteredPokemons.length > 0 ? (
            <div>
              {filteredPokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} info={pokemon} onClickPokemon={onClickPokemon} />
              ))}
            </div>
          ) : notFound ? (
            <span className="pokemons__notFound-text">
              We couldn´t find coincidences for a Pokemon with this search: {`'${searchVal}'`}
            </span>
          ) : error && (
            <span>An error ocurred</span>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default Home;

Home.propTypes = {
  filterValue: PropTypes.string,
  pokemons: PropTypes.array,
  addFilterValue: PropTypes.func,
  addFilteredPokemons: PropTypes.func,
  filteredPokemons: PropTypes.array,
  selectedPokemon: PropTypes.func
};