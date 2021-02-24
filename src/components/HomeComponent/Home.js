import React from 'react';
import ActiveTable from '../HomeActiveTableComponent/ActiveTable';
import ExpiredTable from '../HomeExpiredTableComponent/ExpiredTable';
import WishListTable from '../HomeWishListTableComponent/WishListTable';

const Home = ({ setIsModalHidden, setModalData }) => {

    // const setIsMModal = () => {
    //     setIsModalHidden(false)
    // }

    return (
        <>
            <section className="home background">
                <div className="container">
                    <div className="left-row">
                        <ExpiredTable />
                    </div>
                    <div className="right-row">
                        <WishListTable setIsModalHidden={ setIsModalHidden } setModalData={ setModalData } />
                        <ActiveTable />
                    </div>
                </div>
            </section>
            <div className="background-wave"></div>
        </>
    )
}

export default Home;