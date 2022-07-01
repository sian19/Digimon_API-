import React, { useState } from 'react';

import imgError1 from '../../Assets/Error.png';
import imgError2 from '../../Assets/errorTsunomon.png';
import imgError3 from '../../Assets/Yokomon.png';
import imgError4 from '../../Assets/Mochimon_t.png';
import imgError5 from '../../Assets/Tanemon_t.png';
import imgError6 from '../../Assets/Tokomon_t.png';
import imgError7 from '../../Assets/Bukamon.png';


function ImgError() {

    const [digimons] = useState([imgError1, imgError2, imgError3, imgError4, imgError5, imgError6, imgError7])

    let i = Math.floor(Math.random() * digimons.length)

    return (
        <img src={digimons[i]} />
    )


}

export default ImgError;