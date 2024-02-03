const {Article} = require("../models/Article")   
class ArticleService{
async getArticles(filter, options, page){
    try{
       
        let limit = 20;
        const getArticles = await Article.find(filter, options).sort({__id : -1}).limit(limit*1).skip((page-1)*limit).exec();

        return getArticles;
    }
    catch(error){
      throw new Error(error)
    }
}
async countArticles(filter){    
    try{
        const count = await Article.find(filter).countDocuments();
        return count;
    }
    catch(error){
        throw new Error(error)
    }
}
async getSingleArticle(filter, options){    
    try{
        const article = await Article.findOne(filter, options);
        return article;
    }
    catch(error){
        throw new Error(error)
    }
}
async getArticleSources(){
    try{
        const articleSources = await Article.aggregate([
            {
               $group : {_id : "$metadata.articleSource", count : {$sum : 1}}
            },
            {
               $sort : {count : -1}
            }
          ])
          return articleSources;
    }
    catch(error){
        console.log("error in fetching the articleSources")
        throw new Error(error)
    }
}
}

module.exports = new ArticleService();