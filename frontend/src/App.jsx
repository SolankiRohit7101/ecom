import Body from "./components/body";
import Nav from "./components/nav";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Contact from "./components/contact";
import Login from "./components/login";
import Signup from "./components/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./Admin/AddProduct";
import ProductDetail from "./components/ProductDetail";
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
      ) : location.pathname === "/addproduct" ? (
        <h1 className="text-center text-black/40 bg-transparent text-2xl">
          Add Product
        </h1>
      ) : (
        <Nav />
      )}
      <Routes>
        <Route path="contact" element={<Contact />} />
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      <div className="footer min-w-full h-14">
        <h1 className="text-3xl bg-indigo-600 h-full text-white text-center ">
          Thanks for visting
        </h1>
      </div>
    </>
  );
}

export default App;
