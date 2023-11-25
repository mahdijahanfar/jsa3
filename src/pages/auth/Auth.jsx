import { Paper, Tab, Tabs, Slide } from '@material-ui/core';
import React, { useState } from 'react';
import { root, paper, tabs, title, } from "./Auth.module.css"
import SwipeableViews from 'react-swipeable-views';
import { useSnackStore } from "../../context/zustand/store"
import { Helmet } from 'react-helmet';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';
const Index = () => {
    const {
        setSnack
    } = useSnackStore(state => ({
        setSnack: state.setSnack
    }))
    const [tab, setTab] = useState(1)
    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }
    const logger = (message, state = "error", position = TransitionLeft) => {
        setSnack({
            message,
            open: true,
            transition: position,
            alert: state,
        })
    }
    const [loginUser, setLoginUser] = useState({
        name: "", password: ""
    })
    const [regUser, setRegUser] = useState({
        name: "", password: "", email: "", confPassword: ""
    })
    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }


    return (
        <div className={root}>
            <Helmet>
                <title>
                    سیستم کشاورزی هوشمند | ورود و ثبت نام
                </title>
            </Helmet>
            <Paper className={paper}>
                <p className={title} >به سیستم کشاورزی هوشمند جهاد دانشگاهی خوش آمدید</p>
                <Tabs
                    className={tabs}
                    onChange={(e, newValue) => { setTab(newValue) }}
                    value={tab}
                    indicatorColor={"primary"}
                >
                    <Tab
                        label={"ورود"}
                        {...a11yProps(0)}
                    />
                    <Tab
                        label={"ثبت نام"}
                        {...a11yProps(1)}
                    />
                </Tabs >
                <SwipeableViews
                    index={tab}
                    containerStyle={{
                        transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
                    }}
                    onChangeIndex={(index) => setTab(index)}
                >

                    <div
                        role="tabpanel"
                        hidden={tab !== 0}
                        id={"full-width-tabpanel-0"}
                        aria-labelledby={"full-width-tab-0"}
                        style={{ direction: "rtl" }}
                    >
                        {tab === 0 && (
                            <Login user={{ user: loginUser, setUser: setLoginUser }} logger={logger} />
                        )}
                    </div>
                    <div
                        role="tabpanel"
                        hidden={tab !== 1}
                        id={"full-width-tabpanel-1"}
                        aria-labelledby={"full-width-tab-1"}
                        style={{ direction: "rtl" }}
                    >
                        {tab === 1 && (
                            <Register user={{ user: regUser, setUser: setRegUser }} logger={logger} />
                        )}
                    </div>
                </SwipeableViews>
            </Paper>
        </div>
    );
}

export default Index;