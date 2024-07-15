import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",  
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const senderFunction = async () => {
        try {
            const res = await axios.post("http://localhost:8020/job/login", {
                email: values.email,
                password: values.password
            });
            return res.data;
        } catch (err) {
            setError(err.response.data);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        senderFunction().then((data) => {
            if (data && data.success) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                setError("");
                setValues({
                    email: "",
                    password: ""
                });
                window.location.reload();
            } else {
                setError(data.message);
                setValues({
                    email: "",
                    password: ""
                });
                setTimeout(() => {
                    setError("");
                }, 3000);
                navigate("/home");
            }
        });
    }

    const loginwithGoogle = () => {
        sessionStorage.clear();
        window.open("http://localhost:8020/job/auth/google/callback","_self")
    }

    return (
        <section>
            <div className="w-full h-screen font-sans bg-gradient-to-r from-neutral-800 to-stone-500">
                <div className="container flex items-center justify-center flex-1 h-full mx-auto">
                    <div className="w-full max-w-lg">
                        <div className="leading-snug">
                            <form onSubmit={handleSubmit} className="max-w-sm p-10 m-auto rounded shadow-xl bg-white/25">
                                <p className="mb-8 text-2xl font-light text-center text-slate-40">Login</p>
                                {error && <p className="text-red-500 text-center">{error}</p>}
                                <div className="mb-2">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            onChange={handleChange}
                                            placeholder="email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            onChange={handleChange}
                                            placeholder="password"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                    >
                                        SUBMIT
                                    </button>
                                </div>
                                
                                <div className="text-center">
                                    <a className="right-0 inline-block align-baseline text-xl hover:text-gray-800">
                                        Create an account <Link to="/signup"><span className="text-white font-bold ">  SIGNUP</span></Link>
                                    </a>
                                </div>
                            </form>
                                {/* <Link to ="/google"> */}
                            <div className="flex items-center justify-center p-2">
                                    <button className="justify-center items-center w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={loginwithGoogle}>
                                        CONNECT WITH GOOGLE
                                    </button>
                             </div>
                             {/* </Link> */}
                             <Link to="/phone">
                             <div className="flex items-center justify-center p-2">
                                    <button className="justify-center items-center w-full max-w-sm bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
                                        CONNECT WITH PHONE NUMBER
                                    </button>
                             </div></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
