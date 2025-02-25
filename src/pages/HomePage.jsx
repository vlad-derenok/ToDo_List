import {Navigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {useAuth} from "../hooks/use-auth";
import TodoList from "../components/TodoList/TodoList";
import {removeUser} from "../store/slices/userSlice";
import "./HomePage.css";

const HomePage = () => {
    const dispatch = useDispatch();
    const { isAuth } = useAuth();
    return isAuth ? (
        <div className="home-page">
            <TodoList/>
            <div className="btn-container">
                <button className="home-btn" onClick={() => dispatch(removeUser())}>Log out</button>
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace/>
    )
}

export default HomePage;