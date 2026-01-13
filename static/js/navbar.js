document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
  <nav class="header navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
    <div class="container-fluid px-5">

      <a class="navbar-brand fw-bold" href="index.html">CivilTechLabs</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive">
        MENU <i class="bi-list"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">

          <li class="nav-item"><a class="nav-link me-lg-3" href="index.html">HOME</a></li>
          <li class="nav-item"><a class="nav-link me-lg-3" href="events.html">EVENTS</a></li>
          <li class="nav-item"><a class="nav-link me-lg-3" href="research.html">RESEARCH</a></li>
          <li class="nav-item"><a class="nav-link me-lg-3" href="teaching.html">TEACHING</a></li>
          <li class="nav-item"><a class="nav-link me-lg-3" href="blog.html">BLOG</a></li>
          <li class="nav-item"><a class="nav-link me-lg-3" href="interests.html">INTERESTS</a></li>
          <li class="nav-item"><a class="nav-link me-lg-3" href="about.html">ABOUT</a></li>

          <!-- ===== 右侧功能区 ===== -->
          <li class="nav-item d-flex align-items-center gap-2 ms-lg-3">

            <!-- 搜索框 -->
            <form class="d-flex me-2" role="search" id="nav-search-form">
              <input class="form-control form-control-sm" type="search" placeholder="Search" aria-label="Search" id="nav-search-input">
              <button class="btn btn-sm btn-primary" type="submit"><i class="bi bi-search"></i></button>
            </form>

            <!-- 中英文切换 -->
            <div class="lang-switch d-flex gap-1 me-2">
              <button class="btn btn-sm btn-outline-secondary active" data-lang="en">EN</button>
              <button class="btn btn-sm btn-outline-secondary" data-lang="zh">中</button>
            </div>

            

          </li>
        </ul>
      </div>
    </div>
  </nav>
  `;
  document.body.insertAdjacentHTML("afterbegin", navbarHTML);
});
