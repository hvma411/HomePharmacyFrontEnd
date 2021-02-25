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
import Family from "./FamilyComponent/Family";
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
            isFamilyMemberModalHidden: true,
            familyMemberModalData: null,
            isMedicineInstancesModalHidden: true,
            medicineInstancesModalData: null,
            isActiveMedicineModalHidden: true,
            activeMedicineModalData: null,
            isFamilyMemberMedicinesModalHidden: true,
            familyMemberMedicinesModalData: null
    })

    const [eventHandler, setEventHandler] = useState(false)

    return (
        <>
            <Header />
            <Route exact path="/">
                <Home modalsData={ modalsData } setModalsData={ setModalsData } eventHandler={ eventHandler } setEventHandler={ setEventHandler } />
            </Route>
            <Route exact path="/medicines">
                <Medicines modalsData={ modalsData } setModalsData={ setModalsData } eventHandler={ eventHandler } setEventHandler={ setEventHandler } />
            </Route>
            <Route exact path="/family">
                <Family modalsData={ modalsData } setModalsData={ setModalsData } eventHandler={ eventHandler } setEventHandler={ setEventHandler } />
            </Route>
            <Modals modalsData={ modalsData } setModalsData={ setModalsData } eventHandler={ eventHandler } setEventHandler={ setEventHandler }/>
        </>
    )
}

export default Main;