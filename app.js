const NOTES = [
  { slug: "STL", file: "STL.md", title: "STL", tag: "基础工具" },
  { slug: "数据结构", file: "！数据结构！.md", title: "数据结构", tag: "模板" },
  { slug: "动态规划", file: "动动动态规划dp.md", title: "动态规划 DP", tag: "专题" },
  { slug: "数论", file: "数论好难.md", title: "数论好难", tag: "专题" },
  { slug: "图论", file: "是图论吖！.md", title: "是图论吖", tag: "专题" },
  { slug: "板子", file: "我要成为板神.md", title: "我要成为板神", tag: "板子" },
  { slug: "算法经典", file: "不想当菜鸡（算法经典）.md", title: "算法经典", tag: "整理" },
  { slug: "菜菜必备", file: "菜菜必备.md", title: "菜菜必备", tag: "常用" },
  { slug: "神秘笔记", file: "神秘笔记.md", title: "神秘笔记", tag: "杂项" },
  { slug: "典题", file: "菜菜典题（非算法）.md", title: "菜菜典题", tag: "题单" },
  { slug: "博弈论", file: "菜菜也玩博弈论.md", title: "菜菜也玩博弈论", tag: "专题" },
  { slug: "大忙人", file: "我是大忙人.md", title: "我是大忙人", tag: "记录" },
  { slug: "补充", file: "补充.md", title: "补充", tag: "追加" },
  { slug: "打印", file: "打印.md", title: "打印", tag: "空白" }
];

const MASCOTS = [
  "./assets/lazy-toast.png",
  "./assets/lazy-typing.png",
  "./assets/lazy-sleep.png",
  "./assets/lazy-icecream.png"
];

const article = document.querySelector("#article");
const noteList = document.querySelector("#noteList");
const searchInput = document.querySelector("#searchInput");
const topButton = document.querySelector("#topButton");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  return html;
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let inCode = false;
  let codeLang = "";
  let codeLines = [];
  let inList = false;
  let inOrderedList = false;

  const closeList = () => {
    if (inList) {
      html.push(inOrderedList ? "</ol>" : "</ul>");
      inList = false;
      inOrderedList = false;
    }
  };

  const flushCode = () => {
    const code = escapeHtml(codeLines.join("\n"));
    const label = codeLang || "code";
    html.push(`<div class="code-card"><div class="code-tools"><span>${escapeHtml(label)}</span><button class="copy-code" type="button">复制</button></div><pre><code>${code}</code></pre></div>`);
    codeLines = [];
    codeLang = "";
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\u00a0/g, " ");
    const fence = line.match(/^```([\w+-]*)\s*$/);

    if (fence) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        closeList();
        inCode = true;
        codeLang = fence[1] || "";
      }
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    if (!line.trim()) {
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 6);
      html.push(`<h${level}>${inlineMarkdown(heading[2].trim())}</h${level}>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      closeList();
      html.push(`<blockquote>${inlineMarkdown(line.replace(/^>\s?/, ""))}</blockquote>`);
      continue;
    }

    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
    if (ordered || unordered) {
      const shouldOrder = Boolean(ordered);
      if (!inList || inOrderedList !== shouldOrder) {
        closeList();
        html.push(shouldOrder ? "<ol>" : "<ul>");
        inList = true;
        inOrderedList = shouldOrder;
      }
      html.push(`<li>${inlineMarkdown((ordered || unordered)[1])}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  if (inCode) flushCode();
  closeList();
  return html.join("\n");
}

function renderNav(filter = "") {
  const keyword = filter.trim().toLowerCase();
  const items = NOTES.filter(note => {
    const haystack = `${note.title} ${note.tag} ${note.file}`.toLowerCase();
    return haystack.includes(keyword);
  });

  noteList.innerHTML = items.map(note => (
    `<a class="note-link" href="#/${encodeURIComponent(note.slug)}" data-slug="${escapeHtml(note.slug)}">
      <span>${escapeHtml(note.title)}</span>
      <small>${escapeHtml(note.tag)}</small>
    </a>`
  )).join("") || '<p class="empty">没搜到，换个关键词试试。</p>';

  highlightActive();
}

function currentSlug() {
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  return raw || NOTES[0].slug;
}

function noteBySlug(slug) {
  return NOTES.find(note => note.slug === slug) || NOTES[0];
}

function highlightActive() {
  const slug = currentSlug();
  document.querySelectorAll(".note-link").forEach(link => {
    link.classList.toggle("active", link.dataset.slug === slug);
  });
}

async function loadNote() {
  const note = noteBySlug(currentSlug());
  highlightActive();
  article.innerHTML = '<div class="loading">正在加载笔记...</div>';

  try {
    const response = await fetch(`./content/${encodeURIComponent(note.file)}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    const mascot = MASCOTS[NOTES.indexOf(note) % MASCOTS.length];
    const body = markdown.trim()
      ? renderMarkdown(markdown)
      : '<p class="empty">这一篇还没有内容，先占个位。</p>';

    article.innerHTML = `
      <header class="article-header">
        <div>
          <h2>${escapeHtml(note.title)}</h2>
          <p>${escapeHtml(note.tag)} · ${escapeHtml(note.file)}</p>
        </div>
        <img src="${mascot}" alt="">
      </header>
      ${body}
    `;

    bindCopyButtons();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    article.innerHTML = `
      <header class="article-header">
        <div>
          <h2>${escapeHtml(note.title)}</h2>
          <p>加载失败</p>
        </div>
        <img src="./assets/lazy-sleep.png" alt="">
      </header>
      <p class="empty">没有读到 ${escapeHtml(note.file)}。如果你是直接双击打开 HTML，请用本地服务器或 GitHub Pages 打开。</p>
    `;
  }
}

function bindCopyButtons() {
  document.querySelectorAll(".copy-code").forEach(button => {
    button.addEventListener("click", async () => {
      const code = button.closest(".code-card").querySelector("code").innerText;
      await navigator.clipboard.writeText(code);
      button.textContent = "已复制";
      setTimeout(() => {
        button.textContent = "复制";
      }, 1200);
    });
  });
}

searchInput.addEventListener("input", event => renderNav(event.target.value));
window.addEventListener("hashchange", loadNote);
window.addEventListener("scroll", () => {
  topButton.classList.toggle("visible", window.scrollY > 520);
});
topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

renderNav();
loadNote();
