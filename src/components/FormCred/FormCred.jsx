import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./FormCred.css";

const  FormCred = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className="form">
            <div className="mb-3">
            <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            </div>
            <div className="mb-3">
            <input className="form-control" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password"/>
            </div>
            <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={() => handleClick(email, pass)}>
                {title}
            </button>
            </div>
        </div>
    )
}

export {FormCred}