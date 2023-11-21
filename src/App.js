import ListingsPage from "./features/Listing/ListingsPage";
import MainPage from "./components/MainPage";
import AdminLogin from "./features/Auth/Admin/AdminLogin";
import ContactForm from "./features/Contactus/Contactus";
import BlogEditor from "./features/Blogs/WriteBlog";
import UserProfile from "./features/UserProfile/UserProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/writeblog" element={<BlogEditor />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
