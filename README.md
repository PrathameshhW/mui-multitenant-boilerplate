# MUI Multi-Client Boilerplate

Production-ready React boilerplate with:
- `React 19 + TypeScript + Vite`
- `MUI 7` + `Tailwind CSS 4`
- `React Hook Form + Zod` form validation
- Route guards for public/auth flows
- Client-specific theme and layout loading via `VITE_ORG_NAME`

## Why this boilerplate

This project is built for multi-tenant or white-label apps where UI branding changes by client.
Each client can provide its own:
- `theme/AppTheme.tsx`
- `login/LoginLayout.tsx`

The app picks the correct client package at runtime and falls back to `default` automatically.

## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- Tailwind CSS
- React Router
- React Hook Form
- Zod

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and create production build
- `npm run preview` - run built app locally
- `npm run lint` - run ESLint

## Environment Variables

Create a `.env` file in project root:

```bash
VITE_ORG_NAME=default
```

Set `VITE_ORG_NAME` to a client folder name under `src/clients`.

Example:
- `VITE_ORG_NAME=acme` loads `src/clients/acme/*`
- if missing, app falls back to `src/clients/default/*`

## Project Structure

```text
src/
  clients/
    default/
      theme/AppTheme.tsx
      login/LoginLayout.tsx
  config/
    env.config.ts
    router.config.tsx
  pages/
    login/
    main/
    dashboard/
  wrappers/
    AuthWrapper.tsx
    PublicWrapper.tsx
  components/
    Form/
```

## Multi-Client Theming

Client resolution is handled in `src/clients/index.ts`:
- Reads `VITE_ORG_NAME`
- Loads matching client modules when available
- Falls back to `default` theme/layout

The main shell (`src/pages/main/Main.page.tsx`) is styled with MUI theme tokens, so palette changes in client theme files are reflected across the app.

## Auth Flow (Current Boilerplate)

- `AuthWrapper` protects private routes
- `PublicWrapper` blocks login route when already authenticated
- Login stores a demo token in `localStorage`

This is intentionally simple and ready to be replaced with your real auth API.

## Creating a New Client

1. Create a new folder:
   - `src/clients/<client-name>/theme/AppTheme.tsx`
   - `src/clients/<client-name>/login/LoginLayout.tsx`
2. Set `.env`:
   - `VITE_ORG_NAME=<client-name>`
3. Restart dev server

## Notes

- The repo includes both MUI and Tailwind. Prefer MUI theme tokens for reusable, client-driven branding.
- Keep component structure shared, and override branding through client theme/layout modules.

## License

Private project boilerplate.
