import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Playlists from './pages/Playlists';
import SpotifyCallback from './pages/SpotifyCallback';
import SoundCloudCallback from './pages/Callback';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<SoundCloudCallback></SoundCloudCallback>}/>
        <Route path="/spotifycallback" element={<SpotifyCallback></SpotifyCallback>}/>
        <Route path="/playlists" element={<Playlists/>}/>
        <Route path="/success" element={<Success></Success>}></Route>
      </Routes>
    </Router>
  )
}

export default App
