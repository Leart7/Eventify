import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilteredMapPage from "./pages/FilteredMapPage";
import EventsLocationPage from "./pages/EventsLocationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TicketsPage from "./pages/TicketsPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import ChangeEmailPage from "./features/AccountSettings/ChangeEmailPage";
import ChangePasswordPage from "./features/AccountSettings/ChangePasswordPage";
import CloseAccountPage from "./features/AccountSettings/CloseAccountPage";
import EventDetails from "./pages/EventDetails";
import FavoriteEventsPage from "./pages/FavoriteEventsPage";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./ui/PageNotFound";
import FollowingEvents from "./pages/FollowingEvents";
import UserEventsPage from "./pages/UserEventsPage";
// import CreateEvents from "./pages/CreateEvents";
import Navbar from "./ui/Navbar";
import CreateEvents from "./pages/CreateEvents";
import Detail from "./pages/Detail";
import ScrollToTop from "./ui/ScrollToTop";





function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* <Route index element={<Navigate replace to="/" />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/filter-events" element={<FilteredMapPage />} />
        <Route path="/find-events/:city" element={<EventsLocationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/favorites/events" element={<FavoriteEventsPage />} />
        <Route path="/following" element={<FollowingEvents />} />
        {/* <Route path="/create-events" element={<CreateEvents />} /> */}
        <Route path="/create-events" element={<CreateEvents />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/account-settings" element={<AccountSettingsPage />} />
        <Route
          path="/account-settings/change-email"
          element={<ChangeEmailPage />}
        />
        <Route
          path="/account-settings/password"
          element={<ChangePasswordPage />}
        />
        <Route
          path="/account-settings/close-account"
          element={<CloseAccountPage />}
        />
        <Route path="/user/:name" element={<UserEventsPage />} />
        <Route path="/event-details/:eventId" element={<EventDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 5000,
            style: {
              fontWeight: "bold",
              width: "90%",
            },
          },
          error: {
            duration: 5000,
            style: {
              width: "90%",
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
