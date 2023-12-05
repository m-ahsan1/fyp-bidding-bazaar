import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth } from "../../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { createUser, selectUser, login } from "../../../../redux/slices/userSlice";

export default function UserSign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const user = useSelector(selectUser)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "name") {
      setName(value);
    }
    if (name === "phoneno") {
      setPhoneno(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "password_confirmation") {
      setPassword_confirmation(value);
    }
  };


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name || !phoneno || !password_confirmation) {
      console.log(email, password, name, phoneno, password_confirmation);
      toast.error("All feilds are required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (password !== password_confirmation) {
      toast.error("Password must match", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
          updateProfile(userAuth.user, {
            displayName: name,
          }).then(async () => {
            const idToken = await userAuth.user.getIdToken(true);
            dispatch(
              login({
                email: userAuth.user.email,
                displayName: userAuth.user.displayName,
                phoneno: phoneno,
                idToken: idToken,
              })
            )
            dispatch(
              createUser({
                email: userAuth.user.email,
                displayName: userAuth.user.displayName,
                phoneno: phoneno,
              })
            )
            navigate("/");
          }).catch((error) => {
            toast.error(error.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            console.log(error);
          })
        }).catch((error) => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(error);
        })
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    }
  };

  const handelGoogleLogin = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider).then(async (result) => {
        console.log(result)
      const idToken = await result.user.getIdToken(true);
      dispatch(
        login({
          email: result.user.email,
          displayName: result.user.displayName,
          photoUrl: result.user.photoURL,
          idToken: idToken,
        })
      )
      dispatch(
        createUser({
          email: result.user.email,
          displayName: result.user.displayName,
          photoUrl: result.user.photoURL,
        })
      );
        navigate("/");
      }).catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
      });
      
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    }
  }

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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                  <p>Signup with Google</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
