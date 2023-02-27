import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { BuyersProvider } from '../context/buyers/BuersProvider'
import { ProductsProvider } from '../context/products/ProductsProvider'
import Buyers from '../pages/Buysers/Buyers'
import CalendarPage from '../pages/calendar/CalendarPage'
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
            <ProductsProvider>
                <Routes>
                    <Route path='*' element={<Navigate to={routerLinks.homePage} />} />
                    <Route path={routerLinks.homePage} element={<Home />} />
                    <Route path={routerLinks.chartsPage} element={<ChartsPage />} />
                    <Route path={routerLinks.productsPage} element={<ProductsPage />} />

                    {/* <Route path={routerLinks.usersPage} element={<UsersPage />} /> */}
                    <Route path={routerLinks.profilePage} element={<ProdilePage />} />
                    <Route path={routerLinks.calendarPage} element={<CalendarPage />} />


                    <Route path={routerLinks.buyersPage} element={<Buyers />} />


                </Routes>
            </ProductsProvider>
        </BuyersProvider>
    )
}

export default AppRoutes