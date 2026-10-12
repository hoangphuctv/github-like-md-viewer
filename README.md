# GitHub-like Markdown Viewer

Chrome Extension nhẹ, biến các file Markdown cục bộ thành trang tài liệu dễ đọc ngay trong trình duyệt.

## Tiếng Việt

### Vì sao tiện

- Đọc ngay tại máy, không upload, không server, không lo rò rỉ tài liệu.
- Hoạt động offline trên `file://`.
- Không cần cài Node, Python hay cấu hình gì thêm.
- Giao diện quen thuộc kiểu README GitHub, dễ đọc tài liệu dài.
- Dark mode nhớ trạng thái: bật một lần, mọi file mở sau đều giữ đúng chế độ.
- Nhẹ và tập trung vào một việc: mở Markdown và đọc.

### Render Markdown

- Heading, paragraph, bold, italic, inline code.
- Code block có fence (3+ backtick), hỗ trợ ngôn ngữ kèm theo.
- Danh sách có thứ tự, không thứ tự, task list.
- Blockquote lồng nhau, horizontal rule.
- Link, ảnh (ảnh lazy-load).
- Bảng căn trái, giữa, phải.
- Indented code block.

### Trải nghiệm đọc

- **Layout responsive**, typography dễ chịu.
- **Mục lục (TOC)** tự động ở góc phải: thu gọn/mở rộng, nhớ trạng thái, tự highlight heading đang đọc, tự thu gọn khi bạn chọn một mục rồi bấm ra ngoài.
- **Thanh tiến độ đọc** ở đầu trang.
- **Nút back-to-top** nổi lên khi cuộn xuống.
- **Anchor `#`** khi hover heading — bấm để copy deep link tới mục đó.
- **Copy button** trên mọi code block (có phản hồi "Copied!").
- **Nút chuyển sáng/tối** ở góc — theme lưu bằng `chrome.storage.local`, áp dụng cho mọi file `.md` sau đó.
- **Thanh tìm kiếm trong trang** (phím `/` để mở, `Enter` / `Shift+Enter` để nhảy, `Esc` để đóng) với bộ đếm số kết quả và highlight.
- **Focus / Zen mode** (phím `f`): ẩn TOC, progress bar, nút nổi, footer thống kê và nút in; thu hẹp thân bài để đọc tập trung.
- **Syntax highlighting** nhẹ cho các code block — không dùng thư viện ngoài.
- **Word count + thời gian đọc ước lượng** ở footer dưới nội dung.
- **Nhớ vị trí cuộn theo từng file**: mở lại file `.md` sẽ tiếp tục đúng chỗ bạn dừng.
- **Task list tương tác**: checkbox trong Markdown bấm được, trạng thái lưu theo từng file, badge `Tasks n/m` hiện ở góc trên phải.
- **Nút Print / Save as PDF**: gọi hộp thoại in với CSS print đã tối ưu (ẩn TOC, nút, progress bar).
- **Line numbers** cho code block, bật/tắt bằng phím `l`.
- **Banner lỗi** hiển thị rõ ràng nếu trình render không tải được, thay vì trang trắng.

### Phím tắt

| Phím | Tác dụng |
| --- | --- |
| `t` | Bật/tắt mục lục (TOC) |
| `d` | Chuyển sáng/tối |
| `/` | Mở thanh tìm kiếm trong trang |
| `f` | Bật/tắt Focus / Zen mode |
| `l` | Bật/tắt số dòng cho code block |
| `Enter` / `Shift+Enter` | Nhảy tới kết quả tiếp theo / trước đó (khi thanh tìm kiếm đang mở) |
| `Esc` | Đóng thanh tìm kiếm |

Phím tắt không hoạt động khi con trỏ đang ở trong ô nhập liệu.

### Cài đặt

1. Mở `chrome://extensions`
2. Bật **Developer mode**
3. Chọn **Load unpacked** và trỏ tới thư mục project
4. Bật **Allow access to file URLs** (bắt buộc — nếu không extension sẽ không chạy trên `file://`)
5. Mở bất kỳ file `.md` bằng Chrome

Extension áp dụng cho các file có đuôi: `.md`, `.markdown`, `.mdown`, `.mkd` (không phân biệt hoa thường), ở mọi thư mục.

---

## English

A lightweight Chrome Extension that renders local Markdown files in a clean, GitHub-style reading experience.

### Why it is convenient

- Read locally, no upload, no server, no risk of leaking internal docs.
- Works offline on `file://`.
- Nothing else to install: no Node, no Python, no config.
- Familiar GitHub README-inspired look.
- Dark mode that remembers: toggle once, every Markdown file afterwards keeps the same theme.
- Small and focused on one job.

### Markdown rendering

- Headings, paragraphs, bold, italic, inline code.
- Fenced code blocks (3+ backticks) with optional language.
- Ordered and unordered lists, task lists.
- Nested blockquotes, horizontal rules.
- Links, images (lazy-loaded).
- Tables with left, center, right alignment.
- Indented code blocks.

### Reading experience

- **Responsive layout** with comfortable typography.
- **Auto-generated table of contents (TOC)** in the corner: collapsible, remembers state, highlights the heading you are reading, auto-collapses after you pick an entry and click outside.
- **Reading progress bar** at the top.
- **Back-to-top button** appears when you scroll down.
- **Heading anchor `#`** on hover — click to copy a deep link to that section.
- **Copy button** on every code block (with "Copied!" feedback).
- **Light/dark toggle** — theme persisted via `chrome.storage.local` and applied to every `.md` file afterwards.
- **In-page search** (`/` to open, `Enter` / `Shift+Enter` to jump, `Esc` to close) with match counter and highlighting.
- **Focus / Zen mode** (`f`): hides TOC, progress bar, floating buttons, stats footer and print button; narrows the body for distraction-free reading.
- **Lightweight syntax highlighting** for fenced code blocks — no external library.
- **Word count and estimated reading time** in a footer under the content.
- **Per-file scroll position memory**: reopening a `.md` resumes where you stopped.
- **Interactive task lists**: checkboxes in Markdown are clickable, state persisted per file, with a `Tasks n/m` badge in the corner.
- **Print / Save as PDF button**: opens the print dialog with print-optimized CSS (hides TOC, buttons, progress bar).
- **Line numbers** for code blocks, toggled with `l`.
- **Error banner** shown clearly if the renderer fails to load, instead of a blank page.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `t` | Toggle table of contents |
| `d` | Toggle light/dark mode |
| `/` | Open in-page search |
| `f` | Toggle Focus / Zen mode |
| `l` | Toggle line numbers on code blocks |
| `Enter` / `Shift+Enter` | Jump to next / previous match (when search is open) |
| `Esc` | Close search |

Shortcuts are ignored while the cursor is inside an input field.

### Installation

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the project folder
4. Enable **Allow access to file URLs** (required — otherwise the extension will not run on `file://`)
5. Open any `.md` file in Chrome

The extension matches files with these extensions: `.md`, `.markdown`, `.mdown`, `.mkd` (case-insensitive), in any folder.

---

## License

Open development project.
