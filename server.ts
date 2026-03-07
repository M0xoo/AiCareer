import express from "express";
import { createServer as createViteServer } from "vite";
import Parser from "rss-parser";
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { MOKHLES_DATA } from "./src/constants";
import fs from "fs";
import path from "path";

const tools: { functionDeclarations: FunctionDeclaration[] }[] = [{
  functionDeclarations: [
    {
      name: "render_experience",
      description: "Displays Mokhles Elheni's professional work experience and career timeline.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          filter: { type: Type.STRING, description: "Optional keyword to filter experience (e.g. 'Amazon', 'Observability')" }
        }
      }
    },
    {
      name: "render_skills",
      description: "Displays Mokhles Elheni's technical skills, programming languages, and expertise grid.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: "Optional category to highlight (e.g. 'Backend', 'GenAI')" }
        }
      }
    },
    {
      name: "render_contact",
      description: "Displays contact information and social links for Mokhles Elheni.",
      parameters: { type: Type.OBJECT, properties: {} }
    },
    {
      name: "render_github",
      description: "Displays Mokhles Elheni's latest open-source projects and GitHub repositories.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          limit: { type: Type.NUMBER, description: "Number of repositories to show (default 4)" }
        }
      }
    },
    {
      name: "provide_suggestions",
      description: "Provides 3-4 smart, conversation-aware follow-up questions or suggestions for the user to click.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of 3-4 short, relevant follow-up questions."
          }
        },
        required: ["suggestions"]
      }
    }
  ]
}];

let agentKnowledge = "";
try {
  agentKnowledge = fs.readFileSync(path.join(process.cwd(), "agent_knowledge.md"), "utf-8");
} catch (e) {
  console.warn("Could not load agent_knowledge.md");
}

const SYSTEM_INSTRUCTION = `
You are the AI Career Agent for Mokhles Elheni, a Senior Software Engineer at Amazon.
Talk as if you are Mokhles Elheni. Use I, me, my, etc.
Your goal is to represent Mokhles professionally and help users (recruiters, managers, collaborators) learn about your background.

CONTEXT ABOUT MOKHLES:
${JSON.stringify(MOKHLES_DATA, null, 2)}

ADDITIONAL KNOWLEDGE:
${agentKnowledge}


GitHub Profile: https://github.com/M0xoo

GUIDELINES:
1. Be professional, helpful, and concise.
2. Use the provided tools to display rich UI components when relevant to the user's query.
3. ALWAYS call 'provide_suggestions' at the end of your response to give the user relevant next steps.
4. If the user asks about work experience, career path, or "where have you worked", call 'render_experience'.
5. If the user asks about skills, technologies, or "what do you know", call 'render_skills'.
6. If the user asks how to contact you or for your LinkedIn/Email, call 'render_contact'.
7. If the user asks about open source, GitHub, or "what have you built", call 'render_github'.
8. You can combine text responses with multiple tool calls.
9. Use Markdown for text formatting in your responses.
10. If asked about something not in the context, politely say you don't have that specific information but can talk about your engineering career.
`;

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = Number(process.env.PORT) || 3000;
  const parser = new Parser();

  // API Route for Medium Articles
  app.get("/api/medium-articles", async (req, res) => {
    try {
      const feed = await parser.parseURL("https://medium.com/feed/@emokhles");
      const articles = feed.items.map(item => ({
        title: item.title,
        link: item.link,
        date: item.pubDate,
        categories: item.categories,
        snippet: item.contentSnippet?.substring(0, 160) + "..."
      }));
      res.json(articles);
    } catch (error) {
      console.error("Error fetching Medium feed:", error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  // API Route for GitHub Repos
  app.get("/api/github-repos", async (req, res) => {
    try {
      const response = await fetch("https://api.github.com/users/M0xoo/repos?sort=updated&per_page=6", {
        headers: {
          "User-Agent": "Portfolio-App"
        }
      });
      if (!response.ok) throw new Error("GitHub API error");
      const repos = await response.json();
      const formattedRepos = repos.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        updatedAt: repo.updated_at,
        forks: repo.forks_count
      }));
      res.json(formattedRepos);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      res.status(500).json({ error: "Failed to fetch repositories" });
    }
  });

  // API Route for Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: tools,
        },
      });

      const response = await chat.sendMessage({
        message: message,
      });

      res.json({
        text: response.text,
        functionCalls: response.functionCalls
      });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      res.status(500).json({ error: "Failed to fetch AI response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
