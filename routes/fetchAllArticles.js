const axios = require("axios");
const endpoints = require("../news-sources.json");
const NodeCache = require("node-cache");
const cache = new NodeCache({
  stdTTL: 60 * 60 * 24,
  checkperiod: 60 * 60 * 24,
});

const fetchFromSource = async (source, endpoint) => {
  console.log(`Fetching data from source: ${source}`);

  const cachedResponse = cache.get(endpoint);
  if (cachedResponse !== undefined) {
    console.log(`Using cached data for source: ${source}`);
    return cachedResponse;
  }

  console.log(`No cache found for source: ${source}. Making a new request.`);
  try {
    const response = await axios.get(endpoint);
    cache.set(endpoint, response.data);
    console.log(`Fetched and cached data for source: ${source}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch from source: ${source}`, error);
    return [];
  }
};

const fetchData = async (environment) => {
  console.log(`Fetching data for environment: ${environment}`);
  const sources = endpoints[environment][0];
  const filteredSources = Object.entries(sources).filter(
    ([key]) => key !== "fetchArticles"
  );

  console.log(`Starting to fetch data from ${filteredSources.length} sources`);

  
  const results = await Promise.all(
    filteredSources.map(([source, endpoint]) =>
      fetchFromSource(source, endpoint)
    )
  );

  const articles = results
    .filter((result) => result.length > 0) 
    .flat(); 

  console.log(`Fetched total of ${articles.length} articles from all sources`);

  return articles;
};

module.exports.handler = async (event, stage) => {
  console.log("Handler invoked");
  try {
    const articles = await fetchData(stage);

    console.log("Data fetched successfully");
    return {
      statusCode: 200,
      body: JSON.stringify(articles),
    };
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch articles" }),
    };
  }
};
