import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DeadliestAttackTypes from "./components/DeadliestAttackTypes";

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<DeadliestAttackTypes />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
