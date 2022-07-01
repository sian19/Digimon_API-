import React, { useEffect, useRef, useState } from 'react';

import './cards.css';

import setaEsquerda from '../../Assets/seta-esquerda.png';
import setaDireita from '../../Assets/seta-direita.png';

function Cards({ updateChar }) {

    let id = 0;

    const carrossel = useRef(null);

    const handleft = () => {
        carrossel.current.scrollLeft -= 100;
        carrossel.current.offsetWidth = carrossel.current.scrollLeft

    }

    const handright = () => {
        carrossel.current.scrollLeft += 100;
        carrossel.current.offsetWidth = carrossel.current.scrollLeft
    }

    //Estado para pegar o valor do id e exibir em tela quantos digimons foram encontrados//

    const [numberDigimon, setNumberDigimon] = useState(0)

    //

    useEffect(() => {

        setNumberDigimon(id);

    }, [id])


    return (
        <>
            <h1 className='number-digi'>{numberDigimon == 1 ? `Foi encontrado ${numberDigimon} Digimon` : `Foram encontrados ${numberDigimon} Digimons`}</h1>

            <div className='cards-container' ref={carrossel}>
                {
                    updateChar.map((item) => {

                        id += 1;

                        return (
                            <div className='card' key={id}>
                                <div className='img'>
                                    <img src={item.img} />
                                </div>
                                <h3>Name: <p>{item.name}</p> </h3>
                                <h3>Level: <p>{item.level}</p></h3>
                                <h3>Número do digimon: <p>{id}</p></h3>
                            </div>
                        )

                    })

                }
            </div>
            <div className={updateChar.length == 1 ? 'off-setas' : 'setas'}>
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