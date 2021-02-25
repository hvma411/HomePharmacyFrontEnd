import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase'
import 'firebase/auth'
import { AuthContext } from './Auth';

const SignUp = ({ history }) => {

    const [newUserState, setNewUserState] = useState({
        name: '',
        email: '',
        id: ''
    })

    const handleRegister = useCallback(
        async e => {
            e.preventDefault();
            const { name, email, password, password2 } = e.target.elements
            try {
                if (password.value !== password2.value) {
                    throw "Password don't match!"
                }
                await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value)
                    .then(
                        setNewUserState(prevState => ({
                            ...prevState,
                            name: name.value,
                            email: email.value
                        }))
                    );
                history.push("/");
            } catch (error) {
                alert(error)
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    const setNewUserInDb = async (data) => {

        setNewUserState(prevState => ({
            ...prevState,
            id: currentUser.uid
        }))

        await fetch('http://localhost:8080/addNewUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid,
                
            },
            body: JSON.stringify(data),
        })
        .then(() => {
            currentUser.updateProfile({
                displayName: newUserState.name
            })
        })
    }

    useEffect(() => {
        if (currentUser) {
            setNewUserInDb(newUserState)
        }
    }, [currentUser])

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
                            <input type="text" className="textbox" name="name" placeholder="Your name"/>
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