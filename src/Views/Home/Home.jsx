import React, { useEffect } from "react";
import { logoutApi } from "../../Api";
import Button from "../../Components/Common/Button";

function Home({ loginStepHandler }) {
  const userData = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userData);

  useEffect(() => {
    localStorage.setItem("step", 4);
  }, []);

  const logoutHandler = () => {
    logoutApi(userInfo._id, userInfo.token).then((res) => {
      localStorage.clear();
      loginStepHandler(1);
    });
  };

  return (
    <div className='border border-gray-600 rounded p-2 text-center '>
      <h2 className='my-4 font-bold text-4xl'>User Info</h2>
      <h4 className='mt-2'>Name: {userInfo?.firstName}</h4>
      <h4 className='mt-2'>Phone Number: {userInfo?.phoneNumber}</h4>
      <h4 className='mt-2 mb-4'>Phone Number: {userInfo?.email}</h4>
      <Button label={"LogOut"} onClick={logoutHandler} />
    </div>
  );
}

export default Home;
