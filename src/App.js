import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./components/master.css";

import MakuaNavbar from "./components/home/navbar";
import Main from "./components/home/main";
import About from "./components/home/about/about";
import Resort from "./components/home/resort/resort";

function App() {
  return (
    <Router>
      <MakuaNavbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/resort" element={<Resort />} />
      </Routes>
    </Router>
  );
}

export default App;
