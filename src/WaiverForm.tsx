import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import SignaturePadComponent from "./SignaturePad";
import FormInput from "./FormInput";

const WaiverForm: React.FC = () => {
  const [name, setName] = useState("");
  const [dogName, setDogName] = useState("");
  const [loading, setLoading] = useState(false);
  const [getSignatureData, setSignature] = useState<(() => string) | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const signature = getSignatureData && getSignatureData();
    if (!signature) {
      alert("Please provide a signature before submitting.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("waver_entries")
        .insert([{ name, signature, dog_name: dogName }]);
      if (error) {
        throw error;
      }
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center mb-6 mt-6">
        Submit Your Entry
      </h1>
      <FormInput
        id="dogName"
        label="Dog Name"
        value={dogName}
        onChange={(e) => setDogName(e.target.value)}
        placeholder="Enter your dog's name"
        required
      />
      <FormInput
        id="name"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
      />
      <div className="mb-4">
        <label
          htmlFor="signature"
          className="block text-sm font-bold text-gray-700 pb-2"
        >
          Signature
        </label>
        <SignaturePadComponent setSignature={setSignature} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 text-white font-bold bg-purple-600 rounded-full shadow-lg transition focus:ring-4 focus:ring-purple-300 ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default WaiverForm;
