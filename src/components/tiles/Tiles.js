import React from "react";
import { tilesWrapper, buttonBase, tile } from "./Tiles.module.css"
import { ButtonBase } from '@material-ui/core';
import { WatchLater, Sort, Wifi, ViewCarousel, Settings, Person, HomeOutlined } from "@material-ui/icons"

export default () => {
    return (
        <div className={tilesWrapper}>
            {
                [
                    {
                        icon: <WatchLater />, label: "ساعت"
                    },
                    {
                        icon: <Wifi />, label: "وای فای"
                    },
                    {
                        icon: <ViewCarousel />, label: "هدست"
                    },
                    {
                        icon: <Settings />, label: "تنظیمات"
                    },
                    {
                        icon: <Person />, label: "شخص"
                    },
                    {
                        icon: <HomeOutlined />, label: "خانه"
                    },
                ].map(({ icon, label }, index) =>
                    <ButtonBase key={index} className={buttonBase}>
                        <div className={tile}>

                            {icon}
                            <p>{label}</p>
                        </div>
                    </ButtonBase>)
            }
        </div>
    )
}
