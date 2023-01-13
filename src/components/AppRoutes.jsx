import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ChartsPage from '../pages/Charts/ChartsPage'
import Home from '../pages/Home/Home'
import NotFoundPage from '../pages/Not-found-page/NotFoundPage'
import ProductsPage from '../pages/Prodcuts/ProductsPage'
import routerLinks from './routerLinks'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='*' element={<NotFoundPage />} />
            <Route path={routerLinks.homePage} element={<Home/>} />
            <Route path={routerLinks.chartsPage} element={<ChartsPage/>} />
            <Route path={routerLinks.productsPage} element={<ProductsPage/>} />
        </Routes>
    )
}

export default AppRoutes