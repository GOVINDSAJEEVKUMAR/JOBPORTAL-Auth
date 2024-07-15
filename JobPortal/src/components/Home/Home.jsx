import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token:", token); // Debug log
                if (token) {
                    const res = await axios.get("http://localhost:8020/job/verify", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log("User data:", res.data); 
                    setUser(res.data);
                } else {
                    setUser({ name: "Unknown" });
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
                setUser({ name: "Unknown" });
            }
        };

        fetchUser();
    }, [navigate]);

    const responseFunction = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token for logout:", token); // Debug log
            const res = await axios.post("http://localhost:8020/job/logout", null, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            if (res.status === 200) {
                console.log("Logout response:", res.data); // Debug log
                return res.data;
            }
        } catch (error) {
            console.error("Something went wrong during logout", error);
            return new Error("Something went wrong");
        }
    };

    const logout = () => {
        responseFunction().then(() => {
            localStorage.removeItem('token');
            navigate('/'); // Navigate to login page
        });
    };

    return (
        <section>
            <div className="bg-white/25">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Welcome to </span>
                            <span className="block text-indigo-600 xl:inline"> JobPortal </span>
                        </h2>
                        <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:text-3xl">
                            Your one stop portal for all your job seeking needs.
                        </p>
                        <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:text-3xl">
                            {user ? `Hello, ${user.name}` : "Loading..."}
                        </p>
                        <button onClick={logout} className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-5'>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
