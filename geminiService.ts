
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Era } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateExtraQuestions = async (count: number = 3): Promise<Question[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `請生成 ${count} 個關於社會學理論的學術選擇題。
      題目應涵蓋古典、現代或後現代時期。
      請務必使用繁體中文（Traditional Chinese）返回結果，並嚴格遵循指定的 JSON Schema 格式。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              era: { type: Type.STRING, enum: Object.values(Era) },
              text: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["id", "era", "text", "options", "correctIndex", "explanation"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as Question[];
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
};

export const getAcademicInsight = async (score: number, total: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `用戶在社會學理論測試中獲得了 ${score}/${total} 分。
      請提供一段簡短（2句）且具有學術氣息的評價，評價他們的「理論氣質」或「社會學想像力」。
      語氣要專業、優雅，並使用繁體中文。`
    });
    return response.text.trim();
  } catch (error) {
    return "您對社會學經典體系的掌握展現了敏銳的學術直覺，請繼續在社會結構的解構之旅中探索。";
  }
};
