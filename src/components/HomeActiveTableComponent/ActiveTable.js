import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const ActiveTable = () => {

    const [activeTableData, setActiveTableData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        await fetch('http://localhost:8080/medicine/showTodaysMedicines', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setActiveTableData(data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

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
                                <span><FontAwesomeIcon icon={ faCheck } /></span>
                                <span><FontAwesomeIcon icon={ faCheck } /></span>
                                <span><FontAwesomeIcon icon={ faMinus } /></span>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default ActiveTable;