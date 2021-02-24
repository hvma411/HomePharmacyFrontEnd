import React, { useState, useEffect } from "react";
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

import Header from './HeaderComponent/Header';
import Home from './HomeComponent/Home';
import Medicines from "./MedicinesComponent/Medicines";
import Modals from "./ModalsComponent/Modals";

const Main = () => {

    const [modalState, setModalState] = useState({
        modalType: ''
    })

    const [isModalHidden, setIsModalHidden] = useState(true)
    const [modalData, setModalData] = useState()

    useEffect(() => {
        console.log(modalData)
    }, [modalData])

    return (
        <>
            <Header />
            <Route exact path="/">
                <Home setIsModalHidden={ setIsModalHidden } setModalData={ setModalData } />
            </Route>
            <Route exact path="/medicines">
                <Medicines />
            </Route>
            { isModalHidden ? null : <Modals modalType={ modalState.modalType } isModalHidden={ isModalHidden } setIsModalHidden={ setIsModalHidden } /> }
        </>
    )
}

export default Main;