import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Form.css";

const  FormCred = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    console.log(email)
    console.log(pass)

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
        // <Form onClick={() => handleSubmit(email, pass)}>
        //     <Form.Group className="mb-3" controlId="formBasicEmail">
        //         <Form.Label>Email address</Form.Label>
        //         <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        //         <Form.Text className="text-muted">
        //             We'll never share your email with anyone else.
        //         </Form.Text>
        //     </Form.Group>
        //
        //     <Form.Group className="mb-3" controlId="formBasicPassword">
        //         <Form.Label>Password</Form.Label>
        //         <Form.Control type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
        //     </Form.Group>
        //     <Button variant="primary" type="submit">
        //         {title}
        //     </Button>
        // </Form>
    )
}

export {FormCred}