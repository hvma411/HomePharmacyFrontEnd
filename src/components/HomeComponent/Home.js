import React from 'react';
import ActiveTable from '../HomeActiveTableComponent/ActiveTable';
import ExpiredTable from '../HomeExpiredTableComponent/ExpiredTable';
import WishListTable from '../HomeWishListTableComponent/WishListTable';

import firebase from '../../config/firebase'

const Home = ({ modalsData, setModalsData, eventHandler, setEventHandler }) => {

    console.log(firebase.auth().currentUser)

    return (
        <>
            <section className="home background">
                <div className="container">
                    <div className="left-row">
                        <ExpiredTable modalsData={ modalsData } setModalsData={ setModalsData } eventHandler={ eventHandler } setEventHandler={ setEventHandler } />
                    </div>
                    <div className="right-row">
                        <WishListTable modalsData={ modalsData } setModalsData={ setModalsData } eventHandler={ eventHandler } setEventHandler={ setEventHandler } />
                        <ActiveTable modalsData={ modalsData } setModalsData={ setModalsData } eventHandler={ eventHandler } setEventHandler={ setEventHandler } />
                    </div>
                </div>
                <div className="blured"></div>
            </section>
            <div className="background-wave"></div>
        </>
    )
}

export default Home;