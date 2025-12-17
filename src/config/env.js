import dotenv from "dotenv";

dotenv.config();

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID,
  },
  model: {
    default: "gpt-5-nano",
    advanced: "gpt-5-turbo",
  },
};
