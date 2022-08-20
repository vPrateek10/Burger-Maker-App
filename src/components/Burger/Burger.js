import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredients/Ingridients';


const burger=(props)=>{

   let transformedIngredients = Object.keys(props.ingredients).map(igKey=>{
        return[...Array(props.ingredients[igKey])].map((_,i)=>{
           return <Ingredient key={igKey+i} type={igKey}/>
        });
    }).reduce((arr,ele)=>{
        return arr.concat(ele);
    },[]);

    if(transformedIngredients.length===0){
        transformedIngredients="Please Start adding Ingredients";
    }
    return(
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {transformedIngredients}
            <Ingredient type="bread-bottom"/>
        </div>
    );
}



export default burger;