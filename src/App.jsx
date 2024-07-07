import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home.jsx";
import CodeVerification from "./page/week1/CodeVerification.jsx";
import CommentList from "./page/week2/CommentList.jsx";
import TicketPurchase from "./page/week2/TicketPurchase.jsx";
import TimeAttack from "./page/week2/TimeAttack.jsx";
import ChangeListOrder from "./page/week3/ChangeListOrder.jsx";
import ChangeListOrderAdvanced from "./page/week3/ChangeListOrderAdvanced.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/week-1-1" element={<CodeVerification />} />
        <Route path="/week-2-1" element={<CommentList />} />
        <Route path="/week-2-2" element={<TicketPurchase />} />{" "}
        <Route path="/week-2-time-attack" element={<TimeAttack />} />{" "}
        <Route path="/week-3-1" element={<ChangeListOrder />} />{" "}
        <Route path="/week-3-2" element={<ChangeListOrderAdvanced />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
