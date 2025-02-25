import React, {useEffect, useState} from "react";
import "./TodoList.css";
import {auth, db} from "../../firebase.js";
import {uid} from "uid";
import {set, ref, onValue, remove, update} from "firebase/database"
import {useNavigate} from "react-router-dom";
import {Modal} from "../Modal/Modal";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState();
    const [newTitle, setNewTitle] = useState();
    const [modalActive, setModalActive] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
                    setTasks([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((tasks) => setTasks((oldArray) => [...oldArray, tasks]));
                    }
                })
            } else if (!user) {
                navigate("/login")
            }
        })
    }, [navigate])

    function handleTextInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleTitleInputChange(event) {
        setNewTitle(event.target.value);
    }

    function handleClick() {
        writeToDatabase()
        setModalActive(false)
    }

    const writeToDatabase = () => {
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            task: newTask,
            title: newTitle,
            completed: false,
            uidd: uidd
        });

        setNewTask("")
        setNewTitle("")
    }

    // const handleDelete = (uid) => {
    //     remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
    // }

    const handleUpdate = (uid, completed) => {
        const boolen = completed
        update(ref(db, `/${auth.currentUser.uid}/${uid}`), {
            completed: !boolen,
        });
        console.log()
    }

    // function addTask() {
    //     const newTasks = [...tasks, {title: newTask, completed: false}];
    //     setTasks(newTasks);
    //     setNewTask("");
    // }
    //
    // function completeTask(index) {
    //     const newTasks = [...tasks];
    //     newTasks[index].completed = !newTasks[index].completed;
    //     setTasks(newTasks);
    // }
    //
    // function deleteTask(index) {
    //     const updatedTask = tasks.filter((element, i) => i !== index);
    //     setTasks(updatedTask);
    // }

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
                    <div className="state-count">14</div>
                </div>
                <div className="state">
                    <p className="state-name">Closed</p>
                    <div className="state-count">19</div>
                </div>
                <div className="state">
                    <p className="state-name">Archived</p>
                    <div className="state-count">2</div>
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
                            {/*<button className="btn btn-primary sm" onClick={() => completeTask(index)}>Complete</button>*/}
                            {/*<button*/}
                            {/*    className="btn btn-primary size-sm"*/}
                            {/*    onClick={() => handleDelete(task.uidd)}*/}
                            {/*>*/}
                            {/*    Delete*/}
                            {/*</button>*/}
                        </div>
                    ))
                    .reverse()}
            </div>
        </div>
    );
}

export default TodoList;
