import React, { useState } from "react";
import axios from 'axios'
import { backendUrl } from "../App";
import { toast } from "react-toastify";


const Login = ({setToken}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            }    
            else{
                toast.error(response.data.message)
            }   

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black via-gray-600 to-white">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Panel</h2>
                <form onSubmit={onSubmitHandler} className="space-y-8">
                    <div>
                        <label className="block text-white mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded-md bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded-md bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-[70%]  py-2 mt-6 cursor-pointer bg-white text-black font-semibold rounded-xl shadow-md hover:bg-purple-200 transition duration-300"
                        >
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
