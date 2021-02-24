import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firbase'
import 'firebase/auth'
import { AuthContext } from './Auth';

const SignIn = ({ history }) => {

    // const [signIn, setSignIn] = useState({
    //     email: '',
    //     password: '',
    // })

    // const handleFormChange = (e) => {
    //     e.persist();
    //     setSignIn(prevState => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

    const handleLogin = useCallback(
        async e => {
            e.preventDefault();
            const { email, password } = e.target.elements
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error)
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            <section className="home background">
                <div className="container">
                    <div className="main-box">
                        <div className="logo"></div>       
                        <form onSubmit={ handleLogin }>
                            <input type="text" className="textbox" name="email" placeholder="Email"/>
                            <input type="password" className="textbox" name="password" placeholder="Password"/>
                            <div className="buttons-box">
                                <button type="submit" className="badge-button form-button">LOGIN</button>
                                <Link className="badge-button form-button" to="/signup">SIGN UP</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <div className="background-wave"></div>
        </>
    )
}

export default SignIn;