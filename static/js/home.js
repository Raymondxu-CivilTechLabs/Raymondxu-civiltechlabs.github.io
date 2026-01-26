// home.js
document.addEventListener("DOMContentLoaded", () => {

  // Load About Me markdown
  fetch('./contents/home/aboutme.md')
    .then(res => res.text())
    .then(md => {
      document.getElementById('aboutme-md').innerHTML = marked.parse(md);
    });

  // Load News markdown
  fetch('./contents/home/news.md')
    .then(res => res.text())
    .then(md => {
      const container = document.createElement('div');
      container.innerHTML = marked.parse(md);

      container.querySelectorAll('li a').forEach(a => {
        a.classList.add('news-link');
        if (a.href.startsWith('http')) a.target = '_blank';
      });

      document.getElementById('news-md').appendChild(container);
    });

});
