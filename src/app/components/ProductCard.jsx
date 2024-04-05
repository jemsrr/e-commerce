import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProductCard = (props) => {
  const [isLogin, setIsLogin] = useState();
  const x = useSelector((state) => state.userLoginReducer.isLogin);
  const email = useSelector((state) => state.userLoginReducer.email);

  const router = useRouter();
  useEffect(() => {
    setIsLogin(x);
  }, [x]);

  const addProductHandler = async (item) => {
    await fetch(`http://localhost:3000/api/${email}`, {
      method: "POST",
      body: JSON.stringify({ item, amount: 1, price: item.price }),
    });
  };
  return (
    <div className="flex flex-col justify-between bg-zinc-600">
      <div className=" h-full p-4 grid grid-cols-1 content-between gap-2">
        <img className="h-40 w-full" src={props.product.thumbnail} alt="" />
        <h1 className="text-2xl font-bold text-zinc-400">
          {props.product.title}
        </h1>
        <h5 className="text-[12px] font-normal text-zinc-200">
          {props.product.description}
        </h5>
        <h2 className="text-2xl font-bold text-zinc-100">
          {props.product.price} $
        </h2>
        <button
          onClick={(e) => {
            isLogin ? addProductHandler(props.product) : router.push("/login");
          }}
          className="w-full py-2 rounded-xl text-xl font-medium bg-zinc-800"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
