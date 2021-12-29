import React, { useState } from "react";
import Input from "../../Components/Common/Input";
import Button from "../../Components/Common/Button";
import { loginApi, resendOtpApi, verifyEmailApi } from "../../Api";
import ErrorSnackBar from "../../Components/Common/snackBar";

function Login({ loginStepHandler, step, userEmail }) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const loginHandler = () => {
    loginApi({ email: email })
      .then((res) => {
        localStorage.setItem("Token", res.data.results.token);
        setToken(res.data.results.token);
        loginStepHandler(2);
      })
      .catch((err) => {
        setErrorMessage("Please Enter Valid EmailId");
        setOpen(true);
        loginStepHandler(1);
      });
  };

  const emailVerificationHandler = () => {
    verifyEmailApi({
      email: email,
      token: token,
      verificationCode: verificationCode,
    })
      .then((res) => {
        if (!res.data.results.isLogin) {
          loginStepHandler(3);
          userEmail(email);
          localStorage.setItem("Email", email);
        } else {
          localStorage.setItem(
            "userInfo",
            JSON.stringify(res.data.results.user)
          );
          loginStepHandler(4);
        }
      })
      .catch((err) => {
        setErrorMessage("Please Enter EmailId or Verification Code");
        setOpen(true);
      });
  };

  const resendOtpHandler = () => {
    resendOtpApi({
      email: email,
      token: token.toString(),
    })
      .then((res) => {
        if (!res.data.results) {
          setErrorMessage(
            "Resend limit reached. There might be issues with the network. Please try again later."
          );
          loginStepHandler(1);
        }
      })
      .catch((error) => {
        setErrorMessage("Something Went Wrong");
        setOpen(true);
      });
  };

  return (
    <div className='border border-gray-600 rounded p-2'>
      <h1 className='text-center text-5xl'>Login</h1>
      <div className='mt-10 text-center'>
        <Input
          type={"email"}
          label='Email'
          onChangeHandler={(val) => setEmail(val)}
        />
        {step === 2 ? (
          <div className='mt-4'>
            <Input
              type={"Number"}
              label='Verification Code'
              onChangeHandler={(val) => setVerificationCode(val)}
            />
          </div>
        ) : (
          ""
        )}
        <div className='mt-10 flex justify-center'>
          <div className='mr-2'>
            <Button
              label={step === 2 ? "Verify" : "Login"}
              onClick={step === 2 ? emailVerificationHandler : loginHandler}
            />
          </div>
          {step === 2 ? (
            <Button label={"Resend OTP"} onClick={resendOtpHandler} />
          ) : (
            ""
          )}
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

export default React.memo(Login);
