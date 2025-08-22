import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import DashboardPage from "../pages/DashboardPage";
import Employees from "../pages/Employees";
import SettingsPage from "../pages/SettingsPage";
import PrivateLayout from "./PrivateLayout";
import RequireRole from "./RequireRole";
import { fetchCurrentUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import GuestRoute from "./GuestRoute";
 
const AppRoutes = () => {
  const dispatch = useDispatch();
  const didFetch = useRef(false);
 
  useEffect(() => {
    if (!didFetch.current) {
      dispatch(fetchCurrentUser());
      didFetch.current = true;
    }
  }, [dispatch]);
 
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="*"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
 
      {/* Protected Routes with Layout */}
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/employees" element={<Employees />} />
        <Route
          path="/settings"
          element={
            <RequireRole allowedRoles={["admin"]}>
              <SettingsPage />
            </RequireRole>
          }
        />
        {/* Add more protected routes here */}
      </Route>
    </Routes>
  );
};
 
export default AppRoutes;