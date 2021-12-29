import "./App.css";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Login from "./Views/Login/Login";
import SignUp from "./Views/Signup/SignUp";
import Home from "./Views/Home/Home";

function App() {
  const userStep = localStorage.getItem("step");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userStep) {
      setStep(4);
    } else {
      setStep(1);
    }
  }, [userStep]);

  const loginStepHandler = (val) => {
    setStep(val);
  };


  return (
    <div className='App'>
      <div className='w-full h-screen flex items-center'>
        <Grid container>
          <Grid item md={4} lg={4} xl={4} xs={0}></Grid>
          <Grid item md={4} lg={4} xl={4} xs={12}>
            {step === 3 ? (
              <SignUp userEmail={email} loginStepHandler={loginStepHandler} />
            ) : step === 4 ? (
              <Home loginStepHandler={loginStepHandler} />
            ) : (
              <Login
                userEmail={(val) => setEmail(val)}
                loginStepHandler={loginStepHandler}
                step={step}
              />
            )}
          </Grid>
          <Grid item md={4} lg={4} xl={4} xs={0}></Grid>
        </Grid>
      </div>
    </div>
  );
}

export default React.memo(App);
