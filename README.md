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