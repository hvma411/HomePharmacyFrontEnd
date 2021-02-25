import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthorizationComponents/Auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFileMedical, faInfoCircle, faList, faPlusSquare, faShoppingBasket, faTrash } from "@fortawesome/free-solid-svg-icons";

const MedicinesTable = ({ modalsData, setModalsData }) => {

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
    }, [modalsData])

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

    const openEditMedicineModal = (e) => {
        const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: true,
            isNewMedicineModalHidden: false,
            newMedicineModalData: medicineToPass
        }))
    }

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

    const handleClick = () => {
        console.log(medicinesTableData)
    }

    return (
        <table className="styled-medicine-table">
            <thead>
                <tr>
                    <th>Medicine</th>
                    <th>Notes</th>
                    <th>People</th>
                    <th>Badges</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="medicines-tbody">
                { isLoading ? null : medicinesTableData.map((value, idx) => (
                    <tr key={ idx }>
                        <td>{ value.name }</td>
                        <td onClick={handleClick} >{ value.notes }</td>
                        <td>People here</td>
                        <td>
                            { value.isSteroid ? <span> STEROID </span> : null }
                            { value.isAntibiotic ? <span> ANTIBIOTIC </span> : null }
                            { value.isPrescriptionNeeded ? <span> PRESCRIPTION </span> : null }
                        </td>
                        <td>
                            <span data-medicine-id={ value.id } onClick={ openDescriptionModal } ><FontAwesomeIcon icon={ faInfoCircle } /></span>
                            <span data-medicine-id={ value.id }><FontAwesomeIcon icon={ faList } /></span>
                            <span data-medicine-id={ value.id } onClick={ openNewInstanceModal } ><FontAwesomeIcon icon={ faPlusSquare } /></span>
                            <span data-medicine-id={ value.id } onClick={ addToWishList } ><FontAwesomeIcon icon={ faShoppingBasket } /></span>
                            <span data-medicine-id={ value.id } onClick={ openEditMedicineModal } ><FontAwesomeIcon icon={ faEdit } /></span>
                        </td>
                    </tr>
                )) }
            </tbody>
        </table>
    )
}

export default MedicinesTable;