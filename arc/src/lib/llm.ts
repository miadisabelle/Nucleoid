import { document } from "../instruct_dataset";
import { v4 as uuid } from "uuid";

// Define a type for the llm module interface
interface LLMModule {
  generate: (_: unknown) => Promise<unknown>;
}

export interface Message {
  role: string;
  content: string;
}

export interface GenerateParams {
  model: string;
  messages?: Message[];
  temperature?: number;
  max_tokens?: number;
}

export async function generate({
  model,
  messages = [],
  temperature = 0,
  max_tokens,
}: GenerateParams): Promise<unknown> {
  let llm: LLMModule | undefined;
  switch (process.env.LLM) {
    case "CLAUDE":
      llm = (await import("./claude.js")) as unknown as LLMModule;
      break;
    case "OPENAI":
      llm = (await import("./openai.js")) as unknown as LLMModule;
      break;
    case "GEMINI":
      llm = (await import("./gemini.js")) as unknown as LLMModule;
      break;
    case "MISTRAL":
      llm = (await import("./mistral.js")) as unknown as LLMModule;
      break;
    case "LLAMA":
      llm = (await import("./llama.js")) as unknown as LLMModule;
      break;
    case "AZURE":
      llm = (await import("./azure.js")) as unknown as LLMModule;
      break;
  }

  messages.unshift({
    role: "user",
    content: document(),
  });
  messages.unshift({
    role: "user",
    content: `
      control_id:
      ${uuid()}
      instruction:
      Respond in given json_format without any comments
    `,
  });

  if (!llm) throw new Error("LLM module not loaded");
  return llm.generate({
    model,
    messages,
    temperature,
    max_tokens,
  });
} 