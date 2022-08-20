import React from 'react';
import classes from './Menu.css';


const menu=(props)=>{

    return(
        <div onClick={props.clicked} className={classes.Menu}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default menu;