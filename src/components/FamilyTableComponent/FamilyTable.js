import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthorizationComponents/Auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFileMedical, faInfoCircle, faList, faPills, faPlusSquare, faShoppingBasket, faTrash } from "@fortawesome/free-solid-svg-icons";

const FamilyTable = ({ modalsData, setModalsData, eventHandler, setEventHandler }) => {

    const [familyTableData, setFamilyTableData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const { currentUser } = useContext(AuthContext);

    const getData = async () => {
        await fetch('http://localhost:8080/family', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            }
        })
        .then(response => response.json())
        .then(data => {
            setFamilyTableData(data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [modalsData, eventHandler])


    const openActiveMedicineModal = (e) => {
        // const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: true,
            isActiveMedicineModalHidden: false,
            activeMedicineModalData: null
        }))
    }

    const openFamilyMemberMedicinesModal = (e) => {
        const familyMemberToPass = familyTableData.find(el => el.id == e.currentTarget.dataset.memberId)
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: true,
            isFamilyMemberMedicinesModalHidden: false,
            familyMemberMedicinesModalData: familyMemberToPass
        }))
    }

    // const addToWishList = async (e) => {
    //     const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
    //     fetch('http://localhost:8080/medicine/addToWishlist', {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'userId': currentUser.uid
    //         },
    //         body: JSON.stringify(medicineToPass),
    //     })
    // }

    const handleClick = () => {
        console.log(familyTableData)
    }

    return (
        <table className="styled-medicine-table">
            <thead>
                <tr>
                    <th onClick={ handleClick } >Name</th>
                    <th>Age</th>
                    <th>Notes</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="medicines-tbody">
                { isLoading ? null : familyTableData.map((value, idx) => (
                    <tr key={ idx }>
                        <td>{ value.name }</td>
                        <td onClick={handleClick} >{ value.age }</td>
                        <td>{ value.notes }</td>
                        <td>
                            <span data-member-id={ value.id } onClick={ openFamilyMemberMedicinesModal } ><FontAwesomeIcon icon={ faList } /></span>
                            <span data-member-id={ value.id } onClick={ openActiveMedicineModal } ><FontAwesomeIcon icon={ faPills } /></span>
                            <span data-member-id={ value.id } ><FontAwesomeIcon icon={ faEdit } /></span>
                            <span data-member-id={ value.id }><FontAwesomeIcon icon={ faTrash } /></span>
                        </td>
                    </tr>
                )) }
            </tbody>
        </table>
    )
}

export default FamilyTable;