import { instanceApp, } from "./api";
export const api_news = () => instanceApp().get("news").then(({ data }) => data).catch(error => error)
export const api_tarp = () => instanceApp().get("tarp").then(({ data }) => data).catch(err => err)
export const api_notif = () => instanceApp().get("notif").then(({ data }) => data).catch(err => err)
export const api_farm_state = () => instanceApp().get("farm_state").then(({ data }) => data).catch(err => err)
export const setting_form = (formData) => instanceApp().post("setting_form", formData).then(({ data }) => data).catch(err => err)
export const report_form = (formData) => instanceApp().post("report_form", formData).then(({ data }) => data).catch(err => err)
export const send_ticket = (formData) => instanceApp().post("support", formData).then(({ data }) => data).catch(err => err)
