# News Collector API

## Overview

This project is a Serverless AWS Lambda function in Node.js serving as a News Aggregator API. It fetches and processes articles from external news sources.

## Installation

Ensure Node.js and npm are installed. Clone the repository and run:

```bash
git clone <repository>
cd <repository>
npm install

##  Deployment

Use the Serverless Framework to deploy the function:

sls deploy --stage prod

## Structure
1. index.js: Main entry point.
2. routes/livecheck.js: Responds with a status message.
3. routes/fetchAllArticles.js: Fetches all news articles from configured sources.
4. routes/fetchFilteredArticles.js: Fetches articles, groups similar ones, and returns the top 20%.


## Sample Responses

### /fetchFilteredArticles

[
  {
    "articleId": "3dd2bd70-8a40-460e-96b4-9fa97fd386bf",
    "title": "Sam Bankman-Fried Seeks Dismissal Of Nearly All Criminal Charges Against Him",
    "link": "https://www.forbes.com/video/6327098055112/",
    // ...
    "ArticleSimilarFrom": [
      {
        "title": "Sam Bankman-Fried Pleads Not Guilty",
        "source": "decrypt"
        // ...
      },
      {
        "title": "Sam Bankman-Fried Says Criminal Charges Against Him Should Be Dismissed",
        "source": "newsbtc"
        // ...
      }
    ]
    // More article sources
  }
]

### /fetchAllArticles
[
  {
    "articleId": "d74d31dc-35fb-4e35-9c5a-141624abe03f",
    "title": "Digital Art Collective Wildxyz Introduces Curatorial Board to Grow Experiential Art Program",
    "link": "https://www.coindesk.com/web3/2023/06/08/digital-art-collective-wildxyz-introduces-curatorial-board-to-grow-experiential-art-program/",
    "translatedArticles": {},
    // ...
    "metadata": {
      "articleSource": "coindesk",
      "articleBaseUrl": "https://www.coindesk.com/web3/",
      "articleTimeStampExtracted": 1686227486974,
      "category": "web3",
      "author": "Cam Thompson",
      "articlePublishedOn": "Jun 8, 2023, at 12:00 p.m. UTC",
      "articleLastUpdatedOn": ""
    },
    "content": "Web3Digital Art ..."
  }
  // More article objects
]
