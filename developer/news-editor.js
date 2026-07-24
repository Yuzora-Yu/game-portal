(() => {
  "use strict";

  const form = document.querySelector("#news-editor-form");
  const preview = document.querySelector("#editor-preview");
  const status = document.querySelector("#editor-status");
  if (!form || !preview || !status) return;

  const dateInput = form.elements.date;
  const titleInput = form.elements.title;
  const idInput = form.elements.id;
  dateInput.value = new Date().toISOString().slice(0, 10);

  let idTouched = false;
  idInput.addEventListener("input", () => { idTouched = true; });
  titleInput.addEventListener("input", () => {
    if (!idTouched) idInput.value = `${dateInput.value}-${slugify(titleInput.value)}`.replace(/-+$/g, "");
  });
  dateInput.addEventListener("change", () => {
    if (!idTouched) idInput.value = `${dateInput.value}-${slugify(titleInput.value)}`.replace(/-+$/g, "");
  });

  form.addEventListener("input", renderPreview);
  document.querySelector("#download-html").addEventListener("click", downloadHtml);
  document.querySelector("#download-data").addEventListener("click", downloadData);
  document.querySelector("#copy-entry").addEventListener("click", copyEntry);
  renderPreview();

  function getPost() {
    const data = new FormData(form);
    return {
      id: String(data.get("id") || "").trim(),
      date: String(data.get("date") || "").trim(),
      title: String(data.get("title") || "").trim(),
      category: String(data.get("category") || "NEWS").trim(),
      summary: String(data.get("summary") || "").trim(),
      body: String(data.get("body") || "").trim(),
      url: `./news/${String(data.get("id") || "").trim()}.html`
    };
  }

  function validatePost(post) {
    if (!form.reportValidity()) return false;
    if (!/^[a-z0-9-]+$/.test(post.id)) {
      setStatus("記事IDは半角英小文字・数字・ハイフンのみで入力してください。", true);
      return false;
    }
    return true;
  }

  function renderPreview() {
    const post = getPost();
    const bodyHtml = bodyToHtml(post.body || "本文を入力すると、ここにプレビューされます。");
    preview.innerHTML = `
      <header class="news-article__header">
        <p class="eyebrow">${escapeHtml(post.category || "NEWS")}</p>
        <time datetime="${escapeAttr(post.date)}">${escapeHtml(formatDate(post.date))}</time>
        <h1>${escapeHtml(post.title || "記事タイトル")}</h1>
        <p class="news-article__summary">${escapeHtml(post.summary || "一覧用の概要が表示されます。")}</p>
      </header>
      <div class="news-article__body">${bodyHtml}</div>`;
  }

  function downloadHtml() {
    const post = getPost();
    if (!validatePost(post)) return;
    download(`${post.id}.html`, buildArticleHtml(post), "text/html;charset=utf-8");
    setStatus(`${post.id}.html を生成しました。news/ フォルダへ配置してください。`);
  }

  function downloadData() {
    const post = getPost();
    if (!validatePost(post)) return;
    const current = Array.isArray(window.NEWS_POSTS) ? window.NEWS_POSTS : [];
    const entry = toDataEntry(post);
    const merged = [entry, ...current.filter((item) => item.id !== entry.id)]
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const file = `/* お知らせの正本データ。developer/news-editor.html から生成 */\nwindow.NEWS_POSTS = ${JSON.stringify(merged, null, 2)};\n`;
    download("news-data.js", file, "text/javascript;charset=utf-8");
    setStatus("news-data.js を生成しました。scripts/news-data.js を置き換えてください。");
  }

  async function copyEntry() {
    const post = getPost();
    if (!validatePost(post)) return;
    const text = JSON.stringify(toDataEntry(post), null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("お知らせデータ1件をクリップボードへコピーしました。");
    } catch (error) {
      setStatus("コピーできませんでした。HTTPSまたはlocalhostで開いてください。", true);
    }
  }

  function toDataEntry(post) {
    return { id: post.id, date: post.date, title: post.title, category: post.category, summary: post.summary, url: post.url };
  }

  function buildArticleHtml(post) {
    const title = escapeHtml(post.title);
    const summary = escapeAttr(post.summary);
    return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${summary}">
  <meta name="theme-color" content="#201d17">
  <title>${title} | YUZORA GAME ARCHIVE</title>
  <link rel="icon" href="../assets/prisma-abyss-icon.png">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <a class="skip-link" href="#main">本文へ移動</a>
  <header class="site-header"><div class="site-header__inner"><a class="brand" href="../"><span class="brand__mark" aria-hidden="true">◆</span><span><strong>YUZORA GAME ARCHIVE</strong><small>個人制作ブラウザゲーム保管庫</small></span></a><nav class="global-nav" aria-label="主要ナビゲーション"><a href="../#games">GAMES</a><a href="../news.html" aria-current="page">NEWS</a><a href="../developer.html">DEVELOPER</a><a href="../privacy.html">PRIVACY</a></nav></div></header>
  <main id="main" class="subpage"><article class="news-article"><header class="news-article__header"><p class="eyebrow">${escapeHtml(post.category)}</p><time datetime="${escapeAttr(post.date)}">${escapeHtml(formatDate(post.date))}</time><h1>${title}</h1><p class="news-article__summary">${escapeHtml(post.summary)}</p></header><div class="news-article__body">${bodyToHtml(post.body)}</div><footer class="news-article__footer"><a class="text-arrow" href="../news.html">お知らせ一覧へ戻る →</a><a class="button" href="../">ポータルトップ</a></footer></article></main>
  <footer class="site-footer"><div class="site-footer__inner"><p><strong>YUZORA GAME ARCHIVE</strong><br><small>DEVELOPMENT LOG</small></p><nav class="footer-policy-nav" aria-label="サイトポリシー"><a href="../privacy.html">プライバシー</a><a href="../terms.html">利用規約</a><a href="../disclaimer.html">免責事項</a></nav><p>© 2026 Yuzora-Yu</p></div></footer>
</body>
</html>\n`;
  }

  function bodyToHtml(body) {
    const blocks = String(body).split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
    return blocks.map((block) => {
      if (block.startsWith("## ")) return `<h2>${escapeHtml(block.slice(3))}</h2>`;
      return `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`;
    }).join("");
  }

  function slugify(value) {
    return String(value).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "news";
  }

  function formatDate(value) {
    const parts = String(value || "").split("-");
    return parts.length === 3 ? `${parts[0]}.${parts[1]}.${parts[2]}` : value || "----.--.--";
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  }

  function escapeAttr(value) { return escapeHtml(value).replace(/`/g, "&#96;"); }

  function download(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  }
})();
