import { createContext, useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

 

    return (
        <UserContext.Provider value={{user , setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext

