import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/generate-script", async (req, res) => {
    const { plot } = req.body;

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Write a detailed movie script based on this plot: ${plot}`
                }
            ]
        });

        res.json({ script: response.choices[0].message.content });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "API Error!" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
