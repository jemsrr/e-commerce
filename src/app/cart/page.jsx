"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [isLogin, setIsLogin] = useState();
  const [products, setProducts] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const router = useRouter();

  const x = useSelector((state) => state.userLoginReducer.isLogin);
  const email = useSelector((state) => state.userLoginReducer.email);

  const addProductHandler = async () => {
    const res = await fetch(`http://localhost:3000/api/${email}`);
    const data = await res.json();
    setProducts(data.cart);
    setTotalAmount(data.totalAmount);
  };

  const handelInc = async (item) => {
    const res = await fetch(`http://localhost:3000/api/${email}`, {
      method: "POST",
      body: JSON.stringify({ item, con: "add" }),
    });
    const data = await res.json();
    setProducts(data.cart);
    setTotalAmount(data.totalAmount);
  };

  const handelDec = async (item) => {
    const res = await fetch(`http://localhost:3000/api/${email}`, {
      method: "POST",
      body: JSON.stringify({ item, con: "dec" }),
    });
    const data = await res.json();
    setProducts(data.cart);
    setTotalAmount(data.totalAmount);
  };

  const orderHandel = async () => {
    const res = await fetch(`http://localhost:3000/api/${email}`, {
      method: "POST",
      body: JSON.stringify({ order: "order" }),
    });
    const data = await res.json();
    setProducts(data.cart);
    setTotalAmount(data.totalAmount);
    toast.success("Order Done");
    setTimeout(() => router.push("/"), 3000);
  };

  useEffect(() => {
    addProductHandler();
  }, []);
  useEffect(() => {
    setIsLogin(x);
  }, [x]);

  return (
    <div className="m-20 p-10 bg-zinc-700 rounded-xl">
      {isLogin ? (
        <div>
          {products?.map((item, i) => (
            <div
              key={i}
              className="flex justify-between bg-zinc-200 m-4 rounded-lg p-2"
            >
              <div>
                <div className="text-zinc-800 font-medium">
                  Products : {item.item.title}
                </div>
                <div className="text-zinc-800 text-xl font-medium">
                  Price :{item.item.price}$ x{item.amount}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => handelInc(item.item)}
                  className="h-full w-10 text-4xl bg-green-600 rounded-2xl"
                >
                  +
                </button>
                <button
                  onClick={(e) => handelDec(item.item)}
                  className="h-full w-10 text-4xl bg-green-600 rounded-2xl"
                >
                  -
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center m-4 p-2">
            <div className=" text-2xl font-bold">
              Total Amount : {totalAmount}$
            </div>
            <button
              onClick={orderHandel}
              className="h-full w-40 text-4xl bg-green-600 rounded-2xl"
            >
              Order
            </button>
          </div>
          <ToastContainer />
        </div>
      ) : (
        // router.push("/login")
        <div className="text-2xl font-bold text-zinc-200">
          plese first signup or login
        </div>
      )}
    </div>
  );
};

export default Cart;
