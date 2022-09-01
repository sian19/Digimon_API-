import React, { useContext, useState } from 'react';

import './search.css';

import Lupa from '../../Assets/lupa.png';

import Results from '../results/Results';

import { Link } from 'react-router-dom';

import { useDataContext } from '../context/AuthContext';
import { useEffect } from 'react';


function Search() {

    const [click, setClick] = useState(false);
    const [text, setText] = useState('');
    const [updateDig, setUpdateDigi] = useState([])

    const {userLog, addCounter, digimons} = useContext(useDataContext);

    //Função que filtra os digimons que o usuário digita//
        function searchDigimons(){
            if(text){
                const caseDigi = text.toLowerCase();
                setUpdateDigi(digimons.filter((digi)=> {
                    return digi.name.toLowerCase().includes(caseDigi);
                    
                }))
            }
        }
    //

    const [names, setNames] = useState([]);

    if (userLog) {
        return (
            <div className='search'>
                <h1>Digite o nome do digimon abaixo</h1>

                <div className='input'>
                    <input value = {text} type="text" placeholder='EX: Agumon'
                        onChange={(e) => {
                            setClick(false);
                            setText(e.target.value);

                        }} />

                    <button onClick={() => {

                        searchDigimons();
                        setClick(true);

                    }}><img src={Lupa} alt="buscar" /></button>
                </div>

                <Results click={click} updateDig={updateDig} text={text} setUpdateDigi={setUpdateDigi}/>

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