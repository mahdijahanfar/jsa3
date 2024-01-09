import React, { useEffect, useState } from "react";
import { form, row1, row2, formControl, input1, labels, rows, eye, button } from "./Setting.module.css"
import { ButtonBase, FormControl, Input, InputAdornment, MenuItem, TextField, Slide, CircularProgress } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { settingForm, useShowMessageErr, useSnackStore } from "../../context/zustand/store";
import { setting_form } from '../../api/api_app';


export default function Index() {
    const [allowFetch, setAllowFetch] = useState(false)
    const [loading, setLoading] = useState(false)


    const { isLoading, error, data, refetch } = useQuery('setting_form', () => setting_form(formValue), { enabled: allowFetch })
    const {
        setSnack
    } = useSnackStore(state => ({
        setSnack: state.setSnack
    }))

    const {
        setFormValue,
        formValue
    } = settingForm(state => ({
        setFormValue: state.setFormValue,
        formValue: {

            smart_irrigation_method: state.smart_irrigation_method,
            central_hardware_serial: state.central_hardware_serial,
            product_label_password: state.product_label_password
        }

    }))
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
    const {
        setAllowShowErr, allowShowErr
    } = useShowMessageErr(state => ({
        allowShowErr: state.show,
        setAllowShowErr: state.shower,
    }))
    const validator = () => {
        for (const attr in formValue) {
            if (!formValue[attr]) {
                let caseForm
                switch (attr) {
                    case "smart_irrigation_method":
                        caseForm = "شیوه آبیاری هوشمند انتخاب نشده است"
                        break;
                    case "central_hardware_serial":
                        caseForm = "سریال سخت افزار مرکزی وارد نشده است"
                        break;
                    case "product_label_password":
                        caseForm = "کلمه عبور درج شده در برچسب کالا وارد نشده"
                }
                logger(caseForm)
                return false
            }
        }
        return true
    }
    const handleSubmit = () => {
        if (validator(formValue)) {
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
                logger("متاسفانه عملیات ثبت اطلاعات فرم با شکست مواجه شد")
            }
            if (data) {
                if (data.id) {
                    logger("ثبت اطلاعات فرم با موفقیت انجام شد", "success",)
                } else {


                    if (data.message && typeof (data.message) === "string") {
                        if (allowShowErr) {
                            logger(data.message)
                            setAllowShowErr(false)
                        }
                    } else {
                        logger("مشکلی پیش آمده")
                    }
                }
                setLoading(false)
            }
        }
    }, [isLoading, error, data, allowFetch, refetch])
    const [hidePassword, setHidePassword] = useState(true)
    return (
        <>
            <Helmet>
                <title>
                    سیستم کشاورزی هوشمند | تنظیمات
                </title>
            </Helmet>
            <form className={form} action="post">
                <div className={rows}>
                    <div className={row1}>

                        <p className={labels}>انتخاب شیوه آبیاری هوشمند</p>
                        <FormControl className={formControl} >
                            <TextField
                                name={"گزینه ای را انتخاب کنید"}
                                value={formValue.smart_irrigation_method ? formValue.smart_irrigation_method : "گزینه ای را انتخاب کنید"}
                                onChange={({ target: { value } }) => setFormValue({ ...formValue, smart_irrigation_method: value })
                                }
                                select



                            >
                                <MenuItem style={{ fontFamily: "unset" }} value={"گزینه ای را انتخاب کنید"}>
                                    <em>گزینه ای را انتخاب کنید</em>
                                </MenuItem>
                                {["اقتصادی", "پر آب", "در شرایط خشکسالی"].map((text, count) => <MenuItem key={count} style={{ fontFamily: "unset" }} value={text}>{text}</MenuItem>)}
                            </TextField>
                        </FormControl>
                    </div>
                    <div className={row2}>

                        <p className={labels}>ثبت سریال سخت افزار مرکزی</p>
                        <Input
                            value={formValue.central_hardware_serial}
                            onChange={({ target: { value } }) => setFormValue({ ...formValue, central_hardware_serial: value })
                            }
                            className={input1 + " engInput"}
                        />
                    </div>
                    <div className={row2}>

                        <p className={labels}>ثبت کلمه عبور درج شده در برچسب کالا</p>

                        <Input
                            value={formValue.product_label_password}
                            onChange={({ target: { value } }) => setFormValue({ ...formValue, product_label_password: value })}
                            type={`${hidePassword ? "password" : "input"}`} className={input1 + " engInput"}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment >
                                    <ButtonBase onClick={() => setHidePassword(!hidePassword)} className={eye}>
                                        {hidePassword ? <Visibility color='primary' /> : <VisibilityOff color='secondary' />}

                                    </ButtonBase>
                                </InputAdornment>
                            }
                        />

                    </div>
                </div>
                <ButtonBase onClick={handleSubmit} className={button}>{loading ? <CircularProgress /> : `ذخیره`}</ButtonBase>
            </form>
        </>
    )
}