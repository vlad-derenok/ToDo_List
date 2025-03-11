import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
    };

    return (
        <div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
            <h1 className="mt-40 text-center text-xl">
                {isLogin ? 'Login' : 'Not Logged In'}
            </h1>

            <form onSubmit={handleSubmit} className="flex w-1/3 flex-col mx-auto gap-5">
                <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="btn btn-green mx-auto">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Auth;