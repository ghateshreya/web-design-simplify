import React, { useState, useContext } from "react";
import { createUseStyles } from 'react-jss';
import UserContext from "contexts/userContext";

const useStyles = createUseStyles((theme) => ({
    calendar: {
        marginTop: '20px',
    }
}));
function Login() {
    const classes = useStyles();
    const { login, hasLoginError } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const onSubmit = e => {
      e.preventDefault();
      login(email, password);
    };
  
    const onInputChange = setter => e => {
      setter(e.target.value);
    };

    console.log(email, password);


    // render() {
        return (
            <form onSubmit={onSubmit}>
                <h3>Sign In</h3>
                {hasLoginError && (
                    <div className="login-form-error">
                    Login Failed: Incorrect Credentials
                    </div>
                )}
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"  value={email} onChange={onInputChange(setEmail)} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={onInputChange(setPassword)}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        {/* <label className="custom-control-label" htmlFor="customCheck1">Remember me</label> */}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onSubmit={onSubmit}>Submit</button>
                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
            </form>
        );
    }
// }
export default Login;
