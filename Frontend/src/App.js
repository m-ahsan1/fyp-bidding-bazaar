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
import UserSign2 from "./features/Auth/User/UserSignup/UserSignup2";
import UserLogin from "./features/Auth/User/UserLogin/UserLogin";

function App() {
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
        <Route path="/user-signup2" element={<UserSign2 />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;
