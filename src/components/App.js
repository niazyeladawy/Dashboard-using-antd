import { browserLocalPersistence, browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import UserContext from '../context/auth/UserProvider';
import LanguageContext from '../context/language/LanguageProvider';
import ForgetPasswordPage from '../pages/forget-password/ForgetPasswordPage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import AppRoutes from './AppRoutes';
import { auth } from './firebase';
import AppLayout from './Layout';
import Loading from './Loding/Loading';
import routerLinks from './routerLinks';
import 'bootstrap/dist/css/bootstrap.css'
import { useTranslation } from 'react-i18next';

function App() {
  const { isAuth, login } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const [loading, setloading] = useState(false);

  const { appLang } = useContext(LanguageContext);

  const location = useLocation()
  let navigate = useNavigate();


  useEffect(() => {
    let rememberMe = localStorage.getItem('firebaseRemember')
    setloading(true)
    if (rememberMe) {
      if (rememberMe === 'false') {
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            onAuthStateChanged(auth, function (user) {
              if (user) {
                // User is signed in.
                setUser(user)
                login()
                setloading(false)
                navigate(location.pathname)
              } else {
                // No user is signed in.
                setloading(false)
              }
            });
            setloading(false)
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }
      else {
        setPersistence(auth, browserLocalPersistence)
          .then(() => {
            onAuthStateChanged(auth, function (user) {
              if (user) {
                // User is signed in.
                setUser(user)
                login()
                setloading(false)
                navigate(location.pathname)
              } else {
                // No user is signed in.
                setloading(false)
              }
            });
            setloading(false)
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }

    }
    else {
      setloading(false)
    }


  }, [isAuth]);

  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.dir()]);

  useEffect(() => { }, [i18n.language]);

  return (
    <div className={appLang === 'en' ? 'App english' : 'App arabic '} dir={appLang === 'en' ? 'ltr' : 'rtl'} >
      {
        loading ? <Loading /> : !(isAuth) ? (
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
