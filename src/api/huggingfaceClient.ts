type HFResponse =
  | Array<{ generated_text?: string; summary_text?: string } | string>
  | { error?: string };

const HF_KEY = (process.env.HUGGING_FACE_API_KEY ||
  (globalThis as any).HUGGING_FACE_API_KEY) as string | undefined;

export async function hfInference(
  model: string,
  input: string,
  options?: Record<string, any>,
) {
  if (!HF_KEY) {
    throw new Error("Missing Hugging Face API key (HUGGING_FACE_API_KEY)");
  }

  const endpoint = `https://api-inference.huggingface.co/models/${model}`;
  const body: any = { inputs: input };
  if (options) body.parameters = options;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = (await res.json()) as HFResponse | { error?: string };

  if (!res.ok) {
    const msg =
      (json && (json as any).error) || `HF inference error ${res.status}`;
    throw new Error(msg as string);
  }

  // Response shapes vary by model; try to extract text
  try {
    // some models return [{generated_text: '...'}]
    if (Array.isArray(json)) {
      const first = json[0];
      if (typeof first === "string") return first;
      if ((first as any).generated_text) return (first as any).generated_text;
      if ((first as any).summary_text) return (first as any).summary_text;
    }
    // fallback
    return JSON.stringify(json);
  } catch (e) {
    return JSON.stringify(json);
  }
}
