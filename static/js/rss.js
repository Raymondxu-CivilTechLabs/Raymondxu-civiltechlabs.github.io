// ========== RSS Aggregator ==========

// 使用第三方 RSS → JSON（原型阶段）
// 后期你可以替换成自己的 /api/rss
const RSS_API = "https://api.rss2json.com/v1/api.json?rss_url=";

function addRssFeed() {
  const input = document.getElementById("rss-input");
  const url = input.value.trim();
  if (!url) return;

  fetchFeed(url);
  saveRssUrl(url);
  input.value = "";
}

function fetchFeed(url) {
  fetch(RSS_API + encodeURIComponent(url))
    .then(res => res.json())
    .then(data => {
      if (data.status !== "ok") return;
      renderRssModule(data);
    })
    .catch(err => console.error("RSS error:", err));
}

function renderRssModule(feed) {
  const container = document.getElementById("rss-modules");

  const div = document.createElement("div");
  div.className = "rss-module mb-3";

  div.innerHTML = `
    <h4 class="mb-2">${feed.feed.title}</h4>
    <ol>
      ${feed.items.slice(0, 5).map(item => `
        <li>
          <a href="${item.link}" target="_blank">
            ${item.title}
          </a>
        </li>
      `).join("")}
    </ol>
  `;

  container.appendChild(div);
}

// ===== localStorage =====

function saveRssUrl(url) {
  let list = JSON.parse(localStorage.getItem("rss_list") || "[]");
  if (!list.includes(url)) {
    list.push(url);
    localStorage.setItem("rss_list", JSON.stringify(list));
  }
}

function loadRssFeeds() {
  let list = JSON.parse(localStorage.getItem("rss_list") || "[]");
  list.forEach(url => fetchFeed(url));
}

document.addEventListener("DOMContentLoaded", loadRssFeeds);
