import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    ingredients:null,
    price: 3,
    appError:false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    meat: 0.7,
    bacon: 1,
    cheese: 0.2
}

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]:state.ingredients[action.ingredientName]+1}
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
            const updatedState={
                ingredients:updatedIngredients,
                price:state.price + INGREDIENT_PRICE[action.ingredientName]

            }
            return updateObject(state,updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = { [action.ingredientName]:state.ingredients[action.ingredientName]-1}
            const updatedIngs = updateObject(state.ingredients,updatedIng);
            const updatedSt={
                ingredients:updatedIngs,
                price:state.price - INGREDIENT_PRICE[action.ingredientName]
            }
            return updateObject(state,updatedSt);
        case actionTypes.SET_INGREDIENTS:
                return updateObject(state,{
                    ingredients:action.ingredients,
                    price:3,
                    appError:false});
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state,{appError:true});       
        default:
            return state;    
    }
}

export default reducer;