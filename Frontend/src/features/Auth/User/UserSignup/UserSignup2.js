import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth } from "../../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"
import { sendSignInLinkToEmail, updatePassword, signInWithEmailLink } from "firebase/auth";

export default function UserSign2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRegistration"));
  }, []);

  const handelPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handelNameChange = (e) => {
    setName(e.target.value);
  };

  const handelPhonenoChange = (e) => {
    setPhoneno(e.target.value);
  };

  const navigate = useNavigate();

  const handelPassword_confirmationChange = (e) => {
    setPassword_confirmation(e.target.value);
  };
  
  const handleSignInWithLink = async (e) => {
    e.preventDefault();
    if (!email || !password || !name || !phoneno || !password_confirmation) {
      toast.error('All feilds are required',{
          position: toast.POSITION.TOP_RIGHT,
        });
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters',{
          position: toast.POSITION.TOP_RIGHT,
        });
      return;
    }
    if (password !== password_confirmation) {
        toast.error('Password must match',{
            position: toast.POSITION.TOP_RIGHT,
          });
        return;
    }
    try {
      const result = await signInWithEmailLink(auth, email, window.location.href)
      .then( async () => {
        // Remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');
        let user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();
        navigate('/');
      });
    } catch (error) {
      toast.error(error.message,{
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
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
              <form onSubmit={handleSignInWithLink} className="flex flex-col">
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
                      onChange={handelNameChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                      value={email}
                      disabled
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                        onChange={handelPhonenoChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                      onChange={handelPasswordChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                      onChange={handelPassword_confirmationChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
