import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { otpApi } from '../../services/allAPI';
import { showToast } from '../../reusable/Toast';
import { Spinner } from 'react-bootstrap';



const Otp = () => {

    const navigate = useNavigate()

  const location = useLocation(); // to access passed state
  const emailFromState = location.state?.email || ''; // Access passed email
  console.log("email",emailFromState);
  
  
  // state to hold otp
  const [otp, setOtp] = useState('');
   
  // state to hold error messages
  const [error, setError] = useState("");

  // state for spinner
  const [isLoading,setIsLoading]=useState(false)

  const handleOtpChange = (value) => {
    // Validate that only numbers are entered
    if (!/^\d*$/.test(value)) {
      setError("OTP must contain only numbers.");
      return;
    }

    // Set OTP value if valid
    setOtp(value);

    // Check length validation
    if (value.length === 6) {
      setError(""); // Clear error if OTP is valid
    } else {
      setError("OTP must be 6 digits.");
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault(); // Corrected function call
    console.log("otp",otp)
  
    // Validate OTP before making API call
    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

      // Check if OTP contains only numbers and has 6 digits
     else if (!/^\d{6}$/.test(otp)) {
     setError("OTP must be 6 digits and contain only numbers.");
     return;
    }else{

  setIsLoading(true)
  const data = { email: emailFromState, otp }
  console.log(data);
  

  try {
    const result = await otpApi(data);
    console.log("Entered OTP is", result);

    if (result.status === 200) {

      showToast(`${result.data.message}`, "success", {
        position: "top-right",
        autoClose: 3000,
      });
      
      navigate('/')
      
      
     
    } else {
      showToast(`${result.response.data.message}`, "error", {
                  position: "top-right",
                  autoClose: 3000,
                });
    }
  } catch (error) {
    const errorMessage =
             error.response?.data?.message ||
             error.message ||
             "Something went wrong!";
   
           showToast(errorMessage, "error", {
             position: "top-right",
             autoClose: 3000,
           });
  }
  setIsLoading(false)

}

    
    
    
    
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto mt-12">
      <h2 className="text-center text-2xl font-bold text-gray-900">Enter OTP</h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Please enter the OTP sent to your email.
      </p>

      <div className="mt-8 text-center">
      <OtpInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "50px", // Increase the width here
                height: "50px", // Optional: Adjust the height
                fontSize: "1.2rem", // Optional: Adjust font size
                textAlign: "center", // Center align text
                margin: "0 5px", // Add space between inputs
                border: "1px solid #ccc", // Optional: Add border styling
                borderRadius: "4px", // Optional: Add rounded corners
              }}
            />
          )}
        />

{error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleOtp}
          className="w-full rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
           {isLoading ? (
                  <>
                    <Spinner
                      animation="border"
                      role="status"
                      size="sm"
                      className="me-2"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    Verifying...
                  </>
                ) :" Submit "
                }       
                 </button>
      </div>
    </div>
  );
};

export default Otp;
