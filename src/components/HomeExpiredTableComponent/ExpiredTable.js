import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthorizationComponents/Auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faTrash } from "@fortawesome/free-solid-svg-icons";

const ExpiredTable = () => {

    const [expiredTableData, setExpiredTableData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const { currentUser } = useContext(AuthContext);

    const getData = async () => {
        await fetch('http://localhost:8080/medicine/listLastInstances', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setExpiredTableData(data)
            setIsLoading(false)
        })
    }

    const addToWishList = async (e) => {
        const medicineToPass = expiredTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        fetch('http://localhost:8080/medicine/addToWishlist', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            },
            body: JSON.stringify(medicineToPass.medicine),
        })
    }

    const hideElementInList = async (e) => {
        const medicineToHide = expiredTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        fetch('http://localhost:8080/medicine/setInstanceHidden', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            },
            body: JSON.stringify(medicineToHide),
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="expired-date-list">
            <table className="styled-expire-table">
                <thead>
                    <tr>
                        <th className="title-table" colSpan="4">Almost expired medicines / Almost empty package of medicines</th>
                    </tr>
                    <tr>
                        <th>Medicine</th>
                        <th>Quantity</th>
                        <th>Expire Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="expire-table-tbody">
                    { isLoading ? null : expiredTableData.map((value, idx) => (
                        <tr key={ idx }>
                            <td>{ value.medicine.name }</td>
                            <td>{ value.quantityLeft }</td>
                            <td>{ value.expiryDate }</td>
                            <td>
                                <span data-medicine-id={ value.id } onClick={ addToWishList } ><FontAwesomeIcon icon={ faShoppingBasket } /></span>
                                <span data-medicine-id={ value.id } onClick={ hideElementInList } ><FontAwesomeIcon icon={ faTrash } /></span>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default ExpiredTable;