"use client";

import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState();
  const getProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);
  
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
