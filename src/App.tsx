import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="pb-[100px]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" index element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
