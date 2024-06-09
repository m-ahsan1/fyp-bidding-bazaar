import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, login, logout, selectUser } from './redux/slices/userSlice';
import { auth } from './firebase';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { setLoading, selectLoading } from './redux/slices/loadingSlice';
import Loader from './components/loader';
import Writeblog from './features/Blogs/WriteBlog';
import ListingsPage from './features/Listing/ListingsPage';
import MainPage from './pages/MainPage';
import AdminLogin from './features/Auth/Admin/AdminLogin';
import ContactForm from './features/Contactus/Contactus';
import UserProfile from './features/UserProfile/UserProfile';
import Team from './features/TeamPage/team';
import AdminHomePage from './pages/AdminHomePage';
import BlogsPage from './features/Blogs/BlogsPage';
import UserSign from './features/Auth/User/UserSignup/UserSignup';
import UserLogin from './features/Auth/User/UserLogin/UserLogin';
import Prediction from './features/Prediction/prediction';
import Messages from './components/messages';
import AddAdmin from './components/addadmin';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const isEmailVerified = () => {
    const user = auth.currentUser;
    if (!user) return false;
    if (user.emailVerified) {
      console.log('Email is verified');
      return true;
    } else {
      console.log('Email is not verified');
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      console.log('onAuthStateChanged triggered');
      console.log(userAuth);
      if (userAuth) {
        if (isEmailVerified(userAuth)) {
          await dispatch(getUserData({ uid: userAuth.uid, uidToken: await userAuth.getIdToken() }));
          dispatch(setLoading(false));
        } else {
          dispatch(logout());
          auth.signOut();
          sendEmailVerification(userAuth).catch((error) => {
            toast.error(error.message, {
              position: toast.POSITION.TOP_CENTER,
            });
            console.log(error);
          });
          toast.error('Please verify your email first and login again', {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(setLoading(false));
        }
      } else {
        console.log('User not logged in');
        dispatch(logout());
        dispatch(setLoading(false));
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
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
          <Route path="/predict" element={<Prediction />} />
          <Route path="/writeblog" element={<Writeblog />} />
          <Route path="/message" element={<Messages />} />
          <Route path="/addadmin" element={<AddAdmin />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
