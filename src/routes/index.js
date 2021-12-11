import React, { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import PrivateSection from 'routes/PrivateSection';
import PublicRoutes from 'routes/PublicRoutes';
// import AppRoutes from 'routes/AppRoutes';
import UserContext from "../contexts/userContext";

const FIRSTNAME = "PD";
const LASTNAME = "HH";
const EMAIL = "shreya@gmail.com";
const PASSWORD = "Shreya@12";

const INITIAL_STATE = {
  user: null,
  hasLoginError: false
};

const validateCredentials = (email, password) =>
  email === EMAIL && password === PASSWORD;

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      const { email, password } = action.payload;
     console.log(email, password);
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
          id: 1,
          email: EMAIL,
          firstName: FIRSTNAME,
          lastName: LASTNAME,
          password: PASSWORD
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

function Routes() {
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
