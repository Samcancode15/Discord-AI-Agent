import config from "@/config/config";

export async function fetchResponse(prompt: string): Promise<string | null> {
  const response = await fetch(`${config.OLLAMA_API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.OLLAMA_MODEL_NAME,
      messages: [
        {
          role: "system",
          content: config.BASE_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    }),
  });

  if (!response.ok) {
    console.error(`Ollama Error ${response.status}: ${await response.text()}`);
    return null;
  }

  const data = await response.json();
  console.log(data.message?.content);
  return data.message?.content || null;
}
