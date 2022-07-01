import React, { useContext } from 'react';

import './hambur.css';

import { useDataContext } from '../context/AuthContext';

function Hambur() {

    const { addShowMenu } = useContext(useDataContext);


    return (
        <div className='hamburg' onClick={() => {

            addShowMenu()

        }}>
            <input type="checkbox" id='check' />
            <label htmlFor="check">
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    );
}

export default Hambur;