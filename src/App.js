import ListingsPage from "./features/Listing/ListingsPage";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/listings" element={<ListingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
