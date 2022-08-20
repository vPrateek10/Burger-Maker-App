import React from 'react';
import classes from './Order.css'
import Burger from '../Burger/Burger';

const order =(props)=>{
    let ing = [];
    for(let ingredientName in props.ingredients){
        ing.push({ingredient:ingredientName,amount:props.ingredients[ingredientName]});
    }

    let ingOutput = ing.map(ig=>{
    return <span
        className={classes.Ingredients}
    key={ig.ingredient}> {ig.ingredient} ({ig.amount})  </span>
    })


    return(
        <div className={classes.Order}>
            <p>Ingredients:{ingOutput}</p>
            <p>Price:<strong>{props.price.toFixed(2)}</strong></p>
            <p>Address: {props.street}, {props.pincode}</p>
            <p>Delivery Method : {props.delivery}</p>
            <Burger ingredients={props.ingredients}/>
        </div>
    );
}
export default order;