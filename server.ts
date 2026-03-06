import express from "express";
import { createServer as createViteServer } from "vite";
import Parser from "rss-parser";

async function startServer() {
  const app = express();
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
