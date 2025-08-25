import React, { useEffect, useState } from "react";
import AzureSignInButton from "../components/SSOLoginButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, loginUser, logoutUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
 
const Login = ({ onLogin, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
 
    if (loginUser.fulfilled.match(result)) {
      dispatch(fetchCurrentUser())
      navigate("/dashboard");
    } else {
      console.error("Login failed", result.payload || result.error);
    }
  };
 
  const logoutTest = (e) => {
    // e.preventDefault();
    dispatch(logoutUser());
  };
 
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-zinc-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md flex flex-col gap-4">
        {/* Header - outside form */}
        <div className="p-4 flex flex-col items-center gap-2.5 text-center">
          <h1 className="text-3xl font-bold font-[Poppins] text-black">
            LSL Plus
          </h1>
          <p className="text-2xl font-light font-[Poppins] text-black">
            Built for Precision. Designed for Compliance.
          </p>
        </div>
 
        {/* Login form - only email/password/submit/remember me */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="px-4 py-2 text-black text-base font-[Poppins]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@csu.edu.au"
              className="w-full p-2 rounded-2xl border border-stone-300 bg-white text-black font-[Poppins] text-base focus:outline-none"
              required
            />
          </div>
 
          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="px-4 py-2 text-black text-base font-[Poppins]">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="************"
              className="w-full p-2 rounded-2xl border border-stone-300 bg-white text-black font-[Poppins] text-base focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-black rounded-2xl text-white text-base font-[Poppins] hover:bg-gray-800 transition"
          >
            Go
          </button>
          <div className="flex items-center gap-2 justify-end">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-5 h-5 rounded border border-black"
            />
            <label htmlFor="rememberMe" className="text-black text-base font-[Poppins]">
              Remember Me
            </label>
          </div>
        </form>
 
        {/* Links and alternative auth - outside form */}
        <div className="flex justify-end">
          <Link to="/forgot-password" className="...">
            Forgot Password?
          </Link>
        </div>
 
        {/* <button className="w-full flex items-center justify-center gap-4 rounded-full border border-black bg-zinc-100 px-6 py-2 font-poppins text-base text-black">
          <span className="w-6 text-center">G</span>
          <span>Continue with Google</span>
        </button> */}
        <AzureSignInButton />
        {/* <button
          onClick={() => logoutTest()}
          className="w-full py-2 bg-black rounded-2xl text-white text-base font-[Poppins] hover:bg-gray-800 transition"
        >
          Logout
        </button> */}
      </div>
    </div>
  );
};
 
export default Login;