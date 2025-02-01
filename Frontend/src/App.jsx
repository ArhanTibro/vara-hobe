//import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/login";
import SignupPage from "./Pages/signupPage";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import AddList from "./Pages/AddList";
import Profile from "./Pages/Profile";
import ChatPage from "./Pages/ChatPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/addList",
      element: <AddList />,
    },
    {
      path: "/chatPage",
      element: <ChatPage />,
    },
    {
      path: "/profile",
      element: <Profile />,
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
