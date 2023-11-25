import React, { useState, useEffect } from "react";
import { form, row1, row2, dates, formControl, labels, datesForm, button, datesWrapper } from "./Reports.module.css"
import { ButtonBase, FormControl, MenuItem, TextField, Slide, CircularProgress } from '@material-ui/core';
import Table from "./../../components/table/Table"
import Chart from "./../../components/chart/Chart"
import DateInput from "./../../components/dateInput/DateInput"
import { itterableArray } from "./../../utils/itterableArray"
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { reportForm, useSnackStore } from "../../context/zustand/store";
import { report_form } from '../../api/api_app';
import { fixNumbers } from "../../utils/fixArabicNums";
export default function Index() {


    const unfixedNow = (new Date().toLocaleDateString("fa-IR").split("/"));
    const now = unfixedNow.map((param) => fixNumbers(param))
    const {
        setFormValue,
        formValue: {
            finishDay,
            finishMonth,
            finishYear,
            startDay,
            report_type,
            startYear,
            startMonth,
        }
    } = reportForm(state => ({
        setFormValue: state.setFormValue,
        formValue: {

            finishDay: state.finishDay,
            finishMonth: state.finishMonth,
            finishYear: state.finishYear,
            startDay: state.startDay,

            report_type: state.report_type,
            startYear: state.startYear,
            startMonth: state.startMonth,
        }

    }))


    useEffect(() => {
        if (startMonth > 6) {
            if (startMonth === 12) {

                if (startDay > 29) {
                    setFormValue({ startDay: 29 })
                }

            } else if (startDay > 30) {
                setFormValue({ startDay: 30 })
            }

        }


    }, [startMonth])
    useEffect(() => {

        if (finishMonth > 6) {
            if (finishMonth === 12) {
                if (finishDay > 29) {
                    setFormValue({ finishDay: 29 })
                }

            } else if (finishDay > 30) {
                setFormValue({ finishDay: 30 })

            }

        }
    }, [finishMonth])
    useEffect(() => {
        if (startYear > finishYear) {
            setFormValue({ finishYear: startYear })

        }
        if (startYear >= finishYear && startMonth > finishMonth) {
            setFormValue({ finishMonth: startMonth })

        }
        if (startYear >= finishYear && startMonth >= finishMonth && startDay > finishDay) {
            setFormValue({ finishDay: startDay })

        }
    }, [startYear, startMonth, startDay])
    const finishDayList = () => {
        var checkCondition = (startYear >= finishYear && startMonth >= finishMonth) ? startDay : 1
        return finishMonth <= 6 ?
            itterableArray(checkCondition, 31)
            :
            (finishMonth === 12 ?
                itterableArray(checkCondition, 29)
                :
                itterableArray(checkCondition, 30)
            )


    }
    const [allowFetch, setAllowFetch] = useState(false)
    const [loading, setLoading] = useState(false)

    const { isLoading, error, data, refetch } = useQuery('report_form', () => report_form({
        start_date: `${startYear}/${startMonth}/${startDay}`,
        finish_date: `${finishYear}/${finishMonth}/${finishDay}`,
        report_type
    }), { enabled: allowFetch })

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
    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }

    const validator = () => {
        const unCheckedForm = {
            startDay,
            startMonth,
            startYear,
            finishDay,
            finishMonth,
            finishYear,
            report_type
        }
        for (const attr in unCheckedForm) {
            if (!unCheckedForm[attr]) {
                let caseForm
                switch (attr) {
                    case "startDay":
                        caseForm = "روز شروع انتخاب نشده است"
                        break;
                    case "startMonth":
                        caseForm = "ماه شروع انتخاب نشده است"
                        break;
                    case "startYear":
                        caseForm = "سال شروع انتخاب نشده است"
                        break;
                    case "finishDay":
                        caseForm = "روز خاتمه انتخاب نشده است"
                        break;
                    case "finishMonth":
                        caseForm = "ماه خاتمه انتخاب نشده است"
                        break;
                    case "finishYear":
                        caseForm = "سال خاتمه انتخاب نشده است"
                        break;
                    case "report_type":
                        caseForm = "نوع گزارش انتخاب نشده است"
                }
                logger(caseForm)
                return false
            }
        }
        return true
    }
    const submit = () => {
        if (validator({
            start_date: `${startYear}/${startMonth}/${startDay}`,
            finish_date: `${finishYear}/${finishMonth}/${finishDay}`,
            report_type
        })) {

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




    const setFinishDay = (value) => {
        setFormValue({ finishDay: value })
    }
    const setFinishMonth = (value) => {
        setFormValue({ finishMonth: value })
    }
    const setFinishYear = (value) => {
        setFormValue({ finishYear: value })
    }
    const setStartDay = (value) => {
        setFormValue({ startDay: value })
    }
    const setStartMonth = (value) => {
        setFormValue({ startMonth: value })
    }
    const setStartYear = (value) => {
        setFormValue({ startYear: value })
    }

    return (
        <><Helmet>
            <title>
                سیستم کشاورزی هوشمند | گزارش
            </title>
        </Helmet><form className={form} action="get">

                <div className={row1}>

                    <p className={labels}>نوع گزارش</p>
                    <FormControl className={formControl} variant="standard">
                        <TextField
                            value={report_type ? report_type : "گزینه ای را انتخاب کنید"}
                            name={"گزینه ای را انتخاب کنید"}
                            onChange={({ target: { value } }) => value === "گزینه ای را انتخاب کنید" ? setFormValue({ report_type: '' }) : setFormValue({ report_type: value })
                            }
                            select



                        >
                            <MenuItem style={{ fontFamily: "unset" }} value={"گزینه ای را انتخاب کنید"}>
                                <em>گزینه ای را انتخاب کنید</em>
                            </MenuItem>
                            {["حسگرها", "الگوی بارش", "وضعیت آبیاری"].map((text, count) => <MenuItem key={count} style={{ fontFamily: "unset" }} value={text}>{text}</MenuItem>)}
                        </TextField>
                    </FormControl>
                </div>
                <div className={datesForm}>

                    <div className={datesWrapper}>

                        <div className={row2}>

                            <p className={labels}>تاریخ شروع</p>
                            <div className={dates}>
                                <DateInput type={"روز"} selected={startDay} setSelected={setStartDay} list={startMonth <= 6 ? itterableArray(1, 31) : (startMonth === 12 ? itterableArray(1, 29) : itterableArray(1, 30))} />/
                                <DateInput type={"ماه"} selected={startMonth} setSelected={setStartMonth} list={itterableArray(1, 12)} />/
                                <DateInput type={"سال"} selected={startYear} setSelected={setStartYear} list={itterableArray(now[0], now[0] - 100)} />
                            </div>

                        </div>
                        <div className={row2}>

                            <p className={labels}>تاریخ خاتمه</p>
                            <div className={dates}>
                                <DateInput type={"روز"} selected={finishDay} setSelected={setFinishDay} list={finishDayList()} />/
                                <DateInput type={"ماه"} selected={finishMonth} setSelected={setFinishMonth} list={startYear < finishYear ? itterableArray(1, 12) : itterableArray(startMonth, 12)} />/
                                <DateInput type={"سال"} selected={finishYear} setSelected={setFinishYear} list={itterableArray(now[0], startYear)} />
                            </div>
                        </div>
                    </div>
                    <ButtonBase onClick={submit} className={button}>{loading ? <CircularProgress /> : `اعمال`}</ButtonBase>
                </div>
            </form>
            <Table />
            <Chart />
        </>
    )
}
