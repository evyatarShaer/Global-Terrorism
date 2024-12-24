import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DeadliestAttackTypes from "./components/DeadliestAttackTypes";
import HighestCasualtyRegions from "./components/HighestCasualtyRegions";
import Home from "./components/home/Home";

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/DeadliestAttackTypes" element={<DeadliestAttackTypes />} />
          <Route path="/HighestCasualtyRegions" element={<HighestCasualtyRegions />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
