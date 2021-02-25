import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Link,
  Switch,
  NavLink,
  withRouter,
  BrowserRouter as Router,
} from 'react-router-dom';
import { AuthContext } from '../AuthorizationComponents/Auth';
import firebase from '../../config/firebase'

const Header = () => {


    const { currentUser } = useContext(AuthContext);

    // const [userName, setUserName] = useState('')

    // useEffect(() => {
    //     setUserName(currentUser.displayName)
    // }, [currentUser])

    return (
       <header>
            <div className="logo-box">
                <div className="logo"></div>
            </div>
            <div className="navigation-list">
                <Link to="/" className="navigation-element">HOME</Link>
                <Link to="/medicines" className="navigation-element">MEDICINES</Link>
                <Link to="/family" className="navigation-element">FAMILY</Link>
            </div>
            { currentUser ? 
                <div className="login">
                    {/* <div className="hello-name"> Hello, { userName } </div> */}
                    <a onClick={ () => firebase.auth().signOut() } className="login-button">SIGN OUT</a>
                </div>
                :
                <div className="login">
                    <Link to="/signin" className="login-button">SIGN IN</Link>
                    <Link to="/signup" className="signup-button">SIGN UP</Link>
                </div>

            }

       </header>
    )
}

export default Header;