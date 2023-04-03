import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage"
import SingleLocationPage from './pages/SingleLocationPage';
import SingleEvent from './pages/SingleEvent';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/locations/:locationId" element={<SingleLocationPage />} />
        <Route path="/events/:eventId" element={<SingleEvent />} />
      </Routes>

    </div>
  );
}
export default App;