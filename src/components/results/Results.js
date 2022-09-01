import React,{useEffect} from 'react';

import './results.css';

import Error from './Error';

import Cards from '../cards/Cards';


function Results({ click, updateDig, text, setUpdateDigi }) {

    //Código abaixo responsável por limpar a array que guarda os digimons caso o usuário limpe o campo de busca com a tecla backspace//
    useEffect(()=>{
        document.addEventListener('keydown', detectKeyDown, true)
    },[])
    
    const detectKeyDown = (e)=>{
        if(e.key === 'Backspace'){
            setUpdateDigi([]);
        }
    }

    //
    
        if(!text && click){
            return <Error text={text}/>
        }

        else if(updateDig == '' && !click){
            return <></>
        }
    
        else if(updateDig == '' && click){
            return <Error text={text}/>
        }
    
        else{
            console.log(text)
            return <Cards updateDig={updateDig}/>
        }
    


}

export default Results;