import { Route, Routes } from "react-router-dom";
import "./App.css";
import Destinos from "./pages/Destinos";
import Final from "./pages/Final";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="destinos" element={<Destinos />} />
      <Route path="final" element={<Final />} />
    </Routes>
  );
}

export default App;
