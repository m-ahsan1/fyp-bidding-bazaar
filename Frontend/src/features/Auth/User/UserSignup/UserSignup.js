import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth } from "../../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"
import { sendSignInLinkToEmail, updatePassword, signInWithEmailLink } from "firebase/auth";

export default function UserSign() {
  const [email, setEmail] = useState("" || localStorage.getItem('emailForRegistration'));

  const handelEmailChange = (e) => {
    window.localStorage.setItem('emailForRegistration', e.target.value);
    setEmail(e.target.value);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
      if (user.getIdToken(true)) {
        navigate("/");
      }
    }
    });
    return unsubscribe;
  }, [ navigate]);
  
  const handelInputDeny = (e) => {
    e.preventDefault();
    toast.error("You can only change email", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleSubmit = async (e) => {
    if (!email) {
      console.log(email);
      toast.error("Email is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/user-signup2",
      handleCodeInApp: true,
    };
    try{
      await sendSignInLinkToEmail(auth, email, config);
      toast.success(
        `Link is sent to ${email}. Click the link to complete registration`, {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      // Save the user email in the local storage for future useage
      window.localStorage.setItem("emailForRegistration", email);
      // clear the email state now
      setEmail("");
    }catch(err){
      console.log(err);
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div
      className="min-h-screen min-w-screen-md flex items-center justify-center"
      style={{ backgroundImage: 'url("/images/login-signup-page-car-image.jpg")', backgroundSize: 'cover' }}
    >
      <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white overflow-y-auto p-4 w-full max-w-md mx-auto rounded-lg shadow-md sm:p-10 flex flex-col h-full ">

        <div className="flex flex-col items-center pt-6 sm:justify-center sm:pt-0 flex-grow">
            <div>
              <a href="/">
                <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
              </a>
            </div>
            <div className="w-full mt-6">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mt-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="name"
                      onClick={handelInputDeny}
                      readOnly
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
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
                      onChange={handelEmailChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="phoneno"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Phone Number
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="phoneno"
                      name="phoneno"
                      onClick={handelInputDeny}
                      readOnly
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                      onClick={handelInputDeny}
                      readOnly
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="password_confirmation"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Confirm Password
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="password"
                      name="password_confirmation"
                      onClick={handelInputDeny}
                      readOnly
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                  >
                    Register
                  </button>
                </div>
              </form>
              <div className="mt-4 text-grey-600">
                Already have an account?{" "}
                <span>
                <Link to="/user-login" style={{ color: "Blue" }}>
                Login
              </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
