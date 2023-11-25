import React, { useEffect, useState } from 'react';
import { homeContainer, sideBarOutlet, root, paddingRight, coverSmoother, cover } from './MainRoute.module.css';
import { Outlet } from 'react-router-dom';
import Header from "./../../components/header/Header"
import SideBar from "./../../components/sideBar/SideBar"
import { useDrawerStore } from '../../context/zustand/store';

import { useMediaQuery } from '@material-ui/core';
const MainRoute = () => {

    const { closeSideBar, closer } = useDrawerStore(state => ({ closer: state.closer, closeSideBar: state.close }))
    const matchMedia = useMediaQuery("(max-width:900px)")
    return (
        <>
            <div onClick={() => closer(true)} className={`${coverSmoother} ${(matchMedia && !closeSideBar) ? cover : null}`}></div>

            <div className={root} >
                <Header />
                <div className={sideBarOutlet}>

                    <SideBar />
                    <div className={`${homeContainer} ${!closeSideBar ? paddingRight : null}`}>

                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainRoute;