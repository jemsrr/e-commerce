"use client";

import Image from "next/image";
import img from "../../../public/images.jpg";
import Link from "next/link";
import { userLogin } from "@/lib/reducer/userLogin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState();
  const dispatch = useDispatch();
  const x = useSelector((state) => state.userLoginReducer.isLogin);
  useEffect(() => {
    setIsLogin(x);
  }, [x]);
  return (
    <div className=" bg-zinc-800">
      <nav className="flex justify-between px-20 py-2 items-center">
        <div>
          <Image
            className="rounded-3xl"
            src={img}
            width={150}
            height={50}
            alt="Picture of the author"
          />
        </div>
        <Link href="/">
          <div className="text-zinc-300 font-light text-xl">products</div>
        </Link>
        {!isLogin ? (
          <div className="flex justify-end gap-6">
            <Link href="login">
              <button className="w-28 py-2 rounded-3xl text-xl font-medium bg-green-600 opacity-60 hover:opacity-100">
                Login
              </button>
            </Link>
            <Link href="signup">
              <button className="w-28 py-2 rounded-3xl text-xl font-medium bg-blue-600 opacity-60 hover:opacity-100">
                signup
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-end gap-6">
            <Link href="/">
              <button
                onClick={(e) =>
                  dispatch(
                    userLogin({
                      isLogin: false,
                      email: "",
                    })
                  )
                }
                className="w-28 py-2 rounded-3xl text-xl font-medium bg-green-600 opacity-60 hover:opacity-100"
              >
                Logout
              </button>
            </Link>
            <Link href="cart">
              <div className="relative">
                <div className=" w-12 h-11 bg-slate-200 rounded-full"></div>
                <div className="absolute right-0 top-0  bg-green-600 h-5 w-5 rounded-full"></div>
              </div>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
