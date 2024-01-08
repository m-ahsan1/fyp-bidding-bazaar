import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../../../redux/slices/userSlice";

export default function UserLogin() {
    // Declare state variables for email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // Function to validate form
    const validateForm = () => {
        // Email format validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address", {
                position: toast.POSITION.TOP_CENTER,
            });
            return false;
        }
    
        if (!password) {
            toast.error("Password is required", {
                position: toast.POSITION.TOP_CENTER,
            });
            return false;
        }
    
        return true;
    };
    
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Both email and password are required", {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }

        if(!validateForm())
            return;

        try {
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userAuth) => {
                    console.log("User logged in:", userAuth.user.email);
                    navigate('/adminhome', { replace: true });
                })
                .catch((error) => {
                    toast.error(error.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    console.log(error);
                });
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            console.log(error);
        }
    };

    return (
        <div
            className="min-h-screen min-w-screen-md flex items-center justify-center"
            style={{
                backgroundImage: 'url("/images/login-signup-page-car-image.jpg")',
                backgroundSize: "cover",
            }}
        >
            <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white overflow-y-auto p-4 w-full max-w-md mx-auto rounded-lg shadow-md sm:p-10 flex flex-col h-full ">
                    <div className="flex flex-col items-center pt-4 sm:justify-center sm:pt-0 flex-grow">
                        <div>
                            <Link to="/">
                                <img
                                    src="/images/logo.png"
                                    className="w-100 h-35"
                                />
                            </Link>
                        </div>
                        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mt-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 undefined"
                                    >
                                        Email
                                    </label>
                                    <div className="flex flex-col items-start">
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            placeholder="Enter your email"
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 undefined"
                                    >
                                        Password
                                    </label>
                                    <div className="flex flex-col items-start">
                                        <input
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center mt-4">
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>

                         
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
