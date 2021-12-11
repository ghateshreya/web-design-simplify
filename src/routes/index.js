/* eslint-disable */
import React, { useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import PrivateSection from 'routes/PrivateSection';
import PublicRoutes from 'routes/PublicRoutes';
// import AppRoutes from 'routes/AppRoutes';
import UserContext from "../contexts/userContext";
import axios from 'axios';

function Routes() {
    const url = "http://localhost:3000/user/getAll"
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
          console.log(foundUser);
                }
      }, []);
      
    React.useEffect(() => {
        axios.get(url,).then((res) => {
            setUsers(res.data);
            console.log(res.data[0].email);
        //     const user = { email, password };

        //     // set the state of the user
        //   setUser(res.data);
        //   // store the user in localStorage
        //   localStorage.setItem("user", JSON.stringify(res.data));
        });
    }, []);
    // console.log(users);
    var id = '1';
    var firstName = "firstname";
    var lastName = "lastname";
// const EMAIL = "shreya@gmail.com";
// const PASSWORD = "Shreya@12";

const INITIAL_STATE = {
    user: null,
    hasLoginError: false
  };
  

  const reducer = (state, action) => {
    switch (action.type) {
      case "login": {
        const { email, password } = action.payload;
       console.log(email, password);
       const validateCredentials = (email, password) =>
       email === email && password === password;

        if (email == 'shreya@gmail.com') {
            id = '61b47cf09cbab0bebe8bf604',
            firstName = 'Shreya',
            lastName = "Ghate"
        } else if (email == 'pradnyal@gmail.com') {
            id = '61b47d319cbab0bebe8bf605'
            firstName = 'Pradnyal',
            lastName = "Gandhi"
        } else if (email == 'jinal.m@tcs.com') {
            id = '61b416a075ba1b60163e71b3'
            firstName = 'Jinal',
            lastName = "Mamaniya"
        } else if (email == 'harshil@gmail.com') {
            id = '61b47d499cbab0bebe8bf606'
            firstName = 'Harshil',
            lastName = "Patel"
        }

        const user = { email, password };

            // set the state of the user
          setUser(user);
          // store the user in localStorage
          localStorage.setItem("user", JSON.stringify(user));

        if (!validateCredentials(email, password)) {
          return {
            ...state,
            hasLoginError: true,
            user: null
          };
        }
      else {
          return {
          ...state,
          hasLoginError: false,
          user: {
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
          }
        
        };
      }
  }
        
      case "logout":
        return {
          ...state,
          user: null
        };
      default:
        throw new Error(`Invalid action type: ${action.type}`);
    }
  };

    const { pathname } = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [width, height] = useWindowSize();
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const currentValue = {
        user: state.user,
        hasLoginError: state.hasLoginError,
        login: (email, password) =>
          dispatch({
            type: "login",
            payload: { email, password }
          }),
        logout: () => dispatch({ type: "logout" })
      };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <UserContext.Provider value={currentValue}>
        {state.user && <PrivateSection />}
        {!state.user && <PublicRoutes />}
      </UserContext.Provider>
    );
}

export default Routes;
