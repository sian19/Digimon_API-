import React, { useEffect, useState, useContext } from 'react';

import './login.css';
import img from '../../Assets/agumonn.png';

import { useDataContext } from '../context/AuthContext';

import { Link } from 'react-router-dom';

import imgVeemon from '../../Assets/02kizuna_1vmon_may26_2019.png';

import { firebaseConfig } from '../../firebase/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, logErr, showModal, addCounter } = useContext(useDataContext);

    //Estado que guarda os valores que estão no banco de dados//
    const [users, setUsers] = useState([]);
    //

    const db = getFirestore(firebaseConfig);
    const userCollectionRef = collection(db, 'users');

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);

            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers()

    }, [])

    //Estado e função que verifica se o usuário está logado//
    const { userLog, addUserLog } = useContext(useDataContext);
    //


    return (
        <div className={userLog ? 'off-login' : 'login'}>

            <div className={showModal ? 'on-modal' : 'off-modal'}>
                <div className='container'>
                    <h3>Logado com sucesso!</h3>
                    <h4>Clique no botão abaixo para entrar no mundo digital!</h4>
                    <img src={img} alt="" />
                    <Link to="/search" onClick={(e) => {

                        addUserLog();
                        addCounter(2);

                    }}>Comece a navegar agora!</Link>
                </div>
            </div>

            <div className='form'>
                <div className='img'><img src={imgVeemon} /></div>

                <form action="">
                    <div className='title'><h2>Faça o login para embarcar nesse mundo digital</h2></div>

                    <h3>E-mail</h3>
                    <input type="email" required onChange={(e) => {

                        setEmail(e.target.value);

                    }} />

                    <h3>Senha</h3>
                    <input type="password" required onChange={(e) => {

                        setPassword(e.target.value);

                    }} />

                    <p className={logErr ? 'on-error' : 'off-error'}>Email ou senha incorretos!</p>

                    <button onClick={(e) => {

                        login(email, password, users, e);

                    }}>Enter</button>

                </form>
            </div>
        </div>
    )
}

export default Login;



