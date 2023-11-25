import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';
import { ButtonBase, TextField, IconButton, Slide, CircularProgress } from '@material-ui/core';
import { SearchRounded as Search, Telegram } from '@material-ui/icons';
import {
    form, tAreaWrap, input, links, activedLink, linksWrapper, button
    , searchButton, search, tArea
} from "./Supports.module.css"
import Table from "./../../components/table/Table"
import SwipeableViews from 'react-swipeable-views';
import { useSnackStore, supportsData } from "../../context/zustand/store";
import { useQuery } from "react-query";
import { send_ticket } from "./../../api/api_app"
export default function Index() {
    const [allowFetch, setAllowFetch] = useState(false)
    const [loading, setLoading] = useState(false)
    const {
        setFormValue,
        formValue,
        formValue: {
            subject,
            title,
            text,
        },
        tab,
        fallowNum,
    } = supportsData(state => ({
        setFormValue: state.setFormValue,
        formValue: {
            subject: state.subject,
            title: state.title,
            text: state.text,
        },
        tab: state.tab,
        fallowNum: state.fallowNum,
    }))

    const { isLoading, error, data, refetch } = useQuery('send_ticket', () => send_ticket(formValue), { enabled: allowFetch })

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }
    const {
        setSnack
    } = useSnackStore(state => ({
        setSnack: state.setSnack
    }))
    const logger = (message, state = "error", position = TransitionLeft) => {
        setSnack({
            message,
            open: true,
            transition: position,
            alert: state,
        })
    }

    const validator = () => {
        for (const attr in formValue) {
            if (!formValue[attr]) {
                let caseForm
                switch (attr) {
                    case "subject":
                        caseForm = "موضوع ثبت نشده است"
                        break;
                    case "title":
                        caseForm = "عنوان وارد نشده است"
                        break;

                    case "text":
                        caseForm = "پیام را وارد کنید"
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
                    setFormValue({
                        subject: "",
                        title: "",
                        text: ""
                    })

                    logger("ثبت اطلاعات فرم با موفقیت انجام شد", "success")
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
    }, [isLoading, error, data, allowFetch, refetch])
    return (<><Helmet>
        <title>
            سیستم کشاورزی هوشمند | پشتیبانی
        </title>
    </Helmet>
        <div className={linksWrapper}>

            {[{ index: 1, label: "پیگیری" }, { index: 0, label: "ثبت تیکت" }]
                .map(({ label, index }) =>

                    <ButtonBase onClick={() => setFormValue({ tab: index })}
                        className={`${links} ${index === tab ? activedLink : ""}`}
                    >
                        {label}
                    </ButtonBase>
                )}
        </div>
        <SwipeableViews
            index={tab}
            containerStyle={{
                transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
            }}
            onChangeIndex={(index) => setFormValue({ tab: index })}
            disabled={true}
        >

            <div
                role="tabpanel"
                hidden={tab !== 0}
                id={"full-width-tabpanel-0"}
                aria-labelledby={"full-width-tab-0"}
                style={{ direction: "rtl" }}
            >
                {tab === 0 && (
                    <form className={form} >
                        <TextField value={subject} onChange={({ target: { value } }) => setFormValue({ subject: value })} className={input} id="standard-basic" label="موضوع" />
                        <TextField value={title} onChange={({ target: { value } }) => setFormValue({ title: value })} className={input} id="standard-basic" label="عنوان" />
                        <div className={tAreaWrap}>
                            <h3>پیام</h3>
                            <textarea value={text} onChange={({ target: { value } }) => setFormValue({ text: value })} className={tArea} cols="80" rows="4"></textarea>
                        </div>
                        <ButtonBase onClick={handleSubmit} className={button}>
                            {
                                loading ? <CircularProgress /> :
                                    <>

                                        <Telegram />
                                        ارسال
                                    </>
                            }
                        </ButtonBase>
                    </form>
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
                    <div className={form}>



                        <form className={search}>
                            <TextField value={fallowNum} onChange={({ target: { value } }) => setFormValue({ fallowNum: value })} className={"engInput"} label="شماره پیگیری" />
                            <IconButton
                                className={searchButton}
                            >
                                <Search
                                />
                            </IconButton>
                        </form>
                        <Table />
                    </div>
                )}
            </div>
        </SwipeableViews>

    </>)
}