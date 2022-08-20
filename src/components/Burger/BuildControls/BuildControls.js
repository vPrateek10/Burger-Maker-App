import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls =[
    {label:'Salad', type :'salad'},
    {label:'Meat', type :'meat'},
    {label:'Cheese', type :'cheese'},
    {label:'Bacon', type :'bacon'},
];

const buildControls=(props)=>{
    return(
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl
                addIngredient={()=>props.ingredientAdded(ctrl.type)} 
                removeIngredient={()=>props.ingredientRemoved(ctrl.type)}
                key={ctrl.label}
                label={ctrl.label}
                disabled={props.disables[ctrl.type]}/>
        ))}

        <button className={classes.OrderButton} 
        disabled={props.checkoutAllow}
        onClick={props.onCheckout}>{props.isAuth?'Order Now':'Sign-in to Order'}</button>
    </div>);
}





export default buildControls;