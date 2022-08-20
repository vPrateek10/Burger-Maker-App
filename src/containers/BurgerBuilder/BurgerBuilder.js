import React, { Component } from 'react';
import Auxillary from '../Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    /*addIngredientHandler = (type) => {
        const OldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = OldCount + 1;
        const newPrice = this.props.price + INGREDIENT_PRICE[type];
        this.setState({ ingredients: updatedIngredients, price: newPrice });
    }

    removeIngredientHandler = (type) => {
        const OldCount = this.state.ingredients[type];
        if (OldCount > 0) {
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = OldCount - 1;
            const newPrice = this.props.price - INGREDIENT_PRICE[type];
            this.setState({ ingredients: updatedIngredients, price: newPrice });
        }
        else {
            alert("Ingredient count is already zero");
        }
    }*/

    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({ purchasing: true });
        }
        else{
            this.props.history.push('/auth'); 
        }
        
    }

    stopPurchasingHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    componentDidMount() {
      this.props.onInitIngredients();
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            if (disableInfo[key] <= 0) {
                disableInfo[key] = true;
            }
            else {
                disableInfo[key] = false;
            }
        }

        let allowOrder;
        if (this.props.price > 3) {
            allowOrder = false;
        }
        else {
            allowOrder = true;
        }
        
        let orderSummary=null;
        let burger = this.props.appError?<p>Backend Fault</p>:(<Auxillary>
               <br/> <Spinner/>
            </Auxillary>);

        if (this.props.ings) {
            burger = 
            (<Auxillary>
                <Burger ingredients={this.props.ings} />
                <div>{this.props.children}</div>
                <BuildControls
                    price={this.props.price}
                    checkoutAllow={allowOrder}
                    disables={disableInfo}
                    isAuth={this.props.isAuth}
                    onCheckout={this.purchaseHandler}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    ingredientAdded={this.props.onIngredientAdded} />
            </Auxillary>);
                orderSummary = 
                (<OrderSummary
                price={this.props.price}
                ingredients={this.props.ings}
                cancel={this.stopPurchasingHandler}
                continue={this.purchaseContinueHandler} />);
        }

        return (
            <Auxillary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.stopPurchasingHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Auxillary>
        );
    }

}

const mapStateToProps =(state)=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price,
        appError : state.burgerBuilder.appError,
        isAuth: state.auth.token!==null
    };
}

const mapDispatchtoProps=(dispatch)=>{
    return{
        onIngredientAdded: (ingName)=>dispatch(action.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(action.removeIngredient(ingName)),
        onInitIngredients: ()=>dispatch(action.initIngredients()),
        onPurchaseInit: ()=>dispatch(action.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(ErrorHandler(BurgerBuilder, axios));