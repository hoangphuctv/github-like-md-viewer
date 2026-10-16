# GitHub-like Markdown Viewer

A lightweight Chrome extension for reading local Markdown files in a GitHub-inspired layout.

## Features

- Opens local `.md`, `.markdown`, `.mdown`, and `.mkd` files.
- Renders headings, paragraphs, emphasis, links, images, lists, task lists, blockquotes, tables, and code blocks.
- Supports fenced code blocks with optional language labels.
- Table of contents for documents with multiple headings.
- Light and dark themes.
- In-page search.
- Reading progress indicator.
- Back-to-top button.
- Copy buttons for code blocks.
- Heading links for navigation.
- Optional line numbers for code blocks.
- Focus mode for distraction-free reading.
- Word count and estimated reading time.
- Remembers theme, reading position, and task-list state locally.
- Print-friendly layout for saving a document as PDF.
- Works with local `file://` Markdown files.

## Privacy

The extension is designed for local Markdown files.

It does not upload Markdown file contents to a server or require an account. User preferences are stored locally by Chrome.

External resources referenced by a Markdown document, such as images or links, may be requested by the browser when the document uses them.

## Installation

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this extension folder.
5. Enable **Allow access to file URLs** for the extension.
6. Open a local Markdown file in Chrome.

## Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `t` | Toggle table of contents |
| `d` | Toggle light/dark theme |
| `/` | Open search |
| `f` | Toggle focus mode |
| `l` | Toggle code line numbers |
| `Enter` | Next search result |
| `Shift+Enter` | Previous search result |
| `Esc` | Close search |

Shortcuts are disabled while typing in an input field.

## Supported Files

`.md`, `.markdown`, `.mdown`, `.mkd`

## License

Open development project.
