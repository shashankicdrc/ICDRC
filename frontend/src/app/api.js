export const url =
  process.env.NODE_ENV === "production"
    ? "https://api.icdrc.in"
    : "http://localhost:5000";

export const furl =
  process.env.NODE_ENV === "production"
    ? "https://icdrc.in"
    : "http://localhost:3000";

export const UserAuthAPI = {
  // userLogin_API: BASE_URL + "/api/v1/userLogin",
  userUpdatePassword_API: url + "/api/v1/userUpdatePassword",
  // userUpdateProfile_API: BASE_URL + "/api/v1/userUpdateProfile",
  // userGetMyProfile_API: BASE_URL + "/api/v1/userGetMyProfile",
  userSendOTP_API: url + "/api/v1/userSendOTP",
  userVerifyOTP_API: url + "/api/v1/userVerifyOTP",
};
export const Phonepayment_API = {
  NewPayment_API: url + "/api/v1/paytm",
  Status_API: url + "/api/v1/status",
};
