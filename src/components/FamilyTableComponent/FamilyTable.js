import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthorizationComponents/Auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFileMedical, faInfoCircle, faList, faPlusSquare, faShoppingBasket, faTrash } from "@fortawesome/free-solid-svg-icons";

const FamilyTable = ({ modalsData, setModalsData }) => {

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
    }, [])

    // const openDescriptionModal = (e) => {
    //     const descriptionToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId).description
    //     setModalsData(prevState => ({
    //         ...prevState,
    //         isModalActive: true,
    //         isMedicineDescriptionModalHidden: false,
    //         medicineDescriptionData: descriptionToPass
    //     }))
    // }

    // const openNewInstanceModal = (e) => {
    //     const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
    //     setModalsData(prevState => ({
    //         ...prevState,
    //         isModalActive: true,
    //         isNewInstanceModalHidden: false,
    //         newInstanceModalData: medicineToPass
    //     }))
    // }

    // const openEditMedicineModal = (e) => {
    //     const medicineToPass = medicinesTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
    //     setModalsData(prevState => ({
    //         ...prevState,
    //         isModalActive: true,
    //         isNewMedicineModalHidden: false,
    //         newMedicineModalData: medicineToPass
    //     }))
    // }

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
                            {/* <span data-medicine-id={ value.id } onClick={ openDescriptionModal } ><FontAwesomeIcon icon={ faInfoCircle } /></span>
                            <span data-medicine-id={ value.id }><FontAwesomeIcon icon={ faList } /></span>
                            <span data-medicine-id={ value.id } onClick={ openNewInstanceModal } ><FontAwesomeIcon icon={ faPlusSquare } /></span>
                            <span data-medicine-id={ value.id } onClick={ addToWishList } ><FontAwesomeIcon icon={ faShoppingBasket } /></span>
                            <span data-medicine-id={ value.id } onClick={ openEditMedicineModal } ><FontAwesomeIcon icon={ faEdit } /></span> */}
                        </td>
                    </tr>
                )) }
            </tbody>
        </table>
    )
}

export default FamilyTable;