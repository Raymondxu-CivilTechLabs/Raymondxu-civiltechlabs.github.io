// blog.js
document.addEventListener("DOMContentLoaded", async function () {
    const blogContainer = document.getElementById("blog-md");
    if (!blogContainer) return;

    // 读取 blog 配置
    const res = await fetch("contents/blog/blog-config.yml");
    const yamlText = await res.text();
    const config = jsyaml.load(yamlText);

    let posts = config.posts;

    // 按时间倒序
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 分类筛选（可选）
    const filterCategory = new URLSearchParams(window.location.search).get("category");
    if (filterCategory) {
        posts = posts.filter(p => p.category === filterCategory);
    }

    // 分页设置
    const POSTS_PER_PAGE = 5;
    const page = parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const postsToShow = posts.slice(start, end);

    // 渲染文章列表
    blogContainer.innerHTML = "";
    postsToShow.forEach(post => {
        const postEl = document.createElement("div");
        postEl.className = "blog-item mb-3";

        postEl.innerHTML = `
            <h5><a href="blog.html?id=${post.id}" class="text-decoration-none">${post.title}</a></h5>
            <p class="text-muted mb-1">${post.date} | ${post.category}</p>
            ${post.summary ? `<p>${post.summary}</p>` : ""}
        `;
        blogContainer.appendChild(postEl);
    });

    // 分页导航
    const pagination = document.createElement("div");
    pagination.className = "pagination mt-4";

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = `?page=${i}${filterCategory ? "&category=" + filterCategory : ""}`;
        pageLink.className = `btn btn-outline-primary me-2 ${i === page ? "active" : ""}`;
        pageLink.textContent = i;
        pagination.appendChild(pageLink);
    }

    blogContainer.appendChild(pagination);

    // 分类筛选按钮
    const categories = [...new Set(config.posts.map(p => p.category))];
    const filterDiv = document.createElement("div");
    filterDiv.className = "blog-filters mb-3";
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "btn btn-sm btn-secondary me-2";
        btn.textContent = cat;
        btn.onclick = () => {
            window.location.href = `?category=${encodeURIComponent(cat)}`;
        };
        filterDiv.appendChild(btn);
    });
    blogContainer.prepend(filterDiv);
});
