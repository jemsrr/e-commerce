"use client";

import { userLogin } from "@/lib/reducer/userLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const signupHandler = async (e) => {
    e.preventDefault();

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      cpassword.trim() === ""
    ) {
      alert("Please fill all fild");
    }
    if (password === cpassword) {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.email === email) {
        router.push("/login");
      } else {
        router.push("/");
        dispatch(
          userLogin({
            isLogin: true,
            email,
          })
        );
      }
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={signupHandler}
        className="flex flex-col items-center gap-4 bg-zinc-900 m-20 p-10 rounded-3xl"
      >
        <h1 className="text-2xl font-bold text-zinc-300">Sign-up</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 bg-slate-200 rounded-xl"
          type="text"
          placeholder="Enter your email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 bg-slate-200 rounded-xl"
          type="password"
          placeholder="Create a password"
        />
        <input
          onChange={(e) => setCpassword(e.target.value)}
          className="p-2 bg-slate-200 rounded-xl"
          type="password"
          placeholder="Confirm your password"
        />
        <button className="w-full py-1 rounded-3xl text-xl font-medium bg-blue-600">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
