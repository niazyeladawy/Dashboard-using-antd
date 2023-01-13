import { createContext, useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         if (user) {
    //             console.log("hahahahahahaha",user)
    //             setUser(user);
    //             firebase.database().ref('users/' + user.uid).set(user);
    //         }
    //     });
    // }, []);

    return (
        <UserContext.Provider value={{user , setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext

