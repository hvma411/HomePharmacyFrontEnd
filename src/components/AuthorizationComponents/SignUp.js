import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase'
import 'firebase/auth'
import { AuthContext } from './Auth';

const SignUp = ({ history }) => {

    const handleRegister = useCallback(
        async e => {
            e.preventDefault();
            const { email, password, password2 } = e.target.elements
            console.log(password2.value)
            console.log(password.value)
            try {
                if (password.value !== password2.value) {
                    throw "Password don't match!"
                }
                await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value);
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
                        <form onSubmit={ handleRegister }>
                            <input type="email" className="textbox" name="email" placeholder="Email"/>
                            <input type="password" className="textbox" name="password" placeholder="Password"/>
                            <input type="password" className="textbox" name="password2" placeholder="Repeat password"/>
                            <div className="buttons-box">
                                <button type="submit" className="badge-button form-button">REGISTER</button>
                                <Link className="badge-button form-button" to="/signin">SIGN IN</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="blured"></div>
            </section>
            <div className="background-wave"></div>
        </>
    )
}

export default SignUp;