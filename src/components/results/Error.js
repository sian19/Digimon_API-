import React from 'react';

import './error.css';

import ImgError from './ImgError';


function Error({ text }) {


    if (text == '') {
        return (
            <div className='error'>
                <h3>O campo de busca está vazio!</h3>
                <ImgError />
            </div>
        )
    }

    else {
        return (
            <div className='error-empty'>
                <h3>Digimon não encontrado!</h3>
                <ImgError />
            </div>
        )
    }

}

export default Error;