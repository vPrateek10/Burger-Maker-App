import React, { Component } from 'react';
import Auxillary from '../../containers/Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state={
        showSideDrawer:false
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerOpenedHandler=()=>{
        this.setState({showSideDrawer:true});
    }

    render() {
        return (
            <Auxillary>
                <Toolbar isAuth={this.props.isSignedIn} clicked={this.sideDrawerOpenedHandler} />
                <SideDrawer  
                open ={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}
                isAuth={this.props.isSignedIn}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxillary>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        isSignedIn:state.auth.token !== null
    }
}



export default connect(mapStateToProps)(Layout);