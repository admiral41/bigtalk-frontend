import axios from "axios";
const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-type": "multipart/form-data"
    }
})
const config = {
    headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`,
    },
};
//creating login and register api
export const registerApi=(data)=> Api.post("/api/v1/register",data);
export const loginApi=(data)=> Api.post("/api/v1/login",data);
export const createPostApi=(formdata)=>Api.post("/api/v1/post/upload",formdata,config);

// forgot password
export const forgotPasswordApi = (data) =>Api.post("/api/v1/forgot/password", data);
export const resetPasswordApi = (data, token) =>Api.put(`/api/v1/password/reset/${token}`, data);

// search user by name
export const searchUserApi = (data) =>Api.post("/api/v1/search", data, config);