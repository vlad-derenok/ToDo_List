import { getAuth, signInWithPopup, GithubAuthProvider  } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const GithubLoginBtn = () => {
    const navigate = useNavigate();
    const provider = new GithubAuthProvider();

    const handleLogin = async () => {
        try {
            const auth = getAuth();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <button className="btn btn-primary" onClick={handleLogin}>
            Sign in with GitHub 🛠️
        </button>
    );
};

export { GithubLoginBtn };