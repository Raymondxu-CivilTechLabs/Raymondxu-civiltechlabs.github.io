document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
  <nav class="header navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
    <div class="container px-5">

      <a class="navbar-brand fw-bold" href="index.html">HOME</a>

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

        </ul>
      </div>
    </div>
  </nav>
  `;
  document.body.insertAdjacentHTML("afterbegin", navbarHTML);
});
