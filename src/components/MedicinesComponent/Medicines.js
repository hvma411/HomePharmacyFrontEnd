import React from 'react';
import MedicinesTable from '../MedicinesTableComponent/MedicinesTable';

const Medicines = ({ modalsData, setModalsData }) => {

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
                        <button className="badge-button">Antibiotics</button>
                        <button className="badge-button">Steroids</button>
                        <button className="badge-button">Prescription</button>
                        <button className="badge-button">All owned</button>
                        <button onClick={ openModal } className="badge-button">Add medicine</button>
                    </div>
                    <MedicinesTable modalsData={ modalsData } setModalsData={ setModalsData } />
                </div>
                <div className="blured"></div>
            </section>
            <div className="background-wave"></div>
        </>
    )
}

export default Medicines