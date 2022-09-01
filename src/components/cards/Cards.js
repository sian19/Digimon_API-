import React, { useEffect, useRef, useState } from 'react';

import './cards.css';

import setaEsquerda from '../../Assets/seta-esquerda.png';
import setaDireita from '../../Assets/seta-direita.png';

function Cards({ updateDig }) {

    const carrossel = useRef(null);

    const handleft = () => {
        carrossel.current.scrollLeft -= 100;
        carrossel.current.offsetWidth = carrossel.current.scrollLeft

    }

    const handright = () => {
        carrossel.current.scrollLeft += 100;
        carrossel.current.offsetWidth = carrossel.current.scrollLeft
    }


    return (
        <>
            <h1 className='number-digi'>{updateDig.length == 1 ? `Foi encontrado ${updateDig.length} Digimon` : `Foram encontrados ${updateDig.length} Digimons`}</h1>

            <div className='cards-container' ref={carrossel}>
                {
                    updateDig.map((item) => {

                        return (
                            <div className='card' key={item.number}>
                                <div className='img'>
                                    <img src={item.img} />
                                </div>
                                <h3>Name: <p>{item.name}</p> </h3>
                                <h3>Level: <p>{item.level}</p></h3>
                                <h3>Número do digimon: <p># {item.number}</p></h3>
                            </div>
                        )
        
                    })

                }
            </div>
            <div className={updateDig.length == 1 ? 'off-setas' : 'setas'}>
                <img src={setaEsquerda} alt="esquerda" onClick={() => {

                    handleft()

                }} />
                <img src={setaDireita} alt="direita" onClick={() => {

                    handright()

                }} />

            </div>
        </>
    );
}

export default Cards;