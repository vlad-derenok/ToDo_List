import { Link } from 'react-router-dom';
import {SignUp} from "../components/SignUp/SignUp";
import "./RegisterPage.css";

const RegisterPage = () => {
    return (
        <div className="register-page">
            <div className="register-text">
                <h1>Register</h1>
            </div>
            <SignUp />
            <p>
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </div>
    )
}

export default RegisterPage