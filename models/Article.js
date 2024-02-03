const mongoose = require("mongoose");
const SimilarArticleSchema = mongoose.Schema({
  title: String,
  source: String,
  articleId: String,
});

const MetadataSchema = mongoose.Schema({
  articleSource: String,
  articleBaseUrl: String,
  articleTimeStampExtracted: Number,
  category: String,
  articlePublishedOn: String,
  author: String,
  tags: [String],
  articleLastUpdatedOn: String,
  articleMetrics: {
    articleLiked: Number,
    articleDisliked: Number
  },
  likes : [{type : String, ref : "User"}],
  dislikes : [{type : String, ref : "User"}]
});

const TranslatedArticleSchema = mongoose.Schema({
  translatedArticleId: String,
  translatedArticle: String,
  toPublish: Boolean,
  promptUsed: String
});

const ArticleSchema = mongoose.Schema({
  articleId: { type: String, required: true, unique: true },
  title: String,
  link: String,
  imageURI: String,
  translatedArticles: {
    prompt1: [TranslatedArticleSchema],
    prompt2: [TranslatedArticleSchema],
    prompt3: [TranslatedArticleSchema],
    prompt4: [TranslatedArticleSchema]
  },
  metadata: MetadataSchema,
  content: String,
  ArticleSimilarFrom: [SimilarArticleSchema],
  subHeading : String
});

// Create mongoose model for the Article 
const Article = mongoose.model("articles", ArticleSchema);
module.exports = {Article}
