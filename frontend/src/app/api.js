const browserLegacyBackendUrl =
  process.env.NEXT_PUBLIC_LEGACY_BACKEND_URL || "http://77.37.45.141:5000";
const internalLegacyBackendUrl =
  process.env.INTERNAL_LEGACY_BACKEND_URL || browserLegacyBackendUrl;
const developmentLegacyBackendUrl =
  typeof window === "undefined"
    ? internalLegacyBackendUrl
    : browserLegacyBackendUrl;

export const url =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_LEGACY_BACKEND_URL || "https://api.icdrc.in"
    : developmentLegacyBackendUrl;

export const furl =
  process.env.NEXT_PUBLIC_FRONTEND_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://icdrc.in"
    : "http://77.37.45.141:3000");

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
