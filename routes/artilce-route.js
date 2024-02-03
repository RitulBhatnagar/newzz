const articleController = require("../controllers/article-controller");

const router = require("express").Router();

router.get("/articles", articleController.getArticles);
router.get("/article", articleController.getArticle)
router.get("/getSources", articleController.getArticleFromSources);
module.exports = router;
