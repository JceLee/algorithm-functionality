import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home.jsx";
import CodeVerification from "./page/week1/CodeVerification.jsx";
import CommentList from "./page/week2/CommentList.jsx";
import TicketPurchase from "./page/week2/TicketPurchase.jsx"; // Import the new component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/week-1-1" element={<CodeVerification />} />
        <Route path="/week-2-1" element={<CommentList />} />
        <Route path="/week-2-2" element={<TicketPurchase />} />{" "}
        {/* Add new route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
