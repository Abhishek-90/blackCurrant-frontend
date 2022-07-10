import { useState } from "react";
import classes from "./User.module.css";

function validateEmail(emailAdress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

const User = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showAadhar, setShowAadhar] = useState(false);
  const [error, setError] = useState(false);
  const [aadhar, setAadhar] = useState("");

  function onStateChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function onClick() {
    let response = await fetch(
      "https://cosmic-dasik-baf319.netlify.app/.netlify/functions/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(credentials),
      }
    );

    const status = response.status;
    response = await response.json();
    
    if(status === 400) {
      setError(true)
      setShowAadhar(false);
    }

    if(status === 200) {
      setError(false)
      setShowAadhar(true);
      setAadhar(response.aadharNumber);
    }

    console.log(response);
  }

  return (
    <div className={classes.userContainer}>
      <h2>View Aadhar Details </h2>
      <h4>Login to View Aadhar Number</h4>
      <div className={classes.loginDiv}>
        <input
          className={classes.inputStyle}
          type="text"
          placeholder="Enter Email Id"
          value={credentials.email}
          name="email"
          onChange={onStateChange}
        />
        <input
          className={classes.inputStyle}
          type="password"
          placeholder="Enter Password"
          value={credentials.password}
          name="password"
          onChange={onStateChange}
        />
        <button
          disabled={
            credentials.password.length < 8 && !validateEmail(credentials.email)
          }
          className={classes.buttonStyle}
          onClick={onClick}
        >
          View Addhar Number
        </button>

        {error && <p className={classes.error}>Invalid Credentials</p>} 
        {showAadhar && <p className={classes.success}>Aadhar Number: {aadhar}</p>} 
      </div>
    </div>
  );
};

export default User;
