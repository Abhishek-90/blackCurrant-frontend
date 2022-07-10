import classes from './App.module.css';
import User from "./Components/User/User.js";

function App() {
  return (
    <div className={classes.container}>
      <User />      
    </div>
  );
}

export default App;
