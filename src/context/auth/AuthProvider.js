import { useState } from 'react';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);

    function login() {
        // Handle login process
        setIsAuth(true);
    }

    function logout() {
        // Handle logout process
        setIsAuth(false);
    }

    

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider
