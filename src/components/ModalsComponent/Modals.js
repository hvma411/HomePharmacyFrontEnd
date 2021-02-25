import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthorizationComponents/Auth';

const Modals = ({ modalsData, setModalsData }) => {
    
    if (modalsData.isModalActive) {
        return (
            <div className="modals-background">
                { modalsData.isNewInstanceModalHidden ? null : <AddNewInstance modalsData={ modalsData } setModalsData={ setModalsData } /> }
                { modalsData.isNewMedicineModalHidden ? null : <AddNewMedicine modalsData={ modalsData } setModalsData={ setModalsData } /> }
                { modalsData.isMedicineDescriptionModalHidden ? null : <MedicineDescription modalsData={ modalsData } setModalsData={ setModalsData } /> }
                { modalsData.isFamilyMemberModalHidden ? null : <AddFamilyMember modalsData={ modalsData } setModalsData={ setModalsData } /> }

            </div>
        )
    } else {
        return null
    }


}

const AddNewInstance = ({ modalsData, setModalsData }) => {

    const { currentUser } = useContext(AuthContext);

    const data = modalsData.newInstanceModalData;

    const [newInstance, setNewInstance] = useState({
        medicine_id: data.id,
        quantityLeft: '',
        expiryDate: '',
        userId: currentUser.uid
    })

    const addInstance = async (e) => {
        fetch('http://localhost:8080/medicine/addInstance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            },
            body: JSON.stringify(newInstance),
        })
        .then(
            closeModal()
        )
    }

    const handleFormChange = (e) => {
        e.persist();
        setNewInstance(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const closeModal = () => {
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: false,
            isNewInstanceModalHidden: true
        }))
    }

    let inputType = "text"

    const inputTypeHandler = (e) => {
        console.log(e.currentTarget)
        e.currentTarget.type = "date"
    }

    return (
        <div className="new-instance-modal">
            <h2>ADD MEDICINE INSTANCE</h2>
            <span className="close-btn" onClick={ closeModal } ><FontAwesomeIcon icon={ faTimes } /> </span>
            <form>
                <span className="title">{ data.name }</span> 
                <input name="quantityLeft" type="number" min="1" onChange={ handleFormChange } placeholder="Package pills quantity" />
                <input name="expiryDate" autoComplete="off" type={ inputType } onChange={ handleFormChange } onFocus={ inputTypeHandler } placeholder="Expiry Date" />
                <button type="button" onClick={ addInstance } >Add medicine</button>
            </form>
        </div>
    )
}

const AddNewMedicine = ({ modalsData, setModalsData }) => {

    const { currentUser } = useContext(AuthContext);

    const data = modalsData.newMedicineModalData;

    const [newMedicine, setNewMedicine] = useState({
        name: '',
        // description: '',
        notes: '',
        isVitamin: false,
        isSteroid: false,
        isAntibiotic: false,
        isPrescriptionNeeded: false
    })

    useEffect(() => {
        if (modalsData.newMedicineModalData) {
            setNewMedicine({
                userId: currentUser.uid,
                id: data.id,
                name: data.name,
                description: data.description,
                notes: data.notes,
                isVitamin: data.isVitamin,
                isSteroid: data.isSteroid,
                isAntibiotic: data.isAntibiotic,
                isPrescriptionNeeded: data.isPrescriptionNeeded,
                isToBuy: data.isToBuy,
            })
        }
    }, [])

    const handleFormChange = (e) => {
        e.persist();
        setNewMedicine(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCheckboxChange = (e) => {
        e.persist();
        setNewMedicine(prevState => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }));
    }

    const addMedicine = async (e) => {
        fetch('http://localhost:8080/medicine/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            },
            body: JSON.stringify(newMedicine),
        })
        .then(
            closeModal()
        )
    }

    const updateMedicine = async (e) => {
        fetch('http://localhost:8080/medicine/edit', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            },
            body: JSON.stringify(newMedicine),
        })
        .then(
            closeModal()
        )
    }

    const closeModal = () => {
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: false,
            isNewMedicineModalHidden: true
        }))
    }

    return (
        <div className="new-instance-modal">
            { data ? <h2>EDIT MEDICINE</h2> : <h2>ADD MEDICINE</h2> }
            <span className="close-btn" onClick={ closeModal } ><FontAwesomeIcon icon={ faTimes } /> </span>
            <form>
                <input type="text" name="name" onChange={ handleFormChange } value={ newMedicine.name } placeholder="Medicine name"/> 
                <div className="checkbox-cluster">
                    <span className="checkbox-container">
                        <label>Vitamin </label>
                        <input type="checkbox" name="isVitamin" onChange={ handleCheckboxChange } value={ newMedicine.isVitamin } />
                    </span>
                    <span className="checkbox-container">
                        <label>Steroid </label>
                        <input id="isSteroid" type="checkbox" name="isSteroid" onChange={ handleCheckboxChange } value={ newMedicine.isSteroid } />
                    </span>
                    <span className="checkbox-container">
                        <label>Antibiotic </label>
                        <input type="checkbox" name="isAntibiotic" onChange={ handleCheckboxChange } value={ newMedicine.isAntibiotic } />
                    </span>
                    <span className="checkbox-container">
                        <label>Requires prescription </label>
                        <input type="checkbox" name="isPrescriptionNeeded" onChange={ handleCheckboxChange } value={ newMedicine.isPrescriptionNeeded } />
                    </span>
                </div>
                <input type="text" name="notes" placeholder="Notes" onChange={ handleFormChange } value={ newMedicine.notes } />
                { data ? <button type="button" onClick={ updateMedicine } >Edit medicine</button> : <button type="button" onClick={ addMedicine } >Add medicine</button> } 
              </form>
        </div>
    )
}

const MedicineDescription = ({ modalsData, setModalsData }) => {

    const closeModal = () => {
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: false,
            isMedicineDescriptionModalHidden: true
        }))
    }
    
    return (
        <div className="new-instance-modal">
            <h2>MEDICINE DECSRIPTION</h2>
            <span className="close-btn" onClick={ closeModal } ><FontAwesomeIcon icon={ faTimes } /> </span>
            <div className="modal-content">
                { modalsData.medicineDescriptionData }
            </div>
        </div>
    )
}

const AddFamilyMember = ({ modalsData, setModalsData }) => {

    const [newFamilyMember, setNewFamilyMember] = useState({
        name: '',
        age: '',
        notes: '',
    })

    const handleFormChange = (e) => {
        e.persist();
        setNewFamilyMember(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const addNewFamilyMember = (e) => {
        console.log(newFamilyMember)
    }


    const closeModal = () => {
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: false,
            isFamilyModalHidden: true
        }))
    }

    return (
        <div className="new-instance-modal">
            <h2>ADD FAMILY MEMBER</h2>
            <span className="close-btn" onClick={ closeModal } ><FontAwesomeIcon icon={ faTimes } /> </span>
            <form>
                <input type="text" name="name" onChange={ handleFormChange } placeholder="Name"/> 
                <input type="number" name="age" onChange={ handleFormChange } placeholder="Age" />
                <input type="text" name="notes" onChange={ handleFormChange } placeholder="Notes" />
                <button type="button" onClick={ addNewFamilyMember } >Add member</button>
            </form>
        </div>
    )
}

export default Modals;