import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const deepseekCall = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body

    // Construct the request body for Gemini API
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: req.body.prompt, // Use the prompt from the frontend
            },
          ],
        },
      ],
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC-Vr28JySAiXjbK3u5Wd6B54boWXf9cCU`, // Gemini API endpoint
      requestBody, // Use the updated request body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the generated content from the response
    const generatedText = response.data.candidates[0].content.parts[0].text;

    res.status(200).json({ response: generatedText }); // Send the response back to the frontend
  } catch (error) {
    console.error(
      "Proxy Error:",
      error.response ? error.response.data : error.message
    ); // Log detailed error
    res.status(500).json({
      message: "Failed to fetch data from Gemini API",
      error: error.response ? error.response.data : error.message, // Include error details in the response
    });
  }
};

export default deepseekCall;
