import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vehicles from "./components/Vehicles";

import LandingPage from "./components/LandingPage";
import ProfitCalc from "./components/ProfitCalc"
import Remittance from "./components/Remittance"
import Maintenance from "./components/Maintainance";
import Header from "./components/Header";
import SaccoProvider from "./context/SaccoContext";



function App() {
  return (
    <SaccoProvider>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/profit-calculator" element={<ProfitCalc />} />
      <Route path="/remittances" element={<Remittance />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/vehicles" element={<Vehicles />} />

    </Routes>
    </BrowserRouter>
    </SaccoProvider>
    
  );
}

export default App;