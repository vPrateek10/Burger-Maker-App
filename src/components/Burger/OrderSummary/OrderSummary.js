import React from 'react';
import Auxillary from '../../../containers/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary=(props)=>{
    const ingSummary = Object.keys(props.ingredients)
    .map(igKey=>{
    return (<li key={igKey}>

        <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
        </li>);
    });
    
    return(
        <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingSummary}
            </ul>
            <strong><p>Price: {props.price.toFixed(2)}$</p></strong>
            <p>Continue Checkout ?</p>
            <Button 
            clicked={props.cancel}
            btnType='Danger'>CANCEL</Button>
            <Button
            clicked={props.continue}
            btnType='Success'>CONTINUE</Button>
        </Auxillary>
    );
};

export default orderSummary;