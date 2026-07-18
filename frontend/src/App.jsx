import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recommend from "./pages/Recommend";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import AdminReports from "./pages/AdminReports";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/report" element={<Report />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
