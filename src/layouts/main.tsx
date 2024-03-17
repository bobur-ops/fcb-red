import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Form />
    </>
  );
}
