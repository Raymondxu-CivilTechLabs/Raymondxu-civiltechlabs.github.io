// ======================
// 博客文章列表配置
// ======================
const posts = [
    {id: 'post1', title: 'First Blog Post', date: '2026-01-13', category: 'Research'},
    {id: 'post2', title: 'Second Blog Post', date: '2026-01-10', category: 'Teaching'},
    {id: 'post3', title: 'Third Blog Post', date: '2026-01-05', category: 'Research'},
    {id: 'post4', title: 'Fourth Blog Post', date: '2026-01-02', category: 'Research'},
    {id: 'post5', title: 'Fifth Blog Post', date: '2025-12-30', category: 'Teaching'},
    // 可以继续添加
];

// ======================
// 配置分页
// ======================
const POSTS_PER_PAGE = 3;

// ======================
// 工具函数：获取 URL 参数
// ======================
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// ======================
// 渲染博客列表
// ======================
function renderBlogList(page = 1, filterCategory = 'All') {
    const container = document.getElementById('blog-list');
    container.innerHTML = '';

    // 先按分类过滤
    let filteredPosts = posts;
    if(filterCategory !== 'All') {
        filteredPosts = posts.filter(p => p.category === filterCategory);
    }

    // 计算分页
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(start, end);

    // 生成列表
    postsToShow.forEach(post => {
        const div = document.createElement('div');
        div.className = 'blog-item mb-4 p-3 border rounded shadow-sm';
        div.innerHTML = `
            <h3><a href="blog.html?id=${post.id}">${post.title}</a></h3>
            <p class="text-muted">${post.date} | Category: ${post.category}</p>
        `;
        container.appendChild(div);
    });

    // 分页按钮
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination mt-4';
    for(let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-outline-primary me-2';
        btn.textContent = i;
        if(i === page) btn.disabled = true;
        btn.onclick = () => renderBlogList(i, filterCategory);
        paginationDiv.appendChild(btn);
    }
    container.appendChild(paginationDiv);
}

// ======================
// 渲染分类筛选按钮
// ======================
function renderCategoryFilter() {
    const container = document.createElement('div');
    container.className = 'category-filter mb-4';
    const categories = ['All', ...new Set(posts.map(p => p.category))];

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-secondary me-2 mb-2';
        btn.textContent = cat;
        btn.onclick = () => renderBlogList(1, cat);
        container.appendChild(btn);
    });

    const blogList = document.getElementById('blog-list');
    blogList.parentNode.insertBefore(container, blogList);
}

// ======================
// 渲染单篇文章
// ======================
function renderSinglePost(postId) {
    const post = posts.find(p => p.id === postId);
    if(post) {
        fetch(`contents/blog/${post.id}.md`)
            .then(res => res.text())
            .then(md => {
                const container = document.getElementById('blog-list');
                container.innerHTML = `<h2>${post.title}</h2>
                                        <p class="text-muted">${post.date} | Category: ${post.category}</p>
                                        <hr>${marked.parse(md)}`;
            });
    } else {
        document.getElementById('blog-list').innerHTML = `<p>Post not found.</p>`;
    }
}

// ======================
// 页面初始化
// ======================
const postId = getQueryParam('id');
if(postId) {
    renderSinglePost(postId);
} else {
    renderCategoryFilter();
    renderBlogList();
}
