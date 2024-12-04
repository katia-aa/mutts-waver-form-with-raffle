import React from "react";
import LiabilityFormText from "./LiabilityFormText";
import WaiverForm from "./WaiverForm";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-6">
      <div className="bg-white shadow-glossy rounded-2xl p-12 max-w-full w-[960px]">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">
          Mutts in the 6ix Waiver
        </h1>
        <LiabilityFormText />
        <WaiverForm />
      </div>
    </div>
  );
};

export default App;
