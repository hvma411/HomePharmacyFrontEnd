import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthorizationComponents/Auth';

const ActiveTable = ({ modalsData, setModalsData, eventHandler, setEventHandler }) => {

    const [activeTableData, setActiveTableData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    console.log(activeTableData)

    
    const { currentUser } = useContext(AuthContext);

    console.log(currentUser.uid)

    const getData = async () => {
        await fetch('http://localhost:8080/medicine/showTodaysMedicines', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userId': currentUser.uid
            }
        })
        .then(response => response.json())
        .then(data => {
            setActiveTableData(data)
            setIsLoading(false)
        })
    }

    const updateActiveMedicine = async (e) => {
        console.log(activeTableData)
        const medicineToPass = activeTableData.find(el => el.id == e.currentTarget.dataset.medicineId)
        await fetch('http://localhost:8080/medicine/updateActiveMedicineInstance', {
            method: 'PATCH',
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

    useEffect(() => {
        getData()
    }, [eventHandler])

    return (
        <div className="active-medicines">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th className="title-table" colSpan="3">Active medicines</th>
                    </tr>
                    <tr>
                        <th>Medicine</th>
                        <th>Member</th>
                        <th>Daily dose</th>
                    </tr>
                </thead>
                <tbody className="active-tbody">
                    { isLoading ? null : activeTableData.map((value, idx) => (
                        <tr key={ idx }>
                            <td>{ value.medicineInstance.medicine.name }</td>
                            <td>{ value.familyMember.name }</td>
                            <td>
                                { new Array(value.alreadyTaken).fill(0).map((el, elIdx) => (
                                    <span key={ elIdx }> <FontAwesomeIcon icon={ faCheck } /> </span>
                                )) }
                                { new Array(value.quantityPerDay - value.alreadyTaken).fill(0).map((el, elIdx) => (
                                    <span key={ elIdx } data-medicine-id={ value.id } onClick={ updateActiveMedicine } > <FontAwesomeIcon icon={ faMinus } /> </span>
                                )) }
                                {/* <span><FontAwesomeIcon icon={ faCheck } /></span>
                                <span><FontAwesomeIcon icon={ faCheck } /></span>
                                <span><FontAwesomeIcon icon={ faMinus } /></span> */}
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default ActiveTable;