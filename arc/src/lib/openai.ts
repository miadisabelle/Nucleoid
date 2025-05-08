import { OpenAI } from "openai";

interface GenerateParams {
  model?: string;
  messages?: Array<{ role: string, content: string }>;
  temperature?: number;
  max_tokens?: number;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generate({
  model = "gpt-4o-2024-08-06", // gpt-4o-mini-2024-07-18
  messages = [],
  temperature = 0,
  max_tokens = 2048,
}: GenerateParams = {}): Promise<any> {
  const {
    choices: [
      {
        message: { content },
      },
    ],
    usage: { prompt_tokens, completion_tokens },
  } = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: { type: "json_object" },
  });

  console.info({ prompt_tokens, completion_tokens });
  return JSON.parse(content);
}

export { generate };
