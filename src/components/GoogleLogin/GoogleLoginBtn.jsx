import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {setUser} from "../../store/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

const GoogleLoginBtn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const provider = new GoogleAuthProvider();

    const handleLogin = async () => {
        try {
            const auth = getAuth();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
            }));
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <button className="btn btn-primary" onClick={handleLogin}>
            Sign in with Google 🚀
        </button>
    );
};

export { GoogleLoginBtn };