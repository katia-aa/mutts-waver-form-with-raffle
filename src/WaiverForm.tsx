// WaiverForm.tsx
import { FC, FormEvent, useState } from "react";
import { supabase } from "./supabaseClient";
import SignaturePadComponent from "./SignaturePad";
import FormInput from "./FormInput";

interface WaiverFormProps {
  onSubmitSuccess: () => void;
}

const WaiverForm: FC<WaiverFormProps> = ({ onSubmitSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dogName, setDogName] = useState("");
  const [loading, setLoading] = useState(false);
  const [getSignatureData, setSignature] = useState<() => void>();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const signature = getSignatureData && getSignatureData();
    if (!signature) {
      alert("Please provide a signature before submitting.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("waiver_entries_test")
        .insert([{ name, signature: "Fix me! need a short string.", dog_name: dogName, email }]);
      if (error) throw error;
      onSubmitSuccess(); // Call the callback function
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-4 border-black p-[24px] rounded-[32px]">
      <h1 className="text-2xl font-bold text-center mb-6">Submit Your Entry</h1>
      <FormInput
        id="name"
        label="Name*"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
      />
      <FormInput
        id="dogName"
        label="Dog Name"
        value={dogName}
        onChange={(e) => setDogName(e.target.value)}
        placeholder="Enter your dog's name"
      />
      <FormInput
        id="email"
        label="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <div className="mb-4">
        <label
          htmlFor="signature"
          className="block text-sm font-bold text-gray-700 pb-2"
        >
          Signature*
        </label>
        <SignaturePadComponent setSignature={setSignature} disabled={false} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full text-[1.8rem] px-4 py-2 text-white font-bold bg-purple-600 rounded-full shadow-lg transition focus:ring-4 focus:ring-purple-300 ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default WaiverForm;
