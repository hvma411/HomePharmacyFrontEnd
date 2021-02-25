import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthorizationComponents/Auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBacteria, faBacterium, faDisease, faEdit, faFileMedical, faFilePrescription, faInfoCircle, faList, faPlusSquare, faPrescription, faShoppingBasket, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

const MedicinesTable = ({ modalsData, setModalsData, eventHandler, setEventHandler }) => {

    const [medicinesTableData, setMedicinesTableData] = useState();
    const [isLoading, setIsLoading] = useState(true);

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
    }, [modalsData, eventHandler])

    const openDescriptionModal = (e) => {
        const descriptionToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId).description
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: true,
            isMedicineDescriptionModalHidden: false,
            medicineDescriptionData: descriptionToPass
        }))
    }

    const openNewInstanceModal = (e) => {
        const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: true,
            isNewInstanceModalHidden: false,
            newInstanceModalData: medicineToPass
        }))
    }

    const openMedicinesInstancesListModal = (e) => {
        const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: true,
            isMedicineInstancesModalHidden: false,
            medicineInstancesModalData: medicineToPass,
        }))
    }

    const openEditMedicineModal = (e) => {
        const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: true,
            isNewMedicineModalHidden: false,
            newMedicineModalData: medicineToPass
        }))
    }

    // const openDeleteMedicineModal = (e) => {
    //     const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
    //     setModalsData(prevState => ({
    //         ...prevState,
    //         isModalActive: true,
    //         isNewMedicineModalHidden: false,
    //         newMedicineModalData: medicineToPass
    //     }))
    // }

    const addToWishList = async (e) => {
        const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        fetch('http://localhost:8080/medicine/addToWishlist', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            },
            body: JSON.stringify(medicineToPass),
        })
    }

    const deleteMedicine = async (e) => {
        const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        fetch('http://localhost:8080/medicine/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            },
            body: JSON.stringify(medicineToPass),
        })
        .then(() => {
            setEventHandler(true)
            setEventHandler(false)
        })
    }

    const handleClick = () => {
        console.log(medicinesTableData)
    }

    return (
        <table className="styled-medicine-table">
            <thead>
                <tr>
                    <th>Medicine</th>
                    <th>Notes</th>
                    <th>Family </th>
                    <th>Badges</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="medicines-tbody">
                { isLoading ? null : medicinesTableData.map((value, idx) => (
                    <tr key={ idx }>
                        <td>{ value.name }</td>
                        <td onClick={handleClick} >{ value.notes }</td>
                        <td>
                            { value.familyMembers.map((el, elIdx) => (
                                <span className="people-box" > 
                                    <FontAwesomeIcon icon={ faUser } />
                                    <div className="tooltip"> { el.name } </div>
                                </span>
                            )) }
                        </td>
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
                            <span data-medicine-id={ value.id } onClick={ deleteMedicine } ><FontAwesomeIcon icon={ faTrash } /></span>
                        </td>
                    </tr>
                )) }
            </tbody>
        </table>
    )
}

export default MedicinesTable;