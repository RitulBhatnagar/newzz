const fetchAllArticlesHandler = require("./routes/fetchAllArticles");
const fetchFilteredArticlesHandler = require("./routes/fetchFilteredArticles");
module.exports.handler = async (event) => {
  const{path} = event;
  const stage = process.env.STAGE || "tst";
  if(path === "/fetchArticles"){
    return fetchAllArticlesHandler.handler(event, stage)
  }
  if(path === "/fetchFilteredArticles"){
    return fetchFilteredArticlesHandler.handler(event, stage)
  }
  return{
    statusCode:404,
    body : JSON.stringify({error : "Endpoint not found"})
  }
};
