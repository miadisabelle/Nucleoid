import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY as string,
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
  model = "claude-3-5-sonnet-20240620",
  messages = [],
  temperature = 0,
  max_tokens = 2048,
}: GenerateParams): Promise<any> {
  const {
    content: [{ text }],
    usage,
  } = await anthropic.messages.create({
    model,
    messages,
    temperature,
    max_tokens,
  });

  console.info(usage);
  return JSON.parse(text);
}
