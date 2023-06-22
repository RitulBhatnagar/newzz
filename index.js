const { fetchArticles } = require("./extract");

const stage = process.env.STAGE || "tst";

async function handler(event, context) {
  console.log(`Welcome to forbes ${stage} enviornment!`);
  try {
    const articles = await fetchArticles();
    console.log(`Fetched ${articles.length} articles successfully`);

    return {
      statusCode: 200,
      body: JSON.stringify(articles),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

module.exports = { handler };
