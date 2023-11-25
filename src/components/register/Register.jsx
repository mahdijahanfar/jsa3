import { inputElems, input, button, endButtonsWrapper, eye } from "./Register.module.css"
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, Input, IconButton, InputAdornment, CircularProgress } from "@material-ui/core"
import React, { useState, useEffect } from 'react';
import { api_reg } from '../../api/api_login';
import { useQuery } from "react-query"

export default ({ logger, user: { user, setUser } }) => {

    const [hidePassword2, setHidePassword2] = useState(true)
    const [hidePassword3, setHidePassword3] = useState(true)
    const [finalUser, setFinalUser] = useState()
    const [allowFetch, setAllowFetch] = useState(false)
    const { isLoading, error, data, refetch } = useQuery('register', () => api_reg(finalUser), { enabled: allowFetch })
    const [loading, setLoading] = useState(false)
    const clearForm2 = () => {
        setUser({
            confPassword: "",
            email: "",
            name: "",
            password: ""
        })

    }
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
        if (!(thisUser.email.includes("@gmail.com") || thisUser.email.includes("@email.com"))) {
            logger("ایمیل به درستی وارد نشده است")
            return false
        }
        if (thisUser.password !== user.confPassword) {
            logger("تکرار کلمه عبور با خود  کلمه عبور یکسان نیست")
            return false
        }

        return true
    }
    const handleRegister = async () => {
        const thisUser = {
            name: user.name,
            email: user.email,
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
                logger("متاسفانه عملیات ایجاد عضویت با شکست مواجه شد")
            }
            if (data) {
                if (data.id) {
                    logger("ثبت نام با موفقیت انجام شد", "success")
                    localStorage.setItem("name", finalUser.name);
                    localStorage.setItem("avatar", finalUser.avatar);
                    window.location.reload();
                } else {

                    if (typeof (data) === "string") {
                        logger(data)
                    } else {
                        logger("مشکلی پیش آمده")
                    }
                }

                setLoading(false)
            }
        }
    }, [allowFetch, data, error, isLoading])
    return <div >

        <div className={inputElems}>
            <span  >نام و نام خانوادگی</span>
            <Input className={input} value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} ></Input>
        </div>
        <div className={inputElems}>
            <span >ایمیل</span>
            <Input className={input + " engInput"} type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} ></Input>
        </div>
        <div className={inputElems}>
            <span >رمز عبور</span>

            <Input type={`${hidePassword2 ? "password" : "input"}`} className={input + " engInput"} value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}

                startAdornment={
                    <InputAdornment >
                        <IconButton onClick={() => setHidePassword2(!hidePassword2)} className={eye}>
                            {hidePassword2 ? <Visibility color='primary' /> : <VisibilityOff color='secondary' />}

                        </IconButton>
                    </InputAdornment>
                }
            />

        </div>



        <div className={inputElems}>
            <span >تکرار رمز عبور</span>

            <Input type={`${hidePassword3 ? "password" : "input"}`} className={input + " engInput"} value={user.confPassword} onChange={(e) => setUser({ ...user, confPassword: e.target.value })}

                startAdornment={
                    <InputAdornment >
                        <IconButton onClick={() => setHidePassword3(!hidePassword3)} className={eye}>
                            {hidePassword3 ? <Visibility color='primary' /> : <VisibilityOff color='secondary' />}

                        </IconButton>
                    </InputAdornment>
                }
            />

        </div>
        <div className={endButtonsWrapper}>

            <Button variant={'contained'} className={button} onClick={handleRegister} >{loading ? <CircularProgress /> : `عضویت`}</Button>
            <Button onClick={clearForm2} variant={'contained'} className={button} >پاک کردن فرم</Button>
        </div>
    </div>
}