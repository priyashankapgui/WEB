import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../../Pages/Home/Home";

function App() {
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  return (
    <div className="App">
      <Navbar onBranchChange={handleBranchChange} />
      <Home selectedBranch={selectedBranch} />
    </div>
  );
}

export default App;
