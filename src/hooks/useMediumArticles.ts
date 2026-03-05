import { useState, useEffect } from 'react';

export function useMediumArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/medium-articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return { articles, isLoading };
}
