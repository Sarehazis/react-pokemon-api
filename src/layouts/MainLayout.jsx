import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../context/ThemeContext";

export default function MainLayout() {
  const { isLoggedIn } = useContext(LoginContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  );
}
