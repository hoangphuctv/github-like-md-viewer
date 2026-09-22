(() => {
  "use strict";

  const NL = String.fromCharCode(10);
  const CR = String.fromCharCode(13);
  const BS = String.fromCharCode(92);

  const getSource = () => (document.body ? document.body.textContent : "");

  const start = () => {
    const source = getSource();
    if (!source.trim()) return;

  const escapeHtml = (value) =>
    value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));

  const escapeAttribute = (value) =>
    escapeHtml(value).replace(/`/g, "&#96;");

  const inlineMarkdown = (text) => {
    const preserved = [];
    const preserve = (value) => {
      const token = `\u0000${preserved.length}\u0000`;
      preserved.push(value);
      return token;
    };

    let html = text;

    html = html.replace(/`([^`]+)`/g, (_, code) =>
      preserve(`<code>${escapeHtml(code)}</code>`));

    html = html.replace(/<\/?[A-Za-z][^>]*>/g, (tag) => preserve(tag));

    html = escapeHtml(html);

    html = html.replace(/!\[([^\]]*)\]\((\S+?)(?:\s+&quot;([^&]*)&quot;)?\)/g,
      (_, alt, url, title) =>
        `<img src="${escapeAttribute(url)}" alt="${alt}"${title ? ` title="${title}"` : ""}>`);
    html = html.replace(/\[([^\]]+)\]\((\S+?)(?:\s+&quot;([^&]*)&quot;)?\)/g,
      (_, label, url, title) =>
        `<a href="${escapeAttribute(url)}"${title ? ` title="${title}"` : ""}>${label}</a>`);
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    html = html.replace(/~~([^~]+)~~/g, "<del>$1</del>");
    html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
    html = html.replace(/(?<!_)_([^_]+)_(?!_)/g, "<em>$1</em>");

    return html.replace(/\u0000(\d+)\u0000/g, (_, index) => preserved[Number(index)]);
  };

  const isTableSeparator = (line) =>
    /^\s*\|?\s*:?-{1,}:?\s*(?:\|\s*:?-{1,}:?\s*)+\|?\s*$/.test(line);

  const splitTableRow = (line) => {
    let value = line.trim();
    if (value.startsWith("|")) value = value.slice(1);
    if (value.endsWith("|")) value = value.slice(0, -1);
    return value.split("|").map((cell) => cell.trim());
  };

  const renderTable = (lines) => {
    const headers = splitTableRow(lines[0]);
    const alignments = splitTableRow(lines[1]).map((cell) => {
      const left = cell.startsWith(":");
      const right = cell.endsWith(":");
      return left && right ? "center" : right ? "right" : left ? "left" : "";
    });

    const body = lines.slice(2).map(splitTableRow);
    const alignment = (index) =>
      alignments[index] ? ` style="text-align:${alignments[index]}"` : "";

    return `<table><thead><tr>${headers.map((cell, index) =>
      `<th${alignment(index)}>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead>` +
      (body.length ? `<tbody>${body.map((row) =>
        `<tr>${headers.map((_, index) =>
          `<td${alignment(index)}>${inlineMarkdown(row[index] || "")}</td>`).join("")}</tr>`
      ).join("")}</tbody>` : "") +
      "</table>";
  };

  const FENCE_OPEN = /^ {0,3}(`{3,})(.*)$/;
  const FENCE_CLOSE = /^ {0,3}(`{3,})\s*$/;

  const renderMarkdown = (markdown) => {
    const lines = markdown.replace(new RegExp(CR + "?" + NL, "g"), NL).split(NL);
    const output = [];
    let paragraph = [];
    let list = null;
    let listItems = [];
    let quote = [];
    let inCode = false;
    let codeLanguage = "";
    let codeFenceLength = 0;
    let codeLines = [];
    let i = 0;

    const flushParagraph = () => {
      if (!paragraph.length) return;
      output.push(`<p>${inlineMarkdown(paragraph.join(NL)).replace(new RegExp(NL, "g"), "<br>")}</p>`);
      paragraph = [];
    };

    const flushList = () => {
      if (!list) return;
      const tag = list === "ol" ? "ol" : "ul";
      output.push(`<${tag}>${listItems.join("")}</${tag}>`);
      list = null;
      listItems = [];
    };

    const flushQuote = () => {
      if (!quote.length) return;
      output.push(`<blockquote>${renderMarkdown(quote.join(NL))}</blockquote>`);
      quote = [];
    };

    const flushAll = () => {
      flushParagraph();
      flushList();
      flushQuote();
    };

    while (i < lines.length) {
      const line = lines[i];

      if (inCode) {
        const closing = line.match(FENCE_CLOSE);
        if (closing && closing[1].length >= codeFenceLength) {
          const language = codeLanguage;
          const className = language ? ` class="language-${escapeAttribute(language)}"` : "";
          output.push(`<pre><code${className}>${escapeHtml(codeLines.join(NL))}</code></pre>`);
          inCode = false;
          codeLanguage = "";
          codeFenceLength = 0;
          codeLines = [];
        } else {
          codeLines.push(line);
        }
        i++;
        continue;
      }

      const fence = line.match(FENCE_OPEN);
      if (fence) {
        flushAll();
        inCode = true;
        codeFenceLength = fence[1].length;
        codeLanguage = fence[2].trim().replace(/^`+/, "");
        codeLines = [];
        i++;
        continue;
      }

      if (
        i + 1 < lines.length &&
        line.includes("|") &&
        isTableSeparator(lines[i + 1])
      ) {
        flushAll();
        const tableLines = [line, lines[i + 1]];
        i += 2;
        while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
          tableLines.push(lines[i]);
          i++;
        }
        output.push(renderTable(tableLines));
        continue;
      }

      const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
      if (heading) {
        flushAll();
        const level = heading[1].length;
        output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
        i++;
        continue;
      }

      if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
        flushAll();
        output.push("<hr>");
        i++;
        continue;
      }

      const quoteLine = line.match(/^\s*>\s?(.*)$/);
      if (quoteLine) {
        flushParagraph();
        flushList();
        quote.push(quoteLine[1]);
        i++;
        continue;
      }
      if (quote.length && !line.trim()) {
        quote.push("");
        i++;
        continue;
      }
      if (quote.length) flushQuote();

      const unordered = line.match(/^\s*[-*+]\s+(.*)$/);
      const ordered = line.match(/^\s*\d+[.)]\s+(.*)$/);
      if (unordered || ordered) {
        flushParagraph();
        const nextList = ordered ? "ol" : "ul";
        if (list && list !== nextList) flushList();
        list = nextList;
        let item = (unordered || ordered)[1];
        const checked = item.match(/^\[([ xX])\]\s+(.*)$/);
        if (checked) {
          const isChecked = checked[1].toLowerCase() === "x";
          item = `<input type="checkbox" disabled${isChecked ? " checked" : ""}> ${checked[2]}`;
        }
        listItems.push(`<li>${inlineMarkdown(item)}</li>`);
        i++;
        continue;
      }
      if (list && !line.trim()) {
        flushList();
        i++;
        continue;
      }
      if (list) flushList();

      if (!line.trim()) {
        flushParagraph();
        i++;
        continue;
      }

      const indentedCode = line.match(/^ {4}(.*)$/);
      if (indentedCode) {
        flushParagraph();
        flushQuote();
        const block = [];
        while (i < lines.length && (lines[i].startsWith("    ") || !lines[i].trim())) {
          block.push(lines[i].startsWith("    ") ? lines[i].slice(4) : "");
          i++;
        }
        while (block.length && !block[block.length - 1]) block.pop();
        output.push(`<pre><code>${escapeHtml(block.join(NL))}</code></pre>`);
        continue;
      }

      paragraph.push(line);
      i++;
    }

    flushAll();
    if (inCode) {
      const language = codeLanguage;
      const className = language ? ` class="language-${escapeAttribute(language)}"` : "";
      output.push(`<pre><code${className}>${escapeHtml(codeLines.join(NL))}</code></pre>`);
    }

    return output.join(NL);
  };

  const createThemeToggle = () => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "markdown-theme-toggle";
    button.textContent = "☾";
    button.setAttribute("aria-label", "Switch to dark mode");
    button.setAttribute("title", "Switch to dark mode");

    button.addEventListener("click", () => {
      const dark = document.documentElement.classList.toggle("markdown-dark");
      button.textContent = dark ? "☀" : "☾";
      button.setAttribute(
        "aria-label",
        dark ? "Switch to light mode" : "Switch to dark mode"
      );
      button.setAttribute(
        "title",
        dark ? "Switch to light mode" : "Switch to dark mode"
      );
    });

    document.body.appendChild(button);
  };

  const title = document.title || location.pathname.split("/").pop() || "Markdown";
  document.open();
  document.write(`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
</head>
<body>
  <main class="markdown-body">${renderMarkdown(source)}</main>
</body>
</html>`);
    document.close();
    createThemeToggle();
  };

  if (document.body) {
    start();
  } else {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  }
})();