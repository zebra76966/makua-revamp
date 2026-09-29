import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./components/master.css";

import MakuaNavbar from "./components/home/navbar";
import Main from "./components/home/main";
import About from "./components/home/about/about";
import Resort from "./components/home/resort/resort";
import ProductsMain from "./components/home/products/productsMain";
import ProductDetailMain from "./components/home/products/productDetail/prodDetMain";
import ScrollToTop from "./components/utils/ScrollToTop";
import AyahuascaMain from "./components/home/ayahuasca/ayahuascaMain";
import WorkshopMain from "./components/home/workshop/workshopMain";
import FaqsMain from "./components/faqs/faqsMain";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicyMain";
import Err404 from "./components/404";
import BookPage from "./components/booking/BookPage";
import ContactMain from "./components/home/contact/contactMain";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MakuaNavbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/resort" element={<Resort />} />
        <Route path="/retreats" element={<ProductsMain />} />
        <Route path="/retreats/:slug" element={<ProductDetailMain />} />
        {/* the old address, kept so existing links and bookmarks still work */}
        <Route path="/product_detail/:id" element={<Navigate to="/retreats" replace />} />
        <Route path="/book/:slug" element={<BookPage />} />
        <Route path="/contact" element={<ContactMain />} />
        <Route path="/ayahuasca" element={<AyahuascaMain />} />
        <Route path="/workshops" element={<WorkshopMain />} />
        <Route path="/faq" element={<FaqsMain />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Err404 />} />
      </Routes>
    </Router>
  );
}

export default App;
