import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import ServicesPage from "./pages/services";
import PortfolioPage from "./pages/portfolio";
import PortfolioId from "./pages/portfolio/id";
import MainLayout from "./layouts/main";
import AdminLayout from "./layouts/admin";
import AdminPage from "./pages/admin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/login";
import { Toaster } from "react-hot-toast";
import ScrollToHashElement from "./components/ScrolltoHashElement";
import SitePage from "./pages/admin/site";
import TextsPage from "./pages/admin/texts";
import AwardsPage from "./pages/admin/awards";
import AdminPortfolioPage from "./pages/admin/portfolio";
import PortfolioItemPage from "./pages/admin/portfolio/PortfolioItem";
import NewPortfolioItem from "./pages/admin/portfolio/NewPortfolioItem";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="pb-[100px]">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:id" element={<PortfolioId />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPage />} />
              <Route path="/admin/site" element={<SitePage />} />
              <Route path="/admin/texts" element={<TextsPage />} />
              <Route path="/admin/portfolio" element={<AdminPortfolioPage />} />
              <Route
                path="/admin/portfolio/:id"
                element={<PortfolioItemPage />}
              />
              <Route
                path="/admin/portfolio/create"
                element={<NewPortfolioItem />}
              />
              <Route path="/admin/awards" element={<AwardsPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <ScrollToHashElement />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;
