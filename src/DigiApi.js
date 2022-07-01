import React from 'react';

import './style/globalStyle.css';
import './style/main.css'

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import { AuthProvider } from './components/context/AuthContext';

import Music from './components/music/Music';

import List from './components/list/List';
import Search from './components/search/Search';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Perfil from './components/perfil/Perfil';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function DigiApi() {

    return (

        <AuthProvider>
            <Router>
                <Header />
                <main>
                    <div className='center'>
                        <Music />
                        <Routes>
                            <Route path="/list" element={<List />} />
                            <Route path="/" element={<List />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path='/perfil' element={<Perfil />} />
                        </Routes>

                    </div>
                </main>
                <Footer />
            </Router>
        </AuthProvider>

    );
}

export default DigiApi;