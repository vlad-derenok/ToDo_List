import { useState } from "react";

const Auth =  () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    return <div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
        <h1 className="mt-40 text-center text-xl">
            {isLogin ? 'Login' : 'notLogin'}
        </h1>

        <form className="flex w-1/3 flex-col mx-auto gap-5">
            <input type="text" className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

            <button className="btn btn-green mx-auto">Submit</button>
        </form>
    </div>
}

export default Auth