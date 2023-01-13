import { createContext } from 'react';

const AuthContext = createContext({
    isAuth: false,
    login: () => { },
    logout: () => { },
});

export default AuthContext;