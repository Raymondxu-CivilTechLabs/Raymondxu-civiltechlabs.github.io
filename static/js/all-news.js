document.addEventListener("DOMContentLoaded", async function() {
    const newsList = document.getElementById("all-news-list");
    try {
        const res = await fetch("contents/home/news.md");
        const text = await res.text();

        const lines = text.split("\n").filter(l => l.trim());
        const allNews = lines.map(line => {
            const match = line.match(/\[(.+?)\]\((.+?)\)/);
            return match ? { text: match[1], link: match[2] } : null;
        }).filter(Boolean);

        allNews.forEach(item=>{
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = item.link;
            a.textContent = item.text;
            a.className = "news-link";
            li.appendChild(a);
            newsList.appendChild(li);
        });

    } catch(err){
        console.error("加载 news.md 失败", err);
    }
});
