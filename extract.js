const { fetchData, fetchArticleData } = require("./fetch");
const uuid = require("uuid").v4;

const URL = "https://www.forbes.com/crypto-blockchain/";
async function fetchArticles() {
  const $ = await fetchData(URL);
  console.log("Homepage loaded. Extracting article links...");
  const articleLinks = [];

  $("div._9VbVPOdt").each((i, element) => {
    const title = $(element).find("h2.u00AMdzw span.ULACyEdG").text().trim();
    const link = $(element).find("a.UZhxnK9k").attr("href");
    const author = $(element)
      .find("div.-GPe57GX.Q5lCM4EP a._84Z--AMj")
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
      },
    };

    articleLinks.push(article);
  });

  $(".K9l0sXwD._48Nq31T2.Zci514UN.byline").each((index, element) => {
    const $element = $(element);

    const title = $element.find("h3.EKqpiIkt a._5ncu0TWl").text();
    const author = $element
      .find(".-GPe57GX.Q5lCM4EP.xeEyB3Bw a._84Z--AMj")
      .text();
    const link = $element.find("h3.EKqpiIkt a._5ncu0TWl").attr("href");

    const article = {
      articleId: uuid(),
      title,
      link,
      translatedArticles: {},
      metadata: {
        articleSource: "forbes",
        articleBaseUrl: URL,
        articleTimeStampExtracted: Date.now(),
        category: "crypto-blockchain",
        author,
      },
    };

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
