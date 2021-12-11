import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const useStyles = createUseStyles((theme) => ({
    calendar: {
        marginTop: '20px',
    }
}));

    // const [fname, setFname] = useState<string>("");
    // const [lname, setLname] = useState<string>("");
    // const [email, setEmail] = useState<string>("");
    // const [address, setAddress] = useState<string>("");
    // const [pass, setPass] = useState<string>("");
    // const [cpass, setCpass] = useState<string>("");
// const { register, handleSubmit, errors } = useForm({
//     defaultValues: {
//       first_name: user.first_name,
//       last_name: user.last_name,
//       user_email: user.user_email,
//       user_password: user.user_password
//     }
//   });

// const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const { user } = props;
//       await axios.post(`${BASE_API_URL}/register`, {
//         ...user,
//       });
//       Swal.fire('Awesome!', "You're successfully registered!", 'success').then(
//         (result) => {
//           if (result.isConfirmed || result.isDismissed) {
//             props.resetUser();
//             props.history.push('/');
//           }
//         }
//       );
//     } catch (error) {
//       if (error.response) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: error.response.data
//         });
//         console.log('error', error.response.data);
//       }
//     }
//   };



function SignUp() {
    const classes = useStyles();

    const [userSignUp, setUserSignUp] = useState(
        { email: '', password: '', firstName: '', lastName: ''}
    );

    const handleChange = (event) => {
        setUserSignUp({...userSignUp, [event.target.name]: event.target.value})
    }

    let postData = {
        "firstName":"Shreya",
        "lastName": "Ghate",
        "email":"sg@gmail.com",
        "password": "Shreya@1234"
    }    

    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: 'http://127.0.0.1/user/create',
            headers: {
                // Authorization: `YOUR_AUTH_TOKEN`,
                "Content-Type": "application/json"
            },
            data: {
                ...postData
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
        }
    // render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        //     <Form className="input-form" onSubmit={handleSubmit}>
        //     <div
        //         className="col-md-6 offset-md-3"
        //         initial={{ x: '-100vw' }}
        //         animate={{ x: 0 }}
        //         transition={{ stiffness: 150 }}
        //     >
        //         <Form.Group controlId="firstName">
        //         <Form.Label>First Name</Form.Label>
        //         <Form.Control
        //             type="text"
        //             name="firstName"
        //             placeholder="Enter your first name"
        //             autoComplete="off"
        //             onChange={handleChange}
        //             // ref={register({
        //             // required: 'First name is required.',
        //             // pattern: {
        //             //     value: /^[a-zA-Z]+$/,
        //             //     message: 'First name should contain only characters.'
        //             // }
        //             // })}
        //             // className={`${errors.first_name ? 'input-error' : ''}`}
        //         />
        //         {/* {errors.first_name && (
        //             <p className="errorMsg">{errors.first_name.message}</p>
        //         )} */}
        //         </Form.Group>

        //         <Form.Group controlId="lastName">
        //         <Form.Label>Last Name</Form.Label>
        //         <Form.Control
        //             type="text"
        //             name="lastName"
        //             placeholder="Enter your last name"
        //             autoComplete="off"
        //             // ref={register({
        //             // required: 'Last name is required.',
        //             // pattern: {
        //             //     value: /^[a-zA-Z]+$/,
        //             //     message: 'Last name should contain only characters.'
        //             // }
        //             // })}
        //             // className={`${errors.last_name ? 'input-error' : ''}`}
        //         />
        //         {/* {errors.last_name && (
        //             <p className="errorMsg">{errors.last_name.message}</p>
        //         )} */}
        //         </Form.Group>
        //         <Form.Group controlId="first_name">
        //   <Form.Label>Email</Form.Label>
        //   <Form.Control
        //     type="email"
        //     name="email"
        //     placeholder="Enter your email address"
        //     autoComplete="off"
        //     // ref={register({
        //     //   required: 'Email is required.',
        //     //   pattern: {
        //     //     value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        //     //     message: 'Email is not valid.'
        //     //   }
        //     // })}
        //     // className={`${errors.user_email ? 'input-error' : ''}`}
        //   />
        //   {/* {errors.user_email && (
        //     <p className="errorMsg">{errors.user_email.message}</p>
        //   )} */}
        // </Form.Group>

        // <Form.Group controlId="password">
        //   <Form.Label>Password</Form.Label>
        //   <Form.Control
        //     type="password"
        //     name="password"
        //     placeholder="Choose a password"
        //     autoComplete="off"
        //     // ref={register({
        //     //   required: 'Password is required.',
        //     //   minLength: {
        //     //     value: 6,
        //     //     message: 'Password should have at-least 6 characters.'
        //     //   }
        //     // })}
        //     // className={`${errors.user_password ? 'input-error' : ''}`}
        //   />
        //   {/* {errors.user_password && (
        //     <p className="errorMsg">{errors.user_password.message}</p>
        //   )} */}
        // </Form.Group>

        //         <Button variant="primary" type="submit">
        //         Sign Up
        //         </Button>
        //     </div>
        //     </Form>
        );
    }
// }

export default SignUp;