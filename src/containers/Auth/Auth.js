import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Classes from './Auth.css';
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component{

    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Enter Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLenght: 6
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:false
    }

    checkValidity(value,rules){
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid= value.trim()!=='';
        }
        
        return isValid;
    }

    inputChangedHandler=(event,controlName)=>{
        const updatedControls ={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };

        this.setState({controls:updatedControls});
    }

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return{isSignUp:!prevState.isSignUp};
        });
    }

    render(){
        if(this.props.isAuth){
            return(<Redirect to="/"></Redirect>);
        }
        let formArray = [];
        for(let key in this.state.controls){
            formArray.push({
                id:key,
                config : this.state.controls[key]
            });
        }

        const form = formArray.map(element=>{    
           return(
            <Input 
                key={element.id}
                elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig} 
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event)=>this.inputChangedHandler(event,element.id)}/>
           );         
        })

        let currAuth = 'Sign-in';
        if(this.state.isSignUp===false){
            currAuth='Sign-up';
        }

        let currType = 'Sign-In';
        if(this.state.isSignUp===true){
            currType="Sign-Up";
        }

        let show = (<div className={Classes.Auth}>
                    <Spinner/>
                    </div>);
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (<p>{this.props.error.message}</p>)
        }            
        if(!this.props.loading){
            show =( <div className={Classes.Auth}>
                    <p><strong>{currType}</strong></p>
                {errorMessage}
            <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType='Success'>Submit</Button>
            </form>
            <Button 
            btnType="Danger"
            clicked={this.switchAuthModeHandler}>Switch To {currAuth}</Button>
        </div>);
        }

        return show;
    }
}

const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token!==null
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onAuth:(email,password, isSignUp)=>dispatch(action.auth(email,password, isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);