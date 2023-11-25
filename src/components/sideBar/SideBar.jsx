import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    sidebar, links, aside,
    hr,
    close,

    logo,
    profSvg,
    activedLink,
    linkSpans, open, littleName, buttonBase
    ,
    menuButtonBase, openedMenu
} from "./SideBar.module.css"
import { useDrawerStore, useUserStore } from "../../context/zustand/store";
import { ButtonBase, Menu, MenuItem, Tooltip, Zoom } from '@material-ui/core';
import { ExitToApp, Menu as MenuIcon, PersonRounded, Home, Settings, ShowChart, TableChartRounded, ContactSupport } from '@material-ui/icons';
import { useMediaQuery } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function Index() {
    const matchMedia = useMediaQuery("(max-width:900px)")
    const navigate = useNavigate()
    const { closeSideBar, closer } = useDrawerStore(state => ({ closer: state.closer, closeSideBar: state.close }))
    const nameOfUser = localStorage.getItem("name")
    const [imageByUser, setImageByUser] = useState(),
        [imageProfile, setImageProfile] = useState(),
        [anchorMenu, setAnchorMenu] = useState(),
        [openDialog, setOpenDialog] = useState(false)
    const thisUser = useUserStore(state => state)
    const setThisUser = useUserStore(state => state.setThisUser)
    useEffect(() => { if (matchMedia) closer(true) }, [matchMedia])
    useEffect(() => {
        if (imageByUser) {
            setImageProfile(
                <img className={logo} src={imageByUser} alt="" />
            )
            setThisUser({ ...thisUser, image: imageByUser })
        } else {
            if (thisUser.image && thisUser.image !== undefined) {
                setImageProfile(
                    <img className={logo} src={thisUser.image} alt="" />
                )
            } else {
                setImageProfile(
                    <PersonRounded className={profSvg} />
                )
            }
        }
    }, [imageByUser])
    const onAvatarChange = (thisInput) => {
        if (thisInput.files[0] && thisInput.files[0].type.includes("image")) {
            const reader = new FileReader()
            reader.onload = e => {
                setImageByUser(e.target.result)
            }
            reader.readAsDataURL(thisInput.files[0])
        }
    }
    const imageSelectRef = useRef(null)
    const onSelectImage = () => {
        imageSelectRef.current.click();
        setAnchorMenu(null)
    }
    const onExit = () => {
        setOpenDialog(false)
        setThisUser({})
        localStorage.removeItem("name")
        window.location.reload()
    }
    const array = [
        {
            to: '/', text: "صفحه نخست", icon: <Home className={profSvg} />
        },
        {
            to: '/setting', text: "تنظیمات", icon: <Settings className={profSvg} />
        },
        {
            to: '/monitoring', text: "پیمایش لحظه ای", icon: <TableChartRounded className={profSvg} />
        },
        {
            to: '/reports', text: "گزارش ها", icon: <ShowChart className={profSvg} />
        },
        {
            to: '/supports', text: "پشتیبانی", icon: <ContactSupport className={profSvg} />
        }
    ]
    return (
        <aside className={`${aside} ${closeSideBar ? close : open}`}>
            <ButtonBase className={`${buttonBase} ${closeSideBar ? "" : openedMenu}`} onClick={() => { closer(!closeSideBar) }}>
                <MenuIcon className={links + " " + menuButtonBase} />
            </ButtonBase>
            <ButtonBase onClick={e => setAnchorMenu(e.currentTarget)} className={buttonBase} >
                <div className={links + " " + menuButtonBase}>
                    {closeSideBar ?
                        <Tooltip TransitionComponent={Zoom} placement="left" TransitionProps={{ timeout: 200 }} title={nameOfUser}>

                            {imageProfile}
                        </Tooltip>
                        : imageProfile}
                    {closeSideBar ? "" : <h3 className={littleName}>
                        {nameOfUser} خوش آمدید
                    </h3>}
                </div>
            </ButtonBase>
            <input ref={imageSelectRef} onChange={e => onAvatarChange(e.target)} type={"file"} style={{ display: "none" }} />
            <div className={sidebar}>
                {
                    array.map(({ to, text, icon }, index) =>
                        closeSideBar ? <Tooltip key={index} TransitionComponent={Zoom} placement="left" TransitionProps={{ timeout: 200 }} title={text}>
                            <ButtonBase className={buttonBase} key={index} >
                                <NavLink className={({ isActive }) => `${links} ${isActive ? activedLink : ""} ${index === array.length - 1 ? "" : hr}`} to={to} >{icon}{closeSideBar ? "" : <span className={linkSpans}>{text}</span>}</NavLink>
                            </ButtonBase>
                        </Tooltip> :
                            <ButtonBase
                                onClick={() => (!closeSideBar && matchMedia) && (closer(true))}
                                className={buttonBase} key={index} >
                                <NavLink className={({ isActive }) => `${links} ${isActive ? activedLink : ""} ${index === array.length - 1 ? "" : hr}`} to={to} >{icon}{closeSideBar ? "" : <span className={linkSpans}>{text}</span>}</NavLink>
                            </ButtonBase>
                    )
                }
            </div>
            <Menu open={Boolean(anchorMenu)} onClose={() => setAnchorMenu(null)} anchorEl={anchorMenu} >
                <MenuItem onClick={onSelectImage} style={{ fontFamily: "unset" }} >
                    <PersonRounded />
                    تنظیم عکس پروفایل</MenuItem>
                <MenuItem onClick={() => setOpenDialog(true)} style={{ fontFamily: "unset" }} >
                    <ExitToApp />
                    خروج از حساب کاربری
                </MenuItem>
            </Menu>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"آیا مایل به خروج از سامانه هستید ؟"}</DialogTitle>

                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary" autoFocus>
                        خیر
                    </Button>
                    <Button onClick={onExit} color="secondary">
                        بله
                    </Button>

                </DialogActions>
            </Dialog>
        </aside >)
}