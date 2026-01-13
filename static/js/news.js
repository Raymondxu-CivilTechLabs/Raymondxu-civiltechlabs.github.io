document.addEventListener("DOMContentLoaded", async function() {
    const newsList = document.getElementById("news-md");
    const newsMore = document.getElementById("news-more");

    try {
        // 读取 news.md 文件
        const res = await fetch("contents/home/news.md");
        const text = await res.text();

        // 按行拆分，过滤空行
        const lines = text.split("\n").filter(l => l.trim());

        // 解析 markdown 链接: [日期 - 标题](link)
        const allNews = lines.map(line => {
            const match = line.match(/\[(.+?)\]\((.+?)\)/);
            return match ? { text: match[1], link: match[2] } : null;
        }).filter(Boolean);

        // 显示最新 5 条
        allNews.slice(0, 5).forEach(item => {
            const li = document.createElement("li");
            li.style.marginBottom = "0.3rem";   // 条目间距
            li.style.fontSize = "0.95rem";      // 小字体
            li.style.lineHeight = "1.3rem";

            const a = document.createElement("a");
            a.href = item.link;
            a.textContent = item.text;
            a.className = "news-link";
            a.style.textDecoration = "none"; // 去掉下划线
            li.appendChild(a);
            newsList.appendChild(li);
        });

        // 如果条目超过 5 条，显示 More
        if(allNews.length > 5){
            newsMore.style.display = "block";
            newsMore.addEventListener("click", () => {
                window.location.href = "all-news.html";
            });
        } else {
            newsMore.style.display = "none";
        }

    } catch(err) {
        console.error("加载 news.md 失败", err);
        newsList.innerHTML = "<li>无法加载新闻内容</li>";
    }
});
