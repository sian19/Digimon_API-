import React, { useEffect, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDataContext } from '../context/AuthContext';

import './modal-load.css';

function ModalLoad({ userCreate, setUserCreate }) {

    const [count, setCount] = useState(10);
    const [sucess, setSucess] = useState('Criando a conta aguarde...');

    const navigate = useNavigate();

    const { addCounter } = useContext(useDataContext);

    useEffect(() => {
        if (userCreate) {
            if (count < 0) {
                setSucess('Conta criada com sucesso!');
                return
            }

            else {
                setTimeout(() => {
                    setCount(count => count - 1);
                }, 1000)
            }
        }
    }, [count, userCreate])

    return (
        <div className={userCreate ? 'modal-load' : 'off-modal-load'}>
            <div className='container'>
                <h3>{sucess}</h3>
                <div className='loader' style={{ display: count > -1 ? 'block' : 'none' }}></div>
                <div className='contador' style={{ display: count > -1 ? 'block' : 'none' }}>
                    <h2 className='count'>{count}</h2>
                </div>


                <button onClick={() => {
                    setCount(0);
                    setUserCreate(false);
                    addCounter(3);
                    navigate('/login');
                }} style={{
                    cursor: count < 0 ? 'pointer' : 'nodrop',
                    display: count < 0 ? 'block' : 'none'
                }}>Clique aqui</button>

                <button style={{ display: count < 0 ? 'none' : 'block' }}>Aguarde...</button>

            </div>
        </div >
    )
}

export default ModalLoad;