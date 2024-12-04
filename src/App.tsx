import React, { useState } from "react";
import LiabilityFormText from "./LiabilityFormText";
import WaiverForm from "./WaiverForm";

const App: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-6">
      <div className="bg-white shadow-glossy rounded-2xl p-12 max-w-full w-[960px]">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">
          Mutts in the 6ix Waiver
        </h1>
        <LiabilityFormText />
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Thank you for your submission!
            </h2>
            <p className="text-gray-700">
              Your waiver has been successfully submitted.
            </p>
          </div>
        ) : (
          <WaiverForm onSubmitSuccess={handleFormSubmitSuccess} />
        )}
      </div>
    </div>
  );
};

export default App;
