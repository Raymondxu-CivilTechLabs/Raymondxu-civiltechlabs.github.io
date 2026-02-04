let emailTimer = null;

function toggleEmail() {
    const e = document.getElementById("emailText");

    if (!e.innerHTML) {
        e.innerHTML =
            "raymond_xu" + "@" + "my.swjtu.edu.cn<br>" +
            "xuefeng.xu" + "@" + "mail.polimi.it";
    }

    e.style.display = "inline";

    // 50 秒后自动隐藏
    clearTimeout(emailTimer);
    emailTimer = setTimeout(() => {
        e.style.display = "none";
        document
          .querySelectorAll(".email-item")
          .forEach(item => item.classList.remove("copied"));
    }, 60000); // ⏱ 1 minute
}

// 只复制被点击的邮箱
document.addEventListener("click", function (event) {
    const item = event.target.closest(".email-item");
    if (!item) return;

    const email = item.dataset.email;
    navigator.clipboard.writeText(email).then(() => {
        item.classList.add("copied");

        clearTimeout(emailTimer);
        emailTimer = setTimeout(() => {
            document.getElementById("emailText").style.display = "none";
            item.classList.remove("copied");
        }, 3000);
    });
});

