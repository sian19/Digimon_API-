import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { useDataContext } from '../context/AuthContext';

import './menu-mob.css';

function MenuMob() {

    const { colorList1, colorList2, colorList3, colorList4, addCounter, movementMenu } = useContext(useDataContext);

    const { logOut } = useContext(useDataContext);

    //Estado que verifica se o usuário está logado//
    const { userLog } = useContext(useDataContext);
    //

    return (
        <nav className='menuMob' style={{
            left: movementMenu,
            height: userLog ? '310px' : '320px'
        }}>
            <ul>
                <li><Link to="/list" onClick={() => {

                    addCounter(1);

                }}
                    style={{ color: colorList1 }}
                >List</Link></li>

                <li><Link to="/search" onClick={() => {

                    addCounter(2);

                }}
                    style={{ color: colorList2 }}
                >Search</Link></li>

                <li><Link to="/login" onClick={() => {

                    addCounter(3);

                }}
                    style={{ color: colorList3 }}
                    className={userLog ? 'off-login' : 'on-login'}
                >Login</Link></li>

                <li><Link to="/register" onClick={() => {

                    addCounter(4);

                }}
                    style={{ color: colorList4 }}
                    className={userLog ? 'off-register' : 'on-register'}
                >Register</Link></li>

                <li style={{ display: userLog ? 'block' : 'none' }}><Link to="/perfil" style={{ color: colorList3 }} onClick={() => {

                    addCounter(3);

                }}>Perfil</Link></li>

                <li className={userLog ? 'on-button-out' : 'off-button-out'}><button onClick={() => {

                    logOut();

                }}>Log out</button></li>
            </ul>
        </nav>
    )
}

export default MenuMob;