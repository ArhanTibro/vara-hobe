//import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EBECED]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#3F4651]">
          Create an Account
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-[#3F4651]">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F4651]"
            />
          </div>
          <div>
            <label className="block text-[#3F4651]">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F4651]"
            />
          </div>
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
          <div>
            <label className="block text-[#3F4651]">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F4651]"
            />
          </div>
          <div>
            <label className="block text-[#3F4651]">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F4651]"
            />
          </div>
          <div>
            <label className="block text-[#3F4651]">Present Address</label>
            <input
              type="text"
              placeholder="Enter your present address"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F4651]"
            />
          </div>
          <br />
          <Link to="/">
            <button className="w-full px-4 py-2 font-bold text-white bg-[#3F4651] rounded-lg hover:bg-[#C0BCB5]">
              Sign Up
            </button>
          </Link>
        </form>
        <p className="text-sm text-center text-[#3F4651]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#3F4651] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
