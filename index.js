const { fetchArticles } = require("./extract");
const AWS = require("aws-sdk");

const sqs = new AWS.SQS({ region: "us-east-1" });
const stage = process.env.STAGE || "tst";
const queueUrl = `https://sqs.us-east-1.amazonaws.com/832120222718/how-3-fetchArticles-${stage}`;

async function handler(event, context) {
  console.log(`Welcome to forbes ${stage} enviornment!`);
  try {
    const articles = await fetchArticles();
    console.log(`Fetched ${articles.length} articles successfully`);

    const promises = articles.map(async (article) => {
      const params = {
        MessageBody: JSON.stringify(article),
        QueueUrl: queueUrl,
      };
      await sqs.sendMessage(params).promise();
      console.log(`Sent article "${article.title}" to queue`);
    });

    await Promise.all(promises);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Sent ${articles.length} articles to queue`,
      }),
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
