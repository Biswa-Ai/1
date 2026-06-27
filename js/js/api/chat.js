/**
 * Edge Serverless Node Runtime Pipeline Core Execution Function
 * Protects system runtime configurations from raw browser exposure.
 */
const { OpenAI } = require("openai");

// Lazy initialization of the API wrapper instance to speed up cold starts
let openaiInstance = null;

module.exports = async (req, res) => {
    // Enforce API Routing Rules
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: `Method ${req.method} is rejected by system edge.` });
    }

    try {
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: "System Configuration Deficit: Core Token Variable Missing." });
        }

        if (!openaiInstance) {
            openaiInstance = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
            });
        }

        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Empty execution request payloads are blocked." });
        }

        // Trigger safe structural parameters via OpenAI chat engines
        const completion = await openaiInstance.chat.completions.create({
            model: "gpt-4o", // High performance baseline for 2026 operations
            messages: [
                { role: "system", content: "You are BISWA AI 2026, a futuristic, highly advanced, beautiful assistant developed by Biswa. Always structure engineering logic clearly, utilizing clean markdown markup elements and direct insights." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        const replyContent = completion.choices[0].message.content;
        
        return res.status(200).json({ reply: replyContent });

    } catch (error) {
        console.error("Runtime Edge Execution Hazard Intercepted:", error);
        return res.status(500).json({ error: "Internal Gateway Routing Disruption on Core API Execution Pipeline." });
    }
};
