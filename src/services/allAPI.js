import base_URL from "./basrURL"
import commonAPI from "./commonAPI"

// register
export const registerApi =async(reqBody)=>{
    return await commonAPI('POST',`${base_URL}/auth/register`,reqBody)
}