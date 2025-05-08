import { Mistral } from "@mistralai/mistralai";
import { json } from "../lib/Markdown";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY!,
});

interface Message {
  role: string;
  content: string;
}

interface GenerateParams {
  model?: string;
  messages?: Message[];
  temperature?: number;
  max_tokens?: number;
}

export async function generate({
  model = "mistral-large-latest", // mistral-small-latest
  messages = [],
  temperature = 0,
  max_tokens = 2048,
}: GenerateParams) {
  const {
    choices: [
      {
        message: { content },
      },
    ],
    usage: { promptTokens: prompt_tokens, completionTokens: completion_tokens },
  } = await mistral.chat.complete({
    model,
    messages,
    temperature,
    maxTokens: max_tokens,
  });

  console.info({ prompt_tokens, completion_tokens });
  return json(content);
}
