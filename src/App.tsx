import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import Navbar from "./components/Navbar";
import ServicesPage from "./pages/services";
import PortfolioPage from "./pages/portfolio";
import Form from "./components/Form";

function App() {
  return (
    <div className="pb-[100px]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>

        <Form />
      </Router>
    </div>
  );
}

export default App;
