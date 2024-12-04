import { useState } from "react";
import SignaturePadComponent from "./SignaturePad";
import { supabase } from "./supabaseClient"; // Import the Supabase client
import LiabilityFormText from "./LiabilityFormText";

const App = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [getSignatureData, setSignature] = useState<(() => string) | null>(
    null
  ); // Store the function to get signature data
  const [dogName, setDogName] = useState(""); // State for dog name

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    const signature = getSignatureData && getSignatureData(); // Retrieve signature data
    if (!signature) {
      alert("Please provide a signature before submitting.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("waver_entries") // Ensure this matches your actual table name
        .insert([{ name, signature, dog_name: dogName }]); // Insert the form data
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
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-6">
      <div className="bg-white shadow-glossy rounded-2xl p-12 max-w-full w-[960px]">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">
          Mutts in the 6ix Waiver
        </h1>
        <LiabilityFormText />
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center mb-6m mt-6">
            Submit Your Entry
          </h1>
          <div className="mb-4">
            <label
              htmlFor="dogName"
              className="block text-sm font-bold text-gray-700 pb-2"
            >
              Dog Name
            </label>
            <input
              type="text"
              id="dogName"
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
              required
              className="block w-full px-4 py-2 bg-purple-50 rounded-xl shadow-sm focus:ring-purple-300"
              placeholder="Enter your dog's name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-700 pb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-4 py-2 bg-purple-50 rounded-xl shadow-sm focus:ring-purple-300"
              placeholder="Enter your name"
            />
          </div>

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
      </div>
    </div>
  );
};

export default App;
