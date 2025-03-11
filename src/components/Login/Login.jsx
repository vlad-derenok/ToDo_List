import {FormCred} from "../FormCred/FormCred";
import {useDispatch} from "react-redux";
import  {setUser} from "../../store/slices/userSlice"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const push = useNavigate();
    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user)
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                push('/')
            })
            .catch(() => alert('Invalid user!'))
    }
    return (<>
        <FormCred title="Sign in"
        handleClick={handleLogin}/>
        </>
    )
}

export {Login}