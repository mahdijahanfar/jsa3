import { inputElems, input, button, endButtonsWrapper, eye } from "./Login.module.css"
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, Input, IconButton, InputAdornment, CircularProgress } from "@material-ui/core"
import React, { useEffect, useState } from 'react';

import { api_login } from '../../api/api_login';
import { useQuery } from "react-query"

export default ({ logger, user: { user, setUser } }) => {
    const [hidePassword1, setHidePassword1] = useState(true)
    const [finalUser, setFinalUser] = useState()
    const [allowFetch, setAllowFetch] = useState(false)

    const { isLoading, error, data, refetch } = useQuery('login', () => api_login(finalUser), { enabled: allowFetch })

    const [loading, setLoading] = useState(false)
    const validator = (thisUser) => {
        for (const attr in thisUser) {
            if (!thisUser[attr]) {
                let caseForm
                switch (attr) {
                    case "name":
                        caseForm = "نام و نام خانوادگی"
                        break;
                    case "password":
                        caseForm = "رمز عبور"
                        break;
                    case "email":
                        caseForm = "ایمیل"
                }
                logger(caseForm + " نادرست است")
                return false
            }
        }
        return true
    }
    const clearForm1 = () => {
        setUser({ password: "", name: "" })
    }
    const handleLogin = async () => {
        const thisUser = {
            name: user.name,
            password: user.password
        }
        if (validator(thisUser)) {

            await setFinalUser(thisUser)
            setAllowFetch(true)
            refetch()


        }
    }
    useEffect(() => {
        if (allowFetch) {
            if (isLoading || (!data && !error)) {
                setLoading(true)
            }
            if (error) {
                setLoading(false)
                logger("متاسفانه عملیات ورود با شکست مواجه شد")
            }
            if (data) {
                if (data[0] && data[0].id) {
                    logger("ورود با موفقیت انجام شد", "success")
                    localStorage.setItem("name", data[0].name);
                    localStorage.setItem("avatar", data[0].avatar);
                    window.location.reload();
                } else {
                    if (data.message && typeof (data.message) === "string") {
                        logger(data.message)
                    } else {
                        logger("مشکلی پیش آمده")
                    }
                }
                setLoading(false)
            }
        }
    }, [isLoading, error, data, allowFetch, refetch, finalUser])
    return <div style={{ paddingTop: "10rem" }} >
        <div className={inputElems}>
            <span >نام و نام خانوادگی</span>
            <Input className={input} value={user.name} onChange={({ target: { value } }) => setUser({ ...user, name: value })} ></ Input>
        </div>

        <div className={inputElems}>
            <span >رمز عبور</span>

            <Input type={`${hidePassword1 ? "password" : "input"}`} className={input + " engInput"} value={user.password} onChange={({ target: { value } }) => setUser({ ...user, password: value })}

                startAdornment={
                    <InputAdornment >
                        <IconButton onClick={() => setHidePassword1(!hidePassword1)} className={eye}>
                            {hidePassword1 ? <Visibility color='primary' /> : <VisibilityOff color='secondary' />}

                        </IconButton>
                    </InputAdornment>
                }
            />

        </div>
        <div className={endButtonsWrapper}>
            <Button variant={'contained'} className={button} onClick={handleLogin} >{loading ? <CircularProgress /> : `ورود`}</Button>
            <Button onClick={clearForm1} variant={'contained'} className={button} >پاک کردن فرم</Button>
        </div>
    </div>
}