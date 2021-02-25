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
                { modalsData.isMedicineInstancesModalHidden ? null : <MedicineInstancesList modalsData={ modalsData } setModalsData={ setModalsData } /> }
                { modalsData.isActiveMedicineModalHidden ? null : <ActiveMedicineModal modalsData={ modalsData } setModalsData={ setModalsData } /> }
                { modalsData.isFamilyMemberMedicinesModalHidden ? null : <FamilyMemberMedicinesModal modalsData={ modalsData } setModalsData={ setModalsData } /> }
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

    const { currentUser } = useContext(AuthContext);

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
        fetch('http://localhost:8080/family/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            },
            body: JSON.stringify(newFamilyMember),
        })
        .then(
            closeModal()
        )
    }

    const closeModal = () => {
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: false,
            isFamilyMemberModalHidden: true
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

const MedicineInstancesList = ({ modalsData, setModalsData }) => {

    const medicineInstances = modalsData.medicineInstancesModalData.medicineInstances

    console.log(medicineInstances)

    const closeModal = () => {
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: false,
            isMedicineInstancesModalHidden: true
        }))
    }

    return (
        <div className="new-instance-modal instances-list-modal">
            <h2>MEDICINE INSTANCES LIST</h2>
            <span className="close-btn" onClick={ closeModal } ><FontAwesomeIcon icon={ faTimes } /> </span>
            <form>
                <table className="instance-list-table">
                    <thead className="instance-list-thead">
                        <tr>
                            <th>Medicine</th>
                            <th>Quantity</th>
                            <th>Expire Date</th>
                        </tr>
                    </thead>
                    <tbody className="instance-list-tbody">
                        { medicineInstances.map((value, idx) => (
                            <tr key={ idx }>
                                <td>{ value.medicine.name }</td>
                                <td>{ value.quantityLeft }</td>
                                <td>{ value.expiryDate }</td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </form>
        </div>
    )
}

const ActiveMedicineModal = ({ modalsData, setModalsData }) => {

    const closeModal = () => {
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: false,
            isActiveMedicineModalHidden: true
        }))
    }

    return (
        <div className="new-instance-modal">
            <h2>Member medicines / active medicines</h2>
            <span className="close-btn" onClick={ closeModal } ><FontAwesomeIcon icon={ faTimes } /> </span>
            <div className="forms-box">
                <form>
                    <select>
                        <option>ABC</option>
                    </select>
                    <select>
                        <option>BCD</option>
                    </select>
                    <input type="number" placeholder="quantityPerDay" />
                    <button>Add active medicine</button>
                </form>
            </div>
        </div>

    )
}

const FamilyMemberMedicinesModal = ({ modalsData, setModalsData }) => {

    const [medicinesTableData, setMedicinesTableData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [medicineToFamilyMember, setMedicineToFamilyMember] = useState({
        id: modalsData.familyMemberMedicinesModalData.id, //family member id
        medicineIds: []
    })

    const { currentUser } = useContext(AuthContext);

    const getData = async () => {
        await fetch('http://localhost:8080/medicine/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            }
        })
        .then(response => response.json())
        .then(data => {
            setMedicinesTableData(data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const connectFamilyMemberToMedicine = (e) => {

        e.preventDefault()

        console.log(modalsData.familyMemberMedicinesModalData)
        console.log(medicineToFamilyMember)

        // const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        fetch('http://localhost:8080/family/edit', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            },
            body: JSON.stringify(medicineToFamilyMember),
        })
        .then(
            closeModal()
        )
    }

    const closeModal = () => {
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: false,
            isFamilyMemberMedicinesModalHidden: true
        }))
    }

    const handleSelectChange = (e) => {
        e.persist()
        setMedicineToFamilyMember(prevState => ({
            ...prevState,
            medicineIds: [parseInt(e.target.value)]
        }))
    }

    return (
        <div className="new-instance-modal">
            <h2>FAMILY MEMBER MEDICINES</h2>
            <span className="close-btn" onClick={ closeModal } ><FontAwesomeIcon icon={ faTimes } /> </span>
            <div className="content-form-box">
                <form>
                    <select onChange={ handleSelectChange } value={ medicineToFamilyMember.medicineIds } multiple={false} >
                        <option>Select medicine to connect it with family member</option>
                        { isLoading ? null : medicinesTableData.map((value, idx) => (
                            <option key={ idx } data-medicine-id={ value.id } value={ value.id } > { value.name } </option>
                        )) }
                    </select>
                    <button onClick={ connectFamilyMemberToMedicine } >Add medicine to family member</button>
                </form>
                <table className="styled-medicine-table family-medicines">
                    <thead>
                        <tr>
                            <th>Medicine</th>
                            <th>Notes</th>
                            <th>Badges</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="medicines-tbody">
                        {/* { isLoading ? null : medicinesTableData.map((value, idx) => (
                            <tr key={ idx }>
                                <td>{ value.name }</td>
                                <td onClick={handleClick} >{ value.notes }</td>
                                <td>People here</td>
                                <td>
                                    { value.steroid ? <span> <FontAwesomeIcon icon={ faDisease } /> </span> : null }
                                    { value.antibiotic ? <span> <FontAwesomeIcon icon={ faBacterium } /> </span> : null }
                                    { value.prescriptionNeeded ? <span> <FontAwesomeIcon icon={ faFilePrescription } /> </span> : null }
                                </td>
                                <td>
                                    <span data-medicine-id={ value.id } onClick={ openDescriptionModal } ><FontAwesomeIcon icon={ faInfoCircle } /></span>
                                    <span data-medicine-id={ value.id } onClick={ openMedicinesInstancesListModal } ><FontAwesomeIcon icon={ faList } /></span>
                                    <span data-medicine-id={ value.id } onClick={ openNewInstanceModal } ><FontAwesomeIcon icon={ faPlusSquare } /></span>
                                    <span data-medicine-id={ value.id } onClick={ addToWishList } ><FontAwesomeIcon icon={ faShoppingBasket } /></span>
                                    <span data-medicine-id={ value.id } onClick={ openEditMedicineModal } ><FontAwesomeIcon icon={ faEdit } /></span>
                                    <span data-medicine-id={ value.id } onClick={ openEditMedicineModal } ><FontAwesomeIcon icon={ faTrash } /></span>
                                </td>
                            </tr>
                        )) } */}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Modals;