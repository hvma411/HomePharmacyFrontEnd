import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthorizationComponents/Auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const WishListTable = ({ modalsData, setModalsData, eventHandler, setEventHandler }) => {

    const [wishListData, setWishListData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const getData = async () => {
        await fetch('http://localhost:8080/medicine/showWishlist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            }
        })
        .then(response => response.json())
        .then(data => {
            setWishListData(data)
            setIsLoading(false)
        })
    }

    const openModal = (e) => {
        const medicineToPass = wishListData.find(el => el.id == e.currentTarget.dataset.medicineId)
        setModalsData(prevState => ({
            ...prevState,
            isModalActive: true,
            isNewInstanceModalHidden: false,
            newInstanceModalData: medicineToPass
        }))
    }

    const deleteFromWishList = async (e) => {
        const medicineToDeleteFromWishList = wishListData.find(el => el.id == e.currentTarget.dataset.medicineId)
        await fetch('http://localhost:8080/medicine/removeFromWishlist', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            },
            body: JSON.stringify(medicineToDeleteFromWishList),
        })
        setIsDeleted(true)
        setIsDeleted(false)
    }

    useEffect(() => {
        getData()

    }, [isDeleted, eventHandler])

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
                            <td>{ value.notes }</td>
                            <td>
                                <span data-medicine-id={ value.id } onClick={ openModal } ><FontAwesomeIcon icon={ faPlusSquare } /></span>
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