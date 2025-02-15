import React from "react";
import ReactDOM from "react-dom";
import Login from './components/Auth/Login';
import Home from './components/Home';
import Signup from './components/Auth/signup';
import { UserProvider, ProtectedRoute } from './context/UserContext';
import "../public/styles.css"

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"

const router = createBrowserRouter([
    {
      path: "",
      element: <Navigate to="/login" replace />,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
      path: "/Home",
      element: <ProtectedRoute><Home/></ProtectedRoute>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);