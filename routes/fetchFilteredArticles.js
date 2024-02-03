const axios = require('axios');
const natural = require('natural');
const endpoints = require('../news-sources.json');
const TfIdf = natural.TfIdf;

const similarityThreshold = 0.72;

const isSimilarToGroup = (title, group) => {
  const groupTitles = group.ArticleSimilarFrom.map((article) => article.title);
  groupTitles.push(group.title);

  for (const groupTitle of groupTitles) {
    const similarity = natural.JaroWinklerDistance(title, groupTitle, true);
    if (similarity > similarityThreshold) {
      return true;
    }
  }
  return false;
};

const groupSimilarArticles = (articles) => {
  const groupedArticles = [];

  articles.forEach((article, i) => {
    let isGrouped = false;
    let groupIndex;

    for (let index = 0; index < groupedArticles.length; index++) {
      if (isSimilarToGroup(article.title, groupedArticles[index])) {
        isGrouped = true;
        groupIndex = index;
        break;
      }
    }

    if (isGrouped) {
      groupedArticles[groupIndex].ArticleSimilarFrom.push({
        title: article.title,
        source: article.metadata.articleSource,
        articleId: article.articleId,
      });
    } else {
      groupedArticles.push({
        ...article,
        ArticleSimilarFrom: [],
      });
    }
  });

  return groupedArticles;
};

const filterArticles = (articles) => {
  return articles
    .filter((article) => article.title && article.content)
    .filter((article, index, self) => {
      return (
        self.findIndex((a) => a.title === article.title) === index
      );
    });
};

exports.handler = async (event) => {
  try {
    console.log('Handler invoked');
    const stage = process.env.STAGE || 'tst';
    console.log(`Stage: ${stage}`);
    const sources = endpoints[stage][0].fetchArticles;
    console.log(sources);
    const response = await axios.get(sources);
    console.log(response);

    console.log('Fetched all articles from the API');
    const allArticles = response.data;
    

    const articles = await filterArticles(allArticles);
    
    const groupedArticles =  groupSimilarArticles(articles);

    console.log(groupedArticles);

    const groupedAndSortedArticles = groupedArticles
      .filter((group) => group.ArticleSimilarFrom.length >= 1)
      .sort((group1, group2) => {
        const group1Sources = new Set(
          group1.ArticleSimilarFrom.map((article) => article.source)
        );
        group1Sources.add(group1.source);

        const group2Sources = new Set(
          group2.ArticleSimilarFrom.map((article) => article.source)
        );
        group2Sources.add(group2.source);

        return group2Sources.size - group1Sources.size;
      });

    console.log('Finished grouping and sorting articles');
    return {
      statusCode: 200,
      body: JSON.stringify(groupedAndSortedArticles),
    };
  } catch (error) {
    console.error('Failed to fetch articles');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch articles' }),
    };
  }
};
