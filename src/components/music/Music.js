import React from 'react';

import './music.css';

import imgMusic from '../../Assets/reprodutor-de-musica.png';

import audio from '../../Assets/Digimon-Adventure-Brave-Heart-With-Lyrics_qSr2UdTt650.mp3';

function Music() {
    return (
        <div className='music'>
            <img src={imgMusic} alt="musica" />
            <h3>Clique aqui</h3>
            <audio src={audio} controls></audio>
        </div>
    )
}

export default Music;