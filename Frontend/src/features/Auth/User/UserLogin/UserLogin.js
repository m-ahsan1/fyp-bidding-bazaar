import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../../../redux/slices/userSlice";
import { setLoading } from "../../../../redux/slices/loadingSlice";

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

        if (!validateForm())
            return;

        try {
            dispatch(setLoading(true));
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userAuth) => {
                    // console.log("User logged in:", userAuth.user.email);
                    navigate(-1);
                    dispatch(setLoading(false));
                    toast.success("Login successful", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                })
                .catch((error) => {
                    toast.error(error.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    dispatch(setLoading(false));
                    // console.log(error);
                });
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            dispatch(setLoading(false));
            // console.log(error);
        }
    };

    const googleMethod = async () => {
        dispatch(setLoading(true));
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            // console.log(result);
            navigate(-1);
            dispatch(setLoading(false));
        }).catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            dispatch(setLoading(false));
            // console.log(error);
        });
    }

    const handelGoogleLogin = async () => {
        // console.log("Google login");
        try {
            await googleMethod().then(() => {
                if (user) {
                    navigate(-1);
                }
                else {
                    dispatch(logout());
                    auth.signOut();
                }
                // dispatch(setLoading(false));
            });

        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            // console.log(error);
            // dispatch(setLoading(false));
        } finally {
            // console.log("Google login finally");
        }
    }

    const handleForgotPassword = () => {
        if (!email) {
            toast.error("Email is required", {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
        dispatch(setLoading(true));
        sendPasswordResetEmail(auth, email).then(() => {
            toast.success("Password reset email sent", {
                position: toast.POSITION.TOP_CENTER,
            });
            dispatch(setLoading(false));
        }).catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            // console.log(error);
            dispatch(setLoading(false));
        });
    }
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
                    <button className="top-4 left-4 text-gray-600 hover:text-gray-800" onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
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
                            <div className="mt-4 text-grey-600">Forgot Password?
                                <span style={{ color: "blue", cursor: "pointer" }} onClick={handleForgotPassword}> Reset Password</span></div>

                            <div className="mt-4 text-grey-600">
                                Don't have an account?{" "}
                                <span>
                                    <Link to="/signup" style={{ color: "Blue" }}>
                                        Signup
                                    </Link>
                                </span>
                            </div>
                            <div className="flex items-center w-full my-4">
                                <hr className="w-full" />
                                <p className="px-3 ">OR</p>
                                <hr className="w-full" />
                            </div>
                            <div className="my-6 space-y-2">
                                <button
                                    aria-label="Login with Google"
                                    type="button"
                                    className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                                    onClick={handelGoogleLogin}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 32 32"
                                        className="w-5 h-5 fill-current"
                                    >
                                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                    </svg>
                                    <p>Login with Google</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
