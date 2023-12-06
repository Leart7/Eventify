import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilteredMapPage from "./pages/FilteredMapPage";
import EventsLocationPage from "./pages/EventsLocationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TicketsPage from "./pages/TicketsPage";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/filter-events" element={<FilteredMapPage />} />
          <Route path="/find-events" element={<EventsLocationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
