const { fetchData, fetchArticleData } = require("./fetch");
const uuid = require("uuid").v4;

const URL = "https://www.forbes.com/digital-assets/news/";
async function fetchArticles() {
  const $ = await fetchData(URL,{
    headers: {
      "User-Agent": "Chrome/51.0.2704.103",
    },
  });
  console.log("Homepage loaded. Extracting article links...");
  const articleLinks = [];

  $(".FeaturedNews_tabContainer__tSR6W .EditorsPicks_tabContent__YaCf9 .EditorsPicks_cardArticle__TUwzk").each((i, element) => {
    const title = $(element).find(".wQwN2-r6 span").text().trim();
    const link = $(element).find(".wQwN2-r6 a").attr("href");
    const author = $(element)
      .find(".wQwN2-r6 .-GPe57GX.Q5lCM4EP ._84Z--AMj")
      .text()
      .trim();

    const article = {
      articleId: uuid(),
      title,
      link,
      imageURI: '',
      translatedArticles: {},
      metadata: {
        articleSource: "forbes",
        articleBaseUrl: URL,
        articleTimeStampExtracted: Date.now(),
        category: "crypto-blockchain",
        author,
        tags: '',
        articleMetrics: {
          articleLiked: Math.floor(Math.random() * 20),
          articleDisliked: 0,
        },
      },
    }; 

    console.log(article)

    articleLinks.push(article);
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
