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

  const content = $article("p.font-meta-serif-pro").text().trim();
  const author = $article("span.font-akzidenz-grotesk a").text().trim();
   // Adjust this selector as needed
  const imageUrl  = $article('figure img').attr('src');
  const articleSubheading = $article("h2.font-akzidenz-grotesk").text().trim()
  console.log("articleSUbehading", articleSubheading)
  const articleLastUpdatedOn = "N/A";
  const cleanedContent = content.replace(/\s+/g, " ").replace(/\n/g, "");

  article.content = cleanedContent;
  article.imageURI = imageUrl;
  article.subHeading = articleSubheading
  article.metadata.author = author;
  article.metadata.articleLastUpdatedOn = articleLastUpdatedOn;

  return article;
}

module.exports = { fetchData, fetchArticleData };
