import React from 'react';
import { header, welcome, } from "./Header.module.css"

const Header = () => {

    return (
        <header className={header}>
            <h3 className={welcome}>

                سامانه مدیریت هوشمند کشاورزی جهاد دانشگاهی استان اصفهان واحد خمینی شهر
            </h3>

        </header>
    );
}

export default Header;