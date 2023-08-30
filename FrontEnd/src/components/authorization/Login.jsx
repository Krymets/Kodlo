import LoginContent from "./LoginContent";
import SignUpInvitation from "./SignUpInvitation";
import classes from "./Login.module.css"

const Login = (props) => {
  return <div className={classes.login}>
    <LoginContent setErrorMessage={props.setErrorMessage} />
    <SignUpInvitation />
  </div>;
};

export default Login;
