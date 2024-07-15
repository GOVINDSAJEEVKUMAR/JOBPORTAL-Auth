import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Phone = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');



  const handleSendOtp = async () => {
    console.log(phone);  
    try {
      const response = await fetch('http://localhost:8020/job/mobilelogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert('OTP sent successfully');
      } else {
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      alert('An error occurred while sending OTP');
    }
  };
  
  

  const verifyOtp = async () => {
    console.log("OTP:", otp);
    console.log("Phone:", phone);

    try {
      const response = await fetch('http://localhost:8020/job/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (data.success) {
        alert('OTP verified successfully');
        navigate('/home');
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred while verifying OTP');
    }
};


  return (
    <div>
      <div className='w-[30rem] h-auto flex flex-col items-center justify-center p-10 m-5 bg-slate-300 flex-1 mx-auto'>
        <h1 className='text-2xl text-black'>Phone</h1>
        <hr />
        <div className='flex flex-col gap-4 p-5 m-5 items-center justify-center'>
          <input
            required
            className='p-2 m-2 w-auto rounded-lg'
            type='text'
            placeholder='Enter your phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            className='bg-black text-white rounded-xl w-[10rem] h-10'
            onClick={handleSendOtp}
          >
            Verify
          </button>
          <input
            className='p-2 m-2 rounded-lg'
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className='bg-black text-white rounded-xl w-[10rem] h-10'
            onClick={verifyOtp}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Phone;
