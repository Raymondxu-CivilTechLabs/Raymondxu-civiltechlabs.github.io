// hot-aggregator.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

// -----------------------------------
// Helper: GitHub Trending
// -----------------------------------
async function fetchGitHubTrending() {
  const url = 'https://github.com/trending';
  const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const $ = cheerio.load(data);
  const repos = [];
  $('article.Box-row').each((i, el) => {
    const title = $(el).find('h1 a').text().trim().replace(/\s/g, '');
    const link = 'https://github.com' + $(el).find('h1 a').attr('href');
    const description = $(el).find('p').text().trim();
    const stars = $(el).find('a[href$="/stargazers"]').text().trim();
    repos.push({ title, link, description, source: 'GitHub', extra: `⭐${stars}` });
  });
  return repos.slice(0, 10);
}

// -----------------------------------
// Helper: 微博热搜
// -----------------------------------
async function fetchWeiboHot() {
  const url = 'https://s.weibo.com/top/summary';
  const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const $ = cheerio.load(data);
  const list = [];
  $('td.td-02 a').each((i, el) => {
    if (i >= 10) return false;
    const title = $(el).text().trim();
    const link = 'https://s.weibo.com' + $(el).attr('href');
    list.push({ title, link, source: 'Weibo', extra: '' });
  });
  return list;
}

// -----------------------------------
// Helper: 知乎热榜
// -----------------------------------
async function fetchZhihuHot() {
  const url = 'https://www.zhihu.com/hot';
  const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const hotList = [];
  // 知乎热榜 API 直接返回 JSON
  const match = data.match(/\"data\":(\{.*?\}),\"paging\"/s);
  if (match) {
    const json = JSON.parse(match[1]);
    if (json.topics) {
      json.topics.slice(0, 10).forEach(item => {
        hotList.push({
          title: item.target.title,
          link: 'https://www.zhihu.com/question/' + item.target.id,
          source: 'Zhihu',
          extra: ''
        });
      });
    }
  }
  return hotList;
}

// -----------------------------------
// API 路由
// -----------------------------------
app.get('/api/hot', async (req, res) => {
  try {
    const [github, weibo, zhihu] = await Promise.all([
      fetchGitHubTrending(),
      fetchWeiboHot(),
      fetchZhihuHot()
    ]);

    res.json({ github, weibo, zhihu });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hot data' });
  }
});

app.listen(PORT, () => console.log(`Hot aggregator running on port ${PORT}`));
