import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home.jsx";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
