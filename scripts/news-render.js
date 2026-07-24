(() => {
  "use strict";

  const list = document.querySelector("#news-list");
  if (!list) return;

  const posts = Array.isArray(window.NEWS_POSTS) ? [...window.NEWS_POSTS] : [];
  posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const limit = Number.parseInt(list.dataset.limit || "0", 10);
  const visiblePosts = limit > 0 ? posts.slice(0, limit) : posts;
  const pathPrefix = window.location.pathname.includes("/news/") ? "." : "";

  list.replaceChildren();

  if (!visiblePosts.length) {
    const item = document.createElement("li");
    item.className = "news-empty";
    item.textContent = "現在、お知らせはありません。";
    list.append(item);
    return;
  }

  visiblePosts.forEach((post) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const time = document.createElement("time");
    const title = document.createElement("span");
    const category = document.createElement("small");

    time.dateTime = post.date;
    time.textContent = formatDate(post.date);
    title.textContent = post.title;
    category.textContent = post.category || "NEWS";

    const url = String(post.url || "#");
    link.href = pathPrefix && url.startsWith("./") ? `${pathPrefix}/${url.slice(2)}` : url;
    link.append(time, title, category);
    item.append(link);
    list.append(item);
  });

  function formatDate(dateString) {
    const parts = String(dateString).split("-");
    return parts.length === 3 ? `${parts[0]}.${parts[1]}.${parts[2]}` : dateString;
  }
})();
