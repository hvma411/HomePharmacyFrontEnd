import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Modals = ({ setIsModalHidden }) => {
    
    const setParentState = () => {
        console.log('clicked');
        props.setIsModalHidden(true)
    }

    return (
        <div className="modals-background">
            <AddNewInstance setIsModalHidden={ setIsModalHidden } />
        </div>
    )
}

const AddNewInstance = ({ setIsModalHidden }) => {
    // console.log(setIsModalHidden)
    const [newInstance, setNewInstance] = useState({
        medicine_id: '',
        quantityLeft: '',
        expiryDate: ''
    })

    return (
        <div className="new-instance-modal">
            <h2>ADD MEDICINE INSTANCE</h2>
            <span className="close-btn" onClick={ () => setIsModalHidden(true) } ><FontAwesomeIcon icon={ faTimes } /> </span>
            <form>
                <span className="title">Nazwa leku</span> 
                <input name="quantityLeft" type="text" placeholder="Package quantity" />
                <input name="expiryDate" type="text" placeholder="Expiry Date" />
                <button type="button">Add medicine</button>
            </form>
        </div>
    )
}

export default Modals;