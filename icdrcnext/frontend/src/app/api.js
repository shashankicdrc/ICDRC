export const url = 'http://localhost:5000'
// export const url = 'https://www.backend.webdesys.com'



export const UserAuthAPI = {
   
    // userAccountOTPVerification_API:
    //   BASE_URL + "/api/v1/userAccountOTPVerification",
   
   
    // changeUserAccountStatus_API: BASE_URL + "/api/v1/changeUserAccountStatus",
  
    // userLogin_API: BASE_URL + "/api/v1/userLogin",
    userUpdatePassword_API: url + "/api/v1/userUpdatePassword",
    // userUpdateProfile_API: BASE_URL + "/api/v1/userUpdateProfile",
    // userGetMyProfile_API: BASE_URL + "/api/v1/userGetMyProfile",
    userSendOTP_API: url + "/api/v1/userSendOTP",
    userVerifyOTP_API: url + "/api/v1/userVerifyOTP",
  };