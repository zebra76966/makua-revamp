import React from "react";
import ProductDetail from "./productDetail";
import SuggestionCards from "./suggestions/SuggestionCards";
import Footer from "../../footer";

const ProductDetailMain = () => {
  return (
    <>
      <ProductDetail />
      <SuggestionCards />
      <Footer />
    </>
  );
};

export default ProductDetailMain;
