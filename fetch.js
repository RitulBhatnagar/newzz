const axios = require("axios");
const cheerio = require("cheerio");

async function fetchData(url) {
  console.log("Starting to fetch article");
  const result = await axios.get(url);
  console.log(`Fetching data from ${url}...`);
  return cheerio.load(result.data);
}

async function fetchArticleData(article) {
  const $article = await fetchData(article.link);
  console.log(`Fetching article data for "${article.title}"...`);

  const content = $article("p").text().trim();
  const articlePublishedOn = $article("time").text().trim();

  const articleLastUpdatedOn = "N/A";
  const cleanedContent = content.replace(/\s+/g, " ").replace(/\n/g, "");

  article.content = cleanedContent;
  article.metadata.articlePublishedOn = articlePublishedOn;
  article.metadata.articleLastUpdatedOn = articleLastUpdatedOn;

  return article;
}

module.exports = { fetchData, fetchArticleData };
