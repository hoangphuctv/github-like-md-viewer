# GitHub-like Markdown Viewer

Chrome Extension nhẹ, biến các file Markdown cục bộ thành trang tài liệu dễ đọc ngay trong trình duyệt.

## Tiếng Việt

### Vì sao tiện

- Đọc ngay tại máy, không upload, không server, không lo rò rỉ tài liệu.
- Hoạt động offline trên file://.
- Không cần cài Node, Python hay cấu hình gì thêm.
- Giao diện quen thuộc kiểu README GitHub, dễ đọc tài liệu dài.
- Dark mode nhớ trạng thái: bật một lần, mọi file mở sau đều giữ đúng chế độ.
- Nhẹ và tập trung vào một việc: mở Markdown và đọc.

### Tính năng

Render Markdown:
- Heading, paragraph, bold, italic, inline code.
- Code block có fence, hỗ trợ fence 3+ backtick và ngôn ngữ kèm theo.
- Danh sách có thứ tự, không thứ tự, task list.
- Blockquote lồng nhau, horizontal rule.
- Link, ảnh.
- Bảng căn trái, giữa, phải.
- Indented code block.

Trải nghiệm đọc:
- Layout responsive, typography dễ chịu.
- Mục lục (TOC) tự động ở góc phải, thu gọn/mở rộng được, nhớ trạng thái, tự highlight heading đang đọc.
- Nút chuyển sáng/tối ở góc.
- Theme được lưu bằng chrome.storage.local và áp dụng cho mọi file .md sau đó.

### Cài đặt

1. Mở chrome://extensions
2. Bật Developer mode
3. Chọn Load unpacked và trỏ tới thư mục project
4. Bật Allow access to file URLs
5. Mở bất kỳ file .md bằng Chrome

---

## English

A lightweight Chrome Extension that renders local Markdown files in a clean, GitHub-style reading experience.

### Why it is convenient

- Read locally, no upload, no server, no risk of leaking internal docs.
- Works offline on file://.
- Nothing else to install: no Node, no Python, no config.
- Familiar GitHub README-inspired look.
- Dark mode that remembers: toggle once, every Markdown file afterwards keeps the same theme.
- Small and focused on one job.

### Features

Markdown rendering:
- Headings, paragraphs, bold, italic, inline code.
- Fenced code blocks with correct handling for 3+ backtick fences and optional language.
- Ordered and unordered lists, task lists.
- Nested blockquotes, horizontal rules.
- Links, images.
- Tables with left, center, right alignment.
- Indented code blocks.

Reading experience:
- Responsive layout, comfortable typography.
- Auto-generated table of contents (TOC) in the corner, collapsible, remembers state, highlights the heading you are reading.
- Light/dark toggle button.
- Theme persisted via chrome.storage.local and applied to every .md file afterwards.

### Installation

1. Open chrome://extensions
2. Enable Developer mode
3. Click Load unpacked and select the project folder
4. Enable Allow access to file URLs
5. Open any .md file in Chrome

---

## License

Open development project.

---

## New in 0.3.0

- Copy button on every code block (with "Copied!" feedback).
- Reading progress bar at the top of the page.
- Back-to-top floating button (appears after scrolling).
- Heading anchor `#` on hover — click to copy a deep link to that section.
- Keyboard shortcuts: `t` toggles the table of contents, `d` toggles dark mode.
- Works in both light and dark mode; hidden in print.

## New in 0.4.0

- In-page search bar (`/` to open, `Enter`/`Shift+Enter` to jump, `Esc` to close) with match counter and highlight.
- Copy original Markdown source button (top-right, next to theme toggle).
- Focus / Zen mode (`f` to toggle): hides TOC, progress bar, floating buttons; narrows body for distraction-free reading.

## New in 0.5.0

- Lightweight syntax highlighting for fenced code blocks (JS/TS/Python/Shell/Go/Rust/Java/C/C++/JSON/YAML) — no external library.
- "Jump to…" outline dropdown in the top-left for quick heading navigation.
- Word count and estimated reading time in a footer under the content.
- Per-file scroll position memory: reopening a `.md` resumes where you stopped.
