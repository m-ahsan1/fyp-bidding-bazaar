import ListingsPage from "./features/Listing/ListingsPage";
import MainPage from "./components/MainPage";
import AdminLogin from "./features/Auth/Admin/AdminLogin";
import ContactForm from "./features/Contactus/Contactus";
import UserProfile from "./features/UserProfile/UserProfile";
import Team from "./features/TeamPage/team";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminHomePage from "./components/AdminHomePage";
import BlogsPage from "./features/Blogs/BlogsPage";

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
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;
