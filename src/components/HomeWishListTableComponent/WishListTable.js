import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const WishListTable = ({ setIsModalHidden, setModalData }) => {

    const [wishListData, setWishListData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        await fetch('http://localhost:8080/medicine/showWishlist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setWishListData(data)
            setIsLoading(false)
        })
    }

    const setModal = (e) => {

        setIsModalHidden(false);
        setModalData({
            medicine_id: e.currentTarget.dataset.medicineId
        })
    }

    const deleteFromWishList = async (e) => {
        const medicineToDeleteFromWishList = wishListData.find(el => el.id == e.currentTarget.dataset.medicineId)
        await fetch('http://localhost:8080/medicine/removeFromWishlist', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicineToDeleteFromWishList),
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="wish-list">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th className="title-table" colSpan="3">Wishlist</th>
                    </tr>
                    <tr>
                        <th>Medicine</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="wishlist-tbody">
                    { isLoading ? null : wishListData.map((value, idx) => (
                        <tr key={ idx }>
                            <td>{ value.name }</td>
                            <td>{ value.description }</td>
                            <td>
                                <span data-medicine-id={ value.id } onClick={ setModal } ><FontAwesomeIcon icon={ faPlusSquare } /></span>
                                <span data-medicine-id={ value.id } onClick={ deleteFromWishList }><FontAwesomeIcon icon={ faTrash } /></span>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default WishListTable;