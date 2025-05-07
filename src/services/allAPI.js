import base_URL from "./basrURL"
import commonAPI from "./commonAPI"

// register
export const registerApi =async(reqBody)=>{
    return await commonAPI('POST',`${base_URL}/auth/register`,reqBody)
}

// verify otp
export const otpApi =async(reqBody)=>{
    return await commonAPI('POST',`${base_URL}/auth/verifyOtp`,reqBody)
}

// login
export const loginApi =async(reqBody)=>{
    return await commonAPI('POST',`${base_URL}/auth/login`,reqBody)
}