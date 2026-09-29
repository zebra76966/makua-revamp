import React from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./productDetail";
import RetreatCards from "../../retreats/RetreatCards";
import Footer from "../../footer";

const ProductDetailMain = () => {
  const { slug } = useParams();
  return (
    <>
      <ProductDetail />
      <RetreatCards exclude={slug} heading="OTHER RETREATS" dark />
      <Footer />
    </>
  );
};

export default ProductDetailMain;
