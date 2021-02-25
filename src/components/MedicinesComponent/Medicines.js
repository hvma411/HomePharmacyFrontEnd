import { faBacterium, faDisease, faFilePrescription } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import MedicinesTable from '../MedicinesTableComponent/MedicinesTable';

const Medicines = ({ modalsData, setModalsData, eventHandler, setEventHandler }) => {

    const openModal = () => {
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: true,
            isNewMedicineModalHidden: false,
            newMedicineModalData: null
        }))
    }

    return (
        <>
            <section className="home background">
                <div className="container medicines-page">
                    <div className="badges-links">
                        <button className="badge-button">Antibiotics <FontAwesomeIcon icon={ faBacterium } /></button>
                        <button className="badge-button">Steroids <FontAwesomeIcon icon={ faDisease } /></button>
                        <button className="badge-button">Prescription <FontAwesomeIcon icon={ faFilePrescription } /></button>
                        <button className="badge-button">All owned</button>
                        <button onClick={ openModal } className="badge-button">Add medicine</button>
                    </div>
                    <MedicinesTable modalsData={ modalsData } setModalsData={ setModalsData } eventHandler={ eventHandler } setEventHandler={ setEventHandler } />
                </div>
                <div className="blured"></div>
            </section>
            <div className="background-wave"></div>
        </>
    )
}

export default Medicines