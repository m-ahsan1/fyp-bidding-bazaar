import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth } from "../../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { createUser, selectUser } from "../../../../redux/slices/userSlice";

export default function UserSign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [image, setImage] = useState(null);
  const user = useSelector(selectUser)

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setImage(e.target.files[0]);
    }
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
      navigate('/', { replace: true })
    }
  }, [user, navigate]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const emailValidate = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      return true;
    }
    else {
      toast.error("Email is not valid", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
  }

  const passwordValidate = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (re.test(password)) {
      return true;
    }
    else {
      toast.error("Password must contain at least 8 characters, one uppercase, and one number", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
  }

  const phonenoValidate = (phoneno) => {
    const re = /^\d{11}$/;
    if (re.test(phoneno)) {
      return true;
    }
    else {
      toast.error("Phone Number must be 11 digits", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name || !phoneno || !password_confirmation || !image) {
      console.log(email, password, name, phoneno, password_confirmation);
      toast.error("All feilds are required", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (!emailValidate(email) || !passwordValidate(password) || !phonenoValidate(phoneno)) {
      return;
    }
    if (password !== password_confirmation) {
      toast.error("Passwords must match", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      const userAuth = await createUserWithEmailAndPassword(auth, email, password);
      let imagetemp = null;
      if (image) {
        if (image.size > 1000000) {
          toast.error("Image size must be less than 1MB", {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
        imagetemp = await convertToBase64(image);
      }
      dispatch(
        createUser({
          email: userAuth.user.email,
          username: userAuth.user.displayName,
          phone: phoneno,
          uid: userAuth.user.uid,
          image: imagetemp,
        })
      );
      toast.success("User created successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error);
    }

  };

  const handelGoogleLogin = async (e) => {
    e.preventDefault();
    if (!phoneno || !image) {
      toast.error("Phone Number and image is required", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (!phonenoValidate(phoneno)) {
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider).then(async (result) => {
        console.log(result)
        const imagetemp = await convertToBase64(image);
        dispatch(
          createUser({
            email: result.user.email,
            username: result.user.displayName,
            uid: result.user.uid,
            phone: phoneno,
            image: imagetemp,
          })
        );
        console.log("User id:", auth.currentUser.uid);
        toast.success("User created successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/", { replace: true });
      }).catch((error) => {
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
  }

  return (
    <div
      className="min-h-screen min-w-screen-md flex items-center justify-center max-h-screen max-w-screen"
      style={{ backgroundImage: 'url("/images/login-signup-page-car-image.jpg")', backgroundSize: 'unset' }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center max-h-screen">
        <div className="bg-white overflow-y-auto overflow-x-auto p-4 w-full max-w-lg mx-auto rounded-lg shadow-2xl sm:p-10 flex flex-col max-h-full ">

          <div className="flex flex-col items-center pt-4 sm:justify-center sm:pt-0 flex-grow">
            <div>
              <Link to="/">
                <img
                  src="/images/logo.png"
                  className="w-100 h-35"
                />
              </Link>
            </div>
            <div className="w-full mt-6">
              <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
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
                      onInput={handleInputChange}
                      placeholder="Enter your name"  // Placeholder for the field
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
                      onInput={handleInputChange}
                      placeholder="Enter your email"  // Placeholder for the field
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
                      onInput={handleInputChange}
                      placeholder="Enter your phone number"  // Placeholder for the field
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
                      onInput={handleInputChange}
                      placeholder="Enter your password"  // Placeholder for the field
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
                      onInput={handleInputChange}
                      placeholder="Confirm your password"  // Placeholder for the field
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile Image
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="file"
                      accept=".jpeg, .png, .jpg"
                      name="image"
                      onInput={handleInputChange}
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
