import React from "react";

import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EBECED]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#3F4651]">
          Welcome To Vhara Hobe!!
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-[#3F4651]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F4651]"
            />
          </div>
          <div>
            <label className="block text-[#3F4651]">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F4651]"
            />
          </div>
          <br />
          <Link to="/">
            <button className="w-full px-4 py-2 font-bold text-white bg-[#3F4651] rounded-lg hover:bg-[#C0BCB5]">
              Login
            </button>
          </Link>
        </form>
        <div className="flex items-center justify-between">
          <hr className="w-full border-[#C0BCB5]" />
          <span className="px-3 text-[#3F4651]">or</span>
          <hr className="w-full border-[#C0BCB5]" />
        </div>
        <div className="space-y-3">
          <button className="flex items-center justify-center w-full px-4 py-2 text-white bg-[#3F4651] rounded-lg hover:bg-[#C0BCB5]">
            <span className="ml-2">Login with Google</span>
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 text-white bg-[#3F4651] rounded-lg hover:bg-[#C0BCB5]">
            <span className="ml-2">Login with Facebook</span>
          </button>
        </div>
        <p className="text-sm text-center text-[#3F4651]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#3F4651] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
