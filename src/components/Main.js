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

    const [modalsData, setModalsData] = useState({
            isModalActive: false,
            isNewInstanceModalHidden: true,
            newInstaceModalData: null,
            isNewMedicineModalHidden: true,
            newMedicineModalData: null,
            isMedicineDescriptionModalHidden: true,
            medicineDescriptionData: null,
    })

    return (
        <>
            <Header />
            <Route exact path="/">
                <Home modalsData={ modalsData } setModalsData={ setModalsData } />
            </Route>
            <Route exact path="/medicines">
                <Medicines modalsData={ modalsData } setModalsData={ setModalsData } />
            </Route>
            <Modals modalsData={ modalsData } setModalsData={ setModalsData } />
        </>
    )
}

export default Main;