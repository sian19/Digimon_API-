import React, { useContext } from 'react';

import './results.css';

import Error from './Error';

import { useDataContext } from '../context/AuthContext';

import Cards from '../cards/Cards';

let clicou = '';

function Results({ click, setClick }) {

    const { text, char } = useContext(useDataContext);

    if (text != '' && click && clicou == '') {
        clicou = 'clicado';

        let updateChar = char.filter((item) => {
            let format = '';

            for (let i = 0; i < text.length; i++) {
                format += item.name[i];
            }

            return format == text
        })

        if (updateChar == '') {
            return (
                <Error text={text} />
            )
        }

        else {
            return <Cards updateChar={updateChar} />
        }

    }


    if (text != '' && click && clicou == 'clicado') {
        clicou = ''
        setClick(false);
        return (
            <></>
        )
    }


    if (clicou == '' && !click) {
        return (
            <></>
        )
    }

    if (click && clicou == 'clicado') {
        setClick(false);
        clicou = '';

        return (
            <></>
        )
    }

    if (click && text == '') {
        clicou = 'clicado';

        return (
            <Error text={text} />
        )
    }

}

export default Results;