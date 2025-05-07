import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

const Otp = () => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmitOtp = () => {
    console.log('OTP Submitted:', otp);
    // Add OTP verification logic here
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
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleSubmitOtp}
          className="w-full rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default Otp;
