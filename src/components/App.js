import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import UserContext from '../context/auth/UserProvider';
import ForgetPasswordPage from '../pages/forget-password/ForgetPasswordPage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import AppRoutes from './AppRoutes';
import { auth } from './firebase';
import AppLayout from './Layout';
import routerLinks from './routerLinks';


function App() {
  const { isAuth ,login } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth,function (user) {
      if (user) {
        // User is signed in.
        setUser(user)
        login()
        navigate(routerLinks.homePage)
        console.log("User is signed in.",user);
      } else {
        // No user is signed in.
        console.log("No user is signed in.");
      }
    });
  }, [isAuth]);

  return (
    <div className="App">
      {
        !(isAuth) ? (
          <Routes>
            <Route path='*' element={<Navigate to={routerLinks.loginPage} />} />
            <Route path={routerLinks.loginPage} element={<LoginPage />} />
            <Route path={routerLinks.registerPage} element={<RegisterPage />} />
            <Route path={routerLinks.forgetPasswordPage} element={<ForgetPasswordPage />} />
          </Routes>
        ) : <AppLayout>
          <AppRoutes />
        </AppLayout>
      }
    </div>
  );
}

export default App;
