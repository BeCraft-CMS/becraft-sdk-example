# TanStack Start Example

A full-stack React application using [becraft-sdk](https://github.com/BeCraft-CMS/becraft-sdk) with server-side rendering.

## Tech Stack

- **Framework**: React 19 + TanStack Start (SSR)
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite

## Features

- Article list display
- Article detail page
- Filtering by category and tags
- Sorting (newest, oldest, by title)
- Dynamic meta tags (title)
- Server-side rendering (SSR)

## Setup

### Install Dependencies

```bash
pnpm install
```

### Configure Environment Variables

Copy `.env.example` to `.env` and configure the environment variables:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `BECRAFT_API_URL` | BeCraft API base URL |
| `BECRAFT_API_KEY` | BeCraft API key (starts with `bcak-`) |

**Note**: The API key is only used server-side and is not exposed to the browser.

### Start Development Server

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

## Directory Structure

```
src/
├── api/                # API client (server-side only)
│   ├── client.server.ts    # BeCraftClient instance
│   └── articles.server.ts  # Article-related server functions
├── components/         # Shared UI components
│   ├── layout/        # Layout components
│   │   └── Header.tsx
│   ├── ui/            # shadcn/ui components
│   └── NotFound.tsx   # 404 page
├── features/          # Feature modules
│   └── articles/      # Articles feature
│       ├── components/  # Article-related components
│       │   ├── ArticleCard.tsx
│       │   └── ArticleFilter.tsx
│       ├── types.ts     # Type definitions
│       ├── utils.ts     # Utility functions
│       └── index.ts     # Exports
├── lib/               # Common utilities
├── routes/            # Page components (TanStack Router)
│   ├── __root.tsx     # Root layout (HTML structure)
│   ├── index.tsx      # Article list page
│   └── articles/
│       └── $articleId.tsx  # Article detail page
├── router.tsx         # Router configuration
└── index.css          # Global styles
```
