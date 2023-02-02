import React, { useContext } from 'react';
import BuyersChart from '../../components/Chart/BuyersChart';
import UserContext from '../../context/auth/UserProvider';
import './Home.scss';
import StaticsChart from './StaticsChart';

const Home = () => {
    const { firestoreUser, setFirestoreUser } = useContext(UserContext);
    return (
        <div className='home'>
            <h1 className='mb-4'>
                Welcome back {firestoreUser?.username} !
            </h1>

            <StaticsChart/>

            <BuyersChart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
    )
}

export default Home