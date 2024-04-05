"use client";
import { userLogin } from "@/lib/reducer/userLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  // const x = useSelector((state) => state.userLoginReducer.isLogin);
  const loginHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill all fild");
    } else {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data !== null) {
        dispatch(
          userLogin({
            isLogin: true,
            email,
          })
        );
        router.push("/");
      } else {
        alert("plese first signup");
        router.push("/signup");
      }
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={loginHandler}
        className="flex flex-col items-center gap-4 bg-zinc-900 m-20 p-10 rounded-3xl"
      >
        <h1 className="text-2xl font-bold text-zinc-300">Log-In</h1>
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
          placeholder="Enter your password"
        />
        <button className="w-full py-1 rounded-3xl text-xl font-medium bg-green-600">
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;
