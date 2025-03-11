import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {FormCred} from "../FormCred/FormCred";
import {setUser} from "../../store/slices/userSlice";

const SignUp = () => {
    const dispatch = useDispatch();
    const push = useNavigate();

    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                push('/');
            })
            .catch(console.error)
    }

    return (
        <FormCred
            title="Register"
            handleClick={handleRegister}
        />
    )
}

export {SignUp}