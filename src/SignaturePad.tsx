// @ts-nocheck
// We're not checking this file for now.
import { useRef, useEffect, useCallback, useState } from "react";
import SignaturePad from "signature_pad";

interface SignaturePadComponentProps {
  setSignature: (signature: () => string | null) => void;
  disabled: boolean;
}

const SignaturePadComponent = ({
  setSignature,
  disabled,
}: SignaturePadComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      // Adjust canvas resolution to match CSS size
      const ratio = Math.max(window.devicePixelRatio || 1, 1); // Handle high-DPI screens
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();

    // Initialize the SignaturePad
    signaturePadRef.current = new SignaturePad(canvasRef.current);

    // Listen for window resize to adjust canvas size
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      signaturePadRef.current.off();
      signaturePadRef.current.clear();
    };
  }, [resizeCanvas]);

  useEffect(() => {
    // Expose signature data to the parent
    setSignature(
      () => () =>
        signaturePadRef.current.isEmpty()
          ? null
          : signaturePadRef.current.toDataURL("image/svg+xml")
    );
  }, [setSignature]);

  const handleClear = () => {
    signaturePadRef.current.clear();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`relative border ${
        isFocused ? "border-purple-500" : "border-[rgb(107,114,128)]"
      } bg-white shadow-sm rounded-lg focus:ring-purple-300 bg-purple-50`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-32 bg-purple-50 rounded-[10px]"
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0} // Make canvas focusable
        style={{ pointerEvents: disabled ? "none" : "auto" }}
      />
      <button
        type="button"
        onClick={handleClear}
        className="absolute top-2 right-2 px-4 py-2 text-sm text-white font-bold bg-purple-600 rounded-full shadow focus:ring-2 focus:ring-purple-300 transition hover:bg-purple-700 border rounded-lg"
        disabled={disabled}
      >
        CLEAR
      </button>
    </div>
  );
};

export default SignaturePadComponent;
