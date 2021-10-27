import React, { Component } from 'react'
import '../signup/Signup.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import UserService from '../../service/UserService';


const obj = new UserService();

export class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             fullName:"",
             email:"",
             password:"",
             mobile:"",
             fullNameError:false,
             emailError:false,
             passwordError:false,
             mobileError:false,
             snackbaropen: false,
            snackbarmsg: "",
        }
    }

    snackbarClose = () => {
        this.setState({ snackbaropen: false });
    };

    isValidated=()=>{
        let isError =false;
        const errors = this.state;
        errors.fullNameError=this.state.fullName!=''?false:true;
        errors.emailError=this.state.email!=''?false:true;
        errors.passwordError=this.state.password!=''?false:true;
        errors.mobileError=this.state.mobile!=''?false:true;
        this.setState({
            ...errors
          })
          return isError = errors.fullNameError || errors.emailError || errors.passwordError ||errors.mobileError;
    }
    
    signup=()=>{
        var isValid = this.isValidated();
        if(!isValid) {
            console.log("Validation Sucessfull!");
            let signupObj = {
                "fullName": this.state.fullName,
                "email": this.state.email,
                "password": this.state.password,
                "phone": this.state.mobile,
            }
            console.log(signupObj);
            obj.signup(signupObj).then((response)=>{
            console.log(response);
            localStorage.setItem("token", response.data.id);
            this.setState({snackbaropen:true, snackbarmsg: "Registered Successfully!"})
        }).catch((error)=>{
            console.log(error);
            this.setState({snackbaropen:true, snackbarmsg: "Registration Failed!"})
        })
        }else{
            this.setState({snackbaropen:true, snackbarmsg: "Please enter data!"})
        }
    }

    change = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
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
                <div className="text-container">
                <div className="details">
                    {/* <label className="label">Full Name</label> */}
                    <TextField placeholder="Full Name" 
                    className="input"
                    name="fullName"
                    variant="outlined"
                    size="small"
                    onChange = {e => this.change(e)}
                    error={this.state.fullNameError}
                    helperText={this.state.fullNameError ? "Enter full name " : ''}
                    />
                </div>
                <div className="details"> 
                    {/* <label className="label">Email Id</label> */}
                    <TextField placeholder="Email Id"
                     className="input"
                     name="email"
                     variant="outlined"
                    size="small"
                     error={this.state.emailError}
                     onChange = {e => this.change(e)}
                     helperText={this.state.emailError ? "Enter email " : ''}
                    />
                </div>
                <div className="details">
                    {/* <label className="label">Password</label> */}
                    <TextField placeholder="Password" 
                    className="input"
                    name="password"
                    variant="outlined"
                    size="small"
                    onChange = {e => this.change(e)}
                    error={this.state.passwordError}
                    helperText={this.state.passwordError ? "Enter password " : ''}/>
                </div>
                <div className="details">
                    {/* <label className="label">Mobile Number</label> */}
                    <TextField placeholder="Mobile Number" 
                    className="input"
                    name="mobile"
                    variant="outlined"
                    size="small"
                    onChange = {e => this.change(e)}
                    error={this.state.mobileError}
                    helperText={this.state.mobileError ? "Enter mobile number " : ''}/>
                </div>
                </div>
                <div>
                    <Button className="signup_btn" onClick={this.signup}>Signup</Button>
                </div>
            </div>
        )
    }
}

export default Signup
