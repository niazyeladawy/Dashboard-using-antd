import { createContext, useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [firestoreUser, setFirestoreUser] = useState();



    return (
        <UserContext.Provider value={{
            user, setUser,
            firestoreUser,
            setFirestoreUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext

