const { fetchData, fetchArticleData } = require("./fetch");
const cheerio = require("cheerio");
const url = "https://blockworks.co/";
const uuid = require("uuid").v4;

async function fetchArticles() {

    const $ = await fetchData(url);
    console.log("Homepage loaded. Extracting article links...");

    const articleLinks = [];

    $("div.gap-10.px-10.py-5.divide-y.divide-gray-200.w-full section.flex.gap-3.py-5.w-full").each((i, element) => {
        const $element = $(element);
        // console.log($element.html);
        const relAttribute = $element.find("a").attr("rel");
        const targetAttribute = $element.find("a").attr("target");
    
    
        if (relAttribute !== "nofollow" && targetAttribute !== "_blank") {
            const title = $element.find("span.text-sm.font-semibold.font-headline").text();
            const link = $element.find("a").attr("href");
            const newLink  = `https://blockworks.co${link}`;
            
            const article = {
                articleId : uuid(),
                title,
                link:newLink,
                imageURI : '',
                translatedArticles: {},
                metadata: {
                    articleSource: "Blockworks",
                    articleBaseUrl: url,
                    articleTimeStampExtracted: Date.now(),
                    category: "crypto-blockchain",
                    articleMetrics: {
                        articleLiked:  Math.floor(Math.random() * (50 - 15)) + 15,
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
  
    const promises = articleChunks.map(async (chunk) => {
      const chunkArticles = await Promise.all(chunk.map((article) => fetchArticleData(article)));
      return chunkArticles;
  });
  
  
  const chunkedArticles = await Promise.all(promises);
  
  
  for (const chunkArticle of chunkedArticles) {
      articles.push(...chunkArticle);
  }
  
    console.log(
      `${articles.length} articles fetched and populated with content.`
    );
  
    return articles;
}

module.exports = { fetchArticles };
