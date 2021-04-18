import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPokemons } from '../redux/slices/pokemon';
import { addTypes } from '../redux/slices/types';

type Props = {
  children?: ReactNode
}

const InitializeState = ({ children }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addPokemons());
        dispatch(addTypes());
    }, []);

    return (
        <>
            {children}
        </>
    );
}

export default InitializeState;
