import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems';
import Menu from '../../UI/Menu/Menu';



const toolbar=(props)=>{
    return(
        <header className={classes.Toolbar}>
            <div>
                <Menu clicked={props.clicked}/>
            </div>
            <Logo height="80%"/> 
            <nav className={classes.DesktopOnly}>
                <NavItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    );
}


export default toolbar;