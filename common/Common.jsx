import React, { Component } from 'react'
import pic from '../../Assets/cart_pic.png'
import '../common/Common.scss'
import { Link } from 'react-router-dom'
import login from '../login/Login'
import Signup from '../signup/Signup'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

export class Common extends Component {
    render() {
        return (
            <div className="main">
                <div className="inner-container">
                    <div className="white_rectangle">
                        <div className="cart_pic_text">
                            <img src={pic} alt=""></img>
                            <span>ONLINE BOOK SHOP</span>
                        </div>
                    </div>
                    <div className="login_register"> 
                        <div className="btn-container">
                        <Link style={{textDecoration:"none",color:"black"}} to={`/Common/Login`}>
                        <span className="login">LOGIN </span>
                        </Link>
                        <Link style={{textDecoration:"none",color:"black"}} to={`/Common/Signup`} >
                        <span className="signup">SIGNUP </span>       
                        </Link>  
                        </div>

                        <div>
                            <Switch>
                                <Route exact path ="/Common/Signup" component={Signup}></Route>
                                <Route exact path ="/Common/Login" component={login}></Route>
                            </Switch>   
                        </div>                
                    </div>
                </div>
            </div>
        )
    }
}

export default Common
