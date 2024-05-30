import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) return <Navigate to={"/login"} />;
  return currentUser.role === 7103 ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
