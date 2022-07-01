import React, { useContext } from 'react';

import './nav.css';
import './avatar-user.css';
import './log-out.css';

import { Link, useNavigate } from 'react-router-dom';

import { useDataContext } from '../context/AuthContext';


function Nav() {

    const navigate = useNavigate();

    const { colorList1, colorList2, colorList3, colorList4, addCounter, logOut } = useContext(useDataContext);


    //Estado que verifica se o usuário está logado//
    const { userLog, name, avatar } = useContext(useDataContext);
    //


    return (
        <nav className='navigation'>
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

                <li className={userLog ? 'off-login' : 'on-login'}><Link to="/login" onClick={() => {

                    addCounter(3);

                }}
                    style={{ color: colorList3 }}
                >Login</Link></li>

                <li className={userLog ? 'off-register' : 'on-register'}><Link to="/register" onClick={() => {

                    addCounter(4);

                }}
                    style={{ color: colorList4 }}
                >Register</Link></li>

                <li style={{ display: userLog ? 'block' : 'none' }}><Link to='/perfil' style={{ color: colorList3 }} onClick={() => {

                    addCounter(3);

                }}>Perfil</Link></li>

                <li style={{ paddingRight: userLog ? '40px' : '0' }}><button className={userLog ? 'log-out' : 'off-log-out'} onClick={() => {

                    logOut();
                    navigate('/login');

                }}>Log out</button></li>

                <div className='avatar-user-mobile' style={{ display: userLog ? 'block' : 'none' }}>
                    <div className='img' ><img src={avatar} alt="" /></div>
                    <h4>{name}</h4>
                </div>

            </ul>

        </nav>
    );
}

export default Nav;