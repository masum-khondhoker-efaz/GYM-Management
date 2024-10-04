import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import TrainerPage from "./pages/TrainerPage.jsx";
import TraineePage from "./pages/TraineePage.jsx";
import TraineeBookedSchedulePage from "./pages/TraineeBookedSchedulePage.jsx";
import TraineeProfile from "./pages/TraineeProfile.jsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/register" element={<RegistrationPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/admin-dashboard" element={<AdminPage/>} />
            <Route path="/schedule" element={<TrainerPage/>} />
            <Route path="/all-schedule" element={<TraineePage/>} />
            <Route path="/booked-schedule" element={<TraineeBookedSchedulePage />} />
            <Route path="/profile" element={<TraineeProfile />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;

