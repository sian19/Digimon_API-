import React, { useContext } from 'react';

import './header.css';
import './nav.css';
import Logo from '../../Assets/logo.png';


import Nav from './Nav';
import Hambur from '../menu-mobile/Hambur';
import MenuMob from '../menu-mobile/MenuMob';
import { useDataContext } from '../context/AuthContext';

function Header() {

    const { userLog, name, avatar } = useContext(useDataContext);

    return (
        <header>

            <div className='center' style={{ padding: !userLog ? '1.2rem 2%' : '10px 2%' }}>

                <div className='container-avatar'>
                    <div className='avatar-user-mobile' style={{ display: userLog ? 'block' : 'none' }}>
                        <div className='img' ><img src={avatar} alt="" /></div>
                        <h4>{name}</h4>
                    </div>
                </div>

                <div className='logo-mob' ><img src={Logo} alt="logo" /></div>

                <div className='logo-desktop' ><img src={Logo} alt="logo" /></div>

                <Nav />
                <Hambur />
                <MenuMob />

            </div>
        </header>
    );
}

export default Header