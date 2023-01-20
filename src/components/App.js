import { browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { Suspense, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import UserContext from '../context/auth/UserProvider';
import ForgetPasswordPage from '../pages/forget-password/ForgetPasswordPage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import AppRoutes from './AppRoutes';
import { auth } from './firebase';
import AppLayout from './Layout';
import Loading from './Loading';
import routerLinks from './routerLinks';


function App() {
  const { isAuth, login } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const [loading, setloading] = useState(false);

 
  const location = useLocation()
  let navigate = useNavigate();


  useEffect(() => {
    let rememberMe = localStorage.getItem('firebaseRemember')
    setloading(true)
    if (rememberMe) {
      if (rememberMe === 'false') {
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            setloading(false)
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }
      else {
        onAuthStateChanged(auth, function (user) {
          if (user) {
            // User is signed in.
            setUser(user)
            login()
            setloading(false)
            navigate(location.pathname)
            console.log("User is signed in.", user);
          } else {
            // No user is signed in.
            setloading(false)
            console.log("No user is signed in.");
          }
        });
      }

    }
    else{
      setloading(false)
    }

    
  }, [isAuth]);

  console.log("loading",loading);

  return (
    <div className="App">
        {
          loading ? <Loading/> :  !(isAuth) ? (
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
