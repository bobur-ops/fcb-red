import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { Navigate, Outlet } from "react-router-dom";

export default function MainLayout() {
  const hostname = window.location.hostname;
  if (hostname.includes("admin")) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Form />
    </>
  );
}
