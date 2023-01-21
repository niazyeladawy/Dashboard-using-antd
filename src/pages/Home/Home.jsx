import React, { useContext } from 'react'
import AuthDetails from '../../components/AuthDetails'
import UserContext from '../../context/auth/UserProvider';
import './Home.scss'

const Home = () => {
    const { firestoreUser, setFirestoreUser } = useContext(UserContext);
    return (
        <div className='home'>
            <h1>
                Welcome back {firestoreUser?.username} !
            </h1>
            <AuthDetails />
        </div>
    )
}

export default Home