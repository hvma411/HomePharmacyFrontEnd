import React from 'react';
import FamilyTable from '../FamilyTableComponent/FamilyTable';
import MedicinesTable from '../MedicinesTableComponent/MedicinesTable';

const Family = ({ modalsData, setModalsData }) => {

    const openModal = () => {
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: true,
            isFamilyMemberModalHidden: false,
            familyMemberModalData: null
        }))
    }

    return (
        <>
            <section className="home background">
                <div className="container medicines-page">
                    <div className="badges-links">
                        <button className="badge-button" onClick={ openModal } >Add family member</button>
                    </div>
                    <FamilyTable modalsData={ modalsData } setModalsData={ setModalsData } />
                </div>
                <div className="blured"></div>
            </section>
            <div className="background-wave"></div>
        </>
    )
}

export default Family