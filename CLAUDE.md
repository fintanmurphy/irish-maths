# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (http://localhost:4200)
ng serve

# Build for production (output: dist/irish-maths/)
ng build

# Build with watch mode (development)
ng build --watch --configuration development

# Run unit tests (Karma/Jasmine)
ng test

# Generate a new component
ng generate component component-name
```

## Architecture

This is an **Angular 16** frontend for [irishmaths.com](https://irishmaths.com) — a site that hosts Irish maths exam solutions as PDFs. The backend is a **Strapi CMS** instance.

### Data Flow

`StrapiApiService` (`src/app/strapi-api.service.ts`) is the single service that fetches all data. It exposes two methods:
- `getSolutions()` — fetches the full list for the ag-grid table
- `getSolution(solutionId)` — fetches a single solution with its PDF attachment

API base URLs are set in environment files:
- Dev: `src/environments/environment.ts` → `http://localhost:1337`
- Prod: `src/environments/environment.prod.ts` → `https://strapi.irishmaths.com`

### Key Components

| Component | Route | Purpose |
|-----------|-------|---------|
| `SolutionsComponent` | `/solutions` | Displays all solutions in an **ag-grid** table; clicking a row navigates to `/solution/:solutionId` |
| `SolutionComponent` | `/solution/:id` | Fetches and renders the PDF for the selected solution using **ng2-pdf-viewer** |
| `HomeComponent` | `/home` (default) | Landing page |
| `AboutComponent` | `/about` | About page |

### Key Dependencies

- **ag-grid-angular / ag-grid-community** — data table for the solutions list
- **ng2-pdf-viewer** — renders Strapi-hosted PDFs inline
- **Bootstrap 5 + Bootstrap Icons** — styling (imported globally in `styles.css`)

### Strapi Data Model

The `Solution` interface (defined in `strapi-api.service.ts`) reflects the Strapi content type:

```ts
interface Solution {
  id: number;
  title: string;
  description: string;
  level: string;   // e.g. "Leaving Cert"
  paper: string;
  year: string;
  solutionId: string;  // used as the route param
  solutionPDF: { name: string; url: string; }
}
```

The PDF URL is constructed as `pdfUrlBase + solutionPDF.url` (the Strapi media path is relative).
