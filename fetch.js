const axios = require("axios");
const cheerio = require("cheerio");

async function fetchData(url){
    console.log(url);
   try{
    const result = await axios.get(url); 
    return cheerio.load(result.data);
   }catch(error){
    console.log(error);
    console.error(`error in fetching the ${url}`);
   }
}

async function fetchArticleData(article){
    try {
      const $article = await fetchData(article.link);
      const content = $article("p").text().trim();
        const cleanedContent = content.replace(/\s+/g, " ").replace(/\n/g, "");
        const articleSubheading = $article('p.text-md.lg\\:text-lg.text-left.text-dark').text().trim();
        const currentDate = new Date();
        const options = { year: "numeric", month: "short", day: "numeric" };
        const articlePublishedOn = currentDate.toLocaleDateString('en-US', options);
        const imageSrc = $article("img.object-cover").attr('src');
        const fullimageSrc = `https://blockworks.co${imageSrc}`
        const articleLastUpdatedOn = "N/A";
        article.imageURI = fullimageSrc;
        article.content = cleanedContent;
        article.subHeading = articleSubheading;
        article.metadata.articlePublishedOn = articlePublishedOn;
        article.metadata.articleLastUpdatedOn = articleLastUpdatedOn;
        return article;
    
      } catch (error) {
        console.error("Error fetching article data", error);
      }
}

module.exports = {fetchArticleData, fetchData};