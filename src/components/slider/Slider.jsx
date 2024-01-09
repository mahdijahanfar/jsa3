
import Slider from 'react-slick'
import { api_news } from '../../api/api_app'
import { simplesCard, button, img, cardDesciript, cardName, cardCode, noSlider, titleStyle } from "./Slider.module.css"
import React, { useEffect } from "react"
import { ButtonBase, CircularProgress, Slide } from '@material-ui/core'
import { useShowMessageErr, useSnackStore } from '../../context/zustand/store'
import { useQuery } from 'react-query'
export default function Index() {
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
    let { isLoading, error, data } = useQuery(['slider', [{ data_range: 'lastNinetyDays' }]], () => api_news())
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
            } else if (!data.length) {
                logger("فعلا اخباری موجود نیست", "warning")
            }
        }
        if (error) {
            logger("مشکل در لود اخبار")
        }
    }, [error, data])



    const init = {
        swipeToSlide: true,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
        infinite: true, dots: false,
    }
    const setting = {
        responsive: [
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 2,
                    ...init
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    ...init
                }
            }
        ],

        slidesToShow: 3,
        ...init
    }
    return (
        <>
            {(isLoading && !data && !error) && <div style={{ display: "flex", alignItems: "center" }}><CircularProgress /><span style={{ paddingRight: "3px" }}>درحال لود اخبار</span></div>}
            {
                data && (


                    data.message ? <></>
                        :
                        data.length ?
                            data.length > 3 ?
                                <Slider  {...setting} >
                                    {data.map(({ title, src, date, descript }, index) =>
                                        <div key={index} className={simplesCard}>
                                            <img className={img} src={`https://node-mysql-deploy.onrender.com/${src}`} alt={title} />
                                            <div className={cardDesciript}>
                                                <div className={cardName}>
                                                    <span>{date}</span>
                                                    <span className={titleStyle}>{title}</span>
                                                </div>
                                                <p className={cardCode}>{descript} کد</p>
                                                <ButtonBase className={button}>ادامه مطلب</ButtonBase>
                                            </div>
                                        </div>
                                    )}
                                </Slider>
                                : (<div className={noSlider}>{
                                    data.map(({ title, src, date, descript }, index) =>
                                        <div key={index} className={simplesCard}>
                                            <img className={img} src={`https://node-mysql-deploy.onrender.com/${src}`} alt={title} />
                                            <div className={cardDesciript}>
                                                <div className={cardName}>
                                                    <span>{date}</span>
                                                    <span className={titleStyle}>{title}</span>
                                                </div>
                                                <p className={cardCode}>{descript} کد</p>
                                                <ButtonBase className={button}>ادامه مطلب</ButtonBase>
                                            </div>
                                        </div>
                                    )
                                }</div>)
                            : <></>
                )

            }

        </>
    );
}
