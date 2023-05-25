# Forbes Crypto Web Scraper

This project is a web scraping application that fetches articles from the Forbes website and sends them to an AWS SQS queue for further processing.

## Prerequisites

- Node.js 14.x
- AWS account
- Serverless Framework

## Installation

1. Clone the repository.
2. Install the dependencies by running the following command:

   ```bash
   npm install
   ```

## Usage

To run the web scraping application locally, use the following command:

- sls offline

This will start the application on your local machine.

## Deployment

To deploy the application to AWS Lambda, use the following command:

- sls deploy --stage <stage>

Replace <stage> with the desired deployment stage (e.g., dev, prod).

# Configuration

Before deploying the application, make sure to configure the following environment variables:

- QUEUE_URL: The URL of the AWS SQS queue where the articles will be sent.
- STAGE: The deployment stage (default is tst).
  These environment variables can be set in the serverless.yml file.

## Endpoints

The application provides the following endpoint:

- GET /fetch-articles: Fetches articles from the Forbes website and sends them to the configured SQS queue.

## Response Model

The response from the /fetch-articles endpoint will have the following structure:

```
{
  "message": "Sent <number> articles to queue"
}
```

## Sample Response

Here's an example of a sample response:

```
{
    "articleId": "27470be4-2c1e-448d-bd1a-83771ad52504",
    "title": "Cryptocurrency Bill Will Mitigate Key Risks For Web3 Investors, If It Can Pass",
    "link": "https://www.forbes.com/sites/haileylennon/2022/06/09/cryptocurrency-bill-will-mitigate-key-risks-for-web3-investors-if-it-can-pass/",
    "translatedArticles": {},
    "metadata": {
        "articleSource": "forbes",
        "articleBaseUrl": "https://www.forbes.com/crypto-blockchain/",
        "articleTimeStampExtracted": 1685045389981,
        "category": "crypto-blockchain",
        "author": "Hailey Lennon",
        "articlePublishedOn": "Jun 9, 2022,01:01pm EDT",
        "articleLastUpdatedOn": "N/A"
    },
    "content": "Senator Cynthia Lummis, a Republican from Wyoming, ..."
}
```

The response includes the articleId, title, link, translatedArticles, metadata, and content fields.
