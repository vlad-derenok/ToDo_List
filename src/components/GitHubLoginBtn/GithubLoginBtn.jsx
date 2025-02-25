import { getAuth, signInWithPopup, GithubAuthProvider  } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

const GithubLoginBtn = () => {
    const provider = new GithubAuthProvider();
    const push = useNavigate();
    const handleLogin = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user)
                // dispatch(setUser({
                //     email: user.email,
                //     id: user.uid,
                //     token: user.accessToken,
                // }));
                push('/')
            }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }
    return (
        <button className="btn btn-primary" onClick={() => handleLogin()}>Sign in with GitHub 🛠️ </button>
    )
}

export {GithubLoginBtn}