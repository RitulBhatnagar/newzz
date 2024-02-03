const { fetchData, fetchArticleData } = require("./fetch");
const uuid = require("uuid").v4;

const URL = "https://decrypt.co/news";

async function fetchArticles() {
  const $ = await fetchData(URL);
  console.log("Homepage loaded. Extracting article links...");
  const articleLinks = [];

  $("article.linkbox, article.w-full").each((i, element) => {
    const title = $(element).find("a.linkbox__overlay").text().trim();
    const link =
      "https://decrypt.co" + $(element).find(".linkbox__overlay").attr("href");
    const category = $(element).find("p.text-cc-pink-2").text().trim(); 

    const currentDate = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const articlePublishedOn = currentDate.toLocaleDateString('en-US', options);

    // Check if the link starts with "https://decrypt.co/price/"
    if (!link.startsWith("https://decrypt.co/price/")) {
      const article = {
        articleId: uuid(),
        title,
        link,
        imageURI: "",
        translatedArticles: {},
        metadata: {
          articleSource: "decrypt",
          articleBaseUrl: URL,
          articleTimeStampExtracted: Date.now(),
          category,
          articlePublishedOn,
          tags: "",
          articleMetrics: {
            articleLiked: Math.floor(Math.random() * 20),
            articleDisliked: 0,
          },
        },
      };

      articleLinks.push(article);
    }
  });

  console.log(`${articleLinks.length} article links extracted.`);

  const articleChunks = [];

  while (articleLinks.length > 0) {
    articleChunks.push(articleLinks.splice(0, 10));
  }

  console.log(`${articleChunks.length} article chunks created.`);

  const articles = [];

  for (const chunk of articleChunks) {
    const promises = chunk.map((article) => fetchArticleData(article));
    const chunkArticles = await Promise.all(promises);
    articles.push(...chunkArticles);
  }

  console.log(
    `${articles.length} articles fetched and populated with content.`
  );

  return articles;
}

module.exports = { fetchArticles };
