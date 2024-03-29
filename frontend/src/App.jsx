import Body from "./components/body";
import Nav from "./components/nav";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Contact from "./components/contact";
import Login from "./components/login";
import Signup from "./components/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      {location.pathname === "/signup" || location.pathname === "/login" ? (
        <button
          className="w-full bg-gray-300 text-red-400 font-semibold text-lg mx-auto p-2 "
          onClick={() => navigate("/")}
        >
          Explore Product
        </button>
      ) : (
        <Nav />
      )}
      <Routes>
        <Route path="contact" element={<Contact />} />
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
