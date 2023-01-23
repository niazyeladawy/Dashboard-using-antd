import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserProvider } from '../context/auth/UserProvider'
import { BuyersProvider } from '../context/buyers/BuersProvider'
import Buyers from '../pages/Buysers/Buyers'
import ChartsPage from '../pages/Charts/ChartsPage'
import Home from '../pages/Home/Home'
import NotFoundPage from '../pages/Not-found-page/NotFoundPage'
import ProductsPage from '../pages/Prodcuts/ProductsPage'
import ProdilePage from '../pages/Profile/ProdilePage'
import UsersPage from '../pages/users/UsersPage'
import routerLinks from './routerLinks'

const AppRoutes = () => {
    return (
        <BuyersProvider>
        <Routes>
            <Route path='*' element={<NotFoundPage />} />
            <Route path={routerLinks.homePage} element={<Home />} />
            <Route path={routerLinks.chartsPage} element={<ChartsPage />} />
            <Route path={routerLinks.productsPage} element={<ProductsPage />} />

            <Route path={routerLinks.usersPage} element={<UsersPage />} />
            <Route path={routerLinks.profilePage} element={<ProdilePage />} />
           

                <Route path={routerLinks.buyersPage} element={<Buyers />} />
           

        </Routes>
        </BuyersProvider>
    )
}

export default AppRoutes