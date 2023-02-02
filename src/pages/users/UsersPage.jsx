import { Button, Modal } from 'antd';
import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../components/firebase';
import UsersContext from '../../context/auth/usersContext/UsersProvider';
import AddNewUserForm from './AddNewUserForm';

const UsersPage = () => {

    const { usersModalOpened, setUsersModalOpened } = useContext(UsersContext)
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id , ...doc.data()})
                });
                setData(list)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [])



    return (
        <div className='UsersPage'>
            <Button size='large' onClick={() => setUsersModalOpened(true)} >Add New User</Button>

            {
                usersModalOpened && (
                    <Modal title="Add New User" okButtonProps={{ style: { display: 'none' } }}
                        open={usersModalOpened} onOk={() => setUsersModalOpened(false)} onCancel={() => setUsersModalOpened(false)}>
                        {<AddNewUserForm />}
                    </Modal>
                )
            }
        </div>
    )
}

export default UsersPage