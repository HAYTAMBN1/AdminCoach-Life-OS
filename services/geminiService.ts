import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT_GERMAN, SYSTEM_PROMPT_DISCIPLINE, SYSTEM_PROMPT_TECH } from "../constants";
import { GermanContent, TechResource } from "../types";

const apiKey = process.env.API_KEY || '';
// We initialize a new client in each call to ensure fresh config/keys if they change, 
// though for this app they are static env vars.
const getAI = () => new GoogleGenAI({ apiKey });

export const generateGermanLesson = async (topic: string): Promise<GermanContent> => {
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a B1 German lesson for the topic: ${topic}.`,
    config: {
      systemInstruction: SYSTEM_PROMPT_GERMAN,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hoeren: {
            type: Type.OBJECT,
            properties: {
              videoSearchTerm: { type: Type.STRING },
              description: { type: Type.STRING }
            }
          },
          lesen: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              text: { type: Type.STRING },
              vocabulary: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          schreiben: {
            type: Type.OBJECT,
            properties: {
              task: { type: Type.STRING },
              tips: { type: Type.STRING }
            }
          }
        }
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as GermanContent;
  }
  throw new Error("Failed to generate German lesson content");
};

export const analyzeMoodAndGetAdvice = async (mood: string, day: number): Promise<string> => {
  if (!apiKey) return "API Key missing. Stay strong, brother.";

  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `User Day: ${day}. User Mood: ${mood}.`,
    config: {
      systemInstruction: SYSTEM_PROMPT_DISCIPLINE,
    }
  });

  return response.text || "Keep your head up. Focus on the goal.";
};

export const searchTechResources = async (topic: string): Promise<string> => {
    if (!apiKey) throw new Error("API_KEY_MISSING");
  
    const ai = getAI();
    // Using search grounding to find real resources
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using Pro for better search reasoning
      contents: `Find 3 specific, free learning resources (URLs) for: "${topic}". Focus on Cisco, Microsoft Learn, or TryHackMe. Format as a markdown list with titles and URLs.`,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: SYSTEM_PROMPT_TECH,
      }
    });
  
    // We expect the model to return markdown text with links grounded in search
    return response.text || "System could not retrieve live resources. Check connection.";
};

export const generateDailyTasks = async (xp: number, rank: string): Promise<{ text: string }[]> => {
  if (!apiKey) {
      // Fallback mockup for demo
      return [
        { text: "Initialize Fajr Prayer & Athkar" },
        { text: "Execute German Grammar Module (30 min)" },
        { text: "Run Linux Terminal Practice" },
        { text: "Read 1 Page of Quran" },
        { text: "Physical Maintenance: 20 Pushups" }
      ];
  }

  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 5 specific, highly actionable daily mission objectives for a user with Rank: "${rank}" (XP: ${xp}).
    The persona is a disciplined "System Admin & Life Student".
    
    Required Categories:
    1. Spiritual (Islamic obligations/extras)
    2. German Learning (B1 goal)
    3. Technical Skill (DevOps/IT)
    4. Discipline/Health
    
    Tone: Cyberpunk, military-style, disciplined.
    Example output: "Execute Fajr Prayer Protocol", "Compile German Vocabulary Array", "Debug Server Logs".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING }
          }
        }
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as { text: string }[];
  }
  return [];
};