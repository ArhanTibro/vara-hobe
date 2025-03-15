import React, { useState } from "react";
import axios from "axios";

const FloatingMessenger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(""); // Store a single response

  const togglePrompt = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const generateResponse = async () => {
    if (!userInput.trim()) return;

    try {
      const result = await axios.post(
        `http://localhost:4000/api/deepai/prompt/`, // Use the proxy endpoint
        {
          prompt: `Try to give the right size in square feet and right amount of bedroom, bathrooms and balcony count for the following scenario. 
          Do not bold or use markdown formatting. Text: ${userInput}`,
        }
      );

      // Assuming the API returns { response: "some text" }
      const generatedResponse = result.data.response;
      setResponse(generatedResponse); // Store the single response
      setUserInput("");
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  const clearResponse = () => {
    setResponse(""); // Clear the single response
  };

  return (
    <div>
      {/* Floating Button with Tooltip */}
      <div className="fixed bottom-8 right-8 group">
        <button
          onClick={togglePrompt}
          className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThr7qrIazsvZwJuw-uZCtLzIjaAyVW_ZrlEQ&s" // Replace with your image URL
            alt="Chat Icon"
            className="w-8 h-8" // Adjust the size of the image
          />
        </button>
        {/* Tooltip */}
        <div className="absolute bottom-20 right-0 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          AI Help
        </div>
      </div>

      {/* Prompt Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 max-w-1/4 bg-white rounded-lg shadow-lg p-6">
          {/* User Input */}
          <textarea
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter your accommodation needs..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
            rows="3"
          />

          {/* Generate Response Button */}
          <button
            onClick={generateResponse}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Generate Response
          </button>

          {/* Display Response */}
          <div className="mt-4">
            {response && ( // Only render if response exists
              <div className="bg-gray-100 p-3 rounded mb-2">
                <p>{response}</p>
              </div>
            )}
          </div>

          {/* Clear Response Button */}
          <button
            onClick={clearResponse}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors mt-4"
          >
            Clear Response
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingMessenger;
