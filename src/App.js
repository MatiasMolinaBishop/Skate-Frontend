import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage"
import SingleLocationPage from './pages/SingleLocationPage';
import SingleEvent from './pages/SingleEvent';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import OthersProfile from './pages/OthersProfile';

import { AnimatePresence } from 'framer-motion'



function App() {
  const location = useLocation()
  return (
    <div className="App">
      <Navbar />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="login" element={<IsAnon> <LoginPage /> </IsAnon>} />
          <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
          <Route path="/profile/:userId" element={<IsPrivate><OthersProfile /></IsPrivate>} />
          <Route path="/locations" element={<IsPrivate><LocationsPage /></IsPrivate>} />
          <Route path="/locations/:locationId" element={<IsPrivate><SingleLocationPage /></IsPrivate>} />
          <Route path="/events/:eventId" element={<IsPrivate><SingleEvent /></IsPrivate>} />
        </Routes>
      </AnimatePresence>

    </div>
  );
}
export default App;