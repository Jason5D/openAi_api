import "dotenv/config";
import OpenAI from "openai";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const openai = new OpenAI();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, "public")));

app.use(express.json());

app.post("/chat", async (req, res) => {
  const { messages } = req.body;
  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
    temperature: 0.2,
  });

  res.json(completion.choices[0].message);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


