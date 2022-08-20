import React from 'react';
import classes from './NavigationItems.css';
import NavItem from './NavigationItem/NavigationItem';

const navigationItems=(props)=>{
    let auth = <NavItem link='/auth'>Login</NavItem>;
    if(props.isAuthenticated){
        auth = <NavItem link='/logout'>Logout</NavItem>
    }
    return(
     <ul className={classes.NavigationItems}>
        <NavItem link="/" exact >
            Burger Builder
        </NavItem>
        { props.isAuthenticated?<NavItem link="/orders" exact>
            My Orders
        </NavItem>:null}
        {auth}
     </ul>
    );
}

export default navigationItems;