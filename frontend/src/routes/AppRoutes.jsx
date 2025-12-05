import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";


export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/user/register" element={<UserRegister/>} />
                <Route path="/user/login"  element={<UserLogin/>} /> 
                <Route path="/food-partner/register" element={<FoodPartnerRegister/>} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin/>} />
            </Routes>
        </Router>
    );
}