import React, { useEffect } from "react";
import { progsHeader, history, progsWrapper, progsHeaderWrapper, progsHeaderLines, progsHeaderRight, progsHeaderLeft } from "./FarmState.module.css"
import ProgressBar from '../proggressBar/ProgressBar';
import { api_farm_state } from "../../api/api_app"
import { useQuery } from 'react-query'
import { useSnackStore } from '../../context/zustand/store'
import { CircularProgress, Slide } from '@material-ui/core'

export default () => {
    const { isLoading, error, data } = useQuery('farm_state', () => api_farm_state())

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
    useEffect(() => {
        if (data) {
            if (data.message) {
                logger(data.message)
            } else if (!data.length) {
                logger("فعلا گزارش حالتی از مزرعه موجود نیست", "info")
            }

        }
        if (error) {
            logger("مشکل در لود داده های رزبری")
        }
    }, [error, data])
    return (
        <>
            {(isLoading && !data && !error) && <div style={{ display: "flex", alignItems: "center" }}><CircularProgress /><span style={{ paddingRight: "3px" }}>درحال لود جدول</span></div>}

            {(data && data.length && data[0].id) &&
                <>

                    <div className={progsHeaderWrapper}>
                        <div className={progsHeaderLines + " " + progsHeaderRight}></div>
                        <h3 className={progsHeader}>

                            وضعیت مزرعه تحت پایش

                        </h3>
                        <div className={progsHeaderLines + " " + progsHeaderLeft}></div>
                    </div>
                    <span className={history}>
                        در تاریخ:
                        {data[0].date}
                        {"  "}
                        و ساعت
                        {" "}
                        {data[0].time}
                        {" "}
                    </span>
                    <div className={progsWrapper}>
                        {
                            [
                                { name: "دفعات بارش", value: data[0].rainfall },
                                { name: "رطوبت خاک", value: data[0].soil_humidity },
                                { name: "دمای خاک", value: data[0].soil_temperature },
                                { name: "رطوبت هوا", value: data[0].air_humidity },
                                { name: "دمای هوا", value: data[0].air_temperature },
                            ].sort(({ value: first }, { value: second }) => first - second).map(({ value, name }, index) =>

                                <ProgressBar name={name} value={value} index={index} />

                            )

                        }
                    </div>
                </>
            }
        </>
    )
}