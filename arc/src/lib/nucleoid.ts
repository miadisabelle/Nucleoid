import axios from "axios";

export async function run(sessionId: string, data: unknown): Promise<unknown> {
  const response = await axios({
    method: "POST",
    url: `https://nuc.land/sandbox/terminal/${sessionId}`,
    headers: {
      "Content-Type": "application/javascript",
    },
    data,
  });

  return response.data.result;
}
