module.exports = {
  siteUrl: 'https://hmtc-its.com',
  generateRobotsTxt: true,
  exclude: [
    '/login*',
    '/register*',
    '/forgot-password*',
    '/change-password*',
    '/coming-soon*',
  ],
  changefreq: 'daily',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'AI2Bot',
        disallow: '/',
      },
      {
        userAgent: 'Amazonbot',
        disallow: '/',
      },
      {
        userAgent: 'amazon-kendra',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Applebot',
        disallow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        disallow: '/',
      },
      {
        userAgent: 'AwarioRssBot',
        disallow: '/',
      },
      {
        userAgent: 'AwarioSmartBot',
        disallow: '/',
      },
      {
        userAgent: 'Brightbot',
        disallow: '/',
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        disallow: '/',
      },
      {
        userAgent: 'Diffbot',
        disallow: '/',
      },
      {
        userAgent: 'DuckAssistBot',
        disallow: '/',
      },
      {
        userAgent: 'FacebookBot',
        disallow: '/',
      },
      {
        userAgent: 'FriendlyCrawler',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'iaskspider/2.0',
        disallow: '/',
      },
      {
        userAgent: 'ICC-Crawler',
        disallow: '/',
      },
      {
        userAgent: 'img2dataset',
        disallow: '/',
      },
      {
        userAgent: 'Kangaroo Bot',
        disallow: '/',
      },
      {
        userAgent: 'LinerBot',
        disallow: '/',
      },
      {
        userAgent: 'MachineLearningForPeaceBot',
        disallow: '/',
      },
      {
        userAgent: 'Meltwater',
        disallow: '/',
      },
      {
        userAgent: 'meta-externalagent',
        disallow: '/',
      },
      {
        userAgent: 'meta-externalfetcher',
        disallow: '/',
      },
      {
        userAgent: 'Nicecrawler',
        disallow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        disallow: '/',
      },
      {
        userAgent: 'omgili',
        disallow: '/',
      },
      {
        userAgent: 'omgilibot',
        disallow: '/',
      },
      {
        userAgent: 'PanguBot',
        disallow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        disallow: '/',
      },
      {
        userAgent: 'Perplexity-User',
        disallow: '/',
      },
      {
        userAgent: 'PetalBot',
        disallow: '/',
      },
      {
        userAgent: 'PiplBot',
        disallow: '/',
      },
      {
        userAgent: 'QualifiedBot',
        disallow: '/',
      },
      {
        userAgent: 'Scoop.it',
        disallow: '/',
      },
      {
        userAgent: 'Seekr',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot-OCOB',
        disallow: '/',
      },
      {
        userAgent: 'Sidetrade indexer bot',
        disallow: '/',
      },
      {
        userAgent: 'Timpibot',
        disallow: '/',
      },
      {
        userAgent: 'VelenPublicWebCrawler',
        disallow: '/',
      },
      {
        userAgent: 'Webzio-Extended',
        disallow: '/',
      },
      {
        userAgent: 'YouBot',
        disallow: '/',
      },
    ],
  },
  priority: 0.7,
};
