import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import CreatePin from './pages/CreatePin';
import SavedPins from './pages/SavedPins';
import PinDetails from './pages/PinDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="shell">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create" element={<CreatePin />} />
            <Route path="/saved" element={<SavedPins />} />
            <Route path="/pin/:id" element={<PinDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/u/:username" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
