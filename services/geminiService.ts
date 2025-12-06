import { GoogleGenAI } from "@google/genai";
import { Property } from '../types';

let genAI: GoogleGenAI | null = null;

try {
  // Safe initialization if env var is missing during build/dev
  if (process.env.API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (e) {
  console.warn("Gemini API Key missing or invalid initialization", e);
}

export const askGeminiTravelAssistant = async (
  question: string,
  property: Property
): Promise<string> => {
  if (!genAI) {
    return "I'm sorry, I cannot connect to the travel assistant at the moment (API Key missing).";
  }

  try {
    const prompt = `
      You are a helpful travel assistant for a property rental platform called StayNext.
      The user is asking a question about a specific property.
      
      Property Details:
      - Title: ${property.title}
      - Location: ${property.location}
      - City: ${property.city}
      - Type: ${property.type}
      - Amenities: ${property.amenities.join(', ')}
      - Description: ${property.description}
      - Price: $${property.price}/night

      User Question: "${question}"

      Please provide a helpful, concise, and friendly answer based on the property details and your general knowledge of the location (${property.location}).
      If you suggest local activities, make sure they are real places near ${property.city}.
      Keep the tone professional yet inviting.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble retrieving that information right now. Please try again later.";
  }
};
