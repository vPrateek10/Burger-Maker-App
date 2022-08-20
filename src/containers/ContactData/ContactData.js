import React,{Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class ContactData extends Component{
    state={
        orderDetails:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false 
            },
            pincode:{
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:'Pincode'
                },
                value:'',
                validation:{
                    required:true,
                    maxLen: 6
                },
                valid:false,
                touched:false 
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false 
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false 
            },
            deliveryMode:{
                elementType:'select',
                elementConfig:{
                    options: [{value:'Fastest',displayValue:'Fastest'},{value:'Cheapest',displayValue:'Cheapest'}]
                },
                value:'Fastest',
                valid:false
            },
        },
        validForm:true,

    }

    checkValidity(value,rules){
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid= value.trim()!=='';
        }

        if(rules.maxLen!==undefined){
            if(rules.maxLen<value.length){
                isValid = false;
            }
        }
        return isValid;
    }

    inputChangedHandler=(event,identifier)=>{
        const updatedOrderForm ={
            ...this.state.orderDetails
        };
        const updatedOrderElement = {
            ...updatedOrderForm[identifier]
        };
        updatedOrderElement.value = event.target.value;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value,updatedOrderElement.validation);
        updatedOrderElement.touched = true;
        updatedOrderForm[identifier]=updatedOrderElement;
        let isFormValid = true;
        for(let inputIdentifier in updatedOrderForm){
            isFormValid = updatedOrderForm[inputIdentifier].value && isFormValid;
        }
        this.setState({orderDetails:updatedOrderForm,validForm:isFormValid});
    }

    orderHandler=(event)=>{
        event.preventDefault();
        let orderForm={};
        for(let identifier in this.state.orderDetails){
            orderForm[identifier]=this.state.orderDetails[identifier].value;
        }
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: (+this.props.price),
            orderData : orderForm,
            userId: this.props.userID
        }
        this.props.onOrderBurger(order,this.props.token);
        
    }

    render(){
        let formArray = [];
        for(let key in this.state.orderDetails){
            formArray.push({
                id:key,
                config : this.state.orderDetails[key]
            });
        }

        let inputForm = (
        <form onSubmit={this.orderHandler}>
        {formArray.map(element=>(
            <Input 
            key={element.id}
            elementType={element.config.elementType} 
            elementConfig={element.config.elementConfig} 
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            changed={(event)=>this.inputChangedHandler(event,element.id)} />
        ))}
        <Button btnType="Success">Order</Button>
        </form>);
        if(this.props.loading){
            inputForm=<Spinner/>;
        }

        return(
            <div className={classes.ContactData }>
                <h4>Enter Contact Data</h4>
                {inputForm}
            </div>
        )
    }




}

const mapStateToProps=(state)=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price,
        loading: state.order.loading,
        token : state.auth.token,
        userID: state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger: (orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactData);