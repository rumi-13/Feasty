import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import Home from "../pages/general/Home";
import Welcome from "../pages/general/Welcome";
import VideoReels from "../pages/components/VideoReels";
import Profile from "../pages/food-partner/Profile";
import UserProfile from "../pages/general/UserProfile";
import CreateFood from "../pages/food-partner/CreateFood";
import SavedReels from "../pages/components/SavedReels";
import WelcomePartner from "../pages/general/WelcomePartner";
import UnifiedLogin from '../pages/auth/UnifiedLogin';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<UnifiedLogin />} />
                <Route path="/" element={<Home/>}/>
                <Route path="/welcome/:id" element={<Welcome/>} />
                <Route path="/user/register" element={<UserRegister/>}/>
                <Route path="/user/profile/:id" element={<UserProfile/>}/>
                <Route path="/partner/register" element={<FoodPartnerRegister/>}/>
                <Route path="/:id/food-reels" element={<VideoReels/>}/>
                <Route path= "/partner/profile/:id" element={<Profile/>}/>
                <Route path="/partner/create-food" element={<CreateFood/>} />
                <Route path="/partner/welcome/" element={<WelcomePartner/>}/>
                <Route path = "/:id/saved-reels" element={<SavedReels/>}/>
            </Routes>
        </Router>
    );
}