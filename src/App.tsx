import React, { useState } from "react";
import LiabilityFormText from "./LiabilityFormText";
import WaiverForm from "./WaiverForm";

const SuccessMessage: React.FC = () => (
  <div className="text-center mt-2">
    <h2 className="text-3xl font-bold text-purple-700 mb-4">
      Thank you for your submission!
    </h2>
    <p className="text-gray-700">
      Your waiver has been successfully submitted.
    </p>
  </div>
)

const App: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-3">
      <div className="bg-white shadow-glossy p-6 max-w-full w-[960px] border-4 border-black p-[34px] rounded-[32px]">
        <h1 className="font-bold text-purple-700 text-center mb-6">
          Mutts in the 6ix Waiver
        </h1>
        <LiabilityFormText />
        {isSubmitted ? (
          <SuccessMessage />
        ) : (
          <WaiverForm onSubmitSuccess={handleFormSubmitSuccess} />
        )}
      </div>
    </div>
  );
};

export default App;
