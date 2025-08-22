import React, { useState } from "react";
 
const ForgotPassword = ({ onReset }) => {
  const [email, setEmail] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onReset) {
      onReset(email);
    } else {
      console.log("Password reset requested for:", email);
    }
  };
 
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-zinc-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4"
      >
        {/* Header */}
        <div className="p-4 flex flex-col items-center gap-2.5 text-center">
          <h1 className="text-3xl font-bold font-[Poppins] text-black">LSL Plus</h1>
          <p className="text-2xl font-light font-[Poppins] text-black">
            Reset Your Password
          </p>
        </div>
 
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="px-4 py-2 text-black text-base font-[Poppins]">
            Enter your email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@csu.edu.au"
            className="w-full p-2 rounded-2xl border border-stone-300 bg-white text-black font-[Poppins] text-base focus:outline-none"
            required
          />
        </div>
 
        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-black rounded-2xl text-white text-base font-[Poppins] hover:bg-gray-800 transition"
        >
          Send Reset Link
        </button>
 
        {/* Back to login */}
        <div className="flex justify-end">
          <a
            href="/login"
            className="text-black text-base font-[Poppins] underline"
          >
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
};
 
export default ForgotPassword;