import axios from "axios";

interface Message {
  role: string;
  content: string;
}

interface GenerateParams {
  messages?: Message[];
  temperature?: number;
  top_p?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
}

export async function generate({
  messages = [],
  temperature = 0,
  top_p = 1,
  presence_penalty = 0,
  frequency_penalty = 0,
}: GenerateParams): Promise<any> {
  const {
    data: {
      choices: [
        {
          message: { content },
        },
      ],
      usage: { prompt_tokens, completion_tokens },
    },
  } = await axios({
    method: "POST",
    url: process.env.AZURE_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AZURE_API_KEY}`,
    },
    data: {
      messages,
      temperature,
      top_p,
      presence_penalty,
      frequency_penalty,
    },
  });

  console.info({ prompt_tokens, completion_tokens });
  return JSON.parse(content);
}