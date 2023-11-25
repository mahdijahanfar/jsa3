import React from 'react';
import { Helmet } from 'react-helmet';
import Slider from "./../../components/slider/Slider"
import { welcome } from "./Home.module.css"
import ImportantNotification from "./../../components/importantNotification/ImportantNotification"
import Tiles from '../../components/tiles/Tiles';
import FarmState from '../../components/farmState/FarmState';
const Home = () => {
    return (
        <div >
            <Helmet>
                <title>
                    سامانه کشاورزی هوشمند | خانه
                </title>
            </Helmet>

            <h3 className={welcome}>
                به سامانه مدیریت هوشمند کشاورزی جهاد دانشگاهی استان اصفهان خوش آمدید
            </h3>

            <Slider />
            <ImportantNotification />
            <FarmState />
            <Tiles />
        </div>
    );
}

export default Home;