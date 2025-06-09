const Parser = require("rss-parser");
const parser = new Parser();

module.exports.fetchNews = async (event) => {
  const feed = await parser.parseURL(
    "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
  );

  const articles = feed.items.slice(0, 10).map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
  }));

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ articles }),
  };
};

