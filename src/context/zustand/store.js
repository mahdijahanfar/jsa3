import { create } from "zustand";
import { fixNumbers } from "./../../utils/fixArabicNums"

export const useUserStore = create(set => (
    {
        name: null,
        prof: null,
        image: null,
        setThisUser: (dest) => set(() => { return (dest) }),
        closer: () => set(() => ({ open: false, dest: null }))
    }
))
export const useModalStore = create(set => (
    {
        open: false,
        dest: null,
        opener: (dest) => set(() => { return ({ open: true, dest }) }),
        closer: () => set(() => ({ open: false, dest: null }))
    }
))
export const useDialogStore = create(set => (
    {
        open: false,
        index: 0,
        opener: (index, boolean) => set(() => ({ open: boolean, index })),
    }
))
export const useDrawerStore = create(set => ({
    close: false,
    closer: (boolean) => set(() => ({ close: boolean })),
}))
export const useShowMessageErr = create(set => ({
    show: true,
    shower: (boolean) => set(() => ({ show: boolean })),
}))
export const useSnackStore = create(set => ({
    message: "",
    open: false,
    transition: undefined,
    alert: undefined,
    setSnack: (obj) => set(() =>
        ({ ...obj })
    ),
}))
export const settingForm = create(set => ({
    smart_irrigation_method: "",
    central_hardware_serial: "",
    product_label_password: "",
    setFormValue: (obj) => set(() => ({ ...obj }))
}))

export const reportForm = create(set => {
    const unfixedNow = (new Date().toLocaleDateString("fa-IR").split("/"));
    const now = unfixedNow.map((param) => fixNumbers(param))
    return ({
        report_type: null,
        startYear: now[0],
        startMonth: now[1],
        startDay: now[2],
        finishYear: now[0],
        finishMonth: now[1],
        finishDay: now[2],
        setFormValue: (obj) => set(() => ({ ...obj }))
    })
})

export const supportsData = create(set => ({
    subject: "",
    title: "",
    text: "",
    fallowNum: "",
    tab: 0,
    setFormValue: (obj) => set(() => ({ ...obj }))
}))