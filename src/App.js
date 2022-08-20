import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Authorisation from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect } from 'react-redux';


class App extends Component {
  render() {
    let orders = null;
    if(this.props.isAuthenticated===true){
      orders = <Route path="/orders" component={Orders}/>;
    }
    return (
      <div >
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            {orders}
            <Route path="/auth" component={Authorisation}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null
  }
}



export default connect(mapStateToProps)(App);
