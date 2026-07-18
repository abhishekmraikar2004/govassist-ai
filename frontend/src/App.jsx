import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import AdminReports from "./pages/AdminReports";
import Recommend from "./pages/Recommend";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
