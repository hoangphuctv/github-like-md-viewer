(() => {
  "use strict";

  const THEME_KEY = "mdv-theme";
  const TOC_KEY = "mdv-toc-collapsed";

  const getSource = () => (document.body ? document.body.textContent : "");

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));

  const resolveUrl = (raw) => {
    if (!raw) return raw;
    const value = String(raw).trim();
    if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//") || value.startsWith("#")) {
      return value;
    }
    try {
      return new URL(value, location.href).href;
    } catch (e) {
      return value;
    }
  };

  // --- Slug helpers ---
  const slugify = (text) =>
    String(text)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u00C0-\u024F\u1E00-\u1EFF-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section";

  const assignHeadingIds = (root) => {
    const used = Object.create(null);
    const headings = root.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((h) => {
      if (h.id) {
        used[h.id] = (used[h.id] || 0) + 1;
        return;
      }
      const base = slugify(h.textContent || "");
      let id = base;
      let n = 1;
      while (used[id]) {
        n += 1;
        id = base + "-" + n;
      }
      used[id] = 1;
      h.id = id;
    });
    return Array.from(headings);
  };

  // --- TOC ---
  const buildToc = (main) => {
    const headings = main.querySelectorAll("h1, h2, h3, h4, h5, h6");
    if (headings.length < 2) return null;

    const nav = document.createElement("nav");
    nav.className = "markdown-toc";
    nav.setAttribute("aria-label", "Table of contents");

    const header = document.createElement("div");
    header.className = "markdown-toc-header";

    const title = document.createElement("span");
    title.className = "markdown-toc-title";
    title.textContent = "Contents";
    header.appendChild(title);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "markdown-toc-toggle";
    toggle.setAttribute("aria-label", "Collapse table of contents");
    toggle.setAttribute("title", "Collapse table of contents");
    toggle.textContent = "\u00AB"; // «
    header.appendChild(toggle);

    nav.appendChild(header);

    const list = document.createElement("ul");
    list.className = "markdown-toc-list";

    const linkById = new Map();

    const setActive = (id) => {
      linkById.forEach((a, key) => {
        if (key === id) a.classList.add("active");
        else a.classList.remove("active");
      });
    };

    headings.forEach((h) => {
      const level = Number(h.tagName.slice(1));
      const li = document.createElement("li");
      li.className = "markdown-toc-item markdown-toc-h" + level;

      const a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent || "";
      a.title = h.textContent || "";

      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        const target = document.getElementById(h.id);
        if (!target) return;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#" + h.id);
        setActive(h.id);
      });

      li.appendChild(a);
      list.appendChild(li);
      linkById.set(h.id, a);
    });

    nav.appendChild(list);

    // IntersectionObserver to track visible heading
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length > 0) setActive(visible[0].target.id);
        },
        { rootMargin: "-10% 0px -70% 0px", threshold: [0, 1] }
      );
      headings.forEach((h) => observer.observe(h));
    }

    // Collapse state
    const applyCollapsed = (collapsed) => {
      nav.classList.toggle("collapsed", collapsed);
      toggle.textContent = collapsed ? "\u00BB" : "\u00AB"; // » : «
      const label = collapsed ? "Expand table of contents" : "Collapse table of contents";
      toggle.setAttribute("aria-label", label);
      toggle.setAttribute("title", label);
    };

    const readCollapsed = () =>
      new Promise((resolve) => {
        try {
          if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(TOC_KEY, (result) => {
              resolve(!!(result && result[TOC_KEY]));
            });
            return;
          }
        } catch (e) {}
        try {
          resolve(localStorage.getItem(TOC_KEY) === "1");
        } catch (e) {
          resolve(false);
        }
      });

    const writeCollapsed = (value) => {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({ [TOC_KEY]: !!value });
          return;
        }
      } catch (e) {}
      try {
        localStorage.setItem(TOC_KEY, value ? "1" : "0");
      } catch (e) {}
    };

    let collapsed = false;
    readCollapsed().then((v) => {
      collapsed = v;
      applyCollapsed(collapsed);
    });

    toggle.addEventListener("click", () => {
      collapsed = !collapsed;
      applyCollapsed(collapsed);
      writeCollapsed(collapsed);
    });

    // Nếu URL có sẵn hash thì highlight
    if (location.hash && location.hash.length > 1) {
      const id = decodeURIComponent(location.hash.slice(1));
      if (linkById.has(id)) setActive(id);
    }

    return nav;
  };

  // --- Reading progress bar ---
  const createReadingProgress = () => {
    const bar = document.createElement('div');
    bar.className = 'markdown-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    const update = () => {
      const doc = document.documentElement;
      const max = (doc.scrollHeight || 0) - (doc.clientHeight || 0);
      const ratio = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      bar.style.transform = 'scaleX(' + ratio + ')';
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return bar;
  };

  // --- Back to top ---
  const createBackToTop = () => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'markdown-back-to-top';
    button.textContent = '\u2191';
    button.setAttribute('aria-label', 'Back to top');
    button.setAttribute('title', 'Back to top');
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(button);

    const toggle = () => {
      if (window.scrollY > 400) button.classList.add('visible');
      else button.classList.remove('visible');
    };
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
    return button;
  };

  // --- Heading anchor links (#) ---
  const createHeadingAnchors = (root) => {
    root.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((h) => {
      if (!h.id) return;
      if (h.querySelector('a.markdown-anchor')) return;
      const a = document.createElement('a');
      a.className = 'markdown-anchor';
      a.href = '#' + h.id;
      a.setAttribute('aria-label', 'Link to this heading');
      a.setAttribute('title', 'Link to this heading');
      a.textContent = '#';
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        try { history.replaceState(null, '', '#' + h.id); } catch (e) {}
        const done = () => {
          a.classList.add('copied');
          a.textContent = '\u2713';
          setTimeout(() => { a.classList.remove('copied'); a.textContent = '#'; }, 1200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(location.href).then(done, () => {});
        } else { done(); }
        const target = document.getElementById(h.id);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      h.appendChild(a);
    });
  };

  // --- Copy button for code blocks ---
  const enhanceCodeBlocks = (root) => {
    root.querySelectorAll('pre > code').forEach((code) => {
      const pre = code.parentElement;
      if (!pre || pre.querySelector('.markdown-copy-code')) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'markdown-copy-code';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code');
      button.setAttribute('title', 'Copy code');

      button.addEventListener('click', () => {
        const text = code.innerText;
        const done = () => {
          button.classList.add('copied');
          button.textContent = 'Copied!';
          setTimeout(() => { button.classList.remove('copied'); button.textContent = 'Copy'; }, 1200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, () => {});
        } else {
          try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            done();
          } catch (e) {}
        }
      });

      pre.style.position = 'relative';
      pre.appendChild(button);
    });
  };

  // --- Keyboard shortcuts ---
  const installShortcuts = (getToc, getThemeButton) => {
    document.addEventListener('keydown', (ev) => {
      if (ev.defaultPrevented) return;
      const target = ev.target;
      const tag = target && target.tagName ? target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || (target && target.isContentEditable)) return;
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;

      const key = ev.key ? ev.key.toLowerCase() : '';
      if (key === 't') {
        const toc = getToc && getToc();
        if (toc) {
          const toggle = toc.querySelector('.markdown-toc-toggle');
          if (toggle) { toggle.click(); ev.preventDefault(); }
        }
      } else if (key === 'd') {
        const btn = getThemeButton && getThemeButton();
        if (btn) { btn.click(); ev.preventDefault(); }
      }
    });
  };

  const postProcess = (root) => {
    assignHeadingIds(root);

    root.querySelectorAll("a[href]").forEach((anchor) => {
      const raw = anchor.getAttribute("href");
      const resolved = resolveUrl(raw);
      if (resolved && resolved !== raw) anchor.setAttribute("href", resolved);
      if (/^https?:/i.test(resolved || "")) {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      }
    });

    root.querySelectorAll("img[src]").forEach((img) => {
      const raw = img.getAttribute("src");
      const resolved = resolveUrl(raw);
      if (resolved && resolved !== raw) img.setAttribute("src", resolved);
      img.setAttribute("loading", "lazy");
    });

    createHeadingAnchors(root);
    enhanceCodeBlocks(root);
  };

  const renderMarkdown = (source) => {
    const markedLib = (typeof marked !== "undefined" && marked) || null;
    if (!markedLib) {
      return "<pre>" + escapeHtml(source) + "</pre>";
    }

    const rawHtml = markedLib.parse(source, {
      gfm: true,
      breaks: false,
      headerIds: false,
      mangle: false
    });

    const purifier = (typeof DOMPurify !== "undefined" && DOMPurify) || null;
    if (!purifier) return rawHtml;

    return purifier.sanitize(rawHtml, {
      ADD_ATTR: ["target", "rel", "loading", "id"],
      ALLOW_DATA_ATTR: false
    });
  };

  const readTheme = () =>
    new Promise((resolve) => {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get(THEME_KEY, (result) => {
            resolve(result && result[THEME_KEY] === "dark");
          });
          return;
        }
      } catch (e) {}
      try {
        resolve(localStorage.getItem(THEME_KEY) === "dark");
      } catch (e) {
        resolve(false);
      }
    });

  const writeTheme = (dark) => {
    const value = dark ? "dark" : "light";
    try {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ [THEME_KEY]: value });
        return;
      }
    } catch (e) {}
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch (e) {}
  };

  const applyThemeToButton = (button, dark) => {
    button.textContent = dark ? "\u2600" : "\u263E"; // ☀ : ☾
    const label = dark ? "Switch to light mode" : "Switch to dark mode";
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  };

  const createThemeToggle = (dark) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "markdown-theme-toggle";
    applyThemeToButton(button, dark);

    button.addEventListener("click", () => {
      const next = document.documentElement.classList.toggle("markdown-dark");
      applyThemeToButton(button, next);
      writeTheme(next);
    });

    document.body.appendChild(button);
  };

  const render = (dark) => {
    const originalTitle = document.title || location.pathname.split("/").pop() || "Markdown";
    const source = getSource();
    const html = renderMarkdown(source);

    document.open();
    document.write(
      '<!doctype html>\n' +
        '<html' + (dark ? ' class="markdown-dark"' : "") + '>\n' +
        "<head>\n" +
        '  <meta charset="utf-8">\n' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
        "  <title>" + escapeHtml(originalTitle) + "</title>\n" +
        "</head>\n" +
        "<body>\n" +
        '  <main class="markdown-body">' + html + "</main>\n" +
        "</body>\n" +
        "</html>"
    );
    document.close();

    const main = document.querySelector("main.markdown-body");
    if (main) {
      postProcess(main);
      const toc = buildToc(main);
      if (toc) document.body.appendChild(toc);
    }

    createThemeToggle(dark);
    createReadingProgress();
    createBackToTop();

    installShortcuts(
      () => document.querySelector('nav.markdown-toc'),
      () => document.querySelector('.markdown-theme-toggle')
    );

    // Nếu URL có hash, nhảy tới sau khi render
    if (location.hash && location.hash.length > 1) {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);
      if (target) {
        setTimeout(() => target.scrollIntoView({ block: "start" }), 0);
      }
    }
  };

  const start = () => {
    if (!getSource().trim()) return;
    readTheme().then(render);
  };

  if (document.body) {
    start();
  } else {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  }
})();
