import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope you Like it !</h1>
            <div style={{margin:'auto',width:'80%'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger"  clicked={props.onCheckoutCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.onCheckoutContinued}>Continue</Button>
        </div>
    );
}

/*const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}*/

export default checkoutSummary;