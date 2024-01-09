import { CircularProgress, Slide } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { api_tarp } from '../../api/api_app';
import { useInterval } from '../../utils/useInterval';
import { useShowMessageErr, useSnackStore } from '../../context/zustand/store';
import { chartWrapper, chart } from "./Chart.module.css"

export default function Index() {
    // const { isLoading, error, data } = useQuery('chartTarp', () => api_tarp())
    const { isLoading, error, data, refetch } = useQuery('chartTarp', () => api_tarp())
    useInterval(() => {
        refetch();
    }, 30000);
    const [chartData, setChartData] = useState()
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
                if (allowShowErr) {
                    logger(data.message)
                    setAllowShowErr(false)
                }
            } else if (!data.length) {
                logger("فعلا داده رزبری موجود نیست", "warning")
            } else {
                const temp = []
                data.forEach((element) => {
                    const st = element.Status === 'OFF' ? 0 : 1
                    temp.push({ ...element, Status: st })
                })
                setChartData(temp)
            }

        }
        if (error) {
            logger("مشکل در لود داده های رزبری")
            logger(error)
        }
    }, [error, data])
    return (
        <>
            {(isLoading && !data && !error) && <div style={{ display: "flex", alignItems: "center" }}><CircularProgress /><span style={{ paddingRight: "3px" }}>درحال لود نمودار</span></div>}
            {(data && data.length && data[0].id) &&

                <div className={chartWrapper}>
                    <ResponsiveContainer className={chart} width="100%" height="100%">

                        <LineChart
                            width={500}
                            height={500}
                            data={chartData}

                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" stroke="#a184d8" dataKey="rainfall" name='بارش' activeDot={{ r: 8 }} />
                            <Line type="monotone" stroke="#1884d8" dataKey="Temperature" name='دما' activeDot={{ r: 8 }} />
                            <Line type="monotone" stroke="#8814d8" dataKey="Soil_Moisture" name='رطوبت خاک' activeDot={{ r: 8 }} />
                            <Line type="monotone" stroke="#8881d8" dataKey="Air_humidity" name='رطوبت هوا' activeDot={{ r: 8 }} />
                            <Line type="monotone" stroke="#8881d1" dataKey="Status" name='وضعیت' activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            }
        </>

    );

}
// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//     },
// ];
