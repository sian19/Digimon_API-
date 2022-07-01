import React, { useContext, useState } from 'react';

import './search.css';

import Lupa from '../../Assets/lupa.png';

import Results from '../results/Results';

import { Link } from 'react-router-dom';

import { useDataContext } from '../context/AuthContext';

function Search() {

    const [click, setClick] = useState(false);

    const { addText, userLog, addCounter } = useContext(useDataContext);

    if (userLog) {
        return (
            <div className='search'>
                <h1>Digite o nome do digimon abaixo</h1>

                <div className='input'>
                    <input type="text" placeholder='EX: Agumon'
                        onChange={(e) => {

                            addText(e.target.value);

                        }} />

                    <button onClick={() => {

                        setClick(true);

                    }}><img src={Lupa} alt="buscar" /></button>
                </div>

                <Results click={click} setClick={setClick} />

            </div >
        );
    }

    else {
        return (
            <div className='no-search'>
                <div className='container'>
                    <h2>Faça o Login no site para ter acesso ao buscador de digimons no botão abaixo</h2>

                    <button><Link to='/login' onClick={() => {

                        addCounter(3);

                    }}>Login</Link></button>
                </div>
            </div>
        )
    }


}

export default Search;