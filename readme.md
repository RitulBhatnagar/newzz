# Decrypt Web Scraper Service

Decrypt Web Scraper is an AWS-based serverless application written in Node.js. This service scrapes information from the [Decrypt Web3 portal](https://decrypt.co/news) and returns the article data as a JSON response.

## Pre-requisites

- Node.js v14.x and npm (usually bundled with Node.js)
- Configured AWS CLI with Admin privileges
- Serverless Framework

## Setup Instructions

1. Install Serverless Framework globally:

```bash
npm install -g serverless
```

2. Install the project dependencies:

```bash
npm install
```

## Deployment Steps

To deploy the service, execute:

```bash
sls deploy
```

Upon successful deployment, you should see an output similar to this:

```bash
Serverless: Stack update finished...
Service Information
service: Decrypt-web-scrapper
stage: tst
region: us-east-1
stack: Decrypt-web-scrapper-tst
resources: 10
api keys:
  None
endpoints:
  GET -  https://phr2v83cuk.execute-api.us-east-1.amazonaws.com/tst/fetch-articles
functions:
  fetchArticles: Decrypt-web-scrapper-tst-fetchArticles
layers:
  None
```

## Running Tests

Execute your tests locally using:

```bash
npm test
```

## Usage

Access your deployed service by making a GET request:

```bash
curl  https://phr2v83cuk.execute-api.us-east-1.amazonaws.com/tst/fetch-articles
curl  https://9una8ongg1.execute-api.us-east-1.amazonaws.com/prd/fetch-articles
```

The service will return a JSON object containing the scraped article data.

## JSON Response Structure

The `fetchArticles` function retrieves and processes data from each article found on the Decrypt Web3 page. The article data is structured as follows:

```json
{
  "articleId": "UUID",
  "title": "Article title",
  "link": "URL",
  "imageURI": "Image URL",
  "translatedArticles": {},
  "metadata": {
    "articleSource": "Decrypt",
    "articleBaseUrl": "Base URL",
    "articleTimeStampExtracted": "Extraction timestamp",
    "category": "Category",
    "tags": "Tags",
    "articleMetrics": {
      "articleLiked": "Likes count",
      "articleDisliked": "Dislikes count"
    },
    "author": "Author Name",
    "articlePublishedOn": "Publication Date",
    "articleLastUpdatedOn": "Last Update Date"
  },
  "content": "Article content"
}
```

## Clean Up

To undeploy the service:

```bash
sls remove
```

## Contributing

Contributions are welcome. Please fork the repository and create a pull request for any bug fixes, features or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Credits

Many thanks to Decrypt for providing informative articles.

**Disclaimer:** Ensure that your AWS credentials are correctly configured as per the [AWS CLI User guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html). The URLs and values provided in this README are for example purposes only. The provided code does not come with any guarantees or maintenance agreement.
