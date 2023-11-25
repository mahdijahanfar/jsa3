import Axios from 'axios'
export const instanceLogin = () => {
    return Axios.create({
        baseURL: "https://node-mysql-deploy.onrender.com/",
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
export const instanceApp = () => {
    return Axios.create({
        baseURL: "https://node-mysql-deploy.onrender.com/",
        headers: {
            'x-auth-token': localStorage.getItem("x-auth-token")
        }
    });
};

