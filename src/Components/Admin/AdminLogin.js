import { useState } from "react";
import classes from "./AdminLogin.module.css";

function validateEmail(emailAdress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

const AdminLogin = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [aadharCredentials, setAadharCredentials] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    address: "",
    number: "",
  });

  const [adminIn, setAdminIn] = useState(false);

  function onAdminStateChange(e) {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  }

  function onAadharStateChange(e) {
    setAadharCredentials({
      ...aadharCredentials,
      [e.target.name]: e.target.value,
    });
  }

  async function onAdminLoginClick() {
    let response = await fetch(
      "https://cosmic-dasik-baf319.netlify.app/.netlify/functions/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userId: loginCredentials.email,
          password: loginCredentials.password,
        }),
      }
    );
    const status = response.status;
    response = await response.json();
    if (status === 200) {
      setAdminIn(true);
      window.alert('Admin Login Successful');
    }
    console.log(response);
  }

  async function onAadharCreateClick() {
    let response = await fetch(
      "https://cosmic-dasik-baf319.netlify.app/.netlify/functions/api/admin/addAddhar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: aadharCredentials.email,
          password: aadharCredentials.password,
          firstName: aadharCredentials.fname,
          lastName: aadharCredentials.lname,
          homeAddress: aadharCredentials.address,
          phoneNumber: aadharCredentials.number,
        }),
      }
    );
    const status = response.status;
    response = await response.json();
    if (status === 200) {
      setAdminIn(true);
    }
    console.log(response);
  }

  return (
    <div className={classes.container}>
      <div className={classes.adminContainer}>
        <h2>Admin Login Page </h2>
        <h4>Login to Create New Aadhar</h4>
        <div className={classes.loginDiv}>
          <input
            className={classes.inputStyle}
            type="text"
            placeholder="Enter Email Id"
            value={loginCredentials.email}
            name="email"
            onChange={onAdminStateChange}
          />
          <input
            className={classes.inputStyle}
            type="password"
            placeholder="Enter Password"
            value={loginCredentials.password}
            name="password"
            onChange={onAdminStateChange}
          />
          <button
            disabled={
              loginCredentials.password.length < 8 &&
              !validateEmail(loginCredentials.email)
            }
            className={classes.buttonStyle}
            onClick={onAdminLoginClick}
          >
            Admin Login
          </button>
        </div>
      </div>

      {adminIn && (
        <div className={classes.aadharDetail}>
          <h2>Enter Aadhar Details</h2>
          <input
            className={classes.inputStyle}
            type="password"
            placeholder="Enter First Name"
            value={aadharCredentials.fname}
            name="fname"
            onChange={onAadharStateChange}
          />
          <input
            className={classes.inputStyle}
            type="text"
            placeholder="Enter Last Name"
            value={aadharCredentials.lname}
            name="lname"
            onChange={onAadharStateChange}
          />
          <input
            className={classes.inputStyle}
            type="text"
            placeholder="Enter Email Id"
            value={aadharCredentials.email}
            name="email"
            onChange={onAadharStateChange}
          />
          <input
            className={classes.inputStyle}
            type="password"
            placeholder="Enter Password"
            value={aadharCredentials.password}
            name="password"
            onChange={onAadharStateChange}
          />
          <input
            className={classes.inputStyle}
            type="text"
            placeholder="Enter Phone Nummber"
            value={aadharCredentials.number}
            name="number"
            onChange={onAadharStateChange}
          />
          <input
            className={classes.inputStyle}
            type="password"
            placeholder="Enter Address"
            value={aadharCredentials.address}
            name="address"
            onChange={onAadharStateChange}
          />
          <button
            disabled={
              aadharCredentials.password.length < 8 &&
              !validateEmail(aadharCredentials.email) &&
              aadharCredentials.number.length !== 10 &&
              aadharCredentials.fname.length < 3 &&
              aadharCredentials.lname.length < 3 &&
              aadharCredentials.address.length < 10
            }
            className={classes.buttonStyle}
            onClick={onAadharCreateClick}
          >
            Create Aadhar
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
