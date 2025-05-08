import axios from "axios";

export async function generate({ messages = [] }: { messages?: { content: string }[] }) {
  const { data } = await axios({
    method: "POST",
    url: `http://${process.env.LLAMA_HOST}/generate`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      input: messages.map((m) => m.content).join("\n"),
    },
  });

  return data;
}
