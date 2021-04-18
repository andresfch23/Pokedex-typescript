import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

// Components
import TagType from './TagType';
import Image from './Image';
import Chart from './Chart';

// Interface and helpers
import { removeHyphen, formatText, chooseWeaknesses } from '../utils/helpers';
import { SpecificInfoPokemon, SpecificTypePokemon } from '../interfaces';

type Props = {
    finalStats: Function,
    listTypes: Array<SpecificTypePokemon>
}

const PokemonInfo = ({
    finalStats,
    listTypes,
    ...rest
} :  Props ) => {

    const {
        species,
        formatedNumber,
        image,
        types,
        complementInfo,
        abilities,
        weight,
        height,
        stats,
    } = rest as SpecificInfoPokemon;
    
    const dataStats = finalStats(stats);

    return (
        <div className='pokemon'>
            <h1 className='pokemon__title'>
                {removeHyphen(species.name)} <span className='pokemon__title--number'>{`#${formatedNumber}`}</span>
            </h1>

            <Image
                src={image}
                alt={species.name}
                optionalClassImage='pokemon__image'
                optionalClassContainer='pokemon__image-container'
            />

            <div className='pokemon__info'>

                <div className={`pokemon__info-container ${types[0] ? `background--${types[0].type.name}` : ''}`}>    
                    <p className='pokemon__description'>{formatText(complementInfo, species.name)}</p>

                    {abilities.length > 0 && (
                        <div className='pokemon__info-item'>
                            <h2 className='pokemon__info-title'>Abilities</h2>
                            {abilities.map(({ ability }, idx) => {
                                    return (<span className='pokemon__ability' key={idx}>{removeHyphen(ability.name)}</span>)  
                            })}
                        </div>
                        )
                    }

                    <div className="pokemon__info-item">
                        <h2 className='pokemon__info-title'>Weight</h2>
                        {weight && <span>{weight / 10} kg</span>}
                    </div>

                    <div className="pokemon__info-item">
                        <h2 className='pokemon__info-title'>Height</h2>
                        {height && <span>{height * 10} cm</span>}
                    </div>
                </div>
                
                <div className="pokemon__types">
                    <h2 className="pokemon__types-title">Type</h2>
                    {
                        types.map(({ type: { name } }) => {
                            return (<TagType typePok={name} key={name} type="detail" />)
                        })
                    }
                </div>
                
                <div className="pokemon__weaknesses">
                    <h2 className="pokemon__weaknesses-title">Weaknesses</h2>
                    {chooseWeaknesses(types, listTypes).map((weakness: string) => {
                        return (<TagType typePok={weakness} key={weakness} type="detail" />)
                    })}
                </div>

            </div>

            {dataStats && (
                <Chart
                    data={dataStats}
                    name=""
                    className={`pokemon__chart-wrapper background--${types[0].type.name}-polygon`}
                />
            )}

            <Link href='/'>
                <div className="pokemon__button-back-container">
                    <button className={`pokemon__button-back background--${types[0].type.name}`}>Explore More Pokemon</button>
                </div>
            </Link>
        </div>
    )
};

export default PokemonInfo;

PokemonInfo.propTypes = {
    species: PropTypes.object,
    formatedNumber: PropTypes.string,
    image: PropTypes.string,
    types: PropTypes.array,
    complementInfo: PropTypes.string,
    abilities: PropTypes.array,
    weight: PropTypes.number,
    height: PropTypes.number,
    finalStats: PropTypes.func,
    listTypes: PropTypes.array
}