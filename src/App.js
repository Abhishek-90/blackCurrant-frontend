import classes from "./App.module.css";
import User from "./Components/User/User.js";
import AdminLogin from "./Components/Admin/AdminLogin.js";
import { Routes,Route, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <NavLink className={classes.link} to="/admin">Admin</NavLink>
      <NavLink className={classes.link} to="/user">User</NavLink>
      <div className={classes.container}>
        <Routes>
          <Route exact path="/admin" element={<AdminLogin />} />
          <Route exact path="/user" element={<User />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
