import React, { useState, useEffect } from 'react';

import endpoint from '../../config/endpoint';
import classes from './home.module.css';

export const Home = () => {
    useEffect(() => {
        (async () => {
            const data = await endpoint.getProducts();
            console.log(data);
        })();
    });

    return(
        <div>
            <div id={ classes.homeDiv }>
                <h1>HOME BITCH!!!</h1>
            </div>
        </div>
    );
}