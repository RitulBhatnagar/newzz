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
  const contentParagraphs = $article(".pay-wall-content .article-body p")
    .toArray()
    .map((el) => {
      const textContent = $article(el).text().trim();
      // Exclude paragraphs that contain img or a tags
      if (
        !textContent.includes("<div") &&
        !textContent.includes("<img") &&
        !textContent.includes("<figure") &&
        !textContent.includes("<fbs-ticker") &&
        !textContent.includes("<fbs-ad")
      ) {
        return textContent;
      }
      return ""; // Return an empty string for paragraphs with img or a tags
    })
    .filter(Boolean);
  // const contentParagraphs = $article('.col-content .main.c-content p').toArray().map(el => $article(el).text().trim());
  let content = contentParagraphs.join("\n");  
  content = content.replace(/\s+/g, " ").replace(/\n/g, "");
  const MAX_WORDS = 500;
  function clipContentToWords(text, maxWords) {
    const words = text.split(/\s+/);
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return text;
  }

  // Clip the content to a maximum of 500 words
  content = clipContentToWords(content, MAX_WORDS);
  const currentDate = new Date();
  const options = { year: "numeric", month: "short", day: "numeric" };
  const articlePublishedOn = currentDate.toLocaleDateString("en-US", options);
  const articleLastUpdatedOn = "N/A";

  article.content = content;
  article.metadata.articlePublishedOn = articlePublishedOn;
  article.metadata.articleLastUpdatedOn = articleLastUpdatedOn;

  return article;
}

module.exports = { fetchData, fetchArticleData };
