import {Login} from "../components/Login/Login";
import {GoogleLoginBtn} from "../components/GoogleLogin/GoogleLoginBtn";
import {Link} from "react-router-dom";
import {GithubLoginBtn} from "../components/GitHubLoginBtn/GithubLoginBtn";
import "./LoginPage.css";

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-text">
            <h1>Login</h1>
            </div>
            <Login/>
            <p>
                Or <Link to="/register">register</Link>
            </p>
            <div className="btns">
                <div className="google">
            <GoogleLoginBtn/>
                </div>
                <div className="github">
            <GithubLoginBtn/>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;