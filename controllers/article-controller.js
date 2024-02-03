const dbConnection = require("../dbConnection/db");
const articleService = require("../services/article-service");
class ArticleController{
  async getArticles(req, res){
    try{
        
        const{page} = req.query;
        if(!page){
            return res.status(400).json({message : "Missing query params"})
        }
        dbConnection();
        let options = {
            title : 1,
            articleId : 1, 
            imageURI : 1,
            subHeading : 1
        }
        const getArticles = await articleService.getArticles({}, options, page);
       const articleCount = await articleService.countArticles({});
        return res.status(200).json({
            getArticles,
            totalPages : Math.ceil(articleCount/20),
            currentPage : page
        });
      }
      catch(error){
       console.log(error);
       return res.status(500).json("Internal server error")
      }
  }
  async getArticle(req, res){   
    try{
      const {articleTitle} = req.query;
      if(!articleTitle){    
        return res.status(400).json({message : "Missing query params"})
      }
      dbConnection();
      let filter = {$text : {$search : articleTitle}};
      let options = { __v: 0, __id: 0};
      const getArticle = await articleService.getSingleArticle(filter, options);
      return res.status(200).json(getArticle);
    }
    catch(error){
        console.log(error); 
        return res.status(500).json("Internal server error")
    }
  }
  async getArticleFromSources(req,res){
    try{
      const {source, page} = req.query;
      dbConnection();
      let articles;
      if(!source){
         articles = await articleService.getArticleSources();
      }
      else if(source && page){
        let filter = {"metadata.articleSource" : source};
        let options = {
            title : 1,
            articleId : 1, 
            imageURI : 1,
            subHeading : 1
        }
        articles = await articleService.getArticles(filter, options, page);
      }
      
      return res.status(200).json(articles);
    }
    
    catch(error){
        console.log(error)
      return res.status(500).json({message : "Internal server error"})
    }
  }
}
module.exports = new  ArticleController();