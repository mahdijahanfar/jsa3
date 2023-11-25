import React, { useEffect } from 'react';
import { Paper, TableHead, TableRow, TableContainer, TableCell, Table, TableBody, Slide, CircularProgress } from "@material-ui/core"
import { api_tarp } from "../../api/api_app"
import { useQuery } from 'react-query'
import { useSnackStore } from '../../context/zustand/store'

import { trEve, cell } from "./Table.module.css"

export default function Index() {
    const { isLoading, error, data } = useQuery('tarp', () => api_tarp())

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
                logger("فعلا داده رزبری موجود نیست", "warning")
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

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">باران</TableCell>
                                <TableCell align="right">رطوبت خاک</TableCell>
                                <TableCell align="right">رطوبت هوا</TableCell>
                                <TableCell align="right">دما</TableCell>
                                <TableCell align="right">وضعیت</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(({ rainfall, Soil_Moisture, Air_humidity, Temperature, Status }, index) => (
                                <TableRow
                                    className={`${index % 2 === 1 ? trEve : null}`}
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell className={cell} align="right" component="th" scope="row">
                                        {rainfall}
                                    </TableCell>
                                    <TableCell className={cell} align="right">{Soil_Moisture}</TableCell>
                                    <TableCell className={cell} align="right">{Air_humidity}</TableCell>
                                    <TableCell className={cell} align="right">{Temperature}</TableCell>
                                    <TableCell className={cell} align="right">{Status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    );
}