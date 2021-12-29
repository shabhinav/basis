import React, { useState } from "react";
import Input from "../../Components/Common/Input";
import Button from "../../Components/Common/Button";
import { referralCodeApi, signUpApi } from "../../Api";
import ErrorSnackBar from "../../Components/Common/snackBar";

function SignUp({ userEmail, loginStepHandler }) {
  const token = localStorage.getItem("Token");
  const [firstName, setFirstName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signUpHandler = () => {
    referralCodeApi(referralCode)
      .then((res) => {
        return res;
      })
      .then((res) => {
        signUpApi({
          firstName: firstName,
          email: userEmail,
          referredCodeKey: referralCode,
          agreeToPrivacyPolicy: true,
          token: token,
          source: "WEB_APP",
        }).then((res) => {
          localStorage.setItem(
            "userInfo",
            JSON.stringify(res.data.results.user)
          );
          loginStepHandler(4);
        });
      })
      .catch((err) => {
        let validationCondition = /^[A-Za-z ]+$/;
        let isValid = validationCondition.test(firstName);
        if (firstName.length < 3 || !isValid) {
          setOpen(true);
          setErrorMessage("Please enter Correct Name");
        } else {
          setErrorMessage("Invalid Refferal Code");
        }
      });
  };

  return (
    <div className='border border-gray-600 rounded p-2'>
      <h1 className='text-center text-5xl'>Sign Up</h1>
      <div className='mt-10 text-center'>
        <Input
          type={"text"}
          label='FirstName'
          onChangeHandler={(val) => setFirstName(val)}
        />
        <div className='my-5 '>
          <Input
            type={"email"}
            label='Email'
            value={userEmail}
            // onChangeHandler={(val) => setEmail(val)}
          />
        </div>
        <Input
          type={"text"}
          label='Referral Code'
          onChangeHandler={(val) => setReferralCode(val)}
        />
        <div className='mt-4'>
          <Button label={"Sign Up"} onClick={signUpHandler} />
        </div>
      </div>
      <ErrorSnackBar
        message={errorMessage}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </div>
  );
}

export default SignUp;
