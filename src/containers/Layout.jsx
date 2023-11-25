import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainRoute from './mainRoute/MainRoute';
import { Helmet } from 'react-helmet';
import Auth from '../pages/auth/Auth';
import Home from '../pages/home/Home';
import Monitoring from '../pages/monitoring/Monitoring';
import Reports from '../pages/reports/Reports';
import Setting from '../pages/setting/Setting';
import Supports from '../pages/supports/Supports';
const Layout = () => {
    const permition = localStorage.getItem("name") ? true : false
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={permition ? <MainRoute /> : <Navigate to="/login" />}>
                    <Route index element={<Home />} />
                    <Route path='/setting' element={<Setting />} />
                    <Route path='/monitoring' element={<Monitoring />} />
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/supports' element={<Supports />} />
                </Route>
                <Route path='/login' element={permition ? <Navigate to="/" /> : <Auth />} />
                <Route path="*" element={<p><Helmet><title> متاسفانه صفحه مورد نظر پیدا نشد </title></Helmet>متاسفانه صفحه مورد نظر پیدا نشد </p>} />
            </Routes>
        </HashRouter>
    );
}

export default Layout;