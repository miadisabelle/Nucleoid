import {
  GenerateContentResult,
  GenerativeModel,
  GoogleGenerativeAI,
} from "@google/generative-ai";

import { json } from "../lib/Markdown";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model: GenerativeModel = gemini.getGenerativeModel({
  model: "gemini-1.5-pro", // gemini-1.5-flash
  generationConfig: {
    temperature: 0,
  },
});

interface Message {
  content: string;
}

interface GenerateParams {
  messages?: Message[];
}

async function generate({ messages = [] }: GenerateParams): Promise<any> {
  const result: GenerateContentResult = await model.generateContent(
    messages.map((m) => m.content).join("\n")
  );

  return json(result.response.text());
}

export { generate };
