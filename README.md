# GitHub-like Markdown Viewer

> Mở file Markdown cục bộ trực tiếp trong Chrome — đọc tài liệu với giao diện sạch, quen thuộc và tập trung vào nội dung.

Một Chrome Extension nhẹ dành cho việc đọc các file Markdown (`.md`, `.markdown`, `.mdown`, `.mkd`) trực tiếp trên máy tính. Extension biến nội dung Markdown thô thành một trang tài liệu dễ đọc với phong cách lấy cảm hứng từ trải nghiệm đọc README hiện đại.

---

## Tiếng Việt

### Điểm mạnh

#### 1. Đọc Markdown trực tiếp từ máy tính

Không cần upload tài liệu lên website hay sử dụng một dịch vụ bên ngoài.

Chỉ cần mở file Markdown bằng Chrome, extension sẽ tự động chuyển nội dung thành giao diện đọc được định dạng.

**Local file → Chrome → Markdown được render → Đọc**

Đặc biệt phù hợp với:

- `README.md`
- Tài liệu kỹ thuật
- Ghi chú cá nhân
- Documentation của project
- Tài liệu offline
- Các file Markdown trong source code

#### 2. Trải nghiệm đọc lấy cảm hứng từ GitHub

Giao diện tập trung vào trải nghiệm đọc tài liệu kỹ thuật quen thuộc:

- Heading rõ ràng
- Typography dễ đọc
- Paragraph có khoảng cách hợp lý
- Link nổi bật
- Inline code
- Code block
- Danh sách
- Task list
- Blockquote
- Horizontal rule
- Markdown table
- Hỗ trợ căn trái / giữa / phải cho table
- Layout responsive

Mục tiêu là biến Markdown thô thành một tài liệu có cấu trúc rõ ràng thay vì chỉ hiển thị plain text.

> Lưu ý: Đây là giao diện lấy cảm hứng từ GitHub, không phải extension chính thức của GitHub.

#### 3. Hoạt động trên file local

Extension được xây dựng cho workflow đọc tài liệu ngay trên máy.

Không yêu cầu:

- Server riêng
- Backend
- Database
- Tài khoản
- API key
- Upload tài liệu lên cloud

#### 4. Nhẹ và tập trung

Extension tập trung vào một nhiệm vụ:

> **Mở Markdown và đọc nó thật dễ dàng.**

Không có dashboard phức tạp, hệ thống tài khoản hoặc backend riêng.

#### 5. Hỗ trợ các thành phần Markdown phổ biến

Renderer hiện hỗ trợ nhiều cấu trúc thường gặp trong README và documentation:

    # Heading

    ## Section

    **Bold text**

    *Italic text*

    `inline code`

    - List item
    - Another item

    > Blockquote

    | Feature | Status |
    | --- | --- |
    | Markdown | Supported |
    | Tables | Supported |

---

### Công nghệ

Project được xây dựng dưới dạng Chrome Extension Manifest V3.

Thành phần chính:

- Chrome Extension
- Manifest V3
- JavaScript
- CSS
- Markdown renderer
- Local `file://` access

Cấu trúc hiện tại:

    github-like-md-viewer/
    ├── manifest.json
    ├── content.js
    ├── github-markdown.css
    ├── chrome_webstore_image_prompts.txt
    └── README.md

---

### Cài đặt

1. Mở:

       chrome://extensions

2. Bật **Developer mode**.

3. Chọn **Load unpacked**.

4. Chọn thư mục project:

       github-like-md-viewer

5. Trong phần extension, bật:

   **Allow access to file URLs**

6. Mở một file Markdown bằng Chrome:

       README.md

   hoặc bất kỳ file Markdown được hỗ trợ nào.

---

### Mục tiêu của dự án

Dự án hướng tới một trải nghiệm rất đơn giản:

> **Markdown là tài liệu. Chrome có thể trở thành nơi đọc tài liệu đó.**

Thay vì phải mở editor hoặc sử dụng một website Markdown viewer, người dùng có thể giữ tài liệu trên máy và đọc trực tiếp trong trình duyệt.

---

## English

# GitHub-like Markdown Viewer

> Open local Markdown files directly in Chrome and read them in a clean, documentation-focused interface.

A lightweight Chrome Extension designed to render local Markdown files (`.md`, `.markdown`, `.mdown`, `.mkd`) directly in Chrome.

The extension transforms raw Markdown into a structured and readable documentation page inspired by modern README reading experiences.

---

## Key Strengths

### 1. Read Local Markdown Directly

No need to upload your documents to a website or rely on an external service.

Simply open a Markdown file in Chrome and the extension transforms the raw Markdown into a formatted reading experience.

**Local file → Chrome → Rendered Markdown → Read**

Useful for:

- `README.md`
- Technical documentation
- Personal notes
- Project documentation
- Offline documentation
- Markdown files inside source-code repositories

### 2. GitHub-Inspired Reading Experience

The interface focuses on the familiar structure of technical documentation:

- Clear headings
- Readable typography
- Comfortable paragraph spacing
- Visible links
- Inline code
- Code blocks
- Lists
- Task lists
- Blockquotes
- Horizontal rules
- Markdown tables
- Table alignment
- Responsive layout

The goal is to turn raw Markdown into a structured document that is comfortable to read.

> Note: The interface is inspired by GitHub's Markdown reading experience. This project is not an official GitHub extension and is not affiliated with GitHub.

### 3. Local-First Workflow

The extension is designed around reading documents directly from your computer.

It does not require:

- A dedicated server
- A backend
- A database
- An account
- An API key
- Uploading documents to the cloud

### 4. Lightweight and Focused

The extension is intentionally focused on one primary task:

> **Open Markdown and make it easy to read.**

It does not try to become a full Markdown editor or a complex documentation platform.

There is no dashboard, account system, or backend service.

### 5. Common Markdown Features

The current renderer supports many Markdown structures commonly found in README files and technical documentation:

    # Heading

    ## Section

    **Bold text**

    *Italic text*

    `inline code`

    - List item
    - Another item

    > Blockquote

    | Feature | Status |
    | --- | --- |
    | Markdown | Supported |
    | Tables | Supported |

These structures are converted into HTML and displayed using a dedicated Markdown stylesheet.

---

## Technology

The project is built as a Chrome Extension using Manifest V3.

Core technologies:

- Chrome Extension
- Manifest V3
- JavaScript
- CSS
- Markdown renderer
- Local `file://` access

Current project structure:

    github-like-md-viewer/
    ├── manifest.json
    ├── content.js
    ├── github-markdown.css
    ├── chrome_webstore_image_prompts.txt
    └── README.md

---

## Installation

1. Open:

       chrome://extensions

2. Enable **Developer mode**.

3. Select **Load unpacked**.

4. Select the project directory:

       github-like-md-viewer

5. In the extension settings, enable:

   **Allow access to file URLs**

6. Open:

       README.md

   or another supported Markdown file with Chrome.

---

## Project Vision

The project follows a simple idea:

> **Markdown is documentation. Chrome can be a place to read it.**

Instead of opening a full editor or uploading a document to an online Markdown viewer, users can keep their Markdown files locally and read them directly in the browser.

---

## License

This project is currently provided as an open development project. Add a specific license here if the project is later published under a defined open-source license.
