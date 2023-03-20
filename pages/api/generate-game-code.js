
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const defaultPrompt = `You are a javascript game code generator that only answers with javascript code that I will insert in my 1024x860 px canvas with the id gameCanvas to run. Don't answer me that the game can't be in a single response.

Your answers must follow these requirements:
- The game should be interactible.
- The canvas is already on my html.
- Give me only the javascript code and nothing else.
- The code should be ready to be run on my html page.
- I want to use your output directly in my app.
- The game shouldn't have any instructions or depend on any external resources like images or scripts.
- Base the game on this prompt: `;

const promptCreator = (description) => {
    const prompt = [
        {
            role: 'system',
            content: "You are a javascript game code generator that only answers with javascript code that I will insert in my 1024x860 px canvas with the id gameCanvas to run. Give me only the javascript code and nothing else. Don't send any decorations like ``javascript or ```js in the beggining either.",
        },
        {
            role: 'user',
            content: defaultPrompt,
        },
        {
            role: 'user',
            content: "Make me a game with this description " + description,
        },
    ];
    return prompt;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const gameDescription = req.body.gameDescription;

    try {

        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: promptCreator(gameDescription),
            max_tokens: 2048,
            temperature: 0.7,
        });
        const code = response.data.choices[0].message.content.trim();
        console.log(code);
        res.status(200).json({ code });
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method not allowed
    console.error(error);

  }
}