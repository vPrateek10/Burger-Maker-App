import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axiosOrders';
import ErrorHandler from '../../containers/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
    /*state={
        orders:[],
        loading:true
    }*/

    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userID);
    }

    render(){
        let orders=<Spinner/>
        if(!this.props.loading){
            if(this.props.orders.length===0){
                orders = <h1 style={{textAlign:'center',margin:'20px'}}>You have no previous orders</h1>
            }
            else{
                orders=this.props.orders.map(order=>(
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                    street={order.orderData.street}
                    pincode={order.orderData.pincode}
                    delivery ={order.orderData.deliveryMode}/>
                ));
            }
           
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps =state=>{
    return{
        token : state.auth.token,
        orders : state.order.orders,
        loading: state.order.loading,
        userID: state.auth.userId 
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders : (token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(Orders,axios));