import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Episodes from "./components/Pages/Episodes";
import Location from "./components/Pages/Location";
import NavBar from "./components/NavBar/NavBar";
import CharacterPage from "./components/Pages/CharacterPage";
import CardDetail from "./components/CardDetail/CardDetail";
import EpisodesDetail from "./components/CardDetail/EpisodesDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<CharacterPage />} />
        <Route path="/:id" element={<CardDetail />} />

        <Route path="/episode" element={<Episodes />} />
        <Route path="/episode:id" element={<CardDetail />} />
        <Route path="/episode/:episodeId" element={<EpisodesDetail />} />

        <Route path="/location" element={<Location />} />
        <Route path="/location:id" element={<CardDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
