import axios from "axios";

const bodyParameters = {};

export const loginApi = (body) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/users/email`, body);

export const verifyEmailApi = (body) =>
  axios.put(`${process.env.REACT_APP_BASE_URL}/users/email/verify`, body);

export const signUpApi = (body) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/users`, body);

export const resendOtpApi = (body) =>
  axios.put(`${process.env.REACT_APP_BASE_URL}/users/token/resendtoken`, body);

export const referralCodeApi = (body) =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/users/referral/${body}`);

export const logoutApi = (userId, body) =>
  axios.delete(`${process.env.REACT_APP_BASE_URL}/users/logout/${userId}`, {
    headers: { Authorization: `Bearer ${userId},${body}` },
  });
