import React, { useState, useEffect } from 'react';
import Medicines from '../MedicinesComponent/Medicines';

const MedicinesTable = () => {

    const [medicinesTableData, setMedicinesTableData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        await fetch('http://localhost:8080/medicine/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
    }, [])

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
                        <td onClick={handleClick} >{ value.description }</td>
                        <td>People here</td>
                        <td>
                            { value.isSteroid ? <span> STEROID </span> : null }
                            { value.isAntibiotic ? <span> ANTIBIOTIC </span> : null }
                            { value.isPrescriptionNeeded ? <span> PRESCRIPTION </span> : null }
                        </td>
                        {/* <td>
                            <span data-medicine-id={ value.id } onClick={ setModal } ><FontAwesomeIcon icon={ faPlusSquare } /></span>
                            <span data-medicine-id={ value.id } onClick={ deleteFromWishList }><FontAwesomeIcon icon={ faTrash } /></span>
                        </td> */}
                    </tr>
                )) }
            </tbody>
        </table>
    )
}

export default MedicinesTable;