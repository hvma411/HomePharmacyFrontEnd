import React from 'react';
import MedicinesTable from '../MedicinesTableComponent/MedicinesTable';

const Medicines = () => {
    return (
        <>
            <section className="home background">
                <div className="container medicines-page">
                    <div className="badges-links">
                        <button id="antibioticsButton" className="badge-button">Antibiotics</button>
                        <button id="steroidsButton" className="badge-button">Steroids</button>
                        <button id="onRecipeButton" className="badge-button">On recipe</button>
                        <button id="allOwnedButton" className="badge-button">All owned</button>
                        <button id="openModalAddMedicine" className="badge-button">Add medicine</button>
                    </div>
                    <MedicinesTable />
                </div>
            </section>
            <div className="background-wave"></div>
        </>
    )
}

export default Medicines