import { instanceApp, instanceLogin } from "./api";

export const api_login = (user) => {
  return (instanceLogin().post("login", user)
    .then(({ data }) => {
      return data
    }).catch(error => {
      return error
    }))
};

export const api_reg = async (user) => {
  try {
    const { data } = await instanceLogin().post("register", user)
    return data
  } catch (error) {
    return error
  }
}
export const uploadUserPhoto = (photo, callback) => {
  instanceApp().post("uploadUserPhoto", photo)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
      callback(false, error.response.data.message);
    })
};
export const getProfileRequest = (callback) => {
  instanceApp().post("getProfile")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
      callback(false, error.response.data.message);
    })
};


