import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  login,
  logout,
  selectUser,
} from "./redux/slices/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { setLoading, selectLoading } from "./redux/slices/loadingSlice";
import Loader from "./components/loader";
import Writeblog from "./features/Blogs/WriteBlog";
import ListingsPage from "./features/Listing/ListingsPage";
import MainPage from "./pages/MainPage";
import AdminLogin from "./features/Auth/Admin/AdminLogin";
import ContactForm from "./features/Contactus/Contactus";
import UserProfile from "./features/UserProfile/UserProfile";
import Team from "./features/TeamPage/team";
import AdminHomePage from "./pages/AdminHomePage";
import BlogsPage from "./features/Blogs/BlogsPage";
import UserSign from "./features/Auth/User/UserSignup/UserSignup";
import UserLogin from "./features/Auth/User/UserLogin/UserLogin";
import Prediction from "./features/Prediction/prediction";
import Messages from "./components/messages";
import AddAdmin from "./components/addadmin";
import AdminListings from "./components/admindeletelisting";
import BlogDetail from "./features/Blogs/blogdetail";
import ProductDetail from "./pages/ProductDetailPage";
import AuctionDetail from "./pages/AuctionDetailPage";
import TermsOfService from "./pages/TermsPage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import AboutUs from "./pages/AboutUsPage";
import NotFound from "./pages/NotFoundPage";
import { Main } from "./features/Auction/Main";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import Subbar from "./components/Subbar";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const isEmailVerified = () => {
    const user = auth.currentUser;
    if (!user) return false;
    if (user.emailVerified) {
      // console.log("Email is verified");
      return true;
    } else {
      // console.log("Email is not verified");
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      // console.log("onAuthStateChanged triggered");
      // console.log(userAuth);
      if (userAuth) {
        if (isEmailVerified(userAuth)) {
          await dispatch(
            getUserData({
              uid: userAuth.uid,
              uidToken: await userAuth.getIdToken(),
            })
          );
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
          toast.error("Please verify your email first and login again", {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(setLoading(false));
        }
      } else {
        // console.log("User not logged in");
        dispatch(logout());
        dispatch(setLoading(false));
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  const excludedRoutes = [
    "/admin",
    "/adminhome",
    "/addadmin",
    "/admindelete",
    "/writeblog",
    "/message",
    "/blogs/:id",
    "/auction",
    "/login",
    "/signup",
  ];

  return (
    <AuthProvider>
      {isLoading && <Loader />}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/sell/:id" element={<ProductDetail />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/adminhome" element={<AdminHomePage />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/signup" element={<UserSign />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/predict" element={<Prediction />} />
            <Route path="/writeblog" element={<Writeblog />} />
            <Route path="/message" element={<Messages />} />
            <Route path="/addadmin" element={<AddAdmin />} />
            <Route path="/admindelete" element={<AdminListings />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/auction" element={<Main />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}

const Layout = ({ children }) => {
  const location = useLocation();
  const excludedRoutes = [
    "/admin",
    "/adminhome",
    "/addadmin",
    "/admindelete",
    "/writeblog",
    "/message",
    "/login",
    "/signup",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {!excludedRoutes.includes(location.pathname) && <Navbar />}
      {!excludedRoutes.includes(location.pathname) && <Subbar />}
      <main className="flex-grow">{children}</main>
      {!excludedRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
