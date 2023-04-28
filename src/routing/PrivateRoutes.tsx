import React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import Layout from "./Layout";

function PrivateRoutes() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return <Layout />;
}

export default PrivateRoutes;
