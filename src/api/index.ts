import { MessageType } from "../store";

export const sendMessageToGpt = async (messages: MessageType[]) => {
  const apiKey = localStorage.getItem("apiKey");
  const params = {
    model: "gpt-3.5-turbo-1106",
    messages,
  };
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
  });

  console.log("res", res);

  return { code: res.status, data: await res.json() };
};
