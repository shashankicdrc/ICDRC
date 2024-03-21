export const url = "https://api.icdrc.in";
// export const url = "http://localhost:5000";

// export const furl = 'http://localhost:3000'
export const furl = "https://icdrc.in";

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
