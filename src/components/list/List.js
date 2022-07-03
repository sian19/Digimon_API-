import React, { useEffect, useState, useContext } from 'react';
import './list.css';

import { useDataContext } from '../context/AuthContext';

function List() {

    const { char } = useContext(useDataContext);
    let key = 0;

    //Abaixo código para fazer uma pequena animação de letras em tela//
    let subTitle = 'DIGIMON API';
    const [name, setName] = useState('');
    let i = -1;
    let frase = '';

    useEffect(() => {

        setInterval(() => {
            i += 1
            if (i >= subTitle.length) {
                i = 0
                setName('');
                frase = '';
            }

            frase += subTitle[i]
            setName(frase);

        }, 400)

    }, [i])

    //------//

    return (
        <>
        <div className='list'>
            <h2>Abaixo a lista com todos os digimons que você pode buscar no site:</h2>

            <h2>{name}</h2>

            <div className='box-list'>
                <h3>Digimons:</h3>

                <ul>
                    {
                        char.map((item) => {
                            key += 1;
                            return (<li key={key}>{item.name}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
        </>
    );
}

export default List;