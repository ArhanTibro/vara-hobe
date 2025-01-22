//import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/login";
import SignupPage from "./Pages/signupPage";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Search from "./Pages/Search";
import AddList from "./Pages/AddList";
import Profile from "./Pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search",
      element: (
        <>
          <Navbar /> <Search />
        </>
      ),
    },
    {
      path: "/addList",
      element: (
        <>
          <Navbar /> <AddList />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <Navbar /> <Profile />
        </>
      ),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signUp",
      element: <SignupPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
