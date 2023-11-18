import Sidebar from "./components/Sidebar";
import ListingsPage from "./features/ListingsPage";

function App() {
  return (
    <div className="flex items-center flex-row">
      <div>
        <Sidebar />
      </div>
      <div>
        <ListingsPage />
      </div>
    </div>
  );
}

export default App;
