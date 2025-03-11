import React, {useEffect, useState} from "react";
import "./TodoList.css";
import {auth, db} from "../../firebase.js";
import {uid} from "uid";
import {set, ref, onValue, update} from "firebase/database"
import {useNavigate} from "react-router-dom";
import {Modal} from "../Modal/Modal";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const userRef = ref(db, `/${user.uid}`);
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const allTasks = Object.values(data);
                        setTasks(allTasks);
                    } else {
                        setTasks([]);
                    }
                });
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    function handleTextInputChange(e) {
        setNewTask(e.target.value);
    }

    function handleTitleInputChange(e) {
        setNewTitle(e.target.value);
    }

    function handleClick() {
        writeToDatabase();
        setModalActive(false);
    }

    const handleUpdate = (uid, completed) => {
        const boolen = completed
        update(ref(db, `/${auth.currentUser.uid}/${uid}`), {
            completed: !boolen,
        });
        console.log()
    }

    function writeToDatabase() {
        const uidd = uid();
        const currentUser = auth.currentUser;
        if (!currentUser) return; // Safety check

        set(ref(db, `/${currentUser.uid}/${uidd}`), {
            task: newTask,
            title: newTitle,
            completed: false,
            uidd,
        });

        setNewTask('');
        setNewTitle('');
    }

    return (
        <div className="todo">
            <div className="todo-add">
                <h1 className="todo-text">Today's Task</h1>
                <Modal active={modalActive} setActive={setModalActive}>
                    <h1>Create Task</h1>
                    <div className="input-container">
                        <p className="input-text">Text</p>
                        <input className="form-control" type="text" value={newTask} onChange={handleTextInputChange}
                               placeholder="Enter Text"/>
                    </div>
                    <div className="input-container">
                        <p className="input-text">Title</p>
                        <input className="form-control" type="text" value={newTitle} onChange={handleTitleInputChange}
                               placeholder="Enter Title"/>
                    </div>
                    <button className="todo-btn" onClick={handleClick}>
                        Create
                    </button>
                </Modal>
                <button className="todo-btn" onClick={() => setModalActive(true)}>
                    🞢 New Task
                </button>
            </div>
            <div className="todo-state">
                <div className="state active">
                    <p className="state-name">All</p>
                    <div className="state-count">{tasks.length}</div>
                </div>
                <div className="state-stick">|</div>
                <div className="state">
                    <p className="state-name">Open</p>
                    <div className="state-count">0</div>
                </div>
                <div className="state">
                    <p className="state-name">Closed</p>
                    <div className="state-count">0</div>
                </div>
                <div className="state">
                    <p className="state-name">Archived</p>
                    <div className="state-count">0</div>
                </div>
            </div>
            <div className="task">
                {tasks
                    .map((task, index) => (
                        <div
                            key={index}
                            className="task-item"
                        >
                            <div className="text-container">
                                <span className="text"
                                      style={{textDecoration: task.completed ? "line-through" : ""}}>{task.task}</span>
                                <span className="title">{task.title}</span>
                            </div>
                            <div className="checkbox-wrapper-18">
                                <div className="round">
                                    <input type="checkbox" id="checkbox-18"/>
                                    <label onClick={() => {
                                        handleUpdate(task.uidd, task.completed)
                                    }} className={task.completed ? "checkbox-label active" : "checkbox-label"}
                                           htmlFor="checkbox-18" style={{
                                        backgroundColor: task.completed ? "#0c5adf" : "",
                                        borderColor: task.completed ? "#0c5adf" : ""
                                    }}></label>
                                </div>
                            </div>
                        </div>
                    ))
                    .reverse()}
            </div>
        </div>
    );
}

export default TodoList;