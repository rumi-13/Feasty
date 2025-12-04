import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/user/register" element={<h1 className="text-slate-900">User Register</h1>} />
                <Route path="/user/login" element={<h1>User Login</h1>} />
                <Route path="/food-partner/register" element={<h1>Food Partner Register</h1>} />
                <Route path="/food-partner/login" element={<h1>Food Partner Login</h1>} />
            </Routes>
        </Router>
    );
}