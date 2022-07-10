import classes from './App.module.css';
import User from "./Components/User/User.js";
import AdminLogin from "./Components/Admin/AdminLogin.js";
function App() {
  return (
    <div className={classes.container}>
      {/* <User />       */}
      <AdminLogin/>
    </div>
  );
}

export default App;
