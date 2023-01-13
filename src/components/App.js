import { Button, Space } from 'antd';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import AuthProvider from '../context/auth/AuthProvider';
import LoginPage from '../pages/login/LoginPage';
import NotFoundPage from '../pages/Not-found-page/NotFoundPage';
import AppRoutes from './AppRoutes';
import AppLayout from './Layout';
import routerLinks from './routerLinks';


function App() {
  const { isAuth } = useContext(AuthContext);

  console.log(isAuth, "isAuth")

  return (
    <div className="App">

      {
        !(isAuth) ? (
          <Routes>
            <Route path='*' element={<NotFoundPage />} />
            <Route path={routerLinks.loginPage} element={<LoginPage />} />
          </Routes>
        ) : <AppLayout>
          <AppRoutes />
        </AppLayout>
      }



      {/* {
        !isAuth ? (
          <routes>
            <Route path='/login' element={<LoginPage />} />
          </routes>

        ) : (
          <AppLayout>
            <AppRoutes />
          </AppLayout>

        )
      } */}







    </div>
  );
}

export default App;
