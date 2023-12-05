import ListingsPage from "./features/Listing/ListingsPage";
import MainPage from "./pages/MainPage";
import AdminLogin from "./features/Auth/Admin/AdminLogin";
import ContactForm from "./features/Contactus/Contactus";
import UserProfile from "./features/UserProfile/UserProfile";
import Team from "./features/TeamPage/team";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminHomePage from "./pages/AdminHomePage";
import BlogsPage from "./features/Blogs/BlogsPage";
import UserSign from "./features/Auth/User/UserSignup/UserSignup";
import UserLogin from "./features/Auth/User/UserLogin/UserLogin";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './redux/slices/userSlice';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const isEmailVerified = () => {
    // const user = auth.currentUser;
    // if(!user) return false;
    // if (user.emailVerified) {
    //   return true;
    // } else {
    //   return false;
    // }
    return true;
  };
    // check at page load if a user is authenticated
    useEffect(() => {
      onAuthStateChanged(auth, async (userAuth) => {
        if (userAuth && isEmailVerified()) {
          const idToken = await userAuth.getIdToken(true);
          dispatch(
            login({
              email: userAuth.email,
              name: userAuth.displayName,
              photoUrl: userAuth.photoURL,
              idToken: idToken,
            })
          );
        } else {
          console.log("Email not verfied or user not logged in")
          dispatch(logout());
        }
      });
    }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHomePage />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-signup" element={<UserSign />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;
