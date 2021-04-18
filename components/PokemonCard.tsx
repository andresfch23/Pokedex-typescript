import React from 'react';
import Image from './Image';
import TagType from './TagType';
import { removeHyphen } from '../utils/helpers';
import PropTypes from 'prop-types';
import { SpecificInfoPokemon } from '../interfaces';

type Props = {
    info: SpecificInfoPokemon,
    onClickPokemon: Function
};

const PokemonCard = ({ info, onClickPokemon }: Props) => {
    const { 
        species: {
            name
        },
        types,
        image,
        formatedNumber
    } = info;

    return (
        <div className='pokemon-card'>
            <Image
                src={image}
                alt={`Pokemons ${name}`}
                optionalClassImage='pokemon-card__image'
                optionalClassContainer={'pokemon-card__image-container'}
                linkTo={`pokemon/${name}`}
                onClick={() => onClickPokemon(info)}
            />
            <div className={'pokemon-card__info'}>
                <span className={'pokemon-card__number'}>{`# ${formatedNumber}`}</span>
                <h1 className='pokemon-card__title'>{removeHyphen(name)}</h1>

                {types && types.map(each => {
                    const { type: { name } } = each;
                    return <TagType typePok={name} key={name} type="general" />
                })}
            </div>

        </div>
    )
};

export default PokemonCard;

PokemonCard.propTypes = {
    info: PropTypes.shape({
       species: PropTypes.shape({ name: PropTypes.string }),
       types: PropTypes.arrayOf(PropTypes.object),
       image: PropTypes.string,
       formatedNumber: PropTypes.string
    }),
    onClickPokemon: PropTypes.func,

}