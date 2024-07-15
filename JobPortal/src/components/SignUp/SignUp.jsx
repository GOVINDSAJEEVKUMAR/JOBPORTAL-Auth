import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true;

const SignUp = () => {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    })

    const  handleChange = (e) => {
        setValues((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }));


    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendData().then(()=>navigate("/"));
        setTimeout(() => {
            window.location.reload();
        }, 4000);
    }

    const sendData = async () => {
        const { name, email, password, phone } = values;
        const res = await axios.post("http://localhost:8020/job/", {
            name : name,
            email: email,
            password: password,
            phone: phone
        });
        return res.data;
        
    }

    
    

  return (
    <section>
        <div >    
<section className="h-screen bg-gray-100/50 py-8">
    <form onSubmit={handleSubmit} className="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <div className="p-4 border-t-2 border-indigo-400 rounded-lg bg-gray-100/5 ">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
                <div className="inline-flex items-center  space-x-4">
                    <h1 className=" text-2xl font-semibold text-gray-600">
                        Create a new account
                    </h1>
                </div>
            </div>
        </div>
        <div className="space-y-6 bg-white">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-1/3">
                    Account
                </h2>
                <div className="max-w-sm mx-auto md:w-2/3">
                    <div className=" relative ">
                        <input type="text" id="user-info-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="email" onChange={handleChange} placeholder="Email"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        Personal info
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                        <div>
                            <div className=" relative ">
                                <input type="text" id="user-info-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                                name="name"
                                onChange={handleChange}
                                placeholder="Name"/>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <input type="text" id="user-info-phone" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="phone" onChange={handleChange} placeholder="Phone number"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                            <h2 className="max-w-sm mx-auto md:w-4/12">
                                 Password
                            </h2>
                            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                                <div className=" relative ">
                                    <input type="password" id="password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" onChange={handleChange} placeholder="Passoword"/>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                                <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    <div>
                            
                        <div className="w-full px-4 pb-4 ml-0  text-gray-500 md:w-1/3 lg:w-full gap-3">
                        <h2 className='text-center text-xl'>Already have an account?
                            <Link to="/"> <span className='text-pink-600 text-xl'> LOGIN</span></Link>
                        </h2>
                        </div>
                    </div>
                    </form>
                </section>

        </div>
    </section>
  )
}

export default SignUp
