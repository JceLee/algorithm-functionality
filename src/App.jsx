import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home.jsx";
import CodeVerification from "./page/week1/CodeVerification.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/week-1-1" element={<CodeVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
