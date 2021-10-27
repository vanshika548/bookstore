import React, { Component } from 'react'
import '../login/Login.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Snackbar } from '@mui/material';
import UserService from '../../service/UserService';

const obj = new UserService();

export class login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email : "",
             password : "",
             emailError : false,
             passwordError : false,
             snackbaropen: false,
             snackbarmsg: "",
        }
    }

    snackbarClose = () => {
        this.setState({ snackbaropen: false });
    };

    isValidated = ()=>{
        let isError =false;
        const errors = this.state;
        errors.emailError=this.state.email !=''?false:true;
        errors.passwordError=this.state.password !=''?false:true;
        this.setState({
            ...errors
          })
          return isError = errors.emailError || errors.passwordError
    }
    
    change = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    login_btn=() =>{
        var isValid = this.isValidated();
        if(!isValid) {
            console.log("login successful!");
            let loginObj = {
                "email": this.state.email,
                "password": this.state.password,
            }
            console.log(loginObj);
            obj.login(loginObj).then((response)=>{
            console.log(response);
            localStorage.setItem("token", response.data.id);
            this.setState({snackbaropen:true, snackbarmsg: "LoggedIn Successfully!"})
        }).catch((error)=>{
            console.log(error);
            this.setState({snackbaropen:true, snackbarmsg: "Login Failed!"})
        })
        }else{
            this.setState({snackbaropen:true, snackbarmsg: "Please enter data!"})
        }
    }

    render() {
        return (
            <div className="conatiner">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={6000}
                    onClose={this.snackbarClose}

                    message={<span id="message_id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackbarClose}>
                            X
                        </IconButton>
                    ]}
                />
                <div className="txt">
                    {/* <label className="label">Email Id</label> */}
                    <TextField placeholder="Email Id" 
                    className="input"
                    variant="outlined"
                    size="small"
                    name="email"
                    error = {this.state.emailError}
                    onChange = {e => this.change(e)}
                    helperText={this.state.emailError ? "Enter email " : ''}/>
                </div>
                <div className="txt">
                    {/* <label className="label">Password</label> */}
                    <TextField placeholder="Password" 
                    className="input"
                    variant="outlined"
                    size="small"
                    name="password"
                    onChange = {e => this.change(e)}
                    error = {this.state.passwordError}
                    helperText={this.state.passwordError ? "Enter password " : ''}/>
                    <label className="label_forgot">Forgot Password?</label>
                </div>
                <div>
                    <Button className="login_btn" onClick={this.login_btn}>Login</Button>
                </div>
                <label className="label_or"> OR</label>
                <div className="apps_btn">
                    <Button>Facebook</Button>
                    <Button>Google</Button>
                </div>
            </div>
        )
    }
}

export default login
