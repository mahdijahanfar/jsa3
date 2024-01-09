import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useShowMessageErr, useSnackStore } from "../../context/zustand/store";
import { api_notif } from '../../api/api_app'
import { one } from "./ImportantNotification.module.css"
import { CircularProgress, Slide } from "@material-ui/core";
export default () => {
    const {
        setSnack
    } = useSnackStore(state => ({
        setSnack: state.setSnack
    }))
    const {
        setAllowShowErr, allowShowErr
    } = useShowMessageErr(state => ({
        allowShowErr: state.show,
        setAllowShowErr: state.shower,
    }))
    let { isLoading, error, data } = useQuery('notif', () => api_notif())

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
    useEffect(() => {
        if (data) {
            if (data.message) {
                if (allowShowErr) {
                    logger(data.message)
                    setAllowShowErr(false)
                }
            } else if (!data.packet) {

                logger("فعلا اعلانی موجود نیست", "warning")
            }
        }
        if (error) {
            logger("مشکل در لود اعلان ها")
        }
    }, [error, data])
    return (
        <>

            {(isLoading && !data && !error) && <div style={{ display: "flex", alignItems: "center" }}><CircularProgress /><span style={{ paddingRight: "3px" }}>درحال لود اعلانات</span></div>}
            {(data && data.packet) && <div className={one} >
                <h2>اعلانهای مهم</h2>
                <p>
                    {data.packet}
                </p>
            </div>}
        </>

    )
}