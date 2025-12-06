import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import Home from "../pages/general/Home";
import Welcome from "../pages/general/Welcome";
import ChooseRegister from "../pages/auth/ChooseRegister";
import VideoReels from "../pages/components/VideoReels";


export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/choose-register" element={<ChooseRegister/>}/>
                <Route path="/user/register" element={<UserRegister/>} />
                <Route path="/user/login"  element={<UserLogin/>} /> 
                <Route path="/partner/register" element={<FoodPartnerRegister/>} />
                <Route path="/partner/login" element={<FoodPartnerLogin/>} />
                <Route path="/" element={<Home/>}/>
                <Route path="/home/welcome" element={<Welcome/>} />
                <Route path = "/create-food" element={<h1>Food</h1>}/>
                <Route path="/food-reels" element={<VideoReels/>}/>
            </Routes>
        </Router>
    );
}