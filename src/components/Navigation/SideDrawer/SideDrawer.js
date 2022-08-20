import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../containers/Auxillary/Auxillary';

const sideDrawer = (props) => {
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer,classes.Open]
    }

    return (
        <Auxillary>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <Logo height="11%" />
                <nav>
                    <NavItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Auxillary>
    );
}

export default sideDrawer;